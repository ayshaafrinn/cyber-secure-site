let attempts = 0;

// LOGIN SYSTEM + BRUTE FORCE PROTECTION
function login() {

    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;
    let msg = document.getElementById("message");

    if (attempts >= 3) {
        msg.innerText = "🚫 ACCOUNT LOCKED (Too many attempts)";
        return;
    }

    if (u === "admin" && p === "Admin123") {
        localStorage.setItem("session", "active");
        window.location.href = "dashboard.html";
    } else {
        attempts++;
        msg.innerText = "❌ Wrong credentials (" + attempts + "/3)";
    }
}

// SESSION PROTECTION
function checkSession() {
    if (localStorage.getItem("session") !== "active") {
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

// PASSWORD STRENGTH CHECKER
document.getElementById("password")?.addEventListener("input", function () {
    let v = this.value;
    let s = document.getElementById("strength");

    if (!s) return;

    if (v.length < 5) s.innerText = "Weak Password";
    else if (/[A-Z]/.test(v) && /[0-9]/.test(v)) s.innerText = "Strong Password";
    else s.innerText = "Medium Password";
});

// FAKE SCAN
function startScan() {
    let bar = document.getElementById("progress");
    let text = document.getElementById("scanText");

    if (!bar) return;

    let w = 0;

    setInterval(() => {
        if (w < 100) {
            w++;
            bar.style.width = w + "%";

            if (w < 30) text.innerText = "Scanning system...";
            else if (w < 70) text.innerText = "Checking vulnerabilities...";
            else text.innerText = "System secure ✔";
        }
    }, 50);
}

// SYSTEM INFO
function loadInfo() {
    let ip = document.getElementById("ip");
    let platform = document.getElementById("platform");

    if (!ip) return;

    ip.innerText = "IP: 192.168." + Math.floor(Math.random()*255);
    platform.innerText = "OS: " + navigator.platform;
}

// LOGS
function startLogs() {
    let log = document.getElementById("logs");
    if (!log) return;

    setInterval(() => {
        let p = document.createElement("p");
        p.innerText = "✔ Security check completed";
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }, 2000);
}

// SQL INJECTION SIMULATION
function testSQL() {
    let input = document.getElementById("sqlInput").value;
    let out = document.getElementById("sqlResult");

    if (input.includes("' OR") || input.includes("1=1")) {
        out.innerText = "⚠ SQL Injection Pattern Detected!";
    } else {
        out.innerText = "Safe Query ✔";
    }
}

// XSS SIMULATION
function testXSS() {
    let input = document.getElementById("xssInput").value;
    let out = document.getElementById("xssResult");

    if (input.includes("<script>")) {
        out.innerText = "⚠ XSS Attack Detected!";
    } else {
        out.innerText = "Safe Input ✔";
    }
}