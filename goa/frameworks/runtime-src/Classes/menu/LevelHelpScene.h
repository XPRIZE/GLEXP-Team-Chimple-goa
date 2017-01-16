//
//  LevelHelpScene.h
//  goa
//
//  Created by Srikanth Talapadi on 01/12/2016.
//
//

#ifndef LevelHelpScene_h
#define LevelHelpScene_h

#include "cocos2d.h"
#include "ui/CocosGUI.h"

class LevelHelpScene: public cocos2d::Node {
public:
    static cocos2d::Scene *createScene(std::string gameName);
    static LevelHelpScene *create(std::string gameName);
	cocos2d::ui::Button *_resumeButton;
    void onEnterTransitionDidFinish() override;
    void onExitTransitionDidStart() override;
	void ResumeButtonAction(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
CC_CONSTRUCTOR_ACCESS:
    LevelHelpScene();
    virtual ~LevelHelpScene();
    virtual bool init() override;
    bool initWithGame(std::string gameName);
    std::vector<std::string> split(std::string s, char delim);
    
protected:
    int _currentLevel;
    std::string _gameName;
    std::string _helpText;
    cocos2d::ui::Text *_text;
    std::vector<std::string> _videos;
    std::vector<std::string> _videoNames;
    int _currentVideo;
    virtual void gotoGame(Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    cocos2d::experimental::ui::VideoPlayer* _vp;
    void videoEventCallback(Ref* sender, cocos2d::experimental::ui::VideoPlayer::EventType eventType);
    
#endif
    void playNextVideo(float dt);
    virtual void decideIndexOfVideo();
    void videoPlayStart();
    void videoPlayOverCallback();
    
};

#endif /* LevelHelpScene_h */
