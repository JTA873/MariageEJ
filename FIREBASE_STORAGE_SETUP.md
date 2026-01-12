# Configuration Firebase Storage pour la galerie Photos & Vidéos

## 📋 Étapes de configuration

### 1. Activer Firebase Storage

1. Allez sur [Console Firebase](https://console.firebase.google.com/)
2. Sélectionnez votre projet `mariageej-22128`
3. Dans le menu de gauche, cliquez sur **Storage**
4. Cliquez sur **Commencer** (Get started)
5. Suivez les étapes d'activation

### 2. Configurer les règles de sécurité Storage

Dans l'onglet **Rules** de Firebase Storage, remplacez les règles par défaut par :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Règles pour le dossier des photos de mariage
    match /mariage-photos/{fileName} {
      // Permettre la lecture à tous
      allow read: if true;
      
      // Permettre l'upload à tous (fichiers jusqu'à 100MB)
      allow write: if request.resource.size < 100 * 1024 * 1024
                   && (request.resource.contentType.matches('image/.*') 
                       || request.resource.contentType.matches('video/.*'));
    }
  }
}
```

### 3. Configurer les règles Firestore pour les métadonnées

Dans **Firestore Database** → **Règles**, ajoutez la collection `mariage-media` :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection des confirmations (déjà existante)
    match /confirmations/{document=**} {
      allow read, write: if true;
    }
    
    // NOUVELLE: Collection des médias partagés
    match /mariage-media/{document=**} {
      allow read: if true;
      allow create: if request.resource.data.fileSize < 100 * 1024 * 1024;
      allow delete: if true;
    }
  }
}
```

### 4. Structure de données Firestore

La collection `mariage-media` contient des documents avec cette structure :

```javascript
{
  userName: "Jean",           // Prénom de la personne qui partage
  description: "Photo...",     // Description optionnelle
  fileName: "1234567_image.jpg", // Nom unique du fichier
  fileUrl: "https://...",      // URL de téléchargement Firebase
  fileType: "image/jpeg",      // Type MIME du fichier
  fileSize: 1234567,           // Taille en bytes
  timestamp: Timestamp,        // Horodatage serveur
  uploadDate: "2026-01-12..."  // Date ISO pour affichage
}
```

## 🔧 Fonctionnalités de la page Photos

### Upload de médias
- Support photos (JPG, PNG, HEIC, etc.)
- Support vidéos (MP4, MOV, etc.)
- Limite de taille : 100 MB par fichier
- Barre de progression en temps réel
- Nom et description optionnels

### Galerie
- Affichage en grille responsive
- Filtres : Tous / Photos / Vidéos
- Bouton actualiser pour recharger
- Vignettes avec aperçu

### Visualisation
- Modal plein écran pour photos
- Lecteur vidéo intégré avec contrôles
- Informations (nom, date, description)
- Bouton de téléchargement

### Téléchargement
- Les invités peuvent voir et télécharger tous les médias
- Vous pouvez télécharger chaque média individuellement
- Ou télécharger tout le dossier depuis la console Firebase

## 📥 Comment télécharger tous les médias

### Méthode 1 : Console Firebase (recommandée)
1. Allez dans **Storage** sur Firebase Console
2. Naviguez dans le dossier `mariage-photos`
3. Sélectionnez plusieurs fichiers (Ctrl+clic ou Cmd+clic)
4. Cliquez sur les trois points (⋮) → **Télécharger**

### Méthode 2 : Via la page web
- Ouvrez la modal de chaque média
- Cliquez sur **⬇️ Télécharger**
- Le fichier se télécharge dans votre dossier Téléchargements

### Méthode 3 : Firebase CLI (pour tout télécharger en une fois)
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Télécharger tout le dossier
gsutil -m cp -r gs://mariageej-22128.firebasestorage.app/mariage-photos ./photos-mariage
```

## 🔒 Sécurité et gestion

### Modération
Les règles actuelles permettent à tous les invités de :
- ✅ Uploader des photos/vidéos
- ✅ Voir tous les médias
- ✅ Télécharger tous les médias
- ⚠️ Supprimer des médias (à désactiver si nécessaire)

Pour désactiver la suppression par les invités, modifiez les règles Storage :

```javascript
match /mariage-photos/{fileName} {
  allow read: if true;
  allow write: if request.resource.size < 100 * 1024 * 1024
               && (request.resource.contentType.matches('image/.*') 
                   || request.resource.contentType.matches('video/.*'));
  allow delete: if false; // Empêche la suppression
}
```

### Nettoyage
Pour supprimer des médias inappropriés :
1. Allez dans **Storage** → dossier `mariage-photos`
2. Sélectionnez le fichier → Supprimer
3. Allez dans **Firestore** → collection `mariage-media`
4. Trouvez le document correspondant → Supprimer

## 💰 Coûts Firebase

### Gratuit (plan Spark)
- Storage : 5 GB
- Téléchargements : 1 GB/jour
- Firestore : 1 GB stockage, 50k lectures/jour

### Si dépassement
- Storage : ~0,026 $/GB/mois
- Téléchargements : ~0,12 $/GB
- Firestore : ~0,18 $/GB/mois

💡 Pour un mariage, vous resterez probablement dans les limites gratuites.

## ✅ Checklist de mise en service

- [ ] Firebase Storage activé
- [ ] Règles Storage configurées et publiées
- [ ] Règles Firestore mises à jour pour `mariage-media`
- [ ] Test d'upload d'une photo
- [ ] Test d'upload d'une vidéo
- [ ] Test de visualisation dans la galerie
- [ ] Test de téléchargement
- [ ] Test du bouton actualiser
- [ ] Test des filtres (Tous/Photos/Vidéos)
- [ ] Lien ajouté depuis le-mariage.html ✅

## 🎨 Personnalisation

### Changer la limite de taille
Dans [photos.html](photos.html), ligne ~135 :
```javascript
const maxSize = 100 * 1024 * 1024; // 100 MB
```

### Ajouter des formats de fichiers
Dans les règles Storage, ajoutez des types MIME :
```javascript
&& (request.resource.contentType.matches('image/.*') 
    || request.resource.contentType.matches('video/.*')
    || request.resource.contentType == 'image/heic')
```

### Modifier l'ordre d'affichage
Dans [photos.html](photos.html), ligne ~209 :
```javascript
.orderBy('timestamp', 'desc') // Du plus récent au plus ancien
// ou
.orderBy('timestamp', 'asc')  // Du plus ancien au plus récent
```

## 🆘 Dépannage

### "Upload failed: Firebase Storage is not configured"
→ Activez Storage dans la console Firebase

### "Permission denied"
→ Vérifiez que les règles Storage et Firestore sont publiées

### "File too large"
→ Le fichier dépasse 100 MB, augmentez la limite ou compressez

### Les médias n'apparaissent pas
→ Vérifiez les règles Firestore pour `mariage-media`
→ Ouvrez la console navigateur (F12) pour voir les erreurs

### Vidéo ne se lit pas
→ Certains formats nécessitent des codecs spécifiques
→ MP4 (H.264) est le plus compatible
