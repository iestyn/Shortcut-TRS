$(document).ready(function() {
    
    $('.current_dt').val(function() {
        return getTodaysDate();    
    });
    
    $('.fn').val(function() {
        return getTodaysFortnight();    
    });
    
    $('.dof').val(function() {
        return getTodaysDayOfFortnight();    
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
        return getTodaysDate();    
    });
    
    $('.display-fn').html(function () {
        return getTodaysFortnight();    
    });

    $('.display-dof').html(function () {
        return getTodaysDayOfFortnight();    
    });
});


var userData = {
    uid: 6797,
    user: 'iestyn'
};

var epochData = {
    // Date data relating to the timesheet app itself 
    
    /** On Monday 11/5/2012, the following values were true:
     ** day of fortnight = 1
     ** fortnight number = 1718
     **
     ** Update these two values with the date of day one of the fortnight
     ** and the fortnight number for that day.
     **
     **/
    
    refDayOneOfFortnight: 'November 5, 2012', 
    refFortnightNumber: 1622,    
    
    fn: function() {
        
        var todayDate = new Date().getTime();
        var refDate = Date.parse(this.refDayOneOfFortnight);                
        daysSinceRef = Math.floor((todayDate - refDate) / (1000 * 60 * 60 * 24));
        
        fortnightsSinceRef = Math.floor(daysSinceRef / 14);        
        return this.refFortnightNumber+fortnightsSinceRef;
    },
    
    dof: function() {
        
        var todayDate = new Date().getTime();
        var refDate = Date.parse(this.refDayOneOfFortnight) ;
        var fnSinceRef = this.fn() - this.refFortnightNumber;
        var fnDate =  refDate + (fnSinceRef * 14 * 1000 * 60 * 60 * 24);

        var daysSinceFortnightStart = Math.floor((todayDate - fnDate) / (1000 * 60 * 60 * 24)) + 1;        
        return daysSinceFortnightStart;
    },
    
    today: function() {
        var monthNames = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
        var d = new Date();
        var month = d.getMonth();
        var day = d.getDate();        
        var output =           
            ((''+day).length<2 ? '0' : '') + day + '-' +
            monthNames[month] + '-' +
            d.getFullYear();
        return output;
    }    
    
};

function getTodaysFortnight() {
    return epochData.fn();    
}

function getTodaysDayOfFortnight() {
    return epochData.dof();    
}

function getUID() {
    return userData.uid;    
}

function getUser() {
    return userData.user;
}

function getTodaysDate() {
    return epochData.today();
}




