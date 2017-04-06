#include "AlphaPhonics.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Scene* AlphaPhonics::createScene()
{
	auto scene = Scene::create();
	auto layer = AlphaPhonics::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, AlphaPhonics::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

AlphaPhonics *AlphaPhonics::create() {
	AlphaPhonics *blast = new (std::nothrow) AlphaPhonics();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;

}

bool AlphaPhonics::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void AlphaPhonics::onEnterTransitionDidFinish() {

	Node* bg = CSLoader::createNode("alphaphonics/alphaphonics.csb");
	addChild(bg);
	bg->setName("bg");
	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	LiftAnimationHandler(++liftOpenChoice);
		
	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	
	auto boardText = CommonLabelTTF::create(TextGenerator::getInstance()->translateString("A a"), "Helvetica", parentOption->getChildByName("board")->getContentSize().height * 0.5);
	boardText->setPosition(parentOption->getChildByName("board")->getContentSize().width / 2, parentOption->getChildByName("board")->getContentSize().height / 2);
	parentOption->getChildByName("board")->addChild(boardText);
	boardText->setName("board");
	
	optionNames.push_back("Ant");
	optionNames.push_back("Parrot");
	optionNames.push_back("Kite");
	optionNames.push_back("Mobile");

	OptionListner(createSprite(optionNames[0],1,parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option1")->getPosition()));
	OptionListner(createSprite(optionNames[1],2, parentOption->getChildByName("option2")->getContentSize(), parentOption->getChildByName("option2")->getPosition()));
	OptionListner(createSprite(optionNames[2], 3,parentOption->getChildByName("option3")->getContentSize(), parentOption->getChildByName("option3")->getPosition()));
	OptionListner(createSprite(optionNames[3],4, parentOption->getChildByName("option4")->getContentSize(), parentOption->getChildByName("option4")->getPosition()));

	this->scheduleUpdate();
}

void AlphaPhonics::update(float delta) {

}

void AlphaPhonics::OptionListner(Sprite *option) {
	auto classRefer = this;
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		Size targetSize = target->getContentSize();
		auto location = target->convertToNodeSpace(touch->getLocation());
		Rect targetRect = Rect(0, 0, targetSize.width, targetSize.height);
		if (target->getBoundingBox().containsPoint(touch->getLocation()) && touchOption) {
			classRefer->currentOptionPosition = target->getTag();
			target->setScale(1.3);
			touchOption = false;
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event) {
		auto classReference = this;
		auto target = event->getCurrentTarget();
		target->setPosition(touch->getLocation());
		return true;

	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
		
		auto setTouchPermission = CallFunc::create([=]() {
			touchOption = true;
		});
		
		auto setTagOfCorrectObj = CallFunc::create([=]() {
			
			classRefer->_optionValue.push_back(target->getTag());
			classRefer->OptionChangeAnimation(classRefer->_optionValue);
			target->setTag(0);

			if (liftOpenChoice < 4) {
				LiftAnimationHandler(++liftOpenChoice);
			}
			else {
				//_menuContext->setMaxPoints(classReference->counterHit);
				classRefer->runAction(Sequence::create(DelayTime::create(2),CallFunc::create([=]() {_menuContext->showScore(); }), NULL));
			}
		});

		auto elevatorObj = parentOption->getChildByName(StringandIntConcat("elevator", liftOpenChoice));
		if (target->getBoundingBox().intersectsRect(elevatorObj->getBoundingBox())&& DataCorrectOrNot((Sprite*)target)) {

			target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(elevatorObj->getPosition())), setTagOfCorrectObj, NULL));
		}
		else {		
			if (target->getTag() == 1) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option1")->getPosition())), setTouchPermission, NULL));
			}
			else if (target->getTag() == 2) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option2")->getPosition())), setTouchPermission, NULL));
			}
			else if (target->getTag() == 3) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option3")->getPosition())), setTouchPermission, NULL));
			}
			else if (target->getTag() == 4) {
				target->runAction(Sequence::create(MoveTo::create(0.6, Vec2(parentOption->getChildByName("option4")->getPosition())), setTouchPermission, NULL));
			}
			target->setScale(1);
		}

	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, option);
}

