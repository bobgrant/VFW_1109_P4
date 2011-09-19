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
    var outArray            = myArray.join(";");
    
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
//  S A V E   D A T A   T O   L O C A L   S T O R A G E. 
// =================================================================================================================   

    //Save data to local storage.
    //Calculate YYYY:MM:DD:HH:MM:SS to generage key and then put everything into an array.
 
    localStorage.setItem(myKey,outArray);
    
        // Show addition.
        CreateDiv("receipt", myKey);
        CreateP(myKey, "Transaction #: " + myKey);
        CreateP(myKey, "");
        CreateP(myKey,"Category: " + category);
        CreateP(myKey,"MPAA Classification: " + mpaaClassification);
        CreateP(myKey,"Movie Title: " + movieTitle);
        CreateP(myKey,"Copies orderd: " + copiesNeeded);
        
        // If movie was in theateres report it using common English.
        if (wasInTheaters == "on"){
            alert("wasin");
            CreateP(myKey, "This movie was in theaters.");
        } else {
            CreateP(myKey, "This movie was not in theaters.");
          };

        CreateP(myKey, "Purchased on: " + releaseDate);
        CreateP(myKey, "COMMENTS: " + tComment);

        // Determine which image to use based on mpaaClassification.
        switch (mpaaClassification){
            case "(G) Children's":
                CreateImg(myKey, "img/g.jpg","Rated G");
                break;
            case ("(PG-13) Parental Guidance 13yrs."):
                CreateImg(myKey, "img/pg13.jpg", "Rated: PG13");
                break;
            case ("(R) Restricted"):
                CreateImg(myKey, "img/r.jpg", "Rated: R");
                break;
            case("(NC-17) No one under 17yrs."):
                CreateImg(myKey, "img/NC17.jpg", "Rated: NC17");
                break;
            case("(NR) Not rated"):
                CreateImg(myKey, "img/NR.jpg", "This movie is not rated");
                break;
        }

        // Put paragraph under image to create a space.
        CreateP(myKey, "");
    
        // Create Delete hyperlink on receipt.
        CreateDelete(myKey);

        // Put paragraph under image to create a space.
        CreateP(myKey, "");    
    
        // Create Edit hyperlink on receipt.    
        CreateEdit(myKey); 
    
        location.reload(true);
        
} // END saveData() function


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
    myImage.setAttribute("src",url);
    myImage.setAttribute("alt", altText);
    // Set the new image inside of the div here.
    myDiv.appendChild(myImage);
}

function CreateDelete(theKey){
    var myA     = document.createElement("a");
    var myDiv   = document.getElementById(theKey);
    myA.setAttribute("href","JavaScript:DeleteInternal(" + theKey + ")");
    var myText  = document.createTextNode("Delete Item");
    myA.appendChild(myText);
    myDiv.appendChild(myA);
    
}


function CreateEdit(theKey){
    var myA     = document.createElement("a");
    var myDiv   = document.getElementById(theKey);
    myA.setAttribute("href","JavaScript:EditInternal(" + theKey +")");
    var myText  = document.createTextNode("Edit Item");
    myA.appendChild(myText);
    myDiv.appendChild(myA);
}



function RemoveAllChildren(theParent){
    while (theParent.hasChildNodes()) {
        theParent.removeChild(theParent.lastChild);
    }
} // END function RemoveAllChildren

function DeleteInternal(theKey){
    var answer = confirm("Are you sure you wish to delete this record?");
    // Delete if user confirmed deletion.
    if (answer){
        localStorage.removeItem(theKey);
        window.location.reload();
    } // END if answer.
} // END DeleteInternal function

function EditInternal(theKey){
    // Load internal storage and split it apart so it can be put back into the form.
    var myLoadedArray       = localStorage.getItem(theKey);
    var myArray             = myLoadedArray.split(";");
    var category            = myArray[0];
    var mpaaClassification  = myArray[1];
    var movieTitle          = myArray[2];
    var copiesNeeded        = myArray[3];
    var wasInTheaters       = myArray[4];
    var purchaseDate        = myArray[5];
    var tComment            = myArray[6];
    
    // Repopulate form with saved information.
    document.getElementById("category").value = category;
    document.getElementById("mpaaClassification").value = mpaaClassification;
    document.getElementById("movieTitle").value = movieTitle;
    document.getElementById("copiesNeeded").value = copiesNeeded;
    // Update the TextNode that shows Copies: 1 or Copies: 2 depending on range.
    updateCopies();
    
    // if wasInTheaters==on then make sure I checkbox it.
    if (wasInTheaters == "on") {
        document.getElementById("wasInTheaters").setAttribute("checked","checked");
    } // End if wasInTheaters
    
    document.getElementById("releaseDate").value = purchaseDate;
    document.getElementById("tcomment").value = tComment;
        
    // Change where button click takes user
    document.getElementById("paper").setAttribute("action","JavaScript:ReSaveData(" + theKey + ")");
    
    // Change text on button
    var myButton = document.getElementById("subButton");
        myButton.value = "Save changes";
}// END EditInternal function

