(() => {
  // booking dates: today / tomorrow by default, check-out always after check-in
  const ci = document.getElementById('checkin');
  const co = document.getElementById('checkout');
  const iso = d => d.toISOString().slice(0, 10);
  const today = new Date();
  const tomorrow = new Date(Date.now() + 864e5);
  ci.min = iso(today); ci.value = iso(today);
  co.min = iso(tomorrow); co.value = iso(tomorrow);
  const ENGINE = 'https://reservations.hotel-spider.com/036655c560053c06';
  const nightsEl = document.getElementById('nights');
  const bookUrl = () => `${ENGINE}?checkIn=${ci.value}&checkOut=${co.value}&propertyId=420`;
  const refresh = () => {
    const n = Math.round((new Date(co.value) - new Date(ci.value)) / 864e5);
    nightsEl.textContent = n > 0 ? `${n} night${n > 1 ? 's' : ''}` : '';
    document.querySelectorAll('.book-link').forEach(a => {
      a.href = bookUrl(); a.target = '_blank'; a.rel = 'noopener';
    });
  };
  ci.addEventListener('change', () => {
    const next = new Date(new Date(ci.value).getTime() + 864e5);
    co.min = iso(next);
    if (!co.value || co.value <= ci.value) co.value = iso(next);
    refresh();
  });
  co.addEventListener('change', refresh);
  refresh();

  // mobile menu
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.links');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a')) { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  });

  // 360 tour: load Google Street View only when the guest clicks
  const tf = document.getElementById('tourFrame');
  tf.querySelector('.tour-start').addEventListener('click', () => {
    tf.innerHTML = `<iframe src="${tf.dataset.src}" title="360 degree virtual tour of Hotel Rajputana Palace" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  });

  // gallery lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  document.getElementById('galleryStrip').addEventListener('click', e => {
    const img = e.target.closest('button')?.querySelector('img');
    if (!img) return;
    lbImg.src = img.src; lbImg.alt = img.alt;
    lb.showModal();
  });
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-close')) lb.close(); });

  // reveal on scroll
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll('.section h2, .room, .ev, .capacity, .arch-pair, .dine-imgs, .timings, .c-cards a, .map');
    els.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
    }), { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }
})();

