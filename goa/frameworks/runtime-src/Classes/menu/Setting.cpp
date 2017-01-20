#include "Setting.h"
#include "editor-support/cocostudio/CocoStudio.h"
#include "../lang/TextGenerator.h"
#include "ui/UIScale9Sprite.h"
#include "../menu/HelpLayer.h"
#include "../util/CommonLabelTTF.h"

USING_NS_CC;

using namespace cocos2d::ui;
static const std::string UNLOCK_ALL = ".unlock";
static const std::string LANGUAGE = "language";

Setting::Setting() {
}

Setting::~Setting() {
}

Scene* Setting::createScene()
{
	auto scene = Scene::create();
	auto layer = Setting::create();
	scene->addChild(layer);

	return scene;
}

void Setting::onEnterTransitionDidFinish()
{
	visibleSize = Director::getInstance()->getVisibleSize();
	Vec2 origin = Director::getInstance()->getVisibleOrigin();

	_calcLayer = LayerColor::create(Color4B(255.0, 255.0, 255.0, 255.0));
	_calcLayer->setContentSize(visibleSize);
	this->addChild(_calcLayer, 4);

	cocos2d::ui::Button *_closeButton = cocos2d::ui::Button::create("menu/close.png", "menu/close.png", "menu/close.png", cocos2d::ui::Widget::TextureResType::LOCAL);
	_closeButton->setPosition(Vec2(visibleSize.width - _closeButton->getContentSize().width, visibleSize.height - _closeButton->getContentSize().height));
	_calcLayer->addChild(_closeButton, 5);

	_closeButton->addTouchEventListener([&](Ref* sender, cocos2d::ui::Widget::TouchEventType type) {
		switch (type)
		{
		case cocos2d::ui::Widget::TouchEventType::BEGAN:
			break;
		case cocos2d::ui::Widget::TouchEventType::ENDED:
			Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene(), Color3B::BLACK));
			break;
		default:
			break;
		}
	});

    auto _label = LabelTTF::create(LangUtil::getInstance()->translateString("Enter secret code to unlock all levels"), "fonts/Roboto-Regular.ttf", 100);
	_label->setAnchorPoint(Vec2(.5, .5));
	_label->setPosition(Vec2(visibleSize.width / 2, visibleSize.height * .75));
	_calcLayer->addChild(_label, 5);
	_label->setColor(Color3B::BLACK);

	_calculator = new Calculator();
	_calculator->createCalculator(Vec2(visibleSize.width / 2, visibleSize.height / 3), Vec2(0.5, 0.5), 0.7, 0.7);
	_calcLayer->addChild(_calculator, 5);

	this->scheduleUpdate();
}

bool Setting::init()
{
	if (!Layer::init())
	{
		return false;
	}
	return true;
}

void Setting::update(float d)
{
	if (_calculator->checkAnswer(2345))
	{
		this->removeChild(_calcLayer);
		this->unscheduleUpdate();
		showSettingMenu();
	}
}

void Setting::showSettingMenu() {

	std::string _levelStatus;
	localStorageGetItem(UNLOCK_ALL, &_levelStatus);
	if (_levelStatus.empty()) {
		localStorageSetItem(UNLOCK_ALL, "1");
	}

	std::string _language;
	localStorageGetItem(LANGUAGE, &_language);
	if (_language.empty()) {
		localStorageSetItem(LANGUAGE, "");
	}

	_settingLayer = LayerColor::create(Color4B(128.0, 128.0, 128.0, 200.0));
	_settingLayer->setContentSize(visibleSize);
	this->addChild(_settingLayer, 3);

	_settingNode = CSLoader::createNode("settings/settings.csb");
	_settingNode->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));
	_settingNode->setAnchorPoint(Vec2(0.5, 0.5));
	_settingLayer->addChild(_settingNode);

	_checkBox = (CheckBox*)_settingNode->getChildByName("CheckBox_1");
	if (_levelStatus == "0")
		_checkBox->setSelected(true);
	else if (_levelStatus == "1" || _levelStatus == "")
		_checkBox->setSelected(false);

	RadioButton *_rd1 = (RadioButton*)_settingNode->getChildByName("radio1");
	_rd1->setName("radio1");
	_rd1->addTouchEventListener(CC_CALLBACK_2(Setting::radioButton, this));
	_rd1->setVisible(false);

	RadioButton *_rd2 = (RadioButton*)_settingNode->getChildByName("radio2");
	_rd2->addTouchEventListener(CC_CALLBACK_2(Setting::radioButton, this));
	_rd2->setName("radio2");
	_rd2->setVisible(false);

	_radio1Select = Sprite::createWithSpriteFrameName("settings/radiopressed.png");
	_radio1Select->setPosition(Vec2(_rd1->getPositionX(), _rd1->getPositionY()));
	_settingNode->addChild(_radio1Select);
	_radio1Select->setVisible(false);

	if (_language == "English" || _language == "")
	{
//		LangUtil::getInstance()->changeLanguage(SupportedLanguages::ENGLISH);
		_radio1Select->setVisible(true);
	}
	else
	{
//		LangUtil::getInstance()->changeLanguage(SupportedLanguages::SWAHILI);
		_radio1Select->setVisible(false);
	}

	_radio2Select = Sprite::createWithSpriteFrameName("settings/radiopressed.png");
	_radio2Select->setPosition(Vec2(_rd2->getPositionX(), _rd2->getPositionY()));
	_settingNode->addChild(_radio2Select);
	_radio2Select->setVisible(false);

	if (_language == "Swahili")
		_radio2Select->setVisible(true);
	else
		_radio2Select->setVisible(false);

	auto _swahili = LabelTTF::create("Swahili", "fonts/Roboto-Regular.ttf", 150);
	_swahili->setAnchorPoint(Vec2(0, .5));
	_swahili->setPosition(Vec2(_settingNode->getChildByName("Node_3")->getPositionX(), _settingNode->getChildByName("Node_3")->getPositionY()));
