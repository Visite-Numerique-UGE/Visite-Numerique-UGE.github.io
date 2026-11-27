# UGExplorer

UGExplorer est une application Vue 3 de visite numérique du campus de l'Université Gustave Eiffel. Elle propose une carte interactive, des parcours guidés sous forme de quiz et une liste d'événements culturels.

## Prérequis

- Node.js 18 ou plus récent
- npm

## Installation et lancement

```sh
npm install
cp .env.example .env.local
npm run dev
```

Renseigner les clés CARTO et GraphHopper dans `.env.local` avant d'utiliser les tuiles et le calcul d'itinéraire. Ce fichier est ignoré par Git (`*.local`). Ne pas mettre les clés dans `.env.example`.

## Vérifications

```sh
npm test
npm run build
```

Les tests unitaires sont dans `tests/unit/`, classés par couche et fonctionnalité.

## Organisation du code

- `frontend/src/` contient uniquement l’application Vue : `App.vue`, routeur, styles, composables d’interface et fonctionnalités `home`, `map`, `courses`, `events` et `quiz`.
- Chaque dossier `frontend/src/features/<domaine>/` contient ses composants et vues. `routes.js` est découvert automatiquement par le routeur; `navigation.js` déclare les entrées de barre et leur ordre.
- `backend/` regroupe les accès aux données et les schémas, par fonctionnalité. `backend/shared/` fournit le transport GViz et le mapper générique.
- Les schémas des lieux, parcours et questions décrivent leurs colonnes et transformations sans accumuler de fonctions `normalizeX` dans un module commun.
- `tests/unit/backend/` sépare les tests des sources et reflète l’organisation des modules testés.

**Limite d’architecture :** le dossier `backend/` est ici une couche d’accès aux données, pas un serveur. Vite l’importe et l’intègre au bundle du frontend; les requêtes restent exécutées dans le navigateur.

Les variables `VITE_*` sont intégrées au JavaScript livré au navigateur. Elles évitent de committer les clés dans ce dépôt, mais ne les rendent pas secrètes sur le site publié. Restreindre les clés par domaine et quotas; une clé qui doit rester secrète nécessite un proxy côté serveur.

Les lieux, parcours et questions sont alimentés par Google Sheets. Les événements culturels sont récupérés depuis le site de l'université via AllOrigins. La carte utilise Leaflet; le calcul d'itinéraire piéton s'appuie sur Leaflet Routing Machine et GraphHopper.

## Déploiement

La commande `npm run deploy` construit le site puis publie le contenu de `dist` sur la branche `gh-pages`. Elle nécessite les droits de publication sur le dépôt GitHub.

## Points de vigilance

- Les données externes et le proxy d'événements dépendent de services tiers et d'une connexion réseau.
- Les clés CARTO et GraphHopper utilisées dans le navigateur doivent être restreintes par domaine et surveillées selon les quotas du fournisseur. Une clé réellement secrète ne doit pas être embarquée dans le code client.