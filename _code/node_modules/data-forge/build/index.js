"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sugar = require("sugar");
var index_1 = require("./lib/index");
exports.Index = index_1.Index;
var series_1 = require("./lib/series");
exports.Series = series_1.Series;
var dataframe_1 = require("./lib/dataframe");
exports.DataFrame = dataframe_1.DataFrame;
var chai_1 = require("chai");
var _1 = require(".");
var _2 = require(".");
var PapaParse = require('papaparse');
;
/**
 * Convert a regular JavaScript obejct to a dataframe.
 * Each row in the dataframe represents a field from the object.
 *
 * @param obj - The JavaScript object to convert to a dataframe.
 *
 * @returns Returns a dataframe that lists the fields in the pass-in object.
 */
function fromObject(obj) {
    return new _2.DataFrame(Object.keys(obj)
        .map(function (fieldName) { return ({
        Field: fieldName,
        Value: obj[fieldName],
    }); }));
}
exports.fromObject = fromObject;
/**
 * Deserialize a dataframe from a JSON text string.
 *
 * @param jsonTextString The JSON text to deserialize.
 *
 * @returns Returns a dataframe that has been deserialized from the JSON data.
 */
function fromJSON(jsonTextString) {
    chai_1.assert.isString(jsonTextString, "Expected 'jsonTextString' parameter to 'dataForge.fromJSON' to be a string containing data encoded in the JSON format.");
    return new _2.DataFrame({
        values: JSON.parse(jsonTextString)
    });
}
exports.fromJSON = fromJSON;
/**
 * Deserialize a DataFrame from a CSV text string.
 *
 * @param csvTextString The CSV text to deserialize.
 * @param [config] Optional configuration options for parsing the CSV data.
 *
 * @returns Returns a dataframe that has been deserialized from the CSV data.
 */
function fromCSV(csvTextString, config) {
    chai_1.assert.isString(csvTextString, "Expected 'csvTextString' parameter to 'dataForge.fromCSV' to be a string containing data encoded in the CSV format.");
    if (config) {
        chai_1.assert.isObject(config, "Expected 'config' parameter to 'dataForge.fromCSV' to be an object with CSV parsing configuration options.");
        if (config.columnNames) {
            if (!Sugar.Object.isFunction(config.columnNames[Symbol.iterator])) {
                chai_1.assert.isArray(config.columnNames, "Expect 'columnNames' field of 'config' parameter to DataForge.fromCSV to be an array or iterable of strings that specifies column names.");
            }
            try {
                for (var _a = __values(config.columnNames), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var columnName = _b.value;
                    chai_1.assert.isString(columnName, "Expect 'columnNames' field of 'config' parameter to DataForge.fromCSV to be an array of strings that specify column names.");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (config.skipEmptyLines === undefined) {
            config = Object.assign({}, config); // Clone the config. Don't want to modify the original.
            config.skipEmptyLines = true;
        }
    }
    else {
        config = {
            skipEmptyLines: true,
        };
    }
    var parsed = PapaParse.parse(csvTextString, config);
    var rows = parsed.data;
    if (rows.length === 0) {
        return new _2.DataFrame();
    }
    var columnNames;
    rows = rows.map(function (row) {
        return row.map(function (cell) { return Sugar.Object.isString(cell) ? cell.trim() : cell; }); // Trim each cell that is still a string.
    });
    if (config && config.columnNames) {
        columnNames = config.columnNames;
    }
    else {
        columnNames = rows.shift();
    }
    return new _2.DataFrame({
        rows: rows,
        columnNames: columnNames,
    });
    var e_1, _c;
}
exports.fromCSV = fromCSV;
//
// Promise-based read file.
//
function readFileData(filePath) {
    return new Promise(function (resolve, reject) {
        var fs = require('fs');
        fs.readFile(filePath, 'utf8', function (err, fileData) {
            if (err) {
                reject(err);
                return;
            }
            resolve(fileData);
        });
    });
}
/**
 * @hidden
 * Reads a file asynchonrously to a dataframe.
 */
var AsyncFileReader = /** @class */ (function () {
    function AsyncFileReader(filePath) {
        this.filePath = filePath;
    }
    /**
     * Deserialize a CSV file to a DataFrame.
     * Returns a promise that later resolves to a DataFrame.
     *
     * @param [config] Optional configuration file for parsing.
     *
     * @returns Returns a promise of a dataframe loaded from the file.
     */
    AsyncFileReader.prototype.parseCSV = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var fileData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (config) {
                            chai_1.assert.isObject(config, "Expected optional 'config' parameter to dataForge.readFile(...).parseCSV(...) to be an object with configuration options for CSV parsing.");
                        }
                        return [4 /*yield*/, readFileData(this.filePath)];
                    case 1:
                        fileData = _a.sent();
                        return [2 /*return*/, fromCSV(fileData, config)];
                }
            });
        });
    };
    /**
     * Deserialize a JSON file to a DataFrame.
     * Returns a promise that later resolves to a DataFrame.
     *
     * @returns Returns a promise of a dataframe loaded from the file.
     */
    AsyncFileReader.prototype.parseJSON = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readFileData(this.filePath)];
                    case 1:
                        fileData = _a.sent();
                        return [2 /*return*/, fromJSON(fileData)];
                }
            });
        });
    };
    return AsyncFileReader;
}());
/**
 * Read a file asynchronously from the file system.
 * Works in Nodejs, doesn't work in the browser.
 *
 * @param filePath The path to the file to read.
 *
 * @returns Returns an object that represents the file. Use `parseCSV` or `parseJSON` to deserialize to a DataFrame.
 */
