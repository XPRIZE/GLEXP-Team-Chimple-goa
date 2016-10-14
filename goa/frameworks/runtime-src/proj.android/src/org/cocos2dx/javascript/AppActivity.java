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
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.net.wifi.WifiManager;
import android.net.wifi.p2p.WifiP2pGroup;
import android.net.wifi.p2p.nsd.WifiP2pServiceInfo;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import java.io.IOException;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.speech.tts.TextToSpeech.OnInitListener;
import android.view.Display;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnLongClickListener;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import org.chimple.goa.R;
import android.graphics.drawable.ColorDrawable;
import android.bluetooth.BluetoothAdapter;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.IntentFilter;
import android.os.Message;
import android.util.Log;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import android.widget.Toast;

public class AppActivity extends Cocos2dxActivity  implements OnClickListener, OnLongClickListener{
	static {
		System.out.println("Loaded library");
		System.loadLibrary("cocos2djs");
	}
	private static final boolean D = true;
	
	private static Activity _activity;
	private static AppActivity _appActivity;
	private static Context _context;
	private static int height;
	public static int width;

	private Vibrator v;
	private Handler handler = null;
	public ProgressDialog processLipitkDialog;

	public ProgressDialog processDiscoveryDialog;
	boolean isBluetoothDiscoveryFinished = true;

	//View Components
	private static CanvasView canvasView = null;
	private static LinearLayout main;
	private static LinearLayout cenerLayout;
	private static RelativeLayout topLayout;
	private static TextView[] TV = new TextView[1];

	public final int MY_DATA_CHECK_CODE = 1;
	private TextToSpeech mTts = null;
	private static Dialog dialog;
	private static String currentGameName;
	public static final String TAG = "GOA";

	public static final int BLUETOOTH_REQUEST_DISCOVERABLE_CODE = 42;
	public static String bluetoothDeviceName = null;
    // Intent request codes
    private static final int REQUEST_CONNECT_DEVICE_SECURE = 11;
    private static final int REQUEST_ENABLE_BT = 13;

	// Return Intent extra
    public static String EXTRA_DEVICE_ADDRESS = "device_address";


    private BlueToothSupport blueToothSupport = null;
    private BluetoothChatService mChatService = null;

	private boolean isBlueToothAvailable = false;
	private StringBuffer mOutStringBuffer;

	private List bluetoothAddresses;

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
		height = (int) (display.getHeight() * 0.5);

		v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

		Intent checkIntent = new Intent();
		checkIntent.setAction(TextToSpeech.Engine.ACTION_CHECK_TTS_DATA);
		startActivityForResult(checkIntent, MY_DATA_CHECK_CODE);
		
        blueToothSupport = BlueToothSupport.getInstance(this, null);		
        blueToothSupport.setBluetoothChatService();

        // Get local Bluetooth adapter
        if(blueToothSupport.getBluetoothAdapter() == null) {
            isBlueToothAvailable = false;
		} else {
			isBlueToothAvailable = true;
		}	

        // If BT is not on, request that it be enabled.
        // setupChat() will then be called during onActivityResult
        // Get local Bluetooth adapter
        if(BluetoothAdapter.getDefaultAdapter() != null &&
                BluetoothAdapter.getDefaultAdapter().isEnabled()) {
            blueToothSupport = BlueToothSupport.getInstance(this, null);
            blueToothSupport.setBluetoothChatService();
        }		

