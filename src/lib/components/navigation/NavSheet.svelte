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

	let isOpen = $state(false);

	const navItems = [
		{
			href: "/search",
			displayText: "Search",
			shouldDisplay: () => true
		},
		{
			href: '/lists',
			displayText: 'Lists',
			shouldDisplay: () => !!session
		},
		{
			href: "/attribution",
			displayText: "Attribution",
			shouldDisplay: () => true
		}
	];
</script>

<span class="m-4 flex items-center gap-4">
	<a class="flex items-center gap-2" href="/">
		<Clapperboard size={32} />
		<h1 class="text-3xl font-bold">Cinelog</h1>
	</a>
	<div class="ml-auto">
		<Sheet.Root bind:open={isOpen}>
			<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>
				<Menu />
			</Sheet.Trigger>
			<Sheet.Content side="right">
				<div class="space-y-4">
					{#if session}
						<span class="flex items-center gap-4">
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
						<span class="flex gap-2">
							<form method="POST" action="/?/loginWithDiscord">
								<Button type="submit" class="bg-[#5865F2] text-foreground hover:text-background"
									>Sign in with Discord</Button
								>
							</form>
							<form method="POST" action="/?/loginWithGitHub">
								<Button type="submit">Sign in with GitHub</Button>
							</form>
						</span>
					{/if}
					<ul>
						{#each navItems as { shouldDisplay, displayText, href }}
							{#if shouldDisplay()}
								<li><Button variant="link" class="text-xl -ml-3" {href} onclick={() => (isOpen = false)}>{displayText}</Button></li>
							{/if}
						{/each}
					</ul>
				</div>
				<div class="my-4">
					<DarkModeToggle  />
				</div>
				
			</Sheet.Content>
		</Sheet.Root>
	</div>
</span>
