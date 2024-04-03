export const useLocalStorage = (initialValue, key) => {
  const val = ref(initialValue);

  // Verificar si estamos en el lado del cliente antes de acceder a localStorage
  onMounted(() => {
    const storageValue = window.localStorage.getItem(key);

    if (storageValue) {
      val.value = JSON.parse(storageValue);
    }
  });
  watch(
    val,
    (val) => {
      window.localStorage.setItem(key, JSON.stringify(val));
    },
    { deep: true }
  );

  return val;
};
