import { useMemo } from "react";
import type { CadastroForm } from "@/lib/schema";
import type { ResultadoCalculado } from "@/lib/scoring";
import {
  EscudoIcon,
  EscudoAlertaIcon,
  EscudoCheckIcon,
  WhatsAppIcon,
  AlertaTrianguloIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@/components/icons";

type Props = {
  cadastro: CadastroForm;
  resultado: ResultadoCalculado;
  aoRefazer: () => void;
};

const NUMERO_WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER ?? "5531999704837";

export function ResultadoStep({ cadastro, resultado, aoRefazer }: Props) {
  const { perfil, scorePercentual, pontosCriticos } = resultado;

  const linkWhatsApp = useMemo(() => {
    const textoMensagem = encodeURIComponent(
      `Olá, equipe Cnpjotas! 👋\n\n` +
        `Acabei de realizar o Diagnóstico de Segurança de Marca para a minha empresa:\n` +
        `🏷️ *Marca:* ${cadastro.nomeDaMarca}\n` +
        `👤 *Responsável:* ${cadastro.nome}\n` +
        `📊 *Score de Segurança:* ${scorePercentual}% (${perfil.titulo})\n` +
        `🏢 *Segmento:* ${cadastro.segmento}\n\n` +
        `Gostaria de solicitar a *Pesquisa de Viabilidade Gratuita* no INPI e saber como registrar minha marca com a Cnpjotas!`
    );

    const numeroLimpo = NUMERO_WHATSAPP.replace(/\D/g, "");
    return `https://wa.me/${numeroLimpo}?text=${textoMensagem}`;
  }, [cadastro, perfil, scorePercentual]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Topo do Resultado */}
      <div className="text-center space-y-1.5 max-w-lg mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EAF4EF] text-[#17332A] border border-[#5CBD97]/30">
          <SparklesIcon className="w-3.5 h-3.5 text-[#4FA180]" />
          Diagnóstico Concluído
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#17332A] tracking-tight">
          Segurança da marca <span className="text-[#4FA180]">{cadastro.nomeDaMarca}</span>
        </h2>
      </div>

      {/* Card Principal de Score e Perfil */}
      <div
        className="p-5 sm:p-6 rounded-2xl border shadow-xs space-y-4"
        style={{
          backgroundColor: perfil.corBg,
          borderColor: `${perfil.corBadge}30`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-center shadow-inner font-extrabold text-white shrink-0"
              style={{ backgroundColor: perfil.corBadge }}
            >
              <span className="text-2xl leading-none">{scorePercentual}%</span>
              <span className="text-[9px] uppercase font-semibold tracking-wider opacity-90">
                Segurança
              </span>
            </div>

            <div className="space-y-1 text-left">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block"
                style={{
                  backgroundColor: `${perfil.corBadge}20`,
                  color: perfil.corTexto,
                }}
              >
                Risco {perfil.nivelRisco}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#17332A] leading-tight">
                {perfil.titulo}
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                {perfil.subtitulo}
              </p>
            </div>
          </div>

          <div className="hidden sm:flex p-3 rounded-xl bg-white/80 border border-white shadow-xs">
            {perfil.id === "blindado" ? (
              <EscudoCheckIcon className="w-9 h-9 text-[#4FA180]" />
            ) : perfil.id === "moderado" ? (
              <EscudoIcon className="w-9 h-9 text-[#F6B037]" />
            ) : (
              <EscudoAlertaIcon className="w-9 h-9 text-[#B42318]" />
            )}
          </div>
        </div>

        {/* Resumo da Análise */}
        <div className="p-3.5 rounded-xl bg-white border border-[#E1E8E4] text-xs text-[#333333] leading-relaxed">
          <p>{perfil.resumoDiagnostico}</p>
        </div>
      </div>

      {/* 3 Principais Riscos */}
      <div className="space-y-3">
        <h4 className="font-bold text-[#17332A] text-sm flex items-center gap-1.5">
          <AlertaTrianguloIcon className="w-4 h-4 text-[#B42318]" />
          O que você precisa saber agora:
        </h4>

        <div className="grid sm:grid-cols-3 gap-3">
          {perfil.tresMaioresPerigos.map((perigo, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#F8FBF9] border border-[#E1E8E4] space-y-1"
            >
              <h5 className="font-bold text-[#17332A] text-xs">{perigo.titulo}</h5>
              <p className="text-[11px] text-[#737373] leading-relaxed">{perigo.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerabilidades Críticas (se houver) */}
      {pontosCriticos.length > 0 && (
        <div className="p-4 rounded-xl bg-[#FEF3F2] border border-[#B42318]/20 space-y-2">
          <span className="text-xs font-bold text-[#912018] block">
            Atenção aos pontos informados:
          </span>
          <ul className="space-y-1 text-xs text-[#737373]">
            {pontosCriticos.map((pc, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B42318] shrink-0 mt-1.5" />
                <span>
                  <strong className="text-[#17332A]">{pc.categoria}: </strong>
                  {pc.alerta}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA Comercial de Alta Conversão */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#17332A] to-[#1e4438] text-white shadow-lg space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#4FA180]/30 text-[#5CBD97]">
              <CheckCircleIcon className="w-3 h-3" />
              Registro de Marca Cnpjotas
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
              Solicite a Pesquisa de Viabilidade Gratuita no INPI
            </h3>
            <p className="text-xs text-gray-300 max-w-md leading-relaxed">
              Não arrisque perder a marca <strong className="text-[#5CBD97]">{cadastro.nomeDaMarca}</strong>.
              Nossos especialistas analisam se o nome está livre e cuidam de todo o registro sem complicação.
            </p>
          </div>

          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#4FA180] hover:bg-[#5CBD97] text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 shrink-0 group cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Solicitar Pesquisa Grátis no WhatsApp
          </a>
        </div>

        <div className="pt-3 border-t border-white/10 flex flex-wrap justify-between text-[11px] text-gray-300 gap-2">
          <span>✓ Busca prévia grátis</span>
          <span>✓ Acompanhamento semanal</span>
          <span>✓ Parcelamento facilitado</span>
          <span>✓ Time Cnpjotas</span>
        </div>
      </div>

      {/* Ações Secundárias */}
      <div className="pt-2 flex items-center justify-between text-xs text-[#737373]">
        <button
          type="button"
          onClick={() => window.print()}
          className="hover:text-[#17332A] underline-offset-2 hover:underline cursor-pointer"
        >
          Salvar / Imprimir Resultado
        </button>

        <button
          type="button"
          onClick={aoRefazer}
          className="hover:text-[#4FA180] underline-offset-2 hover:underline cursor-pointer"
        >
          Testar Outra Marca
        </button>
      </div>
    </div>
  );
}
