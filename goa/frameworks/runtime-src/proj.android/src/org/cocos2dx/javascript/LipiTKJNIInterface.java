package org.cocos2dx.javascript;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Iterator;
import java.util.List;

import android.graphics.PointF;
import android.util.Log;

public class LipiTKJNIInterface {
	private String _lipiDirectory;
	private String _project;

	// static {
	// 	try {
	// 		System.loadLibrary("cocos2dcpp");
	// 	} catch (Exception ex) {
	// 		System.out.println(ex.getMessage());
	// 	}
	// }

	// Initializes the interface with a directory to look for projects in
	// the name of the project to use for recognition, and the name
	// of the ShapeRecognizer to use.
	public LipiTKJNIInterface(String lipiDirectory, String project) {
		_lipiDirectory = lipiDirectory;
		_project = project;
	}

	public String getSymbolName(int id, String project_config_dir) {
		String line;
		int temp;
		String[] splited_line = null;
		try {
			File map_file = new File(project_config_dir + "unicodeMapfile_alphanumeric.ini");
			BufferedReader readIni = new BufferedReader(new FileReader(map_file));
			readIni.readLine();
			readIni.readLine();
			readIni.readLine();
			readIni.readLine();
			while ((line = readIni.readLine()) != null) {
				splited_line = line.split(" ");
				Log.d("JNI_LOG", "split 0=" + splited_line[0]);
				Log.d("JNI_LOG", "split 1=" + splited_line[1]);
				splited_line[0] = splited_line[0].substring(0, splited_line[0].length() - 1); // trim
																								// out
																								// =
																								// sign
				if (splited_line[0].equals((new Integer(id)).toString())) {
					splited_line[1] = splited_line[1].substring(2);
					temp = Integer.parseInt(splited_line[1], 16);
					System.out.println("returning string value of:" + String.valueOf((char) temp));
					return String.valueOf((char) temp);
				}
			}
		} catch (Exception ex) {
			Log.d("JNI_LOG", "Exception in getSymbolName Function" + ex.toString());
			return "-1";
		}
		return "0";
	}

	public void initialize() {
		initializeNative(_lipiDirectory, _project);
	}

	public LipitkResult[] recognize(Stroke[] strokes) {
		System.out.println("input strokes:" + strokes.length);
		
		System.out.println("input strokes:" + strokes.length);
		for(int j=0;j<strokes.length;j++) {
			Stroke st = strokes[j];
			
			List<PointF> points = st.getPoints();
			if(points != null) {
				Iterator<PointF> it = points.iterator();
				while(it.hasNext()) {
					PointF pf = it.next();
					System.out.println("pf.x:" + pf.x + "pf.y:" + pf.y);
				}
			}			
		}
		
		LipitkResult[] results = recognizeNative(strokes, strokes.length);
		System.out.println("recognize native 333343333333333");
		for (LipitkResult result : results)
			Log.d("jni", "ShapeID = " + result.Id + " Confidence = " + result.Confidence);

		return results;
	}

	// Initializes the LipiTKEngine in native code
	private native void initializeNative(String lipiDirectory, String project);

	// Returns a list of results when recognizing the given list of strokes
	private native LipitkResult[] recognizeNative(Stroke[] strokes, int numJStrokes);

	public String getLipiDirectory() {
		return _lipiDirectory;
	}

}
