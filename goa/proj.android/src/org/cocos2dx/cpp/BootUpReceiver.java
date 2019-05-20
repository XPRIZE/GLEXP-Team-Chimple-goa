package org.cocos2dx.cpp;

import android.app.ActivityManager;
import android.content.Context;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import com.maq.xprize.goa.hindi.R;
import org.cocos2dx.cpp.AppActivity;
import java.util.List;

/**
 * Created by Shyamal.Upadhyaya on 28/09/16.
 */

public class BootUpReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
            System.out.println("received org.cocos2dx.cpp.BootUpReceiver BroadcastReceiver");
            boolean isAppRunning = false;
            ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);

            List<ActivityManager.RunningAppProcessInfo> runningAppProcessInfo = am.getRunningAppProcesses();

            for (int i = 0; i < runningAppProcessInfo.size(); i++)
            {
                // Do you stuff
                if(runningAppProcessInfo.get(i).processName.equals("org.cocos2dx.cpp.AppActivity"))
                {
                    System.out.println("running instance of org.cocos2dx.cpp.AppActivity found");
                    isAppRunning = true;
                }
            }
            
            if (!isAppRunning)
            {
                System.out.println("inside org.cocos2dx.cpp.BootUpReceiver BroadcastReceiver");
                Intent i = new Intent(context, AppActivity.class);  
                i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(i);  
            }
    }
}