#include "Owl.h"

USING_NS_CC;

Scene* Owl::createScene()
{
	auto scene = Scene::create();
	auto layer = Owl::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, "owl");
	scene->addChild(layer->_menuContext);
	return scene;
}

bool Owl::init()
{
	if (!Layer::init()) { return false; }

	    _sceneMap = {
		{
			{ "owlCity",
				{
					{ "bg", "owlcity/owlcity.csb"},
					{ "character1", "owlcity/character.csb"},
					{ "character2", "owlcity/character_enemy.csb"},
					{ "plist", "owlcity/owlcity.plist"},
					{"smallbar","owlcity/smallbar.png"},
					{"orangebase","owlcity/orangebase.png"},
					{"greenbase","owlcity/greenbase.png"},
					{"gridOrange","owlcity/smallbar.png"},
					{"gridRed",""}
				} 
			},
			{ "owlJungle",
				{
					{ "bg", "owlcity/owlcity.csb" },
					{ "character1", "owlcity/character.csb" },
					{ "character2", "owlcity/character_enemy.csb" },
					{ "plist", "owlcity/owlcity.plist" }
				}
			},
			{ "owlIceland",
				{
					{ "bg", "owlcity/owlcity.csb" },
					{ "character1", "owlcity/character.csb" },
					{ "character2", "owlcity/character_enemy.csb" },
					{ "plist", "owlcity/owlcity.plist" }				
				}
			}
		}
	};

	_owlPropertyMap = {
		{
			{"owlCity",
				{
					{"rowFirst",0.16f},
					{"blockX1",0.08f},
					{"blockY1",0.35f},
					
				}
			}
		}
	};

	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto origin = Director::getInstance()->getVisibleOrigin();

	_owlCurrentTheme = "owlCity";
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	Node* bg = CSLoader::createNode(themeResourcePath.at("bg"));
	addChild(bg);
	
	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}
//	CCSpriteFrameCache::sharedSpriteFrameCache()->addSpriteFramesWithFile(themeResourcePath.at("plist"));

	auto timelinecharacter1 = CSLoader::createTimeline(themeResourcePath.at("character1"));
	_sprite = CSLoader::createNode(themeResourcePath.at("character1"));
	_sprite->setPosition(Vec2(500,1000));
	_sprite-> runAction(timelinecharacter1);
	addChild(_sprite,2);
	timelinecharacter1->play("fly",true);
//	character1->runAction();

	auto board = bg->getChildByName("orangebar");
	board->setName("topBoard");
	_textLabel = LabelTTF::create(_displayWord[_textBoard], "Helvetica", board->getContentSize().height *0.8);
	_textLabel->setPosition(board->getContentSize().width/2,board->getContentSize().height/2);
	_textLabel->setAnchorPoint(Vec2(0.5, 0.5));
	_textLabel->setName("text");
	board->addChild(_textLabel);

	createGrid();

	setBuildingBlock(++_blockLevel1);
	crateLetterGridOnBuilding(_blockLevel1, _displayWord[_textBoard]);

	InitAnimation();

	scheduleUpdate();
	return true;
}

void Owl::update(float delta) {

	UpdateAnimation(delta);
}

void Owl::setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	addChild(ImageObject, zorder);
}

