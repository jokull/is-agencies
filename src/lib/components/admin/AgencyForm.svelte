<script lang="ts">
	import { enhance } from '$app/forms';

	type Agency = {
		id?: string;
		name?: string;
		url?: string;
		founded?: number;
		logo_url?: string;
		size_id?: string;
	};

	type Tag = {
		id: string;
		name: string;
		slug: string;
	};

	type Size = {
		id: string;
		label: string;
		slug: string;
	};

	let {
		agency,
		tags,
		sizes,
		currentTagIds = [],
		action,
		submitLabel
	}: {
		agency?: Agency;
		tags: Tag[];
		sizes: Size[];
		currentTagIds?: string[];
		action: string;
		submitLabel: string;
	} = $props();

	let isSubmitting = $state(false);
</script>

<form
	method="post"
	{action}
	class="bg-white rounded-lg shadow-md p-6 space-y-6"
	use:enhance={() => {
		isSubmitting = true;
		return async ({ update }) => {
			await update();
			isSubmitting = false;
		};
	}}
>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<!-- Name -->
		<div class="md:col-span-2">
			<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
				Name <span class="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="name"
				name="name"
				value={agency?.name || ''}
				required
				class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ribbon focus:border-ribbon"
				placeholder="Agency Name"
			/>
		</div>

		<!-- URL -->
		<div>
			<label for="url" class="block text-sm font-medium text-gray-700 mb-2">
				Website URL <span class="text-red-500">*</span>
			</label>
			<input
				type="url"
				id="url"
				name="url"
				value={agency?.url || ''}
				required
				class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ribbon focus:border-ribbon"
				placeholder="https://example.com"
			/>
		</div>

		<!-- Founded -->
		<div>
			<label for="founded" class="block text-sm font-medium text-gray-700 mb-2"> Founded </label>
			<input
				type="number"
				id="founded"
				name="founded"
				value={agency?.founded || ''}
				min="1900"
				max={new Date().getFullYear()}
				class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ribbon focus:border-ribbon"
				placeholder="2020"
			/>
		</div>

		<!-- Logo URL -->
		<div class="md:col-span-2">
			<label for="logo_url" class="block text-sm font-medium text-gray-700 mb-2">
				Logo URL
			</label>
			<input
				type="text"
				id="logo_url"
				name="logo_url"
				value={agency?.logo_url || ''}
				class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ribbon focus:border-ribbon"
				placeholder="/images/abc123.png"
			/>
			<p class="mt-1 text-sm text-gray-500">
				Upload images in the <a href="/admin/images" class="text-ribbon hover:underline"
					>Images section</a
				> and paste the URL here
			</p>
		</div>

		<!-- Size -->
		<div>
			<label for="size_id" class="block text-sm font-medium text-gray-700 mb-2">
				Company Size
			</label>
			<select
				id="size_id"
				name="size_id"
				class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ribbon focus:border-ribbon"
			>
				<option value="">Select size...</option>
				{#each sizes as size}
					<option value={size.id} selected={agency?.size_id === size.id}>
						{size.label}
					</option>
				{/each}
			</select>
		</div>

		<!-- Tags -->
		<div class="md:col-span-2">
			<label class="block text-sm font-medium text-gray-700 mb-2"> Tags </label>
			<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
				{#each tags as tag}
					<label class="flex items-center space-x-2 cursor-pointer">
						<input
							type="checkbox"
							name="tag_ids"
							value={tag.id}
							checked={currentTagIds.includes(tag.id)}
							class="rounded border-gray-300 text-ribbon focus:ring-ribbon"
						/>
						<span class="text-sm text-gray-700">{tag.name}</span>
					</label>
				{/each}
			</div>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex justify-end space-x-4 pt-4 border-t border-gray-200">
		<a
			href="/admin"
			class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
		>
			Cancel
		</a>
		<button
			type="submit"
			disabled={isSubmitting}
			class="px-4 py-2 bg-ribbon text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{isSubmitting ? 'Saving...' : submitLabel}
		</button>
	</div>
</form>
