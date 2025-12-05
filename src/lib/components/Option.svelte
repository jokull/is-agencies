<script lang="ts">
	let {
		selected,
		value,
		onClick,
		children
	}: {
		selected: boolean;
		value: string | undefined;
		onClick: (value: string | undefined) => void;
		children: any;
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
