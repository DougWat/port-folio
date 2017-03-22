"use strict";
game.state.add('Main', MainMenu);
game.state.add('OnBoarding', OnBoarding);
game.state.add('Game', Game);
game.state.add('Gameover',Gameover);
game.state.add('LoadMusic',MusicLoadMenu);
game.state.start('Main')