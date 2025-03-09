<template>
  <div>
    <h1>Bienvenue Agent de saisie !</h1>
    <p>Page réservée aux agents.</p>
    <router-link to="/pn-manager">Gérer PN</router-link>

    <button @click="logout">Déconnexion</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("role");
      this.$router.push("/");
    },
  },
};
</script>
