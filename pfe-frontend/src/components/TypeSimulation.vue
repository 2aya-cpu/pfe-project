<template>
    <div>
      <h2>Types de simulation</h2>
      <input v-model="newType.lib_typesimulation" placeholder="Nouveau type" />
      <button @click="addTypesimulation">Ajouter</button>
  
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in typesimulations" :key="type.code_typesimulation">
            <td>{{ type.code_typesimulation }}</td>
            <td>
              <input v-model="type.lib_typesimulation" />
            </td>
            <td>
              <button @click="updateTypesimulation(type)">Modifier</button>
              <button @click="deleteTypesimulation(type.code_typesimulation)">Supprimer</button>
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
        typesimulations: [],
        newType: {
          lib_typesimulation: ''
        }
      };
    },
    methods: {
      async fetchTypesimulations() {
        try {
          const res = await axios.get('http://localhost:5000/api/typesimulations');
          this.typesimulations = res.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des types de simulation', error);
        }
      },
      async addTypesimulation() {
        await axios.post('http://localhost:5000/api/typesimulations', this.newType);
        this.newType.lib_typesimulation = '';
        this.fetchTypesimulations();
      },
      async updateTypesimulation(type) {
        await axios.put(`http://localhost:5000/api/typesimulations/${type.code_typesimulation}`, {
          lib_typesimulation: type.lib_typesimulation
        });
        this.fetchTypesimulations();
      },
      async deleteTypesimulation(id) {
        await axios.delete(`http://localhost:5000/api/typesimulations/${id}`);
        this.fetchTypesimulations();
      }
    },
    mounted() {
      this.fetchTypesimulations();
    }
  };
  </script>
  