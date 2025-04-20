<template>
  <div class="form-container">
    <h2>Formulaire des Vols Réel:</h2>
    <p class="subtitle">Veuillez remplir les informations puis enregistrer.</p>

    <form @submit.prevent="submitForm">
      <div class="form-grid">
        <!-- Row 1 -->
        <div class="form-row">
          <div class="form-group">
            <label>Num de voyage</label>
            <input type="text" v-model="form.num_voyage" required />
          </div>
          <div class="form-group">
            <label>Étape</label>
            <input type="text" v-model="form.etape" required />
          </div>
        </div>

        <!-- Row 2 -->
        <div class="form-row">
          <div class="form-group">
            <label>Matricule app</label>
            <select v-model="form.matricule_app">
              <option v-for="app in matriculesApp" :key="app.matricule_app" :value="app.matricule_app">
                {{ app.lib_appareil }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Tronçons</label>
            <select v-model="form.code_troncon">
              <option v-for="troncon in troncons" :key="troncon.code_troncon" :value="troncon.code_troncon">
                {{ troncon.lib_troncon }}
              </option>
            </select>
          </div>
        </div>

        <!-- Row 3 -->
        <div class="form-row">
          <div class="form-group">
            <label>Date et heure d’arrivée</label>
            <input type="datetime-local" v-model="form.date_heure_arrivee" required />
          </div>
          <div class="form-group">
            <label>Nature de vol</label>
            <select v-model="form.code_nature">
              <option v-for="nature in naturesVol" :key="nature.code_nature" :value="nature.code_nature">
                {{ nature.lib_nature }}
              </option>
            </select>
          </div>
        </div>

        <!-- Row 4 -->
        <div class="form-row">
          <div class="form-group">
            <label>Date et heure de départ</label>
            <input type="datetime-local" v-model="form.date_heure_depart" required />
          </div>
          <div class="form-group">
            <label>Date de vol</label>
            <input type="date" v-model="form.date_vol" required />
          </div>
        </div>

        <!-- Row 5 -->
        <div class="form-row">
          <div class="form-group">
            <label>Temps de vol</label>
            <input type="time" v-model="form.temps_vol" required />
          </div>
          
            <div class="form-buttons">
        <button type="submit" class="btn save-btn" :disabled="loading">
         {{ loading ? "Enregistrement..." : "Enregistrer" }}
        </button>
        <router-link to="/equipage" class="btn next-btn">Suivant</router-link>
      
          </div>
        </div>
      </div>

     
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        num_voyage: "",
        etape: "",
        date_vol: "",
        code_troncon: "", 
        code_nature: "",   
        date_heure_depart: "",
        date_heure_arrivee: "",
        matricule_app: "",
        temps_vol: "" // Ajouté car il manquait
      },
      troncons: [],
      naturesVol: [],
      matriculesApp: [],
      loading: false // Indicateur de chargement
    };
  },
  methods: {
    async fetchOptions() {
      try {
        const [tronconRes, natureRes, appRes] = await Promise.all([
          axios.get("http://localhost:5000/api/vols/troncons"),
          axios.get("http://localhost:5000/api/vols/nature-vol"),
          axios.get("http://localhost:5000/api/vols/matricule-app")
        ]);

        this.troncons = tronconRes.data;
        this.naturesVol = natureRes.data;
        this.matriculesApp = appRes.data;

        console.log("Tronçons chargés :", this.troncons);
        console.log("Natures de vol chargées :", this.naturesVol);
        console.log("Matricules appareils chargés :", this.matriculesApp);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des données :", error);
        alert("Échec du chargement des options.");
      }
    },
    async submitForm() {
      // Vérification des champs vides
      if (Object.values(this.form).some(val => !val)) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      this.loading = true;
      try {
        const response = await axios.post("http://localhost:5000/api/vols", this.form);
        alert(response.data.message);
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du vol", error);
        alert(error.response?.data?.error || "Une erreur est survenue.");
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchOptions();
  }
};
</script>

<style scoped>
/* Conteneur principal */
.form-container {
  max-width: 1100px;
  margin:  auto;
  background-color: #fff;
  border-radius: 15px;
  padding: 85px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
  border: 1px solid #e60012; /* Bordure rouge */
}
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row .form-group {
  flex: 1;
}

/* Titre */
h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #e60012; /* Red */
}

/* Sous-titre */
.subtitle {
  color: #555;
  text-align: center;
  margin-bottom: 20px;
  
}

/* Grille du formulaire */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color:white;
  font-size: 14px;
  transition: border-color 0.3s;
  /* Removed width: 50%; */
  width: 100%;
}


.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #b30000;
}

/* Boutons */
.form-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  
  
}

.btn {
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s ease;
}

.save-btn {
  background-color:  #e60012;
  color:white;
}

.next-btn {
  background-color:#e60012;
  color:white;
}

.btn:hover {
  background-color: #e42424;
  color: white;
}



/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-container {
    padding: 20px;
  }
}

</style>
