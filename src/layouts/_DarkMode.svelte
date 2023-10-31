<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { darkMode } from "../stores/layout";

  let htmlEl;
  let mounted: boolean = false;

  const loadDarkModeSettings = () => {
    const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));

    if (isDarkMode) {
      htmlEl.classList.add("dark");
    }

    darkMode.set(isDarkMode);
  };

  let observer;

  const syncDarkModeWithLocalStorage = () => {
    observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === "class") {
          if (!mounted) return;

          const isDarkMode = htmlEl.classList.contains("dark");

          // Save Dark Mode in Local Storage
          localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
          darkMode.set(isDarkMode);
        }
      }
    });

    observer.observe(htmlEl, { attributes: true });
  };

  function init() {
    htmlEl = document.querySelector("html");

    loadDarkModeSettings();

    setTimeout(() => syncDarkModeWithLocalStorage(), 1); // Allow time for Astro to load
    document.addEventListener("astro:after-swap", loadDarkModeSettings); // Need to reload Dark Mode settings after page transition
  }

  onMount(() => {
    mounted = true;
    init();
  });

  onDestroy(() => {
    document.removeEventListener("astro:after-swap", loadDarkModeSettings);
    observer.disconnect();
  });
</script>
