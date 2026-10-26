// Scroll reveals, stripe races and the nav's current section. Content stays visible without this file.
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const groups = [
    '.section__title', '.project__text > *', '.project__media', '.earlier > h3', '.earlier__list > li',
    '.skills > li', '.role', '.about__story > *', '.edu__group', '.about__portrait', '.contact .ptp-container > *',
    '.site-footer__inner > *', '.ptp-stripes:not(.hero__flat)', '.term', '.fragment--flow'
  ];
  const items = document.querySelectorAll(groups.join(','));
  items.forEach((el) => {
    el.classList.add('reveal');
    // Stagger siblings that share a parent
    const sibs = [...el.parentElement.children].filter((c) => c.matches(groups.join(',')));
    el.style.setProperty('--i', Math.min(sibs.indexOf(el), 8));
  });

  const show = (el) => {
    el.classList.add('in');
  };

  if (still || !('IntersectionObserver' in window)) {
    items.forEach(show);
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '0px' });
    items.forEach((el) => { if (!el.matches('.ptp-stripes')) io.observe(el); });

    // Dividers race both ways: in from the side you scroll towards, out the far side as they pass
    // Scrolling down, lanes run left to right; scrolling up, right to left
    let lastY = scrollY, down = true;
    addEventListener('scroll', () => { down = scrollY >= lastY; lastY = scrollY; }, { passive: true });
    const race = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        e.target.style.setProperty('--from', down === e.isIntersecting ? 'left' : 'right');
        e.target.classList.toggle('in', e.isIntersecting);
      });
    });
    items.forEach((el) => { if (el.matches('.ptp-stripes')) race.observe(el); });
  }

  // Nav: mark the section in view as current
  const links = [...document.querySelectorAll('.ptp-nav__links a, .menu__links a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => (a.hash === '#' + e.target.id ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
      setLabel(links.find((a) => a.hash === '#' + e.target.id)?.textContent || 'Menu');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });

  // Sticky bar takes its tone step as soon as the page moves, so nothing scrolls under bare nav text
  const hero = document.querySelector('.hero');
  // Once the headline has gone and the bend is the last thing of the hero on screen, its lanes retract
  // to the left; they come back a little earlier on the way up, so the class never flickers at one line
  let heroH = hero.offsetHeight;
  addEventListener('resize', () => { heroH = hero.offsetHeight; });
  const root = document.documentElement;
  const onScroll = () => {
    root.classList.toggle('is-scrolled', scrollY > 8);
    const out = root.classList.contains('hero-out');
    if (!out && scrollY > heroH * 0.55) root.classList.add('hero-out');
    else if (out && scrollY < heroH * 0.4) root.classList.remove('hero-out');
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Rail: the hero's lanes ride along between the hero and the footer
  const seen = new Map();
  const ride = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target, e.isIntersecting));
    document.documentElement.classList.toggle('riding', ![...seen.values()].some(Boolean));
  });
  [hero, document.querySelector('.site-footer')].forEach((el) => ride.observe(el));

  // Phone menu
  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  const label = btn.querySelector('.menu-btn__label');
  let here = 'Menu';
  // The button's name always contains its visible text, so voice control can say what it sees
  const name = (text) => btn.setAttribute('aria-label', text === 'Menu' ? 'Menu' : text === 'Close' ? 'Close menu' : text + ', open menu');
  const behind = [document.querySelector('main'), document.querySelector('.site-footer')];
  const setOpen = (open, refocus = true) => {
    btn.setAttribute('aria-expanded', open);
    label.textContent = open ? 'Close' : here;
    name(label.textContent);
    behind.forEach((el) => { el.inert = open; });
    document.documentElement.classList.toggle('menu-open', open);
    menu.inert = !open;
    if (open) menu.querySelector('a').focus({ preventScroll: true });
    else if (refocus) btn.focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => setOpen(false, false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setOpen(false); });
  matchMedia('(min-width: 721px)').addEventListener('change', (e) => { if (e.matches) setOpen(false, false); });

  // The button's label names the section you are in, like a sign on the wall
  const setLabel = (text) => {
    here = text;
    if (label.textContent === text || btn.getAttribute('aria-expanded') === 'true') return;
    label.classList.add('swap');
    setTimeout(() => { label.textContent = text; name(text); label.classList.remove('swap'); }, still ? 0 : 180);
  };
  spy.observe(hero);
})();
