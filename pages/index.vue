<script setup>
import Hero from "~/components/home/Hero.vue";

const auth = useAuthStore();
</script>

<template>
  <Hero :auth="auth" />
</template>

<style scoped></style>
