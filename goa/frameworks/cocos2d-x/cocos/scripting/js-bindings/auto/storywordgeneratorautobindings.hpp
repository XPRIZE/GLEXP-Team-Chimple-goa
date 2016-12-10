#include "base/ccConfig.h"
#ifndef __storywordgeneratorautobindings_h__
#define __storywordgeneratorautobindings_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_StoryWordBoard_class;
extern JSObject *jsb_StoryWordBoard_prototype;

bool js_storywordgeneratorautobindings_StoryWordBoard_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_storywordgeneratorautobindings_StoryWordBoard_finalize(JSContext *cx, JSObject *obj);
void js_register_storywordgeneratorautobindings_StoryWordBoard(JSContext *cx, JS::HandleObject global);
void register_all_storywordgeneratorautobindings(JSContext* cx, JS::HandleObject obj);
bool js_storywordgeneratorautobindings_StoryWordBoard_createWithWords(JSContext *cx, uint32_t argc, jsval *vp);
bool js_storywordgeneratorautobindings_StoryWordBoard_create(JSContext *cx, uint32_t argc, jsval *vp);
bool js_storywordgeneratorautobindings_StoryWordBoard_createSceneWithWords(JSContext *cx, uint32_t argc, jsval *vp);
bool js_storywordgeneratorautobindings_StoryWordBoard_createScene(JSContext *cx, uint32_t argc, jsval *vp);
bool js_storywordgeneratorautobindings_StoryWordBoard_StoryWordBoard(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __storywordgeneratorautobindings_h__
