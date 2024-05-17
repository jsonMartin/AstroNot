<script>
  import { Toast } from "flowbite-svelte";
  import { GoogleSolid } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  let isChromeBased = true;

  const close = () => {
    localStorage.setItem("chromeAlertClosed", "true");
  };

  onMount(() => {
    const hasChromeAlertClosed =
      localStorage.getItem("chromeAlertClosed") === "true";
    if (hasChromeAlertClosed) return;

    isChromeBased = /Edg|OPR|Chrome/.test(navigator.userAgent);
  });
</script>

{#if !isChromeBased}
  <Toast
    color="primary"
    class="animate fixed bottom-5 right-5 z-50 animate-fade-left animate-duration-700 animate-ease-out"
    on:close={close}
  >
    <svelte:fragment slot="icon">
      <GoogleSolid class="h-5 w-5" />
      <span class="sr-only">Check icon</span>
    </svelte:fragment>
    For an enhanced browsing experience, Chrome based browsers are recommended.
  </Toast>
{/if}
