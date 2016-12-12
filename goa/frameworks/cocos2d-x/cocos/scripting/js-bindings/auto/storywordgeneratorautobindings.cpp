#include "scripting/js-bindings/auto/storywordgeneratorautobindings.hpp"
#include "scripting/js-bindings/manual/cocos2d_specifics.hpp"
#include "../../../../../runtime-src/Classes/puzzle/StoryWordBoard.hpp"

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
JSClass  *jsb_StoryWordBoard_class;
JSObject *jsb_StoryWordBoard_prototype;

bool js_storywordgeneratorautobindings_StoryWordBoard_createWithWords(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 6) {
        std::string arg0;
        std::vector<std::string> arg1;
        int arg2 = 0;
        std::string arg3;
        int arg4 = 0;
        int arg5 = 0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        ok &= jsval_to_std_vector_string(cx, args.get(1), &arg1);
        ok &= jsval_to_int32(cx, args.get(2), (int32_t *)&arg2);
        ok &= jsval_to_std_string(cx, args.get(3), &arg3);
        ok &= jsval_to_int32(cx, args.get(4), (int32_t *)&arg4);
        ok &= jsval_to_int32(cx, args.get(5), (int32_t *)&arg5);
        JSB_PRECONDITION2(ok, cx, false, "js_storywordgeneratorautobindings_StoryWordBoard_createWithWords : Error processing arguments");

        auto ret = StoryWordBoard::createWithWords(arg0, arg1, arg2, arg3, arg4,arg5);
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "StoryWordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_storywordgeneratorautobindings_StoryWordBoard_createWithWords : wrong number of arguments");
    return false;
}

bool js_storywordgeneratorautobindings_StoryWordBoard_create(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        auto ret = StoryWordBoard::create();
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "StoryWordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_storywordgeneratorautobindings_StoryWordBoard_create : wrong number of arguments");
    return false;
}

bool js_storywordgeneratorautobindings_StoryWordBoard_createSceneWithWords(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    if (argc == 6) {
        
        std::string arg0;
        std::vector<std::string> arg1;
        int arg2 = 0;
        std::string arg3;
        int arg4 = 0;
        int arg5 = 0;
        ok &= jsval_to_std_string(cx, args.get(0), &arg0);
        ok &= jsval_to_std_vector_string(cx, args.get(1), &arg1);
        ok &= jsval_to_int32(cx, args.get(2), (int32_t *)&arg2);
        ok &= jsval_to_std_string(cx, args.get(3), &arg3);
        ok &= jsval_to_int32(cx, args.get(4), (int32_t *)&arg4);
        ok &= jsval_to_int32(cx, args.get(5), (int32_t *)&arg5);
        JSB_PRECONDITION2(ok, cx, false, "js_storywordgeneratorautobindings_StoryWordBoard_createSceneWithWords : Error processing arguments");

        auto ret = StoryWordBoard::createSceneWithWords(arg0, arg1, arg2, arg3, arg4, arg5);
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "StoryWordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_storywordgeneratorautobindings_StoryWordBoard_createSceneWithWords : wrong number of arguments");
    return false;
}

bool js_storywordgeneratorautobindings_StoryWordBoard_createScene(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    if (argc == 0) {

        auto ret = StoryWordBoard::createScene();
        js_type_class_t *typeClass = js_get_type_from_native(ret);
        JS::RootedObject jsret(cx, jsb_ref_autoreleased_create_jsobject(cx, ret, typeClass, "StoryWordBoard"));
        args.rval().set(OBJECT_TO_JSVAL(jsret));
        return true;
    }
    JS_ReportError(cx, "js_storywordgeneratorautobindings_StoryWordBoard_createScene : wrong number of arguments");
    return false;
}

bool js_storywordgeneratorautobindings_StoryWordBoard_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JS::CallArgs args = JS::CallArgsFromVp(argc, vp);
    bool ok = true;
    StoryWordBoard* cobj = new (std::nothrow) StoryWordBoard();

    js_type_class_t *typeClass = js_get_type_from_native(cobj);

    // link the native object with the javascript object
    JS::RootedObject jsobj(cx, jsb_ref_create_jsobject(cx, cobj, typeClass, "StoryWordBoard"));
    args.rval().set(OBJECT_TO_JSVAL(jsobj));
    if (JS_HasProperty(cx, jsobj, "_ctor", &ok) && ok)
        ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(jsobj), "_ctor", args);
    return true;
}


extern JSObject *jsb_WordScene_prototype;

void js_register_storywordgeneratorautobindings_StoryWordBoard(JSContext *cx, JS::HandleObject global) {
    jsb_StoryWordBoard_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_StoryWordBoard_class->name = "StoryWordBoard";
    jsb_StoryWordBoard_class->addProperty = JS_PropertyStub;
    jsb_StoryWordBoard_class->delProperty = JS_DeletePropertyStub;
    jsb_StoryWordBoard_class->getProperty = JS_PropertyStub;
    jsb_StoryWordBoard_class->setProperty = JS_StrictPropertyStub;
    jsb_StoryWordBoard_class->enumerate = JS_EnumerateStub;
    jsb_StoryWordBoard_class->resolve = JS_ResolveStub;
    jsb_StoryWordBoard_class->convert = JS_ConvertStub;
    jsb_StoryWordBoard_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
        JS_PS_END
    };

    static JSFunctionSpec funcs[] = {
        JS_FS_END
    };

    static JSFunctionSpec st_funcs[] = {
        JS_FN("createWithWords", js_storywordgeneratorautobindings_StoryWordBoard_createWithWords, 5, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("create", js_storywordgeneratorautobindings_StoryWordBoard_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createSceneWithWords", js_storywordgeneratorautobindings_StoryWordBoard_createSceneWithWords, 5, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("createScene", js_storywordgeneratorautobindings_StoryWordBoard_createScene, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

    JS::RootedObject parent_proto(cx, jsb_WordScene_prototype);
    jsb_StoryWordBoard_prototype = JS_InitClass(
        cx, global,
        parent_proto,
        jsb_StoryWordBoard_class,
        js_storywordgeneratorautobindings_StoryWordBoard_constructor, 0, // constructor
        properties,
        funcs,
        NULL, // no static properties
        st_funcs);

    JS::RootedObject proto(cx, jsb_StoryWordBoard_prototype);
    JS::RootedValue className(cx, std_string_to_jsval(cx, "StoryWordBoard"));
    JS_SetProperty(cx, proto, "_className", className);
    JS_SetProperty(cx, proto, "__nativeObj", JS::TrueHandleValue);
    JS_SetProperty(cx, proto, "__is_ref", JS::TrueHandleValue);
    // add the proto and JSClass to the type->js info hash table
    jsb_register_class<StoryWordBoard>(cx, jsb_StoryWordBoard_class, proto, parent_proto);
}

void register_all_storywordgeneratorautobindings(JSContext* cx, JS::HandleObject obj) {
    // Get the ns
    JS::RootedObject ns(cx);
    get_or_create_js_obj(cx, obj, "goa", &ns);

    js_register_storywordgeneratorautobindings_StoryWordBoard(cx, ns);
}

