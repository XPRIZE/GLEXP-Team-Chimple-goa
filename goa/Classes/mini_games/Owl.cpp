//
//  Owl.cpp 
//  goa
//
//  Created by Karim Mirazul  on 20/09/16
//
//

#include "Owl.h"
#include "../menu/HelpLayer.h"`
#include "../util/CommonLabelTTF.h"
#include "../util/MatrixUtil.h"
#include "../util/Speaker.h"

USING_NS_CC;

Scene* Owl::createScene()
{
	auto scene = Scene::create();
	auto layer = Owl::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Owl::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Owl::onEnterTransitionDidFinish()
{
	    _sceneMap = {
		{
			{ "owlCity",
				{
					{ "bg", "owlcity/owlcity.csb"},
					{ "character1", "owlcity/character.csb"},
					{ "character2", "owlcity/character_enemy.csb"},
					{ "plist", "owlcity/owlcity.plist"},
					{"smallbar","owlcity/smallbar_orange.png"},
					{"orangebase","owlcity/orangebase.png"},
					{"greenbase","owlcity/greenbase.png"},
					{"gridOrange","owlcity/smallbar_orange.png"},
					{"gridGreen","owlcity/smallbar_green.png" },
					{"gridWhite","owlcity/smallbar_white.png"},
					{"topBoard","orangebar"},
					{"whiteBoard","smallbar_white"},
					{ "whiteBoard2","smallbar_white" },
					{"bodyCharacter","body"},
					{"hideBlack","owlcity/dash_black.png"},
					{ "hideGreen","owlcity/dash_green.png" },
					{ "hideOrange","owlcity/dash_orange.png" }
				}
			},
			{ "owlisland",
				{
					{ "bg", "owlisland/owlisland.csb" },
					{ "character1", "owlisland/character.csb" },
					{ "character2", "owlisland/character_enemy.csb" },
					{ "plist", "owlisland/owlisland.plist"},
					{ "smallbar","owlisland/smallbar.png"},
					{ "orangebase","owlisland/orangebase.png"},
					{ "greenbase","owlisland/greenbase.png" },
					{ "gridOrange","owlisland/smallbar.png" },
					{ "gridGreen","owlisland/smallbar_green.png" },
					{ "gridWhite","owlisland/white.png" },
					{ "topBoard","orangebar" },
					{ "whiteBoard","white_2" },
					{"whiteBoard2","white_5"},
					{ "bodyCharacter","Sprite_6" },
					{ "hideGreen","owlisland/dash_orange.png" },
					{ "hideOrange","owlisland/dash_green.png" },
					{ "bubble","owlisland/bubble.csb" }
				}
			},
			{ "owljungle",
				{
					{ "bg", "owljungle/owljungle.csb" },
					{ "character1", "owljungle/character.csb" },
					{ "character2", "owljungle/character_enemy.csb" },
					{ "plist", "owljungle/owljungle.plist" },
					{ "smallbar","owljungle/smallbar_green.png" },
					{ "orangebase","owljungle/log.png" },
					{ "greenbase","owljungle/log.png" },
					{ "gridOrange","owljungle/smallbar_green.png" },
					{ "gridGreen","owljungle/smallbar_orange.png" },
					{ "gridWhite","owljungle/smallbar_orange.png" },
					{ "topBoard","board_8" },
					{ "whiteBoard","smallbar_white" },
					{ "whiteBoard2","smallbar_white" },
					{ "bodyCharacter","bird_1"},
					{ "hideGreen","owljungle/dash_orange.png" },
					{ "hideOrange","owljungle/dash_green.png" }
				}
			}
		}
	};

	_owlPropertyMap = {
		{
			{"owlCity",
				{
					{"rowFirst",0.19f},
					{"blockX1",0.06f},
					{"blockY1",0.34f},
					{ "blockX2",0.7f },
					{ "blockY2",0.36f },
					{"owlheightToAlpha",1.5f},
					{"scaleSecond",0.5f}
				}
			},
			{ "owlisland",
				{
					{ "rowFirst",0.19f },
					{ "blockX1",0.06f },
					{ "blockY1",0.34f },
					{ "blockX2",0.7f },
					{ "blockY2",0.36f },
					{ "owlheightToAlpha",1.5f },
					{ "scaleSecond",0.5f }
				}
			},
			{ "owljungle",
				{
					{ "rowFirst",0.19f },
					{ "blockX1",0.06f },
					{ "blockY1",0.34f },
					{ "blockX2",0.7f },
					{ "blockY2",0.35f },
					{ "owlheightToAlpha",1.5f },
					{ "scaleSecond",0.5f }
				}
			}
		}
	};



	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto origin = Director::getInstance()->getVisibleOrigin();

	// Here we set the level of complexity and concept ....
	int gameCurrentLevel = _menuContext->getCurrentLevel();

	// lesson word spelling ....
	//_lesson.setConcept(Lesson::CONCEPT::WORD_SPELLING);

	_eventDispatcher->addCustomEventListener("bagOfChoiceQuiz", CC_CALLBACK_1(Owl::gameStart, this));

	auto complexity = 3 + std::floor((((float)_menuContext->getCurrentLevel() / 50.0f) * 7.0f));
	_lesson.getBag(5, 2, complexity, 24 , 24, true);

}

void Owl::gameStart(cocos2d::EventCustom *eventCustom) {
	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto origin = Director::getInstance()->getVisibleOrigin();

	CCLOG("onLessonReady begin");
	std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
	CCLOG("onLessonReady to unmarshallBagOfChoices");
	vector<Lesson::Bag> vbag = Lesson::unmarshallBag(buf);

	_vmcBag = vbag;

	std::map<int, std::string> owlSceneMapping = {
		{ 1,	"owlCity" },
		{ 3,	"owlisland" },
		{ 2,    "owljungle" }
	};

	_sentence = LangUtil::getInstance()->translateString(_vmcBag[0].help);
	_sentenceShow = LangUtil::getInstance()->translateString("List of same words");
	_owlCurrentTheme = owlSceneMapping.at(RandomHelper::random_int(1, 3));

	// Here the bag question and answer set in vector<string> of _data_key and _data_value ....
	for (size_t i = 0; i < _vmcBag.size(); i++) {
		_data.insert(pair<string, string>(_vmcBag[i].answerString, getConvertVectorStringIntoString(_vmcBag[i].answers)));
		_data_key.push_back(_vmcBag[i].answerString);
		_data_value.push_back(_vmcBag[i].answers);
	}

	// Here the Scenes are decided by randomly ....
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	Node* bg = CSLoader::createNode(themeResourcePath.at("bg"));
	addChild(bg);
	bg->setName("bg");
	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	// The code is for set the MaxPoint in Scores ...
	int totalPoints = 0;
	for (int index = 0; index < _data_value.size(); index++) {
		for (int valueLetterIndex = 0; valueLetterIndex < _data_value[index].size(); valueLetterIndex++) {
			totalPoints++;
		}
	}
	_menuContext->setMaxPoints(totalPoints);


	//Define Main character and to set the animation ...
	auto timelinecharacter1 = CSLoader::createTimeline(themeResourcePath.at("character1"));
	_sprite = (Sprite *)CSLoader::createNode(themeResourcePath.at("character1"));
	_sprite->runAction(timelinecharacter1);
	_sprite->setScaleX(-1.0f);
	addChild(_sprite, 3);
	timelinecharacter1->play("fly", true);

	// Define the opponent character and the set the animation ...
	auto timelinecharacter2 = CSLoader::createTimeline(themeResourcePath.at("character2"));
	_opponent = (Sprite *)CSLoader::createNode(themeResourcePath.at("character2"));
	_opponent->runAction(timelinecharacter2);
	_opponent->setScale(_owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));
	addChild(_opponent, 2);
	timelinecharacter2->play("fly", true);


	// Here the extra water bubble Animation effect added in OWL-ISLAND SCENE ...
	if (_owlCurrentTheme == "owlisland") {
		auto timelinebgBubble = CSLoader::createTimeline(themeResourcePath.at("bubble"));
		bg->runAction(timelinebgBubble);
		timelinebgBubble->gotoFrameAndPlay(0, true);

		auto timelinecharacter3 = CSLoader::createTimeline(themeResourcePath.at("bubble"));
		auto bubbles = CSLoader::createNode(themeResourcePath.at("bubble"));
		bubbles->runAction(timelinecharacter3);
		bubbles->setPosition(Vec2(visibleSize.width * 0.04, visibleSize.height * 0.4));
		addChild(bubbles, 1);
		timelinecharacter3->gotoFrameAndPlay(0, true);

		auto timelinecharacter4 = CSLoader::createTimeline(themeResourcePath.at("bubble"));
		auto bubble = CSLoader::createNode(themeResourcePath.at("bubble"));
		bubble->runAction(timelinecharacter4);
		bubble->setPosition(Vec2(visibleSize.width - visibleSize.width * 0.08, visibleSize.height * 0.4));
		addChild(bubble, 1);
		timelinecharacter4->gotoFrameAndPlay(0, true);

		_opponent->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard2"))->setVisible(false);
	}



	//Here in jungle scene , the bird white-board is set as visible ...
	if (_owlCurrentTheme == "owljungle") {
		_opponent->setScaleX(-_owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));
		_opponent->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard2"))->setVisible(false);
	}
	auto board = bg->getChildByName(themeResourcePath.at("topBoard"));
	board->setName("topBoard");


	// Set the text value in Top Board .. ex: question
	std::ostringstream boardName;
	boardName << _sentence << " : " << _data_key[_textBoard];
	_textLabel = CommonLabelTTF::create(boardName.str(), "Helvetica", board->getContentSize().height *0.5);
	_textLabel->setAnchorPoint(Vec2(0.5, 0.5));
	_textLabel->setPosition(Vec2(board->getContentSize().width / 2, board->getContentSize().height / 2));
	_textLabel->setName("text");
	board->addChild(_textLabel);


	// Create Label or Text in board which carried by bird ....
	_textOwlBoard = CommonLabelTTF::create("", "Helvetica", _sprite->getChildByName(themeResourcePath.at("whiteBoard"))->getContentSize().height *0.8);
	_textOwlBoard->setPosition(Vec2(_sprite->getChildByName(themeResourcePath.at("whiteBoard"))->getContentSize().width / 2, _sprite->getChildByName(themeResourcePath.at("whiteBoard"))->getContentSize().height / 2));
	_textOwlBoard->setName("owlBoard");
	_textOwlBoard->setColor(Color3B::BLACK);
	_sprite->getChildByName(themeResourcePath.at("whiteBoard"))->addChild(_textOwlBoard);
	_sprite->getChildByName(themeResourcePath.at("whiteBoard"))->setVisible(false);

	// The method CreateGrid is use for the creation of keyboard ...
	createGrid();


	// Initially the level of building is one , so it set by default ...
	setBuildingBlock(++_blockLevel1);
	crateLetterGridOnBuilding(_blockLevel1, _data_value[_textBoard]);

	setBuildingBlockSecond(++_blockLevel2);
	crateLetterGridOnBuildingSecond(_blockLevel2, _data_value[_textBoard2]);


	// This is the code for HelpLayer and this only used in level 1 ....
	auto downGrid = this->getChildByName(_data_value[_textBoard][0]);
	if (_menuContext->getCurrentLevel() == 1) {
		auto help = HelpLayer::create(Rect(downGrid->getPositionX(), downGrid->getPositionY(), downGrid->getContentSize().width, downGrid->getContentSize().height), Rect(visibleSize.width * 0.5, board->getContentSize().height / 2 + board->getPositionY(), board->getContentSize().width, board->getContentSize().height));
		help->click(Vec2(downGrid->getPositionX(), downGrid->getPositionY()));
		help->setName("helpLayer");
		this->addChild(help, 4);
	}

	InitAnimation();
	this->schedule(schedule_selector(Owl::autoPlayerController), RandomHelper::random_int(16, 20));
	scheduleUpdate();

}

