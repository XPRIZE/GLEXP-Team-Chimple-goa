//
//  StoryPlaying.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 07/01/17.
//
//

#include "StoryPlaying.hpp"
#include "util/lib/LTKStringUtil.h"
#include "lang/TextGenerator.h"
#include "story/QuestionHandler.h"

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
_baseDir(""),
_isPlayEnded(false),
_isPlayStarted(false),
_nextButton(nullptr),
_prevButton(nullptr),
_totalStoryPages(0),
_offsetInY(0.0f),
_offsetInX(0.0f),
_isNodeDraggable(false),
_animationToPlayWhenTouched(""),
_originalSpriteColor(Color3B::GRAY),
_wordBubbleNode(nullptr),
_textDisplayAnimationRunning(false),
_pronouceWord("")
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

void StoryPlaying::bindListenerToSkeletonNode(cocostudio::timeline::SkeletonNode* skeletonNode) {
    EventListenerTouchOneByOne* _listener = EventListenerTouchOneByOne::create();
    _listener->setSwallowTouches(true);
    _listener->onTouchBegan = CC_CALLBACK_2(StoryPlaying::onTouchBeganOnSkeleton, this);
    _listener->onTouchEnded = CC_CALLBACK_2(StoryPlaying::onTouchEndedOnSkeleton, this);
    _listener->onTouchMoved = CC_CALLBACK_2(StoryPlaying::onTouchMovedOnSkeleton, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, skeletonNode);
}


bool StoryPlaying::onTouchBeganOnSkeleton(Touch* touch, Event* event){
    if(this->_isPlayStarted) {
        return false;
    }
    
    auto n = convertTouchToNodeSpace(touch);
    Node* target = event->getCurrentTarget();
    
    cocostudio::timeline::SkeletonNode* skeletonNode = dynamic_cast<cocostudio::timeline::SkeletonNode *>(target);
    if(skeletonNode != NULL && skeletonNode->getBoundingBox().containsPoint(n)) {
        auto tLocation = target->getParent()->convertToNodeSpace(touch->getLocation());
        _offsetInX = tLocation.x - skeletonNode->getPosition().x;
        _offsetInY = tLocation.y - skeletonNode->getPosition().y;
        _zOrder = target->getLocalZOrder();
        
        bindEventsToTarget(skeletonNode);
        
        return true;
    }
    return false;
}


void StoryPlaying::playAnimationOnNode(std::string animationName, Node* node) {
    CCLOG("_animationToPlayWhenTouched %s", _animationToPlayWhenTouched.c_str());
    Action* action = node->getActionManager()->getActionByTag(node->getTag(), node);
    
    if(action != NULL) {
        cocostudio::timeline::ActionTimeline* animationAction = animationAction = dynamic_cast<cocostudio::timeline::ActionTimeline *>(action);
        
        if(animationAction != NULL) {
            if(_isNodeDraggable) {
                animationAction->play(animationName, true);
            } else {
                animationAction->play(animationName, false);
            }
        }
    }
}

void StoryPlaying::onTouchMovedOnSkeleton(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(_isNodeDraggable) {
        cocos2d::Node* target = event->getCurrentTarget();
        cocostudio::timeline::SkeletonNode* skeletonNode = dynamic_cast<cocostudio::timeline::SkeletonNode *>(target);
        if(skeletonNode != NULL) {
            skeletonNode->setLocalZOrder(1);
            auto mLocation = skeletonNode->getParent()->convertToNodeSpace(touch->getLocation());
            auto diffLocation = Vec2(mLocation.x - _offsetInX, mLocation.y - _offsetInY);
            skeletonNode->setPosition(diffLocation);
        }
    }
}


void StoryPlaying::onTouchEndedOnSkeleton(cocos2d::Touch *touch, cocos2d::Event *event) {
    cleanUpWhenTouchEnded(touch, event);
}

