# Diagnóstico de Segurança de Marca & Registro no INPI · Cnpjotas

Aplicação interativa de avaliação de maturidade jurídica e segurança de marca para a **Campanha de Registro de Marca e Patente da Cnpjotas**.

## 🚀 Funcionalidades

- **10 Perguntas Estratégicas:** Avaliação detalhada de riscos, mitos do CNPJ, pesquisas de anterioridade, concorrência, cobertura de classes no INPI e impacto de rebranding forçado.
- **Score Dinâmico (0% a 100%):** Cálculo em tempo real classificando o negócio em 4 níveis de risco (*Risco Crítico*, *Risco Alto*, *Risco Moderado* ou *Marca Blindada*).
- **Diagnóstico Personalizado:** Análise individualizada com o nome da marca informada, identificação dos 3 maiores perigos e vulnerabilidades imediatas.
- **CTA de Alta Conversão:** Botão de contato direto para o WhatsApp do time de Registro de Marca da Cnpjotas com mensagem pré-formatada.
- **Integração Google Sheets / Apps Script:** Gravação automática de leads com proteção contra injeção de fórmulas e rastreamento de parâmetros UTM de campanhas.
- **Compatível com Iframe:** Pronto para incorporação em landing pages do RD Station, WordPress ou Cloudflare Pages com auto-redimensionamento de altura via `postMessage`.

## 🛠️ Tecnologias

- **Front-end:** React 19, TypeScript, Vite, Tailwind CSS v4.
- **Formulários e Validação:** React Hook Form + Zod.
- **Backend Serverless:** Google Apps Script + Google Sheets.

## 📦 Como rodar localmente

```bash
# 1. Instalar dependências (pnpm ou npm)
pnpm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Iniciar servidor de desenvolvimento
pnpm dev
```

## 🏗️ Build para Produção

```bash
pnpm build
```
