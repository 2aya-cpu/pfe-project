<template>
    <div class="container mt-4">
      <h2>Liste des contrats</h2>
      <input v-model="nouveauContrat" placeholder="Nouveau contrat" class="form-control w-50 mb-2" />
      <button @click="ajouterContrat" class="btn btn-success mb-3">Ajouter</button>
  
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Libellé</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contrat in contrats" :key="contrat.code_contrat">
            <td>{{ contrat.code_contrat }}</td>
            <td>
              <input v-model="contrat.lib_contrat" class="form-control" />
            </td>
            <td>
              <button @click="modifierContrat(contrat)" class="btn btn-primary btn-sm">Modifier</button>
              <button @click="supprimerContrat(contrat.code_contrat)" class="btn btn-danger btn-sm">Supprimer</button>
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
        contrats: [],
        nouveauContrat: '',
      };
    },
    methods: {
      async fetchContrats() {
        const res = await axios.get('http://localhost:5000/api/contrats');
        this.contrats = res.data;
      },
      async ajouterContrat() {
        if (!this.nouveauContrat) return;
        await axios.post('http://localhost:5000/api/contrats', { lib_contrat: this.nouveauContrat });
        this.nouveauContrat = '';
        this.fetchContrats();
      },
      async modifierContrat(contrat) {
        await axios.put(`http://localhost:5000/api/contrats/${contrat.code_contrat}`, { lib_contrat: contrat.lib_contrat });
        this.fetchContrats();
      },
      async supprimerContrat(id) {
        await axios.delete(`http://localhost:5000/api/contrats/${id}`);
        this.fetchContrats();
      },
    },
    mounted() {
      this.fetchContrats();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  