//	_settingLayer->addChild(_swahili);

	auto _english = LabelTTF::create("English", "fonts/Roboto-Regular.ttf", 150);
	_english->setAnchorPoint(Vec2(0, .5));
	_english->setPosition(Vec2(_settingNode->getChildByName("Node_2")->getPositionX(), _settingNode->getChildByName("Node_2")->getPositionY()));
//	_settingLayer->addChild(_english);

	auto _disable = LabelTTF::create("Unlock all", "fonts/Roboto-Regular.ttf", 150);
	_disable->setAnchorPoint(Vec2(0, .5));
	_disable->setPosition(Vec2(_settingNode->getChildByName("Node_1")->getPositionX(), _settingNode->getChildByName("Node_1")->getPositionY()));
	_settingLayer->addChild(_disable);

	auto _submitLabel = LabelTTF::create("Submit", "fonts/Roboto-Regular.ttf", 150);
	_submitLabel->setAnchorPoint(Vec2(1, 1));
	_submitLabel->setPosition(Vec2(_settingNode->getChildByName("submit")->getPositionX() - _settingNode->getChildByName("submit")->getContentSize().width * .45, _settingNode->getChildByName("submit")->getPositionY() - _settingNode->getChildByName("submit")->getContentSize().height * .6));
	_settingNode->getChildByName("submit")->addChild(_submitLabel);

	_settingNode->getChildByName("submit")->setTag(1);
	_settingNode->getChildByName("close")->setTag(0);

	_rd1->setVisible(false);
	_rd2->setVisible(false);
	_radio2Select->setVisible(false);
	_radio1Select->setVisible(false);

	Button *_submit = (Button*)_settingNode->getChildByName("submit");
	_submit->addTouchEventListener([&](Ref* sender, Widget::TouchEventType type) {
		switch (type)
		{
		case cocos2d::ui::Widget::TouchEventType::BEGAN:
			break;
		case cocos2d::ui::Widget::TouchEventType::ENDED:
/*			if (_radio1Select->isVisible())
			{
				LangUtil::getInstance()->changeLanguage(SupportedLanguages::ENGLISH);
				localStorageSetItem(LANGUAGE, "English");
			}
			else
			{
				LangUtil::getInstance()->changeLanguage(SupportedLanguages::SWAHILI);
				localStorageSetItem(LANGUAGE, "Swahili");
			}
*/
			if (_checkBox->isSelected())
				localStorageSetItem(UNLOCK_ALL, "0");
			else
				localStorageSetItem(UNLOCK_ALL, "1");

			Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene(), Color3B::BLACK));
			break;
		default:
			break;
		}
	});

	Button *close = (Button*)_settingNode->getChildByName("close");
	close->addTouchEventListener([&](Ref* sender, Widget::TouchEventType type) {
		switch (type)
		{
		case cocos2d::ui::Widget::TouchEventType::BEGAN:
			break;
		case cocos2d::ui::Widget::TouchEventType::ENDED:
			Director::getInstance()->replaceScene(TransitionFade::create(2.0, ScrollableGameMapScene::createScene(), Color3B::BLACK));
			break;
		default:
			break;
		}
	});
}

void Setting::radioButton(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType)
{
	if (eEventType == cocos2d::ui::Widget::TouchEventType::ENDED)
	{
		Button* clickedButton = dynamic_cast<Button*>(pSender);
		if (clickedButton->getName() == "radio1")
		{
			_radio2Select->setVisible(false);
			_radio1Select->setVisible(true);
		}
		else
		{
			_radio1Select->setVisible(false);
			_radio2Select->setVisible(true);
		}
	}
}
