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
#include "DecomonGallery.h"
#include "../menu/HelpLayer.h"
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

	layer->menu = MenuContext::create(layer,Decomon::gameName());
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
		auto background = bg->getChildByName("bg1");
		background->setPositionX(background->getPositionX() + (extar_X / 2));
	}
	bg->setName("bg");
	this->addChild(bg);

	auto children = bg->getChildByName("left_panel")->getChildren();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("child = %s", str.c_str());
	}

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

	auto listener = EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, bg->getChildByName("decomon_icon_camera"));

	auto listener1 = EventListenerTouchOneByOne::create();
	listener1->setSwallowTouches(true);
	listener1->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, bg->getChildByName("decomon_icon_gallery"));

	

	_eyePath = { "decomon/decomon_eye_a.csb",
		"decomon/decomon_eye_b.csb" ,
		"decomon/decomon_eye_c.csb" ,
		"decomon/decomon_eye_d.csb" ,
		"decomon/decomon_eye_e.csb" ,
		"decomon/decomon_eye_f.csb" ,
		"decomon/decomon_eye_i.csb" ,
		"decomon/decomon_eye_h.csb" ,
		"decomon/decomon_eye_g.csb" };

	_mouthPath = { "decomon/decomon_mouth_a.csb",
		"decomon/decomon_mouth_b.csb" ,
		"decomon/decomon_mouth_f.csb" ,
		"decomon/decomon_mouth_d.csb" ,
		"decomon/decomon_mouth_c.csb" ,
		"decomon/decomon_mouth_e.csb" ,
		"decomon/decomon_mouth_g.csb" ,
		"decomon/decomon_mouth_h.csb" ,
		"decomon/decomon_mouth_i.csb" };

	_skatePath = { "decomon/decomon_skate_a.csb", 
		"decomon/decomon_skate_c.csb" , 
		"decomon/decomon_skate_d.csb" ,
		"decomon/decomon_skate_e.csb"   };

	_nosePath = { "decomon/decomon3/decomon_nose_1.png" ,"decomon/decomon3/decomon_nose_2.png"
	,"decomon/decomon3/decomon_nose_3.png" ,"decomon/decomon3/decomon_nose_4.png" ,
		"decomon/decomon3/decomon_nose_5.png" ,"decomon/decomon3/decomon_nose_6.png" ,
		"decomon/decomon3/decomon_nose_7.png" ,
		"decomon/decomon3/decomon_nose_9.png" };

	_paintPath = { "decomon/decomon3/decomon_paintbucket_1.png" , "decomon/decomon3/decomon_paintbucket_2.png" ,
		"decomon/decomon3/decomon_paintbucket_3.png" , "decomon/decomon3/decomon_paintbucket_4.png" ,
		"decomon/decomon3/decomon_paintbucket_5.png" , "decomon/decomon3/decomon_paintbucket_6.png" ,
		"decomon/decomon3/decomon_paintbucket_7.png" , "decomon/decomon3/decomon_paintbucket_8.png" ,
		"decomon/decomon3/decomon_paintbucket_9.png" };

	_hornPath = { "decomon/decomon2/decomon_headgear_1.png" ,"decomon/decomon2/decomon_headgear_2.png" ,
		"decomon/decomon2/decomon_headgear_3.png" ,"decomon/decomon2/decomon_headgear_4.png" ,
		"decomon/decomon2/decomon_headgear_9.png" ,"decomon/decomon2/decomon_headgear_6.png" ,
		"decomon/decomon2/decomon_headgear_7.png" ,"decomon/decomon2/decomon_headgear_8.png" ,
		"decomon/decomon2/decomon_headgear_5.png" };

	_gearPath = { "decomon/decomon1/decomon_gear_1.png" ,"decomon/decomon1/decomon_gear_2.png" ,
		"decomon/decomon1/decomon_gear_5.png" ,"decomon/decomon1/decomon_gear_4.png" ,
		"decomon/decomon1/decomon_gear_3.png" ,"decomon/decomon1/decomon_gear_6.png" ,
		"decomon/decomon1/decomon_gear_7.png" ,"decomon/decomon1/decomon_gear_8.png" ,
		"decomon/decomon1/decomon_gear_9.png" };

	_mustachePath = { "decomon/decomon3/decomon_hair_1.png" ,"decomon/decomon3/decomon_hair_8.png" ,
		"decomon/decomon3/decomon_hair_3.png" ,"decomon/decomon3/decomon_hair_2.png" ,
		"decomon/decomon3/decomon_hair_5.png" ,"decomon/decomon3/decomon_hair_6.png" ,
		"decomon/decomon3/decomon_hair_7.png" ,"decomon/decomon3/decomon_hair_4.png" ,
		"decomon/decomon3/decomon_hair_9.png" };

	return true;
}

