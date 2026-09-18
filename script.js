/**
 * Happy Birthday Điềm Dler - Interactive JavaScript
 * Dynamic Letter Generator, Web Audio Synthesizer, Confetti & Guestbook
 */

// Global State
let currentFormData = {
  name: '',
  age: '',
  relation: 'bestie',
  memory: '',
  messageIndex: 0
};

// --------------------------------------------------------------------------
// 1. RICH MESSAGE DATABASE (KHO LỜI CHÚC & TRI ÂN PHONG PHÚ THEO MỐI QUAN HỆ)
// --------------------------------------------------------------------------
const RELATION_MESSAGES = {
  bestie: [
    {
      salutation: (name) => `Gửi tri kỷ chí cốt ${name},`,
      paragraphs: [
        `Hôm nay là sinh nhật của Điềm, nhìn lại chặng đường một năm qua và cả những năm tháng trước đây, Điềm thật sự biết ơn cuộc đời vì đã cho Điềm một người bạn như bạn. Cảm ơn vì đã luôn kề vai sát cánh, cùng nhau cười nghiêng ngả qua những câu chuyện không đầu không cuối, và cả những lúc khó khăn nhất vẫn chưa từng buông tay.`,
        `Có những người bạn bước vào cuộc đời rồi lướt qua, nhưng với Điềm, bạn chính là mảnh ghép kỉ niệm bền vững nhất. Những bữa ăn ngẫu hứng, những lần tâm sự thâu đêm hay những trò lầy lội không tên... tất cả đã làm nên một thanh xuân rực rỡ mà Điềm sẽ mãi trân trọng!`,
        `Thêm một tuổi mới, Điềm chỉ muốn nói rằng: Điềm rất may mắn khi có bạn trong đời!`
      ],
      blessing: `Chúc cho tình bạn của chúng ta mãi keo sơn bền chặt! Chúc bạn sự nghiệp thăng tiến vù vù, ví tiền luôn rủng rỉnh, bình an trong từng hơi thở và luôn hạnh phúc mỗi ngày! Khi nào rảnh, kèo ăn mừng sinh nhật nhất định tụi mình phải cháy hết mình nhé! 🍻🔥`
    },
    {
      salutation: (name) => `Ê bạn thân ${name} ơi,`,
      paragraphs: [
        `Sinh nhật Điềm năm nay, người đầu tiên Điềm nghĩ tới để gửi lời cảm ơn chính là bạn đấy! Cảm ơn vì đã luôn chịu đựng cái tính ẩm ương của Điềm, luôn xuất hiện đúng lúc mỗi khi Điềm cần một người lắng nghe hoặc một người cùng đi ăn sập thế giới.`,
        `Cuộc sống có thể cuốn chúng ta vào guồng quay bộn bề, nhưng mỗi lần gặp lại nhau, tụi mình vẫn như những đứa trẻ vô lo vô nghĩ. Đó là điều quý giá nhất mà Điềm luôn gìn giữ trong lòng.`
      ],
      blessing: `Mong bạn tuổi mới luôn mạnh khỏe, yêu đời, bớt deadline, tăng lương thưởng và mọi dự định ấp ủ đều thuận buồm xuôi gió! Hãy mãi là bờ vai vững chãi của nhau nhé! 🌟`
    },
    {
      salutation: (name) => `Gửi người anh em/người bạn tuyệt vời nhất - ${name},`,
      paragraphs: [
        `Nay sinh nhật Điềm rồi nè! Giữa biển người mênh mông, tìm được một người hiểu ý mình từng cử chỉ, hợp gu từ gu nhạc đến quán ăn như bạn quả thực là một món quà vô giá của tạo hóa.`,
        `Cảm ơn bạn vì đã luôn kiên nhẫn, luôn là chỗ dựa tinh thần và không ngần ngại nói thẳng cho Điềm những lời chân thành nhất. Cảm ơn vì bạn đã luôn là một phần không thể thiếu trong thanh xuân của Điềm!`
      ],
      blessing: `Chúc bạn một đời an yên, vạn sự hanh thông, gặp hung hóa cát, bước tới đâu hào quang theo tới đó. Đừng quên hôm nay sinh nhật Điềm thì bạn cũng phải vui gấp đôi nhé! ❤️`
    }
  ],

  schoolmate: [
    {
      salutation: (name) => `Gửi người bạn cùng thời áo trắng - ${name},`,
      paragraphs: [
        `Hôm nay sinh nhật Điềm, tự nhiên bao nhiêu thước phim kí ức thời đi học lại ùa về. Nhớ những ngày cùng nhau đến lớp, cùng chia nhau từng gói bánh, cùng hồi hộp mỗi giờ kiểm tra và cả những ước mơ ngây ngô thời son trẻ.`,
        `Dù giờ đây mỗi đứa đều có một con đường riêng và bận rộn với cuộc sống, nhưng kỉ niệm bên bạn vẫn luôn là khoảng trời trong trẻo và đẹp đẽ nhất trong lòng Điềm.`
      ],
      blessing: `Chúc bạn luôn giữ được ngọn lửa nhiệt huyết của tuổi trẻ, công việc thăng hoa, gia đình viên mãn và bất kể khi nào nhớ về thời thanh xuân, nụ cười vẫn luôn rạng rỡ trên môi! 🎒✨`
    },
    {
      salutation: (name) => `Chào ${name} thân mến,`,
      paragraphs: [
        `Thời gian trôi nhanh thật, mới ngày nào còn ngồi chung giảng đường, nay Điềm lại thêm một tuổi mới. Cảm ơn bạn vì đã cùng Điềm đi qua những tháng năm học trò thật đẹp và nhiều hoài bão.`,
        `Mỗi lần nhớ về kỉ niệm xưa, Điềm luôn thấy ấm lòng vì từng có những người bạn đồng môn tuyệt vời và tử tế như bạn bên cạnh.`
      ],
      blessing: `Chúc bạn công việc luôn suôn sẻ, tài lộc dồi dào, sức khỏe dẻo dai và sớm đạt được những cột mốc lớn trong cuộc sống! Hẹn một ngày họp lớp gần nhất nhé! 🥂`
    }
  ],

  colleague: [
    {
      salutation: (name) => `Gửi chiến hữu ${name} cùng chiến hào,`,
      paragraphs: [
        `Sinh nhật năm nay của Điềm trở nên đặc biệt hơn rất nhiều vì có sự đồng hành của bạn! Cảm ơn bạn vì những lần gánh team, những buổi cùng nhau tăng ca vượt deadline, và cả những lúc chia nhau cốc trà sữa để nạp năng lượng tiếp tục chiến đấu.`,
        `Trong môi trường công việc nhiều thử thách, gặp được một người đồng nghiệp nhiệt huyết, hiểu chuyện và luôn sẵn lòng giúp đỡ như bạn thực sự là điều may mắn lớn với Điềm.`
      ],
      blessing: `Chúc bạn công việc thuận lợi vượt bậc, KPI hoàn thành xuất sắc, thăng quan tiến chức, sếp quý đồng nghiệp thương và tài khoản lúc nào cũng 'ting ting' rực rỡ! Cảm ơn bạn đã luôn là chỗ dựa tin cậy! 💼🚀`
    },
    {
      salutation: (name) => `Gửi ${name} - người đồng nghiệp tuyệt vời,`,
      paragraphs: [
        `Hôm nay là ngày sinh nhật của Điềm, Điềm muốn gửi lời cảm ơn chân thành nhất đến bạn. Cảm ơn bạn vì luôn tạo ra bầu không khí tích cực, hỗ trợ Điềm hết mình trong từng dự án và giúp những ngày làm việc bớt căng thẳng hơn rất nhiều.`,
        `Có một người đồng hành ăn ý như bạn khiến Điềm có thêm thật nhiều động lực để cố gắng mỗi ngày.`
      ],
      blessing: `Chúc bạn luôn tràn đầy năng lượng sáng tạo, mọi dự án đều thành công vang dội, công việc hanh thông và cuộc sống luôn ngập tràn niềm vui cùng gia đình! 🌟`
    }
  ],

  family: [
    {
      salutation: (name) => `Gửi ${name} thương yêu của gia đình,`,
      paragraphs: [
        `Hôm nay là sinh nhật của Điềm. Điềm muốn dành những lời biết ơn sâu sắc nhất gửi đến bạn - người thân yêu luôn bên cạnh chở che, lắng nghe và tiếp thêm sức mạnh cho Điềm trên mỗi bước đường đời.`,
        `Dù ngoài kia sóng gió thế nào, chỉ cần nghĩ về tình cảm gia đình ấm áp mà bạn dành cho Điềm, Điềm lại có thêm dũng khí để vững bước và trưởng thành hơn mỗi ngày.`
      ],
      blessing: `Chúc bạn luôn dồi dào sức khỏe, bình an vô sự, mọi lo toan muộn phiền đều tan biến và nụ cười luôn nở trên môi. Cảm ơn vì đã luôn là hậu phương và chỗ dựa vững chãi nhất của Điềm! 🏡❤️`
    },
    {
      salutation: (name) => `Gửi ${name} thân thương,`,
      paragraphs: [
        `Thêm một tuổi mới, Điềm càng trân quý hơn từng bữa cơm, từng lời dặn dò và sự quan tâm chân thành từ bạn. Có bạn trong gia đình chính là phước lành to lớn nhất mà Điềm luôn biết ơn mỗi khi sinh nhật về.`,
        `Cảm ơn bạn vì đã luôn yêu thương, bao dung và luôn ủng hộ những quyết định trong cuộc đời của Điềm!`
      ],
      blessing: `Kính chúc bạn vạn sự như ý, tâm an trí sáng, sức khỏe an khang và luôn ngập tràn niềm vui bên người thân! 🌸`
    }
  ],

  crush: [
    {
      salutation: (name) => `Gửi ${name} - người đặc biệt nhất hôm nay,`,
      paragraphs: [
        `Hôm nay là sinh nhật của Điềm, và sự xuất hiện của bạn chính là món quà ngọt ngào nhất mà Điềm nhận được. Cảm ơn bạn vì đã đến, mang theo những nụ cười dịu dàng làm bừng sáng cả thế giới xung quanh Điềm.`,
        `Mỗi khoảnh khắc được trò chuyện, được nhìn thấy ánh mắt hay nụ cười của bạn đều khiến trái tim Điềm thấy ấm áp lạ kỳ. Kỉ niệm có bạn chính là trang nhật ký lung linh và đáng nhớ nhất.`
      ],
      blessing: `Chúc cho bạn luôn xinh đẹp, rạng ngời, mỗi ngày trôi qua đều nhẹ nhàng và ngập tràn hạnh phúc. Mong rằng những ngày sinh nhật tới, Điềm vẫn luôn có bạn kề bên! ❤️✨`
    },
    {
      salutation: (name) => `Gửi ${name} yêu dấu,`,
      paragraphs: [
        `Thêm một tuổi mới, Điềm chẳng mong gì hơn ngoài việc người Điềm thương luôn được bình yên và vui vẻ. Cảm ơn bạn vì đã luôn thấu hiểu, mang lại cho Điềm cảm giác bình yên và rung động mà không ai khác có thể mang lại.`,
        `Cảm ơn bạn vì đã làm cho ngày sinh nhật của Điềm trở nên trọn vẹn và ý nghĩa hơn bao giờ hết!`
      ],
      blessing: `Mong bạn mỗi sớm mai thức dậy đều thấy yêu đời, mọi ước muốn đều thành hiện thực và tình cảm của chúng mình sẽ ngày càng ngọt ngào, bền lâu! 🌹`
    }
  ],

  close_friend: [
    {
      salutation: (name) => `Gửi người bạn quý mến ${name},`,
      paragraphs: [
        `Hôm nay là một ngày đặc biệt của Điềm, và Điềm muốn gửi lời tri ân chân thành nhất tới bạn. Cảm ơn bạn vì đã luôn dõi theo, luôn dành cho Điềm những lời động viên chân tình và sự tử tế ấm áp.`,
        `Có những tình bạn không cần ngày nào cũng gặp, nhưng mỗi khi cần, đối phương luôn sẵn sàng có mặt. Cảm ơn bạn vì đã là một phần kỉ niệm đẹp đẽ trong cuộc đời của Điềm!`
      ],
      blessing: `Chúc bạn luôn tràn ngập may mắn, bình an trong tâm hồn, công việc hanh thông và gặt hái được thật nhiều thành công rực rỡ! Cảm ơn bạn rất nhiều! 🎈🎉`
    }
  ],

  cyber_friend: [
    {
      salutation: (name) => `Gửi người bạn tri kỷ phương xa - ${name},`,
      paragraphs: [
        `Dù chúng mình có thể cách nhau qua màn hình hay khoảng cách địa lý, nhưng sự kết nối và những cuộc trò chuyện cùng bạn luôn mang lại nguồn năng lượng vô cùng tích cực cho Điềm.`,
        `Sinh nhật này, Điềm muốn cảm ơn bạn vì đã luôn tương tác, lắng nghe và chia sẻ với Điềm những niềm vui nỗi buồn đời thường. Thế giới mạng rộng lớn, gặp được bạn quả là một duyên may!`
      ],
      blessing: `Chúc bạn luôn may mắn, thành công trên con đường bạn đã chọn, cuộc sống ngập tràn tiếng cười và sớm có dịp tụi mình gặp nhau ngoài đời thực để cùng nâng ly nhé! 🌐🍻`
    }
  ],

  supporter: [
    {
      salutation: (name) => `Gửi ${name} - người bạn luôn dành sự ủng hộ cho Điềm,`,
      paragraphs: [
        `Hôm nay là ngày sinh nhật của Điềm Dler. Đứng trước tuổi mới, Điềm cảm thấy vô cùng xúc động và biết ơn vì luôn có những người bạn tuyệt vời như bạn luôn âm thầm theo dõi, ủng hộ và chúc phúc cho Điềm.`,
        `Mỗi lời chúc, mỗi lượt like hay một tin nhắn nhỏ từ bạn đều là nguồn động viên to lớn giúp Điềm thêm vững tin trên con đường mình đang đi.`
      ],
      blessing: `Chúc bạn và gia đình luôn dồi dào sức khỏe, hạnh phúc viên mãn, công việc phát đạt và gặp thật nhiều quý nhân phù trợ trong đời! Trân trọng và cảm ơn bạn rất nhiều! 🌟🎁`
    }
  ]
};

