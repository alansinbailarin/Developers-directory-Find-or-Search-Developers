<script setup>
import { initFlowbite } from "flowbite";

const auth = useAuthStore();

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div>
    <Navbar :auth="auth" />
    <slot />
  </div>
</template>

<style scoped></style>
