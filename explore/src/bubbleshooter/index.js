import StateHolder from '../StateHolder.js';
import Puzzle from './states/MainStages/Puzzle';
import Alphabets from './states/MainStages/Alphabets';
import Number from './states/MainStages/Number'
import HomeScreen from './states/Menus/HomeScreen'
import LevelSceenAlphabets from './states/LevelScreen/LevelSceenAlphabets'
import LevelSceenNumber from './states/LevelScreen/LevelSceenNumber'
import ScoreCardNumber from './states/Scores/ScoreCardNumber'
import CategoriesScreen from './states/Menus/CategoriesScreen'
import LevelScreenFruit from './states/LevelScreen/LevelScreenFruit'
import Fruits from './states/MainStages/Fruits'
import LevelScreenAnimal from './states/LevelScreen/LevelScreenAnimal'
import Animals from './states/MainStages/Animals'
import LevelScreenPuzzle from './states/LevelScreen/LevelScreenPuzzle'
import LevelScreenVegitable from './states/LevelScreen/LevelScreenVegitable'
import Vegitable from './states/MainStages/Vegitable'
import LoadStates from './states/LoadState/LoadStates'


export default class BubbleShooterStateHolder extends StateHolder {
    
    constructor(game){
        super(game);
        this.wei=0;
        this.hei=0;
        
        if(navigator.userAgent.match(/iPad|Android|webOS|iPhone|iPod|Blackberry/i) )
        {
             if(window.screen.width<= window.innerWidth)
             {
                 this.wei = window.screen.width;
             } else
                 this.wei = window.innerWidth;

             if(window.screen.height<= window.innerHeight)
             {
                 this.hei = window.screen.height;
             } else
                this.hei = window.innerHeight;

        // do mobile stuff
        } else {
            //console.log('desktop');
            this.wei = window.innerWidth;
            this.hei = window.innerHeight; 
        }

        //  console.log("pixel Ratio = "+ window.devicePixelRatio);  
    //    new Demo(this.wei*window.devicePixelRatio, this.hei*window.devicePixelRatio);

    }
    
     createStates(){
     
       //  All Level flags ....
        this._LevelFlag = 1;
        this._LoadFlag = 1;
        
        //  Set Variable for World size 
       
       	this.game.state.add('Bubble_Puzzle', Puzzle, false);
        this.game.state.add('Bubble_Alphabets', Alphabets, false);
        this.game.state.add('Bubble_Number',Number,false);
        this.game.state.add('Bubble_HomeScreen',HomeScreen,false);
        this.game.state.add('Bubble_LevelSceenAlphabets',LevelSceenAlphabets,false);
        this.game.state.add('Bubble_LevelSceenNumber',LevelSceenNumber,false);
        this.game.state.add('Bubble_ScoreCardNumber',ScoreCardNumber,false);
        this.game.state.add('Bubble_CategoriesScreen',CategoriesScreen,false);
        this.game.state.add('Bubble_LevelScreenFruit',LevelScreenFruit,false);
        this.game.state.add('Bubble_Fruits',Fruits,false);
        this.game.state.add('Bubble_LevelScreenAnimal',LevelScreenAnimal,false);
        this.game.state.add('Bubble_Animals',Animals,false);
        this.game.state.add('Bubble_LevelScreenPuzzle',LevelScreenPuzzle,false);
        this.game.state.add('Bubble_LevelScreenVegitable',LevelScreenVegitable,false);
        this.game.state.add('Bubble_Vegitable',Vegitable,false);
        this.game.state.add('Bubble_LoadStates',LoadStates,false);
    
}

startDefault() {
		this.game.state.start('Bubble_HomeScreen');
    }
    
}

