export { locales, type Locale } from "./i18n";

export type SiteHeroMotionCopy = {
  pause: string;
  play: string;
};

type SiteContent = {
  localeName: string;
  meta: { title: string; description: string };
  a11y: { skipToContent: string; home: string; primaryNav: string; languageNav: string; mobileNav: string; closeDialog: string; formatTags: string; sectionNav: string };
  nav: {
    brandTagline: [string, string, string];
    home: string;
    formats: string;
    process: string;
    quality: string;
    partnership: string;
    about: string;
    start: string;
    menu: string;
    close: string;
  };
  sectionRail: { top: string; capabilities: string; process: string; quality: string; partnership: string; contact: string };
  hero: {
    eyebrow: string;
    line1: string;
    emphasis: string;
    line2: string;
    copy: string;
    pillars: Array<{ icon: "globe" | "gear" | "shield"; title: string; body: string }>;
    panels: {
      mainCapTop: string[];
      mainCapBottom: string;
      sideCap: string[];
      mainAlt: string;
      sideAlt: string;
      mainNote: string;
      sideNote: string;
    };
    primary: string;
  };
  heroMotion: SiteHeroMotionCopy;
  banner: { left: string[]; right: string; placeholder: string; imageAlt: string };
  intro: { kicker: string; title: string; body: string; side: string };
  capabilities: {
    kicker: string;
    title: string;
    titleBreak?: string;
    body: string;
    linkLabel: string;
    explore: string;
    items: Array<{ code: string; title: string; titleEn?: string; body: string; badge: string; note: string; tagline: string; tags: string[] }>;
  };
  process: {
    kicker: string;
    title: string;
    body: string;
    linkLabel: string;
    steps: Array<{ icon: "chat" | "file" | "flask" | "gear" | "shield" | "truck"; title: string; body: string }>;
  };
  quality: { kicker: string; title: string; body: string; badge: string; badgeNote: string; pillars: Array<{ title: string; body: string }> };
  partnership: { kicker: string; title: string; brandTitle: string; brandBody: string; brandLink: string; retailTitle: string; retailBody: string; retailLink: string };
  contact: { kicker: string; title: string; body: string; button: string; note: string };
  brief: { title: string; intro: string; company: string; companyPlaceholder: string; market: string; marketPlaceholder: string; product: string; productPlaceholder: string; format: string; formatPlaceholder: string; volume: string; volumePlaceholder: string; timing: string; timingPlaceholder: string; details: string; detailsPlaceholder: string; download: string; privacy: string; fileHeading: string; fileName: string };
  footer: { line: string; legal: string; top: string; legalNav: string; privacyLink: string; legalLink: string };
};

