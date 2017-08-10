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
#include "../util/CommonLabel.h"

USING_NS_CC;

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

	layer->menu = MenuContext::create(layer, Decomon::gameName());
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

	auto spritecache4 = SpriteFrameCache::getInstance();
	spritecache4->addSpriteFramesWithFile("decomon/decomon4/decomon4.plist");

	_audioEffect = CocosDenshion::SimpleAudioEngine::getInstance();

	/*auto bg = CSLoader::createNode("decomon/decomon.csb");
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


	auto fullpath = FileUtils::sharedFileUtils()->getWritablePath() + "decomon.txt";

	std::string contents = FileUtils::getInstance()->getStringFromFile(fullpath);

	std::vector<std::string> imagePath;

	std::stringstream ss;
	ss.str(contents);
	std::string item;
	while (std::getline(ss, item, '%')) {
	imagePath.push_back(item);
	}

	if (imagePath.size() != 0) {
	auto listener1 = EventListenerTouchOneByOne::create();
	listener1->setSwallowTouches(true);
	listener1->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, bg->getChildByName("decomon_icon_gallery"));
	}
	else
	{
	bg->getChildByName("decomon_icon_gallery")->setVisible(false);
	}
	*/

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
		"decomon/decomon_skate_e.csb" };

	_nosePath = { "decomon/decomon3/decomon_nose_1.png" ,"decomon/decomon3/decomon_nose_2.png"
		,"decomon/decomon3/decomon_nose_3.png" ,"decomon/decomon3/decomon_nose_4.png" ,
		"decomon/decomon3/decomon_nose_5.png" ,"decomon/decomon3/decomon_nose_6.png" ,
		"decomon/decomon3/decomon_nose_7.png" ,
		"decomon/decomon3/decomon_nose_9.png" };

	_paintPath = { "decomon/decomon3/decomon_paintbucket_1.png" , "decomon/decomon3/decomon_paintbucket_2.png" ,
		"decomon/decomon3/decomon_paintbucket_3.png" , "decomon/decomon3/decomon_paintbucket_4.png" ,
		"decomon/decomon3/decomon_paintbucket_5.png" , "decomon/decomon3/decomon_paintbucket_6.png" ,
		"decomon/decomon3/decomon_paintbucket_7.png" , "decomon/decomon3/decomon_paintbucket_8.png" ,
		"decomon/decomon3/decomon_paintbucket_9.png", "decomon/decomon3/decomon_paintbucket_10.png",
		"decomon/decomon3/decomon_paintbucket_11.png" , "decomon/decomon3/decomon_paintbucket_12.png" };

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

	scheduleUpdate();

	return true;
}

Decomon::Decomon():
_lesson(0, 0.5)
{
}

