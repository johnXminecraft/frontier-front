# Frontier

I wish to работать в Reinigung

```js
// о да я программист юхуу полижите мои сосочки))
// я б написал тут чето умное но я нихуя не умею, жс сосет хуй
// на вот BLAKE2s которьій мне написал чат гпт((

const BLAKE2S_IV = new Uint32Array([
  0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
  0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
]);

const SIGMA = [
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
  [14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3],
  [11,8,12,0,5,2,15,13,10,14,3,6,7,1,9,4],
  [7,9,3,1,13,12,11,14,2,6,5,10,4,0,15,8],
  [9,0,5,7,2,4,10,15,14,1,11,12,6,8,3,13],
  [2,12,6,10,0,11,8,3,4,13,7,5,15,14,1,9],
  [12,5,1,15,14,13,4,10,0,7,6,3,9,2,8,11],
  [13,11,7,14,12,1,3,9,5,0,15,4,8,6,2,10],
  [6,15,14,9,11,3,0,8,12,2,13,7,1,4,10,5],
  [10,2,8,4,7,6,1,5,15,11,9,14,3,12,13,0]
];

// Rotate right 32-bit
function rotr32(x, n) {
  return (x >>> n) | (x << (32 - n));
}

// G function
function G(v, a, b, c, d, x, y) {
  v[a] = (v[a] + v[b] + x) >>> 0;
  v[d] = rotr32(v[d] ^ v[a], 16);
  v[c] = (v[c] + v[d]) >>> 0;
  v[b] = rotr32(v[b] ^ v[c], 12);
  v[a] = (v[a] + v[b] + y) >>> 0;
  v[d] = rotr32(v[d] ^ v[a], 8);
  v[c] = (v[c] + v[d]) >>> 0;
  v[b] = rotr32(v[b] ^ v[c], 7);
}

// Compression function
function compress(h, block, t, last) {
  const v = new Uint32Array(16);
  for (let i = 0; i < 8; i++) v[i] = h[i];
  for (let i = 0; i < 8; i++) v[i + 8] = BLAKE2S_IV[i];

  v[12] ^= t;            // low word of counter
  v[13] ^= 0;            // high word of counter (unused)
  if (last) v[14] = ~v[14];

  const m = new Uint32Array(16);
  for (let i = 0; i < 16; i++) {
    m[i] = block[i*4] | (block[i*4+1]<<8) | (block[i*4+2]<<16) | (block[i*4+3]<<24);
  }

  for (let round = 0; round < 10; round++) {
    const s = SIGMA[round];
    G(v,0,4,8,12,m[s[0]],m[s[1]]);
    G(v,1,5,9,13,m[s[2]],m[s[3]]);
    G(v,2,6,10,14,m[s[4]],m[s[5]]);
    G(v,3,7,11,15,m[s[6]],m[s[7]]);
    G(v,0,5,10,15,m[s[8]],m[s[9]]);
    G(v,1,6,11,12,m[s[10]],m[s[11]]);
    G(v,2,7,8,13,m[s[12]],m[s[13]]);
    G(v,3,4,9,14,m[s[14]],m[s[15]]);
  }

  for (let i = 0; i < 8; i++) h[i] ^= v[i] ^ v[i+8];
}

// Pad input to multiple of 64 bytes
function toBlocks(input) {
  const bytes = new TextEncoder().encode(input);
  const len = bytes.length;
  const fullBlocks = Math.floor(len / 64);
  const blocks = [];

  for (let i = 0; i < fullBlocks; i++) {
    blocks.push(bytes.slice(i*64, (i+1)*64));
  }

  const last = bytes.slice(fullBlocks*64);
  if (last.length < 64) {
    const padded = new Uint8Array(64);
    padded.set(last);
    blocks.push(padded);
  }

  return blocks;
}

// Main BLAKE2s hash
function blake2s(input) {
  const h = new Uint32Array(BLAKE2S_IV);
  const blocks = toBlocks(input);
  let t = 0;

  for (let i = 0; i < blocks.length; i++) {
    t += 64;
    compress(h, blocks[i], t, i === blocks.length-1);
  }

  // Convert to hex
  let hex = "";
  for (let i = 0; i < h.length; i++) {
    hex += h[i].toString(16).padStart(8,"0");
  }
  return hex;
}

// Example
console.log(blake2s("Hello world")); 
// e.g. outputs: "e56e...32 bytes hex"
```
