import { useState } from "react";
import { perguntasMarca, totalDePerguntasMarca } from "@/data/questions";
import { ProgressBar } from "@/components/progress-bar";
import { Badge } from "@/components/parts";
import { SetaDireitaIcon, SetaEsquerdaIcon, CheckCircleIcon } from "@/components/icons";

type Props = {
  respostas: (number | null)[];
  aoResponder: (indicePergunta: number, opcaoEscolhida: number) => void;
  aoConcluir: () => void;
  aoVoltarParaCadastro: () => void;
};

export function DiagnosticoStep({
  respostas,
  aoResponder,
  aoConcluir,
  aoVoltarParaCadastro,
}: Props) {
  const [indiceAtual, setIndiceAtual] = useState(0);

  const perguntaAtual = perguntasMarca[indiceAtual];
  const respostaSelecionada = respostas[indiceAtual];

  const handleSelecionarOpcao = (indiceOpcao: number) => {
    aoResponder(indiceAtual, indiceOpcao);
  };

  const handleAvancar = () => {
    if (respostaSelecionada === null || respostaSelecionada === undefined) return;

    if (indiceAtual < totalDePerguntasMarca - 1) {
      setIndiceAtual((prev) => prev + 1);
    } else {
      aoConcluir();
    }
  };

  const handleVoltar = () => {
    if (indiceAtual > 0) {
      setIndiceAtual((prev) => prev - 1);
    } else {
      aoVoltarParaCadastro();
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Barra de Progresso */}
      <ProgressBar atual={indiceAtual} total={totalDePerguntasMarca} />

      {/* Categoria e Pergunta */}
      <div className="space-y-2">
        <Badge cor="green">{perguntaAtual.categoria}</Badge>

        <h2 className="text-lg sm:text-xl font-bold text-[#17332A] leading-snug tracking-tight">
          {perguntaAtual.texto}
        </h2>
      </div>

      {/* Alternativas */}
      <div className="space-y-2.5 pt-1">
        {perguntaAtual.opcoes.map((opcao, idx) => {
          const estaSelecionada = respostaSelecionada === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelecionarOpcao(idx)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                estaSelecionada
                  ? "border-[#4FA180] bg-[#EAF4EF]/60 shadow-xs ring-2 ring-[#4FA180]/20"
                  : "border-[#E1E8E4] bg-white hover:border-[#5CBD97] hover:bg-[#F8FBF9]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    estaSelecionada
                      ? "border-[#4FA180] bg-[#4FA180] text-white"
                      : "border-[#E1E8E4] bg-white"
                  }`}
                >
                  {estaSelecionada && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>

                <div className="space-y-1">
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      estaSelecionada ? "text-[#17332A] font-semibold" : "text-[#333333]"
                    }`}
                  >
                    {opcao.texto}
                  </p>

                  {estaSelecionada && opcao.alerta && (
                    <p className="text-[11px] text-[#B42318] font-medium bg-[#FEF3F2] px-2 py-0.5 rounded mt-1 inline-block">
                      {opcao.alerta}
                    </p>
                  )}
                </div>
              </div>

              {estaSelecionada && (
                <CheckCircleIcon className="w-4 h-4 text-[#4FA180] shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Botões de Navegação */}
      <div className="pt-4 flex items-center justify-between gap-3 border-t border-[#E1E8E4]">
        <button
          type="button"
          onClick={handleVoltar}
          className="px-4 py-2.5 border border-[#E1E8E4] hover:bg-[#F8FBF9] text-[#737373] font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <SetaEsquerdaIcon className="w-3.5 h-3.5" />
          {indiceAtual === 0 ? "Voltar" : "Anterior"}
        </button>

        <button
          type="button"
          onClick={handleAvancar}
          disabled={respostaSelecionada === null || respostaSelecionada === undefined}
          className="px-6 py-3 bg-[#17332A] hover:bg-[#4FA180] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {indiceAtual === totalDePerguntasMarca - 1 ? (
            "Ver Meu Resultado"
          ) : (
            <>
              Próxima
              <SetaDireitaIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
