
    var gameMinWidth = 0;
    var gameMinHeight = 0;
    var gameMaxWidth = 1280;
    var gameMaxHeight = 800;
    var phaserRenderer = Phaser.AUTO;
    var canvasDiv = 'game';
    var tweenDuration = 1500;  //in ms

    //Creating game object
    var game = new Phaser.Game(gameMaxWidth, gameMaxHeight, phaserRenderer, canvasDiv, null, false, true);

    //Adding states
    game.state.add('boot', this.bootState);
    game.state.add('load', this.loadState);
    game.state.add('playLevel1', this.playLevel1);
    game.state.add('playLevel2', this.playLevel2);
    game.state.add('playLevel3', this.playLevel3);
    game.state.add('playLevel4', this.playLevel4);
    game.state.add('playLevel5', this.playLevel5);
    game.state.add('playLevel6', this.playLevel6);


    //Start the 'boot' state
    game.state.start('boot');