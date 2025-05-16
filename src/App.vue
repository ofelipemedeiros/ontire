<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Dashboard from './views/Dashboard.vue';
</script>

<template>
  <div class="min-h-screen bg-primary">
    <nav class="bg-base-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-base-content">OnTire</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <RouterLink
              to="/dashboard"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary-content"
              >
              Dashboard
              </RouterLink>
              <RouterLink
              to="/veiculos"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary-content"
              >
              Veículos
              </RouterLink>
              <RouterLink
              to="/pneu"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary-content"
              >
              Gestão de Pneus
              </RouterLink>
              <RouterLink
              to="/pneus"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary-content"
              >
              Pneus
              </RouterLink>
              <RouterLink
              to="#"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary-content"
              >
              Manutenção
              </RouterLink>
              <RouterLink
              to="relatorios"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary-content"
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
