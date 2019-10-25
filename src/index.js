"use strict";
exports.__esModule = true;
var immer_1 = require("immer");
var react_1 = require("react");
var reactn_1 = require("reactn");
/**
 * UseImmer for Global State
 *
 * @param {string} property
 */
function useImmerGlobal(property) {
    var _a = reactn_1.useGlobal(property), val = _a[0], updateValue = _a[1];
    return [val, react_1.useCallback(function (updater) {
            updateValue(immer_1["default"](reactn_1.getGlobal()[property], updater));
        }, [property, updateValue])];
}
exports.useImmerGlobal = useImmerGlobal;
/**
 * Set Global State with Immer.
 *
 * @param {string} property
 * @param {function} updater
 */
function setGlobalImmer(property, updater) {
    var _a;
    return reactn_1.setGlobal((_a = {},
        _a[property] = immer_1["default"](reactn_1.getGlobal()[property], updater),
        _a));
}
exports.setGlobalImmer = setGlobalImmer;
