

    var physicsEngine = Phaser.Physics.ARCADE;

    //Creating game object
    var game = new Phaser.Game(gameMaxWidth, gameMaxHeight, phaserRenderer, canvasDiv, null, false, true);

    //Adding states
    game.state.add('boot', this.bootState);
    game.state.add('load', this.loadState);
    game.state.add('A', this.A);
    game.state.add('B', this.B);
    game.state.add('C', this.C);
    game.state.add('D', this.D);
    game.state.add('E', this.E);
    game.state.add('F', this.F);
    game.state.add('G', this.G);
    game.state.add('H', this.H);
    game.state.add('I', this.I);
    game.state.add('J', this.J);
    game.state.add('K', this.K);
    game.state.add('L', this.L);
    game.state.add('M', this.M);
    game.state.add('N', this.N);
    game.state.add('O', this.O);
    game.state.add('P', this.P);
    game.state.add('Q', this.Q);
    game.state.add('R', this.R);
    game.state.add('S', this.S);
    game.state.add('T', this.T);
    game.state.add('U', this.U);
    game.state.add('V', this.V);
    game.state.add('W', this.W);
    game.state.add('X', this.X);
    game.state.add('Y', this.Y);
    game.state.add('Z', this.Z);

    //Start the 'boot' state
    game.state.start('boot');