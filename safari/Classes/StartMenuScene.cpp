//
//  StartMenuScene.cpp
//  safari
//
//  Created by Srikanth Talapadi on 14/07/16.
//
//

#include "StartMenuScene.h"
#include "HelloWorldScene.h"
#include "alphamon/SelectAlphamonScene.h"
#include "mini_games/PatchTheWallScene.h"

USING_NS_CC;

StartMenu::StartMenu(){
    
}

StartMenu::~StartMenu() {
    
}

Scene *StartMenu::createScene() {
    auto scene = Scene::create();
    auto layer = StartMenu::create();
    scene->addChild(layer);
    return scene;
}

bool StartMenu::init() {
    if (!LayerGradient::initWithColor(Color4B(255, 159, 0, 255), Color4B::WHITE)){
        return false;
    }
    auto menuItem1 = MenuItemLabel::create(Label::createWithTTF("Camp", "fonts/arial.ttf", 100),
                                           [&](Ref *sender) {
                                               Director::getInstance()->replaceScene(HelloWorld::createScene("camp","","","",""));
                                           });
    auto menuItem2 = MenuItemLabel::create(Label::createWithTTF("Alphamon", "fonts/arial.ttf", 100),
                                           [&](Ref *sender) {
                                               Director::getInstance()->replaceScene(SelectAlphamon::createScene());
                                           });
	auto menuItem3 = MenuItemLabel::create(Label::createWithTTF("Patch The Wall", "fonts/arial.ttf", 100),
		[&](Ref *sender) {
		Director::getInstance()->replaceScene(PatchTheWall::createScene());
	});
	auto menu = Menu::create(menuItem1, menuItem2, menuItem3, NULL);
    menu->alignItemsVertically();
    
    addChild(menu);

    return true;
}