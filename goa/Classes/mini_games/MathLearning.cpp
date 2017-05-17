#include "MathLearning.h"
#include "../menu/HelpLayer.h"
#include <math.h> 
#include "../util/CommonLabelTTF.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;
USING_NS_CC;


Scene* MathLearning::createScene()
{
	auto scene = Scene::create();
	auto layer = MathLearning::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, MathLearning::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

void MathLearning::onEnterTransitionDidFinish()
{
	//CCSpriteFrameCache* framecache1 = CCSpriteFrameCache::sharedSpriteFrameCache();
	//framecache1->addSpriteFramesWithFile("mathlearning/mathlearning.plist");

	int gameCurrentLevel = _menuContext->getCurrentLevel();

	auto mathLearningBackground = CSLoader::createNode("mathlearning/mathlearning.csb");
	this->addChild(mathLearningBackground, 0);
	mathLearningBackground->setName("bg");

	if(visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		mathLearningBackground->setPositionX(myGameWidth);
	}

	Vector <Node*> children = mathLearningBackground->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node *monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}

	_animCsbPath = {
		{ 1,	"elephant_animation/elephant_animation.csb" },
		{ 2,	"Giraffe_animation/Giraffe_animation.csb" },
		{ 3,    "gorillacoin/gorillacoin.csb" },
		{ 4 ,	"lion_animation/lion.csb" },
		{ 5,	"owl/owlanimation.csb" },
		{ 6,	"zebra_animation/zebra_animation.csb" }
				   };

	int answer;
	_operation = "addition";
	string firstInput, secondInput, ansStr;

	_inputFirst = RandomHelper::random_int(2, 10);
	_inputSecond = RandomHelper::random_int(1, 10);
	if (_operation.compare("addition"))
	{
		while (_inputSecond >= _inputFirst) {
			_inputSecond = RandomHelper::random_int(1, 10);
		}
	}

		string textOnDisplay, operationSymbol;

		std::ostringstream firstNo;
		firstNo << _inputFirst;
		firstInput = firstNo.str();

		std::ostringstream secondNo;
		secondNo << _inputSecond;
		secondInput = secondNo.str();


		if (!_operation.compare("addition"))
		{
			textOnDisplay = firstInput + " + " + secondInput;
			_answer = _inputFirst + _inputSecond;
			operationSymbol = "+";
		}
		else
		{
			while (_inputFirst <= _inputSecond) {
				_inputSecond = RandomHelper::random_int(1, 10);
			}
			textOnDisplay = firstInput + " - " + secondInput;
			_answer = _inputFirst - _inputSecond;
			operationSymbol = "-";
			
		}

		auto sign = (Sprite*)getChildByName("bg")->getChildByName("grid")->getChildByName("operation");
		auto operation = setAllLabelProperties(operationSymbol, 0, sign->getPositionX(), sign->getPositionY(), true, 0.5, 0.5, 0, 1, 1, 250);
		operation->setColor(cocos2d::Color3B(255, 255, 255));
		operation->setName("operationSymbol");
		this->addChild(operation, 0);

		
		auto label = setAllLabelProperties(textOnDisplay, 0, visibleSize.width*0.5, visibleSize.height*0.94, true, 0.5, 0.5, 0, 1, 1, 180);
		label->setColor(cocos2d::Color3B(255, 255, 255));
		label->setName("question");
		this->addChild(label, 0);

		ansStr = convertIntToString(0);
		auto ans = (Sprite*)getChildByName("bg")->getChildByName("grid")->getChildByName("ans");
		auto answerLabel = setAllLabelProperties(ansStr, 0, ans->getContentSize().width*0.5, ans->getContentSize().height*0.5, true, 0.5, 0.5, 0, 1, 1, 240);
		answerLabel->setColor(cocos2d::Color3B(255, 255, 255));
		answerLabel->setName("answer");
		answerLabel->setVisible(false);
		ans->addChild(answerLabel, 0);


		for (int i = 1; i <= 10; i++)
		{
			auto left = getGridWithIndex(i, "l");
			auto right = getGridWithIndex(i, "r");
			auto leftShadow = getGridWithIndex(i, "sl");
			auto rightShadow = getGridWithIndex(i, "sr");
			
			left->setVisible(false);
			right->setVisible(false);
			leftShadow->setVisible(false);
			rightShadow->setVisible(false);

			left->setName("left");
			right->setName("right");

			_leftBallBin.push_back(left);
			_rightBallBin.push_back(right);
			_leftBallBinShadow.push_back(leftShadow);
			_rightBallBinShadow.push_back(rightShadow);
		}
		float delayLeft = 0;
		float delayRight = 0;
		for (int i = 0; i < _inputFirst; i++)
		{
			this->runAction(Sequence::create(DelayTime::create(delayLeft), CallFunc::create([=] {
				_leftBallBin[i]->setScale(0.001);
				_leftBallBin[i]->setVisible(true);
				_leftBallBinShadow[i]->setVisible(true);
				auto scaleTo = ScaleTo::create(1, 1);
				EaseElasticOut *easeAction = EaseElasticOut::create(scaleTo);
				_leftBallBin[i]->runAction(easeAction);
				addTouchEvents(_leftBallBin[i]);
			}), NULL));
			delayLeft += 0.5;
		}
		for (int j = 0; j < _inputSecond; j++)
		{
			this->runAction(Sequence::create(DelayTime::create(delayRight), CallFunc::create([=] {
			
				_rightBallBin[j]->setScale(0.001);
				_rightBallBin[j]->setVisible(true);
				_rightBallBinShadow[j]->setVisible(true);
				auto scaleTo = ScaleTo::create(1, 1);
				EaseElasticOut *easeAction = EaseElasticOut::create(scaleTo);
				_rightBallBin[j]->runAction(easeAction);
				addTouchEvents(_rightBallBin[j]);
			}), NULL));
			delayRight += 0.5;
		}

		if (_inputFirst >= _inputSecond)
		{
			this->runAction(Sequence::create(DelayTime::create(0.5* _inputFirst), CallFunc::create([=] {
			       	_leftTouchFlag = true;
			}), NULL));
		}
		else
		{
			this->runAction(Sequence::create(DelayTime::create(0.5 * _inputSecond), CallFunc::create([=] {
				_leftTouchFlag = true;
			}), NULL));
		}
	this->scheduleUpdate();
}

