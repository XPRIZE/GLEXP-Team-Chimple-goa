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
#include "QuestionHandler.h"

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
_storyId(""),
_contentPageText(""),
_isAudionEngineInitialized(false),
_currentSplitWordIndex(0),
_totalSplitWords(0),
talkBubbleNode(nullptr)

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
    
    this->loadTimings();
    
    return true;
}


void StoryCoverPage::load() {

    std::string data;
    localStorageGetItem(STORY_JSON, &data);
    
    if(cocos2d::experimental::AudioEngine::lazyInit())
    {
        _isAudionEngineInitialized = true;
    }else
    {
        _isAudionEngineInitialized = false;
    }
    
    
    
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

    this->talkBubbleNode = CSLoader::createNode("template/bubble_tem_01.csb");
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
                    coverPageText = LangUtil::getInstance()->translateString(coverPageText);
                    _individualTextsTokens = _menuContext->splitRegEx(coverPageText, "\\s+");
                    
                    this->preloadAllAudio();
                }
            }
        }
    }
    
    renderStoryText(talkBubbleNode, chooseText);
    Node* playNode = talkBubbleNode->getChildByName(PLAY_BUTTON);
    if(playNode != NULL) {
        cocos2d::ui::Button* playButton = dynamic_cast<cocos2d::ui::Button *>(playNode);
        if(playButton != NULL) {
            playButton->setTitleText("");
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
            soundButton->setTitleText("");
            soundButton->addTouchEventListener(CC_CALLBACK_2(StoryCoverPage::playSound, this));
            
            if(_soundEnabled.compare("true") == 0) {
                soundButton->setHighlighted(true);
            } else {
                soundButton->setHighlighted(false);
            }
        }
    }
}


void StoryCoverPage::preloadAllAudio() {
    _loadedSplitWordsEffects.clear();
    std::string pageI = MenuContext::to_string(0);
    std::string _splitSoundFilesDirectoryUrl = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + "/" + pageI;
    
    if(!_splitSoundFilesDirectoryUrl.empty())
    {
        int prefix = 0;
        std::string _splitFile = "";
        for (int i=0; i<_individualTextsTokens.size(); i++)
        {
            _splitFile = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + "/" + pageI + "/"  +  _baseDir  + "_" + pageI + "-" + MenuContext::to_string(prefix) + MenuContext::to_string(i) +".ogg";
            
            if(!_splitFile.empty() && FileUtils::getInstance()->isFileExist(_splitFile)) {
                _loadedSplitWordsEffects.push_back(_splitFile);
            }
        }
        
        for (std::vector<std::string>::iterator it = _loadedSplitWordsEffects.begin() ; it != _loadedSplitWordsEffects.end(); ++it)
        {
            std::string effect = (std::string) *it;
            if(_isAudionEngineInitialized) {
                if(!effect.empty()) {
                    cocos2d::experimental::AudioEngine::preload(effect.c_str());
                }
            }
        }
    }
}

