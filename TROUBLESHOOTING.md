# 🔧 Troubleshooting Guide

## Issue: Razorpay showing ₹1 instead of actual amount

### Cause:
Browser cache is showing old version of the page.

### Solutions:

## Solution 1: Hard Refresh Browser (Recommended)

### Windows/Linux:
- **Chrome/Edge:** Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Firefox:** Press `Ctrl + Shift + R` or `Ctrl + F5`

### Mac:
- **Chrome/Safari:** Press `Cmd + Shift + R`
- **Firefox:** Press `Cmd + Shift + R`

## Solution 2: Clear Browser Cache

### Chrome/Edge:
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh the page

### Firefox:
1. Press `Ctrl + Shift + Delete`
2. Select "Cache"
3. Click "Clear Now"
4. Refresh the page

## Solution 3: Use Incognito/Private Mode

1. Open browser in Incognito/Private mode
2. Visit: http://localhost:3000/donationdirectstate.html
3. Test the payment

## Solution 4: Test Payment Page

We've created a simple test page to verify Razorpay is working:

**URL:** http://localhost:3000/test-payment.html

This page will:
- Show debug information
- Test payment with any amount
- Verify Razorpay integration

## Solution 5: Restart Server

1. Stop the server: Press `Ctrl + C` in terminal
2. Start again: `npm start`
3. Hard refresh browser: `Ctrl + Shift + R`

## Verification Steps:

### Step 1: Test Page
1. Open: http://localhost:3000/test-payment.html
2. Enter amount: 500
3. Click "Test Payment"
4. Check if Razorpay shows ₹500

### Step 2: Actual Form
1. Open: http://localhost:3000/donationdirectstate.html
2. Fill all fields
3. Enter amount: 1000
4. Click "Preview and Submit"
5. Check preview page shows ₹1000
6. Click "ಈಗ ಪಾವತಿಸಿ"
7. Razorpay should show ₹1000

## Debug Information:

### Check Browser Console:
1. Press `F12` to open Developer Tools
2. Go to "Console" tab
3. Fill form and submit
4. Look for these logs:
   ```
   Form Data Amount: 1000
   Calculated Amount in paise: 100000
   ```

### If you see errors:
- Check if Razorpay script is loaded
- Check if amount field has value
- Check console for JavaScript errors

## Common Issues:

### Issue 1: Amount shows as ₹1
**Cause:** Browser cache
**Fix:** Hard refresh (Ctrl + Shift + R)

### Issue 2: Razorpay modal doesn't open
**Cause:** Razorpay script not loaded
**Fix:** Check internet connection, refresh page

### Issue 3: Payment fails immediately
**Cause:** Invalid Razorpay keys or amount
**Fix:** Verify keys are correct, amount is > 0

### Issue 4: Form doesn't submit
**Cause:** Required fields not filled
**Fix:** Fill all fields marked with *

## Testing Checklist:

- [ ] Server is running (http://localhost:3000)
- [ ] Browser cache cleared
- [ ] Test page works (test-payment.html)
- [ ] Form fields filled correctly
- [ ] Amount is greater than 0
- [ ] Preview page shows correct amount
- [ ] Razorpay modal opens
- [ ] Razorpay shows correct amount

## Still Not Working?

### Check These:

1. **Server Running?**
   ```bash
   npm start
   ```

2. **Correct URL?**
   - http://localhost:3000/donationdirectstate.html
   - NOT: http://localhost:3000/donationdirectstate.aspx

3. **Browser Console Errors?**
   - Press F12
   - Check Console tab
   - Look for red errors

4. **Internet Connection?**
   - Razorpay requires internet
   - Check if https://checkout.razorpay.com is accessible

## Quick Test Command:

Open browser console (F12) and run:
```javascript
console.log('Amount test:', document.getElementById('amount').value);
```

This should show the amount you entered.

## Contact Support:

If issue persists:
1. Take screenshot of browser console (F12 → Console)
2. Take screenshot of Network tab (F12 → Network)
3. Note the exact steps you followed
4. Share error messages

---

**Most Common Fix:** Hard refresh browser with `Ctrl + Shift + R`

**Test URL:** http://localhost:3000/test-payment.html
