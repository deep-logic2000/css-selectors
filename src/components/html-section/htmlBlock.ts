import './htmlBlock.scss';
// import ElementCreator from '../../util/element-creator';
import levelsData from '../levels/levels-data';
import Levels from '../levels/levels';

class HTMLBlock {
    private tableSurface: HTMLElement | null;

    constructor(private levels: Levels) {
        this.levels = levels;
        this.tableSurface = document.getElementById('table-surface');
    }

    public renderHTMLBlock(): void {
        const htmlBlock = document.getElementById('html-markup');
        const tableOpenTag = document.getElementById('table-open-tag');
        const tableCloseTag = document.getElementById('table-close-tag');

        if (!htmlBlock) return;

        if (tableOpenTag) tableOpenTag.innerText = '<div class="table">';
        if (tableCloseTag) tableCloseTag.innerText = '</div>';

        htmlBlock.innerHTML = '';

        const { markup } = levelsData[this.levels.getCurrentLevel()];

        const res: HTMLElement = document.createElement('div');
        res.setAttribute('id', 'html-markup__content');
        res.insertAdjacentHTML('beforeend', markup);

        res.querySelectorAll('*').forEach((el) => {
            if (
                el.parentElement &&
                el.parentElement.hasAttribute('id') &&
                el.parentElement.getAttribute('id') === 'html-markup__content'
            ) {
                const result = this.getMarkupForRender(el);
                htmlBlock.append(result);
            }
        });

        this.addMouseOverListeners();
    }

    private getMarkupForRender(el: Element): HTMLElement {
        const hasChildren = el.children && el.children.length > 0;
        const tagName = el.tagName.toLowerCase();

        const wrapper = document.createElement('div');
        wrapper.classList.add('html-markup__element');
        let attributesString = '';

        if (el.attributes && el.attributes.length > 0) {
            for (let index = 0; index < el.attributes.length; index += 1) {
                const element = el.attributes[index];

                attributesString += `${element.name}="${element.value}" `;
            }
        }

        let attributeSpace = '';
        if (attributesString.length > 0) {
            attributeSpace = ' ';
        }

        if (hasChildren) {
            wrapper.innerText = `<${tagName}${attributeSpace}${attributesString}>`;

            for (let index = 0; index < el.children.length; index += 1) {
                const element = el.children[index];

                wrapper.append(this.getMarkupForRender(element));
            }

            wrapper.append(`</${tagName}>`);
        } else {
            wrapper.innerText = `<${tagName}${attributeSpace}${attributesString} />`;
        }

        return wrapper;
    }

    public renderTableElements(): void {
        if (this.tableSurface) this.tableSurface.innerText = '';
        document.querySelector('table-surface-template')?.remove();
        const { markup } = levelsData[this.levels.getCurrentLevel()];

        const res: HTMLElement = document.createElement('div');
        res.setAttribute('id', 'table-surface-template');
        res.insertAdjacentHTML('beforeend', markup);

        const arr: NodeListOf<Element> = res.querySelectorAll('*');

        for (let index = 0; index < arr.length; index += 1) {
            const element = arr[index];
            if (
                element.parentElement &&
                element.parentElement.hasAttribute('id') &&
                element.parentElement.getAttribute('id') === 'table-surface-template'
            ) {
                res.append(element);
                this.tableSurface?.append(res);
            }
        }
        const dataSelector: string = levelsData[this.levels.getCurrentLevel()].selector;

        if (document?.querySelectorAll(dataSelector) && document?.querySelectorAll(dataSelector).length > 1) {
            document?.querySelectorAll(dataSelector).forEach((el) => {
                el.classList.add('animated');
            });
        } else {
            document?.querySelector(dataSelector)?.classList.add('animated');
        }
    }

    public clearCSSInput(): void {
        const cssInput = document.getElementById('css-input') as HTMLInputElement;
        cssInput.value = '';
    }

    private addMouseOverListeners(): void {
        const markup = document.getElementById('html-markup');

        this.tableSurface?.addEventListener('mouseover', (e) => this.handleMouseOverTable(e));
        markup?.addEventListener('mouseover', (e) => this.handleMouseOverMarkup(e));
        this.tableSurface?.addEventListener('mouseout', (e) => this.handleMouseOutTable(e));
        markup?.addEventListener('mouseout', (e) => this.handleMouseOutMarkup(e));
    }

