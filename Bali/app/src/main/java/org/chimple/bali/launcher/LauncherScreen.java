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
import android.arch.lifecycle.LifecycleActivity;
import android.arch.lifecycle.LiveData;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.drawable.Animatable2;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import org.chimple.bali.R;
import org.chimple.bali.activity.LessonListActivity;
import org.chimple.bali.application.BaliApplication;
import org.chimple.bali.db.entity.User;
import org.chimple.bali.repo.UserRepo;
import org.chimple.bali.service.TollBroadcastReceiver;

public class LauncherScreen extends LifecycleActivity {
    public static final boolean POPUP = false;

    public int getCoins() {
        return mCoins;
    }

    public void setCoins(int mCoins) {
        this.mCoins = mCoins;
    }

    int mCoins;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);

        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        BroadcastReceiver mReceiver = new TollBroadcastReceiver();
        registerReceiver(mReceiver, filter);

        BaliApplication application = (BaliApplication) getApplication();
        String coinMessage = "Total Coins: "
                + String.valueOf(BaliApplication.INITIAL_COIN);

        application.updateCoinNotifications("Coins:", coinMessage, 5);

        LiveData<User> userLiveData = UserRepo.getCurrentLiveUser(this);
        userLiveData.observe(this, user -> {
            if (user != null) {
                TextView coinTextView = (TextView) findViewById(R.id.coins);
                setCoins(user.coins);
                coinTextView.setText(Integer.toString(user.coins));
            }
        });


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
        if (POPUP && Intent.ACTION_SEND.equals(action)) {
            AlertDialog.Builder Builder = new AlertDialog.Builder(this)
                    .setMessage(R.string.not_enough_coins)
                    .setTitle(R.string.stop)
                    .setIcon(android.R.drawable.ic_dialog_alert)
                    .setPositiveButton(android.R.string.yes, null);
            AlertDialog alertDialog = Builder.create();
            alertDialog.show();
        }
    }

    public void startBali(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            ImageView imageView = (ImageView) findViewById(R.id.imageView5);
            Drawable drawable = imageView.getDrawable();
            if (drawable instanceof Animatable2) {
                Animatable2 animatable2 = (Animatable2) drawable;
                animatable2.registerAnimationCallback(new Animatable2.AnimationCallback() {
                    @Override
                    public void onAnimationEnd(Drawable drawable) {
                        super.onAnimationEnd(drawable);
                        Intent intent = new Intent(LauncherScreen.this, LessonListActivity.class);
                        if (intent != null) {
                            startActivity(intent);
                        }
                    }
                });
            }
            ((Animatable2) drawable).start();
        } else {
            Intent intent = new Intent(LauncherScreen.this, LessonListActivity.class);
            if (intent != null) {
                startActivity(intent);
            }
        }
    }

    public void startChimple(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            ImageView imageView = (ImageView) findViewById(R.id.imageView3);
            Drawable drawable = imageView.getDrawable();
            if (drawable instanceof Animatable2) {
                Animatable2 animatable2 = (Animatable2) drawable;
                animatable2.registerAnimationCallback(new Animatable2.AnimationCallback() {
                    @Override
                    public void onAnimationEnd(Drawable drawable) {
                        super.onAnimationEnd(drawable);
                        Intent intent = getPackageManager().getLaunchIntentForPackage("org.chimple.goa");
                        if (intent != null) {
                            startActivity(intent);
                        }
                    }
                });
            }
            ((Animatable2) drawable).start();
        } else {
            Intent intent = getPackageManager().getLaunchIntentForPackage("org.chimple.goa");
            if (intent != null) {
                startActivity(intent);
            }
        }

    }

    public void startMaui(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            ImageView imageView = (ImageView) findViewById(R.id.imageView2);
            Drawable drawable = imageView.getDrawable();
            if (drawable instanceof Animatable2) {
                Animatable2 animatable2 = (Animatable2) drawable;
                animatable2.registerAnimationCallback(new Animatable2.AnimationCallback() {
                    @Override
                    public void onAnimationEnd(Drawable drawable) {
                        super.onAnimationEnd(drawable);
                        Intent intent = getPackageManager().getLaunchIntentForPackage("sutara.org.maui");
                        if (intent != null) {
                            startActivity(intent);
                        }
                    }
                });
            }
            ((Animatable2) drawable).start();
        } else {
            Intent intent = getPackageManager().getLaunchIntentForPackage("sutara.org.maui");
            if (intent != null) {
                startActivity(intent);
            }
        }

    }

    public void ticklePiggy(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            ImageView imageView = (ImageView) findViewById(R.id.imageView4);
            Drawable drawable = imageView.getDrawable();
            if (drawable instanceof Animatable2) {
                Animatable2 animatable2 = (Animatable2) drawable;
                ((Animatable2) drawable).start();
            }
        }
    }

    @Override
    public void onPause() {
        super.onPause();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onPause", "org.chimple.bali");
        sendBroadcast(intent);

    }

    @Override
    public void onBackPressed() {

    }

//    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.home_screen, menu);
//        return true;
//    }
}
