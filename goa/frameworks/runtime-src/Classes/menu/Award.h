//
//  Award.h
//  goa
//
//  Created by Kirankumar CS on 28/12/16
//
//

#ifndef __Award_SCENE_H__
#define __Award_SCENE_H__

#include "cocos2d.h"
#include "MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"

class Award : public cocos2d::Layer {

public:
	static cocos2d::Scene* createScene();
	static Award* create();
	virtual bool init();
	Award();
	virtual ~Award();
	void onEnterTransitionDidFinish();
protected:
	MenuContext *_menu;
	bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	cocos2d::ui::TabControl * _tab;
	void objectsAddInTabContainer(cocos2d::Node * parent, std::string tile, std::map<std::string,int> rewardsInfo);
};
#endif
