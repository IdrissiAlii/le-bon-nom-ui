# Le Bon Nom UI

Un lexique visuel pour trouver **le bon nom** quand on décrit une interface, une animation ou une vidéo à une IA, à un développeur ou à un graphiste.

Quand on n'est pas expert en UI/UX, le plus difficile est souvent de savoir comment s'appelle ce qu'on a en tête : « la petite bulle au survol », « le menu qui sort du côté », « la caméra qui avance vers la personne ». Le Bon Nom UI rassemble **502 notions**, chacune avec une démo animée, son nom officiel et un prompt prêt à copier.

## Contenu

| Section | Notions | Exemples |
|---|---|---|
| Animations | 149 | Fade In Up, Stagger, Shake, Ripple Effect, Typewriter, Skeleton, Parallax |
| Composants | 88 | Toast, Drawer, Combobox, Stepper, Popover, Empty State, Command Palette |
| Apprentissage | 36 | Flashcard, Hotspots, Scrollytelling, Branching Scenario, Spaced Repetition |
| Vidéo & motion | 89 | Close-Up, Dolly In, Jump Cut, J-Cut, Lower Third, Animated Captions, Safe Zone |
| Easing & timing | 27 | Ease-Out, Back Out, Spring, Stagger, Choreography, principes Disney |
| Lois & principes | 66 | Loi de Fitts, Loi de Hick, Gestalt, charge cognitive, Dark Pattern |
| Layouts & styles | 47 | Bento Grid, F-Pattern, Hero Section, Glassmorphism, Neo-Brutalism |

Chaque fiche donne :

- le **nom anglais officiel**, celui que les IA et les outils comprennent le mieux, et son équivalent français ;
- les **autres noms** qu'on rencontre ;
- **quand l'utiliser** et ce qu'il faut **éviter** ;
- les **outils** qui permettent de le réaliser (CSS, GSAP, Lottie, shadcn/ui, Premiere Pro, HyperFrames…) ;
- un **prompt prêt à copier**, avec des `[crochets]` à remplacer par son propre cas.

## Fonctions

- **Recherche par description** : on tape ce qu'on voit (« la carte qui se retourne ») et l'app propose les noms correspondants. Raccourci : `/`.
- **Mon brief** : le signet ajoute une fiche à un panier ; l'app assemble un seul prompt qui combine le contexte du projet et tous les éléments choisis.
- **Boucle** : rejoue les démos en continu.

Les favoris et les prompts modifiés sont enregistrés dans le navigateur (`localStorage`) : ils ne quittent pas l'appareil.

## Utiliser

Ouvrir `docs/index.html` dans un navigateur. Aucun serveur ni installation n'est nécessaire.

En ligne, la page est servie par GitHub Pages depuis le dossier `docs/`.

## Modifier

Le contenu et le code sont dans `src/` :

| Fichier | Rôle |
|---|---|
| `src/data-anim.js` | fiches et démos des animations (et petites fonctions partagées) |
| `src/data-comp.js` | composants web |
| `src/data-more.js` | apprentissage, easing, lois & principes, layouts & styles |
| `src/data-video.js` | vidéo & motion |
| `src/app.js` | sections, recherche, fiches, panneau de détail, brief |
| `src/*.css` | styles de l'interface et des démos |
| `src/head.html`, `src/body.html` | squelette de la page |

Après une modification, reconstruire la page :

```bash
sh build.sh
```

Le script produit `docs/index.html` (la page publiée) et `artifact.html` (une variante sans en-tête, utilisée hors GitHub et ignorée par Git).

Chaque fiche est un objet avec des champs courts : `n` (nom anglais), `f` (nom français), `g` (groupe), `d` (définition), `u` (quand l'utiliser), `x` (à éviter), `a` (alias), `k` (mots familiers pour la recherche), `t` (outils), `s` (réglage repris dans le prompt), puis la démo (`kf` pour une animation CSS simple, ou `h` + `init` pour une démo sur mesure).

## Fiabilité

C'est une **référence pratique**, pas une encyclopédie. Les définitions, réglages types et chiffres (durées conseillées, seuils, ordres de grandeur) sont des repères courants dans le métier ; certains sont simplifiés ou discutés. Vérifie auprès des sources officielles (WCAG, documentation des outils) quand la précision compte.

Le contenu et le code ont été rédigés avec l'aide de Claude (Anthropic), puis relus et choisis par l'auteur.

## Licence

- Code : licence MIT (voir [LICENSE](LICENSE)).
- Textes des fiches : [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr). Tu peux les réutiliser en citant « Le Bon Nom UI ».
- Crédits tiers : voir [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
