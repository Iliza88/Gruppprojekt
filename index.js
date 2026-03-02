// ===== 1) Данные персонала (меняй под себя) =====
const staff = [
  { name: "Jaber", role: "Roll / Titel", email: "Jaber@bawabet-amel.com" },
  { name: "Peier", role: "Roll / Titel", email: "Peier@bawabet-amel.com" },
  { name: "Jon", role: "Roll / Titel", email: "jon@bawabet-amel.com" },
  { name: "Iliza", role: "Service", email: "Iliza@bawabet-amel.com", highlight: true }
];

// ===== 2) Рендер карточек персонала =====
function renderStaff() {
  const grid = document.getElementById("staffGrid");
  if (!grid) return;

  grid.innerHTML = ""; // очистить

  staff.forEach(person => {
    const card = document.createElement("div");
    card.className = "staff-card";

    // можно визуально выделить "service contact"
    if (person.highlight) card.style.border = "2px solid #222";

    card.innerHTML = `
      <div>
        <h4>${person.name}</h4>
        <p>${person.role}</p>
      </div>
      <button type="button">Contact</button>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      // Вариант 1: открыть mailto
      const subject = encodeURIComponent(`Message for ${person.name}`);
      const body = encodeURIComponent(`Hi ${person.name},\n\n`);
      window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
    });

    grid.appendChild(card);
  });
}

renderStaff();

// ===== 3) Плавная прокрутка по меню =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ===== 4) Service booking: дата + валидация + "отправка" =====
const serviceForm = document.getElementById("serviceForm");
const bookingDate = document.getElementById("bookingDate");
const customerName = document.getElementById("customerName");
const customerMsg = document.getElementById("customerMsg");
const serviceStatus = document.getElementById("serviceStatus");

// запретим выбирать прошлые даты
if (bookingDate) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  bookingDate.min = `${yyyy}-${mm}-${dd}`;
}

if (serviceForm) {
  serviceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    serviceStatus.textContent = "";

    const dateVal = bookingDate.value;
    const nameVal = customerName.value.trim();
    const msgVal = customerMsg.value.trim();

    if (!dateVal || !nameVal || !msgVal) {
      serviceStatus.textContent = "Please fill in all fields.";
      serviceStatus.style.color = "crimson";
      return;
    }

    // Доп. проверка: дата не в прошлом (на всякий)
    const selected = new Date(dateVal + "T00:00:00");
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (selected < now) {
      serviceStatus.textContent = "Date cannot be in the past.";
      serviceStatus.style.color = "crimson";
      return;
    }

    // Тут обычно отправка на сервер (fetch/AJAX).
    // Пока сделаем имитацию:
    serviceStatus.textContent = "Booking request sent! We will contact you soon.";
    serviceStatus.style.color = "green";

    serviceForm.reset();

    // вернуть min (reset сбрасывает value, но min остаётся)
    if (bookingDate?.min) bookingDate.min = bookingDate.min;
  });
}
