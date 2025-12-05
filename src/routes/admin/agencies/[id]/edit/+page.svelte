<script lang="ts">
	import type { PageData } from './$types';
	import AgencyForm from '$lib/components/admin/AgencyForm.svelte';

	let { data } = $props<{ data: PageData }>();
</script>

<div class="max-w-4xl">
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-darkcloud">Edit Agency</h1>
		<p class="text-gray-600 mt-2">Update agency information</p>
	</div>

	<AgencyForm
		agency={data.agency}
		tags={data.tags}
		sizes={data.sizes}
		currentTagIds={data.currentTagIds}
		action=""
		submitLabel="Update Agency"
	/>
</div>
