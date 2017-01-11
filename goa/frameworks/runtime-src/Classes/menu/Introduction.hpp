//
//  Introduction.hpp
//  goa
//
//  Created by Srikanth Talapadi on 11/01/2017.
//
//

#ifndef Introduction_hpp
#define Introduction_hpp

#endif /* Introduction_hpp */

#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "ui/CocosGUI.h"


class Introduction : public cocos2d::Node {
public:
    static cocos2d::Scene* createScene();
    static Introduction *create();
    void onEnterTransitionDidFinish() override;
    void clickButton(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void clickManyButtons(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    void dragButton(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);

CC_CONSTRUCTOR_ACCESS:
    Introduction();
    virtual ~Introduction();
    virtual bool init() override;

protected:
    cocos2d::Node* _chimp;
    cocostudio::timeline::ActionTimeline* _anim;
    int _buttonsClicked;
    void introduceTouch();
    void practiceTouch();
    void introduceDrag();
    void playVideo();
    cocos2d::ui::Button* createButton(float scale, cocos2d::Vec2 position);
};