export const content: Record<Locale, SiteContent> = {
  en: {
    localeName: "English",
    meta: {
      title: "JJWine — China Production, Delivered to Global Standards",
      description: "End-to-end China production solutions for global wine and beverage brands.",
    },
    a11y: { skipToContent: "Skip to main content", home: "JJWine home", primaryNav: "Primary", languageNav: "Language", mobileNav: "Menu", closeDialog: "Close dialog", formatTags: "Format tags", sectionNav: "Section navigation" },
    nav: {
      brandTagline: ["Bridging", "global brands", "to China"],
      home: "Home",
      formats: "Formats",
      process: "Process",
      quality: "Quality & compliance",
      partnership: "Partners",
      about: "About us",
      start: "Start a project",
      menu: "Menu",
      close: "Close",
    },
    sectionRail: { top: "Home", capabilities: "Formats", process: "Process", quality: "Quality", partnership: "Partners", contact: "Brief" },
    hero: {
      eyebrow: "Your partner for wines & beverages in China",
      line1: "Your standards.", emphasis: "Made real", line2: "in China.",
      copy: "JJWine coordinates localization, manufacturing, quality and compliance for global wine and beverage brands.",
      pillars: [
        { icon: "globe", title: "Localization", body: "China market and regulatory context" },
        { icon: "gear", title: "Production coordination", body: "Qualified capacity matched to the project" },
        { icon: "shield", title: "Quality & compliance", body: "Controls from source to delivery" },
      ],
      panels: {
        mainCapTop: ["Same", "standards", "greater", "possibilities"],
        mainCapBottom: "Helping global drinks go further in China",
        sideCap: ["Bottle.", "Can.", "Bag-in-box.", "Made possible."],
        mainAlt: "Abstract bottling line illustration (placeholder, not a factory photo)",
        sideAlt: "JJWine formats can product image on dark background",
        mainNote: "Placeholder illustration · replace with approved factory photography",
        sideNote: "Formats product image · brand authorization pending",
      },
      primary: "Start a project",
    },
    banner: {
      left: ["Good drinks", "& a brighter tomorrow"],
      right: "Connecting great drinks with China’s market\nand broader possibilities",
      placeholder: "Illustration placeholder · vineyard photo when authorized",
      imageAlt: "Vineyard landscape illustration (placeholder, not a photo)",
    },
    heroMotion: {
      pause: "Pause hero animation",
      play: "Play hero animation",
    },
    intro: {
      kicker: "01 / Overview", title: "One brief. Full-chain execution.",
      body: "You bring the brand standard. JJWine builds and coordinates the China production path—from product and packaging localization to qualified manufacturing, quality release and delivery.",
      side: "Brand standard in. Reliable execution out.",
    },
    capabilities: {
      kicker: "Product formats",
      title: "Formats built around your product",
      titleBreak: "and channel needs.",
      body: "Flexible production routes aligned to your product positioning and market strategy.",
      linkLabel: "Explore formats",
      explore: "Learn more",
      items: [
        { code: "01", title: "Bottle", body: "A classic choice across categories and markets.", badge: "750 ml", note: "Glass · closures · secondary packaging", tagline: "750 ml · 375 ml", tags: ["Glass", "Screwcap / Cork", "Private label"] },
        { code: "02", title: "Can", body: "Lightweight and portable for contemporary consumption.", badge: "330 ml", note: "Compact · portable · channel-ready", tagline: "250 ml · 375 ml", tags: ["Aluminium", "Single-serve", "Full wrap"] },
        { code: "03", title: "Bag-in-Box", titleEn: "BIB", body: "Efficient multi-serve formats for retail and professional channels.", badge: "3 L", note: "Retail · food service · multi-serve", tagline: "3 L · 5 L · 10 L", tags: ["3–10 L", "Tap dispense", "Low freight"] },
      ],
    },
    process: {
      kicker: "Our process",
      title: "One brief. Full-chain execution.",
      body: "From concept to delivery, JJWine works alongside you to make complex production manageable.",
      linkLabel: "See the process",
      steps: [
        { icon: "chat", title: "Align", body: "Brand goals and market requirements." },
        { icon: "file", title: "Localize", body: "Formulation, regulation and labelling." },
        { icon: "flask", title: "Validate", body: "Samples, testing and brand sign-off." },
        { icon: "gear", title: "Produce", body: "Coordinated manufacturing at the confirmed production site." },
        { icon: "shield", title: "Release", body: "Quality review and batch release." },
        { icon: "truck", title: "Deliver", body: "On-time, compliant delivery." },
      ],
    },
    quality: {
      kicker: "04 / Quality", title: "Quality is project architecture—not a final inspection.",
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
      kicker: "05 / Partnership", title: "Built for brand owners and retail operators.",
      brandTitle: "For global brands", brandBody: "Translate global standards into controlled China production with one coordinated project path.", brandLink: "Discuss China production",
      retailTitle: "For retail & private label", retailBody: "Develop channel-relevant products with clear format, quality, scale and delivery requirements.", retailLink: "Develop a retail range",
    },
    contact: {
      kicker: "06 / Brief", title: "Bring us what you want to make. We'll map the execution.",
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
      fileHeading: "JJWINE — PROJECT BRIEF", fileName: "jjwine-project-brief.txt",
    },
    footer: { line: "Global standards. Local execution.", legal: "Capabilities and certifications are confirmed against each project, product and qualified production site.", top: "Back to top", legalNav: "Legal", privacyLink: "Privacy Policy", legalLink: "Legal Notice" },
  },
  "zh-cn": {
    localeName: "简体中文",
    meta: { title: "JJWine — 全球酒饮品牌的中国生产落地伙伴", description: "为全球酒饮品牌提供产品本地化、生产组织、质量治理与合规协调的一站式解决方案。" },
    a11y: { skipToContent: "跳转到主要内容", home: "JJWine 首页", primaryNav: "主导航", languageNav: "语言选择", mobileNav: "菜单", closeDialog: "关闭对话框", formatTags: "包装标签", sectionNav: "板块导航" },
    nav: {
      brandTagline: ["Bridging", "global brands", "to China"],
      home: "首页",
      formats: "包装形式",
      process: "合作流程",
      quality: "质量与合规",
      partnership: "合作对象",
      about: "关于我们",
      start: "启动项目",
      menu: "菜单",
      close: "关闭",
    },
    sectionRail: { top: "首页", capabilities: "生产形式", process: "流程", quality: "质量", partnership: "合作", contact: "需求" },
    hero: {
      eyebrow: "Your partner for wines & beverages in China",
      line1: "全球品牌标准，", emphasis: "在中国", line2: "真正落地。",
      copy: "从产品本地化、生产组织到质量治理与交付，一站式统筹。",
      pillars: [
        { icon: "globe", title: "本地化落地", body: "理解中国市场与法规" },
        { icon: "gear", title: "稳定的生产组织", body: "匹配合适的产能与资源" },
        { icon: "shield", title: "质量合规保障", body: "从源头到交付的全流程管控" },
      ],
      panels: {
        mainCapTop: ["Same", "standards", "greater", "possibilities"],
        mainCapBottom: "让世界的好酒饮在中国走得更远",
        sideCap: ["Bottle.", "Can.", "Bag-in-box.", "Made possible."],
        mainAlt: "抽象灌装线插画（占位，非实拍）",
        sideAlt: "JJWine Formats 罐装产品图（深色底）",
        mainNote: "占位插画 · 待替换为已确认出处的合作工厂实拍",
        sideNote: "Formats 产品图 · 品牌授权待确认",
      },
      primary: "启动项目",
    },
    banner: {
      left: ["Good drinks", "& a brighter tomorrow"],
      right: "连接好酒饮与中国市场\n创造更广阔的可能",
      placeholder: "插画占位 · 可换授权葡萄园图",
      imageAlt: "葡萄园远景插画（占位，非实拍）",
    },
    heroMotion: {
      pause: "暂停首页动画",
      play: "播放首页动画",
    },
    intro: {
      kicker: "01 / 概览", title: "一个需求，全链路承接。",
      body: "您提供品牌标准，JJWine 设计并统筹中国生产路径——从产品与包装本地化，到合格工厂生产、批次放行与交付。",
      side: "输入品牌标准，交付可靠结果。",
    },
    capabilities: {
      kicker: "Product formats",
      title: "多种包装形式，",
      titleBreak: "满足不同品牌需求。",
      body: "灵活的生产方案，匹配您的产品定位与市场策略。",
      linkLabel: "了解包装形式",
      explore: "了解更多",
      items: [
        { code: "01", title: "瓶装", body: "经典之选，\n适配多种品类与市场。", badge: "750 ml", note: "瓶型 · 封口 · 二级包装", tagline: "750 ml · 375 ml", tags: ["玻璃瓶", "螺旋盖 / 橡木塞", "自有品牌"] },
        { code: "02", title: "罐装", body: "轻量、便捷，\n面向新消费场景。", badge: "330 ml", note: "便携 · 现代 · 渠道适配", tagline: "250 ml · 375 ml", tags: ["铝罐", "单人份", "全包覆印刷"] },
        { code: "03", title: "盒中袋", titleEn: "BIB", body: "高性价比与环保优势，\n适合多种渠道与场景。", badge: "3 L", note: "零售 · 餐饮 · 多人分享", tagline: "3 L · 5 L · 10 L", tags: ["3–10 升", "龙头出酒", "低运费"] },
      ],
    },
    process: {
      kicker: "Our process",
      title: "一个需求，全链路承接。",
      body: "从概念到交付，JJWine 与您并肩，把复杂的事情变简单。",
      linkLabel: "了解合作流程",
      steps: [
        { icon: "chat", title: "需求对齐", body: "理解品牌目标与市场需求" },
        { icon: "file", title: "产品本地化", body: "配方、法规与标签合规" },
        { icon: "flask", title: "验证", body: "样品测试与品牌确认" },
        { icon: "gear", title: "生产", body: "在经确认的生产场地组织量产。" },
        { icon: "shield", title: "放行", body: "质量审核与批次放行" },
        { icon: "truck", title: "交付", body: "按时、合规、高效交付" },
      ],
    },
    quality: {
      kicker: "04 / 质量", title: "质量不是最后一道检查，而是项目架构。",
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
      kicker: "05 / 合作", title: "服务海外品牌，也服务大型零售渠道。",
      brandTitle: "海外品牌方", brandBody: "把全球品牌标准转化为受控的中国生产路径，并由一个团队统筹项目。", brandLink: "讨论中国生产项目",
      retailTitle: "零售与自有品牌", retailBody: "围绕渠道需求开发产品，明确包装、质量、规模化与交付要求。", retailLink: "开发渠道专供产品",
    },
    contact: {
      kicker: "06 / 简报", title: "告诉我们您想做什么，我们来规划生产路径。",
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
      fileHeading: "JJWINE — 项目需求简报", fileName: "jjwine-项目需求简报.txt",
    },
    footer: { line: "全球标准，本地执行。", legal: "所有能力与认证均需结合具体项目、产品和经确认的生产场地核实。", top: "返回顶部", legalNav: "法律信息", privacyLink: "隐私政策", legalLink: "法律声明" },
  },
  es: {
    localeName: "Español",
    meta: { title: "JJWine — Producción en China conforme a estándares globales", description: "Soluciones integrales de localización, producción, calidad y cumplimiento en China para marcas internacionales de vinos y bebidas." },
    a11y: { skipToContent: "Saltar al contenido principal", home: "Inicio de JJWine", primaryNav: "Principal", languageNav: "Idioma", mobileNav: "Menú", closeDialog: "Cerrar diálogo", formatTags: "Etiquetas de formato", sectionNav: "Navegación de secciones" },
    nav: {
      brandTagline: ["Bridging", "global brands", "to China"],
      home: "Inicio",
      formats: "Formatos",
      process: "Proceso",
      quality: "Calidad y cumplimiento",
      partnership: "Colaboración",
      about: "Nosotros",
      start: "Iniciar proyecto",
      menu: "Menú",
      close: "Cerrar",
    },
    sectionRail: { top: "Inicio", capabilities: "Formatos", process: "Proceso", quality: "Calidad", partnership: "Socios", contact: "Brief" },
    hero: {
      eyebrow: "Your partner for wines & beverages in China",
      line1: "Tus estándares.", emphasis: "Hechos realidad", line2: "en China.",
      copy: "JJWine coordina la localización, la producción, la calidad y el cumplimiento para marcas internacionales de vinos y bebidas.",
      pillars: [
        { icon: "globe", title: "Localización", body: "Mercado y normativa en China" },
        { icon: "gear", title: "Coordinación de producción", body: "Capacidad cualificada por proyecto" },
        { icon: "shield", title: "Calidad y cumplimiento", body: "Control de origen a entrega" },
      ],
      panels: {
        mainCapTop: ["Same", "standards", "greater", "possibilities"],
        mainCapBottom: "Ayudando a las bebidas globales a llegar más lejos en China",
        sideCap: ["Bottle.", "Can.", "Bag-in-box.", "Made possible."],
        mainAlt: "Ilustración abstracta de línea de envasado (marcador de posición)",
        sideAlt: "Imagen de producto en lata JJWine Formats (fondo oscuro)",
        mainNote: "Ilustración provisional · sustituir por foto de fábrica autorizada",
        sideNote: "Imagen de producto Formats · autorización de marca pendiente",
      },
      primary: "Iniciar proyecto",
    },
    banner: {
      left: ["Good drinks", "& a brighter tomorrow"],
      right: "Conectar grandes bebidas con el mercado chino\ny ampliar las posibilidades",
      placeholder: "Marcador de ilustración · foto de viñedo cuando esté autorizada",
      imageAlt: "Ilustración de viñedo (marcador de posición, no es una foto)",
    },
    heroMotion: {
      pause: "Pausar animación del hero",
      play: "Reproducir animación del hero",
    },
    intro: {
      kicker: "01 / Resumen", title: "Un brief. Ejecución integral.",
      body: "Tú aportas el estándar de marca. JJWine diseña y coordina la ruta de producción en China: localización del producto y el envase, fabricación cualificada, liberación de lotes y entrega.",
      side: "Entra el estándar. Sale una ejecución fiable.",
    },
    capabilities: {
      kicker: "Product formats",
      title: "Formatos adaptados",
      titleBreak: "a su producto y canal.",
      body: "Rutas de producción flexibles alineadas con su posicionamiento y estrategia de mercado.",
      linkLabel: "Ver formatos",
      explore: "Más información",
      items: [
        { code: "01", title: "Botella", body: "Opción clásica para múltiples categorías y mercados.", badge: "750 ml", note: "Vidrio · cierres · embalaje", tagline: "750 ml · 375 ml", tags: ["Vidrio", "Tapón / Corcho", "Marca privada"] },
        { code: "02", title: "Lata", body: "Ligera y práctica para nuevos escenarios de consumo.", badge: "330 ml", note: "Compacto · portátil · para el canal", tagline: "250 ml · 375 ml", tags: ["Aluminio", "Monodosis", "Impresión total"] },
        { code: "03", title: "Bag-in-Box", titleEn: "BIB", body: "Formatos multidosis eficientes para retail y canal profesional.", badge: "3 L", note: "Retail · hostelería · multidosis", tagline: "3 L · 5 L · 10 L", tags: ["3–10 L", "Grifo", "Bajo flete"] },
      ],
    },
    process: {
      kicker: "Our process",
      title: "Un brief. Ejecución integral.",
      body: "Del concepto a la entrega, JJWine le acompaña para hacer manejable la producción compleja.",
      linkLabel: "Ver el proceso",
      steps: [
        { icon: "chat", title: "Alinear", body: "Objetivos de marca y requisitos de mercado." },
        { icon: "file", title: "Localizar", body: "Formulación, normativa y etiquetado." },
        { icon: "flask", title: "Validar", body: "Muestras, pruebas y aprobación de marca." },
        { icon: "gear", title: "Producir", body: "Fabricación coordinada en la planta de producción confirmada." },
        { icon: "shield", title: "Liberar", body: "Revisión de calidad y liberación de lote." },
        { icon: "truck", title: "Entregar", body: "Entrega puntual y conforme." },
      ],
    },
    quality: {
      kicker: "04 / Calidad", title: "La calidad es la arquitectura del proyecto, no la inspección final.",
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
      kicker: "05 / Colaboración", title: "Para propietarios de marca y operadores de retail.",
      brandTitle: "Marcas internacionales", brandBody: "Convierte los estándares globales en producción controlada en China mediante una ruta coordinada.", brandLink: "Hablar de producción en China",
      retailTitle: "Retail y marca privada", retailBody: "Desarrolla productos para el canal con requisitos claros de formato, calidad, escala y entrega.", retailLink: "Desarrollar una gama retail",
    },
    contact: {
      kicker: "06 / Brief", title: "Cuéntanos qué quieres producir. Trazaremos la ejecución.",
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
      fileHeading: "JJWINE — BRIEF DE PROYECTO", fileName: "jjwine-brief-proyecto.txt",
    },
    footer: { line: "Estándares globales. Ejecución local.", legal: "Las capacidades y certificaciones se confirman para cada proyecto, producto y planta cualificada.", top: "Volver arriba", legalNav: "Información legal", privacyLink: "Política de privacidad", legalLink: "Aviso legal" },
  },
  fr: {
    localeName: "Français",
    meta: {
      title: "JJWine — Production en Chine, livrée selon les standards internationaux",
      description: "Solutions complètes de localisation, production, qualité et conformité en Chine pour les marques internationales de vins et boissons.",
    },
    a11y: { skipToContent: "Aller au contenu principal", home: "Accueil JJWine", primaryNav: "Principal", languageNav: "Langue", mobileNav: "Menu", closeDialog: "Fermer la boîte de dialogue", formatTags: "Étiquettes de format", sectionNav: "Navigation des sections" },
    nav: {
      brandTagline: ["Bridging", "global brands", "to China"],
      home: "Accueil",
      formats: "Formats",
      process: "Processus",
      quality: "Qualité et conformité",
      partnership: "Partenariat",
      about: "À propos",
      start: "Démarrer un projet",
      menu: "Menu",
      close: "Fermer",
    },
    sectionRail: { top: "Accueil", capabilities: "Formats", process: "Processus", quality: "Qualité", partnership: "Partenaires", contact: "Brief" },
    hero: {
      eyebrow: "Your partner for wines & beverages in China",
      line1: "Vos standards.", emphasis: "Concrétisés", line2: "en Chine.",
      copy: "JJWine coordonne la localisation, la production, la qualité et la conformité pour les marques internationales de vins et boissons.",
      pillars: [
        { icon: "globe", title: "Localisation", body: "Marché et réglementation en Chine" },
        { icon: "gear", title: "Coordination de production", body: "Capacité qualifiée par projet" },
        { icon: "shield", title: "Qualité et conformité", body: "Contrôles de la source à la livraison" },
      ],
      panels: {
        mainCapTop: ["Same", "standards", "greater", "possibilities"],
        mainCapBottom: "Aider les boissons mondiales à aller plus loin en Chine",
        sideCap: ["Bottle.", "Can.", "Bag-in-box.", "Made possible."],
        mainAlt: "Illustration abstraite de ligne de conditionnement (placeholder)",
        sideAlt: "Image produit canette JJWine Formats (fond sombre)",
        mainNote: "Illustration provisoire · à remplacer par une photo d'usine autorisée",
        sideNote: "Image produit Formats · autorisation de marque en attente",
      },
      primary: "Démarrer un projet",
    },
    banner: {
      left: ["Good drinks", "& a brighter tomorrow"],
      right: "Relier les grandes boissons au marché chinois\net ouvrir de nouvelles possibilités",
      placeholder: "Placeholder illustration · photo de vignoble lorsque autorisée",
      imageAlt: "Illustration de vignoble (placeholder, pas une photo)",
    },
    heroMotion: {
      pause: "Mettre en pause l’animation du hero",
      play: "Lire l’animation du hero",
    },
    intro: {
      kicker: "01 / Aperçu", title: "Un brief. Une exécution intégrale.",
      body: "Vous apportez le standard de marque. JJWine conçoit et coordonne le parcours de production en Chine : localisation du produit et de l'emballage, fabrication qualifiée, libération des lots et livraison.",
      side: "Le standard entre. L'exécution fiable sort.",
    },
    capabilities: {
      kicker: "Product formats",
      title: "Des formats adaptés",
      titleBreak: "à votre produit et circuit.",
      body: "Des parcours de production flexibles alignés sur votre positionnement et votre stratégie de marché.",
      linkLabel: "Découvrir les formats",
      explore: "En savoir plus",
      items: [
        { code: "01", title: "Bouteille", body: "Un choix classique pour de nombreuses catégories et marchés.", badge: "750 ml", note: "Verre · fermetures · emballage", tagline: "750 ml · 375 ml", tags: ["Verre", "Bouchon / Liège", "Marque privée"] },
        { code: "02", title: "Canette", body: "Légère et pratique pour de nouveaux usages.", badge: "330 ml", note: "Compact · portable · adapté au circuit", tagline: "250 ml · 375 ml", tags: ["Aluminium", "Portion individuelle", "Impression totale"] },
        { code: "03", title: "Bag-in-Box", titleEn: "BIB", body: "Formats multidoses efficaces pour la distribution et la restauration.", badge: "3 L", note: "Distribution · restauration · multidoses", tagline: "3 L · 5 L · 10 L", tags: ["3–10 L", "Robinet", "Fret réduit"] },
      ],
    },
    process: {
      kicker: "Our process",
      title: "Un brief. Une exécution intégrale.",
      body: "Du concept à la livraison, JJWine vous accompagne pour rendre la production complexe gérable.",
      linkLabel: "Voir le processus",
      steps: [
        { icon: "chat", title: "Aligner", body: "Objectifs de marque et exigences de marché." },
        { icon: "file", title: "Localiser", body: "Formulation, réglementation et étiquetage." },
        { icon: "flask", title: "Valider", body: "Échantillons, tests et validation de marque." },
        { icon: "gear", title: "Produire", body: "Fabrication coordonnée sur le site de production confirmé." },
        { icon: "shield", title: "Libérer", body: "Revue qualité et libération de lot." },
        { icon: "truck", title: "Livrer", body: "Livraison ponctuelle et conforme." },
      ],
    },
    quality: {
      kicker: "04 / Qualité", title: "La qualité est l'architecture du projet, pas l'inspection finale.",
      body: "Pour chaque projet, le site, le périmètre de certification, le standard produit et le plan de contrôle sont confirmés. Les déclarations publiques sont liées aux preuves et autorisations en vigueur.",
      badge: "FSSC 22000", badgeNote: "Certification du partenaire de production actuel",
      pillars: [
        { title: "Qualification", body: "Capacité et périmètre de certification vérifiés par rapport au projet." },
        { title: "Contrôle de marque", body: "Spécifications, échantillons, maquettes et modifications avec validations définies." },
        { title: "Libération", body: "Analyses, documentation, échantillons de retenue et traçabilité par projet." },
        { title: "Prêt pour l'audit", body: "Échange structuré de preuves et revue qualité avec les équipes concernées." },
      ],
    },
    partnership: {
      kicker: "05 / Partenariat", title: "Pour les propriétaires de marques et les opérateurs de distribution.",
      brandTitle: "Marques internationales", brandBody: "Transformez vos standards globaux en production contrôlée en Chine via un parcours coordonné.", brandLink: "Discuter de la production en Chine",
      retailTitle: "Distribution et marque propre", retailBody: "Développez des produits adaptés au circuit avec des exigences claires de format, qualité, échelle et livraison.", retailLink: "Développer une gamme distribution",
    },
    contact: {
      kicker: "06 / Brief", title: "Dites-nous ce que vous voulez produire. Nous tracerons l'exécution.",
      body: "Un premier brief utile inclut le produit, le marché, le format, le volume, les exigences de validation et la date cible.",
      button: "Préparer un brief de projet", note: "Le brief est généré sur votre appareil. Aucune donnée de projet n'est transmise.",
    },
    brief: {
      title: "Brief de projet", intro: "Créez un brief structuré à partager avec votre contact JJWine.",
      company: "Entreprise", companyPlaceholder: "Marque ou distributeur", market: "Marché cible", marketPlaceholder: "Pays, région ou circuit",
      product: "Produit", productPlaceholder: "Vin, effervescent, RTD…", format: "Format", formatPlaceholder: "Bouteille, canette, BIB…",
      volume: "Volume initial", volumePlaceholder: "Première production estimée", timing: "Date cible", timingPlaceholder: "Fenêtre de lancement",
      details: "Standards et exigences", detailsPlaceholder: "Liquide, emballage, certification, validation ou circuit",
      download: "Télécharger le brief", privacy: "Ce formulaire ne transmet ni ne stocke vos informations.",
      fileHeading: "JJWINE — BRIEF DE PROJET", fileName: "jjwine-brief-projet.txt",
    },
    footer: { line: "Standards globaux. Exécution locale.", legal: "Les capacités et certifications sont confirmées pour chaque projet, produit et site qualifié.", top: "Retour en haut", legalNav: "Informations légales", privacyLink: "Politique de confidentialité", legalLink: "Mentions légales" },
  },
};
