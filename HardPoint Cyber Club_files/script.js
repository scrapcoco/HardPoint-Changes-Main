const canvas = document.querySelector("#arena");
const ctx = canvas.getContext("2d", { alpha: true });
const sections = [...document.querySelectorAll(".section-screen")];
const languageButtons = [...document.querySelectorAll("[data-lang]")];
const discordOnline = document.querySelector("[data-discord-online]");
const discordMembers = document.querySelector("[data-discord-members]");
const discordNote = document.querySelector("[data-discord-note]");
const discordLinks = [...document.querySelectorAll("[data-discord-link]")];

const DISCORD_WIDGET_URL = "https://discord.com/api/guilds/1423444368819359756/widget.json";
const DISCORD_INVITE_URL = "https://discord.com/api/v10/invites";

const translations = {
  pl: {
    lang: "pl",
    metaDescription:
      "HardPoint Cyber Club - klub komputerowy ze strefami gamingowymi, karnetami i rezerwacją online.",
    headerAria: "Główna nawigacja",
    linksAria: "Linki HardPoint Cyber Club",
    languageAria: "Wybór języka",
    navBooking: "Rezerwacja",
    navPasses: "Karnety",
    navContacts: "Kontakt",
    topCall: "Zadzwoń",
    heroLead:
      "Miejsce, w którym gra brzmi mocniej niż zwykły wieczór: wydajne stanowiska, turniejowy klimat i szybkie wejście do rozgrywki.",
    bookingEyebrow: "01 / Rezerwacja",
    bookingTitle: "Wybierz godzinę. Zajmij stanowisko. Gra startuje bez kolejki.",
    bookingCardTitle: "Rezerwacja",
    bookingCardText: "Wolne stanowiska, wieczorne sesje i szybki start dla ekipy.",
    bookingButton: "Rezerwuj",
    bookingButtonAria: "Zadzwoń, aby zarezerwować",
    passesEyebrow: "02 / Karnety",
    passesTitle: "Godzina, noc albo regularne treningi - wybierz tryb dla swojej drużyny.",
    passStartTitle: "3 godziny",
    passStartText: "Na krótką sesję po szkole albo pracy.",
    passSquadTitle: "10 godzin",
    passSquadText: "Wygodne dla stałych graczy i treningów duo.",
    passNightTitle: "Noc",
    passNightText: "Długa sesja, maksimum klimatu i pełne skupienie.",
    contactsEyebrow: "03 / Kontakt",
    contactsTitle: "Znajdź nas, napisz w socialach albo zbierz ekipę na wieczór.",
    discordTitle: "HardPoint community",
    discordText: "Sprawdź, kto jest online, i dołącz do rozmowy przed grą.",
    discordOnline: "online now",
    discordMembers: "members",
    discordLoading: "Ładowanie statusu Discord...",
    discordUnavailable:
      "Widget Discord jest wyłączony. Włącz Server Widget w ustawieniach serwera Discord, aby pokazać liczby.",
    discordJoin: "Join Discord",
    footerHours: "Codziennie / 12:00 - 02:00",
  },
  en: {
    lang: "en",
    metaDescription:
      "HardPoint Cyber Club - a PC gaming club with gaming zones, passes, and online booking.",
    headerAria: "Main navigation",
    linksAria: "HardPoint Cyber Club links",
    languageAria: "Language selection",
    navBooking: "Booking",
    navPasses: "Passes",
    navContacts: "Contact",
    topCall: "Call",
    heroLead:
      "A place where the game hits harder than a regular night: powerful stations, tournament energy, and a fast jump into the match.",
    bookingEyebrow: "01 / Booking",
    bookingTitle: "Choose a time. Take a station. Start playing without the queue.",
    bookingCardTitle: "Booking",
    bookingCardText: "Available stations, evening sessions, and a quick start for your squad.",
    bookingButton: "Book now",
    bookingButtonAria: "Call to book",
    passesEyebrow: "02 / Passes",
    passesTitle: "One hour, all night, or regular training - pick the mode for your team.",
    passStartTitle: "3 hours",
    passStartText: "For a short session after school or work.",
    passSquadTitle: "10 hours",
    passSquadText: "Great for regular players and duo practice.",
    passNightTitle: "Night",
    passNightText: "A long session, maximum atmosphere, and full focus.",
    contactsEyebrow: "03 / Contact",
    contactsTitle: "Find us, message us on socials, or gather your team for the evening.",
    discordTitle: "HardPoint community",
    discordText: "See who is online and join the chat before the match.",
    discordOnline: "online now",
    discordMembers: "members",
    discordLoading: "Loading Discord status...",
    discordUnavailable:
      "Discord widget is disabled. Enable Server Widget in Discord server settings to show the counts.",
    discordJoin: "Join Discord",
    footerHours: "Open daily / 12:00 - 02:00",
  },
  uk: {
    lang: "uk",
    metaDescription:
      "HardPoint Cyber Club - комп'ютерний клуб з ігровими зонами, абонементами та онлайн-бронюванням.",
    headerAria: "Головна навігація",
    linksAria: "Посилання HardPoint Cyber Club",
    languageAria: "Вибір мови",
    navBooking: "Бронювання",
    navPasses: "Абонементи",
    navContacts: "Контакти",
    topCall: "Подзвонити",
    heroLead:
      "Місце, де гра звучить сильніше за звичайний вечір: потужні станції, турнірна атмосфера і швидкий старт матчу.",
    bookingEyebrow: "01 / Бронювання",
    bookingTitle: "Обери час. Займи станцію. Гра починається без черги.",
    bookingCardTitle: "Бронювання",
    bookingCardText: "Вільні місця, вечірні сесії та швидкий старт для команди.",
    bookingButton: "Забронювати",
    bookingButtonAria: "Подзвонити для бронювання",
    passesEyebrow: "02 / Абонементи",
    passesTitle: "Година, ніч або регулярні тренування - обери режим для своєї команди.",
    passStartTitle: "3 години",
    passStartText: "Для короткої сесії після навчання або роботи.",
    passSquadTitle: "10 годин",
    passSquadText: "Зручно для постійних гравців і тренувань удвох.",
    passNightTitle: "Ніч",
    passNightText: "Довга сесія, максимум атмосфери і повний фокус.",
    contactsEyebrow: "03 / Контакти",
    contactsTitle: "Знайди нас, напиши в соцмережах або збери команду на вечір.",
    discordTitle: "Спільнота HardPoint",
    discordText: "Подивись, хто онлайн, і приєднуйся до чату перед грою.",
    discordOnline: "онлайн зараз",
    discordMembers: "учасників",
    discordLoading: "Завантаження статусу Discord...",
    discordUnavailable:
      "Discord-віджет вимкнено. Увімкни Server Widget у налаштуваннях Discord-сервера, щоб показати цифри.",
    discordJoin: "Приєднатись",
    footerHours: "Щодня / 12:00 - 02:00",
  },
};

