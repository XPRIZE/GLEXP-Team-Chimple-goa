#ifndef __Setting_SCENE_H__
#define __Setting_SCENE_H__

#include "cocos2d.h"
#include <vector>
#include "editor-support/cocostudio/CocoStudio.h"
#include "../menu/MenuContext.h"
#include "../StartMenuScene.h"
#include "ui/CocosGUI.h"
#include <string>
#include <sstream>
#include "../Calculator.h"
#include "storage/local-storage/LocalStorage.h"

class Setting : public cocos2d::Layer
{
	
public:
	static cocos2d::Scene* createScene();
	Setting();
	~Setting();

	cocos2d::Size visibleSize;

	Calculator *_calculator;
	LayerColor *_calcLayer, *_settingLayer;
	cocos2d::Node *_settingNode;
	cocos2d::ui::CheckBox *_checkBox;
	cocos2d::Sprite *_radio1Select, *_radio2Select;

	virtual bool init();
	void update(float);
	void onEnterTransitionDidFinish() override;
	void radioButton(cocos2d::Ref *pSender, cocos2d::ui::Widget::TouchEventType eEventType);
	void showSettingMenu();
	CREATE_FUNC(Setting);
    
protected:
	MenuContext* _menuContext;
};
#endif // __Setting_SCENE_H__
