let rotation = 0;

function spinWheel() {
    const wheel = document.getElementById('wheel');
    const spins = Math.floor(Math.random() * 10) + 5; // Random spins between 5 and 15
    const randomDegree = (360 * spins) + (Math.floor(Math.random() * 360)); // Extra rotation for randomness
    rotation += randomDegree;
    wheel.style.transform = `rotate(${rotation}deg)`;
    wheel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)'; // Intense shadow during spin
    setTimeout(() => {
        wheel.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)'; // Reset shadow after spin
    }, 4000); // Matches spin duration
}
