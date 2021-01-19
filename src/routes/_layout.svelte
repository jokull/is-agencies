<script>
  export let segment;
</script>

<main>
  <slot {segment} />
</main>

<style global lang="postcss">
  @import "../global.pcss";
</style>
