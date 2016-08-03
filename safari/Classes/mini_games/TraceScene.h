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

class Trace : public cocos2d::Layer {
public:
    static cocos2d::Scene* createScene(int alphabet);
    static Trace *create(wchar_t alphabet);
    void onAlphabetSelected(cocos2d::EventCustom *event);
	void transit(int level);
	void resetLevel();
	void setDotsVisibility(bool flag);
	
CC_CONSTRUCTOR_ACCESS:
    virtual bool init(wchar_t alphabet);
    Trace();
    virtual ~Trace();
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
	void startGame();
    static const char* classname() { return KUNG_FU_ALPHA.c_str();}
protected:
    int _currentNodeIndex;
    int _currentStroke;
    Node *_background;
    std::vector<std::vector<Node *>> _nodes;
    bool _touchActive;
    void setupTouch();
    CC_SYNTHESIZE(int, _count, Count);

	MenuContext *_menuContext;
    
};

#endif /* TraceScene_h */
