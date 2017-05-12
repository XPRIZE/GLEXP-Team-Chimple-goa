#ifndef __FIND_SCENE_H__
#define __FIND_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"

#define COCOS2D_DEBUG 1;
using namespace std;
using namespace cocos2d;
USING_NS_CC;

class Find : public cocos2d::Layer
{
protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;
	HelpLayer* _help;
	bool _helpFlag = true;
	Find();
	~Find();
	vector<Node*> _nodeBin;
	vector<Sprite*> _propsBin;
	bool _touchFlag = true;
	bool _touchStart = false;
	Sprite *_textHolder;
	std::string _initial = "";
	int _noOfWordStartFromInitial = 0;
	std::vector<string> _data_key;
	std::vector<string> _data_value;
	int _itemCounter = 0;
	std::vector<LabelTTF*> _propsLabelBin;

public:
	CREATE_FUNC(Find);
	static cocos2d::Scene* createScene();
	
	void onEnterTransitionDidFinish();
	void update(float dt);
	void addTouchEvents(Sprite* touchSprite);
	string StringandIntConcat(string data, int number);
	void shake(Node *sprite);
	void namePopup(float dt);
	string getConvertInUpperCase(string data);
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	static const char* gameName() { return FIND.c_str(); }
};
#endif // __Find_SCENE_H__
#pragma once
