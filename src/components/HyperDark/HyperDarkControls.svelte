<script>
  import { onMount } from "svelte";
  import {
    Toggle,
    Alert,
    Range,
    Label,
    Tooltip,
    Button,
  } from "flowbite-svelte";
  import { hyperDark } from "./HyperDark";
  import { darkMode } from "../../stores/layout";

  let numStarsPercent = 11;
  let hyperDarkSpanEl;
  let mounted = false; // Mounted state allows this to be server-side rendered, improves loading time and helps prevent CLS

  $: isHyperDark = $hyperDark;
  $: isDarkMode = $darkMode;

  function starfieldRender() {
    const value = numStarsPercent;
    const MULTIPLIER = value < 100 ? value * 2 : value * 4;

    if (window.starField) {
      window.starField.play = true;
      window.starField.render(value * MULTIPLIER, 3);
    } else {
      console.error("No starfield found");
    }
  }

  function onSliderChange(ev) {
    const { value } = ev?.target;

    if (value) {
      numStarsPercent = value;
      hyperDarkSpanEl.style.animationDuration = `${10.0 - value / 10}s`; // Adjust % slider text animation speed
      starfieldRender();
    }
  }

  function onToggle(ev) {
    const { checked } = ev?.target;

    if (checked) {
      localStorage.setItem("hyperDark", true);

      // Force Dark Mode if HyperDark is enabled
      document.querySelector("html").classList.add("dark");
      localStorage.setItem("color-theme", "dark"); // Persist color theme to prevent race condition bugs while loading

      starfieldRender();
    } else {
      localStorage.setItem("hyperDark", false);
    }

    hyperDark.set(checked);
  }

  onMount(() => {
    mounted = true;
    numStarsPercent = localStorage.getItem("numStarsPercent") || 33;
  });

  $: {
    if (mounted) {
      localStorage.setItem("numStarsPercent", numStarsPercent);
    }
  }
</script>

<Alert class="mt-4 w-fit bg-gray-400">
  <div class="flex flex-col justify-start sm:flex-row sm:items-center">
    <div class="flex flex-row">
      <span class="mr-4 text-lg text-white">HyperDark</span>
      <Toggle bind:checked={isHyperDark} on:change={onToggle} />
    </div>
    <Label />
    {#if isHyperDark && isDarkMode}
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
