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

		_level = _menuContext->getCurrentLevel();
		_maxScore = 0;

		_phonicSegmentForLevel = TextGenerator::getInstance()->getPhonicSegmentForLevel(_level);
		_segmentsForPhonic = TextGenerator::getInstance()->getSegmentsForPhonic(_level, 10);
		_segmentsNotForPhonic = TextGenerator::getInstance()->getSegmentsNotForPhonic(_level, 10);

		_differntPosition = {

			{ 0,	//	position of box if number_of_segments are 2
			{
				{ 0, _visibleSize.height * .70 },
				{ 1, _visibleSize.width * .35 },
				{ 2, _visibleSize.width * .65 }
			} },

			{ 1,	//	position of box if number_of_segments are 3
			{
				{ 0, _visibleSize.height * .69 },
				{ 1, _visibleSize.width * .32 },
				{ 2, _visibleSize.width * .50 },
				{ 3, _visibleSize.width * .68 }
			} },

			{ 2,	//	position of pageview if number_of_segments are 2
			{
				{ 0, _visibleSize.height * .38 },
				{ 1, _visibleSize.width * .30 },
				{ 2, _visibleSize.width * .60 },
			} },

			{ 3,	//	position of pageview if number_of_segments are 3
			{
				{ 0, _visibleSize.height * .38 },
				{ 1, _visibleSize.width * .27 },
				{ 2, _visibleSize.width * .45 },
				{ 3, _visibleSize.width * .63 }
			} }
		};


		// add pageview and boxes according to number_of_segments
		int num_of_segments = _phonicSegmentForLevel.number_of_segments;
		for (int i = 0; i < num_of_segments; i++)
		{
			Sprite *_box = Sprite::createWithSpriteFrameName("phonicsfree/small box.png");
			_box->setPosition(Vec2(_differntPosition.at(num_of_segments - 2).at(i+1), _differntPosition.at(num_of_segments - 2).at(0)));
			this->addChild(_box);
			_boxDetails.push_back(_box);

			Sprite *_trans = Sprite::createWithSpriteFrameName("phonicsfree/trans bar_1.png");
			_trans->setPosition(Vec2(_differntPosition.at(num_of_segments - 2).at(i + 1), _differntPosition.at(num_of_segments - 2).at(0)));
			this->addChild(_trans, 5);

			if (_phonicSegmentForLevel.fixed_index != (i + 1))
			{
				PageViewDetails._pageView = ui::PageView::create();
				PageViewDetails._pageView->setPosition(Vec2(_differntPosition.at(num_of_segments).at(i + 1), _differntPosition.at(num_of_segments).at(0)));
				PageViewDetails._id = _pageViewMap.size();
				PageViewDetails._pageView->setContentSize(Size(250, _trans->getBoundingBox().size.height));
				PageViewDetails._pageView->setDirection(cocos2d::ui::ScrollView::Direction::VERTICAL);
				PageViewDetails._pageView->setInnerContainerSize(Size(250, (200 * (_segmentsForPhonic.size()))));
				this->addChild(PageViewDetails._pageView);
				_pageViewMap.push_back(PageViewDetails);
			}
		}

		// add letters to the pageview
		for (int i = 0; i < _segmentsForPhonic.size(); i++)
		{
			int k = 0;
			std::vector<struct SpriteDetails> _spriteDetails;
			std::string _string = "";
			for (int j = 0; j < _segmentsForPhonic.at(i).size(); j++)
			{
				_string = _string + "" + _segmentsForPhonic.at(i).at(j);
				if (_phonicSegmentForLevel.fixed_index != (j + 1))
				{
					auto page = ui::Widget::create();
					page->setContentSize(Size(250, 250));
					_pageViewMap.at(k)._pageView->addChild(page);

					SpriteDetails._label = CommonLabelTTF::create(_segmentsForPhonic.at(i).at(j), "Helvetica", 130, CCSizeMake(250, 200));
					SpriteDetails._label->setAnchorPoint(Vec2(0, 0));
					SpriteDetails._label->setPosition(Vec2(0, _pageViewMap.at(k)._pageView->getContentSize().height * .38));
					SpriteDetails._sequence = j;
					SpriteDetails._id = _segmentsForPhonic.at(i).at(j);
					page->addChild(SpriteDetails._label);
					_spriteDetails.push_back(SpriteDetails);
					k++;
				}
				else if (_fixLabel == NULL)
				{
					_fixLabel = CommonLabelTTF::create(_segmentsForPhonic.at(i).at(j), "Helvetica", 130, CCSizeMake(250, 300));
					_fixLabel->setAnchorPoint(Vec2(0.5, 0.8));
					_fixLabel->setPosition(Vec2(_boxDetails.at(_phonicSegmentForLevel.fixed_index - 1)->getPositionX(), _boxDetails.at(_phonicSegmentForLevel.fixed_index - 1)->getPositionY()));
					this->addChild(_fixLabel);
				}
			}
			_allWords.push_back(_string);
			_allSpriteDetails.push_back(_spriteDetails);
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

		std::string _answer = "";

		if (rect.containsPoint(locationInNode))
		{
			for (int i = 0; i < _boxDetails.size(); i++)
			{
				if (_phonicSegmentForLevel.fixed_index == (i + 1))
				{
					_answer = _answer + "" + _fixLabel->getString();
				}
				else {
					Vec2 a = _boxDetails.at(i)->getAnchorPoint();
					Rect _spriteRect = Rect((_boxDetails.at(i)->getPositionX() - _boxDetails.at(i)->getContentSize().width), (_boxDetails.at(i)->getPositionY() - _boxDetails.at(i)->getContentSize().height / 2), _boxDetails.at(i)->getContentSize().width, _boxDetails.at(i)->getContentSize().height);
					for (int j = 0; j < _pageViewMap.size(); j++)
					{
						for (int k = 0; k < _pageViewMap.at(j)._pageView->getChildrenCount(); k++)
						{
							Point _spritePoints = _pageViewMap.at(j)._pageView->getChildren().at(k)->getParent()->convertToWorldSpace(_pageViewMap.at(j)._pageView->getChildren().at(k)->getPosition());
							if (_spriteRect.containsPoint(_spritePoints))
							{
								_answer = _answer + "" + _allSpriteDetails.at(k).at(j)._id;
								break;
							}
						}
					}
				}
			}


			// add and remove the correct word label
			int i = 0;
			for (i = 0; i < _allWords.size(); i++)
			{
				if (_allWords.at(i) == _answer)
				{
					if (_rightWordLabel == NULL)
					{
						_rightWordLabel = CommonLabelTTF::create(_answer, "Helvetica", 130, CCSizeMake(350, 300));
						_rightWordLabel->setPosition(Vec2(_visibleSize.width / 2, _visibleSize.height * .26));
						this->addChild(_rightWordLabel);
					}
					else
					{
						this->removeChild(_rightWordLabel);
						_rightWordLabel = CommonLabelTTF::create(_answer, "Helvetica", 130, CCSizeMake(350, 300));
						_rightWordLabel->setPosition(Vec2(_visibleSize.width / 2, _visibleSize.height * .26));
						this->addChild(_rightWordLabel);
					}

					CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
					success->playEffect("sounds/sfx/success.ogg", false);
					_menuContext->addPoints(1);
					_allWords.erase(_allWords.begin() + i);
					break;
				}
			}

			// check if build word is wrong
			if (i >= _allWords.size())
			{
				FShake* shake = FShake::actionWithDuration(1.0f, 10.0f);
				phonicsfreebg->getChildren().at(6)->runAction(shake);

				CocosDenshion::SimpleAudioEngine *success = CocosDenshion::SimpleAudioEngine::getInstance();
				success->playEffect("sounds/sfx/error.ogg", false);
				_menuContext->addPoints(-1);
			}

			_maxScore++;

			if (_allWords.size() == 0)
			{
				_menuContext->setMaxPoints(_maxScore);
				_menuContext->showScore();
			}

			return true;
		}
		return false;
	};

	cocos2d::Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener->clone(), phonicsfreebg->getChildren().at(6));
}
