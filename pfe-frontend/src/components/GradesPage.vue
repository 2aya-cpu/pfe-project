
<template>
    <div class="container mt-4">
      <h2>Liste des Grades</h2>
  
      <!-- Ajout -->
      <div class="mb-3 d-flex">
        <input v-model="newGrade" placeholder="Nouveau grade" class="form-control me-2" />
        <button class="btn btn-primary" @click="addGrade">Ajouter</button>
      </div>
  
      <!-- Tableau -->
      <table class="table table-bordered">
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
            <td v-if="editGradeId !== grade.code_grade">{{ grade.lib_grade }}</td>
            <td v-else>
              <input v-model="editGradeText" class="form-control" />
            </td>
            <td>
              <button v-if="editGradeId !== grade.code_grade" class="btn btn-warning btn-sm me-1" @click="startEdit(grade)">Modifier</button>
              <button v-else class="btn btn-success btn-sm me-1" @click="saveEdit(grade.code_grade)">Enregistrer</button>
              <button class="btn btn-danger btn-sm" @click="deleteGrade(grade.code_grade)">Supprimer</button>
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
        grades: [],
        newGrade: '',
        editGradeId: null,
        editGradeText: ''
      };
    },
    mounted() {
      this.fetchGrades();
    },
    methods: {
      async fetchGrades() {
        const res = await axios.get('http://localhost:5000/api/grades');
        this.grades = res.data;
      },
      async addGrade() {
        if (!this.newGrade.trim()) return;
        await axios.post('http://localhost:5000/api/grades', { lib_grade: this.newGrade });
        this.newGrade = '';
        this.fetchGrades();
      },
      startEdit(grade) {
        this.editGradeId = grade.code_grade;
        this.editGradeText = grade.lib_grade;
      },
      async saveEdit(code_grade) {
        await axios.put(`http://localhost:5000/api/grades/${code_grade}`, { lib_grade: this.editGradeText });
        this.editGradeId = null;
        this.editGradeText = '';
        this.fetchGrades();
      },
      async deleteGrade(code_grade) {
        await axios.delete(`http://localhost:5000/api/grades/${code_grade}`);
        this.fetchGrades();
      }
    }
  };
  </script>
  
  <style scoped>
  input {
    width: 100%;
  }
  </style>
  