<template>
  <div class="relative inline-block text-left" ref="menuRef">
    <button @click="toggleMenu" class="p-1 rounded hover:bg-gray-100 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="5" cy="12" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="19" cy="12" r="2"/>
      </svg>
    </button>
    <div v-if="open" class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
      <div class="py-1 flex flex-col">
        <button @click="$emit('remover')" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Remover</button>
        <button @click="$emit('desmontar')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Desmontar</button>
        <button @click="$emit('descartar')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Descartar</button>
        <button @click="$emit('historico')" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Histórico</button>
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
