// ══════════════════════════════════════════════════════════════
// MEMORIES REEL CONFIG — Ký Ức Tuổi Thơ & Thôn Quê Việt Nam
// ══════════════════════════════════════════════════════════════

// ─── 3 VÙNG MIỀN ───
export const REGIONS = [
  {
    id: 'bac',
    name: 'Miền Bắc',
    emoji: '🏛️',
    icon: 'fa-landmark',
    color: 'emerald',
    accent: 'NORTHERN_VIETNAMESE',
    music: 'Quan họ Bắc Ninh nhẹ nhàng, sáo trúc Tây Bắc, tiếng đàn bầu mộc mạc',
    asmr: 'tiếng gà gáy sáng sớm, ếch nhái kêu đêm, gió lùa qua rặng tre, tiếng nước giếng múc, chim sáo hót, mưa rơi trên mái ngói',
    scenes: 'Đồng lúa xanh mướt bát ngát trải dài, cây đa cổ thụ đầu làng tán rộng mát rượi, giếng nước làng thành gạch rêu phong, cổng làng cổ kính trầm mặc, mái đình cong vút lợp ngói rêu phong, ao sen hồng nở rộ thơm ngát, đường làng lát gạch đỏ phủ rêu, cánh đồng mùa gặt vàng óng lúa chín, bờ đê uốn lượn xanh cỏ, cây gạo đầu đình hoa đỏ rực, chợ quê sáng sớm, lũy tre xanh bao quanh làng, sân đình lát gạch nghỉ mát',
    clothing: 'áo bà ba nâu sồng, quần vải đen giản dị, nón lá, khăn mỏ quạ, áo tứ thân xưa, dép cao su cũ hoặc đi chân đất',
    architecture: 'nhà ngói cổ ba gian hai chái, sân gạch đỏ rộng phơi lúa, tường đá ong xám vàng, giàn trầu không leo, bể nước mưa xi măng, cổng nhà bằng gạch cũ',
    cuisine: 'bún riêu cua đồng, bánh cuốn nóng, xôi nếp cái hoa vàng, chè lam, bánh đúc riêu cua, khoai lang nướng than',
  },
  {
    id: 'trung',
    name: 'Miền Trung',
    emoji: '⛩️',
    icon: 'fa-torii-gate',
    color: 'amber',
    accent: 'CENTRAL_VIETNAMESE',
    music: 'Hò Huế man mác, ca Huế trầm bổng, nhã nhạc cung đình nhẹ, đàn tranh miền Trung',
    asmr: 'tiếng sóng biển xa xa, gió Lào thổi nóng, mưa miền Trung rả rích dai dẳng, tiếng chuông chùa Thiên Mụ, thuyền thúng kẽo kẹt, tiếng chày giã gạo',
    scenes: 'Nhà rường Huế cổ kính ba gian trầm mặc, ruộng bậc thang vàng óng xếp lớp tầng, sông Hương lặng lẽ trôi dưới cầu Trường Tiền, đầm phá Tam Giang mênh mông sóng gợn, cồn cát trắng dưới nắng chang chang, rặng phi lao xào xạc gió, bếp lửa than hoa đỏ rực, mưa miền Trung dai dẳng suốt tháng mười, đường làng cát trắng ven biển, vườn thanh trà chín mọng, làng chài thuyền thúng nằm nghiêng',
    clothing: 'áo dài tay raglan giản dị, quần lụa đen, nón bài thơ, khăn vấn, dép quai hậu mòn hoặc đi chân trần, áo tơi lá',
    architecture: 'nhà rường ba gian cột gỗ mít, mái ngói liệt rêu phong, tường vôi vàng nhạt phai màu, sân vườn có bể cạn non bộ, hàng rào chè tàu xanh đậm',
    cuisine: 'cơm hến, bún bò Huế, bánh bèo, mì Quảng, chè bắp, bánh tráng thịt heo cuốn rau sống',
  },
  {
    id: 'nam',
    name: 'Miền Nam',
    emoji: '🛶',
    icon: 'fa-water',
    color: 'sky',
    accent: 'SOUTHERN_MEKONG',
    music: 'Đờn ca tài tử miền Tây mộc mạc, guitar phím lõm bolero, vọng cổ sáu câu ai oán, nhạc tài tử Nam Bộ',
    asmr: 'tiếng bìm bịp kêu nước lớn, dầm chèo khua nước, bếp cà ràng tí tách, gió lùa qua hàng dừa nước, ếch nhái kêu đêm đồng, cá quẫy dưới ao, mưa rào chiều tháng sáu',
    scenes: 'Sông nước miền Tây mênh mông phù sa, xuồng ba lá lênh đênh trên kênh rạch, bếp cà ràng đất nung khói lam chiều, vườn dừa nước xanh mát bóng râm, cầu khỉ bắc ngang con rạch nhỏ, chợ nổi Cái Răng tấp nập ghe xuồng, đồng lúa phù sa vàng bạt ngàn, nhà sàn bên sông nước lấp xấp, ao cá tra lóng lánh, vườn cây ăn trái xum xuê chôm chôm sầu riêng, bến đò ngang chiều vắng',
    clothing: 'quần áo bà ba đen hoặc nâu sờn bạc, khăn rằn vắt vai, nón lá, đi chân trần bùn đất, quần xắn ống lội ruộng',
    architecture: 'nhà mái lá đơn sơ trầm mặc, cột gỗ tạp mộc mạc, nền đất nện, chái bếp riêng có bếp cà ràng đất nung, sàn gỗ bắc ngang mương nước, hàng rào bông bụp đỏ',
    cuisine: 'cá lóc nướng trui rơm, canh chua bông điên điển, bánh xèo giòn, chuối nếp nướng, cháo cá lóc, cơm cháy kho quẹt',
  },
];

