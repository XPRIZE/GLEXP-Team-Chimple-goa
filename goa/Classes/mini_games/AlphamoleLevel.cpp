//
//  AlphamoleLevel.cpp (whack a mole)
//  goa
//
//  13/09/16
//
//



#include "AlphamoleLevel.h"
#include "Alphamole.h"
#include "../alphamon/Alphamon.h"
#include "../lang/LangUtil.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../puzzle/CharGenerator.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

static const int ALPHA_WIDTH = 400;
static const float HEIGHT_FACTOR = 1.0;
cocos2d::Scene * AlphamoleLevel::createScene()
{
	auto scene = Scene::create();
	auto layer = AlphamoleLevel::create();
	scene->addChild(layer);
	return scene;
}

void AlphamoleLevel::onAlphabetSelected(EventCustom *event) {
//	wchar_t* buf = static_cast<wchar_t*>(event->getUserData());
	_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
	_eventDispatcher->removeCustomEventListeners("alphabet_unselected");
	//Director::getInstance()->replaceScene(TransitionFade::create(2.0, Alphamole::createScene(buf[0])));
}

AlphamoleLevel::AlphamoleLevel()
{
}

AlphamoleLevel::~AlphamoleLevel()
{
	_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
	_eventDispatcher->removeCustomEventListeners("alphabet_unselected");
}


bool AlphamoleLevel::init() {
	if (!ScrollView::init())
	{
		return false;
	}
	_eventDispatcher->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(AlphamoleLevel::onAlphabetSelected, this));

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto bg = CSLoader::createNode("alphamole/alphamolelevel.csb");
	//addChild(bg);

	_layer = Layer::create();
	int count = 0;
	int totalNumRows = 0;
	const int numChars = LangUtil::getInstance()->getNumberOfCharacters();
	auto vec = LangUtil::getInstance()->getNumCharsInRows();
	auto allChars = LangUtil::getInstance()->getAllCharacters();
	const int numCols = visibleSize.width / ALPHA_WIDTH;
	for (auto it = vec.begin(); it != vec.end(); ++it) {
		int numRows = ceil((float)*it / numCols);
		int countInRow = 0;
		for (int i = 0; i < numRows; i++) {
			for (int j = 0; j < numCols; j++) {
                auto alphamon = Alphamon::createWithAlphabet(LangUtil::convertUTF16CharToString(allChars[count]));
				alphamon->setPosition(Vec2(origin.x + visibleSize.width * (j + 0.5) / numCols, -ALPHA_WIDTH * (totalNumRows + 0.75) * HEIGHT_FACTOR));
				alphamon->setScale(0.5);
				_layer->addChild(alphamon);
				count++;
				if (++countInRow >= *it) {
					totalNumRows++;
					goto rowEnd;
				}
			}
			totalNumRows++;
		}
	rowEnd:;
	}
	_layer->setContentSize(Size(visibleSize.width, totalNumRows * ALPHA_WIDTH * HEIGHT_FACTOR));
	_layer->setPosition(Vec2(0, totalNumRows * ALPHA_WIDTH * HEIGHT_FACTOR));
	addChild(_layer);
	setContentSize(visibleSize);
	setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
	setInnerContainerSize(_layer->getContentSize());
	setBackGroundColorType(cocos2d::ui::Layout::BackGroundColorType::GRADIENT);
	setBackGroundColor(Color3B(120, 178, 234), Color3B::WHITE);
	return true;
}

void AlphamoleLevel::onExitTransitionDidStart() {
	Node::onExitTransitionDidStart();
	_eventDispatcher->removeCustomEventListeners("alphamon_pressed");
}

void AlphamoleLevel::onEnterTransitionDidFinish() {
	Node::onEnterTransitionDidFinish();
	_eventDispatcher->addCustomEventListener("alphamon_pressed", CC_CALLBACK_1(AlphamoleLevel::onAlphabetSelected, this));
}
