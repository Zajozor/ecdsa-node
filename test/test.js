const assert = require("assert");

const Ecdsa = require("../ellipticcurve/ecdsa");
const PublicKey = require("../ellipticcurve/publicKey").PublicKey;
const Signature = require("../ellipticcurve/signature").Signature;
const File = require("./file");

describe("openSSL test", function() {
    describe("#testVerifySignature()", function() {
        it("should read and verify signature file", function() {
            // openssl ec -in privateKey.pem -pubout -out publicKey.pem
            let publicKeyPem = File.read("test/publicKey.pem");
            // openssl dgst -sha256 -sign privateKey.pem -out signature.binary message.txt
            let signatureDer = File.read("test/signatureDer.txt", "binary");
            let message = File.read("test/message.txt");
            let publicKey = PublicKey.fromPem(publicKeyPem);
            let signature = Signature.fromDer(signatureDer);

            assert.equal(Ecdsa.verify(message, signature, publicKey), true);
        });
    });
});
