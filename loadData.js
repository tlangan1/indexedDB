var db;
import { version } from "./createDatabase.js";

var location1 = {
  location_name: "Finksburg Maryland",
};
var location2 = {
  location_name: "North Port Florida",
};
var prediction1 = {
  sample_date: "2021-08-01", // unique
  location_id: 1,
  predictions: [
    { day_temp: 30, night_temp: 20 },
    { day_temp: 32, night_temp: 24 },
    { day_temp: 30, night_temp: 20 },
    { day_temp: 32, night_temp: 24 },
    { day_temp: 30, night_temp: 20 },
    { day_temp: 32, night_temp: 24 },
    { day_temp: 30, night_temp: 20 },
  ],
};
var prediction2 = {
  sample_date: "2021-08-02", // unique
  location_id: 1,
  predictions: [
    { day_temp: 30, night_temp: 20 },
    { day_temp: 32, night_temp: 24 },
    { day_temp: 30, night_temp: 20 },
    { day_temp: 32, night_temp: 24 },
    { day_temp: 30, night_temp: 20 },
    { day_temp: 32, night_temp: 24 },
    { day_temp: 30, night_temp: 20 },
  ],
};

export function addData() {
  var request = indexedDB.open("TestDB", version);

  request.onsuccess = function (event) {
    // @ts-ignore
    db = event.target.result;
    loadAllData();
  };
}

function loadAllData() {
  addLocation(location1);
  addLocation(location2);
  addPrediction(prediction1);
  addPrediction(prediction2);
}

function addLocation(data) {
  var transaction = db.transaction("location", "readwrite");
  var objectStore = transaction.objectStore("location");
  var request = objectStore.add(data);

  request.onsuccess = function (event) {
    alert("Location added successfully");
  };

  request.onerror = function (event) {
    alert("Error adding location");
  };
}

function addPrediction(data) {
  var transaction = db.transaction("prediction", "readwrite");
  var objectStore = transaction.objectStore("prediction");
  var request = objectStore.add(data);

  request.onsuccess = function (event) {
    alert("Prediction added successfully");
  };

  request.onerror = function (event) {
    alert("Error adding prediction");
  };
}
