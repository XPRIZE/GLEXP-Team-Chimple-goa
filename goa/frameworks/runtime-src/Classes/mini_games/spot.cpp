#include "spot.h"


USING_NS_CC;

Scene* spot::createScene()
{
	auto scene = Scene::create();
	auto layer = spot::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, spot::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

spot *spot::create() {
	spot *spots = new (std::nothrow) spot();
	if (spots && spots->init()) {
		spots->autorelease();
		return spots;
	}
	CC_SAFE_DELETE(spots);
	return nullptr;

}

bool spot::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void spot::onEnterTransitionDidFinish() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();



	_level = _menuContext->getCurrentLevel();
	_answerValue = _level + 10;


	_menuContext->setMaxPoints(1);

	_bg = CSLoader::createNode("unit/unit.csb");
	_bg->setName("bg");
	_bg->setAnchorPoint(Vec2(0.5, 0.5));
	_bg->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height / 2 + origin.y));

	//this->addChild(_bg);


	Vector <Node*> children = _bg->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}

	
	addCalculator();


	this->scheduleUpdate();

}

void spot::update(float delta) {

	


}

spot::~spot(void)
{
	this->removeAllChildrenWithCleanup(true);
}


void spot::gameHelpLayer()
{


	Size visibleSize = Director::getInstance()->getVisibleSize();
	_help = HelpLayer::create(Rect(visibleSize.width / 2, visibleSize.height / 2, visibleSize.width / 2.8, visibleSize.height * 0.4), Rect(0, 0, 0, 0));
	std::vector <Point> points;
	float boxWidth = (visibleSize.width / 2.8) / 2;
	float boxHeight = (visibleSize.height * 0.4) / 2;
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2, visibleSize.height / 2 + boxHeight*0.7));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 1.25, visibleSize.height / 2 - boxHeight*0.6));
	points.push_back(Vec2(visibleSize.width / 2 - boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	points.push_back(Vec2(visibleSize.width / 2 + boxWidth / 2, visibleSize.height / 2 - boxHeight*0.1));
	_help->writing(points);
	this->addChild(_help);
	_help->setName("gameHelpLayer");
}




bool spot::onTouchBegan(Touch* touch, Event* event) {


	auto target = event->getCurrentTarget();
	Point locationInNode = Vec2(0, 0);
	locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
	


	auto bb = target->getBoundingBox();

	if (bb.containsPoint(locationInNode)) {

		CCLOG("touched");
		
		


		return true; // to indicate that we have consumed it.
	}
	return false; // to indicate that we have not consumed it.
}


void spot::addCalculator() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_calculator = new Calculator();
	_calculator->createCalculator(Vec2(visibleSize.width/2, visibleSize.height/2), Vec2(0.5, 0.5), 0.5, 0.5);
	this->addChild(_calculator, 10);
	//_calculator->setGlobalZOrder(2);
	_calculator->setVisible(true);

}
