<template>
  <div class="container">
    <h2 class="title">Heures de vol et nombre de vols par PN</h2>
    <h6 class="instruction-text">Veuillez entrer les dates de début et de fin :</h6>
    <!-- Barre de recherche par période de temps -->
    <form @submit.prevent="fetchPnStats" class="form">
      <div class="form-group">
        <label for="date_debut">Date début :</label>
        <input type="date" v-model="date_debut" required class="form-input" />
      </div>

      <div class="form-group">
        <label for="date_fin">Date fin :</label>
        <input type="date" v-model="date_fin" required class="form-input" />
      </div>

      <button type="submit" class="submit-btn">Rechercher</button>
    </form>

    <!-- Message d'erreur -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Tableau des résultats -->
    <table v-if="pnStats.length" class="result-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Grade</th>
          <th>Matricule</th>
          <th>Groupe Sociopro</th>
          <th>Nombre de vols</th>
          <th>Heures de vol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat in pnStats" :key="stat.matricule_pn">
          <td>{{ stat.nom }}</td>
          <td>{{ stat.prenom }}</td>
          <td>{{ stat.grades }}</td>
          <td>{{ stat.matricule_pn }}</td>
          <td>{{ stat.groupe_socioprofessionnel }}</td>
          <td>{{ stat.nombre_vols }}</td>
          <td>{{ stat.heures_vol }}</td>
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
      pnStats: [],
      errorMessage: "",
    };
  },
  methods: {
    async fetchPnStats() {
      try {
        this.errorMessage = "";
        this.pnStats = [];

        const response = await axios.get("http://localhost:5000/api/vols/stats/pn", {
          params: {
            date_debut: this.date_debut,
            date_fin: this.date_fin,
          },
        });

        this.pnStats = response.data;
      } catch (error) {
        this.errorMessage = "Erreur lors de la récupération des données.";
      }
    },
  },
};
</script>

<style scoped>
.container {
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

.title {
  font-size: 1.7rem;
  margin-bottom: 20px;
  color: #e60012;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

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
  width: 53%;
  border-radius: 10px;
  border: 2px solid #ddd;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
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

.submit-btn:hover {
  background-color: #c7000d;
  transform: scale(1.05);
}

.error {
  color: red;
  font-size: 1.1rem;
  margin-top: 15px;
}

.result-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

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
