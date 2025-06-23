document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const slideCount = slideItems.length;
    let currentIndex = 0;
    
    slides.style.animation = 'none';
    slides.style.width = `${slideCount * 100}%`;
    
    function updateSlider() {
        slides.style.transform = `translateX(-${currentIndex * (100 / slideCount)}%)`;
    }
    
    const sliderContainer = document.querySelector('.slider-container');
    const navButtons = document.createElement('div');
    navButtons.className = 'slider-nav';
    navButtons.innerHTML = `
        <button class="prev-btn">❮</button>
        <button class="next-btn">❯</button>
    `;
    sliderContainer.appendChild(navButtons);
    
    document.querySelector('.next-btn').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    });
    
    document.querySelector('.prev-btn').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    });
    
    updateSlider();
    
    const fadeElements = document.querySelectorAll('.yoga-styles, .trainers-section, .schedule');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    const trainersBtn = document.querySelector('.btn2');
    

    if (trainersBtn) {
        trainersBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            const modal = document.getElementById('trainersModal');
            
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; 
            } else {
                console.error('Модальное окно не найдено!');
            }
        });
    } else {
        console.error('Кнопка "Наши тренеры" не найдена!');
    }
    
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            const modal = document.getElementById('trainersModal');
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; 
            }
        });
    }
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('trainersModal');
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});