//
//  DotsLayer.hpp
//  goa
//
//  Created by Srikanth Talapadi on 01/04/17.
//
//

#ifndef DotsLayer_hpp
#define DotsLayer_hpp

#include "cocos2d.h"
#include "ui/CocosGUI.h"
#include "../menu/HelpLayer.h"
#include "../menu/MenuContext.h"
#include "DotNum.hpp"

class DotsLayer : public cocos2d::LayerGradient
{
public:
    static cocos2d::Scene* createScene();
    static DotsLayer *create();
    void onEnterTransitionDidFinish() override;
    static std::map<int, std::string> fingerRep;
    void showFinger(DotNum* dotNum);
    MenuContext* _menuContext;
CC_CONSTRUCTOR_ACCESS:
    DotsLayer();
    ~DotsLayer();
    bool init() override;
    
protected:
    HelpLayer* _helpLayer;
    int _currentNumber;
    DotNum* _dotNum;
    cocos2d::Sprite* _hand;
    cocos2d::Label* _text;
    cocos2d::ui::Button* _nextButton;
    void showNumber();
    void showNext(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
};
#endif /* DotsLayer_hpp */
