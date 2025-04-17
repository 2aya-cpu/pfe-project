<template>
    <div>
      <h2>Gestion des tronçons</h2>
      <input v-model="newTroncon.lib_troncon" placeholder="Nom du tronçon" />
      <select v-model="newTroncon.code_escale_depart">
        <option value="">Sélectionner l'escale départ</option>
        <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
          {{ escale.lib_escale }}
        </option>
      </select>
      <select v-model="newTroncon.code_escale_arrivee">
        <option value="">Sélectionner l'escale arrivée</option>
        <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
          {{ escale.lib_escale }}
        </option>
      </select>
      <button @click="addTroncon">Ajouter</button>
  
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Libellé</th>
            <th>Escale Départ</th>
            <th>Escale Arrivée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="troncon in troncons" :key="troncon.code_troncon">
            <td>{{ troncon.code_troncon }}</td>
            <td><input v-model="troncon.lib_troncon" /></td>
            <td>
              <select v-model="troncon.code_escale_depart">
                <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
                  {{ escale.lib_escale }}
                </option>
              </select>
            </td>
            <td>
              <select v-model="troncon.code_escale_arrivee">
                <option v-for="escale in escales" :key="escale.code_escale" :value="escale.code_escale">
                  {{ escale.lib_escale }}
                </option>
              </select>
            </td>
            <td>
              <button @click="updateTroncon(troncon)">Modifier</button>
              <button @click="deleteTroncon(troncon.code_troncon)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const API_URL = 'http://localhost:5000/api/troncons'; // URL de l'API pour les tronçons
  const ESCAL_URL = 'http://localhost:5000/api/escales'; // URL de l'API pour les escales
  
  export default {
    data() {
      return {
        troncons: [],
        escales: [], // Liste des escales
        newTroncon: {
          lib_troncon: '',
          code_escale_depart: '',
          code_escale_arrivee: ''
        }
      };
    },
    methods: {
      async fetchTroncons() {
        try {
          const res = await axios.get(API_URL);
          this.troncons = res.data;
        } catch (error) {
          console.error("Erreur de récupération des tronçons:", error);
        }
      },
      async fetchEscales() {
        try {
          const res = await axios.get(ESCAL_URL);
          this.escales = res.data;
        } catch (error) {
          console.error("Erreur de récupération des escales:", error);
        }
      },
      async addTroncon() {
        try {
          await axios.post(API_URL, this.newTroncon);
          this.newTroncon.lib_troncon = '';
          this.newTroncon.code_escale_depart = '';
          this.newTroncon.code_escale_arrivee = '';
          this.fetchTroncons();
        } catch (error) {
          console.error("Erreur d'ajout de tronçon:", error);
        }
      },
      async updateTroncon(troncon) {
        try {
          await axios.put(`${API_URL}/${troncon.code_troncon}`, {
            lib_troncon: troncon.lib_troncon,
            code_escale_depart: troncon.code_escale_depart,
            code_escale_arrivee: troncon.code_escale_arrivee
          });
          this.fetchTroncons();
        } catch (error) {
          console.error("Erreur de mise à jour du tronçon:", error);
        }
      },
      async deleteTroncon(id) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          this.fetchTroncons();
        } catch (error) {
          console.error("Erreur de suppression du tronçon:", error);
        }
      }
    },
    mounted() {
      this.fetchTroncons();
      this.fetchEscales();
    }
  };
  </script>
  