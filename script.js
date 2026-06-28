// =====================================================
// 1. DARK / LIGHT MODE
// =====================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlEl = document.documentElement;

let savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// =====================================================
// 2. HAMBURGER MENU
// =====================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// =====================================================
// 3. ACTIVE NAV LINK ON SCROLL
// =====================================================
const sections = document.querySelectorAll('section');
const navAnchors = document.querySelectorAll('.nav-links a:not(.theme-toggle)');

window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href') === `#${current}`) {
            anchor.classList.add('active');
        }
    });
});
// =====================================================
// 4. SCROLL TO TOP
// =====================================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =====================================================
// 5. CONTACT FORM
// =====================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.style.color = '#ef4444';
        return;
    }

    formStatus.textContent = 'Thank you! Your message has been sent.';
    formStatus.style.color = '#4f46e5';
    contactForm.reset();

    setTimeout(() => {
        formStatus.textContent = '';
    }, 5000);
});

// =====================================================
// 6. SCROLL REVEAL ANIMATIONS
// =====================================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

document.querySelectorAll('.stagger').forEach(el => {
    revealObserver.observe(el);
});

// =====================================================
// 7. CV MODAL
// =====================================================
const cvModalOverlay = document.getElementById('cvModalOverlay');
const showCvBtn = document.getElementById('showCvBtn');
const cvModalClose = document.getElementById('cvModalClose');
const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');
const downloadCvBtn = document.getElementById('downloadCvBtn');

function openCvModal() {
    cvModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCvModal() {
    cvModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

showCvBtn.addEventListener('click', openCvModal);
cvModalClose.addEventListener('click', closeCvModal);
cvModalCloseBtn.addEventListener('click', closeCvModal);

cvModalOverlay.addEventListener('click', (e) => {
    if (e.target === cvModalOverlay) closeCvModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCvModal();
        closeProjectModal();
    }
});

// =====================================================
// 8. DOWNLOAD CV AS PDF (using jsPDF)
// =====================================================
downloadCvBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set font
    doc.setFont('helvetica', 'normal');

    // Title
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 80);
    doc.text('Krishani Randika', 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 150);
    doc.text('Undergraduate Student | Aspiring Software Developer', 20, 40);

    // Line
    doc.setDrawColor(200, 200, 220);
    doc.line(20, 45, 190, 45);

    // Contact
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Email: krishanirandika614@gmail.com', 20, 55);
    doc.text('Phone: +94 785295109', 20, 62);
    doc.text('Location: Colombo, Sri Lanka', 20, 69);

    // Section: Profile
    let y = 80;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 80);
    doc.text('Profile', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const profileText = 'Dedicated second-year undergraduate at the University of Sri Jayewardenepura with a strong passion for software development. Eager to apply technical skills in real-world projects and contribute to innovative solutions.';
    const lines = doc.splitTextToSize(profileText, 170);
    doc.text(lines, 20, y);
    y += lines.length * 5 + 8;

    // Section: Education
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 80);
    doc.text('Education', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('• University of Sri Jayewardenepura — B.Sc. (Second Year) 2024–Present', 20, y);
    y += 5;
    doc.text('• University of Ruhuna — Advanced Certificate in English 2023–2024', 20, y);
    y += 5;
    doc.text('• Sujatha Balika Vidyalaya — GCE A/L (Mathematics & Science) 2014–2022', 20, y);
    y += 10;

    // Section: Skills
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 80);
    doc.text('Skills', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('• Languages: Python, Java, JavaScript, HTML, CSS', 20, y);
    y += 5;
    doc.text('• Frameworks: React, Node.js (basic)', 20, y);
    y += 5;
    doc.text('• Tools: Git, GitHub, MySQL, VS Code', 20, y);
    y += 5;
    doc.text('• Soft Skills: Problem solving, teamwork, communication', 20, y);
    y += 10;

    // Section: Projects
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 80);
    doc.text('Projects', 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const projects = [
        '• Portfolio Website — HTML, CSS, JS (Year 2)',
        '• Logistic Management System — Java + MySQL (Year 1)',
        '• Sales Management System — Java OOP + MySQL (Year 1)',
        '• Cake Website — React + Node.js + MongoDB (Year 2)',
        '• Pizzarella — React + Node.js + PostgreSQL (Year 2)',
        '• Pet Care — React + Node.js + MongoDB (Year 2)'
    ];
    projects.forEach(p => {
        doc.text(p, 20, y);
        y += 5;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated from Krishani Randika\'s Portfolio', 20, 280);

    // Save PDF
    doc.save('Krishani_Randika_CV.pdf');

    // Feedback
    const originalText = downloadCvBtn.innerHTML;
    downloadCvBtn.innerHTML = '<i class="fas fa-check"></i> PDF Downloaded!';
    setTimeout(() => {
        downloadCvBtn.innerHTML = originalText;
    }, 2000);
});