void StoryCoverPage::renderStoryText(Node* parentNode, Node* storyTextNode) {
    std::vector<std::string> individualTexts = _individualTextsTokens;
    Vec2 lastRenderedLabelPosition = Vec2(0.0f,0.0f);
    Node* lastRenderedLabel;
    bool firstPassFinished = false;
    bool newLineCharRecognized = false;
    float yOffset = 0;
    int howManyTimes = 0;
    int whichToken = 0;
    float initialX = 0.0f;
    for (std::vector<std::string>::iterator it = individualTexts.begin() ; it != individualTexts.end(); ++it) {
        std::string token = *it;
        newLineCharRecognized = false;
        std::string newLineChar = "\n";
        if (token.find(newLineChar) != std::string::npos)
        {
            newLineCharRecognized = true;
            std::string::size_type i = token.find(newLineChar);
            if (i != std::string::npos) {
                token.erase(i, newLineChar.length());
            }
        }
        //create CommonText node
        auto label = CommonText::create();
        label->setCommonTextInStory(true);
        if(whichToken < _loadedSplitWordsEffects.size())
        {
            std::string audioFile = _loadedSplitWordsEffects.at(whichToken);
            label->setSplitFileNameInStory(audioFile);
        }
        
        whichToken++;
        label->setString(token);
        label->setFontSize(130);
        label->setFontName("fonts/Roboto-Regular.ttf");
        label->setTextColor(Color4B(128, 64, 0, 255));
        if(firstPassFinished)
        {
            if(newLineCharRecognized || lastRenderedLabel->getPosition().x + lastRenderedLabel->getBoundingBox().size.width/2 + label->getBoundingBox().size.width > parentNode->getBoundingBox().size.width - 250.0f)
            {
                //wrap
                howManyTimes++;
                float adjustedY = yOffset - (howManyTimes * lastRenderedLabel->getBoundingBox().size.height);
                //float initialX = storyTextNode->getPosition().x - storyTextNode->getBoundingBox().size.width/2 + 100.0f;
                lastRenderedLabelPosition = Vec2(initialX + label->getBoundingBox().size.width/2, adjustedY);
            } else {
                token = ' ' + token;
                label->setString(token);
                lastRenderedLabelPosition = Vec2(lastRenderedLabel->getPosition().x + lastRenderedLabel->getBoundingBox().size.width/2 + label->getBoundingBox().size.width/2, lastRenderedLabel->getPosition().y);
            }
            
            positionTextNode(label, storyTextNode, lastRenderedLabelPosition.x, lastRenderedLabelPosition.y);
        } else {
            positionTextNode(label, storyTextNode, 0.0f, 0.0f);
            yOffset = label->getPosition().y;
        }
        
        lastRenderedLabel = label;
        firstPassFinished = true;
        if(initialX == 0.0f) {
            initialX = label->getPosition().x;
            label->setPositionX(label->getPositionX() + initialX/2);
        }
        
        _contentCommonTextTokens.push_back(label);
        parentNode->addChild(label);
    }
}

void StoryCoverPage::positionTextNode(CommonText* textNode, Node* storyTextNode, float currentNodeX, float currentNodeY) {
    
    float xPos = 0.0f;
    float yPos = 0.0f;
    if(currentNodeX == 0.0f) {
        xPos = storyTextNode->getPosition().x - storyTextNode->getBoundingBox().size.width/2 + 50.0f;
    } else {
        xPos = currentNodeX;
    }
    
    if(currentNodeY == 0.0f) {
        yPos = storyTextNode->getPosition().y + storyTextNode->getBoundingBox().size.height/2 - 50.0f;
    } else {
        yPos = currentNodeY;
    }
    
    textNode->setPosition(Vec2(xPos , yPos));
}


void StoryCoverPage::onExitTransitionDidStart() {
    Node::onExitTransitionDidStart();
    CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
    if(!_contentCommonTextTokens.empty())
    {
        for (std::vector<CommonText*>::iterator it = _contentCommonTextTokens.begin() ; it != _contentCommonTextTokens.end(); ++it) {
            CommonText* nCommonText = *it;
            nCommonText->removeFromParentAndCleanup(true);
        }
        _contentCommonTextTokens.clear();
    }
    
    if(talkBubbleNode != NULL)
    {
        talkBubbleNode->removeFromParentAndCleanup(true);
    }
    
}


std::vector<float> StoryCoverPage::splitFloat(std::string s, char delim)
{
    std::vector<float> elems;
    std::stringstream ss;
    ss.str(s);
    std::string item;
    while (getline(ss, item, delim)) {
        float i = std::atof(item.c_str());
        elems.push_back(i);
    }
    return elems;
}


