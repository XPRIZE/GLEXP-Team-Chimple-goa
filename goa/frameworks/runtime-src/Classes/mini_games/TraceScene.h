//
//  TraceScene.h
//  rpg
//
//  Created by Srikanth Talapadi on 10/07/16.
//
//

#ifndef TraceScene_h
#define TraceScene_h

#include "cocos2d.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "../menu/HelpLayer.h"

class Trace : public cocos2d::Layer {
public:
    static cocos2d::Scene* createScene();
    static Trace *create();
    void onAlphabetSelected(cocos2d::EventCustom *event);
	void transit(int level);
	
	void setDotsVisibility(bool flag);
    void dummy();
	
CC_CONSTRUCTOR_ACCESS:
    virtual bool init();
    Trace();
    virtual ~Trace();
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();
	void onEnterTransitionDidFinish() override;
	const wchar_t *_alpha;
	HelpLayer * _help;
    static const char* classname() { return KUNG_FU_ALPHA.c_str();}
    void onExitTransitionDidStart() override;
protected:
    int _currentNodeIndex;
    int _currentStroke;
    Node *_background;
    std::vector<std::vector<Node *>> _nodes;
    bool _touchActive;
    void setupTouch();
	void finishedAll();
	int _touches;
	void resetLevel();
	//String _language;
	//int _languageRange;
	int _maxNumberOfCharacters;
    CC_SYNTHESIZE(int, _count, Count);
	int _iterations;
	MenuContext *_menuContext;
    
};

#endif /* TraceScene_h */
