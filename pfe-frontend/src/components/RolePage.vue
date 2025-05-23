<template>
  <div class="roles-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Rôles</h1>
    </div>

    <!-- Add Button -->
    <div class="top-controls">
      <div></div>
      <button class="add-role-btn" @click="toggleForm">
  <span v-if="showForm">Annuler</span>
  <span v-else>+ Ajouter role</span>
</button>


    </div>

    <!-- Form -->
    <div v-if="showForm" class="role-form">
      <div class="form-group">
        <label for="description" class="form-label">Description du rôle</label>
        <input
          id="description"
          v-model="form.description"
          placeholder="Entrez une description pour le rôle"
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

    <!-- Table -->
    <h2>Liste des rôles</h2>
    <table class="role-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.description }}</td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="editRole(role)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteRole(role.id)"
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

export default {
  name: 'RolesPage',
  data() {
    return {
      roles: [],
      form: { description: '' },
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
  if (!this.showForm) {
    this.newPosition = '';
  }
},

    async fetchRoles() {
      try {
        const res = await axios.get('http://localhost:5000/api/roles');
        this.roles = res.data;
      } catch (err) {
        console.error('Erreur lors du chargement des rôles :', err);
      }
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await axios.put(`http://localhost:5000/api/roles/${this.editId}`, this.form);
        } else {
          await axios.post('http://localhost:5000/api/roles', this.form);
        }
        this.fetchRoles();
        this.resetForm();
      } catch (err) {
        console.error('Erreur lors de la soumission :', err);
      }
    },
    editRole(role) {
      this.form.description = role.description;
      this.isEdit = true;
      this.editId = role.id;
      this.showForm = true;
    },
    async deleteRole(id) {
      if (confirm('Voulez-vous vraiment supprimer ce rôle ?')) {
        try {
          await axios.delete(`http://localhost:5000/api/roles/${id}`);
          this.fetchRoles();
        } catch (err) {
          console.error('Erreur lors de la suppression :', err);
        }
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.form.description = '';
      this.isEdit = false;
      this.editId = null;
      this.showForm = false;
    },
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    }
  },
  mounted() {
    this.fetchRoles();
  }
};
</script>

<style scoped>
.roles-page {
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
.submit-btn {
  background-color: #a40000;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #8b0000;
  transform: translateY(-1px);
}

.cancel-btn {
  background-color: #999;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cancel-btn:hover {
  background-color: #777;
  transform: translateY(-1px);
}

/* Table */
.role-table {
  width: 100%;
  border-collapse: collapse;
}

.role-table thead {
  background-color: #b22222;
  color: white;
}

.role-table th,
.role-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.role-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.role-table tbody tr:hover {
  background-color: #f2f2f2;
  transform: translateX(2px);
}

/* Action Icons */
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
