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
#include "../menu/MenuContext.h"


class Dash : public cocos2d::Layer
{
public:
	Dash();
	~Dash();
	static Dash* create();
	virtual bool init();
	static cocos2d::Scene* createScene();
protected:
	MenuContext * menu;
};

#endif 
