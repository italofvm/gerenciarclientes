// Inicializa a lista a partir do LocalStorage com proteções
let clients = [];
try {
  const stored = localStorage.getItem("whatsapp_clients");
  clients = stored ? JSON.parse(stored) : [];
  if (!Array.isArray(clients)) clients = [];
} catch (err) {
  clients = [];
  localStorage.removeItem("whatsapp_clients");
}

// Variáveis auxiliares
let clientToDeleteIndex = null;
let toastTimeout = null;

function formatPhone(digits) {
  if (!digits) return "";
  const d = digits.replace(/\D/g, "");
  if (d.length === 11) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  if (d.length === 10) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  return d;
}

function renderClients() {
  const listElement = document.getElementById("clientList");
  const emptyState = document.getElementById("emptyState");
  listElement.innerHTML = "";

  if (clients.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  clients.forEach((client, index) => {
    const cleanPhone = client.phone.replace(/\D/g, "");
    const waLink = `https://wa.me/55${cleanPhone}`;

    const card = document.createElement("div");
    card.className =
      "bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between card-animation";

    const left = document.createElement("div");
    left.className = "flex-1";

    const title = document.createElement("h3");
    title.className = "font-bold text-gray-800";
    title.textContent = client.name;

    const phoneEl = document.createElement("p");
    phoneEl.className = "text-gray-500 text-sm";
    phoneEl.textContent = formatPhone(cleanPhone);

    left.appendChild(title);
    left.appendChild(phoneEl);

    const right = document.createElement("div");
    right.className = "flex items-center space-x-2";

    const a = document.createElement("a");
    a.href = waLink;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className =
      "whatsapp-btn text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center";
    a.innerHTML = `<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 7.454c-1.932 0-3.84-.518-5.516-1.498l-.396-.234-4.102 1.075 1.094-4-0.257-.409c-.994-1.583-1.518-3.414-1.518-5.292 0-5.501 4.475-9.976 9.977-9.976 2.665 0 5.17 1.037 7.053 2.92 1.883 1.883 2.92 4.388 2.92 7.054 0 5.503-4.477 9.978-9.978 9.978m9.13-18.767c-2.438-2.437-5.682-3.78-9.129-3.78-7.11 0-12.895 5.785-12.895 12.896 0 2.272.594 4.49 1.723 6.452l-1.832 6.69 6.845-1.795c1.898 1.035 4.04 1.581 6.216 1.581 0.003 0 0.006 0 0.01 0 7.11 0 12.896-5.786 12.896-12.897 0-3.447-1.343-6.691-3.781-9.129z"/></svg> Abrir Chat`;

    const delBtn = document.createElement("button");
    delBtn.className = "p-2 text-gray-400 hover:text-red-500 transition-colors";
    delBtn.title = "Apagar Cliente";
    delBtn.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`;
    delBtn.addEventListener("click", () => deleteClient(index));

    right.appendChild(a);
    right.appendChild(delBtn);

    card.appendChild(left);
    card.appendChild(right);

    listElement.appendChild(card);
  });
}

function addClient() {
  const nameInput = document.getElementById("clientName");
  const phoneInput = document.getElementById("clientPhone");

  const name = nameInput.value.trim();
  const phoneDigits = phoneInput.value.replace(/\D/g, "");

  if (name === "" || !/^\d{10,11}$/.test(phoneDigits)) {
    showToast("Preencha um nome e telemóvel válidos!", "error");
    return;
  }

  // Previne duplicados pelo número
  if (clients.some((c) => c.phone === phoneDigits)) {
    showToast("Já existe um cliente com este telemóvel.", "error");
    return;
  }

  clients.push({ name, phone: phoneDigits });

  nameInput.value = "";
  phoneInput.value = "";

  saveClients();
  renderClients();
  showToast("Cliente salvo no navegador com sucesso!", "success");
}

function deleteClient(index) {
  clientToDeleteIndex = index;
  const clientName = clients[index] && clients[index].name;
  const modalNameElement = document.getElementById("clientNameModal");
  if (modalNameElement) modalNameElement.textContent = clientName || "";

  const modal = document.getElementById("deleteModal");
  const backdrop = document.getElementById("modalBackdrop");
  const panel = document.getElementById("modalPanel");

  if (modal && backdrop && panel) {
    modal.classList.remove("hidden");
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      panel.classList.remove("opacity-0", "scale-95");
      panel.classList.add("opacity-100", "scale-100");
      // foco no botão de confirmar
      const confirmBtn = modal.querySelector("button[type='button']");
      if (confirmBtn) confirmBtn.focus();
    }, 10);
  }
}

function confirmDeleteAction() {
  if (clientToDeleteIndex !== null && clientToDeleteIndex >= 0 && clientToDeleteIndex < clients.length) {
    clients.splice(clientToDeleteIndex, 1);
    saveClients();
    renderClients();
    closeModal();
    showToast("Cliente removido com sucesso!", "success");
    clientToDeleteIndex = null;
  }
}

function closeModal() {
  const modal = document.getElementById("deleteModal");
  const backdrop = document.getElementById("modalBackdrop");
  const panel = document.getElementById("modalPanel");

  if (modal && backdrop && panel) {
    backdrop.classList.add("opacity-0");
    panel.classList.remove("opacity-100", "scale-100");
    panel.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }
}

function saveClients() {
  try {
    localStorage.setItem("whatsapp_clients", JSON.stringify(clients));
  } catch (err) {
    console.error("Erro ao salvar clientes:", err);
  }
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toastMessage");
  const iconEl = document.getElementById("toastIcon");
  if (!toast || !msgEl || !iconEl) return;

  msgEl.textContent = message;
  if (type === "success") {
    iconEl.innerHTML = `<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else {
    iconEl.innerHTML = `<svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  }

  toast.classList.remove("translate-y-20", "opacity-0");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
    toastTimeout = null;
  }, 3000);
}

// Eventos globais e inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderClients();

  // Fecha modal com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const modal = document.getElementById("deleteModal");
      if (modal && !modal.classList.contains("hidden")) closeModal();
    }
  });
});
