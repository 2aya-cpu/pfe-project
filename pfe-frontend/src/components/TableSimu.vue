<template>
  <div class="container">
    <h2>Gestion des Simulations</h2>
    <div class="search-bar">
    <input v-model="searchQuery" @input="fetchSimulations" placeholder="🔍 Rechercher par id ou type ou simulateur" class="form-control mb-3" />
</div>
    <!-- Tableau des simulations -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Simulateur</th>
          <th>Date</th>
          <th>Début</th>
          <th>Fin</th>
          <th>Durée</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="simulation in paginatedSimulations" :key="simulation.num_simulation">

          <td>{{ simulation.num_simulation }}</td>
          <td>{{ simulation.lib_typesimulation }}</td>
          <td>{{ simulation.lib_simulateur }}</td>
          <td>{{ formatDate(simulation.date_simulation) }}</td>
          <td>{{ simulation.heure_debut }}</td>
          <td>{{ simulation.heure_fin }}</td>
          <td>{{ simulation.duree }}</td>
          <td>
            <div class="icon-buttons-container">
  <button class="icon-button"  @click="editSimulation(simulation)" title="Modifier">
    <LucidePencil class="icon" />
  </button>
  <button class="icon-button delete" @click="deleteSimulation(simulation.num_simulation)" title="Supprimer">
    <LucideTrash2 class="icon" />
  </button>
  <button class="icon-button view" @click="fetchDetails(simulation.num_simulation)" title="Détails">
    <LucideEye size="18" />
  </button>
</div>
           
          </td>
        </tr>
      </tbody>
    </table>

   <!-- Modal d'édition -->
<Transition name="fade">
  <div v-if="showEditModal" class="small-modal">
    <div class="small-modal-content">
      <span class="close" @click="showEditModal = false">&times;</span>
      <h3>Modifier la Simulation</h3>
      <form @submit.prevent="submitForm">
        
        <!-- Select pour le type de simulation -->
        <label>Type Simulation :</label>
        <select v-model="formData.lib_typesimulation" required>
          <option v-for="type in typesSimulations" :key="type.lib_typesimulation" :value="type.lib_typesimulation">
            {{ type.lib_typesimulation }}
          </option>
        </select>

        <!-- Select pour le simulateur -->
        <label>Simulateur :</label>
        <select v-model="formData.lib_simulateur_simulateur" required>
          <option v-for="sim in simulateurs" :key="sim.lib_simulateur" :value="sim.lib_simulateur">
            {{ sim.lib_simulateur }}
          </option>
        </select>

        <label>Date :</label>
        <input type="date" v-model="formData.date_simulation" required />

        <label>Heure Début :</label>
        <input type="time" v-model="formData.heure_debut" required />

        <label>Heure Fin :</label>
        <input type="time" v-model="formData.heure_fin" required />

        <label>Durée :</label>
        <input type="time" v-model="formData.duree" required />

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </div>
</Transition>

    <!-- Modal des détails -->
    <Transition name="fade">
      <div v-if="showDetailsModal" class="small-modal">
        <div class="small-modal-content">
          <span class="close" @click="closeDetailsModal">&times;</span>
          <h4>Détails de la Simulation</h4>
          <table>
            <tr><th>ID</th><td>{{ details.num_simulation }}</td></tr>
           
            <tr><th>Simulateur</th><td>{{ details.code_simulateur }}</td></tr>
            <tr><th>Date</th><td>{{ formatDate(details.date_simulation) }}</td></tr>
          
          </table>
          <h4>Participants au vol</h4>
          <table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Matricule</th>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Grade</th>
      <th>Position</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="participant in participations" :key="participant.code_participationsimulation">
      <td>{{ participant.code_participationsimulation }}</td>
      <td>{{ participant.matricule_pn }}</td>
      <td>{{ participant.nom }}</td>
      <td>{{ participant.prenom }}</td>
      <td>{{ participant.grade }}</td>
      <td>{{ participant.position }}</td>

      <td>
        <div class="d-flex gap-2">
          <button @click="modifierParticipant(participant)"  title="Modifier" class="icon-button"> <LucidePencil class="icon" /></button>
          <button @click="supprimerParticipant(participant)" title="Supprimer" class="icon-button delete"><LucideTrash2 class="icon" /></button>
        </div>
      </td>
    </tr>
  </tbody>
