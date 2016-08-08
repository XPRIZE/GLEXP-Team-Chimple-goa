#include "Jasmin_Listenerfile.h"

USING_NS_CC;

Jasmin_Listenerfile::Jasmin_Listenerfile()
{
}

Jasmin_Listenerfile::~Jasmin_Listenerfile()
{
}

Jasmin_Listenerfile* Jasmin_Listenerfile::createSprite(std::string fileName, float x, float y, char id, Jasmin_Mainfile *callerObject)
{
	Jasmin_Listenerfile *sprite = new Jasmin_Listenerfile();

	if (sprite->initWithSpriteFrameName(fileName))
	{
		sprite->setPosition(x, y);
		sprite->id = id;
		sprite->xP = x;
		sprite->yP = y;
		sprite->flag = 0;
		sprite->addEvent(callerObject);

		return sprite;
	}
	CC_SAFE_DELETE(sprite);
	return NULL;
}

void Jasmin_Listenerfile::addEvent(Jasmin_Mainfile *callerObject)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*> (event->getCurrentTarget());
		Point locationNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);

		if (rect.containsPoint(locationNode))
		{
			return true;
		}

		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, this);
}