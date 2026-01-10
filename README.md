# Site de Confirmation d'Événement

Un site web simple et responsive pour gérer les confirmations de présence à un événement, avec interface d'administration intégrée.

## 🚀 Fonctionnalités

### Page principale (index.html)
- ✅ Design responsive adapté mobile
- ✅ Bouton de confirmation élégant
- ✅ Pop-up formulaire avec :
  - Nom et prénom obligatoires
  - Sélection nombre d'invités (1-10)
  - Champs dynamiques pour invités supplémentaires
  - Message optionnel
- ✅ Intégration Firebase (optionnelle)
- ✅ Fallback localStorage si Firebase indisponible
- ✅ Animation et feedback utilisateur

### Page admin (admin.html)
- ✅ Tableau de bord avec statistiques
- ✅ Liste complète des confirmations
- ✅ Export CSV des données
- ✅ Suppression individuelle ou globale
- ✅ Données de test pour développement
- ✅ Interface responsive

## 📱 Hébergement sur GitHub Pages

1. **Créer un nouveau repository sur GitHub**
2. **Upload des fichiers :**
   - `index.html`
   - `style.css`
   - `script.js`
   - `admin.html`
   - `Attachment-1.jpeg`

3. **Activer GitHub Pages :**
   - Aller dans Settings → Pages
   - Source : Deploy from a branch
   - Branch : main / master
   - Folder : / (root)

4. **Votre site sera accessible à :**
   ```
   https://[username].github.io/[repository-name]/
   ```

## 🔥 Configuration Firebase (Optionnelle)

1. **Créer un projet Firebase :**
   - Aller sur [Firebase Console](https://console.firebase.google.com/)
   - Créer nouveau projet
   - Ajouter une app Web

2. **Configurer Firestore :**
   - Activer Cloud Firestore
   - Règles de sécurité (pour développement) :
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

3. **Mettre à jour script.js :**
   ```javascript
   const firebaseConfig = {
     apiKey: "votre-api-key",
     authDomain: "votre-projet.firebaseapp.com",
     projectId: "votre-projet-id",
     storageBucket: "votre-projet.appspot.com",
     messagingSenderId: "123456789",
     appId: "votre-app-id"
   };
   
   // Décommenter ces lignes :
   firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore();
   ```

## 💾 Stockage des Données

### Avec Firebase
- Données stockées dans Firestore
- Collection : `confirmations`
- Synchronisation temps réel
- Persistance cross-device

### Sans Firebase (Fallback)
- Stockage local (localStorage)
- Données persistantes par navigateur
- Fonctionnement hors-ligne
- Export CSV disponible

## 📊 Structure des Données

```javascript
{
  id: "unique-id",
  nom: "Nom principal",
  prenom: "Prénom principal", 
  nbInvites: 3,
  invites: [
    { nom: "Nom1", prenom: "Prénom1", principal: true },
    { nom: "Nom2", prenom: "Prénom2", principal: false },
    { nom: "Nom3", prenom: "Prénom3", principal: false }
  ],
  message: "Message optionnel",
  dateConfirmation: "2026-01-11T...",
  timestamp: 1704982800000
}
```

## 🛠️ Personnalisation

### Modifier les détails de l'événement
Dans `index.html`, section `.event-details` :
```html
<div class="detail-item">
    <span class="detail-label">📅 Date :</span>
    <span class="detail-value">15 Juin 2026</span>
</div>
```

### Changer les couleurs
Dans `style.css`, modifier les variables :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Ajuster le nombre max d'invités
Dans `index.html`, modifier le select `#nbInvites`

## 📋 Pages et Accès

- **Page principale :** `/index.html` (racine du site)
- **Page admin :** `/admin.html`
- **Protection admin :** Aucune (ajouter authentification si nécessaire)

## 🔧 Développement Local

1. Cloner/télécharger les fichiers
2. Ouvrir `index.html` dans un navigateur
3. Pour tests : utiliser "Données de test" dans admin
4. Pour Firebase : configurer selon instructions ci-dessus

## 🎨 Responsive Design

- ✅ Mobile-first approach
- ✅ Breakpoints : 768px, 480px
- ✅ Touch-friendly interfaces
- ✅ Optimisé pour iOS/Android

## 🚨 Production Ready

- ✅ Gestion d'erreurs
- ✅ Validation côté client
- ✅ Feedback utilisateur
- ✅ Fallback localStorage
- ✅ Export des données
- ✅ Interface admin complète

## 📞 Support

Pour toute question ou personnalisation supplémentaire, n'hésitez pas à demander de l'aide !