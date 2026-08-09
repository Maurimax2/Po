/**
 * ── THE CATALOGUE ───────────────────────────────────────────────────────────
 * One typed array. To add a product:
 *   1. drop the photo in  assets/products/<name>.jpg
 *   2. run  npm run images
 *   3. append an entry below, referencing that <name> in `images`
 * The build fails loudly if `images` points at a file that does not exist.
 *
 * Spec sheets are written from what is legible on the packaging in the shop
 * photos. Where the box does not say, the spec is left out rather than guessed
 * at precisely — the point of this site is to get the customer onto WhatsApp,
 * where the shop confirms.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type CategoryId =
  | 'videosurveillance'
  | 'tv-recepteurs'
  | 'audio'
  | 'energie-solaire'
  | 'ventilation'
  | 'divers';

export type Badge = 'Nouveau' | 'Meilleure vente' | 'Stock disponible';

export interface Bilingual {
  fr: string;
  ar: string;
}

export interface Spec {
  label: Bilingual;
  value: Bilingual;
}

export interface Product {
  slug: string;
  name: Bilingual;
  category: CategoryId;
  shortDescription: Bilingual;
  specs: Spec[];
  /** Basenames of files in assets/products/ — first one is the card image. */
  images: string[];
  featured: boolean;
  badge?: Badge;
}

export interface Category {
  id: CategoryId;
  name: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
}

/** Compact spec constructor: spec(labelFr, labelAr, valueFr, valueAr). */
const spec = (lf: string, la: string, vf: string, va: string): Spec => ({
  label: { fr: lf, ar: la },
  value: { fr: vf, ar: va },
});

export const CATEGORIES: Category[] = [
  {
    id: 'videosurveillance',
    name: { fr: 'Vidéosurveillance', ar: 'كاميرات المراقبة' },
    tagline: { fr: 'Notre spécialité', ar: 'تخصّصنا الأول' },
    description: {
      fr: "Caméras à l'unité, kits complets avec enregistreur, modèles solaires et 4G pour les endroits sans courant ni réseau. C'est le rayon le plus fourni du magasin, et celui que nous installons nous-mêmes.",
      ar: 'كاميرات بالقطعة، وأطقم كاملة مع مسجّل، وموديلات شمسية و4G للأماكن التي لا كهرباء فيها ولا شبكة. هو أكبر أقسام المحل، وهو القسم الذي نتولّى تركيبه بأنفسنا.',
    },
  },
  {
    id: 'tv-recepteurs',
    name: { fr: 'TV & Récepteurs', ar: 'شاشات وأجهزة استقبال' },
    tagline: { fr: 'Du 24" au 43" Android', ar: 'من 24 إلى 43 بوصة أندرويد' },
    description: {
      fr: "Téléviseurs StarSat du 24 au 43 pouces, dont un modèle AC/DC qui fonctionne sur batterie ou panneau solaire, et les récepteurs satellite qui vont avec.",
      ar: 'شاشات ستارسات من 24 إلى 43 بوصة، منها موديل يعمل بالتيار المتردد والمستمر على البطارية أو اللوح الشمسي، وأجهزة الاستقبال المناسبة لها.',
    },
  },
  {
    id: 'audio',
    name: { fr: 'Son & Audio', ar: 'الصوتيات' },
    tagline: { fr: 'Micros, enceintes, mégaphones', ar: 'ميكروفونات ومكبّرات' },
    description: {
      fr: 'De quoi sonoriser une salle de fête, une conférence, un commerce ou une annonce en plein air.',
      ar: 'ما يلزم لتصويت قاعة أعراس أو محاضرة أو محلّ تجاري أو إعلان في الهواء الطلق.',
    },
  },
  {
    id: 'energie-solaire',
    name: { fr: 'Énergie & Solaire', ar: 'الطاقة والطاقة الشمسية' },
    tagline: { fr: 'Contre les coupures', ar: 'في مواجهة انقطاع التيار' },
    description: {
      fr: "Régulateurs de tension, convertisseurs 12 V vers 220 V, éclairage solaire autonome et outillage de mesure. Ce qui permet à l'installation de survivre au réseau.",
      ar: 'منظّمات جهد، ومحوّلات من 12 فولت إلى 220 فولت، وإنارة شمسية مستقلّة، وأدوات قياس. ما يجعل تجهيزك يصمد أمام تقلّبات الشبكة.',
    },
  },
  {
    id: 'ventilation',
    name: { fr: 'Ventilation & Climatisation', ar: 'التبريد والتهوية' },
    tagline: { fr: 'Pour la saison chaude', ar: 'لموسم الحرّ' },
    description: {
      fr: "Refroidisseurs d'air par évaporation et ventilateurs de table, muraux et orbit. Efficaces dans la chaleur sèche, et bien plus sobres qu'un climatiseur.",
      ar: 'مبرّدات هواء بالتبخير ومراوح طاولة وجدارية وأوربت. فعّالة في الحرّ الجافّ، واستهلاكها أقلّ بكثير من المكيّف.',
    },
  },
  {
    id: 'divers',
    name: { fr: 'Électroménager & Divers', ar: 'منتجات متنوعة' },
    tagline: { fr: 'Le reste du rayon', ar: 'بقية الرفوف' },
    description: {
      fr: 'Petits appareils du quotidien que nous tenons en complément : soin, entretien et accessoires.',
      ar: 'أجهزة صغيرة للاستعمال اليومي نوفّرها إلى جانب بقية الأصناف.',
    },
  },
];

