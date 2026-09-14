/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPS_SCRIPT_URL?: string;
  readonly VITE_APP_ID?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
