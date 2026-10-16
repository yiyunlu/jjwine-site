import type { LegalLocale } from "./i18n";

/**
 * Content for the Privacy Policy and Legal Notice pages.
 *
 * Approved facts (2026-08-20): the site operator is 上海捷嘉酒业有限公司
 * (referred to as "JJWine" / the operator; no English legal name is stated here).
 * Contact is eddielu@winekee.com. The site has no analytics, ads,
 * non-essential cookies, accounts or server-side forms; the project brief is
 * generated and downloaded locally; Cloudflare Workers may process IP
 * addresses, request headers, timestamps and security logs.
 */

export const OPERATOR_LEGAL_NAME = "上海捷嘉酒业有限公司";
export const CONTACT_EMAIL = "eddielu@winekee.com";
export const EFFECTIVE_DATE_ISO = "2026-08-20";

export type LegalPageKey = "privacy" | "legal";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
};

export type LegalDocument = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  effectiveDate: string;
  /** Marks the page as a website policy, not legal advice. */
  disclaimer: string;
  sections: LegalSection[];
};

export type LegalUiStrings = {
  backToHome: string;
  languageNav: string;
  otherDocument: Record<LegalPageKey, string>;
  contactHeading: string;
  contactLine: string;
};

export const legalPaths: Record<LegalPageKey, string> = {
  privacy: "privacy",
  legal: "legal",
};

export const legalUi: Record<LegalLocale, LegalUiStrings> = {
  en: {
    backToHome: "Back to JJWine home",
    languageNav: "Language",
    otherDocument: { privacy: "Privacy Policy", legal: "Legal Notice" },
    contactHeading: "Contact",
    contactLine: "Privacy and legal questions can be sent to 上海捷嘉酒业有限公司 at",
  },
  "zh-cn": {
    backToHome: "返回 JJWine 首页",
    languageNav: "语言选择",
    otherDocument: { privacy: "隐私政策", legal: "法律声明" },
    contactHeading: "联系方式",
    contactLine: "如有隐私或法律相关问题，请通过以下邮箱联系上海捷嘉酒业有限公司：",
  },
};

