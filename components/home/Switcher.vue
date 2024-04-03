<template>
  <div class="mx-auto" :class="mobileMenuOpen ? 'block' : 'relative'">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-4/5 mx-auto">
      <section
        class="text-white text-center rounded-xl md:rounded-r-none flex flex-col justify-center transition-colors duration-300"
        :class="{
          'bg-orange-500': userDeveloper,
          'bg-gray-200': !userDeveloper,
        }"
      >
        <div class="p-8">
          <h2 class="text-2xl font-bold">Developer profile</h2>
          <p class="hidden md:block my-4">
            Establish your developer profile to present your expertise and
            background. Recruiters have the opportunity to find you, while you
            can also seek employment opportunities and projects available on the
            platform.
          </p>
          <p class="my-4 block md:hidden">
            Establisn your developer profile and show the world your expertice
          </p>
          <NuxtLink
            v-if="!auth.user"
            :class="{
              'bg-gray-100 text-gray-400': !userDeveloper,
              'bg-white text-gray-800': userDeveloper,
            }"
            class="font-semibold rounded-md px-4 py-3 hover:shadow-lg transition-all ease-in-out duration-300"
            to="/auth/register"
            >Start now</NuxtLink
          >
        </div>
      </section>
      <section
        class="text-white text-center rounded-xl md:rounded-l-none flex flex-col justify-center transition-colors duration-300"
        :class="{
          'bg-orange-500': !userDeveloper,
          'bg-gray-200': userDeveloper,
        }"
      >
        <div class="p-8">
          <h2 class="text-2xl font-bold">Hirer Profile</h2>
          <p class="my-4 hidden md:block">
            Discover top-tier developers, receive tailored alerts based on your
            preferences, and hire for both long-term positions and project-based
            work. Streamline your recruitment process and build your dream team
            effortlessly with our platform.
          </p>
          <p class="my-4 block md:hidden">
            Discover top-tier developers arround the world and hire them
          </p>
          <NuxtLink
            v-if="!auth.user"
            :class="{
              'bg-gray-100 text-gray-400': userDeveloper,
              'bg-white text-gray-800': !userDeveloper,
            }"
            class="font-semibold rounded-md px-4 py-3 hover:shadow-lg transition-all ease-in-out duration-300"
            to="/auth/register"
            >Start now</NuxtLink
          >
        </div>
      </section>
    </div>
    <div
      class="flex justify-center absolute top-0 left-1/2 transform -translate-x-1/2 h-full items-center"
    >
      <button
        @click="handleChange"
        class="rounded-full p-3 shadow-lg border border-gray-200 bg-white"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7 transform transition-all ease-in-out duration-[800ms]"
            :class="{
              'rotate-180': userDeveloper,
            }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  userDeveloper: Boolean,
  auth: Object,
});

const mobileMenuOpen = JSON.parse(localStorage.getItem("mobileMenuOpen"));

console.log(mobileMenuOpen);

const emit = defineEmits(["changeUserType"]);

const handleChange = () => {
  emit("changeUserType", !props.userDeveloper);
};
</script>

<style>
@keyframes color-move {
  0% {
    background-color: #ff9800; /* Color inicial */
    transform: translateX(-50%);
  }
  50% {
    background-color: #e91e63; /* Color a mitad de camino */
    transform: translateX(50%);
  }
  100% {
    background-color: #ff9800; /* Color final */
    transform: translateX(-50%);
  }
}

.animate-color-move {
  animation: color-move 2s ease-in-out infinite; /* Duración y repetición */
}
</style>