void Owl::crateLetterGridOnBuilding(int blockLevel, string displayWord) {

	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	auto blockObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("orangebase"));
	auto letterbox = Sprite::createWithSpriteFrameName(themeResourcePath.at("gridOrange"));
	int boxSize = blockObject->getContentSize().width;
	int space = blockObject->getContentSize().width - (letterbox->getContentSize().width * 6);
	int indiSpace = space / (6+1);
	int initSpace = blockObject->getContentSize().width - letterbox->getContentSize().width * displayWord.length() - ( indiSpace * (displayWord.length()-1));
	initSpace = initSpace / 2;

	float xPosi = initSpace + letterbox->getContentSize().width/2;

	for (int i = 0; i <= (displayWord.length() - 1); i++) {
		auto letterGrid = Sprite::createWithSpriteFrameName(themeResourcePath.at("gridOrange"));
		auto hideGrid = Sprite::createWithSpriteFrameName(themeResourcePath.at("gridOrange"));

		auto label = LabelTTF::create(LangUtil::convertUTF16CharToString(displayWord.at(i)), "Helvetica", letterGrid->getContentSize().height*0.8);
		letterGrid -> setPosition(Vec2(xPosi, blockObject->getContentSize().height *0.45));
		label->setPosition(Vec2(letterGrid->getContentSize().width/2, letterGrid->getContentSize().height /2));
		xPosi = xPosi + indiSpace + letterGrid->getContentSize().width;
		std::ostringstream blockName;	blockName << "blockLevel" << blockLevel; std::string blockNameInString = blockName.str();
		this->getChildByName(blockNameInString)->addChild(letterGrid);
		letterGrid->addChild(label);
		
		hideGrid->setPosition(Vec2(letterGrid->getContentSize().width / 2, letterGrid->getContentSize().height / 2));
		letterGrid->addChild(hideGrid);
		hideGrid->setName("hideBoard");
		letterGrid->setName(LangUtil::convertUTF16CharToString(displayWord.at(i)));
		letterGrid->setTag(i);
	}
}

void Owl::createGrid() {
	auto visibleSize = Director::getInstance()->getVisibleSize();
	auto themeResourcePath = _sceneMap.at(_owlCurrentTheme);
	auto alpha = LangUtil::getInstance()->getAllCharacters();
	
	auto gridObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("smallbar"));
	float space = visibleSize.width - (gridObject->getContentSize().width * 13);
	float IndiSpace = space / (13 + 1);
	float xPosi = IndiSpace + gridObject->getContentSize().width / 2;
	auto getSize = gridObject->getContentSize().width;
	int counter = 0;
	for (int row = 1; row <= 2; row++) {

		int height = visibleSize.height * _owlPropertyMap.at(_owlCurrentTheme).at("rowFirst");
		if (row == 2) {
			height = height - gridObject->getContentSize().height - IndiSpace;
			xPosi = IndiSpace + gridObject->getContentSize().width / 2;
		}

		for (int column = 1; column <= 13; column++) {
			auto gridObject = Sprite::createWithSpriteFrameName(themeResourcePath.at("smallbar"));
			setSpriteProperties(gridObject, xPosi, height, 1, 1, 0.5, 0.5, 0, 1);
			xPosi = xPosi + IndiSpace + gridObject->getContentSize().width;
			addEventsOnGrid(gridObject);
			
			auto label = LabelTTF::create(LangUtil::convertUTF16CharToString(alpha[counter]), "Helvetica", gridObject->getContentSize().width * 0.8);
			label->setPosition(Vec2(gridObject->getContentSize().width / 2, gridObject->getContentSize().height / 2));
			label->setColor(Color3B::WHITE);
			label->setName(LangUtil::convertUTF16CharToString(alpha[counter]));
			
			gridObject->setName(LangUtil::convertUTF16CharToString(alpha[counter]));
			gridObject->addChild(label);
			counter++;
		}
	}
}

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
	
	std::ostringstream blockName;	blockName << "blockLevel"<<blockLevel; std::string blockNameInString = blockName.str();
	blockObject->setName(blockNameInString);

}

