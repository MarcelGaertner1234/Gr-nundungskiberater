/**
 * File Upload JavaScript
 * Handles drag & drop file upload functionality for business plan documents
 */

// Supported file types
const SUPPORTED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
];

const SUPPORTED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Uploaded files storage
let uploadedFiles = [];

// Initialize file upload functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeFileUpload();
});

// Initialize file upload
function initializeFileUpload() {
    const dragDropZone = document.getElementById('dragDropZone');
    const fileInput = document.getElementById('fileInput');
    
    if (!dragDropZone || !fileInput) return;
    
    // Set up drag and drop events
    setupDragAndDrop(dragDropZone);
    
    // Set up file input change event
    fileInput.addEventListener('change', handleFileInputChange);
    
    // Set up click to select files
    dragDropZone.addEventListener('click', () => {
        fileInput.click();
    });
}

// Setup drag and drop functionality
function setupDragAndDrop(dropZone) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
}

// Prevent default drag behaviors
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop zone
function highlight(e) {
    const dropZone = document.getElementById('dragDropZone');
    dropZone.classList.add('drag-over');
}

// Remove highlight from drop zone
function unhighlight(e) {
    const dropZone = document.getElementById('dragDropZone');
    dropZone.classList.remove('drag-over');
}

// Handle file drop
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    handleFiles(files);
}

// Handle file input change
function handleFileInputChange(e) {
    const files = e.target.files;
    handleFiles(files);
}

// Handle files (from drop or input)
function handleFiles(files) {
    [...files].forEach(file => {
        if (validateFile(file)) {
            uploadFile(file);
        }
    });
}

// Validate file
function validateFile(file) {
    // Helper function for i18n - fallback to key if i18n not available
    const getFileText = (key, ...args) => {
        if (window.contactI18n && window.contactI18n.get) {
            let text = window.contactI18n.get(`javascript.file_upload.${key}`);
            // Simple placeholder replacement
            args.forEach((arg, index) => {
                text = text.replace(`{${index}}`, arg);
            });
            return text;
        }
        // Fallback German text
        const fallbacks = {
            'file_too_large': `Datei "{0}" ist zu groß. Maximum: 10MB`,
            'file_type_unsupported': `Dateityp "{0}" wird nicht unterstützt. Erlaubt: PDF, DOC, DOCX, TXT`,
            'file_already_uploaded': `Datei "{0}" wurde bereits hochgeladen`
        };
        let text = fallbacks[key] || key;
        args.forEach((arg, index) => {
            text = text.replace(`{${index}}`, arg);
        });
        return text;
    };
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        showNotification(getFileText('file_too_large', file.name), 'error');
        return false;
    }
    
    // Check file type
    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
        // Also check by extension as fallback
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        if (!SUPPORTED_FILE_EXTENSIONS.includes(fileExtension)) {
            showNotification(getFileText('file_type_unsupported', file.name), 'error');
            return false;
        }
    }
    
    // Check if file already exists
    if (uploadedFiles.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)) {
        showNotification(getFileText('file_already_uploaded', file.name), 'error');
        return false;
    }
    
    return true;
}

// Upload file
function uploadFile(file) {
    const fileId = generateFileId();
    const fileData = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString()
    };
    
    // Read file content
    const reader = new FileReader();
    reader.onload = function(e) {
        fileData.content = e.target.result;
        
        // Add to uploaded files
        uploadedFiles.push(fileData);
        
        // Update UI
        updateUploadedFilesList();
        showUploadedFilesSection();
        
        // Save to localStorage
        saveUploadedFiles();
        
        // Show success message
        showNotification(`Datei "${file.name}" erfolgreich hochgeladen`, 'success');
        
        // Process file content (basic analysis)
        processFileContent(fileData);
    };
    
    reader.onerror = function() {
        showNotification(`Fehler beim Lesen der Datei "${file.name}"`, 'error');
    };
    
    // Read as text for text files, as data URL for others
    if (file.type === 'text/plain') {
        reader.readAsText(file);
    } else {
        reader.readAsDataURL(file);
    }
}

