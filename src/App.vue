<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">OnTire</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <RouterLink
              to="/"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
              Dashboard
              </RouterLink>
              <RouterLink
              to="/veiculos"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
              Veículos
              </RouterLink>
              <RouterLink
              to="/pneus"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
              Gestão de Pneus
              </RouterLink>
              <RouterLink
              to="/manutencao"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
              Manutenção
              </RouterLink>
              <RouterLink
              to="/relatorios"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
              Relatórios
              </RouterLink>
            </div>

          </div>

        </div>


      </div>

    </nav>

    <RouterView />
  </div>
</template>
