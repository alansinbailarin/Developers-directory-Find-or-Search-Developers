<template>
  <section
    v-if="!loading"
    class="flex flex-col px-5 py-3 mb-3 rounded-xl hover:cursor-pointer shadow-sm"
    :class="itemSelected ? 'bg-gray-100' : 'bg-gray-50'"
    @click="changeDeveloperProfile()"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div>
          <picture v-if="developer.avatar">
            <source :srcset="developer.avatar" type="image/webp" />
            <img
              :src="developer.avatar"
              :alt="developer.name + ' ' + developer.surname + ' avatar'"
              class="min-w-14 max-w-14 h-14 rounded-2xl"
            />
          </picture>
          <div
            v-else
            class="min-w-14 max-w-14 h-14 rounded-2xl justify-center items-center flex bg-gray-200 font-medium text-center text-gray-500 text-xl"
          >
            {{ initials.getInitials(developer.name, developer.surname) }}
          </div>
        </div>
        <div class="flex flex-col max-w-56">
          <div class="">
            <h1 class="text-sm text-gray-700 font-medium line-clamp-1">
              {{ developer.name }} {{ developer.surname }}
            </h1>
          </div>
          <div class="font-semibold text-sm text-gray-900 line-clamp-1">
            <h1 v-if="info?.title">{{ info?.title }}</h1>
            <h1 v-else>Developer</h1>
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
    <div class="grid grid-cols-3 pt-2 gap-2 text-xs">
      <div
        class="flex items-center justify-center bg-white px-4 py-2 rounded-full"
      >
        <span
          v-if="developer.user_salary?.hourly_rate"
          class="text-gray-700 font-medium"
          >${{ developer.user_salary?.hourly_rate }}
          <span class="font-normal">/H</span></span
        >
        <span v-else class="text-gray-700 font-medium">$NS</span>
      </div>
      <div
        class="flex items-center justify-center bg-white px-4 py-2 rounded-full"
      >
        <span v-if="developer.job_type?.name" class="text-gray-700 font-medium"
          >{{ developer.job_type?.name }}
        </span>
        <span v-else class="text-gray-700 font-medium">NS</span>
      </div>
      <div
        class="flex items-center justify-center bg-white px-4 py-2 rounded-full"
      >
        <span
          v-if="developer.skill_level?.name"
          class="text-gray-700 font-medium"
          >{{ developer.skill_level?.name }}
        </span>
        <span v-else class="text-gray-700 font-medium">NS</span>
      </div>
    </div>
    <div class="mt-2">
      <p
        v-if="info?.about"
        class="text-gray-600 text-sm line-clamp-4 font-light"
      >
        {{ info?.about }}
      </p>
      <p class="text-gray-600 text-sm line-clamp-4 font-light" v-else>
        Not description yet.
      </p>
      <hr class="my-3 h-0.5 bg-gray-100" />
      <div v-if="!loadingStatus" class="flex items-center gap-2">
        <span :class="userStatusClass" class="text-sm">{{
          userStatusText
        }}</span
        ><span
          class="inline-flex items-center animate-pulse justify-center w-2 h-2 text-xs mt-0.5 font-semibold rounded-full"
          :class="badgeStatusClass"
        >
        </span>
      </div>
      <div v-else>
        <div class="h-4 bg-gray-200 rounded-full w-32 animate-pulse"></div>
      </div>
    </div>
  </section>
  <section v-else>
    <div
      class="h-36 w-80 bg-gray-100 rounded-lg mb-3 animate-pulse flex items-center justify-center"
    ></div>
  </section>
</template>
<script setup>
const props = defineProps({
  developer: {
    type: Object,
    required: true,
  },
});

const initials = useGetInitials();
const loading = ref(true);
const loadingStatus = ref(true);
const info = ref(null);
const userStatus = ref(null);
const route = useRoute();
const router = useRouter();
const developerUuid = props.developer.uuid;

const currentSearchTerm = computed(() => {
  return router.currentRoute.value.query.search;
});

const currentAvailability = computed(() => {
  return router.currentRoute.value.query.availability;
});

const currentOrder = computed(() => {
  return router.currentRoute.value.query.order;
});

const changeDeveloperProfile = () => {
  router.push({
    query: {
      developer: developerUuid,
      search: currentSearchTerm.value,
      availability: currentAvailability.value,
      order: currentOrder.value,
    },
  });
};

const loadInformation = async () => {
  try {
    loading.value = true;
    const { data } = await useApiFetch(
      "/api/directory/developer/" + props.developer.id
    );

    info.value = data.value.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const itemSelected = computed(() => {
  return route.query.developer == developerUuid;
});

const loadUserStatus = async () => {
  try {
    loadingStatus.value = true;
    const { data } = await useApiFetch(
      "/api/status/" + props.developer.user_status_id
    );

    userStatus.value = data.value.data;
  } catch (error) {
    console.error(error);
  } finally {
    loadingStatus.value = false;
  }
};

const userStatusClass = computed(() => {
  switch (userStatus.value?.id) {
    case 1:
      return "text-green-500";
    case 2:
      return "text-red-500";
    case 3:
      return "text-yellow-400";
    default:
      return "text-gray-500";
  }
});

const badgeStatusClass = computed(() => {
  switch (userStatus.value?.id) {
    case 1:
      return "bg-green-400";
    case 2:
      return "bg-red-400";
    case 3:
      return " bg-yellow-400";
    default:
      return "bg-gray-200";
  }
});

const userStatusText = computed(() => {
  return userStatus.value?.name;
});

watchEffect(() => {
  loadInformation();
  loadUserStatus();
}, [props.developer.id]);
</script>
