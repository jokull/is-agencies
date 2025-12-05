<script lang="ts">
	let { label, value }: { label: string; value: string | number } = $props();
</script>

<div class="mr-4 text-darkcloud opacity-80">
	<span class="font-serif italic font-light">{label}</span>
	<span class="font-mono font-medium">{value}</span>
</div>
