<script setup>
import Auth from "./navbar/Auth.vue";
import NoAuth from "./navbar/NoAuth.vue";
import Dropdown from "./navbar/Dropdown.vue";
import { useLocalStorage } from "../composables/useLocalStorage";

const props = defineProps({
  auth: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const mobileMenuOpen = useLocalStorage(false, "mobileMenuOpen");
const isTransparent = ref(false);

const getLinkClass = (path) => {
  return router.currentRoute.value.path == path
    ? "text-orange-500"
    : "text-gray-800";
};
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  const threshold = 50; // Ajusta este valor según tus necesidades

  isTransparent.value = scrollPosition > threshold;
};
</script>

<template>
  <nav
    class="flex items-center justify-between px-5 md:px-52 py-5 sticky top-0 z-50"
    :class="{
      'bg-white': !isTransparent,
      'bg-white  bg-opacity-80 backdrop-filter backdrop-blur transition-all duration-300 ease-in-out bg-gradient-to-t from-transparent via-transparent to-white':
        isTransparent,
    }"
  >
    <div class="flex items-center gap-2">
      <NuxtLink to="/" class="font-semibold text-2xl">DevsDir</NuxtLink>
    </div>
    <div class="hidden md:block">
      <ul class="flex items-center justify-between gap-4 font-medium text-lg">
        <li>
          <NuxtLink to="/" :class="getLinkClass('/')">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Developers directory</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Projects</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Blog</NuxtLink>
        </li>

        <!-- <li>
          <NuxtLink to="/auth-only">Auth only</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/guest-only">Guest only</NuxtLink>
        </li> -->
      </ul>
    </div>
    <div class="flex items-center gap-4">
      <div>
        <div v-if="auth.user">
          <div v-if="auth.isLoading">
            <Loader />
          </div>
          <Auth v-else :auth="auth" />
        </div>
      </div>
      <div v-if="!auth.user && !auth.isLoading">
        <NoAuth />
      </div>
      <div class="block md:hidden">
        <button type="button" @click="toggleMobileMenu()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-9 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div
        v-show="mobileMenuOpen"
        class="fixed inset-0 opacity-50 z-40 backdrop-blur-md bg-black w-full h-screen"
        @click="toggleMobileMenu"
      ></div>
      <transition name="slide-fade">
        <div
          v-show="mobileMenuOpen"
          class="w-80 bg-white h-screen top-0 right-0 p-4 fixed z-50"
        >
          Menu
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
nav {
  /* backdrop-filter: none;  Para desactivar el desenfoque en navegadores que no lo admiten */
  transition: background-color 0.3s ease-in-out,
    backdrop-filter 0.3s ease-in-out;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
