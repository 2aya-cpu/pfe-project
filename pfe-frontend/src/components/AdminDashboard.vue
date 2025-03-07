<template>
    <div>
      <h1>Bienvenue Admin !</h1>
      <p>Page réservée à l'administrateur.</p>
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
  