//
//  Popcount.cpp 
//  goa
//
//  Created by Karim Mirazul  on 08/11/16
//
//

#include "PopCount.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* PopCount::createScene()
{
	auto scene = Scene::create();
	auto layer = PopCount::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, PopCount::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

PopCount *PopCount::create() {
	PopCount *blast = new (std::nothrow) PopCount();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool PopCount::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void PopCount::onEnterTransitionDidFinish() {

	_sceneMap = {
		{
			{ "popcountIsland",
				{
					{ "bg", "popcount/popcount.csb" },
					{ "character1", "popcount/starfish.csb" },
					{ "character2", "popcount/starfish1.csb" },
					{ "character3", "popcount/starfish2.csb" },
					{ "characterSpriteName", "Sprite_1" },
					{ "waterAnimation" , "popcount/water.csb" },
					{ "midboard" , "popcount/board.png" },
					{ "play" , "popcount/play.png" },
					{ "watchagain" , "popcount/watchagain.png"}
				}
			},
			{ "popcountCity",
				{
					{ "bg", "owlcity/owlcity.csb" }
				}
			},
			{ "popcountjungle",
				{
					{ "bg", "owljungle/owljungle.csb" }
				}
			}
		}
	};

	_popcountPropertyMap = {
		{
			{ "popcountCity",
				{
					{ "jumpHeight",600.0f },
					{ "jumpStart", 0.0f }
				}
			},
			{ "popcountIsland",
				{
					{ "jumpHeight", 600.0f },
					{ "jumpStart", 200.0f },
					{ "smallGridSize", 160.0f }
				}
			},
			{ "popcountjungle",
				{
					{ "jumpHeight",700.0f },
					{ "jumpStart", 0.0f }
				}
			}
		}
	};

	std::map<int, std::string> popcountSceneMapping = {
		{ 1,	"popcountCity" },
		{ 2,	"popcountIsland" },
		{ 3,    "popcountJungle" }
	};

	_popcountCurrentTheme = popcountSceneMapping.at(2);

	Node* bg = CSLoader::createNode(_sceneMap.at(_popcountCurrentTheme).at("bg"));
	addChild(bg);
	bg->setName("bg");

	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	_popUpAnswer = RandomHelper::random_int(1, _maxPopStarLimits);

	int gameCurrentLevel = _menuContext->getCurrentLevel();
	
	if (gameCurrentLevel >= 1 && gameCurrentLevel <= 3) {
		_popCharacter = "character1";
		_popStayDelay = 5.0f;
		_maxPopStarLimits = 5;

	}else if (gameCurrentLevel >= 4 && gameCurrentLevel <= 6) {
		_popCharacter = "character2";
		_popStayDelay = 3.0f;
		_maxPopStarLimits = 7;
		if (gameCurrentLevel == 6)
			_popStayDelay = 2.3f;
	}else if (gameCurrentLevel >= 7 && gameCurrentLevel <= 10) {
		_popCharacter = "character3";
		_popStayDelay = 2.0f;
		
		if(gameCurrentLevel == 10)
			_popStayDelay = 1.0f;
		_maxPopStarLimits = 10;
	}

	setIslandScene();

	setGridNumberPanel();

	this->scheduleUpdate();
}

void PopCount::update(float delta) {
	if (_popElementCount == 0 && _popStartListner) {

		auto setInMid = CallFunc::create([=]() {
			auto star = this->getChildByName("centerStar");
			star->runAction(ScaleTo::create(1.0f, star->getScaleX() * 1.4, star->getScaleY() * 1.4));
			star->runAction(MoveTo::create(1, Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height *0.4)));
		});

		auto particleEffect = CallFunc::create([=]() {
			CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("res/owllevel/particle_texture.plist");
			_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("res/owllevel/particle_texture.png"));
			_particle->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));
			_particle->setName("celebration");
			addChild(_particle, 5);
			_menuContext-> setMaxPoints(_totalHit);
			_menuContext-> addPoints(_totalHit -_wrongHit);
		});

		this->runAction(Sequence::create(setInMid, DelayTime::create(1), particleEffect,DelayTime::create(3), CallFunc::create([=]() { this->removeChildByName("celebration"); _menuContext->showScore(); }), NULL));
		_popStartListner = false;
	}
}

void PopCount::setSpriteProperties(Sprite* ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScaleX(scaleX);
	ImageObject->setScaleY(scaleY);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	ImageObject->setZOrder(zorder);
}