// This is method to handle the opponent moving and all animations ...
void Owl::autoPlayerController(float data) {

	std::ostringstream blockName;	blockName << "blockLevel2" << _blockLevel2; std::string blockNameInString = blockName.str();
	auto blockBox = this->getChildByName(blockNameInString);
	auto blockChild = blockBox->getChildren();
	blockChild.at(_textCounter2)->getChildByName("hideBoard")->setVisible(false);
	_textCounter2++;

	if (_textCounter2 == (blockChild.size())) {
		CCLOG("blockGrid2Size : %d  , _blockLevel2 : %d ", _blockLevel2, _data_key.size());
		if ((_blockLevel2 >= _data_key.size()) && _removeCharacterAnimation) {
			//this->unschedule(schedule_selector(Owl::autoPlayerController));
			_removeCharacterAnimation = false;
			CCLOG("< ------ DONE COMPLETE -----  >     I AM IN AUTOPLAYERCONTROLLER METHOD");
			this->runAction(Sequence::create(CallFunc::create([=]() {
				_flagDemo = false;
				_flagDemoSecond = false;
				_opponent->runAction(ScaleTo::create(1.0f, _opponent->getScaleX() * 2, _opponent->getScaleY() * 2));
				_opponent->runAction(MoveTo::create(1, Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2)));
			}), DelayTime::create(1),
				CallFunc::create([=]() {

				CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("res/owllevel/particle_texture.plist");
				_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("res/owllevel/particle_texture.png"));
				_particle->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
				_particle->setName("celebration");
				this->addChild(_particle, 5);
				auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
				audioBg->playEffect("res/sounds/sfx/owl_loss.ogg", false);

			}),
				DelayTime::create(3),
				CallFunc::create([=]() {this->removeChildByName("celebration");  _menuContext->showScore(); }), NULL));
		}
		else {
			setBuildingBlockSecond(++_blockLevel2);
			crateLetterGridOnBuildingSecond(_blockLevel2, _data_value[++_textBoard2]);
		}
		_textCounter2 = 0;
	}
}

