<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Gestão de Veículos</h1>
    <!-- Vehicle Selection -->
    <div class="mb-6">
      <label for="vehicle-select" class="block text-sm font-medium text-gray-700">Selecionar Veículo</label>
      <select
        id="vehicle-select"
        v-model="selectedVehicle"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        <option :value="''">Selecione um veículo...</option>
        <option 
        v-for="veiculo in veiculos"
        :key="veiculo.id"
        :value="veiculo.id"
        >
          {{ veiculo.modelo }} ({{ veiculo.id }})
        </option>
      </select>
    </div>
    <div class="grid grid-cols-2 gap-6">
      <!-- lado esquerdo: lista de pneus -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Lista de Pneus</h2>
          <button
            @click="showDialog = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Selecionar Pneu
          </button>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="pneu in pneusSelecionados" :key="pneu.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ pneu.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ pneu.marca }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ pneu.modelo }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button @click="removerPneuTabela(pneu.id)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Remover</button>
              </td>
            </tr>
            <tr v-if="pneusSelecionados.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                Nenhum pneu disponível
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Dialog de seleção de pneus -->
        <Dialog :open="showDialog" @close="showDialog = false" class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
            <DialogPanel class="bg-white max-w-lg w-full p-6 rounded-lg shadow-xl">
              <DialogTitle class="text-lg font-bold mb-4">Selecionar Pneu</DialogTitle>
              <input v-model="search" placeholder="Buscar por ID, marca ou modelo..." class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <ul class="divide-y divide-gray-100 max-h-72 overflow-auto">
                <li v-for="pneu in pneusFiltrados" :key="pneu.id" class="flex justify-between items-center py-2 px-1 hover:bg-blue-50 rounded transition">
                  <span class="text-gray-700">{{ pneu.id }} - {{ pneu.marca }} {{ pneu.modelo }}</span>
                  <button @click="adicionarPneuTabela(pneu)" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs shadow">Adicionar</button>
                </li>
                <li v-if="pneusFiltrados.length === 0" class="text-center text-gray-400 py-4">Nenhum pneu encontrado</li>
              </ul>
              <div class="mt-6 text-right">
                <button @click="showDialog = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Fechar</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
      <!-- lado direito: visualização dos eixos -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Visualização dos Eixos</h2>
        <div v-if="!selectedVehicle" class="text-center text-gray-500 py-20">
          Selecione um veículo para ver a configuração dos eixos
        </div>
        <div v-else class="relative w-[500px] h-[600px] bg-gray-100 border rounded-lg p-4">
          <!-- Linhas do chassi -->
          <div
            v-for="(linha, idx) in layoutLinhasChassi"
            :key="'linha-' + idx"
            class="absolute"
            :style="{
              left: linha.x + 'px',
              top: linha.y + 'px',
              width: linha.width + 'px',
              height: linha.height + 'px',
              background: linha.color
            }"
          ></div>
          <!-- Pneus -->
          <div
            v-for="(pneu, idx) in layoutPneus"
            :key="'pneu-' + idx"
            class="absolute flex items-center justify-center bg-gray-200 rounded-md shadow text-xs font-semibold text-gray-700"
            :style="{
              left: pneu.x + 'px',
              top: pneu.y + 'px',
              width: '56px',
              height: '38px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 2px 8px #cbd5e166'
            }"
          >
            {{ pneu.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useVeiculoStore } from '@/stores/Veiculo'; 
import { usePneuStore } from '@/stores/pneu';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

const veiculoStore = useVeiculoStore();
const pneuStore = usePneuStore();
const veiculos = veiculoStore.veiculos;
const pneus = computed(() => pneuStore.pneus || []);
const selectedVehicle = ref('');

// Dialog state
const showDialog = ref(false);
const pneusSelecionados = ref([]);
const search = ref('');

function adicionarPneuTabela(pneu) {
  if (!pneusSelecionados.value.some(p => p.id === pneu.id)) {
    pneusSelecionados.value.push(pneu);
  }
  showDialog.value = false;
}

function removerPneuTabela(id) {
  pneusSelecionados.value = pneusSelecionados.value.filter(p => p.id !== id);
}

const pneusFiltrados = computed(() => {
  if (!search.value) return pneus.value;
  return pneus.value.filter(p =>
    (p.id + '').toLowerCase().includes(search.value.toLowerCase()) ||
    (p.marca || '').toLowerCase().includes(search.value.toLowerCase()) ||
    (p.modelo || '').toLowerCase().includes(search.value.toLowerCase())
  );
});

// Layout dos pneus: para 2 eixos, TE alinhado com DE e TD alinhado com DD
const layoutPneus = computed(() => {
  const veic = veiculos.find(v => v.id === selectedVehicle.value);
  if (!veic) return [];
  const eixos = veic.eixos;
  const layout = [];
  // Dianteiros
  layout.push({ label: 'DE', x: 120, y: 60 });
  layout.push({ label: 'DD', x: 360, y: 60 });
  if (eixos === 2) {
    // TE alinhado com DE, TD alinhado com DD
    const y = 180;
    layout.push({ label: 'TE', x: 120, y }); // Traseiro esquerdo alinhado com DE
    layout.push({ label: 'TD', x: 360, y }); // Traseiro direito alinhado com DD
  } else {
    // Para cada eixo traseiro (mais de 2 eixos)
    for (let i = 1; i <= eixos - 1; i++) {
      const y = 180 + (i - 1) * 120;
      layout.push({ label: `${i}EE`, x: 40, y });
      layout.push({ label: `${i}EI`, x: 120, y });
      layout.push({ label: `${i}DI`, x: 360, y });
      layout.push({ label: `${i}DE`, x: 440, y });
    }
  }
  return layout;
});

// Linhas dinâmicas do chassi conforme o número de eixos
const layoutLinhasChassi = computed(() => {
  const veic = veiculos.find(v => v.id === selectedVehicle.value);
  if (!veic) return [];
  const eixos = veic.eixos;
  const linhas = [];
  // Centralização baseada na média dos slots DE/DD (120 e 360): (120+360)/2 = 240
  const centro = (120 + 360) / 2; // 240
  // Linha vertical central
  linhas.push({ x: centro + 27, y: 85, width: 2, height: 120 + (eixos - 2) * 120, color: '#222' });
  // Linha horizontal superior (dianteira)
  linhas.push({ x: 120, y: 85, width: 240, height: 2, color: '#222' });
  // Linha horizontal traseira igual à dianteira, se 2 eixos
  if (eixos === 2) {
    linhas.push({ x: 120, y: 200, width: 240, height: 2, color: '#222' });
  } else {
    // Para cada eixo traseiro, linha horizontal
    for (let i = 1; i <= eixos - 1; i++) {
      const y = 180 + (i - 1) * 120 + 15;
      linhas.push({ x: 40, y, width: 400, height: 2, color: '#222' });
    }
  }
  return linhas;
});
</script>
