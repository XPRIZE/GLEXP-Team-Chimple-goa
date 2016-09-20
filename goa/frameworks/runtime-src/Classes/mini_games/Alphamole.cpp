//
//  Alphamole.cpp (whack a mole)
//  goa
//
//  13/09/16
//
//



#include "Alphamole.h"
#include "AlphamoleLevel.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../alphamon/Alphamon.h"
#include "../puzzle/CharGenerator.h"
#include "../lang/LangUtil.h"

USING_NS_CC;

Alphamole::Alphamole()
{
}

Alphamole::~Alphamole()
{
	_mainChar = nullptr;
	_eventDispatcher->removeCustomEventListeners("alphabet_selected");
	_eventDispatcher->removeCustomEventListeners("alphabet_unselected");
}

Alphamole * Alphamole::create(wchar_t letter)
{
	Alphamole* alphamonFeedLayer = new (std::nothrow) Alphamole();
	if (alphamonFeedLayer && alphamonFeedLayer->init(letter)) {
		alphamonFeedLayer->autorelease();
		return alphamonFeedLayer;
	}
	CC_SAFE_DELETE(alphamonFeedLayer);
	return nullptr;
}

cocos2d::Scene * Alphamole::createScene(wchar_t letter)
{
	auto scene = cocos2d::Scene::create();
	auto layer = Alphamole::create(letter);
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "alphamole");
	scene->addChild(layer->menu);
	return scene;
}

bool Alphamole::init(wchar_t letter)
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	_score = 0;
	_Xpos = 0.0f;
	_randomBackground = cocos2d::RandomHelper::random_int(0, 4);
	std::vector<std::string> background = { "alphamole1_background", "alphamole2_background", "alphamole3_background", "alphamole4_background", "alphamole5_background" };
	std::vector<std::string> foreground = { "alphamole1_foreground", "alphamole2_foreground", "alphamole3_foreground", "alphamole4_foreground", "alphamole5_foreground" };
	_background = CSLoader::createNode("alphamole/"+ background.at(_randomBackground)+".csb");
	if (visibleSize.width > 2560) {
		_Xpos = (visibleSize.width - 2560) / 2;
		_background->setPositionX(_Xpos);
	}
	this->addChild(_background);

	auto scoreBord = _background->getChildByName("score_1");
	float x = scoreBord->getPositionX();
	scoreBord->setPositionX(x - _Xpos);


	/*auto children = _background->getChildren();

	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node * monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("children = %s", str.c_str());
	}*/
	_mychar = letter;
	_mainChar = Alphamon::createWithAlphabet(_mychar);
	_mainChar->setScaleX(0.5);
	_mainChar->setScaleY(0.5);
	_mainChar->setPositionX(visibleSize.width / 2);
	_mainChar->setPositionY(visibleSize.height / 1.2);
	this->addChild(_mainChar);
	_mainChar->enableTouch(false);

	_alphabetLayer = Layer::create();
	this->addChild(_alphabetLayer);
	if (_randomBackground != 1) {
		auto front = CSLoader::createNode("alphamole/" + foreground.at(_randomBackground) + ".csb");
		if (visibleSize.width > 2560) {
			front->setPositionX(_Xpos);
		}
		this->addChild(front);
	}
	

	std::stringstream ss;
	ss << _score;
	std::string str = ss.str();
	_score_label = Label::createWithSystemFont("  Score: " + str, "Arial", 90);
	/*_score_label->setPositionX(20);
	_score_label->setPositionY(visibleSize.height - _score_label->getContentSize().height/2);*/
	_score_label->setAnchorPoint(Vec2(0, 0));
	_score_label->setColor(ccc3(0, 0, 0));
	scoreBord->addChild(_score_label);

	//_mainChar = mainChar;
	/*Play2_Hole_Close_9
		children = Play2_Hole_Close_9_0
		children = Play2_Hole_Close_9_1
		Play2_Hole_Open_11_1
children = Play2_Hole_Open_11_0
children = Play2_Hole_Open_11*/

	setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(Alphamole::startGame, this));
	return true;


}

void Alphamole::startGame()
{
	menu->showStartupHelp(CC_CALLBACK_0(Alphamole::jumpAlphabet, this));
}

void Alphamole::jumpAlphabet()
{
	if (_randomBackground == 1) {
		this->schedule(schedule_selector(Alphamole::leafOpen), 2);
	} else{
		this->schedule(schedule_selector(Alphamole::showAlpha), 2);
	}
}

