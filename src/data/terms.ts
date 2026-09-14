export type AbaTermo = {
  readonly id: "privacidade" | "termos" | "seguranca";
  readonly titulo: string;
  readonly conteudo: readonly {
    readonly subtitulo: string;
    readonly texto: string;
  }[];
};

export const termosData: readonly AbaTermo[] = [
  {
    id: "privacidade",
    titulo: "Política de Privacidade e LGPD",
    conteudo: [
      {
        subtitulo: "1. Compromisso com a sua privacidade",
        texto:
          "A Cnpjotas valoriza a privacidade e a segurança dos dados dos seus usuários e clientes. Esta política esclarece como coletamos, tratamos e protegemos as informações fornecidas no Diagnóstico de Segurança de Marca.",
      },
      {
        subtitulo: "2. Dados coletados e finalidade",
        texto:
          "Os dados fornecidos (nome, e-mail, telefone/WhatsApp, nome da marca e respostas do questionário) são utilizados exclusivamente para gerar o diagnóstico de segurança de marca, enviar o relatório consolidado e permitir o contato de nossos especialistas em registro e propriedade intelectual.",
      },
      {
        subtitulo: "3. Sigilo da sua marca e segredo de negócio",
        texto:
          "Garantimos sigilo absoluto sobre os nomes de marcas e estratégias informadas. Suas respostas não são divulgadas publicamente e não serão compartilhadas com terceiros.",
      },
      {
        subtitulo: "4. Seus direitos conforme a LGPD",
        texto:
          "Você pode a qualquer momento solicitar a confirmação, correção, atualização ou exclusão definitiva de seus dados cadastrais enviando uma solicitação para os canais oficiais da Cnpjotas.",
      },
    ],
  },
  {
    id: "termos",
    titulo: "Termos de Uso do Diagnóstico",
    conteudo: [
      {
        subtitulo: "1. Natureza informativa e orientativa",
        texto:
          "Este Diagnóstico de Segurança de Marca é uma ferramenta educacional e orientativa baseada nas melhores práticas de propriedade industrial e na Lei nº 9.279/96. O score gerado não substitui o parecer técnico formal ou a análise oficial de viabilidade realizada diretamente no banco de dados do INPI.",
      },
      {
        subtitulo: "2. Veracidade das informações",
        texto:
          "A precisão do diagnóstico depende da exatidão das respostas informadas pelo usuário durante o preenchimento do formulário.",
      },
      {
        subtitulo: "3. Propriedade Intelectual",
        texto:
          "A metodologia, design, textos, logotipos e códigos desta aplicação são de propriedade exclusiva da Cnpjotas, sendo vedada a reprodução total ou parcial sem autorização prévia.",
      },
    ],
  },
  {
    id: "seguranca",
    titulo: "Segurança da Informação",
    conteudo: [
      {
        subtitulo: "1. Transmissão criptografada",
        texto:
          "Todas as informações enviadas por meio deste formulário trafegam com criptografia de ponta a ponta (HTTPS/TLS 1.3), impedindo a interceptação por terceiros.",
      },
      {
        subtitulo: "2. Proteção contra automação e spam",
        texto:
          "Utilizamos mecanismos de segurança e validação para proteger nossa infraestrutura contra acessos automatizados indevidos e ataques maliciosos.",
      },
    ],
  },
] as const;
