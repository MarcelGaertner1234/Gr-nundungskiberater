/**
 * Loading States JavaScript
 * Manages loading states across the application
 */

// Global loading state management
const LoadingStates = {
    activeLoadings: new Set(),
    
    // Show button loading
    showButtonLoading(buttonElement, originalText = null) {
        if (!buttonElement) return;
        
        // Store original text if not provided
        if (!originalText) {
            originalText = buttonElement.textContent;
        }
        buttonElement.dataset.originalText = originalText;
        
        // Add loading class
        buttonElement.classList.add('loading');
        buttonElement.disabled = true;
        
        // Track this loading
        this.activeLoadings.add(`button-${buttonElement.id || Math.random()}`);
    },
    
    // Hide button loading
    hideButtonLoading(buttonElement) {
        if (!buttonElement) return;
        
        // Restore original text
        const originalText = buttonElement.dataset.originalText;
        if (originalText) {
            buttonElement.textContent = originalText;
            delete buttonElement.dataset.originalText;
        }
        
        // Remove loading class
        buttonElement.classList.remove('loading');
        buttonElement.disabled = false;
        
        // Remove from tracking
        this.activeLoadings.delete(`button-${buttonElement.id || Math.random()}`);
    },
    
    // Show card loading
    showCardLoading(cardElement) {
        if (!cardElement) return;
        cardElement.classList.add('loading');
        this.activeLoadings.add(`card-${cardElement.id || Math.random()}`);
    },
    
    // Hide card loading
    hideCardLoading(cardElement) {
        if (!cardElement) return;
        cardElement.classList.remove('loading');
        this.activeLoadings.delete(`card-${cardElement.id || Math.random()}`);
    },
    
    // Show page loading overlay
    showPageLoading(message = 'Laden...', subtitle = 'Bitte warten Sie einen Moment') {
        // Remove existing overlay
        this.hidePageLoading();
        
        const overlay = document.createElement('div');
        overlay.className = 'page-loading';
        overlay.id = 'pageLoadingOverlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner large"></div>
                <h3>${message}</h3>
                <p>${subtitle}</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        this.activeLoadings.add('page-loading');
    },
    
    // Hide page loading overlay
    hidePageLoading() {
        const overlay = document.getElementById('pageLoadingOverlay');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = 'auto';
            this.activeLoadings.delete('page-loading');
        }
    },
    
    // Show section loading
    showSectionLoading(sectionElement, message = 'Laden...') {
        if (!sectionElement) return;
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'section-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <span>${message}</span>
        `;
        
        // Store original content
        const originalContent = sectionElement.innerHTML;
        sectionElement.dataset.originalContent = originalContent;
        
        // Replace with loading
        sectionElement.innerHTML = '';
        sectionElement.appendChild(loadingDiv);
        
        this.activeLoadings.add(`section-${sectionElement.id || Math.random()}`);
    },
    
    // Hide section loading
    hideSectionLoading(sectionElement) {
        if (!sectionElement) return;
        
        // Restore original content
        const originalContent = sectionElement.dataset.originalContent;
        if (originalContent) {
            sectionElement.innerHTML = originalContent;
            delete sectionElement.dataset.originalContent;
        }
        
        this.activeLoadings.delete(`section-${sectionElement.id || Math.random()}`);
    },
    
    // Show skeleton loading for lists
    showSkeletonLoading(containerElement, itemCount = 3) {
        if (!containerElement) return;
        
        const skeletonItems = Array.from({length: itemCount}, () => `
            <div class="skeleton-card skeleton"></div>
        `).join('');
        
        // Store original content
        const originalContent = containerElement.innerHTML;
        containerElement.dataset.originalContent = originalContent;
        
        // Replace with skeleton
        containerElement.innerHTML = skeletonItems;
        
        this.activeLoadings.add(`skeleton-${containerElement.id || Math.random()}`);
    },
    
    // Hide skeleton loading
    hideSkeletonLoading(containerElement) {
        if (!containerElement) return;
        
        // Restore original content
        const originalContent = containerElement.dataset.originalContent;
        if (originalContent) {
            containerElement.innerHTML = originalContent;
            delete containerElement.dataset.originalContent;
        }
        
        this.activeLoadings.delete(`skeleton-${containerElement.id || Math.random()}`);
    },
    
    // Show modal loading
    showModalLoading(modalElement) {
        if (!modalElement) return;
        modalElement.classList.add('loading');
        this.activeLoadings.add(`modal-${modalElement.id || Math.random()}`);
    },
    
    // Hide modal loading
    hideModalLoading(modalElement) {
        if (!modalElement) return;
        modalElement.classList.remove('loading');
        this.activeLoadings.delete(`modal-${modalElement.id || Math.random()}`);
    },
    
    // Show form loading
    showFormLoading(formElement) {
        if (!formElement) return;
        
        const inputs = formElement.querySelectorAll('input, textarea, select, button');
        inputs.forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button') {
                input.parentElement.classList.add('loading');
            }
            input.disabled = true;
        });
        
        this.activeLoadings.add(`form-${formElement.id || Math.random()}`);
    },
    
    // Hide form loading
    hideFormLoading(formElement) {
        if (!formElement) return;
        
        const inputs = formElement.querySelectorAll('input, textarea, select, button');
        inputs.forEach(input => {
            input.parentElement.classList.remove('loading');
            input.disabled = false;
        });
        
        this.activeLoadings.delete(`form-${formElement.id || Math.random()}`);
    },
    
    // Utility: Simulate loading delay
    async simulateLoading(minDelay = 800, maxDelay = 1500) {
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        return new Promise(resolve => setTimeout(resolve, delay));
    },
    
    // Clear all loading states
    clearAllLoading() {
        // Remove page loading
        this.hidePageLoading();
        
        // Remove all button loading states
        document.querySelectorAll('.btn.loading').forEach(btn => {
            this.hideButtonLoading(btn);
        });
        
        // Remove all card loading states
        document.querySelectorAll('.card.loading').forEach(card => {
            this.hideCardLoading(card);
        });
        
        // Remove all modal loading states
        document.querySelectorAll('.modal.loading').forEach(modal => {
            this.hideModalLoading(modal);
        });
        
        // Clear tracking
        this.activeLoadings.clear();
    }
};

// Enhanced loading functions for specific use cases
const AppLoading = {
    
    // Dashboard loading states
    showDashboardLoading() {
        LoadingStates.showSkeletonLoading(
            document.querySelector('.quick-actions .action-grid'), 4
        );
        LoadingStates.showSkeletonLoading(
            document.querySelector('.appointments-list'), 2
        );
        LoadingStates.showSkeletonLoading(
            document.querySelector('.documents-list'), 3
        );
    },
    
    hideDashboardLoading() {
        LoadingStates.hideSkeletonLoading(
            document.querySelector('.quick-actions .action-grid')
        );
        LoadingStates.hideSkeletonLoading(
            document.querySelector('.appointments-list')
        );
        LoadingStates.hideSkeletonLoading(
            document.querySelector('.documents-list')
        );
    },
    
    // Calendar loading
    showCalendarLoading() {
        const calendarGrid = document.getElementById('calendarGrid');
        const calendarList = document.getElementById('calendarList');
        const loadingElement = document.getElementById('calendarLoading');
        
        if (calendarGrid) calendarGrid.style.display = 'none';
        if (calendarList) calendarList.style.display = 'none';
        if (loadingElement) loadingElement.style.display = 'flex';
    },
    
    hideCalendarLoading() {
        const loadingElement = document.getElementById('calendarLoading');
        if (loadingElement) loadingElement.style.display = 'none';
        
        // Show appropriate view
        const isGridView = document.querySelector('.view-toggle-btn.active')?.textContent === 'Monat';
        const calendarGrid = document.getElementById('calendarGrid');
        const calendarList = document.getElementById('calendarList');
        
        if (isGridView && calendarGrid) {
            calendarGrid.style.display = 'grid';
        } else if (calendarList) {
            calendarList.style.display = 'block';
        }
    },
    
    // Document viewer loading
    showDocumentLoading() {
        const loadingElement = document.getElementById('documentLoading');
        const contentElement = document.getElementById('documentContent');
        const errorElement = document.getElementById('documentError');
        
        if (loadingElement) loadingElement.style.display = 'flex';
        if (contentElement) contentElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'none';
    },
    
    hideDocumentLoading() {
        const loadingElement = document.getElementById('documentLoading');
        if (loadingElement) loadingElement.style.display = 'none';
    },
    
    // Business plan loading states
    showBusinessPlanLoading(message = 'Businessplan wird geladen...') {
        LoadingStates.showPageLoading(message, 'Ihre Daten werden vorbereitet');
    },
    
    hideBusinessPlanLoading() {
        LoadingStates.hidePageLoading();
    },
    
    // Template loading
    showTemplateLoading() {
        LoadingStates.showSectionLoading(
            document.getElementById('templateSelection'),
            'Templates werden geladen...'
        );
    },
    
    hideTemplateLoading() {
        LoadingStates.hideSectionLoading(
            document.getElementById('templateSelection')
        );
    },
    
    // Upload loading
    showUploadLoading(fileName = '') {
        const dragZone = document.getElementById('dragDropZone');
        if (!dragZone) return;
        
        const uploadLoading = document.createElement('div');
        uploadLoading.className = 'upload-loading';
        uploadLoading.id = 'uploadLoadingState';
        uploadLoading.innerHTML = `
            <div class="loading-spinner"></div>
            <h3>Datei wird hochgeladen</h3>
            <p>${fileName}</p>
            <div class="progress-loading"></div>
        `;
        
        dragZone.style.display = 'none';
        dragZone.parentElement.appendChild(uploadLoading);
    },
    
    hideUploadLoading() {
        const uploadLoading = document.getElementById('uploadLoadingState');
        const dragZone = document.getElementById('dragDropZone');
        
        if (uploadLoading) uploadLoading.remove();
        if (dragZone) dragZone.style.display = 'block';
    },
    
    // Admin dashboard loading
    showAdminLoading() {
        const sections = [
            '.admin-overview',
            '.admin-users',
            '.admin-appointments',
            '.admin-analytics'
        ];
        
        sections.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                LoadingStates.showCardLoading(element);
            }
        });
    },
    
    hideAdminLoading() {
        const sections = [
            '.admin-overview',
            '.admin-users', 
            '.admin-appointments',
            '.admin-analytics'
        ];
        
        sections.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                LoadingStates.hideCardLoading(element);
            }
        });
    }
};

// Auto-integrate loading states with existing functions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            LoadingStates.showFormLoading(this);
            
            // Auto-hide after 3 seconds as fallback
            setTimeout(() => {
                LoadingStates.hideFormLoading(this);
            }, 3000);
        });
    });
    
    // Add loading states to all modal triggers
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                LoadingStates.showModalLoading(modal);
                
                // Hide loading after modal content loads
                setTimeout(() => {
                    LoadingStates.hideModalLoading(modal);
                }, 500);
            }
        });
    });
    
    // Add loading to navigation links
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't show loading for same page links
            const currentPage = window.location.pathname.split('/').pop();
            const targetPage = this.href.split('/').pop();
            
            if (currentPage !== targetPage) {
                LoadingStates.showPageLoading(
                    'Seite wird geladen...',
                    'Sie werden weitergeleitet'
                );
            }
        });
    });
});

// Global error handler to clear loading states
window.addEventListener('error', function() {
    LoadingStates.clearAllLoading();
});

window.addEventListener('beforeunload', function() {
    LoadingStates.clearAllLoading();
});

// Export for global use
window.LoadingStates = LoadingStates;
window.AppLoading = AppLoading;