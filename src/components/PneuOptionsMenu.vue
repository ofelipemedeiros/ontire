<template>
  <div class="relative inline-block text-left" ref="menuRef">
    <button @click="toggleMenu" class="p-1 rounded hover:bg-base-200 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="5" cy="12" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="19" cy="12" r="2"/>
      </svg>
    </button>
    <div v-if="open" class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-base-100 ring-1 ring-black ring-opacity-5 z-30">
      <div class="py-1 flex flex-col">
        <div class="tooltip" data-tip="Remover este pneu do veículo">
  <button @click="$emit('remover')" class="w-full text-left px-4 py-2 text-error hover:bg-base-200">Remover</button>
</div>
        <button @click="$emit('manutencao')" class="w-full text-left px-4 py-2 text-base-content hover:bg-base-200">Manutenção</button>
        <button @click="$emit('descartar')" class="w-full text-left px-4 py-2 text-base-content hover:bg-base-200">Descartar</button>
        <button @click="$emit('historico')" class="w-full text-left px-4 py-2 text-base-content hover:bg-base-200">Histórico</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const open = ref(false);
const menuRef = ref(null);

function toggleMenu() {
  open.value = !open.value;
}

// Fecha o menu se clicar fora
function handleClickOutside(event) {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
