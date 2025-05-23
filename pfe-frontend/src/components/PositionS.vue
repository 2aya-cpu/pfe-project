<template>
  <div class="positions-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Positions</h1>
    </div>

    <!-- Top Controls -->
    <div class="top-controls">
      <div></div>
      <button class="add-role-btn" @click="toggleForm">
        <span v-if="showForm">Annuler</span>
        <span v-else>+ Ajouter Position</span>
      </button>
    </div>

    <!-- Form -->
    <div v-if="showForm" class="role-form">
      <div class="form-group">
        <label for="position" class="form-label">Nom de la Position</label>
        <input
          id="position"
          v-model="form.lib_position"
          placeholder="Entrez le nom de la position"
          required
          class="form-control"
        />
      </div>
      <div class="form-buttons">
        <button @click="submitForm" class="submit-btn">
          {{ isEdit ? 'Modifier' : 'Ajouter' }}
        </button>
        <button v-if="isEdit" @click="cancelEdit" class="cancel-btn">
          Annuler
        </button>
      </div>
    </div>

    <!-- Positions Table -->
    <h2>Liste des Positions</h2>
    <table class="role-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="position in positions" :key="position.code_position">
          <td>{{ position.code_position }}</td>
          <td>{{ position.lib_position }}</td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="editPosition(position)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deletePosition(position.code_position)"
              title="Supprimer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import modifyIcon from '../assets/icons/icons8-modify-50.png';
import deleteIcon from '../assets/icons/icons8-delete-30.png';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/positions';

export default {
  name: 'PositionsPage',
  data() {
    return {
      positions: [],
      form: { lib_position: '' },
      isEdit: false,
      editId: null,
      showForm: false,
      modifyIcon,
      deleteIcon,
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },
    async fetchPositions() {
      try {
        const res = await axios.get(API_URL);
        this.positions = res.data;
      } catch (err) {
        console.error('Erreur lors du chargement des positions :', err);
      }
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await axios.put(`${API_URL}/${this.editId}`, this.form);
        } else {
          const response = await axios.post(API_URL, this.form);
          this.positions.push({ code_position: response.data.id, lib_position: this.form.lib_position });
        }
        this.fetchPositions();
        this.resetForm();
      } catch (err) {
        console.error('Erreur lors de la soumission :', err);
      }
    },
    editPosition(position) {
      this.form.lib_position = position.lib_position;
      this.isEdit = true;
      this.editId = position.code_position;
      this.showForm = true;
    },
    async deletePosition(id) {
      if (confirm('Voulez-vous vraiment supprimer cette position ?')) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          this.fetchPositions();
        } catch (err) {
          console.error('Erreur lors de la suppression :', err);
        }
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form.lib_position = '';
      this.isEdit = false;
      this.editId = null;
      this.showForm = false;
    }
  },
  mounted() {
    this.fetchPositions();
  }
};
</script>

<style scoped>
/* Copy your RolesPage style */
.positions-page {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

/* Header */
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

/* Top Controls (Button Row) */
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Add Button */
.add-role-btn {
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

.add-role-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-role-btn:active {
  transform: scale(0.96);
}

/* Form */
.role-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: slideDown 0.4s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Form Elements */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.role-form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.form-buttons {
  display: flex;
  gap: 1rem;
}

/* Submit / Cancel Buttons */
.submit-btn, .cancel-btn {
  background-color: #b22222;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover, .cancel-btn:hover {
  background-color: #a40000;
}

.submit-btn:active, .cancel-btn:active {
  transform: scale(0.96);
}

/* Table */
.role-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.role-table thead {
  background-color: #b22222;
  color: white;
}

.role-table th,
.role-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Row Hover */
.role-table tbody tr:hover {
  background-color: #f2f2f2;
  transform: translateX(2px);
}

/* Modify/Delete Icons */
.icon-btn {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: transform 0.2s ease, filter 0.2s ease;
  object-fit: contain;
}

.icon-btn:hover {
  transform: scale(1.2);
  filter: brightness(1.2);
}
</style>
