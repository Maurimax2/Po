# Basma — بصمة للخدمات العامة

Site vitrine bilingue (**arabe par défaut**, français en second) pour **بصمة للخدمات العامة /
Basma pour les services publics**, magasin de vidéosurveillance et d'équipement électronique à
Nouakchott, Mauritanie.

Site **100 % statique** : aucun serveur, aucune base de données, aucune clé d'API, aucune variable
d'environnement. Le dossier `dist/` produit par la compilation se dépose tel quel sur Netlify,
Vercel, GitHub Pages ou n'importe quel hébergeur de fichiers.

---

## Deux règles à ne jamais casser

1. **Aucun prix n'est affiché nulle part.** Ni sur les cartes, ni sur les fiches produit, ni dans
   le panier, ni dans le message WhatsApp. À la place : **« Prix sur demande » / « السعر عند الطلب »**.
   Le panier compte des quantités, jamais de l'argent. Il n'y a aucun symbole monétaire dans le code.
2. **La commande passe uniquement par WhatsApp.** Le bouton de commande ouvre
   `https://wa.me/<numéro>?text=<message encodé>`. Pas de paiement, pas de formulaire envoyé à un
   serveur, pas d'e-mail. La dernière ligne du message est celle qui demande le prix au magasin —
   c'est tout l'intérêt du parcours.

---

## Démarrer

```bash
npm install     # installe les dépendances
npm run dev     # serveur de développement -> http://localhost:5173
npm run build   # compile le site dans dist/
npm run preview # sert dist/ localement pour vérifier avant mise en ligne
```

`npm run dev` et `npm run build` lancent automatiquement le traitement des images
(`npm run images`) avant de démarrer. Un premier `npm install` est donc suffisant.

### Mise en ligne

**Vercel** — rien à configurer : `vercel.json` déclare déjà le framework, la commande de
compilation, le dossier de sortie, la réécriture des routes et les en-têtes de cache.

