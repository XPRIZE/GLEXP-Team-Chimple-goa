//
//  Award.cpp 
//  goa
//
//  Created by Kirankumar CS on 28/12/16
//
//

#include "Award.h"
#include "ScoreBoardContext.h"

USING_NS_CC;

cocos2d::Scene * Award::createScene()
{
	auto scene = Scene::create();
	auto layer = Award::create();
	scene->addChild(layer);

	layer->_menu = MenuContext::create(layer, "Award");
	scene->addChild(layer->_menu);
	return scene;
}

Award * Award::create()
{
	Award* award = new (std::nothrow) Award();
	if (award && award->init()) {
		award->autorelease();
		return award;
	}
	CC_SAFE_DELETE(award);
	return nullptr;
}


Award::Award()
{
}

Award::~Award()
{

}



bool Award::init() {
	if (!Layer::init())
	{
		return false;
	}

	Size visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	
	return true;
}

void Award::onEnterTransitionDidFinish()
{
	Size visibleSize = Director::getInstance()->getVisibleSize();


	auto greyLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 255));
	greyLayer->setContentSize(visibleSize);
	addChild(greyLayer);

	_tab = ui::TabControl::create();
	_tab->setContentSize(Size(visibleSize.width, visibleSize.height));
	_tab->setAnchorPoint(Vec2(0.5, 0.5));
	_tab->setHeaderHeight(260.f);
	_tab->setHeaderWidth(390.f);
	_tab->setPosition(Vec2(visibleSize.width / 2, visibleSize.height /2.05));
	_tab->setHeaderDockPlace(ui::TabControl::Dock::TOP);

	auto rewards = ScoreBoardContext::getRewards();

	auto header1 = ui::TabHeader::create("", "tab/stickers_deselected.png", "tab/stickers_selected.png");
	header1->setName("0");
	/*header1->setTitleText("background");*/
	
	auto header2 = ui::TabHeader::create("", "tab/patch_deselected.png", "tab/patch_selected.png");
	header2->setName("2");
	
	auto header3 = ui::TabHeader::create("", "tab/medal_deselected.png", "tab/medal_selected.png");
	header3->setName("3");
	
	auto header4 = ui::TabHeader::create("", "tab/gem_deselected.png", "tab/gem_selected.png"); 
	header4->setName("4");

	auto header5 = ui::TabHeader::create("", "tab/candies_deselected.png", "tab/candies_selected.png");
	header4->setName("5");

	auto header6 = ui::TabHeader::create("", "tab/badges_deselected.png", "tab/badges_selected.png"); 
	header4->setName("6");


	auto container1 = ui::Layout::create();
	container1->setOpacity(255);
	container1->setBackGroundColorOpacity(255);

	auto container2 = ui::Layout::create();
	container2->setOpacity(255);
	container2->setBackGroundColorOpacity(255);
	
	auto container3 = ui::Layout::create();
	container3->setOpacity(255);
	container3->setBackGroundColorOpacity(255);

	auto container4 = ui::Layout::create();
	container4->setOpacity(255);
	container4->setBackGroundColorOpacity(255);

	auto container5 = ui::Layout::create();
	container5->setOpacity(255);
	container5->setBackGroundColorOpacity(255);

	auto container6 = ui::Layout::create();
	container6->setOpacity(255);
	container6->setBackGroundColorOpacity(255);

	/*static const std::string REWARD_STICKER = "s";
static const std::string REWARD_PATCH = "p";
static const std::string REWARD_MEDAL = "m";
static const std::string REWARD_GEM = "g";
static const std::string REWARD_CANDY = "c";
static const std::string REWARD_BADGE = "b";
*/
	auto it = rewards.find("b");
	if (it != rewards.end()) {
		objectsAddInTabContainer(container6, "tab/badges_tile.png", rewards.at("b"), cocos2d::Color3B::WHITE);
	}
	else
	{
		rewardsBackground(container6, "tab/badges_tile.png", cocos2d::Color3B::WHITE);
	}
	

	auto it1 = rewards.find("c");
	if (it1 != rewards.end()) {
		objectsAddInTabContainer(container5, "tab/candies_tile.png", rewards.at("c"), cocos2d::Color3B::WHITE);
	}
	else
	{
		rewardsBackground(container5, "tab/candies_tile.png", cocos2d::Color3B::WHITE);
	}
	
	auto it2 = rewards.find("g");
	if (it2 != rewards.end()) {
		objectsAddInTabContainer(container4, "tab/gem_tile.png", rewards.at("g"), cocos2d::Color3B::WHITE);
	}
	else
	{
		rewardsBackground(container4, "tab/gem_tile.png", cocos2d::Color3B::WHITE);
	}

	auto it3 = rewards.find("m");
	if (it3 != rewards.end()) {
		objectsAddInTabContainer(container3, "tab/medal_tile.png", rewards.at("m"), cocos2d::Color3B::WHITE);
	}
	else
	{
		rewardsBackground(container3, "tab/medal_tile.png", cocos2d::Color3B::WHITE);
	}

	auto it4 = rewards.find("p");
	if (it4 != rewards.end()) {
		objectsAddInTabContainer(container2, "tab/patch_tile.png", rewards.at("p"), cocos2d::Color3B::WHITE);
	}
	else
	{
		rewardsBackground(container2, "tab/patch_tile.png",cocos2d::Color3B::WHITE);
	}
	
	auto it5 = rewards.find("s");
	if (it5 != rewards.end()) {
		objectsAddInTabContainer(container1, "tab/stickers_tile.png", rewards.at("s"),cocos2d::Color3B::BLACK);
	}
	else
	{
		rewardsBackground(container1, "tab/stickers_tile.png", cocos2d::Color3B::BLACK);
	}
	

	_tab->insertTab(0, header1, container1);
	_tab->insertTab(1, header2, container2);
	_tab->insertTab(2, header3, container3);
	_tab->insertTab(3, header4, container4);
	_tab->insertTab(4, header5, container5);
	_tab->insertTab(5, header6, container6);
	_tab->setSelectTab(1);
	addChild(_tab);

}