void PopCount::popUpCharacter(Node* character, string animationName) {

	auto height = _popcountPropertyMap.at(_popcountCurrentTheme).at("jumpHeight");
	auto timelineWater = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	auto water = CSLoader::createNode(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	water->runAction(timelineWater);
	water->setScale(0.4f);
	auto width = ((character->getChildByName("Sprite_1")->getContentSize().width * 0.5) / 2);
	water->setPosition(Vec2(character->getPositionX() + width, character->getPositionY() + (height*0.6)));
	addChild(water, 3);
	timelineWater->gotoFrameAndPlay(0, false);

	auto popUp = CallFunc::create([=]() {
		auto timelinecharacter = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at(_popCharacter));
		character->runAction(timelinecharacter);
		timelinecharacter->play(animationName, true);
		auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
		audioBg->playEffect("res/sounds/sfx/playerpop.ogg", false);
		character->runAction(MoveTo::create(0.5f, Vec2(character->getPositionX(), character->getPositionY() + height)));
	});
	auto popDown = CallFunc::create([=]() {

		if(this->getChildByName("helpLayer1"))
			this->removeChildByName("helpLayer1");

		character->runAction(MoveTo::create(0.5f, Vec2(character->getPositionX(), character->getPositionY() - height)));
	});
	auto helpLayer = CallFunc::create([=]() {
		if (_menuContext->getCurrentLevel() == 1 && _setHelpLayerMode) {
			_setHelpLayerMode = false;
			auto help = HelpLayer::create(Rect(Director::getInstance()->getVisibleSize().width * 0.5, Director::getInstance()->getVisibleSize().height * 0.5, Director::getInstance()->getVisibleSize().width*0.99, 250), Rect(0,0,0,0));
			help->setName("helpLayer1");
			this->addChild(help, 4);
			_delayNumber = 0.5f;
			
			for (size_t i = 0; i < _getElementObject.size(); i++) {
				auto fish = this->getChildByName("bg")->getChildByName("background")->getChildByTag(_getElementObject[i] + 1000);
				auto innerSpriteSize = fish->getChildByName(_sceneMap.at(_popcountCurrentTheme).at("characterSpriteName"))->getContentSize();
				std::ostringstream hintNumber;	hintNumber << (i+1);
				
				auto labelSprite = Sprite::create();
				labelSprite->setTextureRect(Rect(0, 0, innerSpriteSize.width*0.5, innerSpriteSize.height*0.5));
				labelSprite->setColor(Color3B(22, 156, 163));
				labelSprite->setOpacity(90);
				labelSprite->setPosition(Vec2(innerSpriteSize.width * 0.22, innerSpriteSize.height * 0.5));
				fish->addChild(labelSprite);
				labelSprite->setName("board");
				
				auto labelNumber = CommonLabelTTF::create(hintNumber.str(), "Helvetica", 150);
				labelNumber->setColor(Color3B::BLACK);
				labelNumber->setScale(2);
				labelNumber->setPosition(Vec2(innerSpriteSize.width * 0.22, innerSpriteSize.height * 0.5));
				fish->addChild(labelNumber);
				labelNumber->setName("number");

				labelSprite->runAction(FadeOut::create(0.0f));
				labelNumber->runAction(FadeOut::create(0.0f));

				_delayNumber = _delayNumber + 1.0f;
				fish->getChildByName("board")->runAction(Sequence::create(DelayTime::create(_delayNumber), FadeIn::create(1.0f),DelayTime::create(_popStayDelay), CallFunc::create([=]() {fish->getChildByName("board")->setVisible(false); }), NULL));
				fish->getChildByName("number")->runAction(Sequence::create(DelayTime::create(_delayNumber),FadeIn::create(1.0f), DelayTime::create(_popStayDelay), CallFunc::create([=]() {fish->getChildByName("number")->setVisible(false); }) ,NULL));
			}
		}
	});

	auto removeWaterWave = CallFunc::create([=]() {
		removeChild(water);
	});
	auto delayTiming = _popStayDelay;

	this->runAction(Sequence::create(popUp, helpLayer, DelayTime::create(_popStayDelay), popDown, DelayTime::create(0.5f), removeWaterWave, NULL));
	
}

vector<int> PopCount::getRandomValueRange(int min, int max, int getValue) {
	int count = 0;
	vector<int> objectVector;
	while (count < getValue) {
		int temp = RandomHelper::random_int(min, max);
		bool flag = true;

		for (size_t index = 0; index < objectVector.size(); index++) {
			if (objectVector[index] == temp) {
				flag = false;
				break;
			}
		}

		if (flag) {
			objectVector.push_back(temp);
			count++;
		}
	}

	sort(objectVector.begin(), objectVector.end());
	return objectVector;
}

