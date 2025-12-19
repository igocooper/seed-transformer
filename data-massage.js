
const SALT = 13;

function seededRandom(seed) {
  let value = seed;
  return function () {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

/* ---------- Deterministic Shuffle ---------- */
function shuffle(array, seed) {
  const rand = seededRandom(seed);
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

/* ---------- Word Obfuscation ---------- */
function obfuscateWord(word, key) {
  return [...word]
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) + key + i)
    )
    .join("");
}

function deobfuscateWord(word, key) {
  return [...word]
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) - key - i)
    )
    .join("");
}

/* ---------- Encode ---------- */
function encode(seedObject, secretKey = 7) {
  const entries = Object.entries(seedObject);

  const shuffled = shuffle(entries, secretKey);

  return shuffled.map(([id, word]) => ({
    id,
    value: obfuscateWord(word, secretKey)
  }));
}

/* ---------- Decode ---------- */
function decode(encodedArray, secretKey = 7) {
  const decoded = encodedArray.map(({ id, value }) => [
    id,
    deobfuscateWord(value, secretKey)
  ]);

  // Restore original numeric order
  decoded.sort((a, b) => Number(a[0]) - Number(b[0]));

  return Object.fromEntries(decoded);
}

/* ============================================================
   Example Usage
   ============================================================ */

/* 
Encoding
 1. create a seed object 
 2. uncomment encode, run file and copy encoded version from console
*/
// const encoded = encode(seed, SALT);
// console.log("ENCODED:", JSON.stringify(encoded));

/* Decoding
 1. create encoded constant with encoded value
 2. uncomment decode, run file and see decoded value in console
*/
// const decoded = decode(encoded, SALT);
// console.log("DECODED:", decoded);

