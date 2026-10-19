
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});


document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});


const elementData = {
    router: {
        icon: '📡',
        title: 'Router',
        tagline: 'El cerebro de tu red local',
        desc: 'Dispositivo que conecta la red local (LAN) con Internet (WAN). Gestiona el tráfico entre dispositivos internos y el exterior, y es el punto central de configuración de tu red.',
        funcs: [
            'Asignar direcciones IP automáticamente (DHCP)',
            'Enrutar paquetes entre LAN e Internet (NAT)',
            'Aplicar reglas de firewall y seguridad',
            'Configurar la red WiFi (SSID y contraseña)',
            'Definir el rango de direcciones IP locales'
        ],
        tip: 'IP de acceso típica: <code>192.168.1.1</code> o <code>192.168.0.1</code>'
    },
    switch: {
        icon: '🔀',
        title: 'Switch',
        tagline: 'El distribuidor de datos por cable',
        desc: 'Conecta múltiples dispositivos por cable dentro de la LAN. Aprende las direcciones MAC de cada equipo y envía los datos solo al dispositivo correcto, evitando colisiones.',
        funcs: [
            'Conectar de 4 a 24+ dispositivos por cable',
            'Elegir entre FastEthernet (100 Mbps) o Gigabit (1 Gbps)',
            'Versiones administradas permiten VLANs y QoS',
            'Reducir colisiones comparado con un hub',
            'Base de la topología en estrella'
        ],
        tip: 'Recomendado: switch Gigabit no administrado para redes pequeñas.'
    },
    ip: {
        icon: '🔢',
        title: 'Direccionamiento IP',
        tagline: 'La identidad de cada dispositivo',
        desc: 'Cada dispositivo de la red necesita una dirección IP única para comunicarse. En redes pequeñas se usan direcciones IP privadas que no son visibles en Internet.',
        funcs: [
            'Rango privado clase C: <code>192.168.1.1</code> - <code>192.168.1.254</code>',
            'Máscara de subred: <code>255.255.255.0</code>',
            'Puerta de enlace: IP del router (ej. <code>192.168.1.1</code>)',
            'Direcciones reservadas: <code>.1</code> para router, <code>.2</code> a <code>.99</code> para estáticas',
            'Rango DHCP habitual: <code>.100</code> a <code>.200</code>'
        ],
        tip: 'Nunca uses la IP del router ni la de broadcast para un equipo.'
    },
    dhcp: {
        icon: '⚙️',
        title: 'DHCP',
        tagline: 'Asignación automática de direcciones',
        desc: 'Dynamic Host Configuration Protocol. Servicio que asigna automáticamente direcciones IP y otros parámetros de red a los dispositivos que se conectan, evitando configuraciones manuales.',
        funcs: [
            'Rango de IPs disponibles configurables',
            'Tiempo de concesión (lease time) ajustable',
            'Reservas de IP estáticas por MAC',
            'Configuración automática de DNS y gateway',
            'Evita conflictos de IP duplicadas'
        ],
        tip: 'El router suele actuar como servidor DHCP por defecto.'
    },
    dns: {
        icon: '🌍',
        title: 'DNS',
        tagline: 'El directorio telefónico de Internet',
        desc: 'Domain Name System. Traduce los nombres de dominio que escribes (como google.com) a las direcciones IP numéricas que entienden los dispositivos.',
        funcs: [
            'DNS primario de Google: <code>8.8.8.8</code>',
            'DNS secundario de Cloudflare: <code>1.1.1.1</code>',
            'Configurable automáticamente vía DHCP',
            'O manualmente en cada dispositivo',
            'Mejora velocidad y privacidad de resolución'
        ],
        tip: 'Usar DNS de confianza mejora velocidad de navegación.'
    },
    wifi: {
        icon: '📶',
        title: 'Seguridad WiFi',
        tagline: 'Protege tu red inalámbrica',
        desc: 'La red inalámbrica debe estar protegida contra accesos no autorizados. Un cifrado débil pone en riesgo toda la red local.',
        funcs: [
            'Usar cifrado WPA2 o WPA3 (nunca WEP)',
            'Contraseña robusta de 12+ caracteres',
            'Cambiar el nombre SSID por defecto',
            'Ocultar SSID como capa extra (opcional)',
            'Desactivar WPS por seguridad'
        ],
        tip: 'WPA3 es el estándar más seguro disponible actualmente.'
    }
};

