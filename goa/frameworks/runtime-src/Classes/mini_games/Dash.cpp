//
//  Dash.cpp 
//  goa
//
//  Created by Kirankumar CS on 20/09/16
//
//



#include "Dash.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"

USING_NS_CC;

Dash::Dash()
{
}

Dash::~Dash()
{

}

Dash * Dash::create()
{
	Dash* dashGame = new (std::nothrow) Dash();
	if (dashGame && dashGame->init()) {
		dashGame->autorelease();
		return dashGame;
	}
	CC_SAFE_DELETE(dashGame);
	return nullptr;
}

cocos2d::Scene * Dash::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Dash::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "dash");
	scene->addChild(layer->menu);
	return scene;
}


bool Dash::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_jumpCount = 0;
	_enemyJumpCount = 0;
	_gameScore = 0;
	_enemyScore = 0;


	
	std::map<std::string, std::map<std::string, std::string>> differntSceneMapping = {
	   
		   {"city",  //sonu designs
			   {
				   { "plist", "dash/dash.plist" },
				   { "bg", "dash/DashScene.csb"},
				   { "step", "dash/step.png"},
				   { "step_winning", "dash/step_winning.png"},
				   { "flag", "dash/flag.png" },
				   { "button", "dash/big_button.png" },
				   { "character", "dash/character.csb"},
				   { "right_animation", "jumping"},
				   { "wrong_animation", "sad_wrong"}
			   }},
		   {"iceLand",  //anu designs
			   {
				   { "plist", "dashisland/dashisland.plist" },
				   { "bg", "dashisland/dashisland.csb" },
				   { "step", "dashisland/step.png" },
				   { "step_winning", "dashisland/step_winning.png" },
				   { "button", "dashisland/big_button.png" },
				   { "flag", "dashisland/flag.png" },
				   { "character", "dashisland/character.csb" },
				   { "right_animation", "hero_correct" },
				   { "wrong_animation", "hero_wrong" }
			   }},
		   {"candy",  //teju design
			   {
				   { "plist", "dashcandy/dashcandy.plist" },
				   { "bg", "dashcandy/dashcandy.csb" },
				   { "step", "dashcandy/step.png" },
				   { "step_winning", "dashcandy/step_winning.png" },
				   { "flag", "dashcandy/flag.png" },
				   { "button", "dashcandy/answer_button.png" },
				   { "character", "dashcandy/character.csb" },
				   { "right_animation", "jump" },
				   { "wrong_animation", "angry" }
			   }},
	};
	
	std::vector<std::string> theme = { "city","candy","iceLand" };
	_scenePath = differntSceneMapping.at(theme.at(cocos2d::RandomHelper::random_int(0, 2)));

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile(_scenePath.at("plist"));

	_bg = CSLoader::createNode(_scenePath.at("bg"));//dash/DashScene.csb
	if (visibleSize.width > 2560) {
		_bg->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(_bg);

	_synonyms = TextGenerator::getInstance()->getSynonyms(5);
	//CCLOG("synonyms = %s", _synonyms.at(1));
	//DelayTime::create(5 + (rand() % 60) / 30.0 )

	for (auto it = _synonyms.begin(); it != _synonyms.end(); ++it) {
		//_mapkey contains keys
		_mapKey.push_back(it->first);
	}

	_stepLayer = Layer::create();
	_stepLayer->setPositionX(0);
	this->addChild(_stepLayer);

	float xx;
	float yy;
	float step_width;
	float step_height;
	for (int j = 4; j > 0; j-=2) {  // j reffer to number of Players
		for (int i = 1; i < 15; i++) {  // i reffer to number of steps (words)
			auto obj1 = Sprite::createWithSpriteFrameName(_scenePath.at("step"));
			obj1->setPositionX((visibleSize.width / 5) * i +(obj1->getContentSize().width/2)*(j-1));
			obj1->setPositionY(visibleSize.height * 0.5 +( (obj1->getContentSize().height/3) * (j-1)));
			obj1->setAnchorPoint(Vec2(0.5, 1));
			step_width = obj1->getContentSize().width;
			step_height = obj1->getContentSize().height;
			xx = (visibleSize.width / 5) * (i+1) + (obj1->getContentSize().width / 2)* (j-1);
			yy = (visibleSize.height * 0.5 + ((obj1->getContentSize().height / 3) * (j-1)));
			_stepLayer->addChild(obj1);
			if (i == 14) {
				auto lastStep = Sprite::createWithSpriteFrameName(_scenePath.at("step_winning"));
				lastStep->setPositionX(xx);
				lastStep->setPositionY(yy - lastStep->getContentSize().height/3);
				lastStep->setAnchorPoint(Vec2(0.5,1));
				_stepLayer->addChild(lastStep);
				auto flag = Sprite::createWithSpriteFrameName(_scenePath.at("flag"));
				flag->setPositionX(lastStep->getContentSize().width/2);
				flag->setPositionY(lastStep->getContentSize().height);
				flag->setAnchorPoint(Vec2(0, 0));
				lastStep->addChild(flag);
			}
		}
	}

	_character = CSLoader::createNode(_scenePath.at("character"));
	_character->setPositionX((visibleSize.width / 5) + step_width / 2);
	_character->setPositionY(visibleSize.height * 0.5 + step_height/3);
	//_character->setAnchorPoint(Vec2(0, 0.5));
	this->addChild(_character);
	
	_mycharacterAnim = CSLoader::createTimeline(_scenePath.at("character"));
	

	for (int j = 0; j < 2; j++) {  
		for (int i = 0; i <2; i++) { 
			auto obj1 = Sprite::createWithSpriteFrameName(_scenePath.at("button"));//button
			float xp = visibleSize.width - (obj1->getContentSize().width * 2);
			obj1->setPositionX((xp/3) *(i+1) + obj1->getContentSize().width/2 *(i+1) + obj1->getContentSize().width / 2 * (i));
			obj1->setPositionY(obj1->getContentSize().height/1.3 + (visibleSize.height * 0.14) * (j));
			this->addChild(obj1);
			_choiceButton.pushBack(obj1);
		}
	}

	_otherCharacter = CSLoader::createNode(_scenePath.at("character"));
	_otherCharacter->setPositionX((visibleSize.width / 5) + step_width / 2 * (3));
	_otherCharacter->setPositionY((visibleSize.height * 0.5)+ step_height);
	_stepLayer->addChild(_otherCharacter);

	wordGenerateWithOptions();

	//auto defaultCharacter = CallFunc::create(CC_CALLBACK_0(Dash::otherCharacterJumping, this));
	//randomly calling other character(If multiplayer Mode is off)
	runAction(RepeatForever::create(Sequence::create(DelayTime::create(10 + (rand() % 60) / 30.0), CallFunc::create([=]() {
		_enemyScore++;
		updatePlayerPosition("enemy", _enemyScore);
	}), NULL)));
	return true;
}

