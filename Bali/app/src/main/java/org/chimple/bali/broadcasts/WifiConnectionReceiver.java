/*
 * Copyright 2017, Team Chimple
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.chimple.bali.broadcasts;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;
import android.os.Handler;
import android.util.Log;

import java.util.List;

public class WifiConnectionReceiver extends BroadcastReceiver {

    String networkSSID = "XPRIZE";
    String networkPass = "";

    public WifiConnectionReceiver() {
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        try {

            WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);

            ConnectivityManager connectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = connectivityManager
                    .getActiveNetworkInfo();

            // Check internet connection and accrding to state change the
            // text of activity by calling method
            String getNetworkSSID = wifiManager.getConnectionInfo().getSSID().toString();

            if (networkInfo.isConnectedOrConnecting()) {
                // Its is calling to stop reconnect or disconnect network
            } else if (networkInfo != null && networkInfo.isConnected() && getNetworkSSID.equals(networkSSID)) {
                Log.d("Network Status : ", "" + networkSSID + " connect successful");
            } else if (wifiManager.isWifiEnabled()) {
                connectToXPRIZE(context);
                Log.d("Connect " + networkSSID + " network", "status true1-------------" + networkSSID);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void connectToXPRIZE(Context context) {


        WifiConfiguration conf = new WifiConfiguration();
        conf.SSID = "\"" + networkSSID + "\"";


        conf.allowedKeyManagement.set(WifiConfiguration.KeyMgmt.NONE);
        WifiManager wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
        wifiManager.addNetwork(conf);

        List<WifiConfiguration> list = wifiManager.getConfiguredNetworks();
        for (WifiConfiguration i : list) {
            if (i.SSID != null && i.SSID.equals("\"" + networkSSID + "\"")) {
                wifiManager.disconnect();
                wifiManager.enableNetwork(i.networkId, true);
                wifiManager.reconnect();

                break;
            }
        }
    }
}