import { ref } from 'vue'
import { defineStore } from 'pinia'

// Store em formato setup (função)
export const usePneuStore = defineStore('pneu', () => {
    const pneus = ref([
        {id: 'PNEU001', marca: 'Michelin', modelo: 'Mult Z', tamanho: '295/80 R22.5', quantidade: 2, descricao: 'pneu de qualidade', fornecedor: 'PMZ', condicao: 'Novo', preco: 250, garantia: 12, tipo: 'Radial', dataCompra: '20/04/2025'},
        
    ])
    

    return {pneus }
})