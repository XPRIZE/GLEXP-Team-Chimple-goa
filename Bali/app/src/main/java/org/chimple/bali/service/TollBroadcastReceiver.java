package org.chimple.bali.service;

import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.ContentValues;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.util.Log;
import android.view.WindowManager;

import org.chimple.bali.MainActivity;
import org.chimple.bali.R;

import java.util.concurrent.atomic.AtomicBoolean;

import static android.content.Context.ALARM_SERVICE;
import static org.chimple.bali.provider.LessonContentProvider.COINS;
import static org.chimple.bali.provider.LessonContentProvider.URI_COIN;

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

public class TollBroadcastReceiver extends BroadcastReceiver {
    private static final AtomicBoolean mIsLearning = new AtomicBoolean(true);
    AlertDialog dialog;

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("TollBroadcastReceiver", "onReceive");
        if (Intent.ACTION_SCREEN_OFF.equals(intent.getAction())) {
            cancelAlarm(context);
        } else if (Intent.ACTION_SCREEN_ON.equals(intent.getAction())) {
            scheduleAlarm(context);
        } else if(intent.getStringExtra("onResume") != null) {
            Log.d("TollBroadcastReceiver", "onResume" + intent.getStringExtra("onResume"));
            mIsLearning.set(true);
            cancelAlarm(context);
        } else if(intent.getStringExtra("onPause") != null) {
            mIsLearning.set(false);
            scheduleAlarm(context);
            Log.d("TollBroadcastReceiver", "onPause" + intent.getStringExtra("onPause"));
        } else {
            if(!mIsLearning.get()) {
                Log.d("TollBroadcastReceiver", "deductCoin");
                new AsyncTask<Context, Void, Void>() {
                    @Override
                    protected Void doInBackground(Context... contexts) {
                        Context context1 = contexts[0];
                        ContentValues contentValues = new ContentValues(1);
                        contentValues.put(COINS, -1);
                        int coins = context1.getContentResolver().update(
                                URI_COIN,
                                contentValues,
                                null,
                                null
                        );
                        if(coins <= 0) {
                            Intent i=new Intent(context.getApplicationContext(),MainActivity.class);
                            i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            i.setAction(Intent.ACTION_SEND);
                            i.putExtra("test", "pop");
                            context.startActivity(i);

                        }
                        return null;
                    }
                }.execute(context);
            }
        }
    }

    private void scheduleAlarm(Context context) {
        int seconds = 60;
        Intent intentForPending = new Intent(context, TollBroadcastReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 1, intentForPending, 0);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(ALARM_SERVICE);
        alarmManager.setRepeating(AlarmManager.RTC, System.currentTimeMillis() + (seconds * 1000), seconds * 1000, pendingIntent);
        Log.d("onPause", "setAlarm");
    }

    private void cancelAlarm(Context context) {
        Intent intentForPending = new Intent(context, TollBroadcastReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 1, intentForPending, 0);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(ALARM_SERVICE);
        alarmManager.cancel(pendingIntent);
        Log.d("onResume", "cancelAlarm");
    }

    private void showDialog(Context context, String message)
    {

        if (dialog != null) {
            if (dialog.isShowing()) {
                dialog.dismiss();
            }
        }

        dialog = new AlertDialog.Builder(context)
                .setTitle(R.string.EXIT_SESSION)
                .setMessage(R.string.SURE_EXIT)
                .setNegativeButton(android.R.string.no, null)
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface arg0, int arg1) {

                    }
                }).create();

        dialog.getWindow().setType(WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY);
        dialog.show();

    }
}
