<template>
  <div class="user-management">
    <!-- Header -->
    <header class="header">
      <!-- Account Profile Icon -->
      <img
        class="account-icon"
        src="@/assets/icons/icons8-account-48.png"
        alt="Account Profile"
        @click="goToAccountPage"
      />
      <!-- Title -->
      <h1 class="title">User Management</h1>
      <!-- Logo -->
      <img
        class="logo"
        src="@/assets/airalgerie.jpg"
        alt="Air Algerie Logo"
      />
    </header>

    <!-- Red Separator Line -->
    <div class="separator"></div>

    <!-- Navigation Menu -->
    <nav class="menu-bar">
      <ul class="menu-list">
        <li class="menu-item">
          <a href="/dashboard" class="menu-link" :class="{ active: isActive('dashboard') }">Dashboard</a>
        </li>
        <li class="menu-item">
          <a href="/user-management" class="menu-link" :class="{ active: isActive('user-management') }">User Management</a>
        </li>
        <li class="menu-item">
          <a href="/reference-tables" class="menu-link" :class="{ active: isActive('reference-tables') }">Reference Tables</a>
        </li>
      </ul>
    </nav>

    <!-- Search Bar and Add User Button -->
    <div class="controls">
      <div class="search-bar">
        <img class="search-icon" src="@/assets/icons8-search-32.png" alt="Search Icon" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for a user..."
        />
      </div>
      <button class="add-user-btn" @click="addUser">Add User</button>
    </div>

    <!-- User List Table -->
    <table class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>State</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button
              :class="{'state-btn active': user.state === 'Active', 'state-btn inactive': user.state === 'Inactive'}"
              @click="toggleUserState(user)"
            >
              {{ user.state }}
            </button>
          </td>
          <td>
            <button class="action-btn modify" @click="editUser(user)"></button>
            <button class="action-btn delete" @click="deleteUser(user)"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "UserManagement",
  data() {
    return {
      searchQuery: "",
      users: [] // Initially empty – data will be fetched from the API
    };
  },
  created() {
    // Fetch users from the database when the component is created
    this.fetchUsers();
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        // Assuming the database returns fields "username" and "email"
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch("http://localhost:8080/api/users");
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    goToAccountPage() {
      this.$router.push("/account");
    },
    isActive(page) {
      return this.$route.path.includes(page);
    },
    addUser() {
      alert("Add User button clicked! Implement your logic here.");
    },
    toggleUserState(user) {
      user.state = user.state === "Active" ? "Inactive" : "Active";
    },
    editUser(user) {
      alert(`Edit User: ${user.username}`);
    },
    deleteUser(user) {
      const confirmed = confirm(`Are you sure you want to delete ${user.username}?`);
      if (confirmed) {
        // Optionally, you can call an API to delete the user from the backend.
        this.users = this.users.filter((u) => u.id !== user.id);
      }
    },
  },
};
</script>

<style scoped>
/* General Container */
.user-management {
  font-family: "Inter", sans-serif;
  background: #fff;
  color: #000;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
}

.account-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: #000;
  text-align: center;
}

.logo {
  width: 200px;
  height: auto;
  object-fit: contain;
}

/* Separator Line */
.separator {
  width: 100%;
  max-width: 1343px;
  border: none;
  border-top: 3px solid #bb1212;
  margin: 20px auto;
}

/* Navigation Menu */
.menu-bar {
  margin-top: 10px;
  margin-bottom: 40px; /* Increased spacing below the menu */
}

.menu-list {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  flex: 1;
  text-align: center;
}

.menu-link {
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  position: relative;
  padding: 10px 0;
}

.menu-link::after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background: #bb1212; /* Red underline */
  position: absolute;
  bottom: -3px;
  left: 0;
}

/* Controls Section */
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 3px solid #bb1212;
  background: #d9d9d9;
  padding: 10px;
  border-radius: 8px;
}

.search-icon {
  width: 30px;
  height: 30px;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  flex-grow: 1;
}

/* Add User Button */
.add-user-btn {
  background: #bb1212;
  color: white;
  border: none;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

/* User Table */
.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 10px;
  border-bottom: 2px solid black;
}

.user-table th {
  font-size: 18px;
  font-weight: 700;
  background: #ffffff; /* Light background for headers */
}

/* State Buttons */
.state-btn {
  display: flex;
width: 192px;
height: 49px;
padding: 10px 39px;
justify-content: center;
align-items: center;
gap: 10px;
flex-shrink: 0;
color: #FFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: Inter;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
}

.state-btn.active {
  border-radius: 15px;
background: #8DCB77;
box-shadow: 0px 4px 4px 0px rgba(63, 61, 61, 0.25) inset;
}

.state-btn.inactive {
  border-radius: 15px;
background: #C21717;
box-shadow: 0px 4px 4px 0px rgba(63, 61, 61, 0.25) inset;
}

/* Action Buttons */
.action-btn {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.action-btn.modify {
  background-image: url('@/assets/icons/icons8-modify-24.png');
}

.action-btn.delete {
  background-image: url('@/assets/icons/icons8-delete-30.png');
}
</style>

