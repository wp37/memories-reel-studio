import { useState, useEffect } from 'react';
import { callGemini } from '../utils/api';
import { showToast } from '../utils/toast';
import { REGIONS, MODES, TOPIC_SUGGESTIONS, REEL_DURATIONS, MEMORIES_VISUAL_STYLES, VIRAL_HASHTAGS, MUSIC_SUGGESTIONS } from '../config/memoriesConfig';
import { MEMORIES_SCRIPT_PROMPT, MEMORIES_SEO_PROMPT, MEMORIES_STYLE_SUGGEST_PROMPT } from '../config/memoriesPrompts';
import SceneCard from '../components/SceneCard';

// ─── Region color map ───
const REGION_COLORS = {
  bac: { bg: 'bg-emerald-950/40', border: 'border-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]', text: 'text-emerald-300', accent: 'emerald' },
  trung: { bg: 'bg-amber-950/40', border: 'border-amber-500', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]', text: 'text-amber-300', accent: 'amber' },
  nam: { bg: 'bg-sky-950/40', border: 'border-sky-500', glow: 'shadow-[0_0_20px_rgba(14,165,233,0.25)]', text: 'text-sky-300', accent: 'sky' },
};

const MODE_COLORS = {
  hoai_niem: { bg: 'bg-orange-950/30', border: 'border-orange-500/50', text: 'text-orange-300', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]' },
  yen_binh: { bg: 'bg-green-950/30', border: 'border-green-500/50', text: 'text-green-300', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.2)]' },
  vo_chong_gia: { bg: 'bg-rose-950/30', border: 'border-rose-500/50', text: 'text-rose-300', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]' },
};

