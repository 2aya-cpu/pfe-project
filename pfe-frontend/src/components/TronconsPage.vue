<template>
  <div class="troncons-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Tronçons</h1>
    </div>

    <!-- Add Tronçon Button -->
    <div class="top-controls">
      <div></div>
       <button class="add-troncon-btn" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter Tronçon</span>
</button>

    </div>

    <!-- Add Tronçon Form with Transition -->
    <transition name="slide-fade">
      <div v-if="showForm" class="troncon-form">
        <input v-model="newTroncon.lib_troncon" placeholder="Nom du tronçon" />
        <select v-model="newTroncon.code_escale_depart">
          <option value="">Sélectionner l'escale départ</option>
          <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
            {{ escale.lib_escale }}
          </option>
        </select>
        <select v-model="newTroncon.code_escale_arrivee">
          <option value="">Sélectionner l'escale arrivée</option>
          <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
            {{ escale.lib_escale }}
          </option>
        </select>
        <button @click="addTroncon" class="submit-btn">Ajouter</button>
      </div>
    </transition>

    <!-- Tronçon Table -->
    <h2>Liste des Tronçons</h2>
    <table class="troncon-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Libellé</th>
          <th>Escale Départ</th>
          <th>Escale Arrivée</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="troncon in troncons" :key="troncon.code_troncon">
          <td>{{ troncon.code_troncon }}</td>
          <td><input v-model="troncon.lib_troncon" class="editable-input" /></td>
          <td>
            <select v-model="troncon.code_escale_depart">
              <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
                {{ escale.lib_escale }}
              </option>
            </select>
          </td>
          <td>
            <select v-model="troncon.code_escale_arrivee">
              <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
                {{ escale.lib_escale }}
              </option>
            </select>
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="updateTroncon(troncon)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteTroncon(troncon.code_troncon)"
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

const API_URL = 'http://localhost:5000/api/troncons';
const ESCAL_URL = 'http://localhost:5000/api/escales';

export default {
  data() {
    return {
      troncons: [],
      escales: [],
      newTroncon: {
        lib_troncon: '',
        code_escale_depart: '',
        code_escale_arrivee: '',
      },
      showForm: false,
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
    async fetchTroncons() {
      try {
        const res = await axios.get(API_URL);
        this.troncons = res.data;
      } catch (error) {
        console.error('Erreur de récupération des tronçons:', error);
      }
    },
    async fetchEscales() {
      try {
        const res = await axios.get(ESCAL_URL);
        this.escales = res.data;
      } catch (error) {
        console.error('Erreur de récupération des escales:', error);
      }
    },
    async addTroncon() {
      try {
        await axios.post(API_URL, this.newTroncon);
        this.newTroncon = { lib_troncon: '', code_escale_depart: '', code_escale_arrivee: '' };
        this.fetchTroncons();
      } catch (error) {
        console.error('Erreur d\'ajout de tronçon:', error);
      }
    },
    async updateTroncon(troncon) {
      try {
        await axios.put(`${API_URL}/${troncon.code_troncon}`, {
          lib_troncon: troncon.lib_troncon,
          code_escale_depart: troncon.code_escale_depart,
          code_escale_arrivee: troncon.code_escale_arrivee,
        });
        this.fetchTroncons();
      } catch (error) {
        console.error('Erreur de mise à jour du tronçon:', error);
      }
    },
    async deleteTroncon(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.fetchTroncons();
      } catch (error) {
        console.error('Erreur de suppression du tronçon:', error);
      }
    },
  },
  mounted() {
    this.fetchTroncons();
    this.fetchEscales();
  },
};
</script>

<style scoped>
.troncons-container {
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

.add-troncon-btn {
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

.add-troncon-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-troncon-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.troncon-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: slideDown 0.4s ease;
}

.troncon-form select,
.troncon-form input {
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

.troncon-table {
  width: 100%;
  border-collapse: collapse;
}

.troncon-table thead {
  background-color: #b22222;
  color: white;
}

.troncon-table th,
.troncon-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.troncon-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.troncon-table tbody tr:hover {
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

/* Slide Down Animation */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transition for form appear/disappear */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
