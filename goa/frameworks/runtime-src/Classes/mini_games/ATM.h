//
//  ATM.h
//  goa
//
//  Created by Kirankumar CS on 21/11/16
//
//


#ifndef __ATM_SCENE_H__
#define __ATM_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"


class ATM : public cocos2d::Layer
{
public:
	ATM();
	~ATM();
	static ATM* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();
	
protected:
	MenuContext * menu;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	static const char* gameName() { return A_T_M.c_str(); };
	void oneNotePressed();
	void tenNotePressed();
	void hundredNotePressed();
	float _extraX = 0.0f;
	bool _touched = false;
	void rePositionOneNotes(cocos2d::Node * note);
	void rePositionTenNotes(cocos2d::Node * note);
	void rePositionHundredNotes(cocos2d::Node * note);
	void answerCheck();
	void helpLayer();
	std::vector<cocos2d::EventListenerTouchOneByOne *> _listner;
	float _hundredXPosition, _ten_XPosition, _one_XPosition;
	int _hundredCount = 0, _oneCount = 0, _tensCount = 0, _totalCount = 0, _targetedNumber, _gameScore = 0;
	cocos2d::Label * _hundreadLabel;
	std::map<int, std::map<int, int>> _levelMapping;
	std::vector<cocos2d::Sprite *> _onesSprite, _tensSprite, _hundredsSprite;
};

#endif 



