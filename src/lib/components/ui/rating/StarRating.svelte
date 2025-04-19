<script lang="ts">
	const { initialRating } = $props();

	let rating = $state(initialRating ?? 0);

	function selectRating(value: number) {
		// Ensure rating stays within 0 to 5
		rating = Math.max(0, Math.min(5, value));
	}

	/**
	 * Determines the visual state of each star based on the current rating.
	 * @param starIndex The 0-based index of the star (0 to 4).
	 * @param currentRating The current selected rating.
	 * @returns 'full', 'half', or 'empty'.
	 */
	function getStarFillState(starIndex: number, currentRating: number): 'full' | 'half' | 'empty' {
		// The full value this star position represents is starIndex + 1
		// The half value this star position represents is starIndex + 0.5

		if (currentRating >= starIndex + 1) {
			return 'full'; // Rating is >= the full value of this star
		} else if (currentRating === starIndex + 0.5) {
			return 'half'; // Rating exactly matches the half value of this star position
		} else {
			return 'empty'; // Rating is less than the half value of this star position
		}
	}

	async function onInteract(event: MouseEvent | KeyboardEvent, rating: number) {
		if (event instanceof MouseEvent) {
			selectRating(rating);
		} else if (event instanceof KeyboardEvent) {
			// Basic keyboard navigation: Allow selecting with Enter or Space
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				selectRating(rating);
			}
		}
	}

	// Define the SVG path data for a standard 5-pointed star (viewBox 0 0 24 24)
	// This path is common and should represent a typical star shape.
	const starPath =
		'M12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.21l1.18-6.88l-5-4.87l6.91-1.01L12 2z';
</script>

<!-- Define half filled svg called "half-star-gradient-global", and position it off screen-->
<svg
	aria-hidden="true"
	focusable="false"
	style="position: absolute; width: 0; height: 0; overflow: hidden;"
>
	<defs>
		<linearGradient id="half-star-gradient-global" x1="0%" y1="100%" x2="100%" y2="100%">
			<stop offset="50%" style="stop-color:rgb(253 224 71);stop-opacity:1" />
			<stop offset="50%" style="stop-color:transparent" stop-opacity="0" />
		</linearGradient>
	</defs>
</svg>

<fieldset class="mb-2 flex items-center gap-1" role="radiogroup" aria-label="Star rating">
	{#each Array(5) as _, i}
		{@const fullValue = i + 1}
		{@const halfValue = i + 0.5}

		{@const fillState = getStarFillState(i, rating)}

		<div class="star-container relative flex h-5 w-5 items-center justify-center sm:h-8 sm:w-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d={starPath}
					fill={fillState === 'full'
						? 'rgb(253 224 71)'
						: fillState === 'half'
							? 'url(#half-star-gradient-global)'
							: 'none'}
				/>
			</svg>

			<button
				class="absolute left-0 top-0 h-full cursor-pointer"
				style="width: 50%;"
				onclick={(e) => onInteract(e, halfValue)}
				onkeydown={(e) => onInteract(e, halfValue)}
				role="radio"
				aria-checked={rating === halfValue}
				tabindex="0"
				aria-label={`${halfValue} stars`}
				title={`${halfValue} stars`}
                type="submit"
			></button>
			<button
				class="absolute right-0 top-0 h-full cursor-pointer"
				style="width: 50%;"
				onclick={(e) => onInteract(e, fullValue)}
				onkeydown={(e) => onInteract(e, halfValue)}
				role="radio"
				aria-checked={rating === fullValue}
				tabindex="0"
				aria-label={`${fullValue} stars`}
				title={`${fullValue} stars`}
                type="submit"
			></button>
		</div>
	{/each}
	<input type="hidden" name="rating" value={rating} />
</fieldset>

<style>
	/* Add a subtle visual cue when hovering over a star container */
	.star-container:hover svg {
		opacity: 0.9;
	}
</style>
