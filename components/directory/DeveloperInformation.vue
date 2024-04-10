<template>
  <section
    v-if="developer && !loading"
    class="mt-6 overflow-y-auto h-[65vh] scroll-styling rounded-lg bg-gray-50 shadow-sm p-6"
  >
    <div class="flex items-center gap-4 justify-between">
      <div class="flex items-center gap-3">
        <div>
          <picture v-if="developer.avatar">
            <source :srcset="developer.avatar" type="image/webp" />
            <img
              :src="developer.avatar"
              :alt="developer.name + ' ' + developer.surname + ' avatar'"
              class="min-w-16 max-w-16 h-16 rounded-2xl"
            />
          </picture>
          <div
            v-else
            class="min-w-14 max-w-14 h-14 rounded-2xl justify-center items-center flex bg-gray-100 font-medium text-center text-gray-500 text-xl"
          >
            {{ initials.getInitials(developer.name, developer.surname) }}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="">
            <h1
              v-if="developer.user_information?.title"
              class="text-gray-900 font-medium"
            >
              {{ developer.user_information?.title }}
            </h1>
            <h1 v-else class="text-gray-900 font-medium">Developer</h1>
          </div>
          <div class="font-semibold text-sm text-gray-600">
            <h1>{{ developer.name }} {{ developer.surname }}</h1>
          </div>
        </div>
      </div>
      <div>
        <button class="text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
  <section
    v-else
    class="flex items-center justify-center mt-6 h-[65vh] rounded-lg bg-gray-50 shadow-sm p-6"
  >
    <Loader />
  </section>
</template>
<script setup>
const router = useRouter();
const developer = ref(null);
const loading = ref(true);
const initials = useGetInitials();

const currentUuid = computed(() => {
  return router.currentRoute.value.query.developer;
});

const loadDeveloper = async () => {
  try {
    loading.value = true;
    const { data } = await useApiFetch(
      "/api/directory/developer/info/" + currentUuid.value
    );

    developer.value = data?.value.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  if (currentUuid.value) {
    loadDeveloper();
  }
});
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.scroll-styling {
  scroll-behavior: smooth;
}
</style>