// Update method is use for character moving functionality and the opponent too.
void Owl::update(float delta) {
	if(_flagDemo)
	UpdateAnimation(delta);
	if(_flagDemoSecond)
	UpdateAnimationSecond(delta);
}

// To set the all properties in setSpriteProperties ....
void Owl::setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	addChild(ImageObject, zorder);
}

// If data pass as a parameter then it convert in UpperCASE
string Owl::getConvertInUpperCase(string data)
{
	std::ostringstream blockName;
	int i = 0;
	while (data[i])
	{
		blockName << (char)toupper(data[i]);
		i++;
	}
	return blockName.str();
}

// To set the letter on Building for Main Character ...
void Owl::crateLetterGridOnBuilding(int blockLevel, vector<string> displayWord) {

	CCLOG("Letters on new building : %s ", getConvertVectorStringIntoString(displayWord).c_str());
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	auto blockObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("orangebase"));
	auto letterbox = Sprite::createWithSpriteFrameName(themeResourcePath.at("gridOrange"));
	int boxSize = blockObject->getContentSize().width;
	int space = blockObject->getContentSize().width - (letterbox->getContentSize().width * 6);
	//int indiSpace = space / (6+1);
	int indiSpace = 0;
	if (displayWord.size() <= 9) {
		indiSpace = 18;
	}
	int equIndi = (indiSpace * (displayWord.size() - 1));
	int initSpace = blockObject->getContentSize().width - (letterbox->getContentSize().width * displayWord.size())- equIndi;
	initSpace = initSpace / 2;

	float xPosi = initSpace + letterbox->getContentSize().width/2;

	int maxLengthText = 0;
	for (int i = 0; i < displayWord.size(); i++) {

		if (maxLengthText < displayWord[i].length()) {
			maxLengthText = displayWord[i].length();
		}
	}

	for (int i = 0; i <= (displayWord.size() - 1); i++) {
		auto letterGrid = Sprite::createWithSpriteFrameName(themeResourcePath.at("gridOrange"));
		auto hideGrid = Sprite::createWithSpriteFrameName(themeResourcePath.at("hideOrange"));

		auto label = CommonLabelTTF::create(displayWord[i], "Helvetica", letterGrid->getContentSize().height*0.8);
		letterGrid -> setPosition(Vec2(xPosi, blockObject->getContentSize().height *0.45));
		label->setFontSize(std::max(float(20.0),  float(std::abs((letterGrid->getContentSize().height*0.8) - (maxLengthText - 1) * 17))));

		label->setPosition(Vec2(letterGrid->getContentSize().width/2, letterGrid->getContentSize().height /2));
		xPosi = xPosi + indiSpace + letterGrid->getContentSize().width;
		std::ostringstream blockName;	blockName << "blockLevel1" << blockLevel; std::string blockNameInString = blockName.str();
		this->getChildByName(blockNameInString)->addChild(letterGrid);
		letterGrid->addChild(label);

		hideGrid->setPosition(Vec2(letterGrid->getContentSize().width / 2, letterGrid->getContentSize().height / 2));
		letterGrid->addChild(hideGrid);
		hideGrid->setName("hideBoard");
		letterGrid->setName(displayWord[i]);
		letterGrid->setTag(i);
	}
}


