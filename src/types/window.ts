/** Augment global window */
declare global {
  interface Window {
    jsdocsio: JSDOCSIO;
  }
}

/** Custom namespace for storing globals in window */
export interface JSDOCSIO {
  /** Hash present in URL on fallback pages */
  prevHash?: string;
}
