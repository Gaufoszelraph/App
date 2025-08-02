# NEXUS CODE

Une application web moderne avec interface sombre pour la gestion de vidéos avec système d'authentification.

## 🚀 Fonctionnalités

### Interface d'accueil
- Design sombre et élégant
- Navigation intuitive entre ADMIN et JOUEUR

### Système d'authentification
- **Connexion Admin** : Accès au panel d'administration
- **Connexion Joueur** : Accès aux vidéos avec mot clé

### Section Vidéos
- Affichage des vidéos avec système de verrouillage
- Interface visuelle avec icônes de cadenas
- Lecture des vidéos déverrouillées

### Panel d'administration
- Changer le mot de passe joueur
- Ajouter/Retirer des vidéos
- Définir le mot clé d'accès
- Changer l'arrière-plan de l'application

## 🔑 Identifiants par défaut

### Administrateur
- **Identifiant** : `admin`
- **Mot de passe** : `admin123`

### Joueur
- **Identifiant** : `Joueur`
- **Mot de passe** : `player123`
- **Mot clé** : `nexus2024`

## 📁 Structure du projet

```
nexus-code/
├── index.html          # Structure HTML principale
├── styles.css          # Styles CSS (thème sombre)
├── script.js           # Logique JavaScript
└── README.md           # Documentation
```

## 🎮 Utilisation

### Démarrage
1. Ouvrez `index.html` dans votre navigateur
2. Choisissez votre type de connexion (ADMIN ou JOUEUR)
3. Saisissez vos identifiants

### Navigation
- **Boutons principaux** : Navigation entre les sections
- **Boutons retour** : Retour à la page précédente
- **Déconnexion** : Retour à la page d'accueil

### Fonctionnalités Admin
1. **Changer mot de passe joueur** : Modifie les identifiants d'accès joueur
2. **Ajouter vidéo** : Ajoute une nouvelle vidéo à la collection
3. **Retirer vidéo** : Supprime une vidéo existante
4. **Définir mot clé** : Change le mot clé requis pour les joueurs
5. **Changer arrière plan** : Personnalise l'apparence de l'application

### Raccourcis clavier
- **Échap** : Ferme les modales ouvertes

## 🛠️ Fonctions de débogage

Ouvrez la console du navigateur (F12) et utilisez :

```javascript
// Déverrouiller toutes les vidéos
unlockAllVideos()

// Verrouiller toutes les vidéos
lockAllVideos()

// Afficher la configuration actuelle
getConfig()
```

## 🎨 Personnalisation

### Couleurs
- **Couleur principale** : `#ff4444` (rouge)
- **Arrière-plan** : `#1a1a1a` (noir)
- **Éléments UI** : `#333` (gris foncé)

### Responsive
L'interface s'adapte automatiquement aux écrans mobiles et tablettes.

## 📱 Compatibilité

- ✅ Chrome 90+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔒 Sécurité

⚠️ **Note importante** : Cette application est conçue pour un usage de démonstration. Pour un usage en production, implémentez :
- Authentification sécurisée côté serveur
- Chiffrement des mots de passe
- Protection CSRF
- Validation côté serveur

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créez une branche feature
3. Committez vos changements
4. Pushez vers la branche
5. Ouvrez une Pull Request

---

**NEXUS CODE** - Interface moderne pour la gestion de vidéos
