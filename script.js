/* =====================================================
   CẨM NANG DU LỊCH AN GIANG THÔNG MINH - SCRIPT ỔN ĐỊNH
   ===================================================== */

/* ===== DỮ LIỆU 10 ĐỊA ĐIỂM ===== */


/* ===== BIẾN DÙNG CHUNG ===== */
let diaDiemHienTai = null;
let slideIndex = 0;
let diem = 0;
let daTraLoi = [];

/* ===== XEM CHI TIẾT ===== */
function xemChiTiet(key) {
  const data = duLieu[key];
  const noiDung = document.getElementById("noi-dung-chi-tiet");

  if (!noiDung) {
    alert("Chưa có khung hiển thị chi tiết.");
    return;
  }

  if (!data) {
    noiDung.innerHTML = "<p>Chưa có dữ liệu cho địa điểm này.</p>";
    return;
  }

  diaDiemHienTai = data;
  slideIndex = 0;

  noiDung.innerHTML = `
    <h3 class="detail-title">${data.ten}</h3>

    <div class="slideshow">
      <button onclick="doiAnh(-1)">◀</button>
      <img id="slideImage" src="${data.images[0]}" alt="${data.ten}">
      <button onclick="doiAnh(1)">▶</button>
    </div>

    <p><b>📍 Địa chỉ:</b> ${data.diachi}</p>
    <p><b>🏞️ Loại hình:</b> ${data.loaihinh}</p>
    <p><b>📖 Giới thiệu:</b> ${data.mota}</p>
    <p><b>⭐ Điểm nổi bật:</b> ${data.diemnoibat}</p>
    <p><b>💰 Giá vé:</b> ${data.giave}</p>
    <p><b>🕒 Giờ mở cửa:</b> ${data.giomo}</p>
    <p><b>🍜 Ẩm thực:</b> ${data.amthuc}</p>
    <p><b>🏨 Lưu trú:</b> ${data.khachsan}</p>
    <p><b>💡 Gợi ý:</b> ${data.goiy}</p>

    <a href="https://www.google.com/maps/search/${encodeURIComponent(data.ten)}" target="_blank" class="btn-map">
      🧭 Chỉ đường trên Google Maps
    </a>

    <button class="btn-audio" onclick="ngheThuyetMinh('${key}')">
      🔊 English Audio Guide
    </button>

    <div class="map-box">
      <iframe src="${data.bando}" width="100%" height="320" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
  `;

  document.getElementById("chitiet").scrollIntoView({ behavior: "smooth" });
}

/* ===== ĐỔI ẢNH SLIDESHOW ===== */
function doiAnh(step) {
  if (!diaDiemHienTai) return;

  slideIndex += step;

  if (slideIndex >= diaDiemHienTai.images.length) {
    slideIndex = 0;
  }

  if (slideIndex < 0) {
    slideIndex = diaDiemHienTai.images.length - 1;
  }

  document.getElementById("slideImage").src = diaDiemHienTai.images[slideIndex];
}

/* ===== NGHE THUYẾT MINH TIẾNG ANH ===== */
function ngheThuyetMinh(key) {
  const data = duLieu[key];

  if (!data) {
    alert("No information available.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(data.audio_en);
  speech.lang = "en-US";
  speech.rate = 0.85;
  speech.pitch = 1;
  speech.volume = 1;

  window.speechSynthesis.speak(speech);
}

/* ===== TÌM KIẾM ===== */
function timKiemDiaDiem() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    const ten = cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

    if (ten.includes(input)) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
}

/* ===== HIỆN TẤT CẢ ===== */
function hienTatCaDiaDiem() {
  document.getElementById("searchInput").value = "";
  const cards = document.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "block";
  }
}

