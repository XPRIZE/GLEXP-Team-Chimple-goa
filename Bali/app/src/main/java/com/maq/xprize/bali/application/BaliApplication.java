package com.maq.xprize.bali.application;

import android.app.Application;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import org.acra.ACRA;
import org.acra.ReportField;
import org.acra.annotation.ReportsCrashes;
import org.acra.config.ACRAConfiguration;
import org.acra.config.ACRAConfigurationException;
import org.acra.config.ConfigurationBuilder;
import org.acra.sender.ReportSenderFactory;
import com.maq.xprize.bali.R;
import com.maq.xprize.bali.crash.FtpCrashSenderFactory;
import com.maq.xprize.bali.db.AppDatabase;
import com.maq.xprize.bali.ftp.FtpManager;
import com.maq.xprize.bali.launcher.LauncherScreen;
import com.maq.xprize.bali.repo.UserRepo;
import com.maq.xprize.bali.service.ThreadManager;


/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

@ReportsCrashes(
        customReportContent = {
                ReportField.APP_VERSION_CODE,
                ReportField.APP_VERSION_NAME,
                ReportField.ANDROID_VERSION,
                ReportField.PACKAGE_NAME,
                ReportField.REPORT_ID,
                ReportField.BUILD,
                ReportField.STACK_TRACE
        }
)
public class BaliApplication extends Application {
    private static final String TAG = BaliApplication.class.getName();
    private static Context context;
    private static final int COIN_NOTIFICATION = 1;
    public static int INITIAL_COIN = 0;

    private static final int COIN_NOTIFICATION_FIVE_RANGE = 5;
    private static final int COIN_NOTIFICATION_TWENTY_RANGE = 20;
    private static final int COIN_NOTIFICATION_FOURTY_RANGE = 40;
    private static final int COIN_NOTIFICATION_SIXTY_RANGE = 60;
    private static final int COIN_NOTIFICATION_EIGHTY_RANGE = 80;


    private static final int TOTAL_COINS = 10;

    private FtpManager ftpManager;
    private ThreadManager threadManager;

    public static final String ftpHost = "192.168.0.1";
    public static final int ftpPort = 21;
    public static final String ftpUser = "anonymous";
    public static final String ftpPassword = "nobody@chimple.in";


    @Override
    public void onCreate() {
        super.onCreate();
        if (!ACRA.isACRASenderServiceProcess()) {
            Log.d(TAG, "Created...");
//            initialize();
        }
        context = this;
    }

    private void initialize()
    {
        Log.d(TAG, "Initializing...");

        Thread initializationThread = new Thread()
        {
            @Override
            public void run()
            {
                // Initialize all of the important frameworks and objects
                BaliContext.getInstance().initialize(BaliApplication.this);
                //TODO: for now force the creation here
                AppDatabase.getInstance(BaliApplication.this);

                initializationComplete();
            }
        };

        initializationThread.start();
    }

    private void initializationComplete()
    {
        Log.d(TAG, "Initialization complete...");
        ftpManager = BaliContext.getInstance().getFtpManager();
        threadManager = BaliContext.getInstance().getThreadManager();
    }

    public static Context getContext() {
        return context;
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        Class<?>[] list = new Class<?>[]{FtpCrashSenderFactory.class};
        final Class<? extends ReportSenderFactory>[] myReportSenderFactoryClasses = (Class<? extends ReportSenderFactory>[]) list;
        try {
            final ACRAConfiguration config = new ConfigurationBuilder(this)
                    .setReportSenderFactoryClasses(myReportSenderFactoryClasses)
                    .build();

            ACRA.init(this, config);
        } catch (ACRAConfigurationException e) {
            e.printStackTrace();
        }
    }

    public void updateCoinNotifications(String iconTitle, String message, int howManyCoins) {
        int range = (int) howManyCoins * 100 / TOTAL_COINS;

        if (range <= COIN_NOTIFICATION_FIVE_RANGE) {
            buildAndSendNotification(0, COIN_NOTIFICATION, iconTitle, message);
        } else if (range > COIN_NOTIFICATION_TWENTY_RANGE && range < COIN_NOTIFICATION_TWENTY_RANGE) {
            buildAndSendNotification(1, COIN_NOTIFICATION, iconTitle, message);

        } else if (range >= COIN_NOTIFICATION_TWENTY_RANGE && range < COIN_NOTIFICATION_FOURTY_RANGE) {
            buildAndSendNotification(2, COIN_NOTIFICATION, iconTitle, message);

        } else if (range >= COIN_NOTIFICATION_FOURTY_RANGE && range < COIN_NOTIFICATION_SIXTY_RANGE) {
            buildAndSendNotification(3, COIN_NOTIFICATION, iconTitle, message);

        } else if (range >= COIN_NOTIFICATION_SIXTY_RANGE && range < COIN_NOTIFICATION_EIGHTY_RANGE) {
            buildAndSendNotification(4, COIN_NOTIFICATION, iconTitle, message);

        } else if (range >= COIN_NOTIFICATION_EIGHTY_RANGE) {
            buildAndSendNotification(5, COIN_NOTIFICATION, iconTitle, message);
        }

    }

    private void buildAndSendNotification(int level, int notificationId, String iconTitle, String message) {
        NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.level_list, 0)
                .setContentTitle(iconTitle)
                .setContentText(message);


        Intent resultIntent = new Intent(this, LauncherScreen.class);
        PendingIntent resultPendingIntent = PendingIntent.getActivity(this, 0, resultIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        mBuilder.setContentIntent(resultPendingIntent);

        Notification notification = mBuilder.build();
        notification.iconLevel = level;
        notification.flags |= Notification.FLAG_NO_CLEAR | Notification.FLAG_ONGOING_EVENT;
        NotificationManager mNotifyMgr = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        mNotifyMgr.notify(notificationId, notification);

    }
}
