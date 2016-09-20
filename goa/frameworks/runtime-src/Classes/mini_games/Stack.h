#ifndef __STACK_SCENE_H__
#define __STACK_SCENE_H__

#include "cocos2d.h"
#include "Cannon_Ball_Listener.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../puzzle/Alphabet.h"
#include "../puzzle/CharGenerator.h"
#include "SimpleAudioEngine.h"
#include "../lang/SafariAnalyticsManager.h"
#include "../StartMenuScene.h"

class Stack : public cocos2d::Layer
{
	static cocos2d::Scene* createScene();
	Stack();
	~Stack();
	virtual bool init();
	// implement the "static create()" method manually
	CREATE_FUNC(Stack);
    
    static const char* gameName() { return CANNON_BALL.c_str(); };

protected:
	MenuContext* _menuContext;
};
#endif // __STACK_SCENE_H__
