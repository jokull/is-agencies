<script>
  export let size;
  export let value;
  export let onClick;
</script>

<button
  class="pill"
  aria-selected={size === value ? "true" : undefined}
  on:click={() => {
    onClick(value);
  }}>
  <slot />
</button>
