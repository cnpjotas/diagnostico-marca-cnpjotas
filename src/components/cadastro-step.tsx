import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema, type CadastroForm } from "@/lib/schema";
import { formatarTelefone } from "@/lib/format";
import { SetaDireitaIcon, SetaEsquerdaIcon } from "@/components/icons";

type Props = {
  dadosIniciais?: CadastroForm | null;
  aoAvancar: (dados: CadastroForm) => void;
  aoVoltar: () => void;
  onOpenTerms: (id: "privacidade" | "termos" | "seguranca") => void;
};

export function CadastroStep({ dadosIniciais, aoAvancar, aoVoltar, onOpenTerms }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: dadosIniciais ?? {
      nome: "",
      email: "",
      telefone: "",
      nomeDaMarca: "",
      segmento: "",
      faturamentoOuPorte: "",
      aceitouTermos: true,
    },
  });

  const onSubmit = (dados: CadastroForm) => {
    aoAvancar(dados);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho do Passo */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#4FA180] tracking-wider uppercase">Passo 1 de 2</span>
        <h2 className="text-2xl font-bold text-[#17332A] tracking-tight">
          Dados da sua empresa e marca
        </h2>
        <p className="text-xs sm:text-sm text-[#737373]">
          Essas informações personalizam o seu diagnóstico e o cálculo das classes no INPI.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Nome do Responsável */}
          <div className="space-y-1.5">
            <label htmlFor="nome" className="block text-xs font-bold text-[#17332A]">
              Seu nome completo *
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Ex: João da Silva"
              {...register("nome")}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                errors.nome
                  ? "border-[#B42318] bg-[#FEF3F2] focus:ring-2 focus:ring-[#B42318]/20"
                  : "border-[#E1E8E4] bg-white focus:border-[#4FA180] focus:ring-2 focus:ring-[#4FA180]/15"
              }`}
            />
            {errors.nome && <p className="text-xs text-[#B42318]">{errors.nome.message}</p>}
          </div>

          {/* Nome da Marca */}
          <div className="space-y-1.5">
            <label htmlFor="nomeDaMarca" className="block text-xs font-bold text-[#17332A]">
              Nome da sua marca / empresa *
            </label>
            <input
              id="nomeDaMarca"
              type="text"
              placeholder="Ex: Acqua Tech ou Studio Bella"
              {...register("nomeDaMarca")}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                errors.nomeDaMarca
                  ? "border-[#B42318] bg-[#FEF3F2] focus:ring-2 focus:ring-[#B42318]/20"
                  : "border-[#E1E8E4] bg-white focus:border-[#4FA180] focus:ring-2 focus:ring-[#4FA180]/15"
              }`}
            />
            {errors.nomeDaMarca && (
              <p className="text-xs text-[#B42318]">{errors.nomeDaMarca.message}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* E-mail */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold text-[#17332A]">
              Seu melhor e-mail *
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@empresa.com.br"
              {...register("email")}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                errors.email
                  ? "border-[#B42318] bg-[#FEF3F2] focus:ring-2 focus:ring-[#B42318]/20"
                  : "border-[#E1E8E4] bg-white focus:border-[#4FA180] focus:ring-2 focus:ring-[#4FA180]/15"
              }`}
            />
            {errors.email && <p className="text-xs text-[#B42318]">{errors.email.message}</p>}
          </div>

          {/* WhatsApp */}
          <div className="space-y-1.5">
            <label htmlFor="telefone" className="block text-xs font-bold text-[#17332A]">
              WhatsApp para receber o relatório *
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              {...register("telefone", {
                onChange: (e) => {
                  setValue("telefone", formatarTelefone(e.target.value), { shouldValidate: true });
                },
              })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none ${
                errors.telefone
                  ? "border-[#B42318] bg-[#FEF3F2] focus:ring-2 focus:ring-[#B42318]/20"
                  : "border-[#E1E8E4] bg-white focus:border-[#4FA180] focus:ring-2 focus:ring-[#4FA180]/15"
              }`}
            />
            {errors.telefone && (
              <p className="text-xs text-[#B42318]">{errors.telefone.message}</p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Segmento */}
          <div className="space-y-1.5">
            <label htmlFor="segmento" className="block text-xs font-bold text-[#17332A]">
              Segmento de atuação *
            </label>
            <select
              id="segmento"
              {...register("segmento")}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white ${
                errors.segmento
                  ? "border-[#B42318] bg-[#FEF3F2] focus:ring-2 focus:ring-[#B42318]/20"
                  : "border-[#E1E8E4] focus:border-[#4FA180] focus:ring-2 focus:ring-[#4FA180]/15"
              }`}
            >
              <option value="">Selecione o segmento...</option>
              <option value="Serviços Profissionais / Consultoria">Serviços Profissionais / Consultoria</option>
              <option value="Tecnologia / SaaS / Software">Tecnologia / SaaS / Software</option>
              <option value="Comércio / Loja Física ou E-commerce">Comércio / E-commerce / Varejo</option>
              <option value="Alimentação / Gastronomia">Alimentação / Gastronomia</option>
              <option value="Saúde / Estética / Beleza">Saúde / Estética / Beleza</option>
              <option value="Educação / Infoprodutos / Cursos">Educação / Infoprodutos / Cursos</option>
              <option value="Construção / Arquitetura / Engenharia">Construção / Arquitetura</option>
              <option value="Indústria / Fabricação">Indústria / Fabricação</option>
              <option value="Outro Segmento">Outro Segmento</option>
            </select>
            {errors.segmento && (
              <p className="text-xs text-[#B42318]">{errors.segmento.message}</p>
            )}
          </div>

          {/* Faturamento / Porte */}
          <div className="space-y-1.5">
            <label htmlFor="faturamentoOuPorte" className="block text-xs font-bold text-[#17332A]">
              Porte / Faturamento mensal estimado *
            </label>
            <select
              id="faturamentoOuPorte"
              {...register("faturamentoOuPorte")}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all outline-none bg-white ${
                errors.faturamentoOuPorte
                  ? "border-[#B42318] bg-[#FEF3F2] focus:ring-2 focus:ring-[#B42318]/20"
                  : "border-[#E1E8E4] focus:border-[#4FA180] focus:ring-2 focus:ring-[#4FA180]/15"
              }`}
            >
              <option value="">Selecione o porte...</option>
              <option value="Até R$ 10 mil/mês (MEI / Início)">Até R$ 10 mil/mês (MEI / Início)</option>
              <option value="De R$ 10 mil a R$ 30 mil/mês">De R$ 10 mil a R$ 30 mil/mês</option>
              <option value="De R$ 30 mil a R$ 100 mil/mês">De R$ 30 mil a R$ 100 mil/mês</option>
              <option value="De R$ 100 mil a R$ 300 mil/mês">De R$ 100 mil a R$ 300 mil/mês</option>
              <option value="Acima de R$ 300 mil/mês">Acima de R$ 300 mil/mês</option>
            </select>
            {errors.faturamentoOuPorte && (
              <p className="text-xs text-[#B42318]">{errors.faturamentoOuPorte.message}</p>
            )}
          </div>
        </div>

        {/* Checkbox LGPD */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              {...register("aceitouTermos")}
              className="mt-1 h-4 w-4 rounded border-[#E1E8E4] text-[#4FA180] focus:ring-[#4FA180]"
            />
            <span className="text-xs text-[#737373] leading-relaxed">
              Concordo com a{" "}
              <button
                type="button"
                onClick={() => onOpenTerms("privacidade")}
                className="text-[#4FA180] font-semibold underline hover:text-[#17332A]"
              >
                Política de Privacidade
              </button>{" "}
              e autorizo o contato de especialistas da Cnpjotas para envio do diagnóstico.
            </span>
          </label>
          {errors.aceitouTermos && (
            <p className="text-xs text-[#B42318] mt-1">{errors.aceitouTermos.message}</p>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E1E8E4]">
          <button
            type="button"
            onClick={aoVoltar}
            className="w-full sm:w-auto px-5 py-3 border border-[#E1E8E4] hover:bg-[#F8FBF9] text-[#737373] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <SetaEsquerdaIcon className="w-4 h-4" />
            Voltar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#17332A] hover:bg-[#4FA180] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            Avançar para as Perguntas
            <SetaDireitaIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}
