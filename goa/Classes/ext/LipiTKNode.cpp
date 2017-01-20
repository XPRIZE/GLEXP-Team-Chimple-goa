//
//  LipiTKNode.cpp
//  Hello
//
//  Created by Shyamal.Upadhyaya on 14/10/16.
//
//

#include "LipiTKNode.h"
#include "../lang/LangUtil.h"
#include <algorithm>

USING_NS_CC;

LipiTKNode::LipiTKNode():
_canvasWidth(0),
_canvasHeight(0),
_currentStroke(),
_lipiTKInterface(nullptr),
_isTouchEndedOrMovedOut(false),
_startTouchPoint(Vec2(0,0))
{
    
}


LipiTKNode::~LipiTKNode() {
}


LipiTKNode* LipiTKNode::create(int width, int height, Point position)
{
    auto node = new LipiTKNode();
    if (node && node->initialize(width, height, position)) {
        node->setPosition(position);
        node->autorelease();
        return node;
    }
    CC_SAFE_DELETE(node);
    return nullptr;
}


cocos2d::Sprite* LipiTKNode::createDrawingBoard() {
    auto drawingBoardSprite = Sprite::create();
    drawingBoardSprite->setTextureRect(Rect(0, 0, _canvasWidth, _canvasHeight));
    drawingBoardSprite->setColor(Color3B::BLUE);
    drawingBoardSprite->setOpacity(50);
    return drawingBoardSprite;
}


cocos2d::Sprite* LipiTKNode::createDrawingAreaWithColor(cocos2d::Vec2 anchorPoint, cocos2d::Vec2 position, float opacity,const cocos2d::Color3B color) {
    _drawingBoard = Sprite::create();
    _drawingBoard->setName("_drawingBoard");
    _drawingBoard->setTextureRect(Rect(0, 0, _canvasWidth, _canvasHeight));
    _drawingBoard->setAnchorPoint(Vec2(0.5,0.5));
    _drawingBoard->setColor(Color3B::RED);
    _drawingBoard->setOpacity(opacity);
    _drawingBoard->setPosition(position);
    
    return _drawingBoard;
}



Sprite* LipiTKNode::createDrawingAreaUsingFileName(Vec2 anchorPoint, Vec2 position, float opacity, std::string fileName) {
    _drawingBoard = Sprite::create(fileName);
    _drawingBoard->setName("_drawingBoard");
    _drawingBoard->setTextureRect(Rect(0, 0, _canvasWidth, _canvasHeight));
    _drawingBoard->setAnchorPoint(Vec2(0.5,0.5));
    _drawingBoard->setColor(Color3B::RED);
    _drawingBoard->setOpacity(opacity);
    _drawingBoard->setPosition(position);
    
    return _drawingBoard;
}


