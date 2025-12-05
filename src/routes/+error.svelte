<script lang="ts">
	import { page } from '$app/stores';

	let { status } = $derived($page);
	let { message } = $derived($page.error || { message: 'Unknown error' });
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="p-4 m-auto max-w-screen-xl">
	<h1 class="text-4xl font-bold mb-4">{status}</h1>
	<p class="text-lg">{message}</p>
	<p class="mt-4">
		<a href="/" class="border-b-2 border-ribbon">← Back to home</a>
	</p>
</div>
