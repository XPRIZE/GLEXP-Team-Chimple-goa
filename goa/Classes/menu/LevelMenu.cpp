//
//  LevelMenu.cpp
//  goa
//
//  Created by Srikanth Talapadi on 22/12/2016.
//
//

#include "LevelMenu.h"
#include "MenuContext.h"
#include "storage/local-storage/LocalStorage.h"
#include "external/json/document.h"
#include "external/json/stringbuffer.h"
#include "external/json/writer.h"
#include "../lang/LangUtil.h"
#include "editor-support/cocostudio/CocoStudio.h"

USING_NS_CC;

Scene *LevelMenu::createScene(std::string gameName) {
    auto layer = LevelMenu::create(gameName);
    auto scene = Scene::create();
    scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, "levelMenu");
    scene->addChild(layer->_menuContext);
    return scene;
    
}

LevelMenu *LevelMenu::create(std::string gameName) {
    LevelMenu* lhs = new (std::nothrow) LevelMenu();
    if(lhs && lhs->initWithGame(gameName))
    {
        lhs->autorelease();
        return lhs;
    }
    CC_SAFE_DELETE(lhs);
    return nullptr;
    
}

std::map<std::string, std::string> LevelMenu::parseGameConfigToMap(std::string gameName) {
    std::string gameConfigStr;
    localStorageGetItem(gameName, &gameConfigStr);
    rapidjson::Document gameConfig;
    std::map<std::string, std::string> returnMap;
    if (false == gameConfig.Parse<0>(gameConfigStr.c_str()).HasParseError()) {
        // document is ok
        returnMap["name"] = gameConfig["name"].GetString();
        returnMap["cIcon"] = gameConfig["cIcon"].GetString();
        returnMap["icon"] = gameConfig["icon"].GetString();
        returnMap["span"] = gameConfig["span"].GetInt();
        returnMap["numLevels"] = gameConfig["numLevels"].GetInt();
        returnMap["backgroundJson"] = gameConfig["backgroundJson"].GetString();
        returnMap["maingroundJson"] = gameConfig["maingroundJson"].GetString();
        returnMap["foregroundJson"] = gameConfig["foregroundJson"].GetString();
        returnMap["frontgroundJson"] = gameConfig["frontgroundJson"].GetString();
        returnMap["title"] = LangUtil::getInstance()->translateString(gameConfig["title"].GetString());
    }else{
        // error
    }
    return returnMap;
}


LevelMenu::LevelMenu():_greyLayer(NULL) {
    
}

LevelMenu::~LevelMenu() {
    
}

