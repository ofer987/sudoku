<script lang="ts">
	import { Puzzle } from './puzzle';
	import Tile from './Tile.svelte';
	import NewGame from './NewGame.svelte';

	export let puzzle: Puzzle;
	let isNewGameDisplayed = false;
	let startingBoard = puzzle.board;
	let isBeginnerMode = true;
	let copyText: 'copy' | 'copied' = 'copy';
	let isCopyButtonEnabled = true;

	$: {
		copyText = 'copied';
		if (isCopyButtonEnabled) {
			copyText = 'copy';
		}
	}

	let state = startingBoard;

	let pageId = 0;
	let pageUrl = window.location.toString();

	async function recordState(): Promise<void> {
		pageId += 1;
		console.log(`Page Id is ${pageId}`);

		const url = `#${puzzle.toHash}`;
		history.pushState({ pageId: pageId, url: url }, '', url);
		pageUrl = window.location.toString();
		isCopyButtonEnabled = true;
	}

	async function copyUrlToClipboard(): Promise<void> {
		const url = window.location.toString();

		await navigator.clipboard.writeText(url);
		isCopyButtonEnabled = false;

		alert('Copied URL to Clipboard');
	}

	function startNewGame(): void {
		isNewGameDisplayed = true;
	}
</script>

<div class="container" class:is-disabled={isNewGameDisplayed}>
	<div class="beginner-mode">
		<input
			id="beginner-mode-value"
			type="checkbox"
			bind:checked={isBeginnerMode}
			disabled={isNewGameDisplayed}
		/>
		<label for="beginner-mode-value">Beginner Mode</label>
	</div>

	<div class="results">
		{#if puzzle.isCorrect}
			<div class="message">Correct!</div>
		{:else}
			<div class="message">Not correct yet!</div>
		{/if}
	</div>
</div>

<div class="puzzle">
	{#each state as value}
		<Tile
			bind:tile={value}
			on:numberChanged={recordState}
			{isBeginnerMode}
			disabled={isNewGameDisplayed}
		/>
	{/each}
</div>

<div class="state">
	<label for="value">Restart from here:</label>
	<div class="container">
		<button type="button" id="value" on:click={copyUrlToClipboard} disabled={isNewGameDisplayed}
			>{pageUrl}</button
		>
	</div>
	<input
		id="button"
		type="button"
		value={copyText}
		on:click={copyUrlToClipboard}
		disabled={isNewGameDisplayed}
	/>
</div>

<div class="new-game">
	<label for="start-new-game">Start a new Game:</label>
	<input
		id="start-new-game"
		type="button"
		on:click={startNewGame}
		disabled={isNewGameDisplayed}
		value="New Game"
	/>
</div>

<NewGame bind:isDisplayed={isNewGameDisplayed} />

<style lang="scss">
	.puzzle {
		display: grid;
		grid-gap: 1em;
		grid-template-rows: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		grid-template-columns: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		justify-items: center;
	}

	.container {
		width: 44em;
		display: flex;
		flex-direction: row;

		.beginner-mode {
			display: flex;
			gap: 0.5em;
			width: 44em;
		}

		.results {
			width: 20em;

			.message {
				float: right;
			}
		}
	}

	.state {
		display: flex;
		justify-content: space-between;
		width: 44em;

		input#button {
			/* padding: 0 2em; */
			/* width: 10em; */
			font-size: 0.5em;
		}

		.container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 28em;
			overflow: hidden;

			#value {
				font-size: 0.75em;
			}
		}
	}

	.new-game {
		display: flex;
		justify-content: left;
		width: 44em;

		label {
			padding-right: 2em;
		}
	}
</style>
