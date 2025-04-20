<template>
    <div>
      <h1>Gestion des Bases</h1>
      
      <!-- Liste des bases -->
      <table>
        <thead>
          <tr>
            <th>Code Base</th>
            <th>Libellé Base</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="base in bases" :key="base.code_base">
            <td>{{ base.code_base }}</td>
            <td>{{ base.lib_base }}</td>
            <td>
              <button @click="editBase(base)">Modifier</button>
              <button @click="deleteBase(base.code_base)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Formulaire d'ajout/modification -->
      <div>
        <input v-model="libBase" placeholder="Nom de la base" />
        <button @click="addBase">Ajouter</button>
        <button v-if="editing" @click="updateBase">Modifier</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bases: [],
        libBase: '',
        editing: false,
        editId: null,
      };
    },
    methods: {
      // Charger les bases
      loadBases() {
        fetch('http://localhost:5000/api/bases')
          .then((response) => response.json())
          .then((data) => {
            this.bases = data;
          });
      },
      
      // Ajouter une base
      addBase() {
        fetch('http://localhost:5000/api/bases', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lib_base: this.libBase }),
        })
          .then(() => {
            this.loadBases();
            this.libBase = '';
          });
      },
  
      // Modifier une base
      editBase(base) {
        this.libBase = base.lib_base;
        this.editing = true;
        this.editId = base.code_base;
      },
  
      // Mise à jour d'une base
      updateBase() {
        fetch(`http://localhost:5000/api/bases/${this.editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lib_base: this.libBase }),
        })
          .then(() => {
            this.loadBases();
            this.libBase = '';
            this.editing = false;
            this.editId = null;
          });
      },
  
      // Supprimer une base
      deleteBase(id) {
        fetch(`http://localhost:5000/api/bases/${id}`, {
          method: 'DELETE',
        })
          .then(() => {
            this.loadBases();
          });
      },
    },
    mounted() {
      this.loadBases();
    },
  };
  </script>
  