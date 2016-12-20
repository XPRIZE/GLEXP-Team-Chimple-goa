#include "jazz.h"
#include "editor-support/cocostudio/CocoStudio.h"


USING_NS_CC;
jazz::jazz()
{

}
jazz::~jazz()
{
	_audioCorrect->stopAllEffects();
	for (auto item = _gorilla.rbegin(); item != _gorilla.rend(); ++item)
	{
		Node * gorilla = *item;
		gorilla->stopAllActions();
	}
}
Scene* jazz::createScene() {
	auto layer = jazz::create();
	auto scene = GameScene::createWithChild(layer, "jazz");
	layer->_menuContext = scene->getMenuContext();
	return scene;
}

Node* jazz::loadNode() {
	auto node = CSLoader::createNode("jazz/MainScene.csb");
	Size visibleSize = Director::getInstance()->getVisibleSize();

	_audioCorrect = CocosDenshion::SimpleAudioEngine::getInstance();

	if (visibleSize.width > 2560) {
		auto myGameWidth = (visibleSize.width - 2560) / 2;
		node->setPositionX(myGameWidth);
	}
	return node;
}

void jazz::createChoice() {

	float wid = Director::getInstance()->getVisibleSize().width;
	float hei = Director::getInstance()->getVisibleSize().height;

	_choice = Node::create();
	//	_choice->setPosition(Vec2(500, 900));
	_choice->setPosition(Vec2(0, 900));

	addChild(_choice);
	const float squareWidth = Director::getInstance()->getVisibleSize().width / (_numGraphemes+2);

	for (int i = 1; i <= _numGraphemes; i++) {
		auto choiceNode = Sprite::createWithSpriteFrameName("jazz/drum.png");
		choiceNode->setAnchorPoint(Vec2(0.5, 0.7));
		//	choiceNode->setPosition(Vec2(i * 400, 0));
		choiceNode->setPosition(Vec2((i + 0.5) * (squareWidth), 110));
		_animate = CSLoader::createNode("jazz/gorilla.csb");
		_animate->setPosition(Vec2((i + 0.5) * (squareWidth), 110));
		_animate->setScale(0.7);
		_gorilla.push_back(_animate);
		_choice->addChild(_animate);
		_animation = CSLoader::createTimeline("jazz/gorilla.csb");
		_jumpingRef.push_back(_animation);
		_animate->runAction(_animation);
		_animation->play("jumping", true);
	//blinking("blinking", true);
		auto blinkAction = CallFunc::create(CC_CALLBACK_0(jazz::blinking, this, "blinking", false));
	    _animate->runAction(RepeatForever::create(Sequence::create(DelayTime::create(2 + (rand() % 60) / 15), blinkAction, NULL)));
	     addChoice(choiceNode);
	}
	
}
void jazz::blinking(std::string animationName, bool loop)
{
	for (auto item = _gorilla.rbegin(); item != _gorilla.rend(); ++item)
	{
		Node * gorilla = *item;
		_blinkAnimation = CSLoader::createTimeline("jazz/gorilla.csb");
		_blinkingRef.push_back(_blinkAnimation);
		gorilla->runAction(_blinkAnimation);
		_blinkAnimation->play(animationName, loop);
		
	}
}
int jazz::getGridHeight()
{
	return 700;
}
void jazz::gameOver(bool correct) {
	if (correct) {
		_grid->touchEndedCallback = nullptr;
		for (auto item = _gorilla.rbegin(); item != _gorilla.rend(); ++item)
		{
			Node * gorilla = *item;
			gorilla->stopAllActions();
		}
		/*for ( auto obj= _jumpingRef.rbegin(); obj != _jumpingRef.rend() ; ++ obj )
		{
			cocostudio::timeline::ActionTimeline * jump = *obj;
			jump->stop();
		}

		for (auto obj = _blinkingRef.rbegin(); obj != _blinkingRef.rend(); ++obj)
		{
			cocostudio::timeline::ActionTimeline * jump = *obj;
			jump->stop();
		}*/
		//_audioCorrect->playEffect("sounds/drum.wav", true);
		_audioCorrect->playBackgroundMusic("sounds/drum.wav", true);
		for (auto item = _gorilla.rbegin(); item != _gorilla.rend(); ++item)
		{
			
			Node * gorilla = *item;
			gorilla->setScale(0.7);
			auto druming = CSLoader::createTimeline("jazz/gorilla.csb");
			gorilla->runAction(druming);
			druming->play("druming", true);
			this->scheduleOnce(schedule_selector(jazz::showScore), 5.0f);
		//	druming->setAnimationEndCallFunc("druming", CC_CALLBACK_0(jazz::showScore, this));

	    }
		
		//auto sprite = animate->getChildByName("gorilla");
		//sprite->setPosition();
	//	this->addChild(sprite);
		//cocostudio::timeline::ActionTimeline *timeLine = CSLoader::createTimeline("TutorialAnim.csb");
		//sprite->runAction(timeLine);
	//	timeLine->play("druming", true);
	}
	else
	{
		for (auto item = _gorilla.rbegin(); item != _gorilla.rend(); ++item)
		{
			Node * gorilla = *item;
			gorilla->stopAllActions();
		}
		for (auto item = _gorilla.rbegin(); item != _gorilla.rend(); ++item)
		{

			Node * gorilla = *item;
			gorilla->setScale(0.7);
			auto druming = CSLoader::createTimeline("jazz/gorilla.csb");
			gorilla->runAction(druming);
			druming->play("sad", true);
//			this->scheduleOnce(schedule_selector(jazz::showScore), 5.0f);
		//	druming->setAnimationEndCallFunc("sad", CC_CALLBACK_0(jazz::showScore, this));

		}
	}
	
}
void jazz::showScore(float dt)
{
	_audioCorrect->stopAllEffects();
	_menuContext->showScore();
}

std::string jazz::getGridBackground() {
	return "jazz/drum_below.png";
}

jazz* jazz::create() {
	jazz* word = new (std::nothrow) jazz();
	if (word && word->init())
	{
		word->autorelease();
		return word;
	}
	CC_SAFE_DELETE(word);
	return nullptr;
}