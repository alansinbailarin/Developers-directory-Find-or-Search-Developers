<template>
  <section class="my-8">
    <div class="text-center justify-center">
      <transition name="slide-up" mode="out-in">
        <span
          v-if="!isLoading"
          class="bg-white text-xs md:text-base rounded-full border border-gray-200 px-2 py-3"
        >
          <span
            class="bg-orange-100 px-2 py-1 mr-3 rounded-full text-orange-600 font-medium"
            >Alpha V1.0</span
          >
          <span class="mr-2">The beginning</span>
        </span>
      </transition>
      <div class="flex items-center justify-center h-[85vh]" v-if="isLoading">
        <Loader />
      </div>
      <div v-else class="user-type-container">
        <transition name="slide-up" mode="out-in">
          <Developer v-if="userDeveloper" key="developer" />
          <Recruiter v-else key="recriuter" />
        </transition>

        <transition name="slide-up" mode="out-in">
          <div
            style="max-width: 200px"
            class="my-10 flex rounded-full mx-auto bg-gradient-to-tr from-yellow-400 to-red-400 p-1 shadow-lg"
          >
            <button
              @click="changeUserType"
              class="flex-1 font-medium bg-white px-6 py-3 rounded-full text-gray-900"
              type="button"
            >
              I'm a {{ userTypeText }}
            </button>
          </div>
        </transition>

        <transition name="slide-up" mode="out-in">
          <CompanySlider
            v-if="userDeveloper"
            key="companyslider"
            class="my-20"
          />
          <DeveloperSlider v-else key="devslider" class="my-20" />
        </transition>
      </div>
    </div>
    <div
      class="absolute wave inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-red-700 to-orange-700 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      ></div>
    </div>
    <DeveloperBenefits />
  </section>
</template>
<script setup>
import { useLocalStorage } from "../../composables/useLocalStorage";
import { defineProps, ref } from "vue";

const Developer = defineAsyncComponent(() => import("./Developer.vue"));
const DeveloperSlider = defineAsyncComponent(() =>
  import("./DeveloperSlider.vue")
);
const CompanySlider = defineAsyncComponent(() => import("./CompanySlider.vue"));
const Recruiter = defineAsyncComponent(() => import("./Recruiter.vue"));
const Loader = defineAsyncComponent(() => import("../Loader.vue"));
const Switcher = defineAsyncComponent(() => import("./Switcher.vue"));
const DeveloperBenefits = defineAsyncComponent(() =>
  import("../benefits/DeveloperBenefits.vue")
);

const isLoading = ref(true);
const userDeveloper = useLocalStorage(true, "isUserDeveloper");

const props = defineProps({
  auth: Object,
});

onMounted(() => {
  try {
    userDeveloper.value = JSON.parse(localStorage.getItem("isUserDeveloper"));
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

const changeUserType = () => {
  userDeveloper.value = !userDeveloper.value;
};

const userTypeText = computed(() => {
  return userDeveloper.value ? "Recruiter" : "Developer";
});
</script>

<style scoped>
.user-type-container {
  overflow: hidden;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s, opacity 0.5s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