		mOutStringBuffer = new StringBuffer("");
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
		else if(requestCode == REQUEST_ENABLE_BT) {
			// When the request to enable Bluetooth returns
			if (resultCode == Activity.RESULT_OK) {
				// Bluetooth is now enabled, so set up a chat session
				initializeBluetoothSupport();
				ensureDiscoverable();
			} else {
				// User did not enable Bluetooth or an error occurred
				Log.d(TAG, "BT not enabled");
				showToast("BT not enabled");								
			}
		}
		else if(requestCode == BLUETOOTH_REQUEST_DISCOVERABLE_CODE) {
			// Bluetooth Discoverable Mode does not return the standard
			// Activity result codes.
			// Instead, the result code is the duration (seconds) of
			// discoverability or a negative number if the user answered "NO".
			if (resultCode < 0) {
				//showWarning();
			} else {
				Log.d(TAG, "Discoverable mode enabled.");
				showToast("Discoverable mode enabled.");	
				startDiscoveryForDevices();			
				//Intent serverIntent = null;
				//serverIntent = new Intent(this, DeviceListActivity.class);
				//startActivityForResult(serverIntent, REQUEST_CONNECT_DEVICE_SECURE);
			}
		} 
		// else if(requestCode ==  REQUEST_CONNECT_DEVICE_SECURE) {
		// 	// When DeviceListActivity returns with a device to connect
		// 	if (resultCode == Activity.RESULT_OK) {
		// 		blueToothSupport.connectDevice(data, true);
		// 		blueToothSupport.setActivity(this);
		// 	}			
		// }
		else if (resultCode == Activity.RESULT_OK) {
			final String photoUrl = data.getStringExtra(Utility.PHOTO_DESTINATION_URL);

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

	public static native boolean discoveredBluetoothDevices(String devices);
	

	public void discoveryFinished() {
		isBluetoothDiscoveryFinished = true;
	} 
 
	public void sendDiscoveredBluetoothDevices(final String devices) {
		((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("comes and calling desimation with :" +devices);
				discoveredBluetoothDevices(devices);
			}
		});
	}


	
	public static native boolean photoDestinationURL(String path);

