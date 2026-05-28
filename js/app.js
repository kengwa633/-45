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
        booking: {
            busId: null,
            busName: '',
            seatNumber: null,
            price: 0,
            reference: ''
        },
        isProcessing: false
    },

    /**
     * Initialize application
     */
    init() {
        Utils.log('Initializing application...', 'info');
        this.renderBuses();
        this.attachEventListeners();
    },

    /**
     * Attach global event listeners
     */
    attachEventListeners() {
        // Close loader when page loads
        window.addEventListener('load', () => {
            Utils.hideLoader();
        });

        // Enter key on form fields
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
     * @param {Event} event - Form submit event
     */
    handleLogin(event) {
        event.preventDefault();

        const name = Utils.getInputValue('username');
        const email = Utils.getInputValue('email');

        // Validation
        if (!Utils.isValidName(name)) {
            Utils.showToast(CONFIG.messages.loginRequired, 'error');
            return;
        }

        if (!Utils.isValidEmail(email)) {
            Utils.showToast(CONFIG.messages.invalidEmail, 'error');
            return;
        }

        // Save user data
        this.state.user.name = name;
        this.state.user.email = email;

        Utils.log(`User logged in: ${name}`, 'info');

        // Update UI
        Utils.setText('userDisplay', `👤 ${name}`);

        // Show main system
        Utils.showSection('bookingSection');
        Utils.showToast(`Welcome, ${name}!`, 'success');
    },

    /**
     * Render bus selection grid
     */
    renderBuses() {
        const busGrid = Utils.getElement('busGrid');
        if (!busGrid) return;

        busGrid.innerHTML = '';

        CONFIG.buses.forEach(bus => {
            const busCard = document.createElement('div');
            busCard.className = 'bus-card';
            busCard.innerHTML = `
                <h3>${bus.name}</h3>
                <p><strong>${bus.type}</strong></p>
                <p>👥 ${bus.capacity} seats</p>
                <p class="price-highlight">${Utils.formatCurrency(bus.price)}</p>
            `;

            busCard.addEventListener('click', () => this.selectBus(bus));
            busGrid.appendChild(busCard);
        });

        Utils.log('Buses rendered', 'info');
    },

    /**
     * Select a bus
     * @param {Object} bus - Bus object
     */
    selectBus(bus) {
        // Update state
        this.state.booking.busId = bus.id;
        this.state.booking.busName = bus.name;
        this.state.booking.price = bus.price;

        // Update UI
        Utils.setText('selectedBusTitle', `You selected: ${bus.name}`);
        Utils.setText('busType', bus.type);
        Utils.setText('busCapacity', bus.capacity);
        Utils.setText('busPrice', Utils.formatCurrency(bus.price));

        // Show bus info and seat section
        Utils.toggleElement('busInfoCard', true);
        Utils.toggleElement('seatSection', true);
        Utils.toggleElement('summaryCard', false);
        Utils.toggleElement('paymentSection', false);

        // Highlight selected bus
        document.querySelectorAll('.bus-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.bus-card').classList.add('selected');

        // Render seats
        this.renderSeats(bus);

        Utils.log(`Bus selected: ${bus.name}`, 'info');
        Utils.showToast(`${bus.name} selected`, 'success');
    },

    /**
     * Render seats for selected bus
     * @param {Object} bus - Bus object
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
     * @param {number} seatNumber - Seat number
     * @param {Object} bus - Bus object
     */
    selectSeat(seatNumber, bus) {
        // Update state
        this.state.booking.seatNumber = seatNumber;

        // Update seat selection UI
        document.querySelectorAll('.seat').forEach(seat => {
            seat.classList.remove('seat-selected');
        });
        event.target.classList.add('seat-selected');

        // Update summary
        this.updateSummary();

        Utils.log(`Seat ${seatNumber} selected`, 'info');
        Utils.showToast(`Seat ${seatNumber} selected`, 'success');
    },

    /**
     * Update booking summary
     */
    updateSummary() {
        const summary = this.state.booking;

        Utils.setText('summaryBus', summary.busName);
        Utils.setText('summarySeat', `Seat ${summary.seatNumber}`);
        Utils.setText('summaryPrice', Utils.formatCurrency(summary.price));
        Utils.setText('summaryTotal', Utils.formatCurrency(summary.price));

        // Show summary card
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

        // Hide summary, show payment
        Utils.toggleElement('summaryCard', false);
        Utils.toggleElement('paymentSection', true);

        Utils.log('Proceeding to payment', 'info');
        Utils.showToast('Please enter payment details', 'warning');
    },

    /**
     * Process payment
     * @param {Event} event - Form submit event
     */
    processPayment(event) {
        event.preventDefault();

        if (this.state.isProcessing) return;

        const cardName = Utils.getInputValue('cardName');
        const cardNumber = Utils.getInputValue('cardNumber');
        const cardExpiry = Utils.getInputValue('cardExpiry');
        const cardCVV = Utils.getInputValue('cardCVV');

        // Validation
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

        // Process payment
        this.state.isProcessing = true;
        Utils.showLoader();
        Utils.showToast(CONFIG.messages.paymentProcessing, 'warning');

        // Simulate payment processing
        setTimeout(() => {
            this.completeBooking();
            this.state.isProcessing = false;
            Utils.hideLoader();
        }, 2000);
    },

    /**
     * Complete booking and show confirmation
     */
    completeBooking() {
        const booking = this.state.booking;
        const user = this.state.user;

        // Generate reference
        booking.reference = Utils.generateReference();

        // Update confirmation UI
        Utils.setText('confirmName', user.name);
        Utils.setText('confirmBus', booking.busName);
        Utils.setText('confirmSeat', `Seat ${booking.seatNumber}`);
        Utils.setText('confirmRef', booking.reference);

        // Show confirmation section
        Utils.showSection('confirmationSection');

        Utils.log(`Booking completed: ${booking.reference}`, 'info');
        Utils.showToast(CONFIG.messages.bookingSuccess, 'success');

        // Log booking details
        console.table({
            'Name': user.name,
            'Email': user.email,
            'Bus': booking.busName,
            'Seat': booking.seatNumber,
            'Price': `${CONFIG.currencySymbol} ${booking.price}`,
            'Reference': booking.reference
        });
    },

    /**
     * Restart booking process
     */
    restart() {
        // Reset state
        this.state = {
            user: this.state.user,
            booking: {
                busId: null,
                busName: '',
                seatNumber: null,
                price: 0,
                reference: ''
            },
            isProcessing: false
        };

        // Clear forms
        Utils.clearInputs(['cardName', 'cardNumber', 'cardExpiry', 'cardCVV']);

        // Reset UI
        Utils.toggleElement('busInfoCard', false);
        Utils.toggleElement('seatSection', false);
        Utils.toggleElement('summaryCard', false);
        Utils.toggleElement('paymentSection', false);

        // Show booking section
        Utils.showSection('bookingSection');
        this.renderBuses();

        Utils.log('Booking restarted', 'info');
        Utils.showToast('Ready to book another ticket', 'success');
    },

    /**
     * Logout
     */
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            // Reset all state
            this.state = {
                user: { name: '', email: '' },
                booking: {
                    busId: null,
                    busName: '',
                    seatNumber: null,
                    price: 0,
                    reference: ''
                },
                isProcessing: false
            };

            // Clear all inputs
            Utils.clearInputs(['username', 'email', 'cardName', 'cardNumber', 'cardExpiry', 'cardCVV']);

            // Show login section
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