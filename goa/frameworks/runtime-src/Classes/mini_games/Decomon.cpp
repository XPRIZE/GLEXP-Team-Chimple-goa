//
//  Decomon.cpp 
//  goa
//
//  Created by Kirankumar CS on 20/09/16
//
//



#include "Decomon.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"

USING_NS_CC;

Decomon::Decomon()
{
}

Decomon::~Decomon()
{

}

Decomon * Decomon::create()
{
	Decomon* dashGame = new (std::nothrow) Decomon();
	if (dashGame && dashGame->init()) {
		dashGame->autorelease();
		return dashGame;
	}
	CC_SAFE_DELETE(dashGame);
	return nullptr;
}

cocos2d::Scene * Decomon::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Decomon::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "decomon");
	scene->addChild(layer->menu);
	return scene;
}

bool Decomon::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto spritecache1 = SpriteFrameCache::getInstance();
	spritecache1->addSpriteFramesWithFile("decomon/decomon1/decomon1.plist");

	auto spritecache2 = SpriteFrameCache::getInstance();
	spritecache2->addSpriteFramesWithFile("decomon/decomon2/decomon2.plist");

	auto spritecache3 = SpriteFrameCache::getInstance();
	spritecache3->addSpriteFramesWithFile("decomon/decomon3/decomon3.plist");
	auto bg = CSLoader::createNode("decomon/decomon.csb");
	if (visibleSize.width > 2560) {
		bg->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(bg);

	auto children = bg->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("child = %s", str.c_str());
	}



	/*
	decomon_icon_gear_2
child = decomon_mouth_icon
child = decomon_skate_icon
child = decomon_mustache_icon
child = decomon_paintbrush_icon
child = decomon_nose_icon
child = decomon_eye_icon
child = decomon_horn_icon*/

	std::vector<std::string> iconsName = { "decomon_icon_gear_2","decomon_mouth_icon","decomon_skate_icon","decomon_mustache_icon","decomon_paintbrush_icon","decomon_nose_icon","decomon_eye_icon","decomon_horn_icon" };
	for (int i = 0; i < iconsName.size(); i++) {
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, bg->getChildByName(iconsName.at(i)));
	}
	

	_eyePath = { "decomon/decomon_eye_a.csb",
		"decomon/decomon_eye_b.csb" ,
		"decomon/decomon_eye_c.csb" ,
		"decomon/decomon_eye_d.csb" ,
		"decomon/decomon_eye_e.csb" ,
		"decomon/decomon_eye_f.csb" ,
		"decomon/decomon_eye_g.csb" ,
		"decomon/decomon_eye_h.csb" ,
		"decomon/decomon_eye_i.csb" };

	_mouthPath = { "decomon/decomon_mouth_a.csb",
		"decomon/decomon_mouth_b.csb" ,
		"decomon/decomon_mouth_c.csb" ,
		"decomon/decomon_mouth_d.csb" ,
		"decomon/decomon_mouth_e.csb" ,
		"decomon/decomon_mouth_f.csb" ,
		"decomon/decomon_mouth_g.csb" ,
		"decomon/decomon_mouth_h.csb" ,
		"decomon/decomon_mouth_i.csb" };

	_skatePath = { "decomon/decomon_skate_a.csb", "decomon/decomon_skate_b.csb" ,
		"decomon/decomon_skate_c.csb" , "decomon/decomon_skate_d.csb" ,
		"decomon/decomon_skate_e.csb" , "decomon/decomon_skate_f.csb" ,
		"decomon/decomon_skate_g.csb" , "decomon/decomon_skate_h.csb"  };

	_nosePath = { "decomon/decomon3/decomon_nose_1.png" ,"decomon/decomon3/decomon_nose_2.png"
	,"decomon/decomon3/decomon_nose_3.png" ,"decomon/decomon3/decomon_nose_4.png" ,
		"decomon/decomon3/decomon_nose_5.png" ,"decomon/decomon3/decomon_nose_6.png" ,
		"decomon/decomon3/decomon_nose_7.png" , "decomon/decomon3/decomon_nose_8.png" ,
		"decomon/decomon3/decomon_nose_9.png" };

	_paintPath = { "decomon/decomon3/decomon_paintbucket_1.png" , "decomon/decomon3/decomon_paintbucket_2.png" ,
		"decomon/decomon3/decomon_paintbucket_3.png" , "decomon/decomon3/decomon_paintbucket_4.png" ,
		"decomon/decomon3/decomon_paintbucket_5.png" , "decomon/decomon3/decomon_paintbucket_6.png" ,
		"decomon/decomon3/decomon_paintbucket_7.png" , "decomon/decomon3/decomon_paintbucket_8.png" ,
		"decomon/decomon3/decomon_paintbucket_9.png" };

	_hornPath = { "decomon/decomon2/decomon_headgear_1.png" ,"decomon/decomon2/decomon_headgear_2.png" ,
		"decomon/decomon2/decomon_headgear_3.png" ,"decomon/decomon2/decomon_headgear_4.png" ,
		"decomon/decomon2/decomon_headgear_5.png" ,"decomon/decomon2/decomon_headgear_6.png" ,
		"decomon/decomon2/decomon_headgear_7.png" ,"decomon/decomon2/decomon_headgear_8.png" ,
		"decomon/decomon2/decomon_headgear_9.png" };

	_gearPath = { "decomon/decomon1/decomon_gear_1.png" ,"decomon/decomon1/decomon_gear_2.png" ,
		"decomon/decomon1/decomon_gear_3.png" ,"decomon/decomon1/decomon_gear_4.png" ,
		"decomon/decomon1/decomon_gear_5.png" ,"decomon/decomon1/decomon_gear_6.png" ,
		"decomon/decomon1/decomon_gear_7.png" ,"decomon/decomon1/decomon_gear_8.png" ,
		"decomon/decomon1/decomon_gear_9.png" };

	_mustachePath = { "decomon/decomon3/decomon_hair_1.png" ,"decomon/decomon3/decomon_hair_2.png" ,
		"decomon/decomon3/decomon_hair_3.png" ,"decomon/decomon3/decomon_hair_4.png" ,
		"decomon/decomon3/decomon_hair_5.png" ,"decomon/decomon3/decomon_hair_6.png" ,
		"decomon/decomon3/decomon_hair_7.png" ,"decomon/decomon3/decomon_hair_8.png" ,
		"decomon/decomon3/decomon_hair_9.png" };

	

	

	//BalooBhai-Regular.ttf

	auto myLabel = Label::createWithTTF("A", "fonts/BalooBhai-Regular.ttf",1600);
	myLabel->setPositionX(visibleSize.width / 2);// , visibleSize.height/ 2);
	myLabel->setPositionY(visibleSize.height / 2);
	//myLabel->setColor(Color3B(111, 11, 1));
	myLabel->setName("alphabet");
	//this->addChild(myLabel);

	auto maskedFill = ClippingNode::create(myLabel);
