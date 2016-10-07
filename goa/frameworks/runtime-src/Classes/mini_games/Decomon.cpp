//
//  Decomon.cpp 
//  goa
//
//  Created by Kirankumar CS on 27/09/16
//
//



#include "Decomon.h"
#include "../lang/LangUtil.h"
#include "../puzzle/CharGenerator.h"
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
		float extar_X = (visibleSize.width - 2560);
		auto right_panel = bg->getChildByName("right_panel");
		right_panel->setPositionX(right_panel->getPositionX() + extar_X);
		//bg->setPositionX((visibleSize.width - 2560) / 2);
	}
	this->addChild(bg);

	auto children = bg->getChildByName("left_panel")->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("child = %s", str.c_str());
	}



	/*
	decomon_icon_gear_2
child = decomon_icon_mouth
child = decomon_skate_icon
child = decomon_mustache_icon
child = decomon_icon_paintbrush
child = decomon_nose_icon
child = decomon_eye_icon
child = decomon_horn_icon


decomon_icon_paintbrush
child = decomon_icon_mustache
child = decomon_icon_skate
child = decomon_icon_gear

decomon_icon_headgear
child = decomon_icon_eye
child = decomon_icon_nose
child = decomon_icon_mouth*/

	std::vector<std::string> right_iconsName = { "decomon_icon_gear","decomon_icon_skate","decomon_icon_mustache","decomon_icon_paintbrush"};
	std::vector<std::string> left_iconsName = {"decomon_icon_mouth","decomon_icon_nose","decomon_icon_eye","decomon_icon_headgear" };
	for (int i = 0; i < right_iconsName.size(); i++) {
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, bg->getChildByName("right_panel")->getChildByName(right_iconsName.at(i)));
	}
	for (int i = 0; i < left_iconsName.size(); i++) {
		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, bg->getChildByName("left_panel")->getChildByName(left_iconsName.at(i)));
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
		"decomon/decomon_skate_c.csb" , "decomon/decomon_skate_f.csb" ,
		"decomon/decomon_skate_d.csb" , "decomon/decomon_skate_g.csb" ,
		"decomon/decomon_skate_e.csb" , "decomon/decomon_skate_h.csb"  };

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
	auto myLabel = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), LangUtil::convertUTF16CharToString(CharGenerator::getInstance()->generateAChar()));
	//auto myLabel = Label::createWithTTF("A", "fonts/BalooBhai-Regular.ttf",1600);
	myLabel->setPositionX(visibleSize.width / 2);// , visibleSize.height/ 2);
	myLabel->setPositionY(visibleSize.height / 2);
	if (LangUtil::getInstance()->getLang() == "kan") {
		myLabel->setAnchorPoint(Vec2(0.5, 0.65));
	}
	//myLabel->setColor(Color3B(111, 11, 1));
	myLabel->setScale(2);
	myLabel->setName("alphabet");
	//this->addChild(myLabel);

	auto maskedFill = ClippingNode::create(myLabel);
	//maskedFill->setPosition(Vec2(0,0));
	maskedFill->setContentSize(visibleSize);
	//maskedFill->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
	_maskingLayer = LayerColor::create(Color4B(255,255,255,255), visibleSize.width, visibleSize.height);
///	this->addChild(_maskingLayer);
	_maskingLayer->setAnchorPoint(Vec2(0.5, 0.5));
//	_maskingLayer->setPosition(Vec2(-visibleSize.width / 2, -visibleSize.height / 2));
	//_maskingLayer->setColor(Color3B(222, 222, 22));
	maskedFill->setAlphaThreshold(0.1);
	
	/*auto spritecache4 = SpriteFrameCache::getInstance();
	spritecache4->addSpriteFramesWithFile("smash_de_rock/smashderock_01.plist");
	auto spritecache5 = SpriteFrameCache::getInstance();
	spritecache5->addSpriteFramesWithFile("smash_de_rock/smashderock_02.plist");
	 auto target = Sprite::createWithSpriteFrameName("smash_de_rock/cracktexture_00.png");
	 maskedFill->addChild(target);/*/
  CCLOG("masked file position %f", maskedFill->getPositionX());
	CCLOG("masked file position %f", maskedFill->getPositionY());
	maskedFill->addChild(_maskingLayer);
	this->addChild(maskedFill);

	_alphabetLayer = Layer::create();
	this->addChild(_alphabetLayer);

	_costumeLayer = Layer::create();
	this->addChild(_costumeLayer);


	auto node = DrawNode::create();
	//node->drawRect(Vec2(100,100))//(origin, Vec2(200, 200), Color4B(255, 5, 25, 60));
	//((visibleSize.width / 2 - 700 < x) && (visibleSize.width / 2 + 900 > x) &&
	//	(visibleSize.height / 2 - 500 < y) && (visibleSize.height / 2 + 700 > y))
	Vec2 vertices[] =
	{
		Vec2(visibleSize.width / 2 - 700,visibleSize.height / 2 + 700),
		Vec2(visibleSize.width / 2 + 900,visibleSize.height / 2 + 700),
		Vec2(visibleSize.width / 2 + 900,visibleSize.height / 2 - 500),
		Vec2(visibleSize.width / 2 - 700,visibleSize.height / 2 - 500)
	};
	node->drawPolygon(vertices, 4, Color4F(1.0f, 0.3f, 0.3f, 0), 3, Color4F(0.2f, 0.2f, 0.2f, 1));
	addChild(node);

	_paintingTexture = RenderTexture::create(visibleSize.width, visibleSize.height, kCCTexture2DPixelFormat_RGBA8888);
	_paintingTexture->retain();
	_paintingTexture->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));

	//_maskingLayer->addChild(_paintingTexture);
	BlendFunc bf;
	// apply blending function to draw node
	bf.dst = GL_ONE_MINUS_SRC_ALPHA;
	bf.src = GL_ZERO;
	
	_paintingColour = CCSprite::create("decomon/largeBrush.png");
	_paintingColour->retain();
	_paintingNode = DrawNode::create();
	_maskingLayer->addChild(_paintingNode);
	//_paintingNode->retain();