Decomon::~Decomon()
{

}
void Decomon::update(float dt)
{
	if (_touchPoint.x > 10 && _touchPoint.y > 10) {
		auto boundary = _rect.origin;
		if (_touchPoint.x > boundary.x + 15 && _touchPoint.x < (boundary.x + _rect.size.width - 20) &&
			_touchPoint.y > boundary.y + 20 && _touchPoint.y < (boundary.y + _rect.size.height - 25)) {
			_colorRestriction = true;
		}
		else {
			_colorRestriction = false;
		}
	}
}
bool Decomon::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);

	if (rect.containsPoint(location) && _onTouch)
	{
		_colorPicked = false;
		//_isTouchBegan = false;
		_onTouch = false;
		CCLOG("Toched Icon Name %s", target->getName().c_str());
		if (target->getName().compare("decomon_icon_eye") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_eyePath, "csb");
			_numberOfItemSelected++;
			_onTouch = true;
			return false;
		}
		else if (target->getName().compare("updated costume") == 0) {
			if (_touched) {
				CCLOG("--------------------in updated costume no of nodes = %d", _movedNodes.size());
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			CCLOG("----------------------in touch began updateCostume");
			return true;
		}
		else if (target->getName().compare("decomon_icon_mouth") == 0) {
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
		}
		else if (target->getName().compare("decomon_icon_skate") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_skatePath, "csb");
			_numberOfItemSelected++;
			_onTouch = true;
			return false;
		}
		else if (target->getName().compare("decomon_icon_headgear") == 0) {
			if (_touched) {
				for (int i = 0; i < _movedNodes.size(); i++) {
					creatSpriteOnAlphabet(_movedNodes.at(i)->getName(), _movedNodes.at(i)->getPositionX(), _movedNodes.at(i)->getPositionY(), _movedNodes.at(i)->getScaleX());
				}
				_movedNodes.clear();
			}
			itemInAGrid(_hornPath, "png");
			if (_numberOfItemSelected == 0 && menu->getCurrentLevel() == 2) {
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
				//decomon_icon_gallery
				if (menu->getCurrentLevel() != 1)
				{
					auto bg = this->getChildByName("bg");
					auto gallery = bg->getChildByName("decomon_icon_gallery");
					gallery->setVisible(false);
				}
				else
				{
					/*	auto gallery = this->getChildByName("decomon_icon_gallery");
					gallery->setVisible(false);*/
				}
				screenShot();
				_screenShoot = false;
			}
			return false;
		}
		else if (target->getName().compare("decomon_icon_gallery") == 0) {
			//screenShot();
			decomonGallery();
			//_onTouch = true;
			return false;
		}
		//else if (target->getName().compare("updated costume") == 0) {
		//	//_flip = true;
		//	CCLOG("you touched updated one");
		//	return true;
		//}
		else {
			if (target->getName().find("decomon/decomon3/decomon_paintbucket") == 0) {
				std::vector<std::string>::iterator it;
				it = find(_paintPath.begin(), _paintPath.end(), target->getName());
				_colorIndex = std::distance(_paintPath.begin(), it);
				std::vector <int> colour1 = { 255 ,232,54,28,28,232,127,174,255, 9,255,28 };
				std::vector <int> colour2 = { 0 ,232,232,232,28,28,70, 10,121,127, 255,28 };
				std::vector <int> colour3 = { 0,28,28,227,232,232, 41,242,0, 0,255,28 };

				_pickedColor_R = colour1.at(_colorIndex);
				_pickedColor_G = colour2.at(_colorIndex);
				_pickedColor_B = colour3.at(_colorIndex);
				_colorPicked = true;
				_onTouch = true;
				CCLOG("         color is picked");
				return false;
			}
			else {
				//if target is not a paint bucket set Scale to 1 and also creat duplicate

				if (_helpIconIsClicked) {
					this->removeChildByName("helpDragLayer");
					_helpIconIsClicked = false;
				}
				if (target->getName().compare("updated costume") != 0) {
					CCLOG("            call generateDuplicates");
					generateDuplicatesInAGrid(target);
				}
				_flip = true;
				CCLOG("            in touch began else statement");
				if (target->getScaleX() > 0 && (!_colorPicked)) {
					target->setScale(1);

				}
				CCLOG("Toched Target Name %s", target->getName().c_str());
				return true;
			}
		}

	}
	else if (_colorPicked && (visibleSize.width / 2 - 700 < touch->getLocation().x) && (visibleSize.width / 2 + 900 > touch->getLocation().x) &&
		(visibleSize.height / 2 - 500 < touch->getLocation().y) && (visibleSize.height / 2 + 600 > touch->getLocation().y)) {
		//	CCLOG("color began = %s", target->getName().c_str());
		_paintingNode->drawDot(touch->getLocation(), 30, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B / 255.0f, 1.0f));
		return true;
	}
	return false;
}

