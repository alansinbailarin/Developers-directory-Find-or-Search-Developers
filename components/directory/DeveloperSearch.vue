<template>
  <section class="flex items-center justify-between gap-3">
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
        class="block w-full ps-10 text-gray-900 border border-gray-300 rounded-full bg-gray-50"
        placeholder="Search by title, name..."
        v-model="search"
      />
    </div>
    <div>
      <button type="button" class="text-gray-700" @click="toggleFilters()">
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
    <transition :duration="550" name="nested">
      <Dropdown
        v-show="filtersOpen"
        dropdown="filters-open"
        class="right-4 md:right-52 px-2 py-2 mt-20 text-sm text-gray-700"
      >
        <div class="flex items-center">
          <div class="mr-3">
            <span>Availability:</span>
          </div>

          <button
            class="flex items-center gap-1"
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

          <div>
            <transition :duration="550" name="nested">
              <Dropdown
                v-show="openStatusesDropdown"
                dropdown="availability-open"
                class="right-0 px-2 py-2 mt-5 text-sm"
              >
                <div>
                  <button
                    class="w-full py-1"
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
      </Dropdown>
    </transition>
  </section>
</template>
<script setup>
import Dropdown from "../Dropdown.vue";
const router = useRouter();
const route = useRoute();
const filtersOpen = useLocalStorage(false, "filtersOpen");
const search = useLocalStorage("", "search");
const availability = useLocalStorage("", "availability");
const loadingStatus = ref(true);
const statuses = ref([]);
const openStatusesDropdown = useLocalStorage(false, "openStatusesDropdown");
const availabilityId = useLocalStorage(null, "availabilityId");

const emit = defineEmits(["send-availability"]);

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
};

const toggleStatusesDropdown = () => {
  openStatusesDropdown.value = !openStatusesDropdown.value;
};

const selectAvailability = (selectedStatus) => {
  availability.value = selectedStatus.name;
  availabilityId.value = selectedStatus.id;
  router.push({
    query: {
      developer: currentUuid.value,
      search: search.value,
      availability: selectedStatus.name,
    },
  });

  emit("send-availability", selectedStatus);
};

watch(search, (value) => {
  router.push({
    query: {
      developer: currentUuid.value,
      search: value,
      availability: availability.value,
    },
  });
});

watchEffect(() => {
  loadUserStatus();
});
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
</style>
