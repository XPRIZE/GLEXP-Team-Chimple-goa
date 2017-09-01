//
//  Decomon.h
//  goa
//
//  Created by Kirankumar CS on 27/09/16
//
//


#ifndef __DECOMON_SCENE_H__
#define __DECOMON_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "SimpleAudioEngine.h"
#include "../lang/Lesson.h"

class Decomon : public cocos2d::Layer
{
	
private:
	Lesson _lesson;
public:
	 Decomon();
	~Decomon();
	static Decomon* create();
	virtual bool init();
	void update(float dt);
	static cocos2d::Scene* createScene();
	float _width;

protected:
	MenuContext * menu;
	cocos2d::Layer * _costumeLayer, *_alphabetLayer, *_maskingLayer, *_iconLayer, *_coloringLayer;
	cocos2d::Node * _movedNode, *_alphaNode;
	cocos2d::DrawNode *_paintingNode, *_drawingPaintNode;;
	cocos2d::Vector<cocos2d::Node *> _drawNodes;
	int _colorIndex;
	std::string _myChar;
	cocos2d::RenderTexture *_paintingTexture;
	cocos2d::Sprite *_paintingColour;
	int _pickedColor_R = 0, _pickedColor_G = 0, _pickedColor_B = 0;
	bool _touched = false, _flip, _colorPicked = false, _screenShoot = true, _onTouch = true;
	cocos2d::Vector <cocos2d::Node *> _movedNodes;
	std::vector <std::string> _eyePath;
	std::vector <std::string> _mouthPath;
	std::vector <std::string> _skatePath;
	std::vector <std::string> _nosePath;
	std::vector <std::string> _paintPath;
	std::vector <std::string> _mustachePath;
	std::vector <std::string> _hornPath;
	std::vector <std::string> _gearPath;
	virtual bool onTouchBegan(cocos2d::Touch *touch, cocos2d::Event * event);
	//	virtual void onTouchMoved(const std::vector<Touch*>& touches, Event* event);
	virtual void onTouchMoved(cocos2d::Touch *touch, cocos2d::Event * event);
	virtual void onTouchEnded(cocos2d::Touch *touch, cocos2d::Event * event);
	void itemInAGrid(std::vector<std::string> item, std::string name);
	void creatSpriteOnAlphabet(std::string, float x, float y, float scale);
	void generateDuplicatesInAGrid(cocos2d::Node * node);
	cocos2d::Label * _alphabetLabel, *_myLabel;
	void screenShot();
	void decomonGallery();
	void split(const std::string &s, char delim, std::vector<std::string> &elems);
	void captureImage(bool capture, const std::string& outputFile);
	static const char* gameName() { return DECOMON.c_str(); }
	void onEnterTransitionDidFinish();
	void gameHelp();
	void gameHelpDrag();
	void addTouchEvents(LayerGradient* touchSprite);
	void addTouchEventsOnBacket(Sprite * sprite);
	bool setBoundaryForDrawing(cocos2d::Touch * touch);
	bool _helpIconIsClicked = false, _colorRestriction = false;
	int _numberOfItemSelected = 0;
	CocosDenshion::SimpleAudioEngine * _audioEffect;
	bool _eyeFlag = true, _mouthFlag = true, _skateFlag = true, _noseFlag = true, _paintFlag = true, _mustacheFlag = true, _hornFlag = true, _gearFlag = true;
	void wordGenerate();
	void gameEnd(float dt);
	void createGameLayout(cocos2d::EventCustom *eventCustom);
	bool _isTouchBegan = true, _backFromGallery = true;
	Rect _rect = Rect(0, 0, 0, 0);
	Vec2 _touchPoint = Vec2(-1, -1);
};

#endif 

