import { ref } from 'vue'
import { defineStore } from 'pinia'

// Store em formato setup (função)
export const useVeiculoStore = defineStore('veiculo', () => {
    const veiculos = ref([
        {id: 'ABC1234', modelo: 'Volvo FH 540', eixos: 3},
        {id: 'DEF5678', modelo: 'Scania R440', eixos: 3},
        {id: 'PBL6689', modelo: 'Ford KA', eixos: 2},
    ])
    const veiculoSelecionado = ref('');
    const pneus = ref([])
    const historicoPneus = ref([])
    const montagemAtual = ref([])

    // Defina métodos/ações aqui, se necessário
    // Exemplo:
    // function adicionarVeiculo(novoVeiculo) {
    //     veiculos.value.push(novoVeiculo)
    // }

    return { 
        veiculos, 
        pneus, 
        historicoPneus, 
        montagemAtual, 
        veiculoSelecionado 
    }
})