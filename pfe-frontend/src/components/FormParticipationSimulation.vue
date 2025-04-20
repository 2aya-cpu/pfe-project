<template>
  <div class="form-container">
    <h2>Ajout de la Participation à la Simulation</h2>

    <!-- 🔹 Affichage du numéro et de la date de la simulation -->
    <div class="info-simulation">
      <p><strong>Numéro de Simulation :</strong> {{ num_simulation }}</p>
      <p><strong>Date de Simulation :</strong> {{ formatDate(date_simulation) }}</p>
    </div>

    <form @submit.prevent="submitForm">
      <div v-for="(pn, index) in equipage" :key="index" class="form-row">
        <div class="form-group">
          <label>PN {{ index + 1 }}</label>
          <select v-model="pn.matricule_pn" required>
            <option disabled value="">-- Sélectionnez un PN --</option>
            <option v-for="personnel in personnelNavigant" :key="personnel.matricule_pn" :value="personnel.matricule_pn">
              {{ personnel.nom }} {{ personnel.prenom }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Position</label>
          <select v-model="pn.code_position" required>
            <option disabled value="">-- Sélectionnez une position --</option>
            <option v-for="position in positions" :key="position.code_position" :value="position.code_position">
              {{ position.lib_position }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn submit-btn">Enregistrer</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      equipage: Array.from({ length: 4 }, () => ({ matricule_pn: "", code_position: "" })),
      personnelNavigant: [],
      positions: [],
      code_simulation: 1,  // À modifier dynamiquement selon la simulation concernée
      num_simulation: null, // 🔹 Numéro de simulation
      date_simulation: null // 🔹 Date de simulation
    };
  },
  methods: {
    formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
},
    async fetchData() {
  try {
    console.log("🔹 Récupération des PN et positions...");
    
    const [pnRes, posRes] = await Promise.all([
    axios.get("http://localhost:5000/api/participationsim/pn"),
    axios.get("http://localhost:5000/api/participationsim/positions") // 🔹 Modifier ici
    ]);

    this.personnelNavigant = pnRes.data;
    this.positions = posRes.data;

    console.log("✅ PN récupérés :", this.personnelNavigant);
    console.log("✅ Positions récupérées :", this.positions);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des données :", error);
  }
    },
    async fetchSimulationDetails() {
  try {
    const response = await axios.get("http://localhost:5000/api/participationsim/last");
    const simulation = response.data;
    
    this.num_simulation = simulation.num_simulation;
    this.date_simulation = simulation.date_simulation;
    this.code_simulation = simulation.num_simulation;  // 🔹 Mettre à jour l’ID de la simulation

    console.log("✅ Simulation récupérée :", simulation);
  } catch (error) {
    console.error("❌ Erreur lors du chargement de la simulation :", error);
  }
    },
    async submitForm() {
      try {
        console.log("🔹 Données envoyées :", {
          code_simulation: this.code_simulation,
          equipage: this.equipage
        });
        console.log("Données envoyées :", JSON.parse(JSON.stringify(this.equipage)));

        const response = await axios.post("http://localhost:5000/api/participationsim/ajouter-simulation", {
          code_simulation: this.code_simulation,
          equipage: JSON.parse(JSON.stringify(this.equipage)) // 🔹 Convertir le Proxy en objet normal
        });

        alert(response.data.message);
      } catch (error) {
        console.error("❌ Erreur lors de l'enregistrement :", error);
      }
    }
  },
  mounted() {
    this.fetchData();
    this.fetchSimulationDetails(); // 🔹 Récupérer la simulation au montage
  }
};
</script>

<style scoped>
.form-container {
  max-width: 1100px;
  margin: auto;
  padding: 75px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  border: 1px solid #e60012; /* Bordure rouge */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #e60012; /* Red */
}

.info-simulation {
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 2px solid #eeb5b5;
  width: 60%; /* 🔸 Réduit la largeur à 80% */
  margin: 0 auto 20px auto; /* 🔸 Centre le bloc horizontalement */

}

.info-simulation p {
  margin: 1px 0px;
  color: #333;
  
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 48%;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #444;
}

select {
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.submit-btn {
  width: 20%;
  padding: 8px;
  background-color:  #e60012; /* Rouge vif */
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #e42424;
}

</style>
