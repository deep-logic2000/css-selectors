import Game from '../game/game';

import './app.scss';

class App {
    private game: Game;

    constructor() {
        this.game = new Game();
    }

    public start(): void {
        document.write('Hello from App!');
        window.addEventListener('DOMContentLoaded', () => this.game.restoreGameProgress());
        window.addEventListener('beforeunload', () => this.game.saveCurrentProgress());
    }
}

export default App;
