//
//  BasicLetterCase.cpp
//  goa
//
//  Created by Karim Mirazul  on 14/07/17
//
//

#include "BasicLetterCase.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"
#include "../util/MatrixUtil.h"

USING_NS_CC;

Scene* BasicLetterCase::createScene()
{
	auto scene = Scene::create();
	auto layer = BasicLetterCase::create();
	scene->addChild(layer);
	layer->_menuContext = MenuContext::create(layer, BasicLetterCase::gameName());
	scene->addChild(layer->_menuContext);
	return scene;
}

BasicLetterCase *BasicLetterCase::create() {
	BasicLetterCase *blast = new (std::nothrow) BasicLetterCase();
	if (blast && blast->init()) {
		blast->autorelease();
		return blast;
	}
	CC_SAFE_DELETE(blast);
	return nullptr;
}

bool BasicLetterCase::init()
{
	if (!Layer::init()) { return false; }

	return true;
}

void BasicLetterCase::onEnterTransitionDidFinish() {
	
	auto bg = CSLoader::createNode("res/basiclettercase/bg.csb");
	addChild(bg);
	bg->setName("bg");

    _eventDispatcher->addCustomEventListener("multipleChoiceQuiz", CC_CALLBACK_1(BasicLetterCase::createIceCreams, this));
    _lesson.getMultiChoices(4, 0);

	if (Director::getInstance()->getVisibleSize().width > 2560) {
		auto myGameWidth = (Director::getInstance()->getVisibleSize().width - 2560) / 2;
		bg->setPositionX(myGameWidth);
	}

	//this->scheduleUpdate();
}

void BasicLetterCase::update(float delta) {

}

void BasicLetterCase::setSpriteProperties(Node* ImageObject, float positionX, float positionY, float scale, float anchorX, float anchorY, float rotation, int zorder) {
	ImageObject->setPosition(Vec2(positionX, positionY));
	ImageObject->setScale(scale);
	//ImageObject->setAnchorPoint(Vec2(anchorX, anchorY));
	ImageObject->setRotation(rotation);
	ImageObject->setZOrder(zorder);
}

CommonLabelTTF* BasicLetterCase::createText(string text,string name,float positionX , float positionY) {
	auto label = CommonLabelTTF::create(text, "Helvetica", 150);
	label->setColor(Color3B::BLACK);
	label->setScale(1);
	label->setPosition(Vec2(positionX , positionY));
	label->setName(name);
	return label;
}


