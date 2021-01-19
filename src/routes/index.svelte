<script context="module">
  import { createClient } from "contentful";

  export async function preload({ params }, session) {
    const draftMode = session.draftMode || false;
    const accessToken = draftMode
      ? session.contentfulStagingToken
      : session.contentfulAccessToken;

    const client = createClient({
      space: session.contentfulSpace,
      accessToken,
      host: draftMode ? "preview.contentful.com" : null,
      resolveLinks: true,
    });
    try {
      const response = await client.getEntries({ content_type: "agency" });
      return { items: response.items };
    } catch (error) {
      return [];
    }
  }
</script>

<script>
  export let items;
  let size;
  import Card from "../components/Card.svelte";
</script>

<svelte:head>
  <title>Icelandic Agencies</title>
</svelte:head>

<div class="p-4 m-auto max-w-screen-xl">
  <h1 class="mb-14 lg:mt-6">
    <span class="block font-serif text-lg lg:text-4xl italic font-light">
      The Big List of
    </span>
    <span class="text-ribbon text-4xl font-medium">Icelandic Web Agencies</span>
  </h1>

  <div class="mb-8">
    <div class="font-light pb-2">Filter</div>
    <button
      class={`rounded-full border border-dust block mr-2 px-3 py-1 text-xs mb-2 font-light ${
        size === undefined ? "bg-dust" : "border-dust"
      }`}
      on:click={() => {
        size = undefined;
      }}> All </button>
    <button
      class={`rounded-full border border-dust block mr-2 px-3 py-1 text-xs mb-2 font-light ${
        size === "Small (1–10)" ? "bg-dust" : "border-dust"
      }`}
      on:click={() => {
        size = "Small (1–10)";
      }}><span class="font-medium">Small</span> (1–10)</button
    >
    <button
      class={`rounded-full border border-dust block mr-2 px-3 py-1 text-xs mb-2 font-light ${
        size === "Large (11+)" ? "bg-dust" : "border-dust"
      }`}
      on:click={() => {
        size = "Large (11+)";
      }}><span class="font-medium">Large</span> (11+)</button
    >
  </div>

  <div class="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each items as agency}
      {#if agency.fields.size === size || size === undefined}
        <Card agency={agency.fields} />
      {/if}
    {/each}
  </div>
</div>
