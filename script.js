// Função auxiliar para verificar se elementos existem
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Elemento não encontrado: ${selector}`);
    }
    return element;
}

// Debounce otimizado para performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Menu hamburger para dispositivos móveis
const hamburger = safeQuerySelector('#hamburger');
const navLinks = safeQuerySelector('#navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
    });
}

// Fechar menu ao clicar em um link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (navLinks && hamburger && 
        !e.target.closest('.nav-container') && 
        navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Script para o accordion de habilidades - INICIALMENTE FECHADAS
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
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Efeito de scroll no header
window.addEventListener('scroll', debounce(() => {
    const header = safeQuerySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(30, 41, 59, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--secondary-color)';
            header.style.backdropFilter = 'none';
        }
    }
}, 10));

// Atualizar navegação ativa
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 150)) {
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
window.addEventListener('scroll', debounce(updateActiveNav, 10));

// Função para abrir email com opção de Gmail
function abrirEmail() {
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=jeffersonsouza.j30@gmail.com&su=Contato via Currículo&body=Olá Jefferson, vim através do seu currículo online.';
    const gmailWindow = window.open(gmailUrl, '_blank');
    
    if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed == 'undefined') {
        window.open('mailto:jeffersonsouza.j30@gmail.com?subject=Contato via Currículo&body=Olá Jefferson, vim através do seu currículo online.');
    }
}

// Script para o scroll da seção de objetivos
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = safeQuerySelector('.scrollable-tech-stack');
    const databaseSection = safeQuerySelector('.database-section');
    const scrollReached = safeQuerySelector('.scroll-reached');
    
    if (scrollContainer && databaseSection) {
        let hasReachedDatabase = false;
        
        // Observador para verificar quando a seção de banco de dados fica visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasReachedDatabase) {
                    hasReachedDatabase = true;
                    databaseSection.classList.add('in-view');
                    
                    // Mostra o indicador de chegada
                    if (scrollReached) {
                        scrollReached.style.display = 'block';
                    }
                    
                    // Esconde o indicador de scroll
                    scrollContainer.classList.add('scrolled');
                }
            });
        }, {
            threshold: 0.3,
            root: scrollContainer
        });
        
        observer.observe(databaseSection);
        
        // Evento de scroll para verificar posição
        scrollContainer.addEventListener('scroll', function() {
            const scrollPercentage = (scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight)) * 100;
            
            // Mostra que o usuário está scrollando
            if (scrollPercentage > 20) {
                scrollContainer.classList.add('scrolling');
            }
        });
        
        // Foca no container quando o card é aberto
        const objectiveHeader = document.querySelector('.objective-item:nth-child(2) .objective-header');
        if (objectiveHeader && scrollContainer) {
            objectiveHeader.addEventListener('click', function() {
                setTimeout(() => {
                    scrollContainer.focus();
                }, 400);
            });
        }
    }
});

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNav();
    
    // Adicionar event listeners para teclado nos itens de contato
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
});