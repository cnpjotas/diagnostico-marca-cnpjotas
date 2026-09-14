import type { ReactNode } from "react";
import { HeaderSimples, FooterSimples } from "@/components/parts";

type Props = {
  children: ReactNode;
  onOpenTerms: (id: "privacidade" | "termos" | "seguranca") => void;
};

export function DiagnosticoLayout({ children, onOpenTerms }: Props) {
  return (
    <div className="min-h-screen bg-[#F8FBF9] flex flex-col justify-between py-6 px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl border border-[#E1E8E4] shadow-sm p-6 sm:p-10 flex flex-col">
        <HeaderSimples />
        <main className="flex-1">{children}</main>
        <FooterSimples onOpenTerms={onOpenTerms} />
      </div>
    </div>
  );
}
