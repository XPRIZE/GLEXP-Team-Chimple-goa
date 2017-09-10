#include "Train.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../util/CommonLabelTTF.h"
#include "../util/MatrixUtil.h"


USING_NS_CC;

Train::Train()
{
}

Train::~Train()
{
	this->getEventDispatcher()->removeCustomEventListeners("bagOfChoiceQuiz");
}

cocos2d::Scene * Train::createScene()
{
	auto scene = Scene::create();

	auto layer = Train::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, Train::gameName());
	scene->addChild(layer->_menuContext);

	return scene;
}

bool Train::init()
{
	if (!Layer::init())
	{
		return false;
	}

	return true;
}

void Train::onEnterTransitionDidFinish() {
	_eventDispatcher->addCustomEventListener("bagOfChoiceQuiz", CC_CALLBACK_1(Train::startGame, this));
	auto complexity = 4 + std::floor((((float)_menuContext->getCurrentLevel() / 50.0f) * 7.0f));
	_lesson.getBag(1, 3, complexity, 10, 10);
}

void Train::startGame(cocos2d::EventCustom *eventCustom)
{
	CCLOG("onLessonReady begin");
	std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
	CCLOG("onLessonReady to unmarshallBagOfChoices");
	vector<Lesson::Bag> vbag = Lesson::unmarshallBag(buf);

	visibleSize = Director::getInstance()->getVisibleSize();
	origin = Director::getInstance()->getVisibleOrigin();

	currentLevel = _menuContext->getCurrentLevel();

	p1.x = visibleSize.width * .15;
	p1.y = visibleSize.height * .36;

	p2.x =  visibleSize.width * .45;
	p2.y = visibleSize.height * .36 ; 

	p3.x =  visibleSize.width * .75; 
	p3.y = visibleSize.height * .36 ;

	p4.x =  visibleSize.width * .15; 
	p4.y = visibleSize.height * .23 ; 
	
	p5.x =  visibleSize.width * .45; 
	p5.y = visibleSize.height * .23 ; 
	
	p6.x =  visibleSize.width * .75; 
	p6.y = visibleSize.height * .23 ;

	p7.x =  visibleSize.width * .15; 
	p7.y = visibleSize.height * .10 ; 
	
	p8.x =  visibleSize.width * .45; 
	p8.y = visibleSize.height * .10 ; 
	
	p9.x =  visibleSize.width * .75; 
	p9.y = visibleSize.height * .10 ;

	_position.push_back(p1);
	_position.push_back(p2);
	_position.push_back(p3);
	_position.push_back(p4);
	_position.push_back(p5);
	_position.push_back(p6);
	_position.push_back(p7);
	_position.push_back(p8);
	_position.push_back(p9);

	wordPosition = 1;
	/*
	if (currentLevel >= 1 && currentLevel <= 8)
	{
		wordForSentanceArray = TextGenerator::getInstance()->generateASentence(4);
	}
	else if (currentLevel >= 9 && currentLevel <= 16)
	{
		wordForSentanceArray = TextGenerator::getInstance()->generateASentence(5);
	}
	else if (currentLevel >= 17 && currentLevel <= 24)
	{
		wordForSentanceArray = TextGenerator::getInstance()->generateASentence(6);
	}
	else if (currentLevel >= 25 && currentLevel <= 32)
	{
		wordForSentanceArray = TextGenerator::getInstance()->generateASentence(7);
	}
	else if (currentLevel >= 33 && currentLevel <= 40)
	{
		wordForSentanceArray = TextGenerator::getInstance()->generateASentence(8);
	}
	else if (currentLevel >= 41 && currentLevel <= 48)
	{
		wordForSentanceArray = TextGenerator::getInstance()->generateASentence(9);
	}

	*/
	auto _background = CSLoader::createNode("train/train.csb");
	_background->setPosition(Vec2(0,0));
	this->addChild(_background);

/*	std::istringstream iss(wordForSentanceArray);
	for (std::string s; iss >> s; )
		sentense.push_back(s);
*/
	auto complexity = _menuContext->getCurrentLevel()+2;
	if (complexity >= 10)
		complexity = 9;

	auto vmcBag = vbag;

	for (size_t i = 0; i < vmcBag[0].answers.size(); i++)
		sentense.push_back(vmcBag[0].answers[i]);

	random = sentense.size();
	_menuContext->setMaxPoints(random);

	int row = 0, temp = random, _height;

	while (temp >= 3)
	{
		row++;
		temp -= 3;
	}

	if (temp > 0)
		row++;

	_height = (visibleSize.height * .40) / row;

	train = Sprite::createWithSpriteFrameName("train/train.png");
	train->setPosition(Vec2(visibleSize.width * .06, (visibleSize.height * .52) + (_height * (row - 1 + .5))));
	train->setAnchorPoint(Vec2(.5, .5));
	this->addChild(train, 1);

	temp = random;

	for (int i = --row; i >= 0; i--)
	{
		float y = _height * (i + .5);
		int col = ((temp / 3) >= 1 ? 3 : temp % 3);
		int _width = (visibleSize.width * .90) / col;

		Sprite *railwaytrack = Sprite::createWithSpriteFrameName("train/railwaytrack.png");
		railwaytrack->setPosition(Vec2(0, visibleSize.height * 49.3 / 100 + y));
		railwaytrack->setAnchorPoint(Vec2(0, .5));
		this->addChild(railwaytrack, 1);

		if (col == 3)
			railwaytrack->setScaleX(2);
		if (col == 2)
			railwaytrack->setScaleX(3);
		if (col == 1)
			railwaytrack->setScaleX(6.5);

		for (int j = 0; j < col; j++)
		{
			tunnel_front._sprite = Sprite::createWithSpriteFrameName("train/tunnel_front.png");
			tunnel_front._sprite->setPosition(Vec2(visibleSize.width * .06 + (j + .5) * _width, visibleSize.height * .53 + y));
			tunnel_front._sprite->setAnchorPoint(Vec2(.5, .5));
			this->addChild(tunnel_front._sprite, 1);
			tunnel_front.selected = 0;

			tunnel_back._sprite = Sprite::createWithSpriteFrameName("train/tunnel_back.png");
			tunnel_back._sprite->setPosition(Vec2(tunnel_front._sprite->getPositionX() + tunnel_front._sprite->getBoundingBox().size.width / 2, tunnel_front._sprite->getPositionY()));
			tunnel_back._sprite->setAnchorPoint(Vec2(.5, .5));
			this->addChild(tunnel_back._sprite);
			tunnel_back.selected = 0;

			Sprite *railwaytrack = Sprite::createWithSpriteFrameName("train/railwaytrack.png");
			railwaytrack->setPosition(Vec2(tunnel_front._sprite->getPositionX() + tunnel_front._sprite->getBoundingBox().size.width * .40, visibleSize.height * 49.3 / 100 + y));
			railwaytrack->setAnchorPoint(Vec2(0, .5));
			this->addChild(railwaytrack, 1);

			if (col == 3)
				railwaytrack->setScaleX(2.5);
			if (col == 2)
				railwaytrack->setScaleX(5);
			if (col == 1)
				railwaytrack->setScaleX(6);

			tunnel_front_sprite.push_back(tunnel_front);
			tunnel_back_sprite.push_back(tunnel_back);
		}
		temp -= 3;
	}

	final_tunnel = Sprite::createWithSpriteFrameName("train/final_tunnel.png");
	final_tunnel->setPosition(Vec2(visibleSize.width * .98, tunnel_back_sprite.at(tunnel_back_sprite.size() - 1)._sprite->getPositionY()));
	final_tunnel->setAnchorPoint(Vec2(.5, .5));
	this->addChild(final_tunnel, 0);

	front_tunnel = Sprite::createWithSpriteFrameName("train/front_tunnel.png");
	front_tunnel->setPosition(Vec2(visibleSize.width * 99.2 / 100, tunnel_back_sprite.at(tunnel_back_sprite.size() - 1)._sprite->getPositionY() * 99.5 / 100));
	front_tunnel->setAnchorPoint(Vec2(.5, .5));
	this->addChild(front_tunnel, 2);

	for (int i = 0; i < random; i++) {

		label._label = CommonLabelTTF::create(sentense.at(i), "Helvetica", 100, CCSizeMake(700, 130));
		label._label->setPosition(Vec2(_position.at(i).x, _position.at(i).y));
		this->addChild(label._label, 2);

		label.id = sentense.at(i);
		label.selected = 0;
		label.index = i;
		label.pos = -1;
		label.xP = label._label->getPositionX();
		label.yP = label._label->getPositionY();
		label._label->setColor(Color3B::BLACK);
		randomLetter.push_back(label);

		addEvents(label);
	}

	layer1 = LayerColor::create(Color4B(255, 255, 255, 100), visibleSize.width, visibleSize.height * .50);
	layer1->setPosition(Vec2(0, 0));
	layer1->setAnchorPoint(Vec2(.5, .5));
	this->addChild(layer1, 3);
	layer1->setVisible(true);
	/*
	auto increase = ScaleTo::create(1, 1.4);
	auto decrease = ScaleTo::create(1, 1);
	auto delay = DelayTime::create(3);

	repeatForeverAction = RepeatForever::create(Sequence::create(increase, decrease, NULL));
	randomLetter.at(0)._label->runAction(repeatForeverAction);

	*/

	this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=] {
		resetPosition();
	}), NULL));

	for (int i = 0; i < random; i++) {// changes done

		auto increase = ScaleTo::create(1, 1.4);
		auto decrease = ScaleTo::create(1, 1);
		randomLetter.at(i)._label->stopAllActions();
		auto repeatForeverAction = RepeatForever::create(Sequence::create(increase, decrease, NULL));
		if (!randomLetter.at(i).id.compare(sentense.at(0)) && randomLetter.at(i).selected == 0) {
			randomLetter.at(i)._label->runAction(repeatForeverAction);
		}
	}
}

