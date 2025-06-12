// autoplay-security.js

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[autoplay], video[data-autoplay]');
  const audios = document.querySelectorAll('audio[autoplay], audio[data-autoplay]');

  // Try autoplaying all media silently
  [...videos, ...audios].forEach(media => {
    media.muted = true; // required for autoplay in modern browsers
    const playPromise = media.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(`[SECURE AUTOPLAY] Media autoplayed successfully.`);
        })
        .catch(error => {
          console.warn(`[SECURE AUTOPLAY] Autoplay blocked:`, error);
          // Show play button if blocked
          const playButton = document.createElement('button');
          playButton.textContent = "▶ Play";
          playButton.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999; padding: 10px 20px;
            font-size: 1.2rem; background: #fff; border: none; cursor: pointer;
          `;
          media.parentElement.style.position = 'relative';
          media.parentElement.appendChild(playButton);

          playButton.addEventListener('click', () => {
            media.muted = false;
            media.play();
            playButton.remove();
          });
        });
    }
  });
});