// --------------------------------------------------------------------------
// 2. TẠO & HIỂN THỊ NỘI DUNG LÁ THƯ
// --------------------------------------------------------------------------
function handleOpenLetter() {
  const nameInput = document.getElementById('userName');
  const ageInput = document.getElementById('userAge');
  const relationInput = document.getElementById('userRelation');
  const memoryInput = document.getElementById('userMemory');

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const relation = relationInput.value || 'bestie';
  const memory = memoryInput.value.trim();

  if (!name) {
    alert('Vui lòng nhập tên của bạn nhé!');
    nameInput.focus();
    return;
  }

  currentFormData = {
    name: name,
    age: age,
    relation: relation,
    memory: memory,
    messageIndex: 0
  };

  renderLetterContent();

  // Hiển thị phần phong bì thư
  const letterSection = document.getElementById('letterDisplaySection');
  letterSection.classList.remove('hidden');

  // Cuộn mượt tới phong bì
  letterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Tự động mở phong bì sau 400ms để tạo cảm giác bất ngờ
  setTimeout(() => {
    triggerLetterReveal();
  }, 500);
}

function renderLetterContent() {
  const { name, age, relation, memory, messageIndex } = currentFormData;

  const msgList = RELATION_MESSAGES[relation] || RELATION_MESSAGES.bestie;
  const activeTemplate = msgList[messageIndex % msgList.length];

  // Tiêu đề gửi
  const salutationEl = document.getElementById('letterSalutation');
  salutationEl.textContent = activeTemplate.salutation(name);

  // Thân thư
  const bodyEl = document.getElementById('letterBody');
  let bodyHtml = '';

  activeTemplate.paragraphs.forEach(p => {
    bodyHtml += `<p>${p}</p>`;
  });

  // Nếu người dùng có nhập kỉ niệm riêng, lồng ghép thêm một đoạn nhấn mạnh
  if (memory) {
    bodyHtml += `
      <p>
        Điềm vẫn luôn ghi nhớ kỉ niệm: <span class="letter-highlight">"${escapeHtml(memory)}"</span>. 
        Mỗi lần nghĩ lại, lòng Điềm đều cảm thấy ấm áp vô cùng và mỉm cười một mình đấy!
      </p>
    `;
  }

  // Nếu có tuổi, thêm lời xưng hô thân mật
  if (age) {
    bodyHtml += `
      <p style="font-size: 0.95rem; color: #64748b; font-style: italic;">
        (Dù ở độ tuổi ${escapeHtml(age)} hay bao nhiêu tuổi đi nữa, chúc chúng ta mãi giữ trọn trái tim chân thành và nụ cười rạng rỡ này nhé!)
      </p>
    `;
  }

  bodyEl.innerHTML = bodyHtml;

  // Lời chúc riêng
  const blessingEl = document.getElementById('letterBlessingContent');
  blessingEl.textContent = activeTemplate.blessing;

  // Cập nhật ngày tháng hiện tại
  const dateEl = document.getElementById('letterDate');
  const today = new Date();
  const dayStr = `${today.getDate()} tháng ${today.getMonth() + 1}, ${today.getFullYear()}`;
  dateEl.textContent = `Ngày ${dayStr} • Viết từ trái tim Điềm Dler`;
}