	private void execute(final String photoUrl) {
		((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("comes and calling desimation with :" + photoUrl);
				photoDestinationURL(photoUrl);
			}
		});
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
		String tag = "showCustomDialog";
		dialog = new Dialog(context);
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
		topLayout = new RelativeLayout(_activity);
		topLayout.setLayoutParams(
				new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
		topLayout.setBackgroundColor(Color.WHITE);

		cenerLayout = new LinearLayout(_activity);
		cenerLayout.setOrientation(LinearLayout.HORIZONTAL);
		LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,
				LinearLayout.LayoutParams.WRAP_CONTENT);
		cenerLayout.setGravity(Gravity.CENTER_HORIZONTAL | Gravity.CENTER_VERTICAL);
		cenerLayout.setLayoutParams(params);
		cenerLayout.setBackgroundColor(Color.WHITE);
		cenerLayout.addView(canvasView);
		main.setAlpha(0.5f);
		main.addView(cenerLayout);
		main.addView(topLayout);
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
				String tag1 = "UI RUN";
				Log.d(tag1, "Showing alert in RUN Method on UI Thread");
				showCustomDialog(_activity, posX, posY, hGravity, vGravity);
			}
		});
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
			cenerLayout.removeView(canvasView);
			canvasView = new CanvasView(_context, _appActivity);
			cenerLayout.setLayoutParams(
					new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
			cenerLayout.addView(canvasView);
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
			processLipitkDialog.dismiss();
			FreePadCall();
		}

		@Override
		protected void onPreExecute() {
			processLipitkDialog = ProgressDialog.show(AppActivity.this, "Processing", "Please wait...", true);

		}
	}

	public void FreePadCall() {
		if (canvasView != null) {
			cenerLayout.removeView(canvasView);
			canvasView.destroyDrawingCache();
			canvasView = new CanvasView(_context, _appActivity);
			cenerLayout.setLayoutParams(
					new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
			cenerLayout.addView(canvasView);
		}
		//TV[0].setText(canvasView.character[0]);
		final String str1 = canvasView.character[0].toString();
		System.out.println("all matching possibilities");
		int indexI = 0;
		for (String rChar: canvasView.character) {
			Log.d(TAG, "Recongnized characters: " + rChar + " with confidence:" + canvasView.confidences[indexI]);
			indexI++;
		}

		
	
		dialog.dismiss();
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
			cenerLayout.removeView(canvasView);
			canvasView = new CanvasView(_context, _appActivity);
			cenerLayout.setLayoutParams(
					new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
			cenerLayout.addView(canvasView);
		}
		if (curr_indx < CanvasView.StrokeResultCount) {
			//TV[0].setText(CanvasView.character[curr_indx]);
			String Choice1 = CanvasView.character[curr_indx];
			mTts.speak(Choice1, 0, null);
			curr_indx++;
			if (curr_indx == CanvasView.StrokeResultCount)
				curr_indx = 0;

		}
	}

	public static native boolean sendRecognizedStringToGame(String path);

	private void executeRecognizedCharcter(final String characterStr) {
		((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("comes and calling desimation with :" + characterStr);
				sendRecognizedStringToGame(characterStr);
			}
		});
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
	}



	@Override
	protected void onStop() {
		super.onStop();
	}

	@Override
	public void onResume() {
		super.onResume();
	}

	@Override
	public void onPause() {
		super.onPause();
	}

	public void showToast(final String msg) {
        AppActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(AppActivity.this, msg, Toast.LENGTH_SHORT).show();

            }
        });
    }	

	public void appendStatus(String status) {
		Log.d(TAG, "Status from WIFi-Direct: " + status);
	}

	public static boolean launchGameNotification() {
		boolean result = false;
		if(_appActivity.currentGameName != null) {
			Log.d(TAG, "launchGameNotification WIFi-Direct:" + _appActivity.currentGameName);
			String gameName = _appActivity.currentGameName;
			result = launchGame(gameName);
			_appActivity.currentGameName = null; 
		}
		return result;
	}

	public static native boolean launchGame(String gameName);		

	class BluetoothDiscoveryTask extends AsyncTask<Void, Void, String> {
		@Override
		protected String doInBackground(Void... unsued) {
			doDiscovery();
			String listAddresses = "";
			if(bluetoothAddresses != null && bluetoothAddresses.size() > 0) {
				for(int i = 0; i < bluetoothAddresses.size(); i++) {
					listAddresses += bluetoothAddresses.get(i);
					if(i != bluetoothAddresses.size() - 1) {
						listAddresses += ",";
					}
				}				
			}
			return listAddresses;
		}

		@Override
		protected void onPostExecute(String sResponse) {
			Log.d(TAG, "DISMISSING PROCESS DISCOVERY DIALOG:");			
			processDiscoveryDialog.dismiss();
			System.out.println("HEOIUWEROIWEURWER:" + sResponse);
			displayBluetoothDevices(sResponse);
		}

		@Override
		protected void onPreExecute() {
			AppActivity.this.runOnUiThread(new Runnable() {
				public void run() {
					Log.d(TAG, "SHOWING PROCESS DISCOVERY DIALOG:");
					processDiscoveryDialog = ProgressDialog.show(AppActivity.this, "Processing", "Please wait...", true);
				}
			});
		}
	}	

	private void displayBluetoothDevices(final String result) {
		Log.d(TAG, "DONE WIHT PROCESS DISCOVERY DIALOG:" + result);	
		((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("comes and calling c++ with :" + result);
				discoveredBluetoothDevices(result);
			}
		});
		
	}

	public void startDiscoveryForDevices() {
		bluetoothAddresses = new ArrayList();
		BluetoothDiscoveryTask ObjAsy = new BluetoothDiscoveryTask();
		ObjAsy.execute();
	}


	private void ensureDiscoverable() {
        if (D) Log.d(TAG, "ensure discoverable");
        if (blueToothSupport.getBluetoothAdapter().getScanMode() !=
                BluetoothAdapter.SCAN_MODE_CONNECTABLE_DISCOVERABLE) {
            Intent discoverableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE);
            discoverableIntent.putExtra(BluetoothAdapter.EXTRA_DISCOVERABLE_DURATION, 300);
            //startActivity(discoverableIntent);
            startActivityForResult(discoverableIntent, BLUETOOTH_REQUEST_DISCOVERABLE_CODE);
        } else {
			if (D) Log.d(TAG, "ensure discoverable => startDiscoveryForDevices");
			startDiscoveryForDevices();
            //Intent serverIntent = null;
            //serverIntent = new Intent(this, DeviceListActivity.class);
            //startActivityForResult(serverIntent, REQUEST_CONNECT_DEVICE_SECURE);
        }
    }


    /**
     * Start device discover with the BluetoothAdapter
     */
    private void doDiscovery() {
        if (D) Log.d(TAG, "doDiscovery()");
		// If we're already discovering, stop it
		blueToothSupport.cancelDiscoveryIfAlreadyStarted();

		// Request discover from BluetoothAdapter
		blueToothSupport.startDiscovery();
		isBluetoothDiscoveryFinished = false;
		do {
		} while(!isBluetoothDiscoveryFinished);

    }

	private void initializeBluetoothSupport() {
		if(blueToothSupport == null) {
			blueToothSupport = BlueToothSupport.getInstance(this, bluetoothDeviceName);
			blueToothSupport.setBluetoothChatService();
		}
		mChatService = blueToothSupport.getBluetoothChatService();		
	}

	public static void connectToAddress(String address) {
		_appActivity.blueToothSupport.connectDevice(address, true);
		_appActivity.blueToothSupport.setActivity(_appActivity);
	}

	public static void enableMultiPlayerMode(String bluetoothName) {
		bluetoothDeviceName = bluetoothName;
		if(BluetoothAdapter.getDefaultAdapter() != null) {
			if(!BluetoothAdapter.getDefaultAdapter().isEnabled())
			{
				Log.d(TAG, "enableMultiPlayerMode 1111:" + bluetoothName);
				Intent enableIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
    		    _activity.startActivityForResult(enableIntent, REQUEST_ENABLE_BT);
			} else {
				Log.d(TAG, "enableMultiPlayerMode 2222");
				_appActivity.initializeBluetoothSupport();
				_appActivity.ensureDiscoverable();
				BluetoothAdapter.getDefaultAdapter().setName(bluetoothDeviceName);
			}			
		} else {
			//no bluetooth
			Log.d(TAG, "enableMultiPlayerMode 33333");
		}
	}
 

	public static void disconnectSockets() {
		Log.d(TAG, "disconnecting sockets from JNI");
		_appActivity.blueToothSupport.getBluetoothChatService().stop();
	}
 	/**
     * Sends a message.
     *
     * @param message A string of text to send.
     */
    public static void sendMessage(String data) {
        // Check that we're actually connected before trying anything
		if(_appActivity.mChatService == null) {
			_appActivity.mChatService = _appActivity.blueToothSupport.getBluetoothChatService();
		}
        if (_appActivity.mChatService.getState() != BluetoothChatService.STATE_CONNECTED) {
			_activity.runOnUiThread(new Runnable() {
				public void run() {
					Log.d(TAG, "Not Connected Status");
					Toast.makeText(_appActivity, R.string.not_connected, Toast.LENGTH_SHORT).show();
					_appActivity.connectedToPeer("notConnected");
				}
			});			
            return;
        }

        // Check that there's actually something to send
        if (data.length() > 0) {
            // Get the message bytes and tell the BluetoothChatService to write
            byte[] send = data.getBytes();
            _appActivity.mChatService.write(send);

            // Reset out string buffer to zero and clear the edit text field
            _appActivity.mOutStringBuffer.setLength(0);
        }
    }

	public static native void updateInformation(String jsonInfo);

	public static native void launchGameWithPeer(String connectionInfo);

	public void sendDiscoveryResults(String result) {
		if (D) Log.d(TAG, "updating JSON discovery in app activity:" + result);	
		bluetoothAddresses.add(result);
	}

	public void connectedToPeer(final String result) {
		((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("Successfully connected to Peer");
				launchGameWithPeer(result);
			}
		});
		
	}

    public void updateDiscoveryResults(String result) {
		if(result != null && !result.isEmpty()) {			
	        if (D) Log.d(TAG, "updating JSON RESULT in app activity:" + result);
    	    updateOtherDeviceInformation(result);
		}
    }


	private void updateOtherDeviceInformation(final String information) {
		((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
			@Override
			public void run() {
				// TODO Auto-generated method stub
				System.out.println("Updating information :" + information);
				updateInformation(information);
			}
		});
	}
}