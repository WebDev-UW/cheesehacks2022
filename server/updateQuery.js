 /**
   * Generates an update statement with the appropriate columns and positioning
   * of bind parameters to the specified table. Uses the id property of the
   * object as the primary key to update by.
   *
   * @param {string} tableName The name of the table you want to generate the
   * query for.
   * @param {Object.<string, string>} columnNames An object containing a one to
   * one mapping of the properties of the databaseDataObject and the column names
   * in the database.
   * @param {Object.<string, any>} userProvidedDatabaseDataObject The data to
   * insert into the database. The value for each property would be a primitive
   * that can be inserted into a database.
   * @param {string} customWhere If your data does not have an ID, and instead uses several
   * primary keys, you can specify to update the rows where the following condition is true. Use
   * question marks where you would like your custom identifiers to go.
   * @param {Array<string>} customIdentifiers If you are using a customWhere, provide the values in
   * an array in the same order specified in the where
   * @returns {{query: string, values: Array.<any>}} An object containing the
   * generated query and an array of values ready to send to the database.
   * @throws Will throw if a property called id is not defined, or if a column name
   * is not defined.
   */
  function updateQueryGenerator(
    tableName,
    columnNames,
    userProvidedDatabaseDataObject,
    customWhere,
    customIdentifiers
  ) {
    // Cloning the user provided data. This is being done cause we will be
    // mutating this object.  We don't want to be mutating the user provided
    // object, that would be unintuitive.
    const _ = require("lodash");
    const databaseDataObject = _.cloneDeep(userProvidedDatabaseDataObject);
  
    // Assuming that the primary key is a column named 'id'
    if (columnNames.id === undefined && !customWhere)
      throw "A column named id, and it being the primary key for the table is required for the usage of this function.";
  
    // Check that the databaseObject has the property 'id' cause otherwise the
    // query will fail.
    if (databaseDataObject.id === undefined && !customWhere)
      throw "Data being provided was probably meant to be inserted, not updated. There is no id property.";

    if (customWhere && !customIdentifiers)
      throw "If using custom where, you must also specify specific identifiers"
  
    // First remove the property id (after copying it) from the object cause it
    // will be bound last in the query during the WHERE part. We don't
    // want to update the id part.
  
    const id = databaseDataObject.id;
    delete databaseDataObject.id;
  
    // These arrays are going to be added to synonymously go that the bind
    // parameter order will be correct.
    const goingToBeUpdatedColumnNamesArray = [];
    const goingToBeUpdatedValuesArray = [];
  
    for (const [key, value] of Object.entries(databaseDataObject)) {
      const columnName = columnNames[key];
      if (!columnName) throw `No column name for Object key: ${key} found!`;
      goingToBeUpdatedColumnNamesArray.push(columnName);
      goingToBeUpdatedValuesArray.push(value);
    }
  
    let query = `UPDATE ${tableName} SET `;
  
    const columnBindParamPairsForUpdate = [];
  
    for (const columnName of goingToBeUpdatedColumnNamesArray) {
      columnBindParamPairsForUpdate.push(`${columnName} = ?`);
    }
  
    // Add them to the query. Trailing space for next addition.
    query += columnBindParamPairsForUpdate.join(", ") + " ";
  
    // Finally add the id filter to make it a correct update. Also, add id last to the
    // values array so that the bind order will be correct.
    query += customWhere ? customWhere : `WHERE id = ?`;
    if (!customWhere) {goingToBeUpdatedValuesArray.push(id)} else {
      customIdentifiers.forEach(identifier => goingToBeUpdatedValuesArray.push(identifier))
    }
  
    return { query: query, values: goingToBeUpdatedValuesArray };
  }

  module.exports = updateQueryGenerator;
