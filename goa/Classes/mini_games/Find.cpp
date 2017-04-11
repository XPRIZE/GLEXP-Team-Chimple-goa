#include "Find.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;
USING_NS_CC;

Scene* Find::createScene()
{ 
	auto scene = Scene::create();
	auto layer = Find::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Find::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Find::onEnterTransitionDidFinish()
{
	
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("find/find.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	auto findBackground = CSLoader::createNode("find/find.csb");
	this->addChild(findBackground, 0);
	findBackground->setName("bg");

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		findBackground->setPositionX(myGameWidth);
	}
	
	Vector <Node*> children = findBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node *monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		if (str.find("Node_") == 0)
			_nodeBin.push_back(monsterItem);
		CCLOG("name : %s", str.c_str());
	}

	Sprite *textHolder = (Sprite*)findBackground->getChildByName("board_24");
	textHolder->setName("textHolder");

	LabelTTF *label = CommonLabelTTF::create("FIND", "Helvetica", 90);
	label->setPosition(Vec2(visibleSize.width/2, textHolder->getPositionY()));
	this->addChild(label, 3);

	label->setName("spell");


	for (int j = 0; j < _nodeBin.size(); j++)
	{
		Sprite* temp = Sprite::create("find/boxy.png");
		setAllSpriteProperties(temp, 0, _nodeBin[j]->getPositionX(), _nodeBin[j]->getPositionY(), true, 0.5, 0.5, 0, 0.001, 0.001);
		this->addChild(temp, 0);
		temp->setName(StringandIntConcat("object",(j+1)));
		addTouchEvents(temp);
		_propsBin.push_back(temp);

		/*auto a = temp->getPositionX() - (temp->getContentSize().width / 2)*0.5;
		auto b = temp->getPositionY() - (temp->getContentSize().height / 2)*0.5;
		auto E = DrawNode::create();
		this->addChild(E, 10);
		E->drawRect(Vec2(a, b),
			Vec2(a + temp->getContentSize().width*0.5, b + temp->getContentSize().height*0.5),
			Color4F(0, 0, 255, 22));*/

	}
	vector<int> randomIndex;
	while (randomIndex.size() != _propsBin.size()) {
		bool duplicateCheck = true;
		int size = _propsBin.size()-1;
		int numberPicker = RandomHelper::random_int(0, size);
		for (int i = 0; i < randomIndex.size(); i++) {
			if(numberPicker == randomIndex[i])
				duplicateCheck = false;
		}
		if (duplicateCheck)
			randomIndex.push_back(numberPicker);
	}
	float delay = 0;
	int counter = 0;
	for (int i = 0; i < randomIndex.size(); i++)
	{
		this->runAction(Sequence::create(DelayTime::create(delay), CCCallFunc::create([=] {
			auto scaleTo = ScaleTo::create(3, 0.5);
			EaseElasticOut *easeAction = EaseElasticOut::create(scaleTo);
			_propsBin[randomIndex[i]]->runAction(easeAction);
		}),NULL));
		
		delay = delay + 0.5;
		counter++;
	}
	this->runAction(Sequence::create(DelayTime::create(delay), CCCallFunc::create([=] {_touchFlag = true;
	if (gameCurrentLevel == 1 && _helpFlag)
	{
		_helpFlag = false;
		auto a = _propsBin[0]->getPositionX();// - (_propsBin[0]->getContentSize().width / 2)*0.5;
		auto b = _propsBin[0]->getPositionY();// -(_propsBin[0]->getContentSize().height / 2)*0.5;;

		auto c = textHolder->getPositionX();// -_balloonsBin[6]->getChildByName("Sprite_1")->getContentSize().width / 2 * 0.7;
		auto d = textHolder->getPositionY();// -_balloonsBin[0]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.35;

		_help = HelpLayer::create(Rect(a, b, _propsBin[0]->getContentSize().width*0.5
			, _propsBin[0]->getContentSize().height*0.5),
			Rect(c, d, textHolder->getContentSize().width, textHolder->getContentSize().height));
		_help->click(Vec2(c, d));
		this->addChild(_help, 5);
	}
	}), NULL));
	
	

	this->scheduleUpdate();


}

