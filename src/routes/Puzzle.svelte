<script lang="ts">
	import { Puzzle } from './puzzle';
	import Tile from './Tile.svelte';

	export let puzzle: Puzzle;
	export let disabled = false;
	let startingBoard = puzzle.board;
	let isBeginnerMode = false;
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
</script>

<div class="container">
	<div class="beginner-mode">
		<input id="beginner-mode-value" type="checkbox" bind:checked={isBeginnerMode} {disabled} />
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
		<Tile bind:tile={value} on:numberChanged={recordState} {isBeginnerMode} {disabled} />
	{/each}
</div>

<div
	class="continue-container"
	on:click={copyUrlToClipboard}
	on:keydown={copyUrlToClipboard}
	role="button"
	tabindex="-1"
>
	<div class="link-container">
		<label for="value">Continue later:</label>
		<input type="button" id="value" {disabled} value={pageUrl} />
	</div>

	<input type="button" id="copy-value" {disabled} value={copyText} />
</div>

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
		justify-content: space-between;

		.beginner-mode {
			display: flex;
			align-items: center;
			gap: 0.5em;
			width: 44em;
		}

		.results {
			width: 20em;
			display: flex;
			justify-content: right;
			align-items: center;

			.message {
				align-items: center;
			}
		}
	}

	.continue-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 22em;
		font-size: 2em;

		.link-container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			width: 18em;

			#value {
				overflow: hidden;
				width: 40%;
			}
		}

		input#copy-value {
			width: 4em;
		}
	}
</style>
