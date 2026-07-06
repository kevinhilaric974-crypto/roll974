# Roll974

Première version fonctionnelle de la plateforme communautaire Jiu-Jitsu Brésilien de La Réunion.

## Lancer le site

Le projet est volontairement autonome et sans dépendance. Depuis ce dossier :

```bash
python3 -m http.server 4173
```

Puis ouvrir `http://127.0.0.1:4173`.

La carte utilise Leaflet et les données ouvertes OpenStreetMap. Elle fonctionne
sans compte ni token. Le rendu sombre est appliqué directement par Roll974 et
l’attribution OpenStreetMap reste visible sur la carte.

## Structure

- `index.html` : point d’entrée et métadonnées
- `styles.css` : design system, composants et responsive
- `app.js` : pages, données de test, navigation et interactions

## Fonctionnalités de la V1

- navigation complète entre les neuf rubriques ;
- recherche de partenaires par texte, zone et discipline ;
- publication d’une annonce avec conservation dans le navigateur ;
- open mats filtrables par zone, format et niveau ;
- carte interactive des clubs ;
- pages profil, inscription, connexion et contact ;
- interface responsive pensée mobile-first.

## Identité visuelle

- palette Noir volcan, Bleu océan, Vert des Hauts, Blanc kimono et Rouge lave ;
- logo vectoriel original combinant mouvement du roll, relief de l’île et nœud de ceinture ;
- titres Oswald et textes Inter ;
- univers sombre premium avec texture topographique discrète ;
- marqueurs distincts pour partenaires, open mats et clubs ;
- carte OpenStreetMap interactive sombre, sans clé API.

## Suite recommandée

Pour une mise en production : connecter une base de données (Supabase convient bien), ajouter l’authentification, la modération, une vraie messagerie ou des liens WhatsApp consentis, puis remplacer les exemples fictifs par les données vérifiées des clubs.
