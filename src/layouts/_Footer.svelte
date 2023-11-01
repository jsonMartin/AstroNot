<script>
  import {
    Footer,
    FooterCopyright,
    FooterLinkGroup,
    FooterLink,
    FooterBrand,
    FooterIcon,
  } from "flowbite-svelte";
  import {
    FacebookSolid,
    GithubSolid,
    DiscordSolid,
    TwitterSolid,
  } from "flowbite-svelte-icons";
  import { navbar } from "../stores/layout";

  $: transluscent = $navbar.transluscent;
  $: footerClass = `text-white navbar bg-primary-50 ${
    transluscent ? "dark:bg-primary-50 dark:bg-opacity-20" : ""
  }`;
</script>

{#key $navbar}
  <footer>
    <Footer footerType="socialmedia" class={footerClass}>
      <div
        class="m-auto max-w-screen-2xl sm:flex sm:items-center sm:justify-between"
      >
        <div class="flex items-center justify-center">
          <img
            src="/images/astronot-logo.webp"
            class="mr-3 h-6 rounded-full sm:h-10"
            width="40"
            height="40"
            alt="Flowbite Logo"
          />
          <a
            class="flex-none text-xl font-semibold text-gray-100"
            href="/"
            aria-label="Brand">AstroNot</a
          >
        </div>
        <div
          class="align-center flex flex-col items-center !text-gray-300 dark:!text-primary-200"
        >
          <FooterLinkGroup
            ulClass="flex flex-row justify-center items-center my-2 text-secondary-200 font-semibold"
          >
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterLinkGroup>
          <FooterCopyright
            href="https://opensource.org/license/mit/"
            by="AstroNot 🚀🌚&nbsp;"
            copyrightMessage="Open Source & Free Forever ❤️"
            spanClass="text-xs text-grey-900"
          />
        </div>

        <div class="mt-4 flex items-center justify-center space-x-6 sm:mt-0">
          <FooterIcon href="/">
            <FacebookSolid
              class="h-4 w-4 text-gray-100 hover:scale-125 dark:text-gray-100 dark:hover:text-white"
            />
          </FooterIcon>
          <FooterIcon href="/">
            <DiscordSolid
              class="h-4 w-4 text-gray-100 hover:scale-125 dark:text-gray-100 dark:hover:text-white"
            />
          </FooterIcon>
          <FooterIcon href="/">
            <TwitterSolid
              class="h-4 w-4 text-gray-100 hover:scale-125 dark:text-gray-100 dark:hover:text-white"
            />
          </FooterIcon>
          <FooterIcon href="/">
            <GithubSolid
              class="h-4 w-4 text-gray-100 hover:scale-125 dark:text-gray-100 dark:hover:text-white"
            />
          </FooterIcon>
        </div>
      </div>
    </Footer>
  </footer>
{/key}