export const PRODUCTS: Product[] = [
  // ── Vidéosurveillance ─────────────────────────────────────────────────────
  {
    slug: 'camera-solaire-ptz-4-lentilles',
    name: {
      fr: 'Caméra solaire PTZ 4 lentilles — autonome',
      ar: 'كاميرا شمسية PTZ بأربع عدسات — ذاتية التشغيل',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Quatre objectifs, panneau solaire et batterie dans un seul bloc : elle se pose là où il n'y a ni prise de courant ni câble réseau. Deux têtes motorisées suivent le mouvement pendant que les objectifs fixes gardent la vue d'ensemble.",
      ar: 'أربع عدسات ولوح شمسي وبطارية في كتلة واحدة: تُركّب حيث لا مأخذ كهرباء ولا كابل شبكة. رأسان متحرّكان يتابعان الحركة بينما تحافظ العدستان الثابتتان على المشهد العام.',
    },
    specs: [
      spec('Objectifs', 'العدسات', '4 — deux têtes PTZ motorisées + double objectif fixe', 'أربع — رأسان متحرّكان PTZ وعدستان ثابتتان'),
      spec('Alimentation', 'التغذية', 'Panneau solaire intégré + batterie rechargeable', 'لوح شمسي مدمج مع بطارية قابلة للشحن'),
      spec('Connexion', 'الاتصال', 'WiFi 2,4 GHz — version carte SIM 4G disponible', 'واي فاي 2,4 غيغاهرتز — تتوفّر نسخة بشريحة 4G'),
      spec('Vision nocturne', 'الرؤية الليلية', 'Couleur — projecteurs LED et infrarouge', 'بالألوان — كشّافات LED وأشعة تحت حمراء'),
      spec('Rotation', 'الدوران', '355° horizontal / 90° vertical', '355 درجة أفقيًا / 90 درجة عموديًا'),
      spec('Étanchéité', 'مقاومة الماء', 'IP66 — installation extérieure permanente', 'IP66 — للتركيب الخارجي الدائم'),
      spec('Stockage', 'التخزين', 'Carte microSD + enregistrement cloud', 'بطاقة microSD مع تسجيل سحابي'),
      spec('Alertes', 'التنبيهات', 'Détection de mouvement, sirène et projecteur', 'كشف الحركة مع صفّارة وكشّاف'),
    ],
    images: ['cam-solaire-ptz-4-lentilles'],
    featured: true,
    badge: 'Meilleure vente',
  },
  {
    slug: 'camera-4g-wifi-double-lentille-ptz',
    name: {
      fr: 'Caméra PTZ 4G / WiFi double lentille',
      ar: 'كاميرا PTZ بشريحة 4G أو واي فاي بعدستين',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Deux blocs optiques indépendants : un grand angle qui tient toute la cour, et une tête motorisée qui va chercher le détail. Avec une carte SIM, elle fonctionne dans un terrain ou un chantier où il n'y a aucun réseau WiFi.",
      ar: 'كتلتان بصريّتان مستقلّتان: زاوية واسعة تغطّي الساحة كاملة، ورأس متحرّك يذهب إلى التفاصيل. وبشريحة 4G تعمل في أرض أو ورشة لا يوجد فيها أي واي فاي.',
    },
    specs: [
      spec('Objectifs', 'العدسات', 'Double — grand angle fixe + tête PTZ motorisée', 'مزدوجة — زاوية واسعة ثابتة ورأس متحرّك'),
      spec('Connexion', 'الاتصال', 'Carte SIM 4G ou WiFi 2,4 GHz', 'شريحة 4G أو واي فاي 2,4 غيغاهرتز'),
      spec('Détection', 'الكشف', 'Détection humaine par IA — moins de fausses alertes', 'كشف الأشخاص بالذكاء الاصطناعي — تنبيهات كاذبة أقلّ'),
      spec('Vision nocturne', 'الرؤية الليلية', 'Couleur, projecteurs blancs + infrarouge', 'بالألوان مع كشّافات بيضاء وأشعة تحت حمراء'),
      spec('Étanchéité', 'مقاومة الماء', 'IP66', 'IP66'),
      spec('Rotation', 'الدوران', '355° horizontal / 90° vertical', '355 درجة أفقيًا / 90 درجة عموديًا'),
      spec('Multi-utilisateurs', 'تعدّد المستخدمين', "Plusieurs téléphones sur la même caméra", 'عدّة هواتف على الكاميرا نفسها'),
      spec('Audio', 'الصوت', 'Micro et haut-parleur intégrés', 'ميكروفون ومكبّر صوت مدمجان'),
    ],
    images: ['cam-4g-wifi-double-lentille-ptz'],
    featured: true,
    badge: 'Nouveau',
  },
  {
    slug: 'camera-wifi-interieur-rotative',
    name: {
      fr: 'Caméra WiFi intérieure rotative — double objectif',
      ar: 'كاميرا واي فاي داخلية دوّارة بعدستين',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Pour la maison, la boutique ou la réserve. Elle pivote pour suivre ce qui bouge, et vous parlez dans son haut-parleur depuis votre téléphone — pratique pour surveiller un employé, un enfant ou une porte arrière.",
      ar: 'للبيت أو المحلّ أو المخزن. تدور لتتابع ما يتحرّك، وتتكلّم عبر مكبّر صوتها من هاتفك — مفيدة لمراقبة عامل أو طفل أو باب خلفي.',
    },
    specs: [
      spec('Installation', 'التركيب', 'Intérieur — sur meuble ou au plafond', 'داخلي — على رفّ أو في السقف'),
      spec('Objectifs', 'العدسات', 'Deux — vue haute et vue rapprochée', 'عدستان — مشهد عام ومشهد قريب'),
      spec('Connexion', 'الاتصال', 'WiFi 2,4 GHz', 'واي فاي 2,4 غيغاهرتز'),
      spec('Audio', 'الصوت', 'Bidirectionnel — vous entendez et vous répondez', 'ثنائي الاتجاه — تسمع وتردّ'),
      spec('Détection', 'الكشف', 'Suivi de mouvement humain, alerte sur le téléphone', 'تتبّع حركة الأشخاص مع تنبيه على الهاتف'),
      spec('Vision nocturne', 'الرؤية الليلية', 'Couleur', 'بالألوان'),
      spec('Stockage', 'التخزين', 'Carte microSD + cloud', 'بطاقة microSD مع التخزين السحابي'),
      spec('Alimentation', 'التغذية', 'Adaptateur USB fourni', 'محوّل USB مرفق'),
    ],
    images: ['cam-wifi-interieur-pan-tilt'],
    featured: false,
    badge: 'Stock disponible',
  },
  {
    slug: 'camera-ampoule-e27',
    name: {
      fr: 'Caméra ampoule E27 — se visse sur une douille',
      ar: 'كاميرا على شكل لمبة E27 — تُركّب في أي دوّاية',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Aucun câblage, aucun perçage : vous dévissez l'ampoule, vous vissez la caméra à la place. Elle prend son courant dans la douille et couvre toute la pièce en tournant. C'est la solution que nous conseillons pour un premier point de surveillance.",
      ar: 'بلا أسلاك ولا ثقب في الجدار: تفكّ اللمبة وتركّب الكاميرا مكانها. تأخذ الكهرباء من الدوّاية وتغطّي الغرفة كاملة بدورانها. هذا ما ننصح به لأول نقطة مراقبة.',
    },
    specs: [
      spec('Culot', 'القاعدة', 'E27 standard — se visse sur une douille normale', 'E27 عادية — تُركّب في دوّاية عادية'),
      spec('Rotation', 'الدوران', '355° horizontal / 90° vertical', '355 درجة أفقيًا / 90 درجة عموديًا'),
      spec('Connexion', 'الاتصال', 'WiFi 2,4 GHz', 'واي فاي 2,4 غيغاهرتز'),
      spec('Vision nocturne', 'الرؤية الليلية', 'Couleur', 'بالألوان'),
      spec('Audio', 'الصوت', 'Bidirectionnel', 'ثنائي الاتجاه'),
      spec('Détection', 'الكشف', 'Mouvement, avec notification', 'كشف الحركة مع إشعار'),
      spec('Stockage', 'التخزين', 'microSD jusqu’à 128 Go', 'بطاقة microSD حتى 128 غيغابايت'),
      spec('Application', 'التطبيق', 'Contrôle à distance depuis le téléphone', 'تحكّم عن بعد من الهاتف'),
    ],
    images: ['cam-ampoule-e27-smart', 'cam-smart-stock-boites'],
    featured: true,
    badge: 'Stock disponible',
  },
  {
    slug: 'camera-dahua-bullet-2mp-dual-light',
    name: {
      fr: 'Caméra Dahua HDCVI bullet 2MP Smart Dual Light',
      ar: 'كاميرا داهوا HDCVI بوليت 2 ميغابكسل بإضاءة مزدوجة',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Le tube blanc que l'on voit sur les façades des commerces de Nouakchott, et pour de bonnes raisons : boîtier métal, signal coaxial fiable sur de longues distances, et double éclairage — infrarouge discret la nuit, projecteur blanc dès qu'il détecte quelqu'un.",
      ar: 'الكاميرا الأنبوبية البيضاء التي تراها على واجهات محلّات نواكشوط، ولها أسبابها: هيكل معدني، وإشارة كوابل محورية تصمد على مسافات طويلة، وإضاءة مزدوجة — أشعة تحت حمراء خفيّة ليلاً وكشّاف أبيض بمجرّد رصد شخص.',
    },
    specs: [
      spec('Marque', 'الماركة', 'Dahua Technology', 'داهوا'),
      spec('Capteur', 'المستشعر', '2 MP — 1080p', '2 ميغابكسل — 1080p'),
      spec('Format', 'الشكل', 'Bullet extérieur', 'أنبوبية للخارج'),
      spec('Éclairage', 'الإضاءة', 'Smart Dual Light — infrarouge + lumière blanche', 'Smart Dual Light — أشعة تحت حمراء وضوء أبيض'),
      spec('Portée nocturne', 'مدى الرؤية الليلية', "Jusqu'à 30 m", 'حتى 30 مترًا'),
      spec('Audio', 'الصوت', 'Micro intégré — HDCVI Digital Audio', 'ميكروفون مدمج — HDCVI Digital Audio'),
      spec('Signal', 'الإشارة', 'HDCVI sur câble coaxial', 'HDCVI عبر كابل محوري'),
      spec('Boîtier', 'الهيكل', 'Métal, étanche', 'معدني ومقاوم للماء'),
    ],
    images: ['dahua-bullet-2mp-dual-light'],
    featured: false,
    badge: 'Stock disponible',
  },
  {
    slug: 'camera-dahua-dome-5mp-dual-light',
    name: {
      fr: 'Caméra Dahua HDCVI dôme 5MP Smart Dual Light',
      ar: 'كاميرا داهوا HDCVI قبّة 5 ميغابكسل بإضاءة مزدوجة',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Cinq mégapixels réels en 16:9 dans un dôme compact. C'est la différence entre voir qu'il s'est passé quelque chose et pouvoir relire un visage ou une plaque sur l'enregistrement. Micro intégré, et le dôme résiste mieux aux coups qu'un tube.",
      ar: 'خمسة ميغابكسل حقيقية بنسبة 16:9 في قبّة صغيرة. هذا هو الفرق بين أن ترى أن شيئًا وقع، وأن تستطيع قراءة وجه أو لوحة سيارة في التسجيل. بميكروفون مدمج، والقبّة أصلب أمام الضربات من الأنبوبية.',
    },
    specs: [
      spec('Marque', 'الماركة', 'Dahua Technology', 'داهوا'),
      spec('Capteur', 'المستشعر', '5 MP réels — 16:9', '5 ميغابكسل حقيقية — 16:9'),
      spec('Format', 'الشكل', 'Dôme — intérieur ou sous auvent', 'قبّة — للداخل أو تحت مظلّة'),
      spec('Éclairage', 'الإضاءة', 'Smart Dual Light, plusieurs modes', 'Smart Dual Light بعدّة أوضاع'),
      spec('Audio', 'الصوت', 'Micro intégré — HDCVI Digital Audio', 'ميكروفون مدمج — HDCVI Digital Audio'),
      spec('Sorties', 'المخارج', 'HDCVI / AHD / TVI / CVBS commutables', 'HDCVI / AHD / TVI / CVBS قابلة للتبديل'),
      spec('Boîtier', 'الهيكل', 'Dôme renforcé', 'قبّة معزّزة'),
      spec('Usage', 'الاستعمال', 'Boutique, salon, couloir, entrée', 'محلّ، صالون، ممرّ، مدخل'),
    ],
    images: ['dahua-5mp-dual-light-stock'],
    featured: true,
    badge: 'Meilleure vente',
  },
  {
    slug: 'kit-dahua-cooper-8-canaux',
    name: {
      fr: 'Kit Dahua Cooper — 8 caméras 2MP + enregistreur 8 canaux',
      ar: 'طقم داهوا كوبر — 8 كاميرات 2 ميغابكسل مع مسجّل 8 قنوات',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Le kit complet pour une villa, un dépôt ou une grande boutique : huit caméras, l'enregistreur à huit canaux, les alimentations et les câbles. La technologie WizSense distingue une personne d'un chien ou d'une branche, ce qui arrête enfin les alertes pour rien.",
      ar: 'الطقم الكامل لفيلا أو مخزن أو محلّ كبير: ثماني كاميرات، ومسجّل بثماني قنوات، والمحوّلات والأسلاك. تقنية WizSense تفرّق بين إنسان وكلب أو غصن شجرة، فتتوقّف أخيرًا التنبيهات بلا سبب.',
    },
    specs: [
      spec('Référence', 'المرجع', 'Dahua Cooper-U — kit HDCVI 8 canaux', 'داهوا Cooper-U — طقم HDCVI بثماني قنوات'),
      spec('Caméras', 'الكاميرات', '8 × 2 MP — 1080p', '8 × 2 ميغابكسل — 1080p'),
      spec('Enregistreur', 'المسجّل', 'XVR 8 canaux HDCVI', 'مسجّل XVR بثماني قنوات HDCVI'),
      spec('Intelligence', 'الذكاء', 'WizSense SMD Plus — détection humain / véhicule', 'WizSense SMD Plus — كشف الأشخاص والمركبات'),
      spec('Compression', 'الضغط', 'AI Coding — moins de stockage à qualité égale', 'AI Coding — تخزين أقلّ بجودة مماثلة'),
      spec('Accès mobile', 'الوصول من الهاتف', 'Application DMSS, temps réel et relecture', 'تطبيق DMSS للمشاهدة المباشرة وإعادة التشغيل'),
      spec('Disque dur', 'القرص الصلب', "En option — jusqu'à 8 To", 'اختياري — حتى 8 تيرابايت'),
      spec('Contenu', 'المحتويات', 'Caméras, XVR, alimentations, câbles', 'كاميرات، مسجّل، محوّلات، أسلاك'),
    ],
    images: ['kit-dahua-cooper-8ch-8cam'],
    featured: true,
    badge: 'Meilleure vente',
  },
  {
    slug: 'kit-dahua-1080p-xvr-two-way-talk',
    name: {
      fr: 'Kit Dahua Cooper 1080p + enregistreur HDCVI Two-Way Talk',
      ar: 'طقم داهوا كوبر 1080p مع مسجّل HDCVI بخاصية التحدّث',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "La version compacte du système Cooper, pour une maison ou une boutique. L'enregistreur gère la parole dans les deux sens : depuis l'application, vous entendez ce qui se dit devant la caméra et vous pouvez répondre.",
      ar: 'النسخة المصغّرة من منظومة كوبر، لبيت أو محلّ. المسجّل يدعم الصوت في الاتجاهين: من التطبيق تسمع ما يُقال أمام الكاميرا وتستطيع الردّ.',
    },
    specs: [
      spec('Référence', 'المرجع', 'Dahua Cooper-U 1080p', 'داهوا Cooper-U 1080p'),
      spec('Caméras', 'الكاميرات', '4 × 2 MP — 1080p', '4 × 2 ميغابكسل — 1080p'),
      spec('Enregistreur', 'المسجّل', 'XVR HDCVI WizSense', 'مسجّل XVR HDCVI بتقنية WizSense'),
      spec('Audio', 'الصوت', 'Two-Way Talk — conversation depuis l’application', 'Two-Way Talk — محادثة من التطبيق'),
      spec('Compression', 'الضغط', 'H.265+', 'H.265+'),
      spec('Canaux', 'القنوات', 'Analogique + canaux IP supplémentaires', 'قنوات تماثلية مع قنوات IP إضافية'),
      spec('Sorties', 'المخارج', 'HDMI et VGA', 'HDMI و VGA'),
      spec('Accès mobile', 'الوصول من الهاتف', 'Application DMSS', 'تطبيق DMSS'),
    ],
    images: ['kit-dahua-1080p-dvr-hdcvi'],
    featured: false,
  },
  {
    slug: 'kit-securite-4k-full-color',
    name: {
      fr: 'Kit de sécurité 4K Full-Color — 4 caméras + enregistreur',
      ar: 'طقم أمني 4K بالألوان الكاملة — 4 كاميرات مع مسجّل',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Full-Color veut dire que la caméra garde les couleurs la nuit au lieu de basculer en noir et blanc. Une chemise rouge reste rouge sur l'enregistrement — et c'est souvent ça qui permet de reconnaître quelqu'un le lendemain.",
      ar: 'Full-Color تعني أن الكاميرا تحتفظ بالألوان ليلاً بدل التحوّل إلى الأبيض والأسود. القميص الأحمر يبقى أحمر في التسجيل — وهذا غالبًا ما يسمح بالتعرّف على الشخص في اليوم التالي.',
    },
    specs: [
      spec('Marque', 'الماركة', 'anghuan', 'anghuan'),
      spec('Résolution', 'الدقّة', '5 MP et 8 MP — 4K', '5 و8 ميغابكسل — 4K'),
      spec('Enregistreur', 'المسجّل', 'DVR 4 canaux', 'مسجّل DVR بأربع قنوات'),
      spec('Éclairage', 'الإضاءة', 'Full-Color 24 h/24 — couleur de nuit', 'Full-Color على مدار 24 ساعة — ألوان في الليل'),
      spec('Sorties', 'المخارج', 'HDMI et VGA', 'HDMI و VGA'),
      spec('Sauvegarde', 'النسخ الاحتياطي', 'Port USB', 'منفذ USB'),
      spec('Accès mobile', 'الوصول من الهاتف', 'Application smartphone, vue multi-caméras', 'تطبيق للهاتف بعرض عدّة كاميرات'),
      spec('Contenu', 'المحتويات', '4 caméras bullet, DVR, câbles, alimentation', '4 كاميرات أنبوبية، مسجّل، أسلاك، محوّل'),
    ],
    images: ['kit-anghuan-4k-full-color'],
    featured: true,
    badge: 'Nouveau',
  },
  {
    slug: 'kit-wifi-4k-sans-fil-interphone',
    name: {
      fr: 'Kit WiFi 4K sans fil — 4 caméras + NVR, interphone',
      ar: 'طقم واي فاي 4K لاسلكي — 4 كاميرات مع مسجّل NVR واتصال صوتي',
    },
    category: 'videosurveillance',
    shortDescription: {
      fr: "Pas de câble vidéo à tirer dans les murs : les caméras se relient au NVR en WiFi, il ne reste que l'alimentation à amener. L'interphone bidirectionnel permet de répondre à quelqu'un devant le portail, et l'enregistrement part aussi dans le cloud.",
      ar: 'لا كابل فيديو تمدّه في الجدران: الكاميرات ترتبط بالمسجّل عبر الواي فاي، ولا يبقى إلا إيصال التيار. والاتصال الصوتي ثنائي الاتجاه يتيح الردّ على من يقف عند البوابة، والتسجيل يُحفظ أيضًا في السحابة.',
    },
    specs: [
      spec('Résolution', 'الدقّة', '4K', '4K'),
      spec('Caméras', 'الكاميرات', '4 caméras WiFi extérieures', '4 كاميرات واي فاي للخارج'),
      spec('Enregistreur', 'المسجّل', 'NVR avec point d’accès WiFi intégré', 'مسجّل NVR بنقطة واي فاي مدمجة'),
      spec('Audio', 'الصوت', 'Interphone bidirectionnel', 'اتصال صوتي ثنائي الاتجاه'),
      spec('Éclairage', 'الإضاءة', 'Imagerie couleur 24 h/24', 'تصوير بالألوان على مدار 24 ساعة'),
      spec('Compression', 'الضغط', 'H.265+', 'H.265+'),
      spec('Stockage', 'التخزين', 'Cloud + disque dur en option', 'سحابي مع قرص صلب اختياري'),
      spec('Installation', 'التركيب', 'Sans câble vidéo — alimentation seule', 'بلا كابل فيديو — التغذية فقط'),
    ],
    images: ['kit-wifi-4k-intercom-nvr'],
    featured: false,
    badge: 'Nouveau',
  },

  // ── TV & Récepteurs ───────────────────────────────────────────────────────
  {
    slug: 'tv-starsat-24-hd-ac-dc',
    name: {
      fr: 'TV LED StarSat 24" HD — alimentation AC/DC',
      ar: 'تلفزيون ستارسات 24 بوصة HD — تيار متردّد ومستمرّ',
    },
    category: 'tv-recepteurs',
    shortDescription: {
      fr: "Le 24 pouces qui accepte aussi le 12 volts : il tourne sur une batterie, un panneau solaire ou un groupe électrogène. C'est le poste que nous vendons pour l'intérieur du pays et pour les endroits où le courant part souvent.",
      ar: 'شاشة 24 بوصة تقبل أيضًا 12 فولت: تعمل على بطارية أو لوح شمسي أو مولّد. هذه هي الشاشة التي نبيعها لداخل البلاد وللأماكن التي ينقطع فيها التيار كثيرًا.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'StarSat SV-2406 AC/DC', 'ستارسات SV-2406 AC/DC'),
      spec('Écran', 'الشاشة', '24 pouces LED — HD Ready', '24 بوصة LED — HD Ready'),
      spec('Alimentation', 'التغذية', '220 V alternatif et 12 V continu', '220 فولت متردّد و12 فولت مستمرّ'),
      spec('Connectique', 'التوصيلات', 'HDMI, USB, AV', 'HDMI، USB، AV'),
      spec('Traitement', 'المعالجة', 'AVL (volume stable), DNR (réduction de bruit)', 'AVL لتثبيت الصوت وDNR لتقليل التشويش'),
      spec('Lecture USB', 'تشغيل USB', 'Films, photos et musique depuis une clé', 'أفلام وصور وموسيقى من مفتاح USB'),
      spec('Son', 'الصوت', 'Haut-parleurs intégrés', 'مكبّرات صوت مدمجة'),
    ],
    images: ['tv-starsat-24-hd-ac-dc'],
    featured: false,
    badge: 'Stock disponible',
  },
  {
    slug: 'tv-starsat-32-ready-hd',
    name: {
      fr: 'TV LED StarSat 32" Ready HD — TrueColor',
      ar: 'تلفزيون ستارسات 32 بوصة Ready HD — TrueColor',
    },
    category: 'tv-recepteurs',
    shortDescription: {
      fr: "Le format le plus demandé du magasin : assez grand pour un salon, assez sobre pour une chambre. Dalle TrueColor avec traitement HDR et un son clair, sans gadget dont on ne se sert jamais.",
      ar: 'المقاس الأكثر طلبًا في المحل: كبير بما يكفي لصالون، وهادئ بما يكفي لغرفة نوم. شاشة TrueColor مع معالجة HDR وصوت واضح، بلا إضافات لا تُستعمل.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'StarSat SV-3206', 'ستارسات SV-3206'),
      spec('Écran', 'الشاشة', '32 pouces LED — HD Ready', '32 بوصة LED — HD Ready'),
      spec('Image', 'الصورة', 'TrueColor, traitement HDR', 'TrueColor مع معالجة HDR'),
      spec('Connectique', 'التوصيلات', 'HDMI, USB Movie Play', 'HDMI ومنفذ USB لتشغيل الأفلام'),
      spec('Son', 'الصوت', 'Crystal Sound — haut-parleurs intégrés', 'Crystal Sound — مكبّرات مدمجة'),
      spec('Consommation', 'الاستهلاك', 'Mode économie d’énergie', 'وضع توفير الطاقة'),
      spec('Fixation', 'التثبيت', 'Compatible support mural VESA', 'متوافق مع حامل جداري VESA'),
    ],
    images: ['tv-starsat-32-ready-hd'],
    featured: false,
  },
  {
    slug: 'tv-starsat-43-smart-android',
    name: {
      fr: 'Smart TV StarSat 43" FHD Android — sans bordure',
      ar: 'تلفزيون ذكي ستارسات 43 بوصة FHD أندرويد — بلا إطار',
    },
    category: 'tv-recepteurs',
    shortDescription: {
      fr: "Android à bord : YouTube, Netflix et Prime Video sans boîtier supplémentaire, et le récepteur satellite est déjà intégré. La dalle sans bordure la fait paraître plus grande que ses 43 pouces, et vous pouvez y envoyer l'écran de votre téléphone.",
      ar: 'أندرويد داخل الجهاز: يوتيوب ونتفليكس وبرايم فيديو بلا صندوق إضافي، وجهاز استقبال الأقمار مدمج أصلاً. الشاشة بلا إطار تبدو أكبر من 43 بوصة، ويمكنك عرض شاشة هاتفك عليها.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'StarSat SV-43W6 Smart', 'ستارسات SV-43W6 Smart'),
      spec('Écran', 'الشاشة', '43 pouces FHD 1920 × 1080 — sans bordure', '43 بوصة FHD 1920 × 1080 — بلا إطار'),
      spec('Système', 'النظام', 'Android TV', 'أندرويد تي في'),
      spec('Mémoire', 'الذاكرة', '8 Go de stockage / 1 Go de RAM', '8 غيغابايت تخزين / 1 غيغابايت رام'),
      spec('Applications', 'التطبيقات', 'YouTube, Netflix, Prime Video', 'يوتيوب، نتفليكس، برايم فيديو'),
      spec('Tuners', 'أجهزة الاستقبال', 'DVB-T2 et DVB-S2 intégrés', 'DVB-T2 و DVB-S2 مدمجان'),
      spec('Réseau', 'الشبكة', 'WiFi intégré', 'واي فاي مدمج'),
      spec('Connectique', 'التوصيلات', 'HDMI, USB, partage d’écran depuis le téléphone', 'HDMI، USB، ومشاركة شاشة الهاتف'),
    ],
    images: ['tv-starsat-43-smart-android'],
    featured: true,
    badge: 'Nouveau',
  },
  {
    slug: 'recepteur-starsat-sr-2090hd',
    name: {
      fr: 'Récepteur satellite StarSat SR-2090HD Extreme',
      ar: 'جهاز استقبال ستارسات SR-2090HD إكستريم',
    },
    category: 'tv-recepteurs',
    shortDescription: {
      fr: "Le récepteur HD que les clients demandent par son nom. PVR pour enregistrer une émission sur une clé USB, guide des programmes à l'écran, et les options réseau pour les chaînes qui passent par internet.",
      ar: 'جهاز الاستقبال HD الذي يطلبه الزبائن باسمه. تسجيل PVR على مفتاح USB، ودليل برامج على الشاشة، وخيارات الشبكة للقنوات التي تمرّ عبر الإنترنت.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'StarSat SR-2090HD Extreme', 'ستارسات SR-2090HD إكستريم'),
      spec('Image', 'الصورة', 'Full HD 1080p', 'Full HD 1080p'),
      spec('Enregistrement', 'التسجيل', 'PVR sur clé ou disque USB', 'PVR على مفتاح أو قرص USB'),
      spec('Guide', 'الدليل', 'EPG — programme des chaînes à l’écran', 'EPG — دليل البرامج على الشاشة'),
      spec('Réseau', 'الشبكة', 'Compatible dongle WiFi et clé 3G/4G', 'يقبل مفتاح واي فاي وشريحة 3G/4G'),
      spec('Sorties', 'المخارج', 'HDMI et RCA', 'HDMI و RCA'),
      spec('Mise à jour', 'التحديث', 'Par port USB', 'عبر منفذ USB'),
    ],
    images: ['recepteur-starsat-micros-sans-fil'],
    featured: false,
    badge: 'Stock disponible',
  },

  // ── Son & Audio ───────────────────────────────────────────────────────────
  {
    slug: 'microphone-max-dm-604',
    name: {
      fr: 'Microphone dynamique professionnel MAX DM-604',
      ar: 'ميكروفون ديناميكي احترافي MAX DM-604',
    },
    category: 'audio',
    shortDescription: {
      fr: "Micro à main filaire pour les salles de fête, les conférences et les annonces. Corps métal, grille anti-choc, câble fourni : il se branche directement sur un amplificateur ou une sono, sans pile et sans appairage.",
      ar: 'ميكروفون يدوي سلكي لقاعات الأعراس والمحاضرات والإعلانات. هيكل معدني وشبكة واقية وكابل مرفق: يوصَل مباشرة بمضخّم أو منظومة صوت، بلا بطارية وبلا اقتران.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'MAX DM-604', 'MAX DM-604'),
      spec('Type', 'النوع', 'Dynamique cardioïde — filaire', 'ديناميكي أحادي الاتجاه — سلكي'),
      spec('Corps', 'الهيكل', 'Métal avec grille anti-choc', 'معدني مع شبكة واقية'),
      spec('Câble', 'الكابل', 'Fourni avec le micro', 'مرفق مع الميكروفون'),
      spec('Connexion', 'التوصيل', 'Jack 6,35 mm', 'مقبس 6,35 ملم'),
      spec('Commande', 'التحكّم', 'Interrupteur marche / arrêt sur le corps', 'مفتاح تشغيل وإيقاف على الجسم'),
      spec('Usage', 'الاستعمال', 'Voix, discours, animation', 'صوت، خطابة، تنشيط'),
    ],
    images: ['recepteur-starsat-micros-sans-fil'],
    featured: false,
  },
  {
    slug: 'haut-parleurs-multimedia-2-0',
    name: {
      fr: 'Haut-parleurs multimédia 2.0 — alimentation USB',
      ar: 'مكبّرات صوت متعدّدة الوسائط 2.0 — تغذية USB',
    },
    category: 'audio',
    shortDescription: {
      fr: "Deux enceintes alimentées par un simple port USB, pour un ordinateur, une télévision ou un téléphone. Volume réglable sur le boîtier, prise jack 3,5 mm : rien à installer, rien à configurer. Plusieurs modèles et coloris en rayon.",
      ar: 'مكبّران يعملان من منفذ USB عادي، لحاسوب أو تلفزيون أو هاتف. مستوى الصوت يُضبط على الجهاز، ومقبس 3,5 ملم: لا تثبيت ولا ضبط. تتوفّر عدّة موديلات وألوان في الرفّ.',
    },
    specs: [
      spec('Configuration', 'التركيب', '2.0 — deux enceintes', '2.0 — مكبّران'),
      spec('Alimentation', 'التغذية', 'USB 5 V', 'USB 5 فولت'),
      spec('Entrée', 'المدخل', 'Jack 3,5 mm', 'مقبس 3,5 ملم'),
      spec('Réglage', 'الضبط', 'Molette de volume sur l’enceinte', 'قرص ضبط الصوت على المكبّر'),
      spec('Compatibilité', 'التوافق', 'PC, TV, téléphone, lecteur', 'حاسوب، تلفزيون، هاتف، مشغّل'),
      spec('Modèles', 'الموديلات', 'Plusieurs marques et coloris selon arrivage', 'عدّة ماركات وألوان حسب الشحنة'),
    ],
    images: ['haut-parleurs-2-0-multimedia'],
    featured: false,
    badge: 'Stock disponible',
  },
  {
    slug: 'megaphone-portable-hq-108',
    name: {
      fr: 'Mégaphone portable multifonction HQ-108',
      ar: 'مكبّر صوت محمول متعدّد الوظائف HQ-108',
    },
    category: 'audio',
    shortDescription: {
      fr: "Pour les annonces au marché, les mariages, les chantiers et les mosquées. Voix en direct, sirène d'alerte et message enregistré, avec la bandoulière pour le porter toute la journée sans se fatiguer le bras.",
      ar: 'للإعلانات في السوق والأعراس والورشات والمساجد. صوت مباشر، وصفّارة تنبيه، ورسالة مسجّلة، مع حزام كتف لحمله طوال اليوم دون تعب.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'HQ-108 — mégaphone à main', 'HQ-108 — مكبّر يدوي'),
      spec('Fonctions', 'الوظائف', 'Voix en direct, sirène, message enregistré', 'صوت مباشر، صفّارة، رسالة مسجّلة'),
      spec('Micro', 'الميكروفون', 'Micro à main séparé, câble spiralé', 'ميكروفون يدوي منفصل بكابل حلزوني'),
      spec('Port', 'الحمل', 'Bandoulière réglable', 'حزام كتف قابل للتعديل'),
      spec('Alimentation', 'التغذية', 'Piles', 'بطاريات'),
      spec('Usage', 'الاستعمال', 'Extérieur — marché, cortège, chantier', 'خارجي — سوق، موكب، ورشة'),
    ],
    images: ['megaphone-onduleur-multimetre'],
    featured: false,
  },

  // ── Énergie & Solaire ─────────────────────────────────────────────────────
  {
    slug: 'convertisseur-1000w-12v-220v',
    name: {
      fr: 'Convertisseur de courant 1000 W — 12 V vers 220 V',
      ar: 'محوّل تيار 1000 واط — من 12 فولت إلى 220 فولت',
    },
    category: 'energie-solaire',
    shortDescription: {
      fr: "Il transforme le 12 volts d'une batterie de voiture ou d'un parc solaire en 220 volts domestique. De quoi faire tourner la télévision, le ventilateur, les lampes et l'enregistreur de vos caméras pendant que le quartier est dans le noir.",
      ar: 'يحوّل 12 فولت من بطارية سيارة أو منظومة شمسية إلى 220 فولت منزلية. يكفي لتشغيل التلفزيون والمروحة واللمبات ومسجّل الكاميرات بينما الحيّ كلّه في الظلام.',
    },
    specs: [
      spec('Puissance', 'القدرة', '1000 W', '1000 واط'),
      spec('Entrée', 'المدخل', '12 V continu (batterie)', '12 فولت مستمرّ (بطارية)'),
      spec('Sortie', 'المخرج', '220 V alternatif', '220 فولت متردّد'),
      spec('Prises', 'المآخذ', 'Prises 220 V + port USB', 'مآخذ 220 فولت مع منفذ USB'),
      spec('Protections', 'الحمايات', 'Surcharge, court-circuit, batterie faible', 'الحمل الزائد، القصر الكهربائي، ضعف البطارية'),
      spec('Refroidissement', 'التبريد', 'Ventilation forcée', 'تبريد بمروحة'),
      spec('Raccordement', 'التوصيل', 'Pinces de batterie incluses', 'ملاقط بطارية مرفقة'),
      spec('Usage', 'الاستعمال', 'Véhicule, batterie, installation solaire', 'سيارة، بطارية، منظومة شمسية'),
    ],
    images: ['megaphone-onduleur-multimetre'],
    featured: false,
    badge: 'Stock disponible',
  },
  {
    slug: 'pince-amperemetrique-numerique',
    name: {
      fr: 'Pince ampèremétrique numérique',
      ar: 'كمّاشة قياس التيار الرقمية',
    },
    category: 'energie-solaire',
    shortDescription: {
      fr: "L'outil de l'installateur : mesurer l'intensité qui passe dans un fil sans le couper, vérifier une tension, tester la continuité d'un câble avant de le sertir. Indispensable avant de brancher une caméra ou un panneau solaire.",
      ar: 'أداة الفنّي: قياس شدّة التيار في سلك دون قطعه، والتحقّق من الجهد، واختبار استمرارية الكابل قبل توصيله. لا غنى عنها قبل ربط كاميرا أو لوح شمسي.',
    },
    specs: [
      spec('Type', 'النوع', 'Pince ampèremétrique numérique', 'كمّاشة قياس رقمية'),
      spec('Mesures', 'القياسات', 'Tension AC/DC, courant AC, résistance, continuité', 'الجهد المتردّد والمستمرّ، التيار المتردّد، المقاومة، الاستمرارية'),
      spec('Afficheur', 'الشاشة', 'LCD rétroéclairé', 'شاشة LCD بإضاءة خلفية'),
      spec('Fonction', 'الوظيفة', 'Maintien de la valeur affichée (Data Hold)', 'تثبيت القيمة المعروضة (Data Hold)'),
      spec('Accessoires', 'الملحقات', 'Cordons de test inclus', 'أسلاك اختبار مرفقة'),
      spec('Alimentation', 'التغذية', 'Pile 9 V', 'بطارية 9 فولت'),
      spec('Rangement', 'الحفظ', 'Étui de transport', 'علبة حمل'),
    ],
    images: ['megaphone-onduleur-multimetre'],
    featured: false,
  },
  {
    slug: 'regulateur-tension-jarrett',
    name: {
      fr: 'Régulateur de tension automatique Jarrett',
      ar: 'منظّم جهد أوتوماتيكي Jarrett',
    },
    category: 'energie-solaire',
    shortDescription: {
      fr: "À Nouakchott, la tension monte et descend toute la journée. Ce régulateur la stabilise avant qu'elle n'arrive à votre téléviseur, votre réfrigérateur ou votre enregistreur de caméras — et la temporisation évite le coup de fouet au retour du courant.",
      ar: 'في نواكشوط يرتفع الجهد وينخفض طوال اليوم. هذا المنظّم يثبّته قبل أن يصل إلى التلفزيون أو الثلّاجة أو مسجّل الكاميرات — والتأخير الزمني يحمي الأجهزة من صدمة عودة التيار.',
    },
    specs: [
      spec('Marque', 'الماركة', 'Jarrett', 'Jarrett'),
      spec('Type', 'النوع', 'Régulateur automatique de tension (AVR)', 'منظّم جهد أوتوماتيكي (AVR)'),
      spec('Afficheur', 'الشاشة', 'Numérique — tension d’entrée et de sortie', 'رقمية — جهد الدخول والخروج'),
      spec('Protection', 'الحماية', 'Temporisation au retour du courant', 'تأخير زمني عند عودة التيار'),
      spec('Sorties', 'المخارج', 'Plusieurs prises + sortie USB', 'عدّة مآخذ مع منفذ USB'),
      spec('Sécurité', 'الأمان', 'Coupure en surtension et en sous-tension', 'فصل عند ارتفاع أو انخفاض الجهد'),
      spec('Boîtier', 'الهيكل', 'Métal', 'معدني'),
      spec('Puissances', 'القدرات', 'Plusieurs puissances disponibles en magasin', 'تتوفّر عدّة قدرات في المحل'),
    ],
    images: ['regulateur-tension-jarrett'],
    featured: true,
    badge: 'Meilleure vente',
  },
  {
    slug: 'lampadaire-solaire-integre',
    name: {
      fr: 'Lampadaire solaire intégré tout-en-un',
      ar: 'عمود إنارة شمسي متكامل للخارج',
    },
    category: 'energie-solaire',
    shortDescription: {
      fr: "Panneau, batterie, LED et détecteur dans un seul bloc à fixer sur un mât ou un mur. Il se charge dans la journée et s'allume seul à la tombée de la nuit : aucune tranchée, aucun câble à tirer, aucune facture à la fin du mois.",
      ar: 'اللوح والبطارية وإضاءة LED والحسّاس في كتلة واحدة تُثبَّت على عمود أو جدار. يشحن نهارًا ويضيء وحده عند المغرب: لا حفر، ولا أسلاك تُمدّ، ولا فاتورة في آخر الشهر.',
    },
    specs: [
      spec('Type', 'النوع', 'Lampadaire solaire tout-en-un', 'عمود إنارة شمسي متكامل'),
      spec('Panneau', 'اللوح', 'Panneau solaire intégré sur la face supérieure', 'لوح شمسي مدمج في الوجه العلوي'),
      spec('Batterie', 'البطارية', 'Batterie lithium rechargeable', 'بطارية ليثيوم قابلة للشحن'),
      spec('Éclairage', 'الإضاءة', 'LED haute luminosité', 'إضاءة LED عالية السطوع'),
      spec('Automatismes', 'الأتمتة', 'Capteur crépusculaire + détecteur de mouvement', 'حسّاس ضوئي مع كاشف حركة'),
      spec('Commande', 'التحكّم', 'Télécommande incluse', 'جهاز تحكّم عن بعد مرفق'),
      spec('Étanchéité', 'مقاومة الماء', 'IP65 — usage extérieur', 'IP65 — للاستعمال الخارجي'),
      spec('Fixation', 'التثبيت', 'Sur mât ou sur mur', 'على عمود أو جدار'),
    ],
    images: ['lampadaire-solaire-integre'],
    featured: true,
    badge: 'Nouveau',
  },

  // ── Ventilation & Climatisation ───────────────────────────────────────────
  {
    slug: 'refroidisseur-air-star-track',
    name: {
      fr: "Refroidisseur d'air Star Track — humidification et purification",
      ar: 'مبرّد هواء Star Track — ترطيب وتنقية',
    },
    category: 'ventilation',
    shortDescription: {
      fr: "Le compromis qui fonctionne vraiment dans la chaleur sèche de Nouakchott : il rafraîchit par évaporation, humidifie l'air au lieu de l'assécher, et consomme une fraction de ce que boit un climatiseur. Sur roulettes, il suit d'une pièce à l'autre.",
      ar: 'الحلّ الوسط الذي ينفع فعلاً في حرّ نواكشوط الجافّ: يبرّد بالتبخير، ويرطّب الهواء بدل أن يجفّفه، ويستهلك جزءًا يسيرًا ممّا يستهلكه المكيّف. وبعجلاته ينتقل معك من غرفة إلى أخرى.',
    },
    specs: [
      spec('Marque', 'الماركة', 'Star Track', 'Star Track'),
      spec('Type', 'النوع', "Refroidisseur d'air évaporatif", 'مبرّد هواء بالتبخير'),
      spec('Fonctions', 'الوظائف', 'Refroidissement, humidification, purification', 'تبريد، ترطيب، تنقية'),
      spec('Réservoir', 'الخزّان', "Grande capacité d'eau", 'خزّان ماء بسعة كبيرة'),
      spec('Ventilation', 'المروحة', '3 vitesses', 'ثلاث سرعات'),
      spec('Bruit', 'الضجيج', 'Fonctionnement silencieux', 'تشغيل هادئ'),
      spec('Mobilité', 'التنقّل', 'Roulettes sur les quatre pieds', 'عجلات في القوائم الأربعة'),
      spec('Entretien', 'الصيانة', 'Blocs de refroidissement lavables', 'ألواح تبريد قابلة للغسل'),
    ],
    images: ['refroidisseur-air-startrack', 'refroidisseur-air-startrack-stock'],
    featured: true,
    badge: 'Stock disponible',
  },
  {
    slug: 'ventilateur-table-star-track-ft-40',
    name: {
      fr: 'Ventilateur de table Star Track FT-40 — 400 mm',
      ar: 'مروحة طاولة Star Track FT-40 — 400 ملم',
    },
    category: 'ventilation',
    shortDescription: {
      fr: "Quarante centimètres d'hélice sur un socle lesté, oscillation et trois vitesses. C'est le ventilateur de bureau, de boutique et de chambre — livré dans les coloris de l'arrivage, généralement vert, rose ou bleu.",
      ar: 'أربعون سنتيمترًا من الريش على قاعدة ثقيلة، مع دوران وثلاث سرعات. هذه مروحة المكتب والمحلّ وغرفة النوم — تصل بألوان الشحنة، غالبًا أخضر أو زهري أو أزرق.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'Star Track FT-40', 'Star Track FT-40'),
      spec('Diamètre', 'القطر', '400 mm (16 pouces)', '400 ملم (16 بوصة)'),
      spec('Vitesses', 'السرعات', '3 vitesses', 'ثلاث سرعات'),
      spec('Oscillation', 'الدوران', 'Automatique, arrêtable', 'أوتوماتيكي، يمكن إيقافه'),
      spec('Inclinaison', 'الميل', 'Tête inclinable manuellement', 'الرأس يميل يدويًا'),
      spec('Grille', 'الشبكة', 'Métallique, démontable pour le nettoyage', 'معدنية، تُفكّ للتنظيف'),
      spec('Socle', 'القاعدة', 'Lesté, stable sur une table', 'ثقيلة وثابتة على الطاولة'),
      spec('Alimentation', 'التغذية', '220 V', '220 فولت'),
    ],
    images: ['ventilateur-table-startrack-ft40'],
    featured: false,
  },
  {
    slug: 'ventilateur-orbit-16-pouces',
    name: {
      fr: 'Ventilateur orbit 16" — mural ou plafond',
      ar: 'مروحة أوربت 16 بوصة — جدارية أو سقفية',
    },
    category: 'ventilation',
    shortDescription: {
      fr: "Le modèle orbit qui brasse large et qu'on fixe en hauteur : au-dessus des têtes dans une boutique, un atelier ou une salle. Il balaie toute la pièce sans encombrer le sol, et se commande par cordon.",
      ar: 'موديل الأوربت الذي يدفع هواءً واسعًا ويُثبَّت في العلو: فوق الرؤوس في محلّ أو ورشة أو قاعة. يمسح الغرفة كاملة دون أن يشغل الأرض، ويُشغَّل بحبل السحب.',
    },
    specs: [
      spec('Diamètre', 'القطر', '16 pouces (400 mm)', '16 بوصة (400 ملم)'),
      spec('Type', 'النوع', 'Orbit — fixation murale ou au plafond', 'أوربت — تثبيت جداري أو سقفي'),
      spec('Oscillation', 'الدوران', 'Grand angle', 'زاوية واسعة'),
      spec('Vitesses', 'السرعات', '3 vitesses', 'ثلاث سرعات'),
      spec('Commande', 'التحكّم', 'Cordon de tirage', 'حبل سحب'),
      spec('Grille', 'الشبكة', 'Métal chromé', 'معدن مطلي بالكروم'),
      spec('Moteur', 'المحرّك', 'Bobinage cuivre, usage prolongé', 'ملفّ نحاسي للاستعمال المطوّل'),
      spec('Alimentation', 'التغذية', '220 V', '220 فولت'),
    ],
    images: ['ventilateur-orbit-16-pouces'],
    featured: false,
  },

  // ── Électroménager & Divers ───────────────────────────────────────────────
  {
    slug: 'tondeuse-cheveux-geemy-gm-6008',
    name: {
      fr: 'Tondeuse à cheveux Geemy GM-6008 — rechargeable',
      ar: 'ماكينة حلاقة Geemy GM-6008 — قابلة للشحن',
    },
    category: 'divers',
    shortDescription: {
      fr: "Tondeuse rechargeable avec afficheur de charge, lame acier réglable et jeu de sabots. Elle marche aussi branchée, ce qui évite de s'arrêter au milieu d'une coupe quand la batterie lâche. Pour la maison comme pour un petit salon de quartier.",
      ar: 'ماكينة قابلة للشحن بشاشة تُظهر مستوى الشحن، وشفرة فولاذية قابلة للضبط، ومجموعة أمشاط. تعمل أيضًا وهي موصولة بالكهرباء، فلا تتوقّف في منتصف الحلاقة. للبيت ولصالون الحيّ الصغير.',
    },
    specs: [
      spec('Modèle', 'الموديل', 'Geemy GM-6008', 'Geemy GM-6008'),
      spec('Alimentation', 'التغذية', 'Sans fil rechargeable + usage sur secteur', 'لاسلكية قابلة للشحن مع إمكانية التشغيل من الكهرباء'),
      spec('Afficheur', 'الشاشة', 'Indicateur de charge', 'مؤشّر الشحن'),
      spec('Lame', 'الشفرة', 'Acier inoxydable, hauteur réglable', 'فولاذ مقاوم للصدأ بارتفاع قابل للضبط'),
      spec('Accessoires', 'الملحقات', 'Sabots, brosse, huile, chargeur', 'أمشاط، فرشاة، زيت، شاحن'),
      spec('Usage', 'الاستعمال', 'Cheveux et barbe', 'الشعر واللحية'),
    ],
    images: ['tondeuse-cheveux-pro'],
    featured: false,
    badge: 'Stock disponible',
  },
  {
    slug: 'tondeuse-finition-t9',
    name: {
      fr: 'Tondeuse de finition T9 — contours et barbe',
      ar: 'ماكينة تحديد T9 — للحواف واللحية',
    },
    category: 'divers',
    shortDescription: {
      fr: "La petite tondeuse de finition, celle qui fait les contours nets : lame en T rapprochée pour la nuque, les tempes et la barbe. Corps métal, format fin, elle tient dans la main d'un coiffeur toute la journée.",
      ar: 'ماكينة التحديد الصغيرة، التي تصنع الحواف النظيفة: شفرة على شكل T قريبة للرقبة والصدغين واللحية. هيكل معدني وقياس نحيف، تبقى في يد الحلّاق طوال اليوم.',
    },
    specs: [
      spec('Type', 'النوع', 'Tondeuse de finition (trimmer)', 'ماكينة تحديد'),
      spec('Lame', 'الشفرة', 'Lame en T, coupe rapprochée', 'شفرة على شكل T بقصّ قريب'),
      spec('Corps', 'الهيكل', 'Métal', 'معدني'),
      spec('Batterie', 'البطارية', 'Rechargeable par USB', 'قابلة للشحن عبر USB'),
      spec('Utilisation', 'الاستعمال', 'À sec', 'على الجافّ'),
      spec('Accessoires', 'الملحقات', 'Sabots de précision inclus', 'أمشاط دقيقة مرفقة'),
      spec('Modèles', 'الموديلات', 'Vintage T9 et équivalents selon arrivage', 'Vintage T9 وما يعادلها حسب الشحنة'),
    ],
    images: ['tondeuse-cheveux-pro'],
    featured: false,
  },
];

