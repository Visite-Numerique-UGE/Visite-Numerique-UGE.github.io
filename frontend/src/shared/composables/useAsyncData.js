import { onMounted, ref } from "vue";

export function useAsyncData(loader, failureMessage) {
  const data = ref([]);
  const isLoading = ref(true);
  const errorMessage = ref("");

  async function load() {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      data.value = await loader();
    } catch (error) {
      errorMessage.value = failureMessage;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(load);

  return { data, isLoading, errorMessage, reload: load };
}