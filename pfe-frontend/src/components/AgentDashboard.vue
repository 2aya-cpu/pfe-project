<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Bienvenue Agent de saisie !</h1>
    <p class="dashboard-subtitle">Page réservée aux agents.</p>

    <!-- Nouveau titre pour les statistiques -->
    <h2 class="stats-title">Statistiques Générales</h2>

    <div class="stats-grid">
      <div class="stat-card">
        <h2>Vols Réels</h2>
        <p class="stat-value">{{ volsReels }}</p>
      </div>
      <div class="stat-card">
        <h2>Simulations</h2>
        <p class="stat-value">{{ simulations }}</p>
      </div>
      <div class="stat-card">
        <h2>Personnel Navigant</h2>
        <p class="stat-value">{{ personnelNavigant }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgentDashboard",
  data() {
    return {
      volsReels: 0,
      simulations: 0,
      personnelNavigant: 0,
    };
  },
  mounted() {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données reçues de l'API:", data);  // Ajoute cette ligne pour voir les données
        this.volsReels = data.volsReels;
        this.simulations = data.simulations;
        this.personnelNavigant = data.personnelNavigant;
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des statistiques", err);
      });
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.dashboard-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

/* Style du titre des statistiques */
.stats-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 30px;
}

.stats-grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-card {
  flex: 1 1 250px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h2 {
  font-size: 1.3rem;
  color: #222;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: red;
}
</style>