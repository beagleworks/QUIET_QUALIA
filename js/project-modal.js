(function() {
  'use strict';

  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');
  const modalImg = modal.querySelector('.modal-img');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-desc');
  const modalTech = modal.querySelector('.modal-tech');
  const modalBody = modal.querySelector('.modal-body');

  // Open modal
  function openModal(card) {
    const id = card.dataset.projectId;
    const title = card.dataset.title;
    const desc = card.dataset.desc;
    const img = card.dataset.img;
    const tech = JSON.parse(card.dataset.tech || '[]');

    // Get content from template
    const template = document.getElementById('content-' + id);
    const content = template ? template.innerHTML : '';

    // Set modal content
    modalImg.src = img || '';
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    // Set tech tags
    modalTech.innerHTML = '';
    tech.forEach(function(t) {
      const li = document.createElement('li');
      li.textContent = t;
      modalTech.appendChild(li);
    });

    // Set body content
    modalBody.innerHTML = content;

    // Show modal
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus trap
    closeBtn.focus();
  }

  // Close modal
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  // Event: Click on card
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      // Don't open modal if clicking a link
      if (e.target.closest('a')) return;
      openModal(card);
    });

    // Keyboard support
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Event: Close button
  closeBtn.addEventListener('click', closeModal);

  // Event: Click overlay
  overlay.addEventListener('click', closeModal);

  // Event: Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // Prevent modal container clicks from closing
  modal.querySelector('.modal-container').addEventListener('click', function(e) {
    e.stopPropagation();
  });
})();
