#include "AlphaArrange.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include <sstream>
#include "../util/CommonLabelTTF.h"
#include "../util/CommonText.h"


USING_NS_CC;

AlphaArrange::AlphaArrange()
	:_randomPlaces(26),
	enableTouch(true),
	_randomPositions(0),
	overlapped(0),
	helpFlag(0),
	matches(0)
{
}

AlphaArrange::~AlphaArrange() {
}


Size visibleSize = Director::getInstance()->getVisibleSize();
Vec2 origin = Director::getInstance()->getVisibleOrigin();


Scene* AlphaArrange::createScene()
{
	auto scene = Scene::create();
	auto layer = AlphaArrange::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, AlphaArrange::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

bool AlphaArrange::init()
{
	if (!Layer::init())
	{
		return false;
	}

	return true;
}

void AlphaArrange::onEnterTransitionDidFinish()
{
	_bg = CSLoader::createNode("alphabets/bg.csb");
	this->addChild(_bg);

    _english = CSLoader::createNode("alphabets/english.csb");
	this->addChild(_english);

	lang = LangUtil::getInstance()->getLang();

	//lang = "eng";
	int languageCharCount;
	if (lang == "swa") {

		_randomPositions.resize(24);
		languageCharCount = 24;
		_alphabets = { "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","y","z" };

		_english->getChildByName("v")->setVisible(false);
		_english->getChildByName("z")->setVisible(false);

		_english->getChildByName("q_r")->setVisible(false);
		_english->getChildByName("x_r")->setVisible(false);

		for (int i = 16; i < 26; i++) {

			std::string name;
			switch (i) {

			case 16:name = "q"; break;
			case 17:name = "r"; break;
			case 18:name = "s"; break;
			case 19:name = "t"; break;
			case 20:name = "u"; break;
			case 21:name = "v"; break;
			case 22:name = "w"; break;
			case 23:name = "x"; break;
			case 24:name = "y"; break;
			case 25:name = "z"; break;


			}

			_english->getChildByName(name)->setTag(i);
		}

		_english->getChildByTag(16)->setName("r");
		_english->getChildByTag(17)->setName("s");
		_english->getChildByTag(18)->setName("t");
		_english->getChildByTag(19)->setName("u");
		_english->getChildByTag(20)->setName("v");
		_english->getChildByTag(22)->setName("w");
		_english->getChildByTag(23)->setName("y");
		_english->getChildByTag(24)->setName("z");
		

	}
	else
	{

		_randomPositions.resize(26);
		languageCharCount = 26;
		_alphabets = { "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" };
	}

	
	//Creating random boxes
	for (int i = 0; i < languageCharCount; i++) {
		_currentAlphabet = i;
		createBox();
	}	

	if (_menuContext->getCurrentLevel() == 1) {

		auto box1 = this->getChildByName("a_s");
		auto box2 = _english->getChildByName("a");

		box1->setContentSize(Size(185, 185));
		box2->setContentSize(Size(185, 185));

		auto box1pos = box1->getPosition();
		auto box2pos = box2->getPosition();

		_help = HelpLayer::create(Rect(box1pos.x, box1pos.y, box1->getContentSize().width, box1->getContentSize().height), Rect(box2pos.x, box2pos.y, box1->getContentSize().width, box1->getContentSize().height));


		_help->clickAndDrag(Vec2(box1pos), Vec2(box2pos));


		this->addChild(_help);
	}

	_menuContext->setMaxPoints(3);

}


void AlphaArrange::setupTouch() {
	
		auto listener = EventListenerTouchOneByOne::create();
		

		listener->onTouchBegan = CC_CALLBACK_2(AlphaArrange::onTouchBegan, this);
		listener->onTouchEnded = CC_CALLBACK_2(AlphaArrange::onTouchEnded, this);
		listener->onTouchMoved = CC_CALLBACK_2(AlphaArrange::onTouchMoved, this);
		
		_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, _randomPlaces[_currentAlphabet]);
				
}

