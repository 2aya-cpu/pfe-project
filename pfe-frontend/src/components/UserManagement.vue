<template>
  <div class="user-management">
    <!-- Page Header -->
    <div class="page-header">
      <h1>Gestion des Utilisateurs</h1>
    </div>

    <!-- Search & Add User -->
    <div class="top-controls">
      <div class="search-bar">
        <img :src="searchIcon" alt="search-icon" class="icon" />
        <input v-model="searchQuery" placeholder="Rechercher un utilisateur..." />
      </div>
      <button class="add-user-btn-clean" @click="toggleForm">
  + Ajouter Utilisateur
</button>

    </div>

    <!-- User Form -->
    <div v-if="showForm" class="user-form">
      <h2>{{ isEditing ? "Modifier un utilisateur" : "Ajouter un utilisateur" }}</h2>
      <input v-model="newUser.name" placeholder="Nom" />
      <input v-model="newUser.email" placeholder="Email" />
      <input v-model="newUser.etat" placeholder="État" />
      <input v-model="newUser.password" placeholder="Mot de passe" type="password" />
      <input v-model="newUser.id_role" placeholder="ID du rôle" type="number" />

      <div class="form-buttons">
        <button v-if="isEditing" @click="updateUser">💾 Mettre à jour</button>
        <button v-else @click="addUser">+Ajouter</button>
      </div>
    </div>

    <!-- User Table -->
    <h2>Liste des utilisateurs</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>État</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span :class="['etat', user.etat === 'activé' ? 'active' : 'inactive']">
              {{ user.etat }}
            </span>
          </td>
          <td>
            <img class="icon-btn" :src="modifyIcon" alt="modifier" @click="editUser(user)" />
            <img class="icon-btn" :src="deleteIcon" alt="supprimer" @click="deleteUser(user.id)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

import deleteIcon from '../assets/icons/icons8-delete-30.png';
import modifyIcon from '../assets/icons/icons8-modify-50.png';
import searchIcon from '../assets/icons/icons8-search-50.png';

const users = ref([]);
const newUser = ref({ id: null, name: "", email: "", etat: "", password: "", id_role: null });
const isEditing = ref(false);
const showForm = ref(false);
const searchQuery = ref("");

const fetchUsers = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/users");
    users.value = data;
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs", error);
  }
};

const addUser = async () => {
  try {
    await axios.post("http://localhost:5000/api/users", newUser.value);
    resetForm();
    fetchUsers();
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur", error);
  }
};

const editUser = (user) => {
  newUser.value = { ...user };
  isEditing.value = true;
  showForm.value = true;
};

const updateUser = async () => {
  try {
    await axios.put(`http://localhost:5000/api/users/${newUser.value.id}`, newUser.value);
    resetForm();
    fetchUsers();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
  }
};

const deleteUser = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  }
};

const resetForm = () => {
  newUser.value = { id: null, name: "", email: "", etat: "", password: "", id_role: null };
  isEditing.value = false;
  showForm.value = false;
};

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) resetForm();
};

const filteredUsers = computed(() =>
  users.value.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(fetchUsers);
</script>
<style scoped>
.user-management {
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-bar {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 0.5rem;
}

.search-bar input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 200px;
}

/* Clean Modern Add User Button with subtle hover and press effects */
.add-user-btn-clean {
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

.add-user-btn-clean:hover {
  background-color: #a40000;
  transform: translateY(-1px);
}

.add-user-btn-clean:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.user-form {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  animation: slideDown 0.4s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.user-form input {
  display: block;
  margin: 0.5rem 0;
  padding: 0.4rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table thead {
  background-color: #b22222;
  color: white;
}

.user-table th,
.user-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.user-table tbody tr {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.user-table tbody tr:hover {
  background-color: #f2f2f2;
  transform: translateX(2px);
}

.icon-btn {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: transform 0.2s ease;
}

.icon-btn:hover {
  transform: scale(1.1);
}

.etat.active {
  color: green;
  font-weight: bold;
}

.etat.inactive {
  color: red;
  font-weight: bold;
}
</style>
