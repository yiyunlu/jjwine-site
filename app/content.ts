import type { Locale } from "./i18n";

export { locales, type Locale } from "./i18n";

type SiteContent = {
  meta: { title: string; description: string };
  footer: { line: string; legal: string; top: string; legalNav: string; privacyLink: string; legalLink: string; contactLabel: string };
};

export const content: Record<Locale, SiteContent> = {
  en: {
    meta: {
      title: "JJWine — China Production, Delivered to Global Standards",
      description: "End-to-end China production solutions for global wine and beverage brands.",
    },
    footer: { line: "Global standards. Local execution.", legal: "Capabilities and certifications are confirmed against each project, product and qualified production site.", top: "Back to top", legalNav: "Legal", privacyLink: "Privacy Policy", legalLink: "Legal Notice", contactLabel: "Contact" },
  },
  "zh-cn": {
    meta: { title: "JJWine — 全球酒饮品牌的中国生产落地伙伴", description: "为全球酒饮品牌提供产品本地化、生产组织、质量治理与合规协调的一站式解决方案。" },
    footer: { line: "全球标准，本地执行。", legal: "所有能力与认证均需结合具体项目、产品和经确认的生产场地核实。", top: "返回顶部", legalNav: "法律信息", privacyLink: "隐私政策", legalLink: "法律声明", contactLabel: "联系我们" },
  },
  es: {
    meta: { title: "JJWine — Producción en China conforme a estándares globales", description: "Soluciones integrales de localización, producción, calidad y cumplimiento en China para marcas internacionales de vinos y bebidas." },
    footer: { line: "Estándares globales. Ejecución local.", legal: "Las capacidades y certificaciones se confirman para cada proyecto, producto y planta cualificada.", top: "Volver arriba", legalNav: "Información legal", privacyLink: "Política de privacidad (en inglés)", legalLink: "Aviso legal (en inglés)", contactLabel: "Contacto" },
  },
  fr: {
    meta: {
      title: "JJWine — Production en Chine, livrée selon les standards internationaux",
      description: "Solutions complètes de localisation, production, qualité et conformité en Chine pour les marques internationales de vins et boissons.",
    },
    footer: { line: "Standards globaux. Exécution locale.", legal: "Les capacités et certifications sont confirmées pour chaque projet, produit et site qualifié.", top: "Retour en haut", legalNav: "Informations légales", privacyLink: "Politique de confidentialité (en anglais)", legalLink: "Mentions légales (en anglais)", contactLabel: "Contact" },
  },
};
