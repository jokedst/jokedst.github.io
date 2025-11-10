# QR Code Reader PWA

A fast and simple Progressive Web App (PWA) for scanning QR codes using your device's camera.

## Features

- 📱 **Installable**: Can be installed on your Android home screen as a native app
- 📷 **Camera Access**: Uses your device's rear camera for optimal QR code scanning
- 🔍 **Real-time Scanning**: Continuously scans for QR codes in the camera feed
- 🌐 **URL Detection**: Automatically detects and creates clickable links for URLs
- 🔊 **Audio Feedback**: Plays a beep sound when a QR code is successfully scanned
- ⚡ **Offline Support**: Works offline once installed (cached resources)
- 🎨 **Modern UI**: Beautiful gradient design with responsive layout

## Installation on Android

1. Open the QR Reader in Chrome or another compatible browser
2. Look for the "Add to Home Screen" or "Install" prompt
3. Tap "Install" or "Add"
4. The app will be added to your home screen like a native app

## Installation on iOS

1. Open the QR Reader in Safari
2. Tap the Share button (square with arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right corner

## Usage

1. Tap "Start Camera" to begin scanning
2. Point your camera at a QR code
3. The app will automatically detect and display the QR code content
4. If the QR code contains a URL, it will be displayed as a clickable link
5. Tap "Stop Camera" when finished

## Shortcuts

- **Quick Scan**: Use the "Scan QR Code" shortcut from the app icon to start scanning immediately

## Technical Details

This PWA includes:
- Web App Manifest for installation
- Service Worker for offline caching
- Camera API integration
- jsQR library for QR code detection
- Responsive design for mobile devices

## Privacy

- No data is collected or transmitted
- All QR code processing happens locally on your device
- Camera access is only used for QR code scanning

## Features

- Access device camera (rear camera on mobile devices)
- Real-time QR code scanning
- Visual feedback when QR code is detected
- Clickable links if QR contains a URL
- Audio beep on successful scan
- Mobile-friendly responsive design

## How It Works

This application uses:
- **HTML5 Media Devices API** (`getUserMedia`) to access the camera
- **jsQR library** to decode QR codes from video frames
- **Canvas API** to process video frames

## Usage

1. Open `index.html` in a web browser
2. Click "Start Camera" button
3. Grant camera permissions when prompted
4. Point your camera at a QR code
5. The decoded content will appear below the video

## Requirements

- A modern web browser (Chrome, Safari, Firefox, Edge)
- HTTPS connection (required for camera access) or localhost for testing
- Camera permissions granted

## Testing Locally

### Option 1: Using Python
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### Option 2: Using Node.js (npx)
```bash
npx http-server -p 8000

# Then visit: http://localhost:8000
```

### Option 3: Using PHP
```bash
php -S localhost:8000

# Then visit: http://localhost:8000
```

## Deploying

To use this on a mobile device over the network, you need HTTPS. You can:

1. **Deploy to GitHub Pages** (free, automatic HTTPS)
2. **Deploy to Netlify/Vercel** (free, automatic HTTPS)
3. **Use ngrok for testing**:
   ```bash
   npx http-server -p 8000
   # In another terminal:
   ngrok http 8000
   ```

## Browser Compatibility

- Chrome/Edge (Desktop & Mobile)
- Safari (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Requires HTTPS (except on localhost)

## Privacy

- All processing happens locally in your browser
- No data is sent to any server
- Camera access is only active when you click "Start Camera"

## License

Free to use and modify.
