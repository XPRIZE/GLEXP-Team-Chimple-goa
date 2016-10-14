
#include "Pillar.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"

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

	layer->menu = MenuContext::create(layer, "Pillar");
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
			{ "city",  //sonu designs
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
				{ "animation_select", "one" },
				{"topLabelX",""},

			} },
			{ "iceLand",  //anu designs
			{
				{ "plist", "dashisland/dashisland.plist" },
				{ "bg", "circle/circle.csb" },
				{ "friend", "circle/octopus.csb" },
				{ "friend_dot", "dot_14" },
				{ "enemy", "circle/fish.csb" },
				{ "enemy1", "dot_2_2" },
				{ "enemy2", "dot_2_3" },
				{ "enemy3", "dot_2_4" },
				{ "enemy4", "dot_2_1" },
				{ "enemy5", "dot_2_0" },
				{ "enemy6", "dot_2" },
				{ "animation_select", "two" }

			} },
			{ "candy",  //teju design
			{
				{ "plist", "dashisland/dashisland.plist" },
				{ "bg", "circlecandy/circlecandy.csb" },
				{ "friend", "circlecandy/cake.csb" },
				{ "friend_dot", "dot_14" },
				{ "enemy", "circlecandy/ingredients.csb" },
				{ "enemy1", "board_2_0_0" },
				{ "enemy2", "board_2" },
				{ "enemy3", "board_2_0_0_0" },
				{ "enemy4", "board_2_0_0_0_0" },
				{ "enemy5", "board_2_0_0_0_0_0" },
				{ "enemy6", "board_2_0_0_0_0_0_0" },
				{ "animation_select", "three" }
			} },

		}
	};

	std::vector<std::string> theme = { "city","iceLand","candy" };
	_scenePath = differntSceneMapping.at(theme.at(0));

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
	auto character = CSLoader::createNode(_scenePath.at("character"));
	character->setPositionY(_ladder->getContentSize().height);
	character->setPositionX(_ladder->getContentSize().width / 2);
	_ladder->addChild(character);
	
	newCake();
	
	_Ref.push_back(background->getChildByName(_scenePath.at("point1")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point2")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point3")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point4")));
	_Ref.push_back(background->getChildByName(_scenePath.at("point5")));

	_Ref.at(0)->setContentSize(cocos2d::Size(100, 100));
	_pointRef = (Sprite*)_Ref.at(0);
	ladderMove();
	this->scheduleUpdate();

	auto rotate = RotateBy::create(1,20);
	auto rotate1 = RotateBy::create(1,-20);
//	ladder->runAction(RepeatForever::create(Sequence::create(rotate,rotate->reverse(),rotate1,rotate1->reverse(),NULL)));



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
	_cake->setScale(0.55);
	_cake->setPositionX(_ladder->getContentSize().width / 2);
	_cake->setPositionY(_ladder->getContentSize().height);
	_ladder->addChild(_cake);
	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(Pillar::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _cake);
}
void Pillar::update(float dt)
{
	if (_cakeMove != nullptr)
	{
		if (_cakeMove->getBoundingBox().intersectsRect((_pointRef)->getBoundingBox()) && _rotateFlag)
		{
			CCLOG("caaakeeeeeeeeeeeeeeeeeeeeeeeeeeee");
			_cakeMove->stopAllActions();
			
			_pointRef = _cakeMove;
			_cakeMove = nullptr;
			newCake();
			ladderMove();
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
		_ladder->stopAllActions();
		
		_ladder->removeChild(_cake);
		_cakeMove = Sprite::createWithSpriteFrameName(_scenePath.at("cakePath"));
		_cakeMove->setScale(0.55);
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
		
	return false;
}
