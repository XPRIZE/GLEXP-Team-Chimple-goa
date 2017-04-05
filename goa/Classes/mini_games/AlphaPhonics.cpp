#include "AlphaPhonics.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* AlphaPhonics::createScene()
{
	auto scene = Scene::create();
	auto layer = AlphaPhonics::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, AlphaPhonics::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

AlphaPhonics *AlphaPhonics::create() {
	AlphaPhonics *blast = new (std::nothrow) AlphaPhonics();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool AlphaPhonics::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void AlphaPhonics::onEnterTransitionDidFinish() {

	Node* bg = CSLoader::createNode("alphaphonics/alphaphonics.csb");
	addChild(bg);
	bg->setName("bg");
	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	/*
	
	auto liftUp = CallFunc::create([=]() {
		LiftAnimationPlay("elevator2", "liftup");
	});

	auto liftOpen = CallFunc::create([=]() {
		LiftAnimationPlay("elevator2", "dooropen");
	});

	this->runAction(Sequence::create(DelayTime::create(3), liftUp, DelayTime::create(2),liftOpen, NULL));
	
	*/
	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	createSprite("ant",parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option1")->getPosition());
	createSprite("parrot", parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option2")->getPosition());
	createSprite("kite", parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option3")->getPosition());
	createSprite("mobile", parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option4")->getPosition());

	this->scheduleUpdate();
}

void AlphaPhonics::update(float delta) {

}

void AlphaPhonics::LiftAnimationPlay(string elevatorName,string animationName)
{
	auto timelineLift = CSLoader::createTimeline("alphaphonics/elevator.csb");
	auto lift = this->getChildByName("bg")->getChildByName("FileNode_2")->getChildByName(elevatorName);
	lift->runAction(timelineLift);
	timelineLift->play(animationName, false);
}

void AlphaPhonics::createSprite(string spriteName,Size size,Vec2 position) {
	auto sprite = Sprite::create();
	sprite->setTextureRect(Rect(0, 0, size.height, size.width));
	sprite->setColor(Color3B::GRAY);
	sprite->setPosition(Vec2(position.x,position.y));
	addChild(sprite);
}

AlphaPhonics::~AlphaPhonics(void)
{
	this->removeAllChildrenWithCleanup(true);
}
