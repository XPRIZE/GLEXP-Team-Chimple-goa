package org.chimple.bali.application;

import android.content.Context;

import org.chimple.bali.ftp.FtpManager;
import org.chimple.bali.service.FtpService;
import org.chimple.bali.service.FtpServiceImpl;
import org.chimple.bali.service.ThreadManager;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class BaliContext {
    private static BaliContext instance;
    private boolean initialized;

    private ThreadManager threadManager;
    private FtpManager ftpManager;
    private FtpServiceImpl ftpService;

    public static BaliContext getInstance() {
        if (instance == null) {
            synchronized (BaliContext.class) {
                instance = new BaliContext();
            }
        }

        return instance;
    }

    private BaliContext() {
        // Singleton
    }

    public synchronized void initialize(final Context context) {
        if (initialized) {
            return;
        }

        initialized = true;

        Context applicationContext = context.getApplicationContext();
        initializeThreadManager();
        initializeFtpManager(applicationContext);
        createFtpService(applicationContext);
    }

    private void initializeThreadManager() {
        threadManager = new ThreadManager();
    }

    public void createFtpService(Context context)
    {
        if (ftpService == null)
        {
            ftpService = new FtpServiceImpl();
            ftpService.setFtpManager(this.ftpManager);
            ftpService.setThreadManager(this.threadManager);
            ftpService.initialize(context);
        }
    }

    private void initializeFtpManager(Context context) {
        ftpManager = new FtpManager(context);
        ftpManager.setThreadManager(threadManager);
    }


    public ThreadManager getThreadManager() {
        return threadManager;
    }

    public FtpManager getFtpManager() {
        return ftpManager;
    }

    public FtpServiceImpl getFtpService() {
        return ftpService;
    }

}
