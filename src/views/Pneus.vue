<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-2">Estoque de Pneus</h1>
  </div>

  <div class="bg-white shadow-md rounded-md overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sulco</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Km Rodado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revisões</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="pneu in pneus" :key="pneu.id">
                <td class="px-6 py-4 whitespace-nowrap">{{pneu.id}}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{pneu.marca}}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{pneu.sulco}}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{getKmRodado(pneu.id) || 'n/a'}} km</td>
                <td class="px-6 py-4 whitespace-nowrap">{{getRevisoes(pneu)}}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(pneu.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{pneu.status}}
                    </span>
                </td>
                <td></td>
            </tr>
            
        </tbody>

    </table>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePneuStore } from '@/stores/pneu';

const pneuStore = usePneuStore();
const pneus = computed(() => pneuStore.pneus || []);

// Função para obter a quilometragem total rodada de um pneu
function getKmRodado(pneuId) {
    const kmInfo = pneuStore.kmRodadoPorPneu?.find(p => p.id === pneuId);
    return kmInfo ? kmInfo.kmRodado : 0;
}

function getRevisoes(pneu) {
    if (!pneu.historico) return '0';
    return pneu.historico.length.toString();
}

const getStatusClass = (status) =>{
    const classes ={
        'Em uso': 'bg-blue-100 text-blue-800',
        'Disponível': 'bg-green-100 text-green-800',
        'Em manutenção': 'bg-yellow-100 text-yellow-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800'
}

</script>
