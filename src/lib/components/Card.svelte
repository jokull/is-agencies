<script lang="ts">
	import Field from './Field.svelte';
	import { normalizeUrl } from '$lib/utils';
	import type { Entry, Asset, EntryFields } from 'contentful';

	interface AgencyFields {
		name: string;
		url: string;
		logo?: Asset;
		founded?: number;
		size?: Entry<{ label: string }>;
		tags?: Entry<{ name: string }>[];
	}

	let { agency }: { agency: AgencyFields } = $props();
</script>

<div
	class="border-darkcloud border-t-4 border-b hover:bg-white hover:shadow-xl transition-all card"
>
	<div class="border-l border-r border-dust h-full flex flex-col">
		<div class="pb-8 border-b border-dust h-24 overflow-hidden">
			{#if agency.logo}
				<img
					src={`${agency.logo.fields.file.url}`}
					alt=""
					class="p-2 block pr-12 max-h-16"
				/>
			{:else}
				<div class="rounded-md bg-black opacity-5 m-2 pr-12 h-10"></div>
			{/if}
		</div>
		<div class="p-2 flex-grow">
			<h2 class="text-3xl leading-tight font-bold">
				<a target="_blank" href={normalizeUrl(agency.url)}>{agency.name}</a>
			</h2>
			<div class="flex">
				{#if agency.founded}
					<Field label="Since" value={agency.founded} />
				{/if}
				{#if agency.size}
					<Field label="Size" value={agency.size.fields.label} />
				{/if}
			</div>
		</div>
		{#if agency.tags}
			<div class="p-2 border-t border-dust">
				{#each agency.tags as tag}
					<div class="rounded-full border border-dust inline-block mr-2 px-3 py-1 text-xs">
						{tag.fields.name}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
