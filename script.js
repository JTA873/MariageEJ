// Configuration Firebase
const firebaseConfig = {
    // Remplacez ces valeurs par votre configuration Firebase
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Configuration EmailJS
const emailJSConfig = {
    publicKey: "JhmDqKBuu5Fng9IuS",  // Clé publique de votre compte EmailJS
    serviceID: "service_elkot5q",          // ID du service email (Gmail, etc.)
    templateID: "template_2u76yq9"         // ID du template de l'email
};

// Initialiser EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(emailJSConfig.publicKey);
}

// Initialize Firebase (décommentez quand vous aurez votre config)
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// Variables globales
let confirmations = []; // Pour stockage local si pas de Firebase

// DOM Elements
const confirmBtn = document.getElementById('confirmBtn');
const modal = document.getElementById('confirmModal');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.querySelector('.cancel-btn');
const form = document.getElementById('confirmationForm');
const hasGuestsCheckbox = document.getElementById('hasGuests');
const guestsSection = document.getElementById('guestsSection');
const nbInvitesSelect = document.getElementById('nbInvites');
const additionalGuestsDiv = document.getElementById('additionalGuests');
const successPopup = document.getElementById('successMessage');
const closeSuccessBtn = document.getElementById('closeSuccess');

// Elements pour la modale d'informations
const infoBtn = document.getElementById('infoBtn');
const infoModal = document.getElementById('infoModal');
const infoCloseBtn = document.querySelector('.info-close');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    if (confirmBtn) confirmBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccessPopup);
    if (form) form.addEventListener('submit', handleFormSubmit);
    if (hasGuestsCheckbox) hasGuestsCheckbox.addEventListener('change', handleHasGuestsChange);
    if (nbInvitesSelect) nbInvitesSelect.addEventListener('change', handleGuestNumberChange);
    
    // Event listeners pour la modale d'informations
    infoBtn.addEventListener('click', openInfoModal);
    infoCloseBtn.addEventListener('click', closeInfoModal);
    
    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
        if (event.target === successPopup) {
            closeSuccessPopup();
        }
        if (event.target === infoModal) {
            closeInfoModal();
        }
    });
    
    // Charger les données existantes
    loadConfirmations();
});

// Fonctions du modal
function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
}

function closeSuccessPopup() {
    successPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fonctions pour la modale d'informations
function openInfoModal() {
    infoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeInfoModal() {
    infoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Réinitialiser le formulaire
function resetForm() {
    form.reset();
    additionalGuestsDiv.innerHTML = '';
    guestsSection.style.display = 'none';
}

// Gérer le changement de la checkbox "accompagné"
function handleHasGuestsChange() {
    if (hasGuestsCheckbox.checked) {
        guestsSection.style.display = 'block';
        handleGuestNumberChange();
    } else {
        guestsSection.style.display = 'none';
        additionalGuestsDiv.innerHTML = '';
    }
}

// Gérer le changement du nombre d'invités
function handleGuestNumberChange() {
    const nbInvites = parseInt(nbInvitesSelect.value);
    additionalGuestsDiv.innerHTML = '';
    
    if (nbInvites >= 1) {
        const guestFields = document.createElement('div');
        guestFields.className = 'guest-fields';
        guestFields.innerHTML = `
            <h4>Informations des accompagnants</h4>
            <div id="guestsList"></div>
        `;
        additionalGuestsDiv.appendChild(guestFields);
        
        const guestsList = document.getElementById('guestsList');
        
        for (let i = 1; i <= nbInvites; i++) {
            const guestDiv = document.createElement('div');
            guestDiv.className = 'guest-row';
            guestDiv.innerHTML = `
                <div class="form-group">
                    <label for="guest${i}nom">Nom de l'accompagnant ${i}</label>
                    <input type="text" id="guest${i}nom" name="guest${i}nom" required>
                </div>
                <div class="form-group">
                    <label for="guest${i}prenom">Prénom de l'accompagnant ${i}</label>
                    <input type="text" id="guest${i}prenom" name="guest${i}prenom" required>
                </div>
            `;
            guestsList.appendChild(guestDiv);
        }
    }
}

// Gérer la soumission du formulaire
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Désactiver le bouton et afficher loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    form.classList.add('loading');
    
    try {
        const formData = collectFormData();
        await saveConfirmation(formData);
        
        closeModal();
        showSuccessMessage();
        
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.classList.remove('loading');
    }
}

// Collecter les données du formulaire
function collectFormData() {
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const message = document.getElementById('message').value.trim();
    const hasGuests = document.getElementById('hasGuests').checked;
    
    const invites = [{
        nom: nom,
        prenom: prenom,
        principal: true
    }];
    
    let nbInvites = 1;
    
    // Ajouter les invités supplémentaires si accompagné
    if (hasGuests) {
        const nbGuestsSelect = parseInt(document.getElementById('nbInvites').value);
        nbInvites = 1 + nbGuestsSelect;
        
        for (let i = 1; i <= nbGuestsSelect; i++) {
            const guestNom = document.getElementById(`guest${i}nom`)?.value.trim();
            const guestPrenom = document.getElementById(`guest${i}prenom`)?.value.trim();
            
            if (guestNom && guestPrenom) {
                invites.push({
                    nom: guestNom,
                    prenom: guestPrenom,
                    principal: false
                });
            }
        }
    }
    
    return {
        id: generateId(),
        nom: nom,
        prenom: prenom,
        nbInvites: nbInvites,
        invites: invites,
        message: message,
        dateConfirmation: new Date().toISOString(),
        timestamp: Date.now()
    };
}

// Générer un ID unique
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Envoyer un email de notification
async function sendEmailNotification(data) {
    console.log('=== Début envoi email ===');
    console.log('EmailJS disponible ?', typeof emailjs !== 'undefined');
    console.log('Config:', emailJSConfig);
    console.log('Données:', data);
    
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS non disponible - email non envoyé');
        alert('Erreur: EmailJS n\'est pas chargé. Vérifiez votre connexion internet.');
        return false;
    }
    
    try {
        // Formater la liste des invités
        let guestsDetails = data.invites.map((invite, index) => 
            `${index + 1}. ${invite.prenom} ${invite.nom}${invite.principal ? ' (principal)' : ''}`
        ).join('\n');
        
        // Préparer les paramètres de l'email
        const emailParams = {
            to_email: "elbaylacq@gmail.com",
            from_name: `${data.prenom} ${data.nom}`,
            confirmation_date: new Date(data.dateConfirmation).toLocaleString('fr-FR'),
            nb_invites: data.nbInvites,
            guest_list: guestsDetails,
            message: data.message || 'Aucun message',
            confirmation_id: data.id
        };
        
        console.log('Paramètres email:', emailParams);
        
        // Envoyer l'email
        const response = await emailjs.send(
            emailJSConfig.serviceID,
            emailJSConfig.templateID,
            emailParams
        );
        
        console.log('✅ Email envoyé avec succès!', response);
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
        console.error('Détails:', error.text || error.message);
        // Ne pas bloquer même si l'email échoue
        return false;
    }
}

// Sauvegarder la confirmation
async function saveConfirmation(data) {
    try {
        // Essayer Firebase en premier
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
            await db.collection('confirmations').doc(data.id).set(data);
            console.log('Confirmation sauvegardée dans Firebase');
        } else {
            // Fallback vers localStorage
            confirmations.push(data);
            localStorage.setItem('confirmations', JSON.stringify(confirmations));
            console.log('Confirmation sauvegardée localement');
        }
        
        // Envoyer l'email de notification
        await sendEmailNotification(data);
        
    } catch (error) {
        // Si Firebase échoue, utiliser localStorage
        confirmations.push(data);
        localStorage.setItem('confirmations', JSON.stringify(confirmations));
        console.log('Confirmation sauvegardée localement (fallback)');
        
        // Tenter d'envoyer l'email même en cas d'erreur de sauvegarde
        try {
            await sendEmailNotification(data);
        } catch (emailError) {
            console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        }
    }
}

