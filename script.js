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

// Controle da seção Sobre
const sobreLink = document.getElementById('sobre-link');
const sobreSection = document.getElementById('sobre');
const closeSobre = document.getElementById('close-sobre');

// Inicialmente oculta a seção Sobre
sobreSection.classList.add('hidden-section');

// Mostrar seção Sobre ao clicar no link
sobreLink.addEventListener('click', (e) => {
    e.preventDefault();
    sobreSection.classList.remove('hidden-section');
    sobreSection.classList.add('visible-section');
    
    // Scroll suave para a seção
    sobreSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Fechar seção Sobre
closeSobre.addEventListener('click', () => {
    sobreSection.classList.remove('visible-section');
    sobreSection.classList.add('hidden-section');
});

// Fechar seção Sobre ao clicar fora do conteúdo
sobreSection.addEventListener('click', (e) => {
    if (e.target === sobreSection) {
        sobreSection.classList.remove('visible-section');
        sobreSection.classList.add('hidden-section');
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
        // Não aplicar para o link "Sobre" que tem funcionalidade especial
        if (this.id !== 'sobre-link') {
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

// Adicionar classe de scroll no header para efeito visual
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 41, 59, 0.95)';
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

// Tecla ESC para fechar a seção Sobre
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sobreSection.classList.contains('visible-section')) {
        sobreSection.classList.remove('visible-section');
        sobreSection.classList.add('hidden-section');
    }
});

// Função para abrir email com opção de Gmail
function abrirEmail() {
    // Tenta abrir o Gmail diretamente
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=jeffersonsouza.j30@gmail.com&su=Contato via Currículo&body=Olá Jefferson, vim através do seu currículo online.';
    const gmailWindow = window.open(gmailUrl, '_blank');
    
    // Se não abrir o Gmail (usuário não logado ou bloqueador de popup), abre o cliente padrão
    if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed == 'undefined') {
        window.open('mailto:jeffersonsouza.j30@gmail.com?subject=Contato via Currículo&body=Olá Jefferson, vim através do seu currículo online.');
    }
}

// Script para o scroll da seção de objetivos
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.scrollable-tech-stack');
    const databaseSection = document.querySelector('.database-section');
    const scrollReached = document.querySelector('.scroll-reached');
    
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
            threshold: 0.5,
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
            
            // Esconde o indicador quando começa a scrollar
            if (scrollPercentage > 10 && !hasReachedDatabase) {
                const scrollIndicator = document.querySelector('.scroll-indicator');
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = Math.max(0, 1 - (scrollPercentage / 30));
                }
            }
        });
        
        // Foca no container quando o card é aberto
        const objectiveHeader = document.querySelector('.objective-item:nth-child(2) .objective-header');
        if (objectiveHeader) {
            objectiveHeader.addEventListener('click', function() {
                setTimeout(() => {
                    if (scrollContainer) {
                        scrollContainer.focus();
                    }
                }, 400);
            });
        }
    }
});

// Função para scroll automático até o banco de dados (opcional)
function scrollToDatabase() {
    const databaseSection = document.querySelector('.database-section');
    const scrollContainer = document.querySelector('.scrollable-tech-stack');
    
    if (databaseSection && scrollContainer) {
        databaseSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}