void StoryPlaying::cleanUpWhenTouchEnded(cocos2d::Touch *touch, cocos2d::Event *event) {
    _offsetInX = 0.0f;
    _offsetInY = 0.0f;
    _isNodeDraggable = false;
    
    cocos2d::Node* target = event->getCurrentTarget();
    target->setLocalZOrder(_zOrder);
    
    showText(target->getName());
    
    Action* action = target->getActionManager()->getActionByTag(target->getTag(), target);
    
    if(action != NULL) {
        cocostudio::timeline::ActionTimeline* animationAction = dynamic_cast<cocostudio::timeline::ActionTimeline *>(action);
    
        if(animationAction != NULL) {
            animationAction->pause();
            animationAction = NULL;
        }
    }
    
    if(_mainTimeLine != NULL) {
        _mainTimeLine->pause();
    }
    _animationToPlayWhenTouched = "";
    
    
    bool isSkeletonCharacter = dynamic_cast<cocostudio::timeline::SkeletonNode *>(target);
    if(isSkeletonCharacter) {
        cocostudio::timeline::SkeletonNode* sNode = dynamic_cast<cocostudio::timeline::SkeletonNode *>(target);
        changeBoneColor(sNode, true);
        skinColors.clear();
    }
    else if(target->getChildrenCount() > 0) {
        cocos2d::Vector<Node*> nodes = target->getChildren();
        for (std::vector<Node*>::iterator it = nodes.begin() ; it != nodes.end(); ++it) {
            Node* n = *it;
            if(skinColors.find(n->getName()) != skinColors.end()) {
                Color3B originalColor = skinColors.at(n->getName());
                 n->setColor(originalColor);
            }
        }
    }
    else {
        target->setColor(_originalSpriteColor);
    }
}

void StoryPlaying::bindListenerToCompositeNode(Node* node) {
    EventListenerTouchOneByOne* _listener = EventListenerTouchOneByOne::create();
    _listener->setSwallowTouches(true);
    _listener->onTouchBegan = CC_CALLBACK_2(StoryPlaying::onTouchBeganOnComposite, this);
    _listener->onTouchEnded = CC_CALLBACK_2(StoryPlaying::onTouchEndedOnComposite, this);
    _listener->onTouchMoved = CC_CALLBACK_2(StoryPlaying::onTouchMovedOnComposite, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, node);
}


bool StoryPlaying::onTouchBeganOnComposite(Touch* touch, Event* event){
    if(this->_isPlayStarted) {
        return false;
    }
    
    Node* target = event->getCurrentTarget();
    auto n = convertTouchToNodeSpace(touch);

    auto boundingBox = utils::getCascadeBoundingBox(target);
    if(target != NULL && boundingBox.containsPoint(n)) {
        auto tLocation = target->getParent()->convertToNodeSpace(touch->getLocation());
        _offsetInX = tLocation.x - target->getPosition().x;
        _offsetInY = tLocation.y - target->getPosition().y;
        _zOrder = target->getLocalZOrder();
        
        bindEventsToTarget(target);
        
        return true;
    }

    return false;
}


void StoryPlaying::onTouchEndedOnComposite(cocos2d::Touch *touch, cocos2d::Event *event) {
    cleanUpWhenTouchEnded(touch, event);
}


void StoryPlaying::onTouchMovedOnComposite(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(_isNodeDraggable) {
        cocos2d::Node* target = event->getCurrentTarget();
        if(target != NULL) {
            target->setLocalZOrder(1);
            auto mLocation = target->getParent()->convertToNodeSpace(touch->getLocation());
            auto diffLocation = Vec2(mLocation.x - _offsetInX, mLocation.y - _offsetInY);
            target->setPosition(diffLocation);
        }
    }
}


void StoryPlaying::bindListenerToNode(Node* node) {
    EventListenerTouchOneByOne* _listener = EventListenerTouchOneByOne::create();
    _listener->setSwallowTouches(true);
    _listener->onTouchBegan = CC_CALLBACK_2(StoryPlaying::onTouchBeganOnNode, this);
    _listener->onTouchEnded = CC_CALLBACK_2(StoryPlaying::onTouchEndedOnNode, this);
    _listener->onTouchMoved = CC_CALLBACK_2(StoryPlaying::onTouchMovedOnNode, this);
    _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, node);
}


