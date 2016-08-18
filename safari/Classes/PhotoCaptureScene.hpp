//
//  PhotoCaptureScene.hpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 17/08/16.
//
//

#ifndef PhotoCaptureScene_hpp
#define PhotoCaptureScene_hpp

#include "cocos2d.h"
#include "extensions/cocos-ext.h"
#include "network/HttpClient.h"
#include "lang/SafariAnalyticsManager.h"
#include "ScrollableGameMapScene.hpp"

class PhotoCaptureScene : public cocos2d::Layer
{
public:
    static cocos2d::Scene* createScene();
    
    virtual bool init();
    
    CREATE_FUNC(PhotoCaptureScene);
    
    void createSprite(float dt);
    
    static std::string photoUrl;
    
private:
    cocos2d::Sprite* photoSprite;
    cocos2d::DrawNode *_overlay;
    cocos2d::DrawNode *_overlayOuter;
    
    void takePhoto(cocos2d::Ref* pSender, cocos2d::ui::Widget::TouchEventType eEventType);
};

#endif /* PhotoCaptureScene_hpp */