À propos de ces en-têtes : tout ce qui est sous `/assets` porte une empreinte de contenu dans son
nom (Vite s'en charge), donc ces fichiers sont marqués immuables pour un an — c'est ce qui rend la
deuxième visite immédiate sur une connexion mobile lente. `index.html` est en revanche revalidé à
chaque fois, sinon un nouveau déploiement n'atteindrait jamais personne.

⚠️ `vercel.json` est du JSON strict et Vercel **refuse toute clé qu'il ne connaît pas** — y compris
une clé `comment` ajoutée pour documenter. N'écrivez pas de commentaires dans ce fichier : les
explications vont ici.

1. vercel.com → **Add New… → Project → Import Git Repository** → `Maurimax2/Po`
2. Laissez tous les réglages proposés tels quels, **Deploy**.

Chaque `git push` redéploie ensuite automatiquement. La compilation régénère les images à partir
de `assets/` : rien d'autre à téléverser.

En ligne de commande, depuis un clone du dépôt : `npx vercel --prod`.

| Autre hébergeur | Réglages |
|---|---|
| Netlify | Build : `npm run build` · Publish : `dist` (le fichier `public/_redirects` gère déjà les routes) |
| Autre | Servez `dist/` et renvoyez toutes les URL inconnues vers `/index.html` |

---

## ✏️ Changer le numéro WhatsApp

**Un seul endroit : [`src/data/shop.ts`](src/data/shop.ts).**

```ts
export const SHOP = {
  whatsappNumber: '22226490908',   // <- format international, sans "+", sans espaces, sans zéro initial
  phoneDisplay: '+222 26 49 09 08', // <- ce que le visiteur lit à l'écran
  phoneHref: '+22226490908',        // <- cible du lien "Appeler"
  ...
};
```

`whatsappNumber` doit rester en **chiffres uniquement, indicatif pays en tête** (222 = Mauritanie) :
c'est le format qu'exige `wa.me`. Les trois valeurs sont utilisées partout — en-tête, pied de page,
fiches produit, page contact et page de commande.

Le même fichier contient l'adresse utilisée pour le lien Google Maps (`mapsQuery`) et l'année de
création affichée dans les statistiques de la page d'accueil (`foundedYear`).

> **À confirmer avec le magasin avant mise en ligne :** l'adresse postale et les horaires, définis
> dans `src/i18n/index.ts` (`contact.addressLines` et `contact.hoursLines` pour chaque langue).
> Les valeurs actuelles sont plausibles mais n'ont pas été vérifiées auprès du propriétaire.

---

## ✏️ Ajouter un produit

Trois étapes.

**1. Déposez la photo** dans `assets/products/` au format `.jpg`, avec un nom en minuscules et
tirets, par exemple `cam-dome-4mp-poe.jpg`.

**2. Régénérez les images :**

```bash
npm run images
```

Le script `scripts/optimize-images.mjs` produit automatiquement, pour chaque photo :

- trois largeurs (400 / 720 / 1080 px) en WebP, au format 4:5, sur un fond clair uniforme,
- la même photo floutée et éclaircie en arrière-plan, pour que les photos de rayon et les visuels
  fournisseurs se ressemblent dans la grille,
- un fondu des bords, pour que la photo se pose dans la carte sans y dessiner un rectangle.

**3. Ajoutez l'entrée** dans `src/data/products.ts` :

```ts
{
  slug: 'camera-dome-4mp-poe',            // URL : /produit/camera-dome-4mp-poe — unique, sans accent
  name: { fr: 'Caméra dôme 4MP PoE', ar: 'كاميرا قبّة 4 ميغابكسل PoE' },
  category: 'videosurveillance',           // voir CategoryId en haut du fichier
  shortDescription: {
    fr: 'Deux phrases concrètes : à quoi elle sert, pour qui, dans quel cas.',
    ar: 'جملتان واضحتان: لماذا تُستعمل، ولمن، وفي أي حالة.',
  },
  specs: [
    // spec(libellé FR, libellé AR, valeur FR, valeur AR)
    spec('Capteur', 'المستشعر', '4 MP', '4 ميغابكسل'),
    spec('Alimentation', 'التغذية', 'PoE 48 V', 'PoE 48 فولت'),
  ],
  images: ['cam-dome-4mp-poe'],            // nom du fichier SANS le .jpg — plusieurs = galerie
  featured: false,                          // true = apparaît sur la page d'accueil
  badge: 'Nouveau',                         // optionnel : 'Nouveau' | 'Meilleure vente' | 'Stock disponible'
},
```

La compilation échoue avec un message clair si `images` pointe vers un fichier qui n'existe pas :
impossible d'avoir une image cassée en production.

**Pour retirer un produit**, supprimez son entrée. Les paniers déjà enregistrés chez les visiteurs
ignorent automatiquement les références disparues.

### Ajouter une catégorie

Ajoutez l'identifiant au type `CategoryId`, puis une entrée dans `CATEGORIES` (nom, accroche et
description dans les deux langues), et une icône dans `CATEGORY_ICONS`
(`src/components/Icons.tsx`). Le menu, les filtres, le pied de page et la grille de la page
d'accueil se mettent à jour tout seuls.

---

## Traductions

Tout le texte de l'interface est dans **`src/i18n/index.ts`**, en deux objets : `ar` (langue par
défaut du site) et `fr`. Pas de bibliothèque i18n. L'objet `ar` est typé d'après `fr` : si vous ajoutez une clé d'un
côté sans l'autre, **la compilation échoue** — les deux langues ne peuvent pas se désynchroniser.

Le texte des produits n'est pas dans ce fichier : il vit à côté de chaque produit dans
`src/data/products.ts`.

**L'arabe est la langue par défaut.** `index.html` est déjà servi en `lang="ar" dir="rtl"`, donc la
première page s'affiche en arabe et de droite à gauche sans clignotement. Un visiteur dont le
navigateur est en français reçoit le français à la première visite ; tous les autres arrivent en
arabe. Le choix fait avec le bouton de l'en-tête est ensuite mémorisé dans `localStorage`.

Le passage d'une langue à l'autre retourne toute la mise en page — le CSS n'utilise que des
propriétés logiques (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) — change la police pour la coupe
arabe, et bascule le message WhatsApp dans l'autre langue.

**Pour changer la langue par défaut**, modifiez `initialLang()` dans
`src/context/LangContext.tsx` et l'attribut `lang`/`dir` de `<html>` dans `index.html`.

---

## Structure

