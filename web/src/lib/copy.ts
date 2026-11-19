export type Locale = "en" | "fr";

export const LINKS = {
  telegram: "https://t.me/the_alchemist99",
  equityEdge: "https://app.equityedge.io/signup/ALCHEMIST/",
  hfm: "https://register.hfm.com/sv/en/new-live-account/?refid=30597816",
  instagram: "https://www.instagram.com/lqd_alchemist",
  tiktok: "https://www.tiktok.com/@lqd_alchemist",
  management: "/management",
  register: "/register",
  login: "/login",
  dashboard: "/dashboard",
  managementApply: "/management/apply",
  admin: "/admin",
  adminLogin: "/admin/login",
} as const;

export const SOCIALS = [
  { id: "telegram", label: "Telegram", href: LINKS.telegram },
  { id: "instagram", label: "Instagram", href: LINKS.instagram },
  { id: "tiktok", label: "TikTok", href: LINKS.tiktok },
] as const;

export type Copy = {
  brand: string;
  brandSub: string;
  nav: {
    method: string;
    programs: string;
    management: string;
    partners: string;
    contact: string;
  };
  hero: {
    headline: string;
    support: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  mentor: {
    title: string;
    name: string;
    role: string;
    body: string;
  };
  stats: {
    title: string;
    support: string;
    items: { value: string; label: string }[];
  };
  terms: {
    title: string;
    paragraphs: string[];
    accept: string;
    decline: string;
  };
  ui: {
    signIn: string;
    themeLight: string;
    themeDark: string;
  };
  method: {
    title: string;
    support: string;
    principles: { name: string; body: string }[];
  };
  proof: {
    title: string;
    support: string;
    quotes: { name: string; role: string; text: string; badge: string }[];
    note: string;
  };
  programs: {
    title: string;
    support: string;
    items: { name: string; price: string; body: string; cta: string }[];
    disclaimer: string;
  };
  managementTeaser: {
    title: string;
    support: string;
    cta: string;
    points: string[];
  };
  partners: {
    title: string;
    support: string;
    equity: {
      label: string;
      title: string;
      body: string;
      cta: string;
      code: string;
    };
    hfm: {
      label: string;
      title: string;
      body: string;
      cta: string;
      prizes: { place: string; name: string; detail: string }[];
    };
  };
  connect: {
    title: string;
    support: string;
    cta: string;
    riskTitle: string;
    risk: string;
  };
  footer: {
    tagline: string;
    rights: string;
    social: string;
    linksTitle: string;
  };
  management: {
    eyebrow: string;
    title: string;
    support: string;
    termsTitle: string;
    plans: {
      title: string;
      support: string;
      items: {
        id: string;
        name: string;
        range: string;
        body: string;
        bullets: string[];
      }[];
    };
    how: {
      title: string;
      support: string;
      steps: { name: string; body: string }[];
    };
    apply: {
      title: string;
      body: string;
      cta: string;
    };
    dashboard: {
      title: string;
      body: string;
      mustCreate: string;
      ctaCreate: string;
      ctaOpen: string;
      items: string[];
    };
    reports: {
      title: string;
      body: string;
      items: string[];
    };
    profit: {
      title: string;
      body: string;
      items: string[];
    };
    protection: {
      title: string;
      body: string[];
    };
    agreement: {
      title: string;
      body: string;
      items: string[];
      cta: string;
    };
    faq: {
      title: string;
      items: { q: string; a: string }[];
    };
  };
  auth: {
    registerTitle: string;
    registerSupport: string;
    loginTitle: string;
    loginSupport: string;
    personalSection: string;
    tradingSection: string;
    name: string;
    username: string;
    phone: string;
    phoneCode: string;
    password: string;
    country: string;
    countryPlaceholder: string;
    broker: string;
    accountBalance: string;
    currency: string;
    preferredAccount: string;
    preferredOptions: { value: string; label: string }[];
    submitRegister: string;
    submitLogin: string;
    haveAccount: string;
    noAccount: string;
    managementApplyLink: string;
    demoNote: string;
  };
  dash: {
    title: string;
    welcome: string;
    statusActive: string;
    statusLabel: string;
    balance: string;
    equity: string;
    drawdown: string;
    managerShare: string;
    pnlDaily: string;
    pnlWeekly: string;
    pnlMonthly: string;
    chartTitle: string;
    historyTitle: string;
    agreementTitle: string;
    settlementsTitle: string;
    notificationsTitle: string;
    withdrawalTitle: string;
    withdrawalBody: string;
    withdrawalCta: string;
    terminateCta: string;
    logout: string;
    openAgreement: string;
    cols: {
      date: string;
      symbol: string;
      side: string;
      pnl: string;
      type: string;
      amount: string;
      note: string;
    };
  };
};

const en: Copy = {
  brand: "The Liquidity Alchemist",
  brandSub: "Alchemist EMS Lab · Led by LQD Alchemist",
  nav: {
    method: "Method",
    programs: "Mentorship",
    management: "Management",
    partners: "Partners",
    contact: "Contact",
  },
  hero: {
    headline: "Read the market. Refine the process.",
    support:
      "Structured EMS mentorship and capital management for English- and French-speaking traders, led by LQD Alchemist.",
    ctaPrimary: "Explore mentorship",
    ctaSecondary: "Account management",
  },
  mentor: {
    title: "Meet the mentor",
    name: "LQD Alchemist",
    role: "Teacher · Mentor · Portfolio manager",
    body: "LQD Alchemist leads Alchemist EMS Lab with a process-first approach to liquidity, structure, and execution — for traders who want discipline over noise.",
  },
  stats: {
    title: "Impact in numbers",
    support: "A growing community of traders guided by process, discipline, and liquidity mastery.",
    items: [
      { value: "+500", label: "Students mentored" },
      { value: "+4 yrs", label: "Of experience" },
      { value: "+5", label: "Countries" },
    ],
  },
  terms: {
    title: "Terms & conditions",
    paragraphs: [
      "By creating an account with The Liquidity Alchemist, you confirm that the personal and trading information you provide is accurate.",
      "Account management is discretionary and subject to review and written agreement. Acceptance is not guaranteed.",
      "Trading leveraged products involves substantial risk of loss. Past performance does not indicate future results. Only allocate capital you can afford to lose.",
      "You agree to digital signature of the management agreement, profit-sharing terms, risk disclosure, withdrawal and termination policies before managed trading begins.",
      "Your dashboard data, notifications, and settlement records are for client monitoring. Nothing on this platform constitutes personalised financial advice.",
    ],
    accept: "I agree — create account",
    decline: "Cancel",
  },
  ui: {
    signIn: "Sign in",
    themeLight: "Light",
    themeDark: "Dark",
  },
  method: {
    title: "The EMS approach",
    support: "Clarity before entries. Process before prediction.",
    principles: [
      {
        name: "Liquidity",
        body: "See where orders concentrate and why price reacts — trade with the flow, not against it.",
      },
      {
        name: "Structure",
        body: "Read market topography across timeframes. Know the context before you time the entry.",
      },
      {
        name: "Execution",
        body: "Risk first, then timing. A repeatable model you can review, refine, and trust.",
      },
    ],
  },
  proof: {
    title: "Process over noise",
    support: "Discipline compounds. Noise doesn’t.",
    quotes: [
      {
        name: "Student · EMS",
        role: "Mentorship path",
        text: "EMS gave me a rules-based way to read liquidity instead of chasing every candle.",
        badge: "Clearer process",
      },
      {
        name: "Student · Signals",
        role: "Signals community",
        text: "I stopped treating signals as shortcuts and started studying the reasoning behind each setup.",
        badge: "Better decisions",
      },
      {
        name: "Student · 1-on-1",
        role: "Private coaching",
        text: "The 1-on-1 sessions tightened my risk rules and removed a lot of emotional noise.",
        badge: "Risk first",
      },
    ],
    note: "Placeholder quotes — replace with real student testimonials when ready.",
  },
  programs: {
    title: "Mentorship paths",
    support:
      "Choose the format that fits your goals. Register and confirm availability on Telegram. Prices in USD.",
    items: [
      {
        name: "EMS Monthly Session",
        price: "$100",
        body: "Monthly EMS strategy session with free lifetime Inner Circle access.",
        cta: "Enquire to join",
      },
      {
        name: "EMS + 1 Month Signals",
        price: "$150",
        body: "EMS Monthly Session, lifetime Inner Circle access, and one month in the signals community.",
        cta: "Enquire to join",
      },
      {
        name: "1-on-1 Sessions",
        price: "$350",
        body: "Personalised sessions with LQD Alchemist, including lifetime Inner Circle access.",
        cta: "Contact to enquire",
      },
      {
        name: "Recorded Videos & PDFs",
        price: "$70",
        body: "Educational video recordings and PDF learning materials for self-paced study.",
        cta: "Get access",
      },
      {
        name: "Premium Trading Signals",
        price: "Monthly",
        body: "Monthly access to the premium trading signals community.",
        cta: "Join signals",
      },
      {
        name: "Lifetime Community Access",
        price: "Included",
        body: "Free with the $100 EMS Monthly, $150 EMS + Signals, and $350 1-on-1 paths.",
        cta: "Ask about access",
      },
    ],
    disclaimer:
      "Trading education and signals do not guarantee profits. Trading involves risk.",
  },
  managementTeaser: {
    title: "Account management",
    support:
      "Professional capital management under LQD Alchemist — from growth accounts to institutional-scale capital.",
    cta: "View management plans",
    points: [
      "LQD Managed Trading — $5,000–$10,000",
      "LQD Capital Management — $50,000+",
      "Transparent reporting · defined risk rules",
    ],
  },
  partners: {
    title: "Partner pathways",
    support:
      "Optional tools for funded accounts and community challenges — secondary to mentorship.",
    equity: {
      label: "Equity Edge",
      title: "50% off eligible funded accounts",
      body: "Use community code ALCHEMIST at checkout on Equity Edge.",
      cta: "Join Equity Edge",
      code: "ALCHEMIST",
    },
    hfm: {
      label: "HFM Challenge",
      title: "LQD Alchemist Trading Challenge",
      body: "Two-week competition via the official HFM referral link. Minimum $50 deposit. No separate participation fee. Ranked by highest percentage profit.",
      cta: "Register with HFM",
      prizes: [
        { place: "1st", name: "iPhone 17 Pro Max", detail: "Brand new" },
        { place: "2nd", name: "iPad", detail: "Second place" },
        { place: "3rd", name: "$250", detail: "Cash prize" },
      ],
    },
  },
  connect: {
    title: "Speak with LQD Alchemist",
    support:
      "For mentorship registration, account management, signals, and enquiries — send a direct message on Telegram.",
    cta: "Message on Telegram",
    riskTitle: "Trading risk notice",
    risk: "THE LIQUIDITY ALCHEMIST / ALCHEMIST EMS LAB provides educational content, community services, and discretionary account management services where agreed in writing. Nothing on this website is financial advice or a guarantee of results. Trading leveraged financial products carries significant risk and may not be suitable for everyone. Only trade or allocate capital you can afford to lose.",
  },
  footer: {
    tagline: "Process. Liquidity. Discipline.",
    rights: "© The Liquidity Alchemist · Alchemist EMS Lab",
    social: "Follow LQD Alchemist",
    linksTitle: "Explore",
  },
  management: {
    eyebrow: "Account Management",
    title: "Capital under a defined process",
    support:
      "Professional management for selected client accounts. Create an account, apply, and get reviewed — acceptance is not guaranteed.",
    termsTitle: "Profit share, agreement & risk",
    plans: {
      title: "Management Plans",
      support: "Two pathways — choose by capital size.",
      items: [
        {
          id: "capital",
          name: "LQD Capital Management",
          range: "$50,000+",
          body: "Discretionary management for larger allocations.",
          bullets: [
            "Written mandate & risk limits",
            "Scheduled reporting",
            "Agreed profit-sharing terms",
          ],
        },
        {
          id: "managed",
          name: "LQD Managed Trading",
          range: "$5,000–$10,000",
          body: "Managed execution on a defined growth account size.",
          bullets: [
            "Defined risk rules",
            "Dashboard monitoring",
            "Path to scale after review",
          ],
        },
      ],
    },
    how: {
      title: "How It Works",
      support:
        "A structured process for investors who want their accounts professionally managed.",
      steps: [
        {
          name: "Create your client account",
          body: "Clients must create an account on The Liquidity Alchemist platform before applying. This unlocks the private dashboard after approval.",
        },
        {
          name: "Apply for account management",
          body: "Client submits an application with their trading account details, capital, broker, and preferred risk level.",
        },
        {
          name: "Review & approval",
          body: "LQD Alchemist reviews the account and decides whether it meets management requirements.",
        },
        {
          name: "Agreement & verification",
          body: "Both parties accept the management agreement, including profit-sharing, risk, withdrawal policies, and termination terms — via digital agreement (signature).",
        },
        {
          name: "Account connection",
          body: "Client connects their trading account through a supported broker integration or authorized trading-management mechanism.",
        },
        {
          name: "Trading & monitoring",
          body: "Client monitors performance, trades, balance, equity, drawdown, and fees from their dashboard.",
        },
        {
          name: "Profit calculation & settlement",
          body: "Management fees are calculated transparently and settled according to the agreement.",
        },
      ],
    },
    apply: {
      title: "Apply for Management",
      body: "Create your client account first, then submit your application with trading account details, capital, broker, preferred plan, and risk level. You will receive next steps if the account meets requirements.",
      cta: "Create account & apply",
    },
    dashboard: {
      title: "Client Dashboard",
      body: "Create an account to unlock the private dashboard after approval.",
      mustCreate: "Account required.",
      ctaCreate: "Create account",
      ctaOpen: "Open dashboard",
      items: [
        "Trading performance chart",
        "Daily, weekly & monthly P/L",
        "Trading history",
        "Drawdown monitoring",
        "Balance & equity",
        "Manager profit share",
        "Management agreement",
        "Payment & settlement history",
        "Account status",
        "Withdrawal / termination",
        "Notifications",
      ],
    },
    reports: {
      title: "Performance Reports",
      body: "",
      items: [],
    },
    profit: {
      title: "Profit Sharing",
      body: "Profit share and fees are confirmed in your signed agreement before trading starts. No guaranteed returns.",
      items: [],
    },
    protection: {
      title: "Risk Disclosure",
      body: [
        "Trading involves substantial risk of loss. Past performance does not indicate future results. Only allocate capital you can afford to lose.",
      ],
    },
    agreement: {
      title: "Management Agreement",
      body: "A digital agreement covers mandate, risk limits, profit share, withdrawals, reporting, and termination — required before any managed trading.",
      items: [],
      cta: "Request agreement outline",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "Is management the same as mentorship?",
          a: "No. Mentorship teaches the process. Management trades capital under a signed agreement.",
        },
        {
          q: "Which plan fits my capital?",
          a: "Managed Trading: $5,000–$10,000. Capital Management: $50,000+.",
        },
        {
          q: "Do I need to create an account?",
          a: "Yes — required to apply and to access the client dashboard.",
        },
        {
          q: "Are profits guaranteed?",
          a: "No. Losses are possible. Read the risk disclosure.",
        },
        {
          q: "How do I stop management?",
          a: "Submit a termination request from the dashboard or per your agreement.",
        },
      ],
    },
  },
  auth: {
    registerTitle: "Create your portal account",
    registerSupport:
      "Normal client account for EMS Academy, lives, resources and the portal. This is separate from Account Management.",
    loginTitle: "Sign in",
    loginSupport: "Sign in with your portal account or management account username.",
    personalSection: "Personal information",
    tradingSection: "Trading account details",
    name: "Full name",
    username: "Username",
    phone: "Phone number",
    phoneCode: "Code",
    password: "Password",
    country: "Country",
    countryPlaceholder: "Select your country",
    broker: "Trading broker",
    accountBalance: "Account balance",
    currency: "Currency",
    preferredAccount: "Management plan",
    preferredOptions: [
      { value: "managed", label: "LQD Managed Trading ($5,000–$10,000)" },
      { value: "capital", label: "LQD Capital Management ($50,000+)" },
    ],
    submitRegister: "Create portal account",
    submitLogin: "Sign in",
    haveAccount: "Already have an account? Sign in",
    noAccount: "Need a portal account? Create one",
    managementApplyLink: "Want capital managed? Apply for Account Management",
    demoNote:
      "Prototype auth — credentials are stored locally in this browser for demo only.",
  },
  dash: {
    title: "Client dashboard",
    welcome: "Welcome back",
    statusActive: "Active — managed",
    statusLabel: "Account status",
    balance: "Balance",
    equity: "Equity",
    drawdown: "Drawdown",
    managerShare: "Manager profit share",
    pnlDaily: "Daily P/L",
    pnlWeekly: "Weekly P/L",
    pnlMonthly: "Monthly P/L",
    chartTitle: "Trading performance",
    historyTitle: "Trading history",
    agreementTitle: "Management agreement",
    settlementsTitle: "Payments & settlements",
    notificationsTitle: "Notifications",
    withdrawalTitle: "Withdrawal / termination",
    withdrawalBody:
      "Request a withdrawal or terminate management under your agreement terms. Requests are reviewed before processing.",
    withdrawalCta: "Request withdrawal",
    terminateCta: "Request termination",
    logout: "Sign out",
    openAgreement: "View signed agreement",
    cols: {
      date: "Date",
      symbol: "Symbol",
      side: "Side",
      pnl: "P/L",
      type: "Type",
      amount: "Amount",
      note: "Note",
    },
  },
};

