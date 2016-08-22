/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.cpp;

import org.cocos2dx.lib.Cocos2dxActivity;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import java.io.IOException;
import org.cocos2dx.cpp.AssetInstaller;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.speech.tts.TextToSpeech.OnInitListener;
import android.text.method.ScrollingMovementMethod;
import android.util.Log;
import android.view.Display;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnLongClickListener;
import android.view.Window;
import android.view.WindowManager;
import android.widget.HorizontalScrollView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Scroller;
import android.widget.TextView;
import org.chimple.safari.R;
import android.graphics.drawable.ColorDrawable;

public class AppActivity extends Cocos2dxActivity  implements OnClickListener, OnLongClickListener {
  static {
    	System.out.println("Loaded library");
        System.loadLibrary("cocos2dcpp");
    }
    
	private static Activity _activity;
	private static AppActivity _appActivity;
	private static Context _context;
	private static int height;
	public static int width;
	
	private Vibrator v;
	private Handler handler = null;
	public ProgressDialog processLipitkDialog;

	//View Components
	private static CanvasView canvasView = null;
	private static LinearLayout main;
	private static LinearLayout cenerLayout;
	private static LinearLayout topLayout;
	private static LinearLayout subLayout;
	private static LinearLayout SecondLayout;
	private static ImageView Exit;
	private static HorizontalScrollView HorizontalSV;
	private static TextView[] TV = new TextView[1];

	public final int MY_DATA_CHECK_CODE = 1;
	private TextToSpeech mTts = null;


	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		_appActivity = this;
		_activity = this;
		_context = this;
		handler = new Handler(getMainLooper());
		installAssets();

		Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE)).getDefaultDisplay();
		width = (int) (display.getWidth() * 0.5);
		height = (int) (display.getHeight());

		v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		
		Intent checkIntent = new Intent();
		checkIntent.setAction(TextToSpeech.Engine.ACTION_CHECK_TTS_DATA);
		startActivityForResult(checkIntent, MY_DATA_CHECK_CODE);		
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		if (requestCode == MY_DATA_CHECK_CODE) {
			if (resultCode == TextToSpeech.Engine.CHECK_VOICE_DATA_PASS) {
				// success, create the TTS instance
				mTts = new TextToSpeech(this, new OnInitListener() {
					public void onInit(int status) {
					}
				});
			} else {
				// missing data, install it
				Intent installIntent = new Intent();
				installIntent.setAction(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
				startActivity(installIntent);
			}
		}
		else if (resultCode == Activity.RESULT_OK) {
			final String photoUrl = data.getStringExtra(Utility.PHOTO_DESTINATION_URL);
			System.out.println("got result:" + photoUrl);

			handler.postDelayed(new Runnable() {
				public void run() {
					if (!photoUrl.isEmpty()) {
						execute(photoUrl);
					}
				}
			}, 100 * 1);

		} else {
			handler.postDelayed(new Runnable() {
				public void run() {
					execute("CANCELLED");
				}
			}, 100 * 1);
			
		}
	}

	private void installAssets() {
		AssetInstaller assetInstaller = new AssetInstaller(getApplicationContext(), "projects");
		try {
			assetInstaller.execute();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}


	public static native boolean photoDestinationURL(String path);

	private void execute(final String photoUrl) {
		new Thread(new Runnable() {
			public void run() {
				System.out.println("comes and calling desimation with :" + photoUrl);
				photoDestinationURL(photoUrl);
			}
		}).start();
	}

	public static void takePhoto() {
		String tag = "Take Photo";
		String message = "I've been called from C++";
		Log.d(tag, "Showing alert dialog: " + message);

		Intent startCameraActivity = new Intent(_activity, CameraActivity.class);
		_activity.startActivityForResult(startCameraActivity, 0);
	}


	private static void showCustomDialog(Context context, final int posX, final int posY, final int hGravity, final int vGravity) {
		// custom dialog
		final Dialog dialog = new Dialog(context);
		dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
		dialog.getWindow().setBackgroundDrawable(new ColorDrawable(android.graphics.Color.TRANSPARENT));

		WindowManager.LayoutParams wmlp = dialog.getWindow().getAttributes();
		wmlp.gravity = hGravity| vGravity;
		wmlp.x = posX; // x position
		wmlp.y = posY; // y position

		canvasView = new CanvasView(_context, _appActivity);

		main = new LinearLayout(_activity);
		main.setOrientation(LinearLayout.VERTICAL);
		main.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
				LinearLayout.LayoutParams.MATCH_PARENT));

		topLayout = new LinearLayout(_activity);
		topLayout.setLayoutParams(
				new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, ((height / 2) + 130)));
		topLayout.setOrientation(LinearLayout.VERTICAL);
		topLayout.setBackgroundColor(Color.GREEN);
		topLayout.addView(canvasView);

		cenerLayout = new LinearLayout(_activity);
		cenerLayout.setOrientation(LinearLayout.VERTICAL);
		cenerLayout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
				LinearLayout.LayoutParams.WRAP_CONTENT));
		cenerLayout.setBackgroundColor(Color.WHITE);

		for (int i = 0; i < TV.length; i++) {
			TV[i] = new TextView(_activity);
			TV[i].setTextColor(Color.BLUE);
			TV[i].setTextSize(40);
			TV[i].setGravity(Gravity.CENTER_HORIZONTAL);
			TV[i].setTypeface(null, Typeface.BOLD);
			TV[i].setHeight(height / 8);
			TV[i].setPadding(5, 0, 0, 0);
			TV[i].setScroller(new Scroller(_activity));
			TV[i].setVerticalScrollBarEnabled(true);
			TV[i].setMovementMethod(ScrollingMovementMethod.getInstance());
			cenerLayout.addView(TV[i]);
		}

		SecondLayout = new LinearLayout(_activity);
		SecondLayout.setOrientation(LinearLayout.HORIZONTAL);
		SecondLayout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 70));
		SecondLayout.setBackgroundColor(Color.RED);

		HorizontalSV = new HorizontalScrollView(_activity);
		HorizontalSV
				.setLayoutParams(new LinearLayout.LayoutParams((width - 125), LinearLayout.LayoutParams.WRAP_CONTENT));

		SecondLayout.addView(HorizontalSV);

		subLayout = new LinearLayout(_activity);
		subLayout.setOrientation(LinearLayout.HORIZONTAL);
		subLayout.setLayoutParams(
				new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, ((height / 8) - 16)));
		subLayout.setGravity(Gravity.BOTTOM);
		Exit = new ImageView(_activity);

		Exit.setImageResource(R.drawable.exit);
		Exit.setPadding(30, 0, 0, 0);

		Exit.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				dialog.dismiss();
			}
		});

		subLayout.addView(Exit);

		main.addView(cenerLayout);
		main.addView(topLayout);
		main.addView(subLayout);
		dialog.setContentView(main);

		dialog.getWindow().setLayout(width, height);
		dialog.show();
	}	

