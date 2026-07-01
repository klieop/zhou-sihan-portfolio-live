const imageBase = '/assets/portfolio/images/';
const imageLabels = {
  'ip-sanxingdui.jpg': 'Cultural IP system',
  'yangzijiang-packaging-grid.jpg': 'Packaging family',
  'yangzijiang-logo.jpg': 'Logo extension',
  'yangzijiang-city-series.jpg': 'City illustration series',
  'yangzijiang-box-mockup.jpg': 'Product mockup',
  'wild-border-book-cover.png': 'Book cover system',
  'wild-border-folding-book.jpg': 'Reading structure',
  'wild-border-inner-pages.jpg': 'Editorial spreads',
  'wild-border-gift-box.jpg': 'Gift box extension',
  'wild-border-cup.jpg': 'Cup application',
  'happyli-strategy.jpg': 'Brand strategy board',
  'happyli-logo-system.jpg': 'Logo system',
  'happyli-applications.jpg': 'Touchpoint applications'
};

async function loadPortfolio() {
  const response = await fetch('/assets/portfolio/data.json');
  const data = await response.json();
  renderProjects(data.projects);
}

function renderProjects(projects) {
  const root = document.querySelector('#project-list');
  root.innerHTML = projects.map((project) => `
    <article class="project reveal" id="${project.id}" data-count="${project.images.length}">
      <div class="project__meta">
        <div class="project__number">${project.number}</div>
        <p class="project__category">${project.category}</p>
        <h3>${project.title}</h3>
        <p class="project__subtitle">${project.subtitle}</p>
        <p class="project__summary">${project.summary}</p>
        <div class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      </div>
      <div class="gallery">
        ${project.images.map((image) => `
          <figure class="media-hover">
            <img src="${imageBase}${image}" alt="${project.title} - ${imageLabels[image] || 'portfolio image'}" loading="lazy">
            <figcaption>${imageLabels[image] || project.context}</figcaption>
          </figure>
        `).join('')}
      </div>
    </article>
  `).join('');
  observeReveal();
}

function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));
}

function setupCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || matchMedia('(pointer: coarse)').matches) return;
  window.addEventListener('pointermove', (event) => {
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });
  document.addEventListener('mouseover', (event) => {
    if (event.target.closest('.media-hover, a, button')) cursor.classList.add('is-on');
  });
  document.addEventListener('mouseout', (event) => {
    if (event.target.closest('.media-hover, a, button')) cursor.classList.remove('is-on');
  });
}

function setupPalette() {
  const states = ['green', 'orange', 'ink'];
  let index = 0;
  document.querySelector('.palette')?.addEventListener('click', () => {
    index = (index + 1) % states.length;
    document.documentElement.dataset.accent = states[index] === 'green' ? '' : states[index];
  });
}

loadPortfolio();
observeReveal();
setupCursor();
setupPalette();
