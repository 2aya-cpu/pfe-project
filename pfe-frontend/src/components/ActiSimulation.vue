<template>
  
  <div class="simulations-pnt">
    <h2>Heures de vol et nombre de simulation PNT par secteur</h2>
    <h6 class="instruction-text">Veuillez entrer les dates de début et de fin :</h6>
    <form @submit.prevent="fetchSimulations" class="search">
      <div class="form-group">
        <label for="date_debut">Date début :</label>
        <input type="date" v-model="date_debut" required class="form-input" />
      </div>

      <div class="form-group">
        <label for="date_fin">Date fin :</label>
        <input type="date" v-model="date_fin" required class="form-input" />
      </div>
      
      <button type="submit">Rechercher</button>
    </form>

    <table v-if="simulations.length > 0">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Matricule PNT</th>
          <th>Groupe Socioprofessionnel</th>
          <th>Num Simulation</th>
          <th>Date Simulation</th>
          <th>Heures Simulation</th>
          <th>Nombre de Simulations</th> <!-- Nouvelle colonne -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="simulation in simulations" :key="simulation.num_simulation">
          <td>{{ simulation.nom }}</td>
          <td>{{ simulation.prenom }}</td>
          <td>{{ simulation.matricule_pn }}</td>
          <td>{{ simulation.groupe_socioprofessionnel }}</td>
          <td>{{ simulation.num_simulation }}</td>
          <td>{{ formatDate(simulation.date_simulation) }}</td>
          <td>{{ simulation.heures_simulation }}</td>
          <td>{{ simulation.nombre_simulations }}</td> <!-- Affichage du nombre -->
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
      simulations: [],
      date_debut: "",
      date_fin: "",
      totalSimulations: 0,
      totalHours: "00:00:00",
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
    async fetchSimulations() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/simulations/stats/pnt`,
          {
            params: {
              dateDebut: this.date_debut,
              dateFin: this.date_fin,
            },
          }
        );
        this.simulations = response.data.simulations;
        this.totalSimulations = response.data.totalSimulations;
        this.totalHours = response.data.totalHours;
      } catch (error) {
        console.error("Erreur lors de la récupération des simulations:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Container */
.simulations-pnt {
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

.form-group {
  flex: 1 1 20%;
  min-width: 380px;
  text-align: left;
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

/* Search Form */
.search {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  margin-bottom: 20px;
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

button {
  background-color: #e60012;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
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

/* No results message */
p {
  font-size: 1.1rem;
  color: #555;
  margin-top: 20px;
}

.summary {
  margin: 10px 0;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}
</style>