const fr: Copy = {
  brand: "The Liquidity Alchemist",
  brandSub: "Alchemist EMS Lab · Dirigé par LQD Alchemist",
  nav: {
    method: "Méthode",
    programs: "Mentorat",
    management: "Gestion",
    partners: "Partenaires",
    contact: "Contact",
  },
  hero: {
    headline: "Lire le marché. Affiner le processus.",
    support:
      "Mentorat EMS structuré et gestion de comptes pour traders anglophones et francophones, dirigé par LQD Alchemist.",
    ctaPrimary: "Découvrir le mentorat",
    ctaSecondary: "Gestion de compte",
  },
  mentor: {
    title: "Le mentor",
    name: "LQD Alchemist",
    role: "Enseignant · Mentor · Gestionnaire",
    body: "LQD Alchemist dirige Alchemist EMS Lab avec une approche process-first de la liquidité, de la structure et de l’exécution — pour les traders qui préfèrent la discipline au bruit.",
  },
  stats: {
    title: "L’impact en chiffres",
    support: "Une communauté de traders guidée par le processus, la discipline et la maîtrise de la liquidité.",
    items: [
      { value: "+500", label: "Élèves mentorés" },
      { value: "+4 ans", label: "D’expérience" },
      { value: "+5", label: "Pays" },
    ],
  },
  terms: {
    title: "Conditions générales",
    paragraphs: [
      "En créant un compte chez The Liquidity Alchemist, vous confirmez que les informations personnelles et de trading fournies sont exactes.",
      "La gestion de compte est discrétionnaire, soumise à revue et accord écrit. L’acceptation n’est pas garantie.",
      "Le trading à effet de levier comporte un risque substantiel de perte. Les performances passées ne préjugent pas des résultats futurs.",
      "Vous acceptez la signature numérique de l’accord de gestion, du partage des profits, de la divulgation des risques et des politiques de retrait/résiliation.",
      "Les données du tableau de bord ne constituent pas un conseil financier personnalisé.",
    ],
    accept: "J’accepte — créer le compte",
    decline: "Annuler",
  },
  ui: {
    signIn: "Connexion",
    themeLight: "Jour",
    themeDark: "Nuit",
  },
  method: {
    title: "L’approche EMS",
    support: "La clarté avant les entrées. Le processus avant la prédiction.",
    principles: [
      {
        name: "Liquidité",
        body: "Voir où les ordres se concentrent et pourquoi le prix réagit — trader avec le flux, pas contre.",
      },
      {
        name: "Structure",
        body: "Lire la topographie du marché sur plusieurs unités de temps. Le contexte avant le timing.",
      },
      {
        name: "Exécution",
        body: "Le risque d’abord, puis le timing. Un modèle répétable à revoir, affiner et maîtriser.",
      },
    ],
  },
  proof: {
    title: "Le processus plutôt que le bruit",
    support: "La discipline se compose. Le bruit, non.",
    quotes: [
      {
        name: "Élève · EMS",
        role: "Parcours mentorat",
        text: "L’EMS m’a donné une lecture rules-based de la liquidité au lieu de courir chaque bougie.",
        badge: "Processus plus clair",
      },
      {
        name: "Élève · Signaux",
        role: "Communauté signaux",
        text: "J’ai arrêté de traiter les signaux comme des raccourcis et j’étudie le raisonnement derrière chaque setup.",
        badge: "Meilleures décisions",
      },
      {
        name: "Élève · 1-à-1",
        role: "Coaching privé",
        text: "Les sessions 1-à-1 ont resserré mes règles de risque et retiré beaucoup de bruit émotionnel.",
        badge: "Risque d’abord",
      },
    ],
    note: "Citations placeholders — à remplacer par de vrais témoignages.",
  },
  programs: {
    title: "Parcours de mentorat",
    support:
      "Choisissez le format adapté à vos objectifs. Inscription et disponibilité via Telegram. Prix en USD.",
    items: [
      {
        name: "Session EMS mensuelle",
        price: "$100",
        body: "Session EMS mensuelle avec accès Inner Circle à vie.",
        cta: "Demander à rejoindre",
      },
      {
        name: "EMS + 1 mois de signaux",
        price: "$150",
        body: "Session EMS, Inner Circle à vie, et un mois dans la communauté signaux.",
        cta: "Demander à rejoindre",
      },
      {
        name: "Sessions 1-à-1",
        price: "$350",
        body: "Sessions personnalisées avec LQD Alchemist, incluant Inner Circle à vie.",
        cta: "Nous contacter",
      },
      {
        name: "Vidéos & PDF",
        price: "$70",
        body: "Enregistrements et supports PDF pour un apprentissage à votre rythme.",
        cta: "Obtenir l’accès",
      },
      {
        name: "Signaux premium",
        price: "Mensuel",
        body: "Accès mensuel à la communauté de signaux premium.",
        cta: "Rejoindre les signaux",
      },
      {
        name: "Accès communauté à vie",
        price: "Inclus",
        body: "Offert avec les parcours $100, $150 et $350.",
        cta: "Demander l’accès",
      },
    ],
    disclaimer:
      "La formation et les signaux ne garantissent pas de profits. Le trading comporte des risques.",
  },
  managementTeaser: {
    title: "Gestion de compte",
    support:
      "Gestion professionnelle de capital sous LQD Alchemist — des comptes de croissance aux allocations plus importantes.",
    cta: "Voir les plans de gestion",
    points: [
      "LQD Managed Trading — $5,000–$10,000",
      "LQD Capital Management — $50,000+",
      "Reporting transparent · règles de risque définies",
    ],
  },
  partners: {
    title: "Parcours partenaires",
    support:
      "Outils optionnels pour comptes financés et challenges — secondaires au mentorat.",
    equity: {
      label: "Equity Edge",
      title: "−50 % sur les comptes financés éligibles",
      body: "Utilisez le code communauté ALCHEMIST au paiement sur Equity Edge.",
      cta: "Rejoindre Equity Edge",
      code: "ALCHEMIST",
    },
    hfm: {
      label: "Challenge HFM",
      title: "LQD Alchemist Trading Challenge",
      body: "Compétition de deux semaines via le lien de parrainage HFM officiel. Dépôt minimum 50 $. Pas de frais de participation séparés. Classement par plus haut pourcentage de profit.",
      cta: "S’inscrire avec HFM",
      prizes: [
        { place: "1er", name: "iPhone 17 Pro Max", detail: "Neuf" },
        { place: "2e", name: "iPad", detail: "Deuxième place" },
        { place: "3e", name: "$250", detail: "Prix en espèces" },
      ],
    },
  },
  connect: {
    title: "Écrire à LQD Alchemist",
    support:
      "Pour le mentorat, la gestion de compte, les signaux et les demandes — message direct sur Telegram.",
    cta: "Message sur Telegram",
    riskTitle: "Avertissement sur les risques",
    risk: "THE LIQUIDITY ALCHEMIST / ALCHEMIST EMS LAB propose du contenu éducatif, des services communautaires et, le cas échéant, une gestion discrétionnaire de comptes selon un accord écrit. Rien sur ce site n’est un conseil financier ni une garantie de résultats. Le trading de produits à effet de levier comporte des risques importants. N’allouez que du capital que vous pouvez vous permettre de perdre.",
  },
  footer: {
    tagline: "Processus. Liquidité. Discipline.",
    rights: "© The Liquidity Alchemist · Alchemist EMS Lab",
    social: "Suivre LQD Alchemist",
    linksTitle: "Explorer",
  },
  management: {
    eyebrow: "Gestion de compte",
    title: "Du capital sous un processus défini",
    support:
      "Gestion professionnelle pour comptes sélectionnés. Créez un compte, postulez, puis revue — l’acceptation n’est pas garantie.",
    termsTitle: "Partage, accord & risque",
    plans: {
      title: "Plans de gestion",
      support: "Deux parcours — selon la taille du capital.",
      items: [
        {
          id: "capital",
          name: "LQD Capital Management",
          range: "$50,000+",
          body: "Gestion discrétionnaire pour allocations importantes.",
          bullets: [
            "Mandat écrit & limites de risque",
            "Reporting planifié",
            "Partage des profits convenu",
          ],
        },
        {
          id: "managed",
          name: "LQD Managed Trading",
          range: "$5,000–$10,000",
          body: "Exécution gérée sur un compte de croissance défini.",
          bullets: [
            "Règles de risque définies",
            "Suivi via tableau de bord",
            "Voie d’évolution après revue",
          ],
        },
      ],
    },
    how: {
      title: "Comment ça marche",
      support:
        "Un processus structuré pour les investisseurs qui souhaitent une gestion professionnelle.",
      steps: [
        {
          name: "Créer un compte client",
          body: "Obligatoire avant de candidater. Débloque le tableau de bord après approbation.",
        },
        {
          name: "Candidature à la gestion",
          body: "Soumettez les détails du compte, capital, broker et niveau de risque.",
        },
        {
          name: "Revue & approbation",
          body: "LQD Alchemist décide si le compte répond aux exigences.",
        },
        {
          name: "Accord & vérification",
          body: "Signature numérique de l’accord — partage, risque, retraits, résiliation.",
        },
        {
          name: "Connexion du compte",
          body: "Connexion via broker supporté ou mécanisme de gestion autorisé.",
        },
        {
          name: "Trading & suivi",
          body: "Suivi performance, trades, solde, equity, drawdown et frais depuis le dashboard.",
        },
        {
          name: "Calcul des profits & règlement",
          body: "Frais calculés de façon transparente et réglés selon l’accord.",
        },
      ],
    },
    apply: {
      title: "Postuler à la gestion",
      body: "Créez d’abord votre compte, puis soumettez capital, broker, plan et risque.",
      cta: "Créer un compte et postuler",
    },
    dashboard: {
      title: "Tableau de bord client",
      body: "Créez un compte pour débloquer le tableau de bord après approbation.",
      mustCreate: "Compte requis.",
      ctaCreate: "Créer un compte",
      ctaOpen: "Ouvrir le tableau de bord",
      items: [
        "Graphique de performance",
        "P/L journalier, hebdo & mensuel",
        "Historique des trades",
        "Suivi du drawdown",
        "Solde & equity",
        "Part de profit manager",
        "Accord de gestion",
        "Paiements & règlements",
        "Statut du compte",
        "Retrait / résiliation",
        "Notifications",
      ],
    },
    reports: {
      title: "Rapports de performance",
      body: "",
      items: [],
    },
    profit: {
      title: "Partage des profits",
      body: "Le partage et les frais sont confirmés dans l’accord signé avant le trading. Aucun rendement garanti.",
      items: [],
    },
    protection: {
      title: "Divulgation des risques",
      body: [
        "Le trading comporte un risque substantiel de perte. Les performances passées ne préjugent pas du futur. N’allouez que du capital que vous pouvez perdre.",
      ],
    },
    agreement: {
      title: "Accord de gestion",
      body: "Un accord numérique couvre mandat, risques, partage, retraits, reporting et résiliation — obligatoire avant tout trading géré.",
      items: [],
      cta: "Demander le cadre d’accord",
    },
    faq: {
      title: "FAQ",
      items: [
        {
          q: "Gestion = mentorat ?",
          a: "Non. Le mentorat enseigne. La gestion trade le capital sous accord signé.",
        },
        {
          q: "Quel plan pour mon capital ?",
          a: "Managed Trading : $5,000–$10,000. Capital Management : $50,000+.",
        },
        {
          q: "Faut-il créer un compte ?",
          a: "Oui — obligatoire pour candidater et accéder au dashboard.",
        },
        {
          q: "Profits garantis ?",
          a: "Non. Les pertes sont possibles.",
        },
        {
          q: "Comment arrêter ?",
          a: "Demande de résiliation depuis le dashboard ou selon l’accord.",
        },
      ],
    },
  },
  auth: {
    registerTitle: "Créer votre compte portail",
    registerSupport:
      "Compte client normal pour EMS Academy, lives, ressources et le portail. Séparé de la Gestion de compte.",
    loginTitle: "Connexion",
    loginSupport: "Connectez-vous avec votre compte portail ou votre compte de gestion.",
    personalSection: "Informations personnelles",
    tradingSection: "Détails du compte de trading",
    name: "Nom complet",
    username: "Nom d’utilisateur",
    phone: "Numéro de téléphone",
    phoneCode: "Indicatif",
    password: "Mot de passe",
    country: "Pays",
    countryPlaceholder: "Sélectionnez votre pays",
    broker: "Broker de trading",
    accountBalance: "Solde du compte",
    currency: "Devise",
    preferredAccount: "Plan de gestion",
    preferredOptions: [
      { value: "managed", label: "LQD Managed Trading ($5,000–$10,000)" },
      { value: "capital", label: "LQD Capital Management ($50,000+)" },
    ],
    submitRegister: "Créer le compte portail",
    submitLogin: "Se connecter",
    haveAccount: "Déjà un compte ? Se connecter",
    noAccount: "Besoin d’un compte portail ? En créer un",
    managementApplyLink: "Vous voulez une gestion de capital ? Demandez un compte Gestion",
    demoNote:
      "Auth prototype — identifiants stockés localement dans ce navigateur pour la démo uniquement.",
  },
  dash: {
    title: "Tableau de bord client",
    welcome: "Bon retour",
    statusActive: "Actif — géré",
    statusLabel: "Statut du compte",
    balance: "Solde",
    equity: "Equity",
    drawdown: "Drawdown",
    managerShare: "Part de profit manager",
    pnlDaily: "P/L journalier",
    pnlWeekly: "P/L hebdomadaire",
    pnlMonthly: "P/L mensuel",
    chartTitle: "Performance trading",
    historyTitle: "Historique des trades",
    agreementTitle: "Accord de gestion",
    settlementsTitle: "Paiements & règlements",
    notificationsTitle: "Notifications",
    withdrawalTitle: "Retrait / résiliation",
    withdrawalBody:
      "Demandez un retrait ou résiliez la gestion selon votre accord. Les demandes sont examinées avant traitement.",
    withdrawalCta: "Demander un retrait",
    terminateCta: "Demander la résiliation",
    logout: "Se déconnecter",
    openAgreement: "Voir l’accord signé",
    cols: {
      date: "Date",
      symbol: "Symbole",
      side: "Sens",
      pnl: "P/L",
      type: "Type",
      amount: "Montant",
      note: "Note",
    },
  },
};

export const copy = { en, fr } as const;
