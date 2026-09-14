# Backend Google Apps Script · Diagnóstico de Marca Cnpjotas

Este diretório contém o script backend para salvar os leads do formulário em uma planilha Google Sheets dedicada e disparar notificações automáticas para a equipe comercial de Registro de Marca.

## Como implantar:

1. Acesse o [Google Drive](https://drive.google.com) e crie uma nova planilha Google Sheets (ex: `Leads - Campanha Registro de Marca Cnpjotas 2026`).
2. No menu superior da planilha, clique em **Extensões** → **Apps Script**.
3. Cole o conteúdo de `Code.gs` no editor.
4. (Opcional) Configure o e-mail de alerta em **Configurações do Projeto** → **Propriedades do Script**:
   - Propriedade: `EMAIL_COMERCIAL`
   - Valor: `comercial@cnpjotas.com.br` (ou o e-mail que receberá os alertas de leads quentes).
5. Clique em **Implantar** → **Nova Implantação**:
   - Tipo: **Aplicativo da Web**
   - Executar como: **Eu (seu e-mail)**
   - Quem tem acesso: **Qualquer pessoa** (Any)
6. Copie a URL do Web App gerada (`https://script.google.com/macros/s/.../exec`).
7. Cole a URL no arquivo `.env` do front-end na variável `VITE_APPS_SCRIPT_URL`.
