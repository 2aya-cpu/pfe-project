<template>
  <div class="login-container">
    <!-- Left Side: Image -->
    <div class="image-section">
      <img :src="require('@/assets/loginpic.jpg')">

      <h1>Bienvenue à Bord!</h1>
    </div>

    <!-- Right Side: Login Form -->
    <div class="form-section">
      <h2>Authentification</h2>
      <form @submit.prevent="login">
        <label>Email</label>
        <input type="email" v-model="email" required />

        <label>Password</label>
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
    async login() {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Connexion réussie !");
          // Rediriger l'utilisateur après connexion réussie (ex: vers une page Dashboard)
          this.$router.push("/dashboard");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite lors de la connexion.");
      }
    },
  },
};
</script>


<style scoped>
/* General layout */
.login-container {
  display: flex;
  height: 100vh;
  background-color: #1a1a1a;
}

/* Left side */
.image-section {
  flex: 1;
  position: relative;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-section h1 {
  position: absolute;
  top: 15%;
  left: 10%;
  color: red;
  font-size: 2rem;
  font-weight: bold;
}

/* Right side */
.form-section {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-section h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

form {
  width: 70%;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 2px solid red;
  border-radius: 15px;
  background: lightgray;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 12px;
  background: black;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;
}

button:hover {
  background: red;
}
</style>