//	_paintingNode->setBlendFunc(bf);

	return true;
}

bool Decomon::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)) {
		_colorPicked = false;
		CCLOG("Toched Icon Name %s",target->getName().c_str());
		if (target->getName().compare("decomon_icon_eye") == 0) {
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
		} else if (target->getName().compare("decomon_icon_mouth") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_mouthPath, "csb");
			return false;
		} else if (target->getName().compare("decomon_icon_skate") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_skatePath,"csb");
			return false;
		} else if (target->getName().compare("decomon_icon_headgear") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY() , _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_hornPath, "png");
			return false;
		}
		else if (target->getName().compare("decomon_icon_nose") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_nosePath, "_nosePath");
			return false;
		}
		else if (target->getName().compare("decomon_icon_paintbrush") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_paintPath, "png");
			return false;
		}
		else if (target->getName().compare("decomon_icon_mustache") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_mustachePath, "png");
			return false;
		}
		else if (target->getName().compare("decomon_icon_gear") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_gearPath, "png");
			return false;
		}
		else if (target->getName().compare("updated costume") == 0) {
			//_flip = true;
			return true;
		}
		else{
			if (target->getName().find("decomon/decomon3/decomon_paintbucket") == 0) {
				//_alphabetLayer->getChildByName("alphabet")->setColor(Color3B(111, 123, 10));
				std::vector<std::string>::iterator it;
				it = find(_paintPath.begin(), _paintPath.end(), target->getName());
				_colorIndex = std::distance(_paintPath.begin(), it);
				std::vector <int> colour1 = { 14 ,19,224,239,151,229,67,25,255 };// { 241,236,31,16,104,26,188,230,0 };// { 14 ,19,224,239,151,229,67,25,255 };
				std::vector <int> colour2 = { 221 ,19,5,10,10,207,237,25,255 };//{ 34,236,250,245,245,48,18,230,0 };//{ 221 ,19,5,10,10,207,237,25,255 };
				std::vector <int> colour3 = { 23,232,5,239,242,0,255,25,255 };

				_pickedColor_R = colour1.at(_colorIndex);
				_pickedColor_G = colour2.at(_colorIndex);
				_pickedColor_B = colour3.at(_colorIndex);
				_colorPicked = true;
				
			//	colourFilling(touch->getLocation().x, touch->getLocation().y, _colorIndex, _costumeLayer);
				return false;
			}
			else {
			//	generateDuplicatesInAGrid(target);
				_flip = true;
					return true;
				}
		}
		
	}
	else if (_colorPicked && (visibleSize.width/2 - 700 < touch->getLocation().x) &&(visibleSize.width/2 + 900 > touch->getLocation().x) &&
		(visibleSize.height / 2 - 500 < touch->getLocation().y) && (visibleSize.height / 2 + 600 > touch->getLocation().y)) {
		if (target->getName().compare("updated costume") == 0) {
			_colorPicked = false;
			return false;
		}
		else {
			return true;
			}
	}
	
		return false;
}

