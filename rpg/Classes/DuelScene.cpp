//
//  DuelScene.cpp
//  rpg
//
//  Created by Srikanth Talapadi on 22/06/16.
//
//

#include "DuelScene.h"
#include "HPMeter.h"
#include "puzzle/AlphabetGrid.h"
#include "ui/CocosGUI.h"
#include "editor-support/cocostudio/CocoStudio.h"


USING_NS_CC;

Scene* DuelScene::createScene()
{
    auto scene = Scene::create();
    
    auto layer = DuelScene::create();
    
    scene->addChild(layer);
    
    return scene;
}

bool DuelScene::init()
{
    if (!LayerColor::initWithColor(Color4B::BLUE)) {
        return false;
    }
    
    Size visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();

    const int numRows = 5;
    const int numCols = 5;
    const float squareLength = 100.0;
    std::vector<std::vector<char>> charArray {
        {'A','B','C','D','E'},
        {'A','B','C','D','E'},
        {'A','B','C','D','E'},
        {'A','B','C','D','E'},
        {'A','B','C','D','E'}
    };
    auto alphabetGrid = AlphabetGrid::create(squareLength * numRows, squareLength * numCols, numRows, numCols, charArray);
    alphabetGrid->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    addChild(alphabetGrid);
//    
//    auto timerBar = cocos2d::ui::LoadingBar::create("HelloWorld.png", 75.0);
//    timerBar->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
//    addChild(timerBar);
    
//    auto prog = cocos2d::ui::Slider::create();
    auto prog = HPMeter::create();
//    prog->loadBarTexture("hp_out.png");
//    prog->loadProgressBarTexture("hp_in.png");
//    prog->setScale9Enabled(true);
    prog->setPercent(100);
    prog->setPosition(Vec2(origin.x + visibleSize.width / 2, origin.y + visibleSize.height / 2));
    addChild(prog);
    
    auto timer = ActionTween::create(2, "percent", 100.0, 0.0);
    prog->runAction(timer);
    
    auto particle = cocos2d::ParticleMeteor::create();
    addChild(particle);

    auto moveTo = JumpTo::create(2, Vec2(particle->getPositionX() + 200.0, particle->getPositionY() + 500.0), 0.0, 1);
    auto callbackJump = CallFunc::create(CC_CALLBACK_0(DuelScene::hello, this, particle));
 
    auto sequence = Sequence::create(moveTo, callbackJump, NULL);
    particle->runAction(sequence);

//    auto expo = cocos2d::ParticleExplosion::create();
//    expo->setPosition(Vec2(origin.x + visibleSize.width / 4, origin.y + visibleSize.height / 2));
//    addChild(expo);

    Node *rootNode = CSLoader::createNode("english/Y.csb");
    this->addChild(rootNode);
    
    Node *alphaNode = rootNode->getChildByName("BitmapFontLabel_1");
    auto alphaPosition = alphaNode->getPosition();
    alphaNode->setPosition(Vec2::ZERO);
    rootNode->removeChild(alphaNode, false);
    
    auto target = Sprite::create("star.png");
    auto maskedFill = ClippingNode::create(alphaNode);
    maskedFill->setPosition(alphaPosition);
    maskedFill->setAlphaThreshold(0.9);
    maskedFill->addChild(target);
    Texture2D::TexParams tp = {GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT};
    target->getTexture()->setTexParameters(tp);
    target->setTextureRect(Rect(0, 0, 1280, 1280));
    rootNode->addChild(maskedFill, -1);
    rootNode->setAnchorPoint(Vec2::ANCHOR_MIDDLE_BOTTOM);
    auto scaleBy = ScaleBy::create(0.5, 1.05, 0.95);
    auto rev = scaleBy->reverse();
    auto seq = Sequence::create(scaleBy, rev, NULL);
    auto forever = RepeatForever::create(seq);
    rootNode->runAction(forever);
    
    return true;
}

void DuelScene::hello(Node* node)
{
    CCLOG("hello");
    removeChild(node);
}
