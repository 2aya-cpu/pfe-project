<template>
  <div class="reseaux-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Réseaux</h1>
    </div>

    <!-- Add Network Form -->
    <div class="top-controls">
      <div></div>
      <button class="add-reseau-btn" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Réseau</span>
</button>

    </div>

    <div v-if="showForm" class="reseau-form">
      <input v-model="newReseau.lib_reseau" placeholder="Libellé du réseau" />
      <button @click="addReseau" class="submit-btn">Ajouter</button>
    </div>

    <!-- Network Table -->
    <h2>Liste des Réseaux</h2>
    <table class="reseau-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reseau in reseaux" :key="reseau.code_reseau">
          <td>{{ reseau.code_reseau }}</td>
          <td>
            <input
              :readonly="editingReseau !== reseau.code_reseau"
              v-model="reseau.lib_reseau"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(reseau.code_reseau)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteReseau(reseau.code_reseau)"
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

const API_URL = 'http://localhost:5000/api/reseaux';

export default {
  data() {
    return {
      reseaux: [],
      newReseau: { lib_reseau: '' },
      showForm: false,
      editingReseau: null,
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
    async fetchReseaux() {
      try {
        const res = await axios.get(API_URL);
        this.reseaux = res.data;
      } catch (error) {
        console.error("Erreur de récupération des réseaux:", error);
      }
    },
    async addReseau() {
      try {
        await axios.post(API_URL, this.newReseau);
        this.newReseau.lib_reseau = '';
        this.fetchReseaux();
      } catch (error) {
        console.error("Erreur d'ajout:", error);
      }
    },
    async updateReseau(reseau) {
      try {
        await axios.put(`${API_URL}/${reseau.code_reseau}`, {
          lib_reseau: reseau.lib_reseau,
        });
        this.editingReseau = null;
        this.fetchReseaux();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteReseau(code) {
      try {
        await axios.delete(`${API_URL}/${code}`);
        this.fetchReseaux();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingReseau === code) {
        const reseau = this.reseaux.find((r) => r.code_reseau === code);
        this.updateReseau(reseau);
      } else {
        this.editingReseau = code;
      }
    },
  },
  mounted() {
    this.fetchReseaux();
  },
};
</script>

<style scoped>
.reseaux-container {
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

.add-reseau-btn {
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

.add-reseau-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-reseau-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.reseau-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  animation: slideDown 0.4s ease;
  transition: all 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.reseau-form input {
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
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: darkgreen;
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: scale(0.96);
}

.reseau-table {
  width: 100%;
  border-collapse: collapse;
}

.reseau-table thead {
  background-color: #b22222;
  color: white;
}

.reseau-table th,
.reseau-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.reseau-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.reseau-table tbody tr:hover {
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
