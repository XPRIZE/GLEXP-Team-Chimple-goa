package org.cocos2dx.cpp;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PointF;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;

public class CanvasView extends View implements OnTouchListener {
	private LipiTKJNIInterface _lipitkInterface;
	private LipiTKJNIInterface _recognizer;
	private Page _page;
	private PointF _lastSpot;
	public Stroke _currentStroke;
	private ArrayList<PointF> _currentStrokeStore;
	private ArrayList<Stroke> _strokes;
	private Stroke[] _recognitionStrokes;
	private ArrayList<Symbol> _symbols;
	public static String[] character;
	public static int StrokeResultCount = 0;

	ArrayList<Values> vals = new ArrayList<Values>();
	public static int min = 480;
	public static int max = 0;
	public static int minX = 800;
	public static int maxX = 0;
	public static int XCood = 0;
	private int mPosX;
	private int mPosY;
	private int mLastTouchX = 0;
	private int mLastTouchY = 0;
	boolean flag = true;
	boolean flagbs = true;
	public static boolean canvastest = true;
	MyCount counter;
	MyLongPressCount myLongPress;
	BufferedWriter out;
	AppActivity canObj = null;
	private static final String TAG = "DrawView";

	public CanvasView(Context context, AppActivity canObjParam) {
		super(context);
		canObj = canObjParam;
		globalvariable.paint = new Paint();
		setFocusable(true);
		setFocusableInTouchMode(true);
		this.setOnTouchListener(this);
		globalvariable.paint.setColor(Color.BLACK);
		globalvariable.paint.setAntiAlias(true);
		globalvariable.paint.setDither(true);
		globalvariable.paint.setStyle(Paint.Style.FILL);
		globalvariable.paint.setStrokeJoin(Paint.Join.BEVEL);
		globalvariable.paint.setStrokeCap(Paint.Cap.ROUND);
		globalvariable.paint.setStrokeWidth(5);
		counter = new MyCount(700, 1000);
		myLongPress = new MyLongPressCount(3000, 1000);
		_currentStroke = new Stroke();
		_strokes = new ArrayList<Stroke>();
		_recognizer = null;
		_symbols = new ArrayList<Symbol>();
		// Initialize lipitk
		Context contextlipi = getContext();
		File externalFileDir = contextlipi.getExternalFilesDir(null);
		String path = externalFileDir.getPath();
		Log.d("JNI", "Path: " + path);
		System.out.println("JNI Path: " + path);
		_lipitkInterface = new LipiTKJNIInterface(path, "SHAPEREC_ALPHANUM");
		_lipitkInterface.initialize();

		_page = new Page(_lipitkInterface);
		_recognizer = _lipitkInterface;
	}

	public boolean onTouch(View view, MotionEvent event) {
		Values vs = new Values();
		final int action = event.getAction();

		switch (action) {
		case MotionEvent.ACTION_DOWN: {
			min = 480;
			max = 0;
			maxX = 0;
			minX = 800;
			counter.cancel();
			myLongPress.start();
			globalvariable.IsUserWriting = true;

			vs.x = (int) event.getX();
			vs.y = (int) event.getY();
			float X = (float) vs.x;
			float Y = (float) vs.y;
			PointF p = new PointF(X, Y);
			_lastSpot = p;

			_currentStroke.addPoint(p);

			if (vs.y > max)
				max = vs.y;
			if (vs.y < min)
				min = vs.y;

			if (vs.x > maxX)
				maxX = vs.x;
			if (vs.x < minX)
				minX = vs.x;

			XCood = vs.x;
			globalvariable.strokeXY += "{" + vs.x + "," + vs.y + "}|";
			vals.add(vs);
			invalidate();
			System.out.println("action down stroke values===");

			break;
		}
		case MotionEvent.ACTION_MOVE: {
			counter.cancel();
			vs.x = (int) event.getX();
			vs.y = (int) event.getY();
			float X = (float) vs.x;
			float Y = (float) vs.y;
			PointF p = new PointF(X, Y);
			_lastSpot = p;
			_currentStroke.addPoint(p);

			// myLongPress.cancel();
			globalvariable.VSG = vs.x;
			globalvariable.LongPressFlag = true;

			globalvariable.strokeXY += "{" + vs.x + "," + vs.y + "}|";
			vals.add(vs);

			if (vs.y > max)
				max = vs.y;
			if (vs.y < min)
				min = vs.y;

			if (vs.x > maxX)
				maxX = vs.x;
			if (vs.x < minX)
				minX = vs.x;

			XCood = vs.x;
			System.out.println("action move stroke values===");
			invalidate();
			break;
		}
		case MotionEvent.ACTION_UP: {
			vs.x = (int) event.getX();
			vs.y = (int) event.getY();
			float X = (float) vs.x;
			float Y = (float) vs.y;
			PointF p = new PointF(X, Y);
			_lastSpot = p;
			_currentStroke.addPoint(p);
			_currentStrokeStore = new ArrayList<PointF>();
			_currentStrokeStore.add(p);
			System.out.println("Max===" + max);
			System.out.println("Min===" + min);
			globalvariable.strokeXY += "N";

			/*
			 * this condition should be checked only once for the first stroke
			 * after a time out
			 */
			if (globalvariable.isFirststroke) {
				if ((max - min) < 30 && (max != min)) {
					globalvariable.IsUserWriting = false;
				}
			}

			if (globalvariable.isFirststroke && globalvariable.IsUserWriting == false) {
				globalvariable.isFirststroke = true;
			} else {
				globalvariable.isFirststroke = false;
			}

			if (globalvariable.IsUserWriting) {
				counter.start();
			} else {
				if (XCood < 30) {
					// canObj.backspace();
				} else if (XCood > (canObj.width - 30)) {

					canObj.SpeakOutChoices();
				}

			}

			myLongPress.cancel();
			System.out.println("action up stroke values===");

			break;
		}
		}

		return true;
	}

