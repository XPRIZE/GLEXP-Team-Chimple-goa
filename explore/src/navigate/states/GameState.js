class GameState extends Phaser.State {
    init(name) { 
        console.log(" in gamestate = "+ name);
    }
    create(){
        this.game.add.button(this.game.width - 50, 0, "assets/Home", function(){ this.game.state.start('bootState')});
    }


}
export default GameState;
