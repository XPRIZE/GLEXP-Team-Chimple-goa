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
	
	static const char* gameName() { return JUMPING_NUMBERS.c_str(); };
};

#endif 



