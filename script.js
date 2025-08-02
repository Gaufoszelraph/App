// Configuration et données
const APP_CONFIG = {
    admin: {
        username: 'admin',
        password: 'admin123'
    },
    player: {
        username: 'Joueur',
        password: 'player123',
        key: 'nexus2024'
    },
    videos: [
        {
            id: 1,
            title: 'VIDÉO 1',
            url: 'https://example.com/video1.mp4',
            unlocked: false
        },
        {
            id: 2,
            title: 'VIDÉO 2',
            url: 'https://example.com/video2.mp4',
            unlocked: false
        },
        {
            id: 3,
            title: 'VIDÉO 3',
            url: 'https://example.com/video3.mp4',
            unlocked: false
        },
        {
            id: 4,
            title: 'VIDÉO 4',
            url: 'https://example.com/video4.mp4',
            unlocked: false
        }
    ]
};

// État de l'application
let currentUser = null;
let userType = null;

// Navigation entre les pages
function showPage(pageId) {
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Gestion des modales
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fermer les modales en cliquant à l'extérieur
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Authentification Admin
function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    
    if (username === APP_CONFIG.admin.username && password === APP_CONFIG.admin.password) {
        currentUser = username;
        userType = 'admin';
        showPage('admin-panel');
        showNotification('Connexion admin réussie!', 'success');
    } else {
        showNotification('Identifiants admin incorrects!', 'error');
    }
}

// Authentification Joueur
function handlePlayerLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('player-username').value;
    const password = document.getElementById('player-password').value;
    const key = document.getElementById('player-key').value;
    
    if (username === APP_CONFIG.player.username && 
        password === APP_CONFIG.player.password && 
        key === APP_CONFIG.player.key) {
        currentUser = username;
        userType = 'player';
        updateVideosDisplay();
        showPage('videos-page');
        showNotification('Connexion réussie!', 'success');
    } else {
        showNotification('Identifiants incorrects!', 'error');
    }
}

// Déconnexion
function logout() {
    currentUser = null;
    userType = null;
    
    // Réinitialiser les formulaires
    document.getElementById('admin-login-form').reset();
    document.getElementById('player-login-form').reset();
    
    showPage('home-page');
    showNotification('Déconnecté avec succès!', 'info');
}

// Mise à jour de l'affichage des vidéos
function updateVideosDisplay() {
    const videosGrid = document.querySelector('.videos-grid');
    videosGrid.innerHTML = '';
    
    APP_CONFIG.videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = `video-item ${video.unlocked ? 'unlocked' : 'locked'}`;
        videoElement.dataset.video = video.id;
        
        videoElement.innerHTML = `
            <div class="video-preview">
                <div class="lock-icon">${video.unlocked ? '▶️' : '🔒'}</div>
                <h3>${video.title}</h3>
            </div>
        `;
        
        if (video.unlocked) {
            videoElement.onclick = () => playVideo(video);
        }
        
        videosGrid.appendChild(videoElement);
    });
}

// Lecture vidéo
function playVideo(video) {
    if (video.unlocked) {
        showNotification(`Lecture de ${video.title}`, 'info');
        // Ici vous pouvez ajouter la logique pour ouvrir le lecteur vidéo
        // Par exemple: window.open(video.url, '_blank');
    }
}

// Gestion des fonctionnalités admin
function handleChangePassword(event) {
    event.preventDefault();
    const newPassword = event.target.querySelector('input').value;
    APP_CONFIG.player.password = newPassword;
    closeModal('change-password-modal');
    showNotification('Mot de passe joueur modifié!', 'success');
    event.target.reset();
}

function handleAddVideo(event) {
    event.preventDefault();
    const title = event.target.querySelector('input[type="text"]').value;
    const url = event.target.querySelector('input[type="url"]').value;
    
    const newVideo = {
        id: APP_CONFIG.videos.length + 1,
        title: title,
        url: url,
        unlocked: false
    };
    
    APP_CONFIG.videos.push(newVideo);
    updateVideoSelect();
    closeModal('add-video-modal');
    showNotification('Vidéo ajoutée avec succès!', 'success');
    event.target.reset();
}

function handleRemoveVideo(event) {
    event.preventDefault();
    const videoId = parseInt(event.target.querySelector('select').value);
    
    APP_CONFIG.videos = APP_CONFIG.videos.filter(video => video.id !== videoId);
    updateVideoSelect();
    closeModal('remove-video-modal');
    showNotification('Vidéo supprimée!', 'success');
    event.target.reset();
}

function handleSetKey(event) {
    event.preventDefault();
    const newKey = event.target.querySelector('input').value;
    APP_CONFIG.player.key = newKey;
    closeModal('set-key-modal');
    showNotification('Mot clé modifié!', 'success');
    event.target.reset();
}

function handleChangeBackground(event) {
    event.preventDefault();
    const imageUrl = event.target.querySelector('input').value;
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    closeModal('change-background-modal');
    showNotification('Arrière-plan modifié!', 'success');
    event.target.reset();
}

// Mise à jour du select des vidéos
function updateVideoSelect() {
    const select = document.getElementById('video-select');
    select.innerHTML = '<option value="">Sélectionner une vidéo</option>';
    
    APP_CONFIG.videos.forEach(video => {
        const option = document.createElement('option');
        option.value = video.id;
        option.textContent = video.title;
        select.appendChild(option);
    });
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // Couleurs selon le type
    switch(type) {
        case 'success':
            notification.style.background = '#4CAF50';
            break;
        case 'error':
            notification.style.background = '#f44336';
            break;
        case 'warning':
            notification.style.background = '#ff9800';
            break;
        default:
            notification.style.background = '#2196F3';
    }
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners pour les formulaires
    document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
    document.getElementById('player-login-form').addEventListener('submit', handlePlayerLogin);
    
    // Event listeners pour les modales admin
    document.getElementById('change-password-form').addEventListener('submit', handleChangePassword);
    document.getElementById('add-video-form').addEventListener('submit', handleAddVideo);
    document.getElementById('remove-video-form').addEventListener('submit', handleRemoveVideo);
    document.getElementById('set-key-form').addEventListener('submit', handleSetKey);
    document.getElementById('change-background-form').addEventListener('submit', handleChangeBackground);
    
    // Initialiser le select des vidéos
    updateVideoSelect();
    
    // Gestion du clavier (Echap pour fermer les modales)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.style.display = 'none');
        }
    });
    
    console.log('NEXUS CODE - Application initialisée');
    console.log('Identifiants par défaut:');
    console.log('Admin - Username: admin, Password: admin123');
    console.log('Joueur - Username: Joueur, Password: player123, Clé: nexus2024');
});

// Fonctions utilitaires pour déboggage (à retirer en production)
window.unlockAllVideos = function() {
    APP_CONFIG.videos.forEach(video => video.unlocked = true);
    updateVideosDisplay();
    showNotification('Toutes les vidéos déverrouillées!', 'success');
};

window.lockAllVideos = function() {
    APP_CONFIG.videos.forEach(video => video.unlocked = false);
    updateVideosDisplay();
    showNotification('Toutes les vidéos verrouillées!', 'warning');
};

window.getConfig = function() {
    console.log('Configuration actuelle:', APP_CONFIG);
    return APP_CONFIG;
};