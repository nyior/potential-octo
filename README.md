## Typescript + JSON + Firestore
This repo contain two major Typescript function in the `main.ts` file:

* The first function `percentilesEngineLocal` computes the 10th, 50th and 90th percentile of some set of scores read from a local json file.
* The second function `percentilesEngineFirestore` computes the 10th, 50th and 90th percentile of some set of scores grabbed from Firebase's Firestore.

The `main.ts` file contains three other utility functions:

* `readJsonFile`
* `writeToJsonFile`
* ` computePercentile`