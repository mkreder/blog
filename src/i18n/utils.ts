import { ui, defaultLang, type Lang } from "./translations";

export { type Lang, defaultLang, languages } from "./translations";

type TranslationKey = keyof (typeof ui)["en"];

export function t(lang: Lang, key: TranslationKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

export function getLangFromPath(pathname: string): Lang {
  if (pathname.startsWith("/es/") || pathname === "/es") return "es";
  return "en";
}

export function localizedPath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/es${path === "/" ? "" : path}`;
}

export function formatDateLocalized(date: string | Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es-AR" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}
