# 🔧 Dépannage EmailJS - Configuration du Template

## ⚠️ Problème identifié

Vos emails ne partent pas ? C'est probablement à cause du **template EmailJS** qui n'est pas correctement configuré.

---

## ✅ Configuration OBLIGATOIRE du Template EmailJS

### 1️⃣ Connectez-vous à EmailJS

Allez sur [EmailJS.com](https://www.emailjs.com/) et connectez-vous.

### 2️⃣ Vérifiez votre Service Email

1. Allez dans **"Email Services"**
2. Vérifiez que votre service est **actif** (pastille verte)
3. Notez le **Service ID** (vous l'avez déjà : `service_setrxau`)

### 3️⃣ CONFIGUREZ CORRECTEMENT LE TEMPLATE

C'est l'étape **CRUCIALE** où la plupart des gens se trompent !

1. Allez dans **"Email Templates"**
2. Cliquez sur votre template (ID: `template_2u76yq9`)
3. Cliquez sur **"Edit"** (modifier)

#### Configuration du template :

**IMPORTANT : Dans la section "Settings" du template :**

**To Email :** 
```
{{to_email}}
```
⚠️ **ATTENTION** : Vous devez mettre `{{to_email}}` et PAS votre email directement !

**From Name (optionnel) :**
```
Site Mariage - Nouvelle confirmation
```

**Subject (Sujet) :**
```
Nouvelle confirmation mariage - {{from_name}}
```

**Content (Contenu de l'email) :**
```
Nouvelle confirmation de présence ! 🎉

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

4. **Sauvegardez** le template (bouton "Save")

### 4️⃣ TESTEZ le Template sur EmailJS

1. Restez sur la page du template
2. Cliquez sur **"Test it"** (en haut à droite)
3. Remplissez les champs de test :
   - `to_email` : votre email (elbaylacq@gmail.com)
   - `from_name` : Test Utilisateur
   - `confirmation_date` : 12/01/2026 à 14:30
   - `nb_invites` : 2
   - `guest_list` : 1. Jean Dupont (principal)\\n2. Marie Dupont
   - `message` : Message de test
   - `confirmation_id` : test123
4. Cliquez sur **"Send Test Email"**
5. Vérifiez votre boîte mail (et les spams !)

✅ Si vous recevez le test, le template est bon !

---

## 🔍 Comment tester votre site maintenant

### Ouvrir la Console du navigateur

1. Ouvrez votre site dans Chrome/Edge/Firefox
2. Appuyez sur **F12** pour ouvrir les outils développeur
3. Allez dans l'onglet **"Console"**
4. Laissez la console ouverte

### Faire une confirmation test

1. Cliquez sur "Confirmation"
2. Remplissez le formulaire :
   - Nom : Test
   - Prénom : Utilisateur
   - (Cochez "Je viens accompagné" si besoin)
   - Message : Test
3. Cliquez sur "Confirmer"

### Que voir dans la console ?

Si tout fonctionne, vous devriez voir :

```
=== Début envoi email ===
EmailJS disponible ? true
Config: {publicKey: "JhmDqKBuu5Fng9IuS", serviceID: "service_setrxau", templateID: "template_2u76yq9"}
Données: {id: "...", nom: "Test", prenom: "Utilisateur", ...}
Paramètres email: {to_email: "elbaylacq@gmail.com", from_name: "Utilisateur Test", ...}
✅ Email envoyé avec succès!
Confirmation sauvegardée localement
```

### Si vous voyez des ERREURS

#### Erreur : `EmailJS non disponible`
- Vérifiez votre connexion internet
- Rechargez la page (F5)

#### Erreur : `Error 400 - Template not found`
- Vérifiez que le Template ID est bien `template_2u76yq9`
- Vérifiez que le template existe dans votre compte EmailJS

#### Erreur : `Error 400 - Service not found`
- Vérifiez que le Service ID est bien `service_setrxau`
- Vérifiez que le service est actif dans EmailJS

#### Erreur : `Error 422 - Invalid template`
- Le template n'a pas les bons champs
- Retournez à l'étape 3️⃣ et revérifiez le template

#### Erreur : `Error 401 - Unauthorized`
- Vérifiez votre Public Key : `JhmDqKBuu5Fng9IuS`
- Allez dans Account > General sur EmailJS pour vérifier

---

## 📱 Vérifier que les données sont sauvegardées

### Option 1 : localStorage (si pas de Firebase)

1. Avec la console ouverte (F12)
2. Tapez dans la console :
```javascript
JSON.parse(localStorage.getItem('confirmations'))
```
3. Vous devriez voir toutes les confirmations

### Option 2 : Page admin

1. Ouvrez `admin.html` dans votre navigateur
2. Vous devriez voir toutes les confirmations

---

## 🆘 Problèmes courants

### Les emails n'arrivent toujours pas

1. **Vérifiez vos SPAMS** - Gmail met souvent les premiers emails en spam
2. **Attendez 2-3 minutes** - parfois il y a un délai
3. **Testez avec un autre email** - pour éliminer les filtres Gmail
4. **Vérifiez le quota EmailJS** - 200 emails/mois gratuits (Account > Usage)

### L'admin ne montre rien

- Les données sont dans `localStorage` (stockage local du navigateur)
- Ouvrez `admin.html` **depuis le même navigateur** où vous avez fait les confirmations
- Si vous avez vidé le cache, les données sont perdues

### Sur mobile, ça ne marche pas

- Vérifiez que vous êtes bien connecté à internet
- Essayez en mode navigation privée
- Vérifiez la console sur mobile :
  - Android Chrome : chrome://inspect
  - iOS Safari : Réglages > Safari > Avancé > Inspecteur web

---

## ✅ Checklist finale

- [ ] Service EmailJS actif
- [ ] Template configuré avec `{{to_email}}` dans "To Email"
- [ ] Template testé avec succès sur EmailJS
- [ ] Public Key correcte dans script.js
- [ ] Service ID correct dans script.js
- [ ] Template ID correct dans script.js
- [ ] Email de destination correct dans script.js
- [ ] Console ouverte pour voir les logs
- [ ] Test de confirmation effectué
- [ ] Email reçu (vérifier spams)

---

Besoin d'aide ? Envoyez-moi une capture d'écran de la **Console** (F12) après avoir fait une confirmation !
