
<template>
    <div class="container mt-4">
      <h2 class="mb-4">Gestion des Escales</h2>
  
      <form @submit.prevent="addEscale" class="mb-4 row g-2">
        <div class="col-md-5">
          <input type="text" class="form-control" v-model="newEscale.lib_escale" placeholder="Nom de l'escale" required />
        </div>
        <div class="col-md-5">
          <select class="form-select" v-model="newEscale.code_reseau">
            <option value="">-- Réseau --</option>
            <option v-for="reseau in reseaux" :key="reseau.code_reseau" :value="reseau.code_reseau">
              {{ reseau.lib_reseau }}
            </option>
          </select>
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-primary w-100">Ajouter</button>
        </div>
      </form>
  
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom Escale</th>
            <th>Réseau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="escale in escales" :key="escale.code_escale">
            <td>{{ escale.code_escale }}</td>
            <td>
              <input v-if="editingEscale?.code_escale === escale.code_escale" v-model="editingEscale.lib_escale" class="form-control" />
              <span v-else>{{ escale.lib_escale }}</span>
            </td>
            <td>
              <select v-if="editingEscale?.code_escale === escale.code_escale" v-model="editingEscale.code_reseau" class="form-select">
                <option v-for="reseau in reseaux" :key="reseau.code_reseau" :value="reseau.code_reseau">
                  {{ reseau.lib_reseau }}
                </option>
              </select>
              <span v-else>{{ escale.lib_reseau }}</span>
            </td>
            <td>
              <button v-if="editingEscale?.code_escale === escale.code_escale" @click="updateEscale(escale.code_escale)" class="btn btn-success btn-sm">✅</button>
              <button v-if="editingEscale?.code_escale === escale.code_escale" @click="cancelEdit" class="btn btn-secondary btn-sm ms-1">✖</button>
              <button v-else @click="editEscale(escale)" class="btn btn-warning btn-sm">Modifier</button>
              <button @click="deleteEscale(escale.code_escale)" class="btn btn-danger btn-sm ms-1">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EscalePage',
    data() {
      return {
        escales: [],
        reseaux: [],
        newEscale: {
          lib_escale: '',
          code_reseau: ''
        },
        editingEscale: null
      };
    },
    methods: {
      async fetchEscales() {
        const res = await axios.get('http://localhost:5000/api/escales');
        this.escales = res.data;
      },
      async fetchReseaux() {
        const res = await axios.get('http://localhost:5000/api/reseaux');
        this.reseaux = res.data;
      },
      async addEscale() {
        await axios.post('http://localhost:5000/api/escales', this.newEscale);
        this.newEscale = { lib_escale: '', code_reseau: '' };
        this.fetchEscales();
      },
      editEscale(escale) {
        this.editingEscale = { ...escale };
      },
      cancelEdit() {
        this.editingEscale = null;
      },
      async updateEscale(id) {
        await axios.put(`http://localhost:5000/api/escales/${id}`, this.editingEscale);
        this.editingEscale = null;
        this.fetchEscales();
      },
      async deleteEscale(id) {
        if (confirm('Confirmer la suppression ?')) {
          await axios.delete(`http://localhost:5000/api/escales/${id}`);
          this.fetchEscales();
        }
      }
    },
    mounted() {
      this.fetchEscales();
      this.fetchReseaux();
    }
  };
  </script>
  
  <style scoped>
  table th,
  table td {
    vertical-align: middle;
  }
  </style>
  