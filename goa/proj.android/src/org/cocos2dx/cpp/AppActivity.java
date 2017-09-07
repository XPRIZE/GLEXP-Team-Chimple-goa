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
import java.util.Locale;
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
import android.content.ContentValues;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import android.widget.Toast;
import android.net.Uri;
import android.database.Cursor;

public class AppActivity extends Cocos2dxActivity {
	static {
		System.out.println("Loaded library");
	}
	private static final boolean D = true;
	
	private static Activity _activity;
	private static AppActivity _appActivity;
	private static Context _context;
	private static int height;
	public static int width;

	private Vibrator v;
	private Handler handler = null;

	public ProgressDialog processDiscoveryDialog;
	boolean isBluetoothDiscoveryFinished = true;

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

	private TextToSpeech textToSpeechInstance;
	private static boolean supportForTTSEnabled = false;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		_appActivity = this;
		_activity = this;
		_context = this;
		handler = new Handler(getMainLooper());
		getGLSurfaceView().setMultipleTouchEnabled(false);
		AssetInstaller assetInstaller = new AssetInstaller(getApplicationContext(), "projects");
		try {
			assetInstaller.execute();
		} catch (IOException e) {
			e.printStackTrace();
		}		

		Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE)).getDefaultDisplay();
		width = (int) (display.getWidth() * 0.5);
		height = (int) (display.getHeight() * 0.5);

		v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

		textToSpeechInstance = new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
         @Override
         	public void onInit(int status) {
				if (status == TextToSpeech.SUCCESS) {
 					int result = textToSpeechInstance.setLanguage(Locale.US); 
            		if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                		Log.e("TTS", "This Language is not supported");
            		} else {
						supportForTTSEnabled = true;	
					} 
		    	} else {
        		    Log.e("TTS", "Initilization Failed!");
        		}
			}			 
      	});

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
		if(requestCode == REQUEST_ENABLE_BT) {
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

	public static native void setMultipleChoiceQuiz(String[] jsonInfo);

	public static native void setBagOfChoiceQuiz(String[] jsonInfo);

    public static final String AUTHORITY = "org.chimple.bali.provider";

    public static final String MULTIPLE_CHOICE_QUIZ = "MULTIPLE_CHOICE_QUIZ";
    public static final String COINS = "COINS";
    public static final String BAG_OF_CHOICE_QUIZ = "BAG_OF_CHOICE_QUIZ";

    public static final String COL_HELP = "help";
    public static final String COL_QUESTION = "question";
    public static final String COL_CORRECT_ANSWER = "correct_answer";
    public static final String COL_CHOICE = "choice_";

    /** The URI for the Multiple Choice Quiz */
    public static final Uri URI_MULTIPLE_CHOICE_QUIZ = Uri.parse(
            "content://" + AUTHORITY + "/" + MULTIPLE_CHOICE_QUIZ);

    public static final String COL_ANSWER = "answer";
    public static final String COL_ANSWERS = "answers_";
    public static final String COL_OTHER_CHOICES = "other_choices_";

    public static final Uri URI_BAG_OF_CHOICE_QUIZ = Uri.parse(
            "content://" + AUTHORITY + "/" + BAG_OF_CHOICE_QUIZ);

    public static final Uri URI_COIN = Uri.parse(
            "content://" + AUTHORITY + "/" + COINS);

    public static void queryMultipleChoiceQuiz(int numQuizes, int numChoices, int answerFormat, int choiceFormat) {
    	System.out.println("entry queryMultipleChoiceQuiz");
    	new AsyncTask<int[], Void, Void>() {
			@Override
			protected Void doInBackground(int[]... params) {
				System.out.println("doInBackground");
				int numQuizes = params[0][0];
				int numChoices = params[0][1];
				int answerFormat = params[0][2];
				int choiceFormat = params[0][3];
				Cursor cursor = _context.getContentResolver().query(
	                URI_MULTIPLE_CHOICE_QUIZ,
	                null,
	                null,
	                new String[]{Integer.toString(numQuizes), Integer.toString(numChoices + 1),
	                			Integer.toString(answerFormat), Integer.toString(choiceFormat)},
	                null
        		);
        		System.out.println("called getContentResolver");

		        if(cursor == null) {

		        } else if (cursor.getCount() < 1) {
		        } else {
		        	System.out.println("got data getContentResolver");
		            String[] columnNames = cursor.getColumnNames();
		            for (String s: columnNames ) {
		            	System.out.println(s);
		            }
		            String[] sendArray = new String[cursor.getCount() * columnNames.length + 2];
		            int i = 0;
		            sendArray[i++] = Integer.toString(cursor.getCount());
		            sendArray[i++] = Integer.toString(columnNames.length - 4);
		            while (cursor.moveToNext()) {
		            	int j = 0;
		                sendArray[i++] = cursor.getString(j++);
		                sendArray[i++] = cursor.getString(j++);
		                sendArray[i++] = Integer.toString(cursor.getInt(j++));
		                for(; j < columnNames.length; j++) {
		                	sendArray[i++] = cursor.getString(j);
		                }
		            }
		            final String[] finalSendArray = sendArray;
	                ((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
						@Override
						public void run() {
							System.out.println("calling setMultipleChoiceQuiz");
							for (String s: finalSendArray ) {
		            			System.out.println(s);
		            		}
	                		setMultipleChoiceQuiz(finalSendArray);
						}
					});
		        }
				return null;
			}
		}.execute(new int[]{numQuizes, numChoices});

    }

    public static void queryBagOfChoiceQuiz(int numQuizes, int minAnswers, int maxAnswers, 
    	int minChoices, int maxChoices, int order) {
    	Log.d("queryBagOfChoiceQuiz","entry queryBagOfChoiceQuiz");
    	new AsyncTask<int[], Void, Void>() {
			@Override
			protected Void doInBackground(int[]... params) {
				Log.d("queryBagOfChoiceQuiz","doInBackground");
				int numQuizes = params[0][0];
				int minAnswers = params[0][1];
				int maxAnswers = params[0][2];
				int minChoices = params[0][3];
				int maxChoices = params[0][4];
				int order = params[0][5];
				Cursor cursor = _context.getContentResolver().query(
	                URI_BAG_OF_CHOICE_QUIZ,
	                null,
	                null,
	                new String[]{Integer.toString(numQuizes), Integer.toString(minAnswers),
	                	Integer.toString(maxAnswers), Integer.toString(minChoices),
	                	Integer.toString(maxChoices), Integer.toString(order)},
	                null
        		);
        		Log.d("queryBagOfChoiceQuiz","called getContentResolver");

		        if(cursor == null) {

		        } else if (cursor.getCount() < 1) {
		        } else {
		        	System.out.println("got data getContentResolver");
		            String[] columnNames = cursor.getColumnNames();
		            for (String s: columnNames ) {
		            	Log.d("queryBagOfChoiceQuiz",s);
		            }
		            String[] sendArray = new String[cursor.getCount() * columnNames.length + 1];
		            int i = 0;
		            sendArray[i++] = Integer.toString(cursor.getCount());
		            while (cursor.moveToNext()) {
		            	for(int j = 0; j < columnNames.length; j++) {
			                sendArray[i++] = cursor.getString(j);
		            	}
		            }
		            final String[] finalSendArray = sendArray;
	                ((Cocos2dxActivity) _activity).runOnGLThread(new Runnable() {
						@Override
						public void run() {
							Log.d("queryBagOfChoiceQuiz","calling setMultipleChoiceQuiz");
							for (String s: finalSendArray ) {
								if(s != null) {
			            			Log.d("queryBagOfChoiceQuiz",s);
								}
		            		}
	                		setBagOfChoiceQuiz(finalSendArray);
						}
					});
		        }
				return null;
			}
		}.execute(new int[]{numQuizes, minAnswers, maxAnswers, minChoices, maxChoices, order});

    }

	public static void updateCoins(int coins) {
    	new AsyncTask<Integer, Void, Void>() {
			@Override
			protected Void doInBackground(Integer... params) {
				Integer coins1 = params[0];
				System.out.println("doInBackground");

		        ContentValues contentValues = new ContentValues(1);
		        contentValues.put(COINS, coins1);
		        int coins = _context.getContentResolver().update(
		                URI_COIN,
		                contentValues,
		                null,
		                null
		        );
		        Log.d(COINS, String.valueOf(coins));

				return null;
			}
		}.execute(coins);
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

	public static void pronounceWord(String word) {
		System.out.println("word for pronounciation:" + word);
		if(_appActivity.supportForTTSEnabled && _appActivity.textToSpeechInstance != null) {
			System.out.println("TTS supported for pronounciation:" + word);
			_appActivity.textToSpeechInstance.speak(word, TextToSpeech.QUEUE_FLUSH, null);
		}		        
	}

	public static void takePhoto() {
		String tag = "Take Photo";
		String message = "I've been called from C++";
		Log.d(tag, "Showing alert dialog: " + message);

		Intent startCameraActivity = new Intent(_activity, CameraActivity.class);
		_activity.startActivityForResult(startCameraActivity, 0);
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
		if(textToSpeechInstance != null) {
			textToSpeechInstance.stop();
			textToSpeechInstance.shutdown();			
		}		
	}



	@Override
	protected void onStop() {
		super.onStop();
	}

    @Override
    protected void onResume() {
        super.onResume();
        Intent intent = new Intent();
        intent.setClassName("org.chimple.bali", "org.chimple.bali.service.TollBroadcastReceiver");
        intent.putExtra("onResume", "org.chimple.goa");
        sendBroadcast(intent);
    }

    @Override
    protected void onPause() {
        super.onPause();
        Intent intent = new Intent();
        intent.setClassName("org.chimple.bali", "org.chimple.bali.service.TollBroadcastReceiver");
        intent.putExtra("onPause", "org.chimple.goa");
        sendBroadcast(intent);
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
            startActivityForResult(discoverableIntent, BLUETOOTH_REQUEST_DISCOVERABLE_CODE);
        } else {
			if (D) Log.d(TAG, "ensure discoverable => startDiscoveryForDevices");
			startDiscoveryForDevices();
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