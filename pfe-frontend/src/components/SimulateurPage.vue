
<template>
    <div>
      <h2>Simulateurs</h2>
      <input v-model="newSim.lib_simulateur" placeholder="Nouveau simulateur" />
      <button @click="addSimulateur">Ajouter</button>
  
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sim in simulateurs" :key="sim.code_simulateur">
            <td>{{ sim.code_simulateur }}</td>
            <td><input v-model="sim.lib_simulateur" /></td>
            <td>
              <button @click="updateSimulateur(sim)">Modifier</button>
              <button @click="deleteSimulateur(sim.code_simulateur)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  const API_URL = 'http://localhost:5000/api/simulateurs';

export default {
  data() {
    return {
      simulateurs: [],
      newSim: { lib_simulateur: '' }
    };
  },
  methods: {
    async fetchSimulateurs() {
      const res = await axios.get(API_URL);
      this.simulateurs = res.data;
    },
    async addSimulateur() {
      await axios.post(API_URL, this.newSim);
      this.newSim.lib_simulateur = '';
      this.fetchSimulateurs();
    },
    async updateSimulateur(sim) {
      await axios.put(`${API_URL}/${sim.code_simulateur}`, {
        lib_simulateur: sim.lib_simulateur
      });
      this.fetchSimulateurs();
    },
    async deleteSimulateur(id) {
      await axios.delete(`${API_URL}/${id}`);
      this.fetchSimulateurs();
    }
  },
  mounted() {
    this.fetchSimulateurs();
  }
};

  </script>
  