void Decomon::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{

	Size visibleSize = Director::getInstance()->getVisibleSize();

	if (_colorPicked) {
		auto start = touch->getLocation();
		_paintingNode->drawSegment(touch->getPreviousLocation(), start, 30, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B / 255.0f, 1.0f));
	}
	else {
		//CCLOG("name =%s", target->getName().c_str());
		auto target = event->getCurrentTarget();
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
	if (menu->getCurrentLevel() > 52) {
		_audioEffect->playEffect("sounds/sfx/drop.ogg");
	}
	else
	{
		auto character = tolower(_myChar.at(0));
		std::string path = LangUtil::getInstance()->getAlphabetSoundFileName(character);
		CCLOG("path = %s", path.c_str());
		_audioEffect->playEffect(path.c_str());
	}
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
			auto it = std::find(_movedNodes.begin(), _movedNodes.end(), target);
			if (it == _movedNodes.end()) {
				CCLOG("on touch end");
				_movedNodes.pushBack(target);
			}
			Node * temp = target;
			_iconLayer->removeChild(target);
			auto vector1 = _costumeLayer->getChildren();
			auto it1 = std::find(vector1.begin(), vector1.end(), target);
			if (it1 == vector1.end()) {
				_costumeLayer->addChild(target);
			}
			//	auto parent = target->getParent();

			_touched = true;
			if (target->getName().find("decomon/decomon_eye_") == 0 && _eyeFlag) {
				_eyeFlag = false;
				menu->addPoints(1);
			}
			else if (target->getName().find("decomon/decomon_mouth") == 0 && _mouthFlag) {
				_mouthFlag = false;
				menu->addPoints(1);
			}
			else if (target->getName().find("decomon/decomon_skate_") == 0 && _skateFlag) {
				_skateFlag = false;
				menu->addPoints(1);
			}
			else if (target->getName().find("decomon/decomon3/decomon_nose_") == 0 && _noseFlag) {
				_noseFlag = false;
				menu->addPoints(1);
			}
			else if (target->getName().find("decomon/decomon2/decomon_headgear_") == 0 && _hornFlag) {
				_hornFlag = false;
				menu->addPoints(1);
			}
			else if (target->getName().find("decomon/decomon1/decomon_gear_") == 0 && _gearFlag) {
				_gearFlag = false;
				menu->addPoints(1);
			}
			else if (target->getName().find("decomon/decomon3/decomon_hair_") == 0 && _mustacheFlag) {
				_mustacheFlag = false;
				menu->addPoints(1);
			}
		}
	}
	else if (target->getName().find("decomon/decomon3/decomon_paintbucket") == 0 && _paintFlag) {
		_paintFlag = false;
		menu->addPoints(1);
	}

	_onTouch = true;

}

void Decomon::itemInAGrid(std::vector<std::string> item, std::string name)
{
	float x = Director::getInstance()->getVisibleSize().width / (item.size());
	_iconLayer->removeAllChildren();
	for (int i = 1; i < item.size() + 1; i++) {
		cocos2d::Node * eye;
		if (name.compare("csb") == 0) {
			eye = CSLoader::createNode(item.at(i - 1).c_str());
			eye->setAnchorPoint(Vec2(0.5, 0.5));
			eye->setPositionX(x*(i)-(x / 2)); //+ (x/item.size()
			eye->setPositionY(Director::getInstance()->getVisibleSize().height * 0.10);
			if (item.at(i - 1).find("skate") == -1) {
				eye->setContentSize(eye->getChildByName("contantsize")->getContentSize());
			}
			else {
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
		_iconLayer->addChild(eye);
		//_costumeLayer->addChild(eye);
		auto listener = EventListenerTouchOneByOne::create();
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		CCLOG(" bucket number %d", item.at(i - 1).find("paintbucket"));
		//	if (item.at(i - 1).find("paintbucket") != 25) {
		listener->onTouchMoved = CC_CALLBACK_2(Decomon::onTouchMoved, this);
		listener->onTouchEnded = CC_CALLBACK_2(Decomon::onTouchEnded, this);
		//	}
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, eye);
	}


}

void Decomon::creatSpriteOnAlphabet(std::string fileName, float x, float y, float scale)
{
	CCLOG("createSpriteOnAlphabet");
	CCLOG("png name  = %s =", fileName.c_str());
	CCLOG("costume layer number of children = %d", _costumeLayer->getChildren().size());
	_costumeLayer->removeAllChildren();
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
			if (_alphaNode->getBoundingBox().intersectsRect(eye->getBoundingBox())) {
				_alphabetLayer->addChild(eye);
			}

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
		_iconLayer->addChild(eye);
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
	if (menu->getCurrentLevel() == 1)
	{
		path += "drawAZ09";
	}
	else
	{
		path += _myChar;
	}

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
		auto writablePath = FileUtils::getInstance()->getWritablePath() + "decomon.txt";
		std::string contents = FileUtils::getInstance()->getStringFromFile(writablePath);
		str = str + contents;
		FileUtils::getInstance()->writeStringToFile(str, writablePath);

	}
	else {
		CCLOG("Fail!");
	}
}

