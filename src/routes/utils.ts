// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
export const base64ToBytes = (base64: string): string => {
	const binString = atob(base64);

	const array = Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
	return new TextDecoder().decode(array);
};

// From https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem.
export const bytesToBase64 = (bytes: Uint8Array): string => {
	const binString = String.fromCodePoint(...bytes);

	return btoa(binString);
};
