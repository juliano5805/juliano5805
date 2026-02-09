const orderForm = document.querySelector("#order-form");
const orderSummary = document.querySelector("#order-summary");
const whatsappLink = document.querySelector("#whatsapp-link");
const cartButtons = document.querySelectorAll(".cart-button");

const cart = [];

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const updateSummary = () => {
  if (cart.length === 0) {
    orderSummary.innerHTML = '<p class="muted">Adicione itens para ver o resumo.</p>';
    whatsappLink.href = "#";
    return;
  }

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const listItems = cart
    .map(
      (item) =>
        `<div class="summary-item"><span>${item.name}</span><strong>${formatCurrency(
          item.price
        )}</strong></div>`
    )
    .join("");

  orderSummary.innerHTML = `
    ${listItems}
    <hr />
    <div class="summary-item"><span>Total</span><strong>${formatCurrency(total)}</strong></div>
  `;
};

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cart.push({
      name: button.dataset.item,
      price: Number(button.dataset.price),
    });
    updateSummary();
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cart.length === 0) {
    alert("Adicione pelo menos um item ao carrinho.");
    return;
  }

  const formData = new FormData(orderForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const cep = formData.get("cep");
  const payment = formData.get("payment");

  const total = cart.reduce((acc, item) => acc + item.price, 0);
  const itemsText = cart.map((item) => `- ${item.name}`).join("\n");
  const message = `Nova compra confirmada!%0A%0ACliente: ${name}%0AEmail: ${email}%0ACEP: ${cep}%0APagamento: ${payment}%0AItens:%0A${itemsText}%0ATotal: ${formatCurrency(
    total
  )}`;

  whatsappLink.href = `https://wa.me/5511999990000?text=${message}`;
  whatsappLink.textContent = "Abrir WhatsApp com mensagem pronta";
  whatsappLink.classList.add("primary");
});

updateSummary();
