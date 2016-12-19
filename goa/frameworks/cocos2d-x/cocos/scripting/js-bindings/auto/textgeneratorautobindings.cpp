#include "scripting/js-bindings/auto/textgeneratorautobindings.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "../../../../../runtime-src/Classes/lang/TextGenerator.h"

template<class T>
static bool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS_ReportError(cx, "Constructor for the requested class is not available, please refer to the API reference.");
    return false;
}

static bool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
    return false;
}

static bool js_is_native_obj(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    args.rval().setBoolean(true);
    return true;
}
JSClass  *jsb_TextGenerator_class;
JSObject *jsb_TextGenerator_prototype;

bool js_textgeneratorautobindings_TextGenerator_getOrderedConcepts(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getOrderedConcepts : Invalid Native Object");
    if (argc == 0) {
        std::vector<std::string> ret = cobj->getOrderedConcepts();
        jsval jsret = JSVAL_NULL;
        jsret = std_vector_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getOrderedConcepts : Error processing arguments");
        std::vector<std::string> ret = cobj->getOrderedConcepts(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_vector_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getOrderedConcepts : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getNumGraphemesInString(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getNumGraphemesInString : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getNumGraphemesInString : Error processing arguments");
        int ret = cobj->getNumGraphemesInString(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = int32_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getNumGraphemesInString : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

bool js_textgeneratorautobindings_TextGenerator_getSynonyms(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getSynonyms : Invalid Native Object");
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getSynonyms : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getSynonyms(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 2) {
        int arg0 = 0;
        int arg1 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getSynonyms : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getSynonyms(arg0, arg1);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getSynonyms : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getAllChars(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getAllChars : Invalid Native Object");
    if (argc == 0) {
        std::vector<std::string> ret = cobj->getAllChars();
        jsval jsret = JSVAL_NULL;
        jsret = std_vector_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getAllChars : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_generateMatrix(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_generateMatrix : Invalid Native Object");
    if (argc == 3) {
        std::string arg0;
        int arg1 = 0;
        int arg2 = 0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        ok &= jsval_to_int32(cx, args.get(2), (int32_t *)&arg2);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_generateMatrix : Error processing arguments");
        std::vector<std::vector<std::string>> ret = cobj->generateMatrix(arg0, arg1, arg2);
        jsval jsret = JSVAL_NULL;
        if (!ret.empty()) {
            JS::RootedObject jsretArr(cx, JS_NewArrayObject(cx, ret.size()));
            int i = 0;
            for (auto iter = ret.begin(); iter != ret.end(); ++iter)
            {
                JS::RootedValue element(cx);
                std::vector<std::string> ele = *iter;
                element = std_vector_string_to_jsval(cx, ele);
                
                if (!JS_SetElement(cx, jsretArr, i, element)) {
                    break;
                }
                ++i;
            }
            
            jsret =  OBJECT_TO_JSVAL(jsretArr);
            
        } else {
            jsret = JSVAL_NULL;
        };
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_generateMatrix : wrong number of arguments: %d, was expecting %d", argc, 3);
    return false;
}


bool js_textgeneratorautobindings_TextGenerator_getLang(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getLang : Invalid Native Object");
    if (argc == 0) {
        std::string ret = cobj->getLang();
        jsval jsret = JSVAL_NULL;
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getLang : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_generateASentence(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_generateASentence : Invalid Native Object");
    if (argc == 0) {
        std::string ret = cobj->generateASentence();
        jsval jsret = JSVAL_NULL;
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_generateASentence : Error processing arguments");
        std::string ret = cobj->generateASentence(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_generateASentence : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getValidCombinations(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getValidCombinations : Invalid Native Object");
    if (argc == 2) {
        std::string arg0;
        int arg1 = 0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getValidCombinations : Error processing arguments");
        std::vector<std::string> ret = cobj->getValidCombinations(arg0, arg1);
        jsval jsret = JSVAL_NULL;
        jsret = std_vector_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getValidCombinations : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getWords(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getWords : Invalid Native Object");
    if (argc == 2) {
        TextGenerator::P_O_S arg0;
        int arg1 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getWords : Error processing arguments");
        std::vector<std::string> ret = cobj->getWords(arg0, arg1);
        jsval jsret = JSVAL_NULL;
        jsret = std_vector_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 3) {
        TextGenerator::P_O_S arg0;
        int arg1 = 0;
        int arg2 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        ok &= jsval_to_int32(cx, args.get(2), (int32_t *)&arg2);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getWords : Error processing arguments");
        std::vector<std::string> ret = cobj->getWords(arg0, arg1, arg2);
        jsval jsret = JSVAL_NULL;
        jsret = std_vector_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getWords : wrong number of arguments: %d, was expecting %d", argc, 2);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getAntonyms(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getAntonyms : Invalid Native Object");
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getAntonyms : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getAntonyms(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 2) {
        int arg0 = 0;
        int arg1 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getAntonyms : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getAntonyms(arg0, arg1);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getAntonyms : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getHomonyms(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getHomonyms : Invalid Native Object");
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getHomonyms : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getHomonyms(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 2) {
        int arg0 = 0;
        int arg1 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getHomonyms : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getHomonyms(arg0, arg1);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getHomonyms : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getGraphemes(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getGraphemes : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getGraphemes : Error processing arguments");
        std::vector<std::string> ret = cobj->getGraphemes(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_vector_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getGraphemes : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_generateAWord(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_generateAWord : Invalid Native Object");
    if (argc == 0) {
        std::string ret = cobj->generateAWord();
        jsval jsret = JSVAL_NULL;
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_generateAWord : Error processing arguments");
        std::string ret = cobj->generateAWord(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_generateAWord : wrong number of arguments: %d, was expecting %d", argc, 0);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getSingularPlurals(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_getSingularPlurals : Invalid Native Object");
    if (argc == 1) {
        int arg0 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getSingularPlurals : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getSingularPlurals(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    if (argc == 2) {
        int arg0 = 0;
        int arg1 = 0;
        ok &= jsval_to_int32(cx, args.get(0), (int32_t *)&arg0);
        ok &= jsval_to_int32(cx, args.get(1), (int32_t *)&arg1);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_getSingularPlurals : Error processing arguments");
        std::map<std::string, std::string> ret = cobj->getSingularPlurals(arg0, arg1);
        jsval jsret = JSVAL_NULL;
        jsret = std_map_string_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getSingularPlurals : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}
bool js_textgeneratorautobindings_TextGenerator_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {
        
        TextGenerator* ret = TextGenerator::getInstance();
        jsval jsret = JSVAL_NULL;
        if (ret) {
            jsret = OBJECT_TO_JSVAL(js_get_or_create_jsobject<TextGenerator>(cx, (TextGenerator*)ret));
        } else {
            jsret = JSVAL_NULL;
        };
        args.rval().set(jsret);
        return true;
    }
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_getInstance : wrong number of arguments");
    return false;
}


void js_register_textgeneratorautobindings_TextGenerator(JSContext *cx, JS::HandleObject global) {
    jsb_TextGenerator_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_TextGenerator_class->name = "TextGenerator";
    jsb_TextGenerator_class->addProperty = JS_PropertyStub;
    jsb_TextGenerator_class->delProperty = JS_DeletePropertyStub;
    jsb_TextGenerator_class->getProperty = JS_PropertyStub;
    jsb_TextGenerator_class->setProperty = JS_StrictPropertyStub;
    jsb_TextGenerator_class->enumerate = JS_EnumerateStub;
    jsb_TextGenerator_class->resolve = JS_ResolveStub;
    jsb_TextGenerator_class->convert = JS_ConvertStub;
    jsb_TextGenerator_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);
    
    static JSPropertySpec properties[] = {
        JS_PS_END
    };
    
    static JSFunctionSpec funcs[] = {
        JS_FN("getOrderedConcepts", js_textgeneratorautobindings_TextGenerator_getOrderedConcepts, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getNumGraphemesInString", js_textgeneratorautobindings_TextGenerator_getNumGraphemesInString, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getSynonyms", js_textgeneratorautobindings_TextGenerator_getSynonyms, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getAllChars", js_textgeneratorautobindings_TextGenerator_getAllChars, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("generateMatrix", js_textgeneratorautobindings_TextGenerator_generateMatrix, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getLang", js_textgeneratorautobindings_TextGenerator_getLang, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("generateASentence", js_textgeneratorautobindings_TextGenerator_generateASentence, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getValidCombinations", js_textgeneratorautobindings_TextGenerator_getValidCombinations, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getWords", js_textgeneratorautobindings_TextGenerator_getWords, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getAntonyms", js_textgeneratorautobindings_TextGenerator_getAntonyms, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getHomonyms", js_textgeneratorautobindings_TextGenerator_getHomonyms, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getGraphemes", js_textgeneratorautobindings_TextGenerator_getGraphemes, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("generateAWord", js_textgeneratorautobindings_TextGenerator_generateAWord, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("getSingularPlurals", js_textgeneratorautobindings_TextGenerator_getSingularPlurals, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("translateString", js_textgeneratorautobindings_TextGenerator_translateString, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };
    
    static JSFunctionSpec st_funcs[] = {
        JS_FN("getInstance", js_textgeneratorautobindings_TextGenerator_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };
    
    jsb_TextGenerator_prototype = JS_InitClass(
                                               cx, global,
                                               JS::NullPtr(),
                                               jsb_TextGenerator_class,
                                               dummy_constructor<TextGenerator>, 0, // no constructor
                                               properties,
                                               funcs,
                                               NULL, // no static properties
                                               st_funcs);
    
    JS::RootedObject proto(cx, jsb_TextGenerator_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "TextGenerator"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::FalseHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<TextGenerator>(cx, jsb_TextGenerator_class, proto, JS::NullPtr());
}

bool js_textgeneratorautobindings_TextGenerator_translateString(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    JS::RootedObject obj(cx, args.thisv().toObjectOrNull());
    js_proxy_t *proxy = jsb_get_js_proxy(obj);
    TextGenerator* cobj = (TextGenerator *)(proxy ? proxy->ptr : NULL);
    JSB_PRECONDITION2( cobj, cx, false, "js_textgeneratorautobindings_TextGenerator_translateString : Invalid Native Object");
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_textgeneratorautobindings_TextGenerator_translateString : Error processing arguments");
        std::string ret = cobj->translateString(arg0);
        jsval jsret = JSVAL_NULL;
        jsret = std_string_to_jsval(cx, ret);
        args.rval().set(jsret);
        return true;
    }
    
    JS_ReportError(cx, "js_textgeneratorautobindings_TextGenerator_translateString : wrong number of arguments: %d, was expecting %d", argc, 1);
    return false;
}

void register_all_textgeneratorautobindings(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "goa", &ns);
    
    js_register_textgeneratorautobindings_TextGenerator(cx, ns);
}

