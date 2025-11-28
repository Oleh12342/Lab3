// ---------------- Типи ----------------
// ---------------- Форматування ----------------
// Робить ім'я у форматі Title Case
function formatName(name) {
    const trimmed = name.trim();
    if (!trimmed)
        return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}
// ---------------- Валідація окремих полів ----------------
// 1. Валідація імені
function validateName(name) {
    const formatted = formatName(name);
    // мінімум 2 символи
    if (formatted.length < 2)
        return false;
    // тільки літери (укр / латиниця)
    const regex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/;
    if (!regex.test(formatted))
        return false;
    // ім'я має починатися з великої літери
    if (formatted[0] !== formatted[0].toUpperCase())
        return false;
    return true;
}
// 2. Валідація Email з дозволеними доменами
function validateEmail(email) {
    email = email.trim().toLowerCase();
    if (!email.includes("@"))
        return false;
    const parts = email.split("@");
    if (parts.length !== 2)
        return false;
    const domain = parts[1];
    // Дозволені домени
    const allowedDomains = ["gmail.com", "ukr.net"];
    // Перевірка чи домен входить до дозволених
    if (!allowedDomains.includes(domain)) {
        return false;
    }
    // Мінімальна перевірка: домен має містити крапку
    if (!domain.includes("."))
        return false;
    return true;
}
// 3. Валідація consent
function validateConsent(consent) {
    return consent === true;
}
// ---------------- Основна функція ----------------
function validateForm(data) {
    const errors = [];
    if (!validateName(data.name)) {
        errors.push("Некоректне ім'я");
    }
    if (!validateEmail(data.email)) {
        errors.push("Некоректний формат e-mail");
    }
    if (!validateConsent(data.consent)) {
        errors.push("Користувач має погодитися з умовами");
    }
    return errors;
}