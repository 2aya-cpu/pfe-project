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

    <!-- Déconnexion -->
    <div class="submenu-container" v-if="showLogoutMenu" @mouseover="clearCloseTimeout" @mouseleave="startCloseTimeout">
      <ul class="submenu">
        <li @click="logout">Déconnexion</li>
      </ul>
    </div>

    <!-- Sous-menu standard -->
    <div
      class="submenu-container"
      v-if="activeMenu !== null && menus[activeMenu].submenus.length > 0 && menus[activeMenu].title !== 'Table de referance'"
      @mouseover="clearCloseTimeout"
      @mouseleave="startCloseTimeout"
    >
      <ul class="submenu">
        <li v-for="(submenu, subIndex) in menus[activeMenu].submenus" :key="subIndex">
          <router-link :to="submenu.link">{{ submenu.title }}</router-link>
        </li>
      </ul>
    </div>

    <!-- Mega Menu for "Table de referance" -->
    <div
      class="mega-menu"
      v-if="activeMenu !== null && menus[activeMenu].title === 'Table de referance'"
      @mouseover="clearCloseTimeout"
      @mouseleave="startCloseTimeout"
    >
      <div class="mega-column" v-for="(chunk, i) in chunkedSubmenus" :key="i">
        <ul>
          <li v-for="(item, index) in chunk" :key="index">
            <router-link :to="item.link">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      activeMenu: null,
      hoveredMenu: null,
      closeTimeout: null,
      menus: [],
      userEmail: "",
      showLogoutMenu: false,
    };
  },
  computed: {
    chunkedSubmenus() {
      const submenus = this.menus[this.activeMenu]?.submenus || [];
      const chunkSize = 4;
      const chunks = [];
      for (let i = 0; i < submenus.length; i += chunkSize) {
        chunks.push(submenus.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  mounted() {
    const role = parseInt(localStorage.getItem("role"));
    this.setMenuByRole(role);
    this.fetchUserEmail(role);
  },
  methods: {
    async fetchUserEmail(role) {
      try {
        let email = role === 1 ? "admin@example.com" : "agent@example.com";
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
        this.menus = [
          { title: "user management", link: "/users", submenus: [] },
          {
            title: "Table de referance",
            submenus: [
              { title: "nature de vol", link: "/naturevol" },
              { title: "Type avion", link: "/typeavion" },
              { title: "grades", link: "/grade" },
              { title: "contrats", link: "/contrats" },
              { title: "role", link: "/role" },
              { title: "Reseaux", link: "/reseau" },
              { title: "escale", link: "/escale" },
              { title: "type simulation", link: "/typesimulation" },
              { title: "simulateur", link: "/simulateur" },
              { title: "troncons", link: "/troncon" },
              { title: "bases", link: "/bases" },
              { title: "position", link: "/position" },
            ],
          },
        ];
      } else if (role === 2) {
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
              { title: "simulation PNt par secteur", link: "/actsim" },
              { title: "PN", link: "/actpn" },
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
/* Navbar and layout */
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
  margin: 0;
  gap: 30px; /* Ensure consistent spacing between menu items */
}

.menu-item {
  display: flex;
  align-items: center;
  height: 100%;
}

.menu-item button,
.menu-link {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease-in-out;
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

.arrow {
  font-size: 12px;
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.rotated {
  transform: rotate(180deg);
}

/* Ensure the user-email is correctly aligned */
.user-email {
  font-weight: bold;
  margin-left: 20px;
  color: #555;
  display: flex;
  align-items: center; /* Ensure it aligns with other items */
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

.submenu {
  display: flex;
  list-style: none;
  gap: 30px;
}

.submenu li a {
  display: block;
  padding: 8px 15px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.submenu li a:hover {
  color: red;
}

/* ✅ Mega Menu */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  padding: 30px;
  border-top: 2px solid red;
  display: flex;
  justify-content: center;
  gap: 60px;
  animation: fadeIn 0.3s ease-in-out;
}

.mega-column {
  flex: 1;
  max-width: 200px;
}

.mega-column ul {
  list-style: none;
  padding: 0;
}

.mega-column li {
  margin-bottom: 10px;
}

.mega-column a {
  color: black;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.mega-column a:hover {
  color: red;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }

  .menu {
    flex-direction: column;
    gap: 10px;
  }

  .submenu-container,
  .mega-menu {
    position: relative;
    top: 0;
    left: 0;
    flex-direction: column;
  }
}
</style>
