//
//  BasicLetterCase.cpp
//  goa
//
//  Created by Karim Mirazul  on 14/07/17
//
//

#include "BasicLetterCase.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* BasicLetterCase::createScene()
{
	auto scene = Scene::create();
	auto layer = BasicLetterCase::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BasicLetterCase::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BasicLetterCase *BasicLetterCase::create() {
	BasicLetterCase *blast = new (std::nothrow) BasicLetterCase();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;
}

bool BasicLetterCase::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BasicLetterCase::onEnterTransitionDidFinish() {
	
	auto bg = CSLoader::createNode("res/basiclettercase/bg.csb");
	addChild(bg);
	bg->setName("bg");

	createIceCreams();

	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	
	this->scheduleUpdate();
}

void BasicLetterCase::update(float delta) {

}

void BasicLetterCase::setSpriteProperties(Node* ImageObject, float positionX, float positionY, float scale, float anchorX, float anchorY, float rotation, int zorder, int tagValue) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScale(scale);
	ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	ImageObject->setZOrder(zorder);
	ImageObject->setTag(tagValue);
}

CommonLabelTTF* BasicLetterCase::createText(string text,string name,float positionX , float positionY , int tagValue) {
	auto label = CommonLabelTTF::create(text, "Helvetica", 150);
	label->setColor(Color3B::BLACK);
	label->setScale(1);
	label->setPosition(Vec2(positionX , positionY));
	label->setName(name);
	label->setTag(tagValue);
	return label;
}


void BasicLetterCase::createIceCreams() {

	//set Info for each Item ...
	auto indexCream = getRandomValueRange(1, 7, 3);
	float positionX[3] = { 0.20 , 0.50 , 0.80 };
	int tagItem[4] = { 1002 , 1003 , 1004 , 1005 };

	auto size = Director::getInstance()->getVisibleSize();
	for (size_t i = 0; i < indexCream.size(); i++) {
		std::ostringstream creamName;	creamName << i;
		//create cone and Text....
		auto cone = CSLoader::createNode("basiclettercase/cone.csb");
		setSpriteProperties(cone,size.width * positionX[i] , size.height * 0.25 , 0.3 , 0.5,0.5,0,0 , tagItem[i]);
		cone->runAction(EaseElasticOut::create(ScaleTo::create(1, 1)));
		addChild(cone);
		auto coneText = createText("a","a",0,0, tagItem[i]);
		cone->setName(creamName.str());
		cone->addChild(coneText);

		//create cream and Text....
		std::ostringstream creamTextValue;	creamTextValue << "basiclettercase/icecream" << indexCream[i] << ".csb";
		auto cream = CSLoader::createNode(creamTextValue.str());
		setSpriteProperties(cream, cone->getPositionX(), size.height * 0.65, 0.3, 0.5, 0.5, 0, 0, tagItem[i]);
		cream->runAction(EaseElasticOut::create(ScaleTo::create(1, 1)));
		addChild(cream);
		auto creamText = createText("A", "A", 0, 20 , tagItem[i]);
		cream->addChild(creamText);
		cream->setName(creamName.str());
		addEventsOnCream((Sprite*)cream->getChildByName("icecream"));
	}
}

void BasicLetterCase::addEventsOnCream(cocos2d::Sprite* callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto locationInNode = target->convertToNodeSpace(touch->getLocation());
		auto targetRect = Rect(target->getPosition(), target->getContentSize());
		if (targetRect.containsPoint(locationInNode)) {

			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event) {
		
		auto target = event->getCurrentTarget();
		target->getParent()->setPosition(touch->getLocation());
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto locationInNode = target->convertToNodeSpace(touch->getLocation());
		auto targetRect = Rect(target->getPosition(), target->getContentSize());

		if(targetRect.intersectsRect())

		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

void BasicLetterCase::backToOriginalPosition(Node* creamNode) {
	
	float positionX[] = { 0.20 , 0.40 , 0.60 , 0.80};
	auto size = Director::getInstance()->getVisibleSize();
	if (creamNode->getName().compare("1") == 0) {
		creamNode->runAction(MoveTo::create(1,Vec2(size.width*positionX[0],size.height*0.65)));
	}
	else if(creamNode->getName().compare("2") == 0){
		creamNode->runAction(MoveTo::create(1, Vec2(size.width*positionX[1], size.height*0.65)));

	}else if (creamNode->getName().compare("3") == 0) {
		creamNode->runAction(MoveTo::create(1, Vec2(size.width*positionX[2], size.height*0.65)));

	}
	else if (creamNode->getName().compare("4") == 0) {
		creamNode->runAction(MoveTo::create(1, Vec2(size.width*positionX[3], size.height*0.65)));

	}
	else {
		CCLOG("THE BACK IN ORIGINAL POSITION ISSUE FOR CREAM...");
	}

}

vector<int> BasicLetterCase::getRandomValueRange(int min, int max, int getValue) {
	int count = 0;
	vector<int> objectVector;
	while (count < getValue) {
		int temp = RandomHelper::random_int(min, max);
		bool flag = true;

		for (size_t index = 0; index < objectVector.size(); index++) {
			if (objectVector[index] == temp) {
				flag = false;
				break;
			}
		}

		if (flag) {
			objectVector.push_back(temp);
			count++;
		}
	}

	sort(objectVector.begin(), objectVector.end());
	return objectVector;
}

BasicLetterCase::~BasicLetterCase(void)
{
	this->removeAllChildrenWithCleanup(true);
}