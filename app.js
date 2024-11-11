// Import Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

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
}

// Initialize AOS (Animate on Scroll)
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true
    });
}

// Initialize Swiper for testimonials
function initSwiper() {
    new Swiper('.swiper-container', {
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

    const swiperWrapper = document.querySelector('.swiper-wrapper');
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

    const quoteSlider = document.querySelector('.quote-slider');
    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote');
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
