/**
 * =========================================================================
 * BACKEND GOOGLE APPS SCRIPT · DIAGNÓSTICO DE SEGURANÇA DE MARCA CNPJOTAS
 * =========================================================================
 *
 * Recebe os dados de leads do formulário, valida, grava na Google Sheets e
 * pode enviar notificações para a equipe comercial de Registro de Marca.
 */

const SHEET_NAME = "Leads_Marca_2026";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respostaJson({ sucesso: false, erro: "Payload vazio ou ausente." }, 400);
    }

    const payload = JSON.parse(e.postData.contents);
    const { cadastro, resultado, atribuicao, dataEnvio } = payload;

    if (!cadastro || !cadastro.nome || !cadastro.telefone || !cadastro.nomeDaMarca) {
      return respostaJson({ sucesso: false, erro: "Campos obrigatórios ausentes." }, 422);
    }

    // Obter ou criar a planilha
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let aba = ss.getSheetByName(SHEET_NAME);

    if (!aba) {
      aba = ss.insertSheet(SHEET_NAME);
      const cabecalhos = [
        "Data/Hora",
        "Nome do Responsável",
        "Nome da Marca",
        "WhatsApp",
        "E-mail",
        "Segmento",
        "Porte / Faturamento",
        "Score Segurança %",
        "Perfil / Diagnóstico",
        "Nível de Risco",
        "Vulnerabilidades Detectadas",
        "UTM Source",
        "UTM Medium",
        "UTM Campaign",
        "Referrer / Origem",
      ];
      aba.appendRow(cabecalhos);
      aba.getRange(1, 1, 1, cabecalhos.length).setFontWeight("bold").setBackground("#EAF4EF");
      aba.setFrozenRows(1);
    }

    // Formatar vulnerabilidades
    const vulnerabilidadesTexto = (resultado.pontosCriticos || [])
      .map(function (pc) {
        return pc.categoria + ": " + pc.alerta;
      })
      .join(" | ");

    // Gravar nova linha de lead
    const linha = [
      dataEnvio || new Date().toISOString(),
      sanitizar(cadastro.nome),
      sanitizar(cadastro.nomeDaMarca),
      sanitizar(cadastro.telefone),
      sanitizar(cadastro.email),
      sanitizar(cadastro.segmento),
      sanitizar(cadastro.faturamentoOuPorte),
      resultado.scorePercentual + "%",
      sanitizar(resultado.perfilTitulo),
      sanitizar(resultado.nivelRisco),
      sanitizar(vulnerabilidadesTexto),
      sanitizar(atribuicao ? atribuicao.utm_source : ""),
      sanitizar(atribuicao ? atribuicao.utm_medium : ""),
      sanitizar(atribuicao ? atribuicao.utm_campaign : ""),
      sanitizar(atribuicao ? atribuicao.referrer : ""),
    ];

    aba.appendRow(linha);

    // Opcional: Envio de alerta por e-mail para o comercial da Cnpjotas
    const emailNotificacao = PropertiesService.getScriptProperties().getProperty("EMAIL_COMERCIAL");
    if (emailNotificacao && (resultado.nivelRisco === "Crítico" || resultado.nivelRisco === "Alto")) {
      const assunto = "🚨 Novo Lead Quente: Registro de Marca (" + cadastro.nomeDaMarca + ") - Risco " + resultado.nivelRisco;
      const corpo =
        "Um novo diagnóstico de alta prioridade foi concluído:\n\n" +
        "• Marca: " + cadastro.nomeDaMarca + "\n" +
        "• Responsável: " + cadastro.nome + "\n" +
        "• WhatsApp: " + cadastro.telefone + "\n" +
        "• E-mail: " + cadastro.email + "\n" +
        "• Score de Segurança: " + resultado.scorePercentual + "% (" + resultado.perfilTitulo + ")\n" +
        "• Segmento: " + cadastro.segmento + "\n" +
        "• Porte: " + cadastro.faturamentoOuPorte + "\n\n" +
        "Acesse a planilha para fazer o primeiro contato e oferecer a Pesquisa de Viabilidade Gratuita!";

      MailApp.sendEmail(emailNotificacao, assunto, corpo);
    }

    return respostaJson({ sucesso: true, mensagem: "Lead gravado com sucesso." }, 200);
  } catch (error) {
    return respostaJson({ sucesso: false, erro: error.toString() }, 500);
  }
}

function doGet() {
  return respostaJson({ status: "online", servico: "Diagnóstico de Segurança de Marca Cnpjotas" });
}

function sanitizar(valor) {
  if (valor === null || valor === undefined) return "";
  var str = String(valor).trim();
  // Prevenir injeção de fórmula em planilhas (=, +, -, @)
  if (str.startsWith("=") || str.startsWith("+") || str.startsWith("-") || str.startsWith("@")) {
    return "'" + str;
  }
  return str;
}

function respostaJson(dado, status) {
  return ContentService.createTextOutput(JSON.stringify(dado))
    .setMimeType(ContentService.MimeType.JSON);
}
