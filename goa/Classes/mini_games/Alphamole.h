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

class Alphamole : public cocos2d::Layer
{
private:
	Lesson _lesson;
public:
	Alphamole();
	~Alphamole();
	wchar_t _mychar;
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
	void startGame();
	void jumpAlphabet();
	void showAlpha(float ft);
	void leafOpen(float ft);
	void leafClose(float ft);
	cocos2d::Node * _background, * _leaf_openRff, *_leaf_closeRff;
	Alphamon * _mainChar, *_monsterReff;
	cocos2d::Layer * _alphabetLayer;
	MenuContext * menu;
	void onExitTransitionDidStart();
	void onAlphabetSelect(cocos2d::EventCustom *event);
	std::vector<std::vector<char>> _jumpArray;
};

#endif 