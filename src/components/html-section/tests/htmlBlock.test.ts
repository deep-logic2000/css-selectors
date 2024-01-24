import HTMLBlock from '../htmlBlock';
import Levels from '../../levels/levels';

describe('HTMLBlock', () => {
    describe('clearCSSInput', () => {
        beforeEach(() => {
            document.body.innerHTML = `
        <input id="css-input" type="text" value="Some value" />
      `;
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });

        test('should clear the value of css-input element', () => {
            const levels = new Levels();
            const htmlBlock = new HTMLBlock(levels);
            htmlBlock.clearCSSInput();

            const cssInput = document.getElementById('css-input') as HTMLInputElement;
            expect(cssInput.value).toBe('');
        });
    });
});
