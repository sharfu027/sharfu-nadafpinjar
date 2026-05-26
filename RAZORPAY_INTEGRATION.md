# 💳 Razorpay Payment Integration

## ✅ Integration Complete

All donation forms now have **Razorpay Payment Gateway** integrated with preview functionality.

## 🔑 Razorpay Credentials

```javascript
Key ID: rzp_live_SISoxIvhIen2o1
Secret Key: GtgAZMERlouP4jtpfqmpyPG1
```

⚠️ **IMPORTANT:** These are LIVE credentials. Keep them secure!

## 📋 Forms with Razorpay Integration

### 1. ರಾಜ್ಯಕ್ಕೆ ನೇರ ಮೊತ್ತ ವರ್ಗಾವಣೆ (Direct State Transfer)
- **File:** `donationdirectstate.html`
- **URL:** http://localhost:3000/donationdirectstate.html
- **Banner:** slider-1.jpg

### 2. ತಾಲೂಕಿನಿಂದ ರಾಜ್ಯಕ್ಕೆ (Taluk to State Transfer)
- **File:** `donationtaluktostate.html`
- **URL:** http://localhost:3000/donationtaluktostate.html
- **Banner:** slider-2.jpg

### 3. ಜಿಲ್ಲೆಯಿಂದ ರಾಜ್ಯಕ್ಕೆ (District to State Transfer)
- **File:** `donationdistricttostate.html`
- **URL:** http://localhost:3000/donationdistricttostate.html
- **Banner:** slider-3.jpg

## 🎯 Features Implemented

### 1. **Banner Images**
- Each form displays a banner image at the top
- Images are responsive and properly sized
- Different banner for each form type

### 2. **Form Submission Flow**
```
User fills form → Clicks "Preview and Submit" → Preview page shows → User reviews → Clicks "ಈಗ ಪಾವತಿಸಿ" → Razorpay modal opens → Payment processed
```

### 3. **Preview Page**
- Shows all entered form data
- Displays amount prominently
- Banner image at top
- Edit button to go back to form
- Payment button to proceed
- Cancel button to exit

### 4. **Razorpay Integration**
- **Payment Methods Supported:**
  - UPI (PhonePe, Google Pay, Paytm, etc.)
  - Credit/Debit Cards
  - Net Banking
  - Wallets

- **Features:**
  - Secure payment processing
  - Mobile responsive
  - Multiple payment options
  - Real-time payment status
  - Payment ID generation
  - Failed payment handling

### 5. **Data Captured**
All form data is captured and sent with payment:
- Donor/President information
- Contact details
- Location (Village, Taluk, District)
- Amount
- Year
- Bank details
- Payment mode preference

## 🔧 Technical Implementation

### JavaScript Functions

#### 1. Form Submission Handler
```javascript
document.getElementById('formId').addEventListener('submit', function(e) {
    e.preventDefault();
    // Collect form data
    // Show preview
});
```

#### 2. Preview Display
```javascript
function showPreview() {
    // Hide form
    // Show preview container
    // Display all form data
    // Show amount
}
```

#### 3. Edit Function
```javascript
function editForm() {
    // Hide preview
    // Show form
    // Scroll to top
}
```

#### 4. Razorpay Payment
```javascript
function initiatePayment() {
    const options = {
        key: RAZORPAY_KEY,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "Karnataka State Nadaf / Pinjar Sangha",
        description: "Form description",
        image: "images/header-nadaf.png",
        handler: function (response) {
            // Success callback
        },
        prefill: {
            name: formData.donorName,
            contact: formData.mobile
        },
        theme: {
            color: "#0066cc"
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}
```

## 💰 Payment Flow

### Step 1: User Fills Form
- All required fields must be filled
- Validation ensures data integrity

### Step 2: Preview Page
- User reviews all entered information
- Amount is displayed prominently
- Banner image shows at top
- Options: Edit, Pay, or Cancel

### Step 3: Payment Initiation
- User clicks "ಈಗ ಪಾವತಿಸಿ" (Pay Now)
- Razorpay modal opens
- Multiple payment options displayed