// To set the letter on Building for Opponent Character ...
void Owl::crateLetterGridOnBuildingSecond(int blockLevel, vector<string> displayWord) {
	CCLOG("Letters on new building2 : %s ", getConvertVectorStringIntoString(displayWord).c_str());
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	auto blockObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("greenbase"));
	auto letterbox = Sprite::createWithSpriteFrameName(themeResourcePath.at("gridGreen"));
	int space = blockObject->getContentSize().width - (letterbox->getContentSize().width * 6);
	//int indiSpace = space / (6 + 1);
	int indiSpace = 0;
	if (displayWord.size() <= 8) {
		indiSpace = 18 * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond");
	}
	int equIndi = (indiSpace * (displayWord.size() - 1));
	int initSpace = blockObject->getContentSize().width - letterbox->getContentSize().width * displayWord.size() - equIndi;
	initSpace = initSpace / 2 ;

	float xPosi = initSpace + letterbox->getContentSize().width / 2;

	for (int i = 0; i <= (displayWord.size() - 1); i++) {
		auto letterGrid = Sprite::createWithSpriteFrameName(themeResourcePath.at("gridGreen"));
		auto hideGrid = Sprite::createWithSpriteFrameName(themeResourcePath.at("hideGreen"));

		letterGrid->setPosition(Vec2(xPosi, blockObject->getContentSize().height *0.45));
		xPosi = xPosi + indiSpace+ letterGrid->getContentSize().width;
		std::ostringstream blockName;	blockName << "blockLevel2" << blockLevel; std::string blockNameInString = blockName.str();
		this->getChildByName(blockNameInString)->addChild(letterGrid);

		hideGrid->setPosition(Vec2(letterGrid->getContentSize().width / 2, letterGrid->getContentSize().height / 2));
		letterGrid->addChild(hideGrid);
		hideGrid->setName("hideBoard");
		letterGrid->setName(displayWord[i]);
		letterGrid->setTag(i);
	}
}


// This is the method for KEYBOARD STRUCTURE ....
void Owl::createGrid() {
	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	auto alpha = LangUtil::getInstance()->getAllCharacters();

	// matrixValue is API which gives number of choices and answerString ...

	auto matrixValue = MatrixUtil::generateMatrix(_vmcBag[_blockLevel1].answers, _vmcBag[_blockLevel1].otherChoices, 1, 24);

	std::random_shuffle(matrixValue[0].begin(), matrixValue[0].end());

	auto bag = matrixValue[0];
	auto keyboardAllLetters = matrixValue[0].size();

	Sprite* gridObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("smallbar"));

	if (_lesson.getConcept() == Lesson::CONCEPT::WORD_SOUND) {
		Speaker* speaker = new Speaker();
		gridObject = (Sprite*)speaker->createSpeaker("", Vec2(0, 0),true);
	}
	float space = visibleSize.width - (gridObject->getContentSize().width * keyboardAllLetters/2);
	float IndiSpace = space / ((keyboardAllLetters / 2) + 1);
	float xPosi = IndiSpace + gridObject->getContentSize().width / 2;
	auto getSize = gridObject->getContentSize().width;
	int counter = 0;

	int maxLengthText = 0;
	for (int i = 0; i < bag.size(); i++) {

		if (maxLengthText < bag[i].length()) {
			maxLengthText = bag[i].length();
		}
	}

	for (int row = 1; row <= 2; row++) {

		int height = visibleSize.height * _owlPropertyMap.at(_owlCurrentTheme).at("rowFirst");
		if (row == 2) {
			height = height - gridObject->getContentSize().height - IndiSpace;
			xPosi = IndiSpace + gridObject->getContentSize().width / 2;
		}

		for (int column = 1; column <= keyboardAllLetters/2; column++) {

			CCLOG("ROW: %d  COLUMN: %d   letter : %s",row,column,bag[counter].c_str());

			if (_lesson.getConcept() == Lesson::CONCEPT::WORD_SOUND) {
				Speaker* speaker = new Speaker();
				auto gridObject = speaker->createSpeaker(bag[counter], Vec2(xPosi, height), true);
				addChild(gridObject, 1);
				xPosi = xPosi + IndiSpace + gridObject->getContentSize().width;
				addEventsOnGrid((Sprite*)gridObject);

				gridObject->setName(bag[counter]);
				gridObject->setTag(800 + counter);
				counter++;
			}
			else {
				auto gridObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("smallbar"));
				setSpriteProperties(gridObject, xPosi, height, 1, 1, 0.5, 0.5, 0, 1);

				xPosi = xPosi + IndiSpace + gridObject->getContentSize().width;
				addEventsOnGrid((Sprite*)gridObject);

				// Set Alphabet one by one in KEYBOARD ...

				auto textSize = gridObject->getContentSize().width * 0.8;

				auto label = CommonLabelTTF::create(bag[counter], "Helvetica", textSize);
				label->setFontSize(std::max(float(30.0), float(std::abs(textSize - (maxLengthText - 1) * 17))));
				label->setPosition(Vec2(gridObject->getContentSize().width / 2, gridObject->getContentSize().height / 2));
				label->setColor(Color3B::WHITE);
				label->setName(bag[counter]);
				label->setTag(1);
				gridObject->addChild(label);

				gridObject->setName(bag[counter]);
				gridObject->setTag(800 + counter);
				counter++;
			}
		}
	}
}


