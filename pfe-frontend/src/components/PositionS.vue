<template>
    <div>
      <h1>Gestion des Positions</h1>
  
      <!-- Formulaire d'ajout d'une nouvelle position -->
      <div>
        <input v-model="newPosition" placeholder="Ajouter une nouvelle position" />
        <button @click="addPosition">Ajouter</button>
      </div>
  
      <!-- Tableau des positions -->
      <table border="1">
        <thead>
          <tr>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="position in positions" :key="position.code_position">
            <td>{{ position.lib_position }}</td>
            <td>
              <!-- Boutons de modification et suppression -->
              <button @click="editPosition(position)">Modifier</button>
              <button @click="deletePosition(position.code_position)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Formulaire de modification d'une position -->
      <div v-if="isEditing">
        <input v-model="editedPosition.lib_position" placeholder="Modifier la position" />
        <button @click="updatePosition">Mettre à jour</button>
        <button @click="cancelEdit">Annuler</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        positions: [],
        newPosition: '',
        editedPosition: { code_position: null, lib_position: '' },
        isEditing: false,
      };
    },
    created() {
      this.fetchPositions();
    },
    methods: {
      // Récupérer toutes les positions
      async fetchPositions() {
        try {
          const response = await fetch('http://localhost:5000/api/positions');
          const data = await response.json();
          this.positions = data;
        } catch (error) {
          console.error('Erreur lors de la récupération des positions:', error);
        }
      },
  
      // Ajouter une nouvelle position
      async addPosition() {
        if (this.newPosition.trim()) {
          try {
            const response = await fetch('http://localhost:5000/api/positions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ lib_position: this.newPosition }),
            });
            const data = await response.json();
            this.positions.push({ code_position: data.id, lib_position: this.newPosition });
            this.newPosition = '';
          } catch (error) {
            console.error('Erreur lors de l\'ajout de la position:', error);
          }
        }
      },
  
      // Modifier une position
      editPosition(position) {
        this.editedPosition = { ...position };
        this.isEditing = true;
      },
  
      // Mettre à jour une position
      async updatePosition() {
        try {
          const response = await fetch(`http://localhost:5000/api/positions/${this.editedPosition.code_position}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lib_position: this.editedPosition.lib_position }),
          });
          if (response.ok) {
            const index = this.positions.findIndex(position => position.code_position === this.editedPosition.code_position);
            this.positions[index] = { ...this.editedPosition };
            this.isEditing = false;
          }
        } catch (error) {
          console.error('Erreur lors de la modification de la position:', error);
        }
      },
  
      // Annuler l'édition d'une position
      cancelEdit() {
        this.isEditing = false;
        this.editedPosition = { code_position: null, lib_position: '' };
      },
  
      // Supprimer une position
      async deletePosition(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/positions/${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      // Ajouter un log pour confirmer que la réponse est correcte
      console.log(`Position avec ID ${id} supprimée`);
      
      // Mise à jour du tableau
      this.positions = this.positions.filter(position => position.code_position !== id);
    } else {
      console.error('Erreur lors de la suppression de la position:', response);
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la position:', error);
  }
},
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #333;
  }
  input {
    padding: 5px;
    margin-right: 10px;
  }
  button {
    padding: 5px;
    cursor: pointer;
    margin-left: 5px;
  }
  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  table th, table td {
    padding: 10px;
    text-align: left;
  }
  table th {
    background-color: #f2f2f2;
  }
  </style>
  