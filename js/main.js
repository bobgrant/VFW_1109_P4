/*

Robert H. Grant
VFW :: 1109 :: P4
Instructor: Chad Gibson
Full Sail University
Filename: main.js

*/

// ====================================================================================================================
// Execute several startup functions after the DOM is completely loaded.
// ====================================================================================================================

// Preload images for receipt.
// If these images are not preloaded they often do not change fast enough for my liking (Such as after a browser reset)
var ratedG          = new Image(); ratedG.src = "img/g.jpg";
var ratedPG13       = new Image(); ratedPG13.src = "img/pg13.jpg";
var ratedR          = new Image(); ratedR.src = "img/r.jpg";
var ratedNC17       = new Image(); ratedNC17.src = "img/nc17.jpg";
var ratedNR         = new Image(); ratedNR.src = "img/nr.jpg";
    
// Run startup procedures (seen directly below)
window.onload = runStartup();

// ====================================================================================================================
// Startup functions
// ====================================================================================================================

function runStartup(){

    populateCategory (); // Fill category drop down box with options.  
    autoFillDate(); // Set date field to todays date.
    document.getElementById('category').focus(); // Set focus to first input field
    showStorage(); // Shows internal storage in alert box if information exists.
}

// ====================================================================================================================
// Color change on focus
// ====================================================================================================================

function backColor(id, bColor, fColor){
    document.getElementById(id).style.backgroundColor = bColor;
    document.getElementById(id).style.color = fColor;
}

// ====================================================================================================================
// Calculate todays date and populate date box ensuring there is always 10 characters regardless of date.
// ====================================================================================================================

function autoFillDate(){
    var myDate = new Date();
    var myMonth = myDate.getMonth() + 1;
    var myDay = myDate.getDate();
    var myYear = myDate.getFullYear();
    var strDate = myYear;
    
    //ensure month has two character spaces.
    //by adding appropiate zero.
    if (myMonth < 10) {
        strDate = strDate + "/0" + myMonth;
    } else {
        strDate = strDate + "/" + myMonth;
    } // END myMonth if
    
    //ensure day has two character spaces.
    //by adding appropiate zero.
    if (myDay < 10){
        strDate = strDate + "/0" + myDay;
    } else {
        strDate = strDate + "/" + myDay;
    } // END myDay if
    
    //Set the date value of the HTML tag.
    document.getElementById('releaseDate').value = strDate;
}


// ====================================================================================================================
// Updates the visible number representating the value of the range slider.
// ====================================================================================================================

function updateCopies(){
    var myValue = document.getElementById('copiesNeeded').value;
    document.getElementById('labelCopies').innerHTML = "Copies: " + myValue;
}

// ====================================================================================================================
// Pushes specified option into specified drop down box by id.
// ====================================================================================================================

function addOption(id,whatToDisplay){
    
    var mySelect = document.getElementById(id);
    var option=document.createElement("option");
    option.text= whatToDisplay;

    // null is so the item goes to the end, "before" would place it to the top of the list.
    mySelect.add(option,null);
} // END addOption function



// ====================================================================================================================
// Populate drop down menus dynamically.
// ====================================================================================================================

function populateCategory (){
    var myCategories = ["Action", "Comedy", "Documentary", "Drama", "Educational", "Horror", "Romance", "Television"];
    var mpaaClasses = ["(G) Children's", "(PG-13) Parental Guidance 13yrs.",
                       "(R) Restricted", "(NC-17) No one under 17yrs.", "(NR) Not rated"]
    
    for (i=0; i < myCategories.length; i++){
        addOption("category",myCategories[i]);
    } // END for i
    
    for (c=0; c < mpaaClasses.length; c++){
        addOption("mpaaClassification",mpaaClasses[c]);
    } // END for c
    
} // END populateCategory function


// ====================================================================================================================
// saveData(): Saves form field data into local storage.
// ====================================================================================================================