bool StoryPlaying::onTouchBeganOnNode(Touch* touch, Event* event){
    if(this->_isPlayStarted) {
        return false;
    }
    
    auto n = convertTouchToNodeSpace(touch);
    Node* target = event->getCurrentTarget();
    
    //check for pixel perfect touch if possible

    if(target->getBoundingBox().containsPoint(n)) {
        if(_nodesToTringlePointsMapping.find(target->getName()) != _nodesToTringlePointsMapping.end()) {
            auto tLocation = target->convertToNodeSpace(touch->getLocation());
            std::vector<std::vector<cocos2d::Point>> points = _nodesToTringlePointsMapping.at(target->getName());
            bool result = false;
            for (std::vector<std::vector<cocos2d::Point>>::iterator it = points.begin() ; it != points.end(); ++it) {
                std::vector<cocos2d::Point> v2 = *it;
                if(v2.size() == 3) {
                    Point p1 = v2.at(0);
                    Point p2 = v2.at(1);
                    Point p3 = v2.at(2);
//                    CCLOG("p1.x %f", p1.x);
//                    CCLOG("p1.y %f", p1.y);
//                    CCLOG("p2.x %f", p2.x);
//                    CCLOG("p2.y %f", p2.y);
//                    CCLOG("p3.x %f", p3.x);
//                    CCLOG("p3.y %f", p3.y);
                    if(pointInTriangle(tLocation, p1, p2, p3)) {
                        result = true;
                        break;
                    }
                }
            }
            return result;
        } else {
            _zOrder = target->getLocalZOrder();
            auto tLocation = target->getParent()->convertToNodeSpace(touch->getLocation());
            _offsetInX = tLocation.x - target->getPosition().x;
            _offsetInY = tLocation.y - target->getPosition().y;
            
            bindEventsToTarget(target);
            
            return true;
        }
    }
    
    
    return false;
}


void StoryPlaying::onTouchEndedOnNode(cocos2d::Touch *touch, cocos2d::Event *event) {
    cleanUpWhenTouchEnded(touch, event);
}


void StoryPlaying::onTouchMovedOnNode(cocos2d::Touch *touch, cocos2d::Event *event) {
    if(_isNodeDraggable) {
        cocos2d::Node* target = event->getCurrentTarget();
        if(target != NULL) {
            target->setLocalZOrder(1);
            auto mLocation = target->getParent()->convertToNodeSpace(touch->getLocation());
            auto diffLocation = Vec2(mLocation.x - _offsetInX, mLocation.y - _offsetInY);
            target->setPosition(diffLocation);
        }
    }
}

void StoryPlaying::bindEventsToTarget(Node* node) {
    cocostudio::ComExtensionData* data = (cocostudio::ComExtensionData*)node->getComponent("ComExtensionData");
    
    if(data != NULL && !data->getCustomProperty().empty()) {
        
        CCLOG("found user data for child %s", node->getName().c_str());
        CCLOG("user data for child %s", data->getCustomProperty().c_str());
        std::string eventProperty = data->getCustomProperty();
        
        std::vector<std::string> contentPageInfo = _menuContext->split(data->getCustomProperty(), ';');
        for (std::vector<std::string>::iterator it = contentPageInfo.begin() ; it != contentPageInfo.end(); ++it) {
            std::string token = *it;
            CCLOG("token %s", token.c_str());
            LTKStringUtil::trimString(token);
            if(token.compare("drag") == 0) {
                _isNodeDraggable = true;
            } else {
                _animationToPlayWhenTouched = token;
            }
        }
        
        if(!_animationToPlayWhenTouched.empty()) {
            std::size_t shouldAnimationRunOnMainNode = _animationToPlayWhenTouched.find("main.");
            if (shouldAnimationRunOnMainNode != std::string::npos) {
                std::vector<std::string> mainAnimations = _menuContext->split(_animationToPlayWhenTouched, '.');
                if(mainAnimations.size() == 2) {
                    std::string animationName = mainAnimations.at(1);
                    _mainTimeLine->play(animationName, false);
                }
            } else {
                playAnimationOnNode(_animationToPlayWhenTouched, node);
            }
        }
    }
    
    bool isSkeletonCharacter = dynamic_cast<cocostudio::timeline::SkeletonNode *>(node);
    if(isSkeletonCharacter) {
        cocostudio::timeline::SkeletonNode* sNode = dynamic_cast<cocostudio::timeline::SkeletonNode *>(node);
        changeBoneColor(sNode, false);
    } else if(node->getChildrenCount() > 0) {
        cocos2d::Vector<Node*> nodes = node->getChildren();
        for (std::vector<Node*>::iterator it = nodes.begin() ; it != nodes.end(); ++it) {
            Node* n = *it;
            skinColors.insert(std::make_pair(n->getName(), n->getColor()));
            n->setColor(Color3B::GRAY);
        }
    }
    else {
        _originalSpriteColor = node->getColor();
        node->setColor(Color3B::GRAY);
    }
};

