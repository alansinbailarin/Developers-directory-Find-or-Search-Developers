<script setup>
const form = ref({
  email: "agpsalgado@gmail.com",
  password: "123123123.",
});

const auth = useAuthStore();

async function handleLogin() {
  if (auth.isLoggedIn) {
    return navigateTo("/");
  }

  const { error } = await auth.login(form.value);

  if (!error.value) {
    return navigateTo("/");
  }

  console.error(error);
}
</script>

<template>
  <form @submit.prevent="handleLogin()">
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
definePageMeta({
  middleware: ["guest"],
});
</script>

<style scoped></style>