// To set the building bolck for main character ....
void Owl::setBuildingBlock(int blockLevel) {

	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	auto blockObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("orangebase"));
	int height = 0;

	if (blockLevel == 1)
	{
		_heightBlock1 = visibleSize.height * _owlPropertyMap.at(_owlCurrentTheme).at("blockY1");
	}
	else {
		_heightBlock1 = _heightBlock1 + blockObject->getContentSize().height - (blockObject->getContentSize().height *0.05);
	}
	height = _heightBlock1;

	setSpriteProperties(blockObject, (visibleSize.width * _owlPropertyMap.at(_owlCurrentTheme).at("blockX1")) + (blockObject->getContentSize().width/2), _heightBlock1, 1, 1, 0.5, 0.5, 0, 1);

	std::ostringstream blockName;	blockName << "blockLevel1"<<blockLevel; std::string blockNameInString = blockName.str();
	blockObject->setName(blockNameInString);

}


// To set the building block for second character .....
void Owl::setBuildingBlockSecond(int blockLevel) {

	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	auto blockObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("greenbase"));

	if (blockLevel == 1)
	{
		_heightBlock2 = visibleSize.height * _owlPropertyMap.at(_owlCurrentTheme).at("blockY2");
	}
	else {
		_heightBlock2 = _heightBlock2 + (blockObject->getContentSize().height - (blockObject->getContentSize().height *0.05))*_owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond");
	}
	setSpriteProperties(blockObject, (visibleSize.width * _owlPropertyMap.at(_owlCurrentTheme).at("blockX2")) + (blockObject->getContentSize().width / 2 * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond")), _heightBlock2, _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"), _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"), 0.5, 0.5, 0, 1);

	std::ostringstream blockName;	blockName << "blockLevel2" << blockLevel; std::string blockNameInString = blockName.str();
	blockObject->setName(blockNameInString);

}


// This is the event listner for KEYBOARD BUTTON ....
void Owl::addEventsOnGrid(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size s = target->getContentSize();
		Rect rect = Rect(target->getPositionX() - s.width/2, target->getPositionY() - s.height / 2, s.width, s.height);
		if (rect.containsPoint(touch->getLocation())) {

			target->setColor(Color3B::GRAY);

			return true;
		}
		return false;
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);
			auto x = target->getName();
			target->setColor(Color3B(255,255,255));
			CCLOG("Touched : %s",x.c_str());
			bool flipBird = false;
			triggerTheOwlActivity(touch, event);

		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

