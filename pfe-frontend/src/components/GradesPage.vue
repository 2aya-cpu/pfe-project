<template>
  <div class="grades-container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Grades</h1>
    </div>

    <!-- Add Grade Button -->
    <div class="top-controls">
      <button class="add-grade-btn" @click="toggleForm">
        {{ showForm ? 'Annuler' : '+ Ajouter Grade' }}
      </button>
    </div>

    <!-- Form -->
    <div v-if="showForm" class="grade-form">
      <input v-model="newGrade.lib_grade" placeholder="Libellé du grade" />
      <button class="submit-btn" @click="addGrade">Ajouter</button>
    </div>

    <!-- Table -->
    <h2>Liste des Grades</h2>
    <table class="grades-table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Grade</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="grade in grades" :key="grade.code_grade">
          <td>{{ grade.code_grade }}</td>
          <td>
            <input
              :readonly="editingGrade !== grade.code_grade"
              v-model="grade.lib_grade"
              class="editable-input"
            />
          </td>
          <td>
            <img
              :src="modifyIcon"
              class="icon-btn"
              @click="toggleEdit(grade.code_grade)"
              title="Modifier"
            />
            <img
              :src="deleteIcon"
              class="icon-btn"
              @click="deleteGrade(grade.code_grade)"
              title="Supprimer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import modifyIcon from "@/assets/icons/icons8-modify-50.png";
import deleteIcon from "@/assets/icons/icons8-delete-30.png";

const API_URL = "http://localhost:5000/api/grades";

export default {
  data() {
    return {
      grades: [],
      newGrade: { lib_grade: "" },
      showForm: false,
      editingGrade: null,
      modifyIcon,
      deleteIcon,
    };
  },
  methods: {
    async fetchGrades() {
      try {
        const response = await axios.get(API_URL);
        this.grades = response.data;
      } catch (error) {
        console.error("Erreur de récupération des grades:", error);
      }
    },
    async addGrade() {
      try {
        await axios.post(API_URL, this.newGrade);
        this.newGrade.lib_grade = "";
        this.fetchGrades();
      } catch (error) {
        console.error("Erreur d'ajout de grade:", error);
      }
    },
    async updateGrade(grade) {
      try {
        await axios.put(`${API_URL}/${grade.code_grade}`, {
          lib_grade: grade.lib_grade,
        });
        this.editingGrade = null;
        this.fetchGrades();
      } catch (error) {
        console.error("Erreur de mise à jour:", error);
      }
    },
    async deleteGrade(code) {
      try {
        await axios.delete(`${API_URL}/${code}`);
        this.fetchGrades();
      } catch (error) {
        console.error("Erreur de suppression:", error);
      }
    },
    toggleEdit(code) {
      if (this.editingGrade === code) {
        const grade = this.grades.find((g) => g.code_grade === code);
        this.updateGrade(grade);
      } else {
        this.editingGrade = code;
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
  },
  mounted() {
    this.fetchGrades();
  },
};
</script>

<style scoped>
.grades-container {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.top-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}

.add-grade-btn {
  background-color: #b22222;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-grade-btn:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-grade-btn:active {
  transform: scale(0.96);
}

.grade-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  animation: slideDown 0.4s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.grade-form input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.submit-btn {
  background-color: #b22222;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.grades-table {
  width: 100%;
  border-collapse: collapse;
}

.grades-table thead {
  background-color: #b22222;
  color: white;
}

.grades-table th,
.grades-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.grades-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.grades-table tbody tr:hover {
  background-color: #f2f2f2;
  transform: translateX(2px);
}

.editable-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #333;
  outline: none;
}

.editable-input[readonly] {
  color: #777;
  cursor: default;
}

.icon-btn {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}
</style>
