#ifndef __POP_SCENE_H__
#define __POP_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../menu/StartMenuScene.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/LangUtil.h"
#include "../lang/TextGenerator.h"
#include "../util/Calculator.h"
#include "../lang/Lesson.h"

using namespace cocos2d;
using namespace std;

class Pop : public cocos2d::Layer
{
private: 
	Lesson _lesson;
protected:
	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	MenuContext *_menuContext;
	HelpLayer* _help;
	Calculator *_calculator;
	std::vector<Sprite*> _cloudContainer;
	std::vector<float> _cloudXPos;
	std::vector<std::string> _stringContainer;
	std::vector<std::string> _wordInOrder;
	bool _clickableFlag = false;
	bool _helpFlag = false;
	cocos2d::LabelTTF* _correctSentance = NULL;


public:
	~Pop();
	CREATE_FUNC(Pop);
	static cocos2d::Scene* createScene();
	void onEnterTransitionDidFinish();
	void update(float dt);
	void addEvents(Sprite* touchSprite);
	std::vector<std::string> convertSentenceIntoWords(std::string sentance);

	std::pair<int, int> levelAllInfo(int levelNum, int sceneRepetitionNo, int totalScene, int catagoryRepetitionNo, int totalcatagory);
	string getConvertVectorStringIntoString(vector<string> value);
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY);
	LabelTTF* setAllLabelProperties(std::string letter, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, int labelSizeInPixel);
	void setWordInRightOrder(Node* obj);
	void makeSentance(Node* cloud);
	void cloudShake(Node* sprite);
	void removePlaneFromScene();
	static const char* gameName() { return POP.c_str(); }
};

#endif // __POP_SCENE_H__


/*#ifndef POP_WORDSCENE_H__
#define POP_WORDSCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../menu/MenuContext.h"
#include "../menu/GameScene.h"

using namespace cocos2d;

class Pop : public Layer
{
public:
	static cocos2d::Scene* createScene();
	virtual ~Pop();
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPoint, float rotation, float scaleX, float scaleY);
	virtual bool init();

	//static const char* gameName() { return "Cross The Bridge"; };
	//static const char* gameName() { return Pop.c_str(); };

protected:
			// implement the "static create()" method manually
			CREATE_FUNC(Pop);
			MenuContext *_menuContext;
	
};

#endif // POP_WORDSCENE_H__
#pragma once*/