void Owl::triggerTheOwlActivity(cocos2d::Touch* touch, cocos2d::Event* event) {
	auto target = event->getCurrentTarget();
	Size s = target->getContentSize();
	bool isCheckBoxSelected = true;
	Rect rect = target->getBoundingBox();

	if(_lesson.getConcept() == Lesson::CONCEPT::WORD_SOUND){
		rect = Rect(target->getPositionX() - s.width / 2, target->getPositionY() - s.height / 2, s.width, s.height);

		// Speaker for Listner and reset the speakers ...
		auto speaker = ((Speaker*)target);
		resetSpeakerCheckboxStatus(target);
		isCheckBoxSelected = ((Speaker*)target)->getCheckBoxStatus();
	}

	if (rect.containsPoint(touch->getLocation()) && isCheckBoxSelected) {

		std::ostringstream blockName;	blockName << "blockLevel1" << _blockLevel1; std::string blockNameInString = blockName.str();

		if (_blockLevel1 <= _data_key.size()) {
			auto blockChild = target->getParent()->getChildByName(blockNameInString)->getChildren();

			if (blockChild.at(_textCounter)->getName() == target->getName() && _flagToControlMuiltipleTouch) {
				_flagToControlMuiltipleTouch = false;

				if (_flagTurnHelp && (_menuContext->getCurrentLevel() == 1)) {
					this->removeChildByName("helpLayer");
					_flagTurnHelp = false;
				}
				_menuContext->addPoints(1);
				_menuContext->wordPairList(_data_key[_textBoard], getConvertVectorStringIntoString(_data_value[_textBoard]));

				//auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
				//audioBg->playEffect("res/sounds/sfx/drop_obj.ogg", false);
				auto y = _sprite->getPositionY() - target->getPositionY();
				auto x = -_sprite->getPositionX() + target->getPositionX();
				float dist = sqrt((y*y) + (x*x));
				auto blockBox = target->getParent()->getChildByName(blockNameInString);

				auto moveToAlphaGridAction = MoveTo::create(dist / 1300, Vec2(target->getPositionX(), target->getPositionY() + _sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("bodyCharacter"))->getContentSize().height / _owlPropertyMap.at(_owlCurrentTheme).at("owlheightToAlpha")));
				auto moveToAnswerGridAction = MoveTo::create(dist / 1300, Vec2((blockBox->getPositionX() - blockBox->getContentSize().width / 2) + blockChild.at(_textCounter)->getPositionX(), blockBox->getPositionY() + _sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("bodyCharacter"))->getContentSize().height / _owlPropertyMap.at(_owlCurrentTheme).at("owlheightToAlpha")));
				auto callFunct = CallFunc::create([=]() {
					_flagDemo = true;
					_flagToControlMuiltipleTouch = true;
					_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setVisible(false);
					blockChild.at(_textCounter)->getChildByName("hideBoard")->setVisible(false);

					auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
					audioBg->playEffect("res/sounds/sfx/drop_obj.ogg", false);

					_textCounter++;
					_xStart = _sprite->getPositionX();      // Pixels
					_yStart = blockBox->getPositionY() + blockBox->getContentSize().height;
					if (counter % 2 != 0) {
						_sprite->setScaleX(1.0f);
						_xStop = blockBox->getPositionX() - blockBox->getContentSize().width / 2;
						_ticks = 0;
						_ticksTotal = 3 / (1.0 / 60.0);// Pixels
					}
					else {
						_sprite->setScaleX(-1.0f);
						_xStop = blockBox->getPositionX() + blockBox->getContentSize().width / 2;
						_ticks = 0;
						_ticksTotal = 3 / (1.0 / 60.0);// Pixels
					}

					if (_textCounter == blockChild.size() && _blockLevel1 < _data_key.size()) {
						std::ostringstream boardName;
						boardName << _sentence << " : " << _data_key[++_textBoard];

						_textLabel->setString(boardName.str());
						setBuildingBlock(++_blockLevel1);
						recreateKeyboardLetters();
						crateLetterGridOnBuilding(_blockLevel1, _data_value[_textBoard]);
						_textCounter = 0;
					}
					else if (_textCounter == blockChild.size() && _blockLevel1 == _data_key.size() && _removeCharacterAnimation) {
						_textCounter = 0;
						_blockLevel1++;
						_removeCharacterAnimation = false;
						this->runAction(Sequence::create(CallFunc::create([=]() {

							_flagDemo = false;
							_flagDemoSecond = false;
							_sprite->runAction(ScaleTo::create(1.0f, _sprite->getScaleX()*1.3f, _sprite->getScaleY()*1.3f));
							_sprite->runAction(MoveTo::create(1, Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2)));

						}),
							DelayTime::create(1),
							CallFunc::create([=]() {

							CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("res/owllevel/particle_texture.plist");
							_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("res/owllevel/particle_texture.png"));
							_particle->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
							_particle->setName("celebration");
							this->addChild(_particle, 5);
							auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
							audioBg->playEffect("res/sounds/sfx/success.ogg", false);

						}),
							DelayTime::create(3),
							CallFunc::create([=]() {this->removeChildByName("celebration");  _menuContext->showAnswer("wordPairs", _sentenceShow); }), NULL));
					}
				});
				//_textCounter == blockChild.size() && _blockLevel1 == _data_key.size()
				CCLOG("blockGridSize : %d  , _textCounter value : %d , _blocklevel1 : %d , _data_key.size() : %d ", blockChild.size(), _textCounter, _blockLevel1, _data_key.size());
				auto pickBoard = CallFunc::create([=]() {
					_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setVisible(true);
					_textOwlBoard->setString(target->getName());

					if (_sprite->getPositionX() < blockChild.at(_textCounter)->getPositionX()) {
						_sprite->setScaleX(-1.0f);
					}
					else {
						_sprite->setScaleX(1.0f);
					}
					if (_sprite->getScaleX() == -1) {
						_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setScaleX(-1.0f);
					}
					else {
						_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setScaleX(1.0f);
					}
				});
				auto initAction = CallFunc::create([=]() {
					_flagDemo = false;
					if (_sprite->getPositionX() < target->getPositionX()) {
						_sprite->setScaleX(-1.0f);
					}
					else {
						_sprite->setScaleX(1.0f);
					}
				});
				_sprite->runAction(Sequence::create(initAction, moveToAlphaGridAction, pickBoard, moveToAnswerGridAction, callFunct, NULL));
			}

			else if (blockChild.at(_textCounter)->getName() != target->getName() && _flagToControlMuiltipleTouch) {
				_menuContext->addPoints(-1);
				//auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
				//audioBg->playEffect("res/sounds/sfx/error.ogg", false);
				_flagToControlMuiltipleTouch = false;
				auto y = _sprite->getPositionY() - target->getPositionY();
				auto x = -_sprite->getPositionX() + target->getPositionX();
				float dist = sqrt((y*y) + (x*x));
				auto blockBox = target->getParent()->getChildByName(blockNameInString);

				auto moveToAlphaGridAction = MoveTo::create(dist / 1300, Vec2(target->getPositionX(), target->getPositionY() + _sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("bodyCharacter"))->getContentSize().height / _owlPropertyMap.at(_owlCurrentTheme).at("owlheightToAlpha")));
				auto moveToAnswerGridAction = MoveTo::create(dist / 1300, Vec2((blockBox->getPositionX() - blockBox->getContentSize().width / 2) + blockChild.at(_textCounter)->getPositionX(), blockBox->getPositionY() + _sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("bodyCharacter"))->getContentSize().height / _owlPropertyMap.at(_owlCurrentTheme).at("owlheightToAlpha")));
				auto afterDrop = CallFunc::create([=]() {
					blockChild.at(_textCounter)->getChildByName("hideBoard")->setVisible(true);
					_flagDemo = true;
					_flagToControlMuiltipleTouch = true;
					this->removeChildByName("transImg");
					this->removeChildByName("whiteLetterDrop");
				});
				auto callFunct = CallFunc::create([=]() {
					_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setVisible(false);
					blockChild.at(_textCounter)->getChildByName("hideBoard")->setVisible(false);

					auto whiteTrans = Sprite::createWithSpriteFrameName(_sceneMap.at(_owlCurrentTheme).at("gridWhite"));
					setSpriteProperties(whiteTrans, (target->getParent()->getChildByName(blockNameInString)->getPositionX() - target->getParent()->getChildByName(blockNameInString)->getContentSize().width / 2) + blockChild.at(_textCounter)->getPositionX(), (target->getParent()->getChildByName(blockNameInString)->getPositionY() - target->getParent()->getChildByName(blockNameInString)->getContentSize().height / 2) + blockChild.at(_textCounter)->getPositionY(), 1, 1, 0.5, 0.5, 0, 3);
					whiteTrans->setOpacity(80);
					whiteTrans->setName("transImg");

					auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
					audioBg->playEffect("res/sounds/sfx/error.ogg", false);

					_xStart = _sprite->getPositionX();      // Pixels
					_yStart = blockBox->getPositionY() + blockBox->getContentSize().height;
					if (counter % 2 != 0) {
						_sprite->setScaleX(1.0f);
						_xStop = blockBox->getPositionX() - blockBox->getContentSize().width / 2;
						_ticks = 0;
						_ticksTotal = 3 / (1.0 / 60.0);// Pixels
					}
					else {
						_sprite->setScaleX(-1.0f);
						_xStop = blockBox->getPositionX() + blockBox->getContentSize().width / 2;
						_ticks = 0;
						_ticksTotal = 3 / (1.0 / 60.0);// Pixels
					}

					auto whiteTran = Sprite::createWithSpriteFrameName(_sceneMap.at(_owlCurrentTheme).at("gridWhite"));
					setSpriteProperties(whiteTran, (target->getParent()->getChildByName(blockNameInString)->getPositionX() - target->getParent()->getChildByName(blockNameInString)->getContentSize().width / 2) + blockChild.at(_textCounter)->getPositionX(), (target->getParent()->getChildByName(blockNameInString)->getPositionY() - target->getParent()->getChildByName(blockNameInString)->getContentSize().height / 2) + blockChild.at(_textCounter)->getPositionY(), 1, 1, 0.5, 0.5, 0, 3);
					whiteTran->setName("whiteLetterDrop");

					auto labelWhite = CommonLabelTTF::create(target->getName(), "Helvetica", whiteTran->getContentSize().width * 0.8);
					whiteTran->addChild(labelWhite);
					labelWhite->setPosition(Vec2(whiteTran->getContentSize().width / 2, whiteTran->getContentSize().height / 2));
					labelWhite->setColor(Color3B::BLACK);
					whiteTran->runAction(MoveTo::create(0.6, Vec2(whiteTran->getPositionX(), whiteTran->getPositionY() - 300)));
				});
				auto pickBoard = CallFunc::create([=]() {
					if (_sprite->getPositionX() < blockChild.at(_textCounter)->getPositionX()) {
						_sprite->setScaleX(-1.0f);
					}
					else {
						_sprite->setScaleX(1.0f);
					}
					if (_sprite->getScaleX() == -1) {
						_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setScaleX(-1.0f);
					}
					else {
						_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setScaleX(1.0f);
					}

					_sprite->getChildByName(_sceneMap.at(_owlCurrentTheme).at("whiteBoard"))->setVisible(true);
					_textOwlBoard->setString(target->getName());
				});
				auto initAction = CallFunc::create([=]() {
					_flagDemo = false;
					if (_sprite->getPositionX() < target->getPositionX()) {
						_sprite->setScaleX(-1.0f);
					}
					else {
						_sprite->setScaleX(1.0f);
					}
				});
				_sprite->runAction(Sequence::create(initAction, moveToAlphaGridAction, pickBoard, moveToAnswerGridAction, callFunct, DelayTime::create(0.6), afterDrop, NULL));
			}
		}
	}
}

