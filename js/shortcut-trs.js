$(document).ready(function() {
    
    $('#timesheetday, .timesheetday').datepicker({
        dateFormat: "dd-M-yy",
        monthNamesShort: epochData.monthNames,
        onClose: function (dateText, dateObj) {
            updateTimesheetDates(dateText, dateObj);
        }
    });

    updateTodaysTimesheetDates();
    updateTimesheetDates();
    
    /*$('#ex').click(function(event){
        event.preventDefault();
        makeTRSRequest("/trs/exec_edit_timesheet.php");
        return false;
    });*/
    
});


var userData = {
    uid: 6797,
    user: 'iestyn'
};

var epochData = {
    // Date data relating to the timesheet app itself 
    
    /** On Monday 28/1/2013, the following values were true:
     ** day of fortnight = 1
     ** fortnight number = 2005
     **
     ** On Monday 13/1/2014, the following values were true:
     ** day of fortnight = 1
     ** fortnight number = 2365
     ** 
     ** On Monday 11/1/2016, the following values were true:
     ** day of fortnight = 1
     ** fortnight number = 2735
     ** 
     ** Update these two values with the date of day one of the fortnight
     ** and the fortnight number for that day.
     **
     **/

    refDayOneOfFortnight: 'January 11, 2016',
    refFortnightNumber: 2735,  
    monthNames: [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ],
     
    fn: function(dateStr) {
        
        todayDate = this.newDate(dateStr);
        var refDate = Date.parse(this.refDayOneOfFortnight);                
        daysSinceRef = Math.floor((todayDate - refDate) / (1000 * 60 * 60 * 24));
        
        fortnightsSinceRef = Math.floor(daysSinceRef / 14);        
        return this.refFortnightNumber+fortnightsSinceRef;
    },
    
    dof: function(dateStr) {
        
        todayDate = this.newDate(dateStr);
        var refDate = Date.parse(this.refDayOneOfFortnight) ;
        var fnSinceRef = this.fn(dateStr) - this.refFortnightNumber;
        var fnDate =  refDate + (fnSinceRef * 14 * 1000 * 60 * 60 * 24);

        var daysSinceFortnightStart = Math.floor((todayDate - fnDate) / (1000 * 60 * 60 * 24)) + 1;        
        return daysSinceFortnightStart;
    },
    
    today: function(dateStr) {
        var d = this.newDate(dateStr);
        var month = d.getMonth();
        var day = d.getDate();        
        var output =           
            ((''+day).length<2 ? '0' : '') + day + '-' +
            this.monthNames[month] + '-' +
            d.getFullYear();
        return output;
    },   
    
    newDate: function(dateString) {
        if((!dateString)||(dateString==undefined)) { return new Date(); }
        var dateArr = dateString.split("-");
        return new Date(dateArr[2],this.getArrKey(dateArr[1],this.monthNames),dateArr[0]);
    },
    
    getArrKey: function(value, Arr) {
        for (var key in Arr) {
            if (value == Arr[key]) {
                return key
            }
        }
        return null;
    }
};

function updateTodaysTimesheetDates(dateText, dateObject) {
    
    $('.current_dt_today').val(function() {
        return getTodaysDate(dateText);
    });
    
    $('.fn_today').val(function() {
        return getTodaysFortnight(dateText);    
    });
    
    $('.dof_today').val(function() {
        return getTodaysDayOfFortnight(dateText);    
    });

    $('.display-date-today').html(function () {
        return getTodaysDate(dateText);    
    });
    
    $('.display-fn-today').html(function () {
        return getTodaysFortnight(dateText);    
    });

    $('.display-dof-today').html(function () {
        return getTodaysDayOfFortnight(dateText);    
    });
}

function updateTimesheetDates(dateText, dateObject) {

   $('.current_dt').val(function() {
        return getTodaysDate(dateText);
    });
    
    $('.fn').val(function() {
        return getTodaysFortnight(dateText);    
    });
    
    $('.dof').val(function() {
        return getTodaysDayOfFortnight(dateText);    
    });
    
    $('.uid').val(function() {
        return getUID();    
    });
    
    $('.user').val(function() {
        return getUser();    
    });
    
    $('.display-user').html(function () {
        return getUser();    
    });

    $('.display-date').html(function () {
        return getTodaysDate(dateText);    
    });
    
    $('.display-fn').html(function () {
        return getTodaysFortnight(dateText);    
    });

    $('.display-dof').html(function () {
        return getTodaysDayOfFortnight(dateText);    
    });
        
}

function getTodaysFortnight(dateText) {
    return epochData.fn(dateText);    
}

function getTodaysDayOfFortnight(dateText) {
    return epochData.dof(dateText);    
}

function getUID() {
    return userData.uid;    
}

function getUser() {
    return userData.user;
}

function getTodaysDate(dateText) {
    return epochData.today(dateText);
}

function makeTRSRequest(url,uriString) {

   
    $.ajax({
        url: url,	
        type: "POST",
        data: uriString,
        dataType: "html",
        contentType: 'text/html',
        
        statusCode: {
            
            402: function() {
                alert("auth req");
            },
            
            403: function() {
                alert("auth req");
            }
        },
        
        // Cache the ajax request in the browser?
        cache: true,
    
        beforeSend: function(xhr) {
            
            //xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(username + ":" + password));
            
        },

        complete: function(jqXHR, status){
            if (jqXHR) {

			}          
        },
        
        success: function (data, textStatus, jqXHR) {
            if (data) {

			}
		},
        
        fail: function(jqXHR, textStatus){
            ajaxRequestFailed(jqXHR, textStatus);			
        },
    
        error: function(jqXHR, textStatus, errorThrown){
            ajaxRequestError(jqXHR, textStatus, errorThrown);			
        }

    }); 
    
    
}

function ajaxRequestFailed(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );		
}

function ajaxRequestError(jqXHR, textStatus, errorThrown){
    alert( "Request error: " + textStatus + " " + errorThrown );			
}


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}

}
