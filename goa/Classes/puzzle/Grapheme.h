//
//  Grapheme.h
//  safari
//
//  Created by Srikanth Talapadi on 07/08/16.
//
//

#ifndef Grapheme_h
#define Grapheme_h
#include "cocos2d.h"
#include "ui/CocosGUI.h"

class Grapheme : public cocos2d::Node {
public:
    static Grapheme* create(std::string graphemeString, float size = 200);
	virtual void setSelectedBackground(Node* selectedBackground);
	virtual void setUnselectedBackground(Node* unSelectedBackground);
    void selected(bool sel);
    bool isSelected();
    virtual void animateToPositionAndChangeBackground(cocos2d::Vec2 toPosition);
	virtual void changeBackground();
    cocos2d::Vec2 getPrevPosition();
    std::string getGraphemeString();
    cocos2d::ui::Text* getTextInGrapheme();
    cocos2d::Rect getTextBoundingBox();
    std::function<bool(cocos2d::Touch*, cocos2d::Event*)> touchBeganCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchMovedCallback;
    std::function<void(cocos2d::Touch*, cocos2d::Event*)> touchEndedCallback;
    
CC_CONSTRUCTOR_ACCESS:
    Grapheme();
    virtual ~Grapheme();
    bool init(std::string graphemeString, float size = 200);
    virtual bool onTouchBegan(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual void onTouchEnded(cocos2d::Touch* touch, cocos2d::Event* event);
    virtual void onTouchMoved(cocos2d::Touch* touch, cocos2d::Event* event);

protected:
    std::string _graphemeString;
    float _size;
    cocos2d::ui::Text* _text;
    Node* _unselectedBackground;
    Node* _selectedBackground;
    cocos2d::Vec2 _prevPosition;
    bool _selected;
};

#endif /* Grapheme_h */
