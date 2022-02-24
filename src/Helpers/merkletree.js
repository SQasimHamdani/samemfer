const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const {whitelist} = require('./whitelist');


export function getProofs  (address) {
    const leaves = whitelist.map(x => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256 , {sortPairs: true});
    return tree.getHexProof(keccak256(address));
}

export function getRoot  ()  {
    const leaves = whitelist.map(x => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256 , {sortPairs: true});
    return tree.getRoot().toString('hex');
}
