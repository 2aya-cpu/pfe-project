<template>
  <div class="container">
    <div>
      <h2 >Créer un équipage</h2>

      <!-- Affichage du dernier vol réel -->
      <div v-if="dernierVol" class="info-simulation">
        <p><strong>Numéro de voyage :</strong> {{ dernierVol.num_voyage }}</p>
        <p><strong>Date du vol :</strong> {{ formatDate(dernierVol.date_vol) }}</p>
      </div>

      <form @submit.prevent="ajouterEquipage">
        <div v-for="(membre, index) in equipage" :key="index" class="row g-3 align-items-end mb-3">
          <div class="col-md-6">
            <label :for="'pn-' + index" class="form-label">Personnel Navigant :</label>
            <select :id="'pn-' + index" v-model="membre.matricule_pn" class="form-select" required>
              <option disabled value="">-- Sélectionner un PN --</option>
              <option v-for="pn in personnelsNavigants" :key="pn.matricule_pn" :value="pn.matricule_pn">
                {{ pn.nom }} {{ pn.prenom }}
              </option>
            </select>
          </div>

          <div class="col-md-6">
            <label :for="'position-' + index" class="form-label">Position :</label>
            <select :id="'position-' + index" v-model="membre.code_position" class="form-select" required>
              <option disabled value="">-- Sélectionner un PN --</option>
              <option v-for="position in positions" :key="position.code_position" :value="position.code_position">
                {{ position.lib_position }}
              </option>
            </select>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" >Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</template>


  
  <script>
  import axios from "axios";
  
  export default {
    data() {
  return {
    dernierVol: null,
    personnelsNavigants: [],
    positions: [],
    equipage: Array.from({ length: 4 }, () => ({ matricule_pn: "", code_position: "" })), 
  };
},

    methods: {
      formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
},
      async chargerDernierVol() {
        try {
          const response = await axios.get("http://localhost:5000/api/equipage/dernier-vol");
          this.dernierVol = response.data;
        } catch (error) {
          console.error("Erreur lors du chargement du vol", error);
        }
      },
      async chargerPN() {
        try {
          const response = await axios.get("http://localhost:5000/api/equipage/pn");
          this.personnelsNavigants = response.data;
        } catch (error) {
          console.error("Erreur lors du chargement des PN", error);
        }
      },
      async chargerPositions() {
  try {
    const response = await axios.get("http://localhost:5000/api/equipage/positions");
    console.log("Positions chargées :", response.data); // Vérifiez les données ici
    this.positions = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des positions", error);
  }
},
      async ajouterEquipage() {
        console.log("Données envoyées :", { id: this.dernierVol.id, equipage: this.equipage });
        try {
          const response = await axios.post("http://localhost:5000/api/equipage/ajouter", {
            id: this.dernierVol.id,
            equipage: this.equipage,
          });
          alert(response.data.message);
        } catch (error) {
          console.error("Erreur lors de l'ajout", error);
        }
      },
    },
    mounted() {
      this.chargerDernierVol();
      this.chargerPN();
      this.chargerPositions();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1100px;
  margin: auto;
  padding: 75px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  border: 1px solid #e60012; /* Bordure rouge */
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  button {
    width: 20%;
  padding: 8px;
  background-color:  #e60012; /* Rouge vif */
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  }
  label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #444;
}
  .info-simulation {
  background-color: #f5f5f5;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  border: 2px solid #eeb5b5;
  width: 60%; /* 🔸 Réduit la largeur à 80% */
  margin: 0 auto 20px auto; /* 🔸 Centre le bloc horizontalement */
  }
  h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #e60012; /* Red */
}

  .card {
  border-radius: 1rem;
}
select {
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 8px;
}
.bg-light {
  background-color: #f8f9fa !important;
}
  </style>
  