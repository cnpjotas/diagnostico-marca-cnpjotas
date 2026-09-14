/**
 * As 5 perguntas essenciais do Diagnóstico de Segurança de Marca Cnpjotas.
 *
 * Cada alternativa possui um peso de segurança de 1 a 4.
 * Pontuação total: de 5 a 20 pontos, convertida em Score de 0% a 100%.
 */
export type OpcaoPergunta = {
  readonly texto: string;
  readonly peso: number; // 1 = Crítico, 2 = Alto Risco, 3 = Moderado, 4 = Seguro/Blindado
  readonly alerta?: string;
};

export type PerguntaMarca = {
  readonly id: string;
  readonly numero: number;
  readonly categoria: string;
  readonly texto: string;
  readonly contexto: string;
  readonly opcoes: readonly OpcaoPergunta[];
};

export const perguntasMarca: readonly PerguntaMarca[] = [
  {
    id: "situacaoINPI",
    numero: 1,
    categoria: "Situação no INPI",
    texto: "Qual é a situação atual do registro da sua marca no INPI?",
    contexto: "No Brasil, o INPI é o único órgão que concede a propriedade legal e o direito exclusivo sobre uma marca.",
    opcoes: [
      {
        texto: "Nunca dei entrada no registro de marca no INPI.",
        peso: 1,
        alerta: "Sua marca está desprotegida. Qualquer pessoa pode registrá-la primeiro e exigir o nome.",
      },
      {
        texto: "Dei entrada no passado, mas não acompanho o processo e não sei o status.",
        peso: 2,
        alerta: "Processos sem acompanhamento semanal costumam ser arquivados pelo INPI.",
      },
      {
        texto: "Tenho processo de registro em andamento com assessoria especializada.",
        peso: 3,
        alerta: "A marca está em análise. A proteção definitiva ocorre após a concessão.",
      },
      {
        texto: "Tenho o Certificado de Registro de Marca emitido e válido.",
        peso: 4,
      },
    ],
  },
  {
    id: "mitoCNPJ",
    numero: 2,
    categoria: "Mito do CNPJ vs Marca",
    texto: "Você acreditava que ter CNPJ aberto ou @ no Instagram já garantia a posse do nome?",
    contexto: "O CNPJ autoriza a empresa na Junta Comercial, mas NÃO garante exclusividade nem propriedade da marca.",
    opcoes: [
      {
        texto: "Sim, achava que abrir CNPJ e criar as redes sociais já me tornava dono da marca.",
        peso: 1,
        alerta: "Mito comum: apenas o registro no INPI confere exclusividade legal no território nacional.",
      },
      {
        texto: "Sabia que não garantia, mas fui adiando o registro oficial.",
        peso: 2,
        alerta: "Adiar o registro aumenta o risco de ser surpreendido por um registro de terceiro.",
      },
      {
        texto: "Sei que só o INPI protege e pretendo regularizar agora.",
        peso: 3,
      },
      {
        texto: "Sempre soube e tratei o registro no INPI como prioridade.",
        peso: 4,
      },
    ],
  },
  {
    id: "pesquisaAnterioridade",
    numero: 3,
    categoria: "Pesquisa de Viabilidade",
    texto: "Você já fez uma busca oficial no INPI para checar se seu nome já pertence a outra empresa?",
    contexto: "A busca técnica no INPI verifica se já existem marcas idênticas ou semelhantes no mesmo segmento.",
    opcoes: [
      {
        texto: "Nunca fiz nenhuma pesquisa no banco de marcas do INPI.",
        peso: 1,
        alerta: "Existe o risco real de você já estar usando uma marca registrada por outra empresa.",
      },
      {
        texto: "Apenas pesquisei no Google e nas redes sociais.",
        peso: 2,
        alerta: "Pesquisa em redes sociais não tem validade jurídica e não reflete registros do INPI.",
      },
      {
        texto: "Fiz uma busca básica por conta própria no site do INPI.",
        peso: 3,
      },
      {
        texto: "Fiz uma análise técnica completa de viabilidade com especialistas.",
        peso: 4,
      },
    ],
  },
  {
    id: "concorrenciaECopia",
    numero: 4,
    categoria: "Risco de Concorrência",
    texto: "Se um concorrente começar a usar o mesmo nome ou registrar sua marca amanhã, você:",
    contexto: "Sem registro no INPI, você não tem base legal para impedir cópias ou notificar concorrentes.",
    opcoes: [
      {
        texto: "Não tenho o que fazer, pois sem registro não possuo direito de exclusividade.",
        peso: 1,
        alerta: "Se o concorrente registrar antes, ele poderá exigir judicialmente que você mude de nome.",
      },
      {
        texto: "Não sei exatamente como agir e tenho medo de perder o nome.",
        peso: 2,
      },
      {
        texto: "Tentaria uma conversa amigável, mas sei que preciso do registro.",
        peso: 3,
      },
      {
        texto: "Posso notificar e barrar judicialmente porque tenho registro concedido no INPI.",
        peso: 4,
      },
    ],
  },
  {
    id: "impactoRebranding",
    numero: 5,
    categoria: "Impacto no Negócio",
    texto: "Se você recebesse uma notificação judicial para parar de usar seu nome em 48h, qual seria o impacto?",
    contexto: "O custo de um rebranding forçado envolve troca de fachada, redes, embalagens e perda de clientes fiéis.",
    opcoes: [
      {
        texto: "Prejuízo enorme: perderia clientes, autoridade e todo o investimento em marketing.",
        peso: 1,
        alerta: "O custo de registrar a marca com a Cnpjotas é muito menor do que o custo de um rebranding forçado.",
      },
      {
        texto: "Alto impacto financeiro e dor de cabeça para refazer a identidade.",
        peso: 2,
      },
      {
        texto: "Teria custos chatos, por isso quero garantir a proteção logo.",
        peso: 3,
      },
      {
        texto: "Risco zero: minha marca já é registrada e está totalmente blindada.",
        peso: 4,
      },
    ],
  },
] as const;

export const totalDePerguntasMarca = perguntasMarca.length;
