const yearTarget = document.getElementById("year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const copyToast = document.getElementById("copy-toast");

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const maxLinks = document.querySelectorAll("[data-max-link]");
let toastTimer;

maxLinks.forEach((link) => {
  link.addEventListener("click", async () => {
    const copyText = link.dataset.copyText;

    if (copyText && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(copyText);
      } catch (error) {
        // Clipboard access can be blocked by browser settings; opening MAX still works.
      }
    }

    if (copyToast) {
      copyToast.classList.add("is-visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        copyToast.classList.remove("is-visible");
      }, 2400);
    }
  });
});

const form = document.getElementById("request-form");
const note = document.getElementById("form-note");

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString().trim();
    const phone = (formData.get("phone") || "").toString().trim();

    if (!name || !phone) {
      note.textContent = "Заполните имя и телефон, чтобы мы могли вернуться к заявке.";
      note.classList.remove("is-success");
      return;
    }

    note.textContent = "Спасибо! Заявка сохранена в демо-форме. Перед публикацией подключим отправку в почту или CRM.";
    note.classList.add("is-success");
    form.reset();
  });
}
