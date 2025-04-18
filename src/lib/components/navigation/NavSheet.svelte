<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index';
	import { buttonVariants } from '$lib/components/ui/button/index';
	import Clapperboard from '@lucide/svelte/icons/clapperboard';
	import Menu from '@lucide/svelte/icons/menu';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import type { Session } from '@supabase/supabase-js';
	import { Button } from '$lib/components/ui/button/';
	import * as Avatar from '$lib/components/ui/avatar/';
	import { extractInitials } from '$lib/utils';

	const { session }: { session: Session | null } = $props();
</script>

<span class="m-4 flex items-center gap-4">
	<span class="flex items-center gap-2">
		<Clapperboard size={32} />
		<h1 class="text-3xl font-bold">Cinelog</h1>
	</span>
	<div class="ml-auto">
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>
				<Menu />
			</Sheet.Trigger>
			<Sheet.Content side="right">
				<div class="space-y-4">
					{#if session}
						<span class="flex gap-4 items-center">
							<Avatar.Root class="h-16 w-16">
								<Avatar.Image
									src={session.user.user_metadata.avatar_url}
									alt={session.user.email}
								/>
								<Avatar.Fallback>{extractInitials(session.user.email ?? '')}</Avatar.Fallback>
							</Avatar.Root>
							<p class="text-muted-foreground">Signed in as: {session.user.email}</p>
							
						</span>
						<form method="POST" action="/?/signout">
							<Button type="submit" variant="destructive">Sign out!</Button>
						</form>
					{:else}
						<form method="POST" action="/?/loginWithDiscord">
							<Button type="submit" class="bg-[#5865F2] text-foreground hover:text-background"
								>Sign in with Discord</Button
							>
						</form>
						<form method="POST" action="/?/loginWithGitHub">
							<Button type="submit">Sign in with GitHub</Button>
							</form>
					{/if}
					<DarkModeToggle />
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</span>
