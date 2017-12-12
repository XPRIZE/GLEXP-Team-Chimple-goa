//
//  ScrollableCatalogue.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 08/01/17.
//
//

#include <iostream>
#include <string>
#include <sstream>
#include <regex>
#include "ScrollableCatalogue.hpp"
#include "storage/local-storage/LocalStorage.h"
#include "external/json/document.h"
#include "external/json/stringbuffer.h"
#include "external/json/writer.h"
#include "../effects/FShake.h"
#include "QuestionHandler.h"
#include "../menu/MainMenuHome.hpp"

USING_NS_CC;

static const std::string STORY_JSON = ".storyJSON";
static const std::string UNLOCKED_STORY_ID_ORDER = ".unlockedStoryIdOrder";
static const std::string LEVEL = ".level";

ScrollableCatalogue::ScrollableCatalogue():
_greyLayer(NULL)
{
}

ScrollableCatalogue::~ScrollableCatalogue() {
    
}


ScrollableCatalogue* ScrollableCatalogue::create()
{
    ScrollableCatalogue* catalogue = new (std::nothrow) ScrollableCatalogue();
    if (catalogue && catalogue->init()) {
        catalogue->autorelease();
        return catalogue;
    }
    CC_SAFE_DELETE(catalogue);
    return nullptr;
}


Scene* ScrollableCatalogue::createScene() {
    auto scene = Scene::create();
    auto layer = ScrollableCatalogue::create();
    scene->addChild(layer);
    layer->menuContext = MenuContext::create(layer, "story-catalogue");
    scene->addChild(layer->menuContext);
    return scene;
}


void ScrollableCatalogue::addGreyLayer() {
    if(!_greyLayer) {
        //later customize and add image
        Size visibleSize = Director::getInstance()->getVisibleSize();
        _greyLayer = LayerGradient::create(Color4B(0, 0, 0, 100), Color4B(15, 15, 15, 100));
        _greyLayer->setContentSize(visibleSize);
        addChild(_greyLayer, 3);
        
        Node* animationNode = CSLoader::createNode("loading/animation_4.csb");
        animationNode->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
        animationNode->setAnchorPoint(Vec2(0.5,0.5));
        _greyLayer->addChild(animationNode,1);
        
        cocostudio::timeline::ActionTimeline * _animationTimeLine = CSLoader::createTimeline("loading/animation_4.csb");
        animationNode->runAction(_animationTimeLine);
        _animationTimeLine->gotoFrameAndPlay(0);
        
        
        auto _listener = EventListenerTouchOneByOne::create();
        _listener->setSwallowTouches(true);
        _listener->onTouchBegan = CC_CALLBACK_2(ScrollableCatalogue::greyLayerTouched, this);
        _eventDispatcher->addEventListenerWithSceneGraphPriority(_listener, _greyLayer);
        
    }
}

bool ScrollableCatalogue::greyLayerTouched(Touch *touch, Event *event)
{
    return true;
}


void ScrollableCatalogue::onExitTransitionDidStart() {
    Node::onExitTransitionDidStart();
    CCLOG("ScrollableCatalogue::onExitTransitionDidStart");
    if(_greyLayer != NULL) {
        Director::getInstance()->getEventDispatcher()->removeEventListenersForTarget(_greyLayer);
    }
    
}