</table>

      </div>
      </div>
    </Transition>
    <!-- Modal de modification -->
<Transition name="fade">
  <div v-if="showEditParticipantModal" class="small-modal">
    <div class="small-modal-content">
      <span class="close" @click="showEditParticipantModal = false">&times;</span>
      <h3>Modifier le Participant</h3>
      <form @submit.prevent="enregistrerModificationParticipant">
  <label>Nom & Prénom :</label>
  <select v-model="selectedParticipant.matricule_pn" required>
    <option disabled value="">Sélectionner un personnel</option>
    <option v-for="personnel in personnels" :key="personnel.matricule_pn" :value="personnel.matricule_pn">
      {{ personnel.nom }} {{ personnel.prenom }} - {{ personnel.grade }}
    </option>
  </select>

  <label>Position :</label>
  <select v-model="selectedParticipant.code_position" required>
    <option disabled value="">Sélectionner une position</option>
    <option v-for="position in positions" :key="position.code_position" :value="position.code_position">
      {{ position.lib_position }}
    </option>
  </select>

  <button type="submit">Enregistrer</button>
</form>

    </div>
  </div>
</Transition>
  <!--  Pagination -->
 <!-- Pagination simple -->
<div class="pagination-container">
  <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">
    &laquo; 
  </button>

  <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">
    &raquo;
  </button>
</div>

  </div>
  
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { LucidePencil, LucideTrash2, LucideEye } from "lucide-vue-next";

export default defineComponent({
  components: {
    LucidePencil,
    LucideTrash2,
    LucideEye
  },
  data() {
  return {
    simulations: [],
    personnels: [],
    positions: [],
    searchQuery: "",
    showEditModal: false,
    showDetailsModal: false,
    showEditParticipantModal: false, // Ajout de la variable ici 👈
    formData: {
      num_simulation: null,
      lib_typesimulation: "",
      lib_simulateur: "",
      date_simulation: "",
      heure_debut: "",
      heure_fin: "",
      duree: "",
    },
    details: {},
    typesSimulations: [],  // Stockera les types de simulation
    simulateurs: [],       // Stockera les simulateurs
    participations: [],
    selectedParticipant: {}, // Ajout pour stocker le participant sélectionné
    currentPage: 1,
itemsPerPage: 3, // ou 10 selon ton choix


  };
},
computed: {
  paginatedSimulations() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.simulations.slice(start, end);
  },
  totalPages() {
    return Math.ceil(this.simulations.length / this.itemsPerPage);
  },
  visiblePages() {
    return [...Array(this.totalPages).keys()].map(i => i + 1);
  }
},
  methods: {
    
    changePage(page) {
    this.currentPage = page;
  },
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  },
    async supprimerParticipant(participant) {
    console.log("🗑️ Tentative de suppression du participant :", participant);
    
    if (!participant || !participant.code_participationsimulation) {
        console.error("❌ Erreur : ID du participant non défini !");
        return;
    }

    try {
        console.log(`🗑️ Suppression du participant ID: ${participant.code_participationsimulation}`);
        await axios.delete(`http://localhost:5000/api/participationsim/participation/${participant.code_participationsimulation}`);

        console.log("✅ Participant supprimé avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
    }
},
formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
},
modifierParticipant(participant) {
  this.selectedParticipant = { ...participant };
  this.showEditParticipantModal = true;
},
async enregistrerModificationParticipant() {
  try {
    await axios.put(`http://localhost:5000/api/participationsim/${this.selectedParticipant.code_participationsimulation}`, {
      matricule_pn: this.selectedParticipant.matricule_pn,
      code_position: this.selectedParticipant.code_position,
    });

    this.participations = this.participations.map(p =>
      p.code_participationsimulation === this.selectedParticipant.code_participationsimulation
        ? { ...this.selectedParticipant }
        : p
    );

    this.showEditParticipantModal = false;
    console.log("✅ Participant modifié !");
  } catch (error) {
    console.error("❌ Erreur lors de la modification :", error);
  }
},
async fetchPersonnels() {
  try {
    const response = await axios.get("http://localhost:5000/api/simulations/personnels");
    this.personnels = response.data;
  } catch (error) {
    console.error("❌ Erreur fetch personnels :", error);
  }
},

async fetchPositions() {
  try {
    const response = await axios.get("http://localhost:5000/api/participationsim/positions");
    this.positions = response.data;
  } catch (error) {
    console.error("❌ Erreur fetch positions :", error);
  }
},

async fetchSimulations() {
      try {
        const response = await axios.get("http://localhost:5000/api/tablesimulation", {
          params: { search: this.searchQuery },
        });
        this.simulations = response.data;
      } catch (error) {
        console.error("Erreur de récupération :", error);
      }
    },
    async fetchDetails(id) {
   try {
     console.log(`🔎 Fetching: http://localhost:5000/api/tablesimulation/${id}`);
     const response = await axios.get(`http://localhost:5000/api/tablesimulation/${id}`);
     this.details = response.data;
     console.log(`🔎 Fetching participants: http://localhost:5000/api/participationsim/${id}`);
    const participationResponse = await axios.get(`http://localhost:5000/api/participationsim/${id}`);
    this.participations = participationResponse.data;
     this.showDetailsModal = true;
   } catch (error) {
     console.error("❌ Erreur lors de la récupération des détails :", error);
   }
},
    async deleteSimulation(id) {
      if (confirm("Voulez-vous vraiment supprimer cette simulation ?")) {
        try {
          await axios.delete(`http://localhost:5000/api/tablesimulation/${id}`);
          this.fetchSimulations();
        } catch (error) {
          console.error("Erreur de suppression :", error);
        }
      }
    },
    editSimulation(simulation) {
      this.formData = { ...simulation };
      this.showEditModal = true;
    },
    cancelEdit() {
      this.showEditModal = false;
    },
    async submitForm() {
      try {
        await axios.put(`http://localhost:5000/api/tablesimulation/${this.formData.num_simulation}`, this.formData);
        this.fetchSimulations();
        this.showEditModal = false;
      } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
      }
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
    },
    async fetchTypesSimulations() {
    try {
        console.log("📡 Requête vers :", "http://localhost:5000/api/tablesimulation/typesimulation");
        const response = await axios.get("http://localhost:5000/api/tablesimulation/typesimulation");

        this.typesSimulations = response.data;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des types de simulation :", error);
    }
},

