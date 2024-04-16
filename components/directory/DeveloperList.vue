<template>
  <section
    ref="scrollSection"
    class="overflow-y-auto h-[67vh] scroll-styling rounded-lg"
  >
    <DeveloperItem
      :developer="developer"
      v-for="developer in developers"
      :key="developer.id"
    />
    <div
      v-if="loading"
      class="h-36 max-w-[21rem] bg-gray-100 rounded-lg mb-3 animate-pulse flex items-center justify-center"
    ></div>
  </section>
</template>
<script setup>
import DeveloperItem from "./DeveloperItem.vue";

const props = defineProps({
  developers: {
    type: Array,
    required: true,
  },
  developersData: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["next-page"]);

const scrollSection = ref(null);
const nextPage = ref(null);
const loading = ref(false);

onMounted(() => {
  scrollSection.value.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  let pixelsFromBottom =
    scrollSection.value.scrollHeight -
    scrollSection.value.scrollTop -
    scrollSection.value.clientHeight;

  nextPage.value = props.developersData.current_page + 1;

  if (pixelsFromBottom < 10) {
    loading.value = true;

    if (nextPage.value <= props.developersData.last_page) {
      sendNextPage();
    } else {
      loading.value = false;
    }
  }
};

const sendNextPage = () => {
  loading.value = false;

  emit("next-page", nextPage.value);
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 2px;
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
