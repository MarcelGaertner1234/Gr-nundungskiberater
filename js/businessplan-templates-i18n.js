/**
 * Businessplan Templates i18n Integration
 * Enhances existing templates with internationalization
 */

// Helper function to get i18n translation
function getTemplateText(key, fallback = key) {
    if (window.businessplanCreatorI18n && window.businessplanCreatorI18n.isLoaded) {
        return window.businessplanCreatorI18n.get(`templates.startup.${key}`) || fallback;
    }
    return fallback;
}

// Enhanced template loader with i18n support
function getLocalizedBusinessPlanTemplates() {
    if (!window.businessPlanTemplates) {
        console.warn('Original businessPlanTemplates not found');
        return {};
    }

    // Create a deep copy of the original templates
    const localizedTemplates = JSON.parse(JSON.stringify(window.businessPlanTemplates));

    // Enhance startup template with i18n
    if (localizedTemplates.startup) {
        // Update template metadata
        localizedTemplates.startup.name = getTemplateText('name', localizedTemplates.startup.name);
        localizedTemplates.startup.description = getTemplateText('description', localizedTemplates.startup.description);

        // Update chapters
        if (localizedTemplates.startup.chapters) {
            localizedTemplates.startup.chapters.forEach(chapter => {
                if (chapter.id) {
                    // Update chapter info
                    chapter.title = getTemplateText(`chapters.${chapter.id}.title`, chapter.title);
                    chapter.description = getTemplateText(`chapters.${chapter.id}.description`, chapter.description);

                    // Update sections
                    if (chapter.sections) {
                        chapter.sections.forEach(section => {
                            const sectionKey = section.title.toLowerCase()
                                .replace(/\s+/g, '_')
                                .replace(/[^a-z0-9_]/g, '')
                                .replace(/^_+|_+$/g, '');
                            
                            // Update section info
                            section.title = getTemplateText(`chapters.${chapter.id}.sections.${sectionKey}.title`, section.title);
                            section.description = getTemplateText(`chapters.${chapter.id}.sections.${sectionKey}.description`, section.description);
                            section.placeholder = getTemplateText(`chapters.${chapter.id}.sections.${sectionKey}.placeholder`, section.placeholder);

                            // Update select options if present
                            if (section.options && Array.isArray(section.options)) {
                                const optionsKey = `chapters.${chapter.id}.sections.${sectionKey}.options`;
                                const localizedOptions = getTemplateText(optionsKey, null);
                                
                                if (localizedOptions && typeof localizedOptions === 'object') {
                                    section.options = Object.values(localizedOptions);
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    // Update other templates (traditional, ecommerce, etc.) - basic localization
    ['traditional', 'ecommerce', 'service', 'restaurant'].forEach(templateKey => {
        if (localizedTemplates[templateKey]) {
            localizedTemplates[templateKey].name = getTemplateText(`${templateKey}.name`, localizedTemplates[templateKey].name);
            localizedTemplates[templateKey].description = getTemplateText(`${templateKey}.description`, localizedTemplates[templateKey].description);
        }
    });

    return localizedTemplates;
}

// Initialize when businessplan creator i18n is loaded
function initTemplateI18n() {
    if (window.businessplanCreatorI18n && window.businessplanCreatorI18n.isLoaded) {
        // Replace the global templates with localized versions
        window.localizedBusinessPlanTemplates = getLocalizedBusinessPlanTemplates();
        console.log('Template i18n initialized successfully');
    } else {
        // Retry after a short delay
        setTimeout(initTemplateI18n, 100);
    }
}

// Auto-initialize when loaded
document.addEventListener('DOMContentLoaded', function() {
    initTemplateI18n();
});

// Expose helper function for manual refresh
window.refreshTemplateI18n = function() {
    window.localizedBusinessPlanTemplates = getLocalizedBusinessPlanTemplates();
    console.log('Template i18n refreshed');
};