// Destructor for OWL class
Owl::~Owl(void)
{
	this->getEventDispatcher()->removeCustomEventListeners("bagOfChoiceQuiz");
	this->removeAllChildrenWithCleanup(true);
}


// this the method to handle the animation of Main Character ...
void Owl::InitAnimation()
{
	double DURATION = 3; // Seconds for total animation.
	double SECONDS_PER_TICK = 1.0 / 60;
	std::ostringstream blockName;	blockName << "blockLevel1" << _blockLevel1; std::string blockNameInString = blockName.str();
	auto block = this->getChildByName(blockNameInString);
	_xStart = block->getPositionX() - block->getContentSize().width / 2;      // Pixels
	_yStart = block->getPositionY() + block->getContentSize().height;      // Pixels
	_xStop = block->getPositionX() + block->getContentSize().width / 2;    // Pixels

	std::ostringstream blockNames;	blockNames << "blockLevel2" << _blockLevel2; std::string blockNameInStrings = blockNames.str();
	auto blocks = this->getChildByName(blockNameInStrings);
	_xStartSecond = blocks->getPositionX() - (blocks->getContentSize().width / 2 * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));      // Pixels
	_yStartSecond = blocks->getPositionY() + (blocks->getContentSize().height*_owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));      // Pixels
	_xStopSecond = blocks->getPositionX() + (blocks->getContentSize().width / 2* _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));    // Pixels
	_ticks = 0;
	_ticks2 = 0;
	_ticksTotal = DURATION / SECONDS_PER_TICK;
	DURATION = 5;
	_ticksTotal2 = DURATION / SECONDS_PER_TICK;
}

// This for main animation .....
void Owl::UpdateAnimation(float dt)
{
	double DURATION = 3; // Seconds for total animation.
	double SECONDS_PER_TICK = 1.0 / 60;
	double _xSpeed = (_xStop - _xStart) / DURATION;

	if (_ticks <= _ticksTotal)
	{
		double Y_HEIGHT = 80;
		double _xSpeed = (_xStop - _xStart) / DURATION;
		double seconds = _ticks*SECONDS_PER_TICK;

		double xPos = _xStart + seconds*_xSpeed;
		double yPos = _yStart + Y_HEIGHT*sin(seconds * 2 * M_PI / 1.5); // (/1) Seconds for y cycle.
		_sprite->setPosition(Vec2(xPos,yPos));

		_ticks++;
	}
	else {
		counter++;
		Node *block;
		if (_blockLevel1 > _data_key.size()) {
			std::ostringstream blockName;	blockName << "blockLevel1" << _data_key.size(); std::string blockNameInString = blockName.str();
			block = this->getChildByName(blockNameInString);
		}
		else {
			std::ostringstream blockName;	blockName << "blockLevel1" << _blockLevel1; std::string blockNameInString = blockName.str();
			block = this->getChildByName(blockNameInString);
		}

		_yStart = block->getPositionY() + block->getContentSize().height;      // Pixels

		if(counter%2 == 0){
			if (_owlCurrentTheme == "owljungle")
			_sprite->setScaleX(-1.0f);
			_xStart = block->getPositionX() - block->getContentSize().width / 2;      // Pixels
			_xStop = block->getPositionX() + block->getContentSize().width / 2;    // Pixels
		}
		else {
			if (_owlCurrentTheme == "owljungle")
			_sprite->setScaleX(1.0f);
			_xStart = block->getPositionX() + block->getContentSize().width / 2;      // Pixels
			_xStop = block->getPositionX() - block->getContentSize().width / 2;    // Pixels
		}
		_ticks = 0;
		_ticksTotal = DURATION / SECONDS_PER_TICK;

	}
}


