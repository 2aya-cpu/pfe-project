<template>
  <div class="type-avions">
    <!-- Header -->
    <header class="header">
      <img class="logo" src="@/assets/airalgerie.jpg" alt="Logo" />
      <h1 class="header-title">Références</h1>
      <img class="account-icon" src="@/assets/icons/icons8-account-24.png" alt="Account Icon" />
    </header>

    <!-- Page Title -->
    <div class="page-title">
      <h2>Types d'Avions</h2>
    </div>

    <!-- Optional Search Bar -->
    <div class="search-bar">
      <img src="@/assets/icons/search-icon.png" class="search-icon" alt="Search Icon" />
      <input type="text" v-model="searchQuery" placeholder="Rechercher un type d'avion..." />
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Code Type</th>
            <th>Libellé Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in filteredAvions" :key="type.code_typeavion">
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
      typeAvions: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredAvions() {
      return this.typeAvions.filter((avion) =>
        avion.lib_typeavion.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchTypeAvions() {
      axios
        .get('http://localhost:8080/api/typeavions')
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
.type-avions {
  font-family: 'Segoe UI', sans-serif;
  padding-bottom: 60px;
  background-color: #f9f9f9;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 20px 40px;
  background-color: #fff;
  border-bottom: 2px solid #dd1620;
}

.logo {
  width: 120px;
  height: auto;
}

.header-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  font-weight: 700;
  color: #222;
}

.account-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

/* Page Title */
.page-title {
  margin: 40px 0 20px;
  text-align: center;
}
.page-title h2 {
  font-size: 28px;
  font-weight: 600;
  color: #dd1620;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
.search-bar input {
  width: 350px;
  padding: 10px 40px 10px 40px;
  font-size: 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  outline: none;
}
.search-icon {
  position: absolute;
  margin-left: -310px;
  width: 20px;
  height: 20px;
}

/* Table */
.table-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}
.styled-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 14px;
}
.styled-table thead th {
  background-color: #b30000;
  color: white;
  padding: 14px 18px;
  text-align: left;
  font-size: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.styled-table tbody tr {
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  transition: background 0.3s;
}
.styled-table tbody td {
  padding: 14px 18px;
  font-size: 15px;
  color: #333;
}
.styled-table tbody tr:hover {
  background-color: #f4f4f4;
}
</style>