bool LevelMenu::initWithGame(std::string gameName) {
    if(!Node::init()) {
        return false;
    }
    _gameName = gameName;
    std::string contents = FileUtils::getInstance()->getStringFromFile("config/game_map.json");
    rapidjson::Document d;
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
        for (int dIndex = 1; dIndex < d.Size(); dIndex++) {
            const rapidjson::Value& gameConfig = d[dIndex];
            if(gameName == gameConfig["name"].GetString()) {
                _parallax = ParallaxNode::create();
                Size visibleSize = Director::getInstance()->getVisibleSize();
                auto spanStr = gameConfig["span"].GetString();
                auto span = std::atoi(spanStr);
                auto numLevelsStr = gameConfig["numLevels"].GetString();
                auto numLevels = std::atoi(numLevelsStr);
                _parallax->setContentSize(Size(visibleSize.width * span, visibleSize.height));
                addChild(_parallax);
                auto greyLayer = LayerColor::create(Color4B(255.0, 255.0, 255.0, 160.0));
                greyLayer->setContentSize(visibleSize);
                addChild(greyLayer);
                if(gameConfig.HasMember("backgroundJson")) {
                    auto backgroundJson = std::string(gameConfig["backgroundJson"].GetString());
                    backgroundJson.replace(backgroundJson.size() - 4, std::string::npos, "csb");
                    auto node = CSLoader::createNode(backgroundJson);
                    _parallax->addChild(node, -4, Vec2(0.2, 0.2), Vec2::ZERO);
                }
                if(gameConfig.HasMember("maingroundJson")) {
                    auto maingroundJson = std::string(gameConfig["maingroundJson"].GetString());
                    maingroundJson.replace(maingroundJson.size() - 4, std::string::npos, "csb");
                    auto node = CSLoader::createNode(maingroundJson);
                    _parallax->addChild(node, -3, Vec2(0.4, 0.4), Vec2::ZERO);
                }
                if(gameConfig.HasMember("foregroundJson")) {
                    auto foregroundJson = std::string(gameConfig["foregroundJson"].GetString());
                    foregroundJson.replace(foregroundJson.size() - 4, std::string::npos, "csb");
                    auto node = CSLoader::createNode(foregroundJson);
                    _parallax->addChild(node, -2, Vec2(0.6, 0.6), Vec2::ZERO);
                }
                if(gameConfig.HasMember("frontgroundJson")) {
                    auto frontgroundJson = std::string(gameConfig["frontgroundJson"].GetString());
                    frontgroundJson.replace(frontgroundJson.size() - 4, std::string::npos, "csb");
                    auto node = CSLoader::createNode(frontgroundJson);
                    _parallax->addChild(node, -1, Vec2(0.8, 0.8), Vec2::ZERO);
                }
                std::vector<std::string> levelLabels;
                if(gameConfig.HasMember("lang")) {
                    const rapidjson::Value& langConfig = gameConfig["lang"];
                    auto currentLang = LangUtil::getInstance()->getLang().c_str();
                    if(langConfig.HasMember(currentLang)) {
                        const rapidjson::Value& currentLangConfig = langConfig[currentLang];
                        if(currentLangConfig.HasMember("numLevels")) {
                            auto langNumLevelsStr = currentLangConfig["numLevels"].GetString();
                            numLevels = std::atoi(langNumLevelsStr);
                        }
                        if(currentLangConfig.HasMember("labels")) {
                            const rapidjson::Value& labels = currentLangConfig["labels"];
                            assert(labels.IsArray());
                            for (rapidjson::SizeType i = 0; i < labels.Size(); i++) {
                                auto label = labels[i].GetString();
                                levelLabels.push_back(label);
                            }
                        }
                    }
                }
                _scrollView = ui::ScrollView::create();
                _scrollView->setContentSize(visibleSize);
                _scrollView->setDirection(ui::ScrollView::Direction::HORIZONTAL);
                _scrollView->setInnerContainerSize(Size(visibleSize.width * span, visibleSize.height));
                addChild(_scrollView);
                _scrollView->addEventListener(CC_CALLBACK_2(LevelMenu::scrolled, this));
                
                std::string progressStr;
                localStorageGetItem(gameName + ".level", &progressStr);

                rapidjson::Document d;
                rapidjson::Document::AllocatorType& allocator = d.GetAllocator();
                if(progressStr.empty()) {
                    d.SetArray();
                    d.PushBack(0, allocator);
                } else {
                    d.Parse(progressStr.c_str());
                }
                auto gap = visibleSize.width * span / (numLevels + 1);
                auto jump = -(visibleSize.height - 500) * span / numLevels;
                int changeDir = ceil((float) (numLevels + 1) / span);
                float vPos = 200;
                Vec2 prevPos = Vec2::ZERO;
                Vec2 newPos = Vec2::ZERO;
                SpriteFrameCache::getInstance()->addSpriteFramesWithFile("levelstep/levelstep.plist");

                std::string _levelStatus;
                localStorageGetItem(".unlock", &_levelStatus);
                bool lockAll = true;
                if (_levelStatus == "0") {
                    lockAll = false;
                }
                
                for(int i = 1; i <= numLevels; i++) {
                    ui::Button* but;
                    if(i == d.Size()) {
                        but = ui::Button::create("levelstep/present.png", "levelstep/present_pressed.png", "levelstep/present.png",ui::Widget::TextureResType::PLIST);
                        but->addTouchEventListener(CC_CALLBACK_2(LevelMenu::startGame, this));
                        auto mark = Sprite::createWithSpriteFrameName("levelstep/mark.png");
                        mark->setPosition(300 / 2, 300 * 1.5);
                        but->addChild(mark);
                        _initPos = Vec2(-MAX(0, MIN(visibleSize.width * ( span - 1), gap * i - visibleSize.width / 2)), 0);
                    } else if(i > d.Size() && lockAll) {
                        but = ui::Button::create("levelstep/disabled.png", "levelstep/disabled.png", "levelstep/disabled.png",ui::Widget::TextureResType::PLIST);
                        but->setTouchEnabled(false);
                    } else {
                        but = ui::Button::create("levelstep/done.png", "levelstep/done_pressed.png", "levelstep/done.png",ui::Widget::TextureResType::PLIST);
                        but->addTouchEventListener(CC_CALLBACK_2(LevelMenu::startGame, this));
                        auto iStar = 0;
                        if(d.Size() >= i) {
                            iStar = d[i].GetInt();
                        }
                        auto star = iStar >= 1 ? Sprite::createWithSpriteFrameName("levelstep/star.png") : Sprite::createWithSpriteFrameName("levelstep/star_empty.png");
                        star->setScale(0.8);
                        star->setPosition(Vec2(300 / 4, 300 * 3 / 4 - 10));
                        but->addChild(star);
                        
                        star = iStar >= 2 ? Sprite::createWithSpriteFrameName("levelstep/star.png") : Sprite::createWithSpriteFrameName("levelstep/star_empty.png");
                        star->setScale(0.8);
                        star->setPosition(Vec2(300 / 2, 300 * 7 / 8 - 10));
                        but->addChild(star);
                        
                        star = iStar >= 3 ? Sprite::createWithSpriteFrameName("levelstep/star.png") : Sprite::createWithSpriteFrameName("levelstep/star_empty.png");
                        star->setScale(0.8);
                        star->setPosition(Vec2(300 * 3 / 4 - 10, 300 * 3 / 4 - 10));
                        but->addChild(star);

                    }
                    newPos = Vec2(gap * i, vPos);
                    but->setPosition(newPos);
                    auto levelLabel = MenuContext::to_string(i);
                    if(levelLabels.size() >= i) {
                        levelLabel = levelLabels[i-1];
                    }
                    but->setTitleText(levelLabel);
                    but->setName(MenuContext::to_string(i));
                    but->setTitleFontSize(128.0);
                    _scrollView->addChild(but, 2);
                    if((i - 1) % changeDir == 0) {
                        jump *= -1;
                    }
                    vPos += jump;
                    vPos = MAX(MIN(visibleSize.height - 300, vPos), 200);
                    if(!prevPos.isZero()) {
                        auto line = DrawNode::create(80);
        //                line->setLineWidth(40);
                        line->drawLine(prevPos, newPos, Color4F(Color4B(0xFF, 0xA3, 0x64,0xFF)));
                        _scrollView->addChild(line, 1);
                    }
                    prevPos = newPos;
                }
                break;
            }
        }
    }else{
        // error
    }
    return true;
}

