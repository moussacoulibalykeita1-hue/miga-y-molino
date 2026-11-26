(() => {
  const toast = document.getElementById('cart-toast');
  const announcement = document.getElementById('cart-announcement');
  let hideTimer;

  document.addEventListener('click', event => {
    const button = event.target.closest('button[data-add]');
    if (!button) return;
    const product = products.find(item => item.id === Number(button.dataset.add));
    if (!product) return;

    const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
    const detail = `${product.name} · ${count} ${count === 1 ? 'producto' : 'productos'} en el carrito`;
    const check = document.createElement('span');
    check.className = 'cart-toast__check';
    check.textContent = '✓';
    const message = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = 'Añadido al carrito';
    const summary = document.createElement('span');
    summary.className = 'cart-toast__detail';
    summary.textContent = detail;
    message.append(title, summary);
    toast.replaceChildren(check, message);
    announcement.textContent = title.textContent + '. ' + detail;
    toast.classList.add('is-visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toast.classList.remove('is-visible'), 3400);

    // The existing cart redraw replaces its quantity buttons.
    if (!button.isConnected) {
      document.querySelector('#cart button[data-add="' + product.id + '"]')?.focus();
    }
  });
})();
