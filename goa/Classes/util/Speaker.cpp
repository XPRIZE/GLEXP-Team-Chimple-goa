//
//  Speaker.cpp
//  
//
//  Created by Karim Mirazul on 28-08-2017.
//
//

#include "../util/Speaker.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../menu/StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "ui/CocosGUI.h"
#include "../menu/MenuContext.h"

USING_NS_CC;

Speaker::Speaker()
{
	SpriteFrameCache::getInstance()->addSpriteFramesWithFile("audio_icon/audio_icon.plist");
}

Speaker::~Speaker() {

}

/*
 string word - set the word in speaker to pronounce ....
 position - Vec type,to set position of widget ....
 selectionMode - select choice option enable if true or default false
 */
Speaker*  Speaker::createSpeaker(string word,Vec2 position,bool selectionMode) {
	
	// checkBox enable status , spearkWord which pronounce by speaker ...
	_speakerWord = word;
	_isCheckBoxEnable = selectionMode;

	// create Speaker object ...
	_speaker = Sprite::createWithSpriteFrameName("audio_icon/audio.png");
	_speaker->setName("speaker");
	addChild(_speaker);

	this->setPosition(position);
	this->setContentSize(Size(_speaker->getContentSize()));
	
	if (_isCheckBoxEnable) {
		// create checkBox object ...
		_checkBox = Sprite::createWithSpriteFrameName("audio_icon/check_box.png");
		_checkBox->setPosition(Vec2(_speaker->getPositionX()+ _speaker->getContentSize().width / 4,
			_speaker->getPositionY()+ _speaker->getContentSize().height / 4));
		_checkBox->setName("checkbox");
		addChild(_checkBox);


		//create tickMark and set child in checkBox ...
		auto tickMark = Sprite::createWithSpriteFrameName("audio_icon/tick.png");
		tickMark->setPosition(Vec2(_checkBox->getContentSize().width/2, _checkBox->getContentSize().height/ 2));
		tickMark->setName("tick");
		tickMark->setVisible(false);
		_checkBox->addChild(tickMark);
	}

	// create Listner and set to speaker and checkBox ...
	auto listener = EventListenerTouchOneByOne::create();
	listener->onTouchBegan = CC_CALLBACK_2(Speaker::onTouchBegan, this);
	listener->onTouchEnded = CC_CALLBACK_2(Speaker::onTouchEnded, this);
	listener->setSwallowTouches(false);

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, _speaker);
	if (_isCheckBoxEnable) {
		cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), _checkBox);
	}

	return this;
}

/*
	Update the existing word in speaker ... 
*/
void Speaker::updateStringInSpeaker(string newWord) {
	_speakerWord = newWord;
}


/*
	Freez the checkBox option after select corrcet option ...
*/
void Speaker::setFreezCheckBoxTickStatus(bool freezSelectionOption) {
	_freezSelectionOption = freezSelectionOption;
}

/*
 get the status of Freezing the checkBox option ...
*/
bool Speaker::getFreezCheckBoxTickStatus() {
	return _freezSelectionOption;
}


/* 
 it check the word is match with audio or not
 if correct then return true else false
 */
 bool Speaker::checkAnswer(string word) {

	if (_speakerWord.compare(word) == 0)
		return true;
	return false;
}


bool Speaker::onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event)
{
	auto target = event->getCurrentTarget();
	Point locationInNode = target->getParent()->convertToNodeSpace(touch->getLocation());

	if (target->getBoundingBox().containsPoint(locationInNode)) {
		handleClickEffectOnSpeaker(event);

		target->setColor(Color3B(211,211,211));

		if(_speakerWord.length() > 0){
			MenuContext::pronounceWord(_speakerWord);
		}
		return true;
	}
	return false;
}

void Speaker::onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
	auto target = event->getCurrentTarget();
	target->setColor(Color3B::WHITE);
}

/*
 method use to set the checkBox is selected or not
 if selected then return true or else false
*/
void Speaker::setCheckBoxStatus(bool isOptionSelected) {
	_isOptionSelected = isOptionSelected;
	_checkBox->getChildByName("tick")->setVisible(isOptionSelected);
}


/* 
It return status , the checkbox is selected or not
*/
bool Speaker::getCheckBoxStatus() {
	return _isOptionSelected;
}


/*
Speaker and checkBox button effects and enabel or disable the checkBox status
*/
void Speaker::handleClickEffectOnSpeaker(cocos2d::Event* event)
{
	auto target = event->getCurrentTarget();
	if (target->getName().compare("checkbox") == 0) {
		if (getCheckBoxStatus()) {
			setCheckBoxStatus(false);
		}
		else {
			setCheckBoxStatus(true);
		}
	}
}