const modal = document.getElementById('elementModal');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('.element-card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.dataset.element;
        const data = elementData[key];
        if (!data) return;

        modalBody.innerHTML = `
            <h3>${data.icon} ${data.title}</h3>
            <p class="modal-tagline">${data.tagline}</p>
            <p>${data.desc}</p>
            <h4>Funciones principales</h4>
            <ul>
                ${data.funcs.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <h4>💡 Recomendación</h4>
            <p>${data.tip}</p>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});


const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});


const archNodes = document.querySelectorAll('.arch-node');
const archInfo = document.getElementById('archInfo');

archNodes.forEach(node => {
    const showInfo = () => {
        archNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        archInfo.innerHTML = `
            <span class="arch-info-icon">💡</span>
            <p>${node.dataset.info}</p>
        `;
    };
    node.addEventListener('click', showInfo);
    node.addEventListener('mouseenter', showInfo);
});


const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    initParticles();
}

function initParticles() {
    particles = [];
    const density = Math.floor((canvas.width * canvas.height) / 12000);
    const count = Math.min(Math.max(density, 40), 110);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.8 + 1
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
                const opacity = 1 - dist / 130;
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.35})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.85)';
        ctx.fill();

        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
        ctx.fill();
    });

    
    if (mouse.x !== null) {
        particles.forEach(p => {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const opacity = 1 - dist / mouse.radius;
                ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.55})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });
    }
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
    });
}

function animate() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
}

canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
animate();


const runIpconfig = document.getElementById('runIpconfig');
const clearIpconfig = document.getElementById('clearIpconfig');
const terminalOutput = document.getElementById('terminalOutput');
let isRunning = false;

const commandText = 'C:\\Users\\Estudiante> ipconfig';
const outputText = `
Adaptador de LAN inalámbrica Wi-Fi:

   Sufijo DNS específico. . . . . . . . . : 
   Vínculo: dirección IPv6 local. . . . . : fe80::a4b2:c9d1:2f3e:8b4a%12
   Dirección IPv4. . . . . . . . . . . . . : 192.168.1.15
   Máscara de subred . . . . . . . . . . . : 255.255.255.0
   Puerta de enlace predeterminada . . . . : 192.168.1.1
`;

async function typeText(element, text, speed = 25) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        // Pausa más larga en saltos de línea
        const delay = text.charAt(i) === '\n' ? 90 : speed;
        await new Promise(r => setTimeout(r, delay));
    }
}

runIpconfig.addEventListener('click', async () => {
    if (isRunning) return;
    isRunning = true;
    runIpconfig.disabled = true;

    terminalOutput.textContent = '';
    const promptSpan = document.createElement('span');
    promptSpan.className = 'terminal-prompt';
    terminalOutput.appendChild(promptSpan);
    await typeText(promptSpan, commandText, 40);

    
    await new Promise(r => setTimeout(r, 400));

    const outputSpan = document.createElement('span');
    outputSpan.style.color = '#e2e8f0';
    promptSpan.appendChild(document.createTextNode('\n'));
    promptSpan.appendChild(outputSpan);
    await typeText(outputSpan, outputText, 12);

    
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    promptSpan.appendChild(cursor);

    // Scroll al final
    const terminalBody = document.getElementById('terminalBody');
    terminalBody.scrollTop = terminalBody.scrollHeight;

    isRunning = false;
    runIpconfig.disabled = false;
});

clearIpconfig.addEventListener('click', () => {
    if (isRunning) return;
    terminalOutput.textContent = '';
});


const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.flip-card, .element-card, .tab-content, .terminal-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
