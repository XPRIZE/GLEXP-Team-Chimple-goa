//
//  LipiTKNode.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 14/10/16.
//
//

#include "LipiTKNode.h"
#include <algorithm>

USING_NS_CC;

LipiTKNode::LipiTKNode():
_canvasWidth(0),
_canvasHeight(0),
_currentStroke(),
_lipiTKInterface(nullptr),
_isTouchEndedOrMovedOut(false),
_menu(nullptr)
{
    
}


LipiTKNode::~LipiTKNode() {
    _canvas->release();
    _brush->release();
}


LipiTKNode* LipiTKNode::create(int width, int height, Point position, int opacity)
{
    auto node = new LipiTKNode();
    if (node && node->initialize(width, height, position, opacity)) {
        node->autorelease();
        return node;
    }
    CC_SAFE_DELETE(node);
    return nullptr;
}


bool LipiTKNode::initialize(int width, int height, Point position, int opacity) {
    _lipiTKInterface = LipiTKInterface::getInstance("res");
    _canvasWidth = width;
    _canvasHeight = height;
    
    // create a canvas to draw on
    _canvas = RenderTexture::create(_canvasWidth, _canvasHeight, kCCTexture2DPixelFormat_RGBA8888);
    _canvas->retain();
    
    // init the brush tip
    _brush = Sprite::create("largeBrush.png");
    _brush->retain();
    
    _paintingNode = DrawNode::create();
    addChild(_paintingNode);
    
    
    _drawingBoard = Sprite::create();
    _drawingBoard->setName("_drawingBoard");
    _drawingBoard->setTextureRect(Rect(0, 0, _canvasWidth, _canvasHeight));
    _drawingBoard->setAnchorPoint(Vec2(0.5,0.5));
    _drawingBoard->setColor(Color3B::RED);
    _drawingBoard->setOpacity(opacity);
    _drawingBoard->setPosition(position);
    addChild(_drawingBoard, 1);

    
    auto listenerTouches = EventListenerTouchOneByOne::create();
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(LipiTKNode::onTouchBegan, this);
    listenerTouches->onTouchMoved = CC_CALLBACK_2(LipiTKNode::onTouchMoved, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(LipiTKNode::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);

    
    _clearButton = this->createButton("menu/help.png", "menu/help.png", "menu/help.png");
    return true;
}


cocos2d::ui::Button* LipiTKNode::createButton(const std::string normalImage,
                                                 const std::string selectedImage ,
                                                 const std::string disableImage) {
    cocos2d::ui::Button* button = cocos2d::ui::Button::create(normalImage, selectedImage, disableImage, cocos2d::ui::Widget::TextureResType::LOCAL);
    button->setPosition(Vec2(_drawingBoard->getBoundingBox().size.width - 15,_drawingBoard->getBoundingBox().size.height - 15));
    _drawingBoard->addChild(button);
    
    button->addTouchEventListener(CC_CALLBACK_2(LipiTKNode::clearDrawing, this));
    
    return button;
}


void LipiTKNode::clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        //chimpHelp();
        _paintingNode->clear();
        _canvas->clear(0, 0, _canvasWidth, _canvasHeight);
        clearAllCharacters();
        _strokes.clear();
    }
}


void LipiTKNode::charSelected(cocos2d::Ref* sender) {
    CCLOG("clicked");
}

MenuItemFont * LipiTKNode::createItem(Point position, Node* parent, std::string text, const Color3B& color, float fontSize) {
    auto _showCharItem = MenuItemFont::create(text, CC_CALLBACK_1(LipiTKNode::charSelected, this));
    _showCharItem->setPosition(position);
    _showCharItem->setFontName("Arial");
    _showCharItem->setColor(color);
    _showCharItem->setFontSize(fontSize);
    return _showCharItem;
}


void LipiTKNode::clearAllCharacters() {
    for (std::vector<MenuItemFont*>::iterator it = _chars.begin() ; it != _chars.end(); ++it)
    {
        MenuItemFont* item = *it;
        item->removeFromParent();
    }
    
//    if(_menu)
//    {
//        _menu->removeFromParent();
//    }
    
    _chars.clear();
   
}


