var db;
import { version } from "./createDatabase.js";

export async function addTempPair() {
  var request = indexedDB.open("TestDB", version);

  request.onsuccess = function (event) {
    // @ts-ignore
    db = event.target.result;
    addIndividualPredictionItem();
  };
}

async function addIndividualPredictionItem() {
  const tx = db.transaction("prediction", "readwrite");

  tx.oncomplete = (event) => {
    alert("Transaction completed.");
  };
  tx.onerror = (event) => {
    alert("Error occurred in transaction.");
  };
  // Get the record.
  const objectStore = tx.objectStore("prediction");
  const objectStoreRequest = objectStore.get("2021-08-02");

  objectStoreRequest.onsuccess = (event) => {
    const myRecord = objectStoreRequest.result;
    // Modify it.
    myRecord.predictions.push({ day_temp: 50, night_temp: 40 });
    // Put the modified record back.
    tx.objectStore("prediction").put(myRecord);
  };
}
