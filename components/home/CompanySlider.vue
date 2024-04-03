<template>
  <div class="flex overflow-hidden space-x-16">
    <div class="flex space-x-5 md:space-x-7 animate-loop-scroll">
      <NuxtLink
        class="relative h-60 w-80 md:h-80 md:w-[27rem] rounded-3xl overflow-hidden"
        v-for="company in companies"
        :key="company.id"
        :to="`/company/profile/${company.slug}`"
      >
        <img
          :src="company.banner"
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
            <div class="mb-2">
              <picture>
                <source :srcset="company.logo" type="image/webp" />
                <img
                  :src="company.logo"
                  class="w-14 h-14 rounded-md object-cover"
                  :alt="`${company.name} logo`"
                />
              </picture>
            </div>
            <h3 class="font-medium text-white text-sm">
              {{ company.name }}
            </h3>
            <p class="text-gray-100 text-sm font-light line-clamp-2">
              {{ company.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const companies = ref([]);
const loading = ref(true);

const loadCompanies = async () => {
  try {
    loading.value = true;
    const { data } = await useApiFetch("/api/company/companies");

    companies.value = data.value.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }

  console.log(companies.value);
};

onMounted(() => {
  loadCompanies();
});
</script>

<style scoped></style>
