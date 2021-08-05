import config from "./../config";

/**
 * Simple console logging function that is used within this application to "wrap" the React Context setter functions and output the value sent to the setter function to the console
 * when the appication is in debug mode.  Debug mode can be set within the config.js file by setting th `debugMode` property to `true` or by setting `window.debugMode = true` from the console.
 * @param {Function} wrapped A function to wrap and logs the first argument to the browser console.
 * @param {String} logPrefix Optional string used to prefix the log entry to provide further clarity of what is being logged.
 * This also allows for easy filtering within the browser console while debugging.
 */
export const connectLogger = (wrapped, logPrefix = "DEBUG") => {
  return function () {
    const result = wrapped.apply(this, arguments);
    if (config.debugMode === true || window.debugMode === true) {
      console.log(logPrefix, arguments[0]);
    }
    return result;
  };
};

/**
 * Simple function used when submitting forms to place focus at the top of the page.
 * This is often useful when you want to place focus to the top of the page where you may display messages such as form submission status or server errors.
 */
export const scrollToTop = () => {
  if (window) window.scrollTo(0, 0);
};

/**
 * Debounce functions are useful to delay the execution of a function while an event is occurring.
 * This is extremely useful in cases when you are executing a function in response to a rapidly occurring event such as
 * window resizing, changes in scroll prosition, mouse movements, or a user typing in a form field.
 * When the debounce function is called, it sets a wait time and if the function is invoked again during the wait time it will execute,
 * otherwise, if the function is re-invoked before the wait  time has expired the wait time is reset and function execution is again
 * delayed from firing until after the wait time expires.
 * @param {Function} func Function to execute after the debounce wait time has expired.
 * @param {Number} wait How long to wait in milliseconds for more executions before firing the function.
 * @param {Boolean} immediate Allows you to override the wait time and immediately invoke the function.
 */
export const debounce = function (func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

/* ****************************************************************
 * PAGINATION HELPER FUNCTIONS
 **************************************************************** */
/**
 * Returns a slice of an array to display when given a starting page number and pagination size.
 * @param {Array} dataArray Array of items to paginate.
 * @param {Number, String} paginationStartPage Pagination start page number .
 * @param {Number} paginationSize Number of rows to display per page
 * @returns {Array} Returns a slice of the original array that contains the pagination rows to display.
 */
export const getRows = (dataArray, paginationStartPage, paginationSize) => {
  const total = dataArray.length;
  const startPage = parseInt(paginationStartPage);
  const size = parseInt(paginationSize);
  const startIndex = startPage === 1 ? 0 : (startPage - 1) * size;
  const endIndex = total < startIndex + size ? total : startIndex + size;
  return dataArray.slice(startIndex, endIndex);
};

/**
 * Returns the number of pages of pagination given an array of records and pagination size.
 * @param {Array} dataArray Array of items in to use for calculating the total number of pages for pagination.
 * @param {Number} paginationSize Number of rows to display per page
 */
export const getTotalPages = (dataArray, paginationSize) => {
  const length = dataArray.length;
  // Return the total number of pages for pagination.
  return Math.ceil(length / paginationSize);
};
