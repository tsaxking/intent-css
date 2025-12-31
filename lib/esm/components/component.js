import { hash } from '../utils/hash.js.js';
export class Component {
    intentObj;
    constructor(intentObj) {
        this.intentObj = intentObj;
    }
    ;
    get class() {
        return `${this.intentObj.type}_${hash(this.intentObj)}`;
    }
}
;
