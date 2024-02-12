<script lang="ts">
	export let disabled = false;
	import { DIFFUCLTY_LEVEL_SEARCH_PARAM } from './puzzle';

	type difficultyLevel = 1 | 2 | 3 | 4;

	interface Level {
		name: string;
		level: difficultyLevel;
	}

	const levels: Level[] = [
		{
			name: 'Easy',
			level: 1
		},
		{
			name: 'Medium',
			level: 2
		},
		{
			name: 'Hard',
			level: 3
		},
		{
			name: 'Sudo-Hard',
			level: 4
		}
	];

	function startNewGame(level: difficultyLevel): void {
		const pathname = '/';
		const searchParams = `${DIFFUCLTY_LEVEL_SEARCH_PARAM}=${level}`;
		const url = `${pathname}?${searchParams}`;

		history.pushState({ pageId: 0, url: url }, '', url);
		window.location.pathname = pathname;
		window.location.search = searchParams;
	}

	function cancel(): void {
		disabled = true;
	}

	function cancelOnKeydown(e: KeyboardEvent): void {
		if (e.code == 'Escape') {
			cancel();
		}
	}
</script>

<div
	id="new-game"
	class="container"
	class:disabled
	on:keydown={cancelOnKeydown}
	role="menu"
	tabindex="0"
	aria-label="container"
>
	<div class="levels">
		<div>Difficulty Level:</div>
		{#each levels as level}
			<input
				class="name"
				type="button"
				value={level.name}
				on:click={() => {
					startNewGame(level.level);
				}}
			/>
		{/each}
	</div>

	<div class="cancel-container">
		<input class="cancel" type="button" on:click={cancel} value="Cancel" />
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		position: fixed;
		background-color: white;
		padding: 2em;
		border-style: solid;
		border-color: black;
		border-width: 0.25em;

		&.disabled {
			z-index: 9000;
			display: none;
			width: 30em;
			height: 20em;
			justify-content: space-evenly;
		}

		.levels {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.cancel-container {
			display: flex;
			flex-direction: row;
			justify-content: center;

			.cancel {
				width: 20em;
			}
		}
	}
</style>
