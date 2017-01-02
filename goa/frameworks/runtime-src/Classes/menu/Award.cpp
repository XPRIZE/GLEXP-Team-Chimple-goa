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

	_tab = ui::TabControl::create();
	_tab->setContentSize(Size(visibleSize.width, visibleSize.height));
	_tab->setAnchorPoint(Vec2(0.5, 0.5));
	_tab->setHeaderHeight(300.f);
	_tab->setHeaderWidth(370.f);
	_tab->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	_tab->setHeaderDockPlace(ui::TabControl::Dock::TOP);

	auto rewards = ScoreBoardContext::getRewards();

	auto header1 = ui::TabHeader::create("tab1", "tab/bluetab_deselected.png", "tab/bluetab_selected.png");
	header1->setName("0");
	/*header1->setTitleText("background");*/
	
	auto header2 = ui::TabHeader::create("tab2", "tab/greentab_deselected.png", "tab/greentab_selected.png");
	header2->setName("2");
	
	auto header3 = ui::TabHeader::create("tab3", "tab/orangetab_deselected.png", "tab/orangetab_selected.png");
	header3->setName("3");
	
	auto header4 = ui::TabHeader::create("tab4", "tab/purpletab_deselected.png", "tab/purpletab_selected.png");
	header4->setName("4");

	auto header5 = ui::TabHeader::create("tab5", "tab/redtab_deselected.png", "tab/redtab_selected.png");
	header4->setName("5");

	auto header6 = ui::TabHeader::create("tab6", "tab/yellowtab_deselected.png", "tab/yellowtab_selected.png");
	header4->setName("6");


	auto container1 = ui::Layout::create();
	container1->setOpacity(255);
	container1->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container1->setBackGroundColor(Color3B::GRAY);
	container1->setBackGroundColorOpacity(255);
	auto container2 = ui::Layout::create();
	container2->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container2->setOpacity(255);
	container2->setBackGroundColor(Color3B::BLUE);
	container2->setBackGroundColorOpacity(255);
	
	auto container3 = ui::Layout::create();
	container3->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container3->setOpacity(255);
	container3->setBackGroundColor(Color3B::RED);
	container3->setBackGroundColorOpacity(255);

	auto container4 = ui::Layout::create();
	container4->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container4->setOpacity(255);
	container4->setBackGroundColor(Color3B::ORANGE);
	container4->setBackGroundColorOpacity(255);

	auto container5 = ui::Layout::create();
	container5->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container5->setOpacity(255);
	container5->setBackGroundColor(Color3B::YELLOW);
	container5->setBackGroundColorOpacity(255);

	auto container6 = ui::Layout::create();
	container6->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container6->setOpacity(255);
	container6->setBackGroundColor(Color3B::MAGENTA);
	container6->setBackGroundColorOpacity(255);

	/*static const std::string REWARD_STICKER = "s";
static const std::string REWARD_PATCH = "p";
static const std::string REWARD_MEDAL = "m";
static const std::string REWARD_GEM = "g";
static const std::string REWARD_CANDY = "c";
static const std::string REWARD_BADGE = "b";
*/
	objectsAddInTabContainer(container6, "tab/yellowtile.png", rewards.at("b"));
	//objectsAddInTabContainer(container5, "tab/redtile.png", rewards.at("c"));
	//objectsAddInTabContainer(container4, "tab/purpletile.png", rewards.at("g"));
	//objectsAddInTabContainer(container3, "tab/orangetile.png", rewards.at("m"));
	//objectsAddInTabContainer(container2, "tab/greentile.png", rewards.at("p"));
	objectsAddInTabContainer(container1, "tab/bluetile.png",rewards.at("s"));

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

void Award::objectsAddInTabContainer(cocos2d::Node * parent, std::string tile, std::map<std::string, int> rewardsInfo)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto scrollView6 = ui::ScrollView::create();
	scrollView6->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView6->setContentSize(Size(visibleSize.width, visibleSize.height - 300));
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
		for (int j = 0; j < 4; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 5; i++) {
				if (numberOfRewards < imagePath.size()) {
					float xx = visibleSize.width / 5;
					std::string path = "rewards/" + imagePath.at(numberOfRewards) + ".png";
					auto child = Sprite::create(path);
					child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
					scrollView6->addChild(child);
					numberOfRewards++;
				}
			}
		}
	}
	scrollView6->setInnerContainerSize(Size(numberOfPages * visibleSize.width, visibleSize.height* 0.8));
	parent->addChild(scrollView6);

}
