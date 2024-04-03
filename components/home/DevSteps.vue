<template>
  <div
    class="overflow-x-auto hide-scroll-bar bg-gradient-to-r from-orange-200 to-orange-100 bg-opacity-30 p-5 mt-8 rounded-lg shadow-sm"
  >
    <div class="flex hide-scroll-bar">
      <section
        v-for="step in devSteps"
        :key="step.title"
        class="flex-shrink-0 mr-4 md:w-3/12 w-5/6 text-left bg-white rounded-md p-4 shadow"
      >
        <h3 class="uppercase text-lg font-semibold">{{ step.title }}</h3>
        <span class="text-gray-600 text">{{ step.subtitle }}</span>
        <p class="mt-1 text-gray-500 font-light">{{ step.description }}</p>
      </section>
    </div>
  </div>
</template>
<script setup>
const devSteps = ref([
  {
    title: "Create your profile",
    subtitle: "Be professional",
    description:
      "Take the first step towards building your professional presence. Create a detailed profile with your professional information, skills, and experience tailored to the needs of recruiters.",
  },
  {
    title: "Showcase your skills",
    subtitle: "Highlight your expertise",
    description:
      "Stand out from the crowd by showcasing your skills and expertise. Provide examples of your work, projects you've completed, and any certifications you've earned.",
  },
  {
    title: "Enhance your visibility",
    subtitle: "Increase your chances",
    description:
      "Increase your chances of being discovered by companies and recruiters. Optimize your profile with relevant keywords and keep it up-to-date with your latest accomplishments.",
  },
  {
    title: "Get discovered",
    subtitle: "Companies will find you",
    description:
      "Sit back and let companies find you based on your skills, experience, and profile visibility. Receive inquiries and job offers tailored to your expertise.",
  },
  {
    title: "Engage with recruiters",
    subtitle: "Build connections",
    description:
      "Build meaningful connections with recruiters and hiring managers. Engage in conversations, respond to messages promptly, and demonstrate your enthusiasm for new opportunities.",
  },
  {
    title: "Network with peers",
    subtitle: "Connect with like-minded professionals",
    description:
      "Expand your professional network by connecting with other professionals in your industry. Join groups, participate in discussions, and share insights to grow your connections.",
  },
  {
    title: "Get hired",
    subtitle: "Secure your dream job",
    description:
      "Secure your dream job or freelance projects with top companies. Receive offers that match your skills, interests, and career goals, and take the next step towards your professional success.",
  },
  {
    title: "Negotiate offers",
    subtitle: "Maximize your opportunities",
    description:
      "Maximize your opportunities by negotiating offers with potential employers. Evaluate job offers based on factors such as compensation, benefits, growth opportunities, and company culture.",
  },
  {
    title: "Start your journey",
    subtitle: "Embark on a new chapter",
    description:
      "Embark on a new chapter in your career journey. Accept an offer that aligns with your aspirations and goals, and take the first step towards achieving your professional ambitions.",
  },
]);
</script>

<style scoped>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
