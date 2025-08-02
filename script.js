// Application State
let currentUser = null;
let currentUserType = null;
let videos = [];
let unlockedVideos = [];
let appData = {
    passwords: {
        admin: 'admin12',
        joueur: 'joueur123'
    },
    backgroundImage: null,
    ambientSound: null
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setTimeout(() => {
        hideScreen('loading-screen');
        showScreen('welcome-screen');
    }, 2000);
});

// Data persistence functions
function saveData() {
    localStorage.setItem('eliasDechlapp_videos', JSON.stringify(videos));
    localStorage.setItem('eliasDechlapp_unlocked', JSON.stringify(unlockedVideos));
    localStorage.setItem('eliasDechlapp_data', JSON.stringify(appData));
}

function loadData() {
    const savedVideos = localStorage.getItem('eliasDechlapp_videos');
    const savedUnlocked = localStorage.getItem('eliasDechlapp_unlocked');
    const savedData = localStorage.getItem('eliasDechlapp_data');
    
    if (savedVideos) {
        videos = JSON.parse(savedVideos);
    } else {
        // Initialize with demo videos
        videos = [
            {
                id: 1,
                name: 'Vidéo d\'introduction',
                url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                keyword: 'debut',
                ambientSound: null,
                description: 'La première vidéo de l\'escape game'
            }
        ];
    }
    
    if (savedUnlocked) {
        unlockedVideos = JSON.parse(savedUnlocked);
    }
    
    if (savedData) {
        appData = { ...appData, ...JSON.parse(savedData) };
    }
    
    // Apply saved background
    if (appData.backgroundImage) {
        document.body.style.backgroundImage = `url(${appData.backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    }
}

// Screen management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function hideScreen(screenId) {
    document.getElementById(screenId).classList.remove('active');
}

function showWelcome() {
    showScreen('welcome-screen');
    currentUser = null;
    currentUserType = null;
}

// Authentication
function showLogin(userType) {
    currentUserType = userType;
    const usernameField = document.getElementById('username');
    const keywordGroup = document.getElementById('keyword-group');
    const loginTitle = document.getElementById('login-title');
    
    if (userType === 'admin') {
        usernameField.value = 'Admin';
        keywordGroup.style.display = 'none';
        loginTitle.textContent = 'Connexion Admin';
    } else {
        usernameField.value = 'Joueur';
        keywordGroup.style.display = 'block';
        loginTitle.textContent = 'Connexion Joueur';
    }
    
    document.getElementById('password').value = '';
    document.getElementById('keyword').value = '';
    hideError('login-error');
    showScreen('login-screen');
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const keyword = document.getElementById('keyword').value;
    
    if (currentUserType === 'admin') {
        if (password === appData.passwords.admin) {
            currentUser = 'Admin';
            showAdminInterface();
        } else {
            showError('login-error', 'Mot de passe admin incorrect');
        }
    } else {
        if (password === appData.passwords.joueur) {
            currentUser = 'Joueur';
            
            // Check keyword if provided
            if (keyword) {
                checkKeywordOnLogin(keyword);
            }
            
            showPlayerInterface();
        } else {
            showError('login-error', 'Mot de passe joueur incorrect');
        }
    }
});

function checkKeywordOnLogin(keyword) {
    const video = videos.find(v => v.keyword.toLowerCase() === keyword.toLowerCase());
    if (video && !unlockedVideos.includes(video.id)) {
        unlockedVideos.push(video.id);
        saveData();
        showToast(`Vidéo "${video.name}" débloquée !`, 'success');
    }
}

function logout() {
    currentUser = null;
    currentUserType = null;
    showWelcome();
}

// Player Interface
function showPlayerInterface() {
    renderVideosList();
    showScreen('player-screen');
}

function renderVideosList() {
    const videosList = document.getElementById('videos-list');
    videosList.innerHTML = '';
    
    videos.forEach(video => {
        const isUnlocked = unlockedVideos.includes(video.id);
        const videoCard = document.createElement('div');
        videoCard.className = `video-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        if (isUnlocked) {
            videoCard.onclick = () => playVideo(video);
        }
        
        videoCard.innerHTML = `
            <div class="video-status ${isUnlocked ? 'unlocked' : 'locked'}">
                ${isUnlocked ? 'Débloquée' : 'Verrouillée'}
            </div>
            <h4 class="video-title">${video.name}</h4>
            <p class="video-description">${video.description || 'Trouvez le bon mot-clé pour débloquer cette vidéo'}</p>
            ${isUnlocked ? '<p style="color: var(--success-color);">🎬 Cliquez pour lire</p>' : '<p style="color: var(--error-color);">🔒 Mot-clé requis</p>'}
        `;
        
        videosList.appendChild(videoCard);
    });
}

