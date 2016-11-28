#include "Balloon.h"
#include "../menu/HelpLayer.h"
#include <math.h> 


Scene* Balloon::createScene()
{
	auto scene = Scene::create();
	auto layer = Balloon::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Balloon::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Balloon::onEnterTransitionDidFinish()
{
	//std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("balloonpop/balloonpop.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	auto balloonBackground = CSLoader::createNode("balloonpop/balloonpop.csb");
	this->addChild(balloonBackground, 0);
	balloonBackground->setName("bg");

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		balloonBackground->setPositionX(myGameWidth);
	}
	Vector <Node*> children = balloonBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("Node_")==0)
			_nodeName.push_back(str);
		CCLOG("name : %s", str.c_str());
	}
	auto node = balloonBackground->getChildByName(_nodeName[0]);
	vector<string> balloonName = { "balloonpop_green", "balloonpop_red", "balloonpop_yellow"};
	int randomValue = RandomHelper::random_int(0,2);

	for (int i = 0; i < _nodeName.size(); i++)
	{   
		String name = _nodeName[i];
		Sprite* balloon = Sprite::createWithSpriteFrameName("balloonpop/"+balloonName[randomValue]+ ".png");
		setAllSpriteProperties(balloon, 0, balloonBackground->getChildByName(_nodeName[i])->getPositionX() ,-visibleSize.height*0.2, true, 0.5, 0.5, 0, 1, 1);
		this->addChild(balloon, 0);
		upFloat(balloon, RandomHelper::random_int(3, 6), balloonBackground->getChildByName(_nodeName[i])->getPositionX(), balloonBackground->getChildByName(_nodeName[i])->getPositionY()-visibleSize.height*0.15);
	}

	Sprite* _pin = Sprite::createWithSpriteFrameName("balloonpop/balloonpop_pin.png");
	setAllSpriteProperties(_pin, 0, visibleSize.height*0.5, visibleSize.height*0.5, true, 0.5, 0.5, 0, 1, 1);
	this->addChild(_pin, 0);
	addTouchEvents(_pin);
}
Balloon::~Balloon()
{

}

void Balloon::update(float dt)
{
	
}
void Balloon::upFloat(Sprite* floatingObj, int time, float positionX, float positionY)
{
	floatingObj->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
}
void Balloon::addTouchEvents(Sprite* obj)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();

		auto a = target->getPositionX() - target->getContentSize().width/2;
		auto b = target->getPositionY() - target->getContentSize().height / 2;

		auto E = DrawNode::create();
		this->addChild(E, 10);
		E->drawRect(Vec2(a, b),
			Vec2(a + target->getContentSize().width, b + target->getContentSize().height),
			Color4F(0, 0, 255, 22));

		Rect rect = CCRectMake(a, b, target->getContentSize().width*1.5, target->getContentSize().height*1.5);
		if (rect.containsPoint(Vec2(touch->getLocation().x, touch->getLocation().y)) && _touched)
		{
			_touched = false;
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		target->setPosition(Vec2(touch->getLocation().x, touch->getLocation().y));
	};
	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		_touched = true;
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, obj);
}

void Balloon::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX, posY));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}