/**
 * Perfis de Segurança e Vulnerabilidade de Marca no INPI (versão otimizada e ágil).
 *
 * Intervalo de pontuação: 5 a 20 pontos.
 * Convertido para Score percentual de 0% a 100%.
 */

export type PerfilMarca = {
  readonly id: "critico" | "alto" | "moderado" | "blindado";
  readonly titulo: string;
  readonly subtitulo: string;
  readonly nivelRisco: "Crítico" | "Alto" | "Moderado" | "Baixo / Blindado";
  readonly corBadge: string;
  readonly corBg: string;
  readonly corTexto: string;
  readonly minPontos: number;
  readonly maxPontos: number;
  readonly minScore: number;
  readonly maxScore: number;
  readonly resumoDiagnostico: string;
  readonly tresMaioresPerigos: readonly {
    readonly titulo: string;
    readonly descricao: string;
  }[];
  readonly acaoRecomendada: string;
  readonly recomendacaoDetalhada: string;
  readonly ctaTexto: string;
  readonly mensagemWhatsAppTemplate: string;
};

export const perfisMarca: readonly PerfilMarca[] = [
  {
    id: "critico",
    titulo: "Risco Crítico · Marca Desprotegida",
    subtitulo: "Sua empresa opera sem proteção legal no INPI e corre perigo real de perder o nome.",
    nivelRisco: "Crítico",
    corBadge: "#B42318",
    corBg: "#FEF3F2",
    corTexto: "#912018",
    minPontos: 5,
    maxPontos: 8,
    minScore: 0,
    maxScore: 35,
    resumoDiagnostico:
      "A sua marca não possui registro no INPI. Pela lei brasileira (Lei nº 9.279/96), o dono da marca é quem registra primeiro. Ter CNPJ aberto ou @ no Instagram não impede que terceiros registrem o nome e exijam a troca forçada.",
    tresMaioresPerigos: [
      {
        titulo: "Perda Imediata do Nome",
        descricao: "Quem registrar primeiro no INPI ganha o direito exclusivo e pode obrigar sua empresa a mudar de nome.",
      },
      {
        titulo: "Risco de Notificação e Processo",
        descricao: "O titular da marca pode exigir indenização por uso indevido e retirada imediata de fachadas e redes.",
      },
      {
        titulo: "Perda de Todo o Marketing",
        descricao: "Todo o investimento em identidade, anúncios e autoridade é perdido em um rebranding forçado.",
      },
    ],
    acaoRecomendada: "Fazer Pesquisa de Viabilidade Gratuita e Protocolar o Registro",
    recomendacaoDetalhada:
      "Verifique se o nome da sua marca ainda está livre no INPI e dê entrada no pedido para garantir a prioridade legal.",
    ctaTexto: "Blindar Minha Marca no WhatsApp",
    mensagemWhatsAppTemplate:
      "Olá, Cnpjotas! Fiz o teste de Segurança de Marca e deu Risco Crítico. Gostaria de solicitar a pesquisa de viabilidade gratuita da minha marca para registrar logo!",
  },
  {
    id: "alto",
    titulo: "Risco Alto · Falsa Sensação de Segurança",
    subtitulo: "Você já possui clientes e autoridade, mas nenhuma garantia jurídica sobre a marca.",
    nivelRisco: "Alto",
    corBadge: "#B54708",
    corBg: "#FFFAEB",
    corTexto: "#B54708",
    minPontos: 9,
    maxPontos: 13,
    minScore: 36,
    maxScore: 65,
    resumoDiagnostico:
      "Sua empresa construiu reputação no mercado, mas a marca ainda está desprotegida no INPI. Sem o registro oficial, você não tem como impedir que concorrentes copiem seu nome ou registrem antes de você.",
    tresMaioresPerigos: [
      {
        titulo: "Concorrentes Usando Nomes Parecidos",
        descricao: "Sem registro, você não tem respaldo jurídico para notificar ou barrar cópias no mercado.",
      },
      {
        titulo: "Vulnerabilidade ao Crescer",
        descricao: "Quanto mais sua empresa cresce e se destaca, maior a chance de terceiros registrarem seu nome.",
      },
      {
        titulo: "Prejuízo em Rebranding",
        descricao: "Trocar de nome após anos de operação custa caro e confunde clientes antigos.",
      },
    ],
    acaoRecomendada: "Formalizar o Registro de Marca com a Cnpjotas",
    recomendacaoDetalhada:
      "Garanta a posse definitiva do que você construiu. A Cnpjotas faz a busca prévia e cuida de todo o processo no INPI.",
    ctaTexto: "Falar com Especialista Cnpjotas",
    mensagemWhatsAppTemplate:
      "Olá, Cnpjotas! Fiz o Diagnóstico de Marca e deu Risco Alto. Quero regularizar o registro da minha marca no INPI antes de ter problemas.",
  },
  {
    id: "moderado",
    titulo: "Risco Moderado · Proteção Parcial",
    subtitulo: "Você já deu passos importantes, mas precisa acompanhar o processo para evitar surpresas.",
    nivelRisco: "Moderado",
    corBadge: "#F6B037",
    corBg: "#FDF3E3",
    corTexto: "#935F05",
    minPontos: 14,
    maxPontos: 17,
    minScore: 66,
    maxScore: 85,
    resumoDiagnostico:
      "Sua empresa compreende o valor da marca e já tomou iniciativas importantes. Para garantir a segurança total, é essencial acompanhar os prazos do INPI e manter vigilância contra marcas semelhantes.",
    tresMaioresPerigos: [
      {
        titulo: "Perda de Prazos no INPI",
        descricao: "Exigências e despachos do INPI têm prazos curtos que, se perdidos, cancelam o processo.",
      },
      {
        titulo: "Falta de Oposição a Cópias",
        descricao: "Sem monitoramento semanal da Revista do INPI, concorrentes podem aprovar nomes semelhantes.",
      },
      {
        titulo: "Novas Classes Desprotegidas",
        descricao: "Lançar novos produtos ou serviços pode exigir proteção em classes complementares.",
      },
    ],
    acaoRecomendada: "Auditar Classes e Manter Acompanhamento Semanal",
    recomendacaoDetalhada:
      "Certifique-se de que todas as atividades da empresa estão cobertas e com acompanhamento técnico ativo.",
    ctaTexto: "Auditar Minha Marca com a Cnpjotas",
    mensagemWhatsAppTemplate:
      "Olá, Cnpjotas! Fiz o Diagnóstico de Marca e deu Risco Moderado. Gostaria de verificar a situação e classes da minha marca.",
  },
  {
    id: "blindado",
    titulo: "Marca Blindada · Alta Segurança Jurídica",
    subtitulo: "Excelente! Sua marca possui forte proteção legal e certificado no INPI.",
    nivelRisco: "Baixo / Blindado",
    corBadge: "#4FA180",
    corBg: "#EAF4EF",
    corTexto: "#17332A",
    minPontos: 18,
    maxPontos: 20,
    minScore: 86,
    maxScore: 100,
    resumoDiagnostico:
      "Sua marca possui o nível ideal de segurança. Com registro deferido no INPI, você possui exclusividade legal em território nacional por 10 anos e protege seu maior patrimônio.",
    tresMaioresPerigos: [
      {
        titulo: "Atenção à Renovação Decenal",
        descricao: "O registro no INPI tem validade de 10 anos e deve ser renovado no prazo correto.",
      },
      {
        titulo: "Manter Monitoramento Ativo",
        descricao: "Continue atento a marcas que tentem imitar seu nome ou logotipo no mercado.",
      },
      {
        titulo: "Expansão de Serviços",
        descricao: "Ao abrir novas frentes ou franquias, lembre-se de proteger as novas classes.",
      },
    ],
    acaoRecomendada: "Manter o Monitoramento e a Vigência em Dia",
    recomendacaoDetalhada:
      "Mantenha a vigilância ativa das publicações do INPI para barrar qualquer tentativa de cópia.",
    ctaTexto: "Falar com a Cnpjotas",
    mensagemWhatsAppTemplate:
      "Olá, Cnpjotas! Fiz o Diagnóstico de Segurança de Marca e minha marca está Blindada! Gostaria de conhecer outros serviços da Cnpjotas.",
  },
] as const;
