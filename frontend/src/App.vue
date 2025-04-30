<script setup>
import Home from './components/Home.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <v-app>
    <!-- GNB -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/about">About</v-btn>
      <v-btn text to="/contact">Contact</v-btn>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer app color="grey lighten-3">
      <v-container>
        <v-row justify="center">
          <v-col class="text-center" cols="12">
            © {{ new Date().getFullYear() }} My App. All rights reserved.
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
</style>
