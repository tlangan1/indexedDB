var db;
import { version } from "./createDatabase.js";

export async function addTempPair() {
  var request = indexedDB.open("TestDB", version);

  request.onsuccess = function (event) {
    // @ts-ignore
    db = event.target.result;
    add();
  };
}

async function add() {
  const tx = db.transaction("prediction", "readwrite");
  // Get the record.
  const objectStore = tx.objectStore("prediction");
  const objectStoreRequest = objectStore.get("2021-08-02");

  objectStoreRequest.onsuccess = (event) => {
    const myRecord = objectStoreRequest.result;
    // Modify it.
    myRecord.predictions.push("another prediction");
    // Put the modified record back.
    tx.objectStore("prediction").put(myRecord);
  };
}