bool Decomon::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	
	if (rect.containsPoint(location) && _onTouch) {
		_colorPicked = false;
		_onTouch = false;
		CCLOG("Toched Icon Name %s",target->getName().c_str());
		if (target->getName().compare("decomon_icon_eye") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_eyePath , "csb");
			_numberOfItemSelected++;
			_onTouch = true;
			return false;
		} else if(target->getName().compare("updated costume") == 0){
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			return true;
		} else if (target->getName().compare("decomon_icon_mouth") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_mouthPath, "csb");
			_numberOfItemSelected++;
			_onTouch = true;
			return false;
		} else if (target->getName().compare("decomon_icon_skate") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_skatePath,"csb");
			_numberOfItemSelected++;
			_onTouch = true;
			return false;
		} else if (target->getName().compare("decomon_icon_headgear") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY() , _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_hornPath, "png");
			if (_numberOfItemSelected == 0 && menu->getCurrentLevel() == 1) {
				this->removeChildByName("helpLayer");
				gameHelpDrag();
			}
			_numberOfItemSelected++;
			_onTouch = true;
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
			_numberOfItemSelected++;
			_onTouch = true;
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
			_numberOfItemSelected++;
			_onTouch = true;
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
			_numberOfItemSelected++;
			_onTouch = true;
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
			_numberOfItemSelected++;
			_onTouch = true;
			return false;
		}
		else if (target->getName().compare("decomon_icon_camera") == 0) {
			if (_screenShoot) {
				screenShot();
				_screenShoot = false;
			}
			return false;
		}
		else if (target->getName().compare("decomon_icon_gallery") == 0) {
			//screenShot();
			decomonGallery();
			_onTouch = true;
			return false;
		}
		else if (target->getName().compare("updated costume") == 0) {
			//_flip = true;
			CCLOG("you touched updated one");
			return true;
		}
		else{
			if (target->getName().find("decomon/decomon3/decomon_paintbucket") == 0) {
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
				_onTouch = true;
				return false;
			}
			else {
				//if target is not a paint bucket set Scale to 1 and also creat duplicate
				if (target->getScaleX() > 0 &&(!_colorPicked)) {
					target->setScale(1);
				}
				else {
					//target->setScale(-1);
				}
				if (_helpIconIsClicked) {
					this->removeChildByName("helpDragLayer");
					_helpIconIsClicked = false;
				}
				if (target->getName().compare("updated costume") != 0) {
					generateDuplicatesInAGrid(target);
				}	
				_flip = true;
					return true;
				}
		}
		
	}
	else if (_colorPicked && (visibleSize.width/2 - 700 < touch->getLocation().x) &&(visibleSize.width/2 + 900 > touch->getLocation().x) &&
		(visibleSize.height / 2 - 500 < touch->getLocation().y) && (visibleSize.height / 2 + 600 > touch->getLocation().y)) {
		_paintingNode->drawDot(touch->getLocation(), 30, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B / 255.0f, 1.0f));
			return true;
	}
 return false;
}

void Decomon::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	Size visibleSize = Director::getInstance()->getVisibleSize();

	if (_colorPicked){
		auto start = touch->getLocation();
		_paintingNode->drawSegment(touch->getPreviousLocation(), start, 30, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B / 255.0f, 1.0f));
	} else {		
		CCLOG("name =%s", target->getName().c_str());
		if (target->getName().find("decomon/decomon3/decomon_paintbucket") != 0) {
			target->setPosition(touch->getLocation());
		} 

		if (touch->getLocation().x > visibleSize.width / 2 && touch->getLocation().y > visibleSize.height / 2) {
			target->setScaleX(-1.0f);// *target->getScaleX());
		}
		else if (touch->getLocation().x < visibleSize.width / 2) {
			target->setScaleX(1);
		}
		
	}
}

