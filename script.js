const gameGrid = document.getElementById('game-grid');

// 1. Fetch Games from games.json
fetch('games.json')
    .then(response => response.json())
    .then(games => {
        window.allGames = games; // Save for search filtering
        displayGames(games);
    })
    .catch(err => console.error("Error loading games:", err));

// 2. Display Games as "Cool Buttons" (No Images)
function displayGames(games) {
    gameGrid.innerHTML = '';
    
    // Update the Game Count display
    const countDisplay = document.getElementById('game-count');
    if (countDisplay) {
        countDisplay.innerText = `${games.length} Resources Available`;
    }

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
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
        window.location.href = url.startsWith('http') ? url : "https://" + (url || "google.com");
    }
});

// 6. Game Player Logic
function openGame(url) {
    const frame = document.getElementById('game-frame');
    const overlay = document.getElementById('game-overlay');
    
    frame.src = url;
    overlay.classList.remove('hidden');
}

function closeGame() {
    const frame = document.getElementById('game-frame');
    const overlay = document.getElementById('game-overlay');
    
    overlay.classList.add('hidden');
    frame.src = ""; // Stops game audio/loading immediately
}

// 7. Search Bar Filter
function filterGames() {
    const term = document.getElementById('searchBar').value.toLowerCase();
    const filtered = window.allGames.filter(g => 
        g.title.toLowerCase().includes(term)
    );
    displayGames(filtered);
}

// 8. ELA Research Proxy Logic
function launchProxy() {
    let url = document.getElementById('proxy-input').value.trim();
    if (!url) {
        alert("Please enter a URL to research.");
        return;
    }
    
    // Auto-fix URL formatting
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }

    // Tunneling via the Utopia Proxy Engine
    const proxyUrl = "https://mehmetgayalo.southern.com.my/main/" + url;
    
    openGame(proxyUrl);
    toggleSettings(); // Close menu to show the "Research"
}

// 9. Instant Classroom Cloak
function instantCloak() {
    document.title = "Google Classroom";
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = "https://ssl.gstatic.com/classroom/favicon.png";
    document.getElementsByTagName('head')[0].appendChild(link);
}
