
#include "Pillar.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include <algorithm>


USING_NS_CC;

Pillar::Pillar()
{
	_cakeMove = nullptr;
	
}

Pillar::~Pillar()
{

}

Pillar * Pillar::create()
{
	Pillar* PillarGame = new (std::nothrow) Pillar();
	if (PillarGame && PillarGame->init()) {
		PillarGame->autorelease();
		return PillarGame;
	}
	CC_SAFE_DELETE(PillarGame);
	return nullptr;
}

cocos2d::Scene * Pillar::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Pillar::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, Pillar::gameName());
	scene->addChild(layer->menu);
	return scene;
}

bool Pillar::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	float toplabelX = visibleSize.width / 2 - 30;
	std::map<std::string, std::map<std::string, std::string>> differntSceneMapping = {
		{
			{ "city",  
			{
				{ "plist", "layercandy/layercandy.plist"},
				{ "bg", "layercandy/layercandy.csb"},
				{ "ladder", "ladder_6"},
				{ "cakePath", "layercandy/cake1.png"},
				{ "character", "layercandy/girl.csb"},
				{ "ladderpath", "layercandy/ladder.json"},
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "one" },

			} },
			{ "iceLand",  
			{
				{ "plist", "dashisland/dashisland.plist" },
				{ "bg", "layerisland/layerisland.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerisland/cake1.png" },
				{ "character", "layerisland/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy"},
				{ "cry","cry" },
				{ "animation_select", "two" }

			} },
			{ "candy", 
			{
				{ "plist", "dashisland/dashisland.plist" },
				{ "bg", "layerfarm/layerfarm.csb" },
				{ "ladder", "ladder_6" },
				{ "cakePath", "layerfarm/cake1.png" },
				{ "character", "layerfarm/girl.csb" },
				{ "point1", "ref_7" },
				{ "point2", "ref_7_0" },
				{ "point3", "ref_7_0_0" },
				{ "point4", "ref_7_0_0_0" },
				{ "point5", "ref_7_1" },
				{ "happy","happy" },
				{ "cry","cry" },
				{ "animation_select", "three" }
			} },

		}
	};

	std::vector<std::string> theme = { "city","iceLand","candy" };
	_scenePath = differntSceneMapping.at(theme.at(cocos2d::RandomHelper::random_int(0, 2)));

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile(_scenePath.at("plist"));

	background = CSLoader::createNode(_scenePath.at("bg"));
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background, 0);
	

	_ladder = background->getChildByName(_scenePath.at("ladder"));
	//ladder->setPosition(Vec2(1500,300));
	_character = CSLoader::createNode(_scenePath.at("character"));
	_character->setPositionY(_ladder->getContentSize().height);
	_character->setPositionX(_ladder->getContentSize().width / 2);
	_ladder->addChild(_character);
	
	

	_Ref.push_back(background->getChildByName(_scenePath.at("point1")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point2")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point3")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point4")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point5")));
  //  _Ref.at(0)->setContentSize(cocos2d::Size(100, 100));
	_pointRef = (Sprite*)_Ref.at(0);
	//_pointRef->setVisible(true);
	_wordCorrect = TextGenerator::getInstance()->getWords(TextGenerator::POS::NOUN, 5, 1);
	std::copy(std::begin(_wordCorrect), std::end(_wordCorrect), std::back_inserter(_wordList));
	auto wordVerb = TextGenerator::getInstance()->getWords(TextGenerator::POS::VERB, 3, 1);
	std::copy(std::begin(wordVerb), std::end(wordVerb), std::inserter(_wordList, _wordList.end()));
	auto wordAdj = TextGenerator::getInstance()->getWords(TextGenerator::POS::ADJECTIVE, 3, 1);
	std::copy(std::begin(wordAdj), std::end(wordAdj), std::inserter(_wordList, _wordList.end()));

	auto swingAction = CallFunc::create(CC_CALLBACK_0(Pillar::blink, this, "blink", false));
	runAction(RepeatForever::create(Sequence::create(DelayTime::create(1 + (rand() % 60) / 30.0), swingAction, NULL)));

	if (_scenePath.at("animation_select").compare("two") == 0)
	{
		auto bubble = background->getChildByName("bubble");
		auto timeline = CSLoader::createTimeline("layerisland/bubble.csb");
		bubble->runAction(timeline);
		timeline->play("bubble", true);

		auto bubble1 = background->getChildByName("bubble_1");
		auto timeline1 = CSLoader::createTimeline("layerisland/bubble.csb");
		bubble1->runAction(timeline1);
		timeline1->play("bubble", true);

		auto bubble2 = background->getChildByName("bubble_2");
		auto timeline2 = CSLoader::createTimeline("layerisland/bubble.csb");
		bubble2->runAction(timeline2);
		timeline2->play("bubble", true);
	}
	if (_scenePath.at("animation_select").compare("three") == 0)
	{
		
		auto smoke = background->getChildByName("FileNode_1");
		auto timeline = CSLoader::createTimeline("layerfarm/smoke.csb");
		smoke->runAction(timeline);
		timeline->gotoFrameAndPlay(0,true);
		
		auto wind = background->getChildByName("FileNode_2_0_0");
		auto timeline1 = CSLoader::createTimeline("layerfarm/windmill.csb");
		wind->runAction(timeline1);
		timeline1->gotoFrameAndPlay(0, true);

		auto wind1 = background->getChildByName("FileNode_2");
		auto timeline2 = CSLoader::createTimeline("layerfarm/windmill.csb");
		wind1->runAction(timeline2);
		timeline2->gotoFrameAndPlay(0, true);

		auto wind2 = background->getChildByName("FileNode_2_0");
		auto timeline3 = CSLoader::createTimeline("layerfarm/windmill.csb");
		wind2->runAction(timeline3);
		timeline3->gotoFrameAndPlay(0, true);
	}
	newCake();
	ladderMove();
	this->scheduleUpdate();

	


}
void Pillar::blink(std::string animationName, bool loop)
{
	auto timeline = CSLoader::createTimeline(_scenePath.at("character"));
	_character->runAction(timeline);
	timeline->play(animationName, loop);
}
void Pillar::ladderMove()
{
   
	auto rotate = RotateBy::create(0.7, 20);
	auto rev = rotate->reverse();
	auto rotate1 = RotateBy::create(0.7, -20);
	auto rev1 = rotate1->reverse();
	auto seq = Sequence::create(rotate, rev, rotate1, rev1, NULL);
    auto action = RepeatForever::create(seq);
	_ladder->runAction(action);

	
}
void Pillar::newCake()
{
	_ladder->setRotation(0.0f);
	_cake = Sprite::createWithSpriteFrameName(_scenePath.at("cakePath"));
	//_cake->setScale(0.55);
	if (_scenePath.at("animation_select").compare("one") == 0)
	{
		_cake->setPositionX(_ladder->getContentSize().width / 2 + 18);
	}
	else
	{
		_cake->setPositionX(_ladder->getContentSize().width / 2 );
	}
	_cake->setPositionY(_ladder->getContentSize().height);
	_ladder->addChild(_cake);
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(Pillar::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _cake);
	int size = _wordList.size();
	_num = cocos2d::RandomHelper::random_int(0, size-1);
	//int num = rand() % _wordList.size();
	_topLabel = Label::createWithSystemFont(_wordList.at(_num).c_str(), "Arial", 100);
	_topLabel->setPositionX(_ladder->getContentSize().width / 2);
	_topLabel->setPositionY(_ladder->getContentSize().height);
	_topLabel->setColor(Color3B(255, 255, 255));
	_ladder->addChild(_topLabel);
}

