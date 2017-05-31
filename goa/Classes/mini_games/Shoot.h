//
//  Shoot.h 
//  goa
//
//  Created by Karim Mirazul  on 05/12/16
//
//

#pragma once
#ifndef __Shoot_SCENE_H__
#define __Shoot_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../effects/FShake.h"
#include "SimpleAudioEngine.h"

using namespace std;
using namespace cocos2d;

class Shoot : public cocos2d::Layer
{

public:
	MenuContext *_menuContext;
	int counterlevelStatus = 1 , xPosi = 0 , counterHit = 0 , targetXcoordSave = 0 , targetYcoordSave = 0;
	Color4F stringColor = Color4F(Color4B(255,255,255,255));
	bool soundReleaseBall = true , isItinOriginalPosition = true , shootingFlag = false , flagSingleTouchFirst = true , stopTouchingBg = false;
	int _wrongCounter = 0 , _gamePlay = 0 , _dummy = 0;
	struct backUp {
		int category = 0;
		int level = 0;
	}backUp;
	
	struct player {
		int x = 0;
		int y = 0;
		int prevX = 0;
		int prevY = 0;
		int angle = 90;
	}player;

	std::string mapKey = "";
	cocos2d::Node* targetPlayer = NULL;
	std::map<std::string, std::string> _map;
	std::vector<std::string> _data_key;
	std::vector<std::string> _data_value;

	cocos2d::Sprite *bubblePlayer = NULL;
	DrawNode* rightLine = NULL;
	DrawNode* leftLine = NULL;
	
public:
	bool LevelInfoForSpeaker();
	void addEventsOnSpeaker(cocos2d::Sprite * callerObject);
	~Shoot();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static Shoot* create();
	void onEnterTransitionDidFinish();
	void setKeyValueFromMap(std::map<std::string, std::string> _data);
	string getConvertInUpperCase(string data);
	string getConvertInLowerCase(string data);
	void update(float) override;
	void choosingListner();
	float radToDeg(float angle);
	float degToRad(float angle);
	void bgListner();
	std::tuple<std::string, std::string, std::string> getBoardAndOptionWord();
	void reCreateSceneElement();
	void runAnimations(Node * AnimNode, int x, int y, std::string path);
	void stateShootBubble(float dt);
	void gamePlay(Node * correctObject);
	void checkBoundaryBall(Node * target, cocos2d::Touch * touch);
	int getRandomInt(int min, int max);
	std::tuple<int, int, int> levelAllInfo(int currentLevel, int totalCategory, int eachCategoryGroup, int totalSceneTheme, int SceneChangeAfterLevel);
	void setSpriteProperties(Sprite * ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder);
	vector<int> getRandomValueRange(int min, int max, int getValue);
	void checkMistakeOnWord();
	void dummyTextLabelPopUp();
	void pronounceWord();
	void popUpText();
	static const char* gameName() { return PINATA.c_str(); }
};

#endif // __Shoot_SCENE_H__
