<template>
  <div class="bases-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Liste des Bases</h1>
    </div>

    <!-- Add Base Form -->
    <div class="top-controls">
      <div></div>
      <button class="add-base-btn" @click="showForm = !showForm">
        + Ajouter Base
      </button>
    </div>

    <div v-if="showForm" class="base-form">
      <input v-model="newBase.lib_base" placeholder="Nom de la base" />
      <button @click="addBase" class="submit-btn">Ajouter</button>
    </div>

    <!-- Base Table -->
    <h2>Liste des Bases</h2>
    <table class="base-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Nom de la Base</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="base in bases" :key="base.code_base">
          <td>{{ base.code_base }}</td>
          <td>
            <input
              :readonly="editingBase !== base.code_base"
              v-model="base.lib_base"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(base.code_base)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteBase(base.code_base)"
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

const API_URL = 'http://localhost:5000/api/bases';

export default {
  data() {
    return {
      bases: [],
      newBase: { lib_base: '' },
      showForm: false,
      editingBase: null,
      modifyIcon,
      deleteIcon,
    };
  },
  methods: {
    async fetchBases() {
      try {
        const res = await axios.get(API_URL);
        this.bases = res.data;
      } catch (error) {
        console.error("Erreur de récupération des bases:", error);
      }
    },
    async addBase() {
      try {
        await axios.post(API_URL, this.newBase);
        this.newBase.lib_base = '';
        this.fetchBases();
      } catch (error) {
        console.error("Erreur d'ajout:", error);
      }
    },
    async updateBase(base) {
      try {
        await axios.put(`${API_URL}/${base.code_base}`, {
          lib_base: base.lib_base,
        });
        this.editingBase = null;
        this.fetchBases();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteBase(code) {
      try {
        await axios.delete(`${API_URL}/${code}`);
        this.fetchBases();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingBase === code) {
        const base = this.bases.find((b) => b.code_base === code);
        this.updateBase(base);
      } else {
        this.editingBase = code;
      }
    },
  },
  mounted() {
    this.fetchBases();
  },
};
</script>

<style scoped>
.bases-container {
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

/* Add Base Button */
.add-base-btn {
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

.add-base-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-base-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Add Base Form */
.base-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: slideDown 0.4s ease;
}

.base-form input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Submit Button */
.submit-btn {
  background-color: green;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: darkgreen;
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: scale(0.96);
}

/* Base Table with Animation */
.base-table {
  width: 100%;
  border-collapse: collapse;
  animation: slideDown 0.4s ease;
}

.base-table thead {
  background-color: #b22222;
  color: white;
}

.base-table th,
.base-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.base-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.base-table tbody tr:hover {
  background-color: #f2f2f2;
  transform: translateX(2px);
}

/* Animation Keyframes */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}
</style>
