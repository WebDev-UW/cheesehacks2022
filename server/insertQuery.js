/**
 * Generates an insert statement with the appropriate columns and positioning
 * of bind parameters to the specified table.
 *
 * @param {string} tableName The name of the table you want to generate the
 * query for.
 * @param {Object.<string, string>} columnNames An object containing a one to
 * one mapping of the properties of the databaseDataObject and the column names
 * in the database.
 * @param {Object.<string, any>} databaseDataObject The data to
 * insert into the database. The value for each property would be a primitive
 * that can be inserted into a database.
 * @returns {{query: string, values: Array.<any>}} An object containing the
 * generated query and an array of values ready to send to the database.
 * @throws Will throw if a property called id is defined, or if a column name
 * is not defined.
 */
function insertQueryGenerator(tableName, columnNames, databaseDataObject) {
    // If there's an id, that means that it should be updated. This is to prevent
    // duplicate data.
    if (databaseDataObject.id !== undefined)
      throw "id is defined for this object. It should not be inserted, but updated instead.";
  
    // These arrays are going to be added to synonymously go that the bind
    // parameter order will be correct.
    const goingToBeInsertedColumnNamesArray = [];
    const goingToBeInsertedValuesArray = [];
    const bindParamsArray = [];
    for (const [key, value] of Object.entries(databaseDataObject)) {
      const columnName = columnNames[key];
      if (!columnName) throw `No column name for Object key: ${key} found!`;
      goingToBeInsertedColumnNamesArray.push(columnName);
      goingToBeInsertedValuesArray.push(value);
      bindParamsArray.push("?");
    }
  
    const tableNamesString = `(${goingToBeInsertedColumnNamesArray.join(",")})`;
    const bindParamsString = `(${bindParamsArray.join(", ")})`;
  
    return {
      query: `INSERT INTO ${tableName} ${tableNamesString} VALUES ${bindParamsString}`,
      values: goingToBeInsertedValuesArray
    };
  }

  module.exports = insertQueryGenerator;