void StoryPlaying::changeBoneColor(cocostudio::timeline::BoneNode* skeleton, bool revert) {
    cocos2d::Vector<cocostudio::timeline::BoneNode*> bones = skeleton->getChildBones();
    for (std::vector<cocostudio::timeline::BoneNode*>::iterator it = bones.begin() ; it != bones.end(); ++it) {
        cocostudio::timeline::BoneNode* bone = *it;
        changeSkinColor(bone, revert);
        if(bone->getChildBones().size() > 0) {
            changeBoneColor(bone, revert);
        }
    }
}


void StoryPlaying::changeSkinColor(cocostudio::timeline::BoneNode* bone, bool revert) {
    cocos2d::Vector<cocostudio::timeline::SkinNode*> skins = bone->getSkins();
    for (std::vector<cocostudio::timeline::SkinNode*>::iterator it = skins.begin() ; it != skins.end(); ++it) {
        cocostudio::timeline::SkinNode* skin = *it;
        CCLOG("skin %s", skin->getName().c_str());
        if(revert) {
            if(skinColors.find(skin->getName()) != skinColors.end()) {
                Color3B originalColor = skinColors.at(skin->getName());
                skin->setColor(originalColor);
            }
        } else {
            skinColors.insert(std::make_pair(skin->getName(), skin->getColor()));
            skin->setColor(Color3B::GRAY);
        }
    }
}

void StoryPlaying::processScene(Node* parent) {
    if(parent != NULL) {
        auto children = parent->getChildren();
        for (std::vector<Node*>::iterator it = children.begin() ; it != children.end(); ++it) {
            cocos2d::Node* node = *it;
            CCLOG("Processing node %s", node->getName().c_str());
            
            std::size_t panelFound = node->getName().find("Panel");
            if (panelFound != std::string::npos) {
                //ignore
            } else {
                //process skeleton and non-skeleton nodes
                bool isSkeletonCharacter = dynamic_cast<cocostudio::timeline::SkeletonNode *>(node);
                if(isSkeletonCharacter) {
                    CCLOG("Processing skeleton node %s", node->getName().c_str());
                    cocostudio::timeline::SkeletonNode* skeletonNode = dynamic_cast<cocostudio::timeline::SkeletonNode *>(node);
                    if(skeletonNode != NULL) {
                        
                        bindListenerToSkeletonNode(skeletonNode);
                        
                        Action* action = skeletonNode->getActionManager()->getActionByTag(skeletonNode->getTag(), skeletonNode);
                        
                        if(action != NULL) {
                            cocostudio::timeline::ActionTimeline* skeletonAction = dynamic_cast<cocostudio::timeline::ActionTimeline *>(action);
                            if(skeletonAction != NULL) {
                                skeletonAction->setFrameEventCallFunc(CC_CALLBACK_1(StoryPlaying::onFrameEvent, this));
                            }
                        }
                    }
                    
                } else {
                    if(node->getChildrenCount() > 0) {
                        CCLOG("Processing composite node %s", node->getName().c_str());
                        bindListenerToCompositeNode(node);
                    } else {
                        CCLOG("Processing node %s", node->getName().c_str());
                        bindListenerToNode(node);
                    }
                }
                
            }
        }
        
    }
}

