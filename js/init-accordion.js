const setAccordionStartState = () => {
  const activeContent = document.querySelectorAll('.accordion__content.active');
  if (activeContent.length) {
    activeContent.forEach((el) => {
      el.style.transition = 'none';
      el.style.maxHeight = '100%';
      setTimeout(() => {
        el.style.transition = null;
        el.style.maxHeight = el.scrollHeight + 'px';
      }, 300);
    });
  }
};

const updateActiveAccordion = () => {
  const activeContent = document.querySelectorAll('.accordion__content.active');
  if (activeContent.length) {
    activeContent.forEach((el) => {
      el.style.transition = 'none';
      el.style.maxHeight = el.scrollHeight + 'px';
      setTimeout(() => {
        el.style.transition = null;
      }, 300);
    });
  }
};

const initAccordionAction = (accordion) => {
  const media = matchMedia('(max-width: 767px)');

  if (accordion.classList.contains('accordion--only-mobile') && !media.matches) {
    return;
  }

  const btn = accordion.children[0];
  const icon = btn.querySelector('.accordion__btn-icon');
  const content = accordion.children[1];
  const parent = accordion.closest('.accordion__content');

  if (!content.children.length && icon) {
    icon.style.display = 'none';
  }

  const toggleAccordion = (e) => {
    if (e.target.classList.contains('accordion-no-click') || e.target.matches('input')) {
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    btn.blur();
    const maxHeight = content.style.maxHeight;
    if (maxHeight) {
      content.style.maxHeight = null;
      btn.classList.remove('active');
      content.classList.remove('active');
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      btn.classList.add('active');
      content.classList.add('active');
    }
    if (parent) {
      parent.style.maxHeight = parent.scrollHeight + content.scrollHeight + 'px';
    }
  };
  btn.addEventListener('click', toggleAccordion);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      toggleAccordion(e);
    }
  });
};

const initAccordion = () => {
  const accordions = document.querySelectorAll('.accordion');
  console.log(accordions)
  if (accordions.length) {
    setAccordionStartState();
    window.addEventListener('resize', updateActiveAccordion);
    accordions.forEach((accordion) => initAccordionAction(accordion));
  }
};

window.initAccordion = initAccordion;

initAccordion()
