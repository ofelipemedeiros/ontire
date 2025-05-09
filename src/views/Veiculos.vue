<template>
  <div class="p-6 flex flex-col space-y-2">
    <h1 class="text-2xl font-bold mb-6">Gestão de Veículos</h1>
    <!-- Vehicle Selection -->
    <div class="mb-6">
      
      <select
        id="vehicle-select"
        v-model="selectedVehicle"
        @change="pneuStore.selecionarVeiculo(selectedVehicle)"
        class="select select-bordered w-full bg-base-100 text-base-content"
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
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- lado esquerdo: lista de pneus -->
      <div class="bg-base-100 rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Lista de Pneus</h2>
          <button
            @click="showDialog = true"
            class="px-4 py-2 bg-primary text-primary-content rounded-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Selecionar Pneu
          </button>
        </div>
        <table class="min-w-full divide-y divide-base-300">
          <thead class="bg-base-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">Marca</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">Modelo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">Posição</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-base-content uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="bg-base-100 divide-y divide-base-300">
            <tr v-for="pneu in pneuStore.obterPneusDoVeiculoAtual()" :key="pneu.id" draggable="true" @dragstart="onDragStart(pneu.id)">
              <td class="px-6 py-4 whitespace-nowrap">{{ pneu.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ pneu.marca }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ pneu.modelo }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-xs text-base-content">
                {{ pneu.posicao || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <PneuOptionsMenu
                  @remover="removerPneuComHistorico(pneu.id)"
                  @manutencao="manutencaoPneu(pneu.id)"
                  @descartar="descartarPneu(pneu.id)"
                  @historico="mostrarHistoricoPneu(pneu.id)"
                />
              </td>
            </tr>
            <tr v-if="pneuStore.pneusPorVeiculo.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-base-content">
                Nenhum pneu disponível
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Dialog de seleção de pneus -->
        <Dialog :open="showDialog" @close="showDialog = false" class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
            <DialogPanel class="bg-base-100 max-w-lg w-full p-6 rounded-lg shadow-xl">
              <DialogTitle class="text-lg font-bold mb-4">Selecionar Pneu</DialogTitle>
              <input v-model="search" placeholder="Buscar por ID, marca ou modelo..." class="input input-bordered w-full bg-base-100 text-base-content placeholder-base-content mb-4" />
              <ul class="divide-y divide-base-200 max-h-72 overflow-auto">
                <li v-for="pneu in pneusDisponiveis" :key="pneu.id" class="flex justify-between items-center py-2 px-1 hover:bg-blue-50 rounded transition">
                  
                  <span class="text-base-content">{{ pneu.id }} - {{ pneu.marca }} {{ pneu.modelo }}</span>
                  <div class="tooltip" data-tip="Adicionar este pneu ao veículo">
  <button @click="pneuStore.adicionarPneuAoVeiculo(pneu)" class="btn btn-primary btn-sm">Adicionar</button>
</div>
                </li>
                <li v-if="pneusDisponiveis.length === 0" class="text-center text-gray-400 py-4">Nenhum pneu encontrado</li>
              </ul>
              <div class="mt-6 text-right">
                <button @click="showDialog = false" class="btn btn-neutral">Fechar</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <!-- Dialog de confirmação de km-->
        <Dialog :open="showKmModal" @close="showKmModal = false" class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
    <DialogPanel class="bg-base-100 max-w-sm w-full p-6 rounded-lg shadow-xl">
      <DialogTitle class="text-lg font-bold mb-4">Informe o KM atual do veículo</DialogTitle>
      <input v-model="kmInformado" type="number" min="0" class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="KM atual" />
      <div class="flex justify-end gap-2">
        <button @click="showKmModal = false" class="px-4 py-2 bg-base-300 rounded hover:bg-base-200">Cancelar</button>
        <button :disabled="!kmInformado" @click="confirmarKmEAdicionar" class="px-4 py-2 bg-primary text-primary-content rounded hover:bg-primary-focus">Confirmar</button>
      </div>
    </DialogPanel>
  </div>
</Dialog>
<!-- Dialog para informar profundidade do sulco -->
<Dialog :open="showSulcoModal" @close="showSulcoModal = false" class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
    <DialogPanel class="bg-base-100 max-w-md w-full p-6 rounded-lg shadow-xl">
      <DialogTitle class="text-lg font-bold mb-4">Informe a profundidade do sulco (mm)</DialogTitle>
      <input v-model="sulcoInformado" type="number" min="0" step="0.1" placeholder="Ex: 8.0" class="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
      <div class="flex justify-end gap-2">
        <button @click="showSulcoModal = false" class="px-4 py-2 bg-base-300 text-gray-800 rounded hover:bg-base-200">Cancelar</button>
        <button :disabled="!sulcoInformado" @click="confirmarSulcoEAdicionar" class="px-4 py-2 bg-primary text-primary-content rounded hover:bg-primary-focus">Confirmar</button>
      </div>
    </DialogPanel>
  </div>
</Dialog>
<!-- Modal para informar KM e Sulco ao remover pneu -->
<Dialog :open="showRemoveModal" @close="showRemoveModal = false" class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
    <DialogPanel class="bg-base-100 max-w-md w-full p-6 rounded-lg shadow-xl">
      <DialogTitle class="text-lg font-bold mb-4">Remover Pneu do Veículo</DialogTitle>
      <div class="mb-4">
        <label class="block mb-2 font-semibold">Hodômetro (KM de Saída):</label>
        <input v-model="kmSaidaInformado" type="number" class="input input-bordered w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-2 font-semibold">Profundidade do Sulco (mm):</label>
        <input v-model="sulcoSaidaInformado" type="number" class="input input-bordered w-full" />
      </div>
      <div class="flex justify-end gap-2">
        <button @click="confirmarRemocaoPneu" class="btn btn-error">Remover</button>
        <button @click="showRemoveModal = false" class="btn">Cancelar</button>
      </div>
    </DialogPanel>
  </div>
</Dialog>
<!--Dialog para mostrar Historico pneu-->
<Dialog :open="showHistoricoModal" @close="showHistoricoModal = false" class="fixed z-10 inset-0 overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen bg-black bg-opacity-40">
    <DialogPanel class="bg-base-100 max-w-xl w-full p-6 rounded-lg shadow-xl">
      <DialogTitle class="text-lg font-bold mb-4">
        Histórico de Movimentação do Pneu {{ historicoPneuSelecionado?.id || '' }}
      </DialogTitle>
      <div v-if="historicoPneuSelecionado && historicoPneuSelecionado.historico && historicoPneuSelecionado.historico.length > 0" class="relative px-4 py-8 bg-[#F4F4F4]">
        <div class="absolute top-0 left-8 bottom-0 w-0.5 bg-[#0052C9] z-0"></div>
        <template v-for="(item, idx) in historicoPneuSelecionado.historico" :key="idx">
          <!-- Troca de veículo -->
          <div v-if="idx > 0 && (item.veiculoId !== historicoPneuSelecionado.historico[idx - 1].veiculoId)" class="flex items-start relative mb-10" style="min-height: 60px;">
            <span class="absolute left-2 top-4 flex items-center justify-center w-7 h-7 bg-base-100 border-4 rounded-full z-10" style="border-color: #9D9D9D">
              <svg class="w-4 h-4" :style="{ color: '#9D9D9D' }" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z"/></svg>
            </span>
            <div class="ml-16 rounded-lg shadow p-4 w-full text-center font-semibold" style="background-color: #F4F4F4; color: #9D9D9D; border: 1px solid #9D9D9D;">
              Troca de veículo
            </div>
          </div>
          <!-- Evento de saída (remoção) -->
          <div v-if="item.tipoMovimentacao === 'Pneu Removido'" class="flex items-start relative mb-10" style="min-height: 60px;">
            <span class="absolute left-2 top-4 flex items-center justify-center w-7 h-7 bg-base-100 border-4 rounded-full z-10" style="border-color: #E53935">
              <svg class="w-4 h-4" :style="{ color: '#E53935' }" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z"/></svg>
            </span>
            <div class="ml-16 rounded-lg shadow p-4 w-full" style="background-color: #fff5f5; border: 1px solid #E53935;">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <span class="text-sm font-semibold" style="color: #E53935">{{ item.dataSaida || '-' }}</span>
                <span class="text-base font-bold" style="color: #E53935">{{ item.placaVeiculo || item.veiculoId || '-' }}</span>
              </div>
              <div class="text-sm" style="color: #E53935">
                <span class="text-md font-bold">{{ item.tipoMovimentacao }}</span>
                <div><span class="font-semibold">KM Saída:</span> {{ item.kmSaida ?? '-' }}</div>
                <div><span class="font-semibold">Sulco Saída (mm):</span> {{ item.sulcoSaida ?? '-' }}</div>
                <div><span class="font-semibold">Motivo Saída:</span> {{ item.motivoSaida || '-' }}</div>
              </div>
            </div>
          </div>
          <!-- Evento normal (instalação) -->
          <div v-else class="flex items-start relative mb-10" style="min-height: 60px;">
            <span class="absolute left-2 top-4 flex items-center justify-center w-7 h-7 bg-base-100 border-4 rounded-full z-10" style="border-color: #0052C9">
              <svg class="w-4 h-4" :style="{ color: '#0052C9' }" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z"/></svg>
            </span>
            <div class="ml-16 rounded-lg shadow p-4 w-full" style="background-color: #FFFFFF; border: 1px solid #0052C9;">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <span class="text-sm font-semibold" style="color: #9D9D9D">{{ item.dataEntrada || '-' }}</span>
                <span class="text-base font-bold" style="color: #0052C9">{{ item.placaVeiculo || item.veiculoId || '-' }}</span>
              </div>
              <div class="text-sm" style="color: #1C1C1C">
                <span class="text-md font-bold" style="color: #0052C9">{{ item.tipoMovimentacao || '-' }}</span>
                <div><span class="font-semibold">KM Entrada:</span> {{ item.kmEntrada ?? '-' }}</div>
                <div><span class="font-semibold">Sulco Entrada (mm):</span> {{ item.sulcoEntrada ?? '-' }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-else class="text-base-content text-center py-4">
        Nenhum histórico encontrado para este pneu.
      </div>
      <div class="flex justify-end gap-2">
        <button @click="exportarHistoricoPneuPDF(historicoPneuSelecionado)"
          style="background-color: #0052c9"
          class="px-4 py-2 text-primary-content rounded hover:brightness-90 mr-2"
        >Exportar PDF</button>
        <button @click="showHistoricoModal = false"
          style="background-color: #9d9d9d"
          class="px-4 py-2 text-primary-content rounded hover:bg-primary-focus"
        >Fechar</button>
      </div>
    </DialogPanel>
  </div>
</Dialog>
      </div>
      
      <!-- lado direito: visualização dos eixos -->
      <div class="bg-base-100 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Visualização dos Eixos</h2>
        <div v-if="!selectedVehicle" class="text-center text-base-content py-20">
          Selecione um veículo para ver a configuração dos eixos
        </div>
        <div v-else class="relative w-[500px] h-[600px] bg-base-200 border rounded-lg p-4">
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
            v-for="(slot, idx) in layoutPneus"
            :key="'pneu-' + idx"
            :class="[
              'absolute flex items-center justify-center rounded-md shadow text-xs font-semibold',
              getPneuAlocado(slot.label)
                ? 'bg-primary text-primary-content border-primary'
                : 'bg-base-200 text-base-content border-base-300'
            ]"
            :style="{
              left: slot.x + 'px',
              top: slot.y + 'px',
              width: '56px',
              height: '42px',
              cursor: 'pointer',
              overflow: 'visible',
              zIndex: 10
            }"
            @dragover.prevent
            @drop="onDrop(slot.label)"
          >
            <div class="flex flex-col items-center w-full leading-tight">
              <span class="block">{{ slot.label }}</span>
              <span
                v-if="getPneuAlocado(slot.label)"
                class="block text-[10px] text-blue-900 font-bold mt-0.5 break-all"
                style="line-height: 1.1;"
              >
                {{ getPneuAlocado(slot.label).id }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toast } from 'vue3-toastify';
import { useVeiculoStore } from '@/stores/Veiculo'; 
import { usePneuStore } from '@/stores/pneu';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import PneuOptionsMenu from '@/components/PneuOptionsMenu.vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoGlobaltrak from '@/assets/logoGlobaltrak.png';

const veiculoStore = useVeiculoStore();
const pneuStore = usePneuStore();

const veiculos = veiculoStore.veiculos;
const pneus = computed(() => pneuStore.pneus || []);
const showKmModal = ref(false);
const kmInformado = ref('');
const showSulcoModal = ref(false);
const sulcoInformado = ref('');
const pendingDrop = ref({ posicao: null, pneuId: null })
const showHistoricoModal = ref(false)
const historicoPneuSelecionado = ref(null)

const selectedVehicle = computed({
  get: () => veiculoStore.veiculoSelecionado,
  set: (val) => veiculoStore.veiculoSelecionado = val
})

// Dialog state
const showDialog = ref(false);
const pneusDisponiveis = computed(() => {
  //IDs de todos os pneus já alocados em qualquer veículo
  const alocados = Object.values(pneuStore.pneusPorVeiculo)
  .flat()
  .map( p=> p.id);
  //Retorna só pneus que NÃO estão em alocados
  return pneuStore.pneus.filter(pneu => !alocados.includes(pneu.id))
})
const search = ref('');

let dragPneuId = null;

function adicionarPneuTabela(pneu) {
  if (!pneusSelecionados.value.some(p => p.id === pneu.id)) {
    pneusSelecionados.value.push(pneu);
    toast.success('Pneu adicionado ao veículo!');
  }
  showDialog.value = false;
}

const showRemoveModal = ref(false);
const kmSaidaInformado = ref('');
const sulcoSaidaInformado = ref('');
const pneuIdParaRemover = ref(null);

function removerPneuComHistorico(pneuId) {
  pneuIdParaRemover.value = pneuId;
  showRemoveModal.value = true;
  kmSaidaInformado.value = '';
  sulcoSaidaInformado.value = '';
}

function confirmarRemocaoPneu() {
  const dataSaida = new Date().toLocaleDateString('pt-BR');
  pneuStore.adicionarHistoricoPneu(pneuIdParaRemover.value, {
    veiculoId: selectedVehicle.value,
    dataSaida,
    kmSaida: kmSaidaInformado.value,
    sulcoSaida: sulcoSaidaInformado.value,
    tipoMovimentacao: 'Pneu Removido'
  });
  pneuStore.removerPneuDoVeiculo(pneuIdParaRemover.value);
  toast.success('Pneu removido do veículo!');
  showRemoveModal.value = false;
  pneuIdParaRemover.value = null;
  kmSaidaInformado.value = '';
  sulcoSaidaInformado.value = '';
}

function mostrarHistoricoPneu(id) {
  const pneu = pneuStore.pneus.find(p => p.id === id );
  historicoPneuSelecionado.value = pneu;
  showHistoricoModal.value = true;
}

function exportarHistoricoPneuPDF(pneu) {
  if (!pneu || !Array.isArray(pneu.historico)) return;
  const doc = new jsPDF();
  const img = new window.Image();
  img.src = logoGlobaltrak;
  img.onload = function() {
    doc.addImage(img, 'PNG', 14, 14, 20, 20);
    doc.setFontSize(16);
    doc.setTextColor(28,28,28); // Preto profundo
    doc.text(`Relatório de Histórico do Pneu ${pneu.id}`, 14, 40);
    let y = 50;
    let lastVeiculoId = null;
    pneu.historico.forEach((item, idx) => {
      // Troca de veículo
      if (idx > 0 && item.veiculoId !== lastVeiculoId) {
        doc.setFillColor(244, 244, 244); // Cinza claro
        doc.setDrawColor(157, 157, 157); // Cinza médio
        doc.setTextColor(157, 157, 157); // Cinza médio
        doc.rect(14, y, 180, 12, 'FD');
        doc.setFontSize(12);
        doc.text('Troca de veículo', 104, y + 8, { align: 'center' });
        y += 16;
      }
      // Card do evento
      doc.setFillColor(255, 255, 255); // Branco
      doc.setDrawColor(0, 82, 201); // Azul vibrante
      doc.setTextColor(28,28,28); // Preto profundo
      doc.rect(14, y, 180, 34, 'FD');
      doc.setFontSize(12);
      doc.text(`Data Entrada: ${item.dataEntrada || '-'}`, 18, y + 7);
      doc.setTextColor(0,82,201);
      doc.text(`Placa/Veículo: ${item.placaVeiculo || item.veiculoId || '-'}`, 120, y + 7);
      doc.setFontSize(10);
      doc.setTextColor(28,28,28);
      doc.text(`KM Entrada: ${item.kmEntrada ?? '-'}`, 18, y + 15);
      doc.text(`Sulco Entrada (mm): ${item.sulcoEntrada ?? '-'}`, 90, y + 15);
      doc.text(`Data Saída: ${item.dataSaida || '-'}`, 18, y + 21);
      doc.text(`KM Saída: ${item.kmSaida ?? '-'}`, 90, y + 21);
      doc.text(`Motivo Saída: ${item.motivoSaida || '-'}`, 18, y + 27);
      y += 40;
      lastVeiculoId = item.veiculoId;
    });
    doc.save(`historico_${pneu.id}.pdf`);
  };
}

function confirmarKmEAdicionar() {
  const { posicao, pneuId } = pendingDrop.value;
  const pneus = pneuStore.obterPneusDoVeiculoAtual();
  const pneu = pneus.find(p => p.id === pneuId);
  if (pneu) {
    pneu.posicao = posicao;
    pneuStore.adicionarHistoricoPneu(
      pneu.id,
      {
        veiculoId: selectedVehicle.value,
        dataEntrada: new Date().toLocaleDateString('pt-BR'),
        kmEntrada: Number(kmInformado.value),
        sulcoEntrada: Number(sulcoInformado.value)
      }
    );
  }
  dragPneuId = null;
  showKmModal.value = false;
  showSulcoModal.value = false;
  sulcoInformado.value = '';
  kmInformado.value = '';
}

function abrirSulcoDialog(posicao, pneuId) {
  pendingDrop.value = { posicao, pneuId };
  showSulcoModal.value = true;
}

function confirmarSulcoEAdicionar() {
  showSulcoModal.value = false;
  showKmModal.value = true;
}

function onDragStart(id) {
  dragPneuId = id;
}

function onDrop(posicao) {
  if (dragPneuId) {
    abrirSulcoDialog(posicao, dragPneuId);
  }
}

function getPneuAlocado(posicao) {
  // Busca diretamente nos pneus do veículo selecionado
  return pneuStore.obterPneusDoVeiculoAtual().find(p => p.posicao === posicao) || null;
}

function getPosicaoPneu(idPneu) {
  const aloc = pneusDisponiveis.value.find(item => item.idPneu === idPneu);
  return aloc ? aloc.posicao : '-';
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

// Funções de ação para o menu
function manutencaoPneu(id) {
  alert('Função manutenção para o pneu ' + id + ' ainda não implementada.');
}
function descartarPneu(id) {
  alert('Função descartar para o pneu ' + id + ' ainda não implementada.');
}

</script>