void StoryPlaying::load() {
    
    std::string data;
    localStorageGetItem(STORY_JSON, &data);
    
    int storyIndex = atoi(data.c_str());
    
    std::string contents = FileUtils::getInstance()->getStringFromFile("misc/shelfConfig.json");
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
        const rapidjson::Value& storyConfigs = d["stories"];
        assert(storyConfigs.IsArray());
        const rapidjson::Value& story = storyConfigs[storyIndex];
        const rapidjson::Value& dsStoryPages = story["pages"];
        
        _totalStoryPages = dsStoryPages.Size();
        const std::string contentPageName = dsStoryPages[this->_pageIndex]["contentJson"].GetString();
        CCLOG("contentPageName %s", contentPageName.c_str());
        std::vector<std::string> contentPageInfo = _menuContext->split(contentPageName, '/');
        if(contentPageInfo.size() > 0) {
            _baseDir = contentPageInfo.at(0);
        }
        
        loadContentPage(contentPageName);
        
        processScene(_contentPageNode);
        
        processPixelPerfectNodes(_contentPageNode);
        
        createNextAndPreviousButtons();
        
        createWordBubble();
        
        playMasterAnimation();
        
    }
}

void StoryPlaying::createWordBubble() {
    
    std::string mappingFileUrl = "story/eng/" + _baseDir + ".mapping.json";
    if(!mappingFileUrl.empty() && FileUtils::getInstance()->isFileExist(mappingFileUrl))
    {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(mappingFileUrl);
        CCLOG("got data %s", jsonData.c_str());
        
        
        rapidjson::Document mappingDocument;
        if (false == mappingDocument.Parse<0>(jsonData.c_str()).HasParseError()) {
            // document is ok
            rapidjson::Value::MemberIterator M;
            const char *key,*value;
            for (M=mappingDocument.MemberBegin(); M!=mappingDocument.MemberEnd(); M++)
            {
                key   = M->name.GetString();
                value = M->value.GetString();
                std::string sValue = value;
                
                _wordMappings.insert({key,sValue});
            }
        }
        
        Size visibleSize = Director::getInstance()->getVisibleSize();
        _wordBubbleNode = CSLoader::createNode("template/hang_bubble.csb");
        _wordBubbleNode->setPosition(Vec2(visibleSize.width/2, visibleSize.height + 650));
        _wordBubbleNode->setVisible(false);
        
        Node* soundWordNode = _wordBubbleNode->getChildByName(SOUND_BUTTON_WORD);
        
        if(soundWordNode != NULL) {
            cocos2d::ui::Button* soundWordButton = dynamic_cast<cocos2d::ui::Button *>(soundWordNode);
            if(soundWordButton != NULL) {
                soundWordButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::pronounceWord, this));
            }
        }
        
        this->addChild(_wordBubbleNode, 2);
    }
}

