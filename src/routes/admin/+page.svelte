<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { normalizeUrl } from '$lib/utils';

	let { data } = $props<{ data: PageData }>();

	let password = $state('');

	function handleLogin(e: Event) {
		e.preventDefault();
		if (password) {
			// Use full page navigation to properly handle server-side redirect
			window.location.href = `/admin?password=${encodeURIComponent(password)}`;
		}
	}

	// Group tags by agency_id for quick lookup
	type AgencyTag = { id: string; name: string; slug: string; agency_id: string };
	let agencyTagsMap = $derived.by(() => {
		const map = new Map<string, AgencyTag[]>();
		for (const tag of data.agencyTags) {
			if (!map.has(tag.agency_id)) {
				map.set(tag.agency_id, []);
			}
			map.get(tag.agency_id)?.push(tag as AgencyTag);
		}
		return map;
	});
</script>

{#if data.isAuthenticated}
	<div class="space-y-6">
		<!-- Header with action button -->
		<div class="flex justify-between items-center">
			<h1 class="text-3xl font-bold text-darkcloud">Agencies</h1>
			<a
				href="/admin/agencies/new"
				class="bg-ribbon text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
			>
				+ New Agency
			</a>
		</div>

		{#if data.agencies.length === 0}
			<div class="bg-white rounded-lg shadow p-8 text-center">
				<p class="text-gray-600">No agencies yet. Create your first one!</p>
			</div>
		{:else}
			<!-- Agencies table -->
			<div class="bg-white rounded-lg shadow overflow-hidden">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Logo
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								URL
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Size
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tags
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each data.agencies as agency}
							{@const tags = agencyTagsMap.get(agency.id) || []}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap">
									{#if agency.logo_url}
										<img
											src={agency.logo_url}
											alt={agency.name}
											class="h-10 w-10 rounded object-cover"
										/>
									{:else}
										<div class="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
											<span class="text-xs text-gray-500">No logo</span>
										</div>
									{/if}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm font-medium text-gray-900">{agency.name}</div>
									{#if agency.founded}
										<div class="text-sm text-gray-500">Founded {agency.founded}</div>
									{/if}
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<a
										href={normalizeUrl(agency.url)}
										target="_blank"
										rel="noopener noreferrer"
										class="text-sm text-ribbon hover:underline"
									>
										{agency.url}
									</a>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span class="text-sm text-gray-900">
										{agency.size?.label || 'N/A'}
									</span>
								</td>
								<td class="px-6 py-4">
									<div class="flex flex-wrap gap-1">
										{#each tags as tag}
											<span
												class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
											>
												{tag.name}
											</span>
										{/each}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<form method="post" action="?/toggle_visible" use:enhance>
										<input type="hidden" name="id" value={agency.id} />
										<input type="hidden" name="visible" value={agency.visible} />
										<button
											type="submit"
											class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {agency.visible
												? 'bg-green-100 text-green-800'
												: 'bg-gray-100 text-gray-800'}"
										>
											{agency.visible ? 'Published' : 'Hidden'}
										</button>
									</form>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
									<a
										href="/admin/agencies/{agency.id}/edit"
										class="text-ribbon hover:text-blue-900"
									>
										Edit
									</a>
									<form method="post" action="?/delete" use:enhance class="inline">
										<input type="hidden" name="id" value={agency.id} />
										<button
											type="submit"
											class="text-red-600 hover:text-red-900"
											onclick={() => confirm(`Are you sure you want to delete ${agency.name}?`)}
										>
											Delete
										</button>
									</form>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
{:else}
	<!-- Login form -->
	<div class="min-h-screen flex items-center justify-center">
		<div class="mx-auto max-w-md w-full">
			<div class="rounded-lg bg-white p-8 shadow-md">
				<h2 class="mb-6 text-2xl font-semibold text-center">Admin Login</h2>

				<div class="mb-6 rounded-md bg-yellow-50 p-4 border border-yellow-200">
					<p class="text-yellow-700 text-sm">
						Please enter the password to access the admin panel.
					</p>
				</div>

				<form onsubmit={handleLogin} class="space-y-4">
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<input
							id="password"
							type="password"
							bind:value={password}
							class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-ribbon focus:border-ribbon"
							placeholder="Enter password"
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full bg-ribbon text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
					>
						Log In
					</button>
				</form>

				<div class="mt-6 pt-6 border-t border-gray-200">
					<p class="text-sm text-gray-600 text-center">
						Use <code class="bg-gray-100 px-1 rounded">?password=YOUR_SECRET</code> in the URL
					</p>
				</div>
			</div>

			<div class="mt-6 text-center">
				<a href="/" class="text-ribbon hover:underline">← Back to homepage</a>
			</div>
		</div>
	</div>
{/if}
