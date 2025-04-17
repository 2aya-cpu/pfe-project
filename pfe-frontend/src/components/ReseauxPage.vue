
<template>
    <div class="container mt-5">
      <h2>Gestion des Réseaux</h2>
  
      <!-- 🔵 Formulaire -->
      <form @submit.prevent="submitForm" class="mb-4">
        <div class="mb-3">
          <label for="lib_reseau" class="form-label">Libellé du réseau</label>
          <input
            type="text"
            id="lib_reseau"
            v-model="form.lib_reseau"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary me-2">
          {{ isEdit ? 'Modifier' : 'Ajouter' }}
        </button>
        <button v-if="isEdit" type="button" @click="cancelEdit" class="btn btn-secondary">
          Annuler
        </button>
      </form>
  
      <!-- 🔶 Tableau -->
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Code</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reseau in reseaux" :key="reseau.code_reseau">
            <td>{{ reseau.code_reseau }}</td>
            <td>{{ reseau.lib_reseau }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="editReseau(reseau)">Modifier</button>
              <button class="btn btn-danger btn-sm" @click="deleteReseau(reseau.code_reseau)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ReseauxPage',
    data() {
      return {
        reseaux: [],
        form: {
          lib_reseau: ''
        },
        isEdit: false,
        editId: null
      };
    },
    methods: {
      async fetchReseaux() {
        try {
          const res = await axios.get('http://localhost:5000/api/reseaux');
          this.reseaux = res.data;
        } catch (error) {
          console.error('Erreur de chargement des réseaux :', error);
        }
      },
      async submitForm() {
        try {
          if (this.isEdit) {
            await axios.put(`http://localhost:5000/api/reseaux/${this.editId}`, this.form);
          } else {
            await axios.post('http://localhost:5000/api/reseaux', this.form);
          }
          this.fetchReseaux();
          this.resetForm();
        } catch (error) {
          console.error('Erreur de soumission :', error);
        }
      },
      editReseau(reseau) {
        this.form.lib_reseau = reseau.lib_reseau;
        this.isEdit = true;
        this.editId = reseau.code_reseau;
      },
      async deleteReseau(code) {
        if (confirm('Voulez-vous supprimer ce réseau ?')) {
          try {
            await axios.delete(`http://localhost:5000/api/reseaux/${code}`);
            this.fetchReseaux();
          } catch (error) {
            console.error('Erreur de suppression :', error);
          }
        }
      },
      cancelEdit() {
        this.resetForm();
      },
      resetForm() {
        this.form.lib_reseau = '';
        this.isEdit = false;
        this.editId = null;
      }
    },
    mounted() {
      this.fetchReseaux();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 700px;
  }
  </style>
  