MathLearning::MathLearning()
{

}

MathLearning::~MathLearning()
{

}

void MathLearning::update(float dt)
{

}

LabelTTF* MathLearning::setAllLabelProperties(std::string letterString, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel)
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


string MathLearning::getGridNameInString(int ballNumber, string direction) {
	std::ostringstream gridName;
	gridName << direction << ballNumber;
	return gridName.str();
}

Sprite* MathLearning::getGridWithIndex(int ballNumber, string direction) {

	auto gridName = getGridNameInString(ballNumber, direction);
	auto grid = (Sprite*)getChildByName("bg")->getChildByName("grid")->getChildByName(gridName);
	return grid;
}

void MathLearning::addTouchEvents(Sprite* sprite)
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);
	
	auto label = (LabelTTF*)getChildByName("bg")->getChildByName("grid")->getChildByName("ans")->getChildByName("answer");
	

	listener->onTouchBegan = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = event->getCurrentTarget();
		if (target->getBoundingBox().containsPoint(touch->getLocation()) && _leftTouchFlag )
		{
			
			if (!(target->getName().compare("left")) && (target->getTag() != 1))
			{
				label->setVisible(true);
				_answerUpdate++;
				label->setString(convertIntToString(_answerUpdate));
				auto sequence_E = ScaleTo::create(0.1, (1.1));
				auto sequence_F = ScaleTo::create(0.1, 1);
				label->runAction(Sequence::create(sequence_E, sequence_F, NULL));

				touchEffectForAddition((Sprite*)target);
				
				int counter = 0;
				for (int i = 0; i < _inputFirst; i++)
				{
					if (_leftBallBin[i]->getTag() == 1)
					{
						counter++;
					}
				}
				if (counter == _inputFirst)
				{
					_rightTouchFlag = true;
				}
				
			}
			else if (!(target->getName().compare("right")) && _rightTouchFlag && (target->getTag() != 1))
			{
				if (!_operation.compare("addition"))
				{
					_answerUpdate++;
					touchEffectForAddition((Sprite*)target);
				}
				else
				{
					touchEffectForSubtraction((Sprite*)target);
					_answerUpdate--;
					if (_answerUpdate == _answer)
					{
						_sutractionCorrect = true;
					}
				}
				
				if (_answerUpdate == _answer && !_operation.compare("addition"))
				{
					playWinAnim();
				}
				else if (!_operation.compare("subtraction") && _sutractionCorrect)
				{
					playWinAnim();
				}

				label->setString(convertIntToString(_answerUpdate));
				auto sequence_E = ScaleTo::create(0.1, (1.1));
				auto sequence_F = ScaleTo::create(0.1, 1);
				label->runAction(Sequence::create(sequence_E, sequence_F, NULL));
			}
			
			
			//Director::getInstance()->getEventDispatcher()->pauseEventListenersForTarget(target);
			return true;
		}
		return false;
	};
	listener->onTouchMoved = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{

	};
	listener->onTouchEnded = [=](cocos2d::Touch *touch, cocos2d::Event *event)
	{
		
	};
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite);
}

void MathLearning::touchEffectForAddition(Sprite * obj)
{
	auto scaleTo = ScaleTo::create(0.1, 1.1);
	auto scaleTo1 = ScaleTo::create(0.1, 1);
	obj->runAction(Sequence::create(scaleTo, scaleTo1, NULL));
	obj->setColor(cocos2d::Color3B(44, 239, 43));

	obj->setTag(1);
}

