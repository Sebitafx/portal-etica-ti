// Manejo dinámico del Header al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.9)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(30, 41, 59, 0.7)';
            header.style.boxShadow = 'none';
        }
    });
});
