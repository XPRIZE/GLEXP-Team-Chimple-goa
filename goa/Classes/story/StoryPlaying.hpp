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
#include "../menu/MenuContext.h"
#include "cocos2d.h"
#include "audio/include/AudioEngine.h"
#include "../hero/RPGConfig.h"
#include "../menu/MenuContext.h"
#include "../lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "editor-support/cocostudio/ActionTimeline/CCFrame.h"
#include "editor-support/cocostudio/CCComExtensionData.h"
#include "ui/UIWidget.h"
#include "ui/GUIExport.h"
#include "cocos-ext.h"
#include "storage/local-storage/LocalStorage.h"
#include "../util/CommonText.h"
#include "dragonBones/cocos2dx/CCDragonBonesHeaders.h"

#define SHOW_TEXT_AGAIN_BUTTON "showTextAgain"
#define NEXT_BUTTON "next"
#define PREVIOUS_BUTTON "previous"
#define CLOSE_BUTTON "close"
#define SOUND_BUTTON "sound"
#define SOUND_BUTTON_WORD "sound_button_2"
#define TEXT_FIELD_WORD "TextField_1"


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
    
    void showTextAgain(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
private:
    std::string _baseDir;
    MenuContext* _menuContext;
    std::string _soundFile;
    std::string _soundEnabled;
    std::string _storyId;
    int _pageIndex;
    bool _isPlayEnded;
    bool _isPlayStarted;
    bool _isTextShown;
    int _totalStoryPages;
    Node* _talkBubbleNode;
    Node* _contentPageNode;
    Node* _wordBubbleNode;
    float _offsetInY;
    float _offsetInX;
    bool _isNodeDraggable;
    bool _textDisplayAnimationRunning;
    std::string _animationToPlayWhenTouched;
    Color3B _originalSpriteColor;
    std::string _pronouceWord;
    int _zOrder;
    std::string _contentPageText;
    bool _isAudionEngineInitialized;
    unsigned long _currentSplitWordIndex;
    unsigned long _totalSplitWords;
    
    std::map<std::string, Color3B> skinColors;
    std::map<std::string, std::string> _wordMappings;
    std::map<std::string, std::string> _pixelPerfectMapping;
    std::map<std::string, std::vector<std::vector<cocos2d::Point>>> _nodesToTringlePointsMapping;
    
    
    std::vector<std::string> _loadedEffects;
    std::vector<std::string> _loadedSplitWordsEffects;
    std::vector<CommonText*> _contentCommonTextTokens;
    std::vector<std::string> _individualTextsTokens;
    std::string _splitSoundFilesDirectoryUrl;
    
    cocostudio::timeline::ActionTimeline* _mainTimeLine;
    
    cocos2d::ui::Button* _nextButton;
    cocos2d::ui::Button* _prevButton;
    cocos2d::ui::Button* _showAgainTextButton;
    
    void playEnded();
    
    void onFrameEvent(cocostudio::timeline::Frame* pSender);
    
    void playFrameEventEffect(std::string eventData);
    
    
    
    void createNextAndPreviousButtons();
    
    void createDialogBubble();
    
    void playSound(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void closeDialog(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void narrateDialog(float dt);
    
    void highlightedNarrateDialog(float dt);
    
    void processScene(cocos2d::Node* parent);
    
    void bindListenerToSkeletonNode(cocostudio::timeline::SkeletonNode* skeletonNode);
    
    bool onTouchBeganOnSkeleton(cocos2d::Touch* touch, cocos2d::Event* event);
    
    void onTouchEndedOnSkeleton(cocos2d::Touch *touch, cocos2d::Event *event);
    
    void onTouchMovedOnSkeleton(cocos2d::Touch *touch, cocos2d::Event *event);
    
    void bindListenerToCompositeNode(cocos2d::Node* node);
    
    bool onTouchBeganOnComposite(cocos2d::Touch* touch, cocos2d::Event* event);
    
    void onTouchEndedOnComposite(cocos2d::Touch *touch, cocos2d::Event *event) ;
    
    void onTouchMovedOnComposite(cocos2d::Touch *touch, cocos2d::Event *event);
    
    void bindListenerToNode(cocos2d::Node* node);
    
    bool onTouchBeganOnNode(cocos2d::Touch* touch, cocos2d::Event* event);
    
    void onTouchEndedOnNode(cocos2d::Touch *touch, cocos2d::Event *event);
    
    void onTouchMovedOnNode(cocos2d::Touch *touch, cocos2d::Event *event);
    
    void bindEventsToTarget(cocos2d::Node* node);
    
    void playAnimationOnNode(std::string animationName, Node* node);
    
    void cleanUpWhenTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event);
    
    void changeSkinColor(cocostudio::timeline::BoneNode* bone, bool revert);
    
    void changeBoneColor(cocostudio::timeline::BoneNode* skeleton, bool revert);
    
    void createWordBubble();
    
    void showText(std::string nodeName);
    
    bool translatedText(std::string text);
    
    void displayTextAnimationFinished();
    
    void removeWordBubble(float dt);
    
    void wordBubbleDisappeared();
    
    void preloadAllAudio();
    
    void pronounceWord(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
    
    void processPixelPerfectNodes(cocos2d::Node* parent);
    
    void playMasterAnimation();
    
    bool pointInTriangle(cocos2d::Point p0, cocos2d::Point p1, cocos2d::Point p2, cocos2d::Point p3);
    
    void positionTextNode(CommonText* textNode, Node* storyTextNode, float currentNodeX, float currentNodeY);
    
    void renderStoryText(Node* parentNode, Node* storyTextNode);
    
    void playSplitAudio(std::string audioFile, CommonText* text);
    
    void playNextSplitWordCallBack(int id, const std::string& file);
            
    void loadContentPageText();
    
    
    //DRAGON BONE SPECIFIC
    
    float _prevArmatureScale;
    float _armatureScale;
    cocos2d::Vec2 _startPoint;
    
    unsigned _armatureIndex;
    unsigned _animationIndex;
    dragonBones::DragonBonesData* _dragonBonesData;
    dragonBones::Armature* _armature;
    dragonBones::CCArmatureDisplay* _armatureDisplay;
    dragonBones::CCFactory _factory;
    cocos2d::Node* _bg;
    
    void _changeArmature(cocos2d::Node* parentNode);
    void _changeAnimation();
    void _changeAnimationTo(std::string name);
    void _stopAnimationTo(std::string animName);
        
    void createDragonBoneNode(cocos2d::Node* parentNode, std::string dragonBoneName);
    void renderTextAndPlayDialog(cocos2d::Node* parentNode, cocos2d::Node* storyTextNode);
    void enableTouchAndDisableTextShown();
    bool _isTextNodeDisplayTextAvailable;
    cocos2d::ui::TextField* _displayTextNode;
    
};


#endif /* StoryPlaying_hpp */





