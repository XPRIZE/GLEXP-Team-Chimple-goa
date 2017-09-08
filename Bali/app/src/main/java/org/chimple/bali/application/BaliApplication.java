package org.chimple.bali.application;

import android.app.Application;
import android.content.Context;
import android.os.Handler;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import org.chimple.bali.ftp.FtpManager;
import org.chimple.bali.operation.OpState;
import org.chimple.bali.service.FtpServiceImpl;
import org.chimple.bali.service.ThreadManager;


/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class BaliApplication extends Application {
    private static final String TAG = BaliApplication.class.getName();
    private FtpManager ftpManager;
    private ThreadManager threadManager;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "Created...");
        initialize();
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
        OpState testFTP = new OpState(FtpServiceImpl.DO_FTP_TRANSFER);
        BaliContext.getInstance().getFtpService().getOperationManager().addOperation(testFTP);


    }
}
