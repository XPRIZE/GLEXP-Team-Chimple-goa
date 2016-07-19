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

class Trace : public cocos2d::Layer {
public:
    static cocos2d::Scene* createScene(char alphabet);
    static Trace *create(char alphabet);
    void onAlphabetSelected(cocos2d::EventCustom *event);
	void transit(int level);

CC_CONSTRUCTOR_ACCESS:
    virtual bool init(char alphabet);
    Trace();
    virtual ~Trace();
    bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);
protected:
    int _currentNodeIndex;
    int _currentStroke;
    Node *_background;
    std::vector<std::vector<Node *>> _nodes;
    bool _touchActive;
    void setupTouch();
    CC_SYNTHESIZE(int, _count, Count);
    
};

#endif /* TraceScene_h */
