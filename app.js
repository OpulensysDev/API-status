// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAky_HPejDy9TyhSvv6XEGjHN_vlPti8pw",
  authDomain: "cascavel-dd0b9.firebaseapp.com",
  projectId: "cascavel-dd0b9",
  storageBucket: "cascavel-dd0b9.firebasestorage.app",
  messagingSenderId: "698303624463",
  appId: "1:698303624463:web:fe4bc219037c890ee83a7a",
  measurementId: "G-8H5KJY6TNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle-btn');
const decreaseFontBtn = document.getElementById('decrease-font');
const increaseFontBtn = document.getElementById('increase-font');
const expandGalleryBtn = document.getElementById('expand-gallery');
const galleryContainer = document.querySelector('.gallery-container');
const contactForm = document.getElementById('contact-form');
const langPtBtn = document.getElementById('lang-pt');
const langEnBtn = document.getElementById('lang-en');

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
menuToggle.addEventListener('click', toggleMenu);
themeToggle.addEventListener('click', toggleTheme);
decreaseFontBtn.addEventListener('click', () => changeFontSize(-1));
increaseFontBtn.addEventListener('click', () => changeFontSize(1));
expandGalleryBtn.addEventListener('click', expandGallery);
contactForm.addEventListener('submit', handleContactFormSubmit);
langPtBtn.addEventListener('click', () => changeLanguage('pt'));
langEnBtn.addEventListener('click', () => changeLanguage('en'));

// Initialize App
function initApp() {
    initAOS();
    initSwiper();
    initCharts();
    loadTestimonials();
    loadDesignQuotes();
    initParticles();
    initTyped();
    initScrollMagic();
    initVanillaTilt();
}

// Initialize AOS (Animate on Scroll)
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true
    });
}

// Initialize Swiper for testimonials and quotes
function initSwiper() {
    new Swiper('.testimonials .swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });

    new Swiper('.design-quotes .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// Initialize Charts
function initCharts() {
    const growthCtx = document.getElementById('growthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Crescimento do Negócio',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const impactCtx = document.getElementById('impactChart').getContext('2d');
    new Chart(impactCtx, {
        type: 'bar',
        data: {
            labels: ['Engajamento', 'Conversões', 'Retenção', 'Satisfação'],
            datasets: [{
                label: 'Impacto do Design',
                data: [65, 59, 80, 81],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Toggle Menu
function toggleMenu() {
    navMenu.classList.toggle('active');
}

// Toggle Theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Change Font Size
function changeFontSize(delta) {
    const body = document.body;
    const currentSize = parseFloat(getComputedStyle(body).fontSize);
    body.style.fontSize = `${currentSize + delta}px`;
}

// Expand Gallery
function expandGallery() {
    const totalImages = 14;
    for (let i = 2; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `art${i}.png`;
        img.alt = `Arte ${i}`;
        img.classList.add('gallery-item');
        img.dataset.fullGallery = 'art';
        galleryContainer.appendChild(img);
    }
    expandGalleryBtn.style.display = 'none';
}

// Handle Contact Form Submit
async function handleContactFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const messageData = Object.fromEntries(formData.entries());
    
    try {
        const newMessageRef = push(ref(database, 'messages'));
        await set(newMessageRef, messageData);
        showNotification('Mensagem enviada com sucesso!', 'success');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    }
}

// Show Notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add('notification', type);
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Change Language
function changeLanguage(lang) {
    // Implement language change logic here
    console.log(`Changing language to ${lang}`);
    // You would typically load a JSON file with translations and update the DOM
}

// Load Testimonials
function loadTestimonials() {
    const testimonials = [
        { name: 'João Silva', company: 'Tech Solutions', text: 'A Cascavel Designer transformou nossa marca!' },
        { name: 'Maria Santos', company: 'Eco Friendly', text: 'Designs incríveis e atendimento excepcional.' },
        { name: 'Carlos Oliveira', company: 'Finance Pro', text: 'Profissionalismo e criatividade em cada projeto.' },
        // Add more testimonials...
    ];

    const swiperWrapper = document.querySelector('.testimonials .swiper-wrapper');
    testimonials.forEach(testimonial => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.innerHTML = `
            <h3>${testimonial.name}</h3>
            <p>${testimonial.company}</p>
            <blockquote>${testimonial.text}</blockquote>
        `;
        swiperWrapper.appendChild(slide);
    });
}

// Load Design Quotes
function loadDesignQuotes() {
    const quotes = [
        { author: 'Steve Jobs', text: 'Design is not just what it looks like and feels like. Design is how it works.' },
        { author: 'Paul Rand', text: 'Design is the silent ambassador of your brand.' },
        { author: 'Massimo Vignelli', text: 'The life of a designer is a life of fight. Fight against the ugliness.' },
        // Add more quotes...
    ];

    const quoteSlider =  document.querySelector('.design-quotes .swiper-wrapper');
    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('swiper-slide');
        quoteElement.innerHTML = `
            <blockquote>${quote.text}</blockquote>
            <cite>- ${quote.author}</cite>
        `;
        quoteSlider.appendChild(quoteElement);
    });
}

// Lazy Load Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal for Gallery Images
galleryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-item')) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${e.target.src}" alt="${e.target.alt}">
                <p>Esta imagem é protegida por direitos autorais da Cascavel Designer e Opulensys.</p>
                <button class="modal-close">Fechar</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    }
});

// Prevent Image Download
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        alert('Esta imagem é protegida por direitos autorais.');
    }
});

// Load Theme from Local Storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Performance Monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
        }
    }
});

perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });

