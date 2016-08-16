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


public class AppActivity extends Cocos2dxActivity {
  static {
    	System.out.println("Loaded library");
        System.loadLibrary("MyGame");
    }
    
	public static Activity _activity;

	private Handler handler = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// Save activity instance
		_activity = this;
		handler = new Handler(getMainLooper());
		
		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		if (resultCode == Activity.RESULT_OK) {
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
}
