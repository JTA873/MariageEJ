/**
 * User Application - Interface de commande mobile
 * Boulangerie PEI
 */

// État de la commande
let currentPage = 1;
const order = {
    client: { prenom: '', nom: '', telephone: '' },
    type: null, // 'menu' ou 'alacarte'
    menu: null,
    plat: null,
    base: null,
    garniture: null,
    dessert: null,
    boisson: null,
    total: 0
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Initialiser la page 1
    currentPage = 1;
    updateUI();
    
    // Attacher les event listeners
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const backBtn = document.querySelector('.back-btn');
    
    if (nextBtn) {
        console.log('Next button found, attaching listener');
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked');
            nextPage();
        });
        
        // Touch events for mobile
        nextBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button touched');
            nextPage();
        });
    } else {
        console.error('Next button not found!');
    }
    
    if (prevBtn) {
        console.log('Previous button found, attaching listener');
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous button clicked');
            previousPage();
        });
        
        prevBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous button touched');
            previousPage();
        });
    } else {
        console.error('Previous button not found!');
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            goBack();
        });
    }
});

// Navigation
function goBack() {
    if (confirm('Voulez-vous vraiment quitter ? Votre commande sera perdue.')) {
        window.location.href = 'index.html';
    }
}

function nextPage() {
    console.log('nextPage called, current page:', currentPage);
    if (!validateCurrentPage()) {
        console.log('Validation failed');
        return;
    }
    
    if (currentPage < 6) {
        currentPage++;
        console.log('Moving to page:', currentPage);
        updateUI();
    } else if (currentPage === 6) {
        validateOrder();
    }
}

function previousPage() {
    console.log('previousPage called, current page:', currentPage);
    if (currentPage > 1) {
        currentPage--;
        console.log('Moving to page:', currentPage);
        updateUI();
    }
}

function goToPage(page) {
    currentPage = page;
    updateUI();
}

// Validation
function validateCurrentPage() {
    switch (currentPage) {
        case 1:
            const prenom = document.getElementById('prenom').value.trim();
            const nom = document.getElementById('nom').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            
            if (!prenom || !nom || !telephone) {
                alert('Veuillez remplir tous les champs');
                return false;
            }
            
            order.client = { prenom, nom, telephone };
            return true;
            
        case 2:
            if (!order.type) {
                alert('Veuillez choisir une formule');
                return false;
            }
            return true;
            
        case 3:
            if (order.type === 'menu' && order.menu.nom.includes('Salade')) {
                if (!order.base || !order.garniture) {
                    alert('Veuillez choisir une base et une garniture');
                    return false;
                }
            } else if (!order.plat) {
                alert('Veuillez choisir un plat');
                return false;
            }
            return true;
            
        case 4:
            if (!order.dessert) {
                alert('Veuillez choisir un dessert');
                return false;
            }
            return true;
            
        case 5:
            if (!order.boisson) {
                alert('Veuillez choisir une boisson');
                return false;
            }
            displaySummary();
            return true;
            
        default:
            return true;
    }
}

// UI Update
function updateUI() {
    console.log('updateUI called for page:', currentPage);
    
    // Cacher toutes les pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const currentPageEl = document.getElementById(`page-${currentPage}`);
    if (currentPageEl) {
        currentPageEl.classList.add('active');
        console.log('Page element found and activated:', `page-${currentPage}`);
    } else {
        console.error('Page element not found:', `page-${currentPage}`);
    }
    
    // Mettre à jour les steps
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentPage) {
            step.classList.add('completed');
        } else if (index + 1 === currentPage) {
            step.classList.add('active');
        }
    });
    
    // Bouton suivant
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        if (currentPage === 6) {
            nextBtn.textContent = 'Valider la commande ✓';
        } else if (currentPage === 7) {
            document.getElementById('bottomActions').style.display = 'none';
        } else {
            nextBtn.textContent = 'Suivant →';
        }
    }
    
    // Afficher/masquer bottom actions
    const bottomActions = document.getElementById('bottomActions');
    if (bottomActions) {
        if (currentPage === 7) {
            bottomActions.style.display = 'none';
        } else {
            bottomActions.style.display = 'flex';
        }
    }
    
    // Gérer le bouton précédent (masquer sur page 1)
    const prevBtnInActions = document.getElementById('prevBtn');
    if (prevBtnInActions) {
        if (currentPage === 1) {
            prevBtnInActions.style.visibility = 'hidden';
        } else {
            prevBtnInActions.style.visibility = 'visible';
        }
    }
    
    // Charger le contenu de la page
    loadPageContent();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function loadPageContent() {
    console.log('loadPageContent for page:', currentPage);
    switch (currentPage) {
        case 2:
            loadMenuCards();
            break;
        case 3:
            loadPlatCards();
            break;
        case 4:
            loadDessertCards();
            break;
        case 5:
            loadBoissonCards();
            break;
    }
}

