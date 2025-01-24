function toggleItems(sectionId) {
    const section = document.getElementById(sectionId);
    const items = section.querySelectorAll('ul li');
    const button = section.querySelector('.show-more-btn');
    const isExpanded = button.getAttribute('data-expanded') === 'true';

    items.forEach((item, index) => {
        if (index >= 10) {
            item.style.display = isExpanded ? 'none' : 'list-item';
        }
    });

    button.textContent = isExpanded ? 'Show More' : 'Show Less';
    button.setAttribute('data-expanded', !isExpanded);
}

// Dark mode toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function printPortfolio() {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        const items = section.querySelectorAll('ul li');
        items.forEach(item => {
            item.style.display = 'list-item';
        });
    });

    window.print();

    sections.forEach(section => {
        const items = section.querySelectorAll('ul li');
        const button = section.querySelector('.show-more-btn');
        if (items.length > 10) {
            items.forEach((item, index) => {
                if (index >= 10) item.style.display = 'none';
            });
            button.style.display = 'block';
        } else {
            if (button) button.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        const items = section.querySelectorAll('ul li');
        const button = section.querySelector('.show-more-btn');
        if (items.length > 10) {
            items.forEach((item, index) => {
                if (index >= 10) item.style.display = 'none';
            });
            button.style.display = 'block';
        } else {
            if (button) button.style.display = 'none';
        }
    });

    // Initialize theme based on system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
    
    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    // Smooth scroll for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Add descriptions to all entries
    document.querySelectorAll('section li').forEach(li => {
        const description = li.getAttribute('data-description') || 'No description available';
        const tooltip = document.createElement('div');
        tooltip.className = 'entry-description';
        tooltip.textContent = description;
        document.body.appendChild(tooltip);

        li.addEventListener('mouseenter', () => {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });

        li.addEventListener('mouseleave', () => {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
    });

    const printButton = document.querySelector('.print-button');
    printButton.addEventListener('click', printPortfolio);

    // ...rest of the event listeners...
});

// Intersection Observer for fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Comment out unused functions
/*
function toggleView(sectionId, viewType) {
    // ...code...
}

function shareEntry(title, url) {
    // ...code...
}
*/
