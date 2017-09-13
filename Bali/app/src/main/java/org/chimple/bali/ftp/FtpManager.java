package org.chimple.bali.ftp;

import android.content.Context;
import android.os.Build;
import android.util.Log;

import com.opencsv.CSVWriter;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.chimple.bali.db.entity.UserLog;
import org.chimple.bali.repo.UserLogRepo;
import org.chimple.bali.service.ThreadManager;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
            Log.d(TAG, "Connected to ftp host: " + host);
            if (FTPReply.isPositiveCompletion(ftpClient.getReplyCode())) {
                boolean status = ftpClient.login(username, password);
                ftpClient.setFileType(FTP.ASCII_FILE_TYPE);
                ftpClient.enterLocalPassiveMode();
                Log.d(TAG, "Logged in to ftp host as user: " + username);
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
            String filename = "userlog" + "." + new Date().getTime() + extension;
            String fullyFilePath = this.context.getFilesDir() + File.separator + filename;
            List<String[]> csvResults = new ArrayList<String[]>();

            CSVWriter writer = new CSVWriter(new FileWriter(fullyFilePath), ',', '"', "\n");
            UserLog[] userLogItems = UserLogRepo.getUserLogs(this.context);
            for (UserLog userLog  : userLogItems) {
                String userInfo = userLog.toString();
                String[] result = userInfo.split(",");
                csvResults.add(result);
            }
            writer.writeAll(csvResults, true);
            writer.flush();
            writer.close();

            boolean fileUploadStatus = ftpUpload(filename, filename, destDirectory, listener);

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

//    public void saveFilesToServer(String remoteDest, File localSrc) throws IOException {
//        FTPClient ftp = new FTPClient();
//        ftp.connect("ftp.foobar.com");
//        if (!FTPReply.isPositiveCompletion(ftp.getReplyCode())) {
//            ftp.disconnect();
//            log.fatal("FTP not disconnected");
//        }
//
//        ftp.login("foo", "qwerty");
//        log.info("Connected to server .");
//        log.info(ftp.getReplyString());
//
//        ftp.changeWorkingDirectory(remoteDest);
//        ftp.setFileType(FTPClient.BINARY_FILE_TYPE);
//
//        try {
//            upload(localSrc, ftp);
//        }
//        finally {
//            ftp.disconnect();
//            log.info("FTP disconnected");
//        }
//    }

    public void upload(File src, FTPClient ftp) throws IOException {
        if (src.isDirectory()) {
            for (File file : src.listFiles()) {
                if (file.getName().endsWith(".report") || file.getName().endsWith(".csv")) {
                    upload(file, ftp);
                }
            }
            ftp.changeToParentDirectory();
        } else {
            InputStream srcStream = null;
            try {
                srcStream = src.toURI().toURL().openStream();
                ftp.storeFile(src.getName(), srcStream);
                Log.d(TAG, "Stored ftp log to: " + src.getName());
            } finally {
                IOUtils.closeQuietly(srcStream);
            }
        }
    }

    private boolean ftpUpload(String srcFilePath, String desFileName, String desDirectory, final FtpManagerListener listener) {
        boolean status = false;
        try {

            //FileInputStream srcFileStream = this.context.openFileInput(srcFilePath);
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

            File srcDir = new File(context.getFilesDir() + File.separator);
            if(!isRemoteDirectoryExists) {
                ftpClient.makeDirectory(remoteDir);
            }

            if(ftpClient.changeWorkingDirectory(remoteDir))
            {
                if(!isDirectoryExists)
                {
                    ftpClient.makeDirectory(desDirectory);
                    Log.d(TAG, "Make directory: " + desDirectory);
                }

                if (ftpClient.changeWorkingDirectory(desDirectory)) {
                    Log.d(TAG, "Changed to directory: " + desDirectory);
                    try {
                        upload(srcDir, ftpClient);
                        status = true;
                    } catch (Exception e) {
                        status = false;
                    } finally {
                        if(status) {
                            //delete all files
                            FileUtils.cleanDirectory(srcDir);
                        }
                    }
                }
            }
            return status;
        } catch (Exception e) {
            e.printStackTrace();
            Log.d(TAG, "upload failed: " + e);
            listener.onFtpUploadFailed("Ftp Upload Failed" + e.getMessage());
        }
        return status;
    }

}
