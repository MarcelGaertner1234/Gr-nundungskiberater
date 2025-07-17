class FAQInternationalization {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'de';
        this.translations = {};
        this.fallbackLanguage = 'de';
        this.loadPromise = null;
        
        // Initialize immediately
        this.initialize();
    }

    async initialize() {
        console.log('FAQ i18n initializing...');
        
        // Load translations for current language
        await this.loadTranslations(this.currentLanguage);
        
        // Apply translations
        this.applyTranslations();
        
        // Update page title
        this.updatePageTitle();
        
        // Setup FAQ functionality
        this.setupFAQFunctionality();
        
        console.log('FAQ i18n initialization complete');
    }

    async loadTranslations(language) {
        if (this.translations[language]) {
            console.log(`FAQ translations for ${language} already loaded`);
            return;
        }

        try {
            console.log(`Loading FAQ translations for ${language}...`);
            const response = await fetch(`i18n/faq/${language}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            this.translations[language] = await response.json();
            console.log(`FAQ translations for ${language} loaded successfully`);
            
        } catch (error) {
            console.error(`Failed to load FAQ translations for ${language}:`, error);
            
            if (language !== this.fallbackLanguage) {
                console.log(`Falling back to ${this.fallbackLanguage}`);
                await this.loadTranslations(this.fallbackLanguage);
                this.currentLanguage = this.fallbackLanguage;
            }
        }
    }

    updatePageTitle() {
        const title = this.getTranslation('meta.title');
        if (title) {
            document.title = title;
        }
    }

    getTranslation(key, defaultValue = '') {
        const lang = this.currentLanguage;
        if (!this.translations[lang]) {
            return defaultValue;
        }

        const keys = key.split('.');
        let value = this.translations[lang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Try fallback language
                if (lang !== this.fallbackLanguage && this.translations[this.fallbackLanguage]) {
                    value = this.translations[this.fallbackLanguage];
                    for (const fallbackKey of keys) {
                        if (value && typeof value === 'object' && fallbackKey in value) {
                            value = value[fallbackKey];
                        } else {
                            return defaultValue;
                        }
                    }
                    break;
                } else {
                    return defaultValue;
                }
            }
        }
        
        return value || defaultValue;
    }

    applyTranslations() {
        console.log('Applying FAQ translations...');
        
        // Apply basic data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Apply FAQ-specific content
        this.applyFAQContent();
        
        console.log('FAQ translations applied');
    }

    applyFAQContent() {
        // Hero section
        this.updateElement('.hero-badge', 'hero.badge');
        this.updateElement('.hero-title', 'hero.title');
        this.updateElement('.hero-subtitle', 'hero.subtitle');

        // Search placeholder
        const searchInput = document.getElementById('faqSearch');
        if (searchInput) {
            searchInput.placeholder = this.getTranslation('search.placeholder');
        }

        // FAQ categories - handled by data-i18n

        // FAQ content sections
        this.renderFAQSections();

        // Contact section
        this.updateElement('.contact-card h2', 'contact.title');
        this.updateElement('.contact-card p', 'contact.description');
        
        // Contact buttons
        const contactBtn = document.querySelector('.contact-actions .btn-primary');
        if (contactBtn) {
            contactBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                ${this.getTranslation('contact.button_contact')}
            `;
        }

        const emailBtn = document.querySelector('.contact-actions .btn-secondary');
        if (emailBtn) {
            emailBtn.textContent = this.getTranslation('contact.button_email');
        }

        // Contact stats
        this.updateContactStats();

        // Footer
        this.updateFooter();
    }

    renderFAQSections() {
        const categories = ['general', 'features', 'pricing', 'technical', 'business', 'support'];
        
        categories.forEach(category => {
            this.renderFAQCategory(category);
        });
    }

    renderFAQCategory(category) {
        const categoryData = this.getTranslation(category);
        if (!categoryData) return;

        const categoryDiv = document.querySelector(`[data-category="${category}"]`);
        if (!categoryDiv) return;

        // Update category title
        const titleElement = categoryDiv.querySelector('.category-title');
        if (titleElement) {
            titleElement.textContent = categoryData.title;
        }

        // Render FAQ items
        const existingItems = categoryDiv.querySelectorAll('.faq-item');
        existingItems.forEach(item => item.remove());

        // Add new FAQ items
        Object.keys(categoryData).forEach(key => {
            if (key === 'title') return;
            
            const questionData = categoryData[key];
            if (questionData && questionData.question) {
                const faqItem = this.createFAQItem(questionData, category, key);
                categoryDiv.appendChild(faqItem);
            }
        });
    }

    createFAQItem(questionData, category, questionKey) {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.setAttribute('data-keywords', `${category} ${questionKey} ${questionData.question.toLowerCase()}`);

        faqItem.innerHTML = `
            <div class="faq-question">
                <h3>${questionData.question}</h3>
                <button class="faq-toggle" aria-label="${this.getTranslation('common.aria_show_answer')}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>
            <div class="faq-answer">
                ${this.renderFAQAnswer(questionData)}
            </div>
        `;

        return faqItem;
    }

    renderFAQAnswer(questionData) {
        let html = `<p>${questionData.answer}</p>`;
        
        if (questionData.list) {
            html += '<ul>';
            questionData.list.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }

        if (questionData.list_ordered) {
            html += '<ol>';
            questionData.list_ordered.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ol>';
        }

        if (questionData.additional) {
            html += `<p>${questionData.additional}</p>`;
        }

        return html;
    }

    updateContactStats() {
        const stats = this.getTranslation('contact.stats');
        if (!stats) return;

        const statElements = document.querySelectorAll('.contact-stats .stat');
        const statKeys = ['response_time', 'satisfaction', 'availability'];
        const statLabels = ['response_label', 'satisfaction_label', 'availability_label'];

        statElements.forEach((statElement, index) => {
            if (index < statKeys.length) {
                const numberEl = statElement.querySelector('.stat-number');
                const labelEl = statElement.querySelector('.stat-label');
                
                if (numberEl) numberEl.textContent = stats[statKeys[index]];
                if (labelEl) labelEl.textContent = stats[statLabels[index]];
            }
        });
    }

    updateFooter() {
        const footer = this.getTranslation('footer');
        if (!footer) return;

        // Footer description
        this.updateElement('.footer-section p', 'footer.description');

        // Footer section titles
        const sections = document.querySelectorAll('.footer-section h4');
        if (sections.length >= 3) {
            sections[1].textContent = footer.product;
            sections[2].textContent = footer.support;
            if (sections[3]) sections[3].textContent = footer.legal;
        }

        // Footer links
        const links = footer.links;
        Object.keys(links).forEach(linkKey => {
            const linkElement = document.querySelector(`a[href*="${linkKey.replace('_', '-')}"]`);
            if (linkElement) {
                linkElement.textContent = links[linkKey];
            }
        });

        // Copyright
        const copyrightElement = document.querySelector('.footer-bottom p');
        if (copyrightElement) {
            copyrightElement.textContent = footer.copyright;
        }
    }

    updateElement(selector, translationKey) {
        const element = document.querySelector(selector);
        if (element) {
            const translation = this.getTranslation(translationKey);
            if (translation) {
                element.textContent = translation;
            }
        }
    }

    setupFAQFunctionality() {
        // FAQ toggle functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.faq-toggle')) {
                e.preventDefault();
                const faqItem = e.target.closest('.faq-item');
                const answer = faqItem.querySelector('.faq-answer');
                const toggle = faqItem.querySelector('.faq-toggle');
                
                faqItem.classList.toggle('open');
                
                if (faqItem.classList.contains('open')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.style.transform = 'rotate(180deg)';
                } else {
                    answer.style.maxHeight = '0';
                    toggle.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Category filter functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                e.preventDefault();
                
                // Update active state
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter categories
                const selectedCategory = e.target.getAttribute('data-category');
                this.filterFAQCategories(selectedCategory);
            }
        });

        // Search functionality
        const searchInput = document.getElementById('faqSearch');
        const searchClear = document.getElementById('searchClear');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                this.searchFAQs(query);
                
                // Show/hide clear button
                if (searchClear) {
                    searchClear.style.display = query ? 'block' : 'none';
                }
            });
        }

        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.style.display = 'none';
                this.searchFAQs('');
            });
        }
    }

    filterFAQCategories(category) {
        const categories = document.querySelectorAll('.faq-category');
        
        categories.forEach(cat => {
            if (category === 'all' || cat.getAttribute('data-category') === category) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }

    searchFAQs(query) {
        const faqItems = document.querySelectorAll('.faq-item');
        const categories = document.querySelectorAll('.faq-category');
        
        if (!query) {
            // Show all items and categories
            faqItems.forEach(item => item.style.display = 'block');
            categories.forEach(cat => cat.style.display = 'block');
            return;
        }

        let hasVisibleItems = {};
        
        faqItems.forEach(item => {
            const question = item.querySelector('h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const keywords = item.getAttribute('data-keywords') || '';
            
            const isMatch = question.includes(query) || 
                          answer.includes(query) || 
                          keywords.toLowerCase().includes(query);
            
            item.style.display = isMatch ? 'block' : 'none';
            
            // Track which categories have visible items
            const category = item.closest('.faq-category');
            if (category && isMatch) {
                hasVisibleItems[category.getAttribute('data-category')] = true;
            }
        });

        // Show/hide categories based on whether they have visible items
        categories.forEach(cat => {
            const categoryName = cat.getAttribute('data-category');
            cat.style.display = hasVisibleItems[categoryName] ? 'block' : 'none';
        });
    }

    async switchLanguage(newLanguage) {
        if (newLanguage === this.currentLanguage) return;
        
        console.log(`Switching FAQ language from ${this.currentLanguage} to ${newLanguage}`);
        
        try {
            await this.loadTranslations(newLanguage);
            this.currentLanguage = newLanguage;
            localStorage.setItem('language', newLanguage);
            
            this.applyTranslations();
            this.updatePageTitle();
            
            console.log(`FAQ language switched to ${newLanguage}`);
            
        } catch (error) {
            console.error('Failed to switch FAQ language:', error);
        }
    }
}

// Initialize FAQ internationalization when DOM is loaded
let faqI18n;

document.addEventListener('DOMContentLoaded', () => {
    faqI18n = new FAQInternationalization();
});

// Global function for language switching
window.switchFAQLanguage = (language) => {
    if (faqI18n) {
        faqI18n.switchLanguage(language);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQInternationalization;
}