void StoryPlaying::createDialogBubble() {
    
    std::string contentPageText = "";
    std::string textFileUrl = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + ".json";
    if(!textFileUrl.empty() && FileUtils::getInstance()->isFileExist(textFileUrl))
    {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(textFileUrl);
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
                
                if(i == _pageIndex + 1) {
                    contentPageText = value;
                    break;
                }
                
                i++;
                
            }
        }
    }
    
    
    if(!contentPageText.empty())
    {
        
        _talkBubbleNode = CSLoader::createNode("template/bubble_tem.csb");
        this->addChild(_talkBubbleNode, 1);

        Node* closeNode = _talkBubbleNode->getChildByName(CLOSE_BUTTON);
        if(closeNode != NULL) {
            cocos2d::ui::Button* closeButton = dynamic_cast<cocos2d::ui::Button *>(closeNode);
            if(closeButton != NULL) {
                closeButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::closeDialog, this));
#if defined(AUTO_CLICK) && (AUTO_CLICK > 0)
                runAction(Sequence::create(DelayTime::create(10.0), CallFunc::create([=]() {
                    this->closeDialog(closeButton, ui::Widget::TouchEventType::ENDED);
                }), NULL));
                
#endif
                
            }
        }
        
        
        Node* soundNode = _talkBubbleNode->getChildByName(SOUND_BUTTON);
        if(soundNode != NULL) {
            cocos2d::ui::Button* soundButton = dynamic_cast<cocos2d::ui::Button *>(soundNode);
            if(soundButton != NULL) {
                soundButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::playSound, this));
                
                if(_soundEnabled.compare("true") == 0) {
                    soundButton->setHighlighted(true);
                } else {
                    soundButton->setHighlighted(false);
                }
            }
        }
        
        if(_soundEnabled.compare("true") == 0) {
            
            std::string pageI = MenuContext::to_string(_pageIndex + 1);
            _soundFile = "story/" + LangUtil::getInstance()->getLang() + "/" + _baseDir + "/" + _baseDir + "_"  + pageI + ".ogg";
            
            if(!_soundFile.empty() && FileUtils::getInstance()->isFileExist(_soundFile)) {
                this->scheduleOnce(schedule_selector(StoryPlaying::narrateDialog), 1.0f);
            }
        }
        
        Node* chooseText = _talkBubbleNode->getChildByName(STORY_TEXT);
        if(chooseText != NULL) {
            cocos2d::ui::TextField* chooseLabel = dynamic_cast<cocos2d::ui::TextField *>(chooseText);
            if(chooseLabel != NULL) {
                contentPageText = QuestionHandler::wrapString(contentPageText, 50);
                chooseLabel->setString(contentPageText);
                chooseLabel->setFontSize(75);
                chooseLabel->setFontName("fonts/Roboto-Regular.ttf");
                chooseLabel->setTextColor(Color4B::BLACK);
            }
        }
    } else {
        _nextButton->setEnabled(true);
        _nextButton->setVisible(true);        
        if(_pageIndex != 0) {
            _prevButton->setEnabled(true);
            _prevButton->setVisible(true);
        }

    }
}


void StoryPlaying::narrateDialog(float dt) {
    CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
    CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic(_soundFile.c_str(), false);
}

void StoryPlaying::playSound(Ref* pSender, ui::Widget::TouchEventType eEventType)
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
                CocosDenshion::SimpleAudioEngine::getInstance()->setEffectsVolume(1.0f);
                CocosDenshion::SimpleAudioEngine::getInstance()->playBackgroundMusic(_soundFile.c_str(), false);
                
                
            }
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}


void StoryPlaying::closeDialog(Ref* pSender, ui::Widget::TouchEventType eEventType)
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
            if(CocosDenshion::SimpleAudioEngine::getInstance()->isBackgroundMusicPlaying())
            {
                CocosDenshion::SimpleAudioEngine::getInstance()->stopBackgroundMusic();
            }

            clickedButton->setEnabled(false);
            _talkBubbleNode->removeFromParentAndCleanup(true);
            
            _showAgainTextButton->setEnabled(true);
            _showAgainTextButton->setVisible(true);
            //show next/prev buttons
            _nextButton->setEnabled(true);
            _nextButton->setVisible(true);
#if defined(AUTO_CLICK) && (AUTO_CLICK > 0)
            runAction(Sequence::create(DelayTime::create(1.0), CallFunc::create([=]() {
                this->nextStory(_nextButton, ui::Widget::TouchEventType::ENDED);
            }), NULL));
            
#endif
            
            
            if(_pageIndex != 0) {
                _prevButton->setEnabled(true);
                _prevButton->setVisible(true);
            }
            
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
}

void StoryPlaying::playEnded() {
    _isPlayEnded = true;
    _isPlayStarted = false;
    
    createDialogBubble();
}

void StoryPlaying::createNextAndPreviousButtons() {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    _nextButton = cocos2d::ui::Button::create("template/template_02/side_arrow.png", "template/template_02/click_side_arrow.png", "template/template_02/side_arrow.png", cocos2d::ui::Widget::TextureResType::PLIST);
    _nextButton->setPosition(Vec2(visibleSize.width - 200.0, visibleSize.height/2));
    _nextButton->setName(NEXT_BUTTON);
    _nextButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::nextStory, this));
    this->addChild(_nextButton, 2);
    _nextButton->setEnabled(false);
    _nextButton->setVisible(false);
        
    
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
    
    
    _showAgainTextButton = cocos2d::ui::Button::create("template/template_02/text_button.png", "template/template_02/click_side_arrow.png", "template/template_02/text_button_clicked.png", cocos2d::ui::Widget::TextureResType::PLIST);
    _showAgainTextButton->setPosition(Vec2(320.0, visibleSize.height - 150));
    _showAgainTextButton->setName(SHOW_TEXT_AGAIN_BUTTON);
    _showAgainTextButton->addTouchEventListener(CC_CALLBACK_2(StoryPlaying::showTextAgain, this));
    this->addChild(_showAgainTextButton, 2);
    _showAgainTextButton->setEnabled(false);
    _showAgainTextButton->setVisible(false);

    
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