async fetchSimulateurs() {
    try {
        console.log("📡 Requête vers :", "http://localhost:5000/api/tablesimulation/simulateurs");
        const response = await axios.get("http://localhost:5000/api/tablesimulation/simulateurs");

        this.simulateurs = response.data;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des simulateurs :", error);
    }
},
async updateSimulation(id, updatedData) {
    try {
        console.log("Données envoyées :", updatedData); // ✅ Debug

        const response = await fetch(`http://localhost:5000/api/simulations/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        const updatedSimulation = await response.json();
        console.log("Réponse du serveur :", updatedSimulation); // ✅ Debug

        // Met à jour les données dans le tableau
        const index = this.simulations.findIndex(sim => sim.num_simulation === id);
        if (index !== -1) {
            this.simulations[index] = updatedSimulation;
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
    }
},
  },
  mounted() {
    this.fetchSimulations();
    this.fetchTypesSimulations();
    this.fetchSimulateurs();
    this.fetchPersonnels();
this.fetchPositions();

  },
});
</script>



<style scoped>
.container {
  max-width: 1250px;
  margin: auto;
  padding: 85px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  border: 1px solid #e60012; /* Bordure rouge */
}
/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Petit Modal */
.small-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 700px;
  text-align: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}
.small-modal-content {
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #555;
}
.close:hover {
  color: black;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid #e0e0e0;
  padding: 15px 10px; /* Hauteur réduite */
  text-align: center;
  vertical-align: middle;
  line-height: 0.9;
}
th {
  background-color: #e60012; /* Rouge Air Algérie */
  color: #ffffff;
  font-weight: bold;
  font-size: 13.5px;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 20px;
}

.search-bar input {
  flex: 1;
  margin-right: 15px;
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