/* ===== GỢI Ý LỊCH TRÌNH ===== */
function goiYlichTrinh() {
  const luaChon = document.getElementById("chonLichTrinh").value;
  const ketqua = document.getElementById("ketqua-lichtrinh");

  if (luaChon === "1ngay") {
    ketqua.innerHTML = "Sáng: Miếu Bà Chúa Xứ Núi Sam. Trưa: thưởng thức bún cá Châu Đốc. Chiều: khám phá Rừng tràm Trà Sư.";
  } else if (luaChon === "2ngay") {
    ketqua.innerHTML = "Ngày 1: Núi Sam - Chợ nổi Long Xuyên. Ngày 2: Núi Cấm - Hồ Tà Pạ - Rừng tràm Trà Sư.";
  } else if (luaChon === "tamlinh") {
    ketqua.innerHTML = "Miếu Bà Chúa Xứ Núi Sam - Núi Cấm - Chùa Hang.";
  } else if (luaChon === "sinhthai") {
    ketqua.innerHTML = "Rừng tràm Trà Sư - Hồ Tà Pạ - Núi Cấm.";
  } else if (luaChon === "biendao") {
    ketqua.innerHTML = "Bãi biển Mũi Nai - Hà Tiên - Đảo ngọc Phú Quốc.";
  }
}

/* ===== TRẮC NGHIỆM ===== */
function traLoi(cau, dapAn) {
  const phanHoi = document.getElementById("ketqua");

  if (daTraLoi.includes(cau)) {
    phanHoi.innerHTML = "Bạn đã trả lời câu này rồi!";
    phanHoi.style.color = "orange";
    return;
  }

  const dapAnDung = {
    1: "A",
    2: "A",
    3: "A"
  };

  if (dapAn === dapAnDung[cau]) {
    diem++;
    phanHoi.innerHTML = "Chính xác! Bạn được cộng 1 điểm.";
    phanHoi.style.color = "green";
  } else {
    phanHoi.innerHTML = "Chưa đúng. Bạn hãy đọc lại thông tin để ghi nhớ tốt hơn.";
    phanHoi.style.color = "red";
  }

  daTraLoi.push(cau);
}

function xemDiem() {
  document.getElementById("ketqua").innerHTML = "Kết quả: Bạn đạt " + diem + "/3 điểm.";
}

/* ===== LÊN ĐẦU TRANG ===== */
function lenDauTrang() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
/* =====================================================
   AI ENGINE V2.0 - TRỢ LÝ DU LỊCH AN GIANG THÔNG MINH
   Chạy offline, không cần Internet, không cần API.
   ===================================================== */