void AlphaArrange::createBox() {

	std::string boxes[] = { "alphabets/box_blue.csb","alphabets/box_green.csb" ,"alphabets/box_red.csb" ,"alphabets/box_yellow.csb" };

	int numberPicker = RandomHelper::random_int(0, 3);
	
	_randomPlaces[_currentAlphabet] = CSLoader::createNode(boxes[numberPicker]);

	auto currentAlphaNode = _english->getChildByName(_alphabets[_currentAlphabet]+"_r");
	
	Point pos = currentAlphaNode->getPosition();
	_randomPositions[_currentAlphabet] = pos;
	_randomPlaces[_currentAlphabet]->setPosition(currentAlphaNode->getPosition());
	//_randomPlaces[_currentAlphabet]->setAnchorPoint(currentAlphaNode->getAnchorPoint());
	_randomPlaces[_currentAlphabet]->setContentSize(cocos2d::Size(185, 185));
	_randomPlaces[_currentAlphabet]->setAnchorPoint(currentAlphaNode->getAnchorPoint());

	_randomPlaces[_currentAlphabet]->setName(_alphabets[_currentAlphabet] + "_s");
	

	this->addChild(_randomPlaces[_currentAlphabet]);
	setupTouch();


	//Setting label

	auto label = CommonText::create();

	label->setString(LangUtil::getInstance()->translateString(_alphabets[_currentAlphabet]));
	label->setFontSize(_labelFontSize);
	label->setFontName("fonts/BalooBhai-Regular.ttf");


	//label->setPosition(Vec2(visibleSize.width * 0.079, visibleSize.height * 0.05));
	label->setAnchorPoint(Vec2(0.5, 0.5));
	label->setTextColor(Color4B::BLACK);
	//label->setScaleX(0.5);

	_randomPlaces[_currentAlphabet]->addChild(label);

	//end of label adding

}


bool AlphaArrange::onTouchBegan(Touch* touch, Event* event) {

	
	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
	
	
	if (target->getBoundingBox().containsPoint(locationInNode) && enableTouch)
	{
		CCLOG("TOUCHDED");
		enableTouch = false;
		overlapped = 0;
		return true; // to indicate that we have consumed it.
	}

	return false; // we did not consume this event, pass thru.
}

void AlphaArrange::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {

	auto target = event->getCurrentTarget();
	int position;

	if (lang == "eng") {
		switch (target->getName()[0]) {

		case 'a':position = 0; break;
		case 'b':position = 1; break;
		case 'c':position = 2; break;
		case 'd':position = 3; break;
		case 'e':position = 4; break;
		case 'f':position = 5; break;
		case 'g':position = 6; break;
		case 'h':position = 7; break;
		case 'i':position = 8; break;
		case 'j':position = 9; break;
		case 'k':position = 10; break;
		case 'l':position = 11; break;
		case 'm':position = 12; break;
		case 'n':position = 13; break;
		case 'o':position = 14; break;
		case 'p':position = 15; break;
		case 'q':position = 16; break;
		case 'r':position = 17; break;
		case 's':position = 18; break;
		case 't':position = 19; break;
		case 'u':position = 20; break;
		case 'v':position = 21; break;
		case 'w':position = 22; break;
		case 'x':position = 23; break;
		case 'y':position = 24; break;

		case 'z':position = 25; break;


		}
	}
	else {

		switch (target->getName()[0]) {

		case 'a':position = 0; break;
		case 'b':position = 1; break;
		case 'c':position = 2; break;
		case 'd':position = 3; break;
		case 'e':position = 4; break;
		case 'f':position = 5; break;
		case 'g':position = 6; break;
		case 'h':position = 7; break;
		case 'i':position = 8; break;
		case 'j':position = 9; break;
		case 'k':position = 10; break;
		case 'l':position = 11; break;
		case 'm':position = 12; break;
		case 'n':position = 13; break;
		case 'o':position = 14; break;
		case 'p':position = 15; break;
		case 'r':position = 16; break;
		case 's':position = 17; break;
		case 't':position = 18; break;
		case 'u':position = 19; break;
		case 'v':position = 20; break;
		case 'w':position = 21; break;
		case 'y':position = 22; break;
		case 'z':position = 23; break;


		}
	}

	if (overlapped == 0) {
		auto moveBack = MoveTo::create(1, _randomPositions[position]);


		auto enableTouchfunc = CallFunc::create([=] {
			enableTouch = true;
		});

		auto sequence = Sequence::create(moveBack, enableTouchfunc, NULL);

		target->runAction(sequence);
	}
	
}

