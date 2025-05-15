<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Estoque de Pneus</h1>
    
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="pneu in pneus" :key="pneu.codigo" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">{{ pneu.codigo }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ pneu.tamanho }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ pneu.marca }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(pneu.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ pneu.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <div class="relative" @click.outside="closeMenu(pneu.codigo)">
                <button @click="toggleMenu(pneu.codigo)" class="text-gray-600 hover:text-gray-900">
                  <span class="sr-only">Abrir menu</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                
                <div v-if="activeMenu === pneu.codigo" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10">
                  <div class="py-1">
                    <a href="#" @click="emitirChecklist(pneu)" class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                      </svg>
                      Emitir Checklist
                    </a>
                    <a href="#" @click="enviarManutencao(pneu)" class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                      </svg>
                      Enviar para Manutenção
                    </a>
                    <a href="#" @click="verDetalhes(pneu)" class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                      </svg>
                      Ver Detalhes
                    </a>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeMenu = ref(null);

// Mock data - substituir por dados reais da API
const pneus = ref([
  { 
    codigo: 'PNEU001', 
    tamanho: '250/80 R22.5', 
    marca: 'Michelin',
    status: 'Em uso'
  },
  { 
    codigo: 'PNEU002', 
    tamanho: '250/80 R22.5', 
    marca: 'Goodyear',
    status: 'Disponível'
  },
  { 
    codigo: 'PNEU003', 
    tamanho: '275/80 R22.5', 
    marca: 'Pirelli',
    status: 'Em manutenção'
  }
]);

const toggleMenu = (codigo) => {
  activeMenu.value = activeMenu.value === codigo ? null : codigo;
};

const closeMenu = (codigo) => {
  if (activeMenu.value === codigo) {
    activeMenu.value = null;
  }
};

const getStatusClass = (status) => {
  const classes = {
    'Em uso': 'bg-blue-100 text-blue-800',
    'Disponível': 'bg-green-100 text-green-800',
    'Em manutenção': 'bg-yellow-100 text-yellow-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const emitirChecklist = (pneu) => {
  console.log('Emitir checklist para:', pneu.codigo);
  activeMenu.value = null;
  // Implementar lógica de emissão de checklist
};

const enviarManutencao = (pneu) => {
  console.log('Enviar para manutenção:', pneu.codigo);
  activeMenu.value = null;
  // Implementar lógica de envio para manutenção
};

const verDetalhes = (pneu) => {
  console.log('Ver detalhes do pneu:', pneu.codigo);
  activeMenu.value = null;
  // Implementar lógica para exibir detalhes
};
</script>
