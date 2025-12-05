<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	let previewUrl = $state<string | null>(null);
	let selectedFile = $state<File | null>(null);
	let isUploading = $state(false);

	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			selectedFile = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				previewUrl = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	function copyToClipboard(url: string) {
		navigator.clipboard.writeText(url);
		alert('URL copied to clipboard!');
	}
</script>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-3xl font-bold text-darkcloud">Image Manager</h1>
			<p class="text-gray-600 mt-2">Upload and manage images for agency logos</p>
		</div>
	</div>

	<!-- Upload section -->
	<div class="bg-white rounded-lg shadow-md p-6">
		<h2 class="text-xl font-semibold mb-4">Upload New Image</h2>

		{#if form?.error}
			<div class="rounded-md bg-red-50 p-4 border border-red-200 mb-4">
				<p class="text-red-800">{form.error}</p>
			</div>
		{/if}

		{#if form?.success && form?.url}
			<div class="rounded-md bg-green-50 p-4 border border-green-200 mb-4">
				<p class="text-green-800 mb-2">Image uploaded successfully!</p>
				<div class="flex items-center space-x-2">
					<code class="bg-white px-2 py-1 rounded text-sm flex-1">{form.url}</code>
					<button
						type="button"
						onclick={() => copyToClipboard(form.url)}
						class="px-3 py-1 bg-ribbon text-white text-sm rounded hover:bg-blue-700"
					>
						Copy URL
					</button>
				</div>
			</div>
		{/if}

		<form
			method="post"
			action="?/upload"
			enctype="multipart/form-data"
			class="space-y-4"
			use:enhance={() => {
				isUploading = true;
				return async ({ update }) => {
					await update();
					isUploading = false;
					previewUrl = null;
					selectedFile = null;
				};
			}}
		>
			<div>
				<label for="file" class="block text-sm font-medium text-gray-700 mb-2">
					Select Image <span class="text-red-500">*</span>
				</label>
				<input
					type="file"
					id="file"
					name="file"
					accept="image/*"
					required
					onchange={handleFileChange}
					class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ribbon focus:border-ribbon"
				/>
			</div>

			{#if previewUrl}
				<div>
					<p class="text-sm font-medium text-gray-700 mb-2">Preview:</p>
					<img src={previewUrl} alt="Preview" class="max-w-xs rounded-lg border border-gray-300" />
				</div>
			{/if}

			<button
				type="submit"
				disabled={isUploading}
				class="px-4 py-2 bg-ribbon text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isUploading ? 'Uploading...' : 'Upload Image'}
			</button>
		</form>
	</div>

	<!-- Images gallery -->
	<div class="bg-white rounded-lg shadow-md p-6">
		<h2 class="text-xl font-semibold mb-4">
			Uploaded Images ({data.images.length})
		</h2>

		{#if data.images.length === 0}
			<p class="text-gray-600">No images uploaded yet.</p>
		{:else}
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each data.images as image}
					<div class="border border-gray-200 rounded-lg overflow-hidden group">
						<div class="aspect-square bg-gray-100 flex items-center justify-center">
							<img
								src={image.url}
								alt={image.key}
								class="max-w-full max-h-full object-contain"
							/>
						</div>
						<div class="p-3 space-y-2">
							<div class="text-xs text-gray-600 truncate" title={image.key}>
								{image.key}
							</div>
							<div class="text-xs text-gray-500">
								{(image.size / 1024).toFixed(1)} KB
							</div>
							<div class="flex space-x-2">
								<button
									type="button"
									onclick={() => copyToClipboard(image.url)}
									class="flex-1 text-xs px-2 py-1 bg-ribbon text-white rounded hover:bg-blue-700"
								>
									Copy URL
								</button>
								<form method="post" action="?/delete" use:enhance class="flex-1">
									<input type="hidden" name="key" value={image.key} />
									<button
										type="submit"
										class="w-full text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
										onclick={() => confirm('Delete this image?')}
									>
										Delete
									</button>
								</form>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
