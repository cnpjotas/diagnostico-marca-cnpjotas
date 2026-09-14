import { useState, useEffect } from "react";
import { termosData, type AbaTermo } from "@/data/terms";
import { FecharIcon, CadeadoIcon } from "@/components/icons";

type Props = {
  abaInicial: AbaTermo["id"];
  aoFechar: () => void;
};

export function TermsModal({ abaInicial, aoFechar }: Props) {
  const [abaAtiva, setAbaAtiva] = useState<AbaTermo["id"]>(abaInicial);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") aoFechar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aoFechar]);

  const abaConteudo = termosData.find((a) => a.id === abaAtiva) ?? termosData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17332A]/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-2xl border border-[#E1E8E4] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Topo */}
        <div className="flex items-center justify-between p-5 border-b border-[#E1E8E4]">
          <div className="flex items-center gap-2 text-[#17332A] font-bold text-lg">
            <CadeadoIcon className="w-5 h-5 text-[#4FA180]" />
            Transparência & Privacidade
          </div>
          <button
            type="button"
            onClick={aoFechar}
            className="p-1.5 rounded-lg text-[#737373] hover:text-[#17332A] hover:bg-[#F8FBF9] transition-colors"
            aria-label="Fechar modal"
          >
            <FecharIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="flex border-b border-[#E1E8E4] bg-[#F8FBF9] px-4 pt-2 gap-2">
          {termosData.map((aba) => (
            <button
              key={aba.id}
              type="button"
              onClick={() => setAbaAtiva(aba.id)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                abaAtiva === aba.id
                  ? "bg-white text-[#17332A] border-[#4FA180] shadow-xs"
                  : "text-[#737373] border-transparent hover:text-[#17332A]"
              }`}
            >
              {aba.titulo}
            </button>
          ))}
        </div>

        {/* Conteúdo com scroll */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#333333] leading-relaxed">
          {abaConteudo.conteudo.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="font-semibold text-[#17332A] text-sm">{item.subtitulo}</h4>
              <p className="text-[#737373] text-xs leading-relaxed">{item.texto}</p>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="p-4 border-t border-[#E1E8E4] bg-[#F8FBF9] flex justify-end">
          <button
            type="button"
            onClick={aoFechar}
            className="px-5 py-2 bg-[#17332A] hover:bg-[#4FA180] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
