//
//  Dash.cpp 
//  goa
//
//  Created by Kirankumar CS on 20/09/16
//
//

#include <sstream>
#include <string>
#include "Dash.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "storage/local-storage/LocalStorage.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"
#include "../util/CommonLabel.h"

USING_NS_CC;
using namespace rapidjson;


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

	layer->menu = MenuContext::create(layer,Dash::gameName());
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


	
	_differntSceneMapping = {
	   
		   {"city",  //sonu designs dash/button.png
			   {
				   { "plist", "dash/dash.plist" },
				   { "bg", "dash/DashScene.csb"},
				   { "step", "dash/step.png"},
				   { "step_winning", "dash/step_winning.png"},
				   { "flag", "dash/flag.png" },
				   { "button", "dash/big_button.png" },
				   { "character", "dash/character.csb"},
				   { "right_animation", "jumping"},
				   { "wrong_animation", "sad_wrong"},
				   { "winning_animation","dance"},
				   { "board","dash/button.png" }
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
				   { "wrong_animation", "hero_wrong" },
				   {"winning_animation", "null"},
				   { "board","dashisland/board.png" }
			   }},
		   {"candy",  //teju design
			   {
				   { "plist", "dashcandy/dashcandy.plist" },
				   { "bg", "dashcandy/dashcandy.csb" },
				   { "step", "dashcandy/step.png" },
				   { "step_winning", "dashcandy/step_winning.png" },
				   { "flag", "dashcandy/flag.png" },
				   { "button", "dashcandy/answer_button1.png" },
				   { "character", "dashcandy/character.csb" },
				   { "right_animation", "jump" },
				   { "wrong_animation", "angry" },
				   { "winning_animation", "null" },
				   { "board","dashcandy/answer_button.png" }
			   }},
	};
	
    
 //   this->getEventDispatcher()->addCustomEventListener("on_menu_exit", CC_CALLBACK_1(Dash::transitToMenu, this));
    
 //   Director::getInstance()->getEventDispatcher()->addCustomEventListener("enemy_information_received_event", CC_CALLBACK_1(Dash::syncEnemyCharacterPosition, this));

    
	return true;
}

void Dash::jumpTimeline(cocos2d::Node * node, std::string animationName)
{
	auto jumpTimeline = CSLoader::createTimeline(_scenePath.at("character"));
	node->runAction(jumpTimeline);
	jumpTimeline->play(animationName, false);
}

std::string Dash::constructSendMessage(std::string charName, int position) {
    rapidjson::Document document;
    document.SetObject();
    rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

    
    document.AddMember("character", rapidjson::Value(charName.c_str(),allocator), allocator);
    document.AddMember("position", position, allocator);
    
    StringBuffer strbuf;
    Writer<StringBuffer> writer(strbuf);
    document.Accept(writer);
    log("JsonData = %s", strbuf.GetString());
    std::string s1 = strbuf.GetString();
    CCLOG("final string %s", s1.c_str());
    return s1;
}

