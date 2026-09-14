/**
 * =========================================================================
 * BACKEND GOOGLE APPS SCRIPT · DIAGNÓSTICO DE SEGURANÇA DE MARCA CNPJOTAS
 * =========================================================================
 *
 * Recebe os dados de leads do formulário, valida, grava na Google Sheets e
 * pode enviar notificações para a equipe comercial de Registro de Marca.
 */

// =========================================================================
// CONFIGURAÇÕES DO SISTEMA
// =========================================================================
const SHEET_NAME = "Leads_Marca_2026";

// 👉 Coloque aqui o e-mail (ou e-mails separados por vírgula) que receberá o alerta
// Exemplo: "comercial@cnpjotas.com.br" ou "socio1@empresa.com, socio2@empresa.com"
const EMAIL_DESTINO = "contato@cnpjotas.com.br"; 

// Notificar a cada preenchimento (true = sempre notificar, false = apenas alto risco)
const NOTIFICAR_SEMPRE = true;

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

    // =========================================================================
    // ENVIO DE NOTIFICAÇÃO POR E-MAIL
    // =========================================================================
    const emailConfigurado = EMAIL_DESTINO || PropertiesService.getScriptProperties().getProperty("EMAIL_COMERCIAL");

    if (emailConfigurado && (NOTIFICAR_SEMPRE || resultado.nivelRisco === "Crítico" || resultado.nivelRisco === "Alto")) {
      const telLimpo = String(cadastro.telefone).replace(/\D/g, "");
      const linkWhatsApp = "https://wa.me/55" + telLimpo;

      const emojiRisco = resultado.nivelRisco === "Crítico" ? "🚨" : resultado.nivelRisco === "Alto" ? "⚠️" : "📊";
      const assunto = emojiRisco + " Novo Lead no Diagnóstico: " + cadastro.nomeDaMarca + " (Score " + resultado.scorePercentual + "%)";

      const htmlCorpo = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.5;">
          <div style="background-color: #17332A; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">Novo Diagnóstico de Marca Concluído</h2>
            <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.85;">Cnpjotas Proteção de Marcas</p>
          </div>
          
          <div style="background-color: #F8FBF9; padding: 20px; border: 1px solid #E1E8E4; border-top: none; border-radius: 0 0 8px 8px;">
            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E1E8E4; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px; color: #17332A; font-size: 16px; border-bottom: 2px solid #5CBD97; padding-bottom: 5px;">
                🏷️ Dados do Lead
              </h3>
              <p style="margin: 6px 0;"><strong>Nome:</strong> ${cadastro.nome}</p>
              <p style="margin: 6px 0;"><strong>Marca:</strong> <span style="font-size: 15px; color: #17332A; font-weight: bold;">${cadastro.nomeDaMarca}</span></p>
              <p style="margin: 6px 0;"><strong>WhatsApp:</strong> <a href="${linkWhatsApp}" style="color: #4FA180; font-weight: bold;">${cadastro.telefone}</a> (Clique para abrir WhatsApp)</p>
              <p style="margin: 6px 0;"><strong>E-mail:</strong> <a href="mailto:${cadastro.email}">${cadastro.email}</a></p>
              <p style="margin: 6px 0;"><strong>Segmento:</strong> ${cadastro.segmento || "Não informado"}</p>
              <p style="margin: 6px 0;"><strong>Faturamento/Porte:</strong> ${cadastro.faturamentoOuPorte || "Não informado"}</p>
            </div>

            <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #E1E8E4; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px; color: #17332A; font-size: 16px; border-bottom: 2px solid #5CBD97; padding-bottom: 5px;">
                📊 Resultado do Teste
              </h3>
              <p style="margin: 6px 0;"><strong>Score de Segurança:</strong> <span style="font-size: 16px; font-weight: bold; color: #17332A;">${resultado.scorePercentual}%</span></p>
              <p style="margin: 6px 0;"><strong>Perfil:</strong> ${resultado.perfilTitulo}</p>
              <p style="margin: 6px 0;"><strong>Nível de Risco:</strong> <span style="font-weight: bold;">${resultado.nivelRisco}</span></p>
              ${vulnerabilidadesTexto ? `<p style="margin: 6px 0;"><strong>Vulnerabilidades:</strong> <span style="color: #B42318;">${vulnerabilidadesTexto}</span></p>` : ""}
            </div>

            <div style="text-align: center; margin-top: 20px;">
              <a href="${linkWhatsApp}" style="background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                Chamar no WhatsApp agora
              </a>
            </div>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: emailConfigurado,
        subject: assunto,
        htmlBody: htmlCorpo,
      });
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
