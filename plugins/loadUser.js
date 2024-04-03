export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();
  const userId = ref(null);

  if (typeof window !== "undefined") {
    try {
      auth.isLoading = true;
      userId.value = localStorage.getItem("userId");

      console.log(userId.value);
    } catch (error) {
      console.error(error);
    } finally {
      auth.isLoading = false;
    }
  }

  if (!auth.isLoggedIn) {
    await auth.fetchUser(userId.value);
  }
});
