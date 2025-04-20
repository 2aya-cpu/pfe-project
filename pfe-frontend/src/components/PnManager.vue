<template>
  <div class="containere">
  
    
   
    <div class="header-container">
     
      <h1>Gestion des Personnel Navigants</h1>
    </div>

    <div class="action-container">
      <input
        v-model="searchTerm"
        @input="searchPN"
        class="search-input"
        placeholder="Recherche PN par matricule, nom ou prénom..."
      />
      <button @click="openAddModal" class="btn btn-primary">
        <i class="fas fa-plus"></i> Ajouter
      </button>
    </div>

    <!-- Tableau -->
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Encadre</th>
            <th>Instructeur</th>
            <th>Date de <br> sortie</th>
            <th>Base</th>
            <th>Contrat</th>
            <th>Grade</th>
            <th>Qualification</th>
            <th>groupe_sociopro-<br>fessionnel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pn in filteredPN" :key="pn.matricule_pn">
            <td>{{ pn.matricule_pn }}</td>
            <td>{{ pn.nom }}</td>
            <td>{{ pn.prenom }}</td>
            <td>
              <span :class="{'bg-blue': pn.encadrement === 'oui', 'bg-red': pn.encadrement === 'non'}">
                {{ pn.encadrement }}
              </span>
            </td>
            <td>
              <span :class="{'bg-blue': pn.instructeur === 'oui', 'bg-red': pn.instructeur === 'non'}">
                {{ pn.instructeur }}
              </span>
            </td>
            <td>{{ formatDate(pn.date_sortie) }}</td>

            <td>{{ pn.lib_base }}</td>
<td>{{ pn.lib_contrat }}</td>
<td>{{ pn.lib_grade }}</td>

            <td>{{ pn.lib_qualification }}</td>
            <td>{{ pn.groupe_socioprofessionnel }}</td>

           
         <td>
          <div class="icon-buttons-container">
  <button @click="editPN(pn)" class="icon-button" title="Modifier">
    <LucidePencil class="icon" />
  </button>
  <button @click="deletePN(pn.matricule_pn)" class="icon-button delete" title="Supprimer">
    <LucideTrash2 class="icon" />
  </button>
</div>
</td>


          </tr>
        </tbody>
      </table>
   <!-- ✅ MODAL FLOTTANT MODERNE -->
<Teleport to="body">
  <Transition name="fade">
    <div v-if="showModal" class="custom-modal-overlay" @click.self="fermerModal">
      <div class="custom-modal">
        <h5 class="modal-title">Modifier le vol</h5>
        <button @click="closeModal" class="close-btn">X</button>


        <form @submit.prevent="submitPN">
      <div class="form-group">
        <label>Matricule</label>
        <input type="number" v-model="form.matricule_pn" required />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Nom</label>
          <input type="text" v-model="form.nom" required />
        </div>
        <div class="form-group">
          <label>Prénom</label>
          <input type="text" v-model="form.prenom" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Encadrement</label>
          <div class="radio-group">
            <label><input type="radio" value="oui" v-model="form.encadrement" /> Oui</label>
            <label><input type="radio" value="non" v-model="form.encadrement" /> Non</label>
          </div>
        </div>
        <div class="form-group">
          <label>Instructeur</label>
          <div class="radio-group">
            <label><input type="radio" value="oui" v-model="form.instructeur" /> Oui</label>
            <label><input type="radio" value="non" v-model="form.instructeur" /> Non</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Date de sortie</label>
        <input type="date" v-model="form.date_sortie" />
      </div>
<div>
  <div>
  <label for="base">Base :</label>
  <select id="base" v-model="form.code_base">
    <option v-for="base in bases" :key="base.code_base" :value="base.code_base">
      {{ base.lib_base }}
    </option>
  </select>
</div>

