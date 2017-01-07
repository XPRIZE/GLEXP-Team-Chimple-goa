//
//  StoryPlaying.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 07/01/17.
//
//

#include "StoryPlaying.hpp"


static const std::string STORY_JSON = ".storyJSON";
static const std::string SOUND_ENABLED_FOR_STORIES = ".soundEnabledForStories";

USING_NS_CC;

Scene* StoryPlaying::createScene(int pageIndex, std::string storyId)
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = StoryPlaying::create(pageIndex, storyId);
    
    // add layer as a child to scene
    scene->addChild(layer);
    
    //read StoryId from local Storage
    
    layer->_menuContext = MenuContext::create(layer, storyId);
    scene->addChild(layer->_menuContext);
    
    // return the scene
    
    return scene;
}

StoryPlaying* StoryPlaying::create(int pageIndex, std::string storyId)
{
    StoryPlaying* storyPlayingLayer = new (std::nothrow) StoryPlaying();
    if(storyPlayingLayer && storyPlayingLayer->init(pageIndex, storyId)) {
        storyPlayingLayer->autorelease();
        return storyPlayingLayer;
    }
    CC_SAFE_DELETE(storyPlayingLayer);
    return nullptr;
}


StoryPlaying::StoryPlaying():
_menuContext(nullptr),
_storyInformation(""),
_baseDir(""),
_isPlayEnded(false),
_nextButton(nullptr),
_prevButton(nullptr),
_totalStoryPages(0)
{
}

StoryPlaying::~StoryPlaying() {
}

bool StoryPlaying::init(int pageIndex, std::string storyId)
{
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    this->_storyId = storyId;
    this->_pageIndex = pageIndex;
    this->load();
    
    return true;
}


void StoryPlaying::load() {
    SpriteFrameCache::getInstance()->addSpriteFramesWithFile("template/template_02/template_02.plist");
    
    rapidjson::Document d;
    std::string data;
    localStorageGetItem(STORY_JSON, &data);
    
    CCLOG("data received %s", data.c_str());
    this->_storyInformation = data;
    if (false == d.Parse<0>(_storyInformation.c_str()).HasParseError()) {
        // document is ok
        // get Content page
        const rapidjson::Value& dsStoryPages = d["pages"];
        _totalStoryPages = dsStoryPages.Size();
        const std::string contentPageName = dsStoryPages[this->_pageIndex]["contentJson"].GetString();
        CCLOG("contentPageName %s", contentPageName.c_str());
        std::vector<std::string> contentPageInfo = _menuContext->split(contentPageName, '/');
        if(contentPageInfo.size() > 0) {
            _baseDir = contentPageInfo.at(0);
        }
        loadContentPage(contentPageName);
        createNextAndPreviousButtons();
        
    }
}

void StoryPlaying::playEnded() {
    _isPlayEnded = true;
    
    if(_pageIndex + 1 != _totalStoryPages)
    {
        _nextButton->setEnabled(true);
        _nextButton->setVisible(true);
    }
    
    if(_pageIndex != 0) {
        _prevButton->setEnabled(true);
        _prevButton->setVisible(true);
    }

}

void StoryPlaying::createNextAndPreviousButtons() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    if(_pageIndex + 1 != _totalStoryPages)
    {
        _nextButton = cocos2d::ui::Button::create("template/template_02/side_arrow.png", "template/template_02/click_side_arrow.png", "template/template_02/side_arrow.png", cocos2d::ui::Widget::TextureResType::PLIST);
        _nextButton->setPosition(Vec2(visibleSize.width - 200.0, visibleSize.height/2));
        _nextButton->setName(NEXT_BUTTON);
        _nextButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::nextStory, this));
        this->addChild(_nextButton, 2);
        _nextButton->setEnabled(false);
        _nextButton->setVisible(false);
        
    }
    
    if(_pageIndex != 0) {
        _prevButton = cocos2d::ui::Button::create("template/template_02/side_arrow.png", "template/template_02/click_side_arrow.png", "template/template_02/side_arrow.png", cocos2d::ui::Widget::TextureResType::PLIST);
        _prevButton->setPosition(Vec2(200.0, visibleSize.height/2));
        _prevButton->setName(PREVIOUS_BUTTON);
        _prevButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::previousStory, this));
        this->addChild(_prevButton, 2);
        _prevButton->setFlippedX(true);
        _prevButton->setEnabled(false);
        _prevButton->setVisible(false);
    }
    
}


void StoryPlaying::onFrameEvent(cocostudio::timeline::Frame* frame) {
    if(!_isPlayEnded) {
        cocostudio::timeline::EventFrame* eventFrame = dynamic_cast<cocostudio::timeline::EventFrame *>(frame);
        if(eventFrame != NULL) {
            Node* node = frame->getNode();
            std::string event = eventFrame->getEvent();
            
            CCLOG("node in event:%s", node->getName().c_str());
            CCLOG("event: %s", event.c_str());
            
            this->playFrameEventEffect(event);
            
        }
    }
}