//	maskedFill->setContentSize(visibleSize);
	//maskedFill->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	_maskingLayer = LayerColor::create(Color4B(255,255,255,255), visibleSize.width, visibleSize.height);
	//this->addChild(_maskingLayer);
	//_maskingLayer->setColor(Color3B(222, 222, 22));
	maskedFill->setAlphaThreshold(0.9);

	

	maskedFill->addChild(_maskingLayer);
	this->addChild(maskedFill);

	_alphabetLayer = Layer::create();
	this->addChild(_alphabetLayer);

	_costumeLayer = Layer::create();
	this->addChild(_costumeLayer);


	auto node = DrawNode::create();
	//node->drawRect(Vec2(100,100))//(origin, Vec2(200, 200), Color4B(255, 5, 25, 60));

	return true;
}

bool Decomon::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	if (target->getBoundingBox().containsPoint(touch->getLocation())) {
		_colorPicked = false;
		CCLOG("Toched Icon Name %s",target->getName().c_str());
		if (target->getName().compare("decomon_eye_icon") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_eyePath , "csb");
			return false;
		} else if(target->getName().compare("updated costume") == 0){
			return true;
		} else if (target->getName().compare("decomon_mouth_icon") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_mouthPath, "csb");
			return false;
		} else if (target->getName().compare("decomon_skate_icon") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_skatePath,"csb");
			return false;
		} else if (target->getName().compare("decomon_horn_icon") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY() , _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_hornPath, "png");
			return false;
		}
		else if (target->getName().compare("decomon_nose_icon") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_nosePath, "_nosePath");
			return false;
		}
		else if (target->getName().compare("decomon_paintbrush_icon") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_paintPath, "png");
			return false;
		}
		else if (target->getName().compare("decomon_mustache_icon") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_mustachePath, "png");
			return false;
		}
		else if (target->getName().compare("decomon_icon_gear_2") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_gearPath, "png");
			return false;
		}
		else{
			if (target->getName().find("decomon/decomon3/decomon_paintbucket") == 0) {
				//_alphabetLayer->getChildByName("alphabet")->setColor(Color3B(111, 123, 10));
				std::vector<std::string>::iterator it;
				it = find(_paintPath.begin(), _paintPath.end(), target->getName());
				_colorIndex = std::distance(_paintPath.begin(), it);

				_colorPicked = true;

			//	colourFilling(touch->getLocation().x, touch->getLocation().y, _colorIndex, _costumeLayer);
				return false;
			}
			else {
				_flip = true;
					return true;
				}
		}
		
	}
	else if (_colorPicked && (visibleSize.width/2 - 700 < touch->getLocation().x) &&(visibleSize.width/2 + 900 > touch->getLocation().x) &&
		(visibleSize.height / 2 - 500 < touch->getLocation().y) && (visibleSize.height / 2 + 600 > touch->getLocation().y)) {
		return true;
	}
	
		return false;
}

