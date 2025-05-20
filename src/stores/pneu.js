import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Store em formato setup (função)
export const usePneuStore = defineStore('pneu', () => {
    const pneus = ref([
        {id: 'PNEU001', 
            marca: 'Michelin', 
            modelo: 'Mult Z', 
            tamanho: '295/80 R22.5', 
            quantidade: 2, 
            descricao: 'pneu de qualidade', 
            fornecedor: 'PMZ', 
            condicao: 'Novo', 
            preco: 250, 
            garantia: 12, 
            tipo: 'Radial',
            aplicacao: 'Eixo de tração/reboque',
            uso: 'Misto (urbano/rodoviário)', 
            dataCompra: '20/04/2025',
            historico: []},

        {id: 'PNEU002', 
            marca: 'Pirelli', 
            modelo: 'FR85', 
            tamanho: '275/80 R22.5', 
            quantidade: 5, 
            descricao: 'pneu de qualidade', 
            fornecedor: 'PMZ', 
            condicao: 'Novo', 
            preco: 350, 
            garantia: 12, 
            tipo: 'Radial',
            aplicacao: 'Eixo direcional',
            uso: 'Rodoviário, alta quilometragem', 
            dataCompra: '20/04/2025',
            historico: []},

        {id: 'PNEU003', 
            marca: 'Bridgestone', 
            modelo: 'R268 Ecopia', 
            tamanho: '295/80 R22.5', 
            quantidade: 5, 
            descricao: 'pneu de qualidade', 
            fornecedor: 'PMZ', 
            condicao: 'Novo', 
            preco: 350, 
            garantia: 12, 
            tipo: 'Radial',
            aplicacao: 'Eixo de tração',
            uso: 'Regional e rodoviário',  
            dataCompra: '20/04/2025',
            historico: []},

        {id: 'PNEU004', 
            marca: 'Goodyear', 
            modelo: 'KMax D', 
            tamanho: '295/80 R22.5', 
            quantidade: 5, 
            descricao: 'pneu de qualidade', 
            fornecedor: 'PMZ', 
            condicao: 'Novo', 
            preco: 350, 
            garantia: 12, 
            tipo: 'Radial',
            aplicacao: 'Eixo de tração',
            uso: 'Regional e rodoviário', 
            dataCompra: '20/04/2025',
            historico: []},

        {id: 'PNEU005', 
            marca: 'Continental', 
            modelo: 'Conti Hybrid HS3', 
            tamanho: '295/80 R22.5', 
            quantidade: 5, 
            descricao: 'pneu de qualidade', 
            fornecedor: 'PMZ', 
            condicao: 'Novo', 
            preco: 350, 
            garantia: 12, 
            tipo: 'Radial', 
            aplicacao: 'Eixo Direcional',
            uso: 'Hibrido(Urbano/rodoviario)',
            dataCompra: '20/04/2025',
            historico: []},
        
    ])

    //Adicionar histórico de pneu
    function adicionarHistoricoPneu(pneuId, {veiculoId, dataEntrada, kmEntrada, sulcoEntrada, dataSaida, kmSaida, sulcoSaida, tipoMovimentacao}){
        const pneu = pneus.value.find(p => p.id === pneuId);
        if(!pneu) return;
        if(!pneu.historico) pneu.historico = [];

        // Se for remoção, registra evento de saída e calcula km rodado no período
        if(tipoMovimentacao === 'Pneu Removido') {
            // Pega o último registro de instalação
            const ultimaInstalacao = pneu.historico.length > 0 ? 
                pneu.historico[pneu.historico.length - 1] : null;

            const kmRodadoPeriodo = ultimaInstalacao && ultimaInstalacao.kmEntrada && kmSaida ? 
                kmSaida - ultimaInstalacao.kmEntrada : 0;

            pneu.historico.push({
                veiculoId,
                dataEntrada: null,
                kmEntrada: null,
                sulcoEntrada: null,
                dataSaida: dataSaida || null,
                kmSaida: kmSaida || null,
                sulcoSaida: sulcoSaida || null,
                tipoMovimentacao: 'Pneu Removido',
                posicao: null,
                kmRodadoPeriodo // Novo campo
            });
        } else {
            // Instalação padrão
            pneu.historico.push({
                veiculoId,
                dataEntrada: dataEntrada || null,
                kmEntrada: kmEntrada || null,
                sulcoEntrada: sulcoEntrada || null,
                dataSaida: null,
                kmSaida: null,
                sulcoSaida: null,
                tipoMovimentacao: tipoMovimentacao || 'Pneu Instalado',
                posicao: arguments[1]?.posicao || null,
                kmRodadoPeriodo: 0 // Inicializa com 0, será atualizado na remoção
            });
        }
    }

    function finalizarHistorico(pneuId, {dataSaida, kmSaida, motivoSaida}){
        const pneu = pneus.value.find(p => p.id === pneuId);
        if(!pneu || !pneu.historico || pneu.historico.length === 0) return;
        const ultimo = pneu.historico[pneu.historico.length - 1];
        if(!ultimo.dataSaida){
            ultimo.dataSaida = dataSaida;
            ultimo.kmSaida = kmSaida;
            ultimo.motivoSaida = motivoSaida;
            
            // Calcula kmRodadoPeriodo se tiver kmEntrada e kmSaida
            if (ultimo.kmEntrada !== null && kmSaida !== null) {
                ultimo.kmRodadoPeriodo = kmSaida - ultimo.kmEntrada;
            }
        }
    }

    //Mapeamento de veículo => Lista de pneus montados
    const pneusPorVeiculo = ref({})

    //veículo atualmente selecionado
    const veiculoSelecionado = ref(null)

    function selecionarVeiculo(veiculoId){
        veiculoSelecionado.value = veiculoId

        //Inicializa o array vazio se veiculo ainda não tem pneus cadastrados
        if(!pneusPorVeiculo.value[veiculoId]){
            pneusPorVeiculo.value[veiculoId] = []
        }

    }

    function adicionarPneuAoVeiculo(pneu){
        if(!veiculoSelecionado.value) return;
        const veiculoId = veiculoSelecionado.value;
        pneusPorVeiculo.value[veiculoId].push(pneu)

    }

    function removerPneuDoVeiculo(pneuId){
        if(!veiculoSelecionado.value) return;
        const veiculoId = veiculoSelecionado.value;
        pneusPorVeiculo.value[veiculoId] = pneusPorVeiculo.value[veiculoId].filter(pneu => pneu.id !== pneuId)
        const pneu = pneus.value.find(p => p.id === pneuId);
    if(pneu){
        pneu.posicao = null;
    }
    }

    

    function obterPneusDoVeiculoAtual() {
        return pneusPorVeiculo.value[veiculoSelecionado.value] || [];
    }

    // Calcula a quilometragem total rodada por cada pneu
    const kmRodadoPorPneu = computed(() => pneus.value.map(pneu => {
        let kmTotal = 0;
        
        if (pneu.historico && pneu.historico.length > 0) {
            pneu.historico.forEach(registro => {
                if (registro.kmRodadoPeriodo) {
                    kmTotal += registro.kmRodadoPeriodo;
                }
            });
        }
        
        return {
            id: pneu.id,
            kmRodado: kmTotal
        };
    }));
    
      return {
        pneus,
        veiculoSelecionado,
        pneusPorVeiculo,
        adicionarHistoricoPneu,
        selecionarVeiculo,
        adicionarPneuAoVeiculo,
        removerPneuDoVeiculo,
        obterPneusDoVeiculoAtual,
        kmRodadoPorPneu,
      };

})