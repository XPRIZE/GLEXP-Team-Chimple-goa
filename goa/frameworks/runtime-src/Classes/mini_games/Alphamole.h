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

class Alphamole : public cocos2d::Layer
{
public:
	Alphamole();
	~Alphamole();
	wchar_t _mychar;
	static Alphamole* create(wchar_t letter);
	static cocos2d::Scene* createScene(wchar_t letter);
	virtual bool init(wchar_t letter);
protected:
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
};

#endif 