void Decomon::decomonGallery()
{
	_backFromGallery = false;
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
		//_audioEffect->playEffect("sounds/sfx/camera.ogg");
		auto sp = Sprite::create(outputFile);
		Size s = Director::getInstance()->getWinSize();
		sp->setPosition(s.width / 2, s.height / 2);
		sp->setScale(0.25);
		_screenShoot = true;
		if (menu->getCurrentLevel() != 1)
			wordGenerate();

		if (menu->getCurrentLevel() == 1)
			this->scheduleOnce(schedule_selector(Decomon::gameEnd), 1.2);
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
	/* level 1 to 26 upperCase
	level 27 to 52 lowerCase
	level 53 to 62 numbers
	*/
	if ((menu->getCurrentLevel() == 1) && _backFromGallery)
	{
		auto decomonBackground = (cocos2d::Sprite*)CSLoader::createNode("decomon/decomon1.csb");
		this->addChild(decomonBackground, 0);
		decomonBackground->setName("paintBg");

		auto bgLayerGradient = LayerGradient::create(Color4B(255, 255, 255, 0), Color4B(255, 255, 255, 0));
		this->addChild(bgLayerGradient, 0);
		bgLayerGradient->setName("background");
		addTouchEvents(bgLayerGradient);

		//START
		auto camera = Sprite::createWithSpriteFrameName("decomon/decomon3/decomon_icon_camera.png");
		camera->setPosition(Vec2(visibleSize.width*0.65, visibleSize.height*.925));
		camera->setAnchorPoint(Vec2(0.5, 0.5));
		camera->setName("decomon_icon_camera");
		this->addChild(camera, 1);

		auto listener = EventListenerTouchOneByOne::create();
		listener->setSwallowTouches(true);
		listener->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, this->getChildByName("decomon_icon_camera"));

		auto fullpath = FileUtils::sharedFileUtils()->getWritablePath() + "decomon.txt";

		std::string contents = FileUtils::getInstance()->getStringFromFile(fullpath);

		std::vector<std::string> imagePath;

		std::stringstream ss;
		ss.str(contents);
		std::string item;
		while (std::getline(ss, item, '%')) {
			imagePath.push_back(item);
		}

		if (imagePath.size() != 0) {
			auto gallery = Sprite::createWithSpriteFrameName("decomon/decomon3/decomon_icon_gallery.png");
			gallery->setPosition(Vec2(visibleSize.width*0.79, visibleSize.height*.925));
			gallery->setAnchorPoint(Vec2(0.5, 0.5));
			gallery->setName("decomon_icon_gallery");
			this->addChild(gallery, 1);

			auto listener1 = EventListenerTouchOneByOne::create();
			listener1->setSwallowTouches(true);
			listener1->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
			_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, this->getChildByName("decomon_icon_gallery"));
		}

		//END

		if (visibleSize.width > 2560) {
			auto myGameWidth = (visibleSize.width - 2560) / 2;
			decomonBackground->setPositionX(myGameWidth);
		}


		/*	auto drawingSheet = (cocos2d::Sprite*)this->getChildByName("paintBg")->getChildByName("bg");
		addTouchEvents(drawingSheet);*/

		auto drawing = this->getChildByName("paintBg")->getChildByName("draw");
		auto posX = drawing->getPositionX();
		auto posY = drawing->getPositionY();
		auto sheetWidth = drawing->getContentSize().width;
		auto sheetHeight = drawing->getContentSize().height;
		_rect = CCRectMake(posX, posY, sheetWidth, sheetHeight);


		/*	auto aa = DrawNode::create();
		this->addChild(aa, 20);

		aa->drawRect(Vec2(posX, posY),
		Vec2(posX + sheetWidth, posY + sheetHeight),
		Color4F(0, 0, 255, 22));*/


		auto gap = Director::getInstance()->getVisibleSize().width / _paintPath.size();

		float delay = 0;

		for (int i = 0; i < _paintPath.size(); i++)
		{
			this->runAction(Sequence::create(DelayTime::create(delay), CallFunc::create([=] {

				auto paintBucket = (cocos2d::Sprite*)Sprite::createWithSpriteFrameName(_paintPath.at(i).c_str());
				paintBucket->setScale(0.001);
				paintBucket->setPositionY(Director::getInstance()->getVisibleSize().height * 0.07);
				paintBucket->setPositionX((i*gap + gap / 2));
				paintBucket->setName("bucket");
				paintBucket->setTag(i);
				this->addChild(paintBucket);

				auto scaleTo = ScaleTo::create(1, 0.85);
				EaseElasticOut *easeAction = EaseElasticOut::create(scaleTo);
				paintBucket->runAction(easeAction);
				addTouchEventsOnBacket(paintBucket);
			}), NULL));

			delay += 0.1;
		}

		_drawingPaintNode = DrawNode::create();
		this->addChild(_drawingPaintNode);


	}
	else if(_backFromGallery){
		// START

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

		std::vector<std::string> right_iconsName = { "decomon_icon_gear","decomon_icon_skate","decomon_icon_mustache","decomon_icon_paintbrush" };
		std::vector<std::string> left_iconsName = { "decomon_icon_mouth","decomon_icon_nose","decomon_icon_eye","decomon_icon_headgear" };
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


		auto fullpath = FileUtils::sharedFileUtils()->getWritablePath() + "decomon.txt";

		std::string contents = FileUtils::getInstance()->getStringFromFile(fullpath);

		std::vector<std::string> imagePath;

		std::stringstream ss;
		ss.str(contents);
		std::string item;
		while (std::getline(ss, item, '%')) {
			imagePath.push_back(item);
		}

		if (imagePath.size() != 0) {
			auto listener1 = EventListenerTouchOneByOne::create();
			listener1->setSwallowTouches(true);
			listener1->onTouchBegan = CC_CALLBACK_2(Decomon::onTouchBegan, this);
			_eventDispatcher->addEventListenerWithSceneGraphPriority(listener1, bg->getChildByName("decomon_icon_gallery"));
		}
		else
		{
			bg->getChildByName("decomon_icon_gallery")->setVisible(false);
		}

		//END

		auto currentLevel = menu->getCurrentLevel();
		//for(int i = 1 ; i < 64 ;i++){
		//	currentLevel = i;
		
		// _revampToNewLessonGame

		auto vmc = _lesson.getMultiChoices(1, 0);

		if ((currentLevel > 1) && (currentLevel < 54)) //28 
		{
			_myChar = vmc[0].question;
			/*if (currentLevel > LangUtil::getInstance()->getNumberOfCharacters() + 1) {
				int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
				auto mychar = LangUtil::getInstance()->getAllCharacters()[randomNumber];
				_myChar = LangUtil::convertUTF16CharToString(mychar);
			}
			else {
				_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllCharacters()[currentLevel - 2]);
			}*/

		}
		/*else if ((currentLevel > 27) && (currentLevel < 54)) {
			int level = currentLevel - 28;
			if (level >= LangUtil::getInstance()->getNumberOfCharacters()) {
				int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 2);
				auto mychar = LangUtil::getInstance()->getAllLowerCaseCharacters()[randomNumber];
				_myChar = LangUtil::convertUTF16CharToString(mychar);
			}
			else {
				_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllLowerCaseCharacters()[level]);
			}

		}*/
		else {
			int level = currentLevel - 54;
			auto mychar = LangUtil::getInstance()->getAllNumbers()[level];
			_myChar = LangUtil::convertUTF16CharToString(mychar);

		}

		//CCLOG("\nlevel: %d , THE LETTER OR NUMBER IS : %s",i,_myChar.c_str());
		//}
		//_myChar = LangUtil::convertUTF16CharToString(LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1]);
		menu->setMaxPoints(8);
		cocos2d::ui::TextBMFont * my = cocos2d::ui::TextBMFont::create(_myChar, LangUtil::getInstance()->getBMFontFileName());
		my->setPositionX(visibleSize.width / 2);
		my->setPositionY(visibleSize.height / 2);
		my->setScale(4);

		auto x = my->getBoundingBox().origin;
		auto sssize = my->getContentSize();
		_width = my->getContentSize().width;
		_myLabel = Label::createWithBMFont(LangUtil::getInstance()->getBMFontFileName(), _myChar);

		if (LangUtil::getInstance()->getLang() == "kan") {
			_myLabel->setAnchorPoint(Vec2(0.5, 0.65));
		}
		_myLabel->setColor(Color3B(222, 232, 121));
		_myLabel->setContentSize(Size(sssize.width * 2.5, 1000));
		_myLabel->setScale(3);
		_myLabel->setName("alphabet");


		_alphaNode = Node::create();
		_alphaNode->setPositionX(visibleSize.width / 2);
		_alphaNode->setPositionY(visibleSize.height / 1.75);
		_alphaNode->setContentSize(Size(sssize.width * 2.5, 1000));

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

		_iconLayer = Layer::create();
		this->addChild(_iconLayer);

		/*_coloringLayer = Layer::create();
		_coloringLayer->setName("colouringLayer");
		this->addChild(_coloringLayer);*/
		CCLOG("++++++++++++++++++decomon++++++++++++");
		auto node = DrawNode::create();
		auto nodeWidth = sssize.width * 1.25;
		Vec2 vertices[] =
		{
			Vec2(visibleSize.width / 2 - nodeWidth,visibleSize.height / 1.75 - 500),
			Vec2(visibleSize.width / 2 + nodeWidth, visibleSize.height / 1.75 - 500),

			Vec2(visibleSize.width / 2 + nodeWidth,visibleSize.height / 1.75 + 500),
			Vec2(visibleSize.width / 2 - nodeWidth,visibleSize.height / 1.75 + 500)

		};
		node->drawPolygon(vertices, 4, Color4F(1.0f, 0.3f, 0.3f, 0), 3, Color4F(0.2f, 0.2f, 0.2f, 1));
		//addChild(node);

		_paintingNode = DrawNode::create();
		_maskingLayer->addChild(_paintingNode);
		_audioEffect = CocosDenshion::SimpleAudioEngine::getInstance();

		if (menu->getCurrentLevel() == 2) {
			gameHelp();
		}
	}
}