function hoiAI() {
  const input = document.getElementById("aiQuestion");
  const chatHistory = document.getElementById("chatHistory");

  if (!input || !chatHistory) {
    alert("Chưa có khung AI Guide trong index.html.");
    return;
  }

  const cauHoiGoc = input.value.trim();

  if (cauHoiGoc === "") {
    return;
  }

  chatHistory.innerHTML += `
    <div class="user-message">
      ${escapeHTML(cauHoiGoc)}
    </div>
  `;

  const traLoi = aiTraLoi(cauHoiGoc);

  chatHistory.innerHTML += `
    <div class="bot-message">
      ${traLoi}
    </div>
  `;

  input.value = "";
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

/* ===== BỘ NÃO AI ===== */
function aiTraLoi(cauHoiGoc) {
  const q = normalizeText(cauHoiGoc);

  const intent = phanTichYeuCau(q);

  if (intent.greeting) {
    return traLoiChaoHoi();
  }

  if (intent.placeKey) {
    return traLoiDiaDiem(intent.placeKey);
  }

  if (intent.compare) {
    return traLoiSoSanh(q);
  }

  if (intent.cost) {
    return traLoiChiPhi(intent);
  }

  if (intent.itinerary) {
    return traLoiLichTrinh(intent);
  }

  if (intent.food) {
    return traLoiAmThuc(intent);
  }

  if (intent.free) {
    return traLoiMienPhi();
  }

  if (intent.family) {
    return traLoiGiaDinhHocSinh();
  }

  if (intent.weatherRain) {
    return traLoiTroiMua();
  }

  if (intent.nature) {
    return traLoiTheoChuDe("sinhthai");
  }

  if (intent.spiritual) {
    return traLoiTheoChuDe("tamlinh");
  }

  if (intent.sea) {
    return traLoiTheoChuDe("biendao");
  }

  if (intent.history) {
    return traLoiTheoChuDe("lichsu");
  }

  if (intent.generalRecommend) {
    return traLoiGoiYChung();
  }

  return traLoiMacDinh();
}

/* ===== PHÂN TÍCH Ý ĐỊNH NGƯỜI DÙNG ===== */
function phanTichYeuCau(q) {
  const intent = {
    greeting: false,
    placeKey: null,
    compare: false,
    cost: false,
    itinerary: false,
    food: false,
    free: false,
    family: false,
    weatherRain: false,
    nature: false,
    spiritual: false,
    sea: false,
    history: false,
    generalRecommend: false,
    days: null,
    budget: null
  };

  if (hasAny(q, ["xin chao", "chao", "hello", "hi", "ban la ai", "ai guide"])) {
    intent.greeting = true;
  }

  intent.placeKey = timDiaDiemTrongCauHoi(q);

  if (hasAny(q, ["so sanh", "khac nhau", "nen chon", "tot hon", "hay hon", "vs", "voi"])) {
    intent.compare = true;
  }

  if (hasAny(q, ["chi phi", "bao nhieu tien", "kinh phi", "du toan", "ngan sach", "tiet kiem", "2 trieu", "1 trieu", "3 trieu", "gia re"])) {
    intent.cost = true;
  }

  if (hasAny(q, ["lich trinh", "ke hoach", "di may ngay", "1 ngay", "mot ngay", "2 ngay", "hai ngay", "cuoi tuan", "tour", "hanh trinh"])) {
    intent.itinerary = true;
  }

  if (hasAny(q, ["am thuc", "mon an", "dac san", "an gi", "an o dau", "bun ca", "hai san", "ga dot", "thot not", "mam"])) {
    intent.food = true;
  }

  if (hasAny(q, ["mien phi", "khong ton tien", "it tien", "di re", "gia re", "tiet kiem"])) {
    intent.free = true;
  }

  if (hasAny(q, ["tre em", "hoc sinh", "gia dinh", "phu huynh", "di cung con", "em nho"])) {
    intent.family = true;
  }

  if (hasAny(q, ["troi mua", "mua lon", "mua gio", "thoi tiet xau", "mua"])) {
    intent.weatherRain = true;
  }

  if (hasAny(q, ["thien nhien", "sinh thai", "rung", "xanh", "canh dep", "chup anh", "ho", "nui", "song nuoc"])) {
    intent.nature = true;
  }

  if (hasAny(q, ["tam linh", "hanh huong", "chua", "mieu", "cau an", "le hoi", "tin nguong"])) {
    intent.spiritual = true;
  }

  if (hasAny(q, ["bien", "dao", "hai san", "tam bien", "nghi duong", "hoang hon", "phu quoc", "mui nai", "ha tien"])) {
    intent.sea = true;
  }

  if (hasAny(q, ["lich su", "di tich", "truyen thong", "cach mang", "hoc tap trai nghiem"])) {
    intent.history = true;
  }

  if (hasAny(q, ["diem du lich", "nen di", "di dau", "goi y", "de xuat", "tham quan", "kham pha", "dia diem dep", "noi bat"])) {
    intent.generalRecommend = true;
  }

  if (hasAny(q, ["1 ngay", "mot ngay", "trong ngay"])) {
    intent.days = 1;
  }

  if (hasAny(q, ["2 ngay", "hai ngay", "cuoi tuan"])) {
    intent.days = 2;
  }

  if (hasAny(q, ["3 ngay", "ba ngay"])) {
    intent.days = 3;
  }

  if (q.includes("1 trieu")) intent.budget = 1000000;
  if (q.includes("2 trieu")) intent.budget = 2000000;
  if (q.includes("3 trieu")) intent.budget = 3000000;

  return intent;
}

/* ===== CÁC CÂU TRẢ LỜI AI ===== */

function traLoiChaoHoi() {
  return `
    Xin chào! Tôi là <b>AI Hướng dẫn viên du lịch An Giang</b>.
    <br><br>
    Tôi có thể hỗ trợ bạn:
    <br>✓ Gợi ý điểm du lịch nên đi
    <br>✓ Lập lịch trình 1 ngày, 2 ngày, cuối tuần
    <br>✓ Gợi ý theo sở thích: sinh thái, tâm linh, biển đảo, lịch sử
    <br>✓ Gợi ý món ăn đặc sản
    <br>✓ Tư vấn điểm phù hợp cho học sinh, gia đình
    <br>✓ Gợi ý theo ngân sách và thời tiết
    <br><br>
    Bạn có thể hỏi: <i>“Tôi có 2 ngày, thích thiên nhiên và đi cùng gia đình”</i>.
  `;
}

function traLoiGoiYChung() {
  return `
    Nếu bạn lần đầu đến An Giang, tôi gợi ý các điểm nên đi:
    <br><br>
    ⭐ <b>Miếu Bà Chúa Xứ Núi Sam</b> – điểm tâm linh nổi tiếng.
    <br>
    🌿 <b>Rừng tràm Trà Sư</b> – du lịch sinh thái đặc sắc.
    <br>
    ⛰️ <b>Núi Cấm</b> – nóc nhà miền Tây, cảnh đẹp và khí hậu mát.
    <br>
    🏞️ <b>Hồ Tà Pạ</b> – cảnh quan yên bình, phù hợp chụp ảnh.
    <br>
    🌊 <b>Mũi Nai - Hà Tiên</b> và <b>Phú Quốc</b> – phù hợp nghỉ dưỡng biển đảo.
    <br><br>
    Nếu bạn cho biết thời gian, sở thích và ngân sách, tôi có thể gợi ý lịch trình cụ thể hơn.
  `;
}

function traLoiDiaDiem(key) {
  const p = duLieu[key];

  if (!p) {
    return traLoiMacDinh();
  }

  return `
    Tôi tìm thấy thông tin về <b>${p.ten}</b>:
    <br><br>
    📍 <b>Địa chỉ:</b> ${p.diachi}
    <br>
    🏞️ <b>Loại hình:</b> ${p.loaihinh}
    <br>
    📖 <b>Giới thiệu:</b> ${p.mota}
    <br>
    ⭐ <b>Điểm nổi bật:</b> ${p.diemnoibat}
    <br>
    💰 <b>Giá vé:</b> ${p.giave}
    <br>
    🕒 <b>Giờ mở cửa:</b> ${p.giomo}
    <br>
    🍜 <b>Ẩm thực:</b> ${p.amthuc}
    <br>
    💡 <b>Gợi ý:</b> ${p.goiy}
    <br><br>
    Bạn có thể bấm <b>Xem chi tiết</b> ở thẻ địa điểm để xem ảnh, bản đồ và nghe thuyết minh.
  `;
}

function traLoiTheoChuDe(chuDe) {
  if (chuDe === "sinhthai") {
    return `
      Nếu bạn thích <b>thiên nhiên và du lịch sinh thái</b>, tôi gợi ý:
      <br><br>
      🌿 <b>Rừng tràm Trà Sư</b>: đi xuồng, ngắm chim, khám phá hệ sinh thái.
      <br>
      🏞️ <b>Hồ Tà Pạ</b>: hồ nước xanh, cảnh quan yên bình.
      <br>
      ⛰️ <b>Núi Cấm</b>: khí hậu mát mẻ, phong cảnh núi non.
      <br><br>
      Gợi ý: nên đi buổi sáng hoặc chiều mát để chụp ảnh đẹp hơn.
    `;
  }

  if (chuDe === "tamlinh") {
    return `
      Nếu bạn thích <b>du lịch tâm linh</b>, tôi gợi ý:
      <br><br>
      🙏 <b>Miếu Bà Chúa Xứ Núi Sam</b>: điểm hành hương nổi tiếng.
      <br>
      ⛰️ <b>Núi Cấm</b>: kết hợp tâm linh và sinh thái.
      <br>
      🛕 <b>Chùa Hang</b>: không gian thanh tịnh, gần núi đá và hang động.
      <br><br>
      Lưu ý: nên ăn mặc lịch sự, giữ gìn trật tự và tôn trọng không gian tín ngưỡng.
    `;
  }

  if (chuDe === "biendao") {
    return `
      Nếu bạn thích <b>biển đảo và hải sản</b>, tôi gợi ý:
      <br><br>
      🌊 <b>Bãi biển Mũi Nai - Hà Tiên</b>: tắm biển, ngắm hoàng hôn.
      <br>
      🏝️ <b>Đảo ngọc Phú Quốc</b>: biển xanh, cát trắng, khu vui chơi hiện đại.
      <br>
      🪨 <b>Hòn Phụ Tử</b>: danh thắng ven biển gắn với truyền thuyết dân gian.
      <br><br>
      Gợi ý: nên đi từ tháng 11 đến tháng 4 để thời tiết thuận lợi hơn.
    `;
  }

  if (chuDe === "lichsu") {
    return `
      Nếu bạn muốn tìm hiểu <b>lịch sử và truyền thống</b>, tôi gợi ý:
      <br><br>
      🕯️ <b>Hang Mo So</b>: di tích lịch sử, phù hợp cho học sinh tham quan trải nghiệm.
      <br>
      🪨 <b>Hòn Phụ Tử</b>: gắn với truyền thuyết dân gian.
      <br>
      🙏 <b>Miếu Bà Chúa Xứ Núi Sam</b>: gắn với văn hóa tín ngưỡng địa phương.
      <br><br>
      Đây là nhóm điểm đến phù hợp với hoạt động giáo dục địa phương.
    `;
  }

  return traLoiGoiYChung();
}

function traLoiLichTrinh(intent) {
  if (intent.days === 1) {
    return `
      <b>Lịch trình gợi ý 1 ngày:</b>
      <br><br>
      🌅 <b>Buổi sáng:</b> Miếu Bà Chúa Xứ Núi Sam.
      <br>
      🍜 <b>Buổi trưa:</b> thưởng thức bún cá Châu Đốc.
      <br>
      🌿 <b>Buổi chiều:</b> Rừng tràm Trà Sư.
      <br><br>
      Phù hợp với: học sinh, gia đình, khách đi ngắn ngày.
    `;
  }

  if (intent.days === 2) {
    return `
      <b>Lịch trình gợi ý 2 ngày:</b>
      <br><br>
      <b>Ngày 1:</b>
      <br>✓ Miếu Bà Chúa Xứ Núi Sam
      <br>✓ Núi Cấm
      <br>✓ Thưởng thức bún cá Châu Đốc hoặc gà đốt Ô Thum
      <br><br>
      <b>Ngày 2:</b>
      <br>✓ Rừng tràm Trà Sư
      <br>✓ Hồ Tà Pạ
      <br>✓ Chợ nổi Long Xuyên
      <br><br>
      Gợi ý: nên đặt phòng trước nếu đi cuối tuần.
    `;
  }

  if (intent.days === 3) {
    return `
      <b>Lịch trình gợi ý 3 ngày:</b>
      <br><br>
      <b>Ngày 1:</b> Miếu Bà Chúa Xứ Núi Sam - Núi Cấm.
      <br>
      <b>Ngày 2:</b> Rừng tràm Trà Sư - Hồ Tà Pạ - Chợ nổi Long Xuyên.
      <br>
      <b>Ngày 3:</b> Hà Tiên - Mũi Nai - Hòn Phụ Tử hoặc mở rộng ra Phú Quốc.
      <br><br>
      Đây là lịch trình đầy đủ hơn, phù hợp khách muốn khám phá nhiều loại hình du lịch.
    `;
  }

  return `
    Bạn muốn lập lịch trình trong bao lâu?
    <br><br>
    Bạn có thể hỏi:
    <br>✓ Gợi ý lịch trình 1 ngày
    <br>✓ Gợi ý lịch trình 2 ngày
    <br>✓ Tôi có 3 ngày nên đi đâu?
  `;
}

function traLoiChiPhi(intent) {
  if (intent.budget && intent.budget <= 1000000) {
    return `
      Với ngân sách khoảng <b>1 triệu đồng</b>, bạn nên chọn lịch trình tiết kiệm:
      <br><br>
      ✓ Miếu Bà Chúa Xứ Núi Sam
      <br>✓ Hồ Tà Pạ
      <br>✓ Chợ nổi Long Xuyên
      <br><br>
      Nên đi trong ngày, theo nhóm và ưu tiên các điểm miễn phí hoặc chi phí thấp.
    `;
  }

  if (intent.budget && intent.budget <= 2000000) {
    return `
      Với ngân sách khoảng <b>2 triệu đồng</b>, bạn có thể đi lịch trình 2 ngày:
      <br><br>
      <b>Ngày 1:</b> Miếu Bà Chúa Xứ Núi Sam - Núi Cấm.
      <br>
      <b>Ngày 2:</b> Rừng tràm Trà Sư - Hồ Tà Pạ.
      <br><br>
      Chi phí gồm di chuyển, ăn uống, vé tham quan và lưu trú bình dân.
    `;
  }

  return `
    <b>Chi phí tham khảo:</b>
    <br><br>
    💰 Đi trong ngày: khoảng 300.000 - 700.000 đồng/người.
    <br>
    💰 Đi 2 ngày: khoảng 1.000.000 - 2.500.000 đồng/người.
    <br>
    💰 Đi Phú Quốc: chi phí cao hơn, tùy phương tiện, khách sạn và dịch vụ.
    <br><br>
    Để tiết kiệm, nên đi theo nhóm, đặt phòng sớm và ưu tiên điểm tham quan miễn phí.
  `;
}

function traLoiAmThuc() {
  return `
    Một số đặc sản nên thử khi du lịch An Giang:
    <br><br>
    🍜 <b>Bún cá Châu Đốc</b>
    <br>
    🍗 <b>Gà đốt Ô Thum</b>
    <br>
    🐟 <b>Mắm Châu Đốc</b>
    <br>
    🍯 <b>Đường thốt nốt, bánh bò thốt nốt</b>
    <br>
    🦀 <b>Hải sản Hà Tiên - Kiên Lương - Phú Quốc</b>
    <br><br>
    Nếu bạn thích hải sản, nên chọn Mũi Nai, Hà Tiên hoặc Phú Quốc.
  `;
}

function traLoiMienPhi() {
  return `
    Một số điểm tham quan tiết kiệm hoặc miễn phí:
    <br><br>
    ✅ Miếu Bà Chúa Xứ Núi Sam
    <br>
    ✅ Hồ Tà Pạ
    <br>
    ✅ Hòn Phụ Tử
    <br>
    ✅ Hang Mo So
    <br><br>
    Lưu ý: có thể phát sinh chi phí gửi xe, ăn uống hoặc dịch vụ phụ trợ.
  `;
}

function traLoiGiaDinhHocSinh() {
  return `
    Nếu đi cùng học sinh hoặc gia đình có trẻ em, tôi gợi ý:
    <br><br>
    👨‍👩‍👧 <b>Rừng tràm Trà Sư</b>: tìm hiểu hệ sinh thái.
    <br>
    ⛰️ <b>Núi Cấm</b>: có cáp treo, cảnh đẹp, không khí mát.
    <br>
    🌊 <b>Bãi biển Mũi Nai</b>: vui chơi, thư giãn.
    <br>
    🏝️ <b>Phú Quốc</b>: nhiều khu vui chơi và trải nghiệm biển đảo.
    <br><br>
    Nên ưu tiên điểm an toàn, có dịch vụ hỗ trợ và dễ di chuyển.
  `;
}

function traLoiTroiMua() {
  return `
    Nếu trời mưa hoặc thời tiết xấu, bạn nên ưu tiên:
    <br><br>
    ✅ Miếu Bà Chúa Xứ Núi Sam
    <br>
    ✅ Chùa Hang
    <br>
    ✅ Các điểm tham quan gần trung tâm, có mái che hoặc dễ di chuyển
    <br><br>
    Hạn chế:
    <br>✗ Đi xuồng khi mưa lớn
    <br>✗ Leo núi hoặc tham quan hang động khi thời tiết nguy hiểm
  `;
}

function traLoiSoSanh(q) {
  const keys = Object.keys(duLieu).filter(function(key) {
    return q.includes(normalizeText(duLieu[key].ten));
  });

  if (keys.length >= 2) {
    const a = duLieu[keys[0]];
    const b = duLieu[keys[1]];

    return `
      <b>So sánh ${a.ten} và ${b.ten}:</b>
      <br><br>
      <b>${a.ten}</b>
      <br>✓ Loại hình: ${a.loaihinh}
      <br>✓ Điểm nổi bật: ${a.diemnoibat}
      <br><br>
      <b>${b.ten}</b>
      <br>✓ Loại hình: ${b.loaihinh}
      <br>✓ Điểm nổi bật: ${b.diemnoibat}
      <br><br>
      Gợi ý: nếu bạn thích ${a.loaihinh.toLowerCase()}, chọn ${a.ten}; nếu thích ${b.loaihinh.toLowerCase()}, chọn ${b.ten}.
    `;
  }

  return `
    Bạn muốn so sánh hai điểm nào?
    <br><br>
    Ví dụ:
    <br>✓ So sánh Núi Cấm và Rừng tràm Trà Sư
    <br>✓ Nên chọn Mũi Nai hay Phú Quốc?
  `;
}

function traLoiMacDinh() {
  return `
    Tôi chưa hiểu rõ yêu cầu của bạn.
    <br><br>
    Bạn có thể hỏi theo mẫu:
    <br>✓ Điểm du lịch nên đi
    <br>✓ Tôi thích thiên nhiên
    <br>✓ Tôi muốn đi 2 ngày
    <br>✓ Tôi đi cùng học sinh
    <br>✓ Điểm nào miễn phí?
    <br>✓ Tôi muốn ăn đặc sản
    <br>✓ Phú Quốc có gì?
  `;
}

/* ===== HÀM HỖ TRỢ ===== */

function normalizeText(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d");
}

function hasAny(text, arr) {
  return arr.some(function(word) {
    return text.includes(normalizeText(word));
  });
}

function timDiaDiemTrongCauHoi(q) {
  const aliases = {
    "mieu-ba-chua-xu": ["mieu ba", "ba chua xu", "nui sam", "chau doc"],
    "rung-tram-tra-su": ["tra su", "rung tram", "rung tram tra su"],
    "nui-cam": ["nui cam", "cam mountain", "bay nui"],
    "cho-noi-long-xuyen": ["cho noi", "long xuyen", "cho noi long xuyen"],
    "ho-ta-pa": ["ta pa", "ho ta pa", "tuyet tinh coc"],
    "chua-hang": ["chua hang", "hang pagoda"],
    "hon-phu-tu": ["hon phu tu", "phu tu"],
    "hang-mo-so": ["mo so", "hang mo so"],
    "mui-nai": ["mui nai", "ha tien", "bai bien mui nai"],
    "phu-quoc": ["phu quoc", "dao ngoc", "pearl island"]
  };

  for (let key in aliases) {
    if (hasAny(q, aliases[key])) {
      return key;
    }
  }

  for (let key in duLieu) {
    const ten = normalizeText(duLieu[key].ten);
    if (q.includes(ten) || ten.includes(q)) {
      return key;
    }
  }

  return null;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