// Charger les confirmations existantes
function loadConfirmations() {
    try {
        const stored = localStorage.getItem('confirmations');
        if (stored) {
            confirmations = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des confirmations:', error);
        confirmations = [];
    }
}

// Afficher le message de succès
function showSuccessMessage() {
    successPopup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fonctions pour la page admin (à utiliser dans admin.html)
window.AdminFunctions = {
    // Récupérer toutes les confirmations
    async getAllConfirmations() {
        try {
            if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
                const snapshot = await db.collection('confirmations').orderBy('timestamp', 'desc').get();
                return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } else {
                return JSON.parse(localStorage.getItem('confirmations') || '[]')
                    .sort((a, b) => b.timestamp - a.timestamp);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération:', error);
            return JSON.parse(localStorage.getItem('confirmations') || '[]');
        }
    },
    
    // Supprimer une confirmation
    async deleteConfirmation(id) {
        try {
            if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
                await db.collection('confirmations').doc(id).delete();
            } else {
                confirmations = confirmations.filter(conf => conf.id !== id);
                localStorage.setItem('confirmations', JSON.stringify(confirmations));
            }
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            return false;
        }
    },
    
    // Exporter les données en CSV
    exportToCSV(confirmations) {
        const headers = ['Date', 'Nom', 'Prénom', 'Nb Invités', 'Invités', 'Message'];
        const rows = confirmations.map(conf => [
            new Date(conf.dateConfirmation).toLocaleDateString('fr-FR'),
            conf.nom,
            conf.prenom,
            conf.nbInvites,
            conf.invites.map(inv => `${inv.prenom} ${inv.nom}`).join('; '),
            conf.message || ''
        ]);
        
        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
            
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `confirmations_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    }
};

// Fonctions utilitaires pour le debug
window.DebugFunctions = {
    // Ajouter des données de test
    addTestData() {
        const testData = [
            {
                id: 'test1',
                nom: 'Dupont',
                prenom: 'Jean',
                nbInvites: 2,
                invites: [
                    { nom: 'Dupont', prenom: 'Jean', principal: true },
                    { nom: 'Dupont', prenom: 'Marie', principal: false }
                ],
                message: 'Nous avons hâte de célébrer avec vous !',
                dateConfirmation: new Date().toISOString(),
                timestamp: Date.now()
            },
            {
                id: 'test2',
                nom: 'Martin',
                prenom: 'Sophie',
                nbInvites: 1,
                invites: [
                    { nom: 'Martin', prenom: 'Sophie', principal: true }
                ],
                message: '',
                dateConfirmation: new Date().toISOString(),
                timestamp: Date.now() - 3600000
            }
        ];
        
        confirmations.push(...testData);
        localStorage.setItem('confirmations', JSON.stringify(confirmations));
        console.log('Données de test ajoutées');
    },
    
    // Vider toutes les confirmations
    clearAllData() {
        confirmations = [];
        localStorage.removeItem('confirmations');
        console.log('Toutes les données ont été supprimées');
    }
};