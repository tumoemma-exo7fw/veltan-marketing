"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { X } from "lucide-react";

import { WhatsAppNextSteps } from "@/components/whatsapp-next-steps";

interface WhatsAppHelpContextValue {
  showHelp: (message: string) => void;
  hideHelp: () => void;
}

const WhatsAppHelpContext = createContext<WhatsAppHelpContextValue>({
  showHelp: () => {},
  hideHelp: () => {},
});

export function useWhatsAppHelp(): WhatsAppHelpContextValue {
  return useContext(WhatsAppHelpContext);
}

export function WhatsAppHelpProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const titleId = useId();

  const showHelp = useCallback((next: string) => {
    setMessage(next);
  }, []);

  const hideHelp = useCallback(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    if (!message) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") hideHelp();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [message, hideHelp]);

  return (
    <WhatsAppHelpContext.Provider value={{ showHelp, hideHelp }}>
      {children}
      {message ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="Close WhatsApp help"
            className="absolute inset-0 bg-[#031011]/72 backdrop-blur-[2px]"
            onClick={hideHelp}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 max-h-[min(92svh,40rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-3xl border border-white/12 bg-[#0c2a2d] p-4 shadow-[0_-12px_48px_rgb(0_0_0/0.45)] animate-rise-in sm:rounded-3xl sm:p-5"
          >
            <div className="mb-3 flex items-center justify-end">
              <button
                type="button"
                onClick={hideHelp}
                className="inline-flex size-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-cyan"
                aria-label="Close"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <WhatsAppNextSteps message={message} headingId={titleId} />
          </div>
        </div>
      ) : null}
    </WhatsAppHelpContext.Provider>
  );
}
