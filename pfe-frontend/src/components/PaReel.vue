<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Gestion des Participations</h2>
      
      <input v-model="searchQuery" @input="fetchParticipations" class="form-control mb-3" placeholder="🔍 Rechercher...">
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Num Voyage</th>
            <th>Étape</th>
            <th>Date Vol</th>
            <th>Matricule App</th>
            <th>Matricule PN</th>
            <th>Nom PN</th>
            <th>Prénom PN</th>
            <th>Grade PN</th>
            <th>Position PN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in participations" :key="p.code_participation">
            <td>{{ p.num_voyage }}</td>
            <td>{{ p.etape }}</td>
            <td>{{ p.date_vol }}</td>
            <td>{{ p.lib_appareil }}</td>
            <td>{{ p.matricule_pn }}</td>
            <td>{{ p.nom }}</td>
            <td>{{ p.prenom }}</td>
            <td>{{ p.grade }}</td>
            <td>{{ p.position }}</td>
            <td>
  <button @click="editPN(pn)" class="icon-button" title="Modifier">
    <LucidePencil class="icon" />
  </button>
  <button @click="deletePN(pn.matricule_pn)" class="icon-button delete" title="Supprimer">
    <LucideTrash2 class="icon" />
  </button>
</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { LucidePencil, LucideTrash2 } from "lucide-vue-next";
  export default {
    components: {
    LucidePencil,
    LucideTrash2,
  },
    data() {
      return {
        participations: [],
        searchQuery: "",
      };
    },
    methods: {
      async fetchParticipations() {
        try {
          const response = await axios.get(`http://localhost:5000/api/pr?search=${this.searchQuery}`);
          this.participations = response.data;
        } catch (error) {
          console.error("Erreur de chargement :", error);
        }
      },
      async deleteParticipation(id) {
        if (!confirm("Voulez-vous vraiment supprimer cette participation ?")) return;
        try {
          await axios.delete(`http://localhost:5000/api/pr/${id}`);
          this.fetchParticipations();
        } catch (error) {
          console.error("Erreur de suppression :", error);
        }
      },
      editParticipation(participation) {
        const updatedMatriculePN = prompt("Nouveau matricule PN :", participation.matricule_pn);
        if (!updatedMatriculePN) return;
  
        axios
          .put(`http://localhost:5000/api/pr/${participation.code_participation}`, {
            id_vol: participation.id_vol,
            matricule_pn: updatedMatriculePN,
            code_position: participation.code_position,
          })
          .then(() => this.fetchParticipations())
          .catch((error) => console.error("Erreur de mise à jour :", error));
      },
    },
    mounted() {
      this.fetchParticipations();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 95%;
  }
  </style>
  