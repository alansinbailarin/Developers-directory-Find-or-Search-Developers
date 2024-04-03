<template>
  <div class="flex overflow-hidden space-x-16 group">
    <div
      class="flex space-x-5 md:space-x-7 animate-loop-scroll group-hover:paused"
    >
      <div v-if="loading">loading</div>
      <NuxtLink
        v-else
        class="relative h-60 w-52 md:h-80 md:w-72 rounded-3xl overflow-hidden"
        v-for="user in users"
        :key="user.id"
        :to="`/directory/profile/${user.username}`"
      >
        <img
          :src="user.avatar"
          class="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div
          class="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-4"
          style="
            background-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(1, 1, 1, 0.6) 100%
            );
          "
        >
          <div class="text-left">
            <h3 class="font-medium text-white text-sm">
              {{ user.name }} {{ user.surname }}
            </h3>
            <p class="text-gray-100 font-light text-sm">
              {{ user.user_information?.title }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const users = ref([]);
const loading = ref(true);

const loadDevelopers = async () => {
  try {
    loading.value = true;
    const { data } = await useApiFetch("/api/directory/last-twenty-developers");

    users.value = data.value.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }

  console.log(users.value);
};

onMounted(() => {
  loadDevelopers();
});
</script>

<style scoped></style>