void LevelMenu::scrolled(cocos2d::Ref *target, cocos2d::ui::ScrollView::EventType event) {
    _parallax->setPosition(_scrollView->getInnerContainerPosition());
}

void LevelMenu::onEnterTransitionDidFinish() {
    _scrollView->setInnerContainerPosition(_initPos);
}

void LevelMenu::startGame(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if (eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        addGreyLayer();
        auto but = static_cast<ui::Button *>(pSender);
        auto level = but->getName();
        localStorageSetItem(_gameName + ".currentLevel", level);
        MenuContext::launchGameFromJS(_gameName);
    }
}



void LevelMenu::addGreyLayer() {
    if(!_greyLayer) {
        //later customize and add image
        Size visibleSize = Director::getInstance()->getVisibleSize();
        _greyLayer = LayerGradient::create(Color4B(255, 255, 100, 255), Color4B(255, 255, 255, 255));
        _greyLayer->setOpacity(100);
        _greyLayer->setContentSize(visibleSize);
        addChild(_greyLayer, 3);
        
        Sprite* loadingIcon = Sprite::create("loading_image.png");
        if(loadingIcon != NULL) {
            loadingIcon->setPositionX(visibleSize.width/2);
            loadingIcon->setPositionY(visibleSize.height/2);
            _greyLayer->addChild(loadingIcon,1);
        }
        
        auto _listener = EventListenerTouchOneByOne::create();
        _listener->setSwallowTouches(true);
        _listener->onTouchBegan = CC_CALLBACK_2(LevelMenu::greyLayerTouched, this);
        _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, _greyLayer);
        
    }
}


bool LevelMenu::greyLayerTouched(Touch *touch, Event *event)
{
    return true;
}


void LevelMenu::onExitTransitionDidStart() {
    Node::onExitTransitionDidStart();
    CCLOG("LevelMenu::onExitTransitionDidStart");
    if(_greyLayer != NULL) {
        Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_greyLayer);
    }
    
}