void AlphaArrange::onTouchMoved(cocos2d::Touch *touch, cocos2d::Event *event) {
	
		auto n = convertTouchToNodeSpace(touch);
		auto target = event->getCurrentTarget();
		target->setPosition(n);

		auto toyRect = target->getBoundingBox();

		std::string nodeName = target->getName();
		

		auto toytRect = _english->getChildByName(nodeName.substr(0,1))->getBoundingBox();
		
		if (toyRect.intersectsRect(toytRect) ) {

			
			if (_menuContext->getCurrentLevel() == 1 && helpFlag == 0) {
				helpFlag = 1;
				this->removeChild(_help);
			}
			
		auto x = _english->getChildByName(nodeName.substr(0,1))->getPosition().x;
		auto y = _english->getChildByName(nodeName.substr(0, 1))->getPosition().y;

		auto node = _english->getChildByName(nodeName.substr(0, 1));

			target->setPosition(x, y);
			target->setAnchorPoint(node->getAnchorPoint());
			enableTouch = true;
			
			auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
			audio->playEffect("res/sounds/sortit/comedyBubble.ogg", false);
			
			overlapped = 1;
			matches++;

			Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(target);

			
			if (((matches == 24) && lang=="swa") || ((matches == 26) && lang == "eng")) {


				auto showScore = CallFunc::create([=] {

					
				_menuContext->addPoints(_menuContext->getMaxPoints());
				
					_menuContext->showScore();
				});

				auto sequence = Sequence::create(DelayTime::create(1.0), showScore, NULL);

				this->runAction(sequence);

			}
		}

}


