
#include "JumpOnWords.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include <algorithm>
#include "../menu/HelpLayer.h"
#include "../util/CommonLabel.h"
using namespace cocos2d;
USING_NS_CC;

JumpOnWords::JumpOnWords()
{


}

JumpOnWords::~JumpOnWords()
{

}

JumpOnWords * JumpOnWords::create()
{
	JumpOnWords* JumpOnWordsGame = new (std::nothrow) JumpOnWords();
	if (JumpOnWordsGame && JumpOnWordsGame->init()) {
		JumpOnWordsGame->autorelease();
		return JumpOnWordsGame;
	}
	CC_SAFE_DELETE(JumpOnWordsGame);
	return nullptr;
}

cocos2d::Scene * JumpOnWords::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = JumpOnWords::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, JumpOnWords::gameName());
	scene->addChild(layer->menu);
	return scene;
}

bool JumpOnWords::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	float toplabelX = visibleSize.width / 2 - 30;
	std::map<std::string, std::map<std::string, std::string>> differntSceneMapping = {
		{
			{ "candy",
			{
				{ "bg","jump_on_words/jump_on_words_game_menu.csb" },
				
			} },
		
		}
	};

	std::vector<std::string> theme = { "candy","iceLand","farm" };
	_scenePath = differntSceneMapping.at(theme.at(0));



	background = CSLoader::createNode(_scenePath.at("bg"));
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);

	return true;
}
void JumpOnWords::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Node::onEnterTransitionDidFinish();
	generateRandomLetters(10);
	keypad();
	stepCreate();
	this->scheduleUpdate();


	_char1 = CSLoader::createNode("jump_on_words/character.csb");
	_char1->setPosition(Vec2(visibleSize.width*0.06,780));
	this->addChild(_char1);
}
void JumpOnWords::gameHelp()
{
	
}
void JumpOnWords::update(float dt)
{

	if (background != nullptr)
	{
		auto stepChild = this->getChildByName("step");
		if (stepChild->getBoundingBox().intersectsRect(background->getChildByName("Panel_1")->getChildByName("Panel_5")->getBoundingBox()))
		{
			this->removeChild(stepChild);
			_stepRef.erase(_stepRef.begin());
		}
		if (_char1->getBoundingBox().intersectsRect(_stepRef.at(0)->getBoundingBox()))
		{
			_tickFlag = true;
		}
	}

}
void JumpOnWords::generateRandomLetters(int count)
{
	std::vector<std::string> vowels = {"A","E","I","O","U"};
	std::vector<std::string> consonants = {"B","C","D","F","G","H","J","K","L","M","N","P","Q","R","S","T","V","W","X","Y","Z"};

	for (int i = 0; i < 3; i++)
	{
		int vowSize = vowels.size() - 1;
		auto randomIndex = cocos2d::RandomHelper::random_int(0, vowSize);
		_alphaList.push_back(vowels.at(randomIndex));
		vowels.erase(vowels.begin()+randomIndex);
		CCLOG("_alphaList= %s", _alphaList.at(i).c_str());
	}
	for (int i = 0; i < count - 3; i++)
	{
		int consize = consonants.size() - 1;
		auto randomIndex = cocos2d::RandomHelper::random_int(0, consize);
		_alphaList.push_back(consonants.at(randomIndex));
		consonants.erase(consonants.begin() + randomIndex);
		CCLOG("_alphaList= %s", _alphaList.at(i+3).c_str());
    }
}

