// 1. Fetch and Display Games
const gameGrid = document.getElementById('game-grid');

fetch('games.json')
    .then(response => response.json())
    .then(games => {
        window.allGames = games; // Store for search filtering
        displayGames(games);
    })
    .catch(err => console.error("Error loading games:", err));

function displayGames(games) {
    if (!gameGrid) return;
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        card.onclick = () => openGame(game.url);
        gameGrid.appendChild(card);
    });
}

// 2. Settings & Panic Logic
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('hidden');
}

window.addEventListener('keydown', function(e) {
    const pKey = document.getElementById('panic-key').value;
    const pUrl = document.getElementById('panic-url').value;
    
    if (pKey && e.key === pKey) {
        window.location.href = pUrl || "https://google.com";
    }
});

function changeTabName(name) {
    document.title = name || "Watermelon Games";
}

// 3. Search & Game Overlay
function filterGames() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = window.allGames.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
}

function openGame(url) {
    document.getElementById('game-frame').src = url;
    document.getElementById('game-overlay').classList.remove('hidden');
}

document.getElementById('close-btn').onclick = () => {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = "";
};

function toggleMode() {
    document.body.classList.toggle('light-mode');
    const btn = document.getElementById('mode-toggle');
    btn.innerText = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
}
