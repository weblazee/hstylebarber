/* Hstylebarber — interactividad mínima, editorial */
(function(){
  'use strict';

  // ===== Mosaico de trabajo: broken grid asimétrico =====
  // Tamaños deliberadamente irregulares — sin tarjetas iguales.
  const IMG = id => `https://image.jimcdn.com/app/cms/image/transf/dimension=1920x400:format=png/path/sa96c700fab573b7a/image/${id}/version/1753817488/image.png`;
  const ids = [
    'i86c317418ab6efae','i31f6898d5e7639cc','i04b92ffa8a0a01dc','i3275b984c682a879',
    'i8673f908537c72ea','iee1fd3d45a01066a','i206f282f8d9e48cf','ia9d7104ceaf20295',
    'i8035400df5338642','iac3e56b5e5c16f90','i6155185488d1d2d6','if5405754841551de',
    'i7af7cf800899d9d1','i6aa80483c60fe95b','i0a406f6f7c0d223d','ib7a42d32eb8f3a66',
    'ic61b6d2e28de7f69','ic8f4069262657f36','i26ff85c6b3aee602','ib64fcd9025a115e0',
    'i86e8524b9ecacb63','i983bf7762cefb103','i261b26430efc2c7f','iee82ecd86bc56188',
    'i058df11cb187bb58','i8f28c520003fdda3','i7efcabad393900b9','ib02437fdd9a48474',
    'i8a7d704b04ce10dc','i6d5fbffb53303b13','i662520b4bbdf143c','i5f87261bfac429b0',
    'i2b0e11e8bed90c69','if849b587e39f00b8','i3fd542d2afb43437','i2007b8dc0ed869bd'
  ];
  // Patrón fijo de bloques (col-span, row-span) — repite cíclicamente.
  const pattern = [
    [7,5],[5,3],[5,2],[4,4],[3,3],[5,4],[4,3],[4,3],[3,4],
    [5,3],[4,4],[3,3],[6,3],[6,4],[4,3],[4,3],[4,3]
  ];
  const mosaic = document.getElementById('mosaic');
  if(mosaic){
    const frag = document.createDocumentFragment();
    ids.forEach((id,i) => {
      const [c,r] = pattern[i % pattern.length];
      const fig = document.createElement('figure');
      fig.style.gridColumn = `span ${c}`;
      fig.style.gridRow = `span ${r}`;
      fig.innerHTML = `<img loading="lazy" decoding="async" src="${IMG(id)}" alt="Cliente del estudio Hstylebarber" />`;
      frag.appendChild(fig);
    });
    mosaic.appendChild(frag);
  }

  // ===== Topbar scroll =====
  const top = document.getElementById('topbar');
  const onScroll = () => top.classList.toggle('scrolled', window.scrollY > 20);
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ===== Menú móvil =====
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.topbar__nav');
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); burger.classList.remove('open');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }));

  // ===== Reveal on scroll (suave, no fade-in agresivo) =====
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.spread, .bio, .svc, .academy, .proof, .contact, .work__head')
    .forEach(el => { el.classList.add('reveal'); io.observe(el); });

  // ===== Año =====
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
