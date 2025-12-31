import { create } from '../index';

const style = create({
    colors: {
        base: 'red',
    }
});

style.setStyle();

const block = style.block({
    color: 'base',
});

const text = style.text({
    color: 'primary-muted',
});

const div = document.createElement('div');
div.classList.add(block);
div.innerHTML = `
    <span class="${text}">Hello, World!</span>
`;

document.body.appendChild(div);