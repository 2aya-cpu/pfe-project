<template>
  <div class="contrat-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Contrats</h1>
    </div>

    <!-- Add Button -->
    <div class="top-controls">
      <div></div>
      <button class="add-contrat-btn" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Contrat</span>
</button>

    </div>

    <!-- Add Form -->
    <div v-if="showForm" class="contrat-form">
      <input v-model="newContrat.lib_contrat" placeholder="Libellé" />
      <button @click="addContrat" class="submit-btn">Ajouter</button>
    </div>

    <!-- Contrat Table -->
    <h2>Liste des contrats</h2>
    <table class="contrat-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contrat in contrats" :key="contrat.code_contrat">
          <td>{{ contrat.code_contrat }}</td>
          <td>
            <input
              :readonly="editingContrat !== contrat.code_contrat"
              v-model="contrat.lib_contrat"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(contrat.code_contrat)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteContrat(contrat.code_contrat)"
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

const API_URL = 'http://localhost:5000/api/contrats';

export default {
  data() {
    return {
      contrats: [],
      newContrat: { lib_contrat: '' },
      showForm: false,
      editingContrat: null,
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
    async fetchContrats() {
      try {
        const res = await axios.get(API_URL);
        this.contrats = res.data;
      } catch (error) {
        console.error("Erreur de récupération des contrats:", error);
      }
    },
    async addContrat() {
      try {
        await axios.post(API_URL, this.newContrat);
        this.newContrat.lib_contrat = '';
        this.fetchContrats();
      } catch (error) {
        console.error("Erreur d'ajout:", error);
      }
    },
    async updateContrat(contrat) {
      try {
        await axios.put(`${API_URL}/${contrat.code_contrat}`, {
          lib_contrat: contrat.lib_contrat,
        });
        this.editingContrat = null;
        this.fetchContrats();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteContrat(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.fetchContrats();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingContrat === code) {
        const contrat = this.contrats.find((c) => c.code_contrat === code);
        this.updateContrat(contrat);
      } else {
        this.editingContrat = code;
      }
    },
  },
  mounted() {
    this.fetchContrats();
  },
};
</script>

<style scoped>
.contrat-container {
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

.add-contrat-btn {
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

.add-contrat-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-contrat-btn:active {
  transform: scale(0.96);
}

.contrat-form {
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

.contrat-form input {
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

.contrat-table {
  width: 100%;
  border-collapse: collapse;
}

.contrat-table thead {
  background-color: #b22222;
  color: white;
}

.contrat-table th,
.contrat-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.contrat-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.contrat-table tbody tr:hover {
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
