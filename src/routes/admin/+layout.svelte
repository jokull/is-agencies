<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
	<title>Admin - IS Agencies</title>
</svelte:head>

<div class="min-h-screen bg-sand">
	{#if data.isAuthenticated}
		<!-- Admin Navigation -->
		<nav class="bg-white border-b border-dust">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 justify-between items-center">
					<div class="flex items-center space-x-8">
						<h1 class="text-xl font-bold text-darkcloud">IS Agencies Admin</h1>
						<div class="flex space-x-4">
							<a
								href="/admin"
								class="text-gray-700 hover:text-ribbon transition-colors font-medium"
							>
								Dashboard
							</a>
							<a
								href="/admin/agencies/new"
								class="text-gray-700 hover:text-ribbon transition-colors font-medium"
							>
								New Agency
							</a>
							<a
								href="/admin/images"
								class="text-gray-700 hover:text-ribbon transition-colors font-medium"
							>
								Images
							</a>
						</div>
					</div>
					<div class="flex items-center space-x-4">
						<a href="/" class="text-gray-700 hover:text-ribbon transition-colors text-sm">
							View Site
						</a>
						<form method="post" action="/admin?/logout">
							<button
								type="submit"
								class="text-sm text-gray-700 hover:text-red-600 transition-colors"
							>
								Logout
							</button>
						</form>
					</div>
				</div>
			</div>
		</nav>

		<!-- Main Content -->
		<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
			{@render children()}
		</main>
	{:else}
		<!-- Show login page if not authenticated -->
		{@render children()}
	{/if}
</div>
