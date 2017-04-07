#include "Find.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;
USING_NS_CC;

Scene* Find::createScene()
{
	auto scene = Scene::create();
	auto layer = Find::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Find::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Find::onEnterTransitionDidFinish()
{
	
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("find/find.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	auto findBackground = CSLoader::createNode("find/find.csb");
	this->addChild(findBackground, 0);
	findBackground->setName("bg");

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		findBackground->setPositionX(myGameWidth);
	}
	
	Vector <Node*> children = findBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node *monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("Node_") == 0)
			_nodeBin.push_back(monsterItem);
		CCLOG("name : %s", str.c_str());
	}

	for (int j = 0; j < _nodeBin.size(); j++)
	{
		Sprite* temp = Sprite::create("find/boxy.png");
		setAllSpriteProperties(temp, 0, _nodeBin[j]->getPositionX(), _nodeBin[j]->getPositionY(), true, 0.5, 0.5, 0, 0.001, 0.001);
		this->addChild(temp, 0);
		addTouchEvents(temp);
		_propsBin.push_back(temp);

		auto a = temp->getPositionX() - (temp->getContentSize().width / 2)*0.5;
		auto b = temp->getPositionY() - (temp->getContentSize().height / 2)*0.5;
		auto E = DrawNode::create();
		this->addChild(E, 10);
		E->drawRect(Vec2(a, b),
			Vec2(a + temp->getContentSize().width*0.5, b + temp->getContentSize().height*0.5),
			Color4F(0, 0, 255, 22));

	}
	vector<int> randomIndex;
	while (randomIndex.size() != _propsBin.size()) {
		bool duplicateCheck = true;
		int size = _propsBin.size()-1;
		int numberPicker = RandomHelper::random_int(0, size);
		for (int i = 0; i < randomIndex.size(); i++) {
			if(numberPicker == randomIndex[i])
				duplicateCheck = false;
		}
		if (duplicateCheck)
			randomIndex.push_back(numberPicker);
	}
	float delay = 0;
	for (int i = 0; i < randomIndex.size(); i++)
	{
		auto a = 10;
		this->runAction(Sequence::create(DelayTime::create(delay), CCCallFunc::create([=] {
			auto scaleTo = ScaleTo::create(3, 0.5);
			EaseElasticOut *easeAction = EaseElasticOut::create(scaleTo);
			_propsBin[randomIndex[i]]->runAction(easeAction);
		}), NULL));
		//this->runAction(sequence);
		delay = delay + 0.5;
	}
	this->scheduleUpdate();

}
Find::Find()
{

}

Find::~Find()
{

}

void Find::update(float dt)
{

}

void Find::addTouchEvents(Sprite* sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	
	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());

		auto posX = target->getPositionX();
		auto posY = target->getPositionY();
		auto a = target->getPositionX() - (target->getContentSize().width / 2)*0.5;
		auto b = target->getPositionY() - (target->getContentSize().height / 2)*0.5;

		Rect rect = CCRectMake(a, b, target->getContentSize().width*0.5, target->getContentSize().height * 0.5);

		if (rect.containsPoint(locationInNode))
		{
			CCLOG("node name is : %s ",target->getName().c_str());
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{

	};
	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{

	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite);
}

void Find::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX, posY));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}

LabelTTF* Find::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
{
	auto label = CommonLabelTTF::create(letterString, "Helvetica", labelSizeInPixel);
	label->setPosition(Vec2(posX, posY));
	label->setVisible(visibility);
	label->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	label->setRotation(rotation);
	label->setName(letterString);
	label->setScaleX(scaleX);
	label->setScaleY(scaleY);
	return label;
}