void JumpOnWords::keypad()
{
	_ball1 = background->getChildByName("ball_34");
	_ball1->setName("Ball1");
	_alpha1 = CommonLabel::createWithTTF(_alphaList.at(0), "fonts/Roboto-Regular.ttf", 100);
	_alpha1->setColor(Color3B(0, 0, 0));
	_alpha1->setPosition(Vec2(_ball1->getContentSize().width / 2, _ball1->getContentSize().height / 2));
	_ball1->addChild(_alpha1);
	auto listener1 = EventListenerTouchOneByOne::create();
	listener1->setSwallowTouches(true);
	listener1->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, _ball1);

	_ball2 = background->getChildByName("ball_35");
	_ball2->setName("Ball2");
	_alpha2 = CommonLabel::createWithTTF(_alphaList.at(1), "fonts/Roboto-Regular.ttf", 100);
	_alpha2->setColor(Color3B(0, 0, 0));
	_alpha2->setPosition(Vec2(_ball2->getContentSize().width / 2, _ball2->getContentSize().height / 2));
	_ball2->addChild(_alpha2);
	auto listener2 = EventListenerTouchOneByOne::create();
	listener2->setSwallowTouches(true);
	listener2->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener2, _ball2);

	_ball3 = background->getChildByName("ball_34_0");
	_ball3->setName("Ball3");
	_alpha3 = CommonLabel::createWithTTF(_alphaList.at(2), "fonts/Roboto-Regular.ttf", 100);
	_alpha3->setColor(Color3B(0, 0, 0));
	_alpha3->setPosition(Vec2(_ball3->getContentSize().width / 2, _ball3->getContentSize().height / 2));
	_ball3->addChild(_alpha3);
	auto listener3 = EventListenerTouchOneByOne::create();
	listener3->setSwallowTouches(true);
	listener3->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener3, _ball3);

	_ball4 = background->getChildByName("ball_35_0");
	_ball4->setName("Ball4");
	_alpha4 = CommonLabel::createWithTTF(_alphaList.at(3), "fonts/Roboto-Regular.ttf", 100);
	_alpha4->setColor(Color3B(0, 0, 0));
	_alpha4->setPosition(Vec2(_ball4->getContentSize().width / 2, _ball4->getContentSize().height / 2));
	_ball4->addChild(_alpha4);
	auto listener4 = EventListenerTouchOneByOne::create();
	listener4->setSwallowTouches(true);
	listener4->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener4, _ball4);

	_ball5 = background->getChildByName("ball_34_1");
	_ball5->setName("Ball5");
	_alpha5 = CommonLabel::createWithTTF(_alphaList.at(4), "fonts/Roboto-Regular.ttf", 100);
	_alpha5->setColor(Color3B(0, 0, 0));
	_alpha5->setPosition(Vec2(_ball5->getContentSize().width / 2, _ball5->getContentSize().height / 2));
	_ball5->addChild(_alpha5);
	auto listener5 = EventListenerTouchOneByOne::create();
	listener5->setSwallowTouches(true);
	listener5->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener5, _ball5);

	_ball6 = background->getChildByName("ball_35_1");
	_ball6->setName("Ball6");
	_alpha6 = CommonLabel::createWithTTF(_alphaList.at(5), "fonts/Roboto-Regular.ttf", 100);
	_alpha6->setColor(Color3B(0, 0, 0));
	_alpha6->setPosition(Vec2(_ball6->getContentSize().width / 2, _ball6->getContentSize().height / 2));
	_ball6->addChild(_alpha6);
	auto listener6 = EventListenerTouchOneByOne::create();
	listener6->setSwallowTouches(true);
	listener6->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener6, _ball6);

	_ball7 = background->getChildByName("ball_34_0_0");
	_ball7->setName("Ball7");
	_alpha7 = CommonLabel::createWithTTF(_alphaList.at(6), "fonts/Roboto-Regular.ttf", 100);
	_alpha7->setColor(Color3B(0, 0, 0));
	_alpha7->setPosition(Vec2(_ball7->getContentSize().width / 2, _ball7->getContentSize().height / 2));
	_ball7->addChild(_alpha7);
	auto listener7 = EventListenerTouchOneByOne::create();
	listener7->setSwallowTouches(true);
	listener7->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener7, _ball7);

	_ball8 = background->getChildByName("ball_35_0_0");
	_ball8->setName("Ball8");
	_alpha8 = CommonLabel::createWithTTF(_alphaList.at(7), "fonts/Roboto-Regular.ttf", 100);
	_alpha8->setColor(Color3B(0, 0, 0));
	_alpha8->setPosition(Vec2(_ball8->getContentSize().width / 2, _ball8->getContentSize().height / 2));
	_ball8->addChild(_alpha8);
	auto listener8 = EventListenerTouchOneByOne::create();
	listener8->setSwallowTouches(true);
	listener8->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener8, _ball8);

	_ball9 = background->getChildByName("ball_8");
	_ball9->setName("Ball9");
	_alpha9 = CommonLabel::createWithTTF(_alphaList.at(8), "fonts/Roboto-Regular.ttf", 100);
	_alpha9->setColor(Color3B(0, 0, 0));
	_alpha9->setPosition(Vec2(_ball9->getContentSize().width / 2, _ball9->getContentSize().height / 2));
	_ball9->addChild(_alpha9);
	auto listener9 = EventListenerTouchOneByOne::create();
	listener9->setSwallowTouches(true);
	listener9->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener9, _ball9);

	_ball10 = background->getChildByName("ball_9");
	_ball10->setName("Ball10");
	_alpha10 = CommonLabel::createWithTTF(_alphaList.at(9), "fonts/Roboto-Regular.ttf", 100);
	_alpha10->setColor(Color3B(0, 0, 0));
	_alpha10->setPosition(Vec2(_ball10->getContentSize().width / 2, _ball10->getContentSize().height / 2));
	_ball10->addChild(_alpha10);
	auto listener10 = EventListenerTouchOneByOne::create();
	listener10->setSwallowTouches(true);
	listener10->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener10, _ball10);

	_box1 = background->getChildByName("box_10");
	_boxRef.push_back(_box1);
	_box2 = background->getChildByName("box_11");
	_boxRef.push_back(_box2);
	_box3 = background->getChildByName("box_10_0");
	_boxRef.push_back(_box3);
	_box4 = background->getChildByName("box_11_0");
	_boxRef.push_back(_box4);
	_box5 = background->getChildByName("box_10_1");
	_boxRef.push_back(_box5);
	_box6 = background->getChildByName("box_11_1");
	_boxRef.push_back(_box6);
	_box7 = background->getChildByName("box_10_0_0");
	_boxRef.push_back(_box7);
	_box8 = background->getChildByName("box_11_0_0");
	_boxRef.push_back(_box8);

	_cross = background->getChildByName("cross_button_33");
	_cross->setName("Cross");
	auto listenerC = EventListenerTouchOneByOne::create();
	listenerC->setSwallowTouches(true);
	listenerC->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listenerC, _cross);

	_tick = background->getChildByName("tick_button_31");
	_tick->setName("Tick");
	auto listenerT = EventListenerTouchOneByOne::create();
	listenerT->setSwallowTouches(true);
	listenerT->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listenerT, _tick);

	_hint = background->getChildByName("hint_button_32");
	_hint->setName("Hint");
	auto listenerH = EventListenerTouchOneByOne::create();
	listenerH->setSwallowTouches(true);
	listenerH->onTouchBegan = CC_CALLBACK_2(JumpOnWords::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listenerH, _hint);

}
void JumpOnWords::stepCreate()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	_stepWidth = visibleSize.width / 4;

	for (int i = 1; i< 4; i++)
	{
		auto step = Sprite::createWithSpriteFrameName("jump_on_words/step.png");
		step->setPosition(Vec2(_stepWidth * i, _stepRight.at(i - 1)));
		_stepRef.push_back(step);
		step->setName("step");
		this->addChild(step, 1);
	}

	
	for (int i = 2; i>0; i--)
	{
		auto step = Sprite::createWithSpriteFrameName("jump_on_words/step.png");
		step->setPosition(Vec2(_stepWidth * i, _stepLeft.at(i - 1)));
		_stepRef.push_back(step);
		step->setName("step");
		this->addChild(step, 1);
	}

}
void JumpOnWords::stepLeftMove()
{
	std::vector<int> stepLeft = { 2100,1800 };
	for (int i = 2; i>0; i--)
	{
		auto step = Sprite::createWithSpriteFrameName("jump_on_words/step.png");
		step->setPosition(Vec2(_stepWidth * (i), stepLeft.at(i - 1)));
		_stepRef.push_back(step);
		step->setName("step");
		this->addChild(step, 1);
	}
}
void JumpOnWords::stepRightMove()
{
	std::vector<int> stepRight = { 1800,2100 };
	for (int i = 2; i<4; i++)
	{
		auto step = Sprite::createWithSpriteFrameName("jump_on_words/step.png");
		step->setPosition(Vec2(_stepWidth * (i), stepRight.at(i - 2)));
		_stepRef.push_back(step);
		step->setName("step");
		this->addChild(step, 1);
	}


}
void JumpOnWords::charMove()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto jump = JumpBy::create(0.8, Vec2(visibleSize.width / 4 - (visibleSize.width *0.06),230), 150, 1);
	_char1->runAction(jump);

	auto timeline = CSLoader::createTimeline("jump_on_words/character.csb");
	_char1->runAction(timeline);
	timeline->play("jumping", false);

}
void JumpOnWords::charJump()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
		auto x = 1;
	if (_dirflag) {
		x = 1;
	}
	else {
		x = -1;
	}
	auto jump = JumpBy::create(0.8, Vec2(x * visibleSize.width / 4, 300), 200, 1);
	_char1->runAction(Sequence::create(jump, CallFunc::create([=]() {
			jumpCallback();
	}), NULL));


	auto timeline = CSLoader::createTimeline("jump_on_words/character.csb");
	_char1->runAction(timeline);
	timeline->play("jumping", false);

}
void JumpOnWords::jumpCallback()
{
	if (_correct % 2 == 1 && _correct >2) {

		stepMove();
		if (_flag == true)
		{
			stepRightMove();
			_flag = false;
		}
		else
		{
			stepLeftMove();
			_flag = true;
		}
	}
}
void JumpOnWords::stepMove()
{
	_dirflag = (!_dirflag);
	for (int i = 0; i < _stepRef.size(); i++)
	{
		auto moveBy = MoveBy::create(1, Vec2(0, -600));
		_stepRef.at(i)->runAction(moveBy);
	}
	auto moveBy = MoveBy::create(1, Vec2(0, -600));
	_char1->runAction(moveBy);
}
void JumpOnWords::verify()
{
	
	jumping();

}
void JumpOnWords::jumping()
{
	_correct++;
	if (_correct >= 2)
	{
		charJump();
	}
	else {
		charMove();
	}
}
void JumpOnWords::remove()
{
	_boxRef.at(_count - 1)->removeChild(_wordLabelRef.at(_count - 1));
	_wordLabelRef.erase(_wordLabelRef.begin() + _count - 1);
	_word.erase(_word.begin() + _word.length() - 1);
	CCLOG("word = %s", _word.c_str());
	_count--;

}

