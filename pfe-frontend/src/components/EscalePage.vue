<template>
  <div class="escales-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Escales</h1>
    </div>

    <!-- Add Escale Button -->
    <div class="top-controls">
      <div></div>
      <button class="add-escale-btn" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Escale</span>
</button>

    </div>

    <!-- Form -->
    <div v-if="showForm" class="escale-form">
      <input v-model="newEscale.lib_escale" placeholder="Libellé de l’escale" />
      <button class="submit-btn" @click="addEscale">Ajouter</button>
    </div>

    <!-- Table -->
    <h2>Liste des Escales</h2>
    <table class="escale-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="escale in escales" :key="escale.code_escale">
          <td>{{ escale.code_escale }}</td>
          <td>
            <input
              :readonly="editingEscale !== escale.code_escale"
              v-model="escale.lib_escale"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(escale.code_escale)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteEscale(escale.code_escale)"
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
import modifyIcon from '@/assets/icons/icons8-modify-50.png';
import deleteIcon from '@/assets/icons/icons8-delete-30.png';

const API_URL = 'http://localhost:5000/api/escales';

export default {
  data() {
    return {
      escales: [],
      newEscale: { lib_escale: '' },
      showForm: false,
      editingEscale: null,
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
    async fetchEscales() {
      try {
        const response = await axios.get(API_URL);
        this.escales = response.data;
      } catch (error) {
        console.error('Erreur de récupération des escales:', error);
      }
    },
    async addEscale() {
      try {
        await axios.post(API_URL, this.newEscale);
        this.newEscale.lib_escale = '';
        this.fetchEscales();
      } catch (error) {
        console.error("Erreur d'ajout d’escale:", error);
      }
    },
    async updateEscale(escale) {
      try {
        await axios.put(`${API_URL}/${escale.code_escale}`, {
          lib_escale: escale.lib_escale,
        });
        this.editingEscale = null;
        this.fetchEscales();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteEscale(code) {
      try {
        await axios.delete(`${API_URL}/${code}`);
        this.fetchEscales();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingEscale === code) {
        const escale = this.escales.find((e) => e.code_escale === code);
        this.updateEscale(escale);
      } else {
        this.editingEscale = code;
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
  },
  mounted() {
    this.fetchEscales();
  },
};
</script>

<style scoped>
.escales-container {
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
}

.add-escale-btn {
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

.add-escale-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-escale-btn:active {
  transform: scale(0.96);
}

.escale-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  animation: slideDown 0.4s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.escale-form input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
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

.escale-table {
  width: 100%;
  border-collapse: collapse;
}

.escale-table thead {
  background-color: #b22222;
  color: white;
}

.escale-table th,
.escale-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.escale-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.escale-table tbody tr:hover {
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
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}
</style>
