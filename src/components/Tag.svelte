<script>
  import { fade } from "svelte/transition";
  import { Badge } from "flowbite-svelte";

  import {
    calculateReadableForegroundColor,
    FLOWBITE_SVELTE_BUTTON_COLORS,
  } from "../helpers/colors";

  export let color = "primary";
  export let dismissable = false;
  export let onClose;
  export let fadeDuration = 200;

  $: tagColor = ["default"].includes(color) ? "primary" : color; // Override Notion tag colors that are not supported by Flowbite
</script>

<span transition:fade={{ duration: fadeDuration }}>
  {#if FLOWBITE_SVELTE_BUTTON_COLORS.has(color)}
    <Badge color={tagColor} {dismissable} on:close={onClose}><slot /></Badge>
  {:else}
    <Badge
      color="custom"
      style={`background-color:${tagColor}; color: ${calculateReadableForegroundColor(
        tagColor,
      )}`}
      on:close={onClose}
      {dismissable}><slot /></Badge
    >
  {/if}
</span>
