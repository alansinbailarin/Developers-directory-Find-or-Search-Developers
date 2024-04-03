export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoggedIn = computed(() => !!user.value);
  const theUserId = computed(() => user.value?.id);
  const isLoading = ref(true);

  async function logout() {
    await useApiFetch("/api/auth/logout", {
      method: "POST",
    });

    localStorage.removeItem("userId");
    user.value = null;

    navigateTo("/auth/login");
  }

  async function fetchUser(userId) {
    const { data } = await useApiFetch(`/api/user/${userId}`);

    user.value = data.value?.data;

    console.log(user.value);
  }

  async function login(credentials) {
    await useApiFetch("/sanctum/csrf-cookie");

    const login = await useApiFetch("/api/auth/login", {
      method: "POST",
      body: credentials,
    });

    const userId = login?.data?.value?.user?.id;

    // guardar el user id en local storage
    localStorage.setItem("userId", userId);

    await fetchUser(userId);

    return login;
  }

  async function register(credentials) {
    await useApiFetch("/sanctum/csrf-cookie");

    const register = await useApiFetch("/api/auth/register", {
      method: "POST",
      body: credentials,
    });

    const userId = register?.data?.value?.data?.id;

    // guardar el user id en local storage
    localStorage.setItem("userId", userId);

    await fetchUser(userId);

    return register;
  }

  return {
    user,
    login,
    isLoggedIn,
    fetchUser,
    theUserId,
    logout,
    register,
    isLoading,
  };
});
