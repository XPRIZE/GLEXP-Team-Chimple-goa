//
//  MapIsland.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 26/07/16.
//
//

#include "MapIsland.h"


USING_NS_CC;

MapIsland::MapIsland():
island("")
{
    this->node = NULL;
}


MapIsland::~MapIsland() {
    
}


MapIsland* MapIsland::create(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes)
{
    auto island = new MapIsland();
    if (island && island->initialize(node, attributes)) {
        island->autorelease();
        return island;
    }
    CC_SAFE_DELETE(island);
    return nullptr;
}


bool MapIsland::initialize(cocos2d::Node* node, std::unordered_map<std::string,std::string> attributes) {
    
    node->removeFromParent();
    
    this->node = node;
    this->setName(node->getName());
    this->setAttributes(attributes);
    this->addChild(this->node);
    
    auto listenerTouches = EventListenerTouchOneByOne::create();
    listenerTouches->setSwallowTouches(true);
    listenerTouches->onTouchBegan = CC_CALLBACK_2(MapIsland::onTouchBegan, this);
    listenerTouches->onTouchEnded = CC_CALLBACK_2(MapIsland::touchEnded, this);
    this->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listenerTouches, this);
    
    return true;
}

cocos2d::Node* MapIsland::getNode() {
    return this->node;
}

void MapIsland::setAttributes(std::unordered_map<std::string, std::string> attributes) {
    this->attributes = attributes;
    //process it
    
    std::unordered_map<std::string,std::string>::const_iterator it = this->attributes.find("island");
    if ( it != this->attributes.end() ) {
        this->setIsland(it->second);
    }
}

std::unordered_map<std::string, std::string> MapIsland::getAttributes() {
    return this->attributes;
}


bool MapIsland::onTouchBegan(Touch *touch, Event *event)
{
    auto n = this->convertTouchToNodeSpace(touch);
    Rect boundingBoxRect = Rect::ZERO;
    boundingBoxRect = this->getNode()->getBoundingBox();
    
    if(boundingBoxRect.containsPoint(n)) {
        return true;
    }
    
    return false;
}

void MapIsland::touchEnded(Touch *touch, Event *event)
{
    Director::getInstance()->replaceScene(HelloWorld::createScene(this->getIsland(),"", true));
}
