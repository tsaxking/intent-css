"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const style = (0, index_1.create)({
    colors: {
        base: '#ffffff',
    }
});
style.globals.colors.base;
const text = style.text({});
style.text({}, {
    extends: text,
});