// Load Menu Cards
function loadMenuCards() {
    const menus = dataManager.getMenus();
    const container = document.getElementById('menuCards');
    
    let html = '';
    
    // Menus standards - uniquement les disponibles
    menus.forEach(menu => {
        // Vérifier la disponibilité (stock)
        if (menu.actif && (menu.stock === null || menu.stock > 0)) {
            html += `
                <div class="card ${order.menu?.id === menu.id ? 'selected' : ''}" 
                     onclick="selectMenu(${menu.id}, 'menu')">
                    <img src="${menu.image}" alt="${menu.nom}" class="card-image">
                    <div class="card-content">
                        <div class="card-title">${menu.nom}</div>
                        <div class="card-price">${menu.prix.toFixed(2)}€</div>
                        <div class="card-description">${menu.description}</div>
                        ${menu.stock !== null && menu.stock <= 5 ? 
                            `<div style="font-size: 0.8em; color: #E67E00; margin-top: 4px;">Plus que ${menu.stock} disponible${menu.stock > 1 ? 's' : ''}</div>` 
                            : ''}
                    </div>
                </div>
            `;
        }
    });
    
    // Option à la carte
    html += `
        <div class="card ${order.type === 'alacarte' ? 'selected' : ''}" 
             onclick="selectMenu(0, 'alacarte')" 
             style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div class="card-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 3em;">
                🍽️
            </div>
            <div class="card-content" style="color: white;">
                <div class="card-title" style="color: white;">À la carte</div>
                <div class="card-price" style="color: white;">Prix variable</div>
                <div class="card-description" style="color: rgba(255,255,255,0.9);">Composez librement</div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function selectMenu(menuId, type) {
    if (type === 'alacarte') {
        order.type = 'alacarte';
        order.menu = { id: 0, nom: 'À la carte', prix: 0 };
    } else {
        order.type = 'menu';
        order.menu = dataManager.getMenus().find(m => m.id === menuId);
    }
    loadMenuCards();
}

// Load Plat Cards
function loadPlatCards() {
    const container = document.getElementById('platCards');
    let html = '';
    
    if (order.menu?.nom.includes('Sandwich') || order.type === 'alacarte') {
        // Sandwichs
        const sandwichs = dataManager.getPlats('sandwich');
        document.getElementById('platSubtitle').textContent = 'Choisissez votre sandwich';
        
        sandwichs.forEach(plat => {
            html += `
                <div class="card ${order.plat?.id === plat.id ? 'selected' : ''}" 
                     onclick="selectPlat(${plat.id})">
                    <img src="${plat.image}" alt="${plat.nom}" class="card-image">
                    <div class="card-content">
                        <div class="card-title">${plat.nom}</div>
                    </div>
                </div>
            `;
        });
    } else if (order.menu?.nom.includes('Salade')) {
        // Salades avec base + garniture
        document.getElementById('platSubtitle').textContent = 'Composez votre salade';
        
        html += '<h3 style="margin: 20px 0 10px; color: #FF6B35;">Base</h3>';
        const bases = dataManager.getPlats('base-salade');
        bases.forEach(base => {
            html += `
                <div class="card ${order.base?.id === base.id ? 'selected' : ''}" 
                     onclick="selectBase(${base.id})">
                    <img src="${base.image}" alt="${base.nom}" class="card-image">
                    <div class="card-content">
                        <div class="card-title">${base.nom}</div>
                    </div>
                </div>
            `;
        });
        
        html += '<h3 style="margin: 20px 0 10px; color: #FF6B35; grid-column: 1 / -1;">Garniture</h3>';
        const garnitures = dataManager.getPlats('garniture-salade');
        garnitures.forEach(garniture => {
            html += `
                <div class="card ${order.garniture?.id === garniture.id ? 'selected' : ''}" 
                     onclick="selectGarniture(${garniture.id})">
                    <img src="${garniture.image}" alt="${garniture.nom}" class="card-image">
                    <div class="card-content">
                        <div class="card-title">${garniture.nom}</div>
                    </div>
                </div>
            `;
        });
    }
    
    container.innerHTML = html;
}

function selectPlat(platId) {
    order.plat = dataManager.getPlats().find(p => p.id === platId);
    loadPlatCards();
}

function selectBase(baseId) {
    order.base = dataManager.getPlats().find(p => p.id === baseId);
    loadPlatCards();
}

function selectGarniture(garnitureId) {
    order.garniture = dataManager.getPlats().find(p => p.id === garnitureId);
    loadPlatCards();
}

// Load Dessert Cards
function loadDessertCards() {
    const desserts = dataManager.getDesserts();
    const container = document.getElementById('dessertCards');
    
    let html = '';
    desserts.forEach(dessert => {
        html += `
            <div class="card ${order.dessert?.id === dessert.id ? 'selected' : ''}" 
                 onclick="selectDessert(${dessert.id})">
                <img src="${dessert.image}" alt="${dessert.nom}" class="card-image">
                <div class="card-content">
                    <div class="card-title">${dessert.nom}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function selectDessert(dessertId) {
    order.dessert = dataManager.getDesserts().find(d => d.id === dessertId);
    loadDessertCards();
}

// Load Boisson Cards
function loadBoissonCards() {
    const boissons = dataManager.getBoissons();
    const container = document.getElementById('boissonCards');
    
    let html = '<h3 style="margin: 0 0 15px; color: #FF6B35; grid-column: 1 / -1;">Boissons standards</h3>';
    
    // Standards
    boissons.filter(b => b.supplement === 0).forEach(boisson => {
        html += `
            <div class="card ${order.boisson?.id === boisson.id ? 'selected' : ''}" 
                 onclick="selectBoisson(${boisson.id})">
                <img src="${boisson.image}" alt="${boisson.nom}" class="card-image">
                <div class="card-content">
                    <div class="card-title">${boisson.nom}</div>
                </div>
            </div>
        `;
    });
    
    html += '<h3 style="margin: 20px 0 15px; color: #FF6B35; grid-column: 1 / -1;">Boissons 50cl (+0,50€)</h3>';
    
    // Avec supplément
    boissons.filter(b => b.supplement > 0).forEach(boisson => {
        html += `
            <div class="card ${order.boisson?.id === boisson.id ? 'selected' : ''}" 
                 onclick="selectBoisson(${boisson.id})">
                <img src="${boisson.image}" alt="${boisson.nom}" class="card-image">
                <div class="card-content">
                    <div class="card-title">${boisson.nom}</div>
                    <div class="card-price">+${boisson.supplement.toFixed(2)}€</div>
                </div>
                <div class="card-badge supplement-badge">+0,50€</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function selectBoisson(boissonId) {
    order.boisson = dataManager.getBoissons().find(b => b.id === boissonId);
    loadBoissonCards();
}

// Display Summary
function displaySummary() {
    const container = document.getElementById('summaryContent');
    
    // Calculer le total
    let total = 0;
    
    if (order.type === 'menu') {
        total = order.menu.prix;
    } else {
        // À la carte : prix individuels (à configurer dans l'admin)
        total = 5 + 3 + 2; // Exemple
    }
    
    if (order.boisson) {
        total += order.boisson.supplement;
    }
    
    order.total = total;
    
    // Générer le HTML
    let html = `
        <div class="summary-item">
            <span class="summary-label">Client</span>
            <span class="summary-value">${order.client.prenom} ${order.client.nom}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Téléphone</span>
            <span class="summary-value">${order.client.telephone}</span>
        </div>
        <div style="height: 20px;"></div>
        <div class="summary-item">
            <span class="summary-label">Formule</span>
            <span class="summary-value">${order.menu.nom}</span>
        </div>
    `;
    
    if (order.plat) {
        html += `
            <div class="summary-item">
                <span class="summary-label">Plat</span>
                <span class="summary-value">${order.plat.nom}</span>
            </div>
        `;
    } else if (order.base && order.garniture) {
        html += `
            <div class="summary-item">
                <span class="summary-label">Salade</span>
                <span class="summary-value">${order.base.nom} + ${order.garniture.nom}</span>
            </div>
        `;
    }
    
    html += `
        <div class="summary-item">
            <span class="summary-label">Dessert</span>
            <span class="summary-value">${order.dessert.nom}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Boisson</span>
            <span class="summary-value">${order.boisson.nom}</span>
        </div>
    `;
    
    if (order.boisson.supplement > 0) {
        html += `
            <div class="summary-item">
                <span class="summary-label">Supplément boisson 50cl</span>
                <span class="summary-value">+${order.boisson.supplement.toFixed(2)}€</span>
            </div>
        `;
    }
    
    html += `
        <div class="summary-total">
            <span>TOTAL</span>
            <span>${total.toFixed(2)}€</span>
        </div>
    `;
    
    container.innerHTML = html;
}

// Validate Order
function validateOrder() {
    document.getElementById('loading').classList.add('active');
    
    // Décrémenter les stocks des produits commandés
    if (order.menu && order.menu.id > 0) {
        dataManager.decrementStock('menus', order.menu.id);
    }
    if (order.plat && order.plat.id) {
        dataManager.decrementStock('plats', order.plat.id);
    }
    if (order.base && order.base.id) {
        dataManager.decrementStock('plats', order.base.id);
    }
    if (order.garniture && order.garniture.id) {
        dataManager.decrementStock('plats', order.garniture.id);
    }
    if (order.dessert && order.dessert.id) {
        dataManager.decrementStock('desserts', order.dessert.id);
    }
    if (order.boisson && order.boisson.id) {
        dataManager.decrementStock('boissons', order.boisson.id);
    }
    
    // Sauvegarder la commande
    const savedOrder = dataManager.addOrder({
        client: order.client,
        type: order.type,
        formule: order.menu.nom,
        plat: order.plat ? order.plat.nom : `${order.base.nom} + ${order.garniture.nom}`,
        dessert: order.dessert.nom,
        boisson: order.boisson.nom,
        total: order.total
    });
    
    // Envoyer l'email
    sendEmailNotification(savedOrder);
    
    // Générer le ticket
    generateTicket(savedOrder);
    
    setTimeout(() => {
        document.getElementById('loading').classList.remove('active');
        goToPage(7);
    }, 1500);
}

// Send Email
function sendEmailNotification(savedOrder) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR');
    const timeStr = now.toLocaleTimeString('fr-FR');
    
    const templateParams = {
        order_number: savedOrder.id.toString().padStart(6, '0'),
        date: dateStr,
        time: timeStr,
        client_nom: order.client.nom.toUpperCase(),
        client_prenom: order.client.prenom,
        client_telephone: order.client.telephone,
        formule: order.menu.nom,
        plat: savedOrder.plat,
        dessert: order.dessert.nom,
        boisson: order.boisson.nom,
        total: order.total.toFixed(2)
    };
    
    emailjs.send('service_of0ird2', 'VOTRE_NOUVEAU_TEMPLATE_ID', templateParams)
        .then(response => {
            console.log('Email envoyé:', response);
        })
        .catch(error => {
            console.error('Erreur email:', error);
        });
}

// Generate Ticket
function generateTicket(savedOrder) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR');
    const timeStr = now.toLocaleTimeString('fr-FR');
    
    const html = `
        <div class="ticket-header">
            <h2>🥖 L'AUTRE BOULANGERIE 🥗</h2>
            <div style="font-size: 0.9em; margin: 5px 0;">Toulouse - 05 61 63 86 77</div>
            <div class="ticket-number">N° ${savedOrder.id.toString().padStart(6, '0')}</div>
            <p>${dateStr} - ${timeStr}</p>
        </div>
        
        <div class="ticket-line">
            <strong>Client:</strong>
            <span>${order.client.prenom} ${order.client.nom}</span>
        </div>
        <div class="ticket-line">
            <strong>Tél:</strong>
            <span>${order.client.telephone}</span>
        </div>
        
        <div style="border-top: 2px solid #ddd; margin: 15px 0;"></div>
        
        <div class="ticket-line">
            <strong>Formule:</strong>
            <span>${order.menu.prix.toFixed(2)}€</span>
        </div>
        <div style="padding-left: 20px; color: #666; font-size: 0.85em;">${order.menu.nom}</div>
        
        <div class="ticket-line" style="margin-top: 10px;">
            <strong>Plat:</strong>
        </div>
        <div style="padding-left: 20px; color: #666;">${savedOrder.plat}</div>
        
        <div class="ticket-line">
            <strong>Dessert:</strong>
        </div>
        <div style="padding-left: 20px; color: #666;">${order.dessert.nom}</div>
        
        <div class="ticket-line">
            <strong>Boisson:</strong>
            <span>${order.boisson.supplement > 0 ? '+' + order.boisson.supplement.toFixed(2) + '€' : ''}</span>
        </div>
        <div style="padding-left: 20px; color: #666;">${order.boisson.nom}</div>
        
        <div style="border-top: 2px solid #333; margin: 15px 0; padding-top: 15px;">
            <div class="ticket-line" style="font-size: 1.2em; font-weight: bold;">
                <strong>TOTAL:</strong>
                <span>${order.total.toFixed(2)}€</span>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 2px solid #333; color: #666; font-size: 0.9em;">
            <p><strong>L'Autre Boulangerie</strong></p>
            <p style="margin-top: 5px;">Rue René Leduc 9, 31500 Toulouse</p>
            <p style="margin-top: 5px;">Tél : 05 61 63 86 77</p>
            <p style="margin-top: 10px;">Merci de votre visite !</p>
            <p style="margin-top: 5px;">À très bientôt 😋</p>
        </div>
    `;
    
    document.getElementById('ticketContent').innerHTML = html;
}

// New Order
function newOrder() {
    if (confirm('Commencer une nouvelle commande ?')) {
        window.location.reload();
    }
}

// INITIALIZATION - Production ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    currentPage = 1;
    updateUI();
    
    // Get buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const backBtn = document.querySelector('.back-btn');
    
    if (!nextBtn) {
        console.error('Next button not found');
        return;
    }
    
    if (!prevBtn) {
        console.error('Previous button not found');
        return;
    }
    
    console.log('Next button found:', nextBtn);
    console.log('Previous button found:', prevBtn);
    
    // Next button - CLICK
    nextBtn.addEventListener('click', function(e) {
        console.log('Next button clicked');
        e.preventDefault();
        e.stopPropagation();
        nextPage();
    });
    
    // Next button - TOUCH
    nextBtn.addEventListener('touchend', function(e) {
        console.log('Next button touched');
        e.preventDefault();
        e.stopPropagation();
        nextPage();
    });
    
    // Previous button - CLICK
    prevBtn.addEventListener('click', function(e) {
        console.log('Previous button clicked');
        e.preventDefault();
        e.stopPropagation();
        previousPage();
    });
    
    // Previous button - TOUCH
    prevBtn.addEventListener('touchend', function(e) {
        console.log('Previous button touched');
        e.preventDefault();
        e.stopPropagation();
        previousPage();
    });
    
    // Back button
    if (backBtn) {
        console.log('Back button found:', backBtn);
        
        backBtn.addEventListener('click', function(e) {
            console.log('Back button clicked');
            e.preventDefault();
            e.stopPropagation();
            goBack();
        });
        
        backBtn.addEventListener('touchend', function(e) {
            console.log('Back button touched');
            e.preventDefault();
            e.stopPropagation();
            goBack();
        });
    }
    
    console.log('Event listeners attached successfully');
});
