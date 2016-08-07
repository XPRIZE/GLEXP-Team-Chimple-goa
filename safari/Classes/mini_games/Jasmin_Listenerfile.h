#ifndef __Jasmin_Listenerfile_SCENE_H__
#define __Jasmin_Listenerfile_SCENE_H__

#include "cocos2d.h"

class Jasmin_Mainfile;

class Jasmin_Listenerfile : public cocos2d::Sprite
{
public:
    // implement the "static create()" method manually

	Jasmin_Listenerfile();
	~Jasmin_Listenerfile();

	int xP, yP, flag;
	char id;
	static Jasmin_Listenerfile* createSprite(std::string, float x, float y, char id, Jasmin_Mainfile*);

	void addEvent(Jasmin_Mainfile*);

};

#endif // __Jasmin_Listenerfile_SCENE_H__
