/**
 * Admin Application - Interface d'administration
 * Boulangerie PEI
 */

// Vérifier l'authentification
if (!sessionStorage.getItem('admin_auth')) {
    alert('Accès refusé. Veuillez vous connecter.');
    window.location.href = 'index.html';
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadMenus();
    loadStats();
    loadOrders();
    
    // Gestionnaire d'upload d'image
    const imageFileInput = document.getElementById('productImageFile');
    const imageUrlInput = document.getElementById('productImage');
    const imagePreview = document.getElementById('imagePreview');
    
    if (imageFileInput) {
        imageFileInput.addEventListener('change', handleImageUpload);
    }
    
    if (imageUrlInput) {
        imageUrlInput.addEventListener('input', handleImageUrl);
    }
});

// Navigation entre tabs
function showTab(tabName) {
    // Désactiver tous les tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    
    // Activer le tab sélectionné
    event.target.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // Charger les données
    switch(tabName) {
        case 'menus':
            loadMenus();
            break;
        case 'plats':
            loadPlats();
            break;
        case 'desserts':
            loadDesserts();
            break;
        case 'boissons':
            loadBoissons();
            break;
        case 'historique':
            loadStats();
            loadOrders();
            break;
    }
}

// ===== MENUS =====
function loadMenus() {
    const menus = dataManager.getMenus();
    const container = document.getElementById('menusGrid');
    
    let html = '';
    menus.forEach(menu => {
        const stockDisplay = getStockDisplay(menu.stock);
        const isOutOfStock = menu.stock !== null && menu.stock <= 0;
        
        html += `
            <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}">
                <img src="${menu.image}" alt="${menu.nom}">
                <div class="product-card-body">
                    <div class="product-card-title">${menu.nom}</div>
                    <div class="product-card-price">${menu.prix.toFixed(2)}€</div>
                    ${stockDisplay}
                    ${menu.description ? `<p style="font-size: 0.9em; color: #666; margin-bottom: 10px;">${menu.description}</p>` : ''}
                    <div class="product-card-actions">
                        <button class="btn-edit" onclick="editMenu(${menu.id})">✏️ Modifier</button>
                        <button class="btn-delete" onclick="deleteMenu(${menu.id})">🗑️ Supprimer</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p style="text-align: center; color: #999; padding: 40px;">Aucun menu</p>';
}

function showAddMenuModal() {
    document.getElementById('modalTitle').textContent = 'Ajouter un menu';
    document.getElementById('productId').value = '';
    document.getElementById('productCategory').value = 'menu';
    document.getElementById('descriptionGroup').style.display = 'block';
    document.getElementById('categorieGroup').style.display = 'none';
    document.getElementById('supplementGroup').style.display = 'none';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').classList.add('active');
}

function editMenu(id) {
    const menu = dataManager.getMenus().find(m => m.id === id);
    if (!menu) return;
    
    document.getElementById('modalTitle').textContent = 'Modifier le menu';
    document.getElementById('productId').value = menu.id;
    document.getElementById('productCategory').value = 'menu';
    document.getElementById('productNom').value = menu.nom;
    document.getElementById('productPrix').value = menu.prix;
    document.getElementById('productDescription').value = menu.description || '';
    document.getElementById('productImage').value = menu.image;
    document.getElementById('descriptionGroup').style.display = 'block';
    document.getElementById('categorieGroup').style.display = 'none';
    document.getElementById('supplementGroup').style.display = 'none';
    document.getElementById('productModal').classList.add('active');
}

function deleteMenu(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) {
        dataManager.deleteMenu(id);
        loadMenus();
    }
}

// ===== PLATS =====
function loadPlats() {
    const plats = dataManager.getPlats();
    const container = document.getElementById('platsGrid');
    
    let html = '';
    plats.forEach(plat => {
        const categorie = plat.categorie === 'sandwich' ? '🥪 Sandwich' : 
                         plat.categorie === 'base-salade' ? '🥗 Base salade' : 
                         '🍃 Garniture';
        html += `
            <div class="product-card">
                <img src="${plat.image}" alt="${plat.nom}">
                <div class="product-card-body">
                    <div style="font-size: 0.85em; color: #FF6B35; margin-bottom: 5px;">${categorie}</div>
                    <div class="product-card-title">${plat.nom}</div>
                    <div class="product-card-actions">
                        <button class="btn-edit" onclick="editPlat(${plat.id})">✏️ Modifier</button>
                        <button class="btn-delete" onclick="deletePlat(${plat.id})">🗑️ Supprimer</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p style="text-align: center; color: #999; padding: 40px;">Aucun plat</p>';
}

function showAddPlatModal() {
    document.getElementById('modalTitle').textContent = 'Ajouter un plat';
    document.getElementById('productId').value = '';
    document.getElementById('productCategory').value = 'plat';
    document.getElementById('descriptionGroup').style.display = 'none';
    document.getElementById('categorieGroup').style.display = 'block';
    document.getElementById('supplementGroup').style.display = 'none';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').classList.add('active');
}

function editPlat(id) {
    const plat = dataManager.getPlats().find(p => p.id === id);
    if (!plat) return;
    
    document.getElementById('modalTitle').textContent = 'Modifier le plat';
    document.getElementById('productId').value = plat.id;
    document.getElementById('productCategory').value = 'plat';
    document.getElementById('productNom').value = plat.nom;
    document.getElementById('productPrix').value = plat.prix || 0;
    document.getElementById('productCategorie').value = plat.categorie;
    document.getElementById('productImage').value = plat.image;
    document.getElementById('descriptionGroup').style.display = 'none';
    document.getElementById('categorieGroup').style.display = 'block';
    document.getElementById('supplementGroup').style.display = 'none';
    document.getElementById('productModal').classList.add('active');
}

function deletePlat(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
        dataManager.deletePlat(id);
        loadPlats();
    }
}

// ===== DESSERTS =====
function loadDesserts() {
    const desserts = dataManager.getDesserts();
    const container = document.getElementById('dessertsGrid');
    
    let html = '';
    desserts.forEach(dessert => {
        html += `
            <div class="product-card">
                <img src="${dessert.image}" alt="${dessert.nom}">
                <div class="product-card-body">
                    <div class="product-card-title">${dessert.nom}</div>
                    <div class="product-card-actions">
                        <button class="btn-edit" onclick="editDessert(${dessert.id})">✏️ Modifier</button>
                        <button class="btn-delete" onclick="deleteDessert(${dessert.id})">🗑️ Supprimer</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p style="text-align: center; color: #999; padding: 40px;">Aucun dessert</p>';
}

function showAddDessertModal() {
    document.getElementById('modalTitle').textContent = 'Ajouter un dessert';
    document.getElementById('productId').value = '';
    document.getElementById('productCategory').value = 'dessert';
    document.getElementById('descriptionGroup').style.display = 'none';
    document.getElementById('categorieGroup').style.display = 'none';
    document.getElementById('supplementGroup').style.display = 'none';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').classList.add('active');
}

function editDessert(id) {
    const dessert = dataManager.getDesserts().find(d => d.id === id);
    if (!dessert) return;
    
    document.getElementById('modalTitle').textContent = 'Modifier le dessert';
    document.getElementById('productId').value = dessert.id;
    document.getElementById('productCategory').value = 'dessert';
    document.getElementById('productNom').value = dessert.nom;
    document.getElementById('productPrix').value = dessert.prix || 0;
    document.getElementById('productImage').value = dessert.image;
    document.getElementById('descriptionGroup').style.display = 'none';
    document.getElementById('categorieGroup').style.display = 'none';
    document.getElementById('supplementGroup').style.display = 'none';
    document.getElementById('productModal').classList.add('active');
}

function deleteDessert(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce dessert ?')) {
        dataManager.deleteDessert(id);
        loadDesserts();
    }
}

// ===== BOISSONS =====
function loadBoissons() {
    const boissons = dataManager.getBoissons();
    const container = document.getElementById('boissonsGrid');
    
    let html = '';
    boissons.forEach(boisson => {
        html += `
            <div class="product-card">
                <img src="${boisson.image}" alt="${boisson.nom}">
                <div class="product-card-body">
                    <div class="product-card-title">${boisson.nom}</div>
                    ${boisson.supplement > 0 ? `<div class="product-card-price">+${boisson.supplement.toFixed(2)}€</div>` : ''}
                    <div class="product-card-actions">
                        <button class="btn-edit" onclick="editBoisson(${boisson.id})">✏️ Modifier</button>
                        <button class="btn-delete" onclick="deleteBoisson(${boisson.id})">🗑️ Supprimer</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html || '<p style="text-align: center; color: #999; padding: 40px;">Aucune boisson</p>';
}

function showAddBoissonModal() {
    document.getElementById('modalTitle').textContent = 'Ajouter une boisson';
    document.getElementById('productId').value = '';
    document.getElementById('productCategory').value = 'boisson';
    document.getElementById('descriptionGroup').style.display = 'none';
    document.getElementById('categorieGroup').style.display = 'none';
    document.getElementById('supplementGroup').style.display = 'block';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').classList.add('active');
}

function editBoisson(id) {
    const boisson = dataManager.getBoissons().find(b => b.id === id);
    if (!boisson) return;
    
    document.getElementById('modalTitle').textContent = 'Modifier la boisson';
    document.getElementById('productId').value = boisson.id;
    document.getElementById('productCategory').value = 'boisson';
    document.getElementById('productNom').value = boisson.nom;
    document.getElementById('productPrix').value = boisson.prix || 0;
    document.getElementById('productSupplement').value = boisson.supplement || 0;
    document.getElementById('productImage').value = boisson.image;
    document.getElementById('descriptionGroup').style.display = 'none';
    document.getElementById('categorieGroup').style.display = 'none';
    document.getElementById('supplementGroup').style.display = 'block';
    document.getElementById('productModal').classList.add('active');
}

function deleteBoisson(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette boisson ?')) {
        dataManager.deleteBoisson(id);
        loadBoissons();
    }
}

// ===== MODAL & FORM =====
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const category = document.getElementById('productCategory').value;
    const nom = document.getElementById('productNom').value.trim();
    const prix = parseFloat(document.getElementById('productPrix').value) || 0;
    const image = document.getElementById('productImage').value.trim() || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop';
    const stockInput = document.getElementById('productStock').value;
    const stock = stockInput === '' || stockInput === null ? null : parseInt(stockInput);
    
    if (!nom) {
        alert('Le nom est obligatoire');
        return;
    }
    
    const product = { nom, prix, image, stock, actif: true };
    
    // Champs spécifiques
    if (category === 'menu') {
        product.description = document.getElementById('productDescription').value.trim();
    } else if (category === 'plat') {
        product.categorie = document.getElementById('productCategorie').value;
    } else if (category === 'boisson') {
        product.supplement = parseFloat(document.getElementById('productSupplement').value) || 0;
    }
    
    // Ajouter ou modifier
    if (id) {
        product.id = parseInt(id);
        if (category === 'menu') dataManager.updateMenu(product);
        else if (category === 'plat') dataManager.updatePlat(product);
        else if (category === 'dessert') dataManager.updateDessert(product);
        else if (category === 'boisson') dataManager.updateBoisson(product);
    } else {
        if (category === 'menu') dataManager.addMenu(product);
        else if (category === 'plat') dataManager.addPlat(product);
        else if (category === 'dessert') dataManager.addDessert(product);
        else if (category === 'boisson') dataManager.addBoisson(product);
    }
    
    // Recharger l'affichage
    if (category === 'menu') loadMenus();
    else if (category === 'plat') loadPlats();
    else if (category === 'dessert') loadDesserts();
    else if (category === 'boisson') loadBoissons();
    
    closeModal();
}

// ===== HISTORIQUE =====
function loadStats() {
    const stats = dataManager.getStats();
    const container = document.getElementById('statsGrid');
    
    container.innerHTML = `
        <div class="stat-card">
            <h3>${stats.todayOrders}</h3>
            <p>Commandes aujourd'hui</p>
        </div>
        <div class="stat-card">
            <h3>${stats.todayRevenue.toFixed(2)}€</h3>
            <p>Chiffre d'affaires du jour</p>
        </div>
        <div class="stat-card">
            <h3>${stats.totalOrders}</h3>
            <p>Commandes totales</p>
        </div>
        <div class="stat-card">
            <h3>${stats.totalRevenue.toFixed(2)}€</h3>
            <p>Chiffre d'affaires total</p>
        </div>
    `;
}

function loadOrders(filteredOrders = null) {
    const orders = filteredOrders || dataManager.getOrders();
    const container = document.getElementById('ordersTable');
    
    if (orders.length === 0) {
        container.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: #999;">Aucune commande</td></tr>';
        return;
    }
    
    let html = `
        <thead>
            <tr>
                <th>N°</th>
                <th>Date/Heure</th>
                <th>Client</th>
                <th>Téléphone</th>
                <th>Formule</th>
                <th>Détail</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    orders.reverse().forEach(order => {
        const date = new Date(order.timestamp);
        html += `
            <tr>
                <td><strong>#${order.id.toString().padStart(6, '0')}</strong></td>
                <td>${date.toLocaleDateString('fr-FR')}<br>${date.toLocaleTimeString('fr-FR')}</td>
                <td>${order.client.prenom} ${order.client.nom}</td>
                <td>${order.client.telephone}</td>
                <td>${order.formule}</td>
                <td style="font-size: 0.9em; color: #666;">
                    ${order.plat}<br>
                    ${order.dessert}<br>
                    ${order.boisson}
                </td>
                <td><strong>${order.total.toFixed(2)}€</strong></td>
            </tr>
        `;
    });
    
    html += '</tbody>';
    container.innerHTML = html;
}

function filterOrders() {
    const startDate = document.getElementById('filterDateStart').value;
    const endDate = document.getElementById('filterDateEnd').value;
    const search = document.getElementById('filterSearch').value.toLowerCase();
    
    let orders = dataManager.getOrders();
    
    // Filtre par date
    if (startDate) {
        const start = new Date(startDate).getTime();
        orders = orders.filter(o => o.timestamp >= start);
    }
    if (endDate) {
        const end = new Date(endDate).getTime() + 86400000; // +1 jour
        orders = orders.filter(o => o.timestamp < end);
    }
    
    // Filtre par recherche
    if (search) {
        orders = orders.filter(o => {
            return o.client.nom.toLowerCase().includes(search) ||
                   o.client.prenom.toLowerCase().includes(search) ||
                   o.client.telephone.includes(search) ||
                   o.formule.toLowerCase().includes(search);
        });
    }
    
    loadOrders(orders);
}

function resetFilters() {
    document.getElementById('filterDateStart').value = '';
    document.getElementById('filterDateEnd').value = '';
    document.getElementById('filterSearch').value = '';
    loadOrders();
}

function exportOrders() {
    const csv = dataManager.exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const now = new Date();
    const filename = `commandes_${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== PARAMETRES =====
function updateAdminPin() {
    const newPin = document.getElementById('adminPinInput').value.trim();
    
    if (!newPin || newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
        alert('Le code PIN doit contenir exactement 4 chiffres');
        return;
    }
    
    localStorage.setItem('admin_pin', newPin);
    document.getElementById('adminPinInput').value = '';
    alert('Code PIN modifié avec succès');
}

function backupData() {
    const data = dataManager.getAllData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const now = new Date();
    const filename = `backup_${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}.json`;
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Sauvegarde téléchargée avec succès');
}

function confirmResetData() {
    if (confirm('⚠️ ATTENTION : Cette action supprimera toutes les données (produits et commandes). Êtes-vous sûr ?')) {
        if (confirm('Dernière confirmation : toutes les données seront perdues. Continuer ?')) {
            localStorage.removeItem('lautre_boulangerie_data');
            localStorage.removeItem('lautre_boulangerie_orders');
            alert('Données réinitialisées. La page va se recharger.');
            location.reload();
        }
    }
}
// GESTION DES IMAGES
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Vérifier que c'est bien une image
    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image');
        return;
    }

    // Vérifier la taille (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('L\'image est trop volumineuse (max 2MB)');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Image = e.target.result;
        document.getElementById('productImage').value = base64Image;
        showImagePreview(base64Image);
    };
    reader.readAsDataURL(file);
}

