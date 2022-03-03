/**
 * ____________________________ TRIAL TASK 2--PART-1 LOCAL JSON FILE_______________________________
 */
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


async function writeToJsonFile(
    tenthPercentile: number, fiftyThPercentile: number, ninetyThPercentile: number
) {
    /**
     * Utility function for writing to a file asynchronously
     */
     const output: any = {
        "tenthPercentile": tenthPercentile,
        "fiftyThPercentile": fiftyThPercentile,
        "ninetyThPercentile": ninetyThPercentile
    }

    try {
      let data = JSON.stringify(output)

      await fs.writeFile('percentiles_result.json', data);
    } catch (error: any) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
}


const computePercentile = (kth_percentile: number, scoreData: any) => {
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


const percentilesEngineLocal = (): void => {
    /**
     * Reads scores data from a local json file
     */
    readJsonFile("./score_data.json").then(result => {
        let scoreData = result["teamScores"]

        const tenthPercentile: number = computePercentile(10, scoreData)
        const fiftyThPercentile: number = computePercentile(50, scoreData)
        const ninetyThPercentile: number = computePercentile(90, scoreData)

        writeToJsonFile(tenthPercentile, fiftyThPercentile, ninetyThPercentile)
    })
}
// percentiles_engine_local()


/**
 * ____________________________ TRIAL TASK 2--PART-2 FIREBASE FIRESTORE_______________________________
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, } from "firebase/firestore"; 

import * as dotenv from 'dotenv';

dotenv.config();
initializeApp( 
    {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
    }
)


async function percentilesEngineFirestore (){
    /**
     * Reads scores data from Firebase's Firestore
     */
    const db = getFirestore()

    const result: any = await getDocs(collection(db, "teamScores"))
    
    var scoreData: any[] = []
    result.forEach((doc: any) => {
        scoreData.push(doc.data())
    })
        
    const tenthPercentile: number = computePercentile(10, scoreData)
    const fiftyThPercentile: number = computePercentile(50, scoreData)
    const ninetyThPercentile: number = computePercentile(90, scoreData)

    writeToJsonFile(tenthPercentile, fiftyThPercentile, ninetyThPercentile)
}
percentilesEngineFirestore()
