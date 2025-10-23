// Menu hamburger para dispositivos móveis
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Script para o accordion de habilidades
document.addEventListener('DOMContentLoaded', function() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.parentElement;
            const isActive = category.classList.contains('active');
            
            // Fecha todas as outras categorias
            document.querySelectorAll('.skill-category').forEach(otherCategory => {
                if (otherCategory !== category) {
                    otherCategory.classList.remove('active');
                }
            });
            
            // Alterna a categoria clicada
            if (!isActive) {
                category.classList.add('active');
            } else {
                category.classList.remove('active');
            }
        });
    });
});

// Script para o accordion das colunas
document.addEventListener('DOMContentLoaded', function() {
    const columnHeaders = document.querySelectorAll('.column-header');
    
    columnHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const column = this.parentElement;
            const isActive = column.classList.contains('active');
            
            // Alterna a coluna clicada
            if (!isActive) {
                column.classList.add('active');
            } else {
                column.classList.remove('active');
            }
        });
    });
});

// Script para o accordion de objetivos
document.addEventListener('DOMContentLoaded', function() {
    const objectiveHeaders = document.querySelectorAll('.objective-header');
    
    objectiveHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const objectiveItem = this.parentElement;
            const isActive = objectiveItem.classList.contains('active');
            
            // Fecha todos os outros itens
            document.querySelectorAll('.objective-item').forEach(otherItem => {
                if (otherItem !== objectiveItem) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna o item clicado
            if (!isActive) {
                objectiveItem.classList.add('active');
            } else {
                objectiveItem.classList.remove('active');
            }
        });
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar classe de scroll no header para efeito visual
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 64, 175, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--secondary-color)';
        header.style.backdropFilter = 'none';
    }
});

// Atualizar navegação ativa
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Chame a função no scroll
window.addEventListener('scroll', updateActiveNav);