string AlphaPhonics::StringandIntConcat(string data,int number) {
	
	std::ostringstream value;
	value << data << number;
	return value.str();
}

void AlphaPhonics::LiftAnimationPlay(string elevatorName,string animationName)
{
	auto timelineLift = CSLoader::createTimeline("alphaphonics/elevator.csb");
	auto lift = this->getChildByName("bg")->getChildByName("FileNode_2")->getChildByName(elevatorName);
	lift->runAction(timelineLift);
	timelineLift->play(animationName, false);
}

void AlphaPhonics::LiftAnimationHandler(int elevatorNo) {
	auto liftUp = CallFunc::create([=]() {
		touchOption = false;
		LiftAnimationPlay(StringandIntConcat("elevator", elevatorNo), "liftup");
	});

	auto liftOpen = CallFunc::create([=]() {
		touchOption = true;
		LiftAnimationPlay(StringandIntConcat("elevator", elevatorNo), "dooropen");
	});

	this->runAction(Sequence::create(liftUp, DelayTime::create(2), liftOpen, NULL));

}

bool AlphaPhonics::DataCorrectOrNot(Sprite* option) {

	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	CommonLabelTTF *ttfBoard = (CommonLabelTTF*)parentOption->getChildByName("board")->getChildByName("board");
	auto boardText = ttfBoard->getString();

	string optionText = ((CommonLabelTTF*)option->getChildByName("name"))->getString();

	if (boardText[0] == optionText[0]) {
		return true;
	}
	return false;
}

void AlphaPhonics::OptionChangeAnimation(vector<int> optionNumber) {
	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	vector<Sprite*> options;

	for (int i = 1; i <= 4; i++) {
		for (int j = 0; j < optionNumber.size(); j++) {
				if (i != optionNumber[j]) {
				auto optionObj = (Sprite*)this->getChildByName(StringandIntConcat("option",i));
				options.push_back(optionObj);
			}
		}
	}

	for (int i = 0; i < options.size(); i++) {
		options[i]->runAction(RotateBy::create(1.5f, 360.0f));
		options[i]->runAction(ScaleTo::create(1.5f, 0.0f));
	}

	this->runAction(Sequence::create(DelayTime::create(1.6), CallFunc::create([=]() {RecreateOptions(optionNames);}), NULL));
}

void AlphaPhonics::RecreateOptions(std::vector<string> optionName) {
	auto parentOption = this->getChildByName("bg")->getChildByName("FileNode_2");
	OptionListner(createSprite(optionName[0], 1, parentOption->getChildByName("option1")->getContentSize(), parentOption->getChildByName("option1")->getPosition()));
	OptionListner(createSprite(optionName[1], 2, parentOption->getChildByName("option2")->getContentSize(), parentOption->getChildByName("option2")->getPosition()));
	OptionListner(createSprite(optionName[2], 3, parentOption->getChildByName("option3")->getContentSize(), parentOption->getChildByName("option3")->getPosition()));
	OptionListner(createSprite(optionName[3], 4, parentOption->getChildByName("option4")->getContentSize(), parentOption->getChildByName("option4")->getPosition()));
}

Sprite* AlphaPhonics::createSprite(string spriteName, int currentOptionPosition,Size size,Vec2 position) {
	auto sprite = Sprite::create();
	sprite->setTextureRect(Rect(0, 0, size.height, size.width));
	sprite->setColor(Color3B::GRAY);
	sprite->setPosition(Vec2(position.x,position.y));
	sprite->setTag(currentOptionPosition);
	sprite->setName(StringandIntConcat("option",currentOptionPosition));

	auto boardText = CommonLabelTTF::create(TextGenerator::getInstance()->translateString(spriteName), "Helvetica", sprite->getContentSize().height * 0.2);
	boardText->setPosition(sprite->getContentSize().width / 2, sprite->getContentSize().height / 2);
	boardText->setName("name");
	sprite->addChild(boardText);

	addChild(sprite);
	return sprite;
}

AlphaPhonics::~AlphaPhonics(void)
{
	this->removeAllChildrenWithCleanup(true);
}