void StoryPlaying::processPixelPerfectNodes(Node* parent) {
    std::string pixelPerfectMappingUrl = "misc/pixelPerfectConfig.json";
    if(!pixelPerfectMappingUrl.empty() && FileUtils::getInstance()->isFileExist(pixelPerfectMappingUrl))
    {
        std::string jsonData = FileUtils::getInstance()->getStringFromFile(pixelPerfectMappingUrl);
        CCLOG("got data %s", jsonData.c_str());
        
        
        rapidjson::Document mappingDocument;
        if (false == mappingDocument.Parse<0>(jsonData.c_str()).HasParseError()) {
            rapidjson::Value::MemberIterator M;
            const char *key;
            for (M=mappingDocument.MemberBegin(); M!=mappingDocument.MemberEnd(); M++)
            {
                key   = M->name.GetString();
                const rapidjson::Value& mappings = mappingDocument[key];
                
                for (rapidjson::Value::ConstMemberIterator itr = mappings.MemberBegin();
                     itr != mappings.MemberEnd(); ++itr)
                {
                    CCLOG("%s ", itr->name.GetString());
                    CCLOG("%s ", itr->value.GetString());
                    
                    _pixelPerfectMapping.insert({itr->name.GetString(), itr->value.GetString()});
                }

            }
        }
    }
    
    
    cocos2d::Vector<Node*> nodes = parent->getChildren();
    for (std::vector<Node*>::iterator it = nodes.begin() ; it != nodes.end(); ++it) {
        Node* n = *it;
        CCLOG("n hererer %s", n->getName().c_str());
        if(_pixelPerfectMapping.find(n->getName()) != _pixelPerfectMapping.end()) {
            CCLOG("pixel processing node %s", n->getName().c_str());
            std::string spriteUrl = _pixelPerfectMapping.at(n->getName());
            Sprite* sprite = dynamic_cast<Sprite *>(n);
            if(sprite != NULL)
            {
                std::vector<std::vector<cocos2d::Point>> points = _menuContext->getTrianglePointsForSprite(sprite, spriteUrl, 0.0f);
                
                _nodesToTringlePointsMapping.insert({n->getName(), points});
            }
        }
    }
}

bool StoryPlaying::pointInTriangle(Point p, Point p0, Point p1, Point p2) {
    float A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
    int sign = A < 0 ? -1 : 1;
    float s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
    float t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
    
    return s > 0 && t > 0 && (s + t) < 2 * A * sign;

}

void StoryPlaying::playMasterAnimation() {
    if(_mainTimeLine && _mainTimeLine->getDuration() == 0) {
        playEnded();
    }
    else if(_mainTimeLine && _mainTimeLine->IsAnimationInfoExists("master")) {
        //play master animation
        _mainTimeLine->setAnimationEndCallFunc("master", CC_CALLBACK_0(StoryPlaying::playEnded, this));
        _mainTimeLine->setFrameEventCallFunc(CC_CALLBACK_1(StoryPlaying::onFrameEvent, this));
        _mainTimeLine->play("master", false);
        _isPlayStarted = true;
        _isPlayEnded = false;
    } else {
        playEnded();
    }

}

void StoryPlaying::loadContentPage(std::string contentPageName) {
    _contentPageNode = CSLoader::createNode(contentPageName);
    
    _mainTimeLine = CSLoader::createTimeline(contentPageName);
    _mainTimeLine->retain();
    _contentPageNode->runAction(_mainTimeLine);
    
    this->addChild(_contentPageNode);
    
    
    
    //find sound configuration
    
    _soundEnabled = "";
    localStorageGetItem(SOUND_ENABLED_FOR_STORIES, &_soundEnabled);
}


