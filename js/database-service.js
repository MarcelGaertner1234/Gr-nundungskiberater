/**
 * Database Service - Mock Implementation
 * This service simulates database operations using localStorage
 * and can be easily replaced with real database calls later
 */

class DatabaseService {
    constructor() {
        this.collections = {
            users: 'db_users',
            onboarding: 'db_onboarding',
            payments: 'db_payments',
            appointments: 'db_appointments',
            documents: 'db_documents',
            services: 'db_services',
            communications: 'db_communications',
            analytics: 'db_analytics',
            preferences: 'db_preferences'
        };
        
        // Initialize collections if they don't exist
        this.initializeCollections();
    }

    initializeCollections() {
        Object.values(this.collections).forEach(collection => {
            if (!localStorage.getItem(collection)) {
                localStorage.setItem(collection, JSON.stringify([]));
            }
        });
    }

    // Generate unique ID (will be replaced by database auto-increment/UUID)
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // CRUD Operations

    // Create
    async create(collection, data) {
        try {
            const items = this.getCollection(collection);
            const newItem = {
                id: this.generateId(),
                ...data,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            items.push(newItem);
            this.saveCollection(collection, items);
            this.logActivity('create', collection, newItem.id);
            return { success: true, data: newItem };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Read (single item)
    async findById(collection, id) {
        try {
            const items = this.getCollection(collection);
            const item = items.find(item => item.id === id);
            return { success: true, data: item || null };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Read (with filters)
    async find(collection, filters = {}) {
        try {
            let items = this.getCollection(collection);
            
            // Apply filters
            Object.entries(filters).forEach(([key, value]) => {
                items = items.filter(item => {
                    if (typeof value === 'object' && value !== null) {
                        // Handle complex filters (e.g., date ranges)
                        if (value.$gte && value.$lte) {
                            return item[key] >= value.$gte && item[key] <= value.$lte;
                        }
                        if (value.$in) {
                            return value.$in.includes(item[key]);
                        }
                    }
                    return item[key] === value;
                });
            });
            
            return { success: true, data: items };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Update
    async update(collection, id, updates) {
        try {
            const items = this.getCollection(collection);
            const index = items.findIndex(item => item.id === id);
            
            if (index === -1) {
                return { success: false, error: 'Item not found' };
            }
            
            items[index] = {
                ...items[index],
                ...updates,
                updated_at: new Date().toISOString()
            };
            
            this.saveCollection(collection, items);
            this.logActivity('update', collection, id);
            return { success: true, data: items[index] };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Delete
    async delete(collection, id) {
        try {
            const items = this.getCollection(collection);
            const filteredItems = items.filter(item => item.id !== id);
            
            if (items.length === filteredItems.length) {
                return { success: false, error: 'Item not found' };
            }
            
            this.saveCollection(collection, filteredItems);
            this.logActivity('delete', collection, id);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Helper methods
    getCollection(collectionName) {
        const collection = this.collections[collectionName];
        if (!collection) {
            throw new Error(`Collection ${collectionName} not found`);
        }
        return JSON.parse(localStorage.getItem(collection) || '[]');
    }

    saveCollection(collectionName, data) {
        const collection = this.collections[collectionName];
        if (!collection) {
            throw new Error(`Collection ${collectionName} not found`);
        }
        localStorage.setItem(collection, JSON.stringify(data));
    }

    // Activity logging for audit trail
    logActivity(action, collection, recordId) {
        const activities = JSON.parse(localStorage.getItem('db_activity_log') || '[]');
        activities.push({
            id: this.generateId(),
            action,
            collection,
            record_id: recordId,
            timestamp: new Date().toISOString(),
            user: this.getCurrentUser()
        });
        
        // Keep only last 1000 activities
        if (activities.length > 1000) {
            activities.splice(0, activities.length - 1000);
        }
        
        localStorage.setItem('db_activity_log', JSON.stringify(activities));
    }

    getCurrentUser() {
        const session = JSON.parse(localStorage.getItem('currentSession') || '{}');
        return session.email || 'system';
    }

    // Special methods for onboarding data
    async saveOnboardingData(email, data) {
        const onboardingData = {
            email,
            name: data.name,
            phone: data.phone,
            phonePrefix: data.phonePrefix,
            phoneNumber: data.phoneNumber,
            country: data.country,
            businessIdea: data.businessIdea,
            profile: data.profile,
            idea: data.idea,
            timeline: data.timeline,
            consulting_services: data.consulting || data.consultingServices || [],
            phase: data.phase || data.foundingPhase,
            consultingPreference: data.consultingPreference || 'erstgespraech',
            completed: true,
            completed_at: new Date().toISOString()
        };
        
        return await this.create('onboarding', onboardingData);
    }
    
    async getOnboardingData(email) {
        try {
            const result = await this.find('onboarding', { email: email });
            return {
                success: true,
                data: result.data && result.data.length > 0 ? result.data[0] : null
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Analytics methods
    async getAnalytics(dateRange = {}) {
        const analytics = {
            users: await this.getUserAnalytics(dateRange),
            payments: await this.getPaymentAnalytics(dateRange),
            services: await this.getServiceAnalytics(dateRange),
            onboarding: await this.getOnboardingAnalytics(dateRange)
        };
        
        return analytics;
    }

    async getUserAnalytics(dateRange) {
        const users = await this.find('users', {});
        const onboarding = await this.find('onboarding', {});
        
        return {
            total: users.data.length,
            completed_onboarding: onboarding.data.filter(o => o.completed).length,
            by_profile: this.groupBy(onboarding.data, 'profile'),
            by_timeline: this.groupBy(onboarding.data, 'timeline')
        };
    }

    async getPaymentAnalytics(dateRange) {
        const payments = await this.find('payments', {});
        const successfulPayments = payments.data.filter(p => p.status === 'succeeded');
        
        return {
            total_revenue: successfulPayments.reduce((sum, p) => sum + p.amount, 0),
            transaction_count: successfulPayments.length,
            average_transaction: successfulPayments.length > 0 
                ? successfulPayments.reduce((sum, p) => sum + p.amount, 0) / successfulPayments.length 
                : 0,
            by_service: this.groupBy(successfulPayments, 'service_type')
        };
    }

    async getServiceAnalytics(dateRange) {
        const services = await this.find('services', {});
        
        return {
            total: services.data.length,
            by_status: this.groupBy(services.data, 'status'),
            completion_rate: this.calculateCompletionRate(services.data)
        };
    }

    async getOnboardingAnalytics(dateRange) {
        const onboarding = await this.find('onboarding', {});
        
        return {
            total_started: onboarding.data.length,
            completed: onboarding.data.filter(o => o.completed).length,
            completion_rate: onboarding.data.length > 0 
                ? (onboarding.data.filter(o => o.completed).length / onboarding.data.length) * 100 
                : 0,
            popular_services: this.getPopularServices(onboarding.data)
        };
    }

    // Helper methods for analytics
    groupBy(array, key) {
        return array.reduce((result, item) => {
            const group = item[key] || 'unknown';
            if (!result[group]) {
                result[group] = 0;
            }
            result[group]++;
            return result;
        }, {});
    }

    calculateCompletionRate(services) {
        if (services.length === 0) return 0;
        const completed = services.filter(s => s.status === 'completed').length;
        return (completed / services.length) * 100;
    }

    getPopularServices(onboardingData) {
        const serviceCounts = {};
        
        onboardingData.forEach(data => {
            if (data.consulting_services && Array.isArray(data.consulting_services)) {
                data.consulting_services.forEach(service => {
                    serviceCounts[service] = (serviceCounts[service] || 0) + 1;
                });
            }
        });
        
        return Object.entries(serviceCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([service, count]) => ({ service, count }));
    }

    // Migration method for existing localStorage data
    async migrateExistingData() {
        console.log('Starting data migration...');
        
        // Migrate user registrations
        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        for (const reg of registrations) {
            await this.create('users', {
                email: reg.email,
                name: reg.name || '',
                password_hash: reg.password, // In production, this would be properly hashed
                verified: true
            });
        }
        
        // Migrate onboarding data
        const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
        if (onboardingData.email) {
            await this.saveOnboardingData(onboardingData.email, onboardingData);
        }
        
        // Migrate payments
        const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
        for (const payment of paymentHistory) {
            await this.create('payments', payment);
        }
        
        console.log('Data migration completed');
    }

    // User Preferences Methods
    async saveUserPreferences(userId, preferences) {
        try {
            // Find existing preferences
            const existing = await this.find('preferences', { user_id: userId });
            
            if (existing.data && existing.data.length > 0) {
                // Update existing preferences
                return await this.update('preferences', existing.data[0].id, preferences);
            } else {
                // Create new preferences
                return await this.create('preferences', {
                    user_id: userId,
                    ...preferences
                });
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getUserPreferences(userId) {
        try {
            const result = await this.find('preferences', { user_id: userId });
            return {
                success: true,
                data: result.data && result.data.length > 0 ? result.data[0] : null
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async updateLanguageAndCurrency(userId, language, currency) {
        const preferences = {
            language: language,
            currency: currency,
            updated_at: new Date().toISOString()
        };
        
        return await this.saveUserPreferences(userId, preferences);
    }

    // Export data for backup
    async exportData() {
        const data = {};
        
        for (const [name, collection] of Object.entries(this.collections)) {
            data[name] = this.getCollection(name);
        }
        
        data.activity_log = JSON.parse(localStorage.getItem('db_activity_log') || '[]');
        
        return {
            export_date: new Date().toISOString(),
            version: '1.0',
            data
        };
    }

    // Import data from backup
    async importData(exportedData) {
        if (!exportedData.data) {
            throw new Error('Invalid export format');
        }
        
        for (const [name, items] of Object.entries(exportedData.data)) {
            if (this.collections[name]) {
                this.saveCollection(name, items);
            } else if (name === 'activity_log') {
                localStorage.setItem('db_activity_log', JSON.stringify(items));
            }
        }
        
        return { success: true, message: 'Data imported successfully' };
    }
}

// Create global instance
window.db = new DatabaseService();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatabaseService;
}