void BasicLetterCase::createIceCreams(cocos2d::EventCustom *eventCustom) {
    CCLOG("onLessonReady begin");
    std::string* buf = static_cast<std::string*>(eventCustom->getUserData());
    CCLOG("onLessonReady to unmarshallMultiChoices");
    vector<Lesson::MultiChoice> vmc = Lesson::unmarshallMultiChoices(buf);

	for (int i = 0; i < vmc.size(); i++) {
		CCLOG("vmc : %d question -> %s , correctAnswer index : %d  , correctAnswer value : %s",i,vmc[i].question.c_str(),vmc[i].correctAnswer,vmc[i].answers[vmc[i].correctAnswer].c_str());
		for (int j = 0; j < vmc[i].answers.size(); j++) {
			CCLOG("%d answerchoice -> %s\n", j, vmc[i].answers[j].c_str());
		}
	}

	//set Info for each Item ...
	auto indexCream = getRandomValueRange(1, 9, 4);
	float positionX[] = { 0.20 , 0.40 , 0.60 , 0.80};

    auto mapping = MatrixUtil::questionToAnswerMapping(vmc);
    vector<string> coneLetter, creamLetter;
	
	
	for (std::map<std::string, std::string>::iterator it = mapping.begin(); it != mapping.end(); ++it) {
		CCLOG("map -> key :%s , value :%s",it->first.c_str(),it->second.c_str());
	}

	// Get all Upper and Lower Case from API ....
	for (int i = 0; i < vmc.size(); i++) {
		coneLetter.push_back(vmc[i].question);
		creamLetter.push_back(vmc[i].answers[vmc[i].correctAnswer]);
	}

    std::random_shuffle(coneLetter.begin(),coneLetter.end());
    std::random_shuffle(creamLetter.begin(), creamLetter.end());
	 
	auto size = Director::getInstance()->getVisibleSize();
	for (size_t i = 0; i < indexCream.size(); i++) {
		
		//create cone and Text....
		auto cone = CSLoader::createNode("basiclettercase/cone.csb");
		setSpriteProperties(cone,size.width * positionX[i] , size.height * 0.25 , 0.3, 0.5,0.5,0,0);
		cone->runAction(EaseElasticOut::create(ScaleTo::create(1, 1)));
		addChild(cone);

		// coneAlphabet and Text config ...
		auto coneText = createText(coneLetter[i], mapping.at(coneLetter[i]) ,0,0);
		cone->setName(mapping.at(coneLetter[i]));
		cone->setTag( 100 + i);
		cone->addChild(coneText);

		//create cream and Text....
		std::ostringstream creamTextValue;	creamTextValue << "basiclettercase/icecream" << indexCream[i] << ".csb";
		auto cream = CSLoader::createNode(creamTextValue.str());
		setSpriteProperties(cream, cone->getPositionX(), size.height * 0.65, 0.3, 0.5, 0.5, 0, 0);
		cream->runAction(EaseElasticOut::create(ScaleTo::create(1, 1)));
		cream->setTag( 200 + i);
		addChild(cream);

		//cream alphabet and TextLabel config ...
		auto creamText = createText(creamLetter[i], creamLetter[i] , 0, 20);
		cream->addChild(creamText);
		cream->setName(creamLetter[i]);
		addEventsOnCream((Sprite*)cream->getChildByName("icecream"));
	}
}

vector<int> BasicLetterCase::getLettersAccordingToLevels() {

	vector<int> letterValue;

	auto maxLetterForCurrentLevel = (_menuContext->getCurrentLevel() * 4);

	for (int i = maxLetterForCurrentLevel - 4 ; i < maxLetterForCurrentLevel; i++) {
		auto no = LangUtil::getInstance()->getNumberOfCharacters();
		if(no > i)
			letterValue.push_back(i);
		else
		{
			auto value = getRandomValueRange(0, LangUtil::getInstance()->getNumberOfCharacters()-1, 1)[0];
			while (true) {
				bool flag = true;
				for (int i = 0; i < letterValue.size(); i++) {
					if (value == letterValue[i]) {
						flag = false;
					}
				}
				if (flag) {
					letterValue.push_back(value);
					break;
				}
				value = getRandomValueRange(0, LangUtil::getInstance()->getNumberOfCharacters() - 1, 1)[0];
			}
		}
	}

	return letterValue;
}

