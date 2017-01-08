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

USING_NS_CC;

static const std::string STORY_JSON = ".storyJSON";

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
    layer->menuContext = MenuContext::create(layer, "story-play");
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
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    // the .plist file can be generated with any of the tools mentioned below
    SpriteFrameCache::getInstance()->addSpriteFramesWithFile("template.plist");
    
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
                
                CCLOG("title key %s", key);
                CCLOG("title value %s", value);
                
                titleMap.insert({key, value});
            }
        }
    }
    
    
    
    std::string contents = FileUtils::getInstance()->getStringFromFile("misc/shelfConfig.json");
    
    rapidjson::Document d;
    
    if (false == d.Parse<0>(contents.c_str()).HasParseError()) {        
        storyConfigs = d["stories"];
        assert(storyConfigs.IsArray());
        
        const int numRows = STORY_NUMBER_OF_BUTTONS_ROWS;
        const int numCols = STORY_NUMBER_OF_BUTTONS_COLS;

        const int numberOfPages = ceil((float) storyConfigs.Size() / (numRows * numCols));

        //iterate and create data
        std::vector<int> orderedStories;
        
        for (int dIndex = 0; dIndex < storyConfigs.Size(); dIndex++) {
            const rapidjson::Value& story = storyConfigs[dIndex];
            std::string storyId = story["storyId"].GetString();
            CCLOG("story %s", storyId.c_str());
            orderedStories.push_back(dIndex);
        }
        
        _pageView = ui::PageView::create();
        addChild(_pageView);
        
        std::vector<Color3B> colors;
        colors.push_back(Color3B(229,21,90));
        colors.push_back(Color3B(14,112,11));
        colors.push_back(Color3B(8,52,193));
        colors.push_back(Color3B(201,13,13));
        colors.push_back(Color3B(239,106,15));

        
        int index = 0;
        for(int k = 0; k < numberOfPages; k++) {
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
//                        auto button = createButton(index, story);
//                        if(button != nullptr) {
//                            button->setPosition(Vec2((j + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (i + 1.5) * ((visibleSize.height + yOffset) / (numRows + 1))));
//                            //button->addTouchEventListener(CC_CALLBACK_2(ScrollableCatalogue::loadStory, this));
//                            
//                            page->addChild(button);
//                        }
                        
//                        auto button = createButton(index, story);
//                        if(button != nullptr) {
//                            button->setPosition(Vec2((j + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (i + 1.5) * ((visibleSize.height + yOffset) / (numRows + 1))));
//                            button->addTouchEventListener(CC_CALLBACK_2(ScrollableCatalogue::loadStory, this));
//                            
//                            page->addChild(button);
//                        }
                        
                    }
                    index++;
                }
            }
            
            _pageView->setContentSize(visibleSize);
            _pageView->setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
            _pageView->setInnerContainerSize(Size(visibleSize.width * numberOfPages, visibleSize.height));
            
        }
    }
    return true;
}


void ScrollableCatalogue::createBook(int i, int j, int numRows, int numCols, ui::Widget* parent, int index, const rapidjson::Value& storyJson, int yOffset, Color3B bookColor) {
    //create bookNode
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Node *bookNode = CSLoader::createNode("template/book.csb");
    CCLOG("height position %f", visibleSize.height + yOffset - (i + 1.2) * ((visibleSize.height) / (numRows + 1)));
    bookNode->setPosition(Vec2((j + 0.5) * visibleSize.width / numCols, visibleSize.height + yOffset - (i*1.125 + 1.45) * ((visibleSize.height) / (numRows + 1))));
    
    Node* book = bookNode->getChildByName("book");
    book->setColor(bookColor);
    
    std::string imageFile = storyJson["icon"].GetString();
    CCLOG("imageFile %s", imageFile.c_str());
    
    Node* imageNode = bookNode->getChildByName("Node");
    Sprite* imageSprite = Sprite::createWithSpriteFrameName(imageFile);
    if(imageSprite != NULL) {
        imageNode->addChild(imageSprite);
    }
    
    std::string titleText = "";
    std::string titleKey = imageFile;
    std::string removeStr = "_thumbnail.png";
    
    std::string::size_type res = titleKey.find(removeStr);
    
    if (res != std::string::npos) {
        titleKey.erase(res, removeStr.length());
        std::replace(titleKey.begin(), titleKey.end(), ' ', '_');
        if(!titleKey.empty()) {
            if(titleMap.find(titleKey) != titleMap.end()) {
                titleText = titleMap.at(titleKey);
                Node* chooseText = bookNode->getChildByName("TextField");
                if(chooseText != NULL) {
                    cocos2d::ui::TextField* chooseLabel = dynamic_cast<cocos2d::ui::TextField *>(chooseText);
                    if(chooseLabel != NULL) {
                        chooseLabel->setTouchEnabled(false);
                        chooseLabel->setString(titleText);
                        chooseLabel->setFontSize(40);
                        chooseLabel->setFontName("fonts/Roboto-Regular.ttf");
                        chooseLabel->setTextColor(Color4B::WHITE);
                    }
                }
                
            }
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


cocos2d::ui::Button* ScrollableCatalogue::createButton(int index, const rapidjson::Value& storyJson) {
        //create bookNode

        std::string buttonNormalIcon = "gameicons/story.png";
        cocos2d::ui::Button* button = ui::Button::create();
        button->loadTextureNormal(buttonNormalIcon);
        button->setName(menuContext->to_string(index));
        button->setTitleText("test");
        button->setTitleAlignment(TextHAlignment::CENTER, TextVAlignment::BOTTOM);
        button->setTitleFontName("fonts/Roboto-Regular.ttf");
        button->setTitleColor(Color3B(0xFF, 0xF2, 0x00));
        button->setTitleFontSize(72);
        auto label = button->getTitleRenderer();
        label->setPosition(Vec2(label->getPositionX(), label->getPositionY()- 300));
        button->setScale(0.5);
        return button;

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
            addGreyLayer();
            clickedButton->setEnabled(false);
            selectedIndex = atoi(clickedButton->getName().c_str());
            this->scheduleOnce(schedule_selector(ScrollableCatalogue::transitionToStory), 1.5);
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}


