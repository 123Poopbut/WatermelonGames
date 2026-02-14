const gameGrid = document.getElementById('game-grid');

// 1. Fetch Games
fetch('games.json')
    .then(response => response.json())
    .then(games => {
        window.allGames = games;
        displayGames(games);
    });

function displayGames(games) {
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

// 2. Settings Functions
function toggleSettings() {
    document.getElementById('settings-modal').classList.toggle('hidden');
}

function changeTabName(name) {
    document.title = name || "ReadifyELA";
}

// 3. Panic Key Logic
window.addEventListener('keydown', function(e) {
    const key = document.getElementById('panic-key').value;
    const url = document.getElementById('panic-url').value;
    if (key && e.key === key) {
        window.location.href = url || "https://google.com";
    }
});

// 4. Game Overlay Functions
function openGame(url) {
    document.getElementById('game-frame').src = url;
    document.getElementById('game-overlay').classList.remove('hidden');
}

function closeGame() {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = "";
}

// 5. Search & Mode
function filterGames() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = window.allGames.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
}

function toggleMode() {
    document.body.classList.toggle('light-mode');
    // Auto-Cloak when switching tabs
window.onblur = function () {
    document.title = "My Drive - Google Drive";
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.href = "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";
    document.getElementsByTagName('head')[0].appendChild(link);
};
}
