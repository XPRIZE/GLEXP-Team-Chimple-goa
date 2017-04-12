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

		const Size buttonSize(230, 250);
		//	12	11
/*		phonicsfreebg->getChildren().at(5)->setPosition(Vec2(170, 100));
		phonicsfreebg->getChildren().at(4)->setPosition(Vec2(170, 1300));
		phonicsfreebg->getChildren().at(3)->setPosition(Vec2(570, 300));
*/
		_visibleSize = Director::getInstance()->getVisibleSize();
		_matrix = CharGenerator::getInstance()->generateCharMatrix(1, 26, true, false);

		_differntPosition = {

			{ 0,
			{
				{ 0, _visibleSize.height * .70 },
				{ 1, _visibleSize.width * .35 },
				{ 2, _visibleSize.width * .65 }
			} },

			{ 1,
			{
				{ 0, _visibleSize.height * .69 },
				{ 1, _visibleSize.width * .32 },
				{ 2, _visibleSize.width * .50 },
				{ 3, _visibleSize.width * .68 }
			} }
		};

		for (int i = 0; i < _differntPosition.at(1).size()-1; i++)
		{
			Sprite *_box = Sprite::createWithSpriteFrameName("phonicsfree/small box.png");
			_box->setPosition(Vec2(_differntPosition.at(1).at(i+1), _differntPosition.at(1).at(0)));
			this->addChild(_box);
			_boxDetails.push_back(_box);

			Sprite *_trans = Sprite::createWithSpriteFrameName("phonicsfree/trans bar_1.png");
			_trans->setPosition(Vec2(_differntPosition.at(1).at(i + 1), _differntPosition.at(1).at(0)));
			this->addChild(_trans);
		}