void MathLearning::touchEffectForSubtraction(Sprite * obj)
{
	auto scaleTo = ScaleTo::create(0.1, 1.1);
	auto scaleTo1 = ScaleTo::create(0.1, 1);
	obj->runAction(Sequence::create(scaleTo, scaleTo1, NULL));
	obj->setColor(cocos2d::Color3B(44, 239, 43));
	obj->setTag(1);
	obj->setVisible(false);

	_inputFirst--;
	_leftBallBin[_inputFirst]->setColor(cocos2d::Color3B::WHITE);
	_leftBallBin[_inputFirst]->setVisible(false);
	_leftBallBinShadow[_inputFirst]->setVisible(false);
	
}

string MathLearning::convertIntToString(int num)
{
	string str;
	std::ostringstream initialize;
	initialize << num;
	str = initialize.str();
	return str;
}

void MathLearning::playWinAnim()
{
	int random = RandomHelper::random_int(1, 6);
	string str = _animCsbPath.at(random);
	if (!_operation.compare("addition"))
	{
		for (int i = 0; i < _rightBallBin.size(); i++)
		{
			_rightBallBin[i]->setColor(cocos2d::Color3B::WHITE);

			auto animationAnimalTimeline = CSLoader::createTimeline(str);
			auto animationAnimal = CSLoader::createNode(str);
			animationAnimal->runAction(animationAnimalTimeline);
			animationAnimal->setScale(0.5);

			auto size = _rightBallBin[i]->getContentSize();

			_rightBallBin[i]->addChild(animationAnimal);
			animationAnimal->setPosition(Vec2(_rightBallBin[i]->getContentSize().width / 2, _rightBallBin[i]->getContentSize().height / 2));
			animationAnimalTimeline->gotoFrameAndPlay(0, true);
		}
	}
		for (int i = 0; i < _leftBallBin.size(); i++)
		{
			_leftBallBin[i]->setColor(cocos2d::Color3B::WHITE);

			auto animationAnimalTimeline = CSLoader::createTimeline(str);
			auto animationAnimal = CSLoader::createNode(str);
			animationAnimal->runAction(animationAnimalTimeline);
			animationAnimal->setScale(0.5);

			auto size = _leftBallBin[i]->getContentSize();

			_leftBallBin[i]->addChild(animationAnimal);
			animationAnimal->setPosition(Vec2(_leftBallBin[i]->getContentSize().width / 2, _leftBallBin[i]->getContentSize().height / 2));
			animationAnimalTimeline->gotoFrameAndPlay(0, true);
		}
		this->runAction(Sequence::create(DelayTime::create(3), CCCallFunc::create([=] {  fadingOut();    }),
			DelayTime::create(1.7), CCCallFunc::create([=] {

		auto grid = (Sprite*)getChildByName("bg")->getChildByName("grid");
		MoveTo *scaleTo = MoveTo::create(1.8, Vec2(-2600, grid->getPositionY()));
		EaseBackIn *easeAction = EaseBackIn::create(scaleTo);
		grid->runAction(easeAction);

		}), DelayTime::create(2), CCCallFunc::create([=] {  quiz();    }), NULL));
}

void MathLearning::fadingOut()
{
	auto ans = (Sprite*)getChildByName("bg")->getChildByName("grid")->getChildByName("ans");;
	auto anss = (Sprite*)getChildByName("bg")->getChildByName("grid")->getChildByName("anss");
	auto sign = this->getChildByName("operationSymbol");
	auto question = this->getChildByName("question");
	auto board = (Sprite*)getChildByName("bg")->getChildByName("bg")->getChildByName("board");

	FadeOut *fadeOut1 = FadeOut::create(1.7);
	FadeOut *fadeOut2 = FadeOut::create(1.7);
	FadeOut *fadeOut3 = FadeOut::create(1.7);
	FadeOut *fadeOut4 = FadeOut::create(1.7);
	FadeOut *fadeOut5 = FadeOut::create(1.7);

	ans->runAction(fadeOut1);
	sign->runAction(fadeOut2);
	question->runAction(fadeOut3);
	board->runAction(fadeOut4);
	anss->runAction(fadeOut5);
}

void MathLearning::quiz()
{
	auto quiz = CSLoader::createNode("mathlearning/quiz.csb");
	this->addChild(quiz, 0);
	quiz->setName("quiz");
	auto option1 = (Sprite*)quiz->getChildByName("1");
	auto option2 = (Sprite*)quiz->getChildByName("2");
	auto option3 = (Sprite*)quiz->getChildByName("3");
	auto option4 = (Sprite*)quiz->getChildByName("4");
	auto board = (Sprite*)quiz->getChildByName("quiz");

	quizPopUp(option1); quizPopUp(option2); quizPopUp(option3); quizPopUp(option4); quizPopUp(board);
	
	Vector <Node*> children = quiz->getChildren();
	int size = children.size();
	for (auto item = children.rbegin(); item != children.rend(); ++item) {
		Node *monsterItem = *item;
		std::string str = monsterItem->getName().c_str();
		CCLOG("name : %s", str.c_str());
	}
}

void MathLearning::quizPopUp(Sprite* obj)
{
	obj->setScale(0.0001);

	auto scaleTo = ScaleTo::create(1, 1);
	auto easeElastic = EaseElasticOut::create(scaleTo);
	obj->runAction(easeElastic);
}
