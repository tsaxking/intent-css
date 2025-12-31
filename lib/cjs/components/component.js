"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const hash_js_1 = require("../utils/hash.js");
class Component {
    intentObj;
    constructor(intentObj) {
        this.intentObj = intentObj;
    }
    ;
    get class() {
        return `${this.intentObj.type}_${(0, hash_js_1.hash)(this.intentObj)}`;
    }
}
exports.Component = Component;
;
