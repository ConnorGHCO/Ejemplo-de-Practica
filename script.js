(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  // theme
  function setTheme(t){
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  }
  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(saved);

  themeToggle.addEventListener('click', ()=>{
    const cur = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(cur);
  });

  // modal helpers
  function openModal(title, body){
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
  }

  document.querySelectorAll('.btn-open').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.card');
      const name = card?.dataset?.name || 'Tilín';
      const body = `Información breve sobre "${name}". Aquí puedes personalizar el contenido.`;
      openModal(name, body);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });

  // simple form handling
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const message = data.get('message').trim();
    if(!name || !email || !message){
      formMsg.textContent = 'Rellena todos los campos.';
      formMsg.style.color = 'crimson';
      return;
    }
    // simula envío
    formMsg.style.color = '';
    formMsg.textContent = 'Enviando…';
    setTimeout(()=>{
      formMsg.textContent = '¡Mensaje enviado! Gracias.';
      form.reset();
      setTimeout(()=> formMsg.textContent = '', 2500);
    },800);
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();