let width = 0;
let height = 0;
let scrollProgress = 0;
let pointerX = 0.5;
let pointerY = 0.5;
let nodes = [];

const palette = ["#ffdd3d", "#f4f4f4", "#8f8f86", "#3f3f3d"];

function setLanguage(language) {
  const dictionary = translations[language] || translations.pl;
  document.documentElement.lang = dictionary.lang;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", dictionary.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (dictionary[key]) element.setAttribute("aria-label", dictionary[key]);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === dictionary.lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("hardpoint-language", dictionary.lang);
  } catch {
    // The site still works if browser storage is unavailable.
  }
}

function getSavedLanguage() {
  try {
    return localStorage.getItem("hardpoint-language");
  } catch {
    return null;
  }
}

async function loadDiscordStatus() {
  if (!discordOnline) return;
  const dictionary = translations[document.documentElement.lang] || translations.pl;

  try {
    const response = await fetch(DISCORD_WIDGET_URL);
    if (!response.ok) throw new Error("Discord widget unavailable");

    const data = await response.json();
    discordOnline.textContent = String(data.presence_count ?? "--");
    if (discordNote) discordNote.hidden = true;

    if (data.instant_invite) {
      discordLinks.forEach((link) => {
        link.href = data.instant_invite;
      });
      await loadDiscordMemberCount(data.instant_invite);
    }
  } catch {
    discordOnline.textContent = "--";
    if (discordMembers) discordMembers.textContent = "--";
    if (discordNote) {
      discordNote.hidden = false;
      discordNote.textContent = dictionary.discordUnavailable;
    }
  }
}

