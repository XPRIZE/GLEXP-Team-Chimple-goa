(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.LokiLocalForageAdapter = factory();
    }
}(this, function () {
  return (function() {

    /**
     * LocalForageAdapter - Loki persistence adapter class for localforage.
     *
     * @param {string} appname - Application name context can be used to distinguish subdomains or just 'loki'
     */
    function LocalForageAdapter(appname) {
      if (typeof (appname) !== 'undefined') {
        appname = 'loki';
      }

      if (typeof localforage === 'undefined') {
        throw new Error('localforage does not seem to be supported for your environment');
      }

      localforage.config({
        name        : 'LokiLocalForageAdapter',
        version     : 2,
        storeName   : appname, // Should be alphanumeric, with underscores.
        description : 'Adapter for lokijs'
      });
    }

    /**
     * checkAvailability - used to check if adapter is available
     *
     * @returns {boolean} true if indexeddb is available, false if not.
     */
    LocalForageAdapter.prototype.checkAvailability = function()
    {
      if (typeof localforage !== 'undefined') {
        return true;
      } else {
        return false;
      }
    };

    /**
     * loadDatabase() - Retrieves a serialized db string from the catalog.
     *
     * @param {string} dbname - the name of the database to retrieve.
     * @param {function} callback - callback should accept string param containing serialized db string.
     */
    LocalForageAdapter.prototype.loadDatabase = function(dbname, callback)
    {
        console.log('loading localforage loki db');
        localforage.getItem(dbname).then(function(value) {
			if (typeof callback === 'function') {
				callback(value);
			} else {
				console.error('in LocalForageAdapter.loadDatabase, callback was not a function so not executed');
			}
		});
    };

    // alias
    LocalForageAdapter.prototype.loadKey = LocalForageAdapter.prototype.loadDatabase;

    /**
     * saveDatabase() - Saves a serialized db to the catalog.
     *
     * @param {string} dbname - the name to give the serialized database within the catalog.
     * @param {string} dbstring - the serialized db string to save.
     * @param {function} callback - (Optional) callback passed obj.success with true or false
     */
    LocalForageAdapter.prototype.saveDatabase = function(dbname, dbstring, callback)
    {
		localforage.setItem(dbname, dbstring, function(err, value) {
			if (typeof callback === "function") {
				console.log('error when saving localforage in saveDatabase: ', err);
				callback(err); // pass through any error
			}
		});
    };

    // alias
    LocalForageAdapter.prototype.saveKey = LocalForageAdapter.prototype.saveDatabase;

    /**
     * deleteDatabase() - Deletes a serialized db from the catalog.
     *
     * @param {string} dbname - the name of the database to delete from the catalog.
     */
    LocalForageAdapter.prototype.deleteKey = function(dbname)
    {
        localforage.removeItem(dbname, function(err) {
			// Run this code once the key has been removed.
			console.log(dbname + ' has been removed from loki localforage');
		});

    };

    LocalForageAdapter.prototype.deleteDatabase = function() {
		localforage.clear(function(err) {
			// Run this code once the database has been entirely deleted.
			console.log('error clearing loki localforage:', err);
		});
	};

    return LocalForageAdapter;

  }());
}));