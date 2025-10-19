// script.js - simple interactivity: modal notes, quotes, and confetti.
// Save as script.js and load with <script src="script.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  const notes = {
    'Sulu': "Dear  — your giggle is my favourite sound. Keep shining, and remember I'm always here for your crazy plans!",
    'Prangya': "Dear — your courage inspires me. Thank you for being steady and kind. You are loved!",
    'Sargam': "Dear — Thanks for the endless jokes and late-night talks. Your heart, Our magic."
  };

  // Modal
  const modal = document.getElementById('noteModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const closeBtn = document.querySelector('.close-modal');

  document.querySelectorAll('.show-note').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = e.currentTarget.dataset.note;
      modalTitle.textContent = `A note for ${key}`;
      modalText.textContent = notes[key] || "A special message just for you 💛";
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  // random friendship quotes
  const quotes = [
    "Friendship is the sweetest form of love.",
    "A true friend sees the first tear, catches the second, and stops the third.",
    "Good friends are like stars — you don't always see them, but you know they are there.",
    "Friendship isn't a big thing — it's a million little things."
  ];
  document.getElementById('randomQuote').addEventListener('click', () => {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    const box = document.getElementById('quoteBox');
    box.textContent = q;
  });

  // Celebrate button triggers confetti
  const celebrateBtn = document.getElementById('celebrateBtn');
  celebrateBtn.addEventListener('click', () => {
    runConfetti();
  });

  // mini confetti inside modal
  document.getElementById('confettiMini').addEventListener('click', () => {
    runConfetti(200);
  });

  // Simple confetti implementation (canvas)
  function runConfetti(particlesCount = 400) {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    // resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // generate particles
    const colors = ['#ff9aa2','#ffb7b2','#ffdac1','#e2f0cb','#b5ead7','#c7ceea'];
    let particles = [];
    for (let i=0;i<particlesCount;i++){
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height - canvas.height,
        size: Math.random()*8 + 4,
        speedX: (Math.random()-0.5)*6,
        speedY: 2 + Math.random()*6,
        rotation: Math.random()*360,
        color: colors[Math.floor(Math.random()*colors.length)],
        spin: (Math.random()-0.5)*0.2
      });
    }

    let ticks = 0;
    function animate(){
      ticks++;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (let p of particles){
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.spin;
        // draw as rotated rectangle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
        ctx.restore();
      }
      // remove particles that fell beyond screen
      particles = particles.filter(p => p.y < canvas.height + 50);
      if (particles.length > 0 && ticks < 500) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0,0,canvas.width,canvas.height);
      }
    }
    animate();
  }

  // small accessibility: close modal on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.setAttribute('aria-hidden', 'true');
  });

}); // DOMContentLoaded
