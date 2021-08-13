const sha256 = require("js-sha256");
const EcdsaMath = require("./math");
const BinaryAscii = require("./utils/binary");
const Integer = require("./utils/integer");
const modulo = Integer.modulo;


exports.verify = function (message, signature, publicKey, hashfunc=sha256) {
    let hashMessage = hashfunc(message);
    let numberMessage = BinaryAscii.numberFromHex(hashMessage);
    let curve = publicKey.curve;
    let sigR = signature.r;
    let sigS = signature.s;
    let inv = EcdsaMath.inv(sigS, curve.N);
    let u1 = EcdsaMath.multiply(curve.G, modulo((numberMessage.multiply(inv)), curve.N), curve.N, curve.A, curve.P);
    let u2 = EcdsaMath.multiply(publicKey.point, modulo((sigR.multiply(inv)), curve.N), curve.N, curve.A, curve.P);
    let add = EcdsaMath.add(u1, u2, curve.A, curve.P);
    return sigR.eq(add.x);
};
