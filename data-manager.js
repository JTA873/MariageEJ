/**
 * Data Manager - Gestion centralisée des données avec localStorage
 * Boulangerie PEI - Système de commande
 */

class DataManager {
    constructor() {
        this.STORAGE_KEY = 'lautre_boulangerie_data';
        this.ORDERS_KEY = 'lautre_boulangerie_orders';
        this.init();
    }

    // Initialisation avec données par défaut
    init() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            const defaultData = {
                menus: [
                    {
                        id: 1,
                        nom: 'Menu Sandwich',
                        prix: 9.10,
                        description: 'Sandwich + Dessert + Boisson',
                        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
                        actif: true
                    },
                    {
                        id: 2,
                        nom: 'Menu Petite Salade',
                        prix: 7.50,
                        description: 'Salade 500ml + Dessert + Boisson',
                        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
                        actif: true
                    },
                    {
                        id: 3,
                        nom: 'Menu Grande Salade',
                        prix: 10.50,
                        description: 'Salade 1000ml + Dessert + Boisson',
                        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
                        actif: true
                    }
                ],
                plats: [
                    // Sandwichs
                    { id: 1, nom: 'Poulet Mayonnaise', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 2, nom: 'Poulet Curry', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 3, nom: 'Poulet Oignons Frits Sauce Blanche', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 4, nom: 'Jambon Emmental', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 5, nom: 'Rôti de Porc Cornichon', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 6, nom: 'Chèvre Miel Noix', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 7, nom: 'Magret Roquefort', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 8, nom: 'Aubergine Grillée Concassée de Poivrons Féta', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 9, nom: 'Bacon Cheddar Oignons Frits', categorie: 'sandwich', prix: 0, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', stock: null, actif: true },
                    // Bases salades
                    { id: 10, nom: 'Semoule', categorie: 'base-salade', prix: 0, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 11, nom: 'Lentilles', categorie: 'base-salade', prix: 0, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop', stock: null, actif: true },
                    // Garnitures salades
                    { id: 12, nom: 'Poulet', categorie: 'garniture-salade', prix: 0, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 13, nom: 'Jambon Emmental', categorie: 'garniture-salade', prix: 0, image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 14, nom: 'Légumes (Aubergines, Poivrons Marinés) Mozzarella', categorie: 'garniture-salade', prix: 0, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop', stock: null, actif: true }
                ],
                desserts: [
                    { id: 1, nom: 'Fromage Blanc Nature', prix: 0, image: 'https://images.unsplash.com/photo-1567522881931-aa8d8f7ed83b?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 2, nom: 'Fromage Blanc Fruits Rouges', prix: 0, image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 3, nom: 'Fromage Blanc Crème de Marrons', prix: 0, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 4, nom: 'Fromage Blanc Banane', prix: 0, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 5, nom: 'Salade de Fruits', prix: 0, image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 6, nom: 'Compote de Pomme', prix: 0, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 7, nom: 'Tiramisu Caramel Spéculoos', prix: 0, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 8, nom: 'Mousse au Chocolat', prix: 0, image: 'https://images.unsplash.com/photo-1578775887804-699de7086ffb?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 9, nom: 'Tartelette Pommes', prix: 0, image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 10, nom: 'Tartelette Framboises', prix: 0, image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 11, nom: 'Tartelette Citron', prix: 0, image: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 12, nom: 'Tartelette Citron Meringuée', prix: 0, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 13, nom: 'Banofee', prix: 0, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 14, nom: 'Gâteau Basque', prix: 0, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 15, nom: 'Éclair Café', prix: 0, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 16, nom: 'Éclair Chocolat', prix: 0, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 17, nom: 'Flan Pâtissier', prix: 0, image: 'https://images.unsplash.com/photo-1587241321921-91ffe5bd2752?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 18, nom: 'Part de Frangipane', prix: 0, image: 'https://images.unsplash.com/photo-1612182062631-88c9ef8646e2?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 19, nom: 'Brownie Chocolat', prix: 0, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 20, nom: 'Brownie Chocolat et Noix', prix: 0, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 21, nom: 'Beignet Chocolat', prix: 0, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 22, nom: 'Beignet Framboise', prix: 0, image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 23, nom: 'Beignet Crème Pâtissière', prix: 0, image: 'https://images.unsplash.com/photo-1549312406-b1eb7e6fda7a?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 24, nom: 'Beignet Pomme', prix: 0, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', stock: null, actif: true }
                ],
                boissons: [
                    // Standards
                    { id: 1, nom: 'Eau Plate', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 2, nom: 'Eau Gazeuse', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1563263266-27e74ffe8e47?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 3, nom: 'Coca Cola', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 4, nom: 'Coca Zéro', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 5, nom: 'Coca Cherry', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1610873167013-6d4de06e8a55?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 6, nom: 'Orangina', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 7, nom: 'Fuzetea Pêche', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 8, nom: 'Fuzetea Citron Vert', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 9, nom: 'Minute Maid Pomme', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 10, nom: 'Minute Maid Orange', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 11, nom: 'Pulco Citronnade', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9f?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 12, nom: 'Tropicana Orange', prix: 0, supplement: 0, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop', stock: null, actif: true },
                    // 50cl avec supplément
                    { id: 13, nom: 'Coca 50cl', prix: 0, supplement: 0.50, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 14, nom: 'Coca Zéro 50cl', prix: 0, supplement: 0.50, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 15, nom: 'Coca Cherry 50cl', prix: 0, supplement: 0.50, image: 'https://images.unsplash.com/photo-1610873167013-6d4de06e8a55?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 16, nom: 'Fanta Orange 50cl', prix: 0, supplement: 0.50, image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 17, nom: 'Fuzetea Pêche 50cl', prix: 0, supplement: 0.50, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop', stock: null, actif: true },
                    { id: 18, nom: 'Fuzetea Citron Vert 50cl', prix: 0, supplement: 0.50, image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop', stock: null, actif: true }
                ]
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultData));
        }

        if (!localStorage.getItem(this.ORDERS_KEY)) {
            localStorage.setItem(this.ORDERS_KEY, JSON.stringify([]));
        }
    }

    // Récupérer toutes les données
    getAllData() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    }

    // Sauvegarder toutes les données
    saveAllData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    // MENUS
    getMenus() {
        return this.getAllData().menus.filter(m => m.actif);
    }

    getAllMenus() {
        return this.getAllData().menus;
    }

    addMenu(menu) {
        const data = this.getAllData();
        menu.id = Math.max(...data.menus.map(m => m.id), 0) + 1;
        menu.actif = true;
        data.menus.push(menu);
        this.saveAllData(data);
        return menu;
    }

    updateMenu(id, updatedMenu) {
        const data = this.getAllData();
        const index = data.menus.findIndex(m => m.id === id);
        if (index !== -1) {
            data.menus[index] = { ...data.menus[index], ...updatedMenu };
            this.saveAllData(data);
            return data.menus[index];
        }
        return null;
    }

    deleteMenu(id) {
        const data = this.getAllData();
        const index = data.menus.findIndex(m => m.id === id);
        if (index !== -1) {
            data.menus[index].actif = false;
            this.saveAllData(data);
            return true;
        }
        return false;
    }

    // PLATS
    getPlats(categorie = null) {
        const plats = this.getAllData().plats.filter(p => p.actif);
        return categorie ? plats.filter(p => p.categorie === categorie) : plats;
    }

    getAllPlats() {
        return this.getAllData().plats;
    }

    addPlat(plat) {
        const data = this.getAllData();
        plat.id = Math.max(...data.plats.map(p => p.id), 0) + 1;
        plat.actif = true;
        data.plats.push(plat);
        this.saveAllData(data);
        return plat;
    }

    updatePlat(id, updatedPlat) {
        const data = this.getAllData();
        const index = data.plats.findIndex(p => p.id === id);
        if (index !== -1) {
            data.plats[index] = { ...data.plats[index], ...updatedPlat };
            this.saveAllData(data);
            return data.plats[index];
        }
        return null;
    }

    deletePlat(id) {
        const data = this.getAllData();
        const index = data.plats.findIndex(p => p.id === id);
        if (index !== -1) {
            data.plats[index].actif = false;
            this.saveAllData(data);
            return true;
        }
        return false;
    }

    // DESSERTS
    getDesserts() {
        return this.getAllData().desserts.filter(d => d.actif);
    }

    getAllDesserts() {
        return this.getAllData().desserts;
    }

    addDessert(dessert) {
        const data = this.getAllData();
        dessert.id = Math.max(...data.desserts.map(d => d.id), 0) + 1;
        dessert.actif = true;
        data.desserts.push(dessert);
        this.saveAllData(data);
        return dessert;
    }

    updateDessert(id, updatedDessert) {
        const data = this.getAllData();
        const index = data.desserts.findIndex(d => d.id === id);
        if (index !== -1) {
            data.desserts[index] = { ...data.desserts[index], ...updatedDessert };
            this.saveAllData(data);
            return data.desserts[index];
        }
        return null;
    }

    deleteDessert(id) {
        const data = this.getAllData();
        const index = data.desserts.findIndex(d => d.id === id);
        if (index !== -1) {
            data.desserts[index].actif = false;
            this.saveAllData(data);
            return true;
        }
        return false;
    }

    // BOISSONS
    getBoissons() {
        return this.getAllData().boissons.filter(b => b.actif);
    }

    getAllBoissons() {
        return this.getAllData().boissons;
    }

    addBoisson(boisson) {
        const data = this.getAllData();
        boisson.id = Math.max(...data.boissons.map(b => b.id), 0) + 1;
        boisson.actif = true;
        data.boissons.push(boisson);
        this.saveAllData(data);
        return boisson;
    }

    updateBoisson(id, updatedBoisson) {
        const data = this.getAllData();
        const index = data.boissons.findIndex(b => b.id === id);
        if (index !== -1) {
            data.boissons[index] = { ...data.boissons[index], ...updatedBoisson };
            this.saveAllData(data);
            return data.boissons[index];
        }
        return null;
    }

    deleteBoisson(id) {
        const data = this.getAllData();
        const index = data.boissons.findIndex(b => b.id === id);
        if (index !== -1) {
            data.boissons[index].actif = false;
            this.saveAllData(data);
            return true;
        }
        return false;
    }

    // COMMANDES
    getOrders() {
        return JSON.parse(localStorage.getItem(this.ORDERS_KEY));
    }

    addOrder(order) {
        const orders = this.getOrders();
        order.id = Math.max(...orders.map(o => o.id), 0) + 1;
        order.timestamp = new Date().toISOString();
        orders.push(order);
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
        return order;
    }

    getOrderById(id) {
        const orders = this.getOrders();
        return orders.find(o => o.id === id);
    }

    getOrdersByDate(startDate, endDate) {
        const orders = this.getOrders();
        return orders.filter(o => {
            const orderDate = new Date(o.timestamp);
            return orderDate >= startDate && orderDate <= endDate;
        });
    }

    getTodayOrders() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.getOrdersByDate(today, tomorrow);
    }

    // Statistiques
    getStats() {
        const orders = this.getOrders();
        const today = this.getTodayOrders();
        
        return {
            totalOrders: orders.length,
            todayOrders: today.length,
            totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
            todayRevenue: today.reduce((sum, o) => sum + (o.total || 0), 0)
        };
    }

    // Export CSV
    exportToCSV() {
        const orders = this.getOrders();
        let csv = 'ID,Date,Heure,Client,Téléphone,Formule,Plat,Dessert,Boisson,Total\n';
        
        orders.forEach(o => {
            const date = new Date(o.timestamp);
            csv += `${o.id},${date.toLocaleDateString('fr-FR')},${date.toLocaleTimeString('fr-FR')},`;
            csv += `"${o.client.prenom} ${o.client.nom}",${o.client.telephone},`;
            csv += `"${o.formule || 'À la carte'}","${o.plat}","${o.dessert}","${o.boisson}",${o.total}\n`;
        });
        
        return csv;
    }

    // Réinitialisation
    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.ORDERS_KEY);
        this.init();
    }

    // GESTION DU STOCK
    // Décrémenter le stock d'un produit
    decrementStock(category, id, quantity = 1) {
        const data = this.getAllData();
        const items = data[category];
        const item = items.find(i => i.id === id);
        
        if (item && item.stock !== null && item.stock > 0) {
            item.stock = Math.max(0, item.stock - quantity);
            this.saveData(data);
            return true;
        }
        return false;
    }

    // Vérifier si un produit est disponible
    isAvailable(category, id) {
        const data = this.getAllData();
        const items = data[category];
        const item = items.find(i => i.id === id);
        
        return item && item.actif && (item.stock === null || item.stock > 0);
    }

    // Mettre à jour le stock d'un produit
    updateStock(category, id, newStock) {
        const data = this.getAllData();
        const items = data[category];
        const item = items.find(i => i.id === id);
        
        if (item) {
            item.stock = newStock === '' || newStock === null ? null : parseInt(newStock);
            this.saveData(data);
            return true;
        }
        return false;
    }

    // Obtenir les produits en rupture de stock
    getOutOfStockItems() {
        const data = this.getAllData();
        const outOfStock = [];
        
        ['menus', 'plats', 'desserts', 'boissons'].forEach(category => {
            data[category].forEach(item => {
                if (item.stock !== null && item.stock <= 0) {
                    outOfStock.push({ category, ...item });
                }
            });
        });
        
        return outOfStock;
    }
}

// Instance globale
const dataManager = new DataManager();
