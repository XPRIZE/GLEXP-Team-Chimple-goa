package org.cocos2dx.cpp;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import com.maq.xprize.chimple.hindi.R;
import org.cocos2dx.cpp.AppActivity;
/**
 * Created by Shyamal.Upadhyaya on 28/09/16.
 */

public class BlueToothBoardCastReceiver extends BroadcastReceiver {

    public boolean isRegistered = false;
    private BlueToothSupport blueToothSupport = null;
    private AppActivity activity = null;

    public BlueToothBoardCastReceiver(AppActivity activity, BlueToothSupport wdSupport) {
        super();
        this.activity = activity;
        this.blueToothSupport = wdSupport;
    }


    protected void registerBluetoothReceiver(Context context, BroadcastReceiver receiver, IntentFilter filter) {
        if(!isRegistered) {
            context.registerReceiver(receiver, filter);
            isRegistered = true;
        }

    }

    protected void unregisterBluetoothReceiver(Context context, BroadcastReceiver receiver) {
        if(isRegistered) {
            context.unregisterReceiver(receiver);
            isRegistered = false;
        }
    }


    public void setActivity(AppActivity activity) {
        this.activity = activity;
    }
    /*
     * (non-Javadoc)
     * @see android.content.BroadcastReceiver#onReceive(android.content.Context,
     * android.content.Intent)
     */

    @Override
    public void onReceive(Context context, Intent intent) {
        // String action = intent.getAction();

        // // When discovery finds a device
        // if (BluetoothDevice.ACTION_FOUND.equals(action)) {
        //     // Get the BluetoothDevice object from the Intent
        //     BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
        //     // If it's already paired, skip it, because it's been listed already
        //     //if (device.getBondState() != BluetoothDevice.BOND_BONDED) {
        //         blueToothSupport.addToNewDiscoveredDevices(device);
        //         activity.sendDiscoveryResults(device.getName()+ "-" + device.getAddress());
        //     //}
        //     // When discovery is finished, change the Activity title
        // } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
        //     System.out.println("BLUE TOOTH DISCOVERY FINISHED");
        //     activity.discoveryFinished();
        //     if(!blueToothSupport.didFindAnyNewDevice()) {
        //     }
        // }
    }
}