bool JumpOnWords::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();

	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	if (rect.containsPoint(location))
	{
		
		if (target->getName().compare("Ball1") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(0), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(0));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball2") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(1), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(1));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball3") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(2), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(2));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball4") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(3), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(3));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball5") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(4), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(4));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball6") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(5), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(5));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball7") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(6), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(6));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball8") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(7), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(7));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball9") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(8), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(8));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Ball10") == 0 && _count<8)
		{
			auto alpha = CommonLabel::createWithTTF(_alphaList.at(9), "fonts/Roboto-Regular.ttf", 100);
			_wordLabelRef.push_back(alpha);
			_word.append(_alphaList.at(9));
			CCLOG("word = %s", _word.c_str());
			alpha->setColor(Color3B(0, 0, 0));
			alpha->setPosition(Vec2(_box1->getContentSize().width / 2, _box1->getContentSize().height / 2));
			_boxRef.at(_count)->addChild(alpha);
			_count++;
			
		}
		else if (target->getName().compare("Cross") == 0 && _count > 0)
		{
			remove();
		}
		else if (target->getName().compare("Tick") == 0 && _tickFlag == true)
		{
			CCLOG("tick");
			//_tickFlag = false;
			while(_word.length() != 0)
			{
				CCLOG("wordLen = %d", _word.length());
				remove();
				CCLOG("wordLen = %d", _word.length());
			}
			verify();
		}
		return true;
	}
	return false;
}

void JumpOnWords::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	target->setPosition(touch->getLocation());


}

void JumpOnWords::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{

	bool flag = false;
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	target->setPosition(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	



}


