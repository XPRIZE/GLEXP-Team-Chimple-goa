package org.chimple.bali;

import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import org.chimple.bali.activity.FullscreenActivity;
import org.chimple.bali.activity.LessonActivity;
import org.chimple.bali.db.AppDatabase;
import org.chimple.bali.service.TollBroadcastReceiver;
import org.chimple.bali.service.TollJobServiceUnused;

import java.util.List;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "org.chimple.bali.MESSAGE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        PackageManager pm = this.getPackageManager();
        List<ApplicationInfo> apps = pm.getInstalledApplications(0);
        for (ApplicationInfo a: apps) {
            Intent intent = pm.getLaunchIntentForPackage(a.packageName);
            if(intent != null) {
                Log.v(a.packageName, intent.toString());
            }
        }

        //TODO: for now force the creation here
        AppDatabase.getInstance(this);
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        BroadcastReceiver mReceiver = new TollBroadcastReceiver();
        registerReceiver(mReceiver, filter);

    }

    public static void scheduleJob(Context context) {
        ComponentName componentName = new ComponentName(context, TollJobServiceUnused.class);
        JobInfo.Builder builder = new JobInfo.Builder(0, componentName);
        builder.setMinimumLatency(10 * 1000);
        builder.setOverrideDeadline(15 * 1000);
        JobScheduler jobScheduler = (JobScheduler) context.getSystemService(JOB_SCHEDULER_SERVICE);
        jobScheduler.schedule(builder.build());
    }

    public void startActivity(View v) {
        if(v.getId() == R.id.readButton) {
            Intent intent = new Intent(this, LessonActivity.class);
            intent.putExtra(EXTRA_MESSAGE, new Long(1));
            startActivity(intent);
        } else if(v.getId() == R.id.musicButton){
            Intent intent = getPackageManager().getLaunchIntentForPackage("com.android.music");
            if (intent != null) {
                startActivity(intent);
            }
        } else if(v.getId() == R.id.cameraButton){
            Intent intent = getPackageManager().getLaunchIntentForPackage("com.android.camera");
            if (intent != null) {
                startActivity(intent);
            }
        } else if(v.getId() == R.id.galleryButton){
            Intent intent = getPackageManager().getLaunchIntentForPackage("com.android.gallery3d");
            if (intent != null) {
                startActivity(intent);
            }
        } else {
            Intent intent = new Intent(this, FullscreenActivity.class);
            intent.putExtra(EXTRA_MESSAGE, new Long(1));
            startActivity(intent);
        }
    }

    @Override
    public void  onResume() {
        super.onResume();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onResume", "org.chimple.bali");
        sendBroadcast(intent);
    }

    @Override
    public void onPause() {
        super.onPause();

        Intent intent = new Intent(this, TollBroadcastReceiver.class);
        intent.putExtra("onPause", "org.chimple.bali");
        sendBroadcast(intent);

    }
}
