/***************************************************
Script will send an email notification to you or other email addresses
when a file in a given Google folder has been added, or modified. Not Deleted and things in Subfolder.
***************************************************/
function checkForChangedFiles() {

// edit this line below with the ID "0B5NIfn3Jis1oYzhxWDFUQ1NyN1k" of the folder you want to monitor for changes
  var folderID = '"' + "0B5NIfn3Jis1oYzhxWDFUQ1NyN1k" + '"';
  
// Email Configuration  
  var emailFromName ="Team 5 Rocks (Do Not Reply)";
  var emailSubject = "A File has been uploaded or modified in Team Drive" ;
  var emailBody = "";
  var emailFooter = "To stop these notifications, please contact Karthik (thisis.karthikn@gmail.com). <br>I take Goodwill, Cheques, Gift cards, Cash, Jazz tickets - Listed in the reverse order of preference ";
  
// Excel Configuration
  var folderSearch = folderID + " " + "in parents";
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getActiveSheet();
  var email = sheet.getRange("E1").getValue();
  var timezone = ss.getSpreadsheetTimeZone();
  var today     = new Date();
  
  //Logger.log("Executing for..." + today);
  // Run script next day, and set below to 24 hours
  // 60 * 1000 = 60 second
  // 60* (60 * 1000) = 60 mins which is 1 hour
  // 24* (60* (60 * 1000)) = 1 day which 24 hours
  
  //comment/uncomment below to send every 1 day
  var oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);  
  //Uncomment Below to manual send notification every 1 sec
  //var oneDayAgo = new Date(today.getTime() - 1 * 60 * 1000);  
    
  var startTime = oneDayAgo.toISOString();

  // Uncomment the below line if you want to search the Trash
  //var search = '(trashed = true or trashed = false) and '+ folderSearch +' and (modifiedDate > "' + startTime + '")';   
  var search = '(trashed = false) and '+ folderSearch +' and (modifiedDate > "' + startTime + '")';   
   
  var files  = DriveApp.searchFiles(search);
    
  var row = "", count=0;
  
  while( files.hasNext() ) {
 
    var file = files.next();
    var fileName = file.getName();
    var fileURL  = file.getUrl();
    var lastUpdated =  Utilities.formatDate(file.getLastUpdated(), timezone, "yyyy-MM-dd HH:mm");
    var dateCreated =  Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd HH:mm")
    
    row += "<li>" + lastUpdated + " <a href='" + fileURL + "'>" + fileName + "</a></li>";
    
    sheet.appendRow([dateCreated, lastUpdated, fileName, fileURL]);
    
    count++;
  }
  
  if (row !== "") {
    row = "<p>" + count + " file(s) uploaded/changed. Here's the list:</p><ol>" + row + "</ol>";
    row +=  emailBody+"<br>" + "<br><small> "+emailFooter+" </a>.</small>";     
    MailApp.sendEmail(email, emailSubject, "", {name: emailFromName, htmlBody: row});
  }  
  else{
    Logger.log("Gotcha");
    row = "<p> No file(s) uploaded/changed in the past 24 hrs. </p>";
    row +=  emailBody+"<br>" + "<br><small> "+emailFooter+" </a>.</small>";     
    emailFromName ="Team 5 Rocks (Do Not Reply)";
    emailSubject = "No File has been uploaded or modified in Team Drive" ;
    
    MailApp.sendEmail("thisis.karthikn@gmail.com", emailSubject, "", {name: emailFromName, htmlBody: row});
  
  }
}