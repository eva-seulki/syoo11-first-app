<template>
  <v-container class="mt-10">
    <v-row justify="center" align="stretch" dense>
      <v-col cols="12" md="4" v-for="n in 3" :key="n">
        <v-card>
          <v-img :src="`https://picsum.photos/500/300?random=${n}`" height="200px" />
          <v-card-title>Feature {{ n }}</v-card-title>
          <v-card-text>This is a short description of feature {{ n }}.</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text>Learn More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
</script>

<style scoped>
</style>