bool ScrollableCatalogue::init() {
    if(!Node::init())
    {
        return false;
    }
    bool isConfigLoadedSuccessfully = false;
    int numberOfPages = 0;
    int numRows = 0;
    int numCols = 0;
    //iterate and create data
    std::vector<int> orderedStories;
    
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    SpriteFrameCache::getInstance()->addSpriteFramesWithFile("template.plist");
    SpriteFrameCache::getInstance()->addSpriteFramesWithFile("levelstep/levelstep.plist");
    
    //create list of stories which are locked
    
    
    std::string contents = FileUtils::getInstance()->getStringFromFile("misc/shelfConfig.json");
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {
        storyConfigs = d["stories"];
        assert(storyConfigs.IsArray());
        
        numRows = STORY_NUMBER_OF_BUTTONS_ROWS;
        numCols = STORY_NUMBER_OF_BUTTONS_COLS;
        
        numberOfPages = ceil((float) storyConfigs.Size() / (numRows * numCols));
        
        for (int dIndex = 0; dIndex < storyConfigs.Size(); dIndex++) {
            const rapidjson::Value& story = storyConfigs[dIndex];
            std::string storyId = story["storyId"].GetString();
            CCLOG("story %s", storyId.c_str());
            orderedStories.push_back(dIndex);
        }
        
        isConfigLoadedSuccessfully = true;
    }
    
    
    std::string lockedStoriesStr;
    localStorageGetItem(UNLOCKED_STORY_ID_ORDER, &lockedStoriesStr);
    
    if(lockedStoriesStr.empty()) {
        rapidjson::Document dLockedStoriesDoc;
        rapidjson::Document::AllocatorType& allocator = dLockedStoriesDoc.GetAllocator();
        dLockedStoriesDoc.SetArray();
        
        for (int sIndex = 2; sIndex < storyConfigs.Size(); sIndex++) {
            const rapidjson::Value& story = storyConfigs[sIndex];
            std::string storyId = story["storyId"].GetString();
            dLockedStoriesDoc.PushBack(rapidjson::Value(storyId.c_str(), allocator).Move(), allocator);
            menuContext->createNewlockStoryDocument(storyId);
        }
        
        rapidjson::StringBuffer buffer;
        rapidjson::Writer<rapidjson::StringBuffer> writer(buffer);
        dLockedStoriesDoc.Accept(writer);
        const char* output = buffer.GetString();
        localStorageSetItem(UNLOCKED_STORY_ID_ORDER, output);
        
//        menuContext->createNewUnlockStoryDocument("storyId_1");
//        menuContext->createNewUnlockStoryDocument("storyId_2");
        menuContext->createNewUnlockStoryDocument("storyId_3");
//        menuContext->createNewUnlockStoryDocument("storyId_4");
//        menuContext->createNewUnlockStoryDocument("storyId_5");
        menuContext->createNewUnlockStoryDocument("storyId_6");
//        menuContext->createNewUnlockStoryDocument("storyId_7");
//        menuContext->createNewUnlockStoryDocument("storyId_8");
//        menuContext->createNewUnlockStoryDocument("storyId_9");
//        menuContext->createNewUnlockStoryDocument("storyId_10");
//        menuContext->createNewUnlockStoryDocument("storyId_11");
//        menuContext->createNewUnlockStoryDocument("storyId_12");
//        menuContext->createNewUnlockStoryDocument("storyId_13");
//        menuContext->createNewUnlockStoryDocument("storyId_14");
//        menuContext->createNewUnlockStoryDocument("storyId_15");
//        menuContext->createNewUnlockStoryDocument("storyId_16");
//        menuContext->createNewUnlockStoryDocument("storyId_17");
//        menuContext->createNewUnlockStoryDocument("storyId_18");
//        menuContext->createNewUnlockStoryDocument("storyId_19");
//        menuContext->createNewUnlockStoryDocument("storyId_20");
//        menuContext->createNewUnlockStoryDocument("storyId_21");
//        menuContext->createNewUnlockStoryDocument("storyId_22");
//        menuContext->createNewUnlockStoryDocument("storyId_23");
//        menuContext->createNewUnlockStoryDocument("storyId_24");
//        menuContext->createNewUnlockStoryDocument("storyId_25");
//        menuContext->createNewUnlockStoryDocument("storyId_26");
//        menuContext->createNewUnlockStoryDocument("storyId_27");
//        menuContext->createNewUnlockStoryDocument("storyId_28");
//        menuContext->createNewUnlockStoryDocument("storyId_29");
//        menuContext->createNewUnlockStoryDocument("storyId_30");
//        menuContext->createNewUnlockStoryDocument("storyId_31");
//        menuContext->createNewUnlockStoryDocument("storyId_32");
//        menuContext->createNewUnlockStoryDocument("storyId_33");
//        menuContext->createNewUnlockStoryDocument("storyId_34");
//        menuContext->createNewUnlockStoryDocument("storyId_35");
//        menuContext->createNewUnlockStoryDocument("storyId_36");
//        menuContext->createNewUnlockStoryDocument("storyId_37");
//        menuContext->createNewUnlockStoryDocument("storyId_38");
//        menuContext->createNewUnlockStoryDocument("storyId_39");
//        menuContext->createNewUnlockStoryDocument("storyId_40");
//        menuContext->createNewUnlockStoryDocument("storyId_41");
//        menuContext->createNewUnlockStoryDocument("storyId_42");
//        menuContext->createNewUnlockStoryDocument("storyId_43");
//        menuContext->createNewUnlockStoryDocument("storyId_44");
//        menuContext->createNewUnlockStoryDocument("storyId_45");
//        menuContext->createNewUnlockStoryDocument("storyId_46");
//        menuContext->createNewUnlockStoryDocument("storyId_47");
//        menuContext->createNewUnlockStoryDocument("storyId_48");
//        menuContext->createNewUnlockStoryDocument("storyId_49");
//        menuContext->createNewUnlockStoryDocument("storyId_50");
//        menuContext->createNewUnlockStoryDocument("storyId_51");
//        menuContext->createNewUnlockStoryDocument("storyId_52");
//        menuContext->createNewUnlockStoryDocument("storyId_53");
//        menuContext->createNewUnlockStoryDocument("storyId_54");
//        menuContext->createNewUnlockStoryDocument("storyId_55");
//        menuContext->createNewUnlockStoryDocument("storyId_56");
//        menuContext->createNewUnlockStoryDocument("storyId_57");
//        menuContext->createNewUnlockStoryDocument("storyId_58");
//        menuContext->createNewUnlockStoryDocument("storyId_59");
//        menuContext->createNewUnlockStoryDocument("storyId_60");
//        menuContext->createNewUnlockStoryDocument("storyId_61");
//        menuContext->createNewUnlockStoryDocument("storyId_62");
//        menuContext->createNewUnlockStoryDocument("storyId_63");
//        menuContext->createNewUnlockStoryDocument("storyId_64");
//        menuContext->createNewUnlockStoryDocument("storyId_65");
//        menuContext->createNewUnlockStoryDocument("storyId_66");
//        menuContext->createNewUnlockStoryDocument("storyId_67");
//        menuContext->createNewUnlockStoryDocument("storyId_68");
//        menuContext->createNewUnlockStoryDocument("storyId_69");
//        menuContext->createNewUnlockStoryDocument("storyId_70");
//        menuContext->createNewUnlockStoryDocument("storyId_71");
//        menuContext->createNewUnlockStoryDocument("storyId_72");
//        menuContext->createNewUnlockStoryDocument("storyId_73");
//        menuContext->createNewUnlockStoryDocument("storyId_74");
//        menuContext->createNewUnlockStoryDocument("storyId_75");
//        menuContext->createNewUnlockStoryDocument("storyId_76");
    }
    
    
    
    std::string titlesFileUrl =  "story/" + TextGenerator::getInstance()->getLang() + "/titles.json";
    std::string bookTitles = "";
    
    
    rapidjson::Document titleDoc;
    
    if(FileUtils::getInstance()->isFileExist(titlesFileUrl)) {
        bookTitles = FileUtils::getInstance()->getStringFromFile(titlesFileUrl);
        
        if (false == titleDoc.Parse<0>(bookTitles.c_str()).HasParseError()) {
            rapidjson::Value::MemberIterator M;
            const char *key,*value;
            for (M=titleDoc.MemberBegin(); M!=titleDoc.MemberEnd(); M++)
            {
                key   = M->name.GetString();
                value = M->value.GetString();
                
                
                std::string keyLower(key);
                
                std::transform(keyLower.begin(), keyLower.end(), keyLower.begin(), ::tolower);
                CCLOG("title key %s", keyLower.c_str());
                CCLOG("title value %s", value);
                
                titleMap.insert({keyLower, value});
            }
        }
    }
    
    std::string unlockStr;
    localStorageGetItem(".unlock", &unlockStr);
    lockAll = false;
    if (unlockStr.empty() || unlockStr == "1") {
        lockAll = true;
    }
    
    
    if (isConfigLoadedSuccessfully)
    {
        _pageView = ui::PageView::create();
        addChild(_pageView);
        
        std::vector<Color3B> colors;
        colors.push_back(Color3B(229,21,90));
        colors.push_back(Color3B(14,112,11));
        colors.push_back(Color3B(8,52,193));
        colors.push_back(Color3B(201,13,13));
        colors.push_back(Color3B(239,106,15));
        
        
        int index = 0;
        for(int k = 0; k < numberOfPages; k++)
        {
            auto page = ui::Widget::create();
            page->setContentSize(visibleSize);
            _pageView->addPage(page);
            
            Texture2D *texture = Director::getInstance()->getTextureCache()->addImage("template/wood_01.png");
            Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
            texture->setTexParameters(&tp);
            Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width, visibleSize.height));
            backgroundSpriteMapTile->setAnchorPoint(Vec2(0.5,0.5));
            backgroundSpriteMapTile->setPosition(Vec2( visibleSize.width/2, visibleSize.height/2 ));
            page->addChild(backgroundSpriteMapTile);
            
            Texture2D *textureShelf = Director::getInstance()->getTextureCache()->addImage("template/shelf.png");
            Texture2D::TexParams tpShelf = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
            textureShelf->setTexParameters(&tpShelf);
            Sprite *shelfSpriteMapTile = Sprite::createWithTexture(textureShelf, Rect(0, 0, visibleSize.width, visibleSize.height * 0.85));
            shelfSpriteMapTile->setAnchorPoint(Vec2(0,0));
            shelfSpriteMapTile->setPosition(Vec2(0,0));
            page->addChild(shelfSpriteMapTile);
            
            
            int yOffset = 150;
            
            for (int i = 0; i < numRows; i++)
            {
                for (int j = 0; j < numCols; j++) {
                    if(index < orderedStories.size()) {
                        int dIndex = orderedStories[index];
                        const rapidjson::Value& story = storyConfigs[dIndex];
                        int rIndex = 0 + ( std::rand() % ( 4 - 0 + 1 ) );
                        Color3B bookColor = Color3B::GRAY;
                        if(rIndex < colors.size()) {
                            bookColor = colors.at(rIndex);
                        }
                        
                        createBook(i,j,numRows,numCols,page,index, story,yOffset,bookColor);
                    }
                    index++;
                }
            }
            _pageView->setContentSize(visibleSize);
            _pageView->setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
            _pageView->setInnerContainerSize(Size(visibleSize.width * numberOfPages, visibleSize.height));
            
        }
    }
    
    cocos2d::ui::Button* backButton = createBackButton();
    backButton->setPosition(Vec2(origin.x + 150, origin.y + visibleSize.height - 150));
    this->addChild(backButton);
    
    return true;
}


