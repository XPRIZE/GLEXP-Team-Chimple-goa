import RecordingPauseSignal from './RecordingPauseSignal.js';
import RecordingResumeSignal from './RecordingResumeSignal.js';
import Shape from '../../puppet/objects/Shape.js';
import TabView from '../../puppet/objects/TabView.js';
import MiscUtil from '../../util/MiscUtil.js';

var idObject = new Object();

export default class QuestionTypeOverlay extends Phaser.Group {
    //container to edit item properties
    constructor(game, width, height, clickedObject, pointer, callBack, callBackFunction, object, uniqueImageNames) {
        super(game);
        this._width = width;
        this._height = height;
        
        this._callback = callBackFunction;
        this._callbackContext = callBack;
        this._object = object;
        
        this._recordingPauseSignal = new RecordingPauseSignal();
        this._recordingResumeSignal = new RecordingResumeSignal();

        if (clickedObject instanceof Shape) {
            this._clickedObject = clickedObject.parent.parent;
        } else {
            this._clickedObject = clickedObject;
        }        
        this._uniqueImageNames = uniqueImageNames;

        this._overlayBitMap = game.make.bitmapData(game.width + game.world.camera.x, game.height + game.world.camera.y);
        this._overlayBitMap.draw(game.cache.getImage('storyBuilder/backgroundOverlay'), 0, 0, this._width + game.world.camera.x, this._height + game.world.camera.y);

        this._overlayDisplaySprite = game.add.sprite(0, 0, this._overlayBitMap);
        this._overlayDisplaySprite.anchor.setTo(0, 0);
        this._overlayDisplaySprite.alpha = 0.5;
        this._overlayDisplaySprite.inputEnabled = true;
        game.world.bringToTop(this._overlayDisplaySprite);
        // this._overlayDisplaySprite.input.priorityID = 3;
        MiscUtil.setPriorityID(this._overlayDisplaySprite, 3);

        this._matchingType = this._overlayDisplaySprite.addChild(game.make.sprite(300, 80, 'storyBuilder/setting'));
//        this._matchingType.fixedToCameara = true;
        this._matchingType.inputEnabled = true;
        this._matchingType.events.onInputUp.add(this.matchingPopUp, this);
        // this._matchingType.input.priorityID = 4;
        MiscUtil.setPriorityID(this._matchingType, 4);
        
        this._multipleChoice = this._overlayDisplaySprite.addChild(game.make.sprite(300, 160, 'storyBuilder/setting'));
//        this._settings.fixedToCameara = true;
        this._multipleChoice.inputEnabled = true;
        this._multipleChoice.events.onInputUp.add(this.multipleChoicePopUp, this);
        this._multipleChoice.input.priorityID = 4;
        MiscUtil.setPriorityID(this._multipleChoice, 4);

    }

    multipleChoicePopUp()
    {
        this._overlayBitMap.destroy();
        this._overlayDisplaySprite.destroy();
                
        window.display_multiple_choice_pop(this._callback, this._callbackContext, this._object, this._uniqueImageNames);
    }
    
    matchingPopUp()
    {
        this._overlayBitMap.destroy();
        this._overlayDisplaySprite.destroy();
        
        window.display_matching_pop(this._callback, this._callbackContext, this._object, this._uniqueImageNames);
    }
    
    
    shutdown() {
        this._overlayBitMap.destroy();
    }
}