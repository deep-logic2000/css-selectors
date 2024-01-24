interface ElementCreatorProps {
    parentNode: HTMLElement | null;
    tag: string;
    className: string;
    content: string;
    attributes: { [key: string]: string };
}

class ElementCreator {
    public node: HTMLElement;

    constructor({
        parentNode = null,
        tag = 'div',
        className = '',
        content = '',
        attributes = {},
    }: Partial<ElementCreatorProps>) {
        const node = document.createElement(tag);
        node.classList.add(className);
        node.innerHTML = content;
        Object.entries(attributes).forEach(([prop, value]) => node.setAttribute(prop, value));
        if (parentNode) parentNode.append(node);
        this.node = node;
    }

    public getElement() {
        return this.node;
    }

    public remove() {
        this.node.remove();
    }

    public appendTo(parentNode: HTMLElement) {
        parentNode.append(this.node);
    }

    public append(...nodes: (Node | string)[]) {
        this.node.append(...nodes);
    }
}

export default ElementCreator;
