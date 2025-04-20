<template>
    <div class="containere">
      <h2>Heures de vol et nombre de vols PN</h2>
      <h6 class="instruction-text">Veuillez entrer les dates de début et de fin :</h6>
      
      <form @submit.prevent="fetchPNTStats" class="form">
        <div class="form-group">
          <label for="date_debut">Date début :</label>
          <input type="date" v-model="date_debut" required class="form-input" />
        </div>
  
        <div class="form-group">
          <label for="date_fin">Date fin :</label>
          <input type="date" v-model="date_fin" required class="form-input" />
        </div>
        <button type="submit" class="submit-btn">Rechercher</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  
      <table v-if="pntStats.length" class="result-table">
        <thead>
          <tr>
            <th class="the">Nom</th>
            <th class="the">Prénom</th>
            <th class="the">Matricule PN</th>
            <th class="the">Groupe Socioprofessionnel</th>
            <th class="the">Nombre de vols</th>
            <th class="the">Heures de vol</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="stat in pntStats"
            :key="stat.matricule_pn"
            :class="{ 'no-activity': stat.nombre_vols == 0 }"
          >
            <td>{{ stat.nom }}</td>
            <td>{{ stat.prenom }}</td>
            <td>{{ stat.matricule_pn }}</td>
            <td>{{ stat.groupe_socioprofessionnel }}</td>
            <td>{{ stat.nombre_vols }}</td>
            <td>{{ stat.heures_vol }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        date_debut: "",
        date_fin: "",
        pntStats: [],
        errorMessage: "",
      };
    },
    methods: {
      async fetchPNTStats() {
        try {
          this.errorMessage = "";
          this.pntStats = [];
  
          const response = await axios.get("http://localhost:5000/api/vols/stats/pn", {
            params: {
              date_debut: this.date_debut,
              date_fin: this.date_fin,
            },
          });
  
          this.pntStats = response.data;
        } catch (error) {
          console.error("Erreur API :", error.response?.data || error.message);
          this.errorMessage = "Erreur lors de la récupération des données.";
        }
      },
    },
  };
  </script>
   <style>
   /* Layout */
   .containere {
   max-width: 1100px;
   margin: auto;
   padding: 85px;
   text-align: center;
   background-color: #ffffff;
   border-radius: 15px;
   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
   font-family: 'Arial', sans-serif;
   border: 1px solid #e60012; /* Bordure rouge */
 }
 
 /* Title */
 h2 {
   font-size: 1.7rem;
   margin-bottom: 20px;
   color: #e60012; /* Red */
   font-weight: bold;
   text-transform: uppercase;
   letter-spacing: 1px;
   font-family: Georgia, 'Times New Roman', Times, serif;
 }
 .submit-btn {
   background-color: #e60012;
   color: white;
   padding: 12px 25px;
   border: none;
   border-radius: 50px;
   cursor: pointer;
   font-size: 1.1rem;
   transition: background-color 0.3s ease, transform 0.3s ease;
 }
 .result-table {
   width: 100%;
   margin-top: 20px;
   border-collapse: collapse;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 }
 .submit-btn:hover {
   background-color: #c7000d;
   transform: scale(1.05);
 }
 /* Form Styling */
 .form {
   display: flex;
   justify-content: flex-start;
   align-items: center;
   gap: 10px;
   flex-wrap: wrap;
   margin-bottom: 20px;
 }
 
 input[type="date"] {
   padding: 12px;
   width: 200px;
   border-radius: 10px;
   border: 2px solid #ddd;
   font-size: 1rem;
   transition: all 0.3s ease;
 }
 
 input[type="date"]:focus {
   border-color: #e60012;
   box-shadow: 0 0 5px rgba(230, 0, 18, 0.5);
 }
 .form-group {
   flex: 1 1 20%;
   min-width: 200px;
   text-align: left;
 }
 
 .form-input {
   padding: 12px;
   width: 60%;
   border-radius: 10px;
   border: 2px solid #ddd;
   font-size: 1rem;
   transition: all 0.3s ease;
 }
 button {
   background-color: #e60012;
   color: white;
   padding: 12px 25px;
   border: none;
   border-radius: 50px;
   cursor: pointer;
   font-size: 1.1rem;
   transition: background-color 0.3s ease, transform 0.3s ease;
   margin-top: 10px;
 }
 

 
 /* Error message styling */
 .error {
   color: red;
   font-size: 1.1rem;
   margin-top: 15px;
 }
 
 /* Table Styling */
 table {
   width: 100%;
   margin-top: 20px;
   border-collapse: collapse;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 }
 
 th, td {
   padding: 15px;
   border: 1px solid #ddd;
   text-align: center;
 }
 
 .the {
   background-color: #e60012; /* Red */
   color: white;
   font-size: 0.9rem;
 }
 
 .tde {
   font-size: 1rem;
 }
 
 tbody tr:nth-child(even) {
   background-color: #f9f9f9;
 }
 
 
 
 tbody tr:nth-child(odd) {
   background-color: #f4f4f4;
 }
 
   </style>
 
  