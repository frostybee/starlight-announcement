/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** Starlight route data */
    starlightRoute?: {
      lang?: string;
    };
    /** Starlight i18n translation function */
    t: (key: string) => string;
  }
}