string Find::StringandIntConcat(string data, int number) {

	std::ostringstream value;
	value << data << number;
	return value.str();
}

Find::Find()
{
}

Find::~Find()
{
}

void Find::update(float dt)
{
}

void Find::addTouchEvents(Sprite* sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	auto displayText = (LabelTTF*)this->getChildByName("spell");
	string str = displayText->getString();

	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = event->getCurrentTarget();
		if (target->getBoundingBox().containsPoint(touch->getLocation()) && _touchFlag) {
			
			if (_menuContext->getCurrentLevel() == 1 && !_helpFlag)
			{
				_helpFlag = true;
				this->removeChild(_help);
			}

			displayText->setString(target->getName());

			string textOriginal = this->getChildByName("spell")->getName();
			CCLOG("TOUCHED OBJECT : %s", target->getName().c_str());
			if (!target->getName().compare("object5"))
			{
				
				auto *funcAct = CCCallFunc::create([=] {
					ScaleTo *scaleTo = ScaleTo::create(1.2, 0.0001);
					EaseElasticIn *easeAction = EaseElasticIn::create(scaleTo);
					target->runAction(easeAction);
				});

				auto *func = CCCallFunc::create([=] {
					for (auto it = _propsBin.begin(); it != _propsBin.end(); it++)
					{
						Sprite *temp = *it;
						Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(temp);
					}});

				auto *funcMove= CCCallFunc::create([=] {
					for (auto it = _propsBin.begin(); it != _propsBin.end(); it++)
					{
						Sprite *temp = *it;
						if (temp->getName().compare("object5"))
						{
							MoveTo *scaleTo = MoveTo::create(1,Vec2(-300, temp->getPositionY()));
							EaseBackIn *easeAction = EaseBackIn::create(scaleTo);
							temp->runAction(easeAction);
						}
					}});
				auto *deleteMove = CCCallFunc::create([=] {
					Vector <Node*> children = this->getChildren();
					for (auto it = children.begin(); it != children.end(); ++it)
					{
						auto *obj = *it;
						string str = obj->getName();
						if (!str.find("object"))
							this->removeChild(obj);
					}
					});
				this->runAction(Sequence::create(func,funcAct,DelayTime::create(1.5),funcMove,DelayTime::create(1.5), deleteMove, NULL));
			
			}
			else
			{
				shake(target);
			}
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{

	};
	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		displayText->setString(str);
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite);
}

void Find::shake(Node *sprite)
{
	auto act_1 = MoveBy::create(0.1, Vec2(10, 0));
	auto act_2 = MoveBy::create(0.1, Vec2(0, -10));
	auto act_3 = MoveBy::create(0.1, Vec2(0, 10));
	auto act_4 = MoveBy::create(0.1, Vec2(-10, 0));

	sprite->runAction(Sequence::create(act_1, act_2, act_3, act_4, NULL));

}

void Find::setAllSpriteProperties(Sprite* sprite, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY)
{
	sprite->setPosition(Vec2(posX, posY));
	sprite->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	sprite->setScaleX(scaleX);
	sprite->setScaleY(scaleY);
	sprite->setVisible(visibility);
	sprite->setRotation(rotation);
}

LabelTTF* Find::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
{
	auto label = CommonLabelTTF::create(letterString, "Helvetica", labelSizeInPixel);
	label->setPosition(Vec2(posX, posY));
	label->setVisible(visibility);
	label->setAnchorPoint(Vec2(anchorPointX, anchorPointY));
	label->setRotation(rotation);
	label->setName(letterString);
	label->setScaleX(scaleX);
	label->setScaleY(scaleY);
	return label;
}

