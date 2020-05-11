# Picasso

A Vue.js web application that allows you to upload a CSV file, edit this data in a table, and then download it as a JSON file. This application also allows you to search for items in a table and click on items for additional detail.

## Getting Started

### Download the project dependencies

```
npm install
```

### Run the app in the development mode

```
npm run serve
```

Open [http://localhost:8000] to view it in the browser.

### Run the unit tests

```
npm run test:unit
```

### Run the end-to-end tests

```
npm run test:e2e
```

## Usage

The application has the following pages:

- Dashboard _Work in progress!_
- Data Editor - _Here you can upload a CSV, edit the data in the table, and then download this edited data as JSON_.
- Smart Search - _Here you can view a table of sample data, search for items, and click on an item for more details._

## How does it work?

### Data Editor

After selecting a CSV file, this file is passed into `convertCsvToJson`. This function checks if the file is a valid CSV, then converts this data into an array of objects.

For example, take the following CSV:

```csv
'"first_name","last_name","eye_color","height","weight"',
'"John","Smith","brown","1.23m","121kg"',
'"Jane","Jones","blue","1.04m","89kg"'
```

This would be converted to:

```javascript
[
  {
    first_name: "John",
    last_name: "Smith",
    eye_color: "brown",
    height: "1.23m",
    weight: "121kg",
  },
  {
    first_name: "Jane",
    last_name: "Jones",
    eye_color: "blue",
    height: "1.04m",
    weight: "89kg",
  },
];
```

An optional second argument can be passed to `convertCsvToJson`. This argument is `shouldAddRenderKeys`.

Since we want to display this data in a table, we can make use of the `v-for` directive in Vue.js. However, for Vue to track each individual node, improve performance and perform reliable updates, we need to provide a `key` to each node.

Since we do not know the schema of the CSV file, we cannot directly declare a key for Vue to use. Therefore, when `shouldAddRenderKeys` is true, a `renderKey` is added to each object in the data set. This key is a `uuid`.

Moreover, since we want to be able to edit this data, we need to provide a way to find each record and update it. The `renderKey` achieves this by assigning each object a unique identifier, where we can then find each record in the Vuex store and replace it with the updated data. We can reply on the data provided in the csv to generate a key.

### Smart Search

In order to search for a record, each object in the array is mapped to a `SearchItem` class. This provides us a way of assigning additional properties (via getters) to each object without them being additional columns in the table.

Each property value in each object is merged into a single string, where the filtering of the list is achieved by detecting the presence of the search value in this merged string.
