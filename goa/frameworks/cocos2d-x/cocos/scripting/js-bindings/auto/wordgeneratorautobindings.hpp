#include "base/ccConfig.h"
#ifndef __wordgeneratorautobindings_h__
#define __wordgeneratorautobindings_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_WordBoard_class;
extern JSObject *jsb_WordBoard_prototype;

bool js_wordgeneratorautobindings_WordBoard_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_wordgeneratorautobindings_WordBoard_finalize(JSContext *cx, JSObject *obj);
void js_register_wordgeneratorautobindings_WordBoard(JSContext *cx, JS::HandleObject global);
void register_all_wordgeneratorautobindings(JSContext* cx, JS::HandleObject obj);
bool js_wordgeneratorautobindings_WordBoard_createSceneWithWordInIslandAndSceneName(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordgeneratorautobindings_WordBoard_create(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordgeneratorautobindings_WordBoard_createSceneWithWord(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordgeneratorautobindings_WordBoard_createWithWord(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordgeneratorautobindings_WordBoard_createScene(JSContext *cx, uint32_t argc, jsval *vp);
bool js_wordgeneratorautobindings_WordBoard_WordBoard(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __wordgeneratorautobindings_h__