void Decomon::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	Size visibleSize = Director::getInstance()->getVisibleSize();
	if (touch->getLocation().x > visibleSize.width / 2 && touch->getLocation().y > visibleSize.height / 2 && _flip) {
		_flip = false;
		target->setScaleX(-1.0f * target->getScaleX());
	}

	if (_colorPicked){//(target->getName().find("decomon/decomon3/decomon_paintbucket") == 0) {
	//	_costumeLayer->getChildByName("color")->setPosition(touch->getLocation());
		colourFilling(touch->getLocation().x, touch->getLocation().y, _colorIndex,_maskingLayer);
	} else {
		target->setPosition(touch->getLocation());
	}

	CCLOG("on touch moved");
}

void Decomon::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	if (target->getName().compare("updated costume") != 0 && target->getName().find("decomon/decomon3/decomon_paintbucket") != 0) {
		_movedNodes.pushBack(target);
		_touched = true;
	}
}

void Decomon::itemInAGrid(std::vector<std::string> item, std::string name)
{
	float x = Director::getInstance()->getVisibleSize().width / (item.size() + 1);
	_costumeLayer->removeAllChildren();
	for (int i = 1; i < item.size() + 1 ; i++) {
		cocos2d::Node * eye;
		if (name.compare("csb") == 0) {
			eye = CSLoader::createNode(item.at(i - 1).c_str());
			eye->setContentSize(eye->getChildren().at(0)->getContentSize());
		}
		else {
			eye = (cocos2d::Node*)Sprite::createWithSpriteFrameName(item.at(i - 1).c_str());
		}
		eye->setPosition(Vec2(x*i, Director::getInstance()->getVisibleSize().height * 0.1));
		eye->setName(item.at(i - 1).c_str());
		_costumeLayer->addChild(eye);
		auto listener = EventListenerTouchOneByOne::create();
		//listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		listener->onTouchMoved = CC_CALLBACK_2(Decomon::onTouchMoved, this);
		listener->onTouchEnded = CC_CALLBACK_2(Decomon::onTouchEnded, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, eye);
	}
	

}

void Decomon::creatSpriteOnAlphabet(std::string fileName, float x, float y, float scale)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	if ((visibleSize.width / 2 - 700 < x) && (visibleSize.width / 2 + 900 > x) &&
		(visibleSize.height / 2 - 500 < y) && (visibleSize.height / 2 + 600 > y)) {

		cocos2d::Node * eye;
		if (fileName.find(".png") == -1) {
			eye = CSLoader::createNode(fileName);
			eye->setContentSize(eye->getChildren().at(0)->getContentSize());
			eye->setPosition(Vec2(x, y));
			eye->setName("updated costume");
			eye->setScaleX(scale);
			_alphabetLayer->addChild(eye);
			auto animation = CSLoader::createTimeline(fileName);
			eye->runAction(animation);
			if (fileName.find("decomon/decomon_eye") == 0) {
				animation->play("blink", true);
			}
			else if (fileName.find("decomon/decomon_mouth") == 0) {
				animation->play("smile1", true);

			}
		}
		else {
			eye = (cocos2d::Node*)Sprite::createWithSpriteFrameName(fileName);
			eye->setPosition(Vec2(x, y));
			eye->setName("updated costume");
			eye->setScaleX(scale);
			_alphabetLayer->addChild(eye);
		}


		auto listener = EventListenerTouchOneByOne::create();
		//listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		listener->onTouchMoved = CC_CALLBACK_2(Decomon::onTouchMoved, this);
		listener->onTouchEnded = CC_CALLBACK_2(Decomon::onTouchEnded, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, eye);
	}
}

void Decomon::colourFilling(float x, float y, int index, cocos2d::Layer * layer)
{
	std::vector <int> colour1 = { 14 ,19,224,239,151,229,67,25,255 };// { 241,236,31,16,104,26,188,230,0 };// { 14 ,19,224,239,151,229,67,25,255 };
	std::vector <int> colour2 = { 221 ,19,5,10,10,207,237,25,255 };//{ 34,236,250,245,245,48,18,230,0 };//{ 221 ,19,5,10,10,207,237,25,255 };
	std::vector <int> colour3 = { 23,232,5,239,242,0,255,25,255 };//{232,23,250,16,13,255,0,230,0};//{ 23,232,5,239,242,0,255,25,255 };
	auto drawNode = DrawNode::create();
	drawNode->setName("color");
	layer->addChild(drawNode);
	drawNode->drawDot(Vec2(x, y), 100, Color4F(colour1.at(index)/255.0f, colour2.at(index) /255.0f, colour3.at(index) /255.0f,1.0f));
}
