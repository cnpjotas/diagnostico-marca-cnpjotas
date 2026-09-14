import { useEffect, useRef, useState } from "react";
import type { CadastroForm } from "@/lib/schema";
import { SetaEsquerdaIcon } from "@/components/icons";

type Props = {
  dadosIniciais?: CadastroForm | null;
  aoAvancar: (dados: CadastroForm) => void;
  aoVoltar: () => void;
  onOpenTerms: (id: "privacidade" | "termos" | "seguranca") => void;
};

declare global {
  interface Window {
    RDStationForms?: new (formId: string, token: string) => {
      createForm: () => void;
    };
  }
}

export function CadastroStep({ aoAvancar, aoVoltar }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carregandoForm, setCarregandoForm] = useState(true);

  useEffect(() => {
    const FORM_ID = "diagnostico-da-marca-cnpjotas-166dd1c17506c29968c2";
    const TOKEN = "UA-219266042-1";

    const carregarFormularioRD = () => {
      if (typeof window !== "undefined" && window.RDStationForms) {
        // Limpa o container para evitar duplicação em re-renders
        const formContainer = document.getElementById(FORM_ID);
        if (formContainer) {
          formContainer.innerHTML = "";
        }
        try {
          new window.RDStationForms(FORM_ID, TOKEN).createForm();
          setCarregandoForm(false);
        } catch (e) {
          console.error("Erro ao instanciar formulário RD Station:", e);
          setCarregandoForm(false);
        }
      }
    };

    // Verifica se o script do RD Station já existe na página
    const SCRIPT_URL = "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
    let scriptTag = document.querySelector(`script[src="${SCRIPT_URL}"]`) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.src = SCRIPT_URL;
      scriptTag.async = true;
      scriptTag.onload = () => {
        carregarFormularioRD();
      };
      document.body.appendChild(scriptTag);
    } else {
      carregarFormularioRD();
    }

    // Listener para capturar o envio do formulário do RD Station e avançar para o teste
    const container = containerRef.current;
    if (!container) return;

    const extrairDadosEAvancar = () => {
      // Tenta extrair os dados preenchidos no formulário do RD
      const inputs = container.querySelectorAll("input, select");
      const dadosColetados: Partial<CadastroForm> = {
        aceitouTermos: true,
      };

      inputs.forEach((el) => {
        const input = el as HTMLInputElement | HTMLSelectElement;
        const name = (input.name || input.id || "").toLowerCase();
        const placeholder = (input.getAttribute("placeholder") || "").toLowerCase();
        const value = input.value;

        if (!value) return;

        if (name.includes("name") || name.includes("nome") || placeholder.includes("nome")) {
          if (name.includes("marca") || placeholder.includes("marca") || placeholder.includes("empresa")) {
            dadosColetados.nomeDaMarca = value;
          } else if (!dadosColetados.nome) {
            dadosColetados.nome = value;
          }
        }
        if (name.includes("email") || placeholder.includes("email") || placeholder.includes("e-mail")) {
          dadosColetados.email = value;
        }
        if (
          name.includes("phone") ||
          name.includes("tel") ||
          name.includes("celular") ||
          name.includes("whatsapp") ||
          placeholder.includes("tel") ||
          placeholder.includes("whatsapp")
        ) {
          dadosColetados.telefone = value;
        }
        if (name.includes("segment") || name.includes("ramo") || placeholder.includes("segmento")) {
          dadosColetados.segmento = value;
        }
        if (name.includes("fatur") || name.includes("porte") || placeholder.includes("faturamento")) {
          dadosColetados.faturamentoOuPorte = value;
        }
      });

      const dadosFinais: CadastroForm = {
        nome: dadosColetados.nome || "Empreendedor",
        email: dadosColetados.email || "contato@empresa.com.br",
        telefone: dadosColetados.telefone || "(00) 00000-0000",
        nomeDaMarca: dadosColetados.nomeDaMarca || "Sua Marca",
        segmento: dadosColetados.segmento || "Geral",
        faturamentoOuPorte: dadosColetados.faturamentoOuPorte || "Geral",
        aceitouTermos: true,
      };

      // Pequeno timeout para permitir que a requisição do RD Station seja disparada
      setTimeout(() => {
        aoAvancar(dadosFinais);
      }, 800);
    };

    const handleFormSubmit = () => {
      // Não bloqueia o envio natural do RD Station
      extrairDadosEAvancar();
    };

    // Observa quando o RD injetar a tag form no container
    const observer = new MutationObserver(() => {
      const form = container.querySelector("form");
      if (form) {
        form.removeEventListener("submit", handleFormSubmit);
        form.addEventListener("submit", handleFormSubmit);
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [aoAvancar]);

  return (
    <div className="space-y-6 animate-fade-in" ref={containerRef}>
      {/* Cabeçalho do Passo */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#4FA180] tracking-wider uppercase">Passo 1 de 2</span>
        <h2 className="text-2xl font-bold text-[#17332A] tracking-tight">
          Identificação da sua marca
        </h2>
        <p className="text-xs sm:text-sm text-[#737373]">
          Preencha o formulário abaixo para iniciarmos o cálculo do diagnóstico de segurança.
        </p>
      </div>

      {/* Container do Formulário RD Station */}
      <div className="min-h-[300px] p-4 sm:p-6 bg-white rounded-2xl border border-[#E1E8E4] shadow-xs">
        {carregandoForm && (
          <div className="flex flex-col items-center justify-center py-12 text-[#737373] space-y-3">
            <div className="w-8 h-8 border-3 border-[#4FA180] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Carregando formulário seguro...</p>
          </div>
        )}

        {/* Elemento oficial do RD Station */}
        <div role="main" id="diagnostico-da-marca-cnpjotas-166dd1c17506c29968c2"></div>
      </div>

      {/* Botões de Apoio */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E1E8E4]">
        <button
          type="button"
          onClick={aoVoltar}
          className="w-full sm:w-auto px-5 py-2.5 border border-[#E1E8E4] hover:bg-[#F8FBF9] text-[#737373] font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <SetaEsquerdaIcon className="w-4 h-4" />
          Voltar
        </button>
      </div>
    </div>
  );
}

