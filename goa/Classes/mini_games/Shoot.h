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
#include "../lang/Lesson.h"
#include "../util/MatrixUtil.h"

using namespace std;
using namespace cocos2d;

class Shoot : public cocos2d::Layer
{

private:
	Lesson _lesson;
public:
	MenuContext *_menuContext;
	int counterlevelStatus = 0 , xPosi = 0 , counterHit = 0 , targetXcoordSave = 0 , targetYcoordSave = 0;
	Color4F stringColor = Color4F(Color4B(255,255,255,255));
	bool soundReleaseBall = true , isItinOriginalPosition = true , shootingFlag = false , flagSingleTouchFirst = true , stopTouchingBg = false;
	int _wrongCounter = 0 , _gamePlay = 0 , _dummy = 0;
	struct backUp {
		int category = 0;
		int level = 0;
	}backUp;
	
	vector<Lesson::MultiChoice> _vmc;
	string _correctAnswerVmc = "";

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
	Shoot();
	bool LevelInfoForSpeaker();
	void addEventsOnSpeaker(cocos2d::Sprite * callerObject);
	~Shoot();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static Shoot* create();
	void onEnterTransitionDidFinish();
	void gameBegin(cocos2d::EventCustom * eventCustom);
	void update(float) override;
	void choosingListner();
	bool checkAnswer(string creamText, string coneText);
	float radToDeg(float angle);
	float degToRad(float angle);
	void bgListner();
	void reCreateSceneElement();
	void runAnimations(Node * AnimNode, int x, int y, std::string path);
	void stateShootBubble(float dt);
	void gamePlay(Node * correctObject);
	void checkBoundaryBall(Node * target, cocos2d::Touch * touch);
	int getRandomInt(int min, int max);
	void setSpriteProperties(Sprite * ImageObject, float positionX, float positionY, float scaleX, float scaleY, float anchorX, float anchorY, float rotation, int zorder);
	vector<int> getRandomValueRange(int min, int max, int getValue);
	void checkMistakeOnWord();
	void dummyTextLabelPopUp();
	void pronounceWord();
	void popUpText();
	static const char* gameName() { return PINATA.c_str(); }
};

#endif // __Shoot_SCENE_H__
