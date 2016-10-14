package org.cocos2dx.javascript;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.wifi.p2p.WifiP2pManager;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.SortedSet;
import org.cocos2dx.javascript.AppActivity;
/**
 * Created by Shyamal.Upadhyaya on 28/09/16.
 */

public class BlueToothSupport extends Handler {

    private static BlueToothSupport instance;
    private static final String TAG = "BluetoothSupport";
    private static final boolean D = true;

    // Intent request codes
    private static final int REQUEST_CONNECT_DEVICE_SECURE = 1;
    private static final int REQUEST_CONNECT_DEVICE_INSECURE = 2;
    private static final int REQUEST_ENABLE_BT = 3;


    private String deviceName;
    private AppActivity main;
    private BlueToothBoardCastReceiver receiver;
    // Member object for the chat services
    private BluetoothChatService mChatService = null;

    private IntentFilter intentFilter;

    private BluetoothAdapter mBtAdapter;

    //data structor
    Set<BluetoothDevice> newlyConnectedDevices;


    // Message types sent from the BluetoothChatService Handler
    public static final int MESSAGE_STATE_CHANGE = 1;
    public static final int MESSAGE_READ = 2;
    public static final int MESSAGE_WRITE = 3;
    public static final int MESSAGE_DEVICE_NAME = 4;
    public static final int MESSAGE_TOAST = 5;

    private String mConnectedDeviceName = null;
    // Key names received from the BluetoothChatService Handler
    public static final String DEVICE_NAME = "device_name";
    public static final String TOAST = "toast";


    public static BlueToothSupport getInstance(AppActivity main, String name)
    {
        //if no instance is initialized yet then create new instance
        //else return stored instance
        if (instance == null)
        {
            instance = new BlueToothSupport(main, name);
        }
        return instance;
    }

    public BluetoothChatService getBluetoothChatService() {
        return this.mChatService;
    }

    public void setBluetoothChatService() {
        // Initialize the BluetoothChatService to perform bluetooth connections
        mChatService = new BluetoothChatService(this, mBtAdapter);
    }


    public void setActivity(AppActivity activity) {
        this.main = activity;
        if(receiver != null) {
            registerForReceiver();
            receiver.setActivity(activity);
        }

    }

    public void setBluetoothName(String name) {
        instance.deviceName = name;
    }

    private BlueToothSupport(AppActivity main, String name) {
        this.main = main;
        this.deviceName = name;

        // Get the local Bluetooth adapter
        mBtAdapter = BluetoothAdapter.getDefaultAdapter();
        if(name != null) {
            this.deviceName = name;
        } else {
            this.deviceName = mBtAdapter.getName();
        }
        mBtAdapter.setName(this.deviceName);

        if (mBtAdapter == null) {
            //main.makeToast("Bluetooth is not Available");
            return;
        }

        registerForReceiver();

        newlyConnectedDevices = new HashSet<BluetoothDevice>();
    }

    private void registerForReceiver() {
        intentFilter = new IntentFilter();
        // Register for broadcasts when a device is discovered
        intentFilter.addAction(BluetoothDevice.ACTION_FOUND);
        // Register for broadcasts when discovery has finished
        intentFilter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);

        receiver = new BlueToothBoardCastReceiver(main, this);
        receiver.registerBluetoothReceiver(main.getApplicationContext(), receiver, intentFilter);
    }

    public BluetoothAdapter getBluetoothAdapter() {
        return this.mBtAdapter;
    }


    public Set<BluetoothDevice> fetchPairedDevices() {
        // Get a set of currently paired devices
        Set<BluetoothDevice> pairedDevices = mBtAdapter.getBondedDevices();
        return pairedDevices;
    }

    public void cancelDiscovery() {
        mBtAdapter.cancelDiscovery();
    }

    public void addToNewDiscoveredDevices(BluetoothDevice device) {
        newlyConnectedDevices.add(device);
    }

    public boolean didFindAnyNewDevice() {
        return newlyConnectedDevices.size() != 0;
    }

    public boolean cancelDiscoveryIfAlreadyStarted() {
        // If we're already discovering, stop it
        if (mBtAdapter.isDiscovering()) {
            mBtAdapter.cancelDiscovery();
            return true;
        }
        return false;
    }

    public void startDiscovery() {
        newlyConnectedDevices = null;
        newlyConnectedDevices = new HashSet<BluetoothDevice>();
        mBtAdapter.startDiscovery();
    }


    @Override
    public void handleMessage(Message msg) {
        switch (msg.what) {
            case MESSAGE_STATE_CHANGE:
                if (D) Log.i(TAG, "MESSAGE_STATE_CHANGE: " + msg.arg1);
                switch (msg.arg1) {
                    case BluetoothChatService.STATE_CONNECTED:
                        //call back c++ client to launch game
                        main.connectedToPeer("connected");
                        //main.updateDiscoveryResults("");
                        //mConversationArrayAdapter.clear();
                        break;
                    case BluetoothChatService.STATE_CONNECTING:
                        break;
                    case BluetoothChatService.STATE_LISTEN:
                    case BluetoothChatService.STATE_NONE:
                        break;
                }
                break;
            case MESSAGE_WRITE:
                byte[] writeBuf = (byte[]) msg.obj;
                // construct a string from the buffer
                String writeMessage = new String(writeBuf);
                if (D) Log.i(TAG, "ME: " + writeMessage);
                break;
            case MESSAGE_READ:
                byte[] readBuf = (byte[]) msg.obj;
                // construct a string from the valid bytes in the buffer
                String readMessage = new String(readBuf, 0, msg.arg1);
                main.updateDiscoveryResults(readMessage);
                if (D) Log.i(TAG, mConnectedDeviceName + ":" + readMessage);
                break;
            case MESSAGE_DEVICE_NAME:
                // save the connected device's name
                mConnectedDeviceName = msg.getData().getString(DEVICE_NAME);
                Toast.makeText(main.getApplicationContext(), "Connected to "
                        + mConnectedDeviceName, Toast.LENGTH_SHORT).show();
                break;
            case MESSAGE_TOAST:
                Toast.makeText(main.getApplicationContext(), msg.getData().getString(TOAST),
                        Toast.LENGTH_SHORT).show();
                break;
        }
    }

    public void onResume() {

    }

    public void onStop() {

    }

    public void onDestroy() {

        // Make sure we're not doing discovery anymore
        if (mBtAdapter != null) {
            mBtAdapter.cancelDiscovery();
        }

        // Unregister broadcast listeners
        receiver.unregisterBluetoothReceiver(main.getApplicationContext(), receiver);
    }


    public void connectDevice(String address, boolean secure) {
        // Get the BluetoothDevice object
        BluetoothDevice device = this.getBluetoothAdapter().getRemoteDevice(address);
        // Attempt to connect to the device
        mChatService.connect(device, secure);
    }
}
