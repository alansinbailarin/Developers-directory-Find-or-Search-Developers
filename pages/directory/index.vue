<template>
  <div class="px-5 md:px-52 py-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-gray-900 font-medium text-2xl">
          Stay connected with the best developers
        </h1>
      </div>
      <div class="flex items-center gap-3">
        <div>Img</div>
        <div>Img</div>
      </div>
    </div>
    <div class="flex items-center gap-4 my-8">
      <div class="w-2/6">
        <SearchResult :developers="developers" />
        <div class="mt-5">
          <DeveloperList :developers="developers" />
        </div>
      </div>
      <div class="w-4/6">
        <div class="px-6 py-3">Aqui ira el buscador con los filtros</div>
        <div class="mt-6">Aqui el detalle del developer</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import DeveloperList from "@/components/directory/DeveloperList.vue";
import SearchResult from "@/components/directory/SearchResult.vue";

const developers = ref([]);
const loading = ref(true);
const auth = useAuthStore();

const userId = computed(() => {
  return auth.user ? auth.user?.id : 0;
});

const loadDevelopers = async () => {
  try {
    loading.value = true;
    const { data } = await useApiFetch("/api/directory/developers/" + userId);

    developers.value = data.value.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  loadDevelopers();
}, [userId]);
</script>
