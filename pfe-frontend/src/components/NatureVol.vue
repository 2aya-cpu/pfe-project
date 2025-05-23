<template>
  <div class="nature-de-vol">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Natures de Vol</h1>
    </div>

    <!-- Top Controls -->
    <div class="top-controls">
      <div class="search-bar"></div> <!-- Empty div to align correctly -->
      <button class="add-user-btn-clean" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Nature de vol</span>
</button>

    </div>

    <!-- Add Form -->
    <div v-if="showForm" class="user-form">
      <input v-model="newNature.lib_nature" placeholder="Libellé" />
      <div class="form-buttons">
        <button class="add-user-btn-clean" @click="addNatureVol">Ajouter</button>
      </div>
    </div>

    <!-- Table Title -->
    <h2>Liste des natures de vol</h2>

    <!-- Nature Table -->
    <table class="user-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nature in natures" :key="nature.code_nature">
          <td>{{ nature.code_nature }}</td>
          <td>
            <input
              class="editable-input"
              v-model="nature.lib_nature"
              :readonly="editingNature !== nature.code_nature"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(nature.code_nature)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteNatureVol(nature.code_nature)"
              title="Supprimer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import modifyIcon from '../assets/icons/icons8-modify-50.png';
import deleteIcon from '../assets/icons/icons8-delete-30.png';

const API_URL = 'http://localhost:5000/api/natures_vols';

export default {
  data() {
    return {
      natures: [],
      newNature: { lib_nature: '' },
      showForm: false,
      editingNature: null,
      modifyIcon,
      deleteIcon,
    };
  },
  methods: {
    toggleForm() {
  this.showForm = !this.showForm;
  if (!this.showForm) {
    this.newPosition = '';
  }
},

    async fetchNatures() {
      try {
        const res = await axios.get(API_URL);
        this.natures = res.data;
      } catch (error) {
        console.error("Erreur de récupération:", error);
      }
    },
    async addNatureVol() {
      try {
        await axios.post(API_URL, this.newNature);
        this.newNature.lib_nature = '';
        this.fetchNatures();
      } catch (error) {
        console.error("Erreur d'ajout:", error);
      }
    },
    async updateNatureVol(nature) {
      try {
        await axios.put(`${API_URL}/${nature.code_nature}`, {
          lib_nature: nature.lib_nature,
        });
        this.editingNature = null;
        this.fetchNatures();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteNatureVol(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.fetchNatures();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingNature === code) {
        const nature = this.natures.find((n) => n.code_nature === code);
        this.updateNatureVol(nature);
      } else {
        this.editingNature = code;
      }
    },
  },
  mounted() {
    this.fetchNatures();
  },
};
</script>

<style scoped>
.nature-de-vol {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-bar {
  flex-grow: 1;
}

.add-user-btn-clean {
  background-color: #b22222;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-user-btn-clean:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-user-btn-clean:active {
  transform: scale(0.96);
}

.user-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  animation: slideDown 0.4s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.user-form input {
  display: block;
  margin: 0.5rem 0;
  padding: 0.4rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table thead {
  background-color: #b22222;
  color: white;
}

.user-table th,
.user-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.user-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.user-table tbody tr:hover {
  background-color: #f2f2f2;
  transform: translateX(2px);
}

.editable-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #333;
  outline: none;
}

.editable-input[readonly] {
  color: #777;
  cursor: default;
}

.icon-btn {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}
</style>
