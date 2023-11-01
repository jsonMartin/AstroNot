<script lang="ts">
  import {
    Section,
    HeroHeader,
    FeatureDefault,
    FeatureItem,
  } from "flowbite-svelte-blocks";
  import {
    RocketSolid,
    FlowbiteSolid,
    ImageOutline,
    RectangleListSolid,
    EyeSolid,
    MoonSolid,
    MobilePhoneSolid,
    WindowSolid,
  } from "flowbite-svelte-icons";
  import HyperDarkControls from "../../components/HyperDark/HyperDarkControls.svelte";
</script>

<Section name="feature">
  <HeroHeader
    class="mx-auto mb-8 max-w-screen-md sm:mx-0 lg:mb-16"
    h2Class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
    pClass="text-gray-500 sm:text-xl dark:text-gray-400"
  >
    <svelte:fragment slot="h2"
      >Reactive Components, Built for Performance.</svelte:fragment
    >
    <svelte:fragment slot="paragraph">
      <HyperDarkControls />

      <br />
      Use any
      <a
        href="https://flowbite-svelte.com/docs/components/card"
        class="text-secondary-500 underline"
        target="_blank">Svelte</a
      >
      or
      <a
        href="https://flowbite.com/docs/components/dropdowns/"
        target="_blank"
        class="text-secondary-500 underline">Flowbite</a
      >
      component out of the box, or bring your own favorite framework such as
      <a
        href="https://react.dev/"
        target="_blank"
        class="text-secondary-500 underline">React</a
      >! Mix-and-match UI frameworks or add large dependencies without hurting
      user performance via
      <a
        href="https://docs.astro.build/en/concepts/islands/"
        target="_blank"
        class="text-secondary-500 underline">Astro Islands</a
      >.
      <br />
      <br />
      Finally, combine the best of both worlds: MPA <i>(Multi Page Apps)</i> and
      SPA <i>(Single Page Apps)</i>. Lightning fast initial page loads expected
      of a MPA combined with the persistance & interactivity expected from a
      SPA, thanks to Astro's v3 router.
      <br />
      <br />

      <div class="text-sm">
        <span class="font-semibold">All the goodies:</span>
        <span
          >Notion Blog Integration, Responsive Design, Dark Mode, Animations,
          View Transitions, Table of Contents, Flowbite Components & Blocks,
          Built for Performance and a custom Notion Image Optimization Pipeline</span
        >.
      </div>
    </svelte:fragment>
  </HeroHeader>
  <FeatureDefault>
    <FeatureItem>
      <svelte:fragment slot="icon">
        <img
          alt="notion logo"
          src="/images/notion-logo.png"
          class="scale-[70%] !bg-none"
        />
      </svelte:fragment>
      <svelte:fragment slot="h3">Notion Blog Integration</svelte:fragment>
      <svelte:fragment slot="paragraph">
        Write, edit, and publish Articles & Blog Posts in Notion! The content <span
          class="italic">(including images, tags, and metadata)</span
        >
        will show up
        <span
          class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >automagically</span
        >.
      </svelte:fragment>
    </FeatureItem>
    <FeatureItem>
      <svelte:fragment slot="icon"
        ><MobilePhoneSolid class="text-white dark:text-primary-50" />
      </svelte:fragment>
      <svelte:fragment slot="h3">Responsive Design</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >AstroNot is fully responsive on Mobile, Tablet, and Desktop browsers.
        Easily tweak design with <a
          href="https://tailwindcss.com/"
          class="text-secondary-500 underline"
          target="_blank">Tailwind</a
        >. Add interactivity with
        <a
          href="https://flowbite.com/docs/components/modal/"
          class="text-secondary-500 underline">Flowbite</a
        >.</svelte:fragment
      >
    </FeatureItem>
    <FeatureItem>
      <svelte:fragment slot="icon"
        ><MoonSolid class="text-white dark:text-primary-50" /></svelte:fragment
      >
      <svelte:fragment slot="h3">Dark Mode</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >AstroNot offers a mandatory night-vision mode for all those
        space-obsessed night owls out there. Now with <span
          class="animate-pulse font-bold">HyperDark</span
        >!</svelte:fragment
      >
    </FeatureItem>
    <FeatureItem>
      <svelte:fragment slot="icon">
        <EyeSolid class="text-white dark:text-primary-50" />
      </svelte:fragment>
      <svelte:fragment slot="h3">Animations</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >Out of the box lightweight animation libraries, including <a
          href="https://www.tailwindcss-animated.com/configurator.html?animation=pulse"
          class="text-secondary-500 underline">Tailwind Animated</a
        >
        and
        <a
          href="https://svelte.dev/docs/svelte-animate"
          class="text-secondary-500 underline">Svelte</a
        > already included. Easily add custom third-party libraries.</svelte:fragment
      >
    </FeatureItem>
    <FeatureItem>
      <svelte:fragment slot="icon"
        ><WindowSolid
          class="text-white dark:text-primary-50"
        /></svelte:fragment
      >
      <svelte:fragment slot="h3">View Transitions</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >AstroNot includes <a
          href="https://docs.astro.build/en/guides/view-transitions/"
          class="text-secondary-500 underline">View Transition</a
        > support, which is a new browser feature allowing for fluid route transitions
        and page element animations.</svelte:fragment
      >
    </FeatureItem>
    <FeatureItem>
      <svelte:fragment slot="icon">
        <RectangleListSolid class="text-white dark:text-primary-50" />
      </svelte:fragment>
      <svelte:fragment slot="h3">Table of Contents</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >Automatically generate a table of contents based off your blog posts
        and article structure. Supports nested subheadings!</svelte:fragment
      >
    </FeatureItem>

    <FeatureItem>
      <svelte:fragment slot="icon">
        <FlowbiteSolid class="text-white dark:text-primary-50" />
      </svelte:fragment>
      <svelte:fragment slot="h3"
        >Flowbite Components, Blocks & Icons</svelte:fragment
      >
      <svelte:fragment slot="paragraph"
        >Use <a
          href="https://flowbite.com/blocks/"
          class="text-secondary-500 underline">330+ Flowbite Blocks</a
        >,
        <a
          href="https://flowbite-svelte.com/docs/components/accordion"
          class="text-secondary-500 underline">60+ Interactive Components</a
        >, and
        <a
          href="https://flowbite.com/icons/"
          class="text-secondary-500 underline">487+ Icons</a
        >, standalone or with a UI framework. Easily tweak with Tailwind.</svelte:fragment
      >
    </FeatureItem>

    <FeatureItem>
      <svelte:fragment slot="icon">
        <RocketSolid class="text-white dark:text-primary-50" />
      </svelte:fragment>
      <svelte:fragment slot="h3">Built for Performance</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >Statically generate pages on the server for performance, and only
        hydrate the specific code necessary for interactivity. <b
          >Less code = fast load</b
        ></svelte:fragment
      >
    </FeatureItem>

    <FeatureItem>
      <svelte:fragment slot="icon">
        <ImageOutline class="text-white dark:text-primary-50" />
      </svelte:fragment>
      <svelte:fragment slot="h3">Image Optimization</svelte:fragment>
      <svelte:fragment slot="paragraph"
        >AstroNot automatically optimizes every image via a custom MarkdownX
        Astro pipeline. Don't worry about file size or resolution, just upload
        to Notion!
      </svelte:fragment>
    </FeatureItem>
  </FeatureDefault>
</Section>
