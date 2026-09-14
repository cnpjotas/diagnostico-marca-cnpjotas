import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import logoCnpjotas from "@/assets/logo-cnpjotas.webp";

export function HeaderSimples() {
  return (
    <header className="flex items-center justify-between border-b border-[#E1E8E4] pb-4 mb-6">
      <div className="flex items-center gap-3">
        <img
          src={logoCnpjotas}
          alt="Cnpjotas · Mais que uma contabilidade"
          className="h-7 sm:h-8 w-auto object-contain"
        />
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#4FA180] bg-[#EAF4EF] px-3 py-1 rounded-full">
        <span className="w-2 h-2 rounded-full bg-[#4FA180] animate-pulse"></span>
        Diagnóstico Gratuito
      </div>
    </header>
  );
}

export function FooterSimples({ onOpenTerms }: { onOpenTerms: (id: "privacidade" | "termos" | "seguranca") => void }) {
  return (
    <footer className="mt-8 pt-4 border-t border-[#E1E8E4] flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] gap-2">
      <p>© 2026 Cnpjotas · Mais que uma contabilidade</p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onOpenTerms("privacidade")}
          className="hover:text-[#4FA180] transition-colors underline-offset-2 hover:underline cursor-pointer"
        >
          Privacidade & LGPD
        </button>
        <span className="text-[#E1E8E4]">|</span>
        <button
          type="button"
          onClick={() => onOpenTerms("termos")}
          className="hover:text-[#4FA180] transition-colors underline-offset-2 hover:underline cursor-pointer"
        >
          Termos de Uso
        </button>
      </div>
    </footer>
  );
}

export function Badge({
  children,
  cor = "green",
  className,
}: {
  children: ReactNode;
  cor?: "green" | "gold" | "danger" | "muted";
  className?: string;
}) {
  const cores = {
    green: "bg-[#EAF4EF] text-[#17332A] border-[#5CBD97]/30",
    gold: "bg-[#FDF3E3] text-[#935F05] border-[#F6B037]/40",
    danger: "bg-[#FEF3F2] text-[#B42318] border-[#B42318]/30",
    muted: "bg-[#F8FBF9] text-[#737373] border-[#E1E8E4]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border",
        cores[cor],
        className,
      )}
    >
      {children}
    </span>
  );
}
