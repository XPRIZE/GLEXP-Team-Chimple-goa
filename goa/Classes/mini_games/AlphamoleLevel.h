//
//  AlphamoleLevel.h (whack a mole)
//  goa
//
//  13/09/16
//
//

#ifndef __ALPHAMOLE_LEVEL_SCENE_H__
#define __ALPHAMOLE_LEVEL_SCENE_H__

#include "cocos2d.h"
#include "../alphamon/SelectAlphamonScene.h"

class AlphamoleLevel : public cocos2d::ui::ScrollView {

public:
	static cocos2d::Scene* createScene();
	void onExitTransitionDidStart();
	void onEnterTransitionDidFinish();
	void onAlphabetSelected(cocos2d::EventCustom *event);
	static const char* gameName() { return ALPHAMOLE.c_str(); }
	CREATE_FUNC(AlphamoleLevel);

CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	AlphamoleLevel();
	virtual ~AlphamoleLevel();

protected:
	cocos2d::Layer* _layer;

};
#endif