void Dash::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Node::onEnterTransitionDidFinish();
	menu->setMaxPoints(10);
	int level = menu->getCurrentLevel();
	int division = ((level - 1) % 15)+1;
	if (division >= 1 && division < 6) {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division + ((roundLevel - 1) * 5);
		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Sysnonyms sub Level = %d", subLevel);
	//	std::vector<std::string> theme = { "city","candy","iceLand" };
		_scenePath = _differntSceneMapping.at("city");
		_title = LangUtil::getInstance()->translateString("Make word of same meaning as : ");
		_catagory = LangUtil::getInstance()->translateString("List of same meaning words");
		_synonyms = TextGenerator::getInstance()->getSynonyms(15, subLevel);
	} 
	else if (division >5 && division < 11) {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division - 5 + ((roundLevel - 1) * 5);
		
		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Antonyms Sub Level = %d", subLevel);
		_scenePath = _differntSceneMapping.at("candy");
		_title = LangUtil::getInstance()->translateString("Make opposite of : ");
		_catagory = LangUtil::getInstance()->translateString("List of opposite words");
		_synonyms = TextGenerator::getInstance()->getAntonyms(15, subLevel);
	}
	else {
		int roundLevel = std::ceil(level / 15.0);
		int inner = division - 10 + ((roundLevel - 1) * 5);
		
		int subLevel = 1;
		if (inner < 16) {
			subLevel = (std::ceil(inner / 3.0));
		}
		else {
			inner = inner - 15;
			subLevel = (std::ceil(inner / 2.0));
			subLevel += 5;
		}
		CCLOG("Homonyms SubLevel = %d", subLevel);
		_scenePath = _differntSceneMapping.at("iceLand");
		_title = LangUtil::getInstance()->translateString("Make same sounding word as : ");
		_catagory = LangUtil::getInstance()->translateString("List of same sounding words");
		_synonyms = TextGenerator::getInstance()->getHomonyms(15, subLevel);
	}
	
	
	for (auto it = _synonyms.begin(); it != _synonyms.end(); ++it) {
		_mapKey.push_back(it->first);
	}

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile(_scenePath.at("plist"));

	_bg = CSLoader::createNode(_scenePath.at("bg"));//dash/DashScene.csb
	if (visibleSize.width > 2560) {
		_bg->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(_bg);

	_stepLayer = Layer::create();
	_stepLayer->setPositionX(0);
	this->addChild(_stepLayer);

	float xx;
	float yy;
	float step_width;
	float step_height;
	for (int j = 4; j > 0; j -= 2) {  // j reffer to number of Players
		for (int i = 1; i < 11; i++) {  // i reffer to number of steps (words)
			auto obj1 = Sprite::createWithSpriteFrameName(_scenePath.at("step"));
			obj1->setPositionX((visibleSize.width / 5) * i + (obj1->getContentSize().width / 2)*(j - 1));
			obj1->setPositionY(visibleSize.height * 0.5 + ((obj1->getContentSize().height / 3) * (j - 1)));
			obj1->setAnchorPoint(Vec2(0.5, 1));
			step_width = obj1->getContentSize().width;
			step_height = obj1->getContentSize().height;
			xx = (visibleSize.width / 5) * (i + 1) + (obj1->getContentSize().width / 2)* (j - 1);
			yy = (visibleSize.height * 0.5 + ((obj1->getContentSize().height / 3) * (j - 1)));
			_stepLayer->addChild(obj1);
			if (i == 10) {
				auto lastStep = Sprite::createWithSpriteFrameName(_scenePath.at("step_winning"));
				lastStep->setPositionX(xx);
				lastStep->setPositionY(yy);
				lastStep->setAnchorPoint(Vec2(0.5, 1));
				_stepLayer->addChild(lastStep);
				auto flag = Sprite::createWithSpriteFrameName(_scenePath.at("flag"));
				flag->setPositionX(lastStep->getContentSize().width / 2);
				flag->setPositionY(lastStep->getContentSize().height);
				flag->setAnchorPoint(Vec2(0, 0));
				lastStep->addChild(flag);
			}
		}
	}

	_character = CSLoader::createNode(_scenePath.at("character"));
	_character->setPositionX((visibleSize.width / 5) + step_width / 2);
	_character->setPositionY(visibleSize.height * 0.5 + step_height / 3);
	this->addChild(_character);

	_mycharacterAnim = CSLoader::createTimeline(_scenePath.at("character"));

	for (int j = 0; j < 2; j++) {
		for (int i = 0; i <2; i++) {
			auto obj1 = Sprite::createWithSpriteFrameName(_scenePath.at("button"));//button
			float xp = visibleSize.width - (obj1->getContentSize().width * 2);
			obj1->setPositionX((xp / 3) *(i + 1) + obj1->getContentSize().width / 2 * (i + 1) + obj1->getContentSize().width / 2 * (i));
			obj1->setPositionY(obj1->getContentSize().height / 1.3 + (visibleSize.height * 0.14) * (j));
			this->addChild(obj1);
			_choiceButton.pushBack(obj1);
		}
	}

	_otherCharacter = CSLoader::createNode(_scenePath.at("character"));
	_otherCharacter->setPositionX((visibleSize.width / 5) + step_width / 2 * (3));
	_otherCharacter->setPositionY((visibleSize.height * 0.5) + step_height);
	_stepLayer->addChild(_otherCharacter);

	wordGenerateWithOptions();

	//auto defaultCharacter = CallFunc::create(CC_CALLBACK_0(Dash::otherCharacterJumping, this));
	//randomly calling other character(If multiplayer Mode is off)

	_enemyActions = RepeatForever::create(Sequence::create(DelayTime::create(10 + (rand() % 60) / 30.0), CallFunc::create([=]() {
		_enemyScore++;
		updatePlayerPosition("enemy", _enemyScore);
	}), NULL));

	runAction(_enemyActions);

}

void Dash::gameHelp()
{
	_helpFlage = true;
	//game help only for first level
	auto labelSize = _topLabel->getContentSize();
	auto labelPosition = _topLabel->getPosition();
	auto ans = _synonyms.at(_gameWord);
	auto optionLayer = this->getChildByName(ans.c_str());
	auto optionSize = optionLayer->getContentSize();
	auto optionPosition = optionLayer->getPosition();
	auto help = HelpLayer::create(Rect(optionPosition.x , optionPosition.y , optionSize.width, optionSize.height), Rect(labelPosition.x , labelPosition.y , labelSize.width, labelSize.height));
	help->click(Vec2(optionPosition));
	help->setName("helpLayer");
	this->addChild(help);

}