/*
//
//  DinoGame.cpp
//  goa
//
//  Created by Kirankumar CS on 08/12/16
//
//

#include "DinoGame.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

cocos2d::Scene * DinoGame::createScene()
{
auto scene = Scene::create();
auto layer = DinoGame::create();
scene->addChild(layer);

layer->_menu = MenuContext::create(layer, "dino");
scene->addChild(layer->_menu);
return scene;
}

DinoGame * DinoGame::create()
{
DinoGame* dinoGame = new (std::nothrow) DinoGame();
if (dinoGame && dinoGame->init()) {
dinoGame->autorelease();
return dinoGame;
}
CC_SAFE_DELETE(dinoGame);
return nullptr;
}


DinoGame::DinoGame()
{
}

DinoGame::~DinoGame()
{

}



bool DinoGame::init() {
if (!Layer::init())
{
return false;
}

Size visibleSize = Director::getInstance()->getVisibleSize();
Vec2 origin = Director::getInstance()->getVisibleOrigin();

auto bg = CSLoader::createNode("dino/dinobg.csb");
if (visibleSize.width > 2560) {
//_extraX = (visibleSize.width - 2560) / 2;
bg->setPositionX((visibleSize.width - 2560) / 2);
}
this->addChild(bg);
_levelConfig = {
{1,{
{ "csb","dino/level1.csb" },
{"png","_1"},
{ "random","random_1_" },
{ "fixed","dino_1_" },
{ "duplicate", "_1.png"}
}
},
{2,{
{ "csb","dino/level2.csb" },
{ "png","_2" },
{ "random","random_2_" },
{ "fixed","dino_2_" },
{ "duplicate", "_2.png" }
}
},
{3,
{
{ "csb","dino/level3.csb" },
{ "png","_3" },
{ "random","random_2_" },
{ "fixed","dino_3_" },
{ "duplicate", "_3.png" }
}
}
};
return true;
}

void DinoGame::onEnterTransitionDidFinish()
{

if (_menu->getCurrentLevel() < 4) {
_mapping = _levelConfig.at(_menu->getCurrentLevel());
}
else {
_mapping = _levelConfig.at(1);
}
Size visibleSize = Director::getInstance()->getVisibleSize();
if (LangUtil::getInstance()->getLang() == "swa") {
_alphabets = { "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","y","z" };
}
else
{
_alphabets = { "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" };
}
_dinoNode = CSLoader::createNode(_mapping.at("csb"));
if (visibleSize.width > 2560) {
_extraX = (visibleSize.width - 2560) / 2;
_dinoNode->setPositionX((visibleSize.width - 2560) / 2);
}
this->addChild(_dinoNode);
if (_menu->getCurrentLevel() == 3) {
auto child = _dinoNode->getChildByName("random_2_l");
child->setPosition(Vec2(visibleSize.width*0.1, visibleSize.height*0.1));
}
//change the random node position
if (_menu->getCurrentLevel() == 1) {
auto randomNode = _dinoNode->getChildByName("random_1_k");
randomNode->setPositionX(randomNode->getPositionX() - 100);
randomNode->setPositionY(randomNode->getPositionY() - 50);
auto randomNodeI = _dinoNode->getChildByName("random_1_i");
randomNodeI->setPositionY(randomNodeI->getPositionY() + 100);
auto randomNodeM = _dinoNode->getChildByName("random_1_m");
randomNodeM->setPositionY(randomNodeM->getPositionY() + 50);
randomNodeM->setPositionX(randomNodeM->getPositionX() + 50);
auto randomNodeS = _dinoNode->getChildByName("random_1_s");
randomNodeS->setName("random_1_m");
randomNodeM->setName("random_1_s");
}
else if (_menu->getCurrentLevel() == 2) {
auto randomNode = _dinoNode->getChildByName("random_2_h");
randomNode->setPositionX(randomNode->getPositionX() - 100);
}
for (int i = 0; i < _alphabets.size(); i++) {
std::string child = _alphabets.at(i) + _mapping.at("png");
auto alpha = _dinoNode->getChildByName(child);
std::string alphaNode = _mapping.at("random") + _alphabets.at(i);
auto randomNode = _dinoNode->getChildByName(alphaNode);
auto moveTo = MoveTo::create(2, randomNode->getPosition());
alpha->runAction(moveTo);

//auto listener = EventListenerTouchOneByOne::create();
////listener->setSwallowTouches(true);
//listener->onTouchBegan = CC_CALLBACK_2(DinoGame::onTouchBegan, this);
//listener->onTouchMoved = CC_CALLBACK_2(DinoGame::onTouchMoved, this);
//listener->onTouchEnded = CC_CALLBACK_2(DinoGame::onTouchEnded, this);
//_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, alpha);
}

_isTouched = true;
_menu->setMaxPoints(_alphabets.size());
if (_menu->getCurrentLevel() == 2) {
alphabetHint("a");
}
_audioEffect = CocosDenshion::SimpleAudioEngine::getInstance();

this->scheduleOnce(schedule_selector(DinoGame::enableTouchOnAlphabet), 2.1);

if (_menu->getCurrentLevel() == 1 && _gameScore == 0) {
this->scheduleOnce(schedule_selector(DinoGame::gameStart), 2.1);
}

}

bool DinoGame::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
auto target = event->getCurrentTarget();
auto  location = target->convertToNodeSpace(touch->getLocation());
Size s = target->getContentSize();
Rect rect = Rect(0, 0, s.width, s.height);
if (rect.containsPoint(location)&& _isTouched) {
_isTouched = false;
target->stopAllActions();
target->setScale(1);
_previousPosition = target->getPosition();
std::string targetName = target->getName();
std::stringstream ss;
ss << targetName.at(0);
//target->setLocalZOrder(1);
std::string mystr = ss.str();
std::string path = LangUtil::getInstance()->getAlphabetSoundFileName(targetName.at(0));
CCLOG("path = %s", path.c_str());
_audioEffect->playEffect(path.c_str());
target->setScale(2);
return true;
}
return false;
}

void DinoGame::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
Size visibleSize = Director::getInstance()->getVisibleSize();
auto target = event->getCurrentTarget();
target->setPosition(Vec2(touch->getLocation().x - _extraX,touch->getLocation().y));

}

void DinoGame::onTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event)
{

auto target = event->getCurrentTarget();
target->setScale(1);
std::string targetName = target->getName();
std::stringstream ss;
ss << targetName.at(0);
std::string mystr = ss.str();
std::string str = _mapping.at("fixed") + mystr;
auto fixedNode = _dinoNode->getChildByName(str);
if (_menu->getCurrentLevel() == 1) {

if (target->boundingBox().containsPoint(fixedNode->getPosition())) {
target->setPosition(fixedNode->getPosition());
CCLOG("letter fixed");
this->removeChildByName("helpLayer");
_isTouched = true;
_gameScore++;
_eventDispatcher->removeEventListenersForTarget(target);
_menu->addPoints(1);
_audioEffect->playEffect("sounds/sfx/drop_obj.ogg");
}
else {
_menu->addPoints(-1);
_audioEffect->playEffect("sounds/sfx/error.ogg");
auto moveTo = MoveTo::create(2, _previousPosition);
target->runAction(Sequence::create(moveTo, CallFunc::create([=]() {
_isTouched = true;
CCLOG("touch End11111111111111111111111111111");
}), NULL));
}
}
else if ((_menu->getCurrentLevel() == 2) || (_menu->getCurrentLevel() == 3)) {
str = _mapping.at("fixed") + _alphabets.at(_gameScore);
fixedNode = _dinoNode->getChildByName(str);
if (target->boundingBox().containsPoint(fixedNode->getPosition()) && (mystr.compare(_alphabets.at(_gameScore)) == 0)) {
target->setPosition(fixedNode->getPosition());
CCLOG("letter fixed");
_isTouched = true;
_eventDispatcher->removeEventListenersForTarget(target);
_gameScore++;
_menu->addPoints(1);
_audioEffect->playEffect("sounds/sfx/drop_obj.ogg");
if (_menu->getCurrentLevel() == 2 && _gameScore < _alphabets.size()) {
alphabetHint(_alphabets.at(_gameScore));
}

}
else {
_audioEffect->playEffect("sounds/sfx/error.ogg");
_menu->addPoints(-1);
auto moveTo = MoveTo::create(2, _previousPosition);
target->runAction(Sequence::create(moveTo, CallFunc::create([=]() {
_isTouched = true;
std::string child = _alphabets.at(_gameScore) + _mapping.at("png");
if (_menu->getCurrentLevel() == 2 && target->getName().compare(child) == 0) {
alphabetHint(_alphabets.at(_gameScore));
}
}), NULL));
}
}
if (_gameScore == _alphabets.size()) {
_menu->showScore();
}
}

void DinoGame::alphabetHint(std::string letter)
{
std::string child = letter + _mapping.at("png");
auto alpha = _dinoNode->getChildByName(child);
auto scale = ScaleBy::create(1, 0.7);
alpha->runAction(RepeatForever::create(Sequence::create(scale, scale->reverse(), NULL)));
}

void DinoGame::helpLayer()
{
auto child = _dinoNode->getChildByName("a_1");
auto fixed = _dinoNode->getChildByName("dino_1_a");
auto helpLayer = HelpLayer::create(Rect(child->getPositionX() + _extraX, child->getPositionY(), child->getContentSize().width, child->getContentSize().height), Rect(0, 0, 0, 0));
helpLayer->clickAndDrag(Vec2(child->getPositionX() + _extraX, child->getPositionY()), Vec2(fixed->getPositionX() + _extraX, fixed->getPositionY()));
helpLayer->setName("helpLayer");
this->addChild(helpLayer);
}

void DinoGame::enableTouchOnAlphabet(float ft)
{
for (int i = 0; i < _alphabets.size(); i++) {
std::string child = _alphabets.at(i) + _mapping.at("png");
auto alpha = _dinoNode->getChildByName(child);

auto listener = EventListenerTouchOneByOne::create();
//listener->setSwallowTouches(true);
listener->onTouchBegan = CC_CALLBACK_2(DinoGame::onTouchBegan, this);
listener->onTouchMoved = CC_CALLBACK_2(DinoGame::onTouchMoved, this);
listener->onTouchEnded = CC_CALLBACK_2(DinoGame::onTouchEnded, this);
_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, alpha);
}

}

void DinoGame::gameStart(float ft)
{
helpLayer();
}


*/