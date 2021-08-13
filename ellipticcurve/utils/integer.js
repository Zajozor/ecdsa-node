// based on random-number-csprng: https://www.npmjs.com/package/random-number-csprng

const BigInt = require("big-integer");


function modulo(x, n) {
    let mod = x.divmod(n).remainder;

    if (mod.lesser(0)) {
        mod = mod.add(n);
    }

    return mod;
}


function calculateParameters(range) {
	/* This does the equivalent of:
	 *
	 *    bitsNeeded = Math.ceil(Math.log2(range));
	 *    bytesNeeded = Math.ceil(bitsNeeded / 8);
	 *    mask = Math.pow(2, bitsNeeded) - 1;
	 *
	 * ... however, it implements it as bitwise operations, to sidestep any
	 * possible implementation errors regarding floating point numbers in
	 * JavaScript runtimes. This is an easier solution than assessing each
	 * runtime and architecture individually.
	 */

	let bitsNeeded = 0;
	let bytesNeeded = 0;
	let mask = BigInt(1);

	while (range.greater(0)) {
		if (bitsNeeded % 8 === 0) {
			bytesNeeded += 1;
		}

        bitsNeeded += 1;
        mask = mask.shiftLeft(1).or(1); /* 0x00001111 -> 0x00011111 */

        range = range.shiftRight(1);  /* 0x01000000 -> 0x00100000 */
	}

	return {bitsNeeded, bytesNeeded, mask};
}

exports.modulo = modulo;
