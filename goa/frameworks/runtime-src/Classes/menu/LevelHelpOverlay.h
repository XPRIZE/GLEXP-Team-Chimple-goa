//
//  LevelHelpOverlay.h
//  goa
//
//  Created by Srikanth Talapadi on 23/12/2016.
//
//

#ifndef LevelHelpOverlay_h
#define LevelHelpOverlay_h

#include "LevelHelpScene.h"

class LevelHelpOverlay: public LevelHelpScene {
public:
    static LevelHelpOverlay *create(std::string gameName);
CC_CONSTRUCTOR_ACCESS:
    LevelHelpOverlay();
    virtual ~LevelHelpOverlay();
    bool initWithGame(std::string gameName);
    void onEnterTransitionDidFinish() override;
protected:
    void gotoGame(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType) override;
    void decideIndexOfVideo() override;
    void playNextVideo(float dt);
};

#endif /* LevelHelpOverlay_h */
