<script>
  import { onDestroy, onMount } from "svelte";
  import {
    Toggle,
    Alert,
    Range,
    Label,
    Tooltip,
    Button,
  } from "flowbite-svelte";
  let numStarsPercent = 7;
  let hyperDarkSpanEl;
  let mounted = false; // Mounted state allows this to be server-side rendered, improves loading time and helps prevent CLS
  let hyperDark = false;

  function onSliderChange(ev) {
    const { value } = ev?.target;

    if (value) {
      numStarsPercent = value;
      hyperDarkSpanEl.style.animationDuration = `${10.0 - value / 10}s`; // Adjust % slider text animation speed
    }
  }

  function onToggle(ev) {
    const { checked } = ev?.target;

    if (checked) {
      localStorage.setItem("hyperDark", true);
      localStorage.setItem("color-theme", "dark");

      // Force Dark Mode if HyperDark is enabled
      document.documentElement.classList.add("hyperDark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark"); // Sync with flowbite-svelte DarkMode component
      hyperDark = true;
    } else {
      localStorage.setItem("hyperDark", false);
      localStorage.setItem("color-theme", "light");
      document.documentElement.classList.remove("hyperDark");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light"); // Sync with flowbite-svelte DarkMode component
      hyperDark = false;
    }
  }

  let mutationObserver = null;

  onMount(() => {
    mounted = true;

    hyperDark = localStorage.getItem("hyperDark") === "true";

    numStarsPercent =
      localStorage.getItem("numStarsPercent") || numStarsPercent;

    setTimeout(() => {
      console.log("Checking for HyperDark status for initial toggle state");
      hyperDark = localStorage.getItem("hyperDark") === "true";
    }, 50);

    if (typeof localStorage !== "undefined") {
      mutationObserver = new MutationObserver(() => {
        const DARK_MODE_TOGGLE_DELAY = 0; // Wait to check for dark mode toggle effects to be applied before disabling HyperDark

        setTimeout(() => {
          const darkMode = document.documentElement.classList.contains("dark");
          if (!darkMode) hyperDark = false;
        }, DARK_MODE_TOGGLE_DELAY);
      }, 0);

      mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  });

  onDestroy(() => {
    if (mutationObserver) {
      console.log("Disconnecting mutation observer");
      mutationObserver.disconnect();
    }
  });

  $: {
    if (mounted) {
      localStorage.setItem("numStarsPercent", numStarsPercent);

      // Trigger watching MutationObservers with temporary class
      document.documentElement.classList.add("hyperDarkEngage");
      document.documentElement.classList.remove("hyperDarkEngage");
    }
  }
</script>

<Alert class="mt-4 w-fit bg-gray-400">
  <div class="flex flex-col justify-start sm:flex-row sm:items-center">
    <div class="flex flex-row">
      <span class="mr-4 text-lg text-white">HyperDark</span>
      <Toggle bind:checked={hyperDark} on:change={onToggle} />
    </div>
    <Label />
    {#if hyperDark}
      <div
        class={`mt-4 flex w-64 flex-col items-center justify-center sm:mt-[-8px] sm:pl-8 ${
          numStarsPercent <= 80 ? "" : "animate-shake"
        } animate-infinite ${
          numStarsPercent === 100
            ? "animate-dration-75"
            : numStarsPercent > 96
              ? "animate-duration-300"
              : numStarsPercent > 93
                ? "animate-duration-500"
                : "animate-duration-700"
        } animate-ease-linear`}
      >
        <div
          class="rotating-colors mt-[] pb-3 text-lg font-extrabold text-white"
          bind:this={hyperDarkSpanEl}
        >
          {#if numStarsPercent === "0"}
            🕳 ️I️n a Black Hole? 🕳️
          {:else if numStarsPercent === "100"}
            HyperDark, Engage! 🚀
          {:else}
            {numStarsPercent}%
          {/if}
        </div>
        <Range
          id="large-range"
          class="max-w-32"
          size="md"
          value={numStarsPercent}
          on:change={onSliderChange}
        />
      </div>
    {/if}
  </div>
</Alert>

<Tooltip placement="bottom"
  >Set Dark mode to Space Theme!<br />Control the amount of Stars.</Tooltip
>

<style>
  .rotating-colors {
    animation: rotate-colors 5s linear infinite;
  }

  @keyframes rotate-colors {
    0% {
      color: #ff0000;
    }
    25% {
      color: #00ff00;
    }
    50% {
      color: #0000ff;
    }
    75% {
      color: #ffff00;
    }
    100% {
      color: #ff00ff;
    }
  }
</style>