function checkKeyword() {
    const keyword = document.getElementById('player-keyword').value.trim();
    const resultDiv = document.getElementById('keyword-result');
    
    if (!keyword) {
        showResult('keyword-result', 'Veuillez entrer un mot-clé', 'error');
        return;
    }
    
    const video = videos.find(v => v.keyword.toLowerCase() === keyword.toLowerCase());
    
    if (video) {
        if (!unlockedVideos.includes(video.id)) {
            unlockedVideos.push(video.id);
            saveData();
            renderVideosList();
            showResult('keyword-result', `Bravo ! Vidéo "${video.name}" débloquée !`, 'success');
            showToast(`Vidéo "${video.name}" débloquée !`, 'success');
        } else {
            showResult('keyword-result', 'Cette vidéo est déjà débloquée', 'error');
        }
    } else {
        showResult('keyword-result', 'Mot-clé incorrect. Essayez encore...', 'error');
    }
    
    document.getElementById('player-keyword').value = '';
}

function playVideo(video) {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const ambientAudio = document.getElementById('video-ambient');
    
    modalVideo.src = video.url;
    modal.classList.add('active');
    
    // Play ambient sound if available
    if (video.ambientSound) {
        ambientAudio.src = video.ambientSound;
        ambientAudio.play().catch(e => console.log('Could not play ambient sound:', e));
    }
    
    // Play video
    modalVideo.play().catch(e => console.log('Could not play video:', e));
}

function closeVideo() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const ambientAudio = document.getElementById('video-ambient');
    
    modalVideo.pause();
    modalVideo.src = '';
    ambientAudio.pause();
    ambientAudio.src = '';
    modal.classList.remove('active');
}

// Admin Interface
function showAdminInterface() {
    renderAdminVideosList();
    showScreen('admin-screen');
}

function showTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Video Management
document.getElementById('add-video-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('video-name').value;
    const url = document.getElementById('video-url').value;
    const fileInput = document.getElementById('video-file');
    const keyword = document.getElementById('video-keyword').value;
    const soundInput = document.getElementById('video-sound');
    
    if (!name || !keyword) {
        showToast('Nom et mot-clé sont requis', 'error');
        return;
    }
    
    if (!url && !fileInput.files[0]) {
        showToast('URL ou fichier vidéo requis', 'error');
        return;
    }
    
    const newVideo = {
        id: Date.now(),
        name: name,
        keyword: keyword,
        description: `Mot-clé: ${keyword}`,
        ambientSound: null
    };
    
    if (url) {
        newVideo.url = url;
        finalizeVideoAdd(newVideo);
    } else if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newVideo.url = e.target.result;
            finalizeVideoAdd(newVideo);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
    
    // Handle ambient sound
    if (soundInput.files[0]) {
        const soundReader = new FileReader();
        soundReader.onload = function(e) {
            newVideo.ambientSound = e.target.result;
        };
        soundReader.readAsDataURL(soundInput.files[0]);
    }
});

function finalizeVideoAdd(video) {
    videos.push(video);
    saveData();
    renderAdminVideosList();
    renderVideosList();
    showToast('Vidéo ajoutée avec succès', 'success');
    
    // Reset form
    document.getElementById('add-video-form').reset();
}

function renderAdminVideosList() {
    const adminVideosList = document.getElementById('admin-videos-list');
    adminVideosList.innerHTML = '';
    
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'admin-video-item';
        
        videoItem.innerHTML = `
            <div class="admin-video-info">
                <h4>${video.name}</h4>
                <p>Mot-clé: ${video.keyword}</p>
                <p>Statut: ${unlockedVideos.includes(video.id) ? 'Débloquée' : 'Verrouillée'}</p>
            </div>
            <div class="admin-video-actions">
                <button class="btn btn-secondary" onclick="toggleVideoLock(${video.id})">
                    ${unlockedVideos.includes(video.id) ? 'Verrouiller' : 'Déverrouiller'}
                </button>
                <button class="btn btn-secondary" onclick="deleteVideo(${video.id})">Supprimer</button>
            </div>
        `;
        
        adminVideosList.appendChild(videoItem);
    });
}

