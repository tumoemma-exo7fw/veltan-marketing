/**
 * Uganda phone typing helpers for the booking form.
 * Display stays human (`0777 968 947` / `+256 777 968 947`);
 * links and validation use digits only.
 */

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidBusinessPhone(value: string): boolean {
  return phoneDigits(value).length >= 9;
}

function formatLocalUg(digits: string): string {
  if (digits.startsWith("0")) {
    const d = digits.slice(0, 10);
    if (d.length <= 4) return d;
    if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
    return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  }
  const d = digits.slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
}

function formatIntlUg(national: string): string {
  const d = national.slice(0, 9);
  if (d.length === 0) return "+256";
  if (d.length <= 3) return `+256 ${d}`;
  if (d.length <= 6) return `+256 ${d.slice(0, 3)} ${d.slice(3)}`;
  return `+256 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
}

/** Format a finished or in-progress Uganda number for the text field. */
export function formatUgPhoneInput(raw: string): string {
  if (!raw) return "";

  const plus = raw.trimStart().startsWith("+");
  const digits = phoneDigits(raw);

  if (plus && digits.length === 0) return "+";
  if (plus && digits === "2") return "+2";
  if (plus && digits === "25") return "+25";

  if (plus && digits.startsWith("0")) {
    return `+${formatLocalUg(digits)}`;
  }

  if (plus || digits.startsWith("256")) {
    const national = digits.startsWith("256") ? digits.slice(3) : digits;
    return formatIntlUg(national);
  }

  return formatLocalUg(digits);
}

export function caretAfterDigits(
  formatted: string,
  digitsBefore: number,
  keepLeadingPlus: boolean,
): number {
  if (digitsBefore <= 0) {
    return keepLeadingPlus && formatted.startsWith("+") ? 1 : 0;
  }
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i] ?? "")) {
      seen += 1;
      if (seen >= digitsBefore) return i + 1;
    }
  }
  return formatted.length;
}

/**
 * Apply live spacing, and treat backspace on a separator as deleting
 * the digit before it (otherwise the space immediately comes back).
 */
export function applyUgPhoneInput(
  previous: string,
  raw: string,
  caret: number,
): { value: string; caret: number } {
  const prevDigits = phoneDigits(previous);
  const rawDigits = phoneDigits(raw);
  const shrinking = raw.length < previous.length;
  const deletedSeparator = shrinking && rawDigits === prevDigits && prevDigits.length > 0;

  let digits = rawDigits;
  let digitsBefore = phoneDigits(raw.slice(0, caret)).length;

  if (deletedSeparator) {
    if (digitsBefore > 0) {
      digits = prevDigits.slice(0, digitsBefore - 1) + prevDigits.slice(digitsBefore);
      digitsBefore -= 1;
    } else {
      digits = prevDigits.slice(1);
    }
  }

  const keepPlus =
    raw.trimStart().startsWith("+") ||
    (previous.startsWith("+") && digits.startsWith("256")) ||
    (previous.startsWith("+") && shrinking && digits.length > 0 && !digits.startsWith("0"));

  const seed = keepPlus && !digits.startsWith("256") ? `+${digits}` : digits;
  const value = formatUgPhoneInput(keepPlus && digits.length === 0 ? "+" : seed);

  return {
    value,
    caret: caretAfterDigits(value, digitsBefore, value.startsWith("+")),
  };
}