// Generate unique file ID
function generateFileId() {
    return 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Update uploaded files list
function updateUploadedFilesList() {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    if (uploadedFiles.length === 0) {
        fileList.innerHTML = '<p class="empty-state">Noch keine Dateien hochgeladen</p>';
        return;
    }
    
    const filesHTML = uploadedFiles.map(file => `
        <div class="file-item" data-file-id="${file.id}">
            <div class="file-info">
                <div class="file-icon">
                    ${getFileIcon(file.type, file.name)}
                </div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size-info">${formatFileSize(file.size)} • ${formatDate(file.uploadedAt)}</div>
                </div>
            </div>
            <div class="file-actions">
                <button class="file-action-btn" onclick="previewFile('${file.id}')" title="Vorschau">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
                <button class="file-action-btn delete" onclick="removeFile('${file.id}')" title="Löschen">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    fileList.innerHTML = filesHTML;
}

// Get file icon based on type
function getFileIcon(fileType, fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch (extension) {
        case 'pdf':
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>`;
        case 'doc':
        case 'docx':
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="12" y1="9" x2="8" y2="9"></line>
            </svg>`;
        case 'txt':
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
            </svg>`;
        default:
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>`;
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show uploaded files section
function showUploadedFilesSection() {
    const uploadedFilesSection = document.getElementById('uploadedFiles');
    if (uploadedFilesSection) {
        uploadedFilesSection.style.display = 'block';
    }
}

// Preview file
function previewFile(fileId) {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;
    
    if (file.type === 'text/plain') {
        // Show text content in a modal or new window
        const preview = window.open('', '_blank');
        preview.document.write(`
            <html>
                <head>
                    <title>${file.name} - Vorschau</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        pre { white-space: pre-wrap; }
                    </style>
                </head>
                <body>
                    <h1>${file.name}</h1>
                    <pre>${file.content}</pre>
                </body>
            </html>
        `);
    } else {
        // For other file types, show a message
        showNotification(`Vorschau für ${file.name} nicht verfügbar. Datei verwenden zum Senden an Berater.`, 'info');
    }
}

// Remove file
function removeFile(fileId) {
    if (confirm('Möchten Sie diese Datei wirklich löschen?')) {
        uploadedFiles = uploadedFiles.filter(file => file.id !== fileId);
        updateUploadedFilesList();
        saveUploadedFiles();
        
        // Hide section if no files left
        if (uploadedFiles.length === 0) {
            const uploadedFilesSection = document.getElementById('uploadedFiles');
            if (uploadedFilesSection) {
                uploadedFilesSection.style.display = 'none';
            }
        }
        
        showNotification('Datei erfolgreich gelöscht', 'success');
    }
}

// Process file content (basic analysis)
function processFileContent(fileData) {
    if (fileData.type === 'text/plain') {
        // Basic text analysis
        const content = fileData.content;
        const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
        const charCount = content.length;
        
        // Store analysis
        fileData.analysis = {
            wordCount: wordCount,
            charCount: charCount,
            analyzedAt: new Date().toISOString()
        };
        
        // Update localStorage
        saveUploadedFiles();
        
        console.log(`Analyzed ${fileData.name}: ${wordCount} words, ${charCount} characters`);
    }
}

// Save uploaded files to localStorage
function saveUploadedFiles() {
    try {
        localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    } catch (e) {
        console.error('Error saving uploaded files:', e);
        showNotification('Fehler beim Speichern der Dateien', 'error');
    }
}

// Load uploaded files from localStorage
function loadUploadedFiles() {
    try {
        const saved = localStorage.getItem('uploadedFiles');
        if (saved) {
            uploadedFiles = JSON.parse(saved);
            updateUploadedFilesList();
            if (uploadedFiles.length > 0) {
                showUploadedFilesSection();
            }
        }
    } catch (e) {
        console.error('Error loading uploaded files:', e);
        uploadedFiles = [];
    }
}

// Get uploaded files for advisor submission
function getUploadedFilesForAdvisor() {
    return uploadedFiles.map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: file.uploadedAt,
        analysis: file.analysis || null
    }));
}

// Clear all uploaded files
function clearAllUploadedFiles() {
    if (confirm('Möchten Sie wirklich alle hochgeladenen Dateien löschen?')) {
        uploadedFiles = [];
        updateUploadedFilesList();
        saveUploadedFiles();
        
        const uploadedFilesSection = document.getElementById('uploadedFiles');
        if (uploadedFilesSection) {
            uploadedFilesSection.style.display = 'none';
        }
        
        showNotification('Alle Dateien erfolgreich gelöscht', 'success');
    }
}

// Initialize file upload when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUploadedFiles();
});

// Show notification function (reused from businessplan-creator.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for use in other scripts
window.FileUpload = {
    getUploadedFiles: () => uploadedFiles,
    getUploadedFilesForAdvisor: getUploadedFilesForAdvisor,
    clearAllUploadedFiles: clearAllUploadedFiles
};