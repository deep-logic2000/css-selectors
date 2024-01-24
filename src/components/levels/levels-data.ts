import { LevelsTypes } from '../../types';

const levels: LevelsTypes = [
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
        levelTitle: 'Level 2',
        task: 'Select the boxes',
        selector: 'box:first-child',
        markup: `
        <box></box>
        <plate></plate>
        <tomato></tomato>
        <box></box>`,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 3,
        levelTitle: 'Level 3',
        task: 'Select the plates',
        selector: 'plate[fancy="true"]',
        markup: `
        <plate></plate>
        <plate fancy="true"></plate>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 4,
        levelTitle: 'Level 4',
        task: 'Select the plates',
        selector: 'plate tomato',
        markup: `
        <tomato></tomato>
        <plate></plate>
        <plate>
        <tomato></tomato>
        </plate>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 5,
        levelTitle: 'Level 5',
        task: 'Select the plates',
        selector: 'box:last-child',
        markup: `
        <orange></orange>
        <box></box>
        <box>
        <orange></orange>
        <orange></orange>
        </box>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 6,
        levelTitle: 'Level 6',
        task: 'Select the plates',
        selector: '#orange-middle',
        markup: `
        <box></box>
        <plate>
        <orange></orange>
        <orange id="orange-middle"></orange>
        <orange></orange>
        </plate>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 7,
        levelTitle: 'Level 7',
        task: 'Select the plates',
        selector: 'plate:nth-child(2n)',
        markup: `
        <plate fancy="true"></plate>
        <plate></plate>
        <plate fancy="true"></plate>
        <plate></plate>
        <plate fancy="true"></plate>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 8,
        levelTitle: 'Level 8',
        task: 'Select the plates',
        selector: '.empty ~ orange',
        markup: `
        <plate></plate>
        <orange></orange>
        <plate class="empty"></plate>
        <orange></orange>
        <orange></orange>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 9,
        levelTitle: 'Level 9',
        task: 'Select the plates',
        selector: 'box + orange',
        markup: `
        <box>
        <orange></orange>
        <orange></orange>
        </box>
        <orange></orange>
        <orange></orange>
        <box>
        <orange></orange>
        </box>
        <orange></orange>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 10,
        levelTitle: 'Level 10',
        task: 'Select the plates',
        selector: '*:not(plate) > orange',
        markup: `
        <plate>
        <orange></orange>
        <orange></orange>
        </plate>
        <orange></orange>
        <orange></orange>
        <box>
        <orange></orange>
        </box>
        <orange></orange>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
    {
        levelNumber: 11,
        levelTitle: 'Level 11',
        task: 'Select the plates',
        selector: '.vegetable:last-of-type',
        markup: `
        <orange></orange>
        <orange></orange>
        <cucumber class="vegetable"></cucumber>
        <cucumber class="vegetable"></cucumber>
        <tomato class="vegetable"></tomato>
        <tomato class="vegetable"></tomato>
        `,
        isCompleted: false,
        isCompletedWithHelp: false,
    },
];

export default levels;
