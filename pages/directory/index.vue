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
        <DeveloperSearch @send-availability="onAvailabilitySelected" />
        <DeveloperInformation />
      </div>
    </div>
  </div>
</template>
<script setup>
// Components
const DeveloperList = defineAsyncComponent(() =>
  import("@/components/directory/DeveloperList.vue")
);

const SearchResult = defineAsyncComponent(() =>
  import("@/components/directory/SearchResult.vue")
);

const DeveloperInformation = defineAsyncComponent(() =>
  import("@/components/directory/DeveloperInformation.vue")
);

const DeveloperSearch = defineAsyncComponent(() =>
  import("@/components/directory/DeveloperSearch.vue")
);

const developers = ref([]);
const loading = ref(true);
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const lastDeveloperUuid = ref(null);
const availabilityId = ref(null);
const availability = ref(null);
const availabilityName = ref(null);

const searchTerm = ref("");

watch(
  () => route.query.search,
  (newValue) => {
    searchTerm.value = newValue || "";

    if (availability.value) {
      onAvailabilitySelected(availability.value);
    }
  }
);

const onAvailabilitySelected = (selectedAvailability) => {
  if (selectedAvailability) {
    availability.value = selectedAvailability;
    availabilityName.value = selectedAvailability.name;
    availabilityId.value = selectedAvailability.id;
  }
};

const userId = computed(() => {
  return auth.user ? auth.user?.id : 0;
});

const loadDevelopers = async () => {
  try {
    loading.value = true;

    let apiUrl =
      "/api/directory/developers/" +
      userId.value +
      "?search=" +
      searchTerm.value;

    if (availabilityId.value) {
      apiUrl += "&availability=" + availabilityId.value;
    }

    const { data } = await useApiFetch(apiUrl);

    developers.value = data.value.data;

    if (developers.value.length > 0) {
      lastDeveloperUuid.value = developers.value[0].uuid;
    }

    router.push({
      query: {
        developer: lastDeveloperUuid.value,
        search: searchTerm.value,
        availability: availabilityName.value,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

watchEffect(
  () => {
    if (userId.value !== null || searchTerm.value !== "") {
      loadDevelopers();
    }
  },
  { flush: "sync" }
);
</script>