// Kích hoạt hiệu ứng mở phong bì và pháo hoa giấy
function triggerLetterReveal() {
  const envelope = document.getElementById('envelope');
  const paperCard = document.getElementById('letterPaperCard');

  if (!envelope.classList.contains('open')) {
    envelope.classList.add('open');

    // Pháo hoa ăn mừng
    fireBigConfetti();

    // Hiện bức thư sau khi nắp phong bì lật mở
    setTimeout(() => {
      paperCard.classList.remove('hidden');
      paperCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);

    // Bật nhạc nếu chưa bật
    if (!isAudioPlaying) {
      toggleBirthdayMusic();
    }
  }
}

// Đổi lời chúc khác (Dice button)
function generateAnotherMessage() {
  currentFormData.messageIndex++;
  renderLetterContent();
  fireMiniConfetti();

  const paperCard = document.getElementById('letterPaperCard');
  paperCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Reset form để nhập cho người khác
function resetFormForAnother() {
  document.getElementById('userName').value = '';
  document.getElementById('userAge').value = '';
  document.getElementById('userMemory').value = '';
  document.getElementById('userRelation').selectedIndex = 0;

  const letterSection = document.getElementById('letterDisplaySection');
  const envelope = document.getElementById('envelope');
  const paperCard = document.getElementById('letterPaperCard');

  envelope.classList.remove('open');
  paperCard.classList.add('hidden');
  letterSection.classList.add('hidden');

  document.getElementById('formSection').scrollIntoView({ behavior: 'smooth' });
}

function scrollToGuestbook() {
  const gbSection = document.getElementById('guestbookSection');
  gbSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Tự điền tên người đang đọc thư vào ô tác giả lời chúc
  const authorInput = document.getElementById('gbAuthor');
  if (!authorInput.value && currentFormData.name) {
    authorInput.value = currentFormData.name;
  }
}

// --------------------------------------------------------------------------
// 3. HIỆU ỨNG PHÁO HOA CONFETTI (CANVAS-CONFETTI)
// --------------------------------------------------------------------------
function fireBigConfetti() {
  if (typeof confetti === 'function') {
    // Trận mưa pháo hoa hai bên góc màn hình
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#38bdf8']
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }
}

function fireMiniConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// --------------------------------------------------------------------------
// 4. BẬT/TẮT NHẠC SINH NHẬT BẰNG WEB AUDIO SYNTHESIZER
// Hoạt động 100% offline, không phụ thuộc link MP3 bên ngoài
// --------------------------------------------------------------------------
let audioCtx = null;
let isAudioPlaying = false;
let musicTimer = null;

const BIRTHDAY_NOTES = [
  // G4, G4, A4, G4, C5, B4
  { note: 392.00, dur: 0.35 }, { note: 392.00, dur: 0.25 }, { note: 440.00, dur: 0.6 },
  { note: 392.00, dur: 0.6 },  { note: 523.25, dur: 0.6 },  { note: 493.88, dur: 1.1 },

  // G4, G4, A4, G4, D5, C5
  { note: 392.00, dur: 0.35 }, { note: 392.00, dur: 0.25 }, { note: 440.00, dur: 0.6 },
  { note: 392.00, dur: 0.6 },  { note: 587.33, dur: 0.6 },  { note: 523.25, dur: 1.1 },

  // G4, G4, G5, E5, C5, B4, A4
  { note: 392.00, dur: 0.35 }, { note: 392.00, dur: 0.25 }, { note: 783.99, dur: 0.6 },
  { note: 659.25, dur: 0.6 },  { note: 523.25, dur: 0.6 },  { note: 493.88, dur: 0.6 }, { note: 440.00, dur: 1.0 },

  // F5, F5, E5, C5, D5, C5
  { note: 698.46, dur: 0.35 }, { note: 698.46, dur: 0.25 }, { note: 659.25, dur: 0.6 },
  { note: 523.25, dur: 0.6 },  { note: 587.33, dur: 0.6 },  { note: 523.25, dur: 1.4 }
];

function playKalimbaNote(freq, duration, startTime) {
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Tạo âm sắc ấm áp giống chiếc hộp nhạc (Music Box / Kalimba)
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, startTime);

  // Envelope mềm mại
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.1);
}