bool LipiTKNode::initialize(int width, int height, Point position) {
    auto path = "res";
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT || CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
        //initialize lipiTK
            path = "res";
    
        #elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
        //initialize lipiTK
            path = "res";
    
    
        #elif (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            //initialize lipiTK
             path = FileUtils::getInstance()->getWritablePath().c_str();
        #endif
    
        _lipiTKInterface = LipiTKInterface::getInstance(path);
        _canvasWidth = width;
        _canvasHeight = height;
    
    // create a canvas to draw on
    _canvas = RenderTexture::create(_canvasWidth, _canvasHeight, kCCTexture2DPixelFormat_RGBA8888);
    addChild(_canvas);
    
    _paintingNode = DrawNode::create();
    addChild(_paintingNode);
    
    
    _drawingBoard = createDrawingBoard();
    _drawingBoard->setName("_drawingBoard");
    addChild(_drawingBoard, 1);
    
    _listenerTouches = EventListenerTouchOneByOne::create();
    _listenerTouches->setSwallowTouches(true);
    _listenerTouches->onTouchBegan = CC_CALLBACK_2(LipiTKNode::onTouchBegan, this);
    _listenerTouches->onTouchMoved = CC_CALLBACK_2(LipiTKNode::onTouchMoved, this);
    _listenerTouches->onTouchEnded = CC_CALLBACK_2(LipiTKNode::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(_listenerTouches, this);

    Vec2 clearButtonPos = Vec2(_drawingBoard->getBoundingBox().size.width - 15,_drawingBoard->getBoundingBox().size.height - 15);
    
    _clearButton = this->createButton("menu/help.png", "menu/help.png", "menu/help.png", clearButtonPos);
    if(_clearButton) {
        _drawingBoard->addChild(_clearButton);
    }
    
    return true;
}





cocos2d::ui::Button* LipiTKNode::createButton(const std::string normalImage,
                                                 const std::string selectedImage ,
                                                 const std::string disableImage,
                                              Vec2 position) {
    cocos2d::ui::Button* button = cocos2d::ui::Button::create(normalImage, selectedImage, disableImage, cocos2d::ui::Widget::TextureResType::LOCAL);
    button->setPosition(position);
    
    button->addTouchEventListener(CC_CALLBACK_2(LipiTKNode::clearDrawing, this));
    
    return button;
}


void LipiTKNode::clearDrawing(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType) {
    if(eEventType == cocos2d::ui::Widget::TouchEventType::ENDED) {
        _paintingNode->clear();
        _canvas->clear(0, 0, _canvasWidth, _canvasHeight);
        _strokes.clear();
        clearPrintedCharacters();
    }
}


void LipiTKNode::clearPrintedCharacters() {
    EventCustom event("clearPrintedCharacters");
    _eventDispatcher->dispatchEvent(&event);
}


bool LipiTKNode::onTouchBegan(Touch *touch, Event *event)
{
    if(checkTouchOnDrawingBoard(touch, event))
    {
        clearPrintedCharacters();
        Point n = this->convertTouchToNodeSpace(touch);
        _startTouchPoint = n;
        _lastTouchPoint = n;
        _currentStroke = new Stroke();
        CCLOG("touch begin Point x: %f and y %f", n.x, n.y);
        _currentStroke->addPoints(n.x, n.y);
        
        //Call Post Touch Began Handler
        postTouchBegan(touch, event, _startTouchPoint);
        
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


void LipiTKNode::postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {
    
}


void LipiTKNode::postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {
    
}

void LipiTKNode::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {
    
}


void LipiTKNode::onTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event)
{
    if(checkTouchOnDrawingBoard(touch, event)) {
        auto curDrawingPoint = touch->getLocation();
        Point n = this->convertTouchToNodeSpace(touch);
        CCLOG("touch move Point x: %f and y %f", n.x, n.y);
        _currentStroke->addPoints(n.x, n.y);
        draw(_paintingNode, _lastTouchPoint, n);
        postTouchMoved(touch, event, n);
        _lastTouchPoint = n;
    } else {
        if(_isTouchEndedOrMovedOut) {
            processLipiTK();
        }
    }
}

void LipiTKNode::draw(cocos2d::DrawNode* paintingNode, Point fromPoint, Point currentPoint) {
    paintingNode->drawSegment(fromPoint, currentPoint, 5, Color4F(14 / 255.0f, 221 / 255.0f, 23 / 255.0f, 1.0f));
}

void LipiTKNode::touchEnded(Touch *touch, Event *event)
{
 
    if(checkTouchOnDrawingBoard(touch, event)) {
        Point n = this->convertTouchToNodeSpace(touch);
        CCLOG("touch ended Point x: %f and y %f", n.x, n.y);
        _currentStroke->addPoints(n.x, n.y);
        postTouchEnded(touch, event, n);
    }
    
    if(_isTouchEndedOrMovedOut) {
        processLipiTK();
    }
}

void LipiTKNode::processLipiTK() {
    _isTouchEndedOrMovedOut = false;
    _strokes.push_back(_currentStroke);
	if (_strokes.at(0)->getNumberOfPoints() > 20) {
		lipiProcessTask = new LipiTKProcessTask(_lipiTKInterface, _strokes, this);
		lipiProcessTask->execute();
	}
   
}



void LipiTKNode::broadCastRecognizedChars(std::vector<std::string> results) {
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
            }
            
            EventCustom event("chars_recognized");
            event.setUserData(static_cast<void*>(&copiedResults));
            _eventDispatcher->dispatchEvent(&event);
            
        }
    }
}

std::vector<Stroke*> LipiTKNode::getStrokes() {
	return _strokes;
}

void LipiTKNode::writingEnable(bool enable)
{
	_listenerTouches->setEnabled(enable);
}


void LipiTKNode::removeClearButton() {

	_drawingBoard->removeChild(_clearButton, true);
}

void LipiTKNode::setClearButtonTexture(const std::string normalImage,
	const std::string selectedImage,
	const std::string disableImage) {

	_clearButton->loadTextures(normalImage, selectedImage, disableImage, cocos2d::ui::Widget::TextureResType::PLIST);

}
