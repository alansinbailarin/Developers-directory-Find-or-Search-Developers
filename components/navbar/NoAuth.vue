<template>
  <div class="flex items-center gap-3">
    <NuxtLink
      to="/auth/login"
      class="bg-orange-500 px-4 py-2 rounded-md text-white hover:bg-orange-400 transition-colors ease-in-out duration-300 font-medium"
      >Login</NuxtLink
    >
    <NuxtLink
      to="/auth/register"
      class="text-gray-700 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors ease-in-out duration-300 font-medium"
      >Register</NuxtLink
    >
  </div>
</template>
<script setup></script>
