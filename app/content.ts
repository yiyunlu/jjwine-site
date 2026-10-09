export { locales, type Locale } from "./i18n";

type SiteContent = {
  localeName: string;
  meta: { title: string; description: string };
  a11y: { skipToContent: string; home: string; primaryNav: string; languageNav: string; mobileNav: string; closeDialog: string };
  nav: { capabilities: string; process: string; quality: string; partnership: string; start: string; menu: string; close: string };
  hero: { kicker: string; line1: string; emphasis: string; line2: string; copy: string; primary: string; secondary: string; rail: string[] };
  intro: { kicker: string; title: string; body: string; side: string };
  capabilities: { kicker: string; title: string; body: string; items: Array<{ code: string; title: string; body: string; note: string }> };
  process: { kicker: string; title: string; body: string; steps: Array<{ title: string; body: string }> };
  quality: { kicker: string; title: string; body: string; badge: string; badgeNote: string; pillars: Array<{ title: string; body: string }> };
  partnership: { kicker: string; title: string; brandTitle: string; brandBody: string; brandLink: string; retailTitle: string; retailBody: string; retailLink: string };
  contact: { kicker: string; title: string; body: string; button: string; note: string };
  brief: { title: string; intro: string; company: string; companyPlaceholder: string; market: string; marketPlaceholder: string; product: string; productPlaceholder: string; format: string; formatPlaceholder: string; volume: string; volumePlaceholder: string; timing: string; timingPlaceholder: string; details: string; detailsPlaceholder: string; download: string; privacy: string };
  footer: { line: string; legal: string; top: string; legalNav: string; privacyLink: string; legalLink: string };
};