<div>
  <label for="contrat">Contrat :</label>
  <select id="contrat" v-model="form.code_contrat">
    <option v-for="contrat in contrats" :key="contrat.code_contrat" :value="contrat.code_contrat">
      {{ contrat.lib_contrat }}
    </option>
  </select>
</div>

<div>
  <label for="grade">Grade :</label>
  <select id="grade" v-model="form.code_grade">
    <option v-for="grade in grades" :key="grade.code_grade" :value="grade.code_grade">
      {{ grade.lib_grade }}
    </option>
  </select>
</div>

        <div class="form-group">
          <label>Qualification</label>
          <input type="text" v-model="form.lib_qualification" />
        </div>
        <div class="form-group">
          <label>groupe_socioprofessionnel</label>
          <div class="radio-group">
            <label><input type="radio" value="Technique" v-model="form.groupe_socioprofessionnel" /> Technique</label>
            <label><input type="radio" value="Commerciale" v-model="form.groupe_socioprofessionnel" /> Commerciale</label>
          </div>

        </div>
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn-primary">{{ editMode ? 'Modifier' : 'Ajouter' }}</button>
        <button type="button" class="btn-secondary" @click="cancelEdit" v-if="editMode">Annuler</button>
      </div>
    </form>
      </div>
    </div>
  </Transition>
</Teleport>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { LucidePencil, LucideTrash2 } from "lucide-vue-next";

