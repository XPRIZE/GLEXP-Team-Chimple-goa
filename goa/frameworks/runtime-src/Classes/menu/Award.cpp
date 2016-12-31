//
//  Award.cpp 
//  goa
//
//  Created by Kirankumar CS on 28/12/16
//
//

#include "Award.h"

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
	_tab->setHeaderWidth(390.f);
	//_tab->setHeaderSelectedZoom(.1f);
	_tab->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	_tab->setHeaderDockPlace(ui::TabControl::Dock::TOP);

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
	auto scrollView = ui::ScrollView::create();
	scrollView->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView->setContentSize(Size(visibleSize.width,visibleSize.height * 0.8));
	
	for (int k = 0; k < 3; k++) {
		for (int j = 0; j < 3; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 4; i++) {
				float xx = visibleSize.width / 4;
				auto child = Sprite::create("menu/back.png");
				child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
				scrollView->addChild(child);
			}
		}
	}
	scrollView->setInnerContainerSize(Size(3 * visibleSize.width, visibleSize.height* 0.8));
//	container1->addChild(scrollView);



	auto container3 = ui::Layout::create();
	container3->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container3->setOpacity(255);
	container3->setBackGroundColor(Color3B::RED);
	container3->setBackGroundColorOpacity(255);

	


	auto scrollView1 = ui::ScrollView::create();
	scrollView1->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView1->setContentSize(Size(visibleSize.width, visibleSize.height * 0.8));
	for (int k = 0; k < 3; k++) {
		for (int j = 0; j < 3; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 4; i++) {
				float xx = visibleSize.width / 4;
				auto child = Sprite::create("menu/map.png");
				child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
				scrollView1->addChild(child);

			}
		}
	}
	scrollView1->setInnerContainerSize(Size(3 * visibleSize.width, visibleSize.height* 0.8));
//	container2->addChild(scrollView1);


	auto scrollView3 = ui::ScrollView::create();
	scrollView3->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView3->setContentSize(Size(visibleSize.width, visibleSize.height * 0.8));
	for (int k = 0; k < 3; k++) {
		for (int j = 0; j < 3; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 4; i++) {
				float xx = visibleSize.width / 4;
				auto child = Sprite::create("menu/book.png");
				child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
				scrollView3->addChild(child);

			}
		}
	}
	scrollView3->setInnerContainerSize(Size(3 * visibleSize.width, visibleSize.height* 0.8));
//	container3->addChild(scrollView3);



	auto container4 = ui::Layout::create();
	container4->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container4->setOpacity(255);
	container4->setBackGroundColor(Color3B::ORANGE);
	container4->setBackGroundColorOpacity(255);

	auto scrollView4 = ui::ScrollView::create();
	scrollView4->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView4->setContentSize(Size(visibleSize.width, visibleSize.height * 0.8));
	for (int k = 0; k < 3; k++) {
		for (int j = 0; j < 3; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 4; i++) {
				float xx = visibleSize.width / 4;
				auto child = Sprite::create("menu/happy.png");
				child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
				scrollView4->addChild(child);

			}
		}
	}
	scrollView4->setInnerContainerSize(Size(3 * visibleSize.width, visibleSize.height* 0.8));
//	container4->addChild(scrollView4);


	auto container5 = ui::Layout::create();
	container5->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container5->setOpacity(255);
	container5->setBackGroundColor(Color3B::YELLOW);
	container5->setBackGroundColorOpacity(255);

	auto scrollView5 = ui::ScrollView::create();
	scrollView5->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView5->setContentSize(Size(visibleSize.width, visibleSize.height * 0.8));
	for (int k = 0; k < 3; k++) {
		for (int j = 0; j < 3; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 4; i++) {
				float xx = visibleSize.width / 4;
				auto child = Sprite::create("menu/backpack_icon.png");
				child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
				scrollView5->addChild(child);

			}
		}
	}
	scrollView5->setInnerContainerSize(Size(3 * visibleSize.width, visibleSize.height* 0.8));
	//container5->addChild(scrollView5);



	auto container6 = ui::Layout::create();
	container6->setBackGroundColorType(ui::Layout::BackGroundColorType::SOLID);
	container6->setOpacity(255);
	container6->setBackGroundColor(Color3B::MAGENTA);
	container6->setBackGroundColorOpacity(255);

	auto scrollView6 = ui::ScrollView::create();
	scrollView6->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView6->setContentSize(Size(visibleSize.width, visibleSize.height * 0.8));
	for (int k = 0; k < 3; k++) {
		for (int j = 0; j < 3; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 4; i++) {
				float xx = visibleSize.width / 4;
				auto child = Sprite::create("menu/camera.png");
				child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
				scrollView6->addChild(child);

			}
		}
	}
	scrollView6->setInnerContainerSize(Size(3 * visibleSize.width, visibleSize.height* 0.8));
	//container6->addChild(scrollView6);

	objectsAddInTabContainer(container6, "tab/yellowtile.png");
	objectsAddInTabContainer(container5, "tab/redtile.png");
	objectsAddInTabContainer(container4, "tab/purpletile.png");
	objectsAddInTabContainer(container3, "tab/orangetile.png");
	objectsAddInTabContainer(container2, "tab/greentile.png");
	objectsAddInTabContainer(container1, "tab/bluetile.png");

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

void Award::objectsAddInTabContainer(cocos2d::Node * parent, std::string tile)
{
	Size visibleSize = Director::getInstance()->getVisibleSize();
	auto scrollView6 = ui::ScrollView::create();
	scrollView6->setDirection(ui::ScrollView::Direction::HORIZONTAL);
	scrollView6->setContentSize(Size(visibleSize.width, visibleSize.height - 300));
	//scrollView6->setAnchorPoint(Vec2(0, 1));
	//scrollView6->setPosition(Vec2(0, parent->getContentSize().height));
	Texture2D *texture = Director::getInstance()->getTextureCache()->addImage(tile);
	Texture2D::TexParams tp = { GL_LINEAR, GL_LINEAR, GL_REPEAT, GL_REPEAT };
	texture->setTexParameters(&tp);
	Sprite *backgroundSpriteMapTile = Sprite::createWithTexture(texture, Rect(0, 0, visibleSize.width * 3, visibleSize.height));
	backgroundSpriteMapTile->setPosition(Vec2(3 * visibleSize.width / 2, visibleSize.height / 2));
	scrollView6->addChild(backgroundSpriteMapTile);


	for (int k = 0; k < 3; k++) {
		for (int j = 0; j < 3; j++) {
			float yy = visibleSize.height * 0.2;
			for (int i = 0; i < 4; i++) {
				float xx = visibleSize.width / 4;
				auto child = Sprite::create("menu/camera.png");
				child->setPosition(Vec2((xx / 2 + (xx * i)) + (k * visibleSize.width), yy + (yy * j)));
				scrollView6->addChild(child);

			}
		}
	}
	scrollView6->setInnerContainerSize(Size(3 * visibleSize.width, visibleSize.height* 0.8));
	parent->addChild(scrollView6);

}
