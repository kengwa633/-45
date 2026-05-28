# Absalom Family Bus Booking System

🚌 **Premium Travel Experience**

A modern, fully-featured bus booking system built with clean architecture, separation of concerns, and best practices.

## Features

✨ **User Management**
- Secure login with email validation
- User session management
- Logout functionality

🚌 **Bus Selection**
- 8 different bus options with various tiers (Standard, Comfort, Premium)
- Real-time bus availability
- Detailed bus information display

💺 **Seat Booking**
- Interactive seat selection
- Real-time seat availability
- Visual seat status indicators (Available, Selected, Booked)
- 20 seats per bus

💳 **Payment Processing**
- Credit card payment form
- Card validation (number, expiry, CVV)
- Secure payment simulation
- Payment confirmation

📋 **Booking Confirmation**
- Unique booking reference number
- Detailed confirmation details
- Option to book another ticket
- Booking summary display

## Architecture

The system follows **Separation of Concerns** principle:

### Files Structure
```
project/
├── index.html              # Main HTML structure
├── css/
│   ├── style.css          # Global and component styles
│   └── components.css     # Advanced animations and effects
├── js/
│   ├── config.js          # Centralized configuration
│   ├── utils.js           # Reusable utility functions
│   └── app.js             # Main application logic
└── README.md              # This file
```

### Code Organization

**config.js** - Configuration Management
- Bus database
- UI settings
- Validation rules
- Messages and currency settings

**utils.js** - Utility Functions
- DOM manipulation helpers
- Form validation functions
- Toast notifications
- Common utility methods

**app.js** - Application Logic
- State management
- User interactions
- Business logic
- Event handling

**style.css** - Styling
- Modern gradient design
- Responsive layout
- Component styles
- Animations

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No dependencies, pure JS
- **Responsive Design** - Mobile, tablet, and desktop support

## Key Features

### 1. **Centralized Configuration**
All app settings in one place for easy maintenance:
```javascript
const CONFIG = {
    buses: [...],
    ui: {...},
    validation: {...},
    messages: {...},
    currency: 'TZS'
}
```

### 2. **Reusable Utilities**
Common functions organized in Utils object:
```javascript
Utils.showToast(message, type)
Utils.isValidEmail(email)
Utils.formatCurrency(amount)
Utils.showSection(sectionId)
```

### 3. **State Management**
Centralized app state:
```javascript
app.state = {
    user: { name, email },
    booking: { busId, busName, seatNumber, price, reference },
    isProcessing: false
}
```

### 4. **Responsive Design**
- Mobile-first approach
- Breakpoints: 768px, 480px
- Touch-friendly interface
- Accessibility features

## Usage

1. **Open the application**
   ```
   Open index.html in your browser
   ```

2. **Login**
   - Enter your full name (minimum 3 characters)
   - Enter valid email address
   - Click "Login to Book"

3. **Select Bus**
   - Choose from 8 available buses
   - View bus type, capacity, and price

4. **Select Seat**
   - Click on available seats (shown in white)
   - See legend for seat status
   - Green = Selected, Gray = Booked

5. **Review & Pay**
   - Review booking summary
   - Enter payment details
   - Complete payment

6. **Confirmation**
   - View booking confirmation
   - Save reference number
   - Option to book another ticket

## Bus Options

| Bus Name | Type | Price | Seats |
|----------|------|-------|-------|
| AN CLASSIC | Standard | 5,000 Tsh | 20 |
| ADVENTURE | Comfort | 7,000 Tsh | 20 |
| SARATOGA | Premium | 9,000 Tsh | 20 |
| YEHOVA YIRE | Standard | 5,000 Tsh | 20 |
| TAKBIR | Comfort | 7,000 Tsh | 20 |
| ABOOD | Premium | 9,000 Tsh | 20 |
| ALLY STAR | Standard | 5,000 Tsh | 20 |
| NBS | Comfort | 7,000 Tsh | 20 |

## Best Practices Implemented

✅ **Code Quality**
- Clear function documentation
- Descriptive variable names
- Consistent code formatting
- Single Responsibility Principle

✅ **User Experience**
- Toast notifications for feedback
- Loading states
- Form validation
- Smooth animations
- Responsive design

✅ **Performance**
- Minimal DOM operations
- Event delegation where applicable
- Optimized CSS animations
- Lazy loading considerations

✅ **Maintainability**
- Modular code structure
- Separation of concerns
- Easy to extend
- Configuration-driven

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration for real bookings
- Database for persistent storage
- Multiple route management
- Real payment gateway integration
- Booking history and user accounts
- Email confirmation
- QR code tickets
- Admin dashboard

## License

Developed by **Kengwa Piter Janson**

---

**Version:** 2.0 (Refactored with separation of concerns)
**Last Updated:** May 28, 2026