function playBirthdayMelodyLoop() {
  if (!isAudioPlaying || !audioCtx) return;

  let now = audioCtx.currentTime + 0.1;
  let totalTime = 0;

  BIRTHDAY_NOTES.forEach((item) => {
    playKalimbaNote(item.note, item.dur * 1.1, now + totalTime);
    totalTime += item.dur * 0.75;
  });

  // Lặp lại sau khi hết bài + 1.5 giây nghỉ ngơi
  musicTimer = setTimeout(() => {
    if (isAudioPlaying) {
      playBirthdayMelodyLoop();
    }
  }, (totalTime + 1.5) * 1000);
}

function toggleBirthdayMusic() {
  const musicText = document.getElementById('musicText');
  const musicIcon = document.getElementById('musicIconAnim');

  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  isAudioPlaying = !isAudioPlaying;

  if (isAudioPlaying) {
    musicText.textContent = 'Đang Phát Nhạc 🎶';
    musicIcon.classList.add('playing');
    playBirthdayMelodyLoop();
  } else {
    musicText.textContent = 'Bật Nhạc Sinh Nhật';
    musicIcon.classList.remove('playing');
    if (musicTimer) clearTimeout(musicTimer);
  }
}

// --------------------------------------------------------------------------
// 5. THỔI NẾN BÁNH KEM (BLOW CANDLE INTERACTION)
// --------------------------------------------------------------------------
let isCandleBlown = false;

