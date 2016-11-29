#include "scripting/js-bindings/auto/wordgeneratorautobindings.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "../../../../../runtime-src/Classes/puzzle/WordBoard.h"

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
JSClass  *jsb_WordBoard_class;
JSObject *jsb_WordBoard_prototype;

bool js_wordgeneratorautobindings_WordBoard_createSceneWithWordInIslandAndSceneName(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 3) {
        std::string arg0;
        std::string arg1;
        std::string arg2;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        ok &= jsval_to_std_string(cx, args.get(1), &arg1);
        ok &= jsval_to_std_string(cx, args.get(2), &arg2);
        JSB_PRECONDITION2(ok, cx, false, "js_wordgeneratorautobindings_WordBoard_createSceneWithWordInIslandAndSceneName : Error processing arguments");

        auto ret = WordBoard::createSceneWithWordInIslandAndSceneName(arg0, arg1, arg2);
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordgeneratorautobindings_WordBoard_createSceneWithWordInIslandAndSceneName : wrong number of arguments");
    return false;
}

bool js_wordgeneratorautobindings_WordBoard_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        auto ret = WordBoard::create();
        js_type_class_t *typeClass = js_get_type_from_native<WordBoard>(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordgeneratorautobindings_WordBoard_create : wrong number of arguments");
    return false;
}

bool js_wordgeneratorautobindings_WordBoard_createSceneWithWord(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_wordgeneratorautobindings_WordBoard_createSceneWithWord : Error processing arguments");

        auto ret = WordBoard::createSceneWithWord(arg0);
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordgeneratorautobindings_WordBoard_createSceneWithWord : wrong number of arguments");
    return false;
}

bool js_wordgeneratorautobindings_WordBoard_createWithWord(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 1) {
        std::string arg0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        JSB_PRECONDITION2(ok, cx, false, "js_wordgeneratorautobindings_WordBoard_createWithWord : Error processing arguments");

        auto ret = WordBoard::createWithWord(arg0);
        js_type_class_t *typeClass = js_get_type_from_native<WordBoard>(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordgeneratorautobindings_WordBoard_createWithWord : wrong number of arguments");
    return false;
}

bool js_wordgeneratorautobindings_WordBoard_createScene(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        auto ret = WordBoard::createScene();
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "WordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_wordgeneratorautobindings_WordBoard_createScene : wrong number of arguments");
    return false;
}

bool js_wordgeneratorautobindings_WordBoard_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    WordBoard* cobj = new (std::nothrow) WordBoard();

    js_type_class_t *typeClass = js_get_type_from_native<WordBoard>(cobj);

    // link the native object with the javascript object
    JS::RootedObject jsobj(cx, jsb_ref_create_jsobject(cx, cobj, typeClass, "WordBoard"));
    args.rval().set(OBJECT_TO_JSVAL(jsobj));
    if (JS_HasProperty(cx, jsobj, "_ctor", &ok) && ok)
        ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(jsobj), "_ctor", args);
    return true;
}


extern JSObject *jsb_WordScene_prototype;

void js_register_wordgeneratorautobindings_WordBoard(JSContext *cx, JS::HandleObject global) {
    jsb_WordBoard_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_WordBoard_class->name = "WordBoard";
    jsb_WordBoard_class->addProperty = JS_PropertyStub;
    jsb_WordBoard_class->delProperty = JS_DeletePropertyStub;
    jsb_WordBoard_class->getProperty = JS_PropertyStub;
    jsb_WordBoard_class->setProperty = JS_StrictPropertyStub;
    jsb_WordBoard_class->enumerate = JS_EnumerateStub;
    jsb_WordBoard_class->resolve = JS_ResolveStub;
    jsb_WordBoard_class->convert = JS_ConvertStub;
    jsb_WordBoard_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("createSceneWithWordInIslandAndSceneName", js_wordgeneratorautobindings_WordBoard_createSceneWithWordInIslandAndSceneName, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("create", js_wordgeneratorautobindings_WordBoard_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createSceneWithWord", js_wordgeneratorautobindings_WordBoard_createSceneWithWord, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createWithWord", js_wordgeneratorautobindings_WordBoard_createWithWord, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createScene", js_wordgeneratorautobindings_WordBoard_createScene, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    JS::RootedObject parent_proto(cx, jsb_WordScene_prototype);
    jsb_WordBoard_prototype = JS_InitClass(
        cx, global,
        parent_proto,
        jsb_WordBoard_class,
        js_wordgeneratorautobindings_WordBoard_constructor, 0, // constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);

    JS::RootedObject proto(cx, jsb_WordBoard_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "WordBoard"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::TrueHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<WordBoard>(cx, jsb_WordBoard_class, proto, parent_proto);
}

void register_all_wordgeneratorautobindings(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "goa", &ns);

    js_register_wordgeneratorautobindings_WordBoard(cx, ns);
}

