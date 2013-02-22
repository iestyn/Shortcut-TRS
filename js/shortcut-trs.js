$(document).ready(function() {
    
    $('#timesheetday').datepicker({
        dateFormat: "dd-M-yy",
        monthNamesShort: epochData.monthNames,
        onClose: function (dateText, dateObj) {
            updateTimesheetDates(dateText, dateObj);
        }
    });

    updateTimesheetDates();
    
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
     ** Update these two values with the date of day one of the fortnight
     ** and the fortnight number for that day.
     **
     **/
    
    refDayOneOfFortnight: 'January 28, 2013', 
    refFortnightNumber: 2005,    
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