function blowCandle() {
  if (isCandleBlown) return;

  const flame = document.getElementById('candleFlame');
  const smoke = document.getElementById('candleSmoke');
  const hint = document.getElementById('cakeHint');
  const wishBox = document.getElementById('wishRevealBox');

  // Tắt ngọn lửa
  flame.classList.add('hidden');
  smoke.classList.remove('hidden');
  isCandleBlown = true;

  hint.innerHTML = '🎉 <strong>Nến đã được thổi tắt!</strong> Cảm ơn bạn rất nhiều! 🎉';
  wishBox.classList.remove('hidden');

  fireBigConfetti();
}

// --------------------------------------------------------------------------
// 6. SỔ LƯU BÚT (GUESTBOOK) VỚI LOCALSTORAGE
// --------------------------------------------------------------------------
const STORAGE_KEY = 'diem_dler_birthday_guestbook_v1';

const INITIAL_WISHES = [
  {
    id: 1,
    author: 'Hải Nam (Tri Kỷ)',
    message: 'Chúc mừng sinh nhật Điềm Dler! Tuổi mới chúc người anh em luôn tràn đầy đam mê, công việc bứt phá, tài lộc đầy nhà và sớm có người yêu nhé! 🎂🔥',
    time: 'Vừa xong',
    likes: 12
  },
  {
    id: 2,
    author: 'Lan Anh (Bạn Cấp 3)',
    message: 'Happy Birthday Điềm nha! Cảm ơn vì bức thư quá đỗi ấm áp. Chúc Điềm luôn giữ nụ cười tươi rói như thời đi học, luôn vui vẻ và bình an! ✨🎈',
    time: '15 phút trước',
    likes: 8
  },
  {
    id: 3,
    author: 'Chiến Hữu Dev Team',
    message: 'Chúc Điềm tuổi mới code không bug, fix đâu dính đó, lương x2 x3 và luôn giữ vững phong độ đỉnh cao! Happy Birthday bro! 💻🚀',
    time: '1 giờ trước',
    likes: 15
  }
];