void Pillar::update(float dt)
{
	if (_cakeMove != nullptr)
	{
		if (_cakeMove->getBoundingBox().intersectsRect((_pointRef)->getBoundingBox()) && _rotateFlag)
		{
			CCLOG("caaakeeeeeeeeeeeeeeeeeeeeeeeeeeee");
			_cakeMove->stopAllActions();
			auto timeline = CSLoader::createTimeline(_scenePath.at("character"));
			_character->runAction(timeline);
			timeline->play(_scenePath.at("happy"), false);
			runAction(Sequence::create(DelayTime::create(2),CallFunc::create([=]() {
				_pointRef = _cakeMove;
				_cakeMove = nullptr;
				newCake();
				ladderMove();
				_score++;
				if (_score == 5)
				{
					menu->showScore();
				}
			}),NULL));
			
			_rotateFlag = false;
			
			//_cakeMove->setPosition(_Ref.at(0)->getPositionX(), _Ref.at(0)->getPositionY());
		}
		
	}
}

bool Pillar::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Rect rect = Rect(0, 0, target->getContentSize().width, target->getContentSize().height);
	

	if (rect.containsPoint(location))
	{
		auto check =_wordList.at(_num);
			if (std::find(_wordCorrect.begin(), _wordCorrect.end(),check) != _wordCorrect.end())
			{
				CCLOG("done\\\\\\\\");
				_ladder->stopAllActions();
				_ladder->removeChild(_cake);
				_ladder->removeChild(_topLabel);
				_cakeMove = Sprite::createWithSpriteFrameName(_scenePath.at("cakePath"));
				//_cakeMove->setScale(0.55);
				auto size = _cakeMove->getContentSize();
				_cakeMove->setContentSize(Size(size.width, size.height - 60));
				//_cakeMove->setColor(Color3B(212, 232, 222));
				_cakeMove->setPositionX(touch->getLocation().x);
				_cakeMove->setPositionY(touch->getLocation().y);
				this->addChild(_cakeMove);
				auto callbackStart = CallFunc::create(CC_CALLBACK_0(Pillar::newCake, this));
				auto callbackStart1 = CallFunc::create(CC_CALLBACK_0(Pillar::ladderMove, this));
				
				
				auto cakeFall = MoveBy::create(1.5, Vec2(0, -1800));
				//_cakeMove->runAction(cakeFall);
				auto seq = Sequence::create(cakeFall, callbackStart, callbackStart1, NULL);
				//auto action = RepeatForever::create(seq);
				_cakeMove->runAction(seq);
				_rotateFlag = true;
				
			}

			else
			{
			//	_ladder->stopAllActions();
				_ladder->removeChild(_topLabel);
				_ladder->removeChild(_cake);
				if (_scenePath.at("animation_select").compare("one") == 0)
				{
					auto puff = CSLoader::createNode("circlecandy/puff.csb");
					puff->setPosition(_ladder->getContentSize().width / 2, _ladder->getContentSize().height);
					_ladder->addChild(puff);
					auto timeline = CSLoader::createTimeline("circlecandy/puff.csb");
					puff->runAction(timeline);
					timeline->play("puff", false);
				}
				auto timeline1 = CSLoader::createTimeline(_scenePath.at("character"));
				_character->runAction(timeline1);
				timeline1->play(_scenePath.at("cry"), false);
				runAction(Sequence::create(DelayTime::create(3), CallFunc::create([=]() {
					newCake();
				}), NULL));
			}
		
	
	}
		
	return false;
}