void Decomon::gameHelp()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto icon = this->getChildByName("bg")->getChildByName("right_panel")->getChildByName("decomon_icon_gear");
	auto pos = this->convertToWorldSpace(icon->getPosition());
	auto help = HelpLayer::create(Rect(visibleSize.width * 0.05, visibleSize.height * 0.74, 200, 300), Rect(0, 0, 0, 0));
	help->click(Vec2(visibleSize.width * 0.05, visibleSize.height * 0.74));
	help->setName("helpLayer");
	this->addChild(help);
}

void Decomon::gameHelpDrag()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto icon = _iconLayer->getChildByName("decomon/decomon2/decomon_headgear_1.png");
	auto help = HelpLayer::create(Rect(icon->getPositionX(), icon->getPositionY(), icon->getContentSize().width, icon->getContentSize().height), Rect(0, 0, 0, 0));
	help->clickAndDrag(Vec2(icon->getPositionX(), icon->getPositionY()), Vec2(visibleSize.width / 2, visibleSize.height / 2));//(Vec2(icon->getPositionX(), icon->getPositionY()));
	help->setName("helpDragLayer");
	this->addChild(help);
	_helpIconIsClicked = true;
}

void Decomon::wordGenerate()
{
	Size visibelSize = Director::getInstance()->getVisibleSize();
	if (menu->getCurrentLevel() < 53) {

		_myChar = toupper(_myChar.at(0));
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
			auto sprite = Sprite::createWithSpriteFrameName("decomon/decomon4/splash.png");
			sprite->setPositionX(x + ((x* (i % 2))* 1.2));
			sprite->setPositionY(y + (300 * (i)));
			int colorR = RandomHelper::random_int(0, 255);
			int colorG = RandomHelper::random_int(0, 255);
			int colorB = RandomHelper::random_int(0, 255);
			sprite->setColor(Color3B(colorR, colorG, colorB));
			this->addChild(sprite);
			sprite->setScale(0.5, 0.5);
			auto myLabel = CommonLabel::createWithTTF(word, "fonts/Roboto-Regular.ttf", 200);
			myLabel->setPositionX(sprite->getContentSize().width / 2);
			myLabel->setPositionY(sprite->getContentSize().height / 2);
			myLabel->setColor(Color3B(0, 0, 0));
			sprite->addChild(myLabel);
			listOfWords.erase(listOfWords.begin() + index);
			auto blink = Blink::create(2, 5);
			myLabel->runAction(blink);
		}
	}
	this->scheduleOnce(schedule_selector(Decomon::gameEnd), 1.5);
}

