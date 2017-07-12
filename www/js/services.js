angular.module('subwayTime.services',[])

.service('subwayTimeService', function() {
  var subwayTimeData = {
    fileTimeFormat : "",
    message : "",
    direction1 : "",
    up :[],
    direction2: "",
    down : []
  };

  var getUpsize = function() {
    return subwayTimeData.up.length;
  };

  var addTime = function(newObj) {
      subwayTimeData.up.push(newObj);
  };

  var resetTimes = function(obj) {
    subwayTimeData.up = 0;
    subwayTimeData.up = [];
  }

  var addFileTimeStamp = function(t) {
    subwayTimeData.fileTimeFormat = t;
  };

  var setMessage = function(m) {
    subwayTimeData.message = m;
  };

  var setDirection1 = function(m) {
    subwayTimeData.direction1 = m;
  };

  var getSubwayTimes = function(stationId){
      // console.log("clicked on station: " + stationId);
      loadData(stationId);
      return subwayTimeData;
  };

  return {
    getSubwayTimes: getSubwayTimes
  };

  function loadData(stationId) {

    var jsTimeStamp = Math.round((new Date()).getTime() / 1000);
    var dataScript = document.getElementsByTagName("head")[0].lastChild;
    dataScript.parentNode.removeChild(dataScript);
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = 'http://apps.mta.info/trainTime/getTimesByStation.aspx?stationID=' + stationId + "&time=" + jsTimeStamp;
    headID.appendChild(newScript);
    // document.getElementById("trainTimesDiv").style.display = "inline"
    loadNewData(stationId);
  }

  function loadNewData(stationId) {

    var direction1GoodData = true;
    var direction2GoodData = true;
    var loadTimeStamp = 0;

    // Read from the data JS file imported
    // var currentTime = fileTimeStamp;

    // alert ("Length of array is: " + direction1.length);

    if (direction1.length == 0 && direction2.length == 0) {
        //tryAgain()
        //loadData(stationId);
        return false;
    }

    direction1.sort(sortfunction);
    direction2.sort(sortfunction);

    addFileTimeStamp(fileTimeFormat);

    if (ageOfDataAtRead > 120) {
      setMessage("No Data is available currently.");
    }

    direction1GoodData = fixDirectionArray(direction1);
    direction2GoodData = fixDirectionArray(direction2);

    loadTimeStamp = Math.round((new Date()).getTime() / 1000);

    if (!direction1GoodData && !direction2GoodData) {
      setMessage("Couldn't get Data from GTFS. Try Again.");
      return false
    }

    loadDirection1(stationId);
  }

  function loadDirection1(stationId) {

    var direction1Array = new Array()
    direction1Array[0] = "Uptown"
    direction1Array[1] = "Manhattan"
    direction1Array[2] = "Bronx"
    direction1Array[3] = "Manhattan/Bronx"
    direction1Array[4] = "Uptown/Bronx"
    direction1Array[5] = ""
    direction1Array[6] = "Brooklyn"
    direction1Array[7] = "St. George"

    var direction2Array = new Array()
    direction2Array[0] = "Downtown"
    direction2Array[1] = "Manhattan"
    direction2Array[2] = "Brooklyn"
    direction2Array[3] = "Queens"
    direction2Array[4] = "Manhattan/Brooklyn"
    direction2Array[5] = ""
    direction2Array[6] = "Tottenville"

    var stations = new Array()
    stations["101"] = "Van Cortlandt Park - 242 St,0,0";
    stations["103"] = "238 St,0,0";
    stations["104"] = "231 St,0,0";
    stations["106"] = "Marble Hill - 225 St,0,0";
    stations["107"] = "215 St,0,0";
    stations["108"] = "207 St,0,0";
    stations["109"] = "Dyckman St,0,0";
    stations["110"] = "191 St,0,0";
    stations["111"] = "181 St,0,0";
    stations["112"] = "168 St - Washington Hts,0,0";
    stations["113"] = "157 St,0,0";
    stations["114"] = "145 St,0,0";
    stations["115"] = "137 St - City College,0,0";
    stations["116"] = "125 St,0,0";
    stations["117"] = "116 St - Columbia University,0,0";
    stations["118"] = "Cathedral Pkwy,0,0";
    stations["119"] = "103 St,0,0";
    stations["120"] = "96 St,0,0";
    stations["121"] = "86 St,0,0";
    stations["122"] = "79 St,0,0";
    stations["123"] = "72 St,0,0";
    stations["124"] = "66 St - Lincoln Center,0,0";
    stations["125"] = "59 St - Columbus Circle,0,0";
    stations["126"] = "50 St,0,0";
    stations["127"] = "Times Sq - 42 St,0,0";
    stations["128"] = "34 St - Penn Station,0,0";
    stations["129"] = "28 St,0,0";
    stations["130"] = "23 St,0,0";
    stations["131"] = "18 St,0,0";
    stations["132"] = "14 St,0,0";
    stations["133"] = "Christopher St - Sheridan Sq,0,0";
    stations["134"] = "Houston St,0,0";
    stations["135"] = "Canal St,0,0";
    stations["136"] = "Franklin St,0,0";
    stations["137"] = "Chambers St,0,0";
    stations["138"] = "Cortlandt St,0,0";
    stations["139"] = "Rector St,0,0";
    stations["140"] = "South Ferry,0,0";
    stations["142"] = "South Ferry,0,0";
    stations["201"] = "Wakefield - 241 St,4,2";
    stations["204"] = "Nereid Av,4,2";
    stations["205"] = "233 St,4,2";
    stations["206"] = "225 St,4,2";
    stations["207"] = "219 St,4,2";
    stations["208"] = "Gun Hill Rd,4,2";
    stations["209"] = "Burke Av,4,2";
    stations["210"] = "Allerton Av,4,2";
    stations["211"] = "Pelham Pkwy,4,2";
    stations["212"] = "Bronx Park East,4,2";
    stations["213"] = "E 180 St,4,2";
    stations["214"] = "West Farms Sq - E Tremont Av,4,2";
    stations["215"] = "174 St,4,2";
    stations["216"] = "Freeman St,4,2";
    stations["217"] = "Simpson St,4,2";
    stations["218"] = "Intervale Av,4,2";
    stations["219"] = "Prospect Av,4,2";
    stations["220"] = "Jackson Av,4,2";
    stations["221"] = "3 Av - 149 St,4,2";
    stations["222"] = "149 St - Grand Concourse,4,2";
    stations["224"] = "135 St,0,4";
    stations["225"] = "125 St,0,0";
    stations["226"] = "116 St,0,0";
    stations["227"] = "Central Park North (110 St),0,0";
    stations["228"] = "Park Pl,0,0";
    stations["229"] = "Fulton St,0,0";
    stations["230"] = "Wall St,2,0";
    stations["231"] = "Clark St,2,3";
    stations["232"] = "Borough Hall,2,3";
    stations["233"] = "Hoyt St,2,3";
    stations["234"] = "Nevins St,2,3";
    stations["235"] = "Atlantic Av,2,3";
    stations["236"] = "Bergen St,2,3";
    stations["237"] = "Grand Army Plaza,2,3";
    stations["238"] = "Eastern Pkwy - Brooklyn Museum,2,3";
    stations["239"] = "Franklin Av,2,3";
    stations["241"] = "President St,2,3";
    stations["242"] = "Sterling St,2,3";
    stations["243"] = "Winthrop St,2,3";
    stations["244"] = "Church Av,2,3";
    stations["245"] = "Beverly Rd,2,3";
    stations["246"] = "Newkirk Av,2,3";
    stations["247"] = "Flatbush Av - Brooklyn College,2,3";
    stations["248"] = "Nostrand Av,2,3";
    stations["249"] = "Kingston Av,2,3";
    stations["250"] = "Crown Hts - Utica Av,2,3";
    stations["251"] = "Sutter Av - Rutland Rd,2,1";
    stations["252"] = "Saratoga Av,2,1";
    stations["253"] = "Rockaway Av,2,1";
    stations["254"] = "Junius St,2,1";
    stations["255"] = "Pennsylvania Av,2,1";
    stations["256"] = "Van Siclen Av,2,1";
    stations["257"] = "New Lots Av,2,1";
    stations["301"] = "Harlem - 148 St,0,0";
    stations["302"] = "145 St,0,0";
    stations["401"] = "Woodlawn,4,2";
    stations["402"] = "Mosholu Pkwy,4,2";
    stations["405"] = "Bedford Park Blvd - Lehman College,4,2";
    stations["406"] = "Kingsbridge Rd,4,2";
    stations["407"] = "Fordham Rd,4,2";
    stations["408"] = "183 St,4,2";
    stations["409"] = "Burnside Av,4,2";
    stations["410"] = "176 St,4,2";
    stations["411"] = "Mt Eden Av,4,2";
    stations["412"] = "170 St,4,2";
    stations["413"] = "167 St,4,2";
    stations["414"] = "161 St - Yankee Stadium,4,2";
    stations["415"] = "149 St - Grand Concourse,4,2";
    stations["416"] = "138 St - Grand Concourse,4,2";
    stations["418"] = "Fulton St,0,0";
    stations["419"] = "Wall St,0,0";
    stations["420"] = "Bowling Green,0,0";
    stations["423"] = "Borough Hall,2,3";
    stations["501"] = "Eastchester - Dyre Av,4,2";
    stations["502"] = "Baychester Av,4,2";
    stations["503"] = "Gun Hill Rd,4,2";
    stations["504"] = "Pelham Pkwy,4,2";
    stations["505"] = "Morris Park,4,2";
    stations["601"] = "Pelham Bay Park,1,2";
    stations["602"] = "Buhre Av,1,2";
    stations["603"] = "Middletown Rd,1,2";
    stations["604"] = "Westchester Sq - E Tremont Av,1,2";
    stations["606"] = "Zerega Av,1,2";
    stations["607"] = "Castle Hill Av,1,2";
    stations["608"] = "Parkchester,1,2";
    stations["609"] = "St Lawrence Av,1,2";
    stations["610"] = "Morrison Av- Sound View,1,2";
    stations["611"] = "Elder Av,1,2";
    stations["612"] = "Whitlock Av,1,2";
    stations["613"] = "Hunts Point Av,1,2";
    stations["614"] = "Longwood Av,1,2";
    stations["615"] = "E 149 St,1,2";
    stations["616"] = "E 143 St - St Mary's St,1,2";
    stations["617"] = "Cypress Av,1,2";
    stations["618"] = "Brook Av,1,2";
    stations["619"] = "3 Av - 138 St,1,2";
    stations["621"] = "125 St,0,2";
    stations["622"] = "116 St,0,0";
    stations["623"] = "110 St,0,0";
    stations["624"] = "103 St,0,0";
    stations["625"] = "96 St,0,0";
    stations["626"] = "86 St,0,0";
    stations["627"] = "77 St,0,0";
    stations["628"] = "68 St - Hunter College,0,0";
    stations["629"] = "59 St,0,0";
    stations["630"] = "51 St,0,0";
    stations["631"] = "Grand Central - 42 St,0,0";
    stations["632"] = "33 St,0,0";
    stations["633"] = "28 St,0,0";
    stations["634"] = "23 St,0,0";
    stations["635"] = "14 St - Union Sq,0,0";
    stations["636"] = "Astor Pl,0,0";
    stations["637"] = "Bleecker St,0,0";
    stations["638"] = "Spring St,0,0";
    stations["639"] = "Canal St,0,0";
    stations["640"] = "Brooklyn Bridge - City Hall,0,0";
    stations["901"] = "Grand Central - 42 St,5,5";
    stations["902"] = "Times Sq - 42 St,5,5";
    stations["L01"] = "8 Av,2,1";
    stations["L02"] = "6 Av,2,1";
    stations["L03"] = "Union Sq - 14 St,2,1";
    stations["L05"] = "3 Av,2,1";
    stations["L06"] = "1 Av,2,1";
    stations["L08"] = "Bedford Av,2,1";
    stations["L10"] = "Lorimer St,2,1";
    stations["L11"] = "Graham Av,2,1";
    stations["L12"] = "Grand St,2,1";
    stations["L13"] = "Montrose Av,2,1";
    stations["L14"] = "Morgan Av,2,1";
    stations["L15"] = "Jefferson St,2,1";
    stations["L16"] = "DeKalb Av,2,1";
    stations["L17"] = "Myrtle - Wyckoff Avs,2,1";
    stations["L19"] = "Halsey St,2,1";
    stations["L20"] = "Wilson Av,2,1";
    stations["L21"] = "Bushwick Av - Aberdeen St,2,1";
    stations["L22"] = "Broadway Jct,2,1";
    stations["L24"] = "Atlantic Av,2,1";
    stations["L25"] = "Sutter Av,2,1";
    stations["L26"] = "Livonia Av,2,1";
    stations["L27"] = "New Lots Av,2,1";
    stations["L28"] = "E 105 St,2,1";
    stations["L29"] = "Canarsie - Rockaway Pkwy,2,1";
    //------------------------------------S
    stations["S09"] = "Tottenville,6,7";
    stations["S10"] = "Atlantic,6,7";
    stations["S12"] = "Nassau,6,7";
    stations["S13"] = "Richmond Valley,6,7";
    stations["S14"] = "Pleasant Plains,6,7";
    stations["S15"] = "Prince's Bay,6,7";
    stations["S16"] = "Huguenot,6,7";
    stations["S17"] = "Annadale,6,7";
    stations["S18"] = "Eltingville,6,7";
    stations["S19"] = "Great Kills,6,7";
    stations["S20"] = "Bay Terrace,6,7";
    stations["S21"] = "Oakwood Heights,6,7";
    stations["S22"] = "New Dorp,6,7";
    stations["S23"] = "Grant City,6,7";
    stations["S24"] = "Jefferson Avenue,6,7";
    stations["S25"] = "Dongan Hills,6,7";
    stations["S26"] = "Old Town,6,7";
    stations["S27"] = "Grasmere,6,7";
    stations["S28"] = "Clifton,6,7";
    stations["S29"] = "Stapleton,6,7";
    stations["S30"] = "Tompkinsville,6,7";
    stations["S31"] = "St. George,6,7";

    var anyAssignedDirection1 = false;
    var direction1Seconds = new Array();

    var anyAssigned = false;
    anyAssignedDirection1 = false;
    direction1Seconds.length = 0;
    var direction1Minutes;
    var rowCount = 0;

    // document.getElementById("direction1Div").innerHTML = direction1Array[stations[staID].split(",")[2]]
    setDirection1(direction1Array[stations[stationId].split(",")[2]]);

    for (i = 0; i < direction1.length; i++) {
        dataArray = direction1[i].split(",")
        if (dataArray[7] == "1") {
            anyAssigned = true;
            anyAssignedDirection1 = true;
        }
    }

    if (anyAssigned) {
        for (i = 0; i < direction1.length; i++) {
            dataArray = direction1[i].split(",")
            if (dataArray[7] == "0") {
                direction1.splice(i, 1);
                i = i - 1;
            }
        }
    }

    // for (i = 0; i < 4; i++) {
    //     document.getElementById("dir1_" + i).style.display = "none"
    //     document.getElementById("directionHeader2").style.display = "none"
    // }
    var minLabel = "min"
    var compareTime
    var vehicleTime
    var schedTime
    var currentTime = fileTimeStamp; // Kamal added this here to avoid global variable
    var timeOffset = 0;

    resetTimes("up");

    for (i = 0; i < direction1.length && i < 4; i++) {
        dataArray = direction1[i].split(",")
        rowCount = rowCount + 1

        // document.getElementById("dir1_" + i).style.display = "inline"
        // document.getElementById("dir1_" + i + "_0").innerHTML = "<img src='bullets2/" + dataArray[0] + ".png' />"
        // document.getElementById("dir1_" + i + "_1").innerHTML = stations[dataArray[3]].split(",")[0]

        vehicleTime = dataArray[6]

        if (vehicleTime > 0 && (fileTimeStamp - vehicleTime) > 90) {
            compareTime = vehicleTime
        }
        else {
            compareTime = currentTime
        }

        if (dataArray[1] != "0") {
            schedTime = dataArray[1]
        }
        else {
            schedTime = dataArray[2]
        }
        direction1Seconds[i] = ((parseInt(schedTime) - compareTime) * 1) - timeOffset

        //_______________________________
        if (dataArray[7] != "1") {
            direction1Seconds[i] = direction1Seconds[i] - 25
        }

        direction1Minutes = Math.round(direction1Seconds[i] / 60)
        // document.getElementById("dir1_" + i).style.display = "inline"

        if (dataArray[7] != "1") {
            minLabel = "min*"
        }
        else {
            minLabel = "min"
        }

        // document.getElementById("dir1_" + i + "_2").innerHTML = "<nobr>" + direction1Minutes + " " + minLabel + " </nobr>"
        direction1Minutes = direction1Minutes + " " + minLabel;
        if (dataArray[4] != "") {
            direction1Minutes = "Delay";
            // document.getElementById("dir1_" + i + "_2").innerHTML = "<nobr>" + "Delay" + "</nobr>"
        }

        var obj =
        {
          lineImage : dataArray[0],
          stationName : stations[dataArray[3]].split(",")[0],
          minutes : direction1Minutes
        };

        addTime(obj);

    }
    // if (rowCount > 0) {
    //     document.getElementById("directionHeader1").style.display = "inline"
    // }
  }

  function fixDirectionArray(direction) {
    var dataArray;
    var vehicleTime;
    var compareTime;
    var schedTime;

    var currentTime = fileTimeStamp;

    for (i = 0; i < direction.length; i++) {
      dataArray = direction[i].split(",")

      //*******************************
      //check for corrupted data
      if (dataArray[3] == "") {
          return false;
      }
      //******************************

      else {

        if (dataArray[1] != "0") {
            schedTime = dataArray[1]
        }
        else {
            schedTime = dataArray[2]
        }
        vehicleTime = dataArray[6]
        if (vehicleTime > 0 && (fileTimeStamp - vehicleTime) > 90) {
            compareTime = vehicleTime
        }
        else {
            compareTime = currentTime
        }
        if (schedTime < compareTime || dataArray[4] != "") {
            direction.splice(i, 1);
            i = i - 1;
        }
      }
    }

    return true;
  }

  function sortfunction(a, b) {
    // Read from the data JS file imported
    var currentTime = fileTimeStamp;

    var dataArrayA = a.split(",")
    var dataArrayB = b.split(",")
    var compareTimeA
    var vehicleTimeA
    var schedTimeA
    var minsA
    vehicleTimeA = dataArrayA[6]
    if (vehicleTimeA > 0 && (fileTimeStamp - vehicleTimeA) > 90) {
        compareTimeA = vehicleTimeA
    }
    else {
        compareTimeA = currentTime
    }
    if (dataArrayA[1] != "0") {
        schedTimeA = dataArrayA[1]
    }
    else {
        schedTimeA = dataArrayA[2]
    }
    minsA = schedTimeA - compareTimeA

    var compareTimeB
    var vehicleTimeB
    var schedTimeB
    var minsB
    vehicleTimeB = dataArrayB[6]
    if (vehicleTimeB > 0 && (fileTimeStamp - vehicleTimeB) > 90) {
        compareTimeB = vehicleTimeB
    }
    else {
        compareTimeB = currentTime
    }

    if (dataArrayB[1] != "0") {
        schedTimeB = dataArrayB[1]
    }
    else {
        schedTimeB = dataArrayB[2]
    }

    minsB = schedTimeB - compareTimeB
    return minsA - minsB
  }
})

.service('getSubwayLines', function() {
  var lineList;

  var subwayLinesList = function(){
    // $http.get('http://localhost:3000/getSubwaylines').then(function(resp){
    //     lineList = resp.data;
    // }, function(err) {
    //   return null;
    // });

    return lineList;
  };

  return {
    subwayLinesList: subwayLinesList
  };

});