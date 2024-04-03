<script setup>
const form = ref({
  name: "",
  surname: "",
  username: "",
  user_type_id: 0,
  email: "",
  password: "",
  password_confirmation: "",
});

const auth = useAuthStore();

async function handleRegister() {
  const { error } = await auth.register(form.value);

  if (!error.value) {
    navigateTo("/");
  }

  console.error(error);
}
</script>

<template>
  <form @submit.prevent="handleRegister()">
    <input type="text" v-model="form.name" />
    <input type="text" v-model="form.surname" />
    <input type="text" v-model="form.username" />
    <input type="number" v-model="form.user_type_id" />
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <input type="password" v-model="form.password_confirmation" />
    <button type="submit">Register</button>
  </form>
</template>

<script>
definePageMeta({
  middleware: ["guest"],
});
</script>

<style scoped></style>