void Decomon::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	_audioEffect->playEffect("sounds/sfx/drop.ogg");
	if (!_colorPicked)
	{
		if (!(target->getBoundingBox().intersectsRect(_alphaNode->getBoundingBox()))) {
			auto parent = target->getParent();
			auto it = std::find(_movedNodes.begin(), _movedNodes.end(), target);
			if (it != _movedNodes.end()) {
				auto index = std::distance(_movedNodes.begin(), it);
				_movedNodes.erase(index);
			}
			parent->removeChild(target);
		}
		else if (target->getName().compare("updated costume") != 0 && target->getName().find("decomon/decomon3/decomon_paintbucket") != 0) {
			_movedNodes.pushBack(target);
			_touched = true;
			if (target->getName().find("decomon/decomon_eye_") == 0 && _eyeFlag) {
				_eyeFlag = false;
				menu->addPoints(1);
			} else if (target->getName().find("decomon/decomon_mouth") == 0 && _mouthFlag) {
				_mouthFlag = false;
				menu->addPoints(1);
			} else if (target->getName().find("decomon/decomon_skate_") == 0 && _skateFlag) {
				_skateFlag = false;
				menu->addPoints(1);
			} else if (target->getName().find("decomon/decomon3/decomon_nose_") == 0 && _noseFlag) {
				_noseFlag = false;
				menu->addPoints(1);
			} else if (target->getName().find("decomon/decomon2/decomon_headgear_") == 0 && _hornFlag) {
				_hornFlag = false;
				menu->addPoints(1);
			} else if (target->getName().find("decomon/decomon1/decomon_gear_") == 0 && _gearFlag) {
				_gearFlag = false;
				menu->addPoints(1);
			} else if (target->getName().find("decomon/decomon3/decomon_hair_") == 0 && _mustacheFlag) {
				_mustacheFlag = false;
				menu->addPoints(1);
			}
		} else if (target->getName().find("decomon/decomon3/decomon_paintbucket") == 0 && _paintFlag){
			_paintFlag = false;
			menu->addPoints(1);
		}
	}
	_onTouch = true;
	
}

