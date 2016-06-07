import Puzzle from 'states/MainStages/Puzzle';
import Alphabets from 'states/MainStages/Alphabets';
import Number from 'states/MainStages/Number'
import HomeScreen from 'states/Menus/HomeScreen'
import LevelSceenAlphabets from 'states/LevelScreen/LevelSceenAlphabets'
import LevelSceenNumber from 'states/LevelScreen/LevelSceenNumber'
import ScoreCardNumber from 'states/Scores/ScoreCardNumber'
import CategoriesScreen from 'states/Menus/CategoriesScreen'
import LevelScreenFruit from 'states/LevelScreen/LevelScreenFruit'
import Fruits from 'states/MainStages/Fruits'
import LevelScreenAnimal from 'states/LevelScreen/LevelScreenAnimal'
import Animals from 'states/MainStages/Animals'
import LevelScreenPuzzle from 'states/LevelScreen/LevelScreenPuzzle'
import LevelScreenVegitable from 'states/LevelScreen/LevelScreenVegitable'
import Vegitable from 'states/MainStages/Vegitable'
import LoadStates from 'states/LoadState/LoadStates'


class PreClass extends Phaser.Game {

	constructor(width , height) {
		
        super(width, height, Phaser.CANVAS, 'content', null);
        console.log("width : "+ width + " height : "+ height);
        
        //  All Level flags ....
        this._LevelFlag = 1;
        this._LoadFlag = 1;
        
        //  Set Variable for World size 
       
       	this.state.add('Puzzle', Puzzle, false);
        this.state.add('Alphabets', Alphabets, false);
        this.state.add('Number',Number,false);
        this.state.add('HomeScreen',HomeScreen,false);
        this.state.add('LevelSceenAlphabets',LevelSceenAlphabets,false);
        this.state.add('LevelSceenNumber',LevelSceenNumber,false);
        this.state.add('ScoreCardNumber',ScoreCardNumber,false);
        this.state.add('CategoriesScreen',CategoriesScreen,false);
        this.state.add('LevelScreenFruit',LevelScreenFruit,false);
        this.state.add('Fruits',Fruits,false);
        this.state.add('LevelScreenAnimal',LevelScreenAnimal,false);
        this.state.add('Animals',Animals,false);
        this.state.add('LevelScreenPuzzle',LevelScreenPuzzle,false);
        this.state.add('LevelScreenVegitable',LevelScreenVegitable,false);
        this.state.add('Vegitable',Vegitable,false);
        this.state.add('LoadStates',LoadStates,false);
        
		this.state.start('HomeScreen');
       
	}
}

export default PreClass;