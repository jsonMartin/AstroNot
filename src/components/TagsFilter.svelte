<script>
  import { MultiSelect } from "flowbite-svelte";
  import { TagSolid } from "flowbite-svelte-icons";
  import Tag from "./Tag.svelte";

  export let tagsList = []; // Contains a list of all tags from Notion

  let selected = [];

  $: tags = tagsList
    .map((tag) => ({ value: tag.id, name: tag.name, color: tag.color }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filterPostsVisibility = (event) => {
    console.log("Filter posts visiblity called");
    // Since Blog components are built via Astro (required to use View Transitions),
    // They cannot directly have client-side reactivity like Svelte components
    // Add reactivity via CSS by hiding posts that don't match the selected tags

    document.startViewTransition(() => {
      if (selected.length === 0) {
        document.querySelectorAll(".post-link-container").forEach((el) => {
          el.classList.remove("hidden");
        });

        return;
      }

      document.querySelectorAll(".post-link-container").forEach((el) => {
        let shouldBeVisible = false;

        for (const tag of selected) {
          if (el.classList.contains(`post-link-tag-${tag}`))
            shouldBeVisible = true;
        }

        shouldBeVisible
          ? el.classList.remove("hidden")
          : el.classList.add("hidden");
      });

      document.querySelector("#tags-select-container > div").click(); // Can't get ref of div component directly since it's hidden buried inside framework
    });
  };
</script>

<div class="flex flex-row items-center justify-center">
  <TagSolid class="mr-2 hidden sm:block" />

  <div class="w-64 lg:w-96" id="tags-select-container">
    <MultiSelect
      items={tags}
      size="lg"
      bind:value={selected}
      on:selected={filterPostsVisibility}
      let:item
      let:clear
      class="min-h-[52px]"
    >
      <Tag
        color={item.color}
        dismissable
        onClose={() => {
          clear();
          if (!selected.length) filterPostsVisibility(); // Must invoke manually; Flowbite MultiSelect component does not run selected event handlers when value is empty
        }}>{item.name}</Tag
      >
    </MultiSelect>
  </div>
</div>
