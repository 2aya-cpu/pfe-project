<template>
    <div>
      <h2>Gestion des Types d'Avion</h2>
  
      <!-- Formulaire -->
      <form @submit.prevent="handleSubmit" class="mb-3">
        <input v-model="form.lib_typeavion" placeholder="Libellé type avion" required />
        <button type="submit" class="btn btn-primary">
          {{ editMode ? 'Modifier' : 'Ajouter' }}
        </button>
        <button v-if="editMode" @click="cancelEdit" type="button" class="btn btn-secondary">Annuler</button>
      </form>
  
      <!-- Tableau -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Code</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in typeAvions" :key="type.code_typeavion">
            <td>{{ type.code_typeavion }}</td>
            <td>{{ type.lib_typeavion }}</td>
            <td>
              <button class="btn btn-sm btn-warning" @click="editType(type)">Modifier</button>
              <button class="btn btn-sm btn-danger" @click="deleteType(type.code_typeavion)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        typeAvions: [],
        form: {
          lib_typeavion: ''
        },
        editMode: false,
        editId: null
      };
    },
    methods: {
      fetchTypeAvions() {
        axios.get('http://localhost:5000/api/typeavions')
          .then(res => this.typeAvions = res.data)
          .catch(err => console.error(err));
      },
      handleSubmit() {
        if (this.editMode) {
          axios.put(`http://localhost:5000/api/typeavions/${this.editId}`, this.form)
            .then(() => {
              this.fetchTypeAvions();
              this.cancelEdit();
            });
        } else {
          axios.post('http://localhost:5000/api/typeavions', this.form)
            .then(() => {
              this.fetchTypeAvions();
              this.form.lib_typeavion = '';
            });
        }
      },
      editType(type) {
        this.editMode = true;
        this.editId = type.code_typeavion;
        this.form.lib_typeavion = type.lib_typeavion;
      },
      cancelEdit() {
        this.editMode = false;
        this.editId = null;
        this.form.lib_typeavion = '';
      },
      deleteType(id) {
        if (confirm('Supprimer ce type d’avion ?')) {
          axios.delete(`http://localhost:5000/api/typeavions/${id}`)
            .then(() => this.fetchTypeAvions());
        }
      }
    },
    mounted() {
      this.fetchTypeAvions();
    }
  };
  </script>
  