function toggleVideoLock(videoId) {
    const index = unlockedVideos.indexOf(videoId);
    if (index > -1) {
        unlockedVideos.splice(index, 1);
        showToast('Vidéo verrouillée', 'warning');
    } else {
        unlockedVideos.push(videoId);
        showToast('Vidéo déverrouillée', 'success');
    }
    saveData();
    renderAdminVideosList();
    renderVideosList();
}

function deleteVideo(videoId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
        videos = videos.filter(v => v.id !== videoId);
        unlockedVideos = unlockedVideos.filter(id => id !== videoId);
        saveData();
        renderAdminVideosList();
        renderVideosList();
        showToast('Vidéo supprimée', 'warning');
    }
}

// Settings Management
function changeBackground() {
    const fileInput = document.getElementById('background-image');
    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appData.backgroundImage = e.target.result;
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            saveData();
            showToast('Fond d\'écran changé', 'success');
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function changeAmbientSound() {
    const fileInput = document.getElementById('ambient-sound');
    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appData.ambientSound = e.target.result;
            saveData();
            showToast('Son d\'ambiance changé', 'success');
            
            // Play ambient sound
            const audio = new Audio(e.target.result);
            audio.loop = true;
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Could not play ambient sound:', e));
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Password Management
function changeAdminPassword() {
    const newPassword = document.getElementById('admin-password').value;
    if (newPassword && newPassword.length >= 6) {
        appData.passwords.admin = newPassword;
        saveData();
        showToast('Mot de passe admin changé', 'success');
        document.getElementById('admin-password').value = '';
    } else {
        showToast('Le mot de passe doit contenir au moins 6 caractères', 'error');
    }
}

function changePlayerPassword() {
    const newPassword = document.getElementById('player-password').value;
    if (newPassword && newPassword.length >= 6) {
        appData.passwords.joueur = newPassword;
        saveData();
        showToast('Mot de passe joueur changé', 'success');
        document.getElementById('player-password').value = '';
    } else {
        showToast('Le mot de passe doit contenir au moins 6 caractères', 'error');
    }
}

// QR Code Generation
function generateQR() {
    const qrContainer = document.getElementById('qr-code');
    const currentUrl = window.location.href;
    
    qrContainer.innerHTML = '';
    
    QRCode.toCanvas(qrContainer, currentUrl, {
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        margin: 2
    }, function (error) {
        if (error) {
            console.error('Erreur génération QR Code:', error);
            showToast('Erreur lors de la génération du QR Code', 'error');
        } else {
            showToast('QR Code généré avec succès', 'success');
        }
    });
}

// Utility Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = 'none';
}

function showResult(elementId, message, type) {
    const resultElement = document.getElementById(elementId);
    resultElement.textContent = message;
    resultElement.className = `result-message ${type}`;
    resultElement.style.display = 'block';
    
    setTimeout(() => {
        resultElement.style.display = 'none';
    }, 5000);
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close video modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('video-modal');
        if (modal.classList.contains('active')) {
            closeVideo();
        }
    }
    
    // Enter to submit keyword
    if (e.key === 'Enter' && document.getElementById('player-keyword') === document.activeElement) {
        checkKeyword();
    }
});

// Click outside modal to close
document.getElementById('video-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideo();
    }
});

// Auto-save on window close
window.addEventListener('beforeunload', function() {
    saveData();
});

// Initialize ambient sound if available
window.addEventListener('load', function() {
    if (appData.ambientSound) {
        const audio = new Audio(appData.ambientSound);
        audio.loop = true;
        audio.volume = 0.2;
        
        // Play on user interaction
        document.addEventListener('click', function playAmbient() {
            audio.play().catch(e => console.log('Could not play ambient sound:', e));
            document.removeEventListener('click', playAmbient);
        }, { once: true });
    }
});

// Export functions for global access
window.showLogin = showLogin;
window.showWelcome = showWelcome;
window.logout = logout;
window.checkKeyword = checkKeyword;
window.playVideo = playVideo;
window.closeVideo = closeVideo;
window.showTab = showTab;
window.toggleVideoLock = toggleVideoLock;
window.deleteVideo = deleteVideo;
window.changeBackground = changeBackground;
window.changeAmbientSound = changeAmbientSound;
window.changeAdminPassword = changeAdminPassword;
window.changePlayerPassword = changePlayerPassword;
window.generateQR = generateQR;