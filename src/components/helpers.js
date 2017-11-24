
/**
 * @public
 * Test if the completed state of a given id is true.
 * 
 * @param {Object} completed 
 * @param {String} id 
 * @return {Bool}
 */
const isCompleted = (completed, id) => !!completed && !!completed[id] && !!completed[id].completed; 

/**
 * @public
 * Test if the archived state of a given id is true.
 * 
 * @param {Object} archived 
 * @param {String} id
 * @return {Bool} 
 */
const isArchived = (archived, id) => !!archived && !!archived[id] && !!archived[id].archived;

export {
    isCompleted,
    isArchived
}