<template>
  <div id="app">
    <!-- Router View dynamically loads the component matching the current route -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Global styles to make the app fill the entire screen */
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%; /* Ensures the app always takes the full height of the viewport */
  width: 100%; /* Ensures the app always takes the full width of the viewport */
  overflow: hidden; /* Avoid scrolling */
}
</style>