public static void drawCanvas(final int posX, final int posY, final int hGravity, final int vGravity){
		String tag = "drawCanvas";
		String message = "I've been called from C++";
		Log.d(tag, "Showing alert dialog: " + message);

		_activity.runOnUiThread(new Runnable() {
			public void run() {
				showCustomDialog(_activity, posX, posY, hGravity, vGravity);
			}
		});

		// Intent startCameraActivity = new Intent(_activity,
		// CameraActivity.class);
		// _activity.startActivityForResult(startCameraActivity, 0);

	}

	public void Process() {
		ProgressLipiTKTask ObjAsy = new ProgressLipiTKTask();
		ObjAsy.execute();
	}

	@Override
	public boolean onLongClick(View v) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public void onClick(View v) {

	}

	/*
	 * This method will handle the swipe across the edge. Calls Freepad once the
	 * touch area reaches the right end of screen
	 */
	public void ClearCanvas() {
		if (canvasView != null) {
			System.out.println("ClearCanvas 222222");
			topLayout.removeView(canvasView);
			canvasView = new CanvasView(_context, _appActivity);
			System.out.println("ClearCanvas 33333333");
			topLayout.setLayoutParams(
					new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, ((height / 2) + 130)));
			System.out.println("ClearCanvas 4444444");
			topLayout.addView(canvasView);
		}
	}

	class ProgressLipiTKTask extends AsyncTask<Void, Void, String> {
		@Override
		protected String doInBackground(Void... unsued) {
			canvasView.addStroke(canvasView._currentStroke);
			return null;
		}

		@Override
		protected void onPostExecute(String sResponse) {
			System.out.println("ProgressLipiTKTask:onPostExecute 33333333");
			processLipitkDialog.dismiss();
			FreePadCall();
		}

		@Override
		protected void onPreExecute() {
			System.out.println("ProgressLipiTKTask:onPreExecute 33333333");
			processLipitkDialog = ProgressDialog.show(AppActivity.this, "Processing", "Please wait...", true);

		}
	}

	public void FreePadCall() {

		HorizontalSV.setVisibility(View.VISIBLE);
		if (canvasView != null) {
			topLayout.removeView(canvasView);
			canvasView.destroyDrawingCache();
			canvasView = new CanvasView(_context, _appActivity);
			topLayout.setLayoutParams(
					new LinearLayout.LayoutParams(LinearLayout.LayoutParams.FILL_PARENT, ((height / 2) + 130)));
			topLayout.addView(canvasView);
		}
		System.out.println("setting canvas character:" + canvasView.character[0]);
		TV[0].setText(canvasView.character[0]);
		final String str1 = TV[0].getText().toString();
		System.out.println("specking string" + str1);

		handler.postDelayed(new Runnable() {
			public void run() {
				if (!str1.isEmpty()) {
					executeRecognizedCharcter(str1);
				}
			}
		}, 100 * 1);

		mTts.speak(str1, 0, null);
	}

	int curr_indx = 0;

	public void SpeakOutChoices() {
		if (canvasView != null) {
			topLayout.removeView(canvasView);
			canvasView = new CanvasView(_context, _appActivity);
			topLayout.setLayoutParams(
					new LinearLayout.LayoutParams(LinearLayout.LayoutParams.FILL_PARENT, ((height / 2) + 130)));
			topLayout.addView(canvasView);
		}
		System.out.println("index" + curr_indx + "---" + CanvasView.StrokeResultCount);
		if (curr_indx < CanvasView.StrokeResultCount) {
			TV[0].setText(CanvasView.character[curr_indx]);
			String Choice1 = CanvasView.character[curr_indx];
			mTts.speak(Choice1, 0, null);
			curr_indx++;
			if (curr_indx == CanvasView.StrokeResultCount)
				curr_indx = 0;

		}
	}

	public static native boolean sendRecognizedStringToGame(String path);

	private void executeRecognizedCharcter(final String characterStr) {
		new Thread(new Runnable() {
			public void run() {
				System.out.println("comes and calling desimation with :" + characterStr);
				sendRecognizedStringToGame(characterStr);
			}
		}).start();
	}	
}
