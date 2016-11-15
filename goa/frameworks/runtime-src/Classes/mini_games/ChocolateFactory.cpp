#include "ChocolateFactory.h"
#include "../menu/HelpLayer.h"

USING_NS_CC;

Scene* ChocolateFactory::createScene()
{
	auto scene = Scene::create();
	auto layer = ChocolateFactory::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, ChocolateFactory::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void ChocolateFactory::onEnterTransitionDidFinish()
{
	int gameCurrentLevel = _menuContext->getCurrentLevel();
	//std::pair<int, int> levelKeyNumber = levelAllInfo(gameCurrentLevel, 5, 3, 5, 3);
	_dropCurrentTheme ="drophero";

	if (!_dropCurrentTheme.compare("dropjungle"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("dropjungle/dropjungle.plist");
	}
	else if (!_dropCurrentTheme.compare("drophero"))
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("chocolatefactory/chocolatefactory.plist");
	}
	else
	{
		CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
		framecache1->addSpriteFramesWithFile("drophero/dropcity.plist");
	}
	// BackGround
	auto chocolatefactoryBackground = CSLoader::createNode("chocolatefactory/chocolatefactory.csb");
	this->addChild(chocolatefactoryBackground, 0);

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		chocolatefactoryBackground->setPositionX(myGameWidth);
	}

	Vector <Node*> children = chocolatefactoryBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
	Node * monsterItem = *item;
	std::string str = monsterItem->getName().c_str();
	CCLOG("name : %s", str.c_str());
	}
	
	cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline("chocolatefactory/conveyor.csb");
	auto conveyor = chocolatefactoryBackground->getChildByName("conveyor");
	conveyor->runAction(timeline);
	timeline->gotoFrameAndPlay(0, true);

	Sprite* dummyBox = Sprite::createWithSpriteFrameName("chocolatefactory/boxfront.png");

	for (int i=0; i<4; i++)
	{
		auto a = dummyBox->getContentSize().width;
		std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData1 = setAnimationAndProperties("chocolatefactory/box.csb",-visibleSize.width*.13, (534.75), (534.75), 1);
		_boxBin.push_back(animationData1.first);
		rightFloat(animationData1.first,10,(visibleSize.width*.13 + i*dummyBox->getContentSize().width*.735),534.75);
	}




	/*std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData1 = setAnimationAndProperties("chocolatefactory/box.csb", (visibleSize.width*),(534.75), 1);
	Sprite* box1 = animationData1.first;

	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData2 = setAnimationAndProperties("chocolatefactory/box.csb", (620.36), (534.75), 1);
	Sprite* box2 = animationData2.first;

	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData3 = setAnimationAndProperties("chocolatefactory/box.csb", (971.8), (534.75), 1);
	Sprite* box3 = animationData3.first;

	std::pair<Sprite*, cocostudio::timeline::ActionTimeline*>animationData4 = setAnimationAndProperties("chocolatefactory/box.csb", (1322.75), (534.75), 1);
	Sprite* box4 = animationData4.first;
	*/


}

ChocolateFactory::~ChocolateFactory()
{
}

void ChocolateFactory::update(float)
{
}
void ChocolateFactory::rightFloat(Sprite* floatingObj, int time, float positionX, float positionY)
{
	floatingObj->runAction(MoveTo::create(time, Vec2(positionX, positionY)));
}
void ChocolateFactory::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX + origin.x, posY + origin.y));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}

LabelTTF* ChocolateFactory::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
{
	auto label = LabelTTF::create(letterString, "Helvetica", labelSizeInPixel);
	label->setPosition(Vec2(posX, posY));
	label->setVisible(visibility);
	label->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	label->setRotation(rotation);
	label->setName(letterString);
	label->setScaleX(scaleX);
	label->setScaleY(scaleY);
	return label;
}
std::pair<Sprite*, cocostudio::timeline::ActionTimeline*> ChocolateFactory::setAnimationAndProperties(std::string csbString, float posX, float posY, int zOrder)
{
	cocostudio::timeline::ActionTimeline* timeline = CSLoader::createTimeline(csbString);
	Sprite* sprite = (Sprite *)CSLoader::createNode(csbString);
	sprite->setPosition(Vec2(posX, posY));
	sprite->runAction(timeline);
	this->addChild(sprite, zOrder);
	return std::make_pair(sprite, timeline);
}