void PopCount::setGridNumberPanel() {

	auto reduceSize = Director::getInstance()->getVisibleSize().width * 0.1;

	auto gridPanel = Sprite::create();
	gridPanel->setTextureRect(Rect(0, 0, Director::getInstance()->getVisibleSize().width - reduceSize, Director::getInstance()->getVisibleSize().height* 0.15));
	gridPanel->setColor(Color3B(41,158,170));
	gridPanel->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height * 0.1));
	gridPanel->setOpacity(60);
	gridPanel->setName("gridpanel");
	addChild(gridPanel, 2);

	auto themeResourcePath = _sceneMap.at(_popcountCurrentTheme);
	auto smallGridSize = _popcountPropertyMap.at(_popcountCurrentTheme).at("smallGridSize");
	int space = gridPanel->getContentSize().width - (smallGridSize * 10);
	int indiSpace = space / (10 + 1);
	int equIndi = (indiSpace * (10 - 1));
	int initSpace = gridPanel->getContentSize().width - smallGridSize * 10 - equIndi;
	initSpace = initSpace / 2;

	float positionX = initSpace + smallGridSize / 2;

	for (int i = 0; i < 10; i++) {
		auto smallGrid = Sprite::create();
		smallGrid->setTextureRect(Rect(0, 0, smallGridSize, smallGridSize));
		gridPanel->addChild(smallGrid);
		smallGrid->setColor(Color3B(14,124,142));
		smallGrid->setOpacity(110);
		smallGrid->setTag(i+1);
		smallGrid->setName("smallGrid");
		smallGrid->setPosition(Vec2(positionX, gridPanel->getContentSize().height / 2));
		positionX = positionX + smallGridSize + indiSpace;
		
		addEventsOnGrid(smallGrid);

		std::ostringstream gridName;	gridName << (i + 1);
		auto label = CommonLabelTTF::create(gridName.str(), "Helvetica", smallGridSize*0.8);
		label->setColor(Color3B::WHITE);
		label->setPosition(Vec2(smallGrid->getContentSize().width / 2, smallGrid->getContentSize().height / 2));
		smallGrid->addChild(label);
	}
}

