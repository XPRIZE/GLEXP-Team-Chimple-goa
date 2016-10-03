#include "Talk.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include <sstream>

USING_NS_CC;

Talk::Talk() {
}

Talk::~Talk() {
}

Scene* Talk::createScene()
{
	auto scene = Scene::create();
	auto layer = Talk::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Talk::gameName());
    scene->addChild(layer->_menuContext);

	return scene;
}

bool Talk::init()
{
	if (!Layer::init())
	{
		return false;
	}

	flag = true;

	visibleSize = Director::getInstance()->getWinSize();

	std::vector<std::string> scene = { "island", "superhero" , "farm" };

	sceneName = "island";

	if (sceneName == "island")
	{
		Talkbg = (Node *)CSLoader::createNode("talkisland/talkisland.csb");
	}

	this->addChild(Talkbg);

//	Talk::generateWord();
	
	return true;
}

void Talk::generateWord()
{
}

void Talk::wordShow(LabelTTF *_wordLabel)
{
}

void Talk::addEvents(struct LabelDetails sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, size.width, size.height);

		if (rect.containsPoint(locationInNode))
		{
			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite.container);
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), sprite.label);
}

void Talk::wordLabelAnim(struct LabelDetails sprite)
{
}

void Talk::afterAnimation(struct LabelDetails sprite)
{
}