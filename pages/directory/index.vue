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
    <div class="md:flex items-center gap-4 my-8">
      <div class="md:w-2/6">
        <SearchResult :developersTotalCount="developersTotalCount" />
        <div class="mt-5">
          <DeveloperList
            :developers="developers"
            :developersData="developersData"
            @next-page="onLoadNextPage"
          />
        </div>
      </div>
      <div class="md:w-4/6">
        <DeveloperSearch
          @send-availability="onAvailabilitySelected"
          @send-order="onOrderSelected"
          @user-typing="handleTyping"
          @reload-filters="onReloadFilters"
        />
        <DeveloperInformation class="hidden md:block" />
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
const developersData = ref([]);
const loading = ref(true);
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const lastDeveloperUuid = ref(null);
const availabilityId = ref(null);
const availability = ref(null);
const availabilityName = ref(null);
const order = ref(null);
const orderName = ref(null);
const orderValue = ref(null);
const nextPage = ref(0);
const developersTotalCount = ref(0);
const searchTerm = ref("");
const isTyping = ref(false);
const reloadFilters = ref(false);

const page = computed(() => {
  return developersData.value.current_page;
});

watch(
  () => route.query.search,
  (newValue) => {
    searchTerm.value = newValue || "";
  }
);

const onLoadNextPage = (_nextPage) => {
  nextPage.value = _nextPage;

  loadDevelopers(nextPage);
};

const onAvailabilitySelected = (selectedAvailability) => {
  if (selectedAvailability) {
    availability.value = selectedAvailability;
    availabilityName.value = selectedAvailability.name;
    availabilityId.value = selectedAvailability.id;

    loadDevelopers(page.value);
  }
};

const onReloadFilters = (reload) => {
  reloadFilters.value = reload;
};

const onOrderSelected = (selectedOrder) => {
  if (selectedOrder) {
    order.value = selectedOrder;
    orderName.value = selectedOrder.name;
    orderValue.value = selectedOrder.value;

    loadDevelopers(page.value);
  }
};

const handleTyping = (typing) => {
  isTyping.value = typing;
};

const userId = computed(() => {
  return auth.user ? auth.user?.id : 0;
});

const loadDevelopers = async (_page) => {
  try {
    loading.value = true;

    if (!isTyping.value) {
      if (nextPage.value > page.value) {
        _page = nextPage.value;
      } else {
        _page = page.value;
      }
    } else {
      _page = 1;
      if (nextPage.value) {
        nextPage.value = 1;
      }
    }

    if (reloadFilters.value) {
      _page = 1;

      reloadFilters.value = false;
    }

    if (_page === 1) {
      developers.value = [];
    }

    let apiUrl =
      "/api/directory/developers/" +
      userId.value +
      "?search=" +
      searchTerm.value;

    if (availabilityId.value) {
      apiUrl += "&availability=" + availabilityId.value;
    }

    if (orderValue.value) {
      apiUrl += "&order=" + orderValue.value;
    }

    if (_page) {
      apiUrl += "&page=" + _page;
    }

    const { data } = await useApiFetch(apiUrl);

    const newDevelopers = data.value.data.data.filter((newDev) => {
      return !developers.value.some((dev) => dev.id === newDev.id);
    });

    developers.value = developers.value.concat(newDevelopers);
    developersTotalCount.value = data.value.data.total;

    developersData.value = data.value.data;

    console.log("Mi developers:", developers.value);

    if (developers.value.length > 0) {
      lastDeveloperUuid.value = developers.value[0].uuid;
    }

    router.push({
      query: {
        developer: lastDeveloperUuid.value,
        search: searchTerm.value,
        availability: availabilityName.value,
        order: orderName.value,
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
