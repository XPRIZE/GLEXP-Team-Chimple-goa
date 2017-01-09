//
//  StoryCoverPage.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 07/01/17.
//
//

#include <iostream>
#include <string>
#include <sstream>
#include <regex>

#include "StoryCoverPage.hpp"
#include "StoryPlaying.hpp"
#include "story/QuestionHandler.h"

static const std::string STORY_JSON = ".storyJSON";
static const std::string SOUND_ENABLED_FOR_STORIES = ".soundEnabledForStories";

USING_NS_CC;

Scene* StoryCoverPage::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = StoryCoverPage::create();
    
    // add layer as a child to scene
    scene->addChild(layer);
    
    layer->_menuContext = MenuContext::create(layer, "StoryCoverPage");
    scene->addChild(layer->_menuContext);
    
    // return the scene
    
    return scene;
}

StoryCoverPage* StoryCoverPage::create()
{
    StoryCoverPage* storyCoverPageLayer = new (std::nothrow) StoryCoverPage();
    if(storyCoverPageLayer && storyCoverPageLayer->init()) {
        storyCoverPageLayer->autorelease();
        return storyCoverPageLayer;
    }
    CC_SAFE_DELETE(storyCoverPageLayer);
    return nullptr;
}


StoryCoverPage::StoryCoverPage():
_menuContext(nullptr),
_baseDir(""),
_storyId("")

{
}

StoryCoverPage::~StoryCoverPage() {
}

bool StoryCoverPage::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    this->load();
    
    return true;
}


void StoryCoverPage::load() {

    std::string data;
    localStorageGetItem(STORY_JSON, &data);
    
    int storyIndex = atoi(data.c_str());
    
    std::string contents = FileUtils::getInstance()->getStringFromFile("misc/shelfConfig.json");
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
        const rapidjson::Value& storyConfigs = d["stories"];
        assert(storyConfigs.IsArray());
        const rapidjson::Value& story = storyConfigs[storyIndex];
        _storyId = story["storyId"].GetString();
        const std::string coverPageName = story["coverPage"].GetString();
        std::vector<std::string> coverPageInfo = _menuContext->split(coverPageName, '/');
        if(coverPageInfo.size() > 0) {
            _baseDir = coverPageInfo.at(0);
        }
        loadCoverPage(coverPageName);
        
    }
}

void StoryCoverPage::loadCoverPage(std::string coverPageUrl) {
    Node *coverPageNode = CSLoader::createNode(coverPageUrl);
    this->addChild(coverPageNode);

    Node *talkBubbleNode = CSLoader::createNode("template/bubble_tem_01.csb");
    this->addChild(talkBubbleNode, 1);
    
    Node* chooseText = talkBubbleNode->getChildByName(COVER_TEXT);
    if(chooseText != NULL) {
        cocos2d::ui::TextField* chooseLabel = dynamic_cast<cocos2d::ui::TextField *>(chooseText);
        if(chooseLabel != NULL) {
            std::string coverPageText = "";
            std::string textFileUrl = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + ".json";
            if(!textFileUrl.empty() && FileUtils::getInstance()->isFileExist(textFileUrl)) {
                std::string jsonData = FileUtils::getInstance()->getStringFromFile(textFileUrl);
                CCLOG("got data %s", jsonData.c_str());
                rapidjson::Document coverPageTextDocument;
                if (false == coverPageTextDocument.Parse<0>(jsonData.c_str()).HasParseError()) {
                    // document is ok
                    coverPageText = coverPageTextDocument["0"].GetString();
                }
                
            }
            
            std::string chooseText = LangUtil::getInstance()->translateString(coverPageText);
            chooseText = QuestionHandler::wrapString(chooseText, 30);
            chooseLabel->setString(chooseText);            
            chooseLabel->setFontSize(130);
            chooseLabel->setFontName("fonts/Roboto-Regular.ttf");
            chooseLabel->setTextColor(Color4B(128, 64, 0, 255));
        }
    }
    
    Node* playNode = talkBubbleNode->getChildByName(PLAY_BUTTON);
    if(playNode != NULL) {
        cocos2d::ui::Button* playButton = dynamic_cast<cocos2d::ui::Button *>(playNode);
        if(playButton != NULL) {
            playButton->addTouchEventListener(CC_CALLBACK_2(StoryCoverPage::play, this));
        }
    }
    
    _soundFile = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + "/" + _baseDir + "_0.ogg";
    
    //get configuration
    
    _soundEnabled = "";
    localStorageGetItem(SOUND_ENABLED_FOR_STORIES, &_soundEnabled);
    
    if(!(_soundEnabled.compare("false") == 0)) {
        _soundEnabled = "true";
        localStorageSetItem(SOUND_ENABLED_FOR_STORIES, "true");
    }

    Node* soundNode = talkBubbleNode->getChildByName(SOUND_BUTTON);
    if(soundNode != NULL) {
        cocos2d::ui::Button* soundButton = dynamic_cast<cocos2d::ui::Button *>(soundNode);
        if(soundButton != NULL) {
            soundButton->addTouchEventListener(CC_CALLBACK_2(StoryCoverPage::playSound, this));
            
            if(_soundEnabled.compare("true") == 0) {
                soundButton->setHighlighted(true);
            } else {
                soundButton->setHighlighted(false);
            }
        }
    }
}


void StoryCoverPage::onExitTransitionDidStart() {
    CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
}


void StoryCoverPage::narrateDialog(float dt) {
    if(_soundEnabled.compare("true") == 0) {
        if(!_soundFile.empty() && FileUtils::getInstance()->isFileExist(_soundFile)) {
            CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
            CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic(_soundFile.c_str(), false);
        }
    }
}

void StoryCoverPage::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    this->scheduleOnce(schedule_selector(StoryCoverPage::narrateDialog), 1.0f);
}

void StoryCoverPage::playSound(Ref* pSender, ui::Widget::TouchEventType eEventType)
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
            
            if(_soundEnabled.compare("true") == 0) {
                _soundEnabled = "false";
                clickedButton->setHighlighted(false);
                localStorageSetItem(SOUND_ENABLED_FOR_STORIES, _soundEnabled);
                
                if(CocosDenshion::SimpleAudioEngine::getInstance()->isBackgroundMusicPlaying())
                {
                    CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
                }
                
            } else {
                _soundEnabled = "true";
                clickedButton->setHighlighted(true);
                localStorageSetItem(SOUND_ENABLED_FOR_STORIES, _soundEnabled);
                
                CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic(_soundFile.c_str(), false);
                CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
                
            }
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}

void StoryCoverPage::play(Ref* pSender, ui::Widget::TouchEventType eEventType)
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
            clickedButton->setVisible(false);
            clickedButton->setEnabled(false);
            
            Director::getInstance()->replaceScene(TransitionFade::create(1.0, StoryPlaying::createScene(0, _storyId), Color3B::BLACK));
            break;
        }
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}
