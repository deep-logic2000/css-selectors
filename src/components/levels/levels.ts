import './levels.scss';

import levels from './levels-data';
import { LevelsTypes } from '../../types';
import ElementCreator from '../../util/element-creator';
// import HTMLBlock from '../html-section/htmlBlock';

class Levels {
    private levels: LevelsTypes;

    private currentLevel: number;

    public levelsContainer: HTMLElement | null;

    constructor() {
        this.levels = levels;
        this.currentLevel = 0;
        this.levelsContainer = document.getElementById('rightSide-wrapper');
    }

    public renderLevelsPanel(): void {
        if (!this.levelsContainer) return;
        this.levelsContainer.innerHTML = '';

        this.levels.forEach((level, index) => {
            const levelElement: ElementCreator = new ElementCreator({
                tag: 'li',
                className: 'level',
                content: `
                <span class="checkmark ${level.isCompleted ? 'completed' : ''}"></span>
                <div class="level__title">${level.levelTitle}</div>
                <span class="with-help-info">${level.isCompletedWithHelp ? '(with help)' : ''}</span>
                `,
                attributes: { datalevel: `${level.levelNumber - 1}` },
            });

            if (index === this.currentLevel) {
                levelElement.node.classList.add('level--current');
            }

            if (this.levelsContainer) {
                this.levelsContainer.append(levelElement.node);
            }
        });
        this.renderResetProgressButton();
    }

    public updateLevelsPanel(): void {
        const levelsElements: NodeListOf<Element> = document.querySelectorAll('.level');

        levelsElements.forEach((levelElement, index) => {
            const checkmark: HTMLElement | null = levelElement.querySelector('.checkmark');
            const withHelpInfo: HTMLElement | null = levelElement.querySelector('.with-help-info');
            levelElement.classList.remove('level--current');

            if (checkmark && withHelpInfo) {
                if (this.levels[index].isCompleted) {
                    checkmark.classList.add('completed');
                } else {
                    checkmark.classList.remove('completed');
                }

                if (this.levels[index].isCompletedWithHelp) {
                    withHelpInfo.innerHTML = '(with help)';
                } else {
                    withHelpInfo.innerHTML = '';
                }

                if (index === this.currentLevel) {
                    levelElement.classList.add('level--current');
                }
            }
        });
    }

    public getLevels(): LevelsTypes {
        return this.levels;
    }

    public setLevels(newLevels: LevelsTypes): void {
        this.levels = newLevels;
    }

    public getCurrentLevel(): number {
        return this.currentLevel;
    }

    public setCurrentLevel(newLevel: number): void {
        this.currentLevel = newLevel;
    }

    public setLevelCompleted(level: number): void {
        this.levels[level].isCompleted = true;
        this.updateLevelsPanel();
    }

    public setIsHelpUsed(): void {
        this.levels[this.currentLevel].isCompletedWithHelp = true;
    }

    public renderResetProgressButton(): void {
        const resetProgressButton = new ElementCreator({
            tag: 'button',
            className: 'button--reset-progress',
            content: 'Reset progress',
        });

        if (this.levelsContainer) {
            this.levelsContainer.append(resetProgressButton.node);
        }
    }

    public resetLevelProgress(): void {
        this.levels = this.levels.map((level) => ({ ...level, isCompleted: false, isCompletedWithHelp: false }));
        this.currentLevel = 0;
        this.updateLevelsPanel();
    }
}

export default Levels;