// ─── 3 CHẾ ĐỘ SÁNG TẠO ───
export const MODES = [
  {
    id: 'hoai_niem',
    name: '🌾 Hoài Niệm Tuổi Thơ',
    icon: 'fa-child-reaching',
    desc: 'Ký ức ruộng đồng, trò chơi thôn quê, chiều bên mẹ, bếp lửa, tuổi thơ chân đất...',
    tone: 'nhớ nhung sâu lắng, xúc động, mộc mạc chân phương, ấm lòng',
    narrative: 'Kể chuyện tuổi thơ ngày xưa ấy, những buổi chiều chạy nhảy trên đồng, bắt cá mò cua, chia nhau viên kẹo, nằm ngửa nhìn trời đếm sao đêm. Giọng kể man mác, luyến tiếc, nhớ thương.',
    hooks: [
      'Ai còn nhớ ngày xưa... tuổi thơ mình đã giản dị thế nào?',
      'Có một nơi mà dù đi xa bao lâu... ta vẫn muốn quay về...',
      'Tuổi thơ tôi... chỉ cần có vậy thôi mà sao nhớ quá!',
      'Ngày ấy... chúng tôi chẳng có gì... nhưng lại hạnh phúc nhất đời.',
      'Bạn có bao giờ... chợt nhớ mùi khói bếp chiều xưa không?',
      'Mỗi khi trời mưa... tôi lại nhớ mái hiên nhà ngoại...',
    ],
    characters: 'Trẻ em thôn quê chân đất, da ngăm nắng gió, quần áo cũ bạc, tóc khô xơ vì nắng. Người mẹ/bà lam lũ tảo tần, tay chai sạn, dáng gầy gò. Người cha/ông lặng lẽ, mồ hôi, cặm cụi.',
  },
  {
    id: 'yen_binh',
    name: '🌿 Ước Mơ Yên Bình',
    icon: 'fa-dove',
    desc: 'Khát khao về quê an yên, xa rời phố thị ồn ào, sống chậm giữa thiên nhiên...',
    tone: 'nhẹ nhàng, hy vọng, bình yên, thanh thản, thư thái',
    narrative: 'Mơ về cuộc sống giản đơn, xa phố thị xô bồ, có mảnh vườn nhỏ, ao cá lóng lánh, sáng ra pha ấm trà, chiều ngắm hoàng hôn. Giọng kể êm ái, hy vọng, dẫn dắt người nghe đến nơi bình yên.',
    hooks: [
      'Đôi khi... chỉ cần được sống thật chậm... giữa đồng quê mênh mông...',
      'Ước mơ của tôi không xa hoa... chỉ là một mái nhà yên tĩnh giữa đồng...',
      'Có khi nào bạn muốn... bỏ hết tất cả... về quê sống an yên?',
      'Ngày mai... tôi sẽ trở về nơi ấy... nơi lúa vàng trải dài...',
      'Cuộc sống đẹp nhất... có lẽ chỉ cần thế này thôi...',
      'Hạnh phúc... đôi khi chỉ là tiếng chim hót sớm mai ngoài vườn...',
    ],
    characters: 'Người trẻ trở về quê, dáng thanh thản. Nông dân hiền lành mộc mạc. Thiên nhiên tươi đẹp trù phú là nhân vật chính.',
  },
  {
    id: 'vo_chong_gia',
    name: '👴 Vợ Chồng Già Bên Vườn',
    icon: 'fa-heart',
    desc: 'Sinh hoạt vợ chồng già bên vườn cây ao cá, trà sáng, bếp lửa chiều, nắm tay nhau...',
    tone: 'ấm áp, hạnh phúc giản dị, tri ân, nâng niu, sâu lắng',
    narrative: 'Câu chuyện tình yêu bình dị của đôi vợ chồng già thôn quê. Ông bà bên nhau cả đời, giờ tuổi xế chiều vẫn nắm tay nhau trên chiếc ghế gỗ trước hiên nhà, ngắm hoàng hôn. Giọng kể trìu mến, đầy lòng biết ơn.',
    hooks: [
      'Tình yêu đẹp nhất... không phải ở thành phố xa hoa... mà ở nơi giản dị nhất...',
      'Ông bà tôi... cả đời chẳng nói lời yêu... nhưng tay vẫn nắm tay...',
      'Có một thứ tình yêu... lặng lẽ như dòng sông... mà sâu đậm cả đời...',
      'Hạnh phúc... chỉ là ông nấu cho bà chén canh nóng... mỗi buổi chiều...',
      'Họ đã bên nhau... 50 năm... và vẫn cười khi nhìn nhau...',
      'Tình yêu tuổi già... nhẹ nhàng mà nặng lòng... như khói bếp chiều quê...',
    ],
    characters: 'Ông già ngoài 70, da nhăn nheo nắng gió, tay chai sạn, dáng gầy nhưng rắn rỏi, đội nón cời, quần áo bà ba cũ. Bà già hiền từ, tóc bạc búi, miệng nhai trầu, tay hay vuốt tóc ông, dáng còng lưng nhưng nhanh nhẹn.',
  },
];

