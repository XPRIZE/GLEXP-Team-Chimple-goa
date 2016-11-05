//
//  Door.cpp 
//  goa
//

#include "Door.h"
#include "../WordSceneLipiTKNode.h"
#include "DoorNode.h"


USING_NS_CC;

//DoorNode * DoorLiPi;

Door::Door()
{
}

Door::~Door()
{

}

Door * Door::create()
{
	Door* hippoGame = new(std::nothrow) Door();
	if (hippoGame && hippoGame->init())
	{
		hippoGame->autorelease();
		return hippoGame;
	}
	CC_SAFE_DELETE(hippoGame);
	return nullptr;
}

cocos2d::Scene * Door::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Door::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "Door");
	scene->addChild(layer->menu);
	return scene;
}

bool Door::init()
{

	if (!Layer::init())
	{
		return false;
	}
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	auto background = CSLoader::createNode("doors/background.csb");
	extraX = 0;
	if (visibleSize.width > 2560) {
		extraX = (visibleSize.width - 2560) / 2;
		background->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(background);

	
	
	/*this->runAction(Sequence::create(CallFunc::create([=]() {
		auto timeline = CSLoader::createTimeline("doors/box.csb");
		box->runAction(timeline);
		timeline->play("open", false);
	}), CallFunc::create([=]() {
		auto timeline1 = CSLoader::createTimeline("doors/box.csb");
		box->runAction(timeline1);
		timeline1->play("close", false);
	}), NULL));*/
	return true;
}
void Door::onEnterTransitionDidFinish()
{
	auto box1 = CSLoader::createNode("doors/box.csb");
	box1->setPosition(Vec2(500, 1700));
	this->addChild(box1);
	_BoxRef.pushBack(box1);

	auto box2 = CSLoader::createNode("doors/box.csb");
	box2->setPosition(Vec2(1300, 1700));
	this->addChild(box2);
	_BoxRef.pushBack(box2);

	auto box3 = CSLoader::createNode("doors/box.csb");
	box3->setPosition(Vec2(2100, 1700));
	this->addChild(box3);
	_BoxRef.pushBack(box3);

	auto box4 = CSLoader::createNode("doors/box.csb");
	box4->setPosition(Vec2(500, 900));
	this->addChild(box4);
	_BoxRef.pushBack(box4);

	auto box5 = CSLoader::createNode("doors/box.csb");
	box5->setPosition(Vec2(1300, 900));
	this->addChild(box5);
	_BoxRef.pushBack(box5);

	auto box6 = CSLoader::createNode("doors/box.csb");
	box6->setPosition(Vec2(2100, 900));
	this->addChild(box6);
	_BoxRef.pushBack(box6);
	float boxWidth = box6->getChildByName("boxdoor_6")->getContentSize().width;
	float boxHeight = box6->getChildByName("boxdoor_6")->getContentSize().height;

	for (int i = 0; i < _BoxRef.size(); i++)
	{
		float x = _BoxRef.at(i)->getPositionX();
		float y = _BoxRef.at(i)->getPositionY() - boxHeight/2;
		
		auto doorNode = DoorNode::create(boxWidth, boxHeight,Vec2( x, y));
		this->addChild(doorNode);

	}
	
	/*auto doorNode2 = DoorNode::create(500, 500, Vec2(1250, 900));
	this->addChild(doorNode2);
	auto doorNode3 = DoorNode::create(500, 500, Vec2(1250, 900));
	this->addChild(doorNode3);
	auto doorNode4 = DoorNode::create(500, 500, Vec2(1250, 900));
	this->addChild(doorNode4);
	auto doorNode5 = DoorNode::create(500, 500, Vec2(1250, 900));
	this->addChild(doorNode5);
	auto doorNode6 = DoorNode::create(500, 500, Vec2(1250, 900));
	this->addChild(doorNode6);*/




	

}
