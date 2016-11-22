//
//  ATM.h
//  goa
//
//  Created by Kirankumar CS on 08/11/16
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
	std::vector<cocos2d::EventListenerTouchOneByOne *> _listner;
	float _hundredXPosition, _ten_XPosition, _one_XPosition;
	int _hundredCount = 0, _oneCount = 0,_tensCount = 0, _totalCount = 0;
	cocos2d::Label * _hundreadLabel;
};

#endif 



