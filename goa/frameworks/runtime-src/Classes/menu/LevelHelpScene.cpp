//
//  LevelHelpScene.cpp
//  goa
//
//  Created by Srikanth Talapadi on 01/12/2016.
//
//

#include "LevelHelpScene.h"
#include "MenuContext.h"
#include "../GameScene.h"
#include "storage/local-storage/LocalStorage.h"
#include "ui/CocosGUI.h"
#include "platform/CCFileUtils.h"

USING_NS_CC;
using namespace cocos2d::ui;
using namespace experimental;

static const std::string CURRENT_LEVEL = ".currentLevel";

Scene *LevelHelpScene::createScene(std::string gameName) {
    auto layer = LevelHelpScene::create(gameName);
    auto scene = Scene::create();
    scene->addChild(layer);
    return scene;
}

LevelHelpScene *LevelHelpScene::create(std::string gameName) {
    LevelHelpScene* lhs = new (std::nothrow) LevelHelpScene();
    if(lhs && lhs->initWithGame(gameName))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
}

bool LevelHelpScene::init() {
    return true;
}

bool LevelHelpScene::initWithGame(std::string gameName) {
    if(!Node::init()) {
        return false;
    }
    _gameName = gameName;
    _currentLevel = 1;
    std::string currentLevelStr;
    localStorageGetItem(gameName + CURRENT_LEVEL, &currentLevelStr);
    if(!currentLevelStr.empty()) {
        _currentLevel = std::atoi( currentLevelStr.c_str());
    }
    std::string contents = FileUtils::getInstance()->getStringFromFile("config/game_levels.json");
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
        // document is ok
        
        if(d.HasMember(gameName.c_str())) {
            const rapidjson::Value& game = d[gameName.c_str()];
            std::string lvl = "";
            assert(game.IsArray());
            for (rapidjson::SizeType i = 0; i < game.Size(); i++) {
                const rapidjson::Value& helpMap = game[i];
                if(helpMap.HasMember("levels")) {
                    const rapidjson::Value& levels = helpMap["levels"];
                    assert(levels.IsArray());
                    for (rapidjson::SizeType i = 0; i < levels.Size(); i++) {
                        int level = levels[i].GetInt();
                        if(level == _currentLevel || (level == 1 && _helpText.empty())) {
                            _helpText = helpMap["help"].GetString();
                            _videoName = helpMap["video"].GetString();
                        }
                    }
                }
            }
        }
    }
    return true;
}

void LevelHelpScene::onEnterTransitionDidFinish() {
    auto bg = CSLoader::createNode("template/video_screen.csb");
    Size visibleSize = Director::getInstance()->getVisibleSize();
    bg->setName("bg");
    if (visibleSize.width > 2560) {
        bg->setPositionX((visibleSize.width - 2560)/2);
    }
    this->addChild(bg);
    
    auto button = static_cast<Button*> (bg->getChildByName("Button_1"));
    button->addTouchEventListener(CC_CALLBACK_2(LevelHelpScene::gotoGame, this));
//    button->setPosition(Vec2(1280, 900));
//    addChild(button);
    
    auto textField = static_cast<TextField*> (bg->getChildByName("TextField_1"));
    auto text = Text::create(_helpText, "Arial", 64);
    text->setTextColor(Color4B::BLACK);
    auto pos = textField->getPosition();
    auto wpos = bg->convertToWorldSpace(pos);
    text->setPosition(wpos);
    text->setTextAreaSize(Size(2000, 0));
    text->ignoreContentAdaptWithSize(true);
    text->setEnabled(false);
    text->setTouchEnabled(false);
    text->setFocusEnabled(false);
    addChild(text);
    bg->removeChild(textField);
    videoPlayStart();
}

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
void LevelHelpScene::videoEventCallback(Ref* sender, cocos2d::experimental::ui::VideoPlayer::EventType eventType) {
    switch (eventType) {
        case cocos2d::experimental::ui::VideoPlayer::EventType::PLAYING:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::PAUSED:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::STOPPED:
            break;
        case cocos2d::experimental::ui::VideoPlayer::EventType::COMPLETED:
            videoPlayOverCallback();
            break;
        default:
            break;
    }
}
#endif

void LevelHelpScene::videoPlayStart()
{
    if(FileUtils::getInstance()->isFileExist("help/" + _videoName)) {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        _vp = experimental::ui::VideoPlayer::create();
        _vp->setContentSize(cocos2d::Size(1280, 800));
        _vp->setFileName("help/" + _videoName);
        _vp->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
        _vp->play();
        _vp->setName("video");
        auto bg = getChildByName("bg");
        auto screen_1 = bg->getChildByName("screen_1");
        screen_1->addChild(_vp);
        auto cSize = screen_1->getContentSize();
        _vp->setPosition(Vec2(cSize.width / 2, cSize.height / 2));
        _vp->addEventListener(CC_CALLBACK_2(LevelHelpScene::videoEventCallback, this));
#else
        videoPlayOverCallback();
#endif
    }

}

void LevelHelpScene::videoPlayOverCallback() {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    _vp->seekTo(0.0);
    _vp->play();
#endif
}


void LevelHelpScene::gotoGame(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        MenuContext::launchGameFinally(_gameName);
    }
}

LevelHelpScene::LevelHelpScene() {
    
}

LevelHelpScene::~LevelHelpScene() {
    
}
