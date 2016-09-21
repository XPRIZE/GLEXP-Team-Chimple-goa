#include "Stack.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Stack::Stack() {

}

Stack::~Stack() {

}


Scene* Stack::createScene()
{
	auto scene = Scene::create();
	auto layer = Stack::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Stack::gameName());
    scene->addChild(layer->_menuContext);

	return scene;
}

bool Stack::init()
{
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	auto stackbg = CSLoader::createNode("stack/stack.csb");
	stackbg->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	stackbg->setAnchorPoint(Vec2(.5, .5));
	this->addChild(stackbg);

	auto secondChild = stackbg->getChildren().at(1);


	_containerbar1 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar1"));
	_containerbar1->setPercent(0);

	_containerbar2 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar2"));
	_containerbar2->setPercent(0);

	_containerbar3 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar3"));
	_containerbar3->setPercent(0);

	_containerbar4 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar4"));
	_containerbar4->setPercent(0);

	_containerbar5 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("containerbar5"));
	_containerbar5->setPercent(0);

	_fillpipebar1 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar1"));
	_fillpipebar1->setPercent(0);

	_fillpipebar2 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar2"));
	_fillpipebar2->setPercent(0);

	_fillpipebar3 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar3"));
	_fillpipebar3->setPercent(0);

	_fillpipebar4 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar4"));
	_fillpipebar4->setPercent(0);

	_fillpipebar5 = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("fillpipebar5"));
	_fillpipebar5->setPercent(0);

	_suckpipebar = (cocos2d::ui::LoadingBar*) (secondChild->getChildByName("suckpipebar"));
	_suckpipebar->setPercent(0);

	return true;
}

