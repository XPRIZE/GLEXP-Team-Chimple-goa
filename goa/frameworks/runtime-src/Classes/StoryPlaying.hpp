//
//  StoryPlaying.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 07/01/17.
//
//

#ifndef StoryPlaying_hpp
#define StoryPlaying_hpp

#include <stdio.h>

#include <stdio.h>
#include "menu/MenuContext.h"
#include "cocos2d.h"
#include "RPGConfig.h"
#include "menu/MenuContext.h"
#include "lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCFrame.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"
#include "storage/local-storage/LocalStorage.h"


#define NEXT_BUTTON "next"
#define PREVIOUS_BUTTON "previous"
#define CLOSE_BUTTON "close"
#define SOUND_BUTTON "sound"

#define STORY_TEXT "titleText"


class StoryPlaying : public cocos2d::Layer {
public:
    
    static cocos2d::Scene* createScene(int pageIndex, std::string storyId);
    static StoryPlaying* create(int pageIndex, std::string storyId);
    
CC_CONSTRUCTOR_ACCESS:
    virtual bool init(int pageIndex, std::string storyId);
    
    StoryPlaying();
    
    virtual ~StoryPlaying();
    
    void load();
    
    void loadContentPage(std::string contentPageUrl);
    
    void nextStory(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void previousStory(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void onExitTransitionDidStart();
    
    void onEnterTransitionDidFinish();
    
    
    
private:
    std::string _storyInformation;
    std::string _baseDir;
    MenuContext* _menuContext;
    std::string _soundFile;
    std::string _soundEnabled;
    std::string _storyId;
    int _pageIndex;
    bool _isPlayEnded;
    int _totalStoryPages;
    Node* _talkBubbleNode;
    
    cocos2d::ui::Button* _nextButton;
    cocos2d::ui::Button* _prevButton;
    
    void playEnded();
    
    void onFrameEvent(cocostudio::timeline::Frame* pSender);
    
    void playFrameEventEffect(std::string eventData);
    
    std::vector<std::string> _loadedEffects;
    
    void createNextAndPreviousButtons();
    
    void createDialogBubble();
    
    void playSound(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void closeDialog(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);

    void narrateDialog(float dt);
};


#endif /* StoryPlaying_hpp */





