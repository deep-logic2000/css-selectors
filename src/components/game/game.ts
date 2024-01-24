import './game.scss';

import Levels from '../levels/levels';
import HTMLBlock from '../html-section/htmlBlock';
import levels from '../levels/levels-data';
import { setLocalStorage, getLocalStorage } from '../../util/local-storage';
import { ProgressObjType } from '../../types';

class Game {
    public levels: Levels;

    private currentLevel: number;

    private levelsContainer: HTMLElement | null;

    private htmlBlock: HTMLBlock;

    private helpButton: HTMLElement | null;

    private burgerButton: HTMLElement | null;

    private isBurgerMenuOpen: boolean;

    private isGameOver: boolean;

    constructor() {
        this.levels = new Levels();
        this.currentLevel = this.levels.getCurrentLevel();
        this.levelsContainer = document.getElementById('rightSide-wrapper');
        this.htmlBlock = new HTMLBlock(this.levels);
        this.helpButton = document.getElementById('button-help');
        this.burgerButton = document.getElementById('burger-button');
        this.isBurgerMenuOpen = window.innerWidth <= 1000;
        this.isGameOver = false;
        this.init();
    }

    private init(): void {
        this.levels.renderLevelsPanel();
        this.start();
    }

    public start(): void {
        this.isGameOver = false;
        this.currentLevel = this.levels.getCurrentLevel();
        this.loadLevel();
        this.addClickListeners();
    }

    private loadLevel(): void {
        this.isGameOver = false;
        this.htmlBlock.renderTableElements();
        this.htmlBlock.renderHTMLBlock();
    }

    private handleCheckResult(): void {
        if (this.isGameOver) return;
        const inputElement = document.getElementById('css-input') as HTMLInputElement;
        const tableSurface = document.getElementById('table-surface-template') as HTMLElement;
        const ruleSelector: string = levels[this.levels.getCurrentLevel()].selector;

        const elementsToCheck: NodeListOf<Element> = tableSurface.querySelectorAll(ruleSelector);

        const enteredSelectorByUser: string = inputElement.value;

        const selectedElementsByUser: NodeListOf<Element> | null = this.checkIsSelectorValid(enteredSelectorByUser)
            ? tableSurface.querySelectorAll(enteredSelectorByUser)
            : null;

        const markupWrapper: HTMLElement | null = document.getElementById('markup-wrapper');
        if (!this.checkEquality(elementsToCheck, selectedElementsByUser)) {
            markupWrapper?.classList.add('shake');
            setTimeout(() => {
                markupWrapper?.classList.remove('shake');
            }, 500);
        } else {
            elementsToCheck.forEach((element) => {
                element.classList.remove('animated');
                element.classList.add('clean');
            });
            setTimeout(() => {
                this.handleLevelCompleted();
            }, 700);
        }
    }

    public checkEquality(A: NodeList | null, B: NodeList | null): boolean {
        if (!A || !B) return false;
        if (!(A.length === B.length)) return false;
        for (let i = 0; i < A.length; i += 1) {
            if (A[i] !== B[i]) return false;
        }
        return true;
    }

    private checkIsSelectorValid(selector: string): boolean {
        const queryCheck = (s: string): Element | null => document.createDocumentFragment().querySelector(s);

        try {
            queryCheck(selector);
        } catch {
            return false;
        }
        return true;
    }

    private handleLevelCompleted(): void {
        this.levels.setLevelCompleted(this.levels.getCurrentLevel());
        if (this.levels.getCurrentLevel() === this.levels.getLevels().length - 1 || this.checkAllLevelsCompleted()) {
            this.htmlBlock.clearHTMLBlock();
            this.htmlBlock.renderGameCompleted();
            this.isGameOver = true;
            return;
        }
        this.levels.setCurrentLevel(this.levels.getCurrentLevel() + 1);
        this.levels.updateLevelsPanel();
        this.htmlBlock.clearHTMLBlock();
        this.loadLevel();
    }

    public checkAllLevelsCompleted(): boolean {
        return this.levels.getLevels().every((level) => level.isCompleted);
    }

    private handleChangeLevel(level: number): void {
        if (level === this.levels.getCurrentLevel()) return;
        this.isGameOver = false;
        this.levels.setCurrentLevel(level);
        this.levels.updateLevelsPanel();
        this.htmlBlock.clearHTMLBlock();
        this.loadLevel();
    }

    private addClickListeners(): void {
        this.levelsContainer?.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            const levelWrapper: HTMLElement | null = target.closest('li');

            if (!levelWrapper) return;
            if (this.levelsContainer && !this.levelsContainer.contains(levelWrapper)) return;

            this.handleChangeLevel(Number(levelWrapper.getAttribute('datalevel')));
        });

        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('button__submit')) {
                this.handleCheckResult();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.handleCheckResult();
            }
        });

        this.helpButton?.addEventListener('click', () => {
            this.htmlBlock.handleHelpUser(this.isGameOver);
        });

        const resetProgressButton: HTMLElement | null = document.querySelector('.button--reset-progress');

        resetProgressButton?.addEventListener('click', () => {
            this.resetGameProgress();
        });

        this.burgerButton?.addEventListener('click', () => {
            this.handleBurgerMenu();
        });
    }

    public resetGameProgress(): void {
        this.levels.resetLevelProgress();
        this.htmlBlock.renderTableElements();
        this.htmlBlock.renderHTMLBlock();
    }

    public saveCurrentProgress(): void {
        const progressObj: ProgressObjType = {
            currentLevel: this.levels.getCurrentLevel(),
            levels: this.levels.getLevels(),
        };
        setLocalStorage('savedLastProgress', progressObj);
    }

    public restoreGameProgress(): void {
        const progressObj: ProgressObjType = getLocalStorage('savedLastProgress');
        if (progressObj) {
            this.levels.setCurrentLevel(progressObj.currentLevel);
            this.levels.setLevels(progressObj.levels);
            this.levels.updateLevelsPanel();
            this.loadLevel();
        }
    }

    private handleBurgerMenu(): void {
        const burgerMenu: HTMLElement | null = document.querySelector('#rightSide-wrapper');
        if (this.burgerButton && burgerMenu) {
            this.burgerButton.classList.toggle('burger-button--active');
            burgerMenu.classList.toggle('burger-menu--active');
        }
    }
}

export default Game;