void PopCount::addEventsOnGrid(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode;
		if (target->getName() == "smallGrid") {
			locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
		}
		else if (target->getName() == "midButton") {
			locationInNode = touch->getLocation();
		}

		if (target->getBoundingBox().containsPoint(locationInNode) && _popMidButtonClickPermision) {
			target->setColor(Color3B::GRAY);
			return true;
		}
		return false;
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode;
		if (target->getName() == "smallGrid") {
			locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
			target->setColor(Color3B(14, 124, 142));
		}
		else if (target->getName() == "midButton") {
			locationInNode = touch->getLocation();
			target->setColor(Color3B(255,255,255));
		}
		
		if (target->getBoundingBox().containsPoint(locationInNode) && (target->getName() == "smallGrid") && _popStartListner) {
			if (target->getTag() == _popUpAnswer) {
				CCLOG(" THIS IS CORRECT ");

				_menuContext->pickNumber(_popUpAnswer,target->getTag(), _menuContext->IDENTIFY);

				_popMidButtonClickPermision = false;
				this->getChildByName("midButton")->setVisible(false);
				_timelineCenterStarFish->play("correct", true);

				_popElementCount = _popElementCount - 1;
				_totalHit++;

				if (this->getChildByName("helpLayer2")) {
					this->removeChildByName("helpLayer2");
				}

				auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
				audioBg->playEffect("res/sounds/sfx/success.ogg", false);

				auto star = this->getChildByName("centerStar");
				star->runAction(Sequence::create(ScaleTo::create(1.0f, star->getScaleX() * 1.2,star->getScaleY() * 1.2), CallFunc::create([=]() {}), ScaleTo::create(1.0f, star->getScaleX() * 1, star->getScaleY() * 1), NULL));

				if (_popElementCount != 0) {
					
					auto popUpProperty = CallFunc::create([=]() {
						_timelineCenterStarFish->play("blink", true);
						_popUpAnswer = RandomHelper::random_int(1, _maxPopStarLimits);
						this->getChildByName("gridpanel")->setVisible(false);
						popUpCall(_popUpAnswer,false);
					});

					this->runAction(Sequence::create(DelayTime::create(2), popUpProperty, DelayTime::create(_popStayDelay + 2), 
						CallFunc::create([=]() {
						this->getChildByName("midButton")->setVisible(true); 
						_popMidButtonClickPermision = true;   
						this->getChildByName("gridpanel")->setVisible(true); 		
						this->getChildByName("gridpanel")->runAction(Sequence::create(ScaleTo::create(0.3f, 1.1, 1.1), ScaleTo::create(0.3f, 1, 1), NULL)); 
						
					}), NULL));
				}
			}
			else {

				_menuContext->pickNumber(_popUpAnswer, target->getTag(), _menuContext->IDENTIFY);

				float distance = Director::getInstance()->getVisibleSize().width * 0.8;
				FShake* shake1 = FShake::actionWithDuration(0.5f,10.0f);
				this->getChildByName("gridpanel")->runAction(shake1);
				_timelineCenterStarFish->play("wrong", true);
				_wrongHit++;

				FShake* shake2 = FShake::actionWithDuration(0.5f, 10.0f);
				this->getChildByName("centerStar")->runAction(shake2);

				auto audioBg = CocosDenshion::SimpleAudioEngine::getInstance();
				audioBg->playEffect("res/sounds/sfx/error.ogg", false);

//				this->runAction(Sequence::create(DelayTime::create(_popStayDelay + 2), CallFunc::create([=]() {_timelineCenterStarFish->play("blink", true); }), NULL));
				CCLOG(" ------------------- CLICKED WRONG ---------------");
			}
		}
		else if (target->getBoundingBox().containsPoint(locationInNode) && (target->getName() == "midButton") && !_tempToHoldCenterButton) {
			if ((target->getChildByTag(0))->getName() == "WATCH AGAIN") {

				auto texture = SpriteFrameCache::getInstance()->getSpriteFrameByName(_sceneMap.at(_popcountCurrentTheme).at("watchagain"));
				((Sprite*)target->getChildByTag(0))->setSpriteFrame(texture);
				popUpCall(_popUpAnswer,true);
				target->setVisible(false);
				_popMidButtonClickPermision = false;
				this->getChildByName("gridpanel")->setVisible(false);
			}
			else if ((target->getChildByTag(0))->getName() == "PLAY") {

				_popStartListner = true;
				(target->getChildByTag(0))->setName("WATCH AGAIN");
				auto texture = SpriteFrameCache::getInstance()->getSpriteFrameByName(_sceneMap.at(_popcountCurrentTheme).at("watchagain"));
				((Sprite*)target->getChildByTag(0))->setSpriteFrame(texture);

				_popUpAnswer = RandomHelper::random_int(1, _maxPopStarLimits);
				if (_setHelpLayerMode && _menuContext->getCurrentLevel() == 1) {
					_popUpAnswer = 3;
				}
				popUpCall(_popUpAnswer,false);
				target->setVisible(false);
				_popMidButtonClickPermision = false;
				this->getChildByName("gridpanel")->setVisible(false);
			}else{
				CCLOG("Wrong in condition , check in listner");
			}
		}
		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

void PopCount::setIslandScene() {
	auto themeResourcePath = _sceneMap.at(_popcountCurrentTheme);
	_timelineCenterStarFish = CSLoader::createTimeline(themeResourcePath.at(_popCharacter));
	auto centerStarFish = CSLoader::createNode(themeResourcePath.at(_popCharacter));
	centerStarFish->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height * 0.76));
	this->addChild(centerStarFish, 3);
	centerStarFish->setScale(0.9);
	centerStarFish->setName("centerStar");
	centerStarFish->runAction(_timelineCenterStarFish);
	_timelineCenterStarFish->play("blink", true);

	auto timelineWater1 = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	this->getChildByName("bg")->getChildByName("mainground")->getChildByName("water_1")->runAction(timelineWater1);
	timelineWater1->gotoFrameAndPlay(0, true);

	auto timelineWater2 = CSLoader::createTimeline(_sceneMap.at(_popcountCurrentTheme).at("waterAnimation"));
	this->getChildByName("bg")->getChildByName("mainground")->getChildByName("water_2")->runAction(timelineWater2);
	timelineWater2->gotoFrameAndPlay(0, true);

	auto starFish = CSLoader::createNode(themeResourcePath.at(_popCharacter));
	starFish->setScale(0.5);
	int space = Director::getInstance()->getVisibleSize().width - ((starFish->getChildByName(themeResourcePath.at("characterSpriteName"))->getContentSize().width * 0.5) * 10);
	int indiSpace = space / (10 + 1);
	auto positionX = ((starFish->getChildByName(themeResourcePath.at("characterSpriteName"))->getContentSize().width * 0.5) * 0.5)+ indiSpace;

	for (int i = 0; i < 10; i++) {
		auto starFish = CSLoader::createNode(themeResourcePath.at(_popCharacter));
		starFish->setTag(i + 1000);
		this->getChildByName("bg")->getChildByName("background")->addChild(starFish);
		starFish->setScale(0.5);
		_coordinate.push_back(std::make_pair(positionX, _popcountPropertyMap.at(_popcountCurrentTheme).at("jumpHeight")));
		starFish->setPosition(Vec2(positionX, _popcountPropertyMap.at(_popcountCurrentTheme).at("jumpStart")));
		positionX = positionX + (starFish->getChildByName(themeResourcePath.at("characterSpriteName"))->getContentSize().width * 0.5) + indiSpace;
	}

	auto midButton = Sprite::createWithSpriteFrameName(themeResourcePath.at("midboard"));
	midButton->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height/2));
	addChild(midButton, 3);
	midButton->setName("midButton");
	addEventsOnGrid(midButton);
	this->getChildByName("midButton")->runAction(Sequence::create(DelayTime::create(0.5f),ScaleTo::create(0.4, 1.5), ScaleTo::create(0.2, 1), NULL));

	auto buttonSymbl = Sprite::createWithSpriteFrameName(themeResourcePath.at("play"));
	buttonSymbl->setPosition(Vec2(midButton->getContentSize().width / 2, midButton->getContentSize().height / 2));
	buttonSymbl->setName("PLAY");
	buttonSymbl->setTag(0);
	midButton->addChild(buttonSymbl);

