//
//  CopyRight.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 06/01/17.
//
//

#include "CopyRight.hpp"
#include "../menu/MenuContext.h"
#include "editor-support/cocostudio/CocoStudio.h"


USING_NS_CC;

CopyRight::CopyRight():baseDir(""){
    
}


CopyRight::~CopyRight() {
    
}

cocos2d::Scene* CopyRight::createScene(const std::string& storyId, const std::string& baseDir, int totalPoints, int currentPoints)
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = CopyRight::create(storyId, baseDir, totalPoints, currentPoints);
    layer->setTouchEnabled(false);
    // add layer as a child to scene
    scene->addChild(layer);
    
    layer->_menuContext = MenuContext::create(layer, storyId);
    layer->_menuContext->setMaxPoints(totalPoints);
    layer->_menuContext->addPoints(currentPoints);

    scene->addChild(layer->_menuContext);

    
    
    return scene;
}

CopyRight* CopyRight::create(const std::string& storyId, const std::string& baseDir, int totalPoints, int currentPoints)
{
    CopyRight* copyRightLayer = new (std::nothrow) CopyRight();
    if(copyRightLayer && copyRightLayer->init(storyId, baseDir, totalPoints, currentPoints)) {
        copyRightLayer->autorelease();
        return copyRightLayer;
    }
    CC_SAFE_DELETE(copyRightLayer);
    return nullptr;
}


bool CopyRight::init(const std::string& storyId, const std::string& baseDir, int totalPoints, int currentPoints)
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    _copyRightNode = CSLoader::createNode("template/copyright.csb");
    _copyRightNode->setAnchorPoint(Vec2(0.5,0.5));
    _copyRightNode->setPositionX(visibleSize.width/2);
    _copyRightNode->setPositionY(visibleSize.height/2);
    this->addChild(_copyRightNode);
    
    this->baseDir = baseDir;
    
    std::string storedTotalPoints;
    localStorageGetItem("xc.story.totalPoints", &storedTotalPoints);
    
    if(!storedTotalPoints.empty()) {
        localStorageRemoveItem("xc.story.totalPoints");
    }

    std::string storedBaseDir;
    localStorageGetItem("xc.story.baseDir", &storedBaseDir);
    
    if(!storedBaseDir.empty()) {
        localStorageRemoveItem("xc.story.baseDir");
    }

    std::string storedCurrentPoints;
    localStorageGetItem("xc.story.currentPoints", &storedCurrentPoints);
    
    if(!storedCurrentPoints.empty()) {
        localStorageRemoveItem("xc.story.currentPoints");
    }

    std::string storedStoryId;
    localStorageGetItem("xc.story.curStoryId", &storedStoryId);
    
    if(!storedStoryId.empty()) {
        localStorageRemoveItem("xc.story.curStoryId");
    }

    configureCopyRightText();
    
    this->scheduleOnce(schedule_selector(CopyRight::showScore), 2.0);
    
    return true;
}


void CopyRight::showScore(float dt) {
    _menuContext->showScore();
}

void CopyRight::configureCopyRightText() {
    
    auto langDir = LangUtil::getInstance()->getLang();
    auto textFileUrl = "story/" + langDir + "/" + baseDir + ".json";
    if(FileUtils::getInstance()->isFileExist(textFileUrl)) {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(textFileUrl);
        CCLOG("got data %s", jsonData.c_str());
        
        
        rapidjson::Document d;
        d.Parse<0>(jsonData.c_str());
        if (d.HasParseError()) {
            CCLOG("GetParseError %u\n",d.GetParseError());
        } else
        {
            const std::string copyrightText = d["copyright"].GetString();
            CCLOG("copyrightText %s", copyrightText.c_str());
            
            Node* panel = _copyRightNode->getChildByName("Panel_1");
            if(panel != NULL) {
                Node* textNode = panel->getChildByName("TextField_1");
                if(textNode != NULL) {                    
                    cocos2d::ui::TextField* sTextField = dynamic_cast<cocos2d::ui::TextField*>(textNode);
                    if(sTextField != NULL) {
                        sTextField->setString(copyrightText);
                        sTextField->setFontName(LangUtil::getInstance()->getFontFile());
                        sTextField->setFontSize(50);
                        sTextField->setTextColor(Color4B::BLACK);
                        sTextField->setTextHorizontalAlignment(TextHAlignment::LEFT);
                        sTextField->setTextVerticalAlignment(TextVAlignment::CENTER);
                    }
                    
                }
            }
            
        }
    }
}