bool Award::onTouchBegan(cocos2d::Touch * touch, cocos2d::Event * event)
{
	auto target = event->getCurrentTarget();
	auto  location = target->convertToNodeSpace(touch->getLocation());
	Size s = target->getContentSize();
	Rect rect = Rect(0, 0, s.width, s.height);
	if (rect.containsPoint(location)) {
		if (target->getName() == "0") {
			_tab->setSelectTab(0);
		}
		if (target->getName() == "1") {
			_tab->setSelectTab(1);
		}
	}
	return false;
}

void Award::objectsAddInTabContainer(cocos2d::Node * parent, std::string tile, std::map<std::string, int> rewardsInfo, cocos2d::Color3B color)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto scrollView6 = ui::ScrollView::create();
	scrollView6->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView6->setContentSize(Size(visibleSize.width, visibleSize.height - 260.f));
	Texture2D *texture = Director::getInstance()->getTextureCache()->addImage(tile);
	Texture2D::TexParams tp = { GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT };
	texture->setTexParameters(&tp);
	Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width * 3, visibleSize.height));
	backgroundSpriteMapTile->setPosition(Vec2(3 * visibleSize.width / 2, visibleSize.height / 2));
	scrollView6->addChild(backgroundSpriteMapTile);

	int numberOfPages = (std::ceil(rewardsInfo.size() / 20.0f));
	int numberOfRewards = 0;
	std::vector<std::string> imagePath;

	for (auto it = rewardsInfo.begin(); it != rewardsInfo.end(); ++it) {
		imagePath.push_back(it->first);
	}
	for (int k = 0; k < numberOfPages; k++) {
		for (int j = 3; j >= 0; j--) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 5; i++) {
				if (numberOfRewards < imagePath.size()) {
					float xx = visibleSize.width / 5;
					std::string path = "rewards/" + imagePath.at(numberOfRewards) + ".png";
					if (!FileUtils::getInstance()->isFileExist(path)) {
						path = "menu/menu.png";
					}
					auto child = Sprite::create(path);
					child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), visibleSize.height * 0.1 + (yy * j)));
					scrollView6->addChild(child);

					auto drawNode = DrawNode::create();
					drawNode->drawDot(Vec2(child->getContentSize().width,child->getContentSize().height), 30, Color4F(111.0f, 111.0f, 111.0f, 1.0f));
					child->addChild(drawNode);
					
					std::stringstream ss;
					ss << rewardsInfo.at(imagePath.at(numberOfRewards));
					std::string mycharString = ss.str();

					//number of times

					auto targetLabel = Label::createWithTTF(mycharString, "fonts/Roboto-Regular.ttf", 30);
					targetLabel->setColor(Color3B(0, 0, 0));
					targetLabel->setPositionX(child->getContentSize().width);
					targetLabel->setPositionY(child->getContentSize().height);
					drawNode->addChild(targetLabel);

					// reward name

					std::replace(imagePath.at(numberOfRewards).begin(), imagePath.at(numberOfRewards).end(), '_', ' ');
					auto rewardLabel = Label::createWithTTF(LangUtil::getInstance()->translateString(imagePath.at(numberOfRewards).substr(2)), "fonts/Roboto-Regular.ttf", 50);
					rewardLabel->setColor(color);
					rewardLabel->setPositionX(child->getContentSize().width/2);
					child->addChild(rewardLabel);
					numberOfRewards++;
				}
			}
		}
	}
	scrollView6->setInnerContainerSize(Size(numberOfPages * visibleSize.width, visibleSize.height* 0.8));
	parent->addChild(scrollView6);

}

void Award::rewardsBackground(cocos2d::Node * parent, std::string tile, cocos2d::Color3B color)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto scrollView6 = ui::ScrollView::create();
	scrollView6->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView6->setContentSize(Size(visibleSize.width, visibleSize.height - 260));
	Texture2D *texture = Director::getInstance()->getTextureCache()->addImage(tile);
	Texture2D::TexParams tp = { GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT };
	texture->setTexParameters(&tp);
	Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width * 3, visibleSize.height));
	backgroundSpriteMapTile->setPosition(Vec2(3 * visibleSize.width / 2, visibleSize.height / 2));
	scrollView6->addChild(backgroundSpriteMapTile);
	scrollView6->setInnerContainerSize(Size(visibleSize.width, visibleSize.height* 0.8));
	std::string headLabel = LangUtil::getInstance()->translateString("You have not yet earned any rewards");
	auto targetLabel = Label::createWithTTF(headLabel, "fonts/Roboto-Regular.ttf", 150);
	targetLabel->setColor(color);
	targetLabel->setPositionX(visibleSize.width/2);
	targetLabel->setPositionY(visibleSize.height/2);
	parent->addChild(scrollView6);
	parent->addChild(targetLabel);
}
