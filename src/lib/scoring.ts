import { perguntasMarca } from "@/data/questions";
import { perfisMarca, type PerfilMarca } from "@/data/profiles";

export type ResultadoCalculado = {
  pontosTotais: number;
  pontosMaximos: number;
  scorePercentual: number;
  perfil: PerfilMarca;
  respostasDetalhadas: {
    perguntaId: string;
    perguntaTexto: string;
    respostaEscolhida: string;
    peso: number;
    alerta?: string;
  }[];
  pontosCriticos: {
    categoria: string;
    pergunta: string;
    alerta: string;
  }[];
};

export function calcularDiagnosticoMarca(respostas: (number | null)[]): ResultadoCalculado {
  let pontosTotais = 0;
  const pontosMaximos = perguntasMarca.length * 4;
  const respostasDetalhadas: ResultadoCalculado["respostasDetalhadas"] = [];
  const pontosCriticos: ResultadoCalculado["pontosCriticos"] = [];

  perguntasMarca.forEach((pergunta, idx) => {
    const indiceResposta = respostas[idx];
    if (indiceResposta !== null && indiceResposta !== undefined && pergunta.opcoes[indiceResposta]) {
      const opcao = pergunta.opcoes[indiceResposta];
      const peso = opcao.peso;
      pontosTotais += peso;

      respostasDetalhadas.push({
        perguntaId: pergunta.id,
        perguntaTexto: pergunta.texto,
        respostaEscolhida: opcao.texto,
        peso,
        alerta: opcao.alerta,
      });

      if (peso <= 2 && opcao.alerta) {
        pontosCriticos.push({
          categoria: pergunta.categoria,
          pergunta: pergunta.texto,
          alerta: opcao.alerta,
        });
      }
    } else {
      // Fallback para não respondida
      pontosTotais += 1;
    }
  });

  // Cálculo percentual normalizado entre 0% (10 pontos) e 100% (40 pontos)
  const minPossivel = perguntasMarca.length * 1;
  const maxPossivel = perguntasMarca.length * 4;
  const scorePercentual = Math.round(
    ((pontosTotais - minPossivel) / (maxPossivel - minPossivel)) * 100,
  );

  // Encontrar perfil
  const perfil =
    perfisMarca.find((p) => pontosTotais >= p.minPontos && pontosTotais <= p.maxPontos) ??
    perfisMarca[0];

  return {
    pontosTotais,
    pontosMaximos,
    scorePercentual: Math.min(100, Math.max(0, scorePercentual)),
    perfil,
    respostasDetalhadas,
    pontosCriticos,
  };
}
