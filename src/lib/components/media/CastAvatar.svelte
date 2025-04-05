<script lang="ts">
	import type { Credit } from '$lib/tmdb/types';
	import * as Avatar from '$lib/components/ui/avatar';
	import { getSrcForPath } from '$lib/tmdb/utils';
	import { extractInitials } from '$lib/utils';
	import { ProfileSize } from 'tmdb-ts';

	const { credit }: { credit: Credit } = $props();

	const { profilePath, name, role } = credit;
</script>

<div class="inline-block text-center">
	<Avatar.Root class="mb-2 h-24 w-24">
		<Avatar.Image src={getSrcForPath(profilePath, ProfileSize.W185)} />
		<Avatar.Fallback class="text-2xl">{extractInitials(name)}</Avatar.Fallback>
	</Avatar.Root>
	<p class="font-semibold">{name}</p>
	<p class="my-2">{role}</p>
</div>
