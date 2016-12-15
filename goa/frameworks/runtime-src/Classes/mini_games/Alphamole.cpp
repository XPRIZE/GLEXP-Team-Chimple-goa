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
#include "../menu/HelpLayer.h"

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

Alphamole * Alphamole::create()
{
	Alphamole* alphamonFeedLayer = new (std::nothrow) Alphamole();
	if (alphamonFeedLayer && alphamonFeedLayer->init()) {
		alphamonFeedLayer->autorelease();
		return alphamonFeedLayer;
	}
	CC_SAFE_DELETE(alphamonFeedLayer);
	return nullptr;
}

cocos2d::Scene * Alphamole::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = Alphamole::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "alphamole");
	scene->addChild(layer->menu);
	return scene;
}

bool Alphamole::init()
{

	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	_score = 0;
	_Xpos = 0.0f;


	setonEnterTransitionDidFinishCallback(CC_CALLBACK_0(Alphamole::startGame, this));
	return true;


}

void Alphamole::startGame()
{
	menu->setMaxPoints(5);
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_randomBackground = (menu->getCurrentLevel() -1) % 5;

	//_randomBackground = cocos2d::RandomHelper::random_int(0, 4);
	std::vector<std::string> background = { "alphamole1_background", "alphamole2_background", "alphamole3_background", "alphamole4_background", "alphamole5_background" };
	std::vector<std::string> foreground = { "alphamole1_foreground", "alphamole2_foreground", "alphamole3_foreground", "alphamole4_foreground", "alphamole5_foreground" };
	_background = CSLoader::createNode("alphamole/" + background.at(_randomBackground) + ".csb");
	if (visibleSize.width > 2560) {
		_Xpos = (visibleSize.width - 2560) / 2;
		_background->setPositionX(_Xpos);
	}
	this->addChild(_background);

	auto scoreBord = _background->getChildByName("score_1");
	float x = scoreBord->getPositionX();
	scoreBord->setPositionX(x - _Xpos);
	scoreBord->setVisible(false);

	/*auto children = _background->getChildren();

	for (auto item = children.rbegin(); item != children.rend(); ++item) {
	Node * monsterItem = *item;
	std::string str = monsterItem->getName().c_str();
	CCLOG("children = %s", str.c_str());
	}*/

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


	if ((menu->getCurrentLevel() > LangUtil::getInstance()->getNumberOfCharacters()) && LangUtil::getInstance()->getLang() == "swa") {
		int randomNumber = cocos2d::RandomHelper::random_int(0, LangUtil::getInstance()->getNumberOfCharacters() - 1);
		_mychar = LangUtil::getInstance()->getAllCharacters()[randomNumber];//_crossTheBridgeLevelMapping.at(_gameCurrentLevel);
	}
	else {
		_mychar = LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1];
	}
	//_mychar = LangUtil::getInstance()->getAllCharacters()[menu->getCurrentLevel() - 1];
	_mainChar = Alphamon::createWithAlphabet(_mychar);
	_mainChar->setScaleX(0.5);
	_mainChar->setScaleY(0.5);
	_mainChar->setPositionX(visibleSize.width * 0.1);
	_mainChar->setPositionY(visibleSize.height / 1.3);
	this->addChild(_mainChar);
	_mainChar->enableTouch(false);
	menu->showStartupHelp(CC_CALLBACK_0(Alphamole::jumpAlphabet, this));
}

void Alphamole::jumpAlphabet()
{
	if (_randomBackground == 1) {
		this->schedule(schedule_selector(Alphamole::leafOpen), 2);
	} else{
		this->schedule(schedule_selector(Alphamole::showAlpha), 2.5);
	}
}