void Alphamole::showAlpha(float ft)
{
	if (_score == 5) {
		_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
		menu->showScore();
		this->unschedule(schedule_selector(Alphamole::showAlpha));
	} else {
		auto jumpAlphaArray = CharGenerator::getInstance()->generateMatrixForChoosingAChar(_mychar, 6, 1, 50);
		auto str = jumpAlphaArray.at(cocos2d::RandomHelper::random_int(0, 5)).at(0);
		_monsterReff = Alphamon::createWithAlphabet(str);
		std::vector<std::string> holes = { "hole1", "hole2", "hole3" };
		auto child = _background->getChildByName(holes.at(cocos2d::RandomHelper::random_int(0, 2)));
		float x = child->getPositionX();
		float y = child->getPositionY();
		_monsterReff->setPositionX(x + _Xpos);
		_monsterReff->setPositionY(y - 600);
		if (LangUtil::getInstance()->getLang() == "kan") {
			_monsterReff->setScaleX(0.65);
			_monsterReff->setScaleY(0.65);
		}
		else {
			_monsterReff->setScaleX(0.85);
			_monsterReff->setScaleY(0.85);
		}
		_alphabetLayer->addChild(_monsterReff);
		_monsterReff->blinkAction();
		auto jump = JumpBy::create(1.5, Vec2(0, 0), 750, 1);

		_monsterReff->runAction(Sequence::create(jump, CallFunc::create([=]() {
			_alphabetLayer->removeChild(_monsterReff); }), NULL));

		_eventDispatcher->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(Alphamole::onAlphabetSelect, this));
	}
	
}

void Alphamole::leafOpen(float ft)
{
	if (_score == 5) {
		_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
		menu->showScore();
		this->unschedule(schedule_selector(Alphamole::leafOpen));
	} else {
		std::vector<std::string> open_leaf_name = { "Play2_Hole_Open_11", "Play2_Hole_Open_11_0", "Play2_Hole_Open_11_1" };
		std::vector<std::string> close_leaf_name = { "Play2_Hole_Close_9", "Play2_Hole_Close_9_0", "Play2_Hole_Close_9_1" };
		int random_leaf = cocos2d::RandomHelper::random_int(0, 2);
		auto jumpAlphaArray = CharGenerator::getInstance()->generateMatrixForChoosingAChar(_mychar, 6, 1, 50);
		auto str = jumpAlphaArray.at(cocos2d::RandomHelper::random_int(0, 5)).at(0);
		_monsterReff = Alphamon::createWithAlphabet(str);
		_leaf_openRff = _background->getChildByName(open_leaf_name.at(random_leaf).c_str());
		_leaf_openRff->setVisible(true);
		_leaf_closeRff = _background->getChildByName(close_leaf_name.at(random_leaf).c_str());
		_leaf_closeRff->setVisible(false);
		_monsterReff->setPositionX(_leaf_closeRff->getPositionX() + _Xpos);
		_monsterReff->setPositionY(_leaf_closeRff->getPositionY() - 75);
		if (LangUtil::getInstance()->getLang() == "kan") {
			_monsterReff->setScaleX(0.65);
			_monsterReff->setScaleY(0.65);
		}
		else {
			_monsterReff->setScaleX(0.85);
			_monsterReff->setScaleY(0.85);
		}
		_alphabetLayer->addChild(_monsterReff);
		_monsterReff->blinkAction();
		_eventDispatcher->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(Alphamole::onAlphabetSelect, this));
		this->scheduleOnce(schedule_selector(Alphamole::leafClose), 1.5);
	}
	
}

void Alphamole::leafClose(float ft)
{
	_leaf_openRff->setVisible(false);
	_leaf_closeRff->setVisible(true);
	_alphabetLayer->removeChild(_monsterReff);
}

void Alphamole::onAlphabetSelect(EventCustom *event) {
	wchar_t* buf1 = static_cast<wchar_t*>(event->getUserData());
	auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
	auto path = LangUtil::getInstance()->getAlphabetSoundFileName(buf1[0]);
	audio->playEffect(path.c_str(), false);
	menu->pickAlphabet(_mychar, buf1[0], true);
	CCLOG("touched letter");
	if (_mychar == buf1[0]) {
		_score++;
		CCLOG("right = %d",_score);
		std::stringstream ss;
		ss << _score;
		std::string str = ss.str();
		_mainChar->alphamonEyeAnimation("angry2", false);
		_score_label->setString("  Score: " + str);
	}else{
		CCLOG("wrong");
		_mainChar->alphamonMouthAnimation("spit", false);
		_mainChar->alphamonEyeAnimation("angry1", false);
		auto animation = _mainChar->shakeAction();
		_mainChar->runAction(animation);
	}
	
	_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
	
}

void Alphamole::onExitTransitionDidStart() {
	Node::onExitTransitionDidStart();
	_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
}

