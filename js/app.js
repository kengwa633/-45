/**
 * Main Application Logic
 * Handles all application state and user interactions
 */

const app = {
    /**
     * Application state
     */
    state: {
        user: {
            name: '',
            email: ''
        },
        route: {
            from: '',
            to: '',
            date: ''
        },
        booking: {
            busId: null,
            busName: '',
            seatNumber: null,
            price: 0,
            reference: ''
        },
        isProcessing: false,
        selectedPaymentMethod: null
    },

    /**
     * Initialize application
     */
    init() {
        Utils.log('Initializing application...', 'info');
        this.populateLocationSelects();
        this.setMinDate();
        this.attachEventListeners();
    },

    /**
     * Set minimum date to today
     */
    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = Utils.getElement('travelDate');
        if (dateInput) dateInput.min = today;
    },

    /**
     * Populate location select dropdowns
     */
    populateLocationSelects() {
        const fromSelect = Utils.getElement('fromLocation');
        const toSelect = Utils.getElement('toLocation');

        CONFIG.locations.forEach(location => {
            // From location
            const optionFrom = document.createElement('option');
            optionFrom.value = location.name;
            optionFrom.textContent = `${location.name} (${location.region})`;
            fromSelect.appendChild(optionFrom);

            // To location
            const optionTo = document.createElement('option');
            optionTo.value = location.name;
            optionTo.textContent = `${location.name} (${location.region})`;
            toSelect.appendChild(optionTo);
        });

        Utils.log('Location selects populated', 'info');
    },

    /**
     * Attach global event listeners
     */
    attachEventListeners() {
        window.addEventListener('load', () => {
            Utils.hideLoader();
        });

        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (e.target.id === 'username' || e.target.id === 'email') {
                    this.handleLogin(e);
                }
            }
        });
    },

    /**
     * Handle login
     */
    handleLogin(event) {
        event.preventDefault();

        const name = Utils.getInputValue('username');
        const email = Utils.getInputValue('email');

        if (!Utils.isValidName(name)) {
            Utils.showToast(CONFIG.messages.loginRequired, 'error');
            return;
        }

        if (!Utils.isValidEmail(email)) {
            Utils.showToast(CONFIG.messages.invalidEmail, 'error');
            return;
        }

        this.state.user.name = name;
        this.state.user.email = email;

        Utils.log(`User logged in: ${name}`, 'info');
        Utils.setText('userDisplay', `👤 ${name}`);
        Utils.showSection('routeSection');
        Utils.showToast(`Welcome, ${name}!`, 'success');
    },

    /**
     * Search buses for selected route
     */
    searchBuses(event) {
        event.preventDefault();

        const from = Utils.getInputValue('fromLocation');
        const to = Utils.getInputValue('toLocation');
        const date = Utils.getInputValue('travelDate');

        if (!from || !to) {
            Utils.showToast(CONFIG.messages.routeRequired, 'error');
            return;
        }

        if (from === to) {
            Utils.showToast(CONFIG.messages.sameCityError, 'error');
            return;
        }

        if (!date) {
            Utils.showToast(CONFIG.messages.dateRequired, 'error');
            return;
        }

        this.state.route.from = from;
        this.state.route.to = to;
        this.state.route.date = date;

        this.displayAvailableBuses(from, to, date);
        Utils.log(`Route search: ${from} to ${to} on ${date}`, 'info');
    },

    /**
     * Display available buses for route in separate section
     */
    displayAvailableBuses(from, to, date) {
        const filteredBuses = CONFIG.buses.filter(bus => 
            bus.from === from && bus.to === to
        );

        if (filteredBuses.length === 0) {
            // Show at least one default bus for any route
            this.displayDefaultBuses(from, to, date);
            return;
        }

        // Show the results on the dedicated busesSection page
        Utils.setText('searchResultsFrom', from);
        Utils.setText('searchResultsTo', to);
        Utils.setText('searchResultsDate', Utils.formatDate(date));

        const busesResults = Utils.getElement('searchResultsList');
        busesResults.innerHTML = '';

        filteredBuses.forEach(bus => {
            const busItem = document.createElement('div');
            busItem.className = 'bus-result-card';
            const duration = Utils.calculateDuration(bus.departureTime, bus.arrivalTime);
            
            busItem.innerHTML = `
                <div class="bus-result-header">
                    <h3>${bus.name}</h3>
                    <span class="bus-type-badge">${bus.type}</span>
                </div>
                <div class="bus-result-details">
                    <div class="time-info">
                        <div class="time-item">
                            <span class="time-label">Departure</span>
                            <span class="time-value">${bus.departureTime}</span>
                        </div>
                        <div class="time-arrow">→</div>
                        <div class="time-item">
                            <span class="time-label">Arrival</span>
                            <span class="time-value">${bus.arrivalTime}</span>
                        </div>
                        <div class="time-item">
                            <span class="time-label">Duration</span>
                            <span class="time-value">${duration}</span>
                        </div>
                    </div>
                    <div class="availability-info">
                        <span class="seats-available">👥 ${bus.availableSeats}/${bus.capacity} Seats Available</span>
                        <span class="price">${Utils.formatCurrency(bus.price)}</span>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="app.selectBus(${bus.id}, '${date}')">Select Bus</button>
            `;

            busesResults.appendChild(busItem);
        });

        Utils.showSection('busesSection');
        Utils.showToast(`Found ${filteredBuses.length} bus(es) available`, 'success');
    },

    /**
     * Display default buses when no specific route matches
     */
    displayDefaultBuses(from, to, date) {
        Utils.setText('searchResultsFrom', from);
        Utils.setText('searchResultsTo', to);
        Utils.setText('searchResultsDate', Utils.formatDate(date));

        // Get the first bus as default and modify its route
        const defaultBuses = CONFIG.buses.slice(0, 3).map(bus => ({
            ...bus,
            from: from,
            to: to
        }));

        const busesResults = Utils.getElement('searchResultsList');
        busesResults.innerHTML = '';

        defaultBuses.forEach(bus => {
            const busItem = document.createElement('div');
            busItem.className = 'bus-result-card';
            const duration = Utils.calculateDuration(bus.departureTime, bus.arrivalTime);
            
            busItem.innerHTML = `
                <div class="bus-result-header">
                    <h3>${bus.name}</h3>
                    <span class="bus-type-badge">${bus.type}</span>
                </div>
                <div class="bus-result-details">
                    <div class="time-info">
                        <div class="time-item">
                            <span class="time-label">Departure</span>
                            <span class="time-value">${bus.departureTime}</span>
                        </div>
                        <div class="time-arrow">→</div>
                        <div class="time-item">
                            <span class="time-label">Arrival</span>
                            <span class="time-value">${bus.arrivalTime}</span>
                        </div>
                        <div class="time-item">
                            <span class="time-label">Duration</span>
                            <span class="time-value">${duration}</span>
                        </div>
                    </div>
                    <div class="availability-info">
                        <span class="seats-available">👥 ${bus.availableSeats}/${bus.capacity} Seats Available</span>
                        <span class="price">${Utils.formatCurrency(bus.price)}</span>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="app.selectBus(${bus.id}, '${date}')">Select Bus</button>
            `;

            busesResults.appendChild(busItem);
        });

        Utils.showSection('busesSection');
        Utils.showToast(`Showing available buses for your journey`, 'success');
    },

    /**
     * Select a bus
     */
    selectBus(busId, date) {
        const bus = Utils.findBusById(busId);
        if (!bus) return;

        this.state.booking.busId = bus.id;
        this.state.booking.busName = bus.name;
        this.state.booking.price = bus.price;

        Utils.setText('selectedBusTitle', `${bus.name}`);
        Utils.setText('busType', bus.type);
        Utils.setText('busRoute', `${this.state.route.from} → ${this.state.route.to}`);
        Utils.setText('busDepart', bus.departureTime);
        Utils.setText('busArrival', bus.arrivalTime);
        const duration = Utils.calculateDuration(bus.departureTime, bus.arrivalTime);
        Utils.setText('busDuration', duration);
        Utils.setText('busPrice', Utils.formatCurrency(bus.price));

        this.renderSeats(bus);
        Utils.showSection('bookingSection');

        Utils.log(`Bus selected: ${bus.name}`, 'info');
        Utils.showToast(`${bus.name} selected`, 'success');
    },

    /**
     * Render seats for selected bus
     */
    renderSeats(bus) {
        const seatsContainer = Utils.getElement('seatsContainer');
        if (!seatsContainer) return;

        seatsContainer.innerHTML = '';

        for (let i = 1; i <= bus.seats; i++) {
            const seat = document.createElement('div');
            const isBooked = Utils.isSeatBooked(bus, i);

            seat.className = `seat ${isBooked ? 'seat-booked' : 'seat-available'}`;
            seat.textContent = i;

            if (!isBooked) {
                seat.addEventListener('click', () => this.selectSeat(i, bus));
            }

            seatsContainer.appendChild(seat);
        }

        Utils.log(`Seats rendered for bus ${bus.name}`, 'info');
    },

    /**
     * Select a seat
     */
    selectSeat(seatNumber, bus) {
        this.state.booking.seatNumber = seatNumber;

        document.querySelectorAll('.seat').forEach(seat => {
            seat.classList.remove('seat-selected');
        });
        event.target.classList.add('seat-selected');

        this.updateSummary();

        Utils.log(`Seat ${seatNumber} selected`, 'info');
        Utils.showToast(`Seat ${seatNumber} selected`, 'success');
    },

    /**
     * Update booking summary
     */
    updateSummary() {
        const summary = this.state.booking;
        const user = this.state.user;
        const route = this.state.route;

        Utils.setText('summaryPassenger', user.name);
        Utils.setText('summaryBus', summary.busName);
        Utils.setText('summaryRoute', `${route.from} → ${route.to}`);
        Utils.setText('summarySeat', `Seat ${summary.seatNumber}`);
        Utils.setText('summaryDate', Utils.formatDate(route.date));
        Utils.setText('summaryPrice', Utils.formatCurrency(summary.price));
        Utils.setText('summaryTotal', Utils.formatCurrency(summary.price));

        Utils.toggleElement('summaryCard', true);
    },

    /**
     * Proceed to payment
     */
    proceedToPayment() {
        if (!this.state.booking.busName || !this.state.booking.seatNumber) {
            Utils.showToast('Please select a bus and seat', 'error');
            return;
        }

        Utils.toggleElement('summaryCard', false);
        Utils.toggleElement('paymentSection', true);
        Utils.toggleElement('cardFormContainer', true);
        Utils.toggleElement('mobileMoneyFormContainer', false);

        Utils.log('Proceeding to payment', 'info');
        Utils.showToast('Please select a payment method', 'info');
    },

    /**
     * Select payment method
     */
    selectPaymentMethod(method, element) {
        this.state.selectedPaymentMethod = method;

        // Remove selected class from all payment methods
        document.querySelectorAll('.payment-method').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selected class to clicked element
        element.classList.add('selected');

        // Show/hide forms based on method
        if (method === 'card') {
            Utils.toggleElement('cardFormContainer', true);
            Utils.toggleElement('mobileMoneyFormContainer', false);
            Utils.showToast('Enter your card details', 'info');
        } else {
            Utils.toggleElement('cardFormContainer', false);
            Utils.toggleElement('mobileMoneyFormContainer', true);
            
            const methodNames = {
                'mpesa': 'M-Pesa',
                'tigopesa': 'Tigo Pesa',
                'airtel': 'Airtel Money'
            };
            
            Utils.setText('mobileMoneyTitle', `Enter your ${methodNames[method]} number`);
            Utils.showToast(`Ready for ${methodNames[method]} payment`, 'info');
        }
    },

    /**
     * Process payment
     */
    processPayment(event) {
        event.preventDefault();

        if (this.state.isProcessing) return;

        // Check if payment method is selected
        if (!this.state.selectedPaymentMethod) {
            Utils.showToast('Please select a payment method', 'error');
            return;
        }

        if (this.state.selectedPaymentMethod === 'card') {
            this.processCardPayment();
        } else {
            this.processMobileMoneyPayment();
        }
    },

    /**
     * Process card payment
     */
    processCardPayment() {
        const cardName = Utils.getInputValue('cardName');
        const cardNumber = Utils.getInputValue('cardNumber');
        const cardExpiry = Utils.getInputValue('cardExpiry');
        const cardCVV = Utils.getInputValue('cardCVV');

        if (!cardName) {
            Utils.showToast('Please enter cardholder name', 'error');
            return;
        }

        if (!Utils.isValidCardNumber(cardNumber)) {
            Utils.showToast('Please enter a valid card number', 'error');
            return;
        }

        if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
            Utils.showToast('Please enter valid expiry (MM/YY)', 'error');
            return;
        }

        if (!Utils.isValidCVV(cardCVV)) {
            Utils.showToast('Please enter a valid CVV', 'error');
            return;
        }

        this.state.isProcessing = true;
        Utils.showLoader();
        Utils.showToast(CONFIG.messages.paymentProcessing, 'warning');

        setTimeout(() => {
            this.completeBooking();
            this.state.isProcessing = false;
            Utils.hideLoader();
        }, 2000);
    },

    /**
     * Process mobile money payment
     */
    processMobileMoneyPayment() {
        const mobilePhone = Utils.getInputValue('mobilePhone');

        if (!mobilePhone) {
            Utils.showToast('Please enter your phone number', 'error');
            return;
        }

        if (!/^\d{10}$/.test(mobilePhone.replace(/\D/g, ''))) {
            Utils.showToast('Please enter a valid phone number', 'error');
            return;
        }

        this.state.isProcessing = true;
        Utils.showLoader();
        Utils.showToast(CONFIG.messages.paymentProcessing, 'warning');

        setTimeout(() => {
            this.completeBooking();
            this.state.isProcessing = false;
            Utils.hideLoader();
        }, 2000);
    },

    /**
     * Complete booking
     */
    completeBooking() {
        const booking = this.state.booking;
        const user = this.state.user;
        const route = this.state.route;

        booking.reference = Utils.generateReference();

        Utils.setText('confirmName', user.name);
        Utils.setText('confirmBus', booking.busName);
        Utils.setText('confirmRoute', `${route.from} → ${route.to}`);
        Utils.setText('confirmSeat', `Seat ${booking.seatNumber}`);
        Utils.setText('confirmDate', Utils.formatDate(route.date));
        Utils.setText('confirmRef', booking.reference);

        Utils.showSection('confirmationSection');

        Utils.log(`Booking completed: ${booking.reference}`, 'info');
        Utils.showToast(CONFIG.messages.bookingSuccess, 'success');

        console.table({
            'Name': user.name,
            'Email': user.email,
            'Route': `${route.from} → ${route.to}`,
            'Date': route.date,
            'Bus': booking.busName,
            'Seat': booking.seatNumber,
            'Price': `${CONFIG.currencySymbol} ${booking.price}`,
            'Reference': booking.reference
        });
    },

    /**
     * Back to route selection
     */
    backToRoute() {
        this.state.booking = {
            busId: null,
            busName: '',
            seatNumber: null,
            price: 0,
            reference: ''
        };
        this.state.selectedPaymentMethod = null;

        Utils.clearInputs(['cardName', 'cardNumber', 'cardExpiry', 'cardCVV', 'mobilePhone']);
        Utils.toggleElement('summaryCard', false);
        Utils.toggleElement('paymentSection', false);
        Utils.showSection('routeSection');
        Utils.showToast('Back to route selection', 'success');
    },

    /**
     * Back to buses results
     */
    backToBuses() {
        Utils.showSection('busesSection');
        Utils.showToast('Back to bus selection', 'success');
    },

    /**
     * Restart booking process
     */
    restart() {
        this.state = {
            user: this.state.user,
            route: { from: '', to: '', date: '' },
            booking: { busId: null, busName: '', seatNumber: null, price: 0, reference: '' },
            isProcessing: false,
            selectedPaymentMethod: null
        };

        Utils.clearInputs(['fromLocation', 'toLocation', 'travelDate', 'cardName', 'cardNumber', 'cardExpiry', 'cardCVV', 'mobilePhone']);
        Utils.toggleElement('summaryCard', false);
        Utils.toggleElement('paymentSection', false);
        Utils.showSection('routeSection');
        Utils.showToast('Ready to book another ticket', 'success');
    },

    /**
     * Logout
     */
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            this.state = {
                user: { name: '', email: '' },
                route: { from: '', to: '', date: '' },
                booking: { busId: null, busName: '', seatNumber: null, price: 0, reference: '' },
                isProcessing: false,
                selectedPaymentMethod: null
            };

            Utils.clearInputs(['username', 'email', 'fromLocation', 'toLocation', 'travelDate', 'cardName', 'cardNumber', 'cardExpiry', 'cardCVV', 'mobilePhone']);
            Utils.showSection('loginSection');
            Utils.log('User logged out', 'info');
            Utils.showToast('Logged out successfully', 'success');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