```
assets/
  brand/logo-basma.jpg          source du logo (fingerprint / iris)
  products/*.jpg                photos sources, non retouchées
scripts/
  optimize-images.mjs           pipeline images (WebP responsive, cut-outs, favicon, image de partage)
  fetch-fonts.mjs               télécharge les polices en local (à relancer seulement si on change la typo)
src/
  assets/fonts/                 polices auto-hébergées (aucun appel CDN à l'exécution)
  assets/generated/             sortie du pipeline images — régénérée, non versionnée
  components/                   Header, Footer, ProductCard, Aperture (la marque au diaphragme), ui.tsx
  context/                      CartContext (panier + localStorage), LangContext (langue + RTL)
  data/products.ts              LE CATALOGUE
  data/shop.ts                  numéro WhatsApp, adresse, coordonnées
  i18n/index.ts                 tous les textes d'interface, fr + ar
  lib/images.ts                 résolution des images générées vers des URL hachées par Vite
  lib/whatsapp.ts               construction du message de commande
  pages/                        Home, Catalogue, Product, Cart, Checkout, Contact, NotFound
```

---

## Choix techniques

- **Vite + React + TypeScript + Tailwind CSS v4.** Aucune bibliothèque de composants : tout est
  écrit ici, il n'y a rien à désapprendre pour reprendre le code.
- **Typographie : IBM Plex, auto-hébergée.** Une seule superfamille pour les deux écritures —
  *IBM Plex Sans Arabic* pour l'arabe, *IBM Plex Sans* pour le texte latin et *IBM Plex Sans
  Condensed* pour les titres. L'arabe étant la langue principale, c'est la coupe arabe qui mène et
  les coupes latines qui l'accompagnent, et non l'inverse. Le site ne fait **aucune requête vers un
  tiers** à l'exécution. Chaque fichier est délimité par `unicode-range` : un visiteur francophone
  ne télécharge jamais l'arabe, et réciproquement.
- **Images traitées à la compilation**, jamais à l'affichage. Les sources font jusqu'à 2560 px ;
  ce qui part sur le réseau fait 400 à 1080 px en WebP. Chaque `<img>` porte ses dimensions et un
  `srcset`, donc la mise en page ne bouge pas pendant le chargement et le navigateur choisit la
  bonne taille. Tout ce qui est sous la ligne de flottaison est en `loading="lazy"`.
- **Découpage par route** : la page d'accueil est dans le bundle principal, les autres pages sont
  chargées à la demande.
- **Panier** dans un contexte React, persisté dans `localStorage` (clé `basma.cart.v1`),
  synchronisé entre onglets, et nettoyé des références qui n'existent plus au catalogue.
- **Accessibilité** : repères sémantiques, lien d'évitement, focus visible en ambre sur tous les
  éléments interactifs, textes alternatifs réels dans les deux langues, cibles tactiles de 44 px,
  et `prefers-reduced-motion` respecté (l'ouverture du diaphragme est simplement supprimée).
- **Testé de 320 px de large jusqu'au grand écran**, panier et commande compris.

---

## Le parti pris visuel

Le logo de Basma est une empreinte digitale qui se referme en diaphragme d'objectif. Ce diaphragme
revient comme marque de repère avant chaque titre de section, dans le panier vide et sur le plan —
en trait, immobile. Les images sont cadrées par quatre équerres d'angle, comme une planche de
catalogue, qui ne prennent la couleur d'accent qu'au survol.

Le site est **clair** : blanc pour le fond principal, un sable chaud `#FAF7F2` pour les bandes
alternées, et l'encre `#17130F`. L'ambre `#EC8304` du logo ne descend qu'à 2,6:1 de contraste sur
blanc : il sert donc d'**aplat** (avec du texte sombre par-dessus) et jamais de couleur de petit
texte — c'est le rôle de sa version foncée `#96540A`.

Les photos du magasin sont toutes traitées de la même façon à la compilation : contenues sur une
toile 4:5 posée sur une version floutée et éclaircie d'elles-mêmes, puis fondues sur les bords.
Une photo de rayon prise au téléphone et un visuel fournisseur se retrouvent ainsi dans le même
cadre, et la grille lit comme un inventaire tenu, pas comme un assemblage.
