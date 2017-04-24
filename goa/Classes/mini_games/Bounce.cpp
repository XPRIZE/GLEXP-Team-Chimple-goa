#include "Bounce.h"
#include "../menu/HelpLayer.h"
#include <math.h>
#include <array>
#include "../lang/LangUtil.h"

#define COCOS2D_DEBUG 1
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
			std::vector<int> choices = { sum - begin, randomInt(1, sum) };
			std::vector<int> correctChoices = { 0 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		else {
			std::vector<int> choices = { randomInt(1, sum), sum - begin };
			std::vector<int> correctChoices = { 1 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		
		if (_currentLevel == 1 && _lessons == 0) {
			auto dullSprite = this->_bounceChoices[this->_correctChoices[0]]->_dullSprite;
			dullSprite->setContentSize(Size(225, 290));
			auto dullSpriteRect = dullSprite->getBoundingBox();
			dullSpriteRect.origin.x = dullSpriteRect.origin.x;// +dullSpriteRect.size.width / 2;
			dullSpriteRect.origin.y = dullSpriteRect.origin.y + dullSpriteRect.size.height / 2;
			auto dullSpriteRectNew = Rect(dullSpriteRect.origin.x, dullSpriteRect.origin.y, dullSpriteRect.size.width, dullSpriteRect.size.height);

			auto holder = this->_holders[this->_begin - this->_startNum];
			auto holderPos = holder->getParent()->convertToWorldSpace(holder->getPosition());
			auto holderRect = Rect(holderPos.x, holderPos.y, holder->getContentSize().width, holder->getContentSize().height);
			this->_help = HelpLayer::create(dullSpriteRectNew, holderRect);
			this->addChild(this->_help);
			this->_help->clickAndDrag(Vec2(_bounceChoices[this->_correctChoices[0]]->_dullSprite->getPositionX(), this->_bounceChoices[this->_correctChoices[0]]->_dullSprite->getPositionY()), Vec2(holderPos.x, holderPos.y));
			_helpFlag = true;
		}
	}
	else if (_currentLevel <= 10) {
		int startNum = 0;
		int endNum = 20;
		int begin = randomInt(startNum, endNum - 5);
		int sum = randomInt(begin + 2, endNum);
		int firstChoice = randomInt(1, sum - begin);

		//
		int randomChoiceLimit;
		auto preLimit_1 = begin + firstChoice;
		auto preLimit_2 = begin + (sum - begin - firstChoice);
		if (preLimit_1 > preLimit_2)
		{
			randomChoiceLimit = endNum - preLimit_1;
		}
		else
		{
			randomChoiceLimit = endNum - preLimit_2;
		}
		//
		if (randomInt(0, 2) > 0) {

			std::vector<int> choices = { firstChoice, sum - begin - firstChoice, randomInt(1, (randomChoiceLimit + 1)) };
			std::vector<int> correctChoices = { 0, 1 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		else {
			std::vector<int> choices = { randomInt(1, (randomChoiceLimit + 1)), sum - begin - firstChoice, firstChoice };
			std::vector<int> correctChoices = { 1, 2 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		
	}
	else if (_currentLevel <= 15) {
		int startNum = -10;
		int endNum = 10;
		int begin = randomInt(0, endNum - 5);
		int sum = randomInt(begin + 1, endNum - 3);
		int firstChoice = randomInt(sum - begin + 1, endNum - begin);
		//
		int randomChoiceLimit;
		auto preLimit_1 = begin + firstChoice;
		auto preLimit_2 = begin + (sum - begin - firstChoice);
		if (preLimit_1 > preLimit_2)
		{
			randomChoiceLimit = endNum - preLimit_1;
		}
		else
		{
			randomChoiceLimit = endNum - preLimit_2;
		}
		//
		if (randomInt(0, 2) > 0) {
			std::vector<int> choices = { firstChoice, sum - begin - firstChoice, randomInt(1, (randomChoiceLimit + 1)) };
			std::vector<int> correctChoices = { 0, 1 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		else {
			std::vector<int> choices = { sum - begin - firstChoice, randomInt(1, (randomChoiceLimit + 1)), firstChoice };
			std::vector<int> correctChoices = { 0, 2 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		
	}
	else if (_currentLevel <= 20) {
		int startNum = -10;
		int endNum = 20;
		int begin = randomInt(0, endNum - 10);
		int sum = randomInt(begin + 2, endNum - 5);
		int firstChoice = randomInt(sum - begin + 1, endNum - begin);

		int randomChoiceLimit;
		auto preLimit_1 = begin + firstChoice;
		auto preLimit_2 = begin + (sum - begin - firstChoice);
		if (preLimit_1 > preLimit_2)
		{
			randomChoiceLimit = endNum - preLimit_1;
		}
		else
		{
			randomChoiceLimit = endNum - preLimit_2;
		}

		if (randomInt(0, 2) > 0) {
			std::vector<int> choices = { firstChoice, sum - begin - firstChoice, randomInt(1, (randomChoiceLimit + 1)) };
			std::vector<int> correctChoices = { 0, 1 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		else {
			std::vector<int> choices = { firstChoice, randomInt(1, (randomChoiceLimit + 1)), sum - begin - firstChoice };
			std::vector<int> correctChoices = { 0, 2 };
			this->setupLayer(startNum, endNum, sum, begin, choices, correctChoices);
		}
		
	}
}


void Bounce::setupLayer(int startNum, int endNum, int sum, int begin, std::vector<int> choices, std::vector<int> correctChoices)
{
	auto bg = CSLoader::createNode("icecream/background.csb");
	bg->setName("bg");
	this->addChild(bg);
	_startNum = startNum;
	_endNum = endNum;
	_sum = sum;
	_begin = begin;
	for (int i = 0; i < choices.size(); i++)
		_choices.push_back(choices[i]);

	for (int j = 0; j < correctChoices.size(); j++)
		_correctChoices.push_back(correctChoices[j]);

	_scroll = cocos2d::ui::ScrollView::create();
	_scroll->setContentSize((Director::getInstance()->getVisibleSize()));
	_scroll->setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
	_scroll->setInnerContainerSize(Size(NUMBER_WIDTH * (endNum - startNum + 1), visibleSize.height));
	_scroll->setName("scroll");
	 this->addChild(_scroll);


	for (int i = startNum; i <= endNum; i++) {
		auto sprite = new BounceHolder(i);
		sprite->setPosition(Vec2((i - startNum + 0.5)*NUMBER_WIDTH, HOLDER_Y));
		sprite->setTag(0);
		_scroll->addChild(sprite, 1);
		_holders.push_back(sprite);
		
		std::ostringstream numberInString;
		numberInString << i;
		std::string numInString = numberInString.str();
		sprite->setName("holder" + numInString);

		auto backHolder = Sprite::createWithSpriteFrameName("icecream/holder_1.png");
		backHolder->setPosition(Vec2((i - startNum + 0.5) * NUMBER_WIDTH, HOLDER_Y + 85));
		_scroll->addChild(backHolder, -10);
		_backHolders.push_back(backHolder);
		sprite->_backHolder = backHolder;

		//
		/*auto dummyBox = DrawNode::create();
		_scroll->addChild(dummyBox, 20);
		auto a = sprite->getPositionX() - sprite->getContentSize().width / 2;
		auto b = sprite->getPositionY() - sprite->getContentSize().height / 2;
		dummyBox->drawRect(Vec2(a, b),
		Vec2(a + sprite->getContentSize().width, b + sprite->getContentSize().height),
		Color4F(255 * rand_0_1(), 255* rand_0_1(), 255* rand_0_1(), 55));*/
		//

	}
	auto sumSprite = Sprite::createWithSpriteFrameName("icecream/cone.png");
	sumSprite->setPosition(Vec2((sum - startNum + 0.5) *NUMBER_WIDTH, HOLDER_Y + 100));
	_scroll->addChild(sumSprite);
	 
	for (int i = 0; i < _holders.size(); i++)
	{
		if ((int)(_holders[i]->getPositionX()) == (int)((sum - startNum + 0.5) *NUMBER_WIDTH))
		{
			_holders[i]->setTag(10);
			break;
		}
	}
	_bounceDrop = new BounceDrop(_begin, startNum);
	_scroll->addChild(_bounceDrop, -1);

	_bounceBall = new BounceBall(this);
	_bounceBall->setPosition(Vec2(_bounceDrop->getPosition()));
	_scroll->addChild(_bounceBall);
	setupChoices();

	_scroll->setTouchEnabled(false);
	_scroll->scrollToPercentHorizontal((_holders[sum - startNum]->getPositionX() + _scroll->getContentSize().width / 2) * 100 / this->_scroll->getInnerContainerSize().width, 1, true);
	auto callFunc = CallFunc::create([=] {
		auto x = (this->_holders[begin - startNum]->getPosition().x) * 100 / this->_scroll->getInnerContainerSize().width;

		this->_scroll->scrollToPercentHorizontal((this->_holders[begin - startNum]->getPosition().x) * 100 / this->_scroll->getInnerContainerSize().width, 1, true);
	});
	auto callFunc2 = CallFunc::create([=] {
		this->_scroll->setTouchEnabled(true);
	});
	auto seq = Sequence::create(DelayTime::create(2), callFunc, DelayTime::create(1), callFunc2, NULL);
	this->runAction(seq);

}

void Bounce::setupChoices()
{
	auto screenWidth = visibleSize.width;
	this->_bounceChoices.clear();

	for (int i = 0; i < _choices.size(); i++) {
		auto x = screenWidth - (_choices.size() - i) * (CHOICE_WIDTH + CHOICE_PADDING);
		auto bounceChoice = new BounceChoice(_choices[i], Point(screenWidth - (_choices.size() - i) * (CHOICE_WIDTH + CHOICE_PADDING), 200), this);
		BounceChoiceListner(bounceChoice);
		this->addChild(bounceChoice);
		this->_bounceChoices.push_back(bounceChoice);
	}
}

void Bounce::BounceChoiceListner(BounceChoice* bounceChoice) {


	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);
	cocos2d::DrawNode *aa = NULL;

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto location = target->convertTouchToNodeSpace(touch); //touch->getLocation();
		auto location1 = touch->getLocation();

		auto targetPoint = ((BounceChoice*)target)->_brightSprite->getParent()->convertToWorldSpace(((BounceChoice*)target)->_brightSprite->getPosition());
		auto rectTarget = ((BounceChoice*)target)->_brightSprite->getBoundingBox();

		auto x = targetPoint.x - rectTarget.size.width / 2;
		auto y = targetPoint.y - 20;

		auto rect = Rect(x, y, rectTarget.size.width, rectTarget.size.height);

		if (rect.containsPoint(location))
		{

			((BounceChoice*)target)->_locationInNode = ((BounceChoice*)target)->_brightSprite->getParent()->convertTouchToNodeSpace(touch);
			((BounceChoice*)target)->_positionAtTouch = ((BounceChoice*)target)->_brightSprite->getPosition();

			if (((BounceChoice*)target)->_holder) {
				auto name = ((BounceChoice*)target)->_holder->getName();
				auto tag = ((BounceChoice*)target)->_holder->getTag();
				for (int i = 0; i < ((Bounce*)target->getParent())->_holders.size(); i++) {
					if (!name.compare(((Bounce*)target->getParent())->_holders[i]->getName()))
					{
						((Bounce*)target->getParent())->_holders[i]->setTag(0);
						break;
					}
				}
				auto a = ((Bounce*)target->getParent())->_holders;
				((BounceChoice*)target)->shiftParent();
			}
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto locationInNode = target->convertTouchToNodeSpace(touch);
		((BounceChoice*)target)->_brightSprite->setPosition(locationInNode.x + ((BounceChoice*)target)->_positionAtTouch.x - ((BounceChoice*)target)->_locationInNode.x, locationInNode.y + ((BounceChoice*)target)->_positionAtTouch.y - ((BounceChoice*)target)->_locationInNode.y);

		return true;
	};
	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		for (int i = 0; i < ((Bounce*)target->getParent())->_holders.size(); i++) {

			auto holder = ((Bounce*)target->getParent())->_holders[i];

			auto name = ((Bounce*)target->getParent())->_holders[i]->getName();
			auto tag = ((Bounce*)target->getParent())->_holders[i]->getTag();


			auto holderPoint = holder->getParent()->convertToWorldSpace(holder->getPosition());
			auto holderRect = Rect(holderPoint.x - holder->getContentSize().width / 2, holderPoint.y - holder->getContentSize().height / 2, holder->getContentSize().width, holder->getContentSize().height);
			auto holderRect1 = holder->getBoundingBox();

			auto targetPoint = ((BounceChoice*)target)->convertToWorldSpace(((BounceChoice*)target)->_brightSprite->getPosition());
			auto targetRect = Rect(targetPoint.x, targetPoint.y, ((BounceChoice*)target)->_brightSprite->getContentSize().width, ((BounceChoice*)target)->_brightSprite->getContentSize().height);
			auto targetRect1 = ((BounceChoice*)target)->_brightSprite->getBoundingBox();

			targetRect.origin.x = targetRect.origin.x - 10;// targetRect.size.width / 4;
			targetRect.size.width = 20;

			if ((holder->_choice))
			{
				auto a = 1;
			}
			if (holderRect.intersectsRect(targetRect) && (holder->getTag() == 0))
			{
				auto x = ((Bounce*)target->getParent())->_help;
				if (((Bounce*)target->getParent())->_help && ((Bounce*)target->getParent())->_helpFlag) {
					
					target->getParent()->removeChild(((Bounce*)target->getParent())->_help);
					((Bounce*)target->getParent())->_help = NULL;
					((Bounce*)target->getParent())->_helpFlag = false;
				}
				
				((BounceChoice*)target)->addToHolder(holder);
				return;
			}
		}
		auto layer = ((BounceChoice*)target);
		auto sprite = ((BounceChoice*)target)->_brightSprite;
		
		((BounceChoice*)target)->resetPosition();
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, bounceChoice);
}

int Bounce::randomInt(int min, int max)
{
	int randNo = RandomHelper::random_int(min, max);

	while (randNo == max)
		randNo = RandomHelper::random_int(min, max);

	return randNo;
}

void Bounce::cleanLayer()
{
	this->removeAllChildren();
	this->_holders.clear();
	this->_choices.clear();;
	this->_bounceChoices.clear();
	this->_backHolders.clear();
	this->_correctChoices.clear();
}


BounceChoice::BounceChoice(int number, Point position, Bounce *bounce)
{
	_number = number;

	auto dullHolder = CSLoader::createTimeline("icecream/cup.csb");
	_dullSprite = CSLoader::createNode("icecream/cup.csb");
	_dullSprite->setPosition(Vec2(position));

	std::ostringstream numberInString;
	numberInString << number;
	std::string numString = numberInString.str();

	auto text = CommonLabelTTF::create(numString, "Arial", 128);
	text->setPosition(Vec2(0, Bounce::TEXT_Y));
	text->setColor(cocos2d::Color3B(0, 0, 0));
	_dullSprite->addChild(text);
	_dullSprite->setOpacity(50);
	_dullSprite->setName("dullSprite");
	this->addChild(_dullSprite);


	_brightAction = CSLoader::createTimeline("icecream/cup.csb");
	_brightSprite = CSLoader::createNode("icecream/cup.csb");
	_brightSprite->setPosition(Vec2(position));
	_brightSprite->setContentSize(Size(225, 290));
	_brightSprite->runAction(_brightAction);
	_brightSprite->setName("brightsprite");

	auto text1 = CommonLabelTTF::create(numString, "Arial", 128);
	text1->setPosition(Vec2(0, Bounce::TEXT_Y));
	text1->setColor(cocos2d::Color3B(0, 0, 0));
	_brightSprite->addChild(text1);
	this->addChild(_brightSprite);

	//auto aa = DrawNode::create();
	//_brightSprite->addChild(aa, 20);
	//aa->setName("debug");
	////auto a = _brightSprite->getPositionX() - 10;
	////auto b = _brightSprite->getPositionY() - 20;
	//aa->drawRect(Vec2(0, 0),
	//	Vec2(20,290),
	//	Color4F(0, 0, 255, 22));
}
void BounceChoice::shiftParent()
{
	//auto aa = DrawNode::create();
	//brightSprite->addChild(aa, 20);
	//aa->setName("debug");
	////auto a = _brightSprite->getPositionX() - 10;
	////auto b = _brightSprite->getPositionY() - 20;
	//aa->drawRect(Vec2(0, 0),
	//	Vec2(20, 290),
	//	Color4F(0, 0, 255, 22));

	auto layer = this;
	auto sprite = this->_brightSprite;

	auto pos = this->_brightSprite->getParent()->convertToWorldSpace(this->_brightSprite->getPosition());
	this->_brightSprite->removeFromParent();

	auto brightHolder = CSLoader::createNode("icecream/cup.csb");
	auto brightSprite = CSLoader::createNode("icecream/cup.csb");
	auto brightAction = CSLoader::createTimeline("icecream/cup.csb");
	brightSprite->setName("brightsprite");
	brightSprite->runAction(brightAction);

	std::ostringstream numberInString;
	numberInString << _number;
	std::string numString = numberInString.str();

	auto text = CommonLabelTTF::create(numString, "Arial", 128);
	text->setPosition(Vec2(0, Bounce::TEXT_Y));
	text->setColor(cocos2d::Color3B(0, 0, 0));
	brightSprite->addChild(text);
	this->addChild(brightSprite);
	brightSprite->setPosition(pos);
	this->_brightSprite = brightSprite;
	this->_brightAction = brightAction;
	if (this->_holder) {
		this->_holder->_choice = NULL;
		this->_holder = NULL;
	}

}
void BounceChoice::resetPosition()
{
	this->shiftParent();
	auto moveTo = MoveTo::create(1, this->_dullSprite->getPosition());
	this->_brightSprite->runAction(moveTo);
	this->_brightSprite->setContentSize(Size(225, 290));
	auto layer = this->getParent();

	Bounce::BounceChoiceListner(this);
}
void BounceChoice::addToHolder(BounceHolder  *holder)
{
	_holder = holder;
	holder->setTag(1);
	holder->_choice = this;
	holder->_choice->setTag(1);
	auto spritePos = this->_brightSprite->getPosition();
	this->_brightSprite->setOpacity(50);
	this->_brightSprite->removeFromParent();



	auto brightHolder = CSLoader::createNode("icecream/cup.csb");
	this->_brightSprite = CSLoader::createNode("icecream/cup.csb");
	this->_brightAction = CSLoader::createTimeline("icecream/cup.csb");
	this->_brightSprite->runAction(this->_brightAction);
	this->_brightSprite->setName("brightsprite");
	this->_brightSprite->setContentSize(Size(225, 290));

	std::ostringstream numberInString;
	numberInString << _number;
	std::string numString = numberInString.str();

	auto text = CommonLabelTTF::create(numString, "Arial", 128);
	text->setPosition(Vec2(0, Bounce::TEXT_Y));
	text->setColor(cocos2d::Color3B(0, 0, 0));
	this->_brightSprite->addChild(text);

	
	holder->_backHolder->addChild(this->_brightSprite);
	this->_brightSprite->setPosition(holder->_backHolder->convertToNodeSpace(spritePos));

	auto newPos = Point(holder->getContentSize().width / 2, 60);
	auto moveTo = MoveTo::create(0.25, newPos);
	Sequence *action1;
	action1 = Sequence::create(moveTo, NULL);
	auto layer = this->getParent();
	auto layer2 = ((Bounce*)layer);
	((Bounce*)layer)->_bounceChoicesLayer = this;

	if (((Bounce*)layer)->_currentLevel == 1 && ((Bounce*)layer)->_lessons == 0) {
		auto callFunc = CallFunc::create([=] {

			auto dropRect = Rect(((Bounce*)layer)->_bounceDrop->getPositionX(), ((Bounce*)layer)->_bounceDrop->getPositionY(), 400, 400);
			((Bounce*)layer)->_help = HelpLayer::create(Rect(dropRect),
				Rect(0, 0, 0, 0));
			
			((Bounce*)layer)->addChild(((Bounce*)layer)->_help);
			((Bounce*)layer)->_help->click(Vec2(((Bounce*)layer)->_bounceDrop->getPositionX(), ((Bounce*)layer)->_bounceDrop->getPositionY()));
		});
		((Bounce*)layer)->_helpFlag = true;
		action1 = Sequence::create(moveTo, callFunc, NULL);
	}
	this->_brightSprite->runAction(action1);
	Bounce::BounceChoiceListner(this);

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
		text->setColor(cocos2d::Color3B(0, 0, 0));
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
			if (_layer->_help && _layer->_helpFlag) {
				_layer->removeChild(_layer->_help);
				_layer->_help = NULL;
				_layer->_helpFlag = false;
			}
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
		std::vector<int> components = { _layer->_bounceDrop->_posNum };
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

		/*auto followCallFunc = CallFunc::create([=] {
		_follow = Follow::create(this, Rect(0, 0, this->getParent()->getContentSize().width, this->getParent()->getContentSize().height));
		this->getParent()->runAction(_follow);
		});*/

		//NTC	
		cocos2d::CallFunc *animCallFunc;
		BezierTo *bezierAction;
		cocos2d::CallFunc *animCallFunc_1;
		BezierTo *bezierAction_1;
		cocos2d::CallFunc *animCallFunc_2;
		BezierTo *bezierAction_2;
		auto counter = 0;
		auto x = holder->_choice;
		while (holder->getTag() == 1)
		{
			counter++;
			if (counter == 1)
			{
				animCallFunc = CallFunc::create([=] {
					holder->_choice->_brightAction->gotoFrameAndPlay(0, false);
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/water_drop.ogg", false);
				});
			}
			else if (counter == 2)
			{
				animCallFunc_1 = CallFunc::create([=] {
					holder->_choice->_brightAction->gotoFrameAndPlay(0, false);
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/water_drop.ogg", false);
				});
			}
			else
			{
				animCallFunc_2 = CallFunc::create([=] {
					holder->_choice->_brightAction->gotoFrameAndPlay(0, false);
					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					audio->playEffect("sounds/sfx/water_drop.ogg", false);
				});
			}
			
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
			if (counter == 1)
			{
				bezierAction = BezierTo::create(1, bezier);
			}
			else if (counter == 2)
			{
				bezierAction_1 = BezierTo::create(1, bezier);
			}
			else
			{
				bezierAction_2 = BezierTo::create(1, bezier);
			}

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
			if (counter == 1)
			{
				this->runAction(Sequence::create(moveTo, animCallFunc, bezierAction, moveTo_1, callFunc, NULL));
			}
			else if (counter == 2)
			{
				this->runAction(Sequence::create(moveTo, animCallFunc, bezierAction, animCallFunc_1, bezierAction_1, moveTo_1, callFunc, NULL));
			}
			else
			{
				this->runAction(Sequence::create(moveTo, animCallFunc, bezierAction, animCallFunc_1, bezierAction_1, animCallFunc_2, bezierAction_2, moveTo_1, callFunc, NULL));
			}
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
					this->showAnswer(_layer);//NTC
				}
			});
			if (counter == 0)
			{
				this->runAction(Sequence::create(moveTo, moveTo_1, callFunc, NULL));
			}
			else if (counter == 1)
			{
				this->runAction(Sequence::create(moveTo, animCallFunc, bezierAction, moveTo_1, callFunc, NULL));
			}
			else if (counter == 2)
			{
				this->runAction(Sequence::create(moveTo, animCallFunc, bezierAction, animCallFunc_1, bezierAction_1, moveTo_1, callFunc, NULL));
			}
			else
			{
				this->runAction(Sequence::create(moveTo, animCallFunc, bezierAction, animCallFunc_1, bezierAction_1, animCallFunc_2, bezierAction_2, moveTo_1, callFunc, NULL));
			}
		}
	}
}
void BounceBall::showAnswer(Bounce* bounce)
{
	for (int i = 0; i < bounce->_holders.size(); i++) {
		if (bounce->_holders[i]->getTag() == 1) {
			bounce->_holders[i]->setTag(0);
			bounce->_holders[i]->_choice->resetPosition();
		}
	}
	auto callFunc = CallFunc::create([=] {
		if (bounce->_correctChoices.size() == 1)
		{
			auto choice = bounce->_bounceChoices[bounce->_correctChoices[0]];
			auto holder = bounce->_holders[bounce->_begin - bounce->_startNum];
			((BounceChoice*)choice)->addToHolder(holder);
		}
		else if (bounce->_correctChoices.size() == 2)
		{
			auto choice = bounce->_bounceChoices[bounce->_correctChoices[0]];
			auto holder = bounce->_holders[bounce->_begin - bounce->_startNum];
			((BounceChoice*)choice)->addToHolder(holder);

			auto nextHolderNumber = bounce->_begin - bounce->_startNum + ((BounceChoice*)choice)->_number;
			auto choice_1 = bounce->_bounceChoices[bounce->_correctChoices[1]];
			auto holder_1 = bounce->_holders[nextHolderNumber];
			((BounceChoice*)choice_1)->addToHolder(holder_1);
		}
		else
		{
		}
	});
	auto animateCallFunc = CallFunc::create([=] {
		bounce->_bounceBall->animateBounce(true);
	});
	auto seq = Sequence::create(DelayTime::create(1), callFunc, DelayTime::create(1), animateCallFunc, NULL);
	this->runAction(seq);
}
AdditionDisplay::AdditionDisplay(std::vector<int> component, int sum)
{

	if (this->initWithColor(Color4B(240, 240, 240, 255))) {
		this->setContentSize(Size(Director::getInstance()->getVisibleSize().width / 2, Director::getInstance()->getVisibleSize().height / 2));

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
			if (((Bounce*)parent)->_lessons >= Bounce::MAX_LESSONS) {
				((Bounce*)parent)->_menuContext->showScore();
			}
			else {
				((Bounce*)parent)->cleanLayer();
				((Bounce*)parent)->doLevel();
			}
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
