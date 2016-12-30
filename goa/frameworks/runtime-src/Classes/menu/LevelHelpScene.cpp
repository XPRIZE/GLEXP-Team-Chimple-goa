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
static const std::string NUMERIC_WRITING = ".numeric";
static const std::string UPPER_ALPHABET_WRITING = ".upper";
static const std::string VIDEO_EXT = ".webm";
static const int MAX_VIEWS = 3;

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

std::vector<std::string> LevelHelpScene::split(std::string s, char delim)
{
    std::vector<std::string> elems;
    std::stringstream ss;
    ss.str(s);
    std::string item;
    while (getline(ss, item, delim)) {
        elems.push_back(item);
    }
    return elems;
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
                int videoLevel = 0;
                int videoLevelIndex = 0;
                std::string video;
                std::vector<std::string> conceptVideos;
                if(helpMap.HasMember("levels")) {
                    const rapidjson::Value& levels = helpMap["levels"];
                    assert(levels.IsArray());
                    for (rapidjson::SizeType i = 0; i < levels.Size(); i++) {
                        int level = levels[i].GetInt();
                        if(level == _currentLevel || (level == 1 && _helpText.empty())) {
                            _helpText = helpMap["help"].GetString();
                            video = helpMap["video"].GetString();
                            videoLevel = level;
                            videoLevelIndex = i;
                        }
                    }
                }
                if(videoLevel > 1) {
                    _videos.clear();
                }
                if((videoLevel == _currentLevel || videoLevel == 1) && helpMap.HasMember("concepts")) {
                    const rapidjson::Value& concepts = helpMap["concepts"];
                    assert(concepts.IsArray());
                    for (rapidjson::SizeType i = 0; i < concepts.Size(); i++) {
                        std::string concept  = concepts[i].GetString() + VIDEO_EXT;
                        _videos.push_back(concept);
                    }
                }
                if(helpMap.HasMember("level_concepts")) {
                    const rapidjson::Value& levelConcepts = helpMap["level_concepts"];
                    assert(levelConcepts.IsArray());
                    std::string levelConcept;
                    if(videoLevel == _currentLevel && levelConcepts.Size() >= videoLevel) {
                        levelConcept = levelConcepts[videoLevelIndex].GetString() + VIDEO_EXT;
                        _videos.push_back(levelConcept);
                    }
                }
                if(!video.empty()) {
                    _videos.push_back(video);
                }
                if(helpMap.HasMember("writing")) {
                    const rapidjson::Value& writing = helpMap["writing"];
                    assert(writing.IsArray());
                    for (rapidjson::SizeType i = 0; i < writing.Size(); i++) {
                        const rapidjson::Value& writingConfig = writing[i];
                        if(writingConfig.HasMember("level")) {
                            const rapidjson::Value& cLevels =  writingConfig["level"];
                            assert(cLevels.IsArray());
                            for (rapidjson::SizeType i = 0; i < cLevels.Size(); i++) {
                                int cL = cLevels[i].GetInt();
                                CCLOG("cL %d", cL);
                                
                                if(writingConfig.HasMember("upper")) {
                                    bool isUpper = writingConfig["upper"].GetBool();
                                    CCLOG("isUpper %d", isUpper);
                                    if(isUpper) {
                                        localStorageSetItem(gameName + MenuContext::to_string(cL) + UPPER_ALPHABET_WRITING, "true");
                                    } else {
                                        localStorageSetItem(gameName + MenuContext::to_string(cL) + UPPER_ALPHABET_WRITING, "false");
                                        
                                    }
                                } else if(writingConfig.HasMember("numeric")) {
                                    bool isNumeric = writingConfig["numeric"].GetBool();
                                    if(isNumeric) {
                                        localStorageSetItem(gameName + MenuContext::to_string(cL) + NUMERIC_WRITING, "true");
                                    }
                                }
                                
                            }
                        }
                        
                    }
                    
                }
            }
        }
    }
    decideIndexOfVideo();
    auto bg = CSLoader::createNode("template/video_screen.csb");
    bg->setName("bg");
    this->addChild(bg);
    
    return true;
}

