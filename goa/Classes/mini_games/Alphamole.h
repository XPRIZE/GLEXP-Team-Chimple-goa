//
//  Alphamole.h (whack a mole)
//  goa
//
//  13/09/16
//
//


#ifndef __ALPHAMOLE_SCENE_H__
#define __ALPHAMOLE_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../alphamon/Alphamon.h"
#include "../lang/Lesson.h"
#include "../util/MatrixUtil.h"

class Alphamole : public cocos2d::Layer
{
private:
	Lesson _lesson;
public:
	Alphamole();
	~Alphamole();
	std::string _mychar;
	static Alphamole* create();
	static cocos2d::Scene* createScene();
	virtual bool init();
	static const char* gameName() { return ALPHAMOLE.c_str(); }
protected:
	bool _helpLayer = false;
	float _Xpos;
	int _score;
	int _randomBackground;
	cocos2d::Label * _score_label;
	void startGame(cocos2d::EventCustom *eventCustom);
	void jumpAlphabet();
	void showAlpha(float ft);
	void leafOpen(float ft);
	void leafClose(float ft);
	void onEnterTransitionDidFinish();
	cocos2d::Node * _background, * _leaf_openRff, *_leaf_closeRff;
	Alphamon * _mainChar, *_monsterReff;
	cocos2d::Layer * _alphabetLayer;
	MenuContext * menu;
	void onExitTransitionDidStart();
	void onAlphabetSelect(cocos2d::EventCustom *event);
	std::vector<std::vector<std::string>> _jumpArray;
};

#endif 