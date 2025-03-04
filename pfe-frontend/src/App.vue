<template>
  <div>
    <h1>Mon Application Vue</h1>
    <LoginForm />  <!-- Affiche le formulaire de connexion -->
  </div>
</template>

<script>
import LoginForm from "./components/LoginForm.vue";

export default {
  name: "App",
  components: {
    LoginForm,
  },
};
</script>