void ScrollableCatalogue::createBook(int i, int j, int numRows, int numCols, ui::Widget* parent, int index, const rapidjson::Value& storyJson, int yOffset, Color3B bookColor) {
    //create bookNode
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Node *bookNode = CSLoader::createNode("template/book.csb");
    CCLOG("height position %f", visibleSize.height + yOffset - (i + 1.2) * ((visibleSize.height) / (numRows + 1)));
    bookNode->setPosition(Vec2((j + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (i*1.125 + 1.45) * ((visibleSize.height) / (numRows + 1))));
    
    Node* book = bookNode->getChildByName("book");
    
    std::string storyId = storyJson["storyId"].GetString();
    std::string unlockStoryStr;
    localStorageGetItem(storyId + LEVEL, &unlockStoryStr);
    
    bool isStoryLocked = true;
    int stars = 0;
    rapidjson::Document d;
    if (false == d.Parse<0>(unlockStoryStr.c_str()).HasParseError()) {
        isStoryLocked = d["locked"].GetBool();
        stars = d["star"].GetInt();
    }
    std::string starFile = stars >= 1 ? "levelstep/star.png" : "levelstep/star_empty.png";
    auto star1 = Sprite::createWithSpriteFrameName(starFile);
    star1->setAnchorPoint(Vec2(0.5,0.5));
    star1->setScale(0.75f);
    star1->setPosition(Vec2(book->getBoundingBox().size.width / 4, book->getBoundingBox().size.height * 3 / 4 -  335));
    book->addChild(star1, 4);
    
    
    starFile = stars >= 2 ? "levelstep/star.png" : "levelstep/star_empty.png";
    auto star2 = Sprite::createWithSpriteFrameName(starFile);
    star2->setAnchorPoint(Vec2(0.5,0.5));
    star2->setScale(0.75f);
    star2->setPosition(Vec2(book->getBoundingBox().size.width / 2, book->getBoundingBox().size.height * 3 / 4 - 335));
    book->addChild(star2, 4);
    
    starFile = stars >= 3 ? "levelstep/star.png" : "levelstep/star_empty.png";
    auto star3 = Sprite::createWithSpriteFrameName(starFile);
    star3->setAnchorPoint(Vec2(0.5,0.5));
    star3->setScale(0.75f);
    star3->setPosition(Vec2(book->getBoundingBox().size.width * 3 / 4, book->getBoundingBox().size.height * 3 / 4 - 335));
    
    book->addChild(star3, 4);
    
    
    storyLockedMap.insert({"book_" + menuContext->to_string(index), isStoryLocked});
    bookNode->setName("book_" + menuContext->to_string(index));
    book->setColor(bookColor);
    
    std::string imageFile = storyJson["icon"].GetString();
    CCLOG("imageFile %s", imageFile.c_str());
    
    Node* imageNode = bookNode->getChildByName("Node");
    Sprite* imageSprite = Sprite::createWithSpriteFrameName(imageFile);
    if(imageSprite != NULL) {
        imageNode->addChild(imageSprite);
    }
    
    if(!lockAll) {
        //dont render lock
    } else {
        if(isStoryLocked) {
            Sprite* lockSprite = Sprite::create("template/lock.png");
            lockSprite->setAnchorPoint(Vec2(0.5,0.5));
            lockSprite->setPosition(Vec2(imageNode->getPosition().x, imageNode->getPosition().y + 150));
            imageNode->addChild(lockSprite, 1);
        }
    }
    
    
    std::string titleText = "";
    std::string titleKey = imageFile;
    std::string removeStr = "_thumbnail.png";
    
    std::string::size_type res = titleKey.find(removeStr);
    if (res != std::string::npos) {
    } else {
        removeStr = "_thumbnail.jpg";
        res = titleKey.find(removeStr);
    }
    
    if (res != std::string::npos) {
        titleKey.erase(res, removeStr.length());
        std::replace(titleKey.begin(), titleKey.end(), ' ', '_');
        if(!titleKey.empty()) {
            std::transform(titleKey.begin(), titleKey.end(), titleKey.begin(), ::tolower);
            CCLOG("query title key %s", titleKey.c_str());
            if(titleMap.find(titleKey) != titleMap.end()) {
                titleText = titleMap.at(titleKey);
                Node* chooseText = bookNode->getChildByName("TextField");
                if(chooseText != NULL) {
                    cocos2d::ui::TextField* chooseLabel = dynamic_cast<cocos2d::ui::TextField *>(chooseText);
                    if(chooseLabel != NULL) {
                        chooseLabel->setTouchEnabled(false);
                        titleText = QuestionHandler::wrapString(titleText, 10);
                        chooseLabel->setString(titleText);
                        chooseLabel->setFontSize(40);
                        chooseLabel->setFontName(LangUtil::getInstance()->getFontFile());
                        chooseLabel->setTextColor(Color4B::WHITE);
                    }
                }
                
            } else {
                CCLOG("title not found %s", titleKey.c_str());
            }
        } else {
            CCLOG("title not found %s", titleKey.c_str());
        }
    }
    
    parent->addChild(bookNode);
    std::string buttonNormalIcon = "gameicons/story.png";
    cocos2d::ui::Button* button = ui::Button::create();
    button->loadTextureNormal(buttonNormalIcon);
    button->setOpacity(0);
    button->setPosition(bookNode->getPosition());
    button->setName(menuContext->to_string(index));
    button->setTitleAlignment(TextHAlignment::CENTER, TextVAlignment::BOTTOM);
    button->setScale(0.75);
    button->addTouchEventListener(CC_CALLBACK_2(ScrollableCatalogue::loadStory, this));
    parent->addChild(button, 3);
    
    
}

void ScrollableCatalogue::transitionToStory(float dt) {
    
    CCLOG("Selected story index %d", selectedIndex);
    localStorageSetItem(STORY_JSON, menuContext->to_string(selectedIndex));
    menuContext->launchGameFinally("story");
}



void ScrollableCatalogue::loadStory(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    cocos2d::ui::Button* clickedButton = dynamic_cast<cocos2d::ui::Button *>(pSender);
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
            break;
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            selectedIndex = atoi(clickedButton->getName().c_str());
            
            if(!lockAll) {
                addGreyLayer();
                clickedButton->setEnabled(false);
                selectedIndex = atoi(clickedButton->getName().c_str());
                this->scheduleOnce(schedule_selector(ScrollableCatalogue::transitionToStory), 1.5);
            } else {
                bool sLocked = false;
                if(storyLockedMap.find("book_" + clickedButton->getName()) != storyLockedMap.end()) {
                    sLocked = storyLockedMap.at("book_" + clickedButton->getName());
                }
                
                if(sLocked) {
                    Node* bookNode = clickedButton->getParent()->getChildByName("book_" + clickedButton->getName());
                    if(bookNode != NULL) {
                        bookNode->runAction(FShake::actionWithDuration(1.0f, 10.0f));
                    }
                } else {
                    addGreyLayer();
                    clickedButton->setEnabled(false);
                    selectedIndex = atoi(clickedButton->getName().c_str());
                    this->scheduleOnce(schedule_selector(ScrollableCatalogue::transitionToStory), 1.5);
                }
            }
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}


cocos2d::ui::Button* ScrollableCatalogue::createBackButton() {
    
    std::string buttonNormalIcon = "menu/back.png";
    std::string buttonPressedIcon = buttonNormalIcon;
    cocos2d::ui::Button* button = ui::Button::create();
    std::string buttonDisabledIcon = buttonNormalIcon;
    if(buttonDisabledIcon.find(".png") != std::string::npos) {
        buttonDisabledIcon = buttonDisabledIcon.insert(buttonDisabledIcon.find(".png"), "_disabled");
    }
    
    button->loadTextureNormal(buttonNormalIcon);
    button->loadTexturePressed(buttonPressedIcon);
    button->loadTextureDisabled(buttonDisabledIcon);
    button->addTouchEventListener(CC_CALLBACK_2(ScrollableCatalogue::backButtonPressed, this));
    
    return button;
}

void ScrollableCatalogue::backButtonPressed(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    Director::getInstance()->replaceScene(MainMenuHome::createScene());
}

