<template>
  <div class="p-6">
    <!-- Admin Welcome Banner -->
    <div class="bg-red-100 text-red-800 p-4 rounded-xl mb-8 shadow text-center">
      <h2 class="text-3xl font-bold mb-2">Bienvenue sur le tableau de bord !</h2>
      <p class="text-base">Aujourd'hui : {{ currentDate }}</p>
    </div>

    <!-- Summary Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <SummaryCard
        v-for="card in summaryCards"
        :key="card.title"
        :title="card.title"
        :value="card.value"
        :icon="card.icon"
        class="w-full aspect-square"
      />
    </div>
  </div>
</template>

<script setup>
import SummaryCard from '@/components/SummaryCard.vue'
import { ref, onMounted } from 'vue'

const currentDate = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const summaryCards = ref([
  { title: 'Utilisateurs', value: 0, icon: '👤' },
  { title: 'Vols', value: 0, icon: '✈️' },
  { title: 'Escale', value: 0, icon: '🛬' },
])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/dashboard-summary')
    const data = await res.json()

    summaryCards.value[0].value = data.totalUsers
    summaryCards.value[1].value = data.totalFlights
    summaryCards.value[2].value = data.totalEscales
  } catch (error) {
    console.error('Failed to fetch dashboard data', error)
  }
})
</script>