/*
		//	left column details
		_leftScrollView = ui::ScrollView::create();
		_leftScrollView->setClippingEnabled(true);
		_leftScrollView->setContentSize(Size(230, 1100));
		_leftScrollView->setDirection(ui::ScrollView::Direction::VERTICAL);
		_leftScrollView->getInnerContainer()->setLayoutType(ui::Layout::Type::VERTICAL);
		_leftScrollView->setInnerContainerSize(Size(230, (470 * 28)));
		_leftScrollView->setPosition(Vec2(_visibleSize.width * .285, _visibleSize.height * .37));
		this->addChild(_leftScrollView);
		_leftScrollView->setScrollBarOpacity(0);

		for (int j = 0; j < 1; j++)
		{
			for (int i = 1; i < 27; i++)
			{
				SpriteDetails._label = Alphabet::createWithSize(_matrix[j][i-1], 400);
				SpriteDetails._label->setContentSize(buttonSize);
				SpriteDetails._label->setAnchorPoint(Vec2(0, 0));
				SpriteDetails._label->setPosition(Vec2(0, i * 470));
				SpriteDetails._sequence = i;
				SpriteDetails._id = _matrix[j][i - 1];
				_leftScrollView->addChild(SpriteDetails._label);
				_leftSpriteDetails.push_back(SpriteDetails);
			}
		}

		Sprite *_leftSprite = (Sprite*) phonicsfreebg->getChildren().at(9);
		LayerColor *_leftTopLayer = LayerColor::create(Color4B(71, 221, 214, 100), _leftSprite->getContentSize().width, _leftSprite->getContentSize().height);
		_leftTopLayer->setPosition(Vec2(_leftSprite->getPositionX() - _leftSprite->getContentSize().width / 2, _leftSprite->getPositionY() + _leftSprite->getContentSize().height * .50));
		_leftTopLayer->setAnchorPoint(Vec2(.5, .5));
		this->addChild(_leftTopLayer);

		LayerColor *_leftBottomLayer = LayerColor::create(Color4B(71, 221, 214, 100), _leftSprite->getContentSize().width, _leftSprite->getContentSize().height);
		_leftBottomLayer->setPosition(Vec2(_leftSprite->getPositionX() - _leftSprite->getContentSize().width / 2, _leftSprite->getPositionY() - _leftSprite->getContentSize().height * 150 / 100));
		_leftBottomLayer->setAnchorPoint(Vec2(.5, .5));
		this->addChild(_leftBottomLayer);


		//	mid column details
		_midScrollView = ui::ScrollView::create();
		_midScrollView->setClippingEnabled(true);
		_midScrollView->setContentSize(Size(230, 1100));
		_midScrollView->setDirection(ui::ScrollView::Direction::VERTICAL);
		_midScrollView->getInnerContainer()->setLayoutType(ui::Layout::Type::VERTICAL);
		_midScrollView->setInnerContainerSize(Size(230, (470 * 28)));
		_midScrollView->setPosition(Vec2(_visibleSize.width * .475, _visibleSize.height * .37));
		this->addChild(_midScrollView);
		_midScrollView->setScrollBarOpacity(0);

		for (int j = 0; j < 1; j++)
		{
			for (int i = 1; i < 27; i++)
			{
				SpriteDetails._label = Alphabet::createWithSize(_matrix[j][i - 1], 400);
				SpriteDetails._label->setContentSize(buttonSize);
				SpriteDetails._label->setAnchorPoint(Vec2(0, 0));
				SpriteDetails._label->setPosition(Vec2(0, i * 470));
				SpriteDetails._sequence = i;
				SpriteDetails._id = _matrix[j][i - 1];
				_midScrollView->addChild(SpriteDetails._label);
				_midSpriteDetails.push_back(SpriteDetails);
			}
		}
//		_midScrollView->scrollToPercentVertical(50, .01, false);
		Sprite *_midSprite = (Sprite*)phonicsfreebg->getChildren().at(11);
		LayerColor *_midTopLayer = LayerColor::create(Color4B(71, 221, 214, 100), _midSprite->getContentSize().width, _midSprite->getContentSize().height);
		_midTopLayer->setPosition(Vec2(_midSprite->getPositionX() - _midSprite->getContentSize().width / 2, _midSprite->getPositionY() + _midSprite->getContentSize().height * .50));
		_midTopLayer->setAnchorPoint(Vec2(.5, .5));
		this->addChild(_midTopLayer);

		LayerColor *_midBottomLayer = LayerColor::create(Color4B(71, 221, 214, 100), _midSprite->getContentSize().width, _midSprite->getContentSize().height);
		_midBottomLayer->setPosition(Vec2(_midSprite->getPositionX() - _midSprite->getContentSize().width / 2, _midSprite->getPositionY() - _midSprite->getContentSize().height * 150 / 100));
		_midBottomLayer->setAnchorPoint(Vec2(.5, .5));
		this->addChild(_midBottomLayer);


		//	right column details
		_rightScrollView = ui::ScrollView::create();
		_rightScrollView->setClippingEnabled(true);
		_rightScrollView->setContentSize(Size(230, 1100));
		_rightScrollView->setDirection(ui::ScrollView::Direction::VERTICAL);
		_rightScrollView->getInnerContainer()->setLayoutType(ui::Layout::Type::VERTICAL);
		_rightScrollView->setInnerContainerSize(Size(230, (470 * 28)));
		_rightScrollView->setPosition(Vec2(_visibleSize.width * .67, _visibleSize.height * .37));
		this->addChild(_rightScrollView);
		_rightScrollView->setScrollBarOpacity(0);

		for (int j = 0; j < 1; j++)
		{
			for (int i = 1; i < 27; i++)
			{
				SpriteDetails._label = Alphabet::createWithSize(_matrix[j][i - 1], 400);
				SpriteDetails._label->setContentSize(buttonSize);
				SpriteDetails._label->setAnchorPoint(Vec2(0, 0));
				SpriteDetails._label->setPosition(Vec2(0, i * 470));
				SpriteDetails._sequence = i;
				SpriteDetails._id = _matrix[j][i - 1];
				_rightScrollView->addChild(SpriteDetails._label);
				_rightSpriteDetails.push_back(SpriteDetails);
			}
		}

		Sprite *_rightSprite = (Sprite*)phonicsfreebg->getChildren().at(12);
		LayerColor *_rightTopLayer = LayerColor::create(Color4B(71, 221, 214, 100), _rightSprite->getContentSize().width, _rightSprite->getContentSize().height);
		_rightTopLayer->setPosition(Vec2(_rightSprite->getPositionX() - _rightSprite->getContentSize().width / 2, _rightSprite->getPositionY() + _rightSprite->getContentSize().height * .50));
		_rightTopLayer->setAnchorPoint(Vec2(.5, .5));
		this->addChild(_rightTopLayer);

		LayerColor *_rightBottomLayer = LayerColor::create(Color4B(71, 221, 214, 100), _rightSprite->getContentSize().width, _rightSprite->getContentSize().height);
		_rightBottomLayer->setPosition(Vec2(_rightSprite->getPositionX() - _rightSprite->getContentSize().width / 2, _rightSprite->getPositionY() - _rightSprite->getContentSize().height * 150 / 100));
		_rightBottomLayer->setAnchorPoint(Vec2(.5, .5));
		this->addChild(_rightBottomLayer);

		addEvents();

		this->runAction(Sequence::create(DelayTime::create(1), CallFunc::create([=] {
			_leftScrollView->scrollToPercentVertical(20, 3, true);
			_midScrollView->scrollToPercentVertical(50, 3, true);
			_rightScrollView->scrollToPercentVertical(80, 5, true);
//			_leftScrollView->scrollToBottom(1, false);
//			_midScrollView->scrollToTop(1, false);
//			_rightScrollView->scrollToBottom(1, false);
		}), NULL));
		*/
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
		wchar_t _leftChar = NULL, _midChar = NULL, _rightChar = NULL;

		if (rect.containsPoint(locationInNode))
		{
			// left char check
			Sprite *_leftSprite = (Sprite*) phonicsfreebg->getChildren().at(9);
			Rect _leftSpriteRect = Rect((_leftSprite->getPositionX() - _leftSprite->getContentSize().width / 2), (_leftSprite->getPositionY() - _leftSprite->getContentSize().height * .90), _leftSprite->getContentSize().width, _leftSprite->getContentSize().height * .75);

			for (int i = 0; i < _leftScrollView->getChildrenCount(); i++)
			{
				Point _leftSpritePoints = _leftScrollView->getChildren().at(i)->getParent()->convertToWorldSpace(_leftScrollView->getChildren().at(i)->getPosition());

				if (_leftSpriteRect.containsPoint(_leftSpritePoints))
				{
					_leftChar = _leftSpriteDetails.at(i)._id;
//					CCLOG("done %d %c", _leftSpriteDetails.at(i)._sequence, _leftSpriteDetails.at(i)._id);
					break;
				}
			}

			// mid char check
			Sprite *_midSprite = (Sprite*)phonicsfreebg->getChildren().at(11);
			Rect _midSpriteRect = Rect((_midSprite->getPositionX() - _midSprite->getContentSize().width / 2), (_midSprite->getPositionY() - _midSprite->getContentSize().height * .90), _midSprite->getContentSize().width, _midSprite->getContentSize().height * .75);

			for (int i = 0; i < _midScrollView->getChildrenCount(); i++)
			{
				Point _midSpritePoints = _midScrollView->getChildren().at(i)->getParent()->convertToWorldSpace(_midScrollView->getChildren().at(i)->getPosition());

				if (_midSpriteRect.containsPoint(_midSpritePoints))
				{
					_midChar = _midSpriteDetails.at(i)._id;
					//					CCLOG("done %d %c", _midSpriteDetails.at(i)._sequence, _midSpriteDetails.at(i)._id);
					break;
				}
			}

			// right char check
			Sprite *_rightSprite = (Sprite*)phonicsfreebg->getChildren().at(12);
			Rect _rightSpriteRect = Rect((_rightSprite->getPositionX() - _rightSprite->getContentSize().width / 2), (_rightSprite->getPositionY() - _rightSprite->getContentSize().height * .90), _rightSprite->getContentSize().width, _rightSprite->getContentSize().height * .75);

			for (int i = 0; i < _rightScrollView->getChildrenCount(); i++)
			{
				Point _rightSpritePoints = _rightScrollView->getChildren().at(i)->getParent()->convertToWorldSpace(_rightScrollView->getChildren().at(i)->getPosition());

				if (_rightSpriteRect.containsPoint(_rightSpritePoints))
				{
					_rightChar = _rightSpriteDetails.at(i)._id;
					//					CCLOG("done %d %c", _rightSpriteDetails.at(i)._sequence, _rightSpriteDetails.at(i)._id);
					break;
				}
			}

			CCLOG("done %c %c %c", _leftChar, _midChar, _rightChar);


			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), phonicsfreebg->getChildren().at(6));
}