### Step 4: Payment Processing
- User selects payment method
- Completes payment
- Razorpay processes transaction

### Step 5: Payment Success
- Success message displayed
- Payment ID shown
- User redirected to homepage
- Payment details logged in console

### Step 6: Payment Failure
- Error message displayed
- User can retry payment
- Error details logged

## 🎨 UI Elements

### Banner Images
- **Size:** Full width, max-height 300px
- **Style:** Rounded corners, responsive
- **Position:** Top of form and preview page

### Preview Layout
- **Title:** Centered, blue underline
- **Data Rows:** Label-value pairs
- **Amount Display:** Large, centered, blue background
- **Buttons:** Edit (yellow), Pay (blue), Cancel (red)

### Payment Section
- **Background:** Light gray
- **Title:** "Online"
- **Buttons:** Centered, large, colorful

## 📱 Mobile Responsive

All elements are mobile-friendly:
- ✅ Forms adapt to screen size
- ✅ Buttons are touch-friendly
- ✅ Images scale properly
- ✅ Razorpay modal is responsive
- ✅ Preview layout adjusts

## 🔒 Security Features

1. **HTTPS Required:** Razorpay requires HTTPS in production
2. **Secure Keys:** Live keys should be kept secret
3. **Server Validation:** Payment verification should be done server-side
4. **Data Encryption:** All payment data is encrypted by Razorpay

## ⚠️ Important Notes

### For Production Deployment:

1. **HTTPS is Mandatory**
   - Razorpay requires HTTPS for live transactions
   - Get SSL certificate for your domain

2. **Webhook Setup**
   - Configure webhooks in Razorpay dashboard
   - Verify payment status server-side
   - Store transaction records in database

3. **Server-Side Verification**
   - Never trust client-side payment confirmation alone
   - Verify payment signature on server
   - Use Razorpay API to confirm payment status

4. **Database Integration**
   - Store form data in database
   - Link payment ID with form submission
   - Maintain transaction logs

5. **Email Notifications**
   - Send receipt to donor
   - Notify admin of new donations
   - Include payment details

## 🧪 Testing

### Test Mode
To test without real payments:
1. Replace live keys with test keys from Razorpay dashboard
2. Use test card numbers provided by Razorpay
3. Test all payment scenarios (success, failure, cancellation)

### Test Cards (Test Mode Only)
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

## 📊 Payment Data Structure

### Data Sent to Razorpay:
```javascript
{
    key: "rzp_live_SISoxIvhIen2o1",
    amount: 100000, // ₹1000 in paise
    currency: "INR",
    name: "Karnataka State Nadaf / Pinjar Sangha",
    description: "Donation type",
    prefill: {
        name: "Donor Name",
        contact: "9876543210"
    },
    notes: {
        // Custom form data
        address: "...",
        village: "...",
        taluk: "...",
        district: "..."
    }
}
```

### Response from Razorpay:
```javascript
{
    razorpay_payment_id: "pay_xxxxxxxxxxxxx",
    razorpay_order_id: "order_xxxxxxxxxxxxx", // if order created
    razorpay_signature: "xxxxxxxxxxxxx" // for verification
}
```

## 🎯 Next Steps for Production

1. **Backend Development**
   - Create API endpoints to receive form data
   - Implement payment verification
   - Set up database to store transactions

2. **Webhook Handler**
   - Create webhook endpoint
   - Verify webhook signature
   - Update payment status in database

3. **Receipt Generation**
   - Generate PDF receipts
   - Send via email
   - Store in database

4. **Admin Dashboard**
   - View all donations
   - Track payment status
   - Generate reports

5. **Email Integration**
   - Send confirmation emails
   - Send receipts
   - Notify admins

## 📞 Support

For Razorpay integration issues:
- **Documentation:** https://razorpay.com/docs/
- **Support:** https://razorpay.com/support/

---

**Status:** ✅ Razorpay Integration Complete
**Environment:** Live Mode
**Last Updated:** January 2026
