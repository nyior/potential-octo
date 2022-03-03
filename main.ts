const fs = require('fs').promises;


async function readJsonFile(filePath: string) {
    /**
     * Utitlity function for reading from a file asynchronously
     */
    try {
        var data = await fs.readFile(filePath);
        return JSON.parse(data)
    } catch (error: any) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}


async function writeToJsonFile(data: any) {
    /**
     * Utility function for writing to a file asynchronously
     */
    try {
      data = JSON.stringify(data)

      await fs.writeFile('percentiles_result.json', data);
    } catch (error: any) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
}


const compute_percentile = (kth_percentile: number, scoreData: any) => {
   /**
    * Utility function for computing the kth percentile
    */
    let scores: number[] = []
    for (let index = 0; index < scoreData.length; index++) {
        scores.push(scoreData[index].score) 
    }

    scores.sort((n1,n2) => n1 - n2)

    // Compute the index of the kth percentile
    // Approach: k% of the data set is below the kth percentile
    let kth_index = Math.round((kth_percentile * (scores.length))/100)

    return scores[kth_index]
}


const percentiles_engine_local = (): void => {
    /**
     * Reads scores data from a local json file
     */
    readJsonFile("./score_data.json").then(result => {
        let scoreData = result["teamScores"]

        const tenthPercentile: number = compute_percentile(10, scoreData)
        const fiftyThPercentile: number = compute_percentile(50, scoreData)
        const ninetyThPercentile: number = compute_percentile(90, scoreData)

        const output: any = {
            "tenthPercentile": tenthPercentile,
            "fiftyThPercentile": fiftyThPercentile,
            "ninetyThPercentile": ninetyThPercentile
        }

        writeToJsonFile(output)
    })
}
percentiles_engine_local()


const percentiles_engine_firestore = (): void => {
    /**
     * Reads scores data from Firebase's Firestore
     */
    let scoreData: any = require("./score_data.json")
    scoreData = scoreData["teamScores"]
    
    const fiftyThPercentile: number = compute_percentile(50, scoreData)
    const seventyFifthPercentile: number = compute_percentile(75, scoreData)
    const ninetyThPercentile: number = compute_percentile(90, scoreData)
}
