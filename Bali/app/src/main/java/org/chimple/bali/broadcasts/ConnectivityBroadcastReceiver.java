package org.chimple.bali.broadcasts;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.util.Log;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class ConnectivityBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = ConnectivityBroadcastReceiver.class.getName();

    public ConnectivityBroadcastReceiver() {

    }

    public interface ConnectivityListener {
        public void onConnectionChanged(boolean connected);
    }

    private ConnectivityListener listener;
    private boolean connected;

    public ConnectivityBroadcastReceiver(ConnectivityListener listener) {
        this.listener = listener;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        boolean hasConnection = !intent.getBooleanExtra(ConnectivityManager.EXTRA_NO_CONNECTIVITY, false);

        // This gets called quite a few times and seems to be very device specific. Easiest thing to do is to only report
        // the first difference to the listener and to ignore the rest

        if (connected == hasConnection)
            return;

        connected = hasConnection;

        Log.d(TAG, "Has connection: " + connected);

        listener.onConnectionChanged(connected);
    }
}
