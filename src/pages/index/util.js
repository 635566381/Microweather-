var Fly = require("flyio/dist/npm/wx")
var fly = new Fly

//获取当前位置坐标
function getLocation(callback) {
  
  wx.getLocation({
    
    success: function (res) {
      
      callback(true, res.latitude, res.longitude);
      
    },
    fail: function () {
      
      callback(false);
      
    }
    
  })
  
}

//Reverse Geocoding 根据经纬度获取城市名称
function getCityName(latitude, longitude, callback) {
  
  var apiURL = "https://api.map.baidu.com/geocoder?output=json&location=" + latitude + "," + longitude + "&key=37492c0ee6f924cb5e934fa08c6b1676";
  
  wx.request({
    url: apiURL,
    success: function (res) {
      
      callback(res.data["result"]["addressComponent"]["city"]);
      
    }
  });
  
}

//获取指定位置的天气信息
function getWeatherByLocation(latitude, longitude, callback) {
  
  /* var apiKey = "ac6ec40f07cf6082d9664d33f721ad2b";
   var apiURL = "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude + "?lang=zh&units=ca";
   //var Key = 'vcznyoa1okv4l9kt';
   //var apiURL = 'https://api.seniverse.com/v3/weather/now.json?key='+Key+'&location=' + latitude+':'+longitude+'&language=zh-Hans&unit=c'
   wx.request({
       url: apiURL,
     
       success: function(res){
           
           var weatherData = parseWeatherData(res.data);
           console.log(weatherData);
           console.log('----')
           getCityName(latitude, longitude, function(city){
               weatherData.city = city;
               callback(weatherData);
           });

       }
   });*/
  fly.post('https://dowinasia.com/interface/darksky/getdarkskyApi', {
    latitude: latitude,
    longitude: longitude,
  }).then(res => {
    var weatherData = parseWeatherData(res.data.data);
    getCityName(latitude, longitude, function (city) {
      weatherData.city = city;
      callback(weatherData);
    });
  })
  /* wx.request({
     url: 'https://dowinasia.com/interface/darksky/getdarkskyApi',
     data: {
       latitude: latitude,
       longitude: longitude,
     },
     success: function (res) {
       var weatherData = parseWeatherData(res.data.data);
       getCityName(latitude, longitude, function (city) {
         weatherData.city = city;
         callback(weatherData);
       });
       
     }
   });*/
  
}

//解析天气数据
function parseWeatherData(data) {
  var weather = {
    current: data.currently,
    daily: data.daily
  };
  
  return weather;
  
}

//将时间戳格式化为日期
function formatDate(timestamp) {
  
  var date = new Date(timestamp * 1000);
  return date.getMonth() + 1 + "月" + date.getDate() + "日 " + formatWeekday(timestamp);
  
}

//将时间戳格式化为时间
function formatTime(timestamp) {
  
  var date = new Date(timestamp * 1000);
  return date.getHours() + ":" + date.getMinutes();
  
}

//中文形式的每周日期
function formatWeekday(timestamp) {
  
  var date = new Date(timestamp * 1000);
  var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  var index = date.getDay();
  
  return weekday[index];
  
  
}

//加载天气数据
function requestWeatherData(cb) {
  
  getLocation(function (success, latitude, longitude) {
    
    //如果 GPS 信息获取不成功， 设置一个默认坐标
    if (success == false) {
      
      latitude = 39.90403;
      longitude = 116.407526;
      
    }
    
    //请求天气数据 API
    getWeatherByLocation(latitude, longitude, function (weatherData) {
      
      cb(weatherData);
      
    });
    
  });
  
}

function loadWeatherData(callback) {
  
  requestWeatherData(function (data) {
    
    //对原始数据做一些修整， 然后输出给前端
    var weatherData = {};
    weatherData = data;
    weatherData.current.formattedDate = formatDate(data.current.time);
    weatherData.current.formattedTime = formatTime(data.current.time);
    weatherData.current.temperature = parseInt(weatherData.current.temperature);
    
    var wantedDaily = [];
    for (var i = 1; i < weatherData.daily.data.length; i++) {
      
      var wantedDailyItem = weatherData.daily.data[i];
      var time = weatherData.daily.data[i].time;
      wantedDailyItem["weekday"] = formatWeekday(time);
      wantedDailyItem["temperatureMin"] = parseInt(weatherData.daily.data[i]["temperatureMin"])
      wantedDailyItem["temperatureMax"] = parseInt(weatherData.daily.data[i]["temperatureMax"])
      
      wantedDaily.push(wantedDailyItem);
      
    }
    
    weatherData.daily.data = wantedDaily;
    callback(weatherData);
    
  });
  
}


module.exports = {
  
  loadWeatherData: loadWeatherData
  
}
