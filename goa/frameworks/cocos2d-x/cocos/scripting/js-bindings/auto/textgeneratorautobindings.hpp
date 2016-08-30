#include "base/ccConfig.h"
#ifndef __textgeneratorautobindings_h__
#define __textgeneratorautobindings_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_TextGenerator_class;
extern JSObject *jsb_TextGenerator_prototype;

bool js_textgeneratorautobindings_TextGenerator_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_textgeneratorautobindings_TextGenerator_finalize(JSContext *cx, JSObject *obj);
void js_register_textgeneratorautobindings_TextGenerator(JSContext *cx, JS::HandleObject global);
void register_all_textgeneratorautobindings(JSContext* cx, JS::HandleObject obj);

//bool js_textgeneratorautobindings_TextGenerator_generateMatrix(JSContext *cx, uint32_t argc, jsval *vp);

bool js_textgeneratorautobindings_TextGenerator_getNumGraphemesInString(JSContext *cx, uint32_t argc, jsval *vp);
bool js_textgeneratorautobindings_TextGenerator_getGraphemes(JSContext *cx, uint32_t argc, jsval *vp);
bool js_textgeneratorautobindings_TextGenerator_generateAWord(JSContext *cx, uint32_t argc, jsval *vp);
//bool js_textgeneratorautobindings_TextGenerator_destroyInstance(JSContext *cx, uint32_t argc, jsval *vp);
bool js_textgeneratorautobindings_TextGenerator_getInstance(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __textgeneratorautobindings_h__
