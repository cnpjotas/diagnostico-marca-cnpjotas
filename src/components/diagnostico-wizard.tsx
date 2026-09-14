import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DiagnosticoLayout } from "@/components/diagnostico-layout";
import { IntroStep } from "@/components/intro-step";
import { CadastroStep } from "@/components/cadastro-step";
import { DiagnosticoStep } from "@/components/diagnostico-step";
import { ResultadoStep } from "@/components/resultado-step";
import { TermsModal } from "@/components/terms-modal";
import { totalDePerguntasMarca } from "@/data/questions";
import type { AbaTermo } from "@/data/terms";
import type { CadastroForm } from "@/lib/schema";
import { calcularDiagnosticoMarca } from "@/lib/scoring";
import { enviarLeadDiagnostico } from "@/lib/api";
import { lerAtribuicao } from "@/lib/origem";
import { enviarAlturaAoPai, observarAltura } from "@/lib/embed";

type Fase = "intro" | "cadastro" | "diagnostico" | "resultado";

export function DiagnosticoWizard() {
  const [fase, setFase] = useState<Fase>("intro");
  const [cadastro, setCadastro] = useState<CadastroForm | null>(null);
  const [respostas, setRespostas] = useState<(number | null)[]>(() =>
    Array(totalDePerguntasMarca).fill(null),
  );
  const [abaDeTermos, setAbaDeTermos] = useState<AbaTermo["id"] | null>(null);

  // Controle de envio único
  const jaEnviou = useRef(false);
  const atribuicao = useMemo(() => lerAtribuicao(), []);

  useEffect(() => observarAltura(), []);

  // Notifica o pai sobre nova altura ao trocar de tela
  useEffect(() => {
    enviarAlturaAoPai(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fase]);

  // Cálculo memoizado do resultado
  const resultado = useMemo(() => calcularDiagnosticoMarca(respostas), [respostas]);

  // Avançar para a tela de cadastro
  const handleIniciar = useCallback(() => {
    setFase("cadastro");
  }, []);

  // Avançar do cadastro para as perguntas
  const handleAvancarCadastro = useCallback((dadosCadastro: CadastroForm) => {
    setCadastro(dadosCadastro);
    setFase("diagnostico");
  }, []);

  // Voltar para o início
  const handleVoltarParaIntro = useCallback(() => {
    setFase("intro");
  }, []);

  // Voltar do questionário para o cadastro
  const handleVoltarParaCadastro = useCallback(() => {
    setFase("cadastro");
  }, []);

  // Responder pergunta
  const handleResponderPergunta = useCallback((indicePergunta: number, opcaoEscolhida: number) => {
    setRespostas((prev) => {
      const novo = [...prev];
      novo[indicePergunta] = opcaoEscolhida;
      return novo;
    });
  }, []);

  // Concluir e exibir o resultado com envio de lead
  const handleConcluirDiagnostico = useCallback(async () => {
    setFase("resultado");

    if (cadastro && !jaEnviou.current) {
      jaEnviou.current = true;
      const resCalculado = calcularDiagnosticoMarca(respostas);
      await enviarLeadDiagnostico(cadastro, respostas, resCalculado, atribuicao);
    }
  }, [cadastro, respostas, atribuicao]);

  // Refazer o teste
  const handleRefazer = useCallback(() => {
    jaEnviou.current = false;
    setRespostas(Array(totalDePerguntasMarca).fill(null));
    setFase("intro");
  }, []);

  return (
    <DiagnosticoLayout onOpenTerms={(aba) => setAbaDeTermos(aba)}>
      {fase === "intro" && <IntroStep aoAvancar={handleIniciar} />}

      {fase === "cadastro" && (
        <CadastroStep
          dadosIniciais={cadastro}
          aoAvancar={handleAvancarCadastro}
          aoVoltar={handleVoltarParaIntro}
          onOpenTerms={(aba) => setAbaDeTermos(aba)}
        />
      )}

      {fase === "diagnostico" && (
        <DiagnosticoStep
          respostas={respostas}
          aoResponder={handleResponderPergunta}
          aoConcluir={handleConcluirDiagnostico}
          aoVoltarParaCadastro={handleVoltarParaCadastro}
        />
      )}

      {fase === "resultado" && cadastro && (
        <ResultadoStep
          cadastro={cadastro}
          resultado={resultado}
          aoRefazer={handleRefazer}
        />
      )}

      {abaDeTermos && (
        <TermsModal abaInicial={abaDeTermos} aoFechar={() => setAbaDeTermos(null)} />
      )}
    </DiagnosticoLayout>
  );
}
