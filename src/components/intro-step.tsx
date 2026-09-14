import { EscudoAlertaIcon, RelogioIcon, SetaDireitaIcon, CadeadoIcon } from "@/components/icons";
import bannerCampanha from "@/assets/banner-campanha.jpg";

type Props = {
  aoAvancar: () => void;
};

export function IntroStep({ aoAvancar }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Imagem de Destaque da Campanha */}
      <div className="w-full overflow-hidden rounded-2xl border border-[#E1E8E4] shadow-xs">
        <img
          src={bannerCampanha}
          alt="Campanha de Registro de Marca · Cnpjotas"
          className="w-full h-auto max-h-72 object-cover"
        />
      </div>

      {/* Badge e Título */}
      <div className="space-y-2.5 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="text-xs text-[#737373] flex items-center gap-1 font-medium bg-[#F8FBF9] px-3 py-1 rounded-full border border-[#E1E8E4]">
            <RelogioIcon className="w-3.5 h-3.5 text-[#4FA180]" /> Menos de 1 minuto · 5 perguntas
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17332A] tracking-tight leading-tight">
          Sua marca está realmente protegida ou você corre o risco de{" "}
          <span className="text-[#4FA180]">perdê-la a qualquer momento?</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#737373] leading-relaxed max-w-xl">
          Responda a 5 perguntas rápidas e descubra o nível de segurança jurídica do seu nome no INPI.
        </p>
      </div>

      {/* Box de Alerta Direto */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFAEB] border border-[#F6B037]/40 flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-[#F6B037]/20 text-[#B54708] shrink-0 mt-0.5">
          <EscudoAlertaIcon className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <h2 className="font-bold text-[#935F05]">
            Mito do CNPJ: Ter empresa aberta não garante a marca
          </h2>
          <p className="text-[#737373] leading-relaxed text-xs">
            Ter CNPJ na Junta Comercial ou perfil no Instagram <strong>não confere exclusividade</strong>. Pela lei brasileira, <strong>o verdadeiro dono da marca é quem registra primeiro no INPI</strong>.
          </p>
        </div>
      </div>

      {/* 3 Benefícios Rápidos */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-[#F8FBF9] border border-[#E1E8E4]">
          <span className="text-xs font-bold text-[#17332A] block">Score Real</span>
          <span className="text-[11px] text-[#737373]">0% a 100% no INPI</span>
        </div>
        <div className="p-3 rounded-xl bg-[#F8FBF9] border border-[#E1E8E4]">
          <span className="text-xs font-bold text-[#17332A] block">Riscos de Cópia</span>
          <span className="text-[11px] text-[#737373]">Identificação de brechas</span>
        </div>
        <div className="p-3 rounded-xl bg-[#F8FBF9] border border-[#E1E8E4]">
          <span className="text-xs font-bold text-[#17332A] block">Busca Grátis</span>
          <span className="text-[11px] text-[#737373]">Viabilidade na Cnpjotas</span>
        </div>
      </div>

      {/* Botão de Início */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E1E8E4]">
        <div className="text-xs text-[#737373] flex items-center gap-1.5">
          <CadeadoIcon className="w-4 h-4 text-[#4FA180]" />
          100% gratuito · Resultado imediato
        </div>

        <button
          type="button"
          onClick={aoAvancar}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#17332A] hover:bg-[#4FA180] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-sm cursor-pointer"
        >
          Iniciar Diagnóstico Rápido
          <SetaDireitaIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
