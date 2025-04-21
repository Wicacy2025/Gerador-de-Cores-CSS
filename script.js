document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const gradientPreview = document.getElementById('gradientPreview');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const directionSelect = document.getElementById('direction');
    const gradientCode = document.getElementById('gradientCode');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.getElementById('generateBtn');

    // Update gradient function
    function updateGradient() {
        const color1 = color1Input.value;
        const color2 = color2Input.value;
        const direction = directionSelect.value;
        
        const gradientValue = `linear-gradient(${direction}, ${color1}, ${color2})`;
        gradientPreview.style.background = gradientValue;
        
        // Update code display
        gradientCode.textContent = `background: ${gradientValue};`;
    }

    // Generate random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Generate random gradient
    function generateRandomGradient() {
        color1Input.value = getRandomColor();
        color2Input.value = getRandomColor();
        
        // Randomly select a direction
        const directions = Array.from(directionSelect.options).map(option => option.value);
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        directionSelect.value = randomDirection;
        
        updateGradient();
    }

    // Copy to clipboard function
    function copyToClipboard() {
        const textToCopy = gradientCode.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Visual feedback for copy
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.color = 'var(--success-color)';
            
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                copyBtn.style.color = 'var(--secondary-color)';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    // Event listeners
    color1Input.addEventListener('input', updateGradient);
    color2Input.addEventListener('input', updateGradient);
    directionSelect.addEventListener('change', updateGradient);
    copyBtn.addEventListener('click', copyToClipboard);
    generateBtn.addEventListener('click', generateRandomGradient);

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Initialize gradient on page load
    updateGradient();
});

