#pragma once
#ifndef __Bingo_SCENE_H__
#define __Bingo_SCENE_H__

#include "cocos2d.h"
#include "../lang/TextGenerator.h"
#include "../puzzle/WordScene.h"
#include "../menu/GameScene.h"
#include "../effects/FShake.h"
#include "../menu/MenuContext.h"
#include "../menu/HelpLayer.h"
#include "../util/MatrixUtil.h"

using namespace cocos2d;

class Bingo :public cocos2d::Layer
{
private:
	Lesson _lesson;
public:
	static cocos2d::Scene* createScene();
	virtual bool init();
	void addEvents(Sprite* touchSprite);
	void setWordInHelpBoard();
	void charAnimation(int i, int j);
	bool bingoChecker(bool flag);
	std::vector<std::vector<Sprite *>> createGrid(int row, int column);
	std::vector<std::vector<cocostudio::timeline::ActionTimeline *>> createGridOfCharcater(int row, int column);
	void setAllSpriteProperties(Sprite* object, int zOrder, float posX, float posY, bool visibility, float anchorPointX, float anchorPointY, float rotation, float scaleX, float scaleY, Sprite* parent);
	std::map<std::string, std::string> _scenePath;
	std::map<std::string, float> _gridBasedValue;
	void onEnterTransitionDidFinish();
	void createGameSetupAndLayout(cocos2d::EventCustom *eventCustom);
	void creatHelp(Sprite* letterBox, Sprite* helpBox,int i, int j);
	Bingo();
	~Bingo();
	int bingoHorizotally();
	int bingoVertically();
	int bingoRightDiagonally();
	int bingoLeftDiagonally();
	int _pairNo, _gridDimension;
	std::string getConvertInUpperCase(std::string data);
	std::pair<int, int> levelAllInfo(int levelNum, int sceneRepetitionNo, int totalScene, int catagoryRepetitionNo, int totalcatagory);


	static const char* gameName() { return BINGO.c_str(); }

protected:

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	
	std::vector<std::vector<Sprite *>> _boxContainer;
	std::vector<std::vector<Sprite *>> _charFace;
	std::vector<std::vector<cocostudio::timeline::ActionTimeline *>> _charAnimContainer;
	std::vector<std::vector<Sprite *>> _bingoAnimBin;
	std::vector<std::vector<cocostudio::timeline::ActionTimeline *>> _bingoAnimTimelineBin;
	Sprite* _boxBoard;
	Sprite* _helpBoard;
	std::vector<std::string> _data_keys;
	std::vector<std::string> _data_values;
	cocos2d::LabelTTF* _label = NULL;
	std::string _labelPrefix ="";
	bool _isBingoDone = false;
	MenuContext* _menuContext;
	HelpLayer* _help;
	int _isHelpDone = NULL;
	std::string _bingoCurrentTheme = "";
	std::string _bingoGridDimension = "";
	std::string _resourcePath = "";
	std::string _wordPairTitle = "";
	bool _flagForSingleTouch = true;
	int _maxPointSetter=0;


	// implement the "static create()" method manually
	CREATE_FUNC(Bingo);
};


#endif // __Bingo_SCENE_H__
