import { create } from '../index';
const style = create({
    colors: {
        base: '#ffffff',
    }
});
style.globals.colors.base;
const text = style.text({});
style.text({}, {
    extends: text,
});