void StoryPlaying::playFrameEventEffect(std::string eventData) {
    if(!eventData.empty()) {
        std::string eventSoundFile = "sounds/sfx/" +  eventData + ".mp3";
        if(!eventSoundFile.empty() && FileUtils::getInstance()->isFileExist(eventSoundFile)) {
            _loadedEffects.push_back(eventSoundFile);
            CocosDenshion::SimpleAudioEngine::getInstance()->playEffect(eventSoundFile.c_str(), false);
        }
    }
}

void StoryPlaying::loadContentPage(std::string contentPageName) {
    Node *contentPageNode = CSLoader::createNode(contentPageName);
    
    auto timeline = CSLoader::createTimeline(contentPageName);
    contentPageNode->runAction(timeline);
    
    this->addChild(contentPageNode);
    
    
    if(timeline && timeline->IsAnimationInfoExists("master")) {
        //play master animation
        timeline->setAnimationEndCallFunc("master", CC_CALLBACK_0(StoryPlaying::playEnded, this));
        timeline->setFrameEventCallFunc(CC_CALLBACK_1(StoryPlaying::onFrameEvent, this));
        timeline->play("master", false);
    }
    
    
//
//    Node *talkBubbleNode = CSLoader::createNode("template/bubble_tem_01.csb");
//    this->addChild(talkBubbleNode, 1);
//    
//    Node* chooseText = talkBubbleNode->getChildByName(COVER_TEXT);
//    if(chooseText != NULL) {
//        cocos2d::ui::TextField* chooseLabel = dynamic_cast<cocos2d::ui::TextField *>(chooseText);
//        if(chooseLabel != NULL) {
//            std::string coverPageText = "";
//            std::string textFileUrl = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + ".json";
//            if(!textFileUrl.empty() && FileUtils::getInstance()->isFileExist(textFileUrl)) {
//                std::string jsonData = FileUtils::getInstance()->getStringFromFile(textFileUrl);
//                CCLOG("got data %s", jsonData.c_str());
//                rapidjson::Document coverPageTextDocument;
//                if (false == coverPageTextDocument.Parse<0>(jsonData.c_str()).HasParseError()) {
//                    // document is ok
//                    coverPageText = coverPageTextDocument["0"].GetString();
//                }
//                
//            }
//            
//            std::string chooseText = LangUtil::getInstance()->translateString(coverPageText);
//            chooseLabel->setString(chooseText);
//            chooseLabel->setFontSize(150);
//            chooseLabel->setFontName("fonts/Roboto-Regular.ttf");
//            chooseLabel->setTextColor(Color4B::WHITE);
//        }
//    }
//    
//    Node* playNode = talkBubbleNode->getChildByName(PLAY_BUTTON);
//    if(playNode != NULL) {
//        cocos2d::ui::Button* playButton = dynamic_cast<cocos2d::ui::Button *>(playNode);
//        if(playButton != NULL) {
//            playButton->addTouchEventListener(CC_CALLBACK_2(StoryPlayingPage::play, this));
//        }
//    }
//
//    _soundFile = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + "/" + _baseDir + "_0.mp3";
//    
//    //get configuration
//    
//    _soundEnabled = "";
//    localStorageGetItem(SOUND_ENABLED_FOR_STORIES, &_soundEnabled);
//    
//    if(!(_soundEnabled.compare("false") == 0)) {
//        _soundEnabled = "true";
//        localStorageSetItem(SOUND_ENABLED_FOR_STORIES, "true");
//    }
//    
//    Node* soundNode = talkBubbleNode->getChildByName(SOUND_BUTTON);
//    if(soundNode != NULL) {
//        cocos2d::ui::Button* soundButton = dynamic_cast<cocos2d::ui::Button *>(soundNode);
//        if(soundButton != NULL) {
//            soundButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::playSound, this));
//            
//            if(_soundEnabled.compare("true") == 0) {
//                soundButton->setHighlighted(true);
//            } else {
//                soundButton->setHighlighted(false);
//            }
//        }
//    }
}


void StoryPlaying::onExitTransitionDidStart() {
    CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
    for (std::vector<std::string>::iterator it = _loadedEffects.begin() ; it != _loadedEffects.end(); ++it)
    {
        std::string effect = (std::string) *it;
        if(!effect.empty()) {
            CocosDenshion::SimpleAudioEngine::getInstance()->unloadEffect(effect.c_str());
        }
    }
    
}


void StoryPlaying::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    
//    if(_soundEnabled.compare("true") == 0) {
//        if(!_soundFile.empty() && FileUtils::getInstance()->isFileExist(_soundFile)) {
//            CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
//            CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic(_soundFile.c_str(), false);
//        }
//    }
}

void StoryPlaying::nextStory(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            clickedButton->setEnabled(false);
            if(_pageIndex + 1 != _totalStoryPages) {
                Director::getInstance()->replaceScene(TransitionFade::create(1.0, StoryPlaying::createScene(_pageIndex + 1, _storyId), Color3B::BLACK));
            } else {
                //redirect to Q/A Page
            }

            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}

void StoryPlaying::previousStory(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
        {
            clickedButton->setHighlighted(true);
            break;
        }
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            clickedButton->setEnabled(false);
            if(_pageIndex > 0) {
                Director::getInstance()->replaceScene(TransitionFade::create(1.0, StoryPlaying::createScene(_pageIndex - 1, _storyId), Color3B::BLACK));
            }

            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}
