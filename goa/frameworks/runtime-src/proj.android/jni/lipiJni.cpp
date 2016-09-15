/************************************************************************
 * FILE DESCR: Implementation of JNI Interface for the Android version
 *			   of LipiTk 	
 * CONTENTS:
 *			initializeNative
 *			recognizeNative
 *
 * AUTHOR:     Ajay Patial
 *
 * DATE:       August 30, 2012
 * CHANGE HISTORY:
 * Author       Date            Description of change
 ************************************************************************/
#include "LipiJni.h"

LTKLipiEngineInterface* lipiEngine;
LTKShapeRecognizer* lipiShapeReco = NULL;

/**********************************************************************************
* AUTHOR		: Ajay Patial
* DATE			: 30-AUG-2012
* NAME			: initializeNative
* DESCRIPTION	: Main function. This function initializes lipiEngine, creates
*				  shape recognizer and loads the model data.
* ARGUMENTS		: 
* RETURNS		: 
* NOTES			:
* CHANGE HISTROY
* Author			Date				Description of change
*************************************************************************************/

void JNICALL Java_org_cocos2dx_javascript_LipiTKJNIInterface_initializeNative(JNIEnv *env,
																 jobject this_object, 
																 jstring lipiDirectory,
																 jstring lipiProject)
{
	cout << "lipitkLocation 0000" << endl;
	int result;
	cout << "lipitkLocation 1111" << endl;
	char* lipitkLocation = (char*)env->GetStringUTFChars(lipiDirectory, NULL);
	cout << "lipitkLocation 222" << endl;
	string projectStr = string((char*)env->GetStringUTFChars(lipiProject, NULL));

	LTKLipiEngineInterface* lipiEngine = createLTKLipiEngine();

	lipiEngine->setLipiRootPath(lipitkLocation);

	result = lipiEngine->initializeLipiEngine();

	if(result != 0) {
		cout << "Error: LipiEngine could not be initialized." << endl;
		return;
	}
	
	result = lipiEngine->createShapeRecognizer(projectStr, &lipiShapeReco);

	if(result != 0) {
		cout << "Error: Shape Recognizer could not be created." << endl;
		return ;
	}

	result = lipiShapeReco->loadModelData();

	if(result != 0) {
		cout << "Error: Model data could not be loaded." << endl;
		return;
	}
}

/**********************************************************************************
* AUTHOR		: Ajay Patial
* DATE			: 30-AUG-2012
* NAME			: recognizeNative
* DESCRIPTION	: This function gets invoked from java application when strokes
*				  drawn on the UI are to be recognized.
* ARGUMENTS		: 
* RETURNS		: returns with the recognized character
* NOTES			:
* CHANGE HISTROY
* Author			Date				Description of change
*************************************************************************************/

jobjectArray 
	JNICALL Java_org_cocos2dx_javascript_LipiTKJNIInterface_recognizeNative(JNIEnv *env,
															   jobject this_object,
															   jobjectArray StrokeArray,
															   jint NumStrokes)
{
	jobjectArray ResultSetArray;

	try
	{
		jclass strokeClass = env->FindClass("org/cocos2dx/javascript/Stroke");
		if(strokeClass == NULL)
			cout << "strokeClass ID is NULL" << endl;

		jmethodID getNumPointsMethodID = env->GetMethodID(strokeClass, 
														  "getNumberOfPoints",
														  "()I");
		if(getNumPointsMethodID == NULL)
			cout << "getNumPointsMethodID ID is NULL" << endl;

		jmethodID getPointsAtMethodID = env->GetMethodID(strokeClass, 
														 "getPointAt",
														 "(I)Landroid/graphics/PointF;");
		if(getPointsAtMethodID == NULL)
			cout << "getPointsAtMethodID ID is NULL" << endl;

		jclass pointFClass = env->FindClass("android/graphics/PointF");
		if(pointFClass == NULL)
			cout << "pointFClass ID is NULL" << endl;

		jfieldID xFieldID = env->GetFieldID(pointFClass, "x", "F");

		jfieldID yFieldID = env->GetFieldID(pointFClass, "y", "F");

		jclass resultClass = env->FindClass("org/cocos2dx/javascript/LipitkResult");
		if(resultClass == NULL)
			cout << "resultClass ID is NULL" <<  endl;

		jfieldID ID = env->GetFieldID(resultClass, "Id", "I");

		jfieldID confidence = env->GetFieldID(resultClass, "Confidence", "F");

		jmethodID oneCtorID = env->GetMethodID(resultClass, "<init>", "()V");
		if(oneCtorID == NULL)
			cout << "oneCtorID is NULL" << endl;

		vector<int> outSubSetOfClasses;
		vector<LTKShapeRecoResult> oResultSet;
	
		LTKScreenContext oScreenContext;
		LTKCaptureDevice ltkcapturedevice;

		ltkcapturedevice.setXDPI(265.0);
		ltkcapturedevice.setYDPI(265.0);

		try
		{
			oScreenContext.setBboxLeft(0);
			oScreenContext.setBboxBottom(0);
			oScreenContext.setBboxRight(480);
			oScreenContext.setBboxTop(800);
		}
		catch (...)
		{
			cout << "Exception inside copyscreencontext" <<endl;
		}

		LTKTraceGroup oTraceGroup;
		vector<float> point;
	
		for (int j = 0; j < (int)NumStrokes; j++)
		{
			jobject SingleStrokeObj = env->GetObjectArrayElement(StrokeArray, j);
		
			LTKTrace trace;

			int ArrayStrokeSize = env->CallIntMethod(SingleStrokeObj, getNumPointsMethodID);

			for (int i = 0; i < ArrayStrokeSize; i++)
			{
				jobject StrokeEle = env->CallObjectMethod(SingleStrokeObj, getPointsAtMethodID, i);
				jint StrokeXele = env->GetFloatField(StrokeEle,xFieldID);
				jint StrokeYele = env->GetFloatField(StrokeEle,yFieldID);
				point.push_back(StrokeXele);
				point.push_back(StrokeYele);
				trace.addPoint(point);
				point.clear();
			}
			oTraceGroup.addTrace(trace);
		}

		if(lipiShapeReco)
		{
			int iResult = lipiShapeReco->recognize(oTraceGroup, 
												   oScreenContext,
												   outSubSetOfClasses,
												   CONFIDENCE_THRESHOLD,
												   NUMOFCHOICES, 
												   oResultSet);
		}
		else 
		{
			cout << "lipiShapeReco is NULL" << endl;
		}
			
		ResultSetArray = env->NewObjectArray(oResultSet.size(), resultClass, NULL);
	  
		for (int k = 0; k < oResultSet.size(); k++) 
		{
			jobject obj = env->NewObject(resultClass, oneCtorID);
			env->SetIntField(obj, ID, oResultSet[k].getShapeId());
			env->SetFloatField(obj, confidence, oResultSet[k].getConfidence());
			env->SetObjectArrayElement(ResultSetArray, k, obj);
			obj = NULL;
		}
	}
	catch(exception e)
	{
		cout << "Exception inside recognizeNative" << endl;
	}

	return ResultSetArray;
}