function saveData(){
    var category            = document.getElementById('category').value;
    var mpaaClassification  = document.getElementById('mpaaClassification').value;
    var movieTitle          = document.getElementById('movieTitle').value;
    var copiesNeeded        = document.getElementById('copiesNeeded').value;
    var wasInTheaters       = document.getElementById('wasInTheaters').value;
    var releaseDate         = document.getElementById('releaseDate').value;
    var tComment            = document.getElementById('tcomment').value;
    var myDate              = new Date();
    var myYear              = myDate.getFullYear();
    var myMonth             = myDate.getMonth();
    var myDay               = myDate.getDate();
    var myHours             = myDate.getHours();
    var myMinutes           = myDate.getMinutes();
    var mySeconds           = myDate.getSeconds();
    // Generate unique key based on YYYYMMDDHHMMSS
    var myKey               = myYear + "" + myMonth + "" + myDay + "" + myHours + "" + myMinutes + "" + mySeconds;
    // Put all data saved from form into array to be saved all at once.
    var myArray             = [category,mpaaClassification,movieTitle,copiesNeeded,wasInTheaters,releaseDate,tComment];
    
    
    // Check to see if user changed shipping instructions from the default and if not
    // confirm they want them the way they are.
    if (document.getElementById('tcomment').value == "If not home specify preference for leaving package such as 'on rear porch' or 'do not leave'."){
        var response;
        response = confirm("You have not changed the default shipping info.  Press OK to use the default or CANCEL to edit.");
        if (response == false){
            tComment = prompt("Please enter shipping instructions:");
        } // END if !response
    } // END if tcomment
  
  
// =================================================================================================================
// V A L I D A T E    D A T A   F O R    P R O P E R    F O R M A T
// =================================================================================================================

    // Check data in form
    var department  = ["movieTitle","releaseDate"];
    var deptKey     = [/^([0-9a-zA-Z\s\.\!])+([0-9a-zA-Z\s\.\!])*$/,/^[2-9][0-9]{3}[\/-\\][0-9]{2}[\/-\\][0-9]{2}$/];    
    var question    = ["the movie title.","the purchase date (YYYY/MM/DD)"];
    var response    = ""; // Value from prompt box.
    
    // Loop through all inputs that need validation and check them against the array information.
    for (i = 0; i < department.length; i++){
        if (!(deptKey[i].exec(document.forms["paper"][department[i]].value))) {
            // Change border to red and prompt for answer.
            document.getElementById(department[i]).style.border = "2px dotted red";
            document.getElementById(department[i]).style.background = "#fdd5d9";
            response = prompt("Please enter " + question[i]);
                // User pushed cancel.
                if(response == null){
                    document.forms["paper"][department[i]].style.border = "1px solid gray";
                    document.getElementById(department[i]).style.background = "white";                        
                    return false;
                } // END if response
                
            document.forms["paper"][department[i]].style.border = "1px solid gray";
            document.getElementById(department[i]).style.background = "white";
            document.forms["paper"][department[i]].value = response;
            i--;
        } // END if deptKey
    } // END for i=2
    
 // =================================================================================================================
//  S A V E   D A T A   T O   L O C A L   S T O R A G E   A N D   D I S P L A Y   I N   N E W   D I V   T A G. 
// =================================================================================================================   

    //Save data to local storage.
    //Calculate YYYY:MM:DD:HH:MM:SS to generage key and then put everything into an array.
 
    localStorage.setItem(myKey,myArray);

    // Show fieldset#Receipt so that saved entries show up.
    document.getElementById('receipt').style.display = "block";
    
    
    //Ask for system to build new DIV and populate it with several P (paragraphs) and an image based on selection.
    CreateDiv("receipt", myKey);
    CreateP(myKey,"Category: " + category);
    CreateP(myKey,"MPAA Classification: " + mpaaClassification);
    CreateP(myKey,"Movie Title: " + movieTitle);
    CreateP(myKey,"Copies orderd: " + copiesNeeded);
    // If movie was in theateres report it using common English.
    if (wasInTheaters){CreateP(myKey, "This movie was in theaters.");} else {CreateP(myKey, "This movie was not in theaters.");}
    CreateP(myKey, "Purchased on: " + releaseDate);
    CreateP(myKey, "COMMENTS: " + tComment);
    
    // Ask for system to build new image tag with proper image for the users selection.
    

    
    
    
    
    
    




    
} // END saveForm function


// Make a new div tag in HTML for specified parent (theParent)
function CreateDiv (theParentId, inKey){
    var mainDoc = document.getElementById(theParentId);
    var makeDiv = document.createElement("div");
    makeDiv.setAttribute("id",inKey);
    // Set the new div inside of the receipt fieldset.
    mainDoc.appendChild(makeDiv);
}

// Creates a paragraph inside of an html tag with the id of theKey.
function CreateP(theKey, newText){
    var myDiv   = document.getElementById(theKey);
    var newP    = document.createElement("p");
    var myText  = document.createTextNode(newText);
    newP.appendChild(myText);
    // Set the new paragraph inside of the div here.
    myDiv.appendChild(newP);
}

// Creates an image inside of my div tag.
function CreateImg(theKey, url, altText){
    var myImage = document.createElement("img");
    var myDiv   = document.getElementById(theKey);
    myImage.setAttribute("id",theKey);
    myImage.setAttribute("url",url);
    myImage.setAttribute("alt", altText);
    // Set the new image inside of the div here.
    myDiv.appendChild(myImage);
}



// ====================================================================================================================
// Show Storage 
// ====================================================================================================================

