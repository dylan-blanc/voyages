// Simple carrousel par carte
// Contrat:
// - Chaque .carousel a un attribut data-images: liste séparée par |
// - Image courante affichée dans l'élément <img>
// - Boutons .prev et .next pour naviguer
// - Clavier: flèche gauche/droite quand le focus est dans la carte

(function(){
  function initCarousel(root) {
    const imgEl = root.querySelector('img');
    const prevBtn = root.querySelector('.prev');
    const nextBtn = root.querySelector('.next');
    const list = (root.getAttribute('data-images') || '').split('|').map(s => s.trim()).filter(Boolean);
    if (!imgEl || list.length === 0) return;

    let index = 0;
    const update = () => {
      imgEl.src = list[index];
      const baseAlt = imgEl.alt.replace(/\s+\d+$/, '');
      imgEl.alt = baseAlt ? `${baseAlt} ${index+1}` : `Image ${index+1}`;
    };

    prevBtn && prevBtn.addEventListener('click', () => {
      index = (index - 1 + list.length) % list.length;
      update();
    });

    nextBtn && nextBtn.addEventListener('click', () => {
      index = (index + 1) % list.length;
      update();
    });

    // navigation au clavier pour accessibilité
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevBtn && prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextBtn && nextBtn.click();
      }
    });

    update();
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel').forEach(initCarousel);
  });
})();
