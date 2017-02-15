#include "Bounce.h"
#include "../menu/HelpLayer.h"
#include <math.h>
#include <array>
#include "../lang/LangUtil.h"

using namespace std;
using namespace cocos2d;
USING_NS_CC;

Scene* Bounce::createScene()
{
	auto scene = Scene::create();
	auto layer = Bounce::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Bounce::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void Bounce::onEnterTransitionDidFinish()
{
	CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	framecache1->addSpriteFramesWithFile("icecream/icecream.plist");
	

		_currentLevel = _menuContext->getCurrentLevel();
		_menuContext->setMaxPoints(MAX_LESSONS);
		new BounceHolder(4);
		CCLOG(" MAX_LESSONS = %d and Current level is = %d ", MAX_LESSONS, _level);
		doLevel();
		this->scheduleUpdate();

}
void Bounce::update(float dt)
{

}
void Bounce::doLevel()
{
	if (_currentLevel <= 5) {
		int startNum = 0;
		int endNum = 20;
			if (_currentLevel == 1) {
				endNum = 9;
			}
		  	int begin = _currentLevel;
				int sum = randomInt(begin + 1, 10);
			if (randomInt(0, 2) > 0) {
				int choices[2] = { sum - begin, randomInt(1, sum) };
				std::vector<int> correctChoices = {0};
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			else {
				int choices[2] = { randomInt(1, sum), sum - begin };
				std::vector<int> correctChoices = {1};
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			//this.setupLayer(startNum, endNum, sum, begin, choices, correctChoices)
				if (_currentLevel == 1 && _lessons == 0) {
				/*	var dullSprite = this._bounceChoices[this._correctChoices[0]]._dullSprite
						var dullSpriteRect = dullSprite.getBoundingBoxToWorld()
						dullSpriteRect.x = dullSpriteRect.x + dullSpriteRect.width / 2
						dullSpriteRect.y = dullSpriteRect.y + dullSpriteRect.height / 2
						var holder = this._holders[this._begin - this._startNum]
						var holderPos = holder.getParent().convertToWorldSpace(holder.getPosition())
						var holderRect = cc.rect(holderPos.x, holderPos.y, holder.width, holder.height)
						this._help = new xc.HelpLayer(dullSpriteRect, holderRect)
						this.addChild(this._help)
						this._help.clickAndDrag(this._bounceChoices[this._correctChoices[0]]._dullSprite.x, this._bounceChoices[this._correctChoices[0]]._dullSprite.y, holderPos.x, holderPos.y)
				*/}
	}
	else if (_currentLevel <= 10) {
		int startNum = 0;
		int endNum = 20;
		int begin = randomInt(startNum, endNum - 5);
		int sum = randomInt(begin + 2, endNum);
		int firstChoice = randomInt(1, sum - begin);
			if (randomInt(0, 2) > 0) {
				int choices[3] = { firstChoice, sum - begin - firstChoice, randomInt(1, sum) };
				std::vector<int> correctChoices = { 0, 1 };
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			else {
				int choices[3] = { randomInt(1, sum), sum - begin - firstChoice, firstChoice };
				std::vector<int> correctChoices = { 1, 2 };
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			//this.setupLayer(startNum, endNum, sum, begin, choices, correctChoices)
	}
	else if (_currentLevel <= 15) {
		int startNum = -10;
		int endNum = 10;
		int begin = randomInt(0, endNum - 5);
		int sum = randomInt(begin + 1, endNum - 3);
		int firstChoice = randomInt(sum - begin + 1, endNum - begin);
			if (randomInt(0, 2) > 0) {
				int choices[3] = { firstChoice, sum - begin - firstChoice, randomInt(1, sum) };
				std::vector<int> correctChoices = { 0, 1 };
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			else {
				int choices[3] = { sum - begin - firstChoice, randomInt(1, sum), firstChoice };
				std::vector<int> correctChoices = { 0, 2 };
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			//this.setupLayer(startNum, endNum, sum, begin, choices, correctChoices)
	}
	else if (_currentLevel <= 20) {
		int startNum = -10;
		int endNum = 20;
		int begin = randomInt(0, endNum - 10);
		int sum = randomInt(begin + 2, endNum - 5);
		int firstChoice = randomInt(sum - begin + 1, endNum - begin);
			if (randomInt(0, 2) > 0) {
				int choices[3] = { firstChoice, sum - begin - firstChoice, randomInt(1, sum) };
				std::vector<int> correctChoices = { 0, 1 };
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			else {
				int choices[3] = { firstChoice, randomInt(1, sum), sum - begin - firstChoice };
				std::vector<int> correctChoices = { 0, 2 };
				this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
			}
			//this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
	}
}


void Bounce::setupLayer(int startNum, int endNum, int sum, int begin, int choices[3], std::vector<int> correctChoices)
{
	auto bg = CSLoader::createNode("icecream/background.csb");
	this->addChild(bg);
	_startNum = startNum;
	_endNum = endNum;
	_sum = sum;
	_begin = begin;
	for(int i = 0 ; i < 3 ; i++)
	_choices[i] = choices[i];
	
	for (int j = 0; j < correctChoices.size(); j++)
	_correctChoices.push_back( correctChoices[j]);

	_scroll = cocos2d::ui::ScrollView::create();
	//_scroll->setTouchEnabled(true);
	_scroll->setContentSize((Director::getInstance()->getVisibleSize()));
	//_scroll->setPosition(Vec2(50, 100));
	//_scroll->setBounceEnabled(true);
	_scroll->setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
	_scroll->setInnerContainerSize(Size(NUMBER_WIDTH * (endNum - startNum + 1), visibleSize.height));
	//_scroll->setBackGroundImage("sample.png");
	this->addChild(_scroll);

	
	for (int i = startNum; i <= endNum; i++) {
		auto sprite = new BounceHolder(i);
		sprite->setPosition(Vec2((i - startNum + 0.5)*NUMBER_WIDTH, HOLDER_Y));
		_scroll->addChild(sprite, 1);
		_holders.push_back(sprite);
		auto backHolder = Sprite::createWithSpriteFrameName("icecream/holder_1.png");
		backHolder->setPosition(Vec2((i - startNum + 0.5) * NUMBER_WIDTH, HOLDER_Y + 85));
		_scroll->addChild(backHolder, -10);
		_backHolders.push_back(backHolder);
		sprite->_backHolder = backHolder;

	}
	    auto sumSprite = Sprite::createWithSpriteFrameName("icecream/cone.png");
		sumSprite->setPosition(Vec2((sum - startNum + 0.5) *NUMBER_WIDTH, HOLDER_Y + 100));
		_scroll->addChild(sumSprite);

		_bounceDrop = new BounceDrop(_begin, startNum);
		_scroll->addChild(_bounceDrop, -1);

	    	_bounceBall = new BounceBall(this);
			_bounceBall->setPosition(Vec2(_bounceDrop->getPosition()));
			_scroll->addChild(_bounceBall);
			setupChoices();
}

void Bounce::setupChoices()
{
	    auto screenWidth = visibleSize.width;
		for (int i = 0; i < _choices.size(); i++) {
			//auto bounceChoice = new BounceChoice(_choices[i], Point(screenWidth - (_choices.length - i) * (CHOICE_WIDTH + CHOICE_PADDING), 200));
				//this->addChild(bounceChoice);
				//this->_bounceChoices.push_back(bounceChoice);
		}
}
int Bounce::randomInt(int min, int max)
{
	return  floor(rand_0_1() * (max - min + 1)) + min;
}

void Bounce::cleanLayer()
{
	this->removeAllChildren();
	this->_holders.clear();
	this->_choices[3] = {};
	this->_bounceChoices.clear();
	this->_backHolders.clear();
}

BounceHolder::BounceHolder(int num)
{
	if (this->initWithSpriteFrameName("icecream/holder_2.png")) {
		this->_num = num;
		std::ostringstream total;
		total << num;
		std::string numString = total.str();
		auto text = CommonLabelTTF::create(numString, "Arial", 128);
		text->setPosition(Vec2(Bounce::NUMBER_WIDTH / 2, Bounce::TEXT_Y));
		text->setColor(cocos2d::Color3B(255, 255, 255));
		this->addChild(text);
	}
}

BounceDrop::BounceDrop(int posNum, int startNum)
{
	this->_posNum = posNum;
	this->setPosition(Vec2((posNum - startNum + 0.5) * Bounce::NUMBER_WIDTH, 1500));
	auto img = Sprite::createWithSpriteFrameName("icecream/machine.png");
	this->addChild(img);
}

BounceBall::BounceBall(Bounce* layer)
{
	if (this->initWithSpriteFrameName("icecream/icecream_1.png")) {

		this->_layer = layer;

		auto _listener = cocos2d::EventListenerTouchOneByOne::create();
			_listener->setSwallowTouches(false);

		_listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
		{
			auto target = event->getCurrentTarget();
			//Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
			//Size s = target->getContentSize();
			//Rect rect = Rect(0, 0, s.width, s.height);
			if (!_animating) {
				Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());
				auto targetSize = target->getContentSize();
				Rect rect = Rect(target->getPositionX() - targetSize.width / 2, target->getPositionY() - targetSize.height / 2, targetSize.width, targetSize.height);
				if (rect.containsPoint(locationInNode))
				{
					return true;
				}
			}
			return false;
		};
		_listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
		{
			auto target = event->getCurrentTarget();
				/*if (target._layer._help) {
						target._layer.removeChild(target._layer._help)
							target._layer._help = null
					}*/
				animateBounce(false);
		};
		cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(_listener, this);
	}
}

void BounceBall::animateBounce(bool automatic)
{
	if (!_animating)
	{
		    _animating = true;
			std::vector<int> components = {_layer->_bounceDrop->_posNum };
			auto posNum = _layer->_bounceDrop->_posNum - _layer->_startNum;
			auto holder = _layer->_holders[posNum];
			auto pos = holder->getPosition();
			auto scrollX = pos.x;
			if (scrollX <= Director::getInstance()->getVisibleSize().width / 2) {
				scrollX = 0;
			}
			pos.y = pos.y + holder->getContentSize().height / 2 + Bounce::CUP_HEIGHT;
			_layer->_scroll->scrollToPercentHorizontal(scrollX * 100 / _layer->_scroll->getInnerContainerSize().width, 1, true);
			auto delayTime = DelayTime::create(1);
			auto moveTo = MoveTo::create(0.5, pos); //NTC
			_follow = Follow::create(this, Rect(0, 0, this->getParent()->getContentSize().width, this->getParent()->getContentSize().height));
			this->getParent()->runAction(_follow);

			auto followCallFunc = CallFunc::create([=] {
				_follow = Follow::create(this, Rect(0, 0, this->getParent()->getContentSize().width, this->getParent()->getContentSize().height));
				 this->getParent()->runAction(_follow);
			});

		    //NTC	
			cocos2d::CallFunc *animCallFunc;
			BezierTo *bezierAction;
			while (holder->_choice)
			{
				     animCallFunc = CallFunc::create([=] {
					//_brightAction->gotoFrameAndPlay(0, false);
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/water_drop.ogg", false);
				});
					 posNum += holder->_choice->_number;
					 components.push_back(holder->_choice->_number);
					 auto holderPos = holder->getPosition();
					 holderPos.y = holderPos.y + holder->getContentSize().height / 2 + Bounce::CUP_HEIGHT;
					 auto nextholder = _layer->_holders[posNum];
					 auto nextholderPos = nextholder->getPosition();
					 nextholderPos.y = nextholderPos.y + holder->getContentSize().height / 2 + Bounce::CUP_HEIGHT;

					 ccBezierConfig bezier;
					 bezier.controlPoint_1 = Point(holderPos);
					 bezier.controlPoint_2 = Point((nextholderPos.x + holderPos.x) / 2, holderPos.y + 1600);
					 bezier.endPosition = Point(nextholderPos);
					 bezierAction = BezierTo::create(1, bezier);
					 holder = nextholder;
			}
			MoveTo *moveTo_1;
			cocos2d::CallFunc *callFunc;
			if (holder->_num == _layer->_sum) {
				moveTo_1 = MoveTo::create(0.2, Vec2(holder->getPositionX(), Bounce::HOLDER_Y + Bounce::CONE_HEIGHT));
				

				callFunc = CallFunc::create([=] {
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/success.ogg", false);
					_animating = false;
					this->getParent()->stopAction(_follow);
					_follow = NULL;
					_layer->_lessons++;
					_layer->_tries = 0;
						if (!automatic) {
							_layer->_menuContext->addPoints(1);//NTC
						}
						auto additionDisplay = new AdditionDisplay(components, _layer->_sum);
						this->_layer->addChild(additionDisplay);
						
						
				});
			}

			else {
				moveTo_1 = MoveTo::create(1, Vec2(holder->getPositionX(), -100));
				callFunc = CallFunc::create([=] {

						auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
						audio->playEffect("sounds/sfx/error.ogg", false);

						this->setPosition(_layer->_bounceDrop->getPosition());
						this->_animating = false;
						this->getParent()->stopAction(_follow);
						this->_follow = NULL;
						this->_layer->_scroll->scrollToPercentHorizontal((this->_layer->_holders[this->_layer->_begin - this->_layer->_startNum]->getPositionX()) * 100 / this->_layer->_scroll->getInnerContainerSize().width, 1, true);
						if (++this->_layer->_tries >= Bounce::MAX_LESSONS) {
							//this->_layer->showAnswer();//NTC
						}
					});
				
			}
			this->runAction(Sequence::create(moveTo, animCallFunc, bezierAction, moveTo_1, callFunc, NULL));
	}
	
}

AdditionDisplay::AdditionDisplay(std::vector<int> component, int sum)
{
	
	if (this->initWithColor(Color4B(240, 240, 240, 255))) {
		this->setContentSize(Size(Director::getInstance()->getVisibleSize().width/2, Director::getInstance()->getVisibleSize().height / 2));

		this->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 4, Director::getInstance()->getVisibleSize().height / 4));
		auto text = component[0];

		std::ostringstream streamText;
		streamText << text;
		std::string textConvert = streamText.str();

		for (int i = 1; i < component.size(); i++) {
			if (component[i] >= 0) {
				textConvert = textConvert + " + " + convertInString(component[i]);
			}
			else {
				textConvert = textConvert + " - " + convertInString(abs(component[i]));
			}
		}
		textConvert = textConvert + " = " + convertInString(sum);

		auto label = CommonLabelTTF::create(textConvert, "Arial", 128);
		label->setColor(cocos2d::Color3B(256, 0, 0));
		label->setPosition(Vec2(Director::getInstance()->getVisibleSize().width / 4, Director::getInstance()->getVisibleSize().height / 4));
		addChild(label);

		auto _listener = cocos2d::EventListenerTouchOneByOne::create();
		_listener->setSwallowTouches(true); //NTC

		_listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
		{
			auto target = event->getCurrentTarget();
			return true;//NTC
		};
		_listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
		{
			auto target = event->getCurrentTarget();
			auto parent = target->getParent();
			/*	if (parent->_lessons >= Bounce::MAX_LESSONS) {
					parent->getParent()->menuContext->showScore();
				}
				else {
					parent->cleanLayer();
					parent->doLevel();*/
				//}
		};
		cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(_listener, this);
	}
	}


std::string AdditionDisplay::convertInString(int number) {

	std::ostringstream streamText;
	streamText << number;
	std::string textConvert = streamText.str();

	return textConvert;
}
