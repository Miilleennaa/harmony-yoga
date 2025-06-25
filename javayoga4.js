document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Пожалуйста, введите email');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        if (isValid) {
            alert('Форма успешно отправлена!');
            form.reset();
        }
    });
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = '#ff6b6b';
    }
    
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        input.style.borderColor = '#ddd';
    }
    
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('message').addEventListener('blur', validateMessage);
    
    function validateName() {
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
        } else {
            clearError(nameInput);
        }
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Пожалуйста, введите email');
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Пожалуйста, введите корректный email');
        } else {
            clearError(emailInput);
        }
    }
    function validateMessage() {
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Пожалуйста, введите ваше сообщение');
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Сообщение должно содержать минимум 10 символов');
        } else {
            clearError(messageInput);
        }
    }
});