void Train::addEvents(struct labelDet _labelDet)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = (event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, size.width, size.height);

		if (rect.containsPoint(locationInNode))
		{
			if(sentense.at(wordPosition - 1) == randomLetter.at(_labelDet.index).id && randomLetter.at(_labelDet.index).selected == 0 && !(layer1->isVisible()) ) //&& randomLetter.at(wordPosition - 1).index == _labelDet.index) // changes done
			{
				layer1->setVisible(true);

				// has been change
				for (int i = 0; i < random; i++) {
					randomLetter.at(i)._label->setScale(1);
					randomLetter.at(i)._label->stopAllActions();
				}

				//randomLetter.at(_labelDet.index)._label->stopAction(repeatForeverAction);
				randomLetter.at(_labelDet.index).selected = 1;
				randomLetter.at(_labelDet.index)._label->setScale(1);
				randomLetter.at(_labelDet.index)._label->setPosition(Vec2(randomLetter.at(_labelDet.index).xP, randomLetter.at(_labelDet.index).yP));
				_menuContext->addPoints(1);

				if (wordPosition % 3 != 0)
				{
					 if (wordPosition != random)
					 {
						 auto target_Action = MoveTo::create(1, Vec2(tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionX(), tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionY()));
						 auto delay = DelayTime::create(1);
						 cocos2d::Sequence *sequence = Sequence::create(target_Action, CallFunc::create([=] {
							 Sprite* tunnel = tunnel_front_sprite.at(wordPosition)._sprite;
							 auto train_Action = MoveTo::create(1, Vec2(tunnel->getPositionX() - tunnel->getContentSize().width * .70, train->getPositionY()));
							 train->runAction(train_Action);
						 }), delay, CallFunc::create([=] {

							 for (int i = 0; i < random; i++) {	// changes done
							 
								 auto increase = ScaleTo::create(1, 1.4);
								 auto decrease = ScaleTo::create(1, 1);
								 randomLetter.at(i)._label->stopAllActions();
								 auto repeatForeverAction = RepeatForever::create(Sequence::create(increase, decrease, NULL));
								 if (!randomLetter.at(i).id.compare(sentense.at(wordPosition)) && randomLetter.at(i).selected == 0) {
									 randomLetter.at(i)._label->runAction(repeatForeverAction);
								 }
							 }

							 //auto increase = ScaleTo::create(1, 1.4);
							 //auto decrease = ScaleTo::create(1, 1);
							 //auto delay = DelayTime::create(3);

							 //repeatForeverAction = RepeatForever::create(Sequence::create(increase, decrease, NULL));
							 //randomLetter.at(wordPosition)._label->setPosition(Vec2(randomLetter.at(wordPosition).xP, randomLetter.at(wordPosition).yP));	has been change
							 //randomLetter.at(wordPosition)._label->runAction(repeatForeverAction);
						     layer1->setVisible(false);
							 wordPosition++;
						 }), NULL);
						 randomLetter.at(_labelDet.index)._label->runAction(sequence);
					 }
					 else if (wordPosition == random)
					 {
						 auto target_Action = MoveTo::create(1, Vec2(tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionX(), tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionY()));
						 auto delay = DelayTime::create(1);
						 cocos2d::Sequence *sequence = Sequence::create(target_Action, CallFunc::create([=] {
								auto train_Action = MoveTo::create(1, Vec2(visibleSize.width * 1.20, train->getPositionY()));
								train->runAction(train_Action);
						 }), delay, CallFunc::create([=] {
							 _menuContext->showScore();
						 }),NULL);
						 randomLetter.at(_labelDet.index)._label->runAction(sequence);
					 }
				}
				else if (wordPosition % 3 == 0)
				{
					if (wordPosition != random)
					{
						auto target_Action = MoveTo::create(1, Vec2(tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionX(), tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionY()));
						auto delay = DelayTime::create(1.1);
						cocos2d::Sequence *sequence = Sequence::create(target_Action, CallFunc::create([=] {
							auto train_Action = MoveTo::create(1, Vec2(visibleSize.width * 130 / 100, tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionY()));
							train->runAction(train_Action);
						}), delay, CallFunc::create([=] {
							Sprite *tunnel = tunnel_front_sprite.at(wordPosition)._sprite;
							train->setPosition(Vec2(0, tunnel->getPositionY() * 98.5 / 100));
							auto train_newPos = MoveTo::create(1, Vec2(tunnel->getPositionX() - tunnel->getContentSize().width * .75, train->getPositionY()));
							train->runAction(train_newPos);
						}), delay, CallFunc::create([=] {

							for (int i = 0; i < random; i++) {		// changes done

								auto increase = ScaleTo::create(1, 1.4);
								auto decrease = ScaleTo::create(1, 1);
								randomLetter.at(i)._label->stopAllActions();
								auto repeatForeverAction = RepeatForever::create(Sequence::create(increase, decrease, NULL));
								if (!randomLetter.at(i).id.compare(sentense.at(wordPosition)) && randomLetter.at(i).selected == 0) {
									randomLetter.at(i)._label->runAction(repeatForeverAction);
								}
							}

							//auto increase = ScaleTo::create(1, 1.4);
							//auto decrease = ScaleTo::create(1, 1);
							//auto delay = DelayTime::create(3);
							//randomLetter.at(wordPosition)._label->setPosition(randomLetter.at(wordPosition).xP, randomLetter.at(wordPosition).yP);	has been change
							//repeatForeverAction = RepeatForever::create(Sequence::create(increase, decrease, NULL));
							//randomLetter.at(wordPosition)._label->runAction(repeatForeverAction);
							layer1->setVisible(false);
							wordPosition++;
						}), NULL);
						randomLetter.at(_labelDet.index)._label->runAction(sequence);
					}
					else if (wordPosition == random)
					{
						auto delay = DelayTime::create(1);
						auto target_Action = MoveTo::create(1, Vec2(tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionX(), tunnel_front_sprite.at(wordPosition - 1)._sprite->getPositionY()));
						cocos2d::Sequence *sequence = Sequence::create(target_Action, CallFunc::create([=] {
							auto train_Action = MoveTo::create(1.5, Vec2(visibleSize.width * 130 / 100, final_tunnel->getPositionY()));
							train->runAction(train_Action);
						}), delay, CallFunc::create([=] {
							_menuContext->showScore();
						}), NULL);
						randomLetter.at(_labelDet.index)._label->runAction(sequence);
					}
				}
			}
			else if (randomLetter.at(_labelDet.index).selected == 0 && !(layer1->isVisible())) 
			{
				auto increase = MoveTo::create(1, Vec2(randomLetter.at(_labelDet.index)._label->getPositionX() + visibleSize.width * .10, randomLetter.at(_labelDet.index)._label->getPositionY() + visibleSize.height * .10));
				auto decrease = MoveTo::create(1, Vec2(randomLetter.at(_labelDet.index).xP, randomLetter.at(_labelDet.index).yP));

				layer1->setVisible(true);
				randomLetter.at(_labelDet.index)._label->runAction(Sequence::create(increase, decrease, CallFunc::create([=] {
					layer1->setVisible(false);
					_menuContext->addPoints(-1);
				}), NULL));
			}
			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), _labelDet._label);
}

void Train::resetPosition()
{
	for (int i = 0; i<random; )
	{
		int pos;
		if (_position.size() == 1)
		{
			pos = 0;
		}
		else
			pos = (std::rand() % (_position.size() - 1));

		randomLetter.at(i).xP = _position.at(pos).x;
		randomLetter.at(i).yP = _position.at(pos).y;
		if (i == random - 1)
		{
			auto move = MoveTo::create(3, Vec2(_position.at(pos).x, _position.at(pos).y));
			randomLetter.at(i)._label->runAction(Sequence::create(move, CallFunc::create([=] {
				layer1->setVisible(false);
			}), NULL));
		}
		else
		{
			randomLetter.at(i)._label->runAction(MoveTo::create(3, Vec2(_position.at(pos).x, _position.at(pos).y)));
		}
		_position.erase(_position.begin() + pos);
		i++;
	}
}