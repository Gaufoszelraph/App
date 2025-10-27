# 📱 Elias Dechler - Application Mobile

## 🚀 Installation rapide

### Option 1 : PWA (Recommandée) ⭐
**Application Web Progressive - Fonctionne sur tous les appareils**

1. **Ouvrez** : `https://votre-domaine.com/install.html`
2. **Cliquez** : "Installer comme App" 
3. **Confirmez** : L'installation dans votre navigateur
4. **Accédez** : L'icône apparaît sur votre écran d'accueil

### Option 2 : APK Android 📦
**Fichier d'installation native Android**

1. **Téléchargez** : `elias-dechler.apk` (non disponible - SDK manquant)
2. **Activez** : "Sources inconnues" dans Paramètres > Sécurité
3. **Installez** : Ouvrez le fichier APK téléchargé
4. **Lancez** : L'application depuis le tiroir d'applications

## 📋 Guide d'installation par plateforme

### 🤖 Android

#### Méthode 1 : PWA (Chrome/Edge)
1. Ouvrez l'app dans **Chrome** ou **Edge**
2. Recherchez l'icône **"Installer"** dans la barre d'adresse
3. Ou menu **⋯ > Ajouter à l'écran d'accueil**
4. Confirmez l'installation

#### Méthode 2 : APK Direct
*Note : APK non généré en raison de l'absence du SDK Android*
```bash
# Pour générer l'APK (nécessite Android SDK)
cd elias-dechler-mobile
cordova build android --release
```

### 🍎 iOS (iPhone/iPad)

#### Avec Safari uniquement
1. Ouvrez l'app dans **Safari** (pas Chrome)
2. Appuyez sur **Partager** (📤)
3. Sélectionnez **"Ajouter à l'écran d'accueil"**
4. Confirmez avec **"Ajouter"**

### 🪟 Windows

#### Edge ou Chrome
1. Ouvrez l'app dans **Edge** ou **Chrome**
2. Cliquez sur **"Installer l'application"** dans la barre d'adresse
3. Ou **Menu ⋯ > Applications > Installer**
4. L'app apparaît dans le menu Démarrer

### 🐧 Linux

#### Chrome/Chromium
1. Ouvrez l'app dans **Chrome** ou **Chromium**
2. Menu **⋯ > Autres outils > Créer un raccourci**
3. Cochez **"Ouvrir dans une fenêtre"**
4. L'app sera disponible dans les applications

## ⚙️ Configuration après installation

### 🔐 Comptes par défaut
- **Admin** : `Admin` / `admin12`
- **Joueur** : `Joueur` / `joueur123`

⚠️ **Changez immédiatement les mots de passe via l'interface Admin !**

### 🎮 Premier démarrage
1. **Lancez** l'application
2. **Choisissez** Admin ou Joueur
3. **Connectez-vous** avec les identifiants par défaut
4. **Configurez** vos vidéos et mots-clés (Admin)
5. **Testez** le déverrouillage (Joueur avec mot-clé `"debut"`)

## 🛠️ Fonctionnalités mobiles

### 📱 Spécifiques au mobile
- **Vibrations** lors des actions (succès/erreur)
- **Mode portrait** optimisé
- **Stockage local** pour fonctionnement hors ligne
- **Interface tactile** adaptée
- **Retour arrière** natif Android

### 🎯 Fonctionnalités principales
- ✅ **Escape Game** avec déverrouillage par mots-clés
- ✅ **Interface Admin** complète
- ✅ **Interface Joueur** intuitive
- ✅ **Gestion des vidéos** (URL et fichiers locaux)
- ✅ **Sons d'ambiance** par vidéo
- ✅ **Thème horreur gothique**
- ✅ **QR Code** pour partage rapide
- ✅ **Mode hors ligne** complet

## 🌐 Compatibilité navigateurs

| Navigateur | Android | iOS | Windows | Linux | Installation PWA |
|------------|---------|-----|---------|-------|------------------|
| **Chrome** | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Safari** | ❌ | ✅ | ❌ | ❌ | ✅ |
| **Edge** | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Firefox** | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ |

## 🔧 Résolution de problèmes

### Installation
**Problème** : L'option d'installation n'apparaît pas
**Solution** : 
- Vérifiez que JavaScript est activé
- Utilisez un navigateur compatible (Chrome, Safari, Edge)
- Rechargez la page

**Problème** : Erreur lors de l'installation
**Solution** :
- Vérifiez votre connexion internet
- Redémarrez le navigateur
- Essayez en mode navigation privée

### Performance
**Problème** : Application lente
**Solution** :
- Fermez et rouvrez l'application
- Vérifiez l'espace de stockage disponible
- Effacez le cache du navigateur

### Fonctionnalités
**Problème** : Les vidéos ne se lisent pas
**Solution** :
- Vérifiez le format vidéo (MP4 recommandé)
- Testez avec une URL vidéo externe
- Vérifiez les permissions du navigateur

## 📊 Avantages PWA vs APK

### 🌐 PWA (Progressive Web App)
✅ **Avantages :**
- Installation universelle (tous OS)
- Mises à jour automatiques
- Pas de store requis
- Accès immédiat
- Même fonctionnalités qu'une app native

⚠️ **Limitations :**
- Dépend du navigateur
- Certaines APIs limitées
- Moins d'intégration système

### 📦 APK (Android Package)
✅ **Avantages :**
- Application native Android
- Intégration système complète
- Installation hors ligne
- Performances optimales

❌ **Inconvénients :**
- Android uniquement
- Nécessite développement spécifique
- Installation plus complexe
- **Non disponible** (SDK manquant)

## 🔄 Mises à jour

### PWA
Les mises à jour se font **automatiquement** :
1. Nouvelle version détectée
2. Notification dans l'app
3. Redémarrage recommandé
4. Mise à jour appliquée

### Données utilisateur
- **Conservées** lors des mises à jour
- **Sauvegardées** localement
- **Exportables** via l'interface Admin

## 📱 QR Code pour installation

```
Scannez ce QR code avec votre téléphone :
[QR CODE GÉNÉRÉ AUTOMATIQUEMENT]
```

Le QR code redirige vers la page d'installation et permet un accès rapide depuis n'importe quel appareil.

## 🎯 Utilisation recommandée

### Pour les organisateurs d'escape game
1. **Hébergez** l'application sur votre serveur web
2. **Configurez** vos vidéos et mots-clés via l'interface Admin
3. **Partagez** le QR code ou le lien avec les participants
4. **Guidez** l'installation PWA pour une expérience optimale

### Pour les joueurs
1. **Scannez** le QR code fourni
2. **Installez** l'application (PWA recommandée)
3. **Connectez-vous** en tant que Joueur
4. **Saisissez** les mots-clés découverts pendant le jeu

## 📞 Support technique

### 🆘 En cas de problème
- **Email** : support@eliasdeckler.com
- **Documentation** : Consultez ce README
- **Issues GitHub** : Signalez les bugs
- **Communauté** : Forum de discussion

### 🔍 Diagnostic
Pour signaler un problème, incluez :
- Type d'appareil et OS
- Navigateur et version
- Description du problème
- Étapes pour reproduire
- Captures d'écran si applicable

---

**🎮 Bon escape game avec Elias Dechler ! 👻**