function ReSaveData(theKey){
    
    // Convert form data back into variables.    
    var category            = document.getElementById("category").value;
    var mpaaClassification  = document.getElementById("mpaaClassification").value;
    var movieTitle          = document.getElementById("movieTitle").value;
    var copiesNeeded        = document.getElementById("copiesNeeded").value;
    var wasInTheaters       = document.getElementById("wasInTheaters").value;
    var purchaseDate        = document.getElementById("releaseDate").value;
    var tComment            = document.getElementById("tcomment").value;
    var myArray             = [category,mpaaClassification,movieTitle,copiesNeeded,wasInTheaters,purchaseDate,tComment];
    var myOutputArray       = myArray.join(";");
    
    // Change where button takes user back to normal
    document.getElementById("paper").setAttribute("actio","JavaScript:saveData()");
    
    // Change text on button back to normal.
    document.getElementById("subButton").value = "Add DVD to cart";
    
    InternalStorage.setItem(theKey, myOutputArray);
    
    alert("Your changes have been saved.");
    
    
    
}

// ====================================================================================================================
// Show Storage 
// ====================================================================================================================

function showStorage(){
    var category;
    var mpaaClassification;
    var movieTitle;
    var copiesNeeded;
    var wasInTheaters;
    var purchaseDate;
    var tComment;
    
    var myDate              = new Date();
    var myYear              = myDate.getFullYear();
    var myMonth             = myDate.getMonth();
    var myDay               = myDate.getDate();
    var myHours             = myDate.getHours();
    var myMinutes           = myDate.getMinutes();
    var mySeconds           = myDate.getSeconds();
    // Generate unique key based on YYYYMMDDHHMMSS
    var myKey = myDate + "" + myYear + "" + myMonth + "" + myDay + "" + myHours + "" + myMinutes + "" + mySeconds;
    
    
    // Check to see if internal storage has any data and if not get out of here.

    
    for (i = 0; i<localStorage.length;i++){
        myKey   = localStorage.key(i);
        var myValue = localStorage.getItem(myKey);
        
        
        // Split (myValue) so that I can move each item into proper variables.
        myValue = myValue.split(';');
        
        category            = myValue[0];
        mpaaClassification  = myValue[1];
        movieTitle          = myValue[2];
        copiesNeeded        = myValue[3];
        wasInTheaters       = myValue[4];
        purchaseDate        = myValue[5];
        tComment            = myValue[6];


        
// =====================================================================================================================
// P O P U L A T E   F O R M   W I T H   I N T E R N A L   S T O R A G E
// =====================================================================================================================

    
        //Ask for system to build new DIV and populate it with several P (paragraphs) and an image based on selection.
        CreateDiv("receipt", myKey);
        CreateP(myKey, "Transaction #: " + myKey);
        CreateP(myKey, "");
        CreateP(myKey,"Category: " + category);
        CreateP(myKey,"MPAA Classification: " + mpaaClassification);
        CreateP(myKey,"Movie Title: " + movieTitle);
        CreateP(myKey,"Copies orderd: " + copiesNeeded);

        // If movie was in theateres report it using common English.
        if (wasInTheaters){CreateP(myKey, "This movie was in theaters.");} else {CreateP(myKey, "This movie was not in theaters.");}
        CreateP(myKey, "Purchased on: " + purchaseDate);
        CreateP(myKey, "COMMENTS: " + tComment);
    
        // Determine which image to use based on mpaaClassification.
        switch (mpaaClassification){
            case "(G) Children's":
                CreateImg(myKey, "img/g.jpg","Rated G");
                break;
            case ("(PG-13) Parental Guidance 13yrs."):
                CreateImg(myKey, "img/pg13.jpg", "Rated: PG13");
                break;
            case ("(R) Restricted"):
                CreateImg(myKey, "img/r.jpg", "Rated: R");
                break;
            case("(NC-17) No one under 17yrs."):
                CreateImg(myKey, "img/NC17.jpg", "Rated: NC17");
                break;
            case("(NR) Not rated"):
                CreateImg(myKey, "img/NR.jpg", "This movie is not rated");
                break;

        }// Switch


            // Put paragraph under image to create a space.
            CreateP(myKey, "");
    
            // Create Delete hyperlink on receipt.
            CreateDelete(myKey);

            // Put paragraph under image to create a space.
            CreateP(myKey, "");    
    
            // Create Edit hyperlink on receipt.    
            CreateEdit(myKey);


            // Show fieldset#Receipt so that saved entries show up.
            document.getElementById('receipt').style.display = "block";    

        } //END for i < internalStorage.length.
    
} // END showStorage function


// ========================================================================================================================
// Clears all data from local storage
// ========================================================================================================================

function clearStorage(){
    localStorage.clear();
    document.getElementById('clearLocal').style.visibility = "hidden";
    document.getElementById('paper').style.display = "block";
    
    // Hide receipt
    document.getElementById('receipt').style.display = "none";
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