// ─── GỢI Ý CHỦ ĐỀ VIRAL (9 tổ hợp vùng miền × chế độ) ───
export const TOPIC_SUGGESTIONS = {
  // === HOÀI NIỆM × VÙNG MIỀN ===
  hoai_niem_bac: [
    'Tuổi thơ bắt cá rô trên đồng lúa miền Bắc sau cơn mưa rào',
    'Chiều ngồi gốc đa đầu làng nghe bà kể chuyện cổ tích xưa',
    'Mùa gặt lúa vàng cả làng rộn ràng tiếng cười trẻ nhỏ',
    'Chơi trốn tìm quanh sân đình làng lát gạch đỏ buổi trưa hè',
    'Chia nhau viên kẹo bột ngày xưa ngồi bờ ao sen hồng',
    'Buổi sáng theo mẹ đi chợ quê gánh nặng bước chân trần',
    'Tiếng sáo trúc vọng lại từ cánh đồng chiều muộn',
    'Ngày mùa phơi lúa trên sân gạch đỏ nắng chang chang',
  ],
  hoai_niem_trung: [
    'Tuổi thơ lội sông Hương bắt ốc sau giờ tan học chiều',
    'Ngày mưa miền Trung ngồi co ro bên bếp than hoa nướng bắp',
    'Chạy dọc bờ cồn cát trắng đuổi diều giấy bay cao',
    'Buổi chiều theo cha đi thuyền thúng ra biển đánh cá',
    'Chia nhau chén chè bắp nóng hổi ngày đông rét mướt',
    'Nghe mẹ hát hò Huế bên khung cửi dệt vải đêm',
    'Tuổi thơ giản dị giữa nhà rường cũ ba gian trầm mặc',
    'Trú mưa dưới mái hiên nhà cổ nghe tiếng mưa rả rích',
  ],
  hoai_niem_nam: [
    'Tuổi thơ tắm sông bắt cá lóc cùng đám bạn miền Tây',
    'Chiều quê nhớ mùi khói bếp cà ràng nấu cơm cháy',
    'Chạy qua cầu khỉ run rẩy rồi rơi tõm xuống kênh',
    'Chia nhau miếng dừa nạo ngồi gốc dừa nghe gió thổi',
    'Theo bà ngoại đi xuồng ba lá hái bông điên điển vàng',
    'Đêm nằm nghe vọng cổ vọng lại từ bên kia sông',
    'Buổi sáng theo mẹ ra chợ nổi mua mớ cá tươi',
    'Ăn cá lóc nướng trui rơm giữa đồng lúa vàng rực',
  ],

  // === ƯỚC MƠ YÊN BÌNH × VÙNG MIỀN ===
  yen_binh_bac: [
    'Mơ về ngôi nhà nhỏ giữa đồng lúa xanh mướt miền Bắc',
    'Sáng thức dậy pha trà bên hiên nhà ngói cổ nghe chim hót',
    'Ao sen trước nhà hoa nở rộ tỏa hương thơm ngát',
    'Chiều tà ngồi bờ đê ngắm đàn trâu về chuồng yên bình',
    'Vườn rau nhỏ xanh mơn mởn bên giếng nước trong veo',
    'Cuộc sống chậm rãi giữa đồng quê Bắc Bộ thanh bình',
  ],
  yen_binh_trung: [
    'Mơ về căn nhà rường xưa giữa vườn thanh trà xanh mát',
    'Sáng ngồi bên bờ sông Hương uống trà nghe tiếng chuông chùa',
    'Chiều đi dạo trên cầu ngói Thanh Toàn ngắm hoàng hôn tím',
    'Một góc vườn nhỏ miền Trung trồng rau trồng hoa tự cung tự cấp',
    'Cuộc sống giản đơn bên đầm phá mênh mông sóng lặng',
    'Ngày ngày đan lưới vá thuyền bên bờ biển vắng yên bình',
  ],
  yen_binh_nam: [
    'Mơ về nhà vườn miền Tây bên sông nước mênh mông',
    'Sáng ra vườn hái trái cây ăn sáng chiều thả câu ao cá',
    'Ngồi trên xuồng ba lá lênh đênh ngắm hoàng hôn miền Tây',
    'Ao cá lóng lánh trước nhà, vườn cây trĩu quả sau hè',
    'Cuộc sống yên bình bên cầu khỉ nhỏ bắc ngang con rạch',
    'Sáng uống cà phê bên bếp cà ràng nghe chim bìm bịp kêu',
  ],

  // === VỢ CHỒNG GIÀ × VÙNG MIỀN ===
  vo_chong_gia_bac: [
    'Ông bà ngồi bên hiên nhà ngói cổ uống trà sáng ngắm lúa',
    'Bà nấu canh cua đồng trong bếp cũ ông ngồi đan rổ bên cạnh',
    'Ông bà dắt tay nhau đi dạo bờ đê chiều tà ngắm cánh đồng vàng',
    'Trà chiều bên ao sen ông đọc báo bà ngồi khâu vá',
    'Đêm đông ông bà sưởi ấm bên bếp lửa hồng kể chuyện ngày xưa',
    'Sáng sớm bà ra giếng múc nước ông quét sân gạch đỏ',
  ],
  vo_chong_gia_trung: [
    'Ông bà ngồi bên hiên nhà rường Huế uống trà nóng nghe mưa rơi',
    'Bà nấu cơm hến trong bếp than ông ngồi sửa cái quạt nan cũ',
    'Ông bà cùng nhau trồng rau trong vườn nhỏ sau nhà bên sông Hương',
    'Chiều tà ông bà ngồi bên cửa sổ nhà rường ngắm hoàng hôn tím',
    'Bà ru cháu ngủ bên ông nằm võng đọc sách dưới mái hiên',
    'Ông bà cùng nhau đi chùa Thiên Mụ cầu bình an mỗi rằm',
  ],
  vo_chong_gia_nam: [
    'Ông bà ngồi bên bến sông chiều ngắm xuồng qua lại uống trà',
    'Bà nấu canh chua cá lóc trong bếp cà ràng ông ngồi đan lưới',
    'Ông bà cùng nhau cho cá ăn ngoài ao buổi sáng tinh mơ',
    'Chiều tà ông đưa bà đi xuồng ba lá dọc kênh ngắm hoa điên điển',
    'Bà ngồi nhai trầu bên cửa ông nằm võng nghe vọng cổ',
    'Ông bà cùng nhau hái trái cây trong vườn miền Tây xum xuê trĩu quả',
  ],
};

