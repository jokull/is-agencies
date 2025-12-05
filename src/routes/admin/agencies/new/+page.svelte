<script lang="ts">
	import type { PageData } from './$types';
	import AgencyForm from '$lib/components/admin/AgencyForm.svelte';

	let { data } = $props<{ data: PageData }>();
</script>

<div class="max-w-4xl">
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-darkcloud">New Agency</h1>
		<p class="text-gray-600 mt-2">Add a new agency to the directory</p>
	</div>

	<AgencyForm tags={data.tags} sizes={data.sizes} action="" submitLabel="Create Agency" />
</div>
