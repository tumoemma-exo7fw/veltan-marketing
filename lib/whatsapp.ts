import { WHATSAPP_NUMBER } from "@/lib/site";

/** How long we wait to see if the native app took over before offering web. */
export const WHATSAPP_APP_WAIT_MS = 1500;

export function whatsappAppUrl(message: string): string {
  return `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export function whatsappWebUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function whatsappApiUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      return ok;
    } catch {
      return false;
    }
  }
}

/**
 * Open the installed WhatsApp app via the custom protocol. Prefer this over
 * `window.open` — pop-up blockers ignore same-tab protocol navigations, and
 * Desktop/mobile apps register `whatsapp://`.
 */
export function openWhatsAppApp(message: string): void {
  window.location.href = whatsappAppUrl(message);
}

/**
 * HTTPS chat (`wa.me`). `noopener` so WhatsApp Web cannot touch this page.
 * After a timeout, pop-up blockers usually win — do not navigate this tab
 * away (that would hide the next-steps panel). The in-page "Continue in
 * browser" link is a real user gesture and always works.
 */
export function openWhatsAppWeb(
  message: string,
  options?: { navigateIfBlocked?: boolean },
): void {
  const url = whatsappWebUrl(message);
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup && options?.navigateIfBlocked) {
    window.location.assign(url);
  }
}

export interface OpenWhatsAppOptions {
  message: string;
  /**
   * Called when the visitor is still on this page after the wait — the app
   * did not take over, or they came back. Show next-steps here. Never a
   * spinner that waits forever.
   */
  onNeedHelp?: () => void;
  /**
   * Wait before treating "still here" as a miss. Keep this short: a long
   * timer that *also* opens web dumps people on WhatsApp Web even when
   * Desktop already opened.
   */
  waitMs?: number;
}

/**
 * App-first open, then web only if the protocol was not handled.
 *
 * Detection: if the document hides, the page is hidden, or the window
 * blurs (Desktop took focus), we assume the app opened and **cancel** the
 * HTTPS fallback. If they are still visible *and* focused after ~1.5s, we
 * open `wa.me` and call `onNeedHelp`.
 */
export function openWhatsApp(options: OpenWhatsAppOptions): () => void {
  const { message, onNeedHelp, waitMs = WHATSAPP_APP_WAIT_MS } = options;

  let settled = false;
  let appTookOver = false;
  let timer = 0;

  const cleanup = () => {
    window.removeEventListener("blur", onLeave);
    window.removeEventListener("pagehide", onLeave);
    document.removeEventListener("visibilitychange", onVisibility);
  };

  const finish = () => {
    if (settled) return;
    settled = true;
    window.clearTimeout(timer);
    cleanup();
  };

  const onLeave = () => {
    appTookOver = true;
  };

  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      appTookOver = true;
    }
  };

  window.addEventListener("blur", onLeave);
  window.addEventListener("pagehide", onLeave);
  document.addEventListener("visibilitychange", onVisibility);

  openWhatsAppApp(message);

  timer = window.setTimeout(() => {
    if (settled) return;

    const hidden = document.visibilityState === "hidden" || document.hidden;
    const focused = document.hasFocus();
    const stillHere = !hidden;

    // Always offer next steps if they can still see this page — including
    // after a browser "Open WhatsApp?" prompt they dismissed. Do not wait
    // on a spinner.
    if (stillHere) {
      onNeedHelp?.();
    }

    // Only auto-open web when nothing took the window. A blur/hide means
    // Desktop or the mobile app likely opened — do not also dump them on
    // web.whatsapp.com.
    if (!appTookOver && !hidden && focused) {
      openWhatsAppWeb(message, { navigateIfBlocked: false });
    }

    finish();
  }, waitMs);

  return finish;
}
