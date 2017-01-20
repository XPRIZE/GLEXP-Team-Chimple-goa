//
//  MapIsland.h
//  safari
//
//  Created by Shyamal  Upadhyaya on 26/07/16.
//
//

#include <stdio.h>
#include <unordered_map>
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../hero/RPGConfig.h"
#include "../hero/HelloWorldScene.h"


#ifndef MapIsland_h
#define MapIsland_h

class MapIsland : public cocos2d::Node {
public:
    
    static MapIsland* create(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes);
    
    
    virtual cocos2d::Node* getNode();
    
    
protected:
    MapIsland();
    virtual ~MapIsland();
    bool initialize(cocos2d::Node* node, std::unordered_map<std::string, std::string> attributes);

    cocos2d::Node* node;
    
    std::unordered_map<std::string, std::string> attributes;
    
    void setAttributes(std::unordered_map<std::string, std::string> attributes);
    
    std::unordered_map<std::string, std::string> getAttributes();
    
    CC_SYNTHESIZE(std::string, island, Island);
    
    bool onTouchBegan(cocos2d::Touch * touch, cocos2d::Event* event);
    
    void touchEnded(cocos2d::Touch* touch, cocos2d::Event* event);

};

#endif /* MapIsland_h */
