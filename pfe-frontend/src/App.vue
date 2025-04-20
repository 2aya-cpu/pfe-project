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
/* Global styles to make the app fill the entire screen, but allow scrolling */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  /* overflow: hidden; */ /* ❌ remove or comment this */
  overflow: auto;         /* ✅ allow scrolling */
}
</style>