<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Relatórios de Pneus</h1>
    <div class="mb-8">
      <label class="block mb-2 font-semibold">Selecione um pneu:</label>
      <select v-model="pneuSelecionado" class="border rounded px-3 py-2 w-full max-w-xs">
        <option value="">Todos os pneus</option>
        <option v-for="pneu in pneus" :key="pneu.id" :value="pneu.id">
          {{ pneu.id }} - {{ pneu.marca }} ({{ pneu.modelo }})
        </option>
      </select>
    </div>
    <div v-if="pneusFiltrados.length === 0" class="text-gray-500">Nenhum pneu encontrado.</div>
    <div v-for="pneu in pneusFiltrados" :key="pneu.id" class="mb-8">
      <h2 class="text-lg font-bold mb-2">Pneu {{ pneu.id }} - {{ pneu.marca }} ({{ pneu.modelo }})</h2>
      <div class="mb-2 text-sm text-gray-600">Tamanho: {{ pneu.tamanho }} | Aplicação: {{ pneu.aplicacao }}</div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 table-auto border-collapse mb-2">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Veículo</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data Entrada</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">KM Entrada</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data Saída</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">KM Saída</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in pneu.historico" :key="idx">
              <td class="px-4 py-2">{{ item.veiculoId }}</td>
              <td class="px-4 py-2">{{ item.dataEntrada }}</td>
              <td class="px-4 py-2">{{ item.kmEntrada }}</td>
              <td class="px-4 py-2">{{ item.dataSaida || '-' }}</td>
              <td class="px-4 py-2">{{ item.kmSaida || '-' }}</td>
              <td class="px-4 py-2">{{ item.motivoSaida || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePneuStore } from '@/stores/pneu';
const pneuStore = usePneuStore();
const pneus = computed(() => pneuStore.pneus || []);

const pneuSelecionado = ref('');
const pneusFiltrados = computed(() => {
  if (!pneuSelecionado.value) return pneus.value;
  return pneus.value.filter(p => p.id === pneuSelecionado.value);
});
</script>
