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

package org.chimple.bali.launcher;

import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import org.chimple.bali.R;
import org.chimple.bali.application.BaliApplication;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.service.TollBroadcastReceiver;

public class LauncherScreen extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);

        //TODO: for now force the creation here
        AppDatabase.getInstance(this);
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        BroadcastReceiver mReceiver = new TollBroadcastReceiver();
        registerReceiver(mReceiver, filter);

        BaliApplication application = (BaliApplication)getApplication();
        String coinMessage = "Total Coins: "
                + String.valueOf(BaliApplication.INITIAL_COIN);

        application.updateCoinNotifications("Coins:", coinMessage, 5);
    }

    @Override
    public void onResume() {
        super.onResume();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onResume", "org.chimple.bali");
        sendBroadcast(intent);

        Intent receivedIntent = getIntent();
        String action = receivedIntent.getAction();
        String test = receivedIntent.getStringExtra("test");
        if (Intent.ACTION_SEND.equals(action)) {
            AlertDialog.Builder Builder = new AlertDialog.Builder(this)
                    .setMessage("You do not have enough coins")
                    .setTitle("Stop")
                    .setIcon(android.R.drawable.ic_dialog_alert)
                    .setPositiveButton(android.R.string.yes, null);
            AlertDialog alertDialog = Builder.create();
            alertDialog.show();
        }
    }

    @Override
    public void onPause() {
        super.onPause();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onPause", "org.chimple.bali");
        sendBroadcast(intent);

    }

//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.home_screen, menu);
//        return true;
//    }
}
