var game = new Phaser.Game(1280, 800, Phaser.AUTO, 'gameDiv');

game.state.add('boot0',boot0State);

game.state.add('boot1', boot1State);
game.state.add('load1', load1State);
game.state.add('menu1', menu1State);
game.state.add('play1', play1State);


game.state.add('boot2', boot2State);
game.state.add('load2', load2State);
game.state.add('menu2', menu2State);
game.state.add('play2', play2State);

game.state.add('boot3', boot3State);
game.state.add('load3', load3State);
game.state.add('menu3', menu3State);
game.state.add('play3', play3State);

game.state.add('boot4', boot4State);
game.state.add('load4', load4State);
game.state.add('menu4', menu4State);
game.state.add('play4', play4State);

game.state.add('boot5', boot5State);
game.state.add('load5', load5State);
game.state.add('menu5', menu5State);
game.state.add('play5', play5State);

game.state.add('boot6', boot6State);
game.state.add('load6', load6State);
game.state.add('menu6', menu6State);
game.state.add('play6', play6State);

game.state.start('boot0');