//	popUpCall(_popUpAnswer);

	//if (_menuContext->getCurrentLevel() == 1) {
	//	auto help = HelpLayer::create(Rect(downGrid->getPositionX(), downGrid->getPositionY(), downGrid->getContentSize().width, downGrid->getContentSize().height), Rect(visibleSize.width * 0.5, board->getContentSize().height / 2 + board->getPositionY(), board->getContentSize().width, board->getContentSize().height));
	//	help->click(Vec2(downGrid->getPositionX(), downGrid->getPositionY()));
	//	help->setName("helpLayer");
	//	this->addChild(help, 4);
	//}
	
}

void PopCount::popUpCall(int popNumberOfCharacter , bool replay) {

	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=]() {

		if(!replay)
		_getElementObject = getRandomValueRange(0, _maxPopStarLimits-1, popNumberOfCharacter);

		for (size_t i = 0; i < _getElementObject.size(); i++) {
			popUpCharacter(this->getChildByName("bg")->getChildByName("background")->getChildByTag(_getElementObject[i] + 1000), "blink");
		}

	}), DelayTime::create(1 + _popStayDelay), CallFunc::create([=]() {

		auto helpLayer2 = CallFunc::create([=]() {
			auto intiGapX = Director::getInstance()->getVisibleSize().width/2 - (this->getChildByName("gridpanel")->getContentSize().width/2);
			auto smallgrid = this->getChildByName("gridpanel")->getChildByTag(_getElementObject.size());
			auto help = HelpLayer::create(Rect(smallgrid->getPositionX() + intiGapX,this->getChildByName("gridpanel")->getPositionY(), _popcountPropertyMap.at(_popcountCurrentTheme).at("smallGridSize"), _popcountPropertyMap.at(_popcountCurrentTheme).at("smallGridSize")), Rect(0, 0, 0, 0));
			help->setName("helpLayer2");
			help->click(Vec2(smallgrid->getPositionX() + intiGapX, this->getChildByName("gridpanel")->getPositionY()));
			this->addChild(help, 4);
		});

		this->getChildByName("midButton")->setVisible(true);
		_popMidButtonClickPermision = true;
		this->getChildByName("gridpanel")->setVisible(true);

		if(_popElementCount >= 3 && _menuContext->getCurrentLevel()==1){
			this->getChildByName("gridpanel")->runAction(Sequence::create(helpLayer2,ScaleTo::create(0.3f, 1.1, 1.1), ScaleTo::create(0.3f,1,1), NULL));
		}
		else {
			this->getChildByName("gridpanel")->runAction(Sequence::create(ScaleTo::create(0.3f, 1.1, 1.1), ScaleTo::create(0.3f, 1, 1), NULL));
		}

	}),NULL));
}

PopCount::~PopCount(void)
{
	this->removeAllChildrenWithCleanup(true);
}
