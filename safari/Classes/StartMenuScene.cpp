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
#include "puzzle/DuelScene.h"
#include "mini_games/PatchTheWallScene.h"
#include "mini_games/CrossTheBridgeScene.h"
#include "mini_games/SmashTheRockLevelScene.h"
#include "mini_games/EndlessRunner.h"
#include "mini_games/TraceScene.h"

USING_NS_CC;

static const std::string DUEL_SCENE = "DuelScene";
static const std::string ALPHAMON_COMBAT = "AlphamonCombat";

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
    if (!LayerGradient::initWithColor(Color4B(255, 159, 0, 255), Color4B::BLUE)){
        return false;
    }
    auto menuItem1 = MenuItemLabel::create(Label::createWithTTF("Camp", "fonts/arial.ttf", 100),
                                           [&](Ref *sender) {
                                               Director::getInstance()->replaceScene(HelloWorld::createScene("camp","",""));
                                           });
    auto menuItem2 = MenuItemLabel::create(Label::createWithTTF(ALPHAMON_COMBAT, "fonts/arial.ttf", 100),
                                           [&](Ref *sender) {
                                               startScene(ALPHAMON_COMBAT);
                                           });
	auto menuItem3 = MenuItemLabel::create(Label::createWithTTF("Patch The Wall", "fonts/arial.ttf", 100),
		[&](Ref *sender) {
		Director::getInstance()->replaceScene(PatchTheWall::createScene());
	});
	auto menuItem4 = MenuItemLabel::create(Label::createWithTTF("Cross The Bridge", "fonts/arial.ttf", 100),
		[&](Ref *sender) {
		Director::getInstance()->replaceScene(CrossTheBridge::createScene());
	});
	auto menuItem5 = MenuItemLabel::create(Label::createWithTTF("Smash The Rock", "fonts/arial.ttf", 100),
		[&](Ref *sender) {
		Director::getInstance()->replaceScene(SmashTheRockLevelScene::createScene());
	});
	auto menuItem7 = MenuItemLabel::create(Label::createWithTTF("EndlessRunner", "fonts/arial.ttf", 100),
		[&](Ref *sender) {
		Director::getInstance()->replaceScene(EndlessRunner::createScene());
	});
	auto menuItem8 = MenuItemLabel::create(Label::createWithTTF("Kung Fu Alpha", "fonts/arial.ttf", 100),
		[&](Ref *sender) {
		Director::getInstance()->replaceScene(Trace::createScene('a'));
	});
	auto menu = Menu::create(menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem7, menuItem8, NULL);
    menu->alignItemsVertically();
    
    addChild(menu);
    
    return true;
}

void StartMenu::startScene(std::string gameName, std::string firstParam, std::string secondParam, std::string thirdParam) {
    if(gameName == ALPHAMON_COMBAT) {
        Director::getInstance()->replaceScene(SelectAlphamon::createScene());
    } else if(gameName == DUEL_SCENE) {
        Director::getInstance()->replaceScene(DuelScene::createScene(firstParam.at(0), secondParam.at(0)));
    }
}
