<template>
  <div class="p-8">
    <h1 class="text-xl font-bold mb-6 text-gray-700">Painel de monitoramento</h1>
    <div class="flex flex-wrap gap-4">
      <!-- Pneus -->
      <div class="bg-blue-500 rounded-lg shadow p-4 w-48 text-white flex flex-col items-center">
        <span class="text-3xl font-bold">{{ totalPneus }}</span>
        <span class="text-sm uppercase tracking-wide">Pneus</span>
        <span class="text-xs mt-2 opacity-80">{{ pneusAlocados }} alocados / {{ pneusDisponiveis }} disponíveis</span>
        <!-- Ícone de pneu (roda) -->
        <svg class="mt-2 w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="3" x2="12" y2="7" stroke="currentColor" stroke-width="2"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>
          <line x1="3" y1="12" x2="7" y2="12" stroke="currentColor" stroke-width="2"/>
          <line x1="17" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <!-- Veículos -->
      <div class="bg-green-500 rounded-lg shadow p-4 w-48 text-white flex flex-col items-center">
        <span class="text-3xl font-bold">{{ totalVeiculos }}</span>
        <span class="text-sm uppercase tracking-wide">Veículos</span>
        <span class="text-xs mt-2 opacity-80">{{ veiculosAtivos }} ativos / {{ veiculosInativos }} inativos</span>
        <!-- Ícone de veículo -->
        <svg class="mt-2 w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="11" width="18" height="6" rx="2" stroke="currentColor" stroke-width="2"/>
          <rect x="7" y="7" width="10" height="4" rx="1" stroke="currentColor" stroke-width="2"/>
          <circle cx="7.5" cy="18" r="1.5" fill="currentColor"/>
          <circle cx="16.5" cy="18" r="1.5" fill="currentColor"/>
        </svg>
      </div>
      <!-- Manutenções -->
      <div class="bg-yellow-400 rounded-lg shadow p-4 w-48 text-white flex flex-col items-center">
        <span class="text-3xl font-bold">0</span>
        <span class="text-sm uppercase tracking-wide">Manutenções</span>
        <span class="text-xs mt-2 opacity-80">Em breve</span>
        <!-- Ícone de ferramenta (chave inglesa) -->
        <svg class="mt-2 w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M22 7l-5 5m0 0l-5 5m5-5l-5-5m5 5l5 5" stroke="currentColor" stroke-width="2"/>
          <circle cx="7" cy="17" r="2" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <!-- Descartes -->
      <div class="bg-red-400 rounded-lg shadow p-4 w-48 text-white flex flex-col items-center">
        <span class="text-3xl font-bold">0</span>
        <span class="text-sm uppercase tracking-wide">Descartes</span>
        <span class="text-xs mt-2 opacity-80">Em breve</span>
        <!-- Ícone de lixeira -->
        <svg class="mt-2 w-8 h-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="6" y="7" width="12" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M9 7V4h6v3" stroke="currentColor" stroke-width="2"/>
          <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" stroke-width="2"/>
          <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePneuStore } from '@/stores/pneu';
import { useVeiculoStore } from '@/stores/Veiculo';

const pneuStore = usePneuStore();
const veiculoStore = useVeiculoStore();

const totalPneus = computed(() => pneuStore.pneus.length);
const pneusAlocados = computed(() => pneuStore.pneus.filter(p => p.alocado).length);
const pneusDisponiveis = computed(() => pneuStore.pneus.filter(p => !p.alocado).length);

const totalVeiculos = computed(() => veiculoStore.veiculos.length);
const veiculosAtivos = computed(() => veiculoStore.veiculos.filter(v => v.ativo).length);
const veiculosInativos = computed(() => veiculoStore.veiculos.filter(v => !v.ativo).length);
</script>
