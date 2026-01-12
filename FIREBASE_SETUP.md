# 🔥 Configuration Firebase pour le site de mariage

## 📋 Étapes de configuration

### 1️⃣ Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur **"Ajouter un projet"**
3. Nom du projet : `mariage-[votre-nom]`
4. Désactivez Google Analytics (pas nécessaire)
5. Créez le projet

---

### 2️⃣ Créer une application Web

1. Dans votre projet Firebase, cliquez sur l'icône **Web** `</>`
2. Nom de l'app : `Site Mariage`
3. **Ne cochez PAS** "Firebase Hosting"
4. Cliquez sur **"Enregistrer l'application"**

Firebase vous donnera une configuration comme ceci :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "mariage-xxxxx.firebaseapp.com",
  projectId: "mariage-xxxxx",
  storageBucket: "mariage-xxxxx.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxx"
};
```

📝 **COPIEZ cette configuration, vous en aurez besoin !**

---

### 3️⃣ Activer Firestore Database

1. Dans le menu de gauche, cliquez sur **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez le mode :
   - **Mode test** (pour commencer) : Les données sont accessibles pendant 30 jours
   - Ou **Mode production** : Utilisez les règles fournies ci-dessous
4. Sélectionnez une région : **europe-west1** (Belgique) ou **europe-west9** (Paris)
5. Cliquez sur **"Activer"**

---

### 4️⃣ Configurer les règles de sécurité Firestore

1. Dans Firestore Database, allez dans l'onglet **"Règles"**
2. Remplacez les règles par celles-ci :

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Collection des confirmations
    match /confirmations/{confirmationId} {
      // Tout le monde peut créer une confirmation
      allow create: if true;
      
      // Seuls les admins peuvent lire, modifier ou supprimer
      // Pour l'instant, on laisse en lecture publique pour l'admin
      allow read: if true;
      allow update, delete: if false;
    }
  }
}
```

3. Cliquez sur **"Publier"**

**Note :** Ces règles permettent à tout le monde de créer des confirmations et de les lire, mais empêchent la modification ou suppression. Pour plus de sécurité, vous pouvez ajouter une authentification admin plus tard.

---

### 5️⃣ Initialiser la collection Firestore

La collection `confirmations` sera créée automatiquement lors de la première confirmation. Mais vous pouvez la créer manuellement :

1. Dans Firestore Database, cliquez sur **"Démarrer une collection"**
2. ID de collection : `confirmations`
3. Ajoutez un document de test :
   - ID du document : `test`
   - Champs :
     ```
     nom: "Test"
     prenom: "Utilisateur"
     nbInvites: 1
     dateConfirmation: (timestamp actuel)
     ```
4. Cliquez sur **"Enregistrer"**
5. Vous pouvez ensuite supprimer ce document de test

---

### 6️⃣ Configurer votre site

1. Ouvrez le fichier `script.js`
2. Remplacez les lignes 2-9 avec VOTRE configuration Firebase :

```javascript
const firebaseConfig = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "VOTRE_AUTH_DOMAIN",
    projectId: "VOTRE_PROJECT_ID",
    storageBucket: "VOTRE_STORAGE_BUCKET",
    messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
    appId: "VOTRE_APP_ID"
};
```

3. Décommentez les lignes 24-25 :

```javascript
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

4. Sauvegardez le fichier

---

### 7️⃣ Tester la configuration

1. Ouvrez votre site
2. Appuyez sur **F12** → Console
3. Faites une confirmation test
4. Dans la console, vous devriez voir : `Confirmation sauvegardée dans Firebase`
5. Allez dans Firebase Console → Firestore Database
6. Vous devriez voir votre confirmation dans la collection `confirmations` !

---

### 8️⃣ Accéder à l'admin

1. Ouvrez `admin.html` dans votre navigateur
2. Vous devriez voir toutes les confirmations
3. L'admin fonctionne depuis n'importe quel navigateur/appareil

---

## 🔐 Règles de sécurité avancées (optionnel)

Si vous voulez protéger l'accès à l'admin avec un mot de passe, voici des règles plus strictes :

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    match /confirmations/{confirmationId} {
      // Tout le monde peut créer
      allow create: if true;
      
      // Personne ne peut lire, modifier ou supprimer
      // (vous devrez ajouter une authentification pour l'admin)
      allow read, update, delete: if false;
    }
  }
}
```

Pour ajouter une vraie authentification admin, il faudrait utiliser Firebase Authentication.

---

## 📊 Structure des données

Chaque confirmation dans Firestore a cette structure :

```javascript
{
  id: "abc123def456",
  nom: "Dupont",
  prenom: "Jean",
  nbInvites: 2,
  invites: [
    { nom: "Dupont", prenom: "Jean", principal: true },
    { nom: "Dupont", prenom: "Marie", principal: false }
  ],
  message: "Hâte d'y être !",
  dateConfirmation: "2026-01-12T14:30:00.000Z",
  timestamp: 1736692200000
}
```

---

## ✅ Checklist finale

- [ ] Projet Firebase créé
- [ ] Application Web configurée
- [ ] Firestore Database activé
- [ ] Règles de sécurité configurées
- [ ] Configuration copiée dans `script.js`
- [ ] Lignes décommentées dans `script.js`
- [ ] Test de confirmation effectué
- [ ] Données visibles dans Firestore Console
- [ ] Admin fonctionnel

---

## 🆘 Problèmes courants

### Erreur : "Missing or insufficient permissions"
- Vérifiez que les règles Firestore autorisent la création (`allow create: if true`)

### Erreur : "Firebase is not defined"
- Vérifiez que les scripts Firebase sont bien chargés dans les HTML
- Vérifiez que `firebase.initializeApp()` est décommenté

### Les données n'apparaissent pas dans l'admin
- Ouvrez la console (F12) et cherchez les erreurs
- Vérifiez que les règles autorisent la lecture (`allow read: if true`)

### L'admin ne charge pas les données Firebase
- Vérifiez que `admin.html` a bien le script Firebase
- Ouvrez la console pour voir les erreurs

---

## 💡 Après la configuration

Une fois Firebase configuré, vous aurez :

✅ Toutes les confirmations sauvegardées dans le cloud
✅ Accès à l'admin depuis n'importe où
✅ Sauvegarde automatique
✅ Données persistantes (ne disparaissent pas si le cache est vidé)
✅ EmailJS + Firebase = système complet et professionnel

---

Besoin d'aide ? Contactez le support Firebase : [https://firebase.google.com/support](https://firebase.google.com/support)