void Owl::addEventsOnGrid(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);
		if (target->getBoundingBox().containsPoint(touch->getLocation())) {
			
			auto childText =  target->getChildByName(target->getName());
			target->setColor(Color3B::GRAY);
			auto x = childText->getName();
			CCLOG("Touched : %c", x.at(0));
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
			CCLOG("Touched : %c",x.at(0));

			if (target->getBoundingBox().containsPoint(touch->getLocation())) {

				std::ostringstream blockName;	blockName << "blockLevel" << _blockLevel1; std::string blockNameInString = blockName.str();
				
				if (_blockLevel1 <= (sizeof(_displayWord) / sizeof(_displayWord[0]))) {
					auto blockChild = target->getParent()->getChildByName(blockNameInString)->getChildren();

					if (blockChild.at(_textCounter)->getName() == target->getName() && _flagToControlMuiltipleTouch) {
						_flagToControlMuiltipleTouch = false;
						auto y = _sprite->getPositionY() - target->getPositionY();
						auto x = -_sprite->getPositionX() + target->getPositionX();
						float dist = sqrt((y*y) + (x*x));
						auto blockBox = target->getParent()->getChildByName(blockNameInString);

						auto moveToAlphaGridAction = MoveTo::create(dist/800,Vec2(target->getPositionX(),target->getPositionY()));
						auto moveToAnswerGridAction = MoveTo::create(dist / 1000, Vec2((blockBox->getPositionX() - blockBox->getContentSize().width/2)+blockChild.at(_textCounter)->getPositionX(), blockBox->getPositionY()));
						auto callFunct = CallFunc::create([=]() {
							scheduleUpdate();
							_flagToControlMuiltipleTouch = true;
							blockChild.at(_textCounter)->getChildByName("hideBoard")->setVisible(false);
							_textCounter++;
							_xStart = _sprite->getPositionX();      // Pixels
							_yStart = blockBox->getPositionY() + blockBox->getContentSize().height;
							if (counter % 2 != 0) {
								_xStop = blockBox->getPositionX() - blockBox->getContentSize().width/2;
								_ticks = 0;
								_ticksTotal = 3 / (1.0/60.0);// Pixels
							}else {
								_xStop = blockBox->getPositionX() + blockBox->getContentSize().width / 2;
								_ticks = 0;
								_ticksTotal = 3 / (1.0/60.0);// Pixels
							}

							if (_textCounter == blockChild.size() && _blockLevel1 < (sizeof(_displayWord) / sizeof(_displayWord[0]))) {
								_textLabel->setString(_displayWord[++_textBoard]);
								setBuildingBlock(++_blockLevel1);
								crateLetterGridOnBuilding(_blockLevel1, _displayWord[_textBoard]);
								_textCounter = 0;
							}
							else if (_textCounter == blockChild.size() && _blockLevel1 == (sizeof(_displayWord) / sizeof(_displayWord[0]))) {
								_textCounter = 0;
								_blockLevel1++;
								
							}
						});
						_sprite->runAction(Sequence::create(CallFunc::create([=]() { unscheduleUpdate(); }), moveToAlphaGridAction,moveToAnswerGridAction, callFunct, NULL));
					}
				}
			}
			

		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

Owl::~Owl(void)
{
	this->removeAllChildrenWithCleanup(true);
}

void Owl::InitAnimation()
{
	double DURATION = 3; // Seconds for total animation.
	double SECONDS_PER_TICK = 1.0 / 60;
	std::ostringstream blockName;	blockName << "blockLevel" << _blockLevel1; std::string blockNameInString = blockName.str();
	auto block = this->getChildByName(blockNameInString);
	_xStart = block->getPositionX() - block->getContentSize().width / 2;      // Pixels
	_yStart = block->getPositionY() + block->getContentSize().height;      // Pixels
	_xStop = block->getPositionX() + block->getContentSize().width / 2;    // Pixels

	_ticks = 0;
	_ticksTotal = DURATION / SECONDS_PER_TICK;
}

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
		if (_blockLevel1 > (sizeof(_displayWord) / sizeof(_displayWord[0]))) {
			std::ostringstream blockName;	blockName << "blockLevel" << (sizeof(_displayWord) / sizeof(_displayWord[0])); std::string blockNameInString = blockName.str();
			block = this->getChildByName(blockNameInString);
		}
		else {
			std::ostringstream blockName;	blockName << "blockLevel" << _blockLevel1; std::string blockNameInString = blockName.str();
			block = this->getChildByName(blockNameInString);
		}

		_yStart = block->getPositionY() + block->getContentSize().height;      // Pixels

		if(counter%2 == 0){
			_xStart = block->getPositionX() - block->getContentSize().width / 2;      // Pixels
			_xStop = block->getPositionX() + block->getContentSize().width / 2;    // Pixels
		}
		else {
			_xStart = block->getPositionX() + block->getContentSize().width / 2;      // Pixels
			_xStop = block->getPositionX() - block->getContentSize().width / 2;    // Pixels
		}
		_ticks = 0;
		_ticksTotal = DURATION / SECONDS_PER_TICK;

	}
}