export const legalContent: Record<LegalLocale, Record<LegalPageKey, LegalDocument>> = {
  en: {
    privacy: {
      metaTitle: "Privacy Policy — JJWine",
      metaDescription:
        "How the JJWine website handles personal information: minimal processing, no analytics, no tracking, no accounts and no server-side forms.",
      title: "Privacy Policy",
      effectiveDate: "Effective date: 20 August 2026",
      disclaimer:
        "This page is the website privacy policy published by the operator. It describes how this website works; it is general information about this website and not legal advice for your own situation.",
      sections: [
        {
          heading: "1. Operator and scope",
          paragraphs: [
            "This website is operated by 上海捷嘉酒业有限公司, referred to on this site as “JJWine” or “the operator”. The Chinese registered name above is the authoritative operator name used on this website; this policy does not state a separate English legal name.",
            "This policy covers this public website (the English, Simplified Chinese, Spanish and French pages served under /en, /zh-cn, /es and /fr) and email correspondence used to respond to an inquiry or manage a potential business relationship, unless a more specific notice or agreement supplements it. Contractual relationships may be governed by additional notices and terms.",
          ],
        },
        {
          heading: "2. What this website actually processes",
          paragraphs: [
            "This website is a static informational site. It has no user accounts, no login, no analytics or advertising scripts, no third-party tracking, and no server-side inquiry form. We do not sell personal information.",
            "In normal use, the website itself collects no personal information from you beyond the technical data described in section 5 (hosting).",
          ],
        },
        {
          heading: "3. The project brief tool",
          paragraphs: [
            "The “project brief” form on this site is processed entirely on your own device, in your browser. Nothing you type into it is transmitted to or stored on an operator-controlled server. The resulting text file is generated and downloaded locally to your device until you choose to share it.",
          ],
        },
        {
          heading: "4. Email contact",
          paragraphs: [
            "Email links on this site (mailto links) open your own email client. If you choose to email us, we receive whatever you send — typically your name, email address, company and message — and we use it only to respond to your inquiry and manage a potential business relationship. Please do not email sensitive personal information.",
          ],
        },
        {
          heading: "5. Hosting on Cloudflare",
          paragraphs: [
            "This website is served through Cloudflare Workers and Cloudflare's global network. The operator's Worker necessarily receives limited technical request data, such as IP address, request headers, timestamps, and security or error information, to deliver, secure and troubleshoot the site. The operator does not use the technical data it controls to build visitor profiles.",
            "Cloudflare separately processes technical data under its own terms and privacy documentation for network delivery, security and related services. Cloudflare operates data centers worldwide, and its purposes, locations and retention practices are governed by its own documentation and the services configured for this site.",
          ],
        },
        {
          heading: "6. Cookies and tracking",
          paragraphs: [
            "This website sets no analytics, advertising or other non-essential cookies, and uses no fingerprinting or cross-site tracking. Cloudflare may set strictly necessary technical cookies or use equivalent mechanisms solely for security and traffic integrity where required to serve the site.",
          ],
        },
        {
          heading: "7. Purposes and legal bases",
          paragraphs: [
            "We process the limited technical data described above to operate, secure and troubleshoot this website, and we process the content of emails you send us to respond to you.",
            "Where China's Personal Information Protection Law (PIPL) applies, we process personal information only under a condition permitted by PIPL and obtain consent where it is required; information you provide when asking about a project may be handled as necessary to respond and take steps you request. Where the relevant processing falls within the territorial scope of the EU/EEA General Data Protection Regulation (GDPR), we rely on legitimate interests (Art. 6(1)(f) GDPR) in operating and securing this website, and, where appropriate, on pre-contractual steps taken at your request (Art. 6(1)(b) GDPR) when you contact us about a project.",
          ],
        },
        {
          heading: "8. Your rights",
          paragraphs: [
            "If PIPL applies to you, you may — subject to its conditions — request access to, copies of, correction, deletion or an explanation of the handling of your personal information, and you may withdraw consent where processing is based on consent.",
            "If GDPR applies to you, you may — subject to its conditions — request access, rectification, erasure, restriction of processing, data portability, and object to processing based on legitimate interests, and you may lodge a complaint with your local supervisory authority.",
            "To exercise any of these rights, use the contact address below. Because this website stores almost no personal information, most requests will concern email correspondence.",
          ],
        },
        {
          heading: "9. International transfers, retention and security",
          paragraphs: [
            "Because the site is delivered through Cloudflare's global network and email may be handled by service providers, technical data and correspondence may be transferred across borders. For transfers controlled by the operator, we limit them to what is needed to run this website and communicate with you, do not use them for marketing or profiling, and apply any notice, consent, contractual, assessment or other safeguard required by applicable law. Cloudflare describes its own transfer arrangements in its privacy documentation.",
            "The operator keeps any technical or security logs it controls only as long as reasonably needed for operations, security and applicable legal obligations. Cloudflare's retention is governed by its own terms, policies and configured services. Email correspondence is retained while relevant to an inquiry or business relationship and then deleted or archived in line with applicable obligations.",
            "We apply reasonable technical and organizational measures appropriate to a small informational website, including serving the site over HTTPS.",
          ],
        },
        {
          heading: "10. Minors and business audience",
          paragraphs: [
            "This is a business-to-business website about alcoholic beverage production and is directed at professional audiences. It is not directed at minors, and we do not knowingly collect personal information from minors.",
          ],
        },
        {
          heading: "11. Changes to this policy",
          paragraphs: [
            "We may update this policy when the website or applicable law changes. The effective date above shows the current version. Material changes will be published on this page.",
          ],
        },

      ],
    },
    legal: {
      metaTitle: "Legal Notice — JJWine",
      metaDescription:
        "Legal notice for the JJWine website: informational content, project-specific verification of capabilities, intellectual property and terms of use.",
      title: "Legal Notice",
      effectiveDate: "Effective date: 20 August 2026",
      disclaimer:
        "This page is the website legal notice published by the operator. It sets out the terms on which this website is provided; it is not legal advice.",
      sections: [
        {
          heading: "1. Operator and nature of this website",
          paragraphs: [
            "This website is operated by 上海捷嘉酒业有限公司 (referred to as “JJWine” or “the operator”). This is an informational business-to-business website. Nothing on it constitutes a binding offer, a quotation, investment advice, or an offer to sell alcoholic beverages to consumers. Any business relationship arises only from a separately negotiated written agreement.",
          ],
        },
        {
          heading: "2. Capabilities and certifications are project-specific",
          paragraphs: [
            "Descriptions of production capabilities, formats, quality systems and certifications on this website are general in nature. The applicable production site, certification scope, product standard and control plan are confirmed for each individual project, product and market, based on current evidence at that time. No statement on this website should be read as a guarantee that a particular capability, certification or authorization applies to any specific project or client relationship.",
          ],
        },
        {
          heading: "3. Intellectual property and third-party marks",
          paragraphs: [
            "Unless otherwise indicated, content on this website — including text, layout, graphics and the JJWine wordmark — may be protected by intellectual-property rights held by the operator or its licensors and may not be reproduced for commercial purposes without permission from the relevant rights holder. Third-party names, brands and certification marks that may be referenced remain the property of their respective owners; a reference does not imply endorsement, partnership or authorization beyond what is expressly stated.",
          ],
        },
        {
          heading: "4. Acceptable use",
          paragraphs: [
            "You may use this website only for lawful, informational purposes. You must not attempt to disrupt the website, probe or breach its security, scrape it at abusive volumes, or use its content to mislead others about the operator or its relationships.",
          ],
        },
        {
          heading: "5. External links",
          paragraphs: [
            "This website may link to external websites. The operator has no control over external content and, to the extent permitted by applicable law, accepts no responsibility for it. A link does not imply endorsement.",
          ],
        },
        {
          heading: "6. No warranty and limitation of liability",
          paragraphs: [
            "The website is provided “as is”. The operator takes reasonable care to keep the content accurate and current but gives no warranty that it is complete, error-free or continuously available.",
            "To the extent permitted by applicable law, the operator is not liable for damages arising from the use of, or inability to use, this website or its content. Nothing in this notice excludes or limits liability that cannot be excluded or limited under mandatory applicable law, including liability arising from intent or gross negligence where such limits are not permitted.",
          ],
        },
        {
          heading: "7. Applicable law and disputes",
          paragraphs: [
            "Laws and mandatory rules apply according to their own territorial and subject-matter scope. This notice does not select an exclusive governing law or forum. The parties should first seek to resolve any website-related dispute through good-faith consultation; an unresolved dispute may be submitted to a competent authority or court under the law that applies.",
          ],
        },
        {
          heading: "8. Changes",
          paragraphs: [
            "The operator may update this notice; the effective date above shows the current version.",
          ],
        },
      ],
    },
  },
  "zh-cn": {
    privacy: {
      metaTitle: "隐私政策 — JJWine",
      metaDescription: "JJWine 官网如何处理个人信息：最小化处理，无分析统计、无跟踪、无账户、无服务器端表单。",
      title: "隐私政策",
      effectiveDate: "生效日期：2026年8月20日",
      disclaimer: "本页为网站运营者发布的网站隐私政策，说明本网站的实际运行方式；其内容为关于本网站的一般性说明，不构成针对您个人情况的法律意见。",
      sections: [
        {
          heading: "一、运营者与适用范围",
          paragraphs: [
            "本网站由上海捷嘉酒业有限公司运营（在本网站中称为“JJWine”或“运营者”）。本网站以该中文注册名称作为运营者名称，不另行列示英文法定名称。",
            "本政策适用于本公开网站（/en、/zh-cn、/es、/fr 下的英文、简体中文、西班牙语和法语页面），以及为回复咨询或管理潜在业务关系而进行的邮件往来；如有更具体的告知或协议，则由其补充本政策。合同关系还可能适用其他告知与条款。",
          ],
        },
        {
          heading: "二、本网站实际处理的信息",
          paragraphs: [
            "本网站为静态信息展示网站，不设用户账户和登录功能，不使用任何分析统计或广告脚本，不进行第三方跟踪，也没有服务器端询盘表单。我们不出售个人信息。",
            "正常浏览时，除第五条所述托管服务产生的技术数据外，本网站本身不收集您的任何个人信息。",
          ],
        },
        {
          heading: "三、项目需求简报工具",
          paragraphs: [
            "本网站的“项目需求简报”表单完全在您自己的设备和浏览器中处理。您填写的内容不会传输至运营者控制的服务器，也不会由运营者在服务器端储存。生成的文本文件在本地下载至您的设备，除非您自行选择分享。",
          ],
        },
        {
          heading: "四、邮件联系",
          paragraphs: [
            "本网站的邮件链接（mailto 链接）会打开您自己的邮件客户端。如您选择发送邮件，我们将收到您主动提供的信息（通常包括姓名、邮箱、公司和留言内容），并仅用于回复您的咨询和推进潜在业务合作。请勿通过邮件发送敏感个人信息。",
          ],
        },
        {
          heading: "五、Cloudflare 托管",
          paragraphs: [
            "本网站通过 Cloudflare Workers 及 Cloudflare 全球网络提供服务。运营者的 Worker 为交付、保护和排查网站故障，必然接收有限的技术请求数据，例如 IP 地址、请求头、时间戳以及安全或错误信息。运营者不会使用其控制的技术数据构建访问者画像。",
            "Cloudflare 为网络交付、安全及相关服务，按照其自身条款和隐私文档另行处理技术数据。Cloudflare 在全球运营数据中心，其处理目的、地点和保存做法以 Cloudflare 自身文档及本网站启用的服务配置为准。",
          ],
        },
        {
          heading: "六、Cookie 与跟踪",
          paragraphs: [
            "本网站不设置任何分析、广告或其他非必要 Cookie，不使用浏览器指纹或跨站跟踪。Cloudflare 仅在为提供网站服务所必需时，可能设置严格必要的技术性 Cookie 或使用等效机制，用途限于安全与流量完整性保障。",
          ],
        },
        {
          heading: "七、处理目的与法律依据",
          paragraphs: [
            "我们处理上述有限技术数据的目的，是运营、保护和排查本网站故障；处理您来信内容的目的，是回复您的咨询。",
            "在《中华人民共和国个人信息保护法》（PIPL）适用的范围内，我们仅在 PIPL 允许的处理条件下处理个人信息，并在依法需要时取得同意；您就项目主动提供的信息，可在回复咨询和采取您所请求措施所必需的范围内处理。在相关处理符合《通用数据保护条例》（GDPR）的地域适用规则时，我们对网站运营和安全依据正当利益（GDPR 第6条第1款f项），并在适当情况下对项目咨询依据应您请求采取的缔约前措施（GDPR 第6条第1款b项）。",
          ],
        },
        {
          heading: "八、您的权利",
          paragraphs: [
            "在 PIPL 适用于您的情况下，您可依法请求查阅、复制、更正、删除您的个人信息，要求对处理规则作出解释说明，并在处理基于同意时撤回同意。",
            "在 GDPR 适用于您的情况下，您可依其规定请求访问、更正、删除、限制处理和数据可携带，对基于正当利益的处理提出反对，并向您所在地的监管机构投诉。",
            "行使上述权利，请通过下方联系方式与我们联系。由于本网站几乎不存储个人信息，绝大多数请求将涉及邮件往来内容。",
          ],
        },
        {
          heading: "九、跨境传输、保存期限与安全",
          paragraphs: [
            "由于本网站通过 Cloudflare 全球网络提供，邮件也可能经由服务商处理，技术数据和通信内容可能发生跨境传输。对于运营者控制的传输，我们将其限制在运营本网站和与您沟通所必需的范围内，不用于营销或画像，并依法采取所需的告知、同意、合同、评估或其他保障措施。Cloudflare 自身的跨境安排以其隐私文档为准。",
            "运营者控制的技术与安全日志仅在运营、安全和适用法律义务合理所需期间保存。Cloudflare 的保存期限以其条款、政策及本网站启用的服务配置为准。邮件往来在与咨询或业务关系相关的期间内保留，之后依适用义务删除或归档。",
            "我们采取与小型信息展示网站相适应的合理技术和管理措施，包括全站 HTTPS 加密传输。",
          ],
        },
        {
          heading: "十、未成年人与目标受众",
          paragraphs: [
            "本网站是面向专业人士的酒类生产 B2B 网站，不面向未成年人，我们也不会有意收集未成年人的个人信息。",
          ],
        },
        {
          heading: "十一、政策变更",
          paragraphs: [
            "当网站或适用法律发生变化时，我们可能更新本政策。页首生效日期标示当前版本；重大变更将在本页发布。",
          ],
        },

      ],
    },
    legal: {
      metaTitle: "法律声明 — JJWine",
      metaDescription: "JJWine 官网法律声明：信息性内容、能力与认证按项目核实、知识产权及网站使用条款。",
      title: "法律声明",
      effectiveDate: "生效日期：2026年8月20日",
      disclaimer: "本页为网站运营者发布的网站法律声明，规定本网站的提供条件，不构成法律意见。",
      sections: [
        {
          heading: "一、运营者与网站性质",
          paragraphs: [
            "本网站由上海捷嘉酒业有限公司运营（称为“JJWine”或“运营者”）。本网站为面向企业客户的信息展示网站，其内容不构成具有约束力的要约、报价、投资建议，也不构成向消费者销售酒类产品的要约。任何业务关系仅依据另行协商签订的书面协议成立。",
          ],
        },
        {
          heading: "二、能力与认证按项目核实",
          paragraphs: [
            "本网站对生产能力、包装形式、质量体系和认证的描述均为一般性说明。适用的生产场地、认证范围、产品标准和控制计划，需针对每个具体项目、产品和市场，依据当时的现行证据逐一确认。本网站的任何表述均不应被理解为对某项能力、认证或授权适用于特定项目或客户关系的保证。",
          ],
        },
        {
          heading: "三、知识产权与第三方标识",
          paragraphs: [
            "除非另有说明，本网站内容（包括文字、版式、图形及 JJWine 字标）可能受运营者或其许可方所持知识产权保护，未经相关权利人许可不得用于商业性复制。网站中可能提及的第三方名称、品牌和认证标识归各自权利人所有；提及并不意味着背书、合作或超出明确说明范围的授权。",
          ],
        },
        {
          heading: "四、可接受的使用",
          paragraphs: [
            "您仅可出于合法的信息获取目的使用本网站，不得试图干扰网站运行、探测或破坏其安全、进行滥用性抓取，或利用网站内容就运营者及其合作关系误导他人。",
          ],
        },
        {
          heading: "五、外部链接",
          paragraphs: [
            "本网站可能包含指向外部网站的链接。运营者无法控制外部内容，并在适用法律允许的范围内不对其承担责任；设置链接不代表认可。",
          ],
        },
        {
          heading: "六、免责与责任限制",
          paragraphs: [
            "本网站按“现状”提供。运营者会尽合理努力保持内容准确和更新，但不保证内容完整、无误或持续可用。",
            "在适用法律允许的范围内，运营者不对因使用或无法使用本网站及其内容而产生的损害承担责任。本声明不排除或限制依强制性适用法律不得排除或限制的责任，包括在法律不允许限制的情形下因故意或重大过失产生的责任。",
          ],
        },
        {
          heading: "七、适用法律与争议解决",
          paragraphs: [
            "相关法律和强制性规定依其各自的地域与事项适用范围生效。本声明不选择排他的准据法或争议管辖地。与本网站有关的争议，双方应首先通过友好协商解决；未能解决的，可依法提交有管辖权的主管机关或法院处理。",
          ],
        },
        {
          heading: "八、变更",
          paragraphs: [
            "运营者可更新本声明，页首生效日期标示当前版本。",
          ],
        },
      ],
    },
  },
};
