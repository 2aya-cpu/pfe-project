
<template>
    <div class="container mt-5">
      <h2>Gestion des Rôles</h2>
  
      <!-- 🔵 Formulaire -->
      <form @submit.prevent="submitForm" class="mb-4">
        <div class="mb-3">
          <label for="description" class="form-label">Description du rôle</label>
          <input
            type="text"
            id="description"
            v-model="form.description"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary me-2">
          {{ isEdit ? 'Modifier' : 'Ajouter' }}
        </button>
        <button v-if="isEdit" @click="cancelEdit" type="button" class="btn btn-secondary">
          Annuler
        </button>
      </form>
  
      <!-- 🔶 Tableau -->
      <table class="table table-bordered">
        <thead class="table-light">
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
              <button class="btn btn-sm btn-warning me-2" @click="editRole(role)">Modifier</button>
              <button class="btn btn-sm btn-danger" @click="deleteRole(role.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RolesPage',
    data() {
      return {
        roles: [],
        form: {
          description: ''
        },
        isEdit: false,
        editId: null
      };
    },
    methods: {
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
      }
    },
    mounted() {
      this.fetchRoles();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 700px;
  }
  </style>
  