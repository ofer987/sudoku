<script lang="ts">
	export let isDisplayed = false;

	type difficulty = 1 | 2 | 3 | 4;

	interface Level {
		name: string;
		level: difficulty;
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

	function startNewGame(): void {
		console.log('hello');
		const url = '/';
		history.pushState({ pageId: 0, url: url }, '', url);
		window.location.pathname = url;
	}

	function cancel(): void {
		isDisplayed = false;
	}

	function cancelOnKeydown(e: KeyboardEvent): void {
		console.log('hello');
		console.log(e.code);

		if (e.code == 'Escape') {
			cancel();
		}
	}
</script>

<div
	id="new-game"
	class="container"
	class:is-displayed={isDisplayed}
	on:keydown={cancelOnKeydown}
	role="menu"
	tabindex="0"
	aria-label="container"
>
	<div class="levels">
		<div>Difficult Level:</div>
		{#each levels as level}
			<input
				class="name"
				type="button"
				value={level.name}
				on:click={() => {
					startNewGame();
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
		z-index: 9000;
		display: none;
		width: 30em;
		height: 20em;
		justify-content: space-evenly;

		&.is-displayed {
			display: flex;
			flex-direction: column;
			position: fixed;
			background-color: white;
			padding: 2em;

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
	}
</style>