// ─── THỜI LƯỢNG REEL/TIKTOK ───
export const REEL_DURATIONS = [
  { id: '15s', label: '⚡ 15 giây', seconds: 15, scenes: 3, desc: 'TikTok ngắn, viral hook' },
  { id: '30s', label: '🎬 30 giây', seconds: 30, scenes: 5, desc: 'Reel chuẩn, câu chuyện ngắn' },
  { id: '60s', label: '📽️ 60 giây', seconds: 60, scenes: 8, desc: 'Reel dài, kể chuyện sâu' },
  { id: '90s', label: '🎞️ 90 giây', seconds: 90, scenes: 12, desc: 'TikTok/Reel max, câu chuyện hoàn chỉnh' },
];

// ─── VISUAL STYLES CHO THÔN QUÊ ───
export const MEMORIES_VISUAL_STYLES = [
  {
    id: 'nostalgic_warm_sepia',
    name: '🌅 Hoàng Hôn Sepia',
    desc: 'Tone sepia ấm, ánh nắng chiều vàng, mờ sương hoài niệm',
    prompt: 'Visual Style: Nostalgic Cinematic Realism, warm sepia toned vintage glow, smoky amber light, soft grey rain tones, hazy atmosphere, gentle late-afternoon summer sun, natural 35mm lens, eye-level intimacy. NEGATIVE: modern technology, concrete roads, plastic objects, bright saturated colors, CGI, 3D renders, text, watermarks, logos, anatomy errors, blurry faces.',
  },
  {
    id: 'golden_hour_dreamy',
    name: '✨ Golden Hour Mộng Mơ',
    desc: 'Ánh nắng vàng ấm, bụi vàng bay, mơ màng',
    prompt: 'Visual Style: Dreamy Golden Hour Cinematic, warm golden sunlight, lens flare, floating dust particles in light, soft bokeh background, shallow depth of field, warm color grading, film grain texture. NEGATIVE: modern technology, concrete roads, plastic objects, bright saturated colors, CGI, 3D renders, text, watermarks, logos, anatomy errors, blurry faces.',
  },
  {
    id: 'misty_morning_rural',
    name: '🌫️ Sương Sớm Thôn Quê',
    desc: 'Sương mù sáng sớm, ánh nắng len qua, tĩnh lặng',
    prompt: 'Visual Style: Misty Morning Rural Vietnam, early dawn fog, soft diffused morning light, muted cool tones with warm highlights, ethereal mist over rice paddies, natural earth tones, quiet contemplative mood. NEGATIVE: modern technology, concrete roads, plastic objects, bright saturated colors, CGI, 3D renders, text, watermarks, logos, anatomy errors, blurry faces.',
  },
  {
    id: 'rainy_nostalgia',
    name: '🌧️ Mưa Quê Hoài Niệm',
    desc: 'Mưa rơi trên mái lá, tone xám xanh ấm, u buồn nhẹ',
    prompt: 'Visual Style: Rainy Nostalgia Rural Vietnam, gentle rain falling on thatched roofs, grey-blue muted tones, warm interior glow from kitchen, water droplets, wet earth textures, melancholic yet warm atmosphere. NEGATIVE: modern technology, concrete roads, plastic objects, bright saturated colors, CGI, 3D renders, text, watermarks, logos, anatomy errors, blurry faces.',
  },
  {
    id: 'sunset_rice_field',
    name: '🌾 Hoàng Hôn Ruộng Đồng',
    desc: 'Hoàng hôn đỏ cam trên cánh đồng, bóng dài, hùng vĩ',
    prompt: 'Visual Style: Epic Sunset Rice Field, rich orange and purple sunset glow casting long shadows, wide panoramic landscape, tiny human figures against vast golden rice paddies, dramatic sky, cinematic composition, warm earth palette. NEGATIVE: modern technology, concrete roads, plastic objects, bright saturated colors, CGI, 3D renders, text, watermarks, logos, anatomy errors, blurry faces.',
  },
];

