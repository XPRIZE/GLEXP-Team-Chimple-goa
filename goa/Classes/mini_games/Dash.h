//
//  Dash.h
//  goa
//
//  Created by Kirankumar CS on 20/09/16
//
//


#ifndef __DASH_SCENE_H__
#define __DASH_SCENE_H__

#include "cocos2d.h"
#include "external/json/document.h"
#include "external/json/stringbuffer.h"
#include "external/json/writer.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/HelpLayer.h"
#include "../lang/Lesson.h"


class Dash : public cocos2d::Layer
{
private:
	Lesson _lesson;
public:
	Dash();
	~Dash();
	static Dash* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	void updatePlayerPosition(std::string playerName, int stepPosition);
	std::map<std::string, std::string> _scenePath;
    //void peerInformationReceived(cocos2d::EventCustom *event);
    void transitToMenu(cocos2d::EventCustom * event);
    void syncEnemyCharacterPosition(cocos2d::EventCustom *event);

protected:
	int _gameScore, _enemyScore;
	int _wordCount;
	std::string _gameWord, _title, _catagory;
	int _jumpCount, _enemyJumpCount;
	cocos2d::Layer * _stepLayer;
	cocos2d::Label * _topLabel;
	std::map<std::string, std::string> _synonyms;
	std::vector <std::string> _mapKey;
	std::vector <std::string> _rightWords;
	std::vector <std::string> _wrongWords;
	cocos2d::Vector <cocos2d::Sprite *> _choiceButton;
	cocos2d::Vector <cocos2d::Label *> _choiceLabel;
	cocos2d::Node * _character, * _otherCharacter, *_bg;
	void jumpTimeline(cocos2d::Node * node, std::string animationName);
	MenuContext * menu;
	cocostudio::timeline::ActionTimeline * _mycharacterAnim;
	void myCharacterJumping(int jumpCount);
	void myCharacterEyeBlinking();
	void otherCharacterJumping(int jumpCount);
	void wordGenerateWithOptions();
	void winningCelebration();
	void fallingWords(int index);
	void fallingWordWithAction(cocos2d::Vector<cocos2d::Label*> fallingWords);
	void iceLandThemeAnimation();
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
    std::string constructSendMessage(std::string charName, int position);
	static const char* gameName() { return DASH.c_str(); }
	bool _helpFlage = false;
	void onEnterTransitionDidFinish();
	void gameHelp();
	std::map<std::string, std::map<std::string, std::string>> _differntSceneMapping;
	cocos2d::RepeatForever * _enemyActions;
//	std::string _gameWord;
	//int _jumpCount, _enemyJumpCount;
//	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
    
};

#endif 
