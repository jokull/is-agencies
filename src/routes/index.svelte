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
    const requests = [
      client.getEntries({
        content_type: "agency",
        order: "fields.name",
      }),
      client.getEntries({ content_type: "tag" }),
    ];
    try {
      const [agencies, tags] = await Promise.all(requests);
      return { agencies: agencies.items, tags: tags.items };
    } catch (error) {
      console.log(error);
      return { agencies: [], tags: [] };
    }
  }
</script>

<script>
  export let agencies;
  export let tags;
  let selectedSize;
  let selectedTag;
  import Card from "../components/Card.svelte";
  import Option from "../components/Option.svelte";

  function updateSize(value) {
    selectedSize = value;
  }

  function updateTag(value) {
    selectedTag = value;
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
    <span class="text-ribbon text-4xl lg:text-5xl font-medium">
      Icelandic Digital Agencies
    </span>
  </h1>

  <div class="flex">
    <div class="mb-8 mr-4">
      <div class="font-light pb-2">Size</div>
      <Option
        selected={selectedSize === undefined}
        onClick={updateSize}
        value={undefined}>All</Option
      >
      <div>
        <Option
          selected={selectedSize === "hsciTpdMBo4mHO9J4yLhA"}
          onClick={updateSize}
          value={"hsciTpdMBo4mHO9J4yLhA"}
        >
          Small <span class="font-light hidden sm:inline">(1–10 employees)</span
          >
        </Option>
        <Option
          selected={selectedSize === "4HuxQINIsQ5Y8BWcg9vPte"}
          onClick={updateSize}
          value={"4HuxQINIsQ5Y8BWcg9vPte"}
        >
          Large <span class="font-light hidden sm:inline">(11+ employees)</span>
        </Option>
      </div>
    </div>
    <div class="mb-8">
      <div class="font-light pb-2">Tag</div>
      <Option
        selected={selectedTag === undefined}
        onClick={updateTag}
        value={undefined}
      >
        All
      </Option>
      <div>
        {#each tags as tag}
          <Option
            selected={selectedTag === tag.sys.id}
            onClick={updateTag}
            value={tag.sys.id}
          >
            {tag.fields.name}
          </Option>
        {/each}
      </div>
    </div>
  </div>

  <div class="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {#each agencies as agency}
      {#if (agency.fields.size && agency.fields.size.sys.id === selectedSize) || selectedSize === undefined}
        {#if (agency.fields.tags && agency.fields.tags.filter((tag) => {
            return tag.sys.id === selectedTag;
          }).length) || selectedTag === undefined}
          <Card agency={agency.fields} />
        {/if}
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
