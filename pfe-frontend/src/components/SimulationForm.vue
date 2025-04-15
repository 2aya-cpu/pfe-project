<template>
  <div class="container">
    <h2>Ajouter une simulation</h2>
    <p class="subtitle">Veuillez remplir les informations puis enregistrer.</p>

    <form @submit.prevent="ajouterSimulation">
      <div class="form-grid">
        <div class="form-group">
          <label>Code Type Simulation :</label>
          <input v-model="simulation.code_typesimulation" type="number" required />
        </div>
        <div class="form-group">
          <label>Code Simulateur :</label>
          <input v-model="simulation.code_simulateur" type="number" required />
        </div>
        <div class="form-group">
          <label>Date :</label>
          <input v-model="simulation.date_simulation" type="date" required />
        </div>
        <div class="form-group">
          <label>Heure Début :</label>
          <input v-model="simulation.heure_debut" type="time" required />
        </div>
        <div class="form-group">
          <label>Heure Fin :</label>
          <input v-model="simulation.heure_fin" type="time" required />
        </div>
        <div class="form-group">
          <label>Durée :</label>
          <input v-model="simulation.duree" type="time" required />
        </div>
      </div>

      
      <button type="submit"  class="ajouter-btn">Ajouter</button>
      
    </form>

    <p v-if="message">{{ message }}</p>

    <!-- Bouton Suivant toujours visible -->
    <router-link to="/formparticipationsimulation" class="btn next-btn">Suivant</router-link>

  </div>

</template>



<script>
import axios from "axios";

export default {
  data() {
    return {
      simulation: {
        code_typesimulation: "",
        code_simulateur: "",
        date_simulation: "",
        heure_debut: "",
        heure_fin: "",
        duree: "",
      },
      message: "",
      ajoutReussi: false, // Bouton caché au départ
    };
  },
  methods: {
    async ajouterSimulation() {
      console.log("ajouterSimulation() appelée"); // Vérifie si la fonction est exécutée
      try {
        await axios.post("http://localhost:5000/api/simulations/add", this.simulation);

        this.message = "Simulation ajoutée avec succès !";

        // ✅ Mise à jour correcte de ajoutReussi
        this.ajoutReussi = true;
        console.log("ajoutReussi:", this.ajoutReussi); // Vérifier dans la console

        // Réinitialiser le formulaire
        this.simulation = {
          code_typesimulation: "",
          code_simulateur: "",
          date_simulation: "",
          heure_debut: "",
          heure_fin: "",
          duree: "",
        };
      } catch (error) {
        this.message = "Erreur lors de l'ajout.";
        console.error("Erreur :", error);
      }
    },
    allerAFormParticipation() {
      this.$router.push("/form-participation");
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
  padding: 85px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Georgia, 'Times New Roman', Times, serif;
  border: 1px solid #e60012; /* Bordure rouge */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #e60012; /* Red */
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #444;
}

input {
  width: 70%;
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 5px;
}

.ajouter-btn {
  width: 20%;
  padding: 8px;
  background-color:  #e60012; /* Rouge vif */
  color: white;
  border-radius: 25px;

  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.ajouter-btn:hover {
  background-color: #e42424;
}
/* Sous-titre */
.subtitle {
  color: #555;
  text-align: center;
  margin-bottom: 20px;
  
}
.btn.next-btn {
  width: 20%;
  text-align: center;
  margin-top: 10px;
  padding: 8px;
  background-color:  #e60012; /* Rouge vif */
  color: white;
  border: none;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn.next-btn:hover {
  background-color: #e42424;
}



</style>
