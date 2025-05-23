<template>
  <div class="simulateurs">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Simulateurs</h1>
    </div>

    <!-- Top Controls -->
    <div class="top-controls">
      <div></div>
      <button class="add-user-btn-clean" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Simulateur</span>
</button>

    </div>

    <!-- Add Form -->
    <div v-if="showForm" class="simulateur-form">
      <input v-model="newSim.lib_simulateur" placeholder="Libellé" />
      <button @click="addSimulateur" class="submit-btn">Ajouter</button>
    </div>

    <!-- Simulateur Table -->
    <h2>Liste des simulateurs</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <transition-group name="row" tag="tbody">
        <tr v-for="sim in simulateurs" :key="sim.code_simulateur">
          <td>{{ sim.code_simulateur }}</td>
          <td>
            <input
              :readonly="editingSim !== sim.code_simulateur"
              v-model="sim.lib_simulateur"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(sim.code_simulateur)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteSimulateur(sim.code_simulateur)"
              title="Supprimer"
            />
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import modifyIcon from '../assets/icons/icons8-modify-50.png';
import deleteIcon from '../assets/icons/icons8-delete-30.png';

const API_URL = 'http://localhost:5000/api/simulateurs';

export default {
  data() {
    return {
      simulateurs: [],
      newSim: { lib_simulateur: '' },
      showForm: false,
      editingSim: null,
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

    async fetchSimulateurs() {
      try {
        const res = await axios.get(API_URL);
        this.simulateurs = res.data;
      } catch (error) {
        console.error("Erreur de récupération des simulateurs:", error);
      }
    },
    async addSimulateur() {
      try {
        await axios.post(API_URL, this.newSim);
        this.newSim.lib_simulateur = '';
        this.fetchSimulateurs();
      } catch (error) {
        console.error("Erreur d'ajout:", error);
      }
    },
    async updateSimulateur(sim) {
      try {
        await axios.put(`${API_URL}/${sim.code_simulateur}`, {
          lib_simulateur: sim.lib_simulateur,
        });
        this.editingSim = null;
        this.fetchSimulateurs();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteSimulateur(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.fetchSimulateurs();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingSim === code) {
        const sim = this.simulateurs.find((s) => s.code_simulateur === code);
        this.updateSimulateur(sim);
      } else {
        this.editingSim = code;
      }
    },
  },
  mounted() {
    this.fetchSimulateurs();
  },
};
</script>

<style scoped>
.simulateurs {
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

.simulateur-form {
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

.simulateur-form input {
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

/* Table */
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

/* Transition group animation */
.row-enter-active, .row-leave-active {
  transition: all 0.4s ease;
}
.row-enter-from, .row-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.row-enter-to, .row-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Input */
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

/* Icon buttons */
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
