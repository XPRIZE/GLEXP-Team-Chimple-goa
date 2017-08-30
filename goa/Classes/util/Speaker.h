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

public:

	Speaker();
	~Speaker();
	Speaker* createSpeaker(string word, Vec2 position, bool selectionMode = false);
	bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
	bool checkAnswer(string word);
	void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event);

	void setCheckBoxStatus(bool isOptionSelected);

	 bool getCheckBoxStatus();
	
};

#endif /* Speaker_h */