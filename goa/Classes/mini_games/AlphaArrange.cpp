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

	lang = "eng";
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
	if (_menuContext->getCurrentLevel() < 3) {
		createLevel(_menuContext->getCurrentLevel());
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

	std::string boxColor;

	
	_randomPlaces[_currentAlphabet] = CSLoader::createNode(boxes[numberPicker]);

	auto currentAlphaNode = _english->getChildByName(_alphabets[_currentAlphabet]+"_r");
	
	Point pos = currentAlphaNode->getPosition();
	_randomPositions[_currentAlphabet] = pos;
	_randomPlaces[_currentAlphabet]->setPosition(currentAlphaNode->getPosition());
	_randomPlaces[_currentAlphabet]->setAnchorPoint(currentAlphaNode->getAnchorPoint());

	_randomPlaces[_currentAlphabet]->setContentSize(cocos2d::Size(185, 185));
	
	//_randomPlaces[_currentAlphabet]->setAnchorPoint(Vec2(0.5,0.5));

	_randomPlaces[_currentAlphabet]->setName(_alphabets[_currentAlphabet] + "_s");
	

	this->addChild(_randomPlaces[_currentAlphabet]);
	setupTouch();
	//
	/*
	Rect aabb = _randomPlaces[_currentAlphabet]->getBoundingBox();
	DrawNode* drawNode = DrawNode::create();
	drawNode->drawRect(aabb.origin, aabb.origin + aabb.size, Color4F(1, 0, 0, 1));
	this->addChild(drawNode, 100);
	*/
	
	//

	//Setting label

	auto label = CommonText::create();

	label->setString(LangUtil::getInstance()->translateString(_alphabets[_currentAlphabet]));
	label->setFontSize(_labelFontSize);
	label->setFontName("fonts/BalooBhai-Regular.ttf");


	//label->setPosition(Vec2(visibleSize.width * 0.079, visibleSize.height * 0.05));
	label->setAnchorPoint(Vec2(0.5, 0.5));
	/*
	switch (numberPicker) {
	case 0:label->setTextColor(Color4B::BLUE); break;
	case 1:label->setTextColor(Color4B::GREEN); break;
	case 2:label->setTextColor(Color4B::RED); break;
	case 3:label->setTextColor(Color4B::YELLOW); break;
	}
	*/
	//label->setScaleX(0.5);
	label->setTextColor(Color4B::BLACK);
	_randomPlaces[_currentAlphabet]->addChild(label);

	//end of label adding

}


bool AlphaArrange::onTouchBegan(Touch* touch, Event* event) {

	
	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
	
	Rect rect = CCRectMake(target->getPositionX() - (185 / 2), target->getPositionY() - (185 / 2), target->getContentSize().width, target->getContentSize().height);
	
	if (rect.containsPoint(locationInNode) && enableTouch)
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

		//auto toyRect = target->getBoundingBox();

		Rect toyRect = CCRectMake(target->getPositionX() - (185 / 2), target->getPositionY() - (185 / 2), target->getContentSize().width, target->getContentSize().height);


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


void AlphaArrange::createLevel(int level) {

	if (lang == "swa") {
		int levelOneFixedIndexesSwa[] = {1,2,3,4,5,8,9,10,11,12,14,15,17,19,21,22};
		int levelTwoFixedIndexesSwa[] = { 1,2,10,12,15,17,13,22};
		if (_menuContext->getCurrentLevel() == 1) {
			matches = 16;
			for (int i = 0; i < matches; i++) {

				auto solidNode = _randomPlaces[levelOneFixedIndexesSwa[i]];
				std::string nodeName = solidNode->getName();
				auto transNode = _english->getChildByName(nodeName.substr(0, 1));

				solidNode->setPosition(transNode->getPosition());
				solidNode->setAnchorPoint(transNode->getAnchorPoint());

				Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_randomPlaces[levelOneFixedIndexesSwa[i]]);

			}

		}else{
			matches = 8;

			for (int i = 0; i < matches; i++) {

				auto solidNode = _randomPlaces[levelTwoFixedIndexesSwa[i]];
				std::string nodeName = solidNode->getName();
				auto transNode = _english->getChildByName(nodeName.substr(0, 1));

				solidNode->setPosition(transNode->getPosition());
				solidNode->setAnchorPoint(transNode->getAnchorPoint());

				Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_randomPlaces[levelTwoFixedIndexesSwa[i]]);

			}
		}
	}
	if (lang == "eng") {
		int levelOneFixedIndexesEng[] = { 1,2,3,4,5,8,9,10,11,12,14,15,17,19,21,22,23,25};
		int levelTwoFixedIndexesEng[] = { 1,2,10,12,14,15,21,22,23,25 };

		if (_menuContext->getCurrentLevel() == 1) {
			matches = 18;

			for (int i = 0; i < matches; i++) {

				auto solidNode = _randomPlaces[levelOneFixedIndexesEng[i]];
				std::string nodeName = solidNode->getName();
				auto transNode = _english->getChildByName(nodeName.substr(0, 1));

				solidNode->setPosition(transNode->getPosition());
				solidNode->setAnchorPoint(transNode->getAnchorPoint());

				Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_randomPlaces[levelOneFixedIndexesEng[i]]);

			}
		}
		else {
			matches = 10;

			for (int i = 0; i < matches; i++) {

				auto solidNode = _randomPlaces[levelTwoFixedIndexesEng[i]];
				std::string nodeName = solidNode->getName();
				auto transNode = _english->getChildByName(nodeName.substr(0, 1));

				solidNode->setPosition(transNode->getPosition());
				solidNode->setAnchorPoint(transNode->getAnchorPoint());

				Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_randomPlaces[levelTwoFixedIndexesEng[i]]);

			}
		}
	}
	
	

}