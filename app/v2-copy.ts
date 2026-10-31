/* Homepage copy from the approved static trial (js/i18n.js).
   Keys follow the app locale routes. Strings the trial does not define
   (footer, legal documents, document titles) stay in content.ts. */
import type { Locale } from "./i18n";

export type V2Product = {
  title: string;
  d1: string;
  d2: string;
  alt: string;
  intro: string;
  listTitle: string;
  list: string[];
};

export type V2Step = { t: string; d: string; body: string; list: string[] };

export type V2Dialog = {
  title: string;
  intro: string;
  listTitle: string;
  list: string[];
  note: string;
};

export type V2Messages = {
  meta: { htmlLang: string; title: string; description: string };
  common: {
    skip: string;
    close: string;
    logo: string;
    menuOpen: string;
    menuClose: string;
    langGroup: string;
    required: string;
    startProject: string;
  };
  nav: {
    label: string;
    home: string;
    capability: string;
    process: string;
    quality: string;
    partners: string;
    about: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    lead: string;
    f1t: string;
    f1d: string;
    f2t: string;
    f2d: string;
    f3t: string;
    f3d: string;
  };
  video: {
    region: string;
    coverAlt: string;
    line1: string;
    line2: string;
    sub1: string;
    sub2: string;
    script1: string;
    script2: string;
    play: string;
    time: string;
    timeLabel: string;
    progress: string;
    volume: string;
    fullscreen: string;
    soonTitle: string;
    soonBody: string;
    soonBack: string;
  };
  products: {
    eyebrow: string;
    title1: string;
    title2: string;
    lead: string;
    link: string;
    more: string;
    note: string;
    bottle: V2Product;
    can: V2Product;
    bib: V2Product;
    carton: V2Product;
    mini: V2Product;
    keg: V2Product;
  };
  process: {
    eyebrow: string;
    title: string;
    lead: string;
    link: string;
    stepLabel: string;
    viewStep: string;
    steps: V2Step[];
  };
  banner: { alt: string; en1: string; en2: string; l1: string; l2: string };
  dialogs: {
    capability: V2Dialog;
    quality: V2Dialog;
    partners: V2Dialog;
    about: V2Dialog;
    processOverview: { title: string; intro: string };
  };
  form: {
    title: string;
    subtitle: string;
    intro: string;
    notice: string;
    legend: string;
    brand: string;
    contact: string;
    email: string;
    category: string;
    packaging: string;
    quantity: string;
    launch: string;
    needs: string;
    ph: { brand: string; contact: string; email: string; quantity: string; launch: string; needs: string };
    choose: string;
    categories: string[];
    packagings: string[];
    download: string;
    copy: string;
    cancel: string;
    preview: string;
    err: { required: string; select: string; email: string; summary: string };
    status: { downloaded: string; copied: string; copyFail: string };
    brief: { heading: string; generated: string; empty: string; footer: string; filename: string };
    /** Online enquiry submit copy. Present on en / zh-cn only; absent locales stay download/copy only. */
    enquiry?: {
      notice: string;
      submit: string;
      sending: string;
      sent: string;
      failed: string;
      rateLimit: string;
      network: string;
      captcha: string;
      not_configured: string;
      turnstileLabel: string;
      privacyLead: string;
      privacyLink: string;
    };
  };
};

