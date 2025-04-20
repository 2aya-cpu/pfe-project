<template>
  <div class="containerv">
    <h2>Liste des Vols</h2>

    <!-- 🔍 Barre de recherche -->
    <input v-model="searchQuery" type="text" class="form-control mb-3" placeholder="Rechercher un vol par num de voyage" />

    <!-- 📋 Tableau des vols -->
    <table class="tablev">
      <thead>
        <tr>
          <th>ID</th>
          <th>Num de voyage</th>
          <th>Étape</th>
          <th>matricule_app</th>
          <th >Date du vol</th>
          <th>Tronçon</th>
          <th>Nature</th>
          <th>Temps de vol</th>
          <th>Départ</th>
          <th>Arrivée</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vol in paginatedVols" :key="vol.id">
          <td>{{ vol.id }}</td>
          <td>{{ vol.num_voyage }}</td>
          <td>{{ vol.etape }}</td>
          <td>{{ vol.lib_appareil }}</td>
          <td>{{ formatDate(vol.date_vol) }}</td>
          <td>{{ vol.lib_troncon }}</td>
          <td>{{ vol.lib_nature }}</td>
          <td>{{ vol.temps_vol }}</td>
          <td>{{ formatDate( vol.date_heure_depart ) }}</td>
          <td>{{ formatDate( vol.date_heure_arrivee ) }}</td>

          <td>
            <div class="icon-buttons-container">
  <button class="icon-button" @click="ouvrirModal(vol)" title="Modifier">
    <LucidePencil class="icon" />
  </button>
  <button class="icon-button delete" @click="supprimerVol(vol.id)" title="Supprimer">
    <LucideTrash2 class="icon" />
  </button>
  <button class="icon-button view" @click="ouvrirDetailsModal(vol)" title="Détails">
    <LucideEye size="18" />
  </button>
</div>



</td>

        </tr>
      </tbody>
    </table>
    <Teleport to="body">
  <Transition name="fade">
    <div v-if="showModal" class="custom-modal-overlay" @click.self="fermerModal">
      <div class="custom-modal">
        <h5 class="modal-title">Modifier le vol</h5>
        <button class="close-btn" @click="fermerModal">✖</button>

        <form @submit.prevent="modifierVol">
          <div class="row">
            <!-- Colonne de 4 champs -->
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Numéro de voyage</label>
                <input type="text" class="form-control" v-model="volModifie.num_voyage" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Étape</label>
                <input type="text" class="form-control" v-model="volModifie.etape" required />
              </div>
              <label class="form-label">Matricule Appareil</label>
<select class="form-control" v-model="volModifie.matricule_app" required>
  <option value="" disabled>Sélectionner un appareil</option>
  <option v-for="appareil in appareils" :key="appareil.matricule_app" :value="appareil.matricule_app">
    {{ appareil.lib_appareil }}
  </option>
</select>

              <div class="mb-3">
                <label class="form-label">Date du vol</label>
                <input type="date" class="form-control" v-model="volModifie.date_vol" required />
              </div>
            </div>

            <!-- Colonne de 3 champs -->
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Code Tronçon</label>
<select class="form-control" v-model="volModifie.code_troncon" required>
  <option value="" disabled>Sélectionner un tronçon</option>
  <option v-for="troncon in troncons" :key="troncon.code_troncon" :value="troncon.code_troncon">
    {{ troncon.lib_troncon }}
  </option>
</select>

              </div>
              <div class="mb-3">
                <label class="form-label">Code Nature</label>
<select class="form-control" v-model="volModifie.code_nature" required>
  <option value="" disabled>Sélectionner une nature</option>
  <option v-for="nature in natures" :key="nature.code_nature" :value="nature.code_nature">
    {{ nature.lib_nature }}
  </option>
</select>

              </div>
              <div class="mb-3">
                <label class="form-label">Temps de vol</label>
                <input type="text" class="form-control" v-model="volModifie.temps_vol" required />
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-success w-100">Enregistrer</button>
        </form>
      </div>
    </div>
  </Transition>
