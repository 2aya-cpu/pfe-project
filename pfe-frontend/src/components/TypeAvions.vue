<template>
    <div class="type-avions">
  
  
      <!-- Page Title -->
      <div class="sub-header">
        <h2>Types d'Avions</h2>
      </div>
  
      <!-- Table -->
      <div class="table-containery">
        <table>
          <thead>
            <tr>
              <th>Code Type</th>
              <th>Libellé Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="type in typeAvions" :key="type.code_typeavion">
              <td>{{ type.code_typeavion }}</td>
              <td>{{ type.lib_typeavion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TypeAvions',
    data() {
      return {
        typeAvions: [], // Data from the database
      };
    },
    methods: {
      fetchTypeAvions() {
        axios
          .get('/api/typeavions')
          .then((response) => {
            this.typeAvions = response.data;
          })
          .catch((error) => {
            console.error('Error fetching type avions:', error);
          });
      },
    },
    mounted() {
      this.fetchTypeAvions();
    },
  };
  </script>
  
  <style scoped>
  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 2px solid rgba(221, 22, 32, 0.8);
  }
  .logo {
    width: 150px;
    height: auto;
  }
  .title {
    font-size: 48px;
    font-weight: 700;
    color: #000;
    text-align: center;
  }
  .account-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  /* Sub-header */
  .sub-header {
    margin-top: 20px;
    text-align: center;
  }
  .sub-header h2 {
    font-size: 32px;
    font-weight: 600;
    color: #dd1620;
  }
  
  /* Table */
  .table-containeyr {
    margin-top: 30px;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead th {
    background-color: #f4f4f4;
    padding: 10px;
    font-size: 14px;
    text-align: left;
    border-bottom: 2px solid #ddd;
  }
  tbody td {
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
  }
  </style>
  