<template>


  <div>
    <!-- Afficher la Navbar sauf sur la page de login -->
    <Navbar v-if="showNavbar" />
    
    <div class="pt-16">
      <router-view />
    </div>

  </div>
</template>

<script>


import Navbar from "@/components/NavBar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();

    // Vérifier si la route actuelle est la page de login
    const showNavbar = computed(() => route.meta.showNavbar !== false);

    return { showNavbar };

  },
};
</script>

<style>
/* Add any global styles here if needed */
</style>