void Decomon::addTouchEvents(LayerGradient* sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = event->getCurrentTarget();

		if (_rect.containsPoint(touch->getLocation()))
		{
			return true;
		}

		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto touchPoint = touch->getLocation();
		auto boundary = _rect.origin;
		auto xExtream = (boundary.x + _rect.size.width);

		setBoundaryForDrawing(touch);
	};
	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{

	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite);
}

void Decomon::addTouchEventsOnBacket(Sprite* sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = event->getCurrentTarget();
		auto a = target->getPositionX() - target->getContentSize().width / 2;
		auto b = target->getPositionY() - target->getContentSize().height / 2;

		Rect rect = CCRectMake(a, b, a + target->getContentSize().width, b + target->getContentSize().height);
		if (target->getBoundingBox().containsPoint(touch->getLocation()))
		{
			auto targetName = target->getName();
			auto currentLevel = menu->getCurrentLevel();
			if (target->getName().compare("bucket") == 0) {

				auto sequence_E = ScaleTo::create(0.1, (1));
				auto sequence_F = ScaleTo::create(0.1, 0.85);
				target->runAction(Sequence::create(sequence_E, sequence_F, NULL));

				std::vector <int> colour1 = { 255 ,232,54,28,28,232,127,174,255, 9,255,28 };
				std::vector <int> colour2 = { 0 ,232,232,232,28,28,70, 10,121,127, 255,28 };
				std::vector <int> colour3 = { 0,28,28,227,232,232, 41,242,0, 0,255,28 };

				_pickedColor_R = colour1.at(target->getTag());
				_pickedColor_G = colour2.at(target->getTag());
				_pickedColor_B = colour3.at(target->getTag());

				CCLOG("RGB : %d,%d,%d ", _pickedColor_R, _pickedColor_G, _pickedColor_B);

				return false;
			}

			return true;
		}

		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite);
}

bool Decomon::setBoundaryForDrawing(cocos2d::Touch* touch) {

	auto touchPoint = touch->getLocation();
	_touchPoint = touchPoint;
	auto boundary = _rect.origin;
	if (touchPoint.x > boundary.x + 15 && touchPoint.x < (boundary.x + _rect.size.width - 20) &&
		touchPoint.y > boundary.y + 20 && touchPoint.y < (boundary.y + _rect.size.height - 25) && _colorRestriction) {

		_drawingPaintNode->drawSegment(touch->getPreviousLocation(), touchPoint, 30, Color4F(_pickedColor_R / 255.0f, _pickedColor_G / 255.0f, _pickedColor_B / 255.0f, 1.0f));

	}
	else {
		CCLOG("INVALID AREA");
	}
	return true;
}

void Decomon::gameEnd(float dt)
{

	menu->showScore();
}