// =====================================================
// 9. SKILL BARS ANIMATION
// =====================================================
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 50);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// =====================================================
// 10. SMOOTH SCROLL FOR NAV LINKS
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// 11. PROJECT DETAIL MODAL + PORTFOLIO SPECIAL HANDLER
// =====================================================
const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalCloseBtn = document.getElementById('projectModalCloseBtn');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalYear = document.getElementById('projectModalYear');
const projectModalDesc = document.getElementById('projectModalDesc');
const projectModalTech = document.getElementById('projectModalTech');
const projectModalFeatures = document.getElementById('projectModalFeatures');

const projectData = {
    logistic: {
        title: 'Logistic Management System',
        year: 'Year 1 · Java Fundamentals',
        description: 'A comprehensive Java-based logistics management system designed to streamline shipment tracking, inventory management, and delivery route optimization. Built with Java and MySQL, this desktop application helps logistics companies manage their operations efficiently.',
        technologies: ['Java', 'MySQL', 'Swing', 'JDBC'],
        features: [
            'Shipment tracking with real-time status updates',
            'Inventory management with stock level monitoring',
            'Delivery route optimization using algorithms',
            'Order scheduling and dispatch management',
            'Customer and supplier database management',
            'Reporting and analytics dashboard'
        ]
    },
    sales: {
        title: 'Sales Management System',
        year: 'Year 1 · Java OOP',
        description: 'An object-oriented sales management system built with Java that handles order processing, customer relationship management, and sales reporting. The system leverages OOP principles for modular and maintainable code.',
        technologies: ['Java', 'MySQL', 'Swing', 'JDBC', 'OOP'],
        features: [
            'Order processing and invoice generation',
            'Customer relationship management (CRM)',
            'Sales reporting and performance analytics',
            'Inventory tracking and stock alerts',
            'User authentication and role-based access',
            'Product catalog management'
        ]
    },
    cake: {
        title: 'Cake Website',
        year: 'Year 2 · Full Stack',
        description: 'A full-stack e-commerce website for a cake shop featuring online ordering, delivery tracking, and user authentication. The platform provides a seamless experience for customers to browse, customize, and order cakes online.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe'],
        features: [
            'User registration and authentication with JWT',
            'Product browsing with categories and search',
            'Online ordering with customization options',
            'Delivery tracking with real-time updates',
            'Secure payment integration with Stripe',
            'Admin dashboard for order management'
        ]
    },
    pizzarella: {
        title: 'Pizzarella',
        year: 'Year 2 · Full Stack',
        description: 'A full-stack pizza ordering platform that allows users to customize their pizzas, track orders in real-time, and leave reviews. Built with React on the frontend and Node.js with PostgreSQL on the backend.',
        technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'Socket.io'],
        features: [
            'Pizza customization with various toppings and sizes',
            'Real-time order tracking with Socket.io',
            'User reviews and ratings for pizzas',
            'Order history and favorites',
            'Admin panel for menu management',
            'Promotional offers and discount codes'
        ]
    },
    petcare: {
        title: 'Pet Care',
        year: 'Year 2 · Full Stack',
        description: 'A full-stack pet care management platform connecting pet owners with service providers. Features include pet profiles, appointment scheduling, service booking, and health record management.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
        features: [
            'Pet profiles with medical history and vaccinations',
            'Appointment scheduling with service providers',
            'Service booking for grooming, boarding, and vet visits',
            'Health record tracking and reminders',
            'In-app messaging between owners and providers',
            'Review and rating system for services'
        ]
    }
};

function openProjectModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    projectModalTitle.textContent = data.title;
    projectModalYear.textContent = data.year;
    projectModalDesc.textContent = data.description;

    // Technologies
    projectModalTech.innerHTML = '';
    data.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.textContent = tech;
        projectModalTech.appendChild(span);
    });

    // Features
    projectModalFeatures.innerHTML = '';
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        projectModalFeatures.appendChild(li);
    });

    projectModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Event listeners for project view buttons
document.querySelectorAll('.project-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const projectId = this.getAttribute('data-project');
        if (projectId === 'portfolio') {
            // Scroll to home smoothly
            const homeSection = document.getElementById('home');
            if (homeSection) {
                const offsetTop = homeSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            // Close any open modals
            closeProjectModal();
            closeCvModal();
            return;
        }
        if (projectId) {
            openProjectModal(projectId);
        }
    });
});

projectModalClose.addEventListener('click', closeProjectModal);
projectModalCloseBtn.addEventListener('click', closeProjectModal);

projectModalOverlay.addEventListener('click', (e) => {
    if (e.target === projectModalOverlay) closeProjectModal();
});

console.log('🚀 Portfolio ready!');