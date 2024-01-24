import Levels from '../levels';
import levelsData from '../levels-data';
import { LevelsTypes } from '../../../types';

describe('Levels', () => {
    let levels: Levels;

    beforeEach(() => {
        levels = new Levels();
    });

    describe('check is getLevels a function', () => {
        test('should check whether getlevels() is method', () => {
            expect(typeof levels.getLevels).toBe('function');
        });
    });

    describe('getLevels', () => {
        it('should return the levels data', () => {
            const result = levels.getLevels();
            expect(result).toEqual(levelsData);
        });
    });

    describe('setLevels', () => {
        it('should update the levels data', () => {
            const newLevels = levelsData;

            levels.setLevels(newLevels);
            const result = levels.getLevels();

            expect(result).toEqual(newLevels);
        });
    });

    describe('setCurrentLevel', () => {
        it('should return the current level correctly', () => {
            const newLevel = 2;
            levels.setCurrentLevel(newLevel);
            const currentLevel = levels.getCurrentLevel();

            // Assert that the current level is returned correctly
            expect(currentLevel).toBe(newLevel);
        });
    });

    describe('setCurrentLevel', () => {
        it('should set the current level correctly', () => {
            const newLevel = 2;

            // Call the setCurrentLevel method
            levels.setCurrentLevel(newLevel);

            // Assert that the current level is set correctly
            expect(levels.getCurrentLevel()).toBe(newLevel);
        });
    });

    test('should set isCompletedWithHelp to true for the current level', () => {
        levels.setIsHelpUsed();
        const currentLevel = levels.getCurrentLevel();
        const currentLevelData = levels.getLevels()[currentLevel];
        expect(currentLevelData.isCompletedWithHelp).toBe(true);
    });

    describe('resetLevelProgress', () => {
        it('should reset the level progress correctly', () => {
            // Mock the necessary DOM elements or functions
            document.querySelector = jest.fn(() => ({
                innerHTML: '',
                append: jest.fn(),
            }));

            // Set initial level progress
            const initialLevels: LevelsTypes = [
                {
                    levelNumber: 0,
                    levelTitle: 'Level 1',
                    task: 'Select the plates',
                    selector: 'plate',
                    markup: `
            <plate></plate>
            <plate></plate>
            `,
                    isCompleted: false,
                    isCompletedWithHelp: false,
                },
                {
                    levelNumber: 1,
                    levelTitle: 'Level 1',
                    task: 'Select the plates',
                    selector: 'plate',
                    markup: `
            <plate></plate>
            <plate></plate>
            `,
                    isCompleted: false,
                    isCompletedWithHelp: false,
                },
                {
                    levelNumber: 2,
                    levelTitle: 'Level 1',
                    task: 'Select the plates',
                    selector: 'plate',
                    markup: `
            <plate></plate>
            <plate></plate>
            `,
                    isCompleted: false,
                    isCompletedWithHelp: false,
                },
            ];
            levels.setLevels(initialLevels);
            levels.setCurrentLevel(2);
            levels.setLevelCompleted(1);

            // Reset level progress
            levels.resetLevelProgress();

            // Assert that the levels are reset
            const resetLevels = levels.getLevels();
            resetLevels.forEach((level) => {
                expect(level.isCompleted).toBe(false);
                expect(level.isCompletedWithHelp).toBe(false);
            });

            // Assert that the current level is reset to 0
            expect(levels.getCurrentLevel()).toBe(0);
        });
    });
});