	public void addStroke(Stroke stroke) {
		System.out.println("0000000000");
		_strokes.add(stroke);
		System.out.println("1111111111");
		_recognitionStrokes = new Stroke[_strokes.size()];
		System.out.println("2222222222");
		for (int s = 0; s < _strokes.size(); s++) {
			_recognitionStrokes[s] = _strokes.get(s);
			System.out.println("3333333333");
		}
			
		LipitkResult[] results = _recognizer.recognize(_recognitionStrokes);
		System.out.println("444444444:" + results.length);
		
		for (LipitkResult result : results) {
			Log.e("jni", "ShapeID = " + result.Id + " Confidence = " + result.Confidence);
		}

		String configFileDirectory = _recognizer.getLipiDirectory() + "/projects/alphanumeric/config/";
		System.out.println("configFileDirectory:" + configFileDirectory);
		character = new String[results.length];
		for (int i = 0; i < character.length; i++) {
			character[i] = _recognizer.getSymbolName(results[i].Id, configFileDirectory);
		}

		StrokeResultCount = results.length;

		_recognitionStrokes = null;
	}

	public void clearCanvas() {
		System.out.println("====inside clearcanvas====");
		canvasCpy.drawColor(Color.BLUE);
		System.out.println("====over clearcanvas====");
	}

	public static Canvas canvasCpy = null;
	int canvasWidth = 0;
	int canvasHeight = 0;
	private Bitmap bitmap;

	@Override
	protected void onDraw(Canvas canvas) {
		canvasHeight = canvas.getHeight();
		canvasWidth = canvas.getWidth();

		for (Values values : vals) {
			canvas.save();
			canvas.drawPoint(values.x, values.y, globalvariable.paint);
			canvas.restore();
			mLastTouchX = values.x;
			mLastTouchY = values.y;
		}
		File root = android.os.Environment.getExternalStorageDirectory();
		File file = new File(root, "Freepad/points.txt");
		if (!(file.isDirectory())) {
			return;
		} else {
			try {
				out = new BufferedWriter(new FileWriter(file));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				out.write(globalvariable.strokeXY);

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				out.close();

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			globalvariable.canvasvar = canvas;
			System.out.println("stroke values:-------" + globalvariable.strokeXY);
			System.out.println("stroke values:-------" + globalvariable.strokeXY.length());
		}

	}

	public class MyCount extends CountDownTimer {

		public MyCount(long millisInFuture, long countDownInterval) {
			super(millisInFuture, countDownInterval);
		}

		@Override
		public void onFinish() {
			System.out.println("Timer Flag HHHHHHHHHH 33333333:: " + globalvariable.TimerFlag);
			if (globalvariable.LongPressFlag) {
				canObj.Process();
				globalvariable.IsUserWriting = false;
				globalvariable.isFirststroke = true;
			}

			else {

			}

		}

		@Override
		public void onTick(long millisUntilFinished) {
			System.out.println("Tick tick Flag 1111112222222 :: " + globalvariable.TimerFlag);
		}

	}

	public class MyLongPressCount extends CountDownTimer {

		public MyLongPressCount(long millisInFuture, long countDownInterval) {
			super(millisInFuture, countDownInterval);
		}

		@Override
		public void onFinish() {
			System.out.println("ON finished 1111111111");
			globalvariable.LongPressFlag = false;
			System.out.println("Long press timer expiry: Timer Flag :: " + globalvariable.TimerFlag);
			canObj.ClearCanvas();

		}

		@Override
		public void onTick(long millisUntilFinished) {
			System.out.println("Tick tick Flag :: " + globalvariable.TimerFlag);
		}

	}

}

class Values {
	int x, y;

	@Override
	public String toString() {
		return x + ", " + y;
	}
}