async function loadDiscordMemberCount(inviteUrl) {
  if (!discordMembers) return;

  const inviteCode = inviteUrl.split("/").filter(Boolean).pop();
  if (!inviteCode) return;

  try {
    const response = await fetch(`${DISCORD_INVITE_URL}/${inviteCode}?with_counts=true`);
    if (!response.ok) throw new Error("Discord invite unavailable");

    const data = await response.json();
    discordMembers.textContent = String(data.approximate_member_count ?? "--");
  } catch {
    discordMembers.textContent = "--";
  }
}

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(42, Math.floor((width * height) / 19000));
  nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
    size: Math.random() * 1.8 + 0.7,
    color: palette[index % palette.length],
  }));
}

function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = max > 0 ? window.scrollY / max : 0;
}

function drawGrid(time) {
  const horizon = height * (0.44 - scrollProgress * 0.08);
  const vanishingX = width * (0.5 + (pointerX - 0.5) * 0.08);
  const spacing = 54;

  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.strokeStyle = "rgba(255, 221, 61, 0.22)";
  ctx.lineWidth = 1;

  for (let i = -18; i <= 18; i += 1) {
    const startX = width / 2 + i * spacing;
    ctx.beginPath();
    ctx.moveTo(vanishingX, horizon);
    ctx.lineTo(startX + (pointerX - 0.5) * 70, height + 40);
    ctx.stroke();
  }

  for (let y = horizon; y < height + spacing; y += spacing) {
    const depth = (y - horizon) / (height - horizon);
    const wave = Math.sin(time * 0.001 + depth * 8) * 9;
    ctx.beginPath();
    ctx.moveTo(0, y + wave);
    ctx.lineTo(width, y - wave);
    ctx.stroke();
  }

  ctx.restore();
}

function drawNodes(time) {
  const linkDistance = Math.min(165, width * 0.2);

  nodes.forEach((node) => {
    node.x += node.vx + (pointerX - 0.5) * 0.08;
    node.y += node.vy + (pointerY - 0.5) * 0.08;

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;
  });

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);

      if (distance < linkDistance) {
        ctx.globalAlpha = (1 - distance / linkDistance) * 0.26;
        ctx.strokeStyle = i % 3 === 0 ? "#ffdd3d" : "#f4f4f4";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  nodes.forEach((node, index) => {
    const pulse = Math.sin(time * 0.002 + index) * 0.7;
    ctx.globalAlpha = 0.72;
    ctx.fillStyle = node.color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size + pulse, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawCore(time) {
  const x = width * (0.68 + (pointerX - 0.5) * 0.04);
  const y = height * (0.38 + (pointerY - 0.5) * 0.04);
  const rings = 5;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(time * 0.00022 + scrollProgress * 2.2);

  for (let i = 0; i < rings; i += 1) {
    const radius = 78 + i * 31 + scrollProgress * 32;
    ctx.globalAlpha = 0.26 - i * 0.025;
    ctx.strokeStyle = i % 2 ? "#ffdd3d" : "#f4f4f4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0.18 * i, Math.PI * 1.45 + i * 0.25);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.82;
  ctx.fillStyle = "#f4f4f4";
  ctx.font = "900 18px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("HARDPOINT", 0, 6);
  ctx.restore();
}

function animate(time = 0) {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "source-over";
  drawGrid(time);
  drawNodes(time);
  drawCore(time);
  requestAnimationFrame(animate);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener("resize", resize);
window.addEventListener("scroll", updateScroll, { passive: true });
window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX / window.innerWidth;
  pointerY = event.clientY / window.innerHeight;
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

resize();
updateScroll();
setLanguage(getSavedLanguage() || "pl");
loadDiscordStatus();
animate();
