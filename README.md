# Elias Dechler - Escape Game Vidéo

## 📱 Description

**Elias Dechler** est une application web responsive conçue pour les escape games, permettant de débloquer des vidéos via des mots-clés. L'application propose une expérience immersive avec un thème horreur gothique et une interface intuitive pour les joueurs et les administrateurs.

## 🎯 Fonctionnalités

### Interface Joueur
- **Authentification sécurisée** avec identifiant fixe "Joueur"
- **Déverrouillage de vidéos** via saisie de mots-clés
- **Lecture plein écran** des vidéos débloquées
- **Sons d'ambiance** optionnels par vidéo
- **Interface responsive** adaptée aux mobiles et tablettes

### Interface Admin
- **Gestion complète des vidéos** (ajout, suppression, verrouillage/déverrouillage)
- **Configuration des mots-clés** pour chaque vidéo
- **Personnalisation visuelle** (fond d'écran, sons d'ambiance)
- **Gestion des mots de passe** pour Admin et Joueur
- **Interface d'administration sécurisée**

### Fonctionnalités supplémentaires
- **Génération de QR Code** pour accès rapide à l'application
- **Stockage local** des données (localStorage)
- **Thème horreur gothique** avec typographies stylées
- **Notifications toast** pour les actions utilisateur
- **Raccourcis clavier** (Échap pour fermer, Entrée pour valider)

## 🔧 Installation et Configuration

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local (optionnel pour fichiers locaux)

### Installation
1. Téléchargez tous les fichiers dans un même dossier
2. Ouvrez `index.html` dans votre navigateur
3. L'application se charge automatiquement avec un écran de chargement

### Déploiement
Pour un déploiement en production :
1. Hébergez les fichiers sur un serveur web
2. Assurez-vous que les fichiers sont accessibles via HTTPS
3. Configurez les permissions CORS si nécessaire

## 🔐 Authentification par défaut

### Comptes par défaut
- **Admin** : `Admin` / `admin12`
- **Joueur** : `Joueur` / `joueur123`

> ⚠️ **Important** : Changez immédiatement les mots de passe par défaut via l'interface Admin

## 📋 Guide d'utilisation

### Pour les Joueurs
1. Cliquez sur **JOUEUR** depuis l'écran d'accueil
2. Connectez-vous avec les identifiants
3. Optionnel : Entrez un mot-clé lors de la connexion
4. Dans l'interface joueur, saisissez des mots-clés pour débloquer les vidéos
5. Cliquez sur les vidéos débloquées pour les regarder

### Pour les Administrateurs
1. Cliquez sur **ADMIN** depuis l'écran d'accueil
2. Connectez-vous avec les identifiants admin
3. Utilisez les onglets pour :
   - **Gestion Vidéos** : Ajouter/supprimer des vidéos et définir leurs mots-clés
   - **Paramètres** : Personnaliser l'apparence (fond, sons)
   - **Mots de passe** : Modifier les mots de passe des comptes

## 🎨 Personnalisation

### Thème visuel
L'application utilise un thème horreur gothique avec :
- **Couleurs principales** : Noir, rouge sombre, blanc cassé
- **Typographies** : Cinzel (titres), EB Garamond (texte)
- **Effets visuels** : Dégradés, ombres, transparences

### Sons et médias
- **Vidéos** : Supportées via URL ou fichiers locaux
- **Sons d'ambiance** : Par vidéo ou global
- **Formats supportés** : MP4, WebM, MP3, WAV, OGG

## 🗂️ Structure des fichiers

```
elias-dechler/
├── index.html          # Interface utilisateur principale
├── styles.css          # Styles et thème visuel
├── script.js           # Logique applicative
└── README.md           # Documentation
```

## 💾 Stockage des données

L'application utilise le localStorage du navigateur pour :
- **Videos** : Liste des vidéos et leurs propriétés
- **Unlocked** : Vidéos débloquées par les joueurs
- **Settings** : Mots de passe, paramètres visuels

### Sauvegarde des données
```javascript
// Export des données
const backup = {
    videos: JSON.parse(localStorage.getItem('eliasDechlapp_videos')),
    unlocked: JSON.parse(localStorage.getItem('eliasDechlapp_unlocked')),
    data: JSON.parse(localStorage.getItem('eliasDechlapp_data'))
};
```

## 🔄 Vidéos d'exemple

L'application inclut une vidéo de démonstration :
- **Nom** : "Vidéo d'introduction"
- **Mot-clé** : "debut"
- **URL** : Vidéo de test W3Schools

## 📱 Responsive Design

L'application s'adapte automatiquement :
- **Desktop** : Interface complète avec grille de vidéos
- **Tablette** : Mise en page adaptée
- **Mobile** : Interface optimisée avec boutons empilés

## 🚀 Fonctionnalités avancées

### QR Code
- Génération automatique pointant vers l'URL actuelle
- Utilisation de la librairie QRCode.js
- Affichage dans un conteneur stylé

### Raccourcis clavier
- **Échap** : Fermer la vidéo en cours
- **Entrée** : Valider la saisie de mot-clé
- **Navigation** : Support clavier complet

### Notifications
- **Toast messages** pour les actions
- **Messages d'erreur** contextuels
- **Confirmations** pour les actions critiques

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Animations, gradients, responsive design
- **JavaScript ES6+** : Logique applicative moderne
- **LocalStorage API** : Persistance des données
- **QRCode.js** : Génération de QR codes
- **Google Fonts** : Typographies Cinzel et EB Garamond

## 🔧 Développement et extension

### Ajouter de nouvelles fonctionnalités
1. Modifiez `script.js` pour la logique
2. Ajoutez les styles dans `styles.css`
3. Mettez à jour l'interface dans `index.html`

### Personnaliser le thème
1. Modifiez les variables CSS dans `:root`
2. Ajustez les couleurs et typographies
3. Remplacez les effets visuels

### Intégration backend
Pour une version serveur :
1. Remplacez localStorage par des appels API
2. Ajoutez l'authentification JWT
3. Implémentez la gestion des fichiers

## 📄 Licence

Ce projet est fourni "tel quel" à des fins éducatives et de démonstration. Libre d'utilisation et de modification selon vos besoins.

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez que JavaScript est activé
2. Consultez la console du navigateur pour les erreurs
3. Assurez-vous que les fichiers sont tous présents
4. Testez dans un navigateur différent

---

**Créé pour les escape games et expériences immersives** 🎮👻