void Alphamole::showAlpha(float ft)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	if (_score == 5) {
		_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
		menu->showScore();
		this->unschedule(schedule_selector(Alphamole::showAlpha));
	} else {
		auto jumpAlphaArray = CharGenerator::getInstance()->generateMatrixForChoosingAChar(_mychar, 6, 1, 50);
		auto str = jumpAlphaArray.at(cocos2d::RandomHelper::random_int(0, 5)).at(0);
		
		std::vector<std::string> holes = { "hole1", "hole3", "hole2" };
		auto child = _background->getChildByName(holes.at(cocos2d::RandomHelper::random_int(0, 2)));
		
		CCParticleSystemQuad *_particle = CCParticleSystemQuad::create("alphamole/animation.plist");
		_particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("alphamole/animation.png"));
		

		if (menu->getCurrentLevel() == 1 && _score == 0) {
			str = _mychar;
			_helpLayer = true;
			child = _background->getChildByName(holes.at(cocos2d::RandomHelper::random_int(0, 1)));
			auto help = HelpLayer::create(Rect(child->getPositionX() + _Xpos, child->getPositionY() + 300, 600, 800), Rect(visibleSize.width* 0.1, visibleSize.height/1.2, 400, 400));
			help->click(Vec2(child->getPositionX() + _Xpos, child->getPositionY() + 300));
			help->setName("helpLayer");
			this->addChild(help);
		    
		}
		_particle->setPosition(Vec2(child->getPositionX() + _Xpos, child->getPositionY()));
		_alphabetLayer->addChild(_particle);
		_monsterReff = Alphamon::createWithAlphabet(str);
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
		auto moveup = MoveBy::create(0.75, Vec2(0, 750));
		auto moveDown = MoveBy::create(0.75, Vec2(0, -750));
		
		_monsterReff->runAction(Sequence::create(moveup,DelayTime::create(0.5),moveDown, CallFunc::create([=]() {
			if (_helpLayer) {
				//auto help = this->getChildByName("helpLayer");
				this->removeChildByName("helpLayer");
				_helpLayer = false;
			}
			_alphabetLayer->removeChild(_monsterReff); }), NULL));

		_eventDispatcher->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(Alphamole::onAlphabetSelect, this));
	}
	
}

void Alphamole::leafOpen(float ft)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
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
		
		_leaf_openRff = _background->getChildByName(open_leaf_name.at(random_leaf).c_str());
		_leaf_openRff->setVisible(true);
		_leaf_closeRff = _background->getChildByName(close_leaf_name.at(random_leaf).c_str());
		_leaf_closeRff->setVisible(false);
		
		if (menu->getCurrentLevel() == 1 && _score == 0) {
			str = _mychar;
			_helpLayer = true;
			auto help = HelpLayer::create(Rect(_leaf_closeRff->getPositionX(), _leaf_closeRff->getPositionY() + 300, 600, 600), Rect(visibleSize.width / 2, visibleSize.height / 1.1, 400, 400));
			help->click(Vec2(_leaf_closeRff->getPositionX(), _leaf_closeRff->getPositionY() + 300));
			help->setName("helpLayer");
			this->addChild(help);
		}
		_monsterReff = Alphamon::createWithAlphabet(str);
		
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
	if (_helpLayer) {
		//auto help = this->getChildByName("helpLayer");
		this->removeChildByName("helpLayer");
		_helpLayer = false;
	}
	_leaf_openRff->setVisible(false);
	_leaf_closeRff->setVisible(true);
	_alphabetLayer->removeChild(_monsterReff);
}

void Alphamole::onAlphabetSelect(EventCustom *event) {
	wchar_t* buf1 = static_cast<wchar_t*>(event->getUserData());
	auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
	auto path = LangUtil::getInstance()->getAlphabetSoundFileName(buf1[0]);
	audio->playEffect(path.c_str(), false);
	//menu->pickAlphabet(_mychar, buf1[0], true);
	CCLOG("touched letter");
	if (_mychar == buf1[0]) {
		_score++;
		menu->addPoints(1);
		CCLOG("right = %d",_score);
		std::stringstream ss;
		ss << _score;
		std::string str = ss.str();
		_mainChar->alphamonEyeAnimation("angry2", false);
		_score_label->setString("  Score: " + str);
	}else{
		CCLOG("wrong");
		menu->addPoints(-1);
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

