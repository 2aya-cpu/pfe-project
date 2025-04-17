<template>
    <div>
      <h2>Natures de vol</h2>
      <input v-model="newNature.lib_nature" placeholder="Nouvelle nature" />
      <button @click="addNatureVol">Ajouter</button>
  
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nature in natures" :key="nature.code_nature">
            <td>{{ nature.code_nature }}</td>
            <td><input v-model="nature.lib_nature" /></td>
            <td>
              <button @click="updateNatureVol(nature)">Modifier</button>
              <button @click="deleteNatureVol(nature.code_nature)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/natures_vols';  // Assurez-vous que l'URL est correcte ici

export default {
  data() {
    return {
      natures: [],
      newNature: { lib_nature: '' }
    };
  },
  methods: {
    async fetchNatures() {
      try {
        const res = await axios.get(API_URL);  // Utiliser API_URL ici
        this.natures = res.data;
      } catch (error) {
        console.error("Erreur de récupération des natures de vol:", error);
      }
    },
    async addNatureVol() {
      try {
        await axios.post(API_URL, this.newNature);  // Utiliser API_URL ici
        this.newNature.lib_nature = '';
        this.fetchNatures();
      } catch (error) {
        console.error("Erreur d'ajout de nature de vol:", error);
      }
    },
    async updateNatureVol(nature) {
      try {
        await axios.put(`${API_URL}/${nature.code_nature}`, {
          lib_nature: nature.lib_nature
        });
        this.fetchNatures();
      } catch (error) {
        console.error("Erreur de mise à jour de nature de vol:", error);
      }
    },
    async deleteNatureVol(id) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.fetchNatures();
      } catch (error) {
        console.error("Erreur de suppression de nature de vol:", error);
      }
    }
  },
  mounted() {
    this.fetchNatures();
  }
};
</script>
