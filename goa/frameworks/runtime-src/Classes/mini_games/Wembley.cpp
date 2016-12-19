#include "Wembley.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../util/CommonText.h"



USING_NS_CC;

Scene* Wembley::createScene() {
	auto layer = Wembley::create();
	auto scene = GameScene::createWithChild(layer, "wembley");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

Node* Wembley::loadNode() {

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	
	auto node = CSLoader::createNode("wembley/wembleybg.csb");
	node->setPosition(Vec2(visibleSize.width / 2 + origin.x, visibleSize.height/2 + origin.y));
	node->setAnchorPoint(Vec2(0.5, 0.5));

	return node;
}

void Wembley::createAnswer() {

	Size _size = Director::getInstance()->getVisibleSize();
	reorderChild(_background, -2);
	auto label = CommonText::create();
	label->setString(_word);
	label->setFontSize(200);

	if (LangUtil::getInstance()->getLang() == "eng") {
		label->setFontName("fonts/arial.ttf");
	}
	label->setTextColor(Color4B::BLUE);
	_answer = Node::create();
	_answer->addChild(label);
	_answer->setPosition(Vec2(_size.width / 2, _size.height * 88 / 100));
	addChild(_answer);

}

void Wembley::createChoice() {
	float wid = Director::getInstance()->getVisibleSize().width;
	float hei = Director::getInstance()->getVisibleSize().height;

	CocosDenshion::SimpleAudioEngine::getInstance()->preloadBackgroundMusic("sounds/kick.wav");
	//CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic("sounds/applause.mp3", true);
	//CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("sounds/applause.mp3");
	_choice = Node::create();
	_choice->setPosition(Vec2(0, hei * 63 / 100));
	addChild(_choice);

	const float squareWidth = Director::getInstance()->getVisibleSize().width / _numGraphemes;
	
	_timeline.resize(_numGraphemes);
	_character.resize(_numGraphemes); 
	_clickBalls.resize(_numGraphemes);
	_finish = 0;
	
	
	for (int i = 0; i < _numGraphemes; i++) {
			

		_timeline[i] = CSLoader::createTimeline("wembley/char.csb");
		_character[i] = CSLoader::createNode("wembley/char.csb");
		_character[i]->setPosition(Vec2((i + 0.4) * squareWidth, hei * 48 / 100));
		_character[i]->setAnchorPoint(Vec2(0.5, 0.5));
		addChild(_character[i], 0);
		_character[i]->runAction(_timeline[i]);
		_timeline[i]->play("front_idle", true);
		
		auto dotBall = Sprite::createWithSpriteFrameName("wembley/balldash.png");
		dotBall->setPosition(Vec2((i + 0.4) * squareWidth, hei * -10/100));
		//dotBall->setPosition(Vec2((i + 0.4) * squareWidth, hei * 48 / 100));
		addChoice(dotBall);
	}
	
	_goalkeepertimeline = CSLoader::createTimeline("wembley/char.csb");
	_goalKeeper = CSLoader::createNode("wembley/char.csb");
	_goalKeeper->setPosition(Vec2((wid * 50) / 100, (hei * 69) / 100));
	_goalKeeper->setScale(0.5, 0.5);
	addChild(_goalKeeper, -1);
	_goalKeeper->runAction(_goalkeepertimeline);
	_goalkeepertimeline->play("front_idle", true);

	
}

std::string Wembley::getGridBackground() {
	return "wembley/ballshade.png";
}

std::string Wembley::getGraphemeUnselectedBackground() {
	
	return "wembley/ball.png";
}

std::string Wembley::getGraphemeSelectedBackground() {
	return "wembley/ball.png";
}

int Wembley::getGridHeight() {
	return 800;
}

Wembley* Wembley::create() {
	Wembley* word = new (std::nothrow) Wembley();
	if (word && word->init())
	{
		word->autorelease();
		return word;
	}
	CC_SAFE_DELETE(word);
	return nullptr;
}

void Wembley::gameOver(bool correct) {
	if (correct) {
		//_menuContext->showScore();

		float wid = Director::getInstance()->getVisibleSize().width;
		float hei = Director::getInstance()->getVisibleSize().height;
		

		auto delay = DelayTime::create(1.0f);
		//auto callback = CallFunc::create(CC_CALLBACK_0(Grapheme::changeBackground, this));
		
		auto moveTo = MoveBy::create(0.7, Vec2((wid * 10) / 100, 0));
		//auto sequence = Sequence::create(moveTo, delay, moveTo->reverse(), delay, moveTo, delay, moveTo->reverse(), nullptr);
		
	
		auto sequence = Sequence::create(
			moveTo, delay, 
			moveTo, delay, 
			moveTo, delay,
			moveTo, delay,
			moveTo, delay,
			moveTo, delay
			, nullptr);

		_clickBallInitialPoints.resize(_numGraphemes);
		//auto moveTo = MoveBy::create(0.7, Vec2((wid * 10) / 100, 0));
		//_goalKeeper->runAction(sequence);
		
		
		for (int i = 0; i < _numGraphemes; i++) {
			cocos2d::Point tempPoint;
			tempPoint.x = _answerVector.at(i).first->getPosition().x;

			tempPoint.y = -1 * _answerVector.at(i).first->getPosition().y;

			_clickBallInitialPoints[i] = tempPoint; //setPoint(_answerVector.at(i).first->getPosition().x, _answerVector.at(i).first->getPosition().y);
			CCLOG("Point %d: %f %f", i, _answerVector.at(i).first->getPosition().x, _answerVector.at(i).first->getPosition().y);
		
			
			
		}
		//_answerVector.at(0).first->setScale(0.5);
		//_answerVector.clear();
		
		_choice->removeAllChildrenWithCleanup(true);
		
		for (int i = 0; i < _numGraphemes; i++) {
			_timeline[i]->play("back_idle", true);
			reorderChild(_character[i], 1);
			_answerVector.at(i).second->setVisible(false);	


			_clickBalls[i] = cocos2d::Sprite::createWithSpriteFrameName("wembley/ball.png");
			_clickBalls[i]->setPosition(Vec2(_clickBallInitialPoints.at(i).x, hei * 55 / 100));
			_clickBalls[i]->setScale(0.6);
			_clickBalls[i]->setTag(i);
			addChild(_clickBalls[i], 0);
			addEventsBall(_clickBalls[i]);
			
		}

		_answerVector.clear();
		_finish = 1;

		
	}
	else {
	

	}
}


void Wembley::addEventsBall(cocos2d::Sprite* callerObject)
{
	static int kicks = 0;
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size s = target->getContentSize();
		Rect rect = Rect(0, 0, s.width, s.height);
		if (target->getBoundingBox().containsPoint(touch->getLocation())) {

			CocosDenshion::SimpleAudioEngine::getInstance()->playEffect("./sounds/kick.wav");

			float wid = Director::getInstance()->getVisibleSize().width;
			float hei = Director::getInstance()->getVisibleSize().height;
			
			auto moveTo = MoveTo::create(0.7, Vec2((wid * RandomHelper::random_int(20, 70)) / 100, (hei * RandomHelper::random_int(77, 90)) / 100));
			
			
			auto removeBall = CallFunc::create([=]() {
				
				removeChild(target);				
			});

			auto kickBall = CallFunc::create([=]() {

				//auto kickTimeline = CSLoader::createTimeline("wembley/char.csb");
				//auto kick = CSLoader::createNode("wembley/char.csb");
				//kick->setPosition(Vec2(target->getPosition()));

				//addChild(kick);
				//target->runAction(kickTimeline);
				//_character[target->getTag()]->runAction(_timeline[target->getTag()]);
				_timeline[target->getTag()]->play("kick", false);
				kicks++;
				CCLOG("kicks %d", kicks);
				//kickTimeline->play("kick", false);
			});

			auto idleCharacter = CallFunc::create([=]() {

				//auto kickTimeline = CSLoader::createTimeline("wembley/char.csb");
				//auto kick = CSLoader::createNode("wembley/char.csb");
				//kick->setPosition(Vec2(target->getPosition()));

				//addChild(kick);
				//target->runAction(kickTimeline);
				//_character[target->getTag()]->runAction(_timeline[target->getTag()]);
				_timeline[target->getTag()]->play("back_idle", true);
				//kickTimeline->play("kick", false);
			});
			auto delay = DelayTime::create(0.5f);
			//_menuContext->showScore();
			
			auto sequence = Sequence::create(kickBall, moveTo, removeBall, nullptr);
		
			if(kicks<_numGraphemes-1)
				target->runAction(sequence);
			else {
				auto endGame = CallFunc::create([=]() {
					 kicks = 0;
					 _finish = 0;
					_menuContext->showScore();
				});
				auto sequence = Sequence::create(kickBall, moveTo, removeBall,  endGame, nullptr);
				target->runAction(sequence);
				
			}

			

		}
		return true;
	};
	
	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
	
}

Wembley::~Wembley(void) {

	_finish = 0;
}
