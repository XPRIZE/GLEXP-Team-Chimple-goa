#ifndef __Jasmin_Mainfile_SCENE_H__
#define __Jasmin_Mainfile_SCENE_H__

#include "cocos2d.h"

class Jasmin_Mainfile : public cocos2d::Layer
{
public:
    static cocos2d::Scene* createScene();

	static float height, width, originX, originY;

    virtual bool init();
	void startGame();

    // implement the "static create()" method manually
    CREATE_FUNC(Jasmin_Mainfile);
};

#endif // __Jasmin_Mainfile_SCENE_H__
