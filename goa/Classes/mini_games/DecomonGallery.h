//
//  DecomonGallery.h 
//  goa
//
//  Created by Kirankumar CS on 18/10/16
//
//

#ifndef __DECOMON_GALLERY_SCENE_H__
#define __DECOMON_GALLERY_SCENE_H__

#include "cocos2d.h"
#include "../menu/MenuContext.h"

class DecomonGallery : public cocos2d::ui::ScrollView {

public:
	static cocos2d::Scene* createScene();
	static DecomonGallery* create();
	//static const char* gameName() { return DECOMON.g; }
	//CREATE_FUNC(DecomonGallery);
CC_CONSTRUCTOR_ACCESS:
	virtual bool init();
	DecomonGallery();
	virtual ~DecomonGallery();

protected:
	cocos2d::Layer* _layer;
	cocos2d::ui::Button *_backButton;
	static cocos2d::Layer *_decomonLayer;
	//DecomonGallery::Layer* _decomonLayer;
	MenuContext * menu;
	void onEnterTransitionDidFinish();
	void backToGame();
};
#endif