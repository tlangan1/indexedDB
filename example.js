async function main() {
  // Set up the database.
  const OBJECT_STORE_NAME = "pages";
  const DB_NAME = "tracking-log";

  const db = await idb.open(DB_NAME, 1, (upgradeDB) => {
    upgradeDB.createObjectStore(OBJECT_STORE_NAME, {
      autoIncrement: true,
      keyPath: "id",
    });
  });

  // The OP didn't make it clear what this value was, so I'll guess.
  const newBucketID = 1;

  {
    // Create the record.
    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
    tx.objectStore(OBJECT_STORE_NAME).put({
      id: newBucketID,
      data: ["first value"],
    });
  }

  {
    const tx = db.transaction(OBJECT_STORE_NAME, "readwrite");
    // Get the record.
    const record = await tx.objectStore(OBJECT_STORE_NAME).get(newBucketID);
    // Modify it.
    record.data.push("second value");
    // Put the modified record back.
    tx.objectStore(OBJECT_STORE_NAME).put(record);
  }

  {
    // Read the value to confirm everything worked.
    const tx = db.transaction(OBJECT_STORE_NAME);
    const value = await tx.objectStore(OBJECT_STORE_NAME).get(newBucketID);
    console.log(value);
  }
}

main();
