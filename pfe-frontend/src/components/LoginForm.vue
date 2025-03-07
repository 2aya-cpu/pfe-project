<template>
  <div class="login-container">
    <div class="form-section">
      <h2>Authentification</h2>
      <form @submit.prevent="login">
        <label>Email</label>
        <input type="email" v-model="email" required />

        <label>Mot de passe</label>
        <input type="password" v-model="password" required />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const users = [
        { email: "admin@example.com", password: "nouveauMotDePasse", role: 1 },
        { email: "agent@example.com", password: "agent123", role: 2 },
      ];

      const user = users.find(
        (u) => u.email === this.email && u.password === this.password
      );

      if (user) {
        localStorage.setItem("role", user.role);
        alert("Connexion réussie !");
        console.log("Redirection vers :", user.role === 1 ? "/admin-dashboard" : "/agent-dashboard");
        // Redirection en fonction du rôle
        if (user.role === 1) {
          this.$router.push("/admin-dashboard");
        } else if (user.role === 2) {
          this.$router.push("/agent-dashboard");
        }
      } else {
        alert("Email ou mot de passe incorrect !");
      }
    },
  },
};
</script>
