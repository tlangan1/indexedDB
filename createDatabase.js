var db;
var dbOpen = false;
export const version = 5;

export function openDatabase() {
  var request = indexedDB.open("TestDB", version);

  request.onupgradeneeded = function (event) {
    // @ts-ignore
    db = event.target.result;
    if (!dbOpen) createObjectStore();
    else updateObjectStore();
  };

  function updateObjectStore() {
    if (db.objectStoreNames.contains("location")) {
      var data = saveData();
      var deleteObjectStore = db.objectStore.deleteObjectStore("location");

      deleteObjectStore.onsuccess = function (event) {
        alert("Object Store deleted");

        createObjectStore();
        restoreData(data);
      };
    }
  }

  function saveData() {
    // save data from old object stores
  }

  function restoreData(data) {
    // restore data to new object stores
  }

  function createObjectStore() {
    alert(
      "Either the database did not exist or there was a new version of the database...proceed to creating/modifying the object stores."
    );
    createLocationStore();
    createPredictionStore();
  }

  function createLocationStore() {
    var objectStore = db.createObjectStore("location", {
      keyPath: "location_id",
      autoIncrement: true,
    });
    objectStore.createIndex("location_name", "location_name", {
      unique: false,
    });
  }

  function createPredictionStore() {
    var objectStore = db.createObjectStore("prediction", {
      keyPath: "sample_date",
      unique: true,
    });
    objectStore.createIndex("location_id", "location_id", {
      unique: false,
    });
  }

  request.onsuccess = function (event) {
    alert("Database opened/created successfully");
    // @ts-ignore
    db = event.target.result;
    dbOpen = true;
  };

  request.onerror = function (event) {
    // @ts-ignore
    alert("Error opening/creating Database error: " + event.target.error);
  };

  request.onblocked = function (event) {
    // @ts-ignore
    alert(
      "Database access blocked. Please close all other tabs with this site open."
    );
  };
}
