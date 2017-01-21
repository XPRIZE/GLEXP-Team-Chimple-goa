//
//  PhotoCaptureScene.cpp
//  safari
//
//  Created by Shyamal  Upadhyaya on 17/08/16.
//
//

#include "PhotoCaptureScene.hpp"
#include "SimpleAudioEngine.h"

#if( CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID )
#include <jni.h>
#include "platform/android/jni/JniHelper.h"
#endif


USING_NS_CC;

std::string PhotoCaptureScene::photoUrl = " ";


#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
extern "C"
{
    jboolean Java_org_cocos2dx_javascript_AppActivity_photoDestinationURL(JNIEnv* env, jobject thiz,jstring textStr)
    {
        const char* str;
        str = env->GetStringUTFChars(textStr, NULL);
        std::string tempStr(str);
        if(!tempStr.empty()) {
            CCLOG("Received string %s", tempStr.c_str());
            PhotoCaptureScene::photoUrl = tempStr;
        }
        
        return true;
    }
}
#endif

Scene* PhotoCaptureScene::createScene()
{
    // 'scene' is an autorelease object
    auto scene = Scene::create();
    
    // 'layer' is an autorelease object
    auto layer = PhotoCaptureScene::create();
    
    // add layer as a child to scene
    scene->addChild(layer);

    // return the scene
    return scene;
}

void PhotoCaptureScene::createSprite(float dt) {
    CCLOG("CALLING CRATE SPRITE");
    if(PhotoCaptureScene::photoUrl.empty()) {
        CCLOG("NOT PHOTO AVAILABLE TO CRATE SPRITE");
    }
    
    CCLOG("PhotoCaptureScene::photoUrl %s", PhotoCaptureScene::photoUrl.c_str());
    
    if(!PhotoCaptureScene::photoUrl.empty() && PhotoCaptureScene::photoUrl != "CANCELLED") {
        CCLOG("%s", PhotoCaptureScene::photoUrl.c_str());
        this->unschedule(CC_SCHEDULE_SELECTOR(PhotoCaptureScene::createSprite));
        SafariAnalyticsManager::getInstance()->addPhoto(PhotoCaptureScene::photoUrl.c_str());
        std::string userPhotoUrl = SafariAnalyticsManager::getInstance()->getLatestUserPhoto();
        if(!userPhotoUrl.empty() && userPhotoUrl != "CANCELLED") {
            Director::getInstance()->getTextureCache()->addImage(userPhotoUrl);
        }
        Director::getInstance()->replaceScene(ScrollableGameMapScene::createScene());
    } else {
        Director::getInstance()->replaceScene(PhotoCaptureScene::createScene());
    }
}


// on "init" you need to initialize your instance
bool PhotoCaptureScene::init()
{
    //////////////////////////////
    // 1. super init first
    if ( !Layer::init() )
    {
        return false;
    }
    
    auto visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    
    Texture2D *texture = Director::getInstance()->getTextureCache()->addImage("gamemap/game_tile.png");

    Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
    texture->setTexParameters(&tp);
    this->backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width * 1, visibleSize.height));
    this->backgroundSpriteMapTile->setPosition(Vec2( 1 * visibleSize.width/2, visibleSize.height/2 ));
    addChild(this->backgroundSpriteMapTile);
    
    
    std::string buttonNormalIcon = "menu/camera.png";
    std::string buttonPressedIcon = "menu/camera_disabled.png";
    this->photoButton = ui::Button::create(buttonNormalIcon, buttonPressedIcon);
    this->photoButton->setName("photo_button");
    this->photoButton->setPosition(Vec2(visibleSize.width/2, visibleSize.height/2));
    this->photoButton->addTouchEventListener(CC_CALLBACK_2(PhotoCaptureScene::takePhoto, this));
    addChild(this->photoButton);
    
    return true;
}

void PhotoCaptureScene::takePhoto(Ref* pSender, ui::Widget::TouchEventType eEventType)
{
    switch (eEventType) {
        case ui::Widget::TouchEventType::BEGAN:
            break;
        case ui::Widget::TouchEventType::MOVED:
            break;
        case ui::Widget::TouchEventType::ENDED:
        {
            this->backgroundSpriteMapTile->setVisible(false);
            this->photoButton->setVisible(false);
            Node* loadingNode = CSLoader::createNode("loading/loading.csb");
            auto visibleSize = Director::getInstance()->getVisibleSize();
            loadingNode->setPosition(visibleSize.width/2,visibleSize.height/2);
            addChild(loadingNode);
            
            cocostudio::timeline::ActionTimeline* loadingAnimation = CSLoader::createTimeline("loading/loading.csb");
            loadingNode->runAction(loadingAnimation);
            loadingAnimation->play("loading", true);
                        
            #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
                cocos2d::JniMethodInfo methodInfo;
                this->schedule(CC_SCHEDULE_SELECTOR(PhotoCaptureScene::createSprite), 1.0);
                if (! cocos2d::JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/javascript/AppActivity", "takePhoto", "()V")) {
                    return;
                }
                methodInfo.env->CallStaticVoidMethod(methodInfo.classID, methodInfo.methodID);
                methodInfo.env->DeleteLocalRef(methodInfo.classID);
                        
            #endif
            
            break;
        }
            
        case ui::Widget::TouchEventType::CANCELED:
            break;
        default:
            break;
    }
    
}

