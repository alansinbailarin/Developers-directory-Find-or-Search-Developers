<template>
  <div
    class="bg-black rounded-full px-6 py-3 shadow flex items-center justify-between"
  >
    <div class="text-gray-100">
      <h4 class="font-medium">Search result</h4>
    </div>
    <div class="text-gray-100">
      <p class="font-light text-sm">{{ developersCount }} developers found</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  developers: {
    type: Array,
    required: true,
  },
});

const developersCount = computed(() => {
  return props.developers.length;
});
</script>