void Decomon::itemInAGrid(std::vector<std::string> item, std::string name)
{
	float x = Director::getInstance()->getVisibleSize().width / (item.size());
	_costumeLayer->removeAllChildren();
	for (int i = 1; i < item.size() + 1 ; i++) {
		cocos2d::Node * eye;
		if (name.compare("csb") == 0) {
			eye = CSLoader::createNode(item.at(i - 1).c_str());
			eye->setAnchorPoint(Vec2(0.5, 0.5));
			eye->setPositionX(x*(i) - (x/2)); //+ (x/item.size()
			eye->setPositionY(Director::getInstance()->getVisibleSize().height * 0.10);
			if (item.at(i - 1).find("skate") == -1) {
				eye->setContentSize(eye->getChildByName("contantsize")->getContentSize());	
			} else {
				eye->setContentSize(eye->getChildByName("skate")->getContentSize());
			}
			
		}
		else {

			eye = (cocos2d::Node*)Sprite::createWithSpriteFrameName(item.at(i - 1).c_str());
			eye->setScale(0.85);
			eye->setPositionY(Director::getInstance()->getVisibleSize().height * 0.1);
			eye->setPositionX(x*(i)-(x / 2));
		}
		eye->setName(item.at(i - 1).c_str());
		_costumeLayer->addChild(eye);
		auto listener = EventListenerTouchOneByOne::create();
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
			eye->setAnchorPoint(Vec2(0.5, 0.5));
			eye->setPosition(Vec2(x, y));
			eye->setName("updated costume");
			eye->setScaleX(scale);
			_alphabetLayer->addChild(eye);
			auto animation = CSLoader::createTimeline(fileName);
			eye->runAction(animation);
			if (fileName.find("decomon/decomon_eye") == 0) {
				eye->setContentSize(eye->getChildByName("contantsize")->getContentSize());
				animation->play("blink", true);
			}
			else if (fileName.find("decomon/decomon_mouth") == 0) {
				eye->setContentSize(eye->getChildByName("contantsize")->getContentSize());
				animation->play("smile1", true);
			}
			else if (fileName.find("decomon/decomon_skate") == 0) {
				eye->setContentSize(eye->getChildByName("skate")->getContentSize());
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
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		listener->onTouchMoved = CC_CALLBACK_2(Decomon::onTouchMoved, this);
		listener->onTouchEnded = CC_CALLBACK_2(Decomon::onTouchEnded, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, eye);
	}
}

void Decomon::generateDuplicatesInAGrid(cocos2d::Node * node)
{
	cocos2d::Node * eye;
	if (node->getPositionY() <= Director::getInstance()->getVisibleSize().height * 0.1) {

		CCLOG("duplicates");

		CCLOG("----------------------Duplicate-----------------------------");
		CCLOG("duplicate object Name = %s", node->getName().c_str());

		if (node->getName().find(".png") == -1) {
			eye = CSLoader::createNode(node->getName());
			eye->setAnchorPoint(Vec2(0.5, 0.5));
			if (node->getName().find("skate") == -1) {
				eye->setContentSize(eye->getChildByName("contantsize")->getContentSize());
			}
			else {
				eye->setContentSize(eye->getChildByName("skate")->getContentSize());
			}
		}
		else {
			eye = (cocos2d::Node*)Sprite::createWithSpriteFrameName(node->getName());
			eye->setScale(0.85);
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
}

/*
  ScreenShot 
*/
void Decomon::screenShot()
{
	int num = cocos2d::RandomHelper::random_int(1, 200);
	std::stringstream ss;
	ss << num;
	std::string path = ss.str();
	path += _myChar;
	path += "decomon.png";
	utils::captureScreen(CC_CALLBACK_2(Decomon::captureImage, this), path);
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto render = RenderTexture::create(visibleSize.width, visibleSize.height, kCCTexture2DPixelFormat_RGBA8888);
	render->setPosition(ccp(visibleSize.width / 2, visibleSize.height / 2));
	render->begin();
	this->getParent()->visit();
	render->end();
	CCImage* image = render->newImage();
	std::string filePath = FileUtils::sharedFileUtils()->getWritablePath() + path;
	if (image->saveToFile(filePath.c_str(), false)) {
		CCLOG("Succeed!");
		std::string str = filePath + '%';
		auto writablePath = FileUtils::getInstance()->getWritablePath()+ "decomon.txt";
		std::string contents = FileUtils::getInstance()->getStringFromFile(writablePath);
		str = str + contents ;
		FileUtils::getInstance()->writeStringToFile(str, writablePath);
		
	}
	else {
		CCLOG("Fail!");
	}
}

void Decomon::decomonGallery()
{

	Director::getInstance()->replaceScene(TransitionFade::create(1.0, DecomonGallery::createScene()));
	
}

void Decomon::split(const std::string & s, char delim, std::vector<std::string>& elems)
{
	std::stringstream ss;
	ss.str(s);
	std::string item;
	while (std::getline(ss, item, delim)) {
		elems.push_back(item);
	}
}

void Decomon::captureImage(bool capture, const std::string & outputFile)
{
	if (capture)
	{
		auto action3 = Blink::create(0.5, 1);
		this->runAction(action3);
		_audioEffect->playEffect("sounds/sfx/camera.ogg");
		auto sp = Sprite::create(outputFile);
		Size s = Director::getInstance()->getWinSize();
		sp->setPosition(s.width / 2, s.height / 2);
		sp->setScale(0.25);
		_screenShoot = true;
		wordGenerate();
	}
	else
	{
		CCLOG("Capture screen failed");
	}
}

void Decomon::onEnterTransitionDidFinish()
{
	Node::onEnterTransitionDidFinish();
	Size visibleSize = Director::getInstance()->getVisibleSize();

	if ((menu->getCurrentLevel() > LangUtil::getInstance()->getNumberOfCharacters()) && LangUtil::getInstance()->getLang() == "swa") {
		int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
		auto mychar = LangUtil::getInstance()->getAllCharacters()[randomNumber];//_crossTheBridgeLevelMapping.at(_gameCurrentLevel);
		_myChar = LangUtil::convertUTF16CharToString(mychar);
	}
	else {
	//	mychar = LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1];
		_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1]);
	}
	//_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1]);
	menu->setMaxPoints(8);
	cocos2d::ui::TextBMFont * my = cocos2d::ui::TextBMFont::create(_myChar, LangUtil::getInstance()->getBMFontFileName());
	my->setPositionX(visibleSize.width / 2);
	my->setPositionY(visibleSize.height / 2);
	my->setScale(2);

	auto x = my->getBoundingBox().origin;
	auto sssize = my->getContentSize();
	_width = my->getContentSize().width;
	_myLabel = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), _myChar);

	if (LangUtil::getInstance()->getLang() == "kan") {
		_myLabel->setAnchorPoint(Vec2(0.5, 0.65));
	}
	_myLabel->setColor(Color3B(222, 232, 121));
	_myLabel->setContentSize(Size(sssize.width * 2, 1000));
	_myLabel->setScale(2);
	_myLabel->setName("alphabet");


	_alphaNode = Node::create();
	_alphaNode->setPositionX(visibleSize.width / 2);
	_alphaNode->setPositionY(visibleSize.height / 1.75);
	_alphaNode->setContentSize(Size(sssize.width * 2, 1000));

	_alphaNode->setColor(Color3B(222, 232, 255));
	_alphaNode->setAnchorPoint(Vec2(0.5, 0.5));
	_alphaNode->addChild(_myLabel);
	_myLabel->setPositionX(_alphaNode->getContentSize().width / 2);
	_myLabel->setPositionY(_alphaNode->getContentSize().height / 2);
	auto maskedFill = ClippingNode::create(_alphaNode);

	maskedFill->setContentSize(visibleSize);

	_maskingLayer = LayerColor::create(Color4B(255, 255, 255, 255), visibleSize.width, visibleSize.height);
	
	_maskingLayer->setAnchorPoint(Vec2(0.5, 0.5));
	
	maskedFill->setAlphaThreshold(0.1);

	maskedFill->addChild(_maskingLayer);
	this->addChild(maskedFill);

	_alphabetLayer = Layer::create();
	this->addChild(_alphabetLayer);

	_costumeLayer = Layer::create();
	this->addChild(_costumeLayer);

	CCLOG("++++++++++++++++++decomon++++++++++++");
	auto node = DrawNode::create();
	Vec2 vertices[] =
	{
		Vec2(visibleSize.width / 2 - sssize.width,visibleSize.height / 1.75 - 500),
		Vec2(visibleSize.width / 2 + sssize.width, visibleSize.height / 1.75 - 500),

		Vec2(visibleSize.width / 2 + sssize.width,visibleSize.height / 1.75 + 500),
		Vec2(visibleSize.width / 2 - sssize.width,visibleSize.height / 1.75 + 500)

	};
	node->drawPolygon(vertices, 4, Color4F(1.0f, 0.3f, 0.3f, 0), 3, Color4F(0.2f, 0.2f, 0.2f, 1));
	//addChild(node);

	_paintingNode = DrawNode::create();
	_maskingLayer->addChild(_paintingNode);
	_audioEffect = CocosDenshion::SimpleAudioEngine::getInstance();
	if (menu->getCurrentLevel() == 1) {
		gameHelp();
	}

}

