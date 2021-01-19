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
      const response = await client.getEntries({
        content_type: "agency",
        order: "fields.name",
      });
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
  import SizeOption from "../components/SizeOption.svelte";

  function updateSize(value) {
    size = value;
  }
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
    <SizeOption {size} onClick={updateSize} value={undefined}>All</SizeOption>
    <SizeOption {size} onClick={updateSize} value={"hsciTpdMBo4mHO9J4yLhA"}>
      <span class="font-medium">Small</span> (1–10)
    </SizeOption>
    <SizeOption {size} onClick={updateSize} value={"4HuxQINIsQ5Y8BWcg9vPte"}>
      <span class="font-medium">Large</span> (11+)
    </SizeOption>
  </div>

  <div class="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each items as agency}
      {#if (agency.fields.size && agency.fields.size.sys.id === size) || size === undefined}
        <Card agency={agency.fields} />
      {/if}
    {/each}
  </div>

  <footer class="mt-8 mb-4">
    <div>
      <div>Made by Brynjar and Jökull</div>
      <div>
        Ping <a
          href="https://twitter.com/jokull"
          target="_blank"
          class="border-b-2 border-ribbon">@jokull</a
        > with additions and corrections
      </div>
      <div class="font-light mt-2">
        Built with Tailwind, Contentful and Sapper
      </div>
      <div class="font-light">
        Hosted on <a
          href="https://github.com/jokull/is-agencies"
          target="_blank"
          class="border-b-2 border-ribbon">GitHub</a
        >
      </div>
    </div>
  </footer>
</div>
