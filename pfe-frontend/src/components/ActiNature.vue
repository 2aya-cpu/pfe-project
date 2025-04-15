<template>
  <div class="containere">
    <h2 class="title">Heures de vol et nombre de vols par nature</h2>
    <h6 class="instruction-text">Veuillez entrer les dates de début et de fin :</h6>
    <!-- Formulaire de sélection des dates -->
    <form @submit.prevent="fetchFlightStats" class="form">
  <div class="form-group">
    <label for="date_debut">Date début :</label>
    <input type="date" v-model="date_debut" required class="form-input" />
  </div>

  <div class="form-group">
    <label for="date_fin">Date fin :</label>
    <input type="date" v-model="date_fin" required class="form-input" />
  </div>

  <button type="submit" class="submit_btn">Rechercher</button>
</form>


    <!-- Message d'erreur -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Tableau des résultats -->
    <table v-if="flightStats.length" class="result-table">
      <thead>
        <tr>
          <th>Nature du vol</th>
          <th>Nombre de vols</th>
          <th>Heures de vol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat in flightStats" :key="stat.lib_nature">
          <td>{{ stat.lib_nature || "Non spécifié" }}</td>
          <td>{{ stat.nombre_vols || 0 }}</td>
          <td>{{ stat.heures_vol || "00:00:00" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      date_debut: "",
      date_fin: "",
      flightStats: [],
      errorMessage: "",
    };
  },
  methods: {
    async fetchFlightStats() {
      try {
        this.errorMessage = "";
        this.flightStats = [];

        // Vérifier le type de données avant l'envoi
        console.log("📤 Envoi de la requête avec :", this.date_debut, this.date_fin);

        // Vérifier si les dates sont bien des chaînes de caractères
        const dateDebut = typeof this.date_debut === "object" ? this.date_debut.toString() : this.date_debut;
        const dateFin = typeof this.date_fin === "object" ? this.date_fin.toString() : this.date_fin;

        const response = await axios.get("http://localhost:5000/api/vols/stats-nature", {
          params: {
            date_debut: dateDebut,
            date_fin: dateFin,
          },
        });

        console.log("📌 Réponse API :", response.data);
        this.flightStats = response.data;
      } catch (error) {
        console.error("❌ Erreur API :", error.response?.data || error.message);
        this.errorMessage = "Erreur lors de la récupération des données.";
      }
    },
  },
};
</script>

<style scoped>
/* Layout */
.containere {
  max-width: 1100px;
  margin: auto;
  padding: 85px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  border: 1px solid #e60012; /* Bordure rouge */
}

/* Title */
h2 {
  font-size: 1.7rem;
  margin-bottom: 20px;
  color: #e60012; /* Red */
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

/* Form Styling */
.form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.form-group {
  flex: 1 1 20%;
  min-width: 200px;
  text-align: left;
}
.form-input {
  padding: 12px;
  width: 70%;
  border-radius: 10px;
  border: 2px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s ease;
}
input[type="date"] {
  padding: 12px;
  width: 200px;
  border-radius: 10px;
  border: 2px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input[type="date"]:focus {
  border-color: #e60012;
  box-shadow: 0 0 5px rgba(230, 0, 18, 0.5);
}
.submit-btn {
  background-color: #e60012;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
button {
  background-color: #e60012;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 10px;
}


/* Error message styling */
.error {
  color: red;
  font-size: 1.1rem;
  margin-top: 15px;
}

/* Table Styling */
/* Table Styling */
table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

/* Table Header */
th {
  background: linear-gradient(135deg, #e60012, #c7000d); /* Stylish gradient */
  color: white;
  font-size: 0.9rem;
  text-transform: uppercase;
  padding: 15px;
  border: none;
}

/* Table Rows */
td {
  font-size: 1rem;
  padding: 15px;
  border: none;
  text-align: center;
}

/* Zebra Striping */
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:nth-child(odd) {
  background-color: #ffffff;
}


/* Smooth Borders for First and Last Row */
tbody tr:first-child td {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

tbody tr:last-child td {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

</style>
