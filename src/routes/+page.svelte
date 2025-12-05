<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Option from '$lib/components/Option.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Read filters from URL search params
	let selectedSize = $derived($page.url.searchParams.get('size') || undefined);
	let selectedTags = $derived(
		$page.url.searchParams.get('tags')?.split(',').filter(Boolean) || []
	);

	function updateSize(value: string | undefined) {
		const params = new URLSearchParams($page.url.searchParams);
		if (value) {
			params.set('size', value);
		} else {
			params.delete('size');
		}
		goto(`?${params.toString()}`, { replaceState: true, noScroll: true });
	}

	function updateTag(value: string | undefined) {
		const params = new URLSearchParams($page.url.searchParams);

		if (value === undefined) {
			// Clear all tags
			params.delete('tags');
		} else {
			// Toggle tag in the list
			const currentTags = params.get('tags')?.split(',').filter(Boolean) || [];
			const tagIndex = currentTags.indexOf(value);

			if (tagIndex >= 0) {
				// Remove tag
				currentTags.splice(tagIndex, 1);
			} else {
				// Add tag
				currentTags.push(value);
			}

			if (currentTags.length > 0) {
				params.set('tags', currentTags.join(','));
			} else {
				params.delete('tags');
			}
		}

		goto(`?${params.toString()}`, { replaceState: true, noScroll: true });
	}

	// Derived filtered agencies using Svelte 5's $derived rune
	let filteredAgencies = $derived(
		data.agencies.filter((agency) => {
			const sizeMatch =
				selectedSize === undefined ||
				(agency.fields.size && agency.fields.size.sys.slug === selectedSize);
			const tagMatch =
				selectedTags.length === 0 ||
				(agency.fields.tags &&
					agency.fields.tags.some((tag) => selectedTags.includes(tag.sys.slug)));
			return sizeMatch && tagMatch;
		})
	);
</script>

<svelte:head>
	<title>The Big List of Icelandic Digital Agencies</title>
	<meta
		name="description"
		content="A community-maintained directory of Icelandic web agencies and digital studios"
	/>
</svelte:head>

<div class="p-4 m-auto max-w-screen-xl">
	<h1 class="mb-14 lg:mt-6">
		<span class="block font-serif text-lg lg:text-4xl italic font-light"> The Big List of </span>
		<span class="text-ribbon text-4xl lg:text-5xl font-medium">
			Icelandic Digital Agencies
		</span>
	</h1>

	<div class="flex">
		<div class="mb-8 mr-4">
			<div class="font-light pb-2">Size</div>
			<Option selected={selectedSize === undefined} onClick={updateSize} value={undefined}
				>All</Option
			>
			<div>
				<Option
					selected={selectedSize === 'small'}
					onClick={updateSize}
					value={'small'}
				>
					Small <span class="font-light hidden sm:inline">(1–10 employees)</span>
				</Option>
				<Option
					selected={selectedSize === 'large'}
					onClick={updateSize}
					value={'large'}
				>
					Large <span class="font-light hidden sm:inline">(11+ employees)</span>
				</Option>
			</div>
		</div>
		<div class="mb-8">
			<div class="font-light pb-2">Tag</div>
			<Option selected={selectedTags.length === 0} onClick={updateTag} value={undefined}>
				All
			</Option>
			<div>
				{#each data.tags as tag}
					<Option selected={selectedTags.includes(tag.sys.slug)} onClick={updateTag} value={tag.sys.slug}>
						{tag.fields.name}
					</Option>
				{/each}
			</div>
		</div>
	</div>

	<div class="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredAgencies as agency}
			<Card agency={agency.fields} />
		{/each}
	</div>

	<footer class="mt-8 mb-4">
		<div>
			<div>Made by Brynjar and Jökull</div>
			<div>
				Ping <a href="https://twitter.com/jokull" target="_blank" class="border-b-2 border-ribbon"
					>@jokull</a
				> with additions and corrections
			</div>
			<div class="font-light mt-2">Built with SvelteKit, Tailwind CSS and Cloudflare D1</div>
			<div class="font-light">
				Hosted on <a
					href="https://pages.cloudflare.com"
					target="_blank"
					class="border-b-2 border-ribbon">Cloudflare Pages</a
				>. Source on <a
					href="https://github.com/jokull/is-agencies"
					target="_blank"
					class="border-b-2 border-ribbon">GitHub</a
				>
			</div>
		</div>
	</footer>
</div>