void Dash::syncEnemyCharacterPosition(cocos2d::EventCustom *event) {
    std::string &inputStr = *(static_cast<std::string*>(event->getUserData()));
    CCLOG("inputStr jSON %s", inputStr.c_str());
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(inputStr.c_str()).HasParseError()) {
        // document is ok
        printf("Dash = %s\n", d["character"].GetString());
        printf("Dash = %d\n", d["position"].GetInt());
        
        std::string character = d["character"].GetString();
        int charPosition = d["position"].GetInt();
        
        updatePlayerPosition(character, charPosition);
        
    }else{
        // error
    }
    
    
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
		if (_jumpCount == 10) {
			auto audioEffect = CocosDenshion::SimpleAudioEngine::getInstance();
			audioEffect->playEffect("sounds/sfx/success.ogg");
			if (_scenePath.at("winning_animation").compare("null") == 0) {
				iceLandThemeAnimation();
			//	menu->showAnswer("wordPairs", _catagory);
			} else {
					winningCelebration();
			//	menu->showAnswer("wordPairs", _catagory);
			}	
		} else {
			wordGenerateWithOptions();
		}
	}), NULL));	
}

void Dash::myCharacterEyeBlinking()
{
	auto jumpTimeline = CSLoader::createTimeline(_scenePath.at("character"));
	_character->runAction(jumpTimeline);
	jumpTimeline->play("dance", false);

}

void Dash::otherCharacterJumping(int jumpCount)
{
	_enemyJumpCount++;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto jump = JumpBy::create(1, Vec2(visibleSize.width / 5, 0), 200, 1);
	_otherCharacter->runAction(Sequence::create(jump, CallFunc::create([=]() {
		if (_enemyJumpCount == 10) {
			stopAction(_enemyActions);
			auto audioEffect = CocosDenshion::SimpleAudioEngine::getInstance();
			audioEffect->playEffect("sounds/sfx/error.ogg");
			menu->showAnswer("wordPairs", _catagory);
		}
	}), NULL));
	jumpTimeline(_otherCharacter, _scenePath.at("right_animation"));
	
		//menu->showScore();

		
		
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
	if (_helpFlage) {
		this->removeChildByName("helpLayer");
		_helpFlage = false;
	}
	std::vector<std::string> answer;
	Size visibleSize = Director::getInstance()->getVisibleSize();
	int size = _mapKey.size();
	_gameWord = _mapKey.at(cocos2d::RandomHelper::random_int(0, size-1));
	answer.push_back(_synonyms.at(_gameWord));

	//auto translateStr = 

	std::ostringstream boardName;
	boardName << _title << _gameWord;

	auto board = Sprite::createWithSpriteFrameName(_scenePath.at("board"));
	board->setPositionY(visibleSize.height - board->getContentSize().height / 2);
	board->setPositionX(visibleSize.width / 2);
	this->addChild(board);


	_topLabel = CommonLabel::createWithTTF(boardName.str(), "fonts/Roboto-Regular.ttf", 75);
	_topLabel->setPositionX(visibleSize.width/2);
	_topLabel->setName(_gameWord.c_str());
	_topLabel->setPositionY(visibleSize.height - _topLabel->getContentSize().height);
	_topLabel->setColor(Color3B(0, 0, 0));
	this->addChild(_topLabel);

	int randomInt1 = cocos2d::RandomHelper::random_int(0, size - 1);
	for (int j = 0; j < 3; j++) {
		auto str = _synonyms.at(_mapKey.at(randomInt1 % size));
		if (_synonyms.at(_gameWord).compare(str) == 0) {
			randomInt1++;
			answer.push_back(_synonyms.at(_mapKey.at(randomInt1 % size)));
		}
		else {
			answer.push_back(str);
		}
		randomInt1++;
	}
	//answer.erase(std::unique(answer.begin(), answer.end()), answer.end());
	int answerSize = 3;
	//CCLOG(answer);
	int randomInt = cocos2d::RandomHelper::random_int(0, answerSize);
	for (int i = 0; i < _choiceButton.size(); i++) {
		auto str = answer.at(randomInt % (answerSize + 1));
		auto myLabel = CommonLabel::createWithTTF(str, "fonts/Roboto-Regular.ttf", 150);
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
	if (menu->getCurrentLevel() == 1 && _gameScore == 0) {
		gameHelp();
	}
	
}

void Dash::winningCelebration()
{
	auto jump = JumpBy::create(1, Vec2(0, 0), 200, 1);
	_wordCount = 0;
	auto danceAction = CallFunc::create(CC_CALLBACK_0(Dash::myCharacterEyeBlinking, this));
	_character->runAction(RepeatForever::create(Sequence::create(danceAction,jump, CallFunc::create([=]() {
		if (_wordCount == 8) {
			//menu->showScore();
			stopAction(_enemyActions);
			menu->showAnswer("wordPairs", _catagory);
		} else {
			//fallingWords(_wordCount);
		}
		_wordCount ++;
		}), NULL)));
}

void Dash::fallingWords(int i)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vector<cocos2d::Label*> fallingWords;	
	auto aaa = _rightWords.at(i);
	std::string word = "";
	for (int j = 0; j < aaa.size()-1; j++) {
		std::stringstream ss;
		ss << aaa.at(j);
		auto test = ss.str();
		word = word + "" + test;
	}
	std::string str = word +"   " +_synonyms.at(word);
	auto myLabel = CommonLabel::createWithSystemFont(str, "fonts/Roboto-Regular.ttf", 100);
	myLabel->setName(str);
	myLabel->setPositionX(visibleSize.width/1.75);
	myLabel->setPositionY(visibleSize.height + 300);
	if (aaa.at(aaa.size() - 1) == 'Y') {
		myLabel->setColor(Color3B(0, 128, 0));
	} else {
		myLabel->setColor(Color3B(255, 0, 0));
	}
	fallingWords.pushBack(myLabel);
	this->addChild(myLabel);
	auto moveBy = MoveBy::create(5, Vec2(0, -2400));
	myLabel->runAction(moveBy);
}

