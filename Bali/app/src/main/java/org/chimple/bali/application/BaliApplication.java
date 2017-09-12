package org.chimple.bali.application;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import org.acra.ACRA;
import org.acra.ReportField;
import org.acra.annotation.ReportsCrashes;
import org.acra.config.ACRAConfiguration;
import org.acra.config.ACRAConfigurationException;
import org.acra.config.ConfigurationBuilder;
import org.acra.sender.ReportSenderFactory;
import org.chimple.bali.crash.FtpCrashSenderFactory;
import org.chimple.bali.ftp.FtpManager;
import org.chimple.bali.service.ThreadManager;


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
    private FtpManager ftpManager;
    private ThreadManager threadManager;


    public static final String ftpHost = "192.168.0.121";
    public static final int ftpPort = 21;
    public static final String ftpUser = "anonymous";
    public static final String ftpPassword = "nobody";


    @Override
    public void onCreate() {
        super.onCreate();
        if (!ACRA.isACRASenderServiceProcess()) {
            Log.d(TAG, "Created...");
            initialize();
        }
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
}
