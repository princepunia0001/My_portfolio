// Project Data
const projects = [
    {
        title: 'MindMinders',
        description: 'Mental health support platform',
        icon: 'fa-brain',
        techStack: ['HTML', 'Java Script', 'CSS']
    },
    {
        title: 'Budget Tracker',
        description: 'Expense management tool',
        icon: 'fa-wallet',
        techStack: ['JavaScript', 'Express', 'HTML']
    },
  
    {
        title: 'Crisis Management',
        description: 'Cybersecurity platform',
        icon: 'fa-shield-alt',
        techStack: ['Java', 'Spring Boot', 'MySQL']
    },
    {
        title: 'Weather & Air Quality',
        description: 'Real-time environmental monitoring',
        icon: 'fa-cloud',
        techStack: ['React', 'Node.js', 'APIs']
    }
];

// Skills Data
const skills = [
    {
        category: 'Programming',
        items: [
            { name: 'Java', icon: 'fab fa-java' },
            { name: 'JavaScript', icon: 'fab fa-js' }
        ]
    },
    {
        category: 'Web Development',
        items: [
            { name: 'React', icon: 'fab fa-react' },
            { name: 'Node.js', icon: 'fab fa-node' },
            { name: 'MongoDB', icon: 'fas fa-database' }
        ]
    },
    {
        category: 'Cybersecurity',
        items: [
            { name: 'Web Security', icon: 'fas fa-shield-alt' },
        ]
    },
    {
        category: 'Tools',
        items: [
            { name: 'Docker', icon: 'fab fa-docker' },
            { name: 'AWS', icon: 'fab fa-aws' },
            { name: 'Linux', icon: 'fab fa-linux' }
        ]
    }
];

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
});

// Populate Projects
const projectGrid = document.querySelector('.project-grid');
projectGrid.innerHTML = projects.map(project => `
    <div class="project-card">
        <div class="project-image">
            <i class="fas ${project.icon}"></i>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-stack">
            ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            <a href="#" class="btn small">Live Demo</a>
            <a href="https://github.com/princepunia0001" class="btn small secondary">GitHub</a>
        </div>
    </div>
`).join('');

// Populate Skills
const skillsGrid = document.querySelector('.skills-grid');
skillsGrid.innerHTML = skills.map(category => `
    <div class="skill-category">
        <h3>${category.category}</h3>
        <div class="skill-items">
            ${category.items.map(skill => `
                <div class="skill-item">
                    <i class="${skill.icon}"></i>
                    <span>${skill.name}</span>
                </div>
            `).join('')}
        </div>
    </div>
`).join('');

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });

    // Observe certification cards
    document.querySelectorAll('.cert-card').forEach(card => {
        observer.observe(card);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Form Handling with Email and Google Sheets integration
const contactForm = document.getElementById('contact-form');
const FORM_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby8u-PTTGL5g1XkELSFhTiNSDwCkHqgPknFssA-9Rh-JrWVK69bGw4CDIIClzdMqyI/exec'; // You'll need to replace this with your actual script URL

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch(FORM_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
    }
});