bool LipiTKNode::onTouchBegan(Touch *touch, Event *event)
{
    if(checkTouchOnDrawingBoard(touch, event))
    {
        clearAllCharacters();
        Point n = this->convertTouchToNodeSpace(touch);
        _currentStroke = new Stroke();
        CCLOG("touch begin Point x: %f and y %f", n.x, n.y);
        _currentStroke->addPoints(n.x, n.y);
        return true;
    }
    return false;
}

bool LipiTKNode::checkTouchOnDrawingBoard(cocos2d::Touch * touch, cocos2d::Event * event) {
    Point n = this->convertTouchToNodeSpace(touch);
    auto target = event->getCurrentTarget();
    
    auto drawingBoard = target->getChildByName("_drawingBoard");
    
    if(drawingBoard) {
        Rect boundingBoxRectToCheck = drawingBoard->getBoundingBox();
        if(boundingBoxRectToCheck.containsPoint(n)) {
            _isTouchEndedOrMovedOut = true;
            return true;
        }
    }
    
    return false;
}

void LipiTKNode::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
    if(checkTouchOnDrawingBoard(touch, event)) {
        auto curDrawingPoint = touch->getLocation();
        Point n = this->convertTouchToNodeSpace(touch);
        CCLOG("touch move Point x: %f and y %f", n.x, n.y);
        _currentStroke->addPoints(n.x, n.y);
        _paintingNode->drawSegment(touch->getPreviousLocation(), curDrawingPoint, 5, Color4F(14 / 255.0f, 221 / 255.0f, 23 / 255.0f, 1.0f));
    } else {
        if(_isTouchEndedOrMovedOut) {
            processLipiTK();
        }
    }
}

void LipiTKNode::touchEnded(Touch *touch, Event *event)
{
 
    if(checkTouchOnDrawingBoard(touch, event)) {
        Point n = this->convertTouchToNodeSpace(touch);
        CCLOG("touch ended Point x: %f and y %f", n.x, n.y);
        _currentStroke->addPoints(n.x, n.y);
    }
    
    if(_isTouchEndedOrMovedOut) {
        processLipiTK();
    }
}

void LipiTKNode::processLipiTK() {
    _isTouchEndedOrMovedOut = false;
    _strokes.push_back(_currentStroke);
    lipiProcessTask = new LipiTKProcessTask(_lipiTKInterface, _strokes, this);
    lipiProcessTask->execute();
}

void LipiTKNode::displayRecognizedChars(std::vector<std::string> results) {
    int i = 1;
    _menu = Menu::create();
    if(!results.empty() && results.size() > 0)
    {
        std::vector<std::string> copiedResults (results.size());
        std::copy(results.begin(), results.end(), copiedResults.begin());
        
        if(!copiedResults.empty() &&  copiedResults.size() > 0)
        {
            for (std::vector<std::string>::iterator it = copiedResults.begin() ; it != copiedResults.end(); ++it)
            {
                std::string alphabet = *it;
                CCLOG("char %s", alphabet.c_str());
                
                if(!alphabet.empty())
                {
                    try {
                        MenuItemFont* item = createItem(Vec2(-15 + i * _canvasWidth/(results.size()), 15), _drawingBoard, alphabet, Color3B::BLUE, 24.0f);
                        _menu->addChild(item);
                        _chars.push_back(item);
                        
                        i++;

                    } catch(...) {
                        
                    }                    
                }
            }
            _drawingBoard->addChild(_menu);
            _menu->setAnchorPoint(Vec2(0.5,0.5));
            //_menu->setPosition(Vec2(_drawingBoard->getPosition().x - _drawingBoard->getBoundingBox().size.width/2, _drawingBoard->getPosition().y - _drawingBoard->getBoundingBox().size.height/2));
            
            _menu->setPosition(Vec2(0,0));
            
            
        }
    }
    
    
}
