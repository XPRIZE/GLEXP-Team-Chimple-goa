//
//  DoorNode.h
//  goa



#ifndef __DOOR_SCENE_H__
#define __DOOR_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../WordSceneLipiTKNode.h"

class DoorNode;
class Door : public cocos2d::Layer
{
public:
	Door();
	~Door();
	virtual bool init();
	static cocos2d::Scene* createScene();
	static Door * create();
	void onEnterTransitionDidFinish();
	float extraX;
	cocos2d::Vector <cocos2d::Node *> _BoxRef;
	//std::string _randomWord1;
protected:
	MenuContext * menu;
	cocos2d::Node* _car;
	cocos2d::DrawNode * _road;
	float _prevDegree;
	DoorNode * _DoorNodeLiPi;
};

#endif 



