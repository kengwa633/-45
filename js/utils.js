/**
 * Utility Functions
 * Reusable helper functions for common operations
 */

const Utils = {
    /**
     * Show loader
     */
    showLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.remove('hidden');
    },

    /**
     * Hide loader
     */
    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    },

    /**
     * Show toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type: 'success', 'error', 'warning'
     * @param {number} duration - Display duration in ms
     */
    showToast(message, type = 'success', duration = CONFIG.ui.toastDuration) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, duration);
    },

    /**
     * Validate email
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    isValidEmail(email) {
        return CONFIG.validation.emailPattern.test(email);
    },

    /**
     * Validate name
     * @param {string} name - Name to validate
     * @returns {boolean}
     */
    isValidName(name) {
        return name && name.trim().length >= CONFIG.validation.minNameLength;
    },

    /**
     * Validate card number (simple check)
     * @param {string} cardNumber - Card number to validate
     * @returns {boolean}
     */
    isValidCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        return cleaned.length === CONFIG.validation.cardNumberLength && /^\d+$/.test(cleaned);
    },

    /**
     * Validate CVV
     * @param {string} cvv - CVV to validate
     * @returns {boolean}
     */
    isValidCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    },

    /**
     * Format currency
     * @param {number} amount - Amount to format
     * @returns {string}
     */
    formatCurrency(amount) {
        return `${CONFIG.currencySymbol} ${amount.toLocaleString()}`;
    },

    /**
     * Generate reference number
     * @returns {string}
     */
    generateReference() {
        return `S45-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    },

    /**
     * Show section
     * @param {string} sectionId - ID of section to show
     */
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
            window.scrollTo(0, 0);
        }
    },

    /**
     * Toggle element visibility
     * @param {string} elementId - ID of element
     * @param {boolean} show - Whether to show
     */
    toggleElement(elementId, show) {
        const element = document.getElementById(elementId);
        if (element) {
            if (show) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        }
    },

    /**
     * Get element by ID safely
     * @param {string} id - Element ID
     * @returns {Element|null}
     */
    getElement(id) {
        return document.getElementById(id);
    },

    /**
     * Set element text content
     * @param {string} id - Element ID
     * @param {string} text - Text to set
     */
    setText(id, text) {
        const element = this.getElement(id);
        if (element) element.textContent = text;
    },

    /**
     * Set element HTML
     * @param {string} id - Element ID
     * @param {string} html - HTML to set
     */
    setHTML(id, html) {
        const element = this.getElement(id);
        if (element) element.innerHTML = html;
    },

    /**
     * Get input value
     * @param {string} id - Input ID
     * @returns {string}
     */
    getInputValue(id) {
        const input = this.getElement(id);
        return input ? input.value.trim() : '';
    },

    /**
     * Set input value
     * @param {string} id - Input ID
     * @param {string} value - Value to set
     */
    setInputValue(id, value) {
        const input = this.getElement(id);
        if (input) input.value = value;
    },

    /**
     * Clear input value
     * @param {string} id - Input ID
     */
    clearInput(id) {
        this.setInputValue(id, '');
    },

    /**
     * Clear all inputs
     * @param {string[]} ids - Array of input IDs
     */
    clearInputs(ids) {
        ids.forEach(id => this.clearInput(id));
    },

    /**
     * Add CSS class to element
     * @param {string} id - Element ID
     * @param {string} className - Class name
     */
    addClass(id, className) {
        const element = this.getElement(id);
        if (element) element.classList.add(className);
    },

    /**
     * Remove CSS class from element
     * @param {string} id - Element ID
     * @param {string} className - Class name
     */
    removeClass(id, className) {
        const element = this.getElement(id);
        if (element) element.classList.remove(className);
    },

    /**
     * Delay execution
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Log message with timestamp
     * @param {string} message - Message to log
     * @param {string} level - Log level
     */
    log(message, level = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`);
    },

    /**
     * Find bus by ID
     * @param {number} busId - Bus ID
     * @returns {Object|null}
     */
    findBusById(busId) {
        return CONFIG.buses.find(bus => bus.id === busId) || null;
    },

    /**
     * Check if seat is booked
     * @param {Object} bus - Bus object
     * @param {number} seatNumber - Seat number
     * @returns {boolean}
     */
    isSeatBooked(bus, seatNumber) {
        return bus.booked.includes(seatNumber);
    },

    /**
     * Mask card number for display
     * @param {string} cardNumber - Card number
     * @returns {string}
     */
    maskCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        const last4 = cleaned.slice(-4);
        return `**** **** **** ${last4}`;
    },

    /**
     * Calculate journey duration
     * @param {string} from - Departure time
     * @param {string} to - Arrival time
     * @returns {string}
     */
    calculateDuration(from, to) {
        const [fromHour, fromMin] = from.split(':').map(Number);
        const [toHour, toMin] = to.split(':').map(Number);
        
        let duration = (toHour - fromHour) * 60 + (toMin - fromMin);
        if (duration < 0) duration += 24 * 60;
        
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        
        return `${hours}h ${minutes}m`;
    },

    /**
     * Format date for display
     * @param {string} date - Date string (YYYY-MM-DD)
     * @returns {string}
     */
    formatDate(date) {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(date + 'T00:00:00').toLocaleDateString('en-US', options);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}