// ─── HASHTAG COMBOS ───
export const VIRAL_HASHTAGS = {
  hoai_niem: ['#tuoitho', '#kyuctuoitho', '#quengoai', '#kyucxua', '#mienquexua', '#thonque', '#nhonhung', '#tuoithodaynhonhung', '#hoainiem', '#ngayxua', '#langque', '#vietnam', '#kyucquenha'],
  yen_binh: ['#cuocsongyenbinh', '#songcham', '#venha', '#thiennhien', '#binhyen', '#anyen', '#quenha', '#songgiandon', '#ruongdong', '#vequenha', '#muabinhyen', '#vietnam'],
  vo_chong_gia: ['#tinhyeu', '#vochonggia', '#bencaunhau', '#tinhyeugiandon', '#vuoncayaoca', '#tuoixechieu', '#tinhcam', '#haiphuc', '#giadinh', '#tinhyeubenlung', '#yeuthuong', '#vietnam'],
};

// ─── NHẠC NỀN ĐỀ XUẤT TRENDING ───
export const MUSIC_SUGGESTIONS = {
  hoai_niem: [
    '🎵 Quê Nhà - Trần Tiến (instrumental)',
    '🎵 Nhật Ký Của Mẹ - Hiền Thục',
    '🎵 Về Quê - Piano cover',
    '🎵 Tuổi Thơ Tôi - Acoustic',
    '🎵 Nhạc nền piano buồn nhẹ nhàng (no copyright)',
    '🎵 Sáo trúc Việt Nam - Quê Hương',
  ],
  yen_binh: [
    '🎵 Nhạc thiền nhẹ nhàng - Acoustic guitar',
    '🎵 Bài Ca Trên Đồng - Acoustic cover',
    '🎵 Nhạc nền lofi Việt Nam chill',
    '🎵 Tiếng suối chảy + piano nhẹ',
    '🎵 Nhạc đồng quê acoustic mộc mạc',
    '🎵 Nhạc phim Việt Nam buồn nhẹ',
  ],
  vo_chong_gia: [
    '🎵 Dạ Cổ Hoài Lang - Đàn tranh',
    '🎵 Diễm Xưa - Trịnh Công Sơn (instrumental)',
    '🎵 Bolero miền Tây - Guitar phím lõm',
    '🎵 Vọng cổ câu 1-2 nhẹ nhàng',
    '🎵 Nhạc nền romantic piano vintage',
    '🎵 Đàn bầu Việt Nam - Tình quê hương',
  ],
};