// This for opponent animation .....
void Owl::UpdateAnimationSecond(float dt)
{
	double DURATION = 5; // Seconds for total animation.
	double SECONDS_PER_TICK = 1.0 / 60;
	double _xSpeed = (_xStopSecond - _xStartSecond) / DURATION;

	if (_ticks2 <= _ticksTotal2)
	{
		double Y_HEIGHT = 40;
		double _xSpeed = (_xStopSecond - _xStartSecond) / DURATION;
		double seconds = _ticks2*SECONDS_PER_TICK;

		double xPos = _xStartSecond + seconds*_xSpeed;
		double yPos = _yStartSecond + Y_HEIGHT*sin(seconds * 2 * M_PI / 2.5); // (/1) Seconds for y cycle.
		_opponent->setPosition(Vec2(xPos, yPos));

		_ticks2++;
	}
	else {
		counter2++;
		Node *block;
		if (_blockLevel2 > _data_key.size()) {
			std::ostringstream blockName;	blockName << "blockLevel2" << _data_key.size(); std::string blockNameInString = blockName.str();
			block = this->getChildByName(blockNameInString);
		}
		else {
			std::ostringstream blockName;	blockName << "blockLevel2" << _blockLevel2; std::string blockNameInString = blockName.str();
			block = this->getChildByName(blockNameInString);
		}

		_yStartSecond = block->getPositionY() + block->getContentSize().height * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond");      // Pixels

		if (counter2 % 2 == 0) {
			if (_owlCurrentTheme == "owljungle")
			_opponent->setScaleX(-_owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));

			_xStartSecond = block->getPositionX() - (block->getContentSize().width / 2 * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));      // Pixels
			_xStopSecond = block->getPositionX() + (block->getContentSize().width / 2 * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));    // Pixels
		}
		else {
			if (_owlCurrentTheme == "owljungle")
			_opponent->setScaleX(_owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));
			_xStartSecond = block->getPositionX() + (block->getContentSize().width / 2 * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));      // Pixels
			_xStopSecond = block->getPositionX() - (block->getContentSize().width / 2 * _owlPropertyMap.at(_owlCurrentTheme).at("scaleSecond"));    // Pixels
		}
		_ticks2 = 0;
		_ticksTotal2 = DURATION / SECONDS_PER_TICK;

	}
}

// This is the method to get the value as a String value ....
string Owl::getConvertVectorStringIntoString(vector<string> value) {

	std::ostringstream convertedString;

	for (size_t i = 0; i < value.size(); i++) {
		convertedString << value[i];
	}

	return convertedString.str();
}


// To set the string on keyboard after change the questions ....
void Owl::recreateKeyboardLetters() {
	auto bag = _vmcBag[_blockLevel1-1].otherChoices;

	auto matrixValue = MatrixUtil::generateMatrix(_vmcBag[_blockLevel1 - 1].answers, _vmcBag[_blockLevel1 - 1].otherChoices, 1, 24);
	bag = matrixValue[0];

	std::random_shuffle(bag.begin(), bag.end());
	int counter = 0;

	for (int i = 0; i <= 1; i++) {
		for (int j = 0; j < bag.size() / 2; j++) {

			auto labelOnKeyboardGrid = this->getChildByTag(800 + counter);
			if (labelOnKeyboardGrid) {
				labelOnKeyboardGrid->setName(bag[counter]);

				if (_lesson.getConcept() == Lesson::CONCEPT::WORD_SOUND) {
					((Speaker*)labelOnKeyboardGrid)->setStringInSpeaker(bag[counter]);
				}
				else {
					auto label = labelOnKeyboardGrid->getChildByTag(1);
					label->setName(labelOnKeyboardGrid->getName());		// ERROR AFTER ONE BUILDING DONE !!!
					((CommonLabelTTF*)label)->setString(labelOnKeyboardGrid->getName());
				}
				CCLOG("ROW: %d  COLUMN: %d   letter : %s", i, j, bag[counter].c_str());
				counter++;
			}
		}
	}

}

void Owl::resetSpeakerCheckboxStatus(Node* speaker) {
	auto bag = _vmcBag[_blockLevel1 - 1].otherChoices;
	int counter = 0;
	for (int i = 0; i <= 1; i++) {
		for (int j = 0; j < bag.size() / 2; j++) {

			auto labelOnKeyboardGrid = this->getChildByTag(800 + counter);
			if (labelOnKeyboardGrid) {

				if (!(speaker->getTag() == labelOnKeyboardGrid->getTag())) {
					((Speaker*)labelOnKeyboardGrid)->setCheckBoxVisibility(false);
					CCLOG("RESET TAG : %d", labelOnKeyboardGrid->getTag());
				}
				else {
					CCLOG("NOT RESET TAG : %d", labelOnKeyboardGrid->getTag());
				}
				counter++;
			}
		}
	}
}