</Teleport>
<Teleport to="body">
  <Transition name="fade">
    <div v-if="showDetailsModal" class="custom-modal-overlay" @click.self="fermerDetails">
      <div class="custom-modal">
        <h4 class="modal-title">Détails du vol:</h4>
        <button class="close-btn" @click="fermerDetailsModal">✖</button>



        <table class="tabl">
  <tr><th class="thv">ID :</th><td class="tdv">{{ selectedVolDetails?.id }}</td></tr>
  <tr><th class="thv" >Numéro de voyage :</th><td class="tdv">{{ selectedVolDetails?.num_voyage }}</td></tr>
  <tr><th class="thv">Date du vol :</th><td class="tdv">{{ formatDate(selectedVolDetails?.date_vol) }}</td></tr>
</table>
<p v-if="!selectedVolDetails"> Aucune donnée disponible</p>


<br>

<h4>Participants au vol:</h4>
<table class="table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Matricule</th>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Grade</th>
      <th>Position</th>
      <th>Action</th> <!-- Nouvelle colonne -->
    </tr>
  </thead>
  <tbody>
    <tr v-for="p in participants" :key="p?.code_participation">
      <td>{{ p?.code_participation }}</td>
      <td>{{ p?.matricule_pn }}</td>
      <td>{{ p?.nom }}</td>
      <td>{{ p?.prenom }}</td>
      <td>{{ p?.grade }}</td>
      <td>{{ p?.position }}</td>
     
      <td>
  <div class="d-flex gap-2">
    <!-- Bouton Modifier -->
    <button @click="modifierParticipant(p)"  class="icon-button" title="Modifier"><LucidePencil class="icon" /></button>

    <!-- Bouton Supprimer -->
    <button @click="supprimerParticipant(p)" class="icon-button delete" title="Supprimer"><LucideTrash2 class="icon" /></button>
  </div>
</td>

    </tr>
  </tbody>
</table>



      </div>
    </div>
  </Transition>
</Teleport>

<Teleport to="body">
  <div v-if="showEditModal" class="custom-modal-overlay" @click.self="showEditModal = false">
    <div class="custom-modal">
      <h5>Modifier le participant</h5>

      <!-- Sélection du PN -->
      <label>Nom et Prénom :</label>
      <select v-model="participantModifie.matricule_pn" @change="updateParticipantDetails" class="form-control">
        <option value="" disabled>Sélectionner un PN</option>
        <option v-for="pn in personnelsNavigants" :key="pn.matricule_pn" :value="pn.matricule_pn">
          {{ pn.nom }} {{ pn.prenom }}
        </option>
      </select>

      <div v-if="participantModifie.matricule_pn">
        <!-- Affichage du nom et prénom du participant sélectionné -->
        <p>Nom: {{ participantModifie.nom }}</p>
        <p>Prénom: {{ participantModifie.prenom }}</p>
      </div>

      <!-- Position -->
      <label>Position :</label>
      <select v-model="participantModifie.position" class="form-control">
        <option value="" disabled>Sélectionner une position</option>
        <option v-for="pos in positions" :key="pos.code_position" :value="pos.code_position">
          {{ pos.lib_position }}
        </option>
      </select>

      <!-- Boutons -->
      <button @click="sauvegarderModification" class="btn btn-success">Enregistrer</button>
      <button @click="showEditModal = false" class="btn btn-secondary">Annuler</button>
    </div>
  </div>
</Teleport>
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
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LucidePencil, LucideTrash2, LucideEye } from "lucide-vue-next";

