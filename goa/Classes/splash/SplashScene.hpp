//
//  SplashScene.hpp
//  goa
//
//  Created by Shyamal.Upadhyaya on 11/01/17.
//
//

#ifndef SplashScene_hpp
#define SplashScene_hpp

#include <stdio.h>
#include "cocos2d.h"

#define DISPLAY_TIME_SPLASH_SCENE 10.0
#define TRANSITION_TIME 0.5

class SplashScene : public cocos2d::Layer
{
public:
    // there's no 'id' in cpp, so we recommend returning the class instance pointer
    static cocos2d::Scene* createScene();
    
    // Here's a difference. Method 'init' in cocos2d-x returns bool, instead of returning 'id' in cocos2d-iphone
    virtual bool init();
    
    // implement the "static create()" method manually
    CREATE_FUNC(SplashScene);
    
private:
    void loadDepedencies();
    void GoToMainMenuScene( float dt );
    
};

#endif /* SplashScene_hpp */
