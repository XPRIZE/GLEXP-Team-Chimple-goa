//
//  DotsQuizLayer.hpp
//  goa
//
//  Created by Srikanth Talapadi on 03/04/17.
//
//

#include "cocos2d.h"
#include "ui/CocosGUI.h"
#include "DotNum.hpp"
#include "../menu/HelpLayer.h"

#ifndef DotsQuizLayer_hpp
#define DotsQuizLayer_hpp

class DotsQuizLayer : public cocos2d::Node {
public:
    static DotsQuizLayer* create(int level);
    void buttonPressed(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    int _numButtons;
    void showDotNum();
CC_CONSTRUCTOR_ACCESS:
    DotsQuizLayer();
    virtual ~DotsQuizLayer();
    bool init(int level);
protected:
    cocos2d::Node* _buttons;
    DotNum* _dotNum;
    int _buttonLength;
    int _level;
    int _tries;
    int _startNum;
    int _endNum;
    HelpLayer* _helpLayer;
};

#endif /* DotsQuizLayer_hpp */
