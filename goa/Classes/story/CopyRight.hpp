//
//  CopyRight.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 06/01/17.
//
//

#ifndef CopyRight_hpp
#define CopyRight_hpp

#include <stdio.h>
#include <unordered_map>
#include "cocos2d.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../hero/RPGConfig.h"
#include "../menu/MenuContext.h"
#include "external/json/document.h"
#include "external/json/stringbuffer.h"
#include "external/json/writer.h"
#include "storage/local-storage/LocalStorage.h"


#endif /* CopyRight_hpp */


class CopyRight : public cocos2d::Layer {
    
public:
    CopyRight();
    
    ~CopyRight();
        
    static cocos2d::Scene* createScene(const std::string& storyId, const std::string& baseDir, int totalPoints, int currentPoints);
    static CopyRight* create(const std::string& storyId, const std::string& baseDir, int totalPoints, int currentPoints);
    virtual bool init(const std::string& storyId, const std::string& baseDir, int totalPoints, int currentPoints);
    
protected:
    std::string baseDir;
    MenuContext * _menuContext;
    
    void configureCopyRightText();
    
    void showScore(float dt);
    
    Node* _copyRightNode;
};

