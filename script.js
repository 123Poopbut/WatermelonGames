function launchProxy() {
    let input = document.getElementById('url-input').value;
    
    // If the user didn't type http, add it or make it a google search
    if (!input.includes('.') && input !== "") {
        input = "https://www.google.com/search?q=" + input;
    } else if (!input.startsWith('http')) {
        input = "https://" + input;
    }

    // This is the proxy base URL (The one you liked)
    const proxyBase = "https://mehmetgayalo.southern.com.my/main/";
    const finalUrl = proxyBase + input;

    // Create the about:blank "Stealth Tab"
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.src = finalUrl;
    
    win.document.body.appendChild(iframe);
}

// Allow pressing "Enter" to search
document.getElementById("url-input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") { launchProxy(); }
});
