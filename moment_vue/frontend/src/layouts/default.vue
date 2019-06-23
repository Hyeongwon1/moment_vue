<template>
  <div id="app">
    <header />
    <sidebar />
    <div class="container">
      <router-view />
    </div>
    <footer />
  </div>
</template>

<script>
  export default {
    name: 'default' // id of the layout (required)
  }
</script>

<style>
/* your style */
</style>