void Dash::jumpTimeline(cocos2d::Node * node, std::string animationName)
{
	auto jumpTimeline = CSLoader::createTimeline(_scenePath.at("character"));
	node->runAction(jumpTimeline);
	jumpTimeline->play(animationName, false);
}

void Dash::myCharacterJumping(int jumpCount)
{
	//_jumpCount++;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto jump = JumpBy::create(1, Vec2(0, 0), 200, 1);
	_character->runAction(jump);
	jumpTimeline(_character, _scenePath.at("right_animation"));
	auto moveTo = MoveBy::create(1, Vec2(-(visibleSize.width / 5) - (jumpCount - _jumpCount), 0));
	_stepLayer->runAction(Sequence::create(moveTo, CallFunc::create([=]() {
		_jumpCount++;
		if (_jumpCount == 14) {
			//mycharcter won the game
			menu->showScore();
		}
		wordGenerateWithOptions();
		
	}), NULL));

	
}

void Dash::myCharacterEyeBlinking()
{


}

void Dash::otherCharacterJumping(int jumpCount)
{
	_enemyJumpCount++;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto jump = JumpBy::create(1, Vec2(visibleSize.width / 5, 0), 200, 1);
	_otherCharacter->runAction(jump);
	jumpTimeline(_otherCharacter, _scenePath.at("right_animation"));
	if (_enemyJumpCount == 14) {
		menu->showScore();
	}
}


void Dash::updatePlayerPosition(std::string playerName, int stepPosition)
{	
	/* if playerName is my character jumping my character 
	else
		other character is jumping
	*/

	if (playerName.compare("mycharacter") == 0) {
		myCharacterJumping(stepPosition);
	 }else
	{
		otherCharacterJumping(stepPosition);
	}
}


void Dash::wordGenerateWithOptions()
{
	std::vector<std::string> answer;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int size = _mapKey.size();
	_gameWord = _mapKey.at(cocos2d::RandomHelper::random_int(0, size-1));
	answer.push_back(_synonyms.at(_gameWord));
	_topLabel = Label::createWithSystemFont(_gameWord.c_str(), "Arial", 200);
	_topLabel->setPositionX(visibleSize.width/2);
	_topLabel->setPositionY(visibleSize.height - _topLabel->getContentSize().height/2);
	_topLabel->setColor(Color3B(0, 0, 0));
	this->addChild(_topLabel);

	int randomInt1 = cocos2d::RandomHelper::random_int(0, size - 1);
	for (int j = 0; j < 3; j++) {
		answer.push_back(_synonyms.at(_mapKey.at(randomInt1 % size)));
		randomInt1++;
	}
	int answerSize = answer.size() - 1;
	//CCLOG(answer);
	int randomInt = cocos2d::RandomHelper::random_int(0, answerSize);
	for (int i = 0; i < _choiceButton.size(); i++) {
		
		auto str = answer.at(randomInt % (answerSize + 1));
		auto myLabel = Label::createWithSystemFont(str, "Arial", 200);
		myLabel->setName(str);
		myLabel->setPositionX(_choiceButton.at(i)->getPositionX());
		myLabel->setPositionY(_choiceButton.at(i)->getPositionY());
		myLabel->setColor(Color3B(0, 0, 0));
		this->addChild(myLabel);
		_choiceLabel.pushBack(myLabel);
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Dash::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, myLabel);
		randomInt++;
	}

}

bool Dash::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{

	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	if (target->getBoundingBox().containsPoint(touch->getLocation())) {
		if (target->getName().compare(_synonyms.at(_gameWord)) == 0) {
			this->removeChild(_topLabel);
			for (int i = 0; i < _choiceLabel.size(); i++) {
				this->removeChild(_choiceLabel.at(i));
			}
			_gameScore++;
			_choiceLabel.clear();
			updatePlayerPosition("mycharacter",_gameScore);
		}
		else {
			if (_scenePath.at("wrong_animation").compare("null") != 0) {
				auto sadAnimation = CSLoader::createTimeline(_scenePath.at("character"));
				_character->runAction(sadAnimation);
				sadAnimation->play(_scenePath.at("wrong_animation"), false);
			}
			}
	}
	return false;
}