    private handleMouseOverMarkup(e: MouseEvent): void {
        const target = e.target as HTMLElement;

        if (!target || !target.classList.contains('html-markup__element')) return;
        const markupItems = document.querySelectorAll('#html-markup *');
        const index = Array.from(markupItems).indexOf(target);
        const tableItems = document.querySelectorAll('#table-surface-template *');

        const tableItem = tableItems[index];

        this.showTooltip(tableItem);
    }

    private handleMouseOverTable(e: MouseEvent): void {
        const target = e.target as Element;
        if (!target) return;

        const tableItems = document.querySelectorAll('#table-surface-template *');
        if (tableItems.length === 0) return;

        const index = Array.from(tableItems).indexOf(target);

        if (index === -1) return;
        this.showTooltip(target);
    }

    private handleMouseOutTable(e: MouseEvent): void {
        this.hideTooltip();
        e.stopPropagation();
    }

    private handleMouseOutMarkup(e: MouseEvent): void {
        e.stopPropagation();
        this.hideTooltip();
    }

    private showTooltip(element: Element): void {
        element.setAttribute('hovered', 'true');
        const tableItems = document.querySelectorAll('#table-surface-template *');
        const index = Array.from(tableItems).indexOf(element);
        const elPosition = tableItems[index]?.getBoundingClientRect();

        const helperTextWrapper = document.getElementById('helper-wrapper');

        helperTextWrapper?.classList.add('show');

        helperTextWrapper?.setAttribute(
            'style',
            `top: ${elPosition.y - 65}px; left: ${elPosition.x + element.clientWidth}px; display: block;`
        );

        const id: string | null = element.getAttribute('id');
        const classes: string | undefined = element.getAttribute('class')?.replace('animated', '');
        const fancy: string | null = element.getAttribute('fancy');

        if (helperTextWrapper) {
            helperTextWrapper.innerText = `<${element.tagName.toLowerCase()} ${id ? `id="${id}"` : ''} ${
                classes ? `class="${classes}"` : ''
            } ${fancy ? `fancy="${fancy}"` : ''} />`;
        }

        const markupItems: NodeListOf<HTMLElement> = document.querySelectorAll('#html-markup *');

        markupItems[index].classList.add('enhcanced');
    }

    public hideTooltip(): void {
        const hoveredElements: NodeListOf<HTMLElement> = document.querySelectorAll('[hovered="true"]');
        hoveredElements.forEach((el) => {
            el.removeAttribute('hovered');
        });
        const enhcancedElements = document.querySelectorAll('.enhcanced');
        enhcancedElements.forEach((el) => {
            el.classList.remove('enhcanced');
        });

        const helperTextWrapper: HTMLElement | null = document.getElementById('helper-wrapper');
        helperTextWrapper?.classList.remove('show');
        helperTextWrapper?.setAttribute('style', 'display: none;');
    }

    public clearHTMLBlock(): void {
        const htmlBlockElements: NodeListOf<Element> = document.querySelectorAll('#html-markup *');
        htmlBlockElements.forEach((el) => {
            el.remove();
        });

        const tableSurfaceElements: HTMLElement | null = document.getElementById('table-surface-template');
        tableSurfaceElements?.remove();
        this.hideTooltip();
        this.clearCSSInput();
    }

    public renderGameCompleted(): void {
        this.clearHTMLBlock();
        const spanWinText: HTMLElement = document.createElement('span');
        spanWinText.innerText = 'Congratulations! You have completed the game!';
        spanWinText.classList.add('win-text');

        if (this.tableSurface) {
            this.tableSurface.append(spanWinText);
        }
    }

    public handleHelpUser(isGameOver: boolean): void {
        const { selector } = levelsData[this.levels.getCurrentLevel()];
        if (!isGameOver) {
            this.renderSelectorByLetters(selector);
            this.levels.setIsHelpUsed();
        }
    }

    private renderSelectorByLetters(selector: string): void {
        const cssInput = document.getElementById('css-input') as HTMLInputElement;
        cssInput.value = '';
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < selector.length) {
                cssInput.value += selector[index];
                index += 1;
            } else {
                clearInterval(intervalId);
            }
        }, 200);
    }
}

export default HTMLBlock;
