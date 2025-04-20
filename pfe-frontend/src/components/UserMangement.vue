<template>
    <div class="container">
      <h2>{{ isEditing ? "Modifier un utilisateur" : "Ajouter un utilisateur" }}</h2>
  
      <div class="form">
        <input v-model="newUser.name" placeholder="Nom" />
        <input v-model="newUser.email" placeholder="Email" />
        <input v-model="newUser.etat" placeholder="État" />
        <input v-model="newUser.password" placeholder="Mot de passe" type="password" />
        <input v-model="newUser.id_role" placeholder="ID du rôle" type="number" />
  
        <div class="form-buttons">
          <button v-if="isEditing" @click="updateUser">💾 Mettre à jour</button>
          <button v-else @click="addUser">➕ Ajouter</button>
        </div>
      </div>
  
      <h2>Liste des utilisateurs</h2>
      <table>
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
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.etat }}</td>
            <td>
              <button class="edit" @click="editUser(user)">📝</button>
              <button class="delete" @click="deleteUser(user.id)">🗑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const users = ref([]);
  const newUser = ref({ id: null, name: "", email: "", etat: "", password: "", id_role: null });
  const isEditing = ref(false);
  
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
  };
  
  onMounted(fetchUsers);
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
  }
  
  h2 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  input {
    flex: 1 1 30%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .form-buttons {
    width: 100%;
    margin-top: 10px;
  }
  
  button {
    padding: 8px 12px;
    margin-right: 8px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .edit {
    background-color: #ffc107;
  }
  
  .delete {
    background-color: #dc3545;
    color: white;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
  }
  
  th {
    background-color: #f8f8f8;
  }
  </style>