void BasicLetterCase::addEventsOnCream(cocos2d::Sprite* callerObject)
{
	auto classRefer = this;
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(false);

	listener->onTouchBegan = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto locationInNode = target->convertToNodeSpace(touch->getLocation());
		auto targetRect = Rect(target->getPosition(), target->getContentSize());
		if (targetRect.containsPoint(locationInNode) && _touchFlag && target->getParent()->getTag() > 0) {
			target->getParent()->setZOrder(4);
			target->getParent()->setScale(1.2);

			CCParticleSystemQuad *particle = CCParticleSystemQuad::create("res/basiclettercase/creameffect.plist");
			particle->setTexture(CCTextureCache::sharedTextureCache()->addImage("res/basiclettercase/creameffect.png"));
			particle->setPosition(target->getParent()->getPosition());
			particle->setName("creameffect");
			this->addChild(particle, 0);

			_touchFlag = false;
			return true;
		}
		return false;
	};

	listener->onTouchMoved = [=](cocos2d::Touch* touch, cocos2d::Event* event) {
		
		auto target = event->getCurrentTarget();
		target->getParent()->setPosition(touch->getLocation());
	};

	listener->onTouchEnded = [=](cocos2d::Touch* touch, cocos2d::Event* event)
	{
		auto target = event->getCurrentTarget();
		auto locationInNode = target->convertToNodeSpace(touch->getLocation());
		auto targetRect = Rect(target->getParent()->getPosition(), target->getContentSize());
		target->getParent()->runAction(ScaleTo::create(0.5,1));
		target->getParent()->setZOrder(1);
	
		bool flag = true;
		auto size = Director::getInstance()->getVisibleSize();
		for (int i = 0; i < 4; i++) {
			auto cone = getChildByTag(100 + i);
			if (cone) {
				auto coneRect = Rect(Vec2(cone->getPositionX(), cone->getPositionY() - cone->getChildByName("cone")->getContentSize().height * 0.3), cone->getChildByName("cone")->getContentSize());
				
				if (targetRect.intersectsRect(coneRect)) {

					auto audio = CocosDenshion::SimpleAudioEngine::getInstance();
					_counterTotalHit++;
					flag = false;
					if (target->getParent()->getName().compare(cone->getName()) == 0) {
						CCLOG("CORRECT");

						audio->playEffect("sounds/sfx/success.ogg", false);
						_menuContext->pickAlphabet(cone->getName()[0],target->getParent()->getName()[0],true);

						_counterGameDone++;
						target->getParent()->setTag(-1);
						target->getParent()->getChildByName("cherry")->setVisible(true);
						auto y = cone->getChildByName("cone")->getContentSize().height*0.5;
						target->getParent()->runAction(MoveTo::create(0.5, Vec2(cone->getPositionX(),cone->getPositionY()+ y)));

						if (_counterGameDone >= 4) { // If Kid choose correct 4 letterCase then Game Done
							GameDone();
						}
					}
					else {
						CCLOG("WRONG");
						_counterWorng++;
						audio->playEffect("sounds/sfx/error.ogg", false);

						_menuContext->pickAlphabet(cone->getName()[0], target->getParent()->getName()[0], true);

						float positionX[] = { 0.20 , 0.40 , 0.60 , 0.80 };
						auto indexPosition = (target->getParent()->getTag() - 200);
						target->getParent()->runAction(MoveTo::create(0.5,Vec2(size.width * positionX[indexPosition],size.height * 0.65)));
					}
					break;
				}
			}
		}

		if (flag) {
			CCLOG("NOT CONTACT WITH ANYONE");
			float positionX[] = { 0.20 , 0.40 , 0.60 , 0.80 };
			auto indexPosition = (target->getParent()->getTag() - 200);
			target->getParent()->runAction(MoveTo::create(0.5, Vec2(size.width * positionX[indexPosition], size.height * 0.65)));
		}
		
		classRefer->runAction(Sequence::create(DelayTime::create(0.8), CallFunc::create([=] { _touchFlag = true; }), NULL));
		return false;
	};

	_eventDispatcher->addEventListenerWithSceneGraphPriority(listener, callerObject);
}

void BasicLetterCase::GameDone() {

	_menuContext->setMaxPoints(_counterTotalHit);
	_menuContext->addPoints(_counterTotalHit - _counterWorng);
	runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=] { _menuContext->showScore(); }), NULL));

}

vector<int> BasicLetterCase::getRandomValueRange(int min, int max, int getValue) {
	int count = 0;
	vector<int> objectVector;
	while (count < getValue) {
		int temp = RandomHelper::random_int(min, max);
		bool flag = true;

		for (size_t index = 0; index < objectVector.size(); index++) {
			if (objectVector[index] == temp) {
				flag = false;
				break;
			}
		}

		if (flag) {
			objectVector.push_back(temp);
			count++;
		}
	}

	sort(objectVector.begin(), objectVector.end());
	return objectVector;
}

string BasicLetterCase::getConvertInUpperCase(string data)
{
	std::ostringstream blockName;
	int i = 0;
	while (data[i])
	{
		blockName << (char)toupper(data[i]);
		i++;
	}
	return blockName.str();
}

BasicLetterCase::BasicLetterCase(){
    
}

BasicLetterCase::~BasicLetterCase(void)
{
	_eventDispatcher->removeCustomEventListeners("multipleChoiceQuiz");
	this->removeAllChildrenWithCleanup(true);
}