void Decomon::gameHelp()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto icon = this->getChildByName("bg")->getChildByName("right_panel")->getChildByName("decomon_icon_gear");
	auto pos = this->convertToWorldSpace(icon->getPosition());
	auto help = HelpLayer::create(Rect(visibleSize.width * 0.05, visibleSize.height * 0.74, 200, 300), Rect(0,0,0,0));
	help->click(Vec2(visibleSize.width * 0.05, visibleSize.height * 0.74));
	help->setName("helpLayer");
	this->addChild(help);
}

void Decomon::gameHelpDrag()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto icon = _costumeLayer->getChildByName("decomon/decomon2/decomon_headgear_1.png");
	auto help = HelpLayer::create(Rect(icon->getPositionX(), icon->getPositionY(), icon->getContentSize().width, icon->getContentSize().height), Rect(0, 0, 0, 0));
	help->clickAndDrag(Vec2(icon->getPositionX(), icon->getPositionY()), Vec2(visibleSize.width / 2, visibleSize.height / 2));//(Vec2(icon->getPositionX(), icon->getPositionY()));
	help->setName("helpDragLayer");
	this->addChild(help);
	_helpIconIsClicked = true;
}

void Decomon::wordGenerate()
{
	Size visibelSize = Director::getInstance()->getVisibleSize();
	std::vector<std::string> listOfWords = TextGenerator::getInstance()->wordsWithGivenLetter(_myChar);
	int wordsSize = 0;
	if (listOfWords.size() < 6) {
		wordsSize = listOfWords.size();
	} 
	else {
		wordsSize = 5;
	}
	float x = visibelSize.width* 0.3;
	float y = visibelSize.height *0.2;
	for (int i = 0; i <wordsSize; i++) {
		int size = listOfWords.size() - 1;
		int index = RandomHelper::random_int(0, size);
		std::string word = listOfWords.at(index);
		auto sprite = Sprite::create("decomon/splash.png");
		sprite->setPositionX(x + ((x* (i % 2))* 1.2));
		sprite->setPositionY(y + (300 * (i)));
		int colorR = RandomHelper::random_int(0, 255);
		int colorG = RandomHelper::random_int(0, 255);
		int colorB = RandomHelper::random_int(0, 255);
		sprite->setColor(Color3B(colorR, colorG, colorB));
		this->addChild(sprite);
		sprite->setScale(0.5, 0.5);
		auto myLabel = Label::createWithSystemFont(word, "Arial", 200);
		myLabel->setPositionX(sprite->getContentSize().width/2);
		myLabel->setPositionY(sprite->getContentSize().height / 2);
		myLabel->setColor(Color3B(0, 0, 0));
		sprite->addChild(myLabel);
		listOfWords.erase(listOfWords.begin()+index);
		auto blink = Blink::create(2, 5);
		myLabel->runAction(blink);
	}
	this->scheduleOnce(schedule_selector(Decomon::gameEnd), 4);
}

void Decomon::gameEnd(float dt)
{
	
	menu->showScore();
}
