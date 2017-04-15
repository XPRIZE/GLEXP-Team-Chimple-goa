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

	_noOfWordStartFromInitial = RandomHelper::random_int(1, 6);
	_menuContext->setMaxPoints(_noOfWordStartFromInitial);
	_menuContext->addPoints(_noOfWordStartFromInitial);
	int chooseInitial = RandomHelper::random_int(1,10);

	_initial = TextGenerator::getInstance()->getInitialForLevel(chooseInitial);

	auto wordForInitial = TextGenerator::getInstance()->getWordsForInitial(chooseInitial, _noOfWordStartFromInitial);

	auto wordNotForInitial = TextGenerator::getInstance()->getWordsNotForInitial(chooseInitial, (8- _noOfWordStartFromInitial));

	std::map<std::string, std::string> newMap;

	newMap.insert(wordForInitial.begin(), wordForInitial.end());
	newMap.insert(wordNotForInitial.begin(), wordNotForInitial.end());

	for (std::map<std::string, std::string>::iterator it = newMap.begin(); it != newMap.end(); ++it)
	{
		_data_key.push_back(it->first);
	}

	for (std::map<std::string, std::string>::iterator it = newMap.begin(); it != newMap.end(); ++it)
	{
		_data_value.push_back(it->second);
	}

	Sprite *textHolder = (Sprite*)findBackground->getChildByName("board_24");
	textHolder->setName("textHolder");

	LabelTTF *label = CommonLabelTTF::create(_initial, "Helvetica", 90);
	label->setPosition(Vec2(visibleSize.width/2, textHolder->getPositionY()));
	this->addChild(label, 3);

	label->setName("spell");

	vector<int> randomIndex;
	while (randomIndex.size() != _data_key.size()) {
		bool duplicateCheck = true;
		int size = _data_key.size() - 1;
		int numberPicker = RandomHelper::random_int(0, size);
		for (int i = 0; i < randomIndex.size(); i++) {
			if (numberPicker == randomIndex[i])
				duplicateCheck = false;
		}
		if (duplicateCheck)
			randomIndex.push_back(numberPicker);
	}

	for (int j = 0; j < _nodeBin.size(); j++)
	{

		Sprite* temp = Sprite::create(_data_value[j]);
		setAllSpriteProperties(temp, 0, _nodeBin[randomIndex[j]]->getPositionX(), _nodeBin[randomIndex[j]]->getPositionY(), true, 0.5, 0.5, 0, 0.001, 0.001);
		this->addChild(temp, 0);
		temp->setName(_data_key[j]);
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
	
	float delay = 0;
	int counter = 0;
	for (int i = 0; i < randomIndex.size(); i++)
	{
		this->runAction(Sequence::create(DelayTime::create(delay), CCCallFunc::create([=] {
			auto scaleTo = ScaleTo::create(3, 1);
			EaseElasticOut *easeAction = EaseElasticOut::create(scaleTo);
			_propsBin[randomIndex[i]]->runAction(easeAction);
		}),NULL));
		
		delay = delay + 0.5;
		counter++;
	}
	this->runAction(Sequence::create(DelayTime::create(delay), CCCallFunc::create([=] {_touchStart = true;
	if (gameCurrentLevel == 1 && _helpFlag)
	{
		_helpFlag = false;
		Sprite *cloneSprite;
		for (int i = 0; i < _propsBin.size(); i++)
		{
			string name = _propsBin[i]->getName();
			if ( name[0] == _initial[0])
			{
				cloneSprite = _propsBin[i];
				break;
			}
		}
		auto a = cloneSprite->getPositionX();// -(_propsBin[0]->getContentSize().width / 2);
		auto b = cloneSprite->getPositionY();// -(_propsBin[0]->getContentSize().height / 2);

		auto c = textHolder->getPositionX();// -_balloonsBin[6]->getChildByName("Sprite_1")->getContentSize().width / 2 * 0.7;
		auto d = textHolder->getPositionY();// -_balloonsBin[0]->getChildByName("Sprite_1")->getContentSize().height / 2 * 0.35;

		_help = HelpLayer::create(Rect(a, b, cloneSprite->getContentSize().width
			, cloneSprite->getContentSize().height),
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
	//string str = displayText->getString();
	
	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = event->getCurrentTarget();
		if (target->getBoundingBox().containsPoint(touch->getLocation()) && _touchFlag && _touchStart) {
			
			_touchFlag = false;
			if (_menuContext->getCurrentLevel() == 1 && !_helpFlag)
			{
				_helpFlag = true;
				this->removeChild(_help);
			}

			//displayText->setString(target->getName());

			string textOriginal = this->getChildByName("spell")->getName();
			string name = target->getName();
			if(name[0] == _initial[0])
			{
				_itemCounter++;
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/success.ogg", false);

				for (auto it = _propsBin.begin(); it != _propsBin.end(); it++)
				{
					Sprite *temp = *it;
					if(!temp->getName().compare(target->getName()))
					Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(temp);
				}
				
				//Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(target);
				auto *funcAct = CCCallFunc::create([=] {
					
					ScaleTo *scaleTo = ScaleTo::create(1, 0.0001);
					EaseElasticIn *easeAction = EaseElasticIn::create(scaleTo);
					target->runAction(easeAction);
					//Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(target);
				});
				this->runAction(Sequence::create(funcAct, DelayTime::create(1), CCCallFunc::create([=] {_touchFlag = true; }), NULL));
			}
			else
			{
				auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
				audio->playEffect("sounds/sfx/error.ogg", false);
				_menuContext->addPoints(-1);
				shake(target);
				_touchFlag = true;
			}

			if (_itemCounter == _noOfWordStartFromInitial)
			{
				auto *func = CCCallFunc::create([=] {
					for (auto it = _propsBin.begin(); it != _propsBin.end(); it++)
					{
						Sprite *temp = *it;
						Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(temp);
					}});

				auto *funcMove = CCCallFunc::create([=] {
					for (auto it = _propsBin.begin(); it != _propsBin.end(); it++)
					{
						Sprite *temp = *it;
						if (temp->getName()[0] != _initial[0])
						{
							MoveTo *scaleTo = MoveTo::create(1, Vec2(-350, temp->getPositionY()));
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
					_menuContext->showScore();
				});
				this->runAction(Sequence::create(DelayTime::create(1.2), func, funcMove, DelayTime::create(1.2), deleteMove, NULL));
			}
			
			return false;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{

	};
	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		//displayText->setString(str);
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

