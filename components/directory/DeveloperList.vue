<template>
  <section class="overflow-y-auto h-[70vh] scroll-styling rounded-lg">
    <DeveloperItem
      :developer="developer"
      v-for="developer in developers"
      :key="developer.id"
    />
  </section>
</template>
<script setup>
import DeveloperItem from "./DeveloperItem.vue";
const props = defineProps({
  developers: {
    type: Array,
    required: true,
  },
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
</style>
