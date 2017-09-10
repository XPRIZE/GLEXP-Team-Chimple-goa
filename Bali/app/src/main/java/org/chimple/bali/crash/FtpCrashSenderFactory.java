package org.chimple.bali.crash;


import android.content.Context;
import android.support.annotation.NonNull;

import org.acra.config.ACRAConfiguration;
import org.acra.sender.ReportSender;
import org.acra.sender.ReportSenderFactory;

/**
 * Created by shyamalupadhyaya on 09/09/17.
 */

public class FtpCrashSenderFactory implements ReportSenderFactory {

    @NonNull
    @Override
    public ReportSender create(@NonNull Context context, @NonNull ACRAConfiguration config) {
        return new FtpCrashSender(config);
    }
}

