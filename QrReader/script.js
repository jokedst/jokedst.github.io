// Get DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resultDiv = document.getElementById('result');

let stream = null;
let scanning = false;
let animationFrameId = null;

// Start camera and QR scanning
async function startScanning() {
    try {
        // Request camera access with rear camera preference (for mobile)
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: 'environment' }, // Use rear camera on mobile
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        video.srcObject = stream;
        video.play();

        scanning = true;
        startButton.disabled = true;
        stopButton.disabled = false;

        // Wait for video to be ready
        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            scanQRCode();
        });

    } catch (error) {
        console.error('Error accessing camera:', error);
        showResult('Error: Unable to access camera. Please grant camera permissions.', false);
    }
}

// Stop camera and scanning
function stopScanning() {
    scanning = false;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    video.srcObject = null;
    startButton.disabled = false;
    stopButton.disabled = true;
}

// Scan QR code from video feed
function scanQRCode() {
    if (!scanning) return;

    const canvasContext = canvas.getContext('2d');
    
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current video frame to canvas
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image data from canvas
        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        
        // Scan for QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
        });

        if (code) {
            // QR code detected
            showResult(code.data, true);
            
            // Draw detection box (optional - shows where QR was found)
            drawDetectionBox(canvasContext, code.location);
        }
    }

    // Continue scanning
    animationFrameId = requestAnimationFrame(scanQRCode);
}

// Draw a box around detected QR code
function drawDetectionBox(ctx, location) {
    ctx.beginPath();
    ctx.moveTo(location.topLeftCorner.x, location.topLeftCorner.y);
    ctx.lineTo(location.topRightCorner.x, location.topRightCorner.y);
    ctx.lineTo(location.bottomRightCorner.x, location.bottomRightCorner.y);
    ctx.lineTo(location.bottomLeftCorner.x, location.bottomLeftCorner.y);
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#00ff00';
    ctx.stroke();
}

// Display scan result
function showResult(data, success) {
    resultDiv.className = success ? 'success' : '';
    
    // Check if the data is a URL
    const urlPattern = /^(https?:\/\/|www\.)/i;
    const isUrl = urlPattern.test(data);
    
    if (isUrl) {
        resultDiv.innerHTML = `
            <span class="result-label">QR Code Detected:</span>
            <div class="result-text">
                <a href="${data}" class="result-link" target="_blank" rel="noopener noreferrer">${data}</a>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <span class="result-label">${success ? 'QR Code Detected:' : 'Status:'}</span>
            <div class="result-text">${data}</div>
        `;
    }

    // Optional: Play a beep sound when QR is detected
    if (success) {
        playBeep();
    }
}

// Play a simple beep sound when QR is detected
function playBeep() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Event listeners
startButton.addEventListener('click', startScanning);
stopButton.addEventListener('click', stopScanning);

// Handle page visibility change (pause when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && scanning) {
        // Optionally pause scanning when page is hidden
        // stopScanning();
    }
});