// Error Handling and Logging
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    // You could send this error to a logging service
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Initialize Particles.js
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, },
            opacity: { value: 0.5, random: false, },
            size: { value: 3, random: true, },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, },
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } },
        },
        retina_detect: true
    });
}

// Initialize Typed.js
function initTyped() {
    new Typed('#typed-text', {
        strings: ['Designs Inovadores', 'Soluções Criativas', 'Experiências Únicas'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
    });
}

// Initialize ScrollMagic
function initScrollMagic() {
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: "#services",
        triggerHook: 0.9,
        reverse: false
    })
    .setClassToggle("#services", "fade-in")
    .addTo(controller);

    // Add more scenes for other sections
}

// Initialize VanillaTilt
function initVanillaTilt() {
    VanillaTilt.init(document.querySelectorAll(".service-item"), {
        max: 25,
        speed: 400
    });
}

// Dynamic Content Loading
function loadDynamicContent(url, targetElement) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector(targetElement).innerHTML = data;
        })
        .catch(error => console.error('Error loading dynamic content:', error));
}

// Infinite Scroll for Gallery
let page = 1;
function loadMoreImages() {
    // Simulating API call to load more images
    const newImages = [
        { src: 'new-image-1.jpg', alt: 'New Image 1' },
        { src: 'new-image-2.jpg', alt: 'New Image 2' },
        // Add more images...
    ];

    newImages.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        imgElement.classList.add('gallery-item');
        galleryContainer.appendChild(imgElement);
    });

    page++;
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreImages();
    }
});

// Custom Events
const customEvent = new CustomEvent('projectCompleted', {
    detail: { projectName: 'Website Redesign', clientName: 'Tech Corp' }
});

document.addEventListener('projectCompleted', (e) => {
    console.log(`Project ${e.detail.projectName} completed for ${e.detail.clientName}`);
    // You could use this to trigger notifications or updates
});

// Trigger the event when a project is marked as completed
function completeProject(projectName, clientName) {
    document.dispatchEvent(new CustomEvent('projectCompleted', {
        detail: { projectName, clientName }
    }));
}

// Web Speech API for Accessibility
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

// Example usage:
document.querySelectorAll('.service-item h3').forEach(heading => {
    heading.addEventListener('click', () => speakText(heading.textContent));
});

// Intersection Observer for Animations
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(el => animationObserver.observe(el));

// WebGL Background (Three.js would be imported in the HTML)
function initWebGLBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
}

// Call this function if you want to add a WebGL background
// initWebGLBackground();

// Web Audio API for Sound Effects
let audioContext;

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playSound(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

// Example usage:
document.querySelector('.cta-button').addEventListener('click', () => {
    if (!audioContext) initAudio();
    playSound(440, 0.1); // Play a short beep
});

// WebRTC for Real-time Communication (simplified example)
function initWebRTC() {
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    let localStream;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            localVideo.srcObject = stream;
            localStream = stream;
            // Here you would set up peer connection and signaling
        })
        .catch(error => console.error('Error accessing media devices:', error));
}

// Call this function to initialize WebRTC features
// initWebRTC();

// Web Workers for Heavy Computations
function initWebWorker() {
    const worker = new Worker('worker.js');
    worker.onmessage = function(e) {
        console.log('Result from worker:', e.data);
    };
    worker.postMessage({ command: 'start', data: [1, 2, 3, 4, 5] });
}

// Call this function to start a web worker
// initWebWorker();

// IndexedDB for Client-side Storage
let db;

function initIndexedDB() {
    const request = indexedDB.open('MyDatabase', 1);
    request.onerror = event => console.error('IndexedDB error:', event.target.error);
    request.onsuccess = event => {
        db = event.target.result;
        console.log('IndexedDB initialized successfully');
    };
    request.onupgradeneeded = event => {
        db = event.target.result;
        const objectStore = db.createObjectStore('customers', { keyPath: 'id' });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
    };
}

// Call this function to initialize IndexedDB
// initIndexedDB();

// WebSockets for Real-time Updates
let socket;

function initWebSocket() {
    socket = new WebSocket('wss://your-websocket-server.com');
    
    socket.onopen = function(e) {
        console.log('WebSocket connection established');
    };

    socket.onmessage = function(event) {
        console.log('Message from server:', event.data);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
            console.error('WebSocket connection died');
        }
    };

    socket.onerror = function(error) {
        console.error(`WebSocket error: ${error.message}`);
    };
}

// Call this function to initialize WebSocket connection
// initWebSocket();

// Geolocation API
function getUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                // You could use this to show nearby services or customize content
            },
            error => {
                console.error('Geolocation error:', error);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

// Call this function to get user's location
// getUserLocation();

// Push Notifications
function initPushNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                // You can now send notifications
            }
        });
    }
}

function sendNotification(title, options) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, options);
    }
}

// Call this to initialize push notifications
// initPushNotifications();

// Example usage:
// sendNotification('New Message', { body: 'You have a new message from a client!' });

// Internationalization API
const i18n = new Intl.DateTimeFormat('pt-BR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

function formatDate(date) {
    return i18n.format(date);
}

// Example usage:
console.log(formatDate(new Date())); // Outputs the current date in Brazilian Portuguese format

// Web Animations API
function animateElement(element) {
    const keyframes = [
        { transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(1.5)', opacity: 0.5, offset: 0.3 },
        { transform: 'scale(0.5)', opacity: 0.5, offset: 0.6 },
        { transform: 'scale(1)', opacity: 1, offset: 1 }
    ];
    
    const options = {
        duration: 2000,
        iterations: Infinity
    };

    element.animate(keyframes
