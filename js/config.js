/**
 * Configuration File
 * Centralized configuration for the bus booking system
 */

const CONFIG = {
    // Bus database
    buses: [
        {
            id: 1,
            name: 'AN CLASSIC',
            type: 'Standard',
            capacity: 20,
            price: 5000,
            seats: 20,
            booked: [3, 7, 12, 15]
        },
        {
            id: 2,
            name: 'ADVENTURE',
            type: 'Comfort',
            capacity: 20,
            price: 7000,
            seats: 20,
            booked: [2, 5, 10]
        },
        {
            id: 3,
            name: 'SARATOGA',
            type: 'Premium',
            capacity: 20,
            price: 9000,
            seats: 20,
            booked: [1, 8, 14, 18]
        },
        {
            id: 4,
            name: 'YEHOVA YIRE',
            type: 'Standard',
            capacity: 20,
            price: 5000,
            seats: 20,
            booked: [4, 9, 11]
        },
        {
            id: 5,
            name: 'TAKBIR',
            type: 'Comfort',
            capacity: 20,
            price: 7000,
            seats: 20,
            booked: [6, 13, 19]
        },
        {
            id: 6,
            name: 'ABOOD',
            type: 'Premium',
            capacity: 20,
            price: 9000,
            seats: 20,
            booked: [2, 7, 16]
        },
        {
            id: 7,
            name: 'ALLY STAR',
            type: 'Standard',
            capacity: 20,
            price: 5000,
            seats: 20,
            booked: [5, 12, 17, 20]
        },
        {
            id: 8,
            name: 'NBS',
            type: 'Comfort',
            capacity: 20,
            price: 7000,
            seats: 20,
            booked: [1, 4, 15]
        }
    ],

    // UI Configuration
    ui: {
        animationSpeed: 300,
        toastDuration: 3000,
        loaderDelay: 500
    },

    // Validation rules
    validation: {
        minNameLength: 3,
        emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        cardNumberLength: 16,
        cvvLength: 3
    },

    // Messages
    messages: {
        loginRequired: 'Please enter your name and email',
        busRequired: 'Please select a bus',
        seatRequired: 'Please select a seat',
        paymentProcessing: 'Processing your payment...',
        bookingSuccess: 'Your booking has been confirmed!',
        bookingError: 'An error occurred. Please try again.',
        invalidEmail: 'Please enter a valid email address',
        selectBusFirst: 'Please select a bus first'
    },

    // Currency
    currency: 'TZS',
    currencySymbol: 'Tsh'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}