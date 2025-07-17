/**
 * FAQ Page JavaScript
 * Handles FAQ search, filtering, and interactions
 */

// Global variables
let faqData = [];
let currentCategory = 'all';

// Initialize FAQ page
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQPage();
});

// Initialize FAQ page functionality
function initializeFAQPage() {
    setupThemeToggle();
    loadTheme();
    setupFAQInteractions();
    setupSearch();
    setupCategoryFilters();
    extractFAQData();
    trackFAQPageView();
}

// Setup FAQ interactions
function setupFAQInteractions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => toggleFAQItem(item));
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFAQItem(item);
        });
        
        // Add keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQItem(item);
            }
        });
    });
}

// Toggle FAQ item
function toggleFAQItem(item) {
    const isActive = item.classList.contains('active');
    
    // Close all other items (accordion behavior)
    document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
            activeItem.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (isActive) {
        item.classList.remove('active');
    } else {
        item.classList.add('active');
        
        // Scroll to item if needed
        setTimeout(() => {
            const itemTop = item.offsetTop;
            const viewportTop = window.pageYOffset;
            const viewportBottom = viewportTop + window.innerHeight;
            
            if (itemTop < viewportTop || itemTop > viewportBottom - 200) {
                item.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 300);
        
        // Track FAQ open
        trackFAQInteraction(item);
    }
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('faqSearch');
    const searchClear = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        // Clear previous timeout
        clearTimeout(searchTimeout);
        
        // Show/hide clear button
        if (query) {
            searchClear.style.display = 'block';
        } else {
            searchClear.style.display = 'none';
            hideSearchResults();
            showAllFAQs();
            return;
        }
        
        // Debounce search
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    searchClear.addEventListener('click', function() {
        searchInput.value = '';
        searchClear.style.display = 'none';
        hideSearchResults();
        showAllFAQs();
        searchInput.focus();
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });
}

// Perform search
function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const results = searchFAQs(query);
    
    if (results.length > 0) {
        displaySearchResults(results);
        showSearchResults();
    } else {
        hideSearchResults();
        showNoResults();
    }
    
    // Track search
    trackFAQSearch(query, results.length);
}

// Search FAQs
function searchFAQs(query) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    const results = [];
    
    faqData.forEach(faq => {
        let score = 0;
        const searchableText = `${faq.question} ${faq.answer} ${faq.keywords}`.toLowerCase();
        
        searchTerms.forEach(term => {
            const termCount = (searchableText.match(new RegExp(term, 'g')) || []).length;
            score += termCount;
            
            // Boost score for matches in question
            if (faq.question.toLowerCase().includes(term)) {
                score += 5;
            }
        });
        
        if (score > 0) {
            results.push({ ...faq, score });
        }
    });
    
    // Sort by score
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="selectSearchResult('${result.id}')">
            <div class="search-result-question">${highlightSearchTerms(result.question)}</div>
            <div class="search-result-category">${getCategoryName(result.category)}</div>
        </div>
    `).join('');
}

// Highlight search terms
function highlightSearchTerms(text) {
    const searchInput = document.getElementById('faqSearch');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) return text;
    
    const searchTerms = query.split(' ').filter(term => term.length > 2);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="highlighted">$1</span>');
    });
    
    return highlightedText;
}

// Select search result
function selectSearchResult(faqId) {
    hideSearchResults();
    
    // Find and open the FAQ item
    const faqItem = document.querySelector(`.faq-item[data-id="${faqId}"]`);
    if (faqItem) {
        // Show the category if it's filtered
        const category = faqItem.closest('.faq-category').dataset.category;
        if (currentCategory !== 'all' && currentCategory !== category) {
            filterByCategory('all');
        }
        
        // Open the FAQ item
        toggleFAQItem(faqItem);
        
        // Scroll to item
        setTimeout(() => {
            faqItem.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
    
    // Clear search
    const searchInput = document.getElementById('faqSearch');
    searchInput.value = '';
    document.getElementById('searchClear').style.display = 'none';
}

// Show/hide search results
function showSearchResults() {
    document.getElementById('searchResults').style.display = 'block';
}

function hideSearchResults() {
    document.getElementById('searchResults').style.display = 'none';
}

// Show no results message
function showNoResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `
        <div class="search-result-item">
            <div class="search-result-question">Keine Ergebnisse gefunden</div>
            <div class="search-result-category">Versuche andere Suchbegriffe</div>
        </div>
    `;
    showSearchResults();
}

// Setup category filters
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterByCategory(category);
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Track category filter
            trackCategoryFilter(category);
        });
    });
}

// Filter by category
function filterByCategory(category) {
    currentCategory = category;
    const categories = document.querySelectorAll('.faq-category');
    
    categories.forEach(categoryEl => {
        const categoryName = categoryEl.dataset.category;
        
        if (category === 'all' || categoryName === category) {
            categoryEl.classList.remove('hidden');
        } else {
            categoryEl.classList.add('hidden');
        }
    });
    
    // Close all open FAQs when filtering
    document.querySelectorAll('.faq-item.active').forEach(item => {
        item.classList.remove('active');
    });
}

// Show all FAQs
function showAllFAQs() {
    filterByCategory(currentCategory);
}

// Extract FAQ data for search
function extractFAQData() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const id = `faq-${index}`;
        item.dataset.id = id;
        
        const question = item.querySelector('.faq-question h3').textContent;
        const answer = item.querySelector('.faq-answer').textContent;
        const keywords = item.dataset.keywords || '';
        const category = item.closest('.faq-category').dataset.category;
        
        faqData.push({
            id,
            question,
            answer,
            keywords,
            category,
            element: item
        });
    });
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'general': 'Allgemein',
        'features': 'Features',
        'pricing': 'Preise',
        'technical': 'Technisch',
        'business': 'Businessplan',
        'support': 'Support'
    };
    
    return categoryNames[category] || category;
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeToggleIcon(newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }
}

// Analytics and tracking
function trackFAQPageView() {
    const timestamp = new Date().toISOString();
    
    console.log('FAQ page view tracked:', timestamp);
    // In real app, send to analytics
}

function trackFAQInteraction(faqItem) {
    const question = faqItem.querySelector('.faq-question h3').textContent;
    const category = faqItem.closest('.faq-category').dataset.category;
    
    console.log('FAQ interaction tracked:', { question, category });
    // In real app, send to analytics
}

function trackFAQSearch(query, resultCount) {
    console.log('FAQ search tracked:', { query, resultCount });
    // In real app, send to analytics
}

function trackCategoryFilter(category) {
    console.log('Category filter tracked:', category);
    // In real app, send to analytics
}

// Export functions for use in other scripts
window.FAQPage = {
    toggleTheme: toggleTheme,
    searchFAQs: searchFAQs,
    filterByCategory: filterByCategory
};

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});