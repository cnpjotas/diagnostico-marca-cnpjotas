/**
 * Comunicação com a janela pai quando embutido em iframe (ex: RD Station, WordPress).
 */
export function enviarAlturaAoPai(forcar = false) {
  if (typeof window === "undefined" || window.parent === window) return;

  const altura = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
  );

  window.parent.postMessage(
    {
      tipo: "CNPJOTAS_IFRAME_RESIZE",
      appId: "diagnostico-marca-cnpjotas",
      altura,
      forcar,
    },
    "*",
  );
}

export function observarAltura() {
  if (typeof window === "undefined") return () => {};

  const ro = new ResizeObserver(() => {
    enviarAlturaAoPai();
  });

  ro.observe(document.body);
  window.addEventListener("resize", () => enviarAlturaAoPai());

  return () => {
    ro.disconnect();
  };
}
