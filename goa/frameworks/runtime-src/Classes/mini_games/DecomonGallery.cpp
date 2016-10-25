//
//  DecomonGallery.cpp 
//  goa
//
//  Created by Kirankumar CS on 18/10/16
//
//



#include "DecomonGallery.h"
#include "Decomon.h"

USING_NS_CC;


//DecomonGallery * DecomonGallery::create()
//{
//	DecomonGallery* decomon = new (std::nothrow) DecomonGallery();
//	if (decomon && decomon->init()) {
//		decomon->autorelease();
//		return decomon;
//	}
//	CC_SAFE_DELETE(decomon);
//	return nullptr;
//}
cocos2d::Scene * DecomonGallery::createScene()
{
	auto scene = cocos2d::Scene::create();
	auto layer = DecomonGallery::create();
	scene->addChild(layer);

	layer->menu = MenuContext::create(layer, "decomon");
	scene->addChild(layer->menu);
	return scene;
}

DecomonGallery::DecomonGallery()
{
}

DecomonGallery::~DecomonGallery()
{

}


bool DecomonGallery::init() {
	if (!ScrollView::init())
	{
		return false;
	}


	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();
	std::string ICONS = ICON_FOLDER;

	auto spriteCache = SpriteFrameCache::getInstance();
	spriteCache->addSpriteFramesWithFile("gamemap/gamemap.plist");

	auto fullpath = FileUtils::sharedFileUtils()->getWritablePath() + "decomon.txt";

	std::string contents = FileUtils::getInstance()->getStringFromFile(fullpath);

	std::vector<std::string> elems;

	std::stringstream ss;
	ss.str(contents);
	std::string item;
	while (std::getline(ss, item, '%')) {
		elems.push_back(item);
	}

	const int numRows = 1;
	const int numCols = 2;

	const int numberOfPages = ceil((float)elems.size() / (numRows * numCols));


	Texture2D *texture = Director::getInstance()->getTextureCache()->addImage("gamemap/game_tile.png");
	Texture2D::TexParams tp = { GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT };
	texture->setTexParameters(&tp);
	Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width * numberOfPages, visibleSize.height));
	backgroundSpriteMapTile->setPosition(Vec2(numberOfPages * visibleSize.width / 2, visibleSize.height / 2));
	addChild(backgroundSpriteMapTile);

	Sprite* backgroundSpriteMap = Sprite::createWithSpriteFrameName("gamemap/game_map_bg2.png");
	backgroundSpriteMap->setPosition(Vec2(numberOfPages * visibleSize.width / 2, visibleSize.height / 2));
	addChild(backgroundSpriteMap);

	Sprite* backgroundSpriteSideLeft = Sprite::createWithSpriteFrameName("gamemap/side.png");
	backgroundSpriteSideLeft->setAnchorPoint(Vec2(0, 0.5));
	backgroundSpriteSideLeft->setPosition(Vec2(0, visibleSize.height / 2));
	addChild(backgroundSpriteSideLeft);


	_layer = Layer::create();


	Sprite* backgroundSpriteSideRight = Sprite::createWithSpriteFrameName("gamemap/side.png");
	backgroundSpriteSideRight->setScaleX(-1.0f);
	backgroundSpriteSideRight->setAnchorPoint(Vec2(1, 0.5));
	backgroundSpriteSideRight->setPosition(Vec2((visibleSize.width - backgroundSpriteSideRight->getBoundingBox().size.width / 2) * numberOfPages, visibleSize.height / 2));
	addChild(backgroundSpriteSideRight);



	int index = 0;
	int initialYOffSet = 1;

	for (int k = 0; k < numberOfPages; k++) {

		for (int i = 0; i < numRows; i++) {
			for (int j = 0; j < numCols; j++) {
				if (index < elems.size()) {
					std::string gameName = elems.at(index);
					auto sp = Sprite::create(elems.at(index), Rect(visibleSize.width * 0.2, visibleSize.height * 0.1, visibleSize.width * 0.6, visibleSize.height * 0.5));
					sp->setPosition(Vec2(k * visibleSize.width + (j + 0.5) * visibleSize.width / numCols, visibleSize.height - (2 * i + initialYOffSet) * (visibleSize.height / numCols) - 30));
					//sp->setAnchorPoint(Vec2(0, 0));
					CCLOG("path %s", gameName.c_str());
					//sp->setScale(0.5);
					this->addChild(sp);
				}
				index++;
			}
		}
	}

	_layer->setContentSize(Size(visibleSize.width * numberOfPages, visibleSize.height));
	_layer->setPosition(Vec2(0, 0));
	addChild(_layer);
	setContentSize(visibleSize);
	setDirection(cocos2d::ui::ScrollView::Direction::HORIZONTAL);
	setInnerContainerSize(_layer->getContentSize());
	setBackGroundColorType(cocos2d::ui::Layout::BackGroundColorType::GRADIENT);
	setBackGroundColor(Color3B(255, 159, 0), Color3B::WHITE);
	return true;
}