/** Stock / shop-floor photos, used by the "Notre stock" section on the home page. */
export const STOCK_SHOTS = [
  { image: 'dahua-5mp-dual-light-stock', caption: { fr: 'Caméras Dahua Smart Dual Light en rayon', ar: 'كاميرات داهوا Smart Dual Light على الرفّ' } },
  { image: 'cam-smart-stock-boites', caption: { fr: 'Caméras ampoule Smart Camera, arrivage complet', ar: 'كاميرات اللمبة Smart Camera، شحنة كاملة' } },
  { image: 'kit-dahua-1080p-dvr-hdcvi', caption: { fr: 'Kits Cooper et enregistreurs HDCVI', ar: 'أطقم كوبر ومسجّلات HDCVI' } },
  { image: 'recepteur-starsat-micros-sans-fil', caption: { fr: 'Récepteurs StarSat et microphones MAX', ar: 'أجهزة استقبال ستارسات وميكروفونات MAX' } },
  { image: 'refroidisseur-air-startrack-stock', caption: { fr: "Refroidisseurs d'air Star Track, stock complet", ar: 'مبرّدات هواء Star Track، مخزون كامل' } },
  { image: 'megaphone-onduleur-multimetre', caption: { fr: 'Mégaphones, convertisseurs et outillage de mesure', ar: 'مكبّرات صوت ومحوّلات وأدوات قياس' } },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);
export const productsIn = (id: CategoryId) => PRODUCTS.filter((p) => p.category === id);
export const featuredProducts = () => PRODUCTS.filter((p) => p.featured);
