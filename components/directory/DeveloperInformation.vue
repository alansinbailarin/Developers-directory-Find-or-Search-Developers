<template>
  <section
    v-if="developer"
    class="mt-5 overflow-y-auto h-[67vh] scroll-styling rounded-lg bg-gray-50 shadow-sm p-6"
  >
    <transition name="slide-fade">
      <div v-if="!loading">
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
                <a
                  :href="`mailto:${developer.email}`"
                  class="text-sm font-light text-gray-400"
                  >{{ developer.email }}</a
                >
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
        <div class="grid grid-cols-2 gap-4 my-3">
          <div class="flex items-center justify-center">
            <button
              class="bg-orange-500 flex items-center gap-2 justify-center w-full text-white font-medium px-6 py-2 rounded-full text-sm shadow hover:bg-orange-400 transition-all duration-300 ease-in-out"
            >
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              </span>
              Connect
            </button>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="bg-gray-900 flex items-center justify-center gap-2 w-full text-white font-medium px-6 py-2 rounded-full text-sm shadow hover:bg-gray-800 transition-all duration-300 ease-in-out"
            >
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
              Follow
            </button>
          </div>
        </div>
        <div class="my-4 grid grid-cols-4 gap-4">
          <div
            class="flex items-center justify-center bg-blue-100 p-5 rounded-lg flex-col text-sm text-center"
          >
            <h1 class="text-xs text-blue-700">Salary</h1>
            <p
              class="font-semibold text-blue-900"
              v-if="developer.user_salary?.hourly_rate"
            >
              ${{ developer.user_salary?.hourly_rate }}
              <span class="font-normal">/hourly</span>
            </p>
            <p class="font-semibold text-blue-900" v-else>Not specified</p>
          </div>
          <div
            class="flex items-center justify-center bg-green-100 p-5 rounded-lg flex-col text-sm text-center"
          >
            <h1 class="text-xs text-green-700">Preferred job type</h1>
            <p
              class="font-semibold text-green-900"
              v-if="developer.job_type?.name"
            >
              {{ developer.job_type?.name }}
            </p>
            <p class="font-semibold text-green-900" v-else>Not specified</p>
          </div>
          <div
            class="flex items-center justify-center bg-orange-100 p-5 rounded-lg flex-col text-sm text-center"
          >
            <h1 class="text-xs text-orange-700">Skill level</h1>
            <p
              class="font-semibold text-orange-900"
              v-if="developer.skill_level?.name"
            >
              {{ developer.skill_level?.name }}
            </p>
            <p class="font-semibold text-orange-900" v-else>Not specified</p>
          </div>
          <div
            class="flex items-center justify-center bg-violet-100 p-5 rounded-lg flex-col text-sm text-center"
          >
            <h1 class="text-xs text-violet-700">Experience</h1>
            <p
              class="font-semibold text-violet-900"
              v-if="developer.experience?.total_experience"
            >
              {{ developer.experience?.total_experience }}
            </p>
            <p class="font-semibold text-violet-900" v-else>Not specified</p>
          </div>
        </div>
        <div class="my-4">
          <h1 class="font-medium">About</h1>
          <p
            v-if="developer.user_information?.about"
            class="text-gray-600 text-sm font-light"
          >
            {{ developer.user_information?.about }}
          </p>
          <p class="text-gray-600 text-sm line-clamp-4 font-light" v-else>
            Not description yet.
          </p>
        </div>
      </div>
    </transition>
    <!-- <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
      <button
        class="bg-orange-500 text-white font-medium px-6 py-3 rounded-full text-sm w-[43vw] shadow hover:bg-orange-400 transition-all duration-300 ease-in-out"
      >
        Connect
      </button>
    </div> -->
  </section>
  <section
    v-else
    class="flex items-center h-[66vh] justify-center mt-5 rounded-lg bg-gray-50 shadow-sm p-6"
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

    developerJobTypeId.value = developer.value?.job_type_id;

    loadDeveloperJobType();
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
