/**
 * Data Tracking System
 * Centralized tracking for all user data that needs to be synchronized with admin dashboard
 */

// Initialize tracking data structures
const DataTracking = {
    // Document tracking
    documents: {
        upload(userId, category, file) {
            const documents = this.getDocuments(userId);
            const newDoc = {
                id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                userId: userId,
                category: category,
                filename: file.name,
                fileSize: file.size,
                fileType: file.type,
                uploadedAt: new Date().toISOString(),
                version: 1,
                status: 'uploaded'
            };
            
            documents.push(newDoc);
            localStorage.setItem(`documents_${userId}`, JSON.stringify(documents));
            
            // Sync to admin
            this.syncToAdmin('document_upload', newDoc);
            return newDoc;
        },
        
        getDocuments(userId) {
            const stored = localStorage.getItem(`documents_${userId}`);
            return stored ? JSON.parse(stored) : [];
        },
        
        updateVersion(userId, documentId, newFile) {
            const documents = this.getDocuments(userId);
            const docIndex = documents.findIndex(d => d.id === documentId);
            
            if (docIndex !== -1) {
                documents[docIndex].version += 1;
                documents[docIndex].uploadedAt = new Date().toISOString();
                documents[docIndex].filename = newFile.name;
                documents[docIndex].fileSize = newFile.size;
                
                localStorage.setItem(`documents_${userId}`, JSON.stringify(documents));
                this.syncToAdmin('document_update', documents[docIndex]);
            }
        }
    },
    
    // Service status tracking
    serviceStatus: {
        update(userId, serviceType, status, currentStep, progressPercentage) {
            const key = `serviceStatus_${userId}`;
            const statuses = JSON.parse(localStorage.getItem(key) || '{}');
            
            statuses[serviceType] = {
                serviceType: serviceType,
                status: status,
                currentStep: currentStep,
                progressPercentage: progressPercentage,
                updatedAt: new Date().toISOString()
            };
            
            localStorage.setItem(key, JSON.stringify(statuses));
            
            // Sync to admin
            DataTracking.documents.syncToAdmin('service_status_update', {
                userId: userId,
                ...statuses[serviceType]
            });
            
            return statuses[serviceType];
        },
        
        get(userId, serviceType) {
            const key = `serviceStatus_${userId}`;
            const statuses = JSON.parse(localStorage.getItem(key) || '{}');
            return statuses[serviceType] || {
                serviceType: serviceType,
                status: 'pending',
                currentStep: 'Noch nicht begonnen',
                progressPercentage: 0
            };
        },
        
        getAll(userId) {
            const key = `serviceStatus_${userId}`;
            return JSON.parse(localStorage.getItem(key) || '{}');
        }
    },
    
    // Communications tracking
    communications: {
        add(userId, type, direction, message, attachments = []) {
            const key = `communications_${userId}`;
            const comms = JSON.parse(localStorage.getItem(key) || '[]');
            
            const newComm = {
                id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                userId: userId,
                type: type, // 'chat', 'email', 'appointment_note'
                direction: direction, // 'user_to_advisor', 'advisor_to_user'
                message: message,
                attachments: attachments,
                createdAt: new Date().toISOString(),
                read: false
            };
            
            comms.push(newComm);
            localStorage.setItem(key, JSON.stringify(comms));
            
            // Sync to admin
            DataTracking.documents.syncToAdmin('communication_added', newComm);
            
            return newComm;
        },
        
        getAll(userId) {
            const key = `communications_${userId}`;
            return JSON.parse(localStorage.getItem(key) || '[]');
        },
        
        markAsRead(userId, commId) {
            const key = `communications_${userId}`;
            const comms = JSON.parse(localStorage.getItem(key) || '[]');
            const commIndex = comms.findIndex(c => c.id === commId);
            
            if (commIndex !== -1) {
                comms[commIndex].read = true;
                localStorage.setItem(key, JSON.stringify(comms));
            }
        }
    },
    
    // Payment tracking
    payments: {
        record(userId, sessionId, productType, amount, currency = 'EUR') {
            const key = `payments_${userId}`;
            const payments = JSON.parse(localStorage.getItem(key) || '[]');
            
            const newPayment = {
                id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                userId: userId,
                stripeSessionId: sessionId,
                productType: productType,
                amount: amount,
                currency: currency,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            
            payments.push(newPayment);
            localStorage.setItem(key, JSON.stringify(payments));
            
            // Sync to admin
            DataTracking.documents.syncToAdmin('payment_initiated', newPayment);
            
            return newPayment;
        },
        
        updateStatus(userId, paymentId, status, refundAmount = null) {
            const key = `payments_${userId}`;
            const payments = JSON.parse(localStorage.getItem(key) || '[]');
            const payIndex = payments.findIndex(p => p.id === paymentId);
            
            if (payIndex !== -1) {
                payments[payIndex].status = status;
                if (refundAmount !== null) {
                    payments[payIndex].refundAmount = refundAmount;
                }
                payments[payIndex].updatedAt = new Date().toISOString();
                
                localStorage.setItem(key, JSON.stringify(payments));
                DataTracking.documents.syncToAdmin('payment_updated', payments[payIndex]);
            }
        },
        
        getAll(userId) {
            const key = `payments_${userId}`;
            return JSON.parse(localStorage.getItem(key) || '[]');
        }
    },
    
    // Appointment tracking enhancement
    appointments: {
        book(userId, type, date, time, notes = '') {
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            
            const newAppointment = {
                id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                userId: userId,
                type: type,
                date: date,
                time: time,
                status: 'scheduled',
                notes: notes,
                createdAt: new Date().toISOString()
            };
            
            appointments.push(newAppointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            // Sync to admin
            DataTracking.documents.syncToAdmin('appointment_booked', newAppointment);
            
            // Add to communications
            DataTracking.communications.add(
                userId,
                'appointment_note',
                'user_to_advisor',
                `Neuer Termin gebucht: ${type} am ${date} um ${time}`,
                []
            );
            
            return newAppointment;
        },
        
        updateStatus(appointmentId, status, advisorNotes = '') {
            const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            const aptIndex = appointments.findIndex(a => a.id === appointmentId);
            
            if (aptIndex !== -1) {
                appointments[aptIndex].status = status;
                if (advisorNotes) {
                    appointments[aptIndex].advisorNotes = advisorNotes;
                }
                appointments[aptIndex].updatedAt = new Date().toISOString();
                
                localStorage.setItem('appointments', JSON.stringify(appointments));
                DataTracking.documents.syncToAdmin('appointment_updated', appointments[aptIndex]);
            }
        }
    },
    
    // Admin sync queue (for when backend is implemented)
    syncQueue: {
        add(eventType, data) {
            const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
            queue.push({
                id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                eventType: eventType,
                data: data,
                timestamp: new Date().toISOString(),
                synced: false
            });
            localStorage.setItem('syncQueue', JSON.stringify(queue));
        },
        
        getUnsyncedEvents() {
            const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
            return queue.filter(event => !event.synced);
        },
        
        markAsSynced(eventId) {
            const queue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
            const eventIndex = queue.findIndex(e => e.id === eventId);
            if (eventIndex !== -1) {
                queue[eventIndex].synced = true;
                localStorage.setItem('syncQueue', JSON.stringify(queue));
            }
        }
    }
};

// Helper function to sync data to admin (placeholder for backend integration)
DataTracking.documents.syncToAdmin = function(eventType, data) {
    // Add to sync queue
    DataTracking.syncQueue.add(eventType, data);
    
    // When backend is ready, this will send data to API
    // For now, just log and store in admin cache
    console.log(`[Data Sync] ${eventType}:`, data);
    
    // Update admin cache
    const adminData = JSON.parse(localStorage.getItem('adminDataCache') || '{}');
    if (!adminData.events) adminData.events = [];
    adminData.events.push({
        type: eventType,
        data: data,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 events
    if (adminData.events.length > 100) {
        adminData.events = adminData.events.slice(-100);
    }
    
    localStorage.setItem('adminDataCache', JSON.stringify(adminData));
};

// Export for use in other modules
window.DataTracking = DataTracking;