<template>
  <section class="flex items-center justify-between gap-3 md:mt-0 mt-5">
    <div class="relative w-full">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        class="block w-full ps-10 text-gray-900 border border-gray-100 rounded-full bg-gray-50"
        placeholder="Search by title, name..."
        v-model="search"
        @input="onSearchInput"
      />
    </div>
    <div class="">
      <button
        type="button"
        class="text-gray-500 bg-gray-50 p-2 border border-gray-100 rounded-md hover:bg-gray-100 transition-colors ease-in-out duration-300"
        @click="toggleFilters()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
    </div>

    <div
      v-show="filtersOpen"
      class="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <transition name="bounce">
        <div
          v-show="filtersOpen"
          class="bg-white rounded-lg shadow-lg max-w-sm md:max-w-lg w-full md:text-sm"
        >
          <div
            class="p-4 flex items-center justify-between border bg-gray-50 border-b-gray-100 rounded-t-lg"
          >
            <h3 class="md:text-sm font-bold text-gray-800">Filters settings</h3>
            <button @click="toggleFilters()" class="text-gray-600">
              <svg
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4">
            <!-- Contenido del modal -->
            <div class="flex items-center mb-3 justify-between">
              <div class="md:text-sm">
                <h1 class="font-medium text-gray-800">Availability</h1>
                <p class="text-gray-400 font-light">
                  Search developers by status.
                </p>
              </div>
              <div>
                <div class="relative">
                  <button
                    class="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded border border-gray-200"
                    @click="toggleStatusesDropdown()"
                  >
                    {{ availability || "Options" }}
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                        :class="{
                          'transform rotate-180 transition-all ease-in-out duration-300':
                            openStatusesDropdown,
                          'transform rotate-0 transition-all ease-in-out duration-300':
                            !openStatusesDropdown,
                        }"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>

                  <transition :duration="550" name="nested">
                    <Dropdown
                      v-show="openStatusesDropdown"
                      dropdown="availability-open"
                      class="absolute mt-1 px-4 py-1 right-0 md:text-sm"
                    >
                      <div class="flex flex-col">
                        <button
                          class="py-0.5"
                          type="button"
                          v-for="status in statuses"
                          @click="selectAvailability(status)"
                        >
                          {{ status.name }}
                        </button>
                      </div>
                    </Dropdown>
                  </transition>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="md:text-sm">
                <h1 class="font-medium text-gray-800">Order</h1>
                <p class="text-gray-400 font-light">Choose the list order.</p>
              </div>
              <div>
                <div class="relative">
                  <button
                    class="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded border border-gray-200"
                    @click="toggleOrderDropdown()"
                  >
                    {{ order || "Options" }}
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                        :class="{
                          'transform rotate-180 transition-all ease-in-out duration-300':
                            openOrderDropdown,
                          'transform rotate-0 transition-all ease-in-out duration-300':
                            !openOrderDropdown,
                        }"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </button>

                  <transition :duration="550" name="nested">
                    <Dropdown
                      v-show="openOrderDropdown"
                      dropdown="availability-open"
                      class="absolute mt-1 px-4 py-1 right-0 md:text-sm"
                    >
                      <div class="flex flex-col">
                        <button
                          class="py-0.5"
                          type="button"
                          v-for="order in orderes"
                          @click="selectOrder(order)"
                        >
                          {{ order.name }}
                        </button>
                      </div>
                    </Dropdown>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>
<script setup>
import Dropdown from "../Dropdown.vue";
const router = useRouter();
const route = useRoute();
const filtersOpen = useLocalStorage(false, "filtersOpen");
const search = useLocalStorage("", "search");
const isTyping = ref(false);
const availability = useLocalStorage("", "availability");
const loadingStatus = ref(true);
const statuses = ref([]);
const openStatusesDropdown = useLocalStorage(false, "openStatusesDropdown");
const openOrderDropdown = useLocalStorage(false, "openOrderDropdown");
const availabilityId = useLocalStorage(null, "availabilityId");
const order = useLocalStorage("", "order");
const orderKey = useLocalStorage("", "orderKey");
const reloadFilters = ref(false);

const emit = defineEmits([
  "send-availability",
  "send-order",
  "user-typing",
  "reload-filters",
]);

const currentUuid = computed(() => {
  return router.currentRoute.value.query.developer;
});

const loadUserStatus = async () => {
  try {
    loadingStatus.value = true;
    const { data } = await useApiFetch("/api/statuses/all");

    statuses.value = data.value.data;
  } catch (error) {
    console.error(error);
  } finally {
    loadingStatus.value = false;
  }
};

const toggleFilters = () => {
  filtersOpen.value = !filtersOpen.value;

  if (!filtersOpen.value) {
    openStatusesDropdown.value = false;
    openOrderDropdown.value = false;
  }
};

const toggleStatusesDropdown = () => {
  openStatusesDropdown.value = !openStatusesDropdown.value;

  if (openOrderDropdown.value) {
    openOrderDropdown.value = false;
  }
};

const toggleOrderDropdown = () => {
  openOrderDropdown.value = !openOrderDropdown.value;

  if (openStatusesDropdown.value) {
    openStatusesDropdown.value = false;
  }
};

const selectAvailability = (selectedStatus) => {
  availability.value = selectedStatus.name;
  availabilityId.value = selectedStatus.id;
  reloadFilters.value = true;
  router.push({
    query: {
      developer: currentUuid.value,
      search: search.value,
      availability: selectedStatus.name,
      order: order.value,
    },
  });

  emit("send-availability", selectedStatus);
  emit("reload-filters", reloadFilters.value);
};

const selectOrder = (selectedOrder) => {
  order.value = selectedOrder.name;
  orderKey.value = selectedOrder.value;
  reloadFilters.value = true;

  router.push({
    query: {
      developer: currentUuid.value,
      search: search.value,
      availability: availability.value,
      order: selectedOrder.name,
    },
  });

  emit("send-order", selectedOrder);
  emit("reload-filters", reloadFilters.value);
};

watch(search, (value) => {
  router.push({
    query: {
      developer: currentUuid.value,
      search: value,
      availability: availability.value,
      order: order.value,
    },
  });
});

// If filtersOpen is false, close the openStatusesDropdown
watch(filtersOpen, (value) => {
  if (!value) {
    openStatusesDropdown.value = false;
  }
});

watchEffect(() => {
  loadUserStatus();
});

const orderes = [
  { name: "Newest", value: "desc" },
  { name: "Oldest", value: "asc" },
  { name: "Random", value: "random" },
];

const onSearchInput = () => {
  isTyping.value = true;

  emit("user-typing", isTyping.value);

  setTimeout(() => {
    isTyping.value = false;

    emit("user-typing", isTyping.value);
  }, 500);
};
</script>

<style scoped>
.outer,
.inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.inner {
  background: #ccc;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.25s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.15s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
  transition-delay: 0.1s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-out 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
