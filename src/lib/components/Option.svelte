<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		selected,
		value,
		onClick,
		children
	}: {
		selected: boolean;
		value: string | undefined;
		onClick: (value: string | undefined) => void;
		children: Snippet;
	} = $props();
</script>

<button
	class="pill"
	data-selected={selected}
	onclick={() => {
		onClick(value);
	}}
>
	{@render children()}
</button>