export const v2Copy: Record<Locale, V2Messages> = {
  "en": {
    "meta": {
      "htmlLang": "en",
      "title": "JJWINE | China OEM production partner for global wine & beverage brands",
      "description": "JJWine coordinates localization, production planning, quality governance and compliance in China for global wine and beverage brands — in bottles, cans and bag-in-box."
    },
    "common": {
      "skip": "Skip to main content",
      "close": "Close",
      "logo": "JJWINE home",
      "menuOpen": "Open menu",
      "menuClose": "Close menu",
      "langGroup": "Choose language",
      "required": "required",
      "startProject": "Start a project"
    },
    "nav": {
      "label": "Main navigation",
      "home": "Home",
      "capability": "Capabilities",
      "process": "Process",
      "quality": "Quality & Compliance",
      "partners": "Who We Serve",
      "about": "About Us"
    },
    "hero": {
      "eyebrow": "YOUR PARTNER FOR WINES & BEVERAGES IN CHINA",
      "title1": "Global brand standards.",
      "title2": "Made possible in China.",
      "lead": "From product localization and production planning to quality governance and delivery — coordinated end to end.",
      "f1t": "Local execution",
      "f1d": "Know-how of China's market and regulations",
      "f2t": "Organized production",
      "f2d": "The right capacity and resources",
      "f3t": "Quality & compliance",
      "f3d": "Controlled from source to delivery"
    },
    "video": {
      "region": "Brand film",
      "coverAlt": "Dark wine bottles with burgundy capsules on a modern bottling line",
      "line1": "Taking the world's great drinks",
      "line2": "further in China",
      "sub1": "SAME STANDARDS",
      "sub2": "GREATER POSSIBILITIES",
      "script1": "Connecting the world's great wines",
      "script2": "opening wider possibilities",
      "play": "Play brand film",
      "time": "--:--",
      "timeLabel": "Running time will appear once the official film is published",
      "progress": "Playback progress (available once the film is published)",
      "volume": "Volume (available once the film is published)",
      "fullscreen": "Full screen (available once the film is published)",
      "soonTitle": "Brand film coming soon",
      "soonBody": "The official film has not been published yet; you are seeing the cover frame. Once available, it will play right here.",
      "soonBack": "Back to cover"
    },
    "products": {
      "eyebrow": "PRODUCT FORMATS",
      "title1": "Multiple formats,",
      "title2": "built around your brand.",
      "lead": "Flexible production options aligned with your positioning and market strategy.",
      "link": "Explore capabilities",
      "more": "Learn more",
      "bottle": {
        "title": "Bottles",
        "d1": "The classic choice,",
        "d2": "suited to many categories and markets.",
        "alt": "Three wine bottles of different shapes with blank ivory labels on a light beige background",
        "intro": "Glass bottles suit still wines, sparkling wines and many other drinks, and are the most common format for retail, on-trade and gifting channels in China.",
        "listTitle": "To be confirmed together for each project:",
        "list": [
          "Bottle shape, volume, glass colour and closure (e.g. screw cap, cork)",
          "Regulatory content and layout of Chinese front and back labels",
          "Filling, labelling and case-packing requirements",
          "Packaging sourcing, quality specifications and incoming inspection"
        ]
      },
      "can": {
        "title": "Cans",
        "d1": "Multiple can sizes —",
        "d2": "330mL slim, 200mL and 500mL.",
        "alt": "Three aluminium cans of different heights in cream white and deep green with botanical line art",
        "intro": "Aluminium cans in several capacities, including the traditional 330mL slim can plus 200mL, 500mL and more, for retail, ready-to-drink and outdoor occasions.",
        "listTitle": "To be confirmed together for each project:",
        "list": [
          "Can size and capacity (330mL slim, 200mL, 500mL) and internal lining compatibility",
          "Filling and carbonation requirements of the formula",
          "Printed cans or sleeve options",
          "Shelf-life validation and storage conditions"
        ]
      },
      "bib": {
        "title": "Bag-in-Box (BIB)",
        "d1": "Cost-efficient and lower-impact,",
        "d2": "suited to many channels.",
        "alt": "Off-white bag-in-box carton with burgundy layered mountain artwork and a black tap at the lower right",
        "intro": "Bag-in-box offers a lower packaging cost per litre and less packaging material, making it well suited to on-trade, self-serve and large-format use.",
        "listTitle": "To be confirmed together for each project:",
        "list": [
          "Bag material, tap type and volume",
          "Carton structure and print design",
          "Filling hygiene and seal integrity validation",
          "Shelf life after opening and storage guidance"
        ]
      },
      "carton": {
        "title": "Sparkling",
        "d1": "High and low sparkle,",
        "d2": "with multiple closure options.",
        "alt": "Three ivory gable-top packs with burgundy and green leaf line art on a light beige background",
        "intro": "Sparkling wine and sparkling drinks, from high to low sparkle, with cork, crown or other closures suited to China bottling and localization.",
        "listTitle": "To be confirmed together for each project:",
        "list": [
          "Sparkle level (high or low) and style",
          "Closure type (cork, crown or other)",
          "Bottle or pack format",
          "Filling and pressure requirements",
          "Chinese label content and regulatory requirements"
        ]
      },
      "mini": {
        "title": "Small format",
        "d1": "Classic 375ml and 187ml",
        "d2": "for tasting, gifting and travel.",
        "alt": "Three small wine bottles in pale yellow, deep burgundy and rosé with blank ivory labels on a light beige background",
        "intro": "Traditional small-format bottles in 375ml, 187ml and more for tastings, gift sets, airlines and hospitality.",
        "listTitle": "To be confirmed together for each project:",
        "list": [
          "Volume (375ml or 187ml)",
          "Bottle shape and closure",
          "Filling accuracy and quality checks for small volumes",
          "Label layout for the smaller label area",
          "Multipack, gift box or case-packing format"
        ]
      },
      "keg": {
        "title": "Spirits",
        "d1": "Whiskey, vodka, brandy —",
        "d2": "including special bottle shapes.",
        "alt": "Tall amber spirits bottle with an ivory botanical label and burgundy capsule beside an olive branch on a light beige background",
        "intro": "Spirit bottling for whiskey, vodka, brandy and other distilled categories, including special bottle shapes, with China-ready localization, filling and quality control.",
        "listTitle": "To be confirmed together for each project:",
        "list": [
          "Spirit category and bottle shape",
          "Glass and closure",
          "Alcohol-by-volume and filling accuracy checks",
          "Label layout and regulatory claims for spirits",
          "Case-packing, gift box or multipack format"
        ]
      },
      "note": "Production sites, specifications, capacity and approval rules are confirmed per project after assessment."
    },
    "process": {
      "eyebrow": "OUR PROCESS",
      "title": "One request, managed end to end.",
      "lead": "From concept to delivery, JJWine works alongside you to make the complex simple.",
      "link": "View our process",
      "stepLabel": "Step {n}",
      "viewStep": "View details",
      "steps": [
        {
          "t": "Alignment",
          "d": "Understand brand goals and market needs",
          "body": "We work with your team to clarify positioning, target channels, expected volumes and launch timing, and agree on project scope and key decision-makers.",
          "list": [
            "Brand and product information review",
            "Target market and channel assumptions",
            "Initial timeline and communication plan"
          ]
        },
        {
          "t": "Localization",
          "d": "Formula, regulatory and label compliance",
          "body": "We assess formula, packaging and labelling against Chinese regulations and market preferences, and turn them into an actionable localization plan.",
          "list": [
            "Formula and ingredient compliance review",
            "Chinese labelling and mandatory information",
            "Packaging and specification plan"
          ]
        },
        {
          "t": "Validation",
          "d": "Sample testing and brand sign-off",
          "body": "Before production, samples are produced and tested so that your team can approve taste, appearance and packaging.",
          "list": [
            "Sample production and testing",
            "Brand sensory and visual approval",
            "Production specifications and quality standards locked"
          ]
        },
        {
          "t": "Production",
          "d": "Production planning and process control",
          "body": "We match suitable sites and resources to the project, schedule production and manage the process.",
          "list": [
            "Sites and capacity confirmed per project",
            "Incoming inspection of materials and packaging",
            "Process records and critical control point checks"
          ]
        },
        {
          "t": "Release",
          "d": "Quality review and batch release",
          "body": "Each batch is reviewed against the agreed quality standards and released only once records are complete.",
          "list": [
            "Batch testing and record review",
            "Deviation handling and corrective actions",
            "Release documents archived for traceability"
          ]
        },
        {
          "t": "Delivery",
          "d": "Timely, compliant, efficient delivery",
          "body": "We coordinate shipments, accompanying documents and handover according to the agreed plan, with full visibility.",
          "list": [
            "Shipment planning",
            "Accompanying documentation",
            "Post-delivery feedback and review"
          ]
        }
      ]
    },
    "banner": {
      "alt": "Layered mountains and vineyards in the morning light",
      "en1": "GOOD DRINKS",
      "en2": "A BRIGHTER TOMORROW",
      "l1": "Connecting the world's great drinks with China",
      "l2": "and opening wider possibilities"
    },
    "dialogs": {
      "capability": {
        "title": "Production capabilities",
        "intro": "We match the right production resources to each project, based on product type, format and volume.",
        "listTitle": "What we coordinate:",
        "list": [
          "Formats: bottles, cans and bag-in-box (BIB)",
          "Product localization: formula, labelling and packaging",
          "Production planning: scheduling, process control and quality records",
          "Quality governance: inspection standards and batch release"
        ],
        "note": "Production sites, specifications, capacity and approval rules are confirmed per project; we make no blanket commitments."
      },
      "quality": {
        "title": "Quality & Compliance",
        "intro": "JJWine sets up quality governance for each project, translating your brand standards into requirements that can be executed on the production floor in China.",
        "listTitle": "Key elements:",
        "list": [
          "Defined quality standards, test methods and release rules",
          "Source verification and incoming inspection of materials and packaging",
          "In-process checks and records at critical control points",
          "Label and regulatory compliance review",
          "Batch release and document traceability"
        ],
        "note": "Required licences, certifications and approvals are confirmed item by item for each product, site and target channel."
      },
      "partners": {
        "title": "Who We Serve",
        "intro": "We work with wine and beverage brands that want to produce in China, and with the teams involved in the decision.",
        "listTitle": "Typical partners:",
        "list": [
          "Wineries and wine brands from outside China",
          "Beverage brands planning new products or new formats",
          "Brand-side procurement, supply chain and OEM leads",
          "Brand-side quality and regulatory teams"
        ],
        "note": "JJWine is an OEM production partner; we do not sell directly to consumers."
      },
      "about": {
        "title": "About Us",
        "intro": "JJWine is a China OEM production partner for global wine and beverage brands. We coordinate product localization, production planning, quality governance and compliance, across bottles, cans and bag-in-box.",
        "listTitle": "How we work:",
        "list": [
          "Your brand standards as the benchmark, with pragmatic communication",
          "Sites, specifications, capacity and approval rules confirmed per project",
          "Transparent information and a traceable process"
        ],
        "note": "To explore a collaboration, use “Start a project” to put together your project brief."
      },
      "processOverview": {
        "title": "Our process",
        "intro": "Six steps cover everything from first request to delivery, each with clear outputs and sign-offs."
      }
    },
    "form": {
      "title": "Start a project",
      "subtitle": "Project brief",
      "intro": "Fill in the details below to generate a project brief. Download or copy it, then send it to JJWine through your usual channel.",
      "notice": "This page does not submit or send any data; everything stays in your browser.",
      "legend": "* Required field",
      "brand": "Brand / company",
      "contact": "Contact person",
      "email": "Email",
      "category": "Product category",
      "packaging": "Format",
      "quantity": "Estimated volume",
      "launch": "Target launch",
      "needs": "Project requirements",
      "ph": {
        "brand": "e.g. Domaine Example",
        "contact": "Name and title",
        "email": "name@company.com",
        "quantity": "e.g. approx. 20,000 bottles for the first run",
        "launch": "e.g. Q2 2027",
        "needs": "Briefly describe the product, target market, formula or labelling needs"
      },
      "choose": "Select",
      "categories": [
        "Still wine",
        "Sparkling wine",
        "Fortified / sweet wine",
        "RTD / fruit wine",
        "Alcohol-free / low-alcohol",
        "Other beverage"
      ],
      "packagings": [
        "Bottles",
        "Cans",
        "Bag-in-box (BIB)",
        "Several / to be decided"
      ],
      "download": "Download brief (.txt)",
      "copy": "Copy brief",
      "cancel": "Cancel",
      "preview": "Brief preview",
      "err": {
        "required": "Please fill in this field.",
        "select": "Please select an option.",
        "email": "Please enter a valid email address.",
        "summary": "Please check the highlighted fields."
      },
      "status": {
        "downloaded": "The brief has been downloaded to your device. Nothing was sent — please forward the file to JJWine.",
        "copied": "The brief has been copied to your clipboard. Nothing was sent — paste it into your email or message.",
        "copyFail": "Automatic copy is unavailable. Please select and copy the text in the preview below."
      },
      "brief": {
        "heading": "JJWine Project Brief",
        "generated": "Generated",
        "empty": "(not provided)",
        "footer": "Generated locally on the JJWine website. Not sent automatically.",
        "filename": "JJWine-project-brief"},
      "enquiry": {
        "notice": "You can submit this enquiry online, or download / copy the brief and send it yourself. Download and copy stay entirely in your browser.",
        "submit": "Submit enquiry",
        "sending": "Sending…",
        "sent": "Thank you — your enquiry has been sent to JJWine. We will reply to the email address you provided.",
        "failed": "Sorry, your enquiry could not be sent. Please try again later or download the brief instead.",
        "rateLimit": "Too many submissions. Please wait a while and try again.",
        "network": "Network error. Please check your connection and try again, or download the brief instead.",
        "captcha": "Please complete the security check before submitting.",
        "not_configured": "Online enquiry is temporarily unavailable. Please download or copy the brief and send it to JJWine.",
        "turnstileLabel": "Security check",
        "privacyLead": "By submitting, you agree that JJWine may use these details to reply to your enquiry. See our",
        "privacyLink": "Privacy Policy"
      }
    }
  },
  "zh-cn": {
    "meta": {
      "htmlLang": "zh-CN",
      "title": "JJWINE｜全球葡萄酒与饮料品牌的中国 OEM 落地伙伴",
      "description": "JJWine 为全球葡萄酒和饮料品牌协调中国本地化、生产组织、质量治理与合规事项，支持瓶装、罐装与盒中袋。"
    },
    "common": {
      "skip": "跳到主要内容",
      "close": "关闭",
      "logo": "JJWINE 首页",
      "menuOpen": "打开菜单",
      "menuClose": "关闭菜单",
      "langGroup": "选择语言",
      "required": "必填",
      "startProject": "启动项目"
    },
    "nav": {
      "label": "主导航",
      "home": "首页",
      "capability": "生产能力",
      "process": "合作流程",
      "quality": "质量与合规",
      "partners": "合作对象",
      "about": "关于我们"
    },
    "hero": {
      "eyebrow": "YOUR PARTNER FOR WINES & BEVERAGES IN CHINA",
      "title1": "全球品牌标准，",
      "title2": "在中国真正落地。",
      "lead": "从产品本地化、生产组织到质量治理与交付，一站式统筹。",
      "f1t": "本地化落地",
      "f1d": "理解中国市场与法规",
      "f2t": "稳定的生产组织",
      "f2d": "匹配合适的产能与资源",
      "f3t": "质量合规保障",
      "f3d": "从源头到交付的全流程管控"
    },
    "video": {
      "region": "品牌影片",
      "coverAlt": "现代葡萄酒灌装产线上排列的深色酒瓶与酒红色封帽",
      "line1": "让世界的好酒饮",
      "line2": "在中国走得更远",
      "sub1": "SAME STANDARDS",
      "sub2": "GREATER POSSIBILITIES",
      "script1": "连接全球好酒",
      "script2": "创造更广阔的可能",
      "play": "播放品牌影片",
      "time": "--:--",
      "timeLabel": "影片时长待正式影片上线后显示",
      "progress": "播放进度（影片上线后可用）",
      "volume": "音量（影片上线后可用）",
      "fullscreen": "全屏（影片上线后可用）",
      "soonTitle": "品牌影片即将上线",
      "soonBody": "正式影片尚未接入，当前展示的是视频封面。影片上线后将在此处直接播放。",
      "soonBack": "返回封面"
    },
    "products": {
      "eyebrow": "PRODUCT FORMATS",
      "title1": "多种包装形式，",
      "title2": "满足不同品牌需求。",
      "lead": "灵活的生产方案，匹配您的产品定位与市场策略。",
      "link": "了解生产能力",
      "more": "了解更多",
      "bottle": {
        "title": "瓶装",
        "d1": "经典之选，",
        "d2": "适配多种品类与市场。",
        "alt": "三款不同瓶型的葡萄酒，象牙色空白标签，浅米色背景",
        "intro": "玻璃瓶装适用于静止葡萄酒、起泡酒及多种酒饮品类，是进入中国零售、餐饮与礼品渠道的常见形式。",
        "listTitle": "项目中需要共同确认：",
        "list": [
          "瓶型、容量、瓶色与封口方式（如螺旋盖、软木塞）",
          "中文标签与背标的法规信息及版式",
          "灌装、贴标与装箱的工艺要求",
          "包材来源、质量标准与到货检验"
        ]
      },
      "can": {
        "title": "罐装",
        "d1": "多种罐型，",
        "d2": "330mL 传统细罐、200mL 与 500mL。",
        "alt": "三只高低错落的铝罐，奶油白与墨绿色植物线稿包装",
        "intro": "铝罐提供多种容量，包括传统 330mL 细罐、200mL 和 500mL 等，适合零售、即饮与户外场景。",
        "listTitle": "项目中需要共同确认：",
        "list": [
          "罐型与容量（330mL 细罐、200mL、500mL）及内涂层兼容性",
          "配方的灌装与充气要求",
          "印刷罐或套标方案",
          "保质期验证与储存条件"
        ]
      },
      "bib": {
        "title": "盒中袋 BIB",
        "d1": "高性价比与环保优势，",
        "d2": "适合多种渠道与场景。",
        "alt": "米白色盒中袋纸箱，酒红渐层山形图案，右下角黑色出酒龙头",
        "intro": "盒中袋单位包装成本较低、包材用量更少，适合餐饮、自助酒水与大容量消费场景。",
        "listTitle": "项目中需要共同确认：",
        "list": [
          "内袋材质、龙头类型与容量规格",
          "外箱结构与印刷设计",
          "灌装卫生与密封性验证",
          "开启后的饮用期限与储存建议"
        ]
      },
      "carton": {
        "title": "起泡酒",
        "d1": "高气泡与低气泡，",
        "d2": "多种封口方式可选。",
        "alt": "三只象牙白屋顶型包装，酒红与绿色叶片线稿图案，浅米色背景",
        "intro": "起泡葡萄酒与起泡饮品，涵盖高气泡与低气泡，可选软木塞、皇冠盖等多种封口，适配中国灌装与本地化需求。",
        "listTitle": "项目中需要共同确认：",
        "list": [
          "气泡强度（高气泡或低气泡）与风格",
          "封口类型（软木塞、皇冠盖或其他）",
          "瓶型或包装形式",
          "灌装与压力要求",
          "中文标签内容与合规要求"
        ]
      },
      "mini": {
        "title": "小瓶装",
        "d1": "经典 375ml 与 187ml，",
        "d2": "适合品鉴、礼赠与旅行。",
        "alt": "三只浅黄、深酒红与桃粉色小酒瓶，象牙色空白标签，浅米色背景",
        "intro": "传统小瓶装提供 375ml 与 187ml 等，适合品鉴、礼盒、航空与酒店餐饮场景。",
        "listTitle": "项目中需要共同确认：",
        "list": [
          "容量（375ml 或 187ml）",
          "瓶型与封口",
          "小容量灌装精度与质量检查",
          "小标签区域的版面设计",
          "多支组合、礼盒或装箱形式"
        ]
      },
      "keg": {
        "title": "烈酒",
        "d1": "威士忌、伏特加、白兰地，",
        "d2": "亦可适配特殊瓶型。",
        "alt": "琥珀色烈酒方形瓶，象牙色植物线稿标签与酒红色封帽，旁有橄榄枝，浅米色背景",
        "intro": "烈酒灌装涵盖威士忌、伏特加、白兰地及其他蒸馏酒品类，包括特殊瓶型，提供面向中国的本地化、灌装与质量控制。",
        "listTitle": "项目中需要共同确认：",
        "list": [
          "烈酒品类与瓶型",
          "玻璃瓶与封口",
          "酒精度与灌装精度检查",
          "烈酒标签版面与合规声明",
          "装箱、礼盒或组合装形式"
        ]
      },
      "note": "具体生产场地、规格、产能与审批规则将根据项目评估后确认。"
    },
    "process": {
      "eyebrow": "OUR PROCESS",
      "title": "一个需求，全链路承接。",
      "lead": "从概念到交付，JJWine 与您并肩，把复杂的事情变简单。",
      "link": "了解合作流程",
      "stepLabel": "第 {n} 步",
      "viewStep": "查看说明",
      "steps": [
        {
          "t": "需求对齐",
          "d": "理解品牌目标与市场需求",
          "body": "与品牌方一起梳理产品定位、目标渠道、预计数量与上市节奏，明确项目边界与关键决策人。",
          "list": [
            "品牌与产品资料梳理",
            "目标市场与渠道假设",
            "初步时间表与沟通机制"
          ]
        },
        {
          "t": "产品本地化",
          "d": "配方、法规与标签合规",
          "body": "结合中国法规与市场偏好评估配方、包材与标签，形成可执行的本地化方案。",
          "list": [
            "配方与原料合规评估",
            "中文标签与必要标识信息",
            "包材与规格方案"
          ]
        },
        {
          "t": "验证",
          "d": "样品测试与品牌确认",
          "body": "在正式生产前完成样品制作与测试，由品牌方确认口感、外观与包装表现。",
          "list": [
            "样品制作与检测",
            "品牌方感官与外观确认",
            "锁定生产规格与质量标准"
          ]
        },
        {
          "t": "生产",
          "d": "组织生产与过程管理",
          "body": "根据项目需求匹配合适的生产场地与资源，组织排产并进行过程管理。",
          "list": [
            "生产场地与产能按项目确认",
            "原辅料与包材到货检验",
            "过程记录与关键控制点检查"
          ]
        },
        {
          "t": "放行",
          "d": "质量审核与批次放行",
          "body": "每批产品依据约定的质量标准完成审核，记录齐备后方可放行。",
          "list": [
            "批次检验与记录审核",
            "偏差处理与纠正措施",
            "放行文件归档与追溯"
          ]
        },
        {
          "t": "交付",
          "d": "按时、合规、高效交付",
          "body": "按约定计划协调出货、随货文件与交接，保持信息透明。",
          "list": [
            "出货计划协调",
            "随货文件准备",
            "交付后反馈与复盘"
          ]
        }
      ]
    },
    "banner": {
      "alt": "晨光中的层叠山峦与葡萄园",
      "en1": "GOOD DRINKS",
      "en2": "A BRIGHTER TOMORROW",
      "l1": "连接全球好酒饮与中国市场",
      "l2": "创造更广阔的可能"
    },
    "dialogs": {
      "capability": {
        "title": "生产能力",
        "intro": "我们根据产品类型、包装形式与数量，为每个项目匹配合适的生产资源。",
        "listTitle": "我们统筹的范围：",
        "list": [
          "包装形式：瓶装、罐装、盒中袋（BIB）",
          "产品本地化：配方、标签与包材方案",
          "生产组织：排产、过程管理与质量记录",
          "质量治理：检验标准与批次放行"
        ],
        "note": "具体生产场地、规格、产能与审批规则按项目确认，不作统一承诺。"
      },
      "quality": {
        "title": "质量与合规",
        "intro": "JJWine 以项目为单位建立质量治理机制，把品牌方的标准转化为中国生产现场可执行的要求。",
        "listTitle": "治理要点：",
        "list": [
          "明确质量标准、检验方法与放行规则",
          "原辅料与包材的来源确认与进货检验",
          "过程关键控制点检查与记录",
          "标签与法规符合性审核",
          "批次放行与文件追溯"
        ],
        "note": "所需资质、认证与审批要求，将根据具体产品、生产场地与目标渠道逐项确认。"
      },
      "partners": {
        "title": "合作对象",
        "intro": "我们服务希望在中国落地生产的葡萄酒与饮料品牌，以及参与决策的各个团队。",
        "listTitle": "典型合作方：",
        "list": [
          "海外酒庄与葡萄酒品牌",
          "计划推出新品或新包装形式的饮料品牌",
          "品牌方的采购、供应链与 OEM 负责人",
          "品牌方的质量与法规团队"
        ],
        "note": "JJWine 是 OEM／代工生产落地伙伴，不面向消费者直接零售。"
      },
      "about": {
        "title": "关于我们",
        "intro": "JJWine 是面向全球葡萄酒和饮料品牌的中国 OEM／代工生产落地伙伴。我们协调产品本地化、生产组织、质量治理及合规事项，支持瓶装、罐装与盒中袋等形式。",
        "listTitle": "我们的工作方式：",
        "list": [
          "以品牌标准为基准，务实沟通",
          "按项目确认生产场地、规格、能力与审批规则",
          "信息透明，过程可追溯"
        ],
        "note": "如需了解合作可能性，欢迎通过“启动项目”整理您的需求简报。"
      },
      "processOverview": {
        "title": "合作流程",
        "intro": "六个步骤覆盖从需求到交付的全过程，每一步都有明确的输出与确认。"
      }
    },
    "form": {
      "title": "启动项目",
      "subtitle": "项目需求简报",
      "intro": "填写以下信息生成一份项目需求简报，可下载或复制后，通过您惯用的渠道发送给 JJWine。",
      "notice": "本页面不会自动提交或发送任何数据，内容仅在您的浏览器中处理。",
      "legend": "* 为必填项",
      "brand": "品牌／公司",
      "contact": "联系人",
      "email": "联系邮箱",
      "category": "产品类别",
      "packaging": "包装形式",
      "quantity": "预计数量",
      "launch": "上市时间",
      "needs": "项目需求",
      "ph": {
        "brand": "例如：某某酒庄",
        "contact": "姓名与职位",
        "email": "name@company.com",
        "quantity": "例如：首批约 20,000 瓶",
        "launch": "例如：2027 年第二季度",
        "needs": "请简要描述产品、目标市场、配方或标签需求等"
      },
      "choose": "请选择",
      "categories": [
        "静止葡萄酒",
        "起泡酒",
        "加强酒／甜酒",
        "预调酒／果酒",
        "无醇／低醇饮品",
        "其他饮品"
      ],
      "packagings": [
        "瓶装",
        "罐装",
        "盒中袋 BIB",
        "多种形式／待定"
      ],
      "download": "下载简报（.txt）",
      "copy": "复制简报",
      "cancel": "取消",
      "preview": "简报预览",
      "err": {
        "required": "请填写此项。",
        "select": "请选择一项。",
        "email": "请输入有效的邮箱地址。",
        "summary": "请检查标记的字段。"
      },
      "status": {
        "downloaded": "简报已下载到本地。数据未发送，请将文件发送给 JJWine。",
        "copied": "简报已复制到剪贴板。数据未发送，请粘贴到您的邮件或消息中。",
        "copyFail": "无法自动复制，请在下方预览中手动选择并复制。"
      },
      "brief": {
        "heading": "JJWine 项目需求简报",
        "generated": "生成时间",
        "empty": "（未填写）",
        "footer": "本简报由 JJWine 网站在本地生成，未自动发送。",
        "filename": "JJWine-项目需求简报"},
      "enquiry": {
        "notice": "您可以在线提交询盘，也可以下载或复制简报后自行发送。下载与复制仅在您的浏览器中处理。",
        "submit": "提交询盘",
        "sending": "正在发送…",
        "sent": "感谢您的留言，询盘已发送给 JJWine。我们将通过您填写的邮箱回复。",
        "failed": "抱歉，询盘发送失败。请稍后重试，或改为下载需求简报。",
        "rateLimit": "提交过于频繁，请稍后再试。",
        "network": "网络异常，请检查网络后重试，或改为下载需求简报。",
        "captcha": "请先完成安全验证再提交。",
        "not_configured": "在线询盘暂时不可用。请下载或复制需求简报，并发送给 JJWine。",
        "turnstileLabel": "安全验证",
        "privacyLead": "提交即表示您同意 JJWine 使用这些信息回复您的询盘。详见",
        "privacyLink": "隐私政策"
      }
    }
  },
  "es": {
    "meta": {
      "htmlLang": "es",
      "title": "JJWINE | Socio de producción OEM en China para marcas de vinos y bebidas",
      "description": "JJWine coordina la localización, la organización de la producción, la gestión de la calidad y el cumplimiento normativo en China para marcas internacionales de vinos y bebidas: botella, lata y bag-in-box."
    },
    "common": {
      "skip": "Saltar al contenido principal",
      "close": "Cerrar",
      "logo": "Inicio de JJWINE",
      "menuOpen": "Abrir menú",
      "menuClose": "Cerrar menú",
      "langGroup": "Elegir idioma",
      "required": "obligatorio",
      "startProject": "Iniciar proyecto"
    },
    "nav": {
      "label": "Navegación principal",
      "home": "Inicio",
      "capability": "Capacidades",
      "process": "Proceso",
      "quality": "Calidad y normativa",
      "partners": "A quién servimos",
      "about": "Quiénes somos"
    },
    "hero": {
      "eyebrow": "SU SOCIO PARA VINOS Y BEBIDAS EN CHINA",
      "title1": "Estándares globales.",
      "title2": "Hechos realidad en China.",
      "lead": "De la localización del producto y la organización de la producción a la gestión de la calidad y la entrega: una coordinación integral.",
      "f1t": "Implantación local",
      "f1d": "Conocimiento del mercado y la normativa china",
      "f2t": "Producción organizada",
      "f2d": "Capacidad y recursos adecuados",
      "f3t": "Calidad y cumplimiento",
      "f3d": "Control del origen a la entrega"
    },
    "video": {
      "region": "Película de marca",
      "coverAlt": "Botellas de vino oscuras con cápsulas burdeos en una línea de embotellado moderna",
      "line1": "Que los grandes vinos del mundo",
      "line2": "lleguen más lejos en China",
      "sub1": "MISMOS ESTÁNDARES",
      "sub2": "MÁS POSIBILIDADES",
      "script1": "Conectando los grandes vinos del mundo",
      "script2": "abriendo nuevas posibilidades",
      "play": "Reproducir la película de marca",
      "time": "--:--",
      "timeLabel": "La duración se mostrará cuando se publique la película oficial",
      "progress": "Progreso de reproducción (disponible cuando se publique la película)",
      "volume": "Volumen (disponible cuando se publique la película)",
      "fullscreen": "Pantalla completa (disponible cuando se publique la película)",
      "soonTitle": "Película de marca próximamente",
      "soonBody": "La película oficial aún no está publicada; lo que ve es la imagen de portada. Cuando esté disponible, se reproducirá aquí mismo.",
      "soonBack": "Volver a la portada"
    },
    "products": {
      "eyebrow": "FORMATOS DE ENVASE",
      "title1": "Distintos formatos,",
      "title2": "para cada necesidad de marca.",
      "lead": "Soluciones de producción flexibles, alineadas con su posicionamiento y su estrategia de mercado.",
      "link": "Ver capacidades de producción",
      "more": "Más información",
      "bottle": {
        "title": "Botella",
        "d1": "La opción clásica,",
        "d2": "para múltiples categorías y mercados.",
        "alt": "Tres botellas de vino de formas distintas con etiquetas marfil sin marca sobre fondo beige claro",
        "intro": "La botella de vidrio es adecuada para vinos tranquilos, espumosos y muchas otras bebidas, y es el formato habitual en los canales minorista, de hostelería y de regalo en China.",
        "listTitle": "Aspectos que confirmamos juntos en cada proyecto:",
        "list": [
          "Forma, capacidad y color de la botella, y tipo de cierre (rosca, corcho)",
          "Información normativa y diseño de la etiqueta y contraetiqueta en chino",
          "Requisitos de llenado, etiquetado y encajado",
          "Origen, especificaciones de calidad e inspección de entrada de los materiales de envase"
        ]
      },
      "can": {
        "title": "Latas",
        "d1": "Varios tamaños de lata:",
        "d2": "330 mL slim, 200 mL y 500 mL.",
        "alt": "Tres latas de aluminio de distintas alturas en blanco crema y verde oscuro con ilustraciones botánicas",
        "intro": "Latas de aluminio en varias capacidades, incluida la tradicional lata slim de 330 mL, además de 200 mL, 500 mL y más, para retail, bebidas listas para beber y ocasiones al aire libre.",
        "listTitle": "Aspectos que confirmamos juntos en cada proyecto:",
        "list": [
          "Tamaño y capacidad de la lata (slim 330 mL, 200 mL, 500 mL) y compatibilidad del revestimiento interior",
          "Requisitos de llenado y carbonatación de la fórmula",
          "Latas impresas o fundas (sleeve)",
          "Validación de la vida útil y condiciones de almacenamiento"
        ]
      },
      "bib": {
        "title": "Bag-in-Box (BIB)",
        "d1": "Rentable y con ventajas ambientales,",
        "d2": "para múltiples canales y usos.",
        "alt": "Caja bag-in-box blanco roto con ilustración de montañas en degradado burdeos y grifo negro abajo a la derecha",
        "intro": "El bag-in-box ofrece un menor coste de envase por litro y menos material, lo que lo hace idóneo para hostelería, autoservicio y formatos de gran volumen.",
        "listTitle": "Aspectos que confirmamos juntos en cada proyecto:",
        "list": [
          "Material de la bolsa, tipo de grifo y capacidad",
          "Estructura e impresión de la caja",
          "Validación de la higiene de llenado y del sellado",
          "Vida útil tras la apertura y recomendaciones de conservación"
        ]
      },
      "carton": {
        "title": "Espumosos",
        "d1": "Burbuja intensa o suave,",
        "d2": "con distintas opciones de cierre.",
        "alt": "Tres envases marfil con tapa a dos aguas e ilustraciones de hojas burdeos y verdes sobre fondo beige claro",
        "intro": "Vino espumoso y bebidas espumosas, de burbuja intensa a suave, con corcho, chapa u otros cierres adecuados para el embotellado y la localización en China.",
        "listTitle": "Aspectos que confirmamos juntos en cada proyecto:",
        "list": [
          "Nivel de burbuja (intenso o suave) y estilo",
          "Tipo de cierre (corcho, chapa u otro)",
          "Formato de botella o envase",
          "Requisitos de llenado y presión",
          "Contenido de etiqueta en chino y requisitos regulatorios"
        ]
      },
      "mini": {
        "title": "Formato pequeño",
        "d1": "Los clásicos 375 ml y 187 ml",
        "d2": "para cata, regalo y viaje.",
        "alt": "Tres botellas pequeñas de vino en amarillo pálido, burdeos oscuro y rosado con etiquetas marfil sin marca sobre fondo beige claro",
        "intro": "Botellas tradicionales de formato pequeño de 375 ml, 187 ml y más para catas, sets de regalo, aerolíneas y hostelería.",
        "listTitle": "Aspectos que confirmamos juntos en cada proyecto:",
        "list": [
          "Volumen (375 ml o 187 ml)",
          "Forma de la botella y cierre",
          "Precisión de llenado y controles de calidad en volúmenes pequeños",
          "Diseño de etiqueta para el área reducida",
          "Multipack, caja regalo o formato de embalaje"
        ]
      },
      "keg": {
        "title": "Destilados",
        "d1": "Whisky, vodka, brandy,",
        "d2": "incluidas botellas de formas especiales.",
        "alt": "Botella alta de destilado ámbar con etiqueta marfil de motivos botánicos y cápsula burdeos junto a una rama de olivo sobre fondo beige claro",
        "intro": "Embotellado de destilados para whisky, vodka, brandy y otras categorías destiladas, incluidas botellas de formas especiales, con localización para China, llenado y control de calidad.",
        "listTitle": "Aspectos que confirmamos juntos en cada proyecto:",
        "list": [
          "Categoría de destilado y forma de la botella",
          "Vidrio y cierre",
          "Control de graduación alcohólica y precisión de llenado",
          "Diseño de etiqueta y declaraciones regulatorias para destilados",
          "Embalaje en cajas, caja regalo o multipack"
        ]
      },
      "note": "Las plantas de producción, especificaciones, capacidad y normas de aprobación se confirman en cada proyecto tras su evaluación."
    },
    "process": {
      "eyebrow": "NUESTRO PROCESO",
      "title": "Una necesidad, gestión integral.",
      "lead": "Del concepto a la entrega, JJWine trabaja a su lado para simplificar lo complejo.",
      "link": "Ver el proceso",
      "stepLabel": "Paso {n}",
      "viewStep": "Ver detalles",
      "steps": [
        {
          "t": "Alineación",
          "d": "Objetivos de marca y necesidades del mercado",
          "body": "Con su equipo aclaramos el posicionamiento, los canales objetivo, los volúmenes previstos y el calendario de lanzamiento, y definimos el alcance y los responsables de decisión.",
          "list": [
            "Revisión de la información de marca y producto",
            "Hipótesis de mercado y canal",
            "Calendario inicial y plan de comunicación"
          ]
        },
        {
          "t": "Localización",
          "d": "Fórmula, normativa y etiquetado conformes",
          "body": "Evaluamos fórmula, envase y etiquetado frente a la normativa china y las preferencias del mercado, y los convertimos en un plan de localización aplicable.",
          "list": [
            "Revisión normativa de fórmula e ingredientes",
            "Etiquetado en chino e información obligatoria",
            "Plan de envase y especificaciones"
          ]
        },
        {
          "t": "Validación",
          "d": "Pruebas de muestras y aprobación de la marca",
          "body": "Antes de producir, se elaboran y analizan muestras para que su equipo apruebe sabor, aspecto y envase.",
          "list": [
            "Elaboración y análisis de muestras",
            "Aprobación sensorial y visual de la marca",
            "Especificaciones y estándares de calidad cerrados"
          ]
        },
        {
          "t": "Producción",
          "d": "Organización y control del proceso",
          "body": "Asignamos las plantas y los recursos adecuados al proyecto, planificamos la producción y gestionamos el proceso.",
          "list": [
            "Plantas y capacidad confirmadas por proyecto",
            "Inspección de entrada de materias primas y envases",
            "Registros de proceso y control de puntos críticos"
          ]
        },
        {
          "t": "Liberación",
          "d": "Revisión de calidad y liberación de lotes",
          "body": "Cada lote se revisa según los estándares de calidad acordados y solo se libera con la documentación completa.",
          "list": [
            "Análisis de lote y revisión de registros",
            "Gestión de desviaciones y acciones correctivas",
            "Archivo de documentos de liberación para la trazabilidad"
          ]
        },
        {
          "t": "Entrega",
          "d": "Puntual, conforme y eficiente",
          "body": "Coordinamos envíos, documentación de acompañamiento y traspaso según el plan acordado, con total transparencia.",
          "list": [
            "Planificación de envíos",
            "Documentación de acompañamiento",
            "Seguimiento y revisión tras la entrega"
          ]
        }
      ]
    },
    "banner": {
      "alt": "Montañas superpuestas y viñedos con la luz del amanecer",
      "en1": "BUENAS BEBIDAS",
      "en2": "UN MAÑANA MÁS BRILLANTE",
      "l1": "Conectamos los grandes vinos y bebidas del mundo con China",
      "l2": "y abrimos nuevas posibilidades"
    },
    "dialogs": {
      "capability": {
        "title": "Capacidades de producción",
        "intro": "Asignamos a cada proyecto los recursos de producción adecuados según el tipo de producto, el formato y el volumen.",
        "listTitle": "Lo que coordinamos:",
        "list": [
          "Formatos: botella, lata y bag-in-box (BIB)",
          "Localización del producto: fórmula, etiquetado y envase",
          "Organización de la producción: planificación, control de proceso y registros de calidad",
          "Gestión de la calidad: estándares de inspección y liberación de lotes"
        ],
        "note": "Las plantas, especificaciones, capacidad y normas de aprobación se confirman en cada proyecto; no asumimos compromisos genéricos."
      },
      "quality": {
        "title": "Calidad y normativa",
        "intro": "JJWine establece una gestión de la calidad para cada proyecto, traduciendo los estándares de su marca en requisitos aplicables en la planta de producción en China.",
        "listTitle": "Elementos clave:",
        "list": [
          "Estándares de calidad, métodos de análisis y reglas de liberación definidos",
          "Verificación del origen e inspección de entrada de materiales y envases",
          "Controles y registros en los puntos críticos del proceso",
          "Revisión del cumplimiento normativo del etiquetado",
          "Liberación de lotes y trazabilidad documental"
        ],
        "note": "Las licencias, certificaciones y aprobaciones necesarias se confirman una a una según el producto, la planta y el canal de destino."
      },
      "partners": {
        "title": "A quién servimos",
        "intro": "Trabajamos con marcas de vinos y bebidas que desean producir en China y con los equipos que participan en la decisión.",
        "listTitle": "Socios habituales:",
        "list": [
          "Bodegas y marcas de vino internacionales",
          "Marcas de bebidas que preparan nuevos productos o formatos",
          "Responsables de compras, cadena de suministro y OEM de la marca",
          "Equipos de calidad y asuntos regulatorios de la marca"
        ],
        "note": "JJWine es un socio de producción OEM; no vendemos directamente al consumidor."
      },
      "about": {
        "title": "Quiénes somos",
        "intro": "JJWine es un socio de producción OEM en China para marcas internacionales de vinos y bebidas. Coordinamos la localización del producto, la organización de la producción, la gestión de la calidad y el cumplimiento normativo, en botella, lata y bag-in-box.",
        "listTitle": "Cómo trabajamos:",
        "list": [
          "Los estándares de su marca como referencia, con una comunicación pragmática",
          "Plantas, especificaciones, capacidad y normas de aprobación confirmadas por proyecto",
          "Información transparente y un proceso trazable"
        ],
        "note": "Para explorar una colaboración, utilice «Iniciar proyecto» y prepare su resumen de proyecto."
      },
      "processOverview": {
        "title": "Nuestro proceso",
        "intro": "Seis pasos cubren todo el recorrido, de la primera necesidad a la entrega, cada uno con resultados y aprobaciones claros."
      }
    },
    "form": {
      "title": "Iniciar proyecto",
      "subtitle": "Resumen del proyecto",
      "intro": "Complete los datos para generar un resumen del proyecto. Descárguelo o cópielo y envíelo a JJWine por su canal habitual.",
      "notice": "Esta página no envía ni transmite ningún dato; todo se procesa en su navegador.",
      "legend": "* Campo obligatorio",
      "brand": "Marca / empresa",
      "contact": "Persona de contacto",
      "email": "Correo electrónico",
      "category": "Categoría de producto",
      "packaging": "Formato",
      "quantity": "Volumen estimado",
      "launch": "Lanzamiento previsto",
      "needs": "Necesidades del proyecto",
      "ph": {
        "brand": "p. ej., Bodega Ejemplo",
        "contact": "Nombre y cargo",
        "email": "nombre@empresa.com",
        "quantity": "p. ej., unas 20.000 botellas en la primera producción",
        "launch": "p. ej., 2.º trimestre de 2027",
        "needs": "Describa brevemente el producto, el mercado objetivo y las necesidades de fórmula o etiquetado"
      },
      "choose": "Seleccione",
      "categories": [
        "Vino tranquilo",
        "Vino espumoso",
        "Vino generoso / dulce",
        "RTD / vino de frutas",
        "Sin alcohol / bajo en alcohol",
        "Otra bebida"
      ],
      "packagings": [
        "Botella",
        "Lata",
        "Bag-in-box (BIB)",
        "Varios / por definir"
      ],
      "download": "Descargar resumen (.txt)",
      "copy": "Copiar resumen",
      "cancel": "Cancelar",
      "preview": "Vista previa del resumen",
      "err": {
        "required": "Complete este campo.",
        "select": "Seleccione una opción.",
        "email": "Introduzca un correo electrónico válido.",
        "summary": "Revise los campos señalados."
      },
      "status": {
        "downloaded": "El resumen se ha descargado en su dispositivo. No se ha enviado nada: remita el archivo a JJWine.",
        "copied": "El resumen se ha copiado al portapapeles. No se ha enviado nada: péguelo en su correo o mensaje.",
        "copyFail": "No es posible copiar automáticamente. Seleccione y copie el texto de la vista previa."
      },
      "brief": {
        "heading": "Resumen de proyecto JJWine",
        "generated": "Fecha de generación",
        "empty": "(sin indicar)",
        "footer": "Generado localmente en el sitio web de JJWine. No se ha enviado automáticamente.",
        "filename": "JJWine-resumen-proyecto"
      }
    }
  },
  "fr": {
    "meta": {
      "htmlLang": "fr",
      "title": "JJWINE | Partenaire de production OEM en Chine pour les marques de vins et boissons",
      "description": "JJWine coordonne la localisation, l’organisation de la production, la gouvernance qualité et la conformité en Chine pour les marques internationales de vins et boissons : bouteille, canette et bag-in-box."
    },
    "common": {
      "skip": "Aller au contenu principal",
      "close": "Fermer",
      "logo": "Accueil JJWINE",
      "menuOpen": "Ouvrir le menu",
      "menuClose": "Fermer le menu",
      "langGroup": "Choisir la langue",
      "required": "obligatoire",
      "startProject": "Lancer un projet"
    },
    "nav": {
      "label": "Navigation principale",
      "home": "Accueil",
      "capability": "Capacités",
      "process": "Processus",
      "quality": "Qualité et conformité",
      "partners": "Nos partenaires",
      "about": "À propos"
    },
    "hero": {
      "eyebrow": "VOTRE PARTENAIRE VINS ET BOISSONS EN CHINE",
      "title1": "Des standards mondiaux.",
      "title2": "Concrétisés en Chine.",
      "lead": "De la localisation produit à l’organisation de la production, de la gouvernance qualité à la livraison : une coordination de bout en bout.",
      "f1t": "Ancrage local",
      "f1d": "Marché et réglementation chinoise",
      "f2t": "Production organisée",
      "f2d": "Capacités et ressources adaptées",
      "f3t": "Qualité et conformité",
      "f3d": "Maîtrise de l’origine à la livraison"
    },
    "video": {
      "region": "Film de marque",
      "coverAlt": "Bouteilles de vin sombres à capsules bordeaux sur une ligne d’embouteillage moderne",
      "line1": "Les grands vins du monde,",
      "line2": "plus loin en Chine",
      "sub1": "MÊMES EXIGENCES",
      "sub2": "PLUS DE POSSIBILITÉS",
      "script1": "Relier les grands vins du monde",
      "script2": "ouvrir de nouveaux horizons",
      "play": "Lire le film de marque",
      "time": "--:--",
      "timeLabel": "La durée s’affichera dès la mise en ligne du film officiel",
      "progress": "Progression de la lecture (disponible dès la mise en ligne du film)",
      "volume": "Volume (disponible dès la mise en ligne du film)",
      "fullscreen": "Plein écran (disponible dès la mise en ligne du film)",
      "soonTitle": "Film de marque bientôt disponible",
      "soonBody": "Le film officiel n’est pas encore en ligne ; vous voyez l’image de couverture. Il sera diffusé ici dès sa publication.",
      "soonBack": "Retour à la couverture"
    },
    "products": {
      "eyebrow": "FORMATS DE CONDITIONNEMENT",
      "title1": "Plusieurs formats,",
      "title2": "pour chaque besoin de marque.",
      "lead": "Des solutions de production flexibles, alignées sur votre positionnement et votre stratégie de marché.",
      "link": "Voir nos capacités de production",
      "more": "En savoir plus",
      "bottle": {
        "title": "Bouteille",
        "d1": "Le choix classique,",
        "d2": "adapté à de nombreuses catégories et marchés.",
        "alt": "Trois bouteilles de vin de formes différentes, étiquettes ivoire vierges, sur fond beige clair",
        "intro": "La bouteille en verre convient aux vins tranquilles, aux effervescents et à de nombreuses boissons ; c’est le format de référence pour la distribution, la restauration et le cadeau en Chine.",
        "listTitle": "Points à valider ensemble pour chaque projet :",
        "list": [
          "Forme, contenance et teinte de la bouteille, type de bouchage (vis, liège)",
          "Mentions réglementaires et mise en page de l’étiquette et de la contre-étiquette en chinois",
          "Exigences de remplissage, d’étiquetage et de mise en carton",
          "Origine, spécifications qualité et contrôle à réception des emballages"
        ]
      },
      "can": {
        "title": "Canettes",
        "d1": "Plusieurs formats de canette :",
        "d2": "330 mL slim, 200 mL et 500 mL.",
        "alt": "Trois canettes en aluminium de hauteurs différentes, blanc crème et vert profond, illustrations botaniques",
        "intro": "Canettes en aluminium en plusieurs contenances, dont la canette slim traditionnelle de 330 mL, ainsi que 200 mL, 500 mL et d’autres, pour la distribution, le prêt-à-boire et les moments en plein air.",
        "listTitle": "Points à valider ensemble pour chaque projet :",
        "list": [
          "Format et contenance de la canette (slim 330 mL, 200 mL, 500 mL) et compatibilité du vernis intérieur",
          "Exigences de remplissage et de gazéification de la formule",
          "Canettes imprimées ou options de sleeve",
          "Validation de la durée de conservation et conditions de stockage"
        ]
      },
      "bib": {
        "title": "Bag-in-Box (BIB)",
        "d1": "Économique et plus responsable,",
        "d2": "adapté à de multiples canaux.",
        "alt": "Carton bag-in-box blanc cassé, motif de montagnes en dégradé bordeaux, robinet noir en bas à droite",
        "intro": "Le bag-in-box offre un coût d’emballage par litre plus faible et moins de matériaux, idéal pour la restauration, le libre-service et les grands volumes.",
        "listTitle": "Points à valider ensemble pour chaque projet :",
        "list": [
          "Matériau de la poche, type de robinet et contenance",
          "Structure et impression du carton",
          "Validation de l’hygiène de remplissage et de l’étanchéité",
          "Durée de conservation après ouverture et conseils de stockage"
        ]
      },
      "carton": {
        "title": "Effervescents",
        "d1": "Effervescence forte ou légère,",
        "d2": "avec plusieurs types de fermeture.",
        "alt": "Trois emballages ivoire à toit pointu, motifs de feuilles bordeaux et vertes, sur fond beige clair",
        "intro": "Vin effervescent et boissons pétillantes, d’effervescence forte à légère, avec bouchon liège, capsule couronne ou autres fermetures adaptées à l’embouteillage et à la localisation en Chine.",
        "listTitle": "Points à valider ensemble pour chaque projet :",
        "list": [
          "Niveau d’effervescence (fort ou léger) et style",
          "Type de fermeture (liège, capsule couronne ou autre)",
          "Format de bouteille ou d’emballage",
          "Exigences de remplissage et de pression",
          "Contenu de l’étiquette en chinois et exigences réglementaires"
        ]
      },
      "mini": {
        "title": "Petit format",
        "d1": "Les classiques 375 ml et 187 ml",
        "d2": "pour la dégustation, le cadeau et le voyage.",
        "alt": "Trois petites bouteilles de vin jaune pâle, bordeaux profond et rosé, étiquettes ivoire vierges, sur fond beige clair",
        "intro": "Bouteilles traditionnelles de petit format en 375 ml, 187 ml et d’autres pour dégustations, coffrets cadeaux, compagnies aériennes et hôtellerie.",
        "listTitle": "Points à valider ensemble pour chaque projet :",
        "list": [
          "Volume (375 ml ou 187 ml)",
          "Forme de bouteille et fermeture",
          "Précision de remplissage et contrôles qualité sur petits volumes",
          "Mise en page de l’étiquette pour la surface réduite",
          "Multipack, coffret cadeau ou conditionnement en caisse"
        ]
      },
      "keg": {
        "title": "Spiritueux",
        "d1": "Whisky, vodka, brandy,",
        "d2": "y compris des formes de bouteille spéciales.",
        "alt": "Grande bouteille de spiritueux ambrée avec étiquette ivoire à motifs botaniques et capsule bordeaux, près d’une branche d’olivier sur fond beige clair",
        "intro": "Embouteillage de spiritueux pour whisky, vodka, brandy et autres catégories distillées, y compris des formes de bouteille spéciales, avec localisation pour la Chine, remplissage et contrôle qualité.",
        "listTitle": "Points à valider ensemble pour chaque projet :",
        "list": [
          "Catégorie de spiritueux et forme de bouteille",
          "Verre et fermeture",
          "Contrôle du titre alcoométrique et précision du remplissage",
          "Mise en page de l’étiquette et allégations réglementaires pour spiritueux",
          "Conditionnement en caisse, coffret cadeau ou multipack"
        ]
      },
      "note": "Les sites de production, spécifications, capacités et règles d’approbation sont confirmés pour chaque projet après évaluation."
    },
    "process": {
      "eyebrow": "NOTRE PROCESSUS",
      "title": "Un besoin, une prise en charge complète.",
      "lead": "Du concept à la livraison, JJWine vous accompagne pour simplifier ce qui est complexe.",
      "link": "Découvrir le processus",
      "stepLabel": "Étape {n}",
      "viewStep": "Voir le détail",
      "steps": [
        {
          "t": "Cadrage",
          "d": "Objectifs de marque et besoins du marché",
          "body": "Avec vos équipes, nous clarifions le positionnement, les canaux visés, les volumes prévus et le calendrier de lancement, puis nous fixons le périmètre et les décideurs.",
          "list": [
            "Analyse des informations marque et produit",
            "Hypothèses de marché et de canal",
            "Calendrier initial et modalités d’échange"
          ]
        },
        {
          "t": "Localisation",
          "d": "Recette, réglementation et étiquetage conformes",
          "body": "Nous évaluons recette, emballage et étiquetage au regard de la réglementation chinoise et des attentes du marché, pour établir un plan de localisation opérationnel.",
          "list": [
            "Revue réglementaire de la recette et des ingrédients",
            "Étiquetage chinois et mentions obligatoires",
            "Plan d’emballage et de spécifications"
          ]
        },
        {
          "t": "Validation",
          "d": "Tests d’échantillons et accord de la marque",
          "body": "Avant la production, des échantillons sont réalisés et testés afin que votre équipe valide le goût, l’aspect et l’emballage.",
          "list": [
            "Réalisation et analyse d’échantillons",
            "Validation sensorielle et visuelle par la marque",
            "Spécifications et standards qualité arrêtés"
          ]
        },
        {
          "t": "Production",
          "d": "Organisation et pilotage de la production",
          "body": "Nous affectons au projet les sites et ressources adaptés, planifions la production et pilotons le processus.",
          "list": [
            "Sites et capacités confirmés par projet",
            "Contrôle à réception des matières et emballages",
            "Enregistrements et contrôle des points critiques"
          ]
        },
        {
          "t": "Libération",
          "d": "Revue qualité et libération des lots",
          "body": "Chaque lot est examiné selon les standards qualité convenus et n’est libéré qu’une fois le dossier complet.",
          "list": [
            "Analyses de lot et revue des enregistrements",
            "Traitement des écarts et actions correctives",
            "Archivage des documents de libération pour la traçabilité"
          ]
        },
        {
          "t": "Livraison",
          "d": "Ponctuelle, conforme et efficace",
          "body": "Nous coordonnons expéditions, documents d’accompagnement et passation selon le plan convenu, en toute transparence.",
          "list": [
            "Planification des expéditions",
            "Documents d’accompagnement",
            "Retour d’expérience après livraison"
          ]
        }
      ]
    },
    "banner": {
      "alt": "Montagnes étagées et vignobles dans la lumière du matin",
      "en1": "DE BONNES BOISSONS",
      "en2": "UN AVENIR PLUS LUMINEUX",
      "l1": "Relier les grands vins et boissons du monde au marché chinois",
      "l2": "et ouvrir de nouveaux horizons"
    },
    "dialogs": {
      "capability": {
        "title": "Capacités de production",
        "intro": "Nous affectons à chaque projet les ressources de production adaptées, selon le type de produit, le format et le volume.",
        "listTitle": "Ce que nous coordonnons :",
        "list": [
          "Formats : bouteille, canette et bag-in-box (BIB)",
          "Localisation produit : recette, étiquetage et emballage",
          "Organisation de la production : planification, pilotage et enregistrements qualité",
          "Gouvernance qualité : standards de contrôle et libération des lots"
        ],
        "note": "Les sites, spécifications, capacités et règles d’approbation sont confirmés pour chaque projet ; nous ne prenons pas d’engagement générique."
      },
      "quality": {
        "title": "Qualité et conformité",
        "intro": "JJWine met en place une gouvernance qualité propre à chaque projet, en traduisant les standards de votre marque en exigences applicables sur le site de production en Chine.",
        "listTitle": "Points clés :",
        "list": [
          "Standards qualité, méthodes d’analyse et règles de libération définis",
          "Vérification de l’origine et contrôle à réception des matières et emballages",
          "Contrôles et enregistrements aux points critiques",
          "Revue de conformité de l’étiquetage et de la réglementation",
          "Libération des lots et traçabilité documentaire"
        ],
        "note": "Les licences, certifications et autorisations requises sont confirmées point par point selon le produit, le site et le canal visé."
      },
      "partners": {
        "title": "Nos partenaires",
        "intro": "Nous travaillons avec les marques de vins et de boissons qui souhaitent produire en Chine, et avec les équipes qui participent à la décision.",
        "listTitle": "Partenaires types :",
        "list": [
          "Domaines et marques de vin internationaux",
          "Marques de boissons préparant de nouveaux produits ou formats",
          "Responsables achats, supply chain et OEM côté marque",
          "Équipes qualité et affaires réglementaires côté marque"
        ],
        "note": "JJWine est un partenaire de production OEM ; nous ne vendons pas directement aux consommateurs."
      },
      "about": {
        "title": "À propos",
        "intro": "JJWine est un partenaire de production OEM en Chine pour les marques internationales de vins et de boissons. Nous coordonnons la localisation produit, l’organisation de la production, la gouvernance qualité et la conformité, en bouteille, canette et bag-in-box.",
        "listTitle": "Notre façon de travailler :",
        "list": [
          "Les standards de votre marque comme référence, avec une communication pragmatique",
          "Sites, spécifications, capacités et règles d’approbation confirmés par projet",
          "Une information transparente et un processus traçable"
        ],
        "note": "Pour étudier une collaboration, utilisez « Lancer un projet » afin de préparer votre fiche projet."
      },
      "processOverview": {
        "title": "Notre processus",
        "intro": "Six étapes couvrent l’ensemble du parcours, du premier besoin à la livraison, chacune avec des livrables et des validations clairs."
      }
    },
    "form": {
      "title": "Lancer un projet",
      "subtitle": "Fiche projet",
      "intro": "Renseignez les informations ci-dessous pour générer une fiche projet. Téléchargez-la ou copiez-la, puis transmettez-la à JJWine par votre canal habituel.",
      "notice": "Cette page n’envoie et ne transmet aucune donnée ; tout est traité dans votre navigateur.",
      "legend": "* Champ obligatoire",
      "brand": "Marque / société",
      "contact": "Interlocuteur",
      "email": "E-mail",
      "category": "Catégorie de produit",
      "packaging": "Format",
      "quantity": "Volume estimé",
      "launch": "Lancement visé",
      "needs": "Besoins du projet",
      "ph": {
        "brand": "ex. : Domaine Exemple",
        "contact": "Nom et fonction",
        "email": "nom@societe.com",
        "quantity": "ex. : environ 20 000 bouteilles pour la première production",
        "launch": "ex. : 2e trimestre 2027",
        "needs": "Décrivez brièvement le produit, le marché visé et vos besoins de recette ou d’étiquetage"
      },
      "choose": "Sélectionner",
      "categories": [
        "Vin tranquille",
        "Vin effervescent",
        "Vin muté / liquoreux",
        "RTD / vin de fruits",
        "Sans alcool / faible teneur en alcool",
        "Autre boisson"
      ],
      "packagings": [
        "Bouteille",
        "Canette",
        "Bag-in-box (BIB)",
        "Plusieurs / à définir"
      ],
      "download": "Télécharger la fiche (.txt)",
      "copy": "Copier la fiche",
      "cancel": "Annuler",
      "preview": "Aperçu de la fiche",
      "err": {
        "required": "Veuillez renseigner ce champ.",
        "select": "Veuillez sélectionner une option.",
        "email": "Veuillez saisir une adresse e-mail valide.",
        "summary": "Veuillez vérifier les champs signalés."
      },
      "status": {
        "downloaded": "La fiche a été téléchargée sur votre appareil. Rien n’a été envoyé : transmettez le fichier à JJWine.",
        "copied": "La fiche a été copiée dans le presse-papiers. Rien n’a été envoyé : collez-la dans votre e-mail ou message.",
        "copyFail": "La copie automatique est indisponible. Sélectionnez et copiez le texte de l’aperçu ci-dessous."
      },
      "brief": {
        "heading": "Fiche projet JJWine",
        "generated": "Générée le",
        "empty": "(non renseigné)",
        "footer": "Générée localement sur le site JJWine. Aucun envoi automatique.",
        "filename": "JJWine-fiche-projet"
      }
    }
  }
};
