const gameGrid = document.getElementById('game-grid');

// 1. Fetch Games from games.json
fetch('games.json')
    .then(response => response.json())
    .then(games => {
        window.allGames = games; // Save for searching
        displayGames(games);
    })
    .catch(err => console.error("Error loading games:", err));

// 2. Display Games as "Cool Buttons" (No Images)
function displayGames(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        // We only use the title now to avoid broken image icons
        card.innerHTML = `<h3>${game.title}</h3>`;
        card.onclick = () => openGame(game.url);
        gameGrid.appendChild(card);
    });
}

// 3. Settings Menu Toggle
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('hidden');
}

// 4. Tab Cloak: Changes the text in the browser tab
function changeTabName(name) {
    document.title = name || "ReadifyELA";
}

// 5. Panic Key Logic: Instantly redirects to a safe site
window.addEventListener('keydown', function(e) {
    const key = document.getElementById('panic-key').value;
    const url = document.getElementById('panic-url').value;
    if (key && e.key === key) {
        window.location.href = url || "https://google.com";
    }
});

// 6. Game Player Logic
function openGame(url) {
    // This opens the game in the overlay frame
    document.getElementById('game-frame').src = url;
    document.getElementById('game-overlay').classList.remove('hidden');
}

function closeGame() {
    document.getElementById('game-overlay').classList.add('hidden');
    document.getElementById('game-frame').src = ""; // Stops game audio
}

// 7. Search Bar Filter
function filterGames() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = window.allGames.filter(g => 
        g.title.toLowerCase().includes(term)
    );
    displayGames(filtered);
}

// 8. Dark/Light Mode Toggle
function toggleMode() {
    document.body.classList.toggle('light-mode');
}

// 9. Instant Cloak Feature
function instantCloak() {
    document.title = "Classes";
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = "https://ssl.gstatic.com/classroom/favicon.png";
    document.getElementsByTagName('head')[0].appendChild(link);
}
