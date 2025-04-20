<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/airalgerie.jpg" alt="Logo Air Algérie" />
      </div>
      <ul class="menu">
        <li
          v-for="(menu, index) in menus"
          :key="index"
          class="menu-item"
          @mouseover="setActiveMenu(index)"
          @mouseleave="startCloseTimeout"
        >
          <template v-if="menu.submenus.length > 0">
            <button>
              {{ menu.title }}
              <span class="arrow" :class="{ rotated: activeMenu === index }">▼</span>
              <div class="underline" v-if="hoveredMenu === index"></div>
            </button>
          </template>
          <template v-else>
            <router-link :to="menu.link" class="menu-link">
              {{ menu.title }}
              <div class="underline" v-if="hoveredMenu === index"></div>
            </router-link>
          </template>
        </li>
        <li class="user-email" @mouseover="toggleLogoutMenu" @mouseleave="startCloseTimeout">
          {{ userEmail }}
        </li>
      </ul>
    </nav>

    <!-- Sous-menu de déconnexion -->
    <div
      class="submenu-container"
      v-if="showLogoutMenu"
      @mouseover="clearCloseTimeout"
      @mouseleave="startCloseTimeout"
    >
      <ul class="submenu">
        <li @click="logout">Déconnexion</li>
      </ul>
    </div>

    <!-- Sous-menu affiché sous la barre -->
    <div
      class="submenu-container"
      v-if="activeMenu !== null && menus[activeMenu].submenus.length > 0"
      @mouseover="clearCloseTimeout"
      @mouseleave="startCloseTimeout"
    >
      <ul class="submenu">
        <li v-for="(submenu, subIndex) in menus[activeMenu].submenus" :key="subIndex">
          <router-link :to="submenu.link">
            {{ submenu.title }}
            <div class="underline" v-if="hoveredSubIndex === subIndex"></div>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: null,
      hoveredMenu: null,
      hoveredSubIndex: null,
      closeTimeout: null,
      menus: [],
      userEmail: "",
      showLogoutMenu: false,
    };
  },
  mounted() {
    const role = parseInt(localStorage.getItem("role"));
    this.setMenuByRole(role);
    this.fetchUserEmail(role);
  },
  methods: {
    async fetchUserEmail(role) {
      try {
        let email = "";
        if (role === 1) email = "admin@example.com";
        else if (role === 2) email = "agent@example.com";
        this.userEmail = email;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'email :", error);
      }
    },
    logout() {
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      this.$router.push("/");
    },
    toggleLogoutMenu() {
      this.showLogoutMenu = true;
    },
    setActiveMenu(index) {
      this.activeMenu = index;
      this.hoveredMenu = index;
      this.clearCloseTimeout();
    },
    startCloseTimeout() {
      this.closeTimeout = setTimeout(() => {
        this.activeMenu = null;
        this.showLogoutMenu = false;
      }, 300);
    },
    clearCloseTimeout() {
      clearTimeout(this.closeTimeout);
    },
    setMenuByRole(role) {
      if (role === 1) {
        // 🔑 Admin menu
        this.menus = [
          { title: "User Management", link: "/users", submenus: [] },
          {
            title: "Table de referance",
            submenus: [
              { title: "Ajouter un utilisateur", link: "/admin-add-user" },
              { title: "Liste des utilisateurs", link: "/admin-users" },
            ],
          },
          {
            title: "Statistiques",
            submenus: [
              { title: "Par utilisateur", link: "/stats/users" },
              { title: "Par vols", link: "/stats/vols" },
            ],
          },
        
        ];
      } else if (role === 2) {
        // 🔑 Agent menu
        this.menus = [
          { title: "G personnel navigant", link: "/pn-manager", submenus: [] },
          {
            title: "G vols réel",
            submenus: [
              { title: "Saisie feuille d’instruction", link: "/vols-reel" },
              { title: "Gestion des vols réel", link: "/voltable" },
            ],
          },
          {
            title: "G vol de simulation",
            submenus: [
              { title: "Formulaire simulation", link: "/simulation" },
              { title: "Table simulation", link: "/tablesimu" },
            ],
          },
          {
            title: "Activité",
            submenus: [
              { title: "Nature", link: "/actnature" },
              { title: "Num vol", link: "/actnumvol" },
              { title: "Avion", link: "/actavion" },
              { title: "PNC par secteur", link: "/actpnc" },
              { title: "PNT par secteur", link: "/actpnt" },
              { title: "simulation PNt par secteur ", link: "/actsim" },
              { title: "PN ", link: "/actpn" },
            ],
          },
        ];
      } else {
        this.menus = [];
      }
    },
  },
};
</script>

<style scoped>
/* Styling kept as is (unchanged) */
header {
  background: #fff;
  padding: 5px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo img {
  height: 70px;
}

.menu {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  position: relative;
}

.menu-item {
  position: relative;
  margin: 0 15px;
}

.menu-item button,
.menu-link {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px 15px;
  transition: color 0.3s ease-in-out;
  text-decoration: none;
  color: #333;
  position: relative;
}

.menu-item button:hover,
.menu-link:hover {
  color: red;
}

.underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: red;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.submenu-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-top: 2px solid red;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submenu {
  display: flex;
  list-style: none;
  gap: 30px;
}

.submenu li {
  position: relative;
}

.submenu li a {
  display: block;
  padding: 8px 15px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.submenu li a:hover {
  color: red;
}

.submenu li a .underline {
  bottom: -2px;
}

.arrow {
  font-size: 12px;
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}

.user-email {
  font-weight: bold;
  margin-left: 20px;
  color: #555;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }

  .menu {
    flex-direction: column;
    gap: 10px;
  }

  .submenu-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