void StoryPlaying::onExitTransitionDidStart() {
    _mainTimeLine->release();
    _nodesToTringlePointsMapping.clear();
    
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
            clickedButton->setVisible(false);
            if(_pageIndex + 1 != _totalStoryPages) {
                Director::getInstance()->replaceScene(TransitionFade::create(1.0, StoryPlaying::createScene(_pageIndex + 1, _storyId), Color3B::BLACK));
            } else {
                Director::getInstance()->replaceScene(TransitionFade::create(1.0, QuestionHandler::createScene(_storyId, _baseDir), Color3B::BLACK));
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
            clickedButton->setVisible(false);
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


void StoryPlaying::showText(std::string nodeName) {
    _wordBubbleNode->setVisible(true);
    Size visibleSize = Director::getInstance()->getVisibleSize();
    bool mappingFound = translatedText(nodeName);
    if(!mappingFound)
        return;
    
    if(_textDisplayAnimationRunning) {
        this->unschedule(schedule_selector(StoryPlaying::removeWordBubble));
        displayTextAnimationFinished();
    } else {
        _textDisplayAnimationRunning = true;
        _wordBubbleNode->setPosition(Vec2(visibleSize.width/2, visibleSize.height + 650));
        auto moveTo = MoveTo::create(1.0, Vec2(visibleSize.width/2, visibleSize.height + 50));
        auto elastic = EaseBackOut::create(moveTo);
        auto showTextFinished = CallFunc::create(CC_CALLBACK_0(StoryPlaying::displayTextAnimationFinished, this));
        _wordBubbleNode->runAction(Sequence::create(elastic, showTextFinished, NULL));
        
    }
}

void StoryPlaying::displayTextAnimationFinished() {
    this->scheduleOnce(schedule_selector(StoryPlaying::removeWordBubble), 3.0f);
}

void StoryPlaying::removeWordBubble(float dt) {
    Size visibleSize = Director::getInstance()->getVisibleSize();
    auto moveTo = MoveTo::create(1.0, Vec2(visibleSize.width/2, visibleSize.height + 650));
    auto elastic = EaseBackOut::create(moveTo);
    auto callbackAction = CallFunc::create(CC_CALLBACK_0(StoryPlaying::wordBubbleDisappeared, this));
    _wordBubbleNode->runAction(Sequence::create(elastic, callbackAction, NULL));
    
}

void StoryPlaying::wordBubbleDisappeared() {
    _textDisplayAnimationRunning = false;
    _pronouceWord = "";
}


bool StoryPlaying::translatedText(std::string text) {
    if(_wordMappings.find(text) != _wordMappings.end()) {
        std::string mappedStr = _wordMappings.at(text);
        std::replace(mappedStr.begin(), mappedStr.end(), '_', ' ');
        
        _pronouceWord =  TextGenerator::getInstance()->translateString(mappedStr);
        
        if(_wordBubbleNode != NULL)
        {
            Node* chooseText = _wordBubbleNode->getChildByName(TEXT_FIELD_WORD);
            
            if(chooseText != NULL) {
                cocos2d::ui::TextField* chooseLabel = dynamic_cast<cocos2d::ui::TextField *>(chooseText);
                if(chooseLabel != NULL) {
                    chooseLabel->setTouchEnabled(false);
                    chooseLabel->setString(_pronouceWord);
                    chooseLabel->setFontSize(100);
                    chooseLabel->setTextHorizontalAlignment(TextHAlignment::CENTER);
                    chooseLabel->setTextVerticalAlignment(TextVAlignment::CENTER);
                    chooseLabel->setFontName("fonts/Roboto-Regular.ttf");
                    chooseLabel->setTextColor(Color4B::BLACK);
                }
            }
        }
        
        return true;
    }
    
    return false;
}


void StoryPlaying::pronounceWord(Ref* pSender, ui::Widget::TouchEventType eEventType)
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
            _menuContext->pronounceWord(_pronouceWord);
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
}


void StoryPlaying::showTextAgain(Ref* pSender, ui::Widget::TouchEventType eEventType)
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
            createDialogBubble();
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
}

