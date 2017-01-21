//
//  WordSceneLipiTKNode.cpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 25/10/16.
//
//

#include "WordSceneLipiTKNode.h"

USING_NS_CC;

WordSceneLipiTKNode::WordSceneLipiTKNode() {
    
}


WordSceneLipiTKNode::~WordSceneLipiTKNode() {
    
}


WordSceneLipiTKNode* WordSceneLipiTKNode::create(int width, int height, cocos2d::Point position) {
    WordSceneLipiTKNode* wordSceneLipiTKNode = new (std::nothrow) WordSceneLipiTKNode();
    if (wordSceneLipiTKNode && wordSceneLipiTKNode->initialize(width, height, position))
    {
        wordSceneLipiTKNode->autorelease();
        wordSceneLipiTKNode->setPosition(position);
        return wordSceneLipiTKNode;
    }
    CC_SAFE_DELETE(wordSceneLipiTKNode);
    return nullptr;
}



cocos2d::Sprite* WordSceneLipiTKNode::createDrawingBoard() {
    auto drawingBoardSprite = Sprite::create();
    drawingBoardSprite->setTextureRect(Rect(0, 0, _canvasWidth, _canvasHeight));
    drawingBoardSprite->setColor(Color3B::RED);
    drawingBoardSprite->setOpacity(50);
    return drawingBoardSprite;
}


void WordSceneLipiTKNode::postTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {
    
}


void WordSceneLipiTKNode::postTouchMoved(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {
    
}


void WordSceneLipiTKNode::postTouchEnded(cocos2d::Touch * touch, cocos2d::Event * event, cocos2d::Point touchPoint) {
    
}


void WordSceneLipiTKNode::draw(cocos2d::DrawNode* paintingNode, Point fromPoint, Point currentPoint) {
    //paintingNode->drawSegment(fromPoint, currentPoint, 5, Color4F(14 / 255.0f, 221 / 255.0f, 23 / 255.0f, 1.0f));
    
    paintingNode->drawDot(currentPoint, 25, Color4F(14 / 255.0f, 221 / 255.0f, 23 / 255.0f, 1.0f));
}

