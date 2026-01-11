# Configuration de l'envoi d'email automatique

## 📧 Comment recevoir les confirmations par email

Le système d'envoi d'email utilise **EmailJS**, un service gratuit qui permet d'envoyer des emails directement depuis le navigateur.

---

## 🚀 Configuration en 5 étapes

### Étape 1 : Créer un compte EmailJS

1. Allez sur [EmailJS](https://www.emailjs.com/)
2. Cliquez sur **"Sign Up"** (gratuit jusqu'à 200 emails/mois)
3. Créez votre compte avec votre email

### Étape 2 : Connecter votre service email

1. Une fois connecté, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre fournisseur d'email (Gmail, Outlook, Yahoo, etc.)
4. Suivez les instructions pour connecter votre compte
5. **Notez le Service ID** (par exemple : `service_abc123`)

### Étape 3 : Créer un template d'email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce template pour recevoir les confirmations :

**Sujet :**
```
Nouvelle confirmation mariage - {{from_name}}
```

**Contenu :**
```
Nouvelle confirmation de présence !

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DÉTAILS DE LA CONFIRMATION

• Nom : {{from_name}}
• Date de confirmation : {{confirmation_date}}
• Nombre total d'invités : {{nb_invites}}
• ID de confirmation : {{confirmation_id}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 LISTE DES INVITÉS :

{{guest_list}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MESSAGE :

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cet email a été généré automatiquement par votre site de mariage.
```

4. **Sauvegardez** et notez le **Template ID** (par exemple : `template_xyz789`)

### Étape 4 : Obtenir votre clé publique

1. Allez dans **"Account"** > **"General"**
2. Trouvez votre **Public Key** (par exemple : `ABcd1234efGH5678`)
3. Copiez cette clé

### Étape 5 : Configurer votre site

1. Ouvrez le fichier `script.js`
2. Trouvez la section `// Configuration EmailJS` (lignes 12-17)
3. Remplacez les valeurs :

```javascript
const emailJSConfig = {
    publicKey: "VOTRE_PUBLIC_KEY",      // Coller votre Public Key
    serviceID: "VOTRE_SERVICE_ID",      // Coller votre Service ID
    templateID: "VOTRE_TEMPLATE_ID"     // Coller votre Template ID
};
```

4. Trouvez cette ligne dans la fonction `sendEmailNotification` (ligne 220) :
```javascript
to_email: "votre-email@exemple.com",
```

5. Remplacez par votre vrai email :
```javascript
to_email: "votre.vrai.email@gmail.com",  // VOTRE EMAIL ICI
```

---

## ✅ Test du système

1. Sauvegardez tous vos fichiers
2. Ouvrez votre site dans un navigateur
3. Remplissez le formulaire de confirmation
4. Envoyez une confirmation test
5. Vérifiez votre boîte email (et les spams)

Si tout fonctionne, vous devriez recevoir un email avec tous les détails !

---

## 🔧 Dépannage

### Je ne reçois pas d'email

1. **Vérifiez vos spams** - le premier email peut arriver dans les spams
2. **Vérifiez la console du navigateur** (F12 > Console) pour les erreurs
3. **Vérifiez que les 3 IDs sont corrects** dans `script.js`
4. **Testez sur EmailJS** : allez sur EmailJS > Test your template

### Le formulaire se bloque

- Vérifiez que vous avez bien sauvegardé le Service ID, Template ID et Public Key
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Limite d'emails atteinte

- Le plan gratuit est limité à 200 emails/mois
- Si vous dépassez, passez au plan payant ou créez un nouveau compte

---

## 📱 Que contient l'email que vous recevez ?

Chaque confirmation génère un email avec :
- ✅ Nom et prénom de la personne qui confirme
- ✅ Date et heure de la confirmation
- ✅ Nombre total d'invités
- ✅ Liste détaillée de tous les invités (noms et prénoms)
- ✅ Message personnel (si rempli)
- ✅ ID unique de la confirmation

---

## 💡 Astuces

- **Créez un filtre Gmail** pour que toutes les confirmations arrivent dans un dossier dédié
- **Activez les notifications push** sur votre téléphone pour être alerté immédiatement
- **Gardez EmailJS ouvert** pendant votre mariage pour voir les confirmations en temps réel

---

## 🆓 Coûts

- **EmailJS Plan gratuit** : 200 emails/mois (largement suffisant)
- **Si besoin de plus** : 7$/mois pour 1000 emails

---

Besoin d'aide ? Consultez la [documentation EmailJS](https://www.emailjs.com/docs/)