void LevelHelpScene::onEnterTransitionDidFinish() {
    auto bg = getChildByName("bg");
    Size visibleSize = Director::getInstance()->getVisibleSize();
    if (visibleSize.width > 2560) {
        bg->setPositionX((visibleSize.width - 2560)/2);
    }
    
    auto button = static_cast<Button*> (bg->getChildByName("Button_1"));
    button->addTouchEventListener(CC_CALLBACK_2(LevelHelpScene::gotoGame, this));
//    button->setPosition(Vec2(1280, 900));
//    addChild(button);
    
    auto textField = static_cast<TextField*> (bg->getChildByName("TextField_1"));
    auto text = Text::create(LangUtil::getInstance()->translateString(_helpText), "Arial", 64);
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
			_resumeButton->setEnabled(true);
			_resumeButton->setVisible(true);
//			removeChild(getChildByName("bg")->getChildByName("screen_1")->getChildByName("video"));
			getChildByName("bg")->getChildByName("screen_1")->removeChild(getChildByName("bg")->getChildByName("screen_1")->getChildByName("video"));
            break;
        default:
            break;
    }
}
#endif

void LevelHelpScene::videoPlayStart()
{
    if(!_videos.empty() && FileUtils::getInstance()->isFileExist(LangUtil::getInstance()->getDir() + "/help/" + _videos[_currentVideo])) {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        _vp = experimental::ui::VideoPlayer::create();
        _vp->setContentSize(cocos2d::Size(1280, 800));
        _vp->setFileName(LangUtil::getInstance()->getDir() + "/help/" + _videos[_currentVideo]);
        _vp->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
        _vp->play();
        _vp->setName("video");
        auto bg = getChildByName("bg");
        auto screen_1 = bg->getChildByName("screen_1");
        screen_1->addChild(_vp, 2);
        auto cSize = screen_1->getContentSize();
        _vp->setPosition(Vec2(cSize.width / 2, cSize.height / 2));
        _vp->addEventListener(CC_CALLBACK_2(LevelHelpScene::videoEventCallback, this));

		auto spritecache1 = SpriteFrameCache::getInstance();
		spritecache1->addSpriteFramesWithFile("cardraw/cardraw.plist");

		_resumeButton = Button::create("cardraw/ref.png", "cardraw/ref_clicked.png", "cardraw/ref.png", Widget::TextureResType::PLIST);
		_resumeButton->setPosition(Vec2(cSize.width / 2, cSize.height / 2));
		_resumeButton->addTouchEventListener(CC_CALLBACK_2(LevelHelpScene::ResumeButtonAction, this));
		screen_1->addChild(_resumeButton, 3);

		_resumeButton->setEnabled(false);
		_resumeButton->setVisible(false);
#else
        videoPlayOverCallback();
#endif
    }

}

void LevelHelpScene::ResumeButtonAction(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
	if (eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
//		_resumeButton->setEnabled(false);
//		_resumeButton->setVisible(false);
		
//		removeChild(getChildByName("bg")->getChildByName("screen_1")->getChildByName("video"));
		getChildByName("bg")->getChildByName("screen_1")->removeChild(_resumeButton);
		videoPlayStart();
	}
}

void LevelHelpScene::videoPlayOverCallback() {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    _vp->seekTo(0.0);
    _vp->play();
#endif
}

void LevelHelpScene::decideIndexOfVideo() {
    while(_currentVideo + 1 < _videos.size()) {
        std::string currentVideoStr;
        int views = 0;
        localStorageGetItem(_videos[_currentVideo], &currentVideoStr);
        if(!currentVideoStr.empty()) {
            views = std::atoi( currentVideoStr.c_str());
        }
        if(views < MAX_VIEWS) {
            currentVideoStr = MenuContext::to_string(views + 1);
            localStorageSetItem(_videos[_currentVideo], currentVideoStr);
            break;
        }
        _currentVideo++;
    }
}

void LevelHelpScene::gotoGame(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        _currentVideo++;
        decideIndexOfVideo();
        if(_currentVideo < _videos.size()) {
            removeChild(getChildByName("bg")->getChildByName("screen_1")->getChildByName("video"));
            getChildByName("bg")->getChildByName("screen_1")->removeChild(_resumeButton);
            videoPlayStart();
        } else {
            MenuContext::launchGameFinally(_gameName);
        }
    }
}

LevelHelpScene::LevelHelpScene() :
_currentVideo(0),
_currentLevel(0)
{
    
}

LevelHelpScene::~LevelHelpScene() {
    
}
