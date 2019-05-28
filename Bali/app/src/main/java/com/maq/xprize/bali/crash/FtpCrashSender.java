package com.maq.xprize.bali.crash;


import android.content.Context;
import android.os.Build;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.text.format.Time;
import android.util.Log;

import org.acra.ACRAConstants;
import org.acra.ReportField;
import org.acra.collections.ImmutableSet;
import org.acra.collector.CrashReportData;
import org.acra.config.ACRAConfiguration;
import org.acra.model.Element;
import org.acra.sender.ReportSender;
import org.acra.sender.ReportSenderException;
import com.maq.xprize.bali.application.BaliApplication;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;

/**
 * Created by shyamalupadhyaya on 09/09/17.
 */

public class FtpCrashSender implements ReportSender {
    public static final String REPORTFILE_EXTENSION = ".stacktrace";
    private static final String TAG = FtpCrashSender.class.getName();
    private final ACRAConfiguration config;

    public FtpCrashSender(@NonNull ACRAConfiguration config) {
        this.config = config;
    }

    @Override
    public void send(@NonNull Context context, @NonNull CrashReportData errorContent) throws ReportSenderException {

        final String subject = context.getPackageName() + " Crash Report";
        final String body = buildBody(errorContent);

        //write to filesystem every crash which can be ftp later
        this.writeToFileSystem(context, body);
    }

    private void writeToFileSystem(@NonNull Context context, String contents) {
        String destDirectory = Build.SERIAL;
        String extension = ".report";

        String filename = "crash" + "." + new Date().getTime() + extension;
        String crashFolder = context.getFilesDir() + File.separator;

        // Create the folder.
        final File crashPath = new File(crashFolder);
        if (!crashPath.exists()) {
            // Make it, if it doesn't exit
            crashPath.mkdirs();
        }

        final File file = new File(crashPath, filename);
        try {
            file.createNewFile();
            FileOutputStream fOut = new FileOutputStream(file);
            OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            myOutWriter.append(contents);
            myOutWriter.close();

            fOut.flush();
            fOut.close();
        } catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }

    private String buildBody(@NonNull CrashReportData errorContent) {
        Set<ReportField> fields = config.getReportFields();
        if (fields.isEmpty()) {
            fields = new ImmutableSet<ReportField>(ACRAConstants.DEFAULT_MAIL_REPORT_FIELDS);
        }

        final StringBuilder builder = new StringBuilder();
        for (ReportField field : fields) {
            builder.append(field.toString()).append('=');
            Element value = errorContent.get(field);
            if (value != null) {
                builder.append(TextUtils.join("\n\t", value.flatten()));
            }
            builder.append('\n');
        }
        return builder.toString();
    }
}
