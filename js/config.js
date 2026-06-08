/**
 * Configuration File
 * Centralized configuration for the bus booking system
 */

const CONFIG = {
    // Tanzanian locations/cities
    locations: [
        { id: 1, name: 'Dar es Salaam', region: 'Dar es Salaam', code: 'DSM' },
        { id: 2, name: 'Dodoma', region: 'Dodoma', code: 'DDM' },
        { id: 3, name: 'Arusha', region: 'Arusha', code: 'ARK' },
        { id: 4, name: 'Moshi', region: 'Kilimanjaro', code: 'MSH' },
        { id: 5, name: 'Mbeya', region: 'Mbeya', code: 'MBY' },
        { id: 6, name: 'Iringa', region: 'Iringa', code: 'IRG' },
        { id: 7, name: 'Morogoro', region: 'Morogoro', code: 'MGO' },
        { id: 8, name: 'Bagamoyo', region: 'Pwani', code: 'BGM' },
        { id: 9, name: 'Zanzibar', region: 'Zanzibar', code: 'ZNZ' },
        { id: 10, name: 'Kigali', region: 'Rwanda', code: 'KGL' },
        { id: 11, name: 'Mwanza', region: 'Mwanza', code: 'MWZ' },
        { id: 12, name: 'Tabora', region: 'Tabora', code: 'TBR' },
        { id: 13, name: 'Lindi', region: 'Lindi', code: 'LDI' },
        { id: 14, name: 'Mtwara', region: 'Mtwara', code: 'MTW' },
        { id: 15, name: 'Songea', region: 'Ruvuma', code: 'SGE' },
        { id: 16, name: 'Kigoma', region: 'Kigoma', code: 'KGM' },
        { id: 17, name: 'Bukoba', region: 'Kagera', code: 'BKB' },
        { id: 18, name: 'Singida', region: 'Singida', code: 'SGD' },
        { id: 19, name: 'Njombe', region: 'Njombe', code: 'NJB' },
        { id: 20, name: 'Tanga', region: 'Tanga', code: 'TGA' }
    ],

    // Bus database with routes
    buses: [
        {
            id: 1,
            name: 'AN CLASSIC',
            type: 'Standard',
            capacity: 20,
            price: 5000,
            seats: 20,
            booked: [3, 7, 12, 15],
            from: 'Dar es Salaam',
            to: 'Dodoma',
            departureTime: '08:00',
            arrivalTime: '14:00',
            availableSeats: 16
        },
        {
            id: 2,
            name: 'ADVENTURE',
            type: 'Comfort',
            capacity: 20,
            price: 7000,
            seats: 20,
            booked: [2, 5, 10],
            from: 'Dar es Salaam',
            to: 'Morogoro',
            departureTime: '09:30',
            arrivalTime: '12:00',
            availableSeats: 17
        },
        {
            id: 3,
            name: 'SARATOGA',
            type: 'Premium',
            capacity: 20,
            price: 9000,
            seats: 20,
            booked: [1, 8, 14, 18],
            from: 'Dar es Salaam',
            to: 'Arusha',
            departureTime: '06:00',
            arrivalTime: '16:00',
            availableSeats: 16
        },
        {
            id: 4,
            name: 'YEHOVA YIRE',
            type: 'Standard',
            capacity: 20,
            price: 5000,
            seats: 20,
            booked: [4, 9, 11],
            from: 'Arusha',
            to: 'Moshi',
            departureTime: '10:00',
            arrivalTime: '12:30',
            availableSeats: 17
        },
        {
            id: 5,
            name: 'TAKBIR',
            type: 'Comfort',
            capacity: 20,
            price: 7000,
            seats: 20,
            booked: [6, 13, 19],
            from: 'Dodoma',
            to: 'Iringa',
            departureTime: '07:00',
            arrivalTime: '15:00',
            availableSeats: 17
        },
        {
            id: 6,
            name: 'ABOOD',
            type: 'Premium',
            capacity: 20,
            price: 9000,
            seats: 20,
            booked: [2, 7, 16],
            from: 'Dar es Salaam',
            to: 'Mbeya',
            departureTime: '05:00',
            arrivalTime: '20:00',
            availableSeats: 17
        },
        {
            id: 7,
            name: 'ALLY STAR',
            type: 'Standard',
            capacity: 20,
            price: 5000,
            seats: 20,
            booked: [5, 12, 17, 20],
            from: 'Morogoro',
            to: 'Bagamoyo',
            departureTime: '11:00',
            arrivalTime: '13:30',
            availableSeats: 16
        },
        {
            id: 8,
            name: 'NBS',
            type: 'Comfort',
            capacity: 20,
            price: 7000,
            seats: 20,
            booked: [1, 4, 15],
            from: 'Dar es Salaam',
            to: 'Zanzibar',
            departureTime: '14:00',
            arrivalTime: '17:00',
            availableSeats: 17
        },
        {
            id: 9,
            name: 'COASTAL EXPRESS',
            type: 'Comfort',
            capacity: 20,
            price: 6500,
            seats: 20,
            booked: [3, 8, 11],
            from: 'Dar es Salaam',
            to: 'Lindi',
            departureTime: '10:00',
            arrivalTime: '16:30',
            availableSeats: 17
        },
        {
            id: 10,
            name: 'HIGHLANDS COACH',
            type: 'Premium',
            capacity: 20,
            price: 8500,
            seats: 20,
            booked: [2, 6, 13],
            from: 'Iringa',
            to: 'Mbeya',
            departureTime: '07:30',
            arrivalTime: '12:00',
            availableSeats: 17
        },
        {
            id: 11,
            name: 'MOUNTAIN EXPRESS',
            type: 'Comfort',
            capacity: 20,
            price: 6000,
            seats: 20,
            booked: [],
            from: 'Mbeya',
            to: 'Iringa',
            departureTime: '08:00',
            arrivalTime: '13:00',
            availableSeats: 20
        },
        {
            id: 12,
            name: 'SAFARI CONNECT',
            type: 'Standard',
            capacity: 20,
            price: 5500,
            seats: 20,
            booked: [10],
            from: 'Arusha',
            to: 'Dar es Salaam',
            departureTime: '09:00',
            arrivalTime: '18:00',
            availableSeats: 19
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
        routeRequired: 'Please select from and to locations',
        dateRequired: 'Please select a travel date',
        busRequired: 'Please select a bus',
        seatRequired: 'Please select a seat',
        paymentProcessing: 'Processing your payment...',
        bookingSuccess: 'Your booking has been confirmed!',
        bookingError: 'An error occurred. Please try again.',
        invalidEmail: 'Please enter a valid email address',
        selectBusFirst: 'Please select a bus first',
        noBusesFound: 'We have buses available for this route. Please select one!',
        sameCityError: 'From and To cities must be different'
    },

    // Currency
    currency: 'TZS',
    currencySymbol: 'Tsh'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
