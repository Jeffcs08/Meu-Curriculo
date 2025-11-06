// Função auxiliar para verificar se elementos existem
function safeQuerySelector(selector, fallback = null) {
    try {
        const element = document.querySelector(selector);
        return element || fallback;
    } catch (error) {
        console.warn(`Erro ao buscar ${selector}:`, error);
        return fallback;
    }
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

// Classe Accordion reutilizável
class Accordion {
    constructor(containerSelector) {
        this.containers = document.querySelectorAll(containerSelector);
        this.init();
    }
    
    init() {
        this.containers.forEach(container => {
            const header = container.querySelector('.category-header, .column-header, .objective-header');
            const content = container.querySelector('.category-content, .column-content, .objective-content');
            
            if (!header || !content) return;
            
            // Adicionar atributos ARIA
            header.setAttribute('aria-expanded', 'false');
            header.setAttribute('role', 'button');
            content.setAttribute('aria-hidden', 'true');
            
            header.addEventListener('click', () => this.toggle(container));
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle(container);
                }
            });
        });
    }
    
    toggle(container) {
        const isOpening = !container.classList.contains('active');
        const header = container.querySelector('.category-header, .column-header, .objective-header');
        const content = container.querySelector('.category-content, .column-content, .objective-content');
        
        // Fechar outros no mesmo grupo
        if (isOpening) {
            this.containers.forEach(other => {
                if (other !== container && other.classList.contains('active')) {
                    other.classList.remove('active');
                    const otherHeader = other.querySelector('.category-header, .column-header, .objective-header');
                    const otherContent = other.querySelector('.category-content, .column-content, .objective-content');
                    if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                    if (otherContent) otherContent.setAttribute('aria-hidden', 'true');
                }
            });
        }
        
        container.classList.toggle('active');
        
        // Atualizar atributos ARIA
        if (header) header.setAttribute('aria-expanded', isOpening.toString());
        if (content) content.setAttribute('aria-hidden', (!isOpening).toString());
        
        // Disparar evento personalizado
        container.dispatchEvent(new CustomEvent('accordionToggle', {
            detail: { isOpen: isOpening }
        }));
    }
}

// Menu hamburger para dispositivos móveis
function initMobileMenu() {
    const hamburger = safeQuerySelector('#hamburger');
    const navLinks = safeQuerySelector('#navLinks');
    
    if (!hamburger || !navLinks) return;
    
    const toggleMenu = () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', (!isExpanded).toString());
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevenir scroll do body quando menu aberto
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Fechar menu com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Fechar menu ao clicar em um link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Smooth scroll para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '#main-content') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Usar scroll suave se suportado, caso contrário fallback
                    if ('scrollBehavior' in document.documentElement.style) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        target.scrollIntoView();
                    }
                }
            }
        });
    });
}

// Efeito de scroll no header
function initHeaderScroll() {
    const header = safeQuerySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(30, 41, 59, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--secondary-color)';
            header.style.backdropFilter = 'none';
        }
    }, 10));
}

// Atualizar navegação ativa
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveNav() {
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
    
    window.addEventListener('scroll', debounce(updateActiveNav, 10));
    updateActiveNav(); // Chamar inicialmente
}

// Função para abrir email com opção de Gmail
function abrirEmail() {
    const email = 'jeffersonsouza.j30@gmail.com';
    const subject = 'Contato via Currículo';
    const body = 'Olá Jefferson, vim através do seu currículo online.';
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailWindow = window.open(gmailUrl, '_blank');
    
    // Fallback para mailto
    if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed == 'undefined') {
        window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
}

// Script para o scroll da seção de objetivos
function initTechStackScroll() {
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
                        
                        // Esconde após alguns segundos
                        setTimeout(() => {
                            scrollReached.style.display = 'none';
                        }, 3000);
                    }
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
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar skip link para acessibilidade
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Inicializar todos os módulos
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initActiveNav();
    initTechStackScroll();
    
    // Inicializar accordions
    new Accordion('.skill-category');
    new Accordion('.section-column');
    new Accordion('.objective-item');
    
    // Adicionar event listeners para teclado nos itens de contato
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
    
    // Medir performance
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                console.log(`${entry.name}: ${entry.duration}ms`);
            });
        });
        observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
    
    // Fallback para scroll suave
    if (!CSS.supports('scroll-behavior', 'smooth')) {
        console.log('Scroll suave não suportado, usando fallback');
    }
});

// Track interactions (para analytics futuro)
function trackInteraction(eventName, data = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
    console.log(`Event tracked: ${eventName}`, data);
}

// Exportar funções para uso global (se necessário)
window.trackInteraction = trackInteraction;