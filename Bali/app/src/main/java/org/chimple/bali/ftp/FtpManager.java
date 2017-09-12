package org.chimple.bali.ftp;

import android.content.Context;
import android.os.Build;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.opencsv.CSVWriter;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.model.MultipleChoiceQuiz;
import org.chimple.bali.repo.LessonRepo;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.service.ThreadManager;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by shyamalupadhyaya on 08/09/17.
 */

public class FtpManager {
    private ThreadManager threadManager;
    private FTPClient ftpClient;
    private static final String TAG = FtpManager.class.getName();
    Context context;

    public FtpManager(Context context) {
        super();
        this.context = context;
    }

    public void setThreadManager(ThreadManager threadManager) {
        this.threadManager = threadManager;
    }

    private void createFtpConnection(String host, String username, String password, int port, final FtpManagerListener listener) throws Exception {
        try {
            ftpClient = new FTPClient();
            ftpClient.connect(host, port);
            if (FTPReply.isPositiveCompletion(ftpClient.getReplyCode())) {
                boolean status = ftpClient.login(username, password);
                ftpClient.setFileType(FTP.ASCII_FILE_TYPE);
                ftpClient.enterLocalPassiveMode();
            }

        } catch (SocketException ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;

        } catch (UnknownHostException ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;

        } catch (IOException ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;

        } catch (Exception ex) {
            ex.printStackTrace();
            listener.onFtpUploadFailed("Ftp Connection Failed!!!");
            throw ex;
        }
    }

    public void uploadToFtp(final String ftpHost, String user, String password, int port, final FtpManagerListener listener) {
        try {
            createFtpConnection(ftpHost, user, password, port, listener);
            String destDirectory = Build.SERIAL;
            String extension = ".csv";
            String filename = destDirectory + extension;
            String fullyFilePath = this.context.getFilesDir() + File.separator + filename;
            List<String[]> csvResults = new ArrayList<String[]>();

            CSVWriter writer = new CSVWriter(new FileWriter(fullyFilePath), ',', '"', "\n");
            UserLog[] userLogItems = UserLogRepo.getUserLogs(this.context);
            for (UserLog userLog  : userLogItems) {
                Log.d(TAG, "Userlog information:" + userLog.toString());
                String userInfo = userLog.toString();
                String[] result = userInfo.split(",");
                csvResults.add(result);
            }
            writer.writeAll(csvResults, true);
            writer.flush();
            writer.close();

            boolean fileUploadStatus = ftpUpload(filename, destDirectory + extension, destDirectory, listener);

            if (fileUploadStatus) {
                listener.onFtpUploadSuccess();
            }
        } catch (Exception ex) {
            listener.onFtpUploadFailed("Ftp Error" + ex.getMessage());
        } finally {
            ftpDisconnect();
        }
    }

    private boolean ftpDisconnect() {
        try {
            ftpClient.logout();
            ftpClient.disconnect();
            return true;
        } catch (Exception e) {
            Log.d(TAG, "Error occurred while disconnecting from ftp server.");
        }
        return false;
    }


    private boolean ftpUpload(String srcFilePath, String desFileName, String desDirectory, final FtpManagerListener listener) {
        boolean status = false;
        try {

            FileInputStream srcFileStream = this.context.openFileInput(srcFilePath);
            boolean isDirectoryExists = false;
            boolean isRemoteDirectoryExists = false;
            String remoteDir = "remote";
            FTPFile[] files = ftpClient.listFiles();
            for (FTPFile file : files) {
                String details = file.getName();
                if (file.isDirectory() && desDirectory.equals(details)) {
                    isDirectoryExists = true;
                }
                if (file.isDirectory() && remoteDir.equals(details)) {
                    isRemoteDirectoryExists = true;
                }
            }

            if(!isRemoteDirectoryExists) {
                ftpClient.makeDirectory(remoteDir);
            }

            if(ftpClient.changeWorkingDirectory(remoteDir))
            {
                if(!isDirectoryExists)
                {
                    ftpClient.makeDirectory(desDirectory);
                }

                if (ftpClient.changeWorkingDirectory(desDirectory)) {

                    UserLog[] userLogItems = UserLogRepo.getUserLogs(this.context);
                    for (UserLog userLog  : userLogItems) {
                        Log.d(TAG, "Userlog information:" + userLog.toString());

                    }

                    status = ftpClient.storeFile(desFileName, srcFileStream);
                }
            }
            srcFileStream.close();
            return status;
        } catch (Exception e) {
            e.printStackTrace();
            Log.d(TAG, "upload failed: " + e);
            listener.onFtpUploadFailed("Ftp Upload Failed" + e.getMessage());
        }
        return status;
    }

}
