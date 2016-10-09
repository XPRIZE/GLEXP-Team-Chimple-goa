package org.cocos2dx.javascript;

import java.util.ArrayList;
import java.util.Set;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Toast;
import org.chimple.goa.R;
import org.cocos2dx.lib.Cocos2dxActivity;
/**
 * This Activity appears as a dialog. It lists any paired devices and
 * devices detected in the area after discovery. When a device is chosen
 * by the user, the MAC address of the device is sent back to the parent
 * Activity in the result Intent.
 */
public class DeviceListActivity extends Cocos2dxActivity {
    // Debugging

    private ArrayAdapter<String> mPairedDevicesArrayAdapter;
    private ArrayAdapter<String> mNewDevicesArrayAdapter;

    private static final String TAG = "DeviceListActivity";
    private static final boolean D = true;

    // Return Intent extra
    public static String EXTRA_DEVICE_ADDRESS = "device_address";

    // Member fields
    private BlueToothSupport blueToothSupport = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Setup the window
        //requestWindowFeature(Window.FEATURE_INDETERMINATE_PROGRESS);        
        // blueToothSupport = BlueToothSupport.getInstance(this,null);
        // blueToothSupport.setActivity(this);
        // setContentView(R.layout.device_list);

        // // Set result CANCELED in case the user backs out
        // setResult(Activity.RESULT_CANCELED);
        // // Initialize the button to perform device discovery
        // Button scanButton = (Button) findViewById(R.id.button_scan);
        // scanButton.setOnClickListener(new OnClickListener() {
        //     public void onClick(View v) {
        //         doDiscovery();
        //         v.setVisibility(View.GONE);

        //     }
        // });

        // // Initialize array adapters. One for already paired devices and
        // // one for newly discovered devices
        // mPairedDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.device_name);
        // mNewDevicesArrayAdapter = new ArrayAdapter<String>(this, R.layout.device_name);

        // // Find and set up the ListView for paired devices
        // ListView pairedListView = (ListView) findViewById(R.id.paired_devices);
        // pairedListView.setAdapter(mPairedDevicesArrayAdapter);
        // pairedListView.setOnItemClickListener(mDeviceClickListener);

        // // Find and set up the ListView for newly discovered devices
        // ListView newDevicesListView = (ListView) findViewById(R.id.new_devices);
        // newDevicesListView.setAdapter(mNewDevicesArrayAdapter);
        // newDevicesListView.setOnItemClickListener(mDeviceClickListener);

        // // Get a set of currently paired devices
        // Set<BluetoothDevice> pairedDevices = blueToothSupport.fetchPairedDevices();

        // // If there are paired devices, add each one to the ArrayAdapter
        // if (pairedDevices.size() > 0) {
        //     findViewById(R.id.title_paired_devices).setVisibility(View.VISIBLE);
        //     for (BluetoothDevice device : pairedDevices) {
        //         mPairedDevicesArrayAdapter.add(device.getName() + "\n" + device.getAddress());
        //     }
        // } else {
        //     String noDevices = getResources().getText(R.string.none_paired).toString();
        //     mPairedDevicesArrayAdapter.add(noDevices);
        // }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();


        // Unregister broadcast listeners
        //blueToothSupport.onDestroy();
    }

    // /**
    //  * Start device discover with the BluetoothAdapter
    //  */
    // private void doDiscovery() {
    //     if (D) Log.d(TAG, "doDiscovery()");
    //     // Indicate scanning in the title
    //     setProgressBarIndeterminateVisibility(true);
    //     setTitle(R.string.scanning);

    //     // Turn on sub-title for new devices
    //     findViewById(R.id.title_new_devices).setVisibility(View.VISIBLE);

    //     // If we're already discovering, stop it
    //     blueToothSupport.cancelDiscoveryIfAlreadyStarted();

    //     // Request discover from BluetoothAdapter
    //     blueToothSupport.startDiscovery();
    // }

    // // The on-click listener for all devices in the ListViews
    // private OnItemClickListener mDeviceClickListener = new OnItemClickListener() {
    //     public void onItemClick(AdapterView<?> av, View v, int arg2, long arg3) {
    //         // Cancel discovery because it's costly and we're about to connect
    //         blueToothSupport.cancelDiscovery();

    //         // Get the device MAC address, which is the last 17 chars in the View
    //         String info = ((TextView) v).getText().toString();
    //         String address = info.substring(info.length() - 17);

    //         // Create the result Intent and include the MAC address
    //         Intent intent = new Intent();
    //         intent.putExtra(EXTRA_DEVICE_ADDRESS, address);

    //         // Set result and finish this Activity
    //         setResult(Activity.RESULT_OK, intent);
    //         finish();
    //     }
    // };

    // @Override
    // public void updateDiscoveryResults(String result) {
    //     if (D) Log.d(TAG, "updating result in device list:" + result);
    //     mNewDevicesArrayAdapter.add(result);
    // }
}
