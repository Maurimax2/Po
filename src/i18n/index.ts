/**
 * All user-facing UI strings live here, in two objects: `fr` (default) and `ar`.
 * No i18n library — `ar` is typed against `fr`, so TypeScript fails the build
 * if a key is added to one and forgotten in the other.
 *
 * Product copy is not here: it lives next to each product in src/data/products.ts.
 */

export type Lang = 'fr' | 'ar';

export const LANGS: Lang[] = ['fr', 'ar'];

export const fr = {
  meta: {
    dir: 'ltr',
    label: 'Français',
    switchTo: 'العربية',
    switchToAria: "Passer le site à l'arabe",
  },

  brand: {
    name: 'Basma',
    full: 'Basma pour les services publics',
    tagline: 'Vidéosurveillance & équipement électrique — Nouakchott',
    baseline: 'Votre empreinte, notre regard.',
  },

  nav: {
    home: 'Accueil',
    catalogue: 'Catalogue',
    categories: 'Catégories',
    contact: 'Contact',
    cart: 'Panier',
    menu: 'Menu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    skip: 'Aller au contenu principal',
    breadcrumb: "Fil d'Ariane",
    viewCart: 'Voir le panier',
  },

  hero: {
    channel: 'CAM 01',
    live: 'EN DIRECT',
    eyebrow: 'Nouakchott — Mauritanie',
    title1: 'On ne protège',
    title2: 'que ce que',
    title3: "l'on voit.",
    lead: "Caméras de surveillance, kits complets Dahua, télévisions, sonorisation, énergie solaire et ventilation. Nous vendons le matériel, nous l'installons chez vous, et nous restons joignables après.",
    ctaPrimary: 'Voir le catalogue',
    ctaSecondary: 'Écrire sur WhatsApp',
    scrollHint: 'Faites défiler',
    caption: 'Rayon vidéosurveillance — magasin Basma, Nouakchott',
  },

  trust: {
    title: 'Ce qui vient avec le matériel',
    items: [
      { title: 'Garantie magasin', text: "Chaque appareil est vérifié avant de sortir. En cas de problème, vous revenez nous voir — on ne vous renvoie pas vers un numéro à l'étranger." },
      { title: 'Installation à domicile', text: "Nos techniciens posent les caméras, tirent les câbles, configurent l'enregistreur et l'application sur votre téléphone." },
      { title: 'Livraison à Nouakchott', text: "Livraison dans tous les quartiers de Nouakchott, et expédition vers l'intérieur du pays." },
      { title: 'Conseil technique', text: "Dites-nous ce que vous voulez surveiller. On vous dit combien de caméras il faut — et lesquelles ne servent à rien chez vous." },
    ],
  },

  categories: {
    eyebrow: 'Rayons',
    title: 'Six rayons, un magasin',
    lead: "La vidéosurveillance est notre métier principal — c'est là que nous avons le plus de stock et le plus d'expérience. Le reste suit la maison mauritanienne : la télé, le son, le courant, la chaleur.",
    seeAll: 'Tout le catalogue',
    productCount: (n: number) => (n > 1 ? `${n} produits` : `${n} produit`),
    channel: 'CH',
  },

  featured: {
    eyebrow: 'Sélection',
    title: 'Ce qui part le plus vite',
    lead: 'Les références que les clients demandent en boutique semaine après semaine.',
  },

  app: {
    eyebrow: 'Pilotage à distance',
    title: 'Tout tient dans votre téléphone',
    lead: "Nos caméras motorisées se pilotent depuis l'application : vous faites tourner l'objectif, vous zoomez, vous parlez dans le haut-parleur, vous relisez l'enregistrement de la nuit. Depuis la boutique, depuis la maison, ou depuis l'étranger.",
    bullets: [
      'Rotation 355° horizontale et 90° verticale, à la main depuis l’écran',
      'Vision nocturne en couleur, pas seulement en noir et blanc',
      'Alerte sur le téléphone dès qu’une personne entre dans le champ',
      'Plusieurs caméras sur un seul écran, plusieurs utilisateurs sur une seule caméra',
    ],
    imageAlt: "Écran de l'application montrant le contrôle de rotation PTZ d'une caméra depuis un téléphone",
  },

  stock: {
    eyebrow: 'Dans le magasin',
    title: 'Le stock est là, pas sur catalogue',
    lead: "Ces photos sont prises dans nos rayons. Ce que vous voyez sur le site est ce qui est posé sur l'étagère — et si une référence vient à manquer, on vous le dit avant que vous ne vous déplaciez.",
    cta: 'Demander une disponibilité',
  },

  service: {
    eyebrow: 'Installation & maintenance',
    title: "Le matériel ne sert à rien s'il est mal posé",
    lead: "Une caméra orientée vers le soleil ne montre rien. Un câble mal serti lâche à la première pluie. Un enregistreur mal réglé écrase les images avant que vous n'en ayez besoin. C'est pour ça que nous installons nous-mêmes.",
    steps: [
      { title: 'Visite et repérage', text: "On passe sur place, on regarde les accès, les angles morts, l'arrivée du courant et la couverture réseau." },
      { title: 'Devis clair', text: 'Nombre de caméras, type, longueur de câble, enregistreur et disque : vous savez ce que vous payez avant de commencer.' },
      { title: 'Pose et câblage', text: "Fixation, câblage propre, alimentation protégée, réglage des angles de nuit comme de jour." },
      { title: 'Réglage et formation', text: "Application installée sur vos téléphones, comptes créés, et on vous montre comment relire un enregistrement." },
      { title: 'Maintenance', text: "Nettoyage des objectifs, vérification des disques, remplacement d'une caméra en panne, extension du système." },
    ],
    cta: 'Demander un devis d’installation',
  },

  contactStrip: {
    eyebrow: 'Commander',
    title: 'Une seule adresse\u202F: WhatsApp',
    lead: "Pas de paiement en ligne, pas de compte à créer. Vous composez votre panier, vous nous l'envoyez sur WhatsApp, nous répondons avec la disponibilité et le prix.",
    cta: 'Ouvrir WhatsApp',
    phoneLabel: 'Téléphone / WhatsApp',
  },

  product: {
    priceOnRequest: 'Prix sur demande',
    priceNote: 'Prix communiqué sur WhatsApp',
    addToCart: 'Ajouter au panier',
    added: 'Ajouté',
    inCart: 'Dans le panier',
    orderDirect: 'Commander sur WhatsApp',
    quantity: 'Quantité',
    decrease: 'Diminuer la quantité',
    increase: 'Augmenter la quantité',
    specs: 'Fiche technique',
    description: 'Description',
    gallery: 'Galerie',
    viewImage: (n: number) => `Voir l'image ${n}`,
    related: 'Dans le même rayon',
    backToCatalogue: 'Retour au catalogue',
    notFound: 'Produit introuvable',
    notFoundText: "Cette référence n'existe pas ou a été retirée du catalogue.",
    reference: 'Référence',
    category: 'Rayon',
  },

  badges: {
    Nouveau: 'Nouveau',
    'Meilleure vente': 'Meilleure vente',
    'Stock disponible': 'Stock disponible',
  },

  catalogue: {
    title: 'Catalogue',
    lead: 'Tout ce que nous tenons en magasin. Filtrez par rayon, cherchez une marque ou un modèle.',
    search: 'Rechercher',
    searchPlaceholder: 'Caméra, Dahua, StarSat, ventilateur…',
    clearSearch: 'Effacer la recherche',
    sort: 'Trier',
    sortOptions: {
      default: 'Ordre du magasin',
      nameAsc: 'Nom (A → Z)',
      nameDesc: 'Nom (Z → A)',
      newest: 'Nouveautés d’abord',
    },
    all: 'Tous les rayons',
    resultCount: (n: number) => (n > 1 ? `${n} produits` : `${n} produit`),
    noResults: 'Aucun produit ne correspond',
    noResultsText: 'Essayez un autre mot, ou revenez à la liste complète.',
    reset: 'Réinitialiser les filtres',
    filters: 'Filtres',
  },

  cart: {
    title: 'Votre panier',
    lead: "Le panier sert à composer votre demande. Aucun prix n'est affiché : nous vous répondons sur WhatsApp avec la disponibilité et le tarif du jour.",
    empty: 'Votre panier est vide',
    emptyText: "Parcourez le catalogue et ajoutez ce qui vous intéresse — vous nous enverrez le tout d'un coup sur WhatsApp.",
    emptyCta: 'Parcourir le catalogue',
    remove: 'Retirer',
    removeAria: (name: string) => `Retirer ${name} du panier`,
    clear: 'Vider le panier',
    clearConfirm: 'Vider tout le panier ?',
    articles: (n: number) => (n > 1 ? `${n} articles` : `${n} article`),
    units: (n: number) => (n > 1 ? `${n} unités` : `${n} unité`),
    checkout: 'Passer la commande',
    continue: 'Continuer mes achats',
    itemsHeading: 'Articles',
    quantityHeading: 'Quantité',
    summary: 'Récapitulatif',
    lines: 'Références',
    totalUnits: 'Unités au total',
  },

  checkout: {
    title: 'Finaliser la commande',
    lead: "Remplissez vos coordonnées : elles partent avec la liste de vos produits dans un seul message WhatsApp. Nous vous répondons avec le prix et la disponibilité.",
    section: 'Vos coordonnées',
    orderSection: 'Votre commande',
    name: 'Nom complet',
    namePlaceholder: 'Ex. Mohamed Ould Ahmed',
    phone: 'Téléphone (WhatsApp)',
    phonePlaceholder: 'Ex. 26 49 09 08',
    city: 'Ville / Quartier',
    cityPlaceholder: 'Ex. Nouakchott, Tevragh Zeina',
    delivery: 'Mode de livraison',
    deliveryOptions: {
      pickup: 'Retrait en magasin',
      nouakchott: 'Livraison à Nouakchott',
      interior: "Livraison à l'intérieur du pays",
    },
    note: 'Note (facultatif)',
    notePlaceholder: 'Précisez le nombre de caméras, la surface à couvrir, une date de pose souhaitée…',
    optional: 'facultatif',
    required: 'obligatoire',
    submit: 'Envoyer la commande sur WhatsApp',
    sending: 'Ouverture de WhatsApp…',
    errors: {
      name: 'Indiquez votre nom pour que nous sachions à qui répondre.',
      phone: 'Indiquez un numéro WhatsApp valide (au moins 8 chiffres).',
      city: 'Indiquez votre ville ou votre quartier.',
      empty: 'Votre panier est vide.',
    },
    fallbackTitle: 'WhatsApp ne s’est pas ouvert ?',
    fallbackText: 'Utilisez ce lien direct — votre message est déjà prêt.',
    fallbackLink: 'Ouvrir la conversation WhatsApp',
    sentTitle: 'Message préparé',
    sentText: "WhatsApp devrait s'être ouvert dans un nouvel onglet avec votre commande. Il ne vous reste qu'à appuyer sur envoyer.",
    emptyRedirect: 'Ajoutez d’abord des produits à votre panier.',
    preview: 'Aperçu du message',
    showPreview: 'Voir le message qui sera envoyé',
    hidePreview: 'Masquer le message',
  },

  contact: {
    title: 'Nous trouver',
    lead: "Passez au magasin, ou écrivez-nous. Sur WhatsApp, nous répondons pendant les heures d'ouverture — souvent plus tard.",
    address: 'Adresse',
    addressLines: ['Avenue Gamal Abdel Nasser', 'Ksar — Nouakchott', 'Mauritanie'],
    hours: 'Horaires',
    hoursLines: [
      { d: 'Samedi — Jeudi', h: '09:00 – 13:00 · 16:00 – 22:00' },
      { d: 'Vendredi', h: '16:00 – 22:00' },
    ],
    phone: 'Téléphone & WhatsApp',
    whatsappCta: 'Écrire sur WhatsApp',
    callCta: 'Appeler',
    mapTitle: 'Plan',
    mapPlaceholder: 'Plan du magasin',
    mapNote: 'Emplacement exact communiqué sur WhatsApp — le quartier change vite à Nouakchott.',
    mapCta: 'Ouvrir dans Google Maps',
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: 'Pourquoi les prix ne sont-ils pas affichés ?', a: "Parce qu'ils bougent avec l'arrivage et le change. Nous préférons vous donner le prix du jour sur WhatsApp plutôt qu'un chiffre périmé sur un site." },
      { q: 'Est-ce que vous installez vous-mêmes ?', a: "Oui. Nos techniciens posent les caméras, tirent les câbles, configurent l'enregistreur et installent l'application sur vos téléphones." },
      { q: 'Livrez-vous en dehors de Nouakchott ?', a: "Oui, nous expédions vers l'intérieur du pays. Indiquez votre ville dans la commande et nous convenons du transporteur." },
      { q: 'Puis-je acheter une seule caméra ?', a: "Bien sûr. Nous vendons à l'unité comme en kit complet — dites-nous ce que vous voulez couvrir." },
    ],
  },

  footer: {
    about: "Magasin d'équipement de sécurité et d'électronique à Nouakchott. Vidéosurveillance, télévisions, sonorisation, énergie solaire et ventilation.",
    navTitle: 'Navigation',
    catTitle: 'Rayons',
    contactTitle: 'Contact',
    orderCta: 'Commander sur WhatsApp',
    rights: 'Tous droits réservés.',
    madeNote: 'Site vitrine — commandes traitées sur WhatsApp.',
    noPrice: 'Prix communiqués sur demande',
  },

  a11y: {
    cartCount: (n: number) => `Panier, ${n} article${n > 1 ? 's' : ''}`,
    cartEmpty: 'Panier vide',
    logoAlt: 'Basma pour les services publics — logo',
    productImage: (name: string) => `${name} — photo du produit dans le magasin Basma`,
    loading: 'Chargement',
  },

  notFound: {
    title: 'Hors champ',
    text: "Cette page n'est pas dans le cadre. Revenez à l'accueil ou ouvrez le catalogue.",
    home: "Retour à l'accueil",
  },

  whatsapp: {
    orderHeader: '🛒 Nouvelle commande — Basma',
    rule: '────────────────────────',
    products: 'Produits :',
    qty: 'Qté',
    name: 'Nom',
    phone: 'Téléphone',
    city: 'Ville / Quartier',
    delivery: 'Livraison',
    note: 'Note',
    closing: 'Merci de me confirmer la disponibilité et le prix.',
    singleProduct: (name: string) =>
      `Bonjour Basma 👋\nJe suis intéressé(e) par ce produit :\n\n• ${name}\n\nMerci de me confirmer la disponibilité et le prix.`,
    general: 'Bonjour Basma 👋\nJe voudrais des informations sur votre matériel.',
    quote: "Bonjour Basma 👋\nJe voudrais un devis pour l'installation d'un système de vidéosurveillance.",
    availability: (name: string) => `Bonjour Basma 👋\nEst-ce que « ${name} » est disponible en magasin ?`,
  },
};