//void Decomon::onTouchMoved(const std::vector<Touch*>& touches, Event* event)
void Decomon::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	Size visibleSize = Director::getInstance()->getVisibleSize();
	if (touch->getLocation().x > visibleSize.width / 2 && touch->getLocation().y > visibleSize.height / 2 && _flip) {
		_flip = false;
		target->setScaleX(-1.0f * target->getScaleX());
	}

	if (_colorPicked){
		//(target->getName().find("decomon/decomon3/decomon_paintbucket") == 0) {
	//	_costumeLayer->getChildByName("color")->setPosition(touch->getLocation());
	//	_paintingTexture->begin();
	
		auto start = touch->getLocation();
	//	auto end = touch->getPreviousLocation();
	//	float distance = ccpDistance(start, end);
		//_paintingNode->setScale(5);
		_paintingNode->drawSegment(touch->getPreviousLocation(), start, 30, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B / 255.0f, 1.0f));
	//	_paintingNode->drawLine(touch->getPreviousLocation(), start, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B / 255.0f, 1.0f));
	//	_paintingNode->drawDot(start, 50, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B/ 255.0f, 1.0f));
		//_paintingNode->visit();
		//for (int i = 0; i < distance; i++)
	//	{
		//	float difx = end.x - start.x;
		///	float dify = end.y - start.y;
		///	float delta = (float)i / distance;
		//	_paintingColour->setPosition(start.x + (difx * delta), start.y + (dify * delta));
		//_paintingColour->setColor(Color3B(_pickedColor_R, _pickedColor_G, _pickedColor_B));
		//	//	_paintingColour->setScale(1);
		//	_paintingColour->visit();
		//	
		//		//ccp(start.x + (difx * delta), start.y + (dify * delta)));
		//	
	//	}
		//_paintingTexture->end();
		//_paintingTexture->end();
		//colourFilling(touch->getLocation().x, touch->getLocation().y, _colorIndex,_maskingLayer);
	} else {
		if (target->getScaleX() > 0) {
			target->setScale(1);
		} else {
			//target->setScaleX(-1);
		}
		
		target->setPosition(touch->getLocation());
	}

	CCLOG("on touch moved");
}

void Decomon::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	//_paintingTexture->end();
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
			if (item.at(i - 1).find("skate") == -1) {
				eye->setContentSize(eye->getChildren().at(0)->getContentSize());
			} else {
				eye->setContentSize(eye->getChildByName("skate")->getContentSize());
			}
			
		}
		else {

			eye = (cocos2d::Node*)Sprite::createWithSpriteFrameName(item.at(i - 1).c_str());
			eye->setScale(0.85);
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
		(visibleSize.height / 2 - 500 < y) && (visibleSize.height / 2 + 700 > y)) {

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
			else if (fileName.find("decomon/decomon_skate") == 0) {
				animation->play("walk", true);
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
	drawNode->setContentSize(Size(100, 100));
	_drawNodes.pushBack(drawNode);
	drawNode->drawDot(Vec2(x, y), 100, Color4F(colour1.at(index)/255.0f, colour2.at(index) /255.0f, colour3.at(index) /255.0f,1.0f));
	
/**	for (int i = 0; i < _drawNodes.size(); i++) {
		if (drawNode->getBoundingBox().intersectsRect(_drawNodes.at(i)->getBoundingBox())) {
			//layer->removeChild(_drawNodes.at(i));
		}
	}*/
}

void Decomon::generateDuplicatesInAGrid(cocos2d::Node * node)
{
	cocos2d::Node * eye;
	if (node->getName().find(".png") == -1) {
		eye = CSLoader::createNode(node->getName());
		eye->setContentSize(eye->getChildren().at(0)->getContentSize());
	}
	else {
		eye = (cocos2d::Node*)Sprite::createWithSpriteFrameName(node->getName());
	}
	eye->setPosition(node->getPosition());
	eye->setName(node->getName());
	_costumeLayer->addChild(eye);
	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
	listener->onTouchMoved = CC_CALLBACK_2(Decomon::onTouchMoved, this);
	listener->onTouchEnded = CC_CALLBACK_2(Decomon::onTouchEnded, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, eye);
}

void Decomon::onTouchesBegan(const std::vector<Touch*>& touches, Event * event)
{
	CCLOG("on touches BEGANNNNNN");
	if (_colorPicked) {
		//return true;
	}
	else {

	}
		//return false;
}

void Decomon::onTouchesMoved(const std::vector<Touch*>& touches, Event * event)
{
	CCLOG("on touches MOOVVVVEEEEDDDD");
	auto touch = touches[0];
	if (_colorPicked) {//(target->getName().find("decomon/decomon3/decomon_paintbucket") == 0) {
					   //	_costumeLayer->getChildByName("color")->setPosition(touch->getLocation());
		_paintingTexture->begin();

		/*auto start = touch->getLocation();
		auto end = touch->getPreviousLocation();
		float distance = ccpDistance(start, end);*/
		_paintingColour->setPosition(touch->getLocation());
		_paintingColour->setColor(Color3B(_pickedColor_R, _pickedColor_G, _pickedColor_B));
		//	_paintingColour->setScale(1);
		_paintingColour->visit();
		//for (int i = 0; i < distance; i++)
		//{
		//	float difx = end.x - start.x;
		//	float dify = end.y - start.y;
		//	float delta = (float)i / distance;
		//	
		//		//ccp(start.x + (difx * delta), start.y + (dify * delta)));
		//	
		//}

		_paintingTexture->end();
	}
}

void Decomon::onTouchesEnded(const std::vector<Touch*>& touches, Event * event)
{
	CCLOG("on touches end");
}

void Decomon::update(float)
{
	
	
}

void Decomon::updateRT()
{
}