export default {
  name: 'PnManager',
  components: {
    LucidePencil,
    LucideTrash2,
  },

  data() {
    return {
      pnList: [],
      searchTerm: '',
      filteredPN: [],
      bases: [],
      contrats: [],
      grades: [],
      selectedGrade: '',
      currentPage: 1, // Ajout de currentPage
      form: {
        matricule_pn: '',
        nom: '',
        prenom: '',
        encadrement: '',
        instructeur: '',
        date_sortie: '',
        lib_base: '',
        lib_contrat: '',
        lib_grade: '',
        lib_qualification: '',
        groupe_socioprofessionnel: ''
      },
      editMode: false,
      originalMatricule: null,
      showModal: false
    };
  },

  created() {
    this.fetchPN();
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const basesResponse = await fetch("http://localhost:5000/api/pn/bases");
        this.bases = await basesResponse.json();
        console.log("📡 Bases reçues :", this.bases);

        const contratsResponse = await fetch("http://localhost:5000/api/pn/contrats");
        this.contrats = await contratsResponse.json();
        console.log("📡 Contrats reçus :", this.contrats);

        const gradesResponse = await fetch("http://localhost:5000/api/pn/grades");
        this.grades = await gradesResponse.json();
        console.log("📡 Grades reçus :", this.grades);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
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
    fetchPN() {
      axios.get('http://localhost:8080/api/pn')
        .then(response => {
          console.log("📡 Appel API :", response.data);
          this.pnList = response.data;
          this.filteredPN = this.pnList;
        })
        .catch(error => {
          console.error("Erreur API :", error);
        });
    },

    searchPN() {
      if (this.searchTerm.trim() === '') {
        this.filteredPN = this.pnList;
      } else {
        const term = this.searchTerm.toLowerCase();
        this.filteredPN = this.pnList.filter(pn =>
          String(pn.matricule_pn).toLowerCase().includes(term) ||
          (pn.nom && pn.nom.toLowerCase().includes(term)) ||
          (pn.prenom && pn.prenom.toLowerCase().includes(term))
        );
      }
    },

    openAddModal() {
      console.log("Ouverture du modal pour ajouter");
      this.showModal = true;
      this.editMode = false;
      this.resetForm();
    },

    closeModal() {
      console.log("🔴 Fermeture du modal");
      this.showModal = false;
      this.editMode = false;
      this.resetForm();
    },

    submitPN() {
      if (this.editMode) {
        axios.put(`http://localhost:8080/api/pn/${this.originalMatricule}`, this.form)
          .then(response => {
            alert(response.data.message);
            this.closeModal();
            this.fetchPN();
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        axios.post('http://localhost:8080/api/pn', this.form)
          .then(response => {
            alert(response.data.message);
            this.closeModal();
            this.fetchPN();
          })
          .catch(error => {
            console.error(error);
          });
      }
    },

    editPN(pn) {
  this.editMode = true;
  this.originalMatricule = pn.matricule_pn;

  const date = pn.date_sortie ? new Date(pn.date_sortie) : null;

  this.form = {
    ...pn,
    date_sortie: date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      : ''
  };

  this.showModal = true;
},

    cancelEdit() {
      this.closeModal();
    },

    resetForm() {
      this.form = {
        matricule_pn: '',
        nom: '',
        prenom: '',
        encadrement: '',
        instructeur: '',
        date_sortie: '',
        code_base: '',
        code_contrat: '',
        code_grade: '',
        lib_qualification: '',
        groupe_socioprofessionnel: ''
      };
    },

    deletePN(matricule) {
      if (confirm("Voulez-vous vraiment supprimer ce PN ?")) {
        axios.delete(`http://localhost:8080/api/pn/${matricule}`)
          .then(response => {
            alert(response.data.message);
            this.fetchPN();
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
};
</script>


<style scoped>

/* Animation pour l'apparition/disparition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Fond semi-transparent */
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Contenu du modal */
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 450px;
  position: relative;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.3s ease-out;
}

/* Animation d'ouverture */
@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Bouton fermer */
.close {
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #555;
}

/* Boutons */
.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}


h2 {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

/* Style des champs */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #444;
}

.form-group input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

/* Disposition en ligne */
.form-row {
  display: flex;
  gap: 10px;
}

.form-row .form-group {
  flex: 1;
}

/* Style des boutons radio */
.radio-group {
  display: flex;
  gap: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Boutons */
.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-secondary {
  background: #ccc;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary:hover {
  background: #999;
}

h1 {
  font-size: 26px;
  color: #d9232d;
  margin-bottom: 20px;
  font-weight: bold;
}





.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.styled-table th, .styled-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.styled-table th {
  background-color: #d9232d;
  color: white;
  font-size: 16px;
}

.status {
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
  text-transform: capitalize;
}

.encadrement.yes {
  background-color: #28a745;
  color: white;
}

.encadrement.no {
  background-color: #dc3545;
  color: white;
}

.instructeur.yes {
  background-color: #007bff;
  color: white;
}

.instructeur.no {
  background-color: #ffc107;
  color: black;
}

.btn-edit {
  background-color: #007bff;
  color: white;
  margin-right: 5px;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
.bg-blue {
    color: blue;
    background-color: rgba(0, 0, 255, 0.2); /* Bleu transparent */
    border-radius: 15px;
    padding: 7px 11px;
    font-weight: bold;
  }
  
  .bg-red {
    color: red;
    background-color: rgba(255, 0, 0, 0.2); /* Rouge transparent */
    border-radius: 15px;
    padding: 7px 9px;
  font-weight: bold;
  }
 
/* Container principal */
.containere {
  padding: 20px;
  max-width: 1300px;
  margin: auto;
  text-align: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: visible; /* Permet au tableau de dépasser sans scrollbar */
  width: 100%; /* Assure que le conteneur prend toute la largeur */
}

/* Header avec le logo et le titre */
.header-container {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  margin-bottom: 20px;
}

.logo-container img {
  max-width: 150px;
}
table {
    min-width: max-content; /* Permet au tableau d'occuper toute la largeur dont il a besoin */
    white-space: nowrap; /* Empêche le retour à la ligne du texte */
}





/* Barre de recherche à gauche et bouton à droite */
.action-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  max-width: 400px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.btn-primary {
  background-color: #d9232d;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}



.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.styled-table th, .styled-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.styled-table th {
  background-color: #d9232d;
  color: white;
  font-size: 16px;
}

/* Boutons */
.btn:hover {
  opacity: 0.8;
}
.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
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

  
</style>