function readFile(filePath) {
    chai_1.assert.isString(filePath, "Expected 'filePath' parameter to dataForge.readFile to be a string that specifies the path of the file to read.");
    return new AsyncFileReader(filePath);
}
exports.readFile = readFile;
/**
 * @hidden
 * Reads a file synchonrously to a dataframe.
 */
var SyncFileReader = /** @class */ (function () {
    function SyncFileReader(filePath) {
        this.filePath = filePath;
    }
    /**
     * Deserialize a CSV file to a DataFrame.
     *
     * @param [config] Optional configuration file for parsing.
     *
     * @returns Returns a dataframe that was deserialized from the file.
     */
    SyncFileReader.prototype.parseCSV = function (config) {
        if (config) {
            chai_1.assert.isObject(config, "Expected optional 'config' parameter to dataForge.readFileSync(...).parseCSV(...) to be an object with configuration options for CSV parsing.");
        }
        var fs = require('fs');
        return fromCSV(fs.readFileSync(this.filePath, 'utf8'), config);
    };
    /**
     * Deserialize a JSON file to a DataFrame.
     *
     * @param [config] Optional configuration file for parsing.
     *
     * @returns Returns a dataframe that was deserialized from the file.
     */
    SyncFileReader.prototype.parseJSON = function () {
        var fs = require('fs');
        return fromJSON(fs.readFileSync(this.filePath, 'utf8'));
    };
    return SyncFileReader;
}());
/**
 * Read a file synchronously from the file system.
 * Works in Nodejs, doesn't work in the browser.
 *
 * @param filePath The path to the file to read.
 *
 * @returns Returns an object that represents the file. Use `parseCSV` or `parseJSON` to deserialize to a DataFrame.
 */
function readFileSync(filePath) {
    chai_1.assert.isString(filePath, "Expected 'filePath' parameter to dataForge.readFileSync to be a string that specifies the path of the file to read.");
    return new SyncFileReader(filePath);
}
exports.readFileSync = readFileSync;
var concat = _1.Series.concat;
exports.concatSeries = concat;
var zip = _1.Series.zip;
exports.zipSeries = zip;
/**
 * Generate a series from a range of numbers.
 *
 * @param start - The value of the first number in the range.
 * @param count - The number of sequential values in the range.
 *
 * @returns Returns a series with a sequence of generated values. The series contains 'count' values beginning at 'start'.
 */
function range(start, count) {
    chai_1.assert.isNumber(start, "Expect 'start' parameter to 'dataForge.range' function to be a number.");
    chai_1.assert.isNumber(count, "Expect 'count' parameter to 'dataForge.range' function to be a number.");
    var values = [];
    for (var valueIndex = 0; valueIndex < count; ++valueIndex) {
        values.push(start + valueIndex);
    }
    return new _1.Series(values);
}
exports.range = range;
/**
 * Replicate a particular value N times to create a series.
 *
 * @param value The value to replicate.
 * @param count The number of times to replicate the value.
 *
 * @returns Returns a new series that contains N copies of the value.
 */
function replicate(value, count) {
    var values = [];
    for (var i = 0; i < count; ++i) {
        values.push(value);
    }
    return new _1.Series(values);
}
exports.replicate = replicate;
/**
 * Generate a data-frame containing a matrix of values.
 *
 * @param numColumns - The number of columns in the data-frame.
 * @param numRows - The number of rows in the data-frame.
 * @param start - The starting value.
 * @param increment - The value to increment by for each new value.
 *
 * @returns Returns a dataframe that contains a matrix of generated values.
 */
function matrix(numColumns, numRows, start, increment) {
    chai_1.assert.isNumber(numColumns, "Expect 'numColumns' parameter to 'dataForge.matrix' function to be a number.");
    chai_1.assert.isNumber(numRows, "Expect 'numRows' parameter to 'dataForge.matrix' function to be a number.");
    chai_1.assert.isNumber(start, "Expect 'start' parameter to 'dataForge.matrix' function to be a number.");
    chai_1.assert.isNumber(increment, "Expect 'increment' parameter to 'dataForge.matrix' function to be a number.");
    var rows = [];
    var columnNames = [];
    var nextValue = start;
    for (var colIndex = 0; colIndex < numColumns; ++colIndex) {
        columnNames.push((colIndex + 1).toString());
    }
    for (var rowIndex = 0; rowIndex < numRows; ++rowIndex) {
        var row = [];
        for (var colIndex = 0; colIndex < numColumns; ++colIndex) {
            row.push(nextValue + (colIndex * increment));
        }
        nextValue += numColumns * increment;
        rows.push(row);
    }
    return new _2.DataFrame({
        columnNames: columnNames,
        rows: rows,
    });
}
exports.matrix = matrix;
//# sourceMappingURL=index.js.map