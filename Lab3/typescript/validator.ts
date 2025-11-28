// ---------------- Типи ----------------

export interface FormData {
    name: string;
    email: string;
    consent: boolean;
}

export type ValidationResult = "ok" | "error";


// ---------------- Форматування ----------------

// Робить ім'я у форматі Title Case
export function formatName(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}


// ---------------- Валідація окремих полів ----------------

// 1. Валідація імені
export function validateName(name: string): boolean {
    const formatted = formatName(name);

    // мінімум 2 символи
    if (formatted.length < 2) return false;

    // тільки літери (укр / латиниця)
    const regex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/;
    if (!regex.test(formatted)) return false;

    // ім'я має починатися з великої літери
    if (formatted[0] !== formatted[0].toUpperCase()) return false;

    return true;
}


// 2. Валідація Email з дозволеними доменами
export function validateEmail(email: string): boolean {
    email = email.trim().toLowerCase();

    if (!email.includes("@")) return false;

    const parts = email.split("@");
    if (parts.length !== 2) return false;

    const domain = parts[1];

    // Дозволені домени
    const allowedDomains = ["gmail.com", "ukr.net"];

    // Перевірка чи домен входить до дозволених
    if (!allowedDomains.includes(domain)) {
        return false;
    }

    // Мінімальна перевірка: домен має містити крапку
    if (!domain.includes(".")) return false;

    return true;
}


// 3. Валідація consent
export function validateConsent(consent: boolean): boolean {
    return consent === true;
}


// ---------------- Основна функція ----------------

export function validateForm(data: FormData): string[] {
    const errors: string[] = [];

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
