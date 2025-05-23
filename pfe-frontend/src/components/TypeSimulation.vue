<template>
  <div class="typesimulations-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Types de Simulation</h1>
    </div>

    <!-- Add Type Form -->
    <div class="top-controls">
      <div></div>
      <button class="add-user-btn-clean" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Type de simulation</span>
</button>

    </div>

    <div v-if="showForm" class="user-form">
      <input v-model="newType.lib_typesimulation" placeholder="Nouveau type" />
      <div class="form-buttons">
        <button @click="addTypesimulation" class="submit-btn">Ajouter</button>
      </div>
    </div>

    <!-- Types Simulation Table -->
    <h2>Liste des Types de Simulation</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in typesimulations" :key="type.code_typesimulation">
          <td>{{ type.code_typesimulation }}</td>
          <td>
            <input
              :readonly="editingType !== type.code_typesimulation"
              v-model="type.lib_typesimulation"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(type.code_typesimulation)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteTypesimulation(type.code_typesimulation)"
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

const API_URL = 'http://localhost:5000/api/typesimulations';

export default {
  data() {
    return {
      typesimulations: [],
      newType: { lib_typesimulation: '' },
      showForm: false,
      editingType: null,
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
    async fetchTypesimulations() {
      try {
        const res = await axios.get(API_URL);
        this.typesimulations = res.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des types de simulation', error);
      }
    },
    async addTypesimulation() {
      try {
        await axios.post(API_URL, this.newType);
        this.newType.lib_typesimulation = '';
        this.fetchTypesimulations();
      } catch (error) {
        console.error('Erreur d\'ajout:', error);
      }
    },
    async updateTypesimulation(type) {
      try {
        await axios.put(`${API_URL}/${type.code_typesimulation}`, {
          lib_typesimulation: type.lib_typesimulation,
        });
        this.editingType = null;
        this.fetchTypesimulations();
      } catch (error) {
        console.error('Erreur de mise à jour:', error);
      }
    },
    async deleteTypesimulation(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.fetchTypesimulations();
      } catch (error) {
        console.error('Erreur de suppression:', error);
      }
    },
    toggleEdit(code) {
      if (this.editingType === code) {
        const type = this.typesimulations.find((t) => t.code_typesimulation === code);
        this.updateTypesimulation(type);
      } else {
        this.editingType = code;
      }
    },
  },
  mounted() {
    this.fetchTypesimulations();
  },
};
</script>

<style scoped>
.typesimulations-container {
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

/* Modern Add Button */
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Form Style with SlideDown Animation */
.user-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
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

.submit-btn {
  background-color: #b22222;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

/* Table Styles */
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

/* Row Hover Animation */
.user-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.user-table tbody tr:hover {
  background-color: #f2f2f2;
  transform: translateX(2px);
}

/* Editable Input */
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

/* Icon Buttons */
.icon-btn {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}
</style>
