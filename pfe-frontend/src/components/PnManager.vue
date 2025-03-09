<template>
  <div class="container">
    <!-- Espace pour le logo -->
    <div class="logo-container">
      <img :src="require('@/assets/airalgerie.jpg')">

    </div>

    <!-- Titre principal -->
    <h1>Gestion des Personnel Navigants</h1>

    <!-- Bouton Ajouter avec icône -->
    <button @click="openAddModal" class="icon-button">
      <i class="fas fa-plus"></i> Ajouter
    </button>

    <!-- Recherche -->
    <input
      v-model="searchTerm"
      @input="searchPN"
      placeholder="Recherche PN par matricule, nom ou prénom..."
    />

    <!-- Tableau des PN -->
    <table>
      <thead>
        <tr>
          <th>Matricule</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Encadrement</th>
          <th>Instructeur</th>
          <th>Date de sortie</th>
          <th>Code Base</th>
          <th>Code Contrat</th>
          <th>Code Grade</th>
          <th>Qualification</th>
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


          <td>{{ pn.date_sortie }}</td>
          <td>{{ pn.code_base }}</td>
          <td>{{ pn.code_contrat }}</td>
          <td>{{ pn.code_grade }}</td>
          <td>{{ pn.lib_qualification }}</td>
          <td>
            <button @click="editPN(pn)" class="icon-button">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="deletePN(pn.matricule_pn)" class="icon-button">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale pour ajouter/modifier un PN -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 v-if="editMode">Modifier PN</h2>
        <h2 v-else>Ajouter PN</h2>
        <form @submit.prevent="submitPN">
          <input type="number" v-model="form.matricule_pn" placeholder="Matricule" required />
          <input type="text" v-model="form.nom" placeholder="Nom" required />
          <input type="text" v-model="form.prenom" placeholder="Prénom" required />

          <!-- Choix pour Encadrement avec boutons radio -->
          <div>
            <label>Encadrement :</label>
            <input
              type="radio"
              id="encadrementOui"
              value="oui"
              v-model="form.encadrement"
            />
            <label for="encadrementOui">Oui</label>
            <input
              type="radio"
              id="encadrementNon"
              value="non"
              v-model="form.encadrement"
            />
            <label for="encadrementNon">Non</label>
          </div>

          <!-- Choix pour Instructeur avec boutons radio -->
          <div>
            <label>Instructeur :</label>
            <input
              type="radio"
              id="instructeurOui"
              value="oui"
              v-model="form.instructeur"
            />
            <label for="instructeurOui">Oui</label>
            <input
              type="radio"
              id="instructeurNon"
              value="non"
              v-model="form.instructeur"
            />
            <label for="instructeurNon">Non</label>
          </div>
          <input type="date" v-model="form.date_sortie" placeholder="Date de sortie" />
          <input type="number" v-model="form.code_base" placeholder="Code Base" />
          <input type="number" v-model="form.code_contrat" placeholder="Code Contrat" />
          <input type="number" v-model="form.code_grade" placeholder="Code Grade" />
          <input type="text" v-model="form.lib_qualification" placeholder="Qualification" />
          <button type="submit">{{ editMode ? 'Modifier' : 'Ajouter' }}</button>
          <button type="button" @click="cancelEdit" v-if="editMode">Annuler</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PnManager',
  data() {
    return {
      pnList: [],
      searchTerm: '',
      filteredPN: [],
      form: {
        matricule_pn: '',
        nom: '',
        prenom: '',
        encadrement: '',
        instructeur: '',
        date_sortie: '',
        code_base: '',
        code_contrat: '',
        code_grade: '',
        lib_qualification: ''
      },
      editMode: false,
      originalMatricule: null,
      showModal: false
    };
  },
  created() {
    this.fetchPN();
  },
  methods: {
    fetchPN() {
      axios.get('http://localhost:5000/api/pn')
        .then(response => {
          this.pnList = response.data;
          this.filteredPN = this.pnList;
        })
        .catch(error => {
          console.error(error);
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
      this.showModal = true;
      this.editMode = false;
      this.resetForm();
    },
    closeModal() {
      this.showModal = false;
      this.editMode = false;
      this.resetForm();
    },
    submitPN() {
      if (this.editMode) {
        axios.put(`http://localhost:5000/api/pn/${this.originalMatricule}`, this.form)
          .then(response => {
            alert(response.data.message);
            this.closeModal();
            this.fetchPN();
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        axios.post('http://localhost:5000/api/pn', this.form)
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
      this.form = { ...pn };
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
        lib_qualification: ''
      };
    },
    deletePN(matricule) {
      if (confirm("Voulez-vous vraiment supprimer ce PN ?")) {
        axios.delete(`http://localhost:5000/api/pn/${matricule}`)
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
/* Conteneur principal avec espacement */
.container {
  margin: 0px; /* Espace autour de la page */
  padding: 10px; /* Espace à l'intérieur du conteneur */
}

/* Espace pour le logo */
.logo-container {
  margin-bottom: 5px;
 /* Espace sous le logo */
}
img {
  max-width: 15%; /* L'image ne dépasse pas la largeur de son conteneur */
  height: auto; /* Hauteur ajustée automatiquement */
}


/* Styles de base, à adapter selon ton design */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  border: 1px solid black;
  padding: 4px;
}
th {
  background-color: #f4f4f4;
  text-align: left;
}
input {
  margin: 5px;
  padding: 5px;
}
button {
  margin: 5px;
  padding: 5px 10px;
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


/* Styles pour les boutons avec icônes */
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  font-size: 16px;
}
.icon-button i {
  margin-right: 5px;
}

/* Styles pour la modale */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
  max-width: 500px;
  position: relative;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 24px;
}
</style>