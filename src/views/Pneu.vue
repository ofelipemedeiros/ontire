<template>
  <div class="flex flex-col md:flex-row h-screen">
    <!--Painel Esquerdo-->
    <div class="w-full md:w-1/2 p-4 bg-gray-100 rounded-md  p-6 shadow">
        
        <form >
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class=" text-md font-semibold text-gray-900 mb-4"> Cadastro de Pneu</h2>
                    <div class="mt-10 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Marca</label>
                                <input 
                                type="text"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="Ex: Michelin"
                                >

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </form>
    </div>
    <!--Painel Direito-->
    <div class="w-full md:w-1/2 p-4 bg-gray-150 overflow-auto">
        <h2 class="text-sm font-semibold mb-4">Estoque de Pneus</h2>
        <table class="min-w-full divide-y divide-gray-200 table-auto border-collapse">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Código</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Tamanho</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">Marca</th>
                </tr>

            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-2 whitespace-nowrap"> PNEU001</td>
                    <td class="px-6 py-2 whitespace-nowrap">250/80 R22.5</td>
                    <td class="px-6 py-2 whitespace-nowrap">Michelin</td>
                </tr>
                <tr>
                    <td class="px-6 py-2 whitespace-nowrap"> PNEU002</td>
                    <td class="px-6 py-2 whitespace-nowrap">250/80 R22.5</td>
                    <td class="px-6 py-2 whitespace-nowrap">Goodyear</td>
                </tr>


            </tbody>

        </table>
        
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const feature = ref();
</script>