void StoryCoverPage::loadTimings() {
    std::string pageI = MenuContext::to_string(0);
    std::string timeFileUrl = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + "_timing" + ".json";
    if(!timeFileUrl.empty() && FileUtils::getInstance()->isFileExist(timeFileUrl))
    {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(timeFileUrl);
        CCLOG("got data %s", jsonData.c_str());
        rapidjson::Document coverPageTextDocument;
        if (false == coverPageTextDocument.Parse<0>(jsonData.c_str()).HasParseError()) {
            // document is ok
            rapidjson::Value::MemberIterator M;
            const char *key,*value;
            int i = 0;
            for (M=coverPageTextDocument.MemberBegin(); M!=coverPageTextDocument.MemberEnd(); M++)
            {
                key   = M->name.GetString();
                value = M->value.GetString();
                std::string sValue = value;
                
                if(i == 0) {
                    _contentPageText = value;
                    
                    if (!_contentPageText.empty() && _contentPageText[_contentPageText.length()-1] == '\n') {
                        _contentPageText.erase(_contentPageText.length()-1);
                    }
                    
                    _loadedSplitWordsTimings = this->splitFloat(_contentPageText, ',');
                    break;
                }
            }
        }
    }
}



void StoryCoverPage::narrateDialog(float dt) {
    if(_soundEnabled.compare("true") == 0) {
        if(!_soundFile.empty() && FileUtils::getInstance()->isFileExist(_soundFile)) {
            CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
            CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic(_soundFile.c_str(), false);
        }
    }
}

void StoryCoverPage::highlightedNarrateWord(float dt) {
    
    if(_loadedSplitWordsEffects.size() >0 && _contentCommonTextTokens.size() > 0)
    {
        MenuContext::_isInStoryDialogSpeechCurrentlyActive = true;
    }
    
    if(_loadedSplitWordsTimings.size() > 0)
    {
        _currentSplitWordIndex = 0;
        _totalSplitTimings = _loadedSplitWordsTimings.size();
        
        
        if(_currentSplitWordIndex < _loadedSplitWordsTimings.size() &&
           _currentSplitWordIndex < _contentCommonTextTokens.size() &&
           _currentSplitWordIndex < _totalSplitTimings)
        {
            float time = _loadedSplitWordsTimings.at(_currentSplitWordIndex);
            highlightedNWord = _contentCommonTextTokens.at(_currentSplitWordIndex);
            this->highlightWord(time, highlightedNWord);
        }
    }
}

void StoryCoverPage::unhighlightText(float dt) {
    this->unschedule(schedule_selector(StoryCoverPage::unhighlightText));
    
    if(_currentSplitWordIndex <= _contentCommonTextTokens.size())
    {
        preHighlightedNWord = _contentCommonTextTokens.at(_currentSplitWordIndex - 1);
        preHighlightedNWord->setTextColor(Color4B(128, 64, 0, 255));
    }
    
    if(_currentSplitWordIndex < _loadedSplitWordsTimings.size() &&
       _currentSplitWordIndex < _contentCommonTextTokens.size() &&
       _currentSplitWordIndex < _totalSplitTimings)
    {
        float time = _loadedSplitWordsTimings.at(_currentSplitWordIndex);
        highlightedNWord = _contentCommonTextTokens.at(_currentSplitWordIndex);
        this->highlightWord(time, highlightedNWord);
    }
}

void StoryCoverPage::highlightWord(float time, cocos2d::ui::Text* text) {
    
    text->setTextColor(Color4B::BLUE);
    _currentSplitWordIndex++;
    this->schedule(schedule_selector(StoryCoverPage::unhighlightText), time);
}





void StoryCoverPage::onEnterTransitionDidFinish() {
    Node::onEnterTransitionDidFinish();
    this->scheduleOnce(schedule_selector(StoryCoverPage::narrateDialog), 1.0f);
    this->scheduleOnce(schedule_selector(StoryCoverPage::highlightedNarrateWord), 1.0f);
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
                this->scheduleOnce(schedule_selector(StoryCoverPage::highlightedNarrateWord), 0.0f);
                
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