function showStorage(){
    var category            = localStorage.getItem('storeCategory');
    var mpaaClassification  = localStorage.getItem('storeMpaaClassification');
    var movieTitle          = localStorage.getItem('storeMovieTitle');
    var copiesNeeded        = localStorage.getItem('storeCopiesNeeded');
    var wasInTheaters       = localStorage.getItem('storeWasInTheaters');
    var releaseDate         = localStorage.getItem('storeReleaseDate');
    var tComment            = localStorage.getItem('storeTComment');
    var counter             = 0;
    // Set variable status of this data for alert box notification.
    if (wasInTheaters == "on") {boxOffice = "Yes";} else {boxOffice = "No";}
    
    var pageArray = [
      category,
      mpaaClassification,
      movieTitle,
      copiesNeeded,
      wasInTheaters,
      releaseDate,
      tComment  
    ];

    // Count length of each array entry to see if entry is greater than 6 which is all commas.
    for (i = 0; i < pageArray.length; i++){
        counter = counter + pageArray[i].length;
    } // END i loop
    
    if (counter < 7) {return false;} // exits function if no data existed in local storage.
    
    //Continues here because counter shows data was found > 6.
    // Enable clear storage link because saved data exists.
    document.getElementById('clearLocal').style.visibility = "visible";
    // Hide the form so the only this visible is the Clear local storage link and the header.
    document.getElementById('paper').style.display = "none";

    //  Put text on receipt
    document.getElementById('receiptCategory').innerHTML = "Category: " + category;
    
    // Put MPAA Classification in short form on receipt
    if (mpaaClassification == "(G) Children's"){document.getElementById('receiptMpaaClassification').innerHTML = "Rated: G";}
    if (mpaaClassification == "(PG-13) Parental Guidance 13yrs."){document.getElementById('receiptMpaaClassification').innerHTML = "Rated: PG13";}
    if (mpaaClassification == "(R) Restricted"){document.getElementById('receiptMpaaClassification').innerHTML = "Rated: R";}
    if (mpaaClassification == "(NC-17) No one under 17yrs."){document.getElementById('receiptMpaaClassification').innerHTML = "Rated: NC-17";}
    if (mpaaClassification == "(NR) Not rated"){document.getElementById('receiptMpaaClassification').innerHTML = "Rated: Not Rated";}
    
    document.getElementById('receiptMovieTitle').innerHTML = "Title: " + movieTitle;
    document.getElementById('receiptCopiesNeeded').innerHTML = "Quantity on order: " + copiesNeeded;
    if (wasInTheaters == "on"){
        document.getElementById('receiptWasInTheaters').innerHTML = "This item was was in theaters.";
    } else {
        document.getElementById('receiptWasInTheaters').innerHTML = "This item was not in theaters.";
    }
    document.getElementById('receiptReleaseDate').innerHTML = "Purchase date: " + releaseDate;
    
    // Only put shipping instructions on receipt if user typed some in.
    if (tComment.length > 0 && tComment != "null"){
        document.getElementById('receiptComments').innerHTML = "Shipping instructions:<br/>" + tComment;
    } else {
        document.getElementById('receiptComments').innerHTML = "Standard shipping.";
    }
    
    // Put image on receipt
    if (mpaaClassification == "(G) Children's") {document.getElementById('dvdPic').src = ratedG.src;}
    if (mpaaClassification == "(PG-13) Parental Guidance 13yrs."){document.getElementById('dvdPic').src = ratedPG13.src;}
    if (mpaaClassification == "(R) Restricted"){document.getElementById('dvdPic').src = ratedR.src;}
    if (mpaaClassification == "(NC-17) No one under 17yrs."){document.getElementById('dvdPic').src = ratedNC17.src;}
    if (mpaaClassification == "(NR) Not rated"){document.getElementById('dvdPic').src = ratedNR.src;}
    
//  Show receipt
    
    document.getElementById('receipt').style.visibility = "visible";
} // END showStorage function


// ========================================================================================================================
// Clears all data from local storage
// ========================================================================================================================

function clearStorage(){
    localStorage.clear();
    document.getElementById('clearLocal').style.visibility = "hidden";
    document.getElementById('paper').style.display = "block";
    
    // Hide receipt
    document.getElementById('receipt').style.visibility = "hidden";
} // END clearStorage function


// ========================================================================================================================
// Delete contents of input field ONLY WHEN IT HAS NOT ALREADY BEEN CHANGED BY THE USER.
// ========================================================================================================================
function deleteValue(id){
    
    // Only erase contents of movie title box if it wasn't changed already by user.
    if (id == "movieTitle"){
        myValue = document.getElementById(id).value;
        if (myValue == "Enter the title of the movie."){
            document.getElementById(id).value = "";
        } // END of movieTitle clearing
    } // END if id==movieTitle
    
    if (id == "tcomment"){
        myValue = document.getElementById(id).value;
        if (myValue == "If not home specify preference for leaving package such as 'on rear porch' or 'do not leave'."){
            document.getElementById(id).value = "";
        }// END if myValue
    } // END if id==tcomment
}

function validateForm(){
    alert("CODE HERE.");
    if (document.getElementById("movieTitle").value == "Enter the title of the movie."){
        alert("Movie title not changed.")
    }
}
// END OF SCRIPT