void Dash::fallingWordWithAction(cocos2d::Vector<cocos2d::Label*> fallingWords)
{
	for (int i = 0; i < fallingWords.size(); i++) {
		auto moveBy = MoveBy::create(2, Vec2(0, 2400));
		fallingWords.at(i)->runAction(moveBy);
	}
}

void Dash::iceLandThemeAnimation()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto node = CSLoader::createNode("dashisland/burst.csb");
	node->setPositionX(visibleSize.width/5);
	node->setPositionY(visibleSize.height/2 + 200);
	this->addChild(node);
	auto node1 = CSLoader::createNode("dashisland/burst.csb");
	node1->setPositionX(visibleSize.width / 5 + 150);
	node1->setPositionY(visibleSize.height / 2 + 200);
	this->addChild(node1);
	auto jumpTimeline = CSLoader::createTimeline("dashisland/burst.csb");
	node->runAction(jumpTimeline);
	auto jumpTimeline1 = CSLoader::createTimeline("dashisland/burst.csb");
	node1->runAction(jumpTimeline1);
	_wordCount = 0;
	this->runAction(RepeatForever::create(Sequence::create(CallFunc::create([=]() {
		if (_wordCount == 8) {
			//menu->showScore();
			stopAction(_enemyActions);
			menu->showAnswer("wordPairs", _catagory);
		} else {
			//fallingWords(_wordCount);
		}
		_wordCount++;
		}), DelayTime::create(0.5), CallFunc::create([=]() {
		jumpTimeline->play("burst", true);
		jumpTimeline1->play("burst", true);
		}), NULL)));
}

bool Dash::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());

    //std::string inputStr = "chimple_0_0_0,chimple_1_2_1";
    //Director::getInstance()->getEventDispatcher()->dispatchCustomEvent("peer_information_received_event", static_cast<void*>(&inputStr));
    

	if (target->getBoundingBox().containsPoint(touch->getLocation())) {
		if (target->getName().compare(_synonyms.at(_gameWord)) == 0) {
			this->removeChild(_topLabel);
			for (int i = 0; i < _choiceLabel.size(); i++) {
				this->removeChild(_choiceLabel.at(i));
			}
			_gameScore++;
			menu->addPoints(1);
			_rightWords.push_back(_gameWord + "Y");
			_choiceLabel.clear();
			updatePlayerPosition("mycharacter",_gameScore);
            std::string message = constructSendMessage("enemy",_gameScore);
            CCLOG("message %s", message.c_str());

			//auto it = _synonyms.find(_gameWord);
			//_synonyms.erase(it);

			auto it = std::find(_mapKey.begin(), _mapKey.end(), _gameWord);
			_mapKey.erase(it);

			//_mapKey.erase(_gameWord);
           // menu->sendMessageToPeer(message);


			menu->wordPairList(_gameWord, _synonyms.at(_gameWord));
		}
		else {
			menu->addPoints(-1);
			_rightWords.push_back(_gameWord + "N");
			if (_scenePath.at("wrong_animation").compare("null") != 0) {
				auto sadAnimation = CSLoader::createTimeline(_scenePath.at("character"));
				_character->runAction(sadAnimation);
				sadAnimation->play(_scenePath.at("wrong_animation"), false);
				}
			}	
	}
	return false;
}

void Dash::transitToMenu(cocos2d::EventCustom * event) {
    menu->exitMultiPlayerGame();
}
