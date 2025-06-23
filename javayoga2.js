document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchButton = document.querySelector('.btn-search');
    const sortButtons = document.querySelectorAll('.btn-sort');
    const productsList = document.querySelector('.products-list');
    const pagination = document.querySelector('.pagination');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const currentPageSpan = document.querySelector('.current-page');
    
    const allProducts = Array.from(document.querySelectorAll('.product'));
    
    let currentProducts = [...allProducts];
    
    const itemsPerPage = 3;
    let currentPage = 1;
    let totalPages = Math.ceil(allProducts.length / itemsPerPage);
    
    updateDisplay();
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        filterProducts(searchTerm);
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            filterProducts(searchTerm);
        }
    });
    
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            sortProducts(sortBy);
        });
    });
    
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateDisplay();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay();
        }
    });
    
    function filterProducts(searchTerm) {
        if (searchTerm === '') {
            currentProducts = [...allProducts];
        } else {
            currentProducts = allProducts.filter(product => {
                const name = product.getAttribute('data-name').toLowerCase();
                return name.includes(searchTerm);
            });
        }
        
        currentPage = 1;
        totalPages = Math.ceil(currentProducts.length / itemsPerPage);
        updateDisplay();
    }
    
    function sortProducts(sortBy) {
        currentProducts.sort((a, b) => {
            if (sortBy === 'price') {
                const priceA = parseInt(a.getAttribute('data-price'));
                const priceB = parseInt(b.getAttribute('data-price'));
                return priceA - priceB;
            } else if (sortBy === 'name') {
                const nameA = a.getAttribute('data-name').toLowerCase();
                const nameB = b.getAttribute('data-name').toLowerCase();
                return nameA.localeCompare(nameB);
            }
            return 0;
        });
        
        updateDisplay();
    }
    
    function updateDisplay() {
        productsList.innerHTML = '';
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = currentProducts.slice(startIndex, endIndex);
        
        productsToShow.forEach(product => {
            productsList.appendChild(product.cloneNode(true));
        });
        
        currentPageSpan.textContent = currentPage;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
        
        if (currentProducts.length <= itemsPerPage) {
            pagination.style.display = 'none';
        } else {
            pagination.style.display = 'flex';
        }
    }
});