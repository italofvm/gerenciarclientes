// Inicializa a lista a partir do LocalStorage ou vazia
let clients = JSON.parse(localStorage.getItem("whatsapp_clients")) || [];

// Variável auxiliar para saber quem estamos deletando
let clientToDeleteIndex = null;

function renderClients() {
  const listElement = document.getElementById("clientList");
  const emptyState = document.getElementById("emptyState");

  listElement.innerHTML = "";

  if (clients.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    clients.forEach((client, index) => {
      // Limpa o número para o link
      const cleanPhone = client.phone.replace(/\D/g, "");
      const waLink = `https://wa.me/55${cleanPhone}`;

      const card = document.createElement("div");
      card.className =
        "bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between card-animation";
      card.innerHTML = `
                        <div class="flex-1">
                            <h3 class="font-bold text-gray-800">${client.name}</h3>
                            <p class="text-gray-500 text-sm">${client.phone}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <a href="${waLink}" target="_blank" class="whatsapp-btn text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 7.454c-1.932 0-3.84-.518-5.516-1.498l-.396-.234-4.102 1.075 1.094-4-0.257-.409c-.994-1.583-1.518-3.414-1.518-5.292 0-5.501 4.475-9.976 9.977-9.976 2.665 0 5.17 1.037 7.053 2.92 1.883 1.883 2.92 4.388 2.92 7.054 0 5.503-4.477 9.978-9.978 9.978m9.13-18.767c-2.438-2.437-5.682-3.78-9.129-3.78-7.11 0-12.895 5.785-12.895 12.896 0 2.272.594 4.49 1.723 6.452l-1.832 6.69 6.845-1.795c1.898 1.035 4.04 1.581 6.216 1.581 0.003 0 0.006 0 0.01 0 7.11 0 12.896-5.786 12.896-12.897 0-3.447-1.343-6.691-3.781-9.129z"/></svg>
                                Abrir Chat
                            </a>
                            <button onclick="deleteClient(${index})" class="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Apagar Cliente">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    `;
      listElement.appendChild(card);
    });
  }
}

function addClient() {
  const nameInput = document.getElementById("clientName");
  const phoneInput = document.getElementById("clientPhone");

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim().replace(/\D/g, "");

  if (name === "" || phone.length < 10) {
    showToast("Preencha um nome e telemóvel válidos!", "error");
    return;
  }

  // Adiciona ao array
  clients.push({ name, phone });

  // Limpa campos
  nameInput.value = "";
  phoneInput.value = "";

  // Salva e atualiza interface
  saveClients();
  renderClients();
  showToast("Cliente salvo no navegador com sucesso!", "success");
}

function deleteClient(index) {
  // Salva o índice no escopo global temporário
  clientToDeleteIndex = index;

  // Atualiza o nome do cliente no modal
  const clientName = clients[index].name;
  const modalNameElement = document.getElementById("clientNameModal");
  if (modalNameElement) modalNameElement.textContent = clientName;

  // Mostra o modal com animação
  const modal = document.getElementById("deleteModal");
  const backdrop = document.getElementById("modalBackdrop");
  const panel = document.getElementById("modalPanel");

  if (modal && backdrop && panel) {
    modal.classList.remove("hidden");

    // Pequeno timeout para permitir que a transição CSS funcione (opacity 0 -> 1)
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      panel.classList.remove("opacity-0", "scale-95");
      panel.classList.add("opacity-100", "scale-100");
    }, 10);
  }
}

function confirmDeleteAction() {
  if (clientToDeleteIndex !== null) {
    // Remove o item do array
    clients.splice(clientToDeleteIndex, 1);

    // Salva e Renderiza
    saveClients();
    renderClients();

    // Fecha o modal
    closeModal();

    showToast("Cliente removido com sucesso!", "success");

    // Reseta a variável
    clientToDeleteIndex = null;
  }
}

function closeModal() {
  const modal = document.getElementById("deleteModal");
  const backdrop = document.getElementById("modalBackdrop");
  const panel = document.getElementById("modalPanel");

  if (modal && backdrop && panel) {
    // Animação de saída
    backdrop.classList.add("opacity-0");
    panel.classList.remove("opacity-100", "scale-100");
    panel.classList.add("opacity-0", "scale-95");

    // Espera a animação terminar para esconder o elemento (300ms = duration-300)
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }
}

function saveClients() {
  // Sincroniza o array global com o armazenamento do navegador
  localStorage.setItem("whatsapp_clients", JSON.stringify(clients));
}

// Sistema de Notificações Toast
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toastMessage");
  const iconEl = document.getElementById("toastIcon");

  if (!toast || !msgEl || !iconEl) return;

  // Configura mensagem
  msgEl.textContent = message;

  // Configura ícone baseado no tipo
  if (type === "success") {
    iconEl.innerHTML = `<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else {
    iconEl.innerHTML = `<svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  }

  // Anima Entrada
  toast.classList.remove("translate-y-20", "opacity-0");

  // Remove automaticamente após 3 segundos
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3000);
}

// Corre a renderização inicial ao carregar a página
window.onload = renderClients;