export default {
  components: {
    LucidePencil,
    LucideTrash2,
    LucideEye
  },
  data() {
    return {
      vols: [],
      appareils: [],
      troncons: [],
      natures: [],
      grades: [],
      positions: [],
      personnelsNavigants: [],

      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 3,

      showModal: false,
      showDetailsModal: false,
      showEditModal: false,

      volModifie: {
        id: "",
        num_voyage: "",
        etape: "",
        matricule_app: "",
        date_vol: "",
        code_troncon: "",
        code_nature: "",
        temps_vol: "",
        date_heure_depart: "",
        date_heure_arrivee: ""
      },

      selectedVolDetails: {},
      participants: [],
      participantModifie: {}
    };
  },
  computed: {
    filteredVols() {
  return this.vols.filter((vol) =>
    String(vol.num_voyage).toLowerCase().includes(this.searchQuery.toLowerCase())
  );
},
    totalPages() {
      return Math.ceil(this.filteredVols.length / this.itemsPerPage);
    },
    paginatedVols() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredVols.slice(start, start + this.itemsPerPage);
    }
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
    async fetchVols() {
      try {
        const response = await axios.get("http://localhost:5000/api/vols");
        this.vols = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des vols", error);
      }
    },
    async fetchAppareils() {
      try {
        const response = await axios.get("http://localhost:5000/api/appareils");
        this.appareils = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des appareils", error);
      }
    },
    async fetchTroncons() {
      try {
        const response = await axios.get("http://localhost:5000/api/troncons");
        this.troncons = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des tronçons", error);
      }
    },
    async fetchNatures() {
      try {
        const response = await axios.get("http://localhost:5000/api/natures");
        this.natures = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des natures", error);
      }
    },
    async fetchGrades() {
      try {
        const response = await axios.get("http://localhost:5000/api/equipage/grades");
        this.grades = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des grades :", error);
      }
    },
    async fetchPositions() {
      try {
        const response = await axios.get("http://localhost:5000/api/equipage/positions");
        this.positions = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des positions :", error);
      }
    },
    async fetchPN() {
  try {
    const response = await axios.get("http://localhost:5000/api/pn");
    this.personnelsNavigants = response.data;
    console.log("✅ Personnels navigants chargés :", this.personnelsNavigants);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des personnels navigants :", error);
    alert("Erreur lors du chargement des personnels navigants !");
  }
},
    async supprimerVol(id) {
      if (!confirm("Voulez-vous vraiment supprimer ce vol ?")) return;
      try {
        await axios.delete(`http://localhost:5000/api/vols/${id}`);
        this.vols = this.vols.filter((vol) => vol.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    },
    async supprimerParticipant(participant) {
      if (!confirm("Voulez-vous vraiment supprimer ce participant ?")) return;
      try {
        await axios.delete(`http://localhost:5000/api/equipage/participants/${participant.code_participation}`);
        this.participants = this.participants.filter((p) => p.code_participation !== participant.code_participation);
        alert("Participant supprimé avec succès !");
      } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    },
    async fetchPersonnelsNavigants() {
      try {
        const response = await axios.get("http://localhost:5000/api/personnels");
        this.personnelsNavigants = response.data;
        console.log("✅ Personnels navigants chargés :", this.personnelsNavigants);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des personnels navigants :", error);
        alert("Erreur lors du chargement des personnels navigants !");
      }
    },
     modifierParticipant(participant) {
    this.participantModifie = { ...participant };
    this.showEditModal = true;
  },
 
 // Update details when a PN is selected
 updateParticipantDetails() {
      const selectedPN = this.personnelsNavigants.find(pn => pn.matricule_pn === this.participantModifie.matricule_pn);
      if (selectedPN) {
        this.participantModifie.nom = selectedPN.nom;
        this.participantModifie.prenom = selectedPN.prenom;
      }
    },
    
    async sauvegarderModification() {
  console.log("📝 Données envoyées pour modification :", this.participantModifie);

  try {
    const response = await axios.put(
      `http://localhost:5000/api/equipage/${this.participantModifie.code_participation}`,
      {
        matricule_pn: this.participantModifie.matricule_pn,
        code_position: this.participantModifie.position // Assure-toi que 'position' correspond bien au 'code_position' attendu
      }
    );

    if (response.data && response.data.success) {
      alert("Participant mis à jour avec succès !");
      this.showEditModal = false;
    } else {
      console.error("❌ Problème avec la mise à jour du participant");
      alert("Erreur lors de la mise à jour du participant.");
    }
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
    alert("Erreur lors de la mise à jour !");
  }
},
ouvrirModal(vol) {
  this.volModifie = {
    ...vol,
    date_vol: vol.date_vol ? this.formatDateForInput(vol.date_vol) : '',
    date_heure_depart: vol.date_heure_depart ? this.formatDateTimeForInput(vol.date_heure_depart) : '',
    date_heure_arrivee: vol.date_heure_arrivee ? this.formatDateTimeForInput(vol.date_heure_arrivee) : ''
  };
  this.showModal = true;
},
formatDateForInput(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
},
formatDateTimeForInput(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
},
    fermerModal() {
      this.showModal = false;
    },
    async modifierVol() {
      try {
        await axios.put(`http://localhost:5000/api/vols/${this.volModifie.id}`, this.volModifie);
        alert("✅ Vol modifié avec succès !");
        this.showModal = false;
        this.fetchVols();
      } catch (error) {
        console.error("❌ Erreur lors de la modification du vol :", error);
        alert("Une erreur est survenue !");
      }
    },
    async ouvrirDetailsModal(vol) {
      try {
        if (!vol || !vol.id) return;
        this.selectedVolDetails = { ...vol };
        const participantsResponse = await axios.get(`http://localhost:5000/api/equipage/${vol.id}`);
        this.participants = participantsResponse.data;
        this.showDetailsModal = true;
      } catch (error) {
        console.error("🚨 Erreur lors de la récupération des détails du vol :", error);
      }
    },
    fermerDetailsModal() {
      this.showDetailsModal = false;
      this.selectedVolDetails = {};
      this.participants = [];
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    changePage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.fetchVols();
    this.fetchAppareils();
    this.fetchTroncons();
    this.fetchNatures();
    this.fetchGrades();
    this.fetchPositions();
    this.fetchPN();
  }
};
</script>



<style>
.btn {
  margin: 2px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}


.btn-warning {
  background-color: orange;
  color: white;
}

.btn-danger {
  background-color: red;
  color: white;
}

.custom-modal-overlay {
  display: flex !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.details .icon {
  color: blue;
}

.containerv {
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
.tablev {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.thv, .tdv {
  border: 1px solid #000000;
  padding: 15px 10px; /* Hauteur réduite */
  text-align: center;
  vertical-align: middle;
  line-height: 0.9;
}


.thv {
  background-color: rgb(245, 245, 245); 
  color: black;
  font-weight: bold;
  font-size: 13.5px;
}
th {
  background-color: #e60012; /* Rouge Air Algérie */
  color: white;
  font-weight: bold;
  font-size: 13.5px;
}


tbody tr:hover {
  background-color: white; /* Hover clair rouge */
  transition: background-color 0.2s ease-in-out;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 20px;
  
  
}

.page-btn {
  background-color: #ffffff; /* blanc */
  color: #e60012; /* rouge */
  border: 2px solid #e60012;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 5px;
}



.page-btn:disabled {
  background-color: #e0e0e0;
  color: #aaaaaa;
  border-color: #cccccc;
  cursor: not-allowed;
}

.pagination-container
{display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.dots {
  padding: 10px;
  font-size: 16px;
  color: #6b7280;
}

.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 3px;
  transition: transform 0.2s ease-in-out;
}
.icon-button:hover {
  transform: scale(1.1);
}

.icon {
  width: 20px;
  height: 20px;
  color: #333;
}

.delete .icon {
  color: red;
}

/*  Style du modal flottant */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.custom-modal {
  background: white;
  padding: 20px;
  width: 700px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: red;
}

/*  Animation d'apparition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/*  Style responsive */
@media (max-width: 500px) {
  .custom-modal {
    width: 90%;
  }
}
.icon-buttons-container {
  display: flex;
  gap: 8px; /* espace entre les icônes */
  align-items: center;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button.delete {
  color: red;
}

.icon-button.view {
  color: #0d6efd; /* ou n'importe quelle couleur pour le bouton "vue" */
}

</style>