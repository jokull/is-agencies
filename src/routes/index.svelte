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
</script>

<svelte:head>
  <title>Icelandic Agencies</title>
</svelte:head>

<h1>Agencies</h1>

{#each items as agency}
  {@debug agency}
  <div>{agency.fields.name}</div>
{/each}