export default function MemoriesModule({ onScriptGenerated, uiLang = 'vi' }) {
  const [region, setRegion] = useState('nam');
  const [mode, setMode] = useState('hoai_niem');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('60s');
  const [style, setStyle] = useState('nostalgic_warm_sepia');
  const [contentContext, setContentContext] = useState('');
  const [pastedImages, setPastedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [segments, setSegments] = useState([]);
  const [scriptMeta, setScriptMeta] = useState(null);
  const [showSeo, setShowSeo] = useState(false);
  const [seoData, setSeoData] = useState(null);
  const [loadingSeo, setLoadingSeo] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  // Get topic suggestions for current region + mode combo
  const suggestionKey = `${mode}_${region}`;
  const suggestions = TOPIC_SUGGESTIONS[suggestionKey] || [];
  const currentRegion = REGIONS.find(r => r.id === region);
  const currentMode = MODES.find(m => m.id === mode);
  const currentDuration = REEL_DURATIONS.find(d => d.id === duration);
  const currentStyle = MEMORIES_VISUAL_STYLES.find(s => s.id === style);
  const rc = REGION_COLORS[region];
  const mc = MODE_COLORS[mode];

  // Loading messages
  const loadingMsgs = [
    '🌾 Đang hồi tưởng ký ức thôn quê...',
    '🏡 Đang dệt khung cảnh làng quê xưa...',
    '🎬 Đang tạo kịch bản viral...',
    '📸 Đang thiết kế bố cục hình ảnh...',
    '🎵 Đang chọn nhạc nền phù hợp...',
    '✨ Đang hoàn thiện chi tiết...',
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      setMsgIdx(0);
      timer = setInterval(() => setMsgIdx(i => (i + 1) % loadingMsgs.length), 2500);
    }
    return () => clearInterval(timer);
  }, [loading]);

  // ─── Copy helper ───
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(''), 2000);
    showToast(`✅ Đã copy ${label}!`, 'success');
  };

  // ─── Paste Handler (for images) ───
  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    let hasImage = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        hasImage = true;
        const file = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          setPastedImages(prev => {
            const newImages = [...prev, event.target.result];
            return newImages.slice(0, 3); // Giới hạn max 3 ảnh
          });
        };
        reader.readAsDataURL(file);
      }
    }
    
    if (hasImage) {
      showToast('📸 Đã thêm ảnh tham khảo!', 'success');
    }
  };

  // ─── Generate Script ───
  const generate = async () => {
    if (!topic.trim()) return showToast('Vui lòng nhập chủ đề!', 'error');
    setSegments([]);
    setScriptMeta(null);
    setSeoData(null);
    setLoading(true);

    try {
      const regionData = currentRegion;
      const modeData = currentMode;
      const durationData = currentDuration;
      const styleData = currentStyle;

      const userPrompt = `
CHỦ ĐỀ: "${topic}"
VÙNG MIỀN: ${regionData.emoji} ${regionData.name} (${regionData.id})
CHẾ ĐỘ: ${modeData.name} (${modeData.id})
THỜI LƯỢNG: ${durationData.label} (${durationData.seconds} giây, ${durationData.scenes} scenes)
PHONG CÁCH VISUAL: ${styleData.name}

CHI TIẾT VÙNG MIỀN:
- Bối cảnh: ${regionData.scenes}
- Kiến trúc: ${regionData.architecture}
- Trang phục: ${regionData.clothing}
- Giọng: ${regionData.accent}
- Nhạc/ASMR: ${regionData.music}, ${regionData.asmr}
- Ẩm thực đặc trưng: ${regionData.cuisine}

CHI TIẾT CHẾ ĐỘ:
- Mô tả: ${modeData.desc}
- Tone giọng: ${modeData.tone}
- Cách kể chuyện: ${modeData.narrative}
- Nhân vật: ${modeData.characters}

PHONG CÁCH VISUAL:
${styleData.prompt}

${contentContext.trim() ? `NỘI DUNG/BỐI CẢNH DO USER CUNG CẤP:\n${contentContext.trim()}\nHãy dựa vào đây làm nguồn tư liệu chính.` : ''}

YÊU CẦU:
1. Tạo CHÍNH XÁC ${durationData.scenes} scenes.
2. Mỗi scene ${Math.round(durationData.seconds / durationData.scenes)} giây.
3. Tuân thủ cấu trúc viral: HOOK → BUILD → PEAK → RESOLVE → CTA.
4. voice_text bằng TIẾNG VIỆT, tối đa 18 từ/scene.
5. video_prompt và image_prompt bằng TIẾNG ANH, chi tiết, đậm chất thôn quê.
6. Caption viral và hashtags cho Facebook/TikTok.
7. FORMAT: 9:16 PORTRAIT cho Reel/TikTok.
12. Sử dụng hook từ danh sách: ${JSON.stringify(modeData.hooks.slice(0, 3))}
GENERATE JSON OBJECT.`;

      const res = await callGemini(userPrompt, MEMORIES_SCRIPT_PROMPT, pastedImages);

      let segs = res.script || (Array.isArray(res) ? res : []);
      if (!Array.isArray(segs)) segs = [];

      // Ensure string values
      const safeString = (val) => typeof val === 'object' && val !== null ? JSON.stringify(val) : val || '';
      segs = segs.map(s => ({
        ...s,
        visual_desc_vi: safeString(s.visual_desc_vi),
        visual_desc: safeString(s.visual_desc),
        sfx_music_suggestion: safeString(s.sfx_music_suggestion),
        section: safeString(s.section),
        voice_text: safeString(s.voice_text),
        pacing_warning: safeString(s.pacing_warning),
      }));

      // Enforce visual style on all prompts
      if (styleData) {
        segs = segs.map(s => ({
          ...s,
          video_prompt: (s.video_prompt || '') + (s.video_prompt?.includes('Visual Style:') ? '' : ` ${styleData.prompt}`),
          image_prompt: (s.image_prompt || '') + (s.image_prompt?.includes('nostalgic cinematic') ? '' : ` ${styleData.prompt}`),
        }));
      }

      setSegments(segs);
      setScriptMeta(res);
      if (onScriptGenerated) onScriptGenerated(segs, style, topic);
      showToast(`🎬 Đã tạo ${segs.length} phân cảnh thành công!`, 'success');
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ─── Generate SEO ───
  const generateSeo = async () => {
    if (!topic.trim() && segments.length === 0) return showToast('Cần có chủ đề hoặc kịch bản!', 'error');
    setLoadingSeo(true);
    try {
      const voiceTexts = segments.map(s => s.voice_text).filter(Boolean).join('\n');
      const res = await callGemini(
        `CHỦ ĐỀ: "${topic}"\nVÙNG MIỀN: ${currentRegion?.name}\nCHẾ ĐỘ: ${currentMode?.name}\n\nKỊCH BẢN VOICE:\n${voiceTexts}\n\nTạo bộ SEO viral hoàn chỉnh cho Facebook Reel & TikTok.`,
        MEMORIES_SEO_PROMPT
      );
      setSeoData(res);
      setShowSeo(true);
      showToast('✅ Đã tạo SEO package!', 'success');
    } catch (e) { showToast(e.message, 'error'); }
    finally { setLoadingSeo(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 animate-[slideIn_0.4s_ease-out] pb-10">

      {/* ═══ HEADER ═══ */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-black text-white flex items-center justify-center gap-3">
          <span className="text-3xl">🏡</span>
          <span>MEMORIES <span className="text-emerald-400">REEL</span> STUDIO</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1 tracking-wider uppercase">Ký Ức Tuổi Thơ • Thôn Quê Việt Nam • Facebook Reel & TikTok</p>
      </div>

      {/* ═══ REGION SELECTOR ═══ */}
      <div className="bg-[#12161e] border border-slate-700/30 p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
        <label className="text-xs font-black text-slate-400 uppercase mb-3 block flex items-center gap-2">
          <i className="fa-solid fa-map-location-dot text-emerald-400" /> CHỌN VÙNG MIỀN
        </label>
        <div className="grid grid-cols-3 gap-3">
          {REGIONS.map(r => {
            const isActive = region === r.id;
            const colors = REGION_COLORS[r.id];
            return (
              <button key={r.id} onClick={() => setRegion(r.id)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden group
                  ${isActive ? `${colors.bg} ${colors.border} ${colors.glow}` : 'bg-[#0a0e14] border-slate-700/40 hover:border-slate-600'}`}>
                {/* Decorative gradient */}
                <div className={`absolute inset-0 opacity-${isActive ? '20' : '0'} group-hover:opacity-10 transition-opacity bg-gradient-to-br ${r.id === 'bac' ? 'from-emerald-500/30' : r.id === 'trung' ? 'from-amber-500/30' : 'from-sky-500/30'} to-transparent`} />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <div className={`font-black text-sm ${isActive ? colors.text : 'text-slate-300'}`}>{r.name}</div>
                      <div className="text-[10px] text-slate-500">{r.accent.replace(/_/g, ' ')}</div>
                    </div>
                  </div>
                  <div className={`text-[10px] leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-500'} line-clamp-2`}>
                    {r.scenes.split(',').slice(0, 4).join(', ')}...
                  </div>
                </div>
                {isActive && (
                  <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${colors.bg} ${colors.border} border`}>
                    <i className="fa-solid fa-check text-[8px] text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ MODE SELECTOR ═══ */}
      <div className="bg-[#12161e] border border-slate-700/30 p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
        <label className="text-xs font-black text-slate-400 uppercase mb-3 block flex items-center gap-2">
          <i className="fa-solid fa-masks-theater text-orange-400" /> CHẾ ĐỘ SÁNG TẠO
        </label>
        <div className="grid grid-cols-3 gap-3">
          {MODES.map(m => {
            const isActive = mode === m.id;
            const colors = MODE_COLORS[m.id];
            return (
              <button key={m.id} onClick={() => setMode(m.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left
                  ${isActive ? `${colors.bg} ${colors.border} ${colors.glow}` : 'bg-[#0a0e14] border-slate-700/40 hover:border-slate-600'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <i className={`fa-solid ${m.icon} text-lg ${isActive ? colors.text : 'text-slate-500'}`} />
                  <span className={`font-black text-xs ${isActive ? colors.text : 'text-slate-300'}`}>{m.name}</span>
                </div>
                <div className={`text-[10px] leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-500'} line-clamp-2`}>
                  {m.desc}
                </div>
                {isActive && (
                  <div className={`mt-2 text-[9px] px-2 py-1 rounded-md inline-block ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {m.tone}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ TOPIC INPUT + SUGGESTIONS ═══ */}
      <div className="bg-[#12161e] border border-slate-700/30 p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
        <label className="text-xs font-black text-slate-400 uppercase mb-2 block flex items-center gap-2">
          <i className="fa-solid fa-pen-fancy text-purple-400" /> CHỦ ĐỀ REEL
        </label>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="w-full bg-[#0a0e14] border border-slate-700/50 rounded-xl p-3.5 text-sm text-white outline-none focus:border-emerald-500/50 placeholder-slate-600 transition-colors"
          placeholder="VD: Tuổi thơ tắm sông bắt cá cùng đám bạn miền Tây..."
        />

        {/* Quick suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-3">
            <div className="text-[10px] text-slate-500 mb-2 flex items-center gap-1">
              <i className="fa-solid fa-lightbulb text-amber-500" /> Gợi ý viral cho {currentRegion?.emoji} {currentRegion?.name} × {currentMode?.name}:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.slice(0, 6).map((s, i) => (
                <button key={i} onClick={() => setTopic(s)}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg bg-[#0a0e14] border border-slate-700/40 text-slate-400 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-all truncate max-w-[280px]">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content context & Image Paste Area */}
        <div className="mt-4">
          <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block flex items-center justify-between">
            <span className="flex items-center gap-1"><i className="fa-solid fa-scroll" /> Nội dung/Bối cảnh bổ sung</span>
            <span className="text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded flex items-center gap-1">
              <i className="fa-regular fa-image" /> Hỗ trợ dán ảnh (Ctrl+V)
            </span>
          </label>
          <div className="bg-[#0a0e14] border border-slate-700/40 focus-within:border-emerald-500/50 rounded-lg p-1 transition-colors">
            <textarea
              value={contentContext}
              onChange={e => setContentContext(e.target.value)}
              onPaste={handlePaste}
              className="w-full bg-transparent p-2 text-xs text-white outline-none placeholder-slate-600 min-h-[70px] resize-y leading-relaxed"
              placeholder="Dán lời kể chuyện, kịch bản gốc, hoặc 📸 nhấn Ctrl+V để dán trực tiếp ảnh screenshot từ video gốc vào đây (tối đa 3 ảnh) để AI bám sát hình ảnh..."
            />
            {pastedImages.length > 0 && (
              <div className="flex gap-2 p-2 border-t border-slate-700/30 bg-[#0a0e14]/50 rounded-b-lg">
                {pastedImages.map((img, i) => (
                  <div key={i} className="relative group w-14 h-14 rounded-md overflow-hidden border border-slate-600 shadow-md">
                    <img src={img} alt="Pasted ref" className="w-full h-full object-cover" />
                    <button onClick={() => setPastedImages(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                      <i className="fa-solid fa-times" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══ DURATION + VISUAL STYLE ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Duration */}
        <div className="bg-[#12161e] border border-slate-700/30 p-5 rounded-2xl">
          <label className="text-xs font-black text-slate-400 uppercase mb-3 block flex items-center gap-2">
            <i className="fa-solid fa-stopwatch text-cyan-400" /> THỜI LƯỢNG REEL
          </label>
          <div className="grid grid-cols-2 gap-2">
            {REEL_DURATIONS.map(d => (
              <button key={d.id} onClick={() => setDuration(d.id)}
                className={`p-3 rounded-xl border text-center transition-all ${duration === d.id
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'bg-[#0a0e14] border-slate-700/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}>
                <div className="text-sm font-black">{d.label}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{d.scenes} cảnh • {d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Style */}
        <div className="bg-[#12161e] border border-slate-700/30 p-5 rounded-2xl">
          <label className="text-xs font-black text-slate-400 uppercase mb-3 block flex items-center gap-2">
            <i className="fa-solid fa-palette text-pink-400" /> PHONG CÁCH HÌNH ẢNH
          </label>
          <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-1">
            {MEMORIES_VISUAL_STYLES.map(s => (
              <button key={s.id} onClick={() => setStyle(s.id)}
                className={`p-2.5 rounded-lg border text-left transition-all flex items-center gap-2 ${style === s.id
                  ? 'bg-pink-950/30 border-pink-500/50 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.15)]'
                  : 'bg-[#0a0e14] border-slate-700/40 text-slate-400 hover:border-slate-600'}`}>
                <span className="text-base shrink-0">{s.name.split(' ')[0]}</span>
                <div>
                  <div className="text-xs font-bold">{s.name.slice(s.name.indexOf(' ') + 1)}</div>
                  <div className="text-[10px] opacity-60">{s.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ GENERATE BUTTON ═══ */}
      <button onClick={generate} disabled={loading}
        className={`w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-2
          ${loading
            ? 'bg-slate-800 border-slate-600 text-slate-400'
            : `bg-gradient-to-r from-emerald-900/60 via-teal-900/60 to-cyan-900/60 border-emerald-500/40 text-emerald-100 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]`
          }`}>
        {loading ? (
          <>
            <i className="fa-solid fa-sync animate-spin" />
            <span>{loadingMsgs[msgIdx]}</span>
          </>
        ) : (
          <>
            <span className="text-xl">🎬</span>
            <span>TẠO REEL KÝ ỨC VIRAL</span>
            <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded-md font-black">
              {currentDuration?.scenes} SCENES
            </span>
          </>
        )}
      </button>

      {/* ═══ OUTPUT: SCRIPT META + CAPTION ═══ */}
      {scriptMeta && (
        <div className="bg-[#12161e] border border-emerald-500/20 p-5 rounded-2xl space-y-4 animate-[slideIn_0.4s_ease-out]">
          {/* Viral Hook */}
          {scriptMeta.viral_hook && (
            <div className="bg-[#0a0e14] p-4 rounded-xl border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-amber-400 uppercase flex items-center gap-1">
                  <i className="fa-solid fa-bolt" /> Viral Hook
                </span>
                <button onClick={() => copyToClipboard(scriptMeta.viral_hook, 'Hook')}
                  className="text-[10px] px-2 py-1 rounded bg-amber-900/30 text-amber-300 hover:bg-amber-900/50 transition-all">
                  <i className="fa-solid fa-copy" /> Copy
                </button>
              </div>
              <p className="text-sm text-amber-200 font-medium italic">"{scriptMeta.viral_hook}"</p>
            </div>
          )}

          {/* Caption */}
          {scriptMeta.caption_vi && (
            <div className="bg-[#0a0e14] p-4 rounded-xl border border-slate-700/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                  <i className="fa-brands fa-facebook" /> Caption Facebook
                </span>
                <button onClick={() => copyToClipboard(scriptMeta.caption_vi, 'Caption')}
                  className="text-[10px] px-2 py-1 rounded bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 transition-all">
                  <i className="fa-solid fa-copy" /> Copy
                </button>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">{scriptMeta.caption_vi}</p>
            </div>
          )}

          {/* Hashtags */}
          {scriptMeta.hashtags && scriptMeta.hashtags.length > 0 && (
            <div className="bg-[#0a0e14] p-4 rounded-xl border border-slate-700/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1">
                  <i className="fa-solid fa-hashtag" /> Hashtags
                </span>
                <button onClick={() => copyToClipboard(scriptMeta.hashtags.join(' '), 'Hashtags')}
                  className="text-[10px] px-2 py-1 rounded bg-purple-900/30 text-purple-300 hover:bg-purple-900/50 transition-all">
                  <i className="fa-solid fa-copy" /> Copy All
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {scriptMeta.hashtags.map((h, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-purple-950/30 text-purple-300 border border-purple-500/20">{h}</span>
                ))}
              </div>
            </div>
          )}

          {/* Music suggestion */}
          {scriptMeta.music_suggestion && (
            <div className="bg-[#0a0e14] p-3 rounded-xl border border-slate-700/30 flex items-center gap-3">
              <i className="fa-solid fa-music text-pink-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">Nhạc nền đề xuất:</span>
                <span className="text-xs text-pink-300 font-medium">{scriptMeta.music_suggestion}</span>
              </div>
            </div>
          )}

          {/* Quick hashtag presets */}
          <div className="bg-[#0a0e14] p-3 rounded-xl border border-slate-700/30">
            <div className="text-[10px] font-black text-slate-500 uppercase mb-2">📋 Hashtag Combo Nhanh</div>
            <div className="flex flex-wrap gap-1">
              {(VIRAL_HASHTAGS[mode] || []).map((h, i) => (
                <span key={i} onClick={() => copyToClipboard(VIRAL_HASHTAGS[mode].join(' '), 'Hashtag combo')}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 cursor-pointer hover:text-white transition-colors">{h}</span>
              ))}
            </div>
          </div>

          {/* SEO Generate */}
          <button onClick={generateSeo} disabled={loadingSeo}
            className="w-full py-3 rounded-xl bg-purple-900/30 hover:bg-purple-900/40 border border-purple-500/30 text-purple-200 font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50">
            {loadingSeo ? (
              <><i className="fa-solid fa-sync animate-spin" /> Đang tạo SEO package...</>
            ) : (
              <><i className="fa-solid fa-rocket" /> TẠO CAPTION + HASHTAG VIRAL (SEO)</>
            )}
          </button>
        </div>
      )}

      {/* ═══ SEO OUTPUT ═══ */}
      {showSeo && seoData && (
        <div className="bg-[#12161e] border border-purple-500/20 p-5 rounded-2xl space-y-4 animate-[slideIn_0.4s_ease-out]">
          <h3 className="text-sm font-black text-purple-300 flex items-center gap-2">
            <i className="fa-solid fa-chart-line" /> SEO & VIRAL PACKAGE
          </h3>

          {/* Facebook Caption */}
          {seoData.captions?.facebook && (
            <div className="bg-[#0a0e14] p-4 rounded-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-blue-400 uppercase"><i className="fa-brands fa-facebook" /> Facebook Caption</span>
                <button onClick={() => copyToClipboard(seoData.captions.facebook, 'FB Caption')}
                  className="text-[10px] px-2 py-1 rounded bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 transition-all">
                  <i className="fa-solid fa-copy" /> Copy
                </button>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">{seoData.captions.facebook}</p>
            </div>
          )}

          {/* TikTok Caption */}
          {seoData.captions?.tiktok && (
            <div className="bg-[#0a0e14] p-4 rounded-xl border border-pink-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-pink-400 uppercase"><i className="fa-brands fa-tiktok" /> TikTok Caption</span>
                <button onClick={() => copyToClipboard(seoData.captions.tiktok, 'TikTok Caption')}
                  className="text-[10px] px-2 py-1 rounded bg-pink-900/30 text-pink-300 hover:bg-pink-900/50 transition-all">
                  <i className="fa-solid fa-copy" /> Copy
                </button>
              </div>
              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{seoData.captions.tiktok}</p>
            </div>
          )}

          {/* Hashtags */}
          {seoData.hashtags && (
            <div className="grid grid-cols-2 gap-3">
              {seoData.hashtags.facebook && (
                <div className="bg-[#0a0e14] p-3 rounded-xl border border-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-blue-400"><i className="fa-brands fa-facebook" /> FB Hashtags</span>
                    <button onClick={() => copyToClipboard(seoData.hashtags.facebook.join(' '), 'FB Hashtags')}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900/30 text-blue-300"><i className="fa-solid fa-copy" /></button>
                  </div>
                  <div className="flex flex-wrap gap-1">{seoData.hashtags.facebook.map((h, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-blue-950/30 text-blue-300/80">{h}</span>
                  ))}</div>
                </div>
              )}
              {seoData.hashtags.tiktok && (
                <div className="bg-[#0a0e14] p-3 rounded-xl border border-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-pink-400"><i className="fa-brands fa-tiktok" /> TikTok Hashtags</span>
                    <button onClick={() => copyToClipboard(seoData.hashtags.tiktok.join(' '), 'TikTok Hashtags')}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-pink-900/30 text-pink-300"><i className="fa-solid fa-copy" /></button>
                  </div>
                  <div className="flex flex-wrap gap-1">{seoData.hashtags.tiktok.map((h, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-pink-950/30 text-pink-300/80">{h}</span>
                  ))}</div>
                </div>
              )}
            </div>
          )}

          {/* Viral Hooks */}
          {seoData.viral_hooks && (
            <div className="bg-[#0a0e14] p-3 rounded-xl border border-amber-500/20">
              <span className="text-[10px] font-black text-amber-400 uppercase block mb-2"><i className="fa-solid fa-bolt" /> Viral Hooks</span>
              {seoData.viral_hooks.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-800 last:border-0">
                  <span className="text-xs text-amber-200/80 italic">"{h}"</span>
                  <button onClick={() => copyToClipboard(h, `Hook ${i + 1}`)}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-amber-900/20 text-amber-400 shrink-0 ml-2"><i className="fa-solid fa-copy" /></button>
                </div>
              ))}
            </div>
          )}

          {/* Posting Tips */}
          {seoData.posting_tips && (
            <div className="bg-[#0a0e14] p-3 rounded-xl border border-slate-700/30">
              <span className="text-[10px] font-black text-green-400 uppercase block mb-2"><i className="fa-solid fa-clock" /> Lịch Đăng Tối Ưu</span>
              <div className="text-xs text-slate-300 space-y-1">
                {seoData.posting_tips.best_time && <div>⏰ <strong>Giờ:</strong> {seoData.posting_tips.best_time}</div>}
                {seoData.posting_tips.best_day && <div>📅 <strong>Ngày:</strong> {seoData.posting_tips.best_day}</div>}
                {seoData.posting_tips.tips && seoData.posting_tips.tips.map((t, i) => (
                  <div key={i} className="text-slate-400">💡 {t}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ MUSIC SUGGESTIONS PRESET ═══ */}
      {segments.length > 0 && (
        <div className="bg-[#12161e] border border-slate-700/30 p-4 rounded-2xl">
          <h3 className="text-[10px] font-black text-pink-400 uppercase mb-2 flex items-center gap-1">
            <i className="fa-solid fa-music" /> NHẠC NỀN ĐỀ XUẤT TRENDING
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(MUSIC_SUGGESTIONS[mode] || []).map((m, i) => (
              <button key={i} onClick={() => copyToClipboard(m, 'Nhạc')}
                className="text-[10px] text-left p-2 rounded-lg bg-[#0a0e14] border border-slate-700/30 text-slate-400 hover:text-pink-300 hover:border-pink-500/30 transition-all">
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ SCENE CARDS ═══ */}
      {segments.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <div className="text-xs text-slate-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Đã tạo: {segments.length} phân cảnh • {currentRegion?.emoji} {currentRegion?.name} • {currentMode?.name}
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                const text = segments.map(s => s.voice_text).filter(Boolean).join('\n\n');
                copyToClipboard(text, 'Voice All');
              }} className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 bg-white text-black hover:bg-slate-200 transition-all">
                <i className="fa-solid fa-microphone" /> Copy Voice
              </button>
              <button onClick={() => {
                const text = segments.map(s => s.image_prompt).filter(Boolean).join('\n\n---\n\n');
                copyToClipboard(text, 'Image Prompts');
              }} className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 bg-pink-900/30 text-pink-300 border border-pink-500/30 hover:bg-pink-900/50 transition-all">
                <i className="fa-solid fa-image" /> Copy Prompts
              </button>
              <button onClick={() => {
                const data = { topic, region, mode, duration, style, segments, meta: scriptMeta };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url;
                a.download = `memories_reel_${region}_${mode}_${Date.now()}.json`;
                a.click(); URL.revokeObjectURL(url);
                showToast('💾 Đã lưu dự án!', 'success');
              }} className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 bg-emerald-900/30 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/50 transition-all">
                <i className="fa-solid fa-download" /> Lưu JSON
              </button>
            </div>
          </div>

          {segments.map((seg, i) => (
            <SceneCard key={i} seg={seg} idx={i} uiLang={uiLang} audienceProfile="millennial" />
          ))}
        </div>
      )}

      {/* ═══ COPY FEEDBACK TOAST ═══ */}
      {copyFeedback && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg animate-[fadeIn_0.3s_ease-out] z-50">
          ✅ Đã copy: {copyFeedback}
        </div>
      )}
    </div>
  );
}
