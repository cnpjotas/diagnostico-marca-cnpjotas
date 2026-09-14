import type { CadastroForm } from "./schema";
import type { ResultadoCalculado } from "./scoring";
import type { Atribuicao } from "./origem";

export type PayloadEnvio = {
  appId: string;
  cadastro: CadastroForm;
  respostas: (number | null)[];
  resultado: {
    pontosTotais: number;
    scorePercentual: number;
    perfilId: string;
    perfilTitulo: string;
    nivelRisco: string;
    pontosCriticos: {
      categoria: string;
      alerta: string;
    }[];
  };
  atribuicao: Atribuicao;
  dataEnvio: string;
};

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL ?? "";
const APP_ID = import.meta.env.VITE_APP_ID ?? "diagnostico-marca-cnpjotas";

export async function enviarLeadDiagnostico(
  cadastro: CadastroForm,
  respostas: (number | null)[],
  resultado: ResultadoCalculado,
  atribuicao: Atribuicao,
): Promise<{ sucesso: boolean; mensagem?: string }> {
  const payload: PayloadEnvio = {
    appId: APP_ID,
    cadastro,
    respostas,
    resultado: {
      pontosTotais: resultado.pontosTotais,
      scorePercentual: resultado.scorePercentual,
      perfilId: resultado.perfil.id,
      perfilTitulo: resultado.perfil.titulo,
      nivelRisco: resultado.perfil.nivelRisco,
      pontosCriticos: resultado.pontosCriticos.map((pc) => ({
        categoria: pc.categoria,
        alerta: pc.alerta,
      })),
    },
    atribuicao,
    dataEnvio: new Date().toISOString(),
  };

  // Se a URL do Apps Script estiver configurada, envia via POST
  if (APPS_SCRIPT_URL && APPS_SCRIPT_URL.startsWith("http")) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script standard redirect
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // No modo no-cors o status é opaque (0) e representa sucesso na entrega
      return { sucesso: true };
    } catch (err) {
      console.warn("Falha no envio para Apps Script, continuando com resultado:", err);
      // Não bloqueia a visualização do resultado pelo usuário
      return { sucesso: true };
    }
  }

  // Em modo de desenvolvimento sem backend configurado
  console.info("[Dev] Lead capturado:", payload);
  return { sucesso: true };
}