export const content: Record<Locale, SiteContent> = {
  en: {
    localeName: "English",
    meta: {
      title: "JJWine — China Production, Delivered to Global Standards",
      description: "End-to-end China production solutions for global wine and beverage brands.",
    },
    a11y: { skipToContent: "Skip to main content", home: "JJWine home", primaryNav: "Primary", languageNav: "Language", mobileNav: "Menu", closeDialog: "Close dialog" },
    nav: { capabilities: "Capabilities", process: "Process", quality: "Quality", partnership: "Partnership", start: "Start a project", menu: "Menu", close: "Close" },
    hero: {
      kicker: "Independent production partner · China",
      line1: "Your standards.", emphasis: "Made real", line2: "in China.",
      copy: "JJWine coordinates localization, manufacturing, quality and compliance for global wine and beverage brands.",
      primary: "Start a project", secondary: "Explore capabilities", rail: ["Localize", "Produce", "Assure"],
    },
    intro: {
      kicker: "The operating idea", title: "One brief. Full-chain execution.",
      body: "You bring the brand standard. JJWine builds and coordinates the China production path—from product and packaging localization to qualified manufacturing, quality release and delivery.",
      side: "Brand standard in. Reliable execution out.",
    },
    capabilities: {
      kicker: "Production formats", title: "Built around the product—not a fixed line.",
      body: "Format, liquid, channel and project requirements are assessed together before the production route is confirmed.",
      items: [
        { code: "01", title: "Bottle", body: "Still, sparkling and wine-based products across project-appropriate glass formats and closures.", note: "Glass · closures · secondary packaging" },
        { code: "02", title: "Can", body: "Contemporary formats for sparkling, wine-based and ready-to-drink concepts, subject to product validation.", note: "Compact · portable · channel-ready" },
        { code: "03", title: "Bag-in-Box", body: "Efficient multi-serve formats for retail and professional channels, with project-specific material review.", note: "Retail · food service · multi-serve" },
      ],
    },
    process: {
      kicker: "How we work", title: "A controlled path from standard to shelf.",
      body: "Every project is scoped around the brand owner’s approvals, the target market and the qualified production site.",
      steps: [
        { title: "Align", body: "Brand brief, target channel, liquid, packaging, volume and approval rules." },
        { title: "Localize", body: "Translate global specifications into a China-ready product and material plan." },
        { title: "Validate", body: "Sampling, technical review, artwork and project-specific compliance checks." },
        { title: "Produce", body: "Coordinated manufacturing at the confirmed production site." },
        { title: "Release", body: "In-process controls, batch testing, release documents and traceability." },
        { title: "Deliver", body: "Warehousing and delivery coordination for the agreed channel." },
      ],
    },
    quality: {
      kicker: "Quality + compliance", title: "Quality is project architecture—not a final inspection.",
      body: "The site, certification scope, product standard and control plan are confirmed for each project. Public claims stay tied to current evidence and authorization.",
      badge: "FSSC 22000", badgeNote: "Current production partner certification",
      pillars: [
        { title: "Qualification", body: "Production-site capability and certification scope checked against the project." },
        { title: "Brand control", body: "Specifications, samples, artwork and changes follow defined approval points." },
        { title: "Batch release", body: "Testing, release documentation, retention samples and traceability by project." },
        { title: "Audit-ready", body: "Structured evidence exchange and quality review with the relevant teams." },
      ],
    },
    partnership: {
      kicker: "Two ways to work with us", title: "Built for brand owners and retail operators.",
      brandTitle: "For global brands", brandBody: "Translate global standards into controlled China production with one coordinated project path.", brandLink: "Discuss China production",
      retailTitle: "For retail & private label", retailBody: "Develop channel-relevant products with clear format, quality, scale and delivery requirements.", retailLink: "Develop a retail range",
    },
    contact: {
      kicker: "Start with the standard", title: "Bring us what you want to make. We’ll map the execution.",
      body: "A useful first brief covers the product, target market, format, volume, approval requirements and intended launch timing.",
      button: "Prepare a project brief", note: "Your brief is generated on this device. No project data is uploaded.",
    },
    brief: {
      title: "Project brief", intro: "Create a structured first brief to share with your JJWine contact.",
      company: "Company", companyPlaceholder: "Brand owner or retailer", market: "Target market", marketPlaceholder: "Country, region or channel",
      product: "Product", productPlaceholder: "Wine, sparkling, RTD…", format: "Format", formatPlaceholder: "Bottle, can, BIB…",
      volume: "Initial volume", volumePlaceholder: "Estimated first run", timing: "Target timing", timingPlaceholder: "Desired launch window",
      details: "Standards and requirements", detailsPlaceholder: "Liquid, packaging, certification, approval or channel requirements",
      download: "Download brief", privacy: "This form does not transmit or store your information.",
    },
    footer: { line: "Global standards. Local execution.", legal: "Capabilities and certifications are confirmed against each project, product and qualified production site.", top: "Back to top", legalNav: "Legal", privacyLink: "Privacy Policy", legalLink: "Legal Notice" },
  },
  "zh-cn": {
    localeName: "简体中文",
    meta: { title: "JJWine — 全球酒饮品牌的中国生产落地伙伴", description: "为全球酒饮品牌提供产品本地化、生产组织、质量治理与合规协调的一站式解决方案。" },
    a11y: { skipToContent: "跳转到主要内容", home: "JJWine 首页", primaryNav: "主导航", languageNav: "语言选择", mobileNav: "菜单", closeDialog: "关闭对话框" },
    nav: { capabilities: "生产能力", process: "合作流程", quality: "质量合规", partnership: "合作对象", start: "启动项目", menu: "菜单", close: "关闭" },
    hero: {
      kicker: "独立生产合作平台 · 中国", line1: "全球品牌标准，", emphasis: "在中国", line2: "真正落地。",
      copy: "JJWine 为全球酒饮品牌统筹产品本地化、生产组织、质量治理与合规协调。",
      primary: "启动项目", secondary: "查看生产能力", rail: ["本地化", "生产", "质量保证"],
    },
    intro: {
      kicker: "我们的业务逻辑", title: "一个需求，全链路承接。",
      body: "您提供品牌标准，JJWine 设计并统筹中国生产路径——从产品与包装本地化，到合格工厂生产、批次放行与交付。",
      side: "输入品牌标准，交付可靠结果。",
    },
    capabilities: {
      kicker: "生产与包装形式", title: "围绕产品匹配能力，而不是套用固定产线。",
      body: "我们综合评估产品、液体、渠道和项目要求，再确认具体生产与包装方案。",
      items: [
        { code: "01", title: "瓶装", body: "覆盖静止、起泡及葡萄酒基产品，按项目匹配玻璃瓶型、封口和外包装。", note: "瓶型 · 封口 · 二级包装" },
        { code: "02", title: "罐装", body: "适用于起泡、葡萄酒基和即饮产品，具体可行性以产品验证结果为准。", note: "便携 · 现代 · 渠道适配" },
        { code: "03", title: "盒中袋", body: "面向零售和专业渠道的多容量包装，并按项目审核液袋、纸盒与灌装适配。", note: "零售 · 餐饮 · 多人分享" },
      ],
    },
    process: {
      kicker: "合作方式", title: "从品牌标准到市场交付，全程受控。",
      body: "每个项目都围绕品牌方审批要求、目标市场和经确认的生产场地独立制定。",
      steps: [
        { title: "需求对齐", body: "确认品牌需求、目标渠道、液体、包装、数量和审批规则。" },
        { title: "本地化", body: "把全球规格转化为适合中国生产的产品与物料方案。" },
        { title: "验证", body: "完成打样、技术评估、包材稿件及项目所需合规核查。" },
        { title: "生产", body: "在经确认的生产场地组织量产。" },
        { title: "放行", body: "执行过程控制、批次检测、放行文件与追溯管理。" },
        { title: "交付", body: "按照约定渠道统筹仓储与交付。" },
      ],
    },
    quality: {
      kicker: "质量 + 合规", title: "质量不是最后一道检查，而是项目架构。",
      body: "每个项目分别确认生产场地、认证范围、产品标准与控制计划；所有公开能力表述均与现行证据和授权绑定。",
      badge: "FSSC 22000", badgeNote: "当前生产合作伙伴认证",
      pillars: [
        { title: "能力准入", body: "依据具体项目核对生产场地能力及体系认证适用范围。" },
        { title: "品牌控制", body: "规格、样品、稿件和变更均设置明确的品牌审批节点。" },
        { title: "批次放行", body: "按项目执行检测、放行文件、留样和批次追溯。" },
        { title: "审计协同", body: "为相关团队提供结构化证据交换和质量评审支持。" },
      ],
    },
    partnership: {
      kicker: "两类合作入口", title: "服务海外品牌，也服务大型零售渠道。",
      brandTitle: "海外品牌方", brandBody: "把全球品牌标准转化为受控的中国生产路径，并由一个团队统筹项目。", brandLink: "讨论中国生产项目",
      retailTitle: "零售与自有品牌", retailBody: "围绕渠道需求开发产品，明确包装、质量、规模化与交付要求。", retailLink: "开发渠道专供产品",
    },
    contact: {
      kicker: "从标准开始", title: "告诉我们您想做什么，我们来规划生产路径。",
      body: "一份有效的初始需求应包含产品、目标市场、包装形式、数量、审批要求与上市时间。",
      button: "生成项目需求简报", note: "简报仅在您的设备上生成，不上传任何项目数据。",
    },
    brief: {
      title: "项目需求简报", intro: "生成一份结构化初始需求，发送给您的 JJWine 对接人。",
      company: "公司", companyPlaceholder: "品牌方或零售渠道", market: "目标市场", marketPlaceholder: "国家、地区或渠道",
      product: "产品", productPlaceholder: "葡萄酒、起泡酒、RTD等", format: "包装形式", formatPlaceholder: "瓶、罐、盒中袋等",
      volume: "首批数量", volumePlaceholder: "预计首次生产数量", timing: "目标时间", timingPlaceholder: "期望上市窗口",
      details: "标准及其他要求", detailsPlaceholder: "液体、包装、认证、审批或渠道要求",
      download: "下载需求简报", privacy: "本表单不会传输或储存您的信息。",
    },
    footer: { line: "全球标准，本地执行。", legal: "所有能力与认证均需结合具体项目、产品和经确认的生产场地核实。", top: "返回顶部", legalNav: "法律信息", privacyLink: "隐私政策", legalLink: "法律声明" },
  },
  es: {
    localeName: "Español",
    meta: { title: "JJWine — Producción en China conforme a estándares globales", description: "Soluciones integrales de localización, producción, calidad y cumplimiento en China para marcas internacionales de vinos y bebidas." },
    a11y: { skipToContent: "Saltar al contenido principal", home: "Inicio de JJWine", primaryNav: "Principal", languageNav: "Idioma", mobileNav: "Menú", closeDialog: "Cerrar diálogo" },
    nav: { capabilities: "Capacidades", process: "Proceso", quality: "Calidad", partnership: "Colaboración", start: "Iniciar proyecto", menu: "Menú", close: "Cerrar" },
    hero: {
      kicker: "Socio independiente de producción · China", line1: "Tus estándares.", emphasis: "Hechos realidad", line2: "en China.",
      copy: "JJWine coordina la localización, la producción, la calidad y el cumplimiento para marcas internacionales de vinos y bebidas.",
      primary: "Iniciar proyecto", secondary: "Ver capacidades", rail: ["Localizar", "Producir", "Asegurar"],
    },
    intro: {
      kicker: "La idea operativa", title: "Un brief. Ejecución integral.",
      body: "Tú aportas el estándar de marca. JJWine diseña y coordina la ruta de producción en China: localización del producto y el envase, fabricación cualificada, liberación de lotes y entrega.",
      side: "Entra el estándar. Sale una ejecución fiable.",
    },
    capabilities: {
      kicker: "Formatos de producción", title: "La capacidad se adapta al producto, no al revés.",
      body: "Evaluamos conjuntamente el formato, el líquido, el canal y los requisitos antes de confirmar la ruta de producción.",
      items: [
        { code: "01", title: "Botella", body: "Vinos tranquilos, espumosos y bebidas a base de vino en formatos de vidrio y cierres adecuados al proyecto.", note: "Vidrio · cierres · embalaje" },
        { code: "02", title: "Lata", body: "Formatos contemporáneos para conceptos espumosos, a base de vino y listos para beber, sujetos a validación.", note: "Compacto · portátil · para el canal" },
        { code: "03", title: "Bag-in-Box", body: "Formatos multidosis eficientes para retail y canal profesional, con revisión de materiales por proyecto.", note: "Retail · hostelería · multidosis" },
      ],
    },
    process: {
      kicker: "Cómo trabajamos", title: "Una ruta controlada del estándar al mercado.",
      body: "Cada proyecto se define según las aprobaciones de la marca, el mercado objetivo y la planta de producción cualificada.",
      steps: [
        { title: "Alinear", body: "Brief de marca, canal, líquido, envase, volumen y reglas de aprobación." },
        { title: "Localizar", body: "Convertir las especificaciones globales en un plan de producto y materiales para China." },
        { title: "Validar", body: "Muestras, revisión técnica, artes y verificaciones de cumplimiento del proyecto." },
        { title: "Producir", body: "Fabricación coordinada en la planta de producción confirmada." },
        { title: "Liberar", body: "Controles en proceso, análisis de lote, documentación y trazabilidad." },
        { title: "Entregar", body: "Coordinación de almacenamiento y entrega para el canal acordado." },
      ],
    },
    quality: {
      kicker: "Calidad + cumplimiento", title: "La calidad es la arquitectura del proyecto, no la inspección final.",
      body: "Para cada proyecto se confirman la planta, el alcance de certificación, el estándar del producto y el plan de control. Las declaraciones públicas se vinculan a evidencia y autorización vigentes.",
      badge: "FSSC 22000", badgeNote: "Certificación del socio de producción actual",
      pillars: [
        { title: "Cualificación", body: "Capacidad y alcance de certificación contrastados con el proyecto." },
        { title: "Control de marca", body: "Especificaciones, muestras, artes y cambios con aprobaciones definidas." },
        { title: "Liberación", body: "Ensayos, documentación, muestras de retención y trazabilidad por proyecto." },
        { title: "Preparado para auditoría", body: "Intercambio estructurado de evidencia y revisión de calidad." },
      ],
    },
    partnership: {
      kicker: "Dos formas de colaborar", title: "Para propietarios de marca y operadores de retail.",
      brandTitle: "Marcas internacionales", brandBody: "Convierte los estándares globales en producción controlada en China mediante una ruta coordinada.", brandLink: "Hablar de producción en China",
      retailTitle: "Retail y marca privada", retailBody: "Desarrolla productos para el canal con requisitos claros de formato, calidad, escala y entrega.", retailLink: "Desarrollar una gama retail",
    },
    contact: {
      kicker: "Empezar por el estándar", title: "Cuéntanos qué quieres producir. Trazaremos la ejecución.",
      body: "Un primer brief útil incluye producto, mercado, formato, volumen, requisitos de aprobación y fecha objetivo.",
      button: "Preparar brief de proyecto", note: "El brief se genera en tu dispositivo. No se carga ningún dato del proyecto.",
    },
    brief: {
      title: "Brief de proyecto", intro: "Crea un brief estructurado para compartir con tu contacto de JJWine.",
      company: "Empresa", companyPlaceholder: "Marca o distribuidor", market: "Mercado objetivo", marketPlaceholder: "País, región o canal",
      product: "Producto", productPlaceholder: "Vino, espumoso, RTD…", format: "Formato", formatPlaceholder: "Botella, lata, BIB…",
      volume: "Volumen inicial", volumePlaceholder: "Primera producción estimada", timing: "Fecha objetivo", timingPlaceholder: "Ventana de lanzamiento",
      details: "Estándares y requisitos", detailsPlaceholder: "Líquido, envase, certificación, aprobación o canal",
      download: "Descargar brief", privacy: "Este formulario no transmite ni almacena tu información.",
    },
    footer: { line: "Estándares globales. Ejecución local.", legal: "Las capacidades y certificaciones se confirman para cada proyecto, producto y planta cualificada.", top: "Volver arriba", legalNav: "Información legal", privacyLink: "Política de privacidad", legalLink: "Aviso legal" },
  },
};