/**
 * `fr` is intentionally NOT `as const`: widening the string literals is what
 * lets `ar` be checked against the same shape rather than against the exact
 * French sentences.
 */
type Dict = typeof fr;

/** Arabic. Same shape, enforced by TypeScript. */
export const ar: Dict = {
  meta: {
    dir: 'rtl',
    label: 'العربية',
    switchTo: 'Français',
    switchToAria: 'تحويل الموقع إلى الفرنسية',
  },

  brand: {
    name: 'بصمة',
    full: 'بصمة للخدمات العامة',
    tagline: 'كاميرات المراقبة والتجهيزات الكهربائية — نواكشوط',
    baseline: 'بصمتك، وعيننا الساهرة.',
  },

  nav: {
    home: 'الرئيسية',
    catalogue: 'المنتجات',
    categories: 'الأقسام',
    contact: 'اتصل بنا',
    cart: 'السلة',
    menu: 'القائمة',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    skip: 'الانتقال إلى المحتوى',
    breadcrumb: 'مسار التصفّح',
    viewCart: 'عرض السلة',
  },

  hero: {
    channel: 'كاميرا 01',
    live: 'بث مباشر',
    eyebrow: 'نواكشوط — موريتانيا',
    title1: 'لا تحمي',
    title2: 'إلا ما',
    title3: 'تراه.',
    lead: 'كاميرات مراقبة، أطقم داهوا الكاملة، شاشات تلفزيون، أجهزة صوت، طاقة شمسية ووسائل تبريد. نبيع الجهاز، ونركّبه لك في المكان، ونبقى معك بعد البيع.',
    ctaPrimary: 'تصفّح المنتجات',
    ctaSecondary: 'راسلنا على واتساب',
    scrollHint: 'انزل للأسفل',
    caption: 'قسم كاميرات المراقبة — محل بصمة، نواكشوط',
  },

  trust: {
    title: 'ما يأتي مع الجهاز',
    items: [
      { title: 'ضمان المحل', text: 'كل جهاز يُفحص قبل خروجه من المحل. وإن حدث عطل ترجع إلينا مباشرة — لا نحيلك على رقم في الخارج.' },
      { title: 'التركيب في المنزل', text: 'فنيّونا يركّبون الكاميرات، ويمدّون الأسلاك، ويضبطون المسجّل والتطبيق على هاتفك.' },
      { title: 'التوصيل داخل نواكشوط', text: 'توصيل إلى جميع أحياء نواكشوط، وشحن إلى داخل البلاد.' },
      { title: 'استشارة تقنية', text: 'قل لنا ما تريد مراقبته، ونقول لك كم كاميرا تحتاج فعلاً — وأيّها لا فائدة منها عندك.' },
    ],
  },

  categories: {
    eyebrow: 'الأقسام',
    title: 'ستة أقسام في محل واحد',
    lead: 'كاميرات المراقبة هي تخصّصنا الأول — فيها أكبر مخزون وأطول خبرة. وبقية الأقسام تتبع حاجة البيت الموريتاني: الشاشة، والصوت، والكهرباء، والحرّ.',
    seeAll: 'كل المنتجات',
    productCount: (n: number) => (n > 1 ? `${n} منتجات` : `منتج واحد`),
    channel: 'قناة',
  },

  featured: {
    eyebrow: 'مختارات',
    title: 'الأكثر طلبًا',
    lead: 'المنتجات التي يسأل عنها الزبائن في المحل أسبوعًا بعد أسبوع.',
  },

  app: {
    eyebrow: 'التحكّم عن بعد',
    title: 'كل شيء داخل هاتفك',
    lead: 'كاميراتنا المتحركة تُدار من التطبيق: تُدير العدسة، وتقرّب الصورة، وتتكلّم عبر مكبّر الصوت، وتعيد تشغيل تسجيل الليلة. من المحل، أو من البيت، أو من خارج البلاد.',
    bullets: [
      'دوران 355 درجة أفقيًا و90 درجة عموديًا بإصبعك على الشاشة',
      'رؤية ليلية بالألوان، لا بالأبيض والأسود فقط',
      'تنبيه على الهاتف بمجرّد دخول شخص إلى مجال الكاميرا',
      'عدّة كاميرات على شاشة واحدة، وعدّة مستخدمين على كاميرا واحدة',
    ],
    imageAlt: 'شاشة التطبيق وهي تعرض التحكّم في دوران الكاميرا من الهاتف',
  },

  stock: {
    eyebrow: 'داخل المحل',
    title: 'البضاعة موجودة، لا على الورق',
    lead: 'هذه الصور مأخوذة من رفوفنا. ما تراه في الموقع هو ما هو موضوع على الرفّ — وإن نفد صنف أخبرناك قبل أن تتحرّك من مكانك.',
    cta: 'اسأل عن التوفّر',
  },

  service: {
    eyebrow: 'التركيب والصيانة',
    title: 'الجهاز الجيّد لا ينفع إذا رُكّب بشكل سيّئ',
    lead: 'كاميرا موجّهة نحو الشمس لا تُظهر شيئًا. وسلك رديء الوصل ينقطع مع أول مطر. ومسجّل غير مضبوط يمسح الصور قبل أن تحتاجها. لهذا نتولّى التركيب بأنفسنا.',
    steps: [
      { title: 'المعاينة', text: 'نمرّ على المكان، وننظر في المداخل والزوايا المخفية ومصدر الكهرباء وتغطية الشبكة.' },
      { title: 'عرض سعر واضح', text: 'عدد الكاميرات ونوعها وطول الأسلاك والمسجّل والقرص: تعرف ما ستدفعه قبل أن نبدأ.' },
      { title: 'التركيب والتمديد', text: 'تثبيت محكم، وتمديد نظيف، وتغذية كهربائية محمية، وضبط الزوايا ليلاً ونهارًا.' },
      { title: 'الضبط والتدريب', text: 'نثبّت التطبيق على هواتفكم، وننشئ الحسابات، ونعلّمك كيف تعيد مشاهدة التسجيل.' },
      { title: 'الصيانة', text: 'تنظيف العدسات، وفحص الأقراص، وتبديل كاميرا معطّلة، وتوسيع المنظومة عند الحاجة.' },
    ],
    cta: 'اطلب عرض سعر للتركيب',
  },

  contactStrip: {
    eyebrow: 'الطلب',
    title: 'عنوان واحد: واتساب',
    lead: 'لا دفع إلكتروني ولا حساب تنشئه. تجمع طلبك في السلة، وترسله إلينا على واتساب، ونردّ عليك بالتوفّر والسعر.',
    cta: 'افتح واتساب',
    phoneLabel: 'الهاتف / واتساب',
  },

  product: {
    priceOnRequest: 'السعر عند الطلب',
    priceNote: 'يُعطى السعر عبر واتساب',
    addToCart: 'أضف إلى السلة',
    added: 'أُضيف',
    inCart: 'في السلة',
    orderDirect: 'اطلب عبر واتساب',
    quantity: 'الكمية',
    decrease: 'إنقاص الكمية',
    increase: 'زيادة الكمية',
    specs: 'المواصفات',
    description: 'الوصف',
    gallery: 'الصور',
    viewImage: (n: number) => `عرض الصورة ${n}`,
    related: 'من نفس القسم',
    backToCatalogue: 'العودة إلى المنتجات',
    notFound: 'المنتج غير موجود',
    notFoundText: 'هذا الصنف غير موجود أو أُزيل من القائمة.',
    reference: 'المرجع',
    category: 'القسم',
  },

  badges: {
    Nouveau: 'جديد',
    'Meilleure vente': 'الأكثر مبيعًا',
    'Stock disponible': 'متوفّر',
  },

  catalogue: {
    title: 'المنتجات',
    lead: 'كل ما هو متوفّر في المحل. صفِّ حسب القسم، أو ابحث عن ماركة أو موديل.',
    search: 'بحث',
    searchPlaceholder: 'كاميرا، داهوا، ستارسات، مروحة…',
    clearSearch: 'مسح البحث',
    sort: 'ترتيب',
    sortOptions: {
      default: 'ترتيب المحل',
      nameAsc: 'الاسم (أ → ي)',
      nameDesc: 'الاسم (ي → أ)',
      newest: 'الجديد أولاً',
    },
    all: 'كل الأقسام',
    resultCount: (n: number) => (n > 1 ? `${n} منتجات` : `منتج واحد`),
    noResults: 'لا يوجد منتج مطابق',
    noResultsText: 'جرّب كلمة أخرى، أو ارجع إلى القائمة الكاملة.',
    reset: 'إعادة ضبط التصفية',
    filters: 'التصفية',
  },

  cart: {
    title: 'سلّتك',
    lead: 'السلة لتجميع طلبك. لا يظهر أي سعر: نردّ عليك على واتساب بالتوفّر وسعر اليوم.',
    empty: 'سلّتك فارغة',
    emptyText: 'تصفّح المنتجات وأضف ما يهمّك — ثم ترسلها إلينا كلها دفعة واحدة على واتساب.',
    emptyCta: 'تصفّح المنتجات',
    remove: 'حذف',
    removeAria: (name: string) => `حذف ${name} من السلة`,
    clear: 'إفراغ السلة',
    clearConfirm: 'هل تريد إفراغ السلة كاملة؟',
    articles: (n: number) => (n > 1 ? `${n} أصناف` : `صنف واحد`),
    units: (n: number) => (n > 1 ? `${n} قطع` : `قطعة واحدة`),
    checkout: 'إتمام الطلب',
    continue: 'متابعة التسوّق',
    itemsHeading: 'الأصناف',
    quantityHeading: 'الكمية',
    summary: 'الملخّص',
    lines: 'عدد الأصناف',
    totalUnits: 'مجموع القطع',
  },

  checkout: {
    title: 'إتمام الطلب',
    lead: 'أدخل بياناتك: تُرسل مع قائمة منتجاتك في رسالة واتساب واحدة، ونردّ عليك بالسعر والتوفّر.',
    section: 'بياناتك',
    orderSection: 'طلبك',
    name: 'الاسم الكامل',
    namePlaceholder: 'مثال: محمد ولد أحمد',
    phone: 'الهاتف (واتساب)',
    phonePlaceholder: 'مثال: 26 49 09 08',
    city: 'المدينة / الحيّ',
    cityPlaceholder: 'مثال: نواكشوط، تفرغ زينة',
    delivery: 'طريقة الاستلام',
    deliveryOptions: {
      pickup: 'الاستلام من المحل',
      nouakchott: 'التوصيل داخل نواكشوط',
      interior: 'التوصيل إلى داخل البلاد',
    },
    note: 'ملاحظة (اختياري)',
    notePlaceholder: 'حدّد عدد الكاميرات، أو المساحة المطلوب تغطيتها، أو موعد التركيب المناسب…',
    optional: 'اختياري',
    required: 'إلزامي',
    submit: 'إرسال الطلب عبر واتساب',
    sending: 'جارٍ فتح واتساب…',
    errors: {
      name: 'اكتب اسمك حتى نعرف لمن نردّ.',
      phone: 'اكتب رقم واتساب صحيحًا (8 أرقام على الأقل).',
      city: 'اكتب مدينتك أو حيّك.',
      empty: 'سلّتك فارغة.',
    },
    fallbackTitle: 'لم يفتح واتساب؟',
    fallbackText: 'استعمل هذا الرابط المباشر — رسالتك جاهزة بالفعل.',
    fallbackLink: 'فتح محادثة واتساب',
    sentTitle: 'الرسالة جاهزة',
    sentText: 'من المفترض أن واتساب فُتح في نافذة جديدة ومعه طلبك. لم يبقَ إلا الضغط على إرسال.',
    emptyRedirect: 'أضف منتجات إلى السلة أولاً.',
    preview: 'معاينة الرسالة',
    showPreview: 'عرض الرسالة التي ستُرسل',
    hidePreview: 'إخفاء الرسالة',
  },

  contact: {
    title: 'أين تجدنا',
    lead: 'مرّ على المحل، أو راسلنا. على واتساب نردّ خلال أوقات العمل — وغالبًا بعدها أيضًا.',
    address: 'العنوان',
    addressLines: ['شارع جمال عبد الناصر', 'لكصر — نواكشوط', 'موريتانيا'],
    hours: 'أوقات العمل',
    hoursLines: [
      { d: 'السبت — الخميس', h: '09:00 – 13:00 · 16:00 – 22:00' },
      { d: 'الجمعة', h: '16:00 – 22:00' },
    ],
    phone: 'الهاتف وواتساب',
    whatsappCta: 'راسلنا على واتساب',
    callCta: 'اتصل بنا',
    mapTitle: 'الموقع',
    mapPlaceholder: 'موقع المحل',
    mapNote: 'الموقع الدقيق يُرسل على واتساب — معالم الحيّ تتغيّر بسرعة في نواكشوط.',
    mapCta: 'الفتح في خرائط جوجل',
    faqTitle: 'أسئلة متكرّرة',
    faq: [
      { q: 'لماذا لا تظهر الأسعار؟', a: 'لأنها تتغيّر مع كل شحنة ومع سعر الصرف. نفضّل أن نعطيك سعر اليوم على واتساب بدل رقم قديم على الموقع.' },
      { q: 'هل تقومون بالتركيب بأنفسكم؟', a: 'نعم. فنيّونا يركّبون الكاميرات، ويمدّون الأسلاك، ويضبطون المسجّل، ويثبّتون التطبيق على هواتفكم.' },
      { q: 'هل توصّلون خارج نواكشوط؟', a: 'نعم، نشحن إلى داخل البلاد. اذكر مدينتك في الطلب ونتّفق على وسيلة الشحن.' },
      { q: 'هل يمكنني شراء كاميرا واحدة فقط؟', a: 'بالتأكيد. نبيع بالقطعة كما نبيع الطقم الكامل — قل لنا فقط ما تريد تغطيته.' },
    ],
  },

  footer: {
    about: 'محل تجهيزات أمنية وإلكترونية في نواكشوط. كاميرات مراقبة، شاشات، صوتيات، طاقة شمسية، وتبريد.',
    navTitle: 'التنقّل',
    catTitle: 'الأقسام',
    contactTitle: 'الاتصال',
    orderCta: 'اطلب عبر واتساب',
    rights: 'جميع الحقوق محفوظة.',
    madeNote: 'موقع عرض — الطلبات تُعالج عبر واتساب.',
    noPrice: 'الأسعار تُعطى عند الطلب',
  },

  a11y: {
    cartCount: (n: number) => `السلة، ${n} ${n > 1 ? 'أصناف' : 'صنف'}`,
    cartEmpty: 'السلة فارغة',
    logoAlt: 'بصمة للخدمات العامة — الشعار',
    productImage: (name: string) => `${name} — صورة المنتج في محل بصمة`,
    loading: 'جارٍ التحميل',
  },

  notFound: {
    title: 'خارج المجال',
    text: 'هذه الصفحة ليست داخل الإطار. ارجع إلى الرئيسية أو افتح قائمة المنتجات.',
    home: 'العودة إلى الرئيسية',
  },

  whatsapp: {
    orderHeader: '🛒 طلب جديد — بصمة',
    rule: '────────────────────────',
    products: 'المنتجات :',
    qty: 'الكمية',
    name: 'الاسم',
    phone: 'الهاتف',
    city: 'المدينة / الحيّ',
    delivery: 'التوصيل',
    note: 'ملاحظة',
    closing: 'أرجو تأكيد التوفّر والسعر.',
    singleProduct: (name: string) =>
      `السلام عليكم بصمة 👋\nأنا مهتم بهذا المنتج :\n\n• ${name}\n\nأرجو تأكيد التوفّر والسعر.`,
    general: 'السلام عليكم بصمة 👋\nأريد معلومات عن التجهيزات المتوفّرة لديكم.',
    quote: 'السلام عليكم بصمة 👋\nأريد عرض سعر لتركيب منظومة كاميرات مراقبة.',
    availability: (name: string) => `السلام عليكم بصمة 👋\nهل «${name}» متوفّر في المحل؟`,
  },
};

export const dictionaries: Record<Lang, Dict> = { fr, ar };
export type { Dict };