function getGuestbookWishes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return INITIAL_WISHES;
}

function saveGuestbookWishes(wishes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function renderGuestbook() {
  const wishes = getGuestbookWishes();
  const grid = document.getElementById('guestbookMessagesGrid');
  const countEl = document.getElementById('gbCount');

  countEl.textContent = wishes.length;

  grid.innerHTML = wishes.map(wish => `
    <div class="gb-card">
      <div class="gb-card-top">
        <div class="gb-avatar">${escapeHtml(wish.author.charAt(0).toUpperCase())}</div>
        <div class="gb-author-info">
          <div class="gb-author-name">${escapeHtml(wish.author)}</div>
          <div class="gb-time">${wish.time}</div>
        </div>
      </div>
      <div class="gb-message-text">${escapeHtml(wish.message)}</div>
      <div class="gb-card-footer">
        <button class="gb-like-btn" onclick="likeWish(${wish.id})">
          ❤️ ${wish.likes} Thích
        </button>
      </div>
    </div>
  `).join('');
}

function submitGuestbookWish() {
  const authorInput = document.getElementById('gbAuthor');
  const msgInput = document.getElementById('gbMessage');

  const author = authorInput.value.trim() || 'Người bạn giấu tên';
  const message = msgInput.value.trim();

  if (!message) {
    alert('Hãy viết đôi dòng nhắn nhủ gửi Điềm nhé! 💌');
    msgInput.focus();
    return;
  }

  const wishes = getGuestbookWishes();
  const newWish = {
    id: Date.now(),
    author: author,
    message: message,
    time: 'Vừa xong',
    likes: 1
  };

  wishes.unshift(newWish);
  saveGuestbookWishes(wishes);
  renderGuestbook();

  msgInput.value = '';
  fireMiniConfetti();
  alert('Cảm ơn bạn! Lời chúc tuyệt vời của bạn đã được gửi đến Điềm Dler rồi nhé! ❤️');
}

function likeWish(id) {
  const wishes = getGuestbookWishes();
  const wish = wishes.find(w => w.id === id);
  if (wish) {
    wish.likes++;
    saveGuestbookWishes(wishes);
    renderGuestbook();
  }
}

function addEmojiToGB(emoji) {
  const msgInput = document.getElementById('gbMessage');
  msgInput.value += ` ${emoji} `;
  msgInput.focus();
}

// --------------------------------------------------------------------------
// 7. TẢI LÁ THƯ VỀ MÁY (DOWNLOAD CARD AS IMAGE)
// --------------------------------------------------------------------------
function downloadLetterAsImage() {
  const card = document.getElementById('letterPaperCard');
  const actionsBar = document.querySelector('.letter-actions-bar');

  // Ẩn tạm thanh nút bấm để ảnh tải về sạch sẽ và thẩm mỹ nhất
  actionsBar.style.display = 'none';

  if (typeof html2canvas === 'function') {
    html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fffdfa'
    }).then(canvas => {
      actionsBar.style.display = 'flex';

      const link = document.createElement('a');
      link.download = `Thu-Tri-An-Diem-Dler-${currentFormData.name || 'Ban'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      actionsBar.style.display = 'flex';
      console.error(err);
      alert('Không thể xuất ảnh trực tiếp, bạn có thể chụp màn hình lại nhé!');
    });
  } else {
    actionsBar.style.display = 'flex';
    window.print();
  }
}

// --------------------------------------------------------------------------
// 8. GÓC KỈ NIỆM CỦA BẠN & ĐIỀM DLER (ĐĂNG ẢNH & CUỐN SỔ KÍ ỨC)
// --------------------------------------------------------------------------
const STORAGE_KEY_MEMORIES = 'diem_dler_shared_memories_v1';
let currentMemoryImage = null;

const INITIAL_MEMORIES = [
  {
    id: 101,
    author: 'Hải Nam & Hội Bạn Thân',
    title: 'Chuyến phượt săn mây cùng Điềm',
    date: 'Mùa hè 2024',
    story: 'Nhớ mãi lần đi phượt cùng Điềm, vừa leo dốc vừa cười muốn xỉu! Chúc người anh em sinh nhật thật bùng nổ và luôn rực rỡ nhé! 🚀🔥',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    likes: 18,
    createdAt: '18/09/2026'
  },
  {
    id: 102,
    author: 'Lan Anh (Bạn Cấp 3)',
    title: 'Kỉ niệm buổi cà phê chuyện trò thanh xuân',
    date: 'Đầu năm 2024',
    story: 'Cảm ơn Điềm vì luôn là một người bạn ấm áp, luôn lắng nghe mỗi khi cần. Chúc Điềm tuổi mới vạn sự như ý, sớm đạt được mọi ước mơ! ✨💖',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
    likes: 14,
    createdAt: '18/09/2026'
  }
];

function scrollToMemorySection() {
  const memSection = document.getElementById('memorySection');
  memSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Tự điền tên người đang đọc thư vào ô tác giả
  const authorInput = document.getElementById('memAuthor');
  if (!authorInput.value && currentFormData.name) {
    authorInput.value = currentFormData.name;
  }
}

function handleMemoryFileSelect(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      // Nén ảnh bằng canvas phía client để lưu trữ mượt mà trong LocalStorage
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const MAX_SIZE = 900;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      currentMemoryImage = canvas.toDataURL('image/jpeg', 0.82);

      // Hiển thị khung xem trước
      document.getElementById('previewImg').src = currentMemoryImage;
      document.getElementById('dropzoneContent').classList.add('hidden');
      document.getElementById('dropzonePreview').classList.remove('hidden');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeMemoryPreview() {
  currentMemoryImage = null;
  document.getElementById('memPhotoInput').value = '';
  document.getElementById('previewImg').src = '';
  document.getElementById('dropzoneContent').classList.remove('hidden');
  document.getElementById('dropzonePreview').classList.add('hidden');
}

function getSharedMemories() {
  const saved = localStorage.getItem(STORAGE_KEY_MEMORIES);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return INITIAL_MEMORIES;
}

function saveSharedMemories(memories) {
  localStorage.setItem(STORAGE_KEY_MEMORIES, JSON.stringify(memories));
}

function renderSharedMemories() {
  const memories = getSharedMemories();
  const grid = document.getElementById('memoryGrid');
  const countEl = document.getElementById('memoryCount');

  countEl.textContent = memories.length;

  grid.innerHTML = memories.map(mem => `
    <div class="memory-card">
      <div class="memory-card-tape"></div>
      <div class="memory-card-img-wrap" onclick="openLightbox('${escapeHtml(mem.image)}', '${escapeHtml(mem.title)} - Đăng bởi ${escapeHtml(mem.author)}')">
        <img src="${escapeHtml(mem.image)}" alt="${escapeHtml(mem.title)}" loading="lazy">
        <div class="memory-zoom-hint">
          <i data-lucide="zoom-in" style="width:13px;height:13px"></i> Xem to
        </div>
      </div>
      <div class="memory-card-body">
        <div class="memory-card-title">${escapeHtml(mem.title)}</div>
        <div class="memory-card-meta">
          <span class="mem-author-badge">👤 ${escapeHtml(mem.author)}</span>
          ${mem.date ? `• <span class="mem-date-badge">${escapeHtml(mem.date)}</span>` : ''}
        </div>
        <div class="memory-card-story">${escapeHtml(mem.story || '')}</div>
        <div class="memory-card-footer">
          <button class="mem-like-btn" onclick="likeMemory(${mem.id})">
            ❤️ ${mem.likes || 1} Thích
          </button>
          <button class="mem-del-btn" onclick="deleteMemory(${mem.id})" title="Xóa kỉ niệm này">
            Xóa
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function submitSharedMemory() {
  const authorInput = document.getElementById('memAuthor');
  const titleInput = document.getElementById('memTitle');
  const dateInput = document.getElementById('memDate');
  const storyInput = document.getElementById('memStory');

  const author = authorInput.value.trim();
  const title = titleInput.value.trim();
  const date = dateInput.value.trim();
  const story = storyInput.value.trim();

  if (!author) {
    alert('Vui lòng nhập tên của bạn nhé!');
    authorInput.focus();
    return;
  }
  if (!title) {
    alert('Vui lòng nhập tiêu đề bức ảnh hoặc kỉ niệm nhé!');
    titleInput.focus();
    return;
  }
  if (!currentMemoryImage) {
    alert('Vui lòng chọn 1 tấm ảnh chụp cùng Điềm hoặc kỉ niệm nhé!');
    document.getElementById('memPhotoInput').click();
    return;
  }

  const memories = getSharedMemories();
  const newMemory = {
    id: Date.now(),
    author: author,
    title: title,
    date: date || 'Kỉ niệm đẹp',
    story: story,
    image: currentMemoryImage,
    likes: 1,
    createdAt: new Date().toLocaleDateString('vi-VN')
  };

  memories.unshift(newMemory);
  saveSharedMemories(memories);
  renderSharedMemories();

  // Reset form
  titleInput.value = '';
  dateInput.value = '';
  storyInput.value = '';
  removeMemoryPreview();

  fireBigConfetti();
  alert('🎉 Bức ảnh kỉ niệm tuyệt vời của bạn đã được lưu vào cuốn sổ kí ức cùng Điềm Dler rồi nhé! Cảm ơn bạn rất nhiều! ❤️');
}

function likeMemory(id) {
  const memories = getSharedMemories();
  const mem = memories.find(m => m.id === id);
  if (mem) {
    mem.likes = (mem.likes || 0) + 1;
    saveSharedMemories(memories);
    renderSharedMemories();
  }
}

function deleteMemory(id) {
  if (confirm('Bạn có chắc muốn xóa ảnh kỉ niệm này khỏi danh sách không?')) {
    let memories = getSharedMemories();
    memories = memories.filter(m => m.id !== id);
    saveSharedMemories(memories);
    renderSharedMemories();
  }
}

// --------------------------------------------------------------------------
// 9. LIGHTBOX MODAL (PHÓNG TO ẢNH ĐIỀM DLER & ẢNH KỈ NIỆM)
// --------------------------------------------------------------------------
function openLightbox(src, caption) {
  const modal = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = src;
    cap.textContent = caption || '';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('imageLightbox');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Lắng nghe phím ESC để đóng Lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// --------------------------------------------------------------------------
// HELPER FUNCTIONS & INITIALIZATION
// --------------------------------------------------------------------------
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  // Init Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Render Guestbook
  renderGuestbook();

  // Render Shared Memories Wall
  renderSharedMemories();

  // Music Button listener
  document.getElementById('musicToggleBtn').addEventListener('click', toggleBirthdayMusic);
});
