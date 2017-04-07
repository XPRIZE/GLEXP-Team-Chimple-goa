#include "Phonicsfree.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include <sstream>
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

Phonicsfree::Phonicsfree() {
}

Phonicsfree::~Phonicsfree() {
}


Scene* Phonicsfree::createScene()
{
	auto scene = Scene::create();
	auto layer = Phonicsfree::create();
	scene->addChild(layer);
    layer->_menuContext = MenuContext::create(layer, Phonicsfree::gameName());
    scene->addChild(layer->_menuContext);
	return scene;
}

bool Phonicsfree::init()
{
	if (!Layer::init())
	{
		return false;
	}

	return true;
}

void Phonicsfree::onEnterTransitionDidFinish()
{
		phonicsfreebg = (Node *)CSLoader::createNode("phonicsfree/phonicsfree.csb");
		this->addChild(phonicsfreebg);

		_visibleSize = Director::getInstance()->getVisibleSize();

//		phonicsfreebg->getChildren().at(7)->setPosition(Vec2(10, 50));
//		phonicsfreebg->getChildren().at(8)->setPosition(Vec2(10, 250));
//		phonicsfreebg->getChildren().at(9)->setPosition(Vec2(10, 650));
//		phonicsfreebg->getChildren().at(10)->setPosition(Vec2(10, 1000));

		_scrollView = ui::ScrollView::create();
		_scrollView->setClippingEnabled(true);
		_scrollView->setContentSize(Size(230, 1100));
		_scrollView->setDirection(ui::ScrollView::Direction::VERTICAL);
		_scrollView->getInnerContainer()->setLayoutType(ui::Layout::Type::VERTICAL);
		_scrollView->setInnerContainerSize(Size(230, (470 * 28)));
		_scrollView->setPosition(Vec2(_visibleSize.width * .30, _visibleSize.height * .05));
		this->addChild(_scrollView);
		_scrollView->setScrollBarOpacity(0);

		const Size buttonSize(250, 250);

		//Widget test
		for (int i = 1; i < 27; i++)
		{
			SpriteDetails._sprite = ui::Scale9Sprite::createWithSpriteFrameName("phonicsfree/cubes.png");
			SpriteDetails._sprite->setContentSize(buttonSize);
			SpriteDetails._sprite->setAnchorPoint(Vec2(0, 0));
			SpriteDetails._sprite->setPosition(Vec2(10, i * 470));
			SpriteDetails._sequence = i;
			_scrollView->addChild(SpriteDetails._sprite);
			_spriteDetails.push_back(SpriteDetails);
		}

		addEvents();
}


void Phonicsfree::addEvents()
{
	auto listener = cocos2d::EventListenerTouchOneByOne::create();
	listener->setSwallowTouches(true);

	listener->onTouchBegan = [=] (cocos2d::Touch *touch, cocos2d::Event *event)
	{
		auto target = static_cast<Sprite*>(event->getCurrentTarget());
		Point locationInNode = target->convertToNodeSpace(touch->getLocation());
		Size size = target->getContentSize();
		Rect rect = Rect(0, 0, size.width, size.height);

		if (rect.containsPoint(locationInNode))
		{
			Sprite *sp = (Sprite*) phonicsfreebg->getChildren().at(8);
//			Vec2 pos = sp->setPosition();
			Rect r1 = Rect((sp->getPositionX() - sp->getContentSize().width / 2), (sp->getPositionY() - sp->getContentSize().height / 2), sp->getContentSize().width, sp->getContentSize().height);
			Vec2 anchorX = sp->getAnchorPoint();

//			cocos2d::ui::Widget *wd = _scrollView->getCurrentFocusedWidget();

			Vec2 vv = _scrollView->getWorldPosition();
			
			for (int i = 0; i < _scrollView->getChildrenCount(); i++)
			{
				Point p = _scrollView->getParent()->convertToWorldSpace(_scrollView->getChildren().at(i)->getPosition());

				if (r1.containsPoint(p))
				{
					CCLOG("done %d", _spriteDetails.at(i)._sequence);
//					break;
				}
			}

//			CCLOG("hello world");
			return true;
		}
		return false;
	};

//	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener, sprite.container);
	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), phonicsfreebg->getChildren().at(13));
}

