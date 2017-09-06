//
//  Speaker.h
//  
//
//  Created by Karim Mirazul on 28-08-2017.
//
//

#ifndef Speaker_h
#define Speaker_h

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/LangUtil.h"
#include "../menu/StartMenuScene.h"
#include "../lang/TextGenerator.h"
#include "ui/CocosGUI.h"

using namespace std;
using namespace cocos2d;

class Speaker : public cocos2d::Node {

private:
	Sprite * _speaker;
	Sprite * _checkBox;
	string _speakerWord = "";
	bool _isOptionSelected = false;
	bool _isCheckBoxEnable = false;
	void handleClickEffectOnSpeaker(cocos2d::Event* event);
	bool _freezSelectionOption = false;

public:

	Speaker();
	~Speaker();
	Speaker* createSpeaker(string word, Vec2 position, bool selectionMode = false);
	string getStringInSpeaker();
	void setStringInSpeaker(string newWord);
	void setFreezCheckBoxTickStatus(bool freezSelectionOption);
	bool getFreezCheckBoxTickStatus();
	void setCurrentSpeakerStatus(bool currentSpeaker);
	bool getCurrentSpeakerStatus();
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	bool checkAnswer(string word);
	void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event);

	void setCheckBoxStatus(bool isOptionSelected);

	void setCheckBoxVisibility(bool visible);

	bool getCheckBoxVisibility();

	 bool getCheckBoxStatus();
	
};

#endif /* Speaker_h */