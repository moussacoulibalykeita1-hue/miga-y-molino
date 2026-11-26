(() => {
  const search = document.getElementById('menu-query');
  const tabs = document.getElementById('tabs');
  const menu = document.getElementById('menu');
  const empty = document.getElementById('menu-empty');
  const results = document.getElementById('menu-results');
  const count = document.getElementById('cart-count');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  function filterMenu() {
    const terms = normalize(search.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const row of menu.children) {
      const copy = normalize(row.textContent);
      row.hidden = !terms.every(term => copy.includes(term));
      if (!row.hidden) visible++;
    }
    empty.hidden = visible > 0;
    results.textContent = visible === 1 ? '1 producto encontrado' : visible + ' productos encontrados';
  }

  function selectCategory(category) {
    renderMenu(category);
    filterMenu();
  }

  function updateCartCount() {
    count.textContent = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  }

  search.addEventListener('input', filterMenu);
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.cat) {
      filterMenu();
      Array.from(tabs.children).find(tab => tab.dataset.cat === button.dataset.cat)?.focus();
    }
    if (button.dataset.add || button.dataset.minus) updateCartCount();
    if (button.dataset.minus && !button.isConnected) {
      const replacement = document.querySelector('#cart [data-minus="' + button.dataset.minus + '"]');
      (replacement || document.getElementById('cesta')).focus();
    }
  });

  document.getElementById('reset-menu').addEventListener('click', () => {
    search.value = '';
    selectCategory('Todo');
    search.focus();
  });

  document.getElementById('show-bakery').addEventListener('click', () => {
    search.value = '';
    selectCategory('Horno');
  });

  filterMenu();
  updateCartCount();
})();
