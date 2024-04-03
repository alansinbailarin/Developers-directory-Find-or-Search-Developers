<template>
  <div
    :id="dropdown"
    class="absolute z-50 mt-72 divide-y bg-white rounded-md shadow-sm border border-gray-200"
  >
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  dropdown: {
    type: String,
    required: true,
  },
});
</script>
