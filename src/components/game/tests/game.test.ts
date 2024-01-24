import Game from '../game';

describe('Game', () => {
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('checkAllLevelsCompleted', () => {
        it('should return true if all levels are completed', () => {
            jest.spyOn(game.levels, 'getLevels').mockReturnValueOnce([
                {
                    levelNumber: 0,
                    levelTitle: 'Level 1',
                    task: 'Select the plates',
                    selector: 'plate',
                    markup: `
            <plate></plate>
            <plate></plate>
            `,
                    isCompleted: true,
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
                    isCompleted: true,
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
                    isCompleted: true,
                    isCompletedWithHelp: false,
                },
            ]);

            const result = game.checkAllLevelsCompleted();

            expect(result).toBe(true);
        });

        it('should return false if any level is not completed', () => {
            jest.spyOn(game.levels, 'getLevels').mockReturnValueOnce([
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
                    isCompleted: true,
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
                    isCompleted: true,
                    isCompletedWithHelp: false,
                },
            ]);

            const result = game.checkAllLevelsCompleted();

            expect(result).toBe(false);
        });
    });
});
