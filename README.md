<h1 align="center"><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">indexedDB Web API</a></h1>

## Nomenclature

- A `database` is an entry point to a collection of object stores in IndexedDB and is only accessible by a particular origin.
- An `object store` is a node within a database.
- every database has a `version number` associated with it and it must be a positive integer (actually an `unsigned long long`).

## Links investigated

- [IndexedDB key characteristics and basic terminology](IndexedDB key characteristics and basic terminology.)
  - These are links I encountered in this article which I might pursue later.
    - For a detailed tutorial on how to use the API, see [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB).
    - For the reference documentation on the IndexedDB API, refer back to the main [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) article and its subpages, which document the types of objects used by IndexedDB.
    - For more information on how the browser handles storing your data in the background, read [Browser storage quotas and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria).
    - [Wikipedia article on NoSQL](https://en.wikipedia.org/wiki/NoSQL)

## Documentation

### Key characteristics

- Note that this functionality, by default, is useful both online and offline.
- IndexedDB databases store key-value pairs but the values can be complex structured objects, and keys can be properties of those objects.
- IndexedDB is built on a transactional database model. Everything you do in IndexedDB always happens in the context of a transaction.
- The IndexedDB API is mostly asynchronous. The API doesn't give you data by returning values; instead, you have to pass a callback function. You don't "store" a value into the database, or "retrieve" a value out of the database through synchronous means. Instead, you "request" that a database operation happens. You get notified by a DOM event when the operation finishes, and the type of event you get lets you know if the operation succeeded or failed.
- IndexedDB uses a lot of requests. Requests are objects that receive the success or failure DOM events that were mentioned previously. They have onsuccess and onerror properties, and you can call addEventListener() and removeEventListener() on them. They also have readyState, result, and errorCode properties that tell you the status of the request. The result property is particularly magical.
- IndexedDB uses DOM events to notify you when results are available. DOM events always have a type property (in IndexedDB, it is most commonly set to "success" or "error"). DOM events also have a target property that indicates where the event is headed.
- IndexedDB is object-oriented. IndexedDB is not a relational database with tables representing collections of rows and columns.
- IndexedDB does not use Structured Query Language (SQL). It uses queries on an index that produces a cursor, which you use to iterate across the result set.
- IndexedDB adheres to a same-origin policy.
- IndexedDB adheres to a same-origin policy. An origin is the domain, application layer protocol, and port of a URL of the document where the script is being executed. Each origin has its own associated set of databases. Every database has a name that identifies it within an origin. The security boundary imposed on IndexedDB prevents applications from accessing data with a different origin.

### Limitations

- Internationalized sorting is not supported
- The API is not designed to take care of synchronizing with a server-side database.
- The API does not have an equivalent of the LIKE operator in SQL.
- Browsers can wipe out the database for various reasons.

## [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)

- The basic pattern that IndexedDB encourages is the following:
  - Open a database.
  - Create an object store in the database.
  - Start a transaction and make a request to do some database operation, like adding or retrieving data.
  - Wait for the operation to complete by listening to the right kind of DOM event.
  - Do something with the results (which can be found on the request object).

## [Creating and structuring the store](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#creating_and_structuring_the_store)

### [Opening a database](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#opening_a_database)

- The open DB function exists on window.indexedDB, or simply, indexedDB. It requires the following two parameters:
  - DB name: This is the name of the database to create or open
  - version: This is an integer which represents the version of the database to open. Here is an example.
    ```
    var requestHandle = indexedDB.open("dbName", 2)
    ```
  - If a database named "dbName" does not exist then the `onupgradeneeded` event of the requestHandle object is called. Here is an example of hooking some functionality to that event to create a new set of object stores.
    ```
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("customers", { keyPath: "id" });
        alert(
            "Either the database did not exist or there was a new version of the database...proceed to creating/modifying the object stores."
        );
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
    };
    ```
  - If a database named "dbName" exists and the existing database of that name is version 2 then it is opened. In this case the onsuccess event of the requestHandle object is called. Here is an example of hooking some functionality to that event.
    ```
    request.onsuccess = function (event) {
        alert("Database opened/created successfully");
    };
    ```
  - If a database named "dbName" exists but the version number does not match that of the existing database then one of two things can occur (assuming no errors or blocking).
    - If the version number is greater is not version 2 then the onupgradeneeded event of the requestHandle object is called. Here is an example of hooking some functionality to that event. I discovered that if the version number passed to the open request is less than the version number of the existing database than an `versioning` error is thrown.
  - There are two other events that might fire, onerror and onblocked.

### [Creating or updating the version of a database](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#creating_or_updating_the_version_of_the_database)

### [Structuring the database](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#structuring_the_database)

### [Using a Key Generator](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#using_a_key_generator)

## [Adding, Retrieving and Removing Data](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#adding_retrieving_and_removing_data)

## Object Databases

###
