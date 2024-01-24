export interface BoardMarkup {
    tag: string;
    className: string;
    content: string;
    attributes: { [key: string]: string };
    children: BoardMarkup[] | null;
}

export interface Level {
    levelNumber: number;
    levelTitle: string;
    task: string;
    selector: string;
    markup: string;
    isCompleted: boolean;
    isCompletedWithHelp: boolean;
}

export type LevelsTypes = Level[];

export interface ProgressObjType {
    currentLevel: number;
    levels: LevelsTypes;
}
