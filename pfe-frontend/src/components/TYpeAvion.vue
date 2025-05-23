<template>
  <div class="type-avion">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Types d'Avion</h1>
    </div>

    <!-- Add Button -->
    <div class="top-controls">
      <div></div>
      <button class="add-type-btn" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Type d'avion</span>
</button>

    </div>

    <!-- Add Form -->
    <div v-if="showForm" class="type-form">
      <input v-model="newType.lib_typeavion" placeholder="Libellé type avion" />
      <button @click="addTypeAvion" class="submit-btn">Ajouter</button>
    </div>

    <!-- Type Avion Table -->
    <h2>Liste des Types d'Avion</h2>
    <table class="type-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in typeAvions" :key="type.code_typeavion">
          <td>{{ type.code_typeavion }}</td>
          <td>
            <input
              :readonly="editingType !== type.code_typeavion"
              v-model="type.lib_typeavion"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(type.code_typeavion)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteTypeAvion(type.code_typeavion)"
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

const API_URL = 'http://localhost:5000/api/typeavions';

export default {
  data() {
    return {
      typeAvions: [],
      newType: { lib_typeavion: '' },
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

    async fetchTypeAvions() {
      try {
        const res = await axios.get(API_URL);
        this.typeAvions = res.data;
      } catch (error) {
        console.error("Erreur de récupération des types d'avions:", error);
      }
    },
    async addTypeAvion() {
      try {
        await axios.post(API_URL, this.newType);
        this.newType.lib_typeavion = '';
        this.fetchTypeAvions();
      } catch (error) {
        console.error("Erreur d'ajout:", error);
      }
    },
    async updateTypeAvion(type) {
      try {
        await axios.put(`${API_URL}/${type.code_typeavion}`, {
          lib_typeavion: type.lib_typeavion,
        });
        this.editingType = null;
        this.fetchTypeAvions();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteTypeAvion(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.fetchTypeAvions();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingType === code) {
        const type = this.typeAvions.find((t) => t.code_typeavion === code);
        this.updateTypeAvion(type);
      } else {
        this.editingType = code;
      }
    },
  },
  mounted() {
    this.fetchTypeAvions();
  },
};
</script>

<style scoped>
.type-avion {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

/* Top Controls */
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Add Button */
.add-type-btn {
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

.add-type-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-type-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Add Form */
.type-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: slideDown 0.4s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.type-form input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Submit Button */
.submit-btn {
  background-color: #b22222;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #007700;
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: scale(0.96);
}

/* Table */
.type-table {
  width: 100%;
  border-collapse: collapse;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.type-table thead {
  background-color: #b22222;
  color: white;
}

.type-table th,
.type-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.type-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.type-table tbody tr:hover {
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

/* Icons */
.icon-btn {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}
</style>
