<script>
  export let selected;
  export let value;
  export let onClick;
</script>

<button
  class="pill"
  aria-selected={selected ? "true" : undefined}
  on:click={() => {
    onClick(value);
  }}
>
  <slot />
</button>