function handleImageUrl(event) {
    const url = event.target.value;
    if (url) {
        showImagePreview(url);
    } else {
        document.getElementById('imagePreview').innerHTML = '';
    }
}

function showImagePreview(imageSrc) {
    const preview = document.getElementById('imagePreview');
    if (imageSrc) {
        preview.innerHTML = `
            <img src="${imageSrc}" 
                 style="max-width: 200px; max-height: 120px; object-fit: cover; border-radius: 6px; border: 1px solid #E8E5E1;" 
                 onerror="this.style.display='none'; this.nextSibling.style.display='block';">
            <div style="display: none; color: #C94E3A; font-size: 0.9em; margin-top: 8px;">
                Erreur de chargement de l'image
            </div>
        `;
    } else {
        preview.innerHTML = '';
    }
}

// GESTION DU STOCK
function getStockDisplay(stock) {
    if (stock === null) {
        return '<div style="font-size: 0.85em; color: #6B9D7B; margin-bottom: 8px;">♾️ Stock illimité</div>';
    } else if (stock === 0) {
        return '<div style="font-size: 0.85em; color: #C94E3A; margin-bottom: 8px; font-weight: 600;">❌ Rupture de stock</div>';
    } else if (stock <= 5) {
        return `<div style="font-size: 0.85em; color: #E67E00; margin-bottom: 8px; font-weight: 500;">⚠️ Stock faible: ${stock}</div>`;
    } else {
        return `<div style="font-size: 0.85em; color: #6B9D7B; margin-bottom: 8px;">📦 Stock: ${stock}</div>`;
    }
}
// ===== DECONNEXION =====
function logout() {
    if (confirm('Voulez-vous vous déconnecter ?')) {
        sessionStorage.removeItem('admin_auth');
        window.location.href = 'index.html';
    }
}
