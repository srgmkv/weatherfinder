(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{151:function(e,t,a){},153:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(48),l=a.n(c),i=a(31),o=a(14),s=a(2),u=a(3),m=a(5),h=a(4),d=a(6),p=a(49),v=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(m.a)(this,Object(h.a)(t).call(this))).handlerClick=function(){e.setState({isChartShown:!e.state.isChartShown})},e.state={isChartShown:!1},e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.requestForecast.list.filter(function(e){var t=new Date(e.dt_txt).getHours();return 6===t||14===t||22===t?e:null}),t={labels:e.map(function(e){var t=new Date(e.dt_txt),a=t.getDate(),n=t.getMonth(),r=t.getHours();return"".concat(a,"/").concat(n+1," ").concat(r,"h")}),datasets:[{label:"Temp",fill:!1,lineTension:.1,borderColor:"rgba(223, 117, 41 ,1)",pointRadius:4,pointHitRadius:5,pointStyle:"rectRounded",data:e.map(function(e){return Math.round(e.main.temp-273)})}]},a=function(t){var a=t+(new Date).getDate(),n=["January","February","March","April","May","June","July","August","September","October","November","December"][(new Date).getMonth()],c=e.filter(function(e){return new Date(e.dt_txt).getDate()===a?e:null}),l=r.a.createElement("td",{className:"date"},a," ",n),i=c.map(function(e){return r.a.createElement("td",{key:e.dt},r.a.createElement("span",{id:"temp"},Math.round(e.main.temp-273)," \xb0C, "),"wind: ",Math.round(e.wind.speed),r.a.createElement("br",null),e.weather[0].description)});if(c.length)return c[0].dt_txt.includes("06:00")?r.a.createElement(r.a.Fragment,null,l,i):c[0].dt_txt.includes("14:00")?r.a.createElement(r.a.Fragment,null,l,r.a.createElement("td",null),i):r.a.createElement(r.a.Fragment,null,l,r.a.createElement("td",null),r.a.createElement("td",null),i)},n=r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null,"06:00"),r.a.createElement("th",null,"14:00"),r.a.createElement("th",null,"22:00"))),c=this.state.isChartShown?"Hide chart":"Show temp chart below";return r.a.createElement("div",null,"200"===this.props.requestForecast.cod&&r.a.createElement("div",{className:"tablediv "},r.a.createElement("table",null,r.a.createElement("caption",null,"Forecast:"),n,r.a.createElement("tbody",null,r.a.createElement("tr",null,a(0)),r.a.createElement("tr",null,a(1)),r.a.createElement("tr",null,a(2)),r.a.createElement("tr",null,a(3)),r.a.createElement("tr",null,a(4)))),r.a.createElement("button",{className:"showchart my-2",onClick:this.handlerClick},c)),this.state.isChartShown&&r.a.createElement("div",{className:"chart"},r.a.createElement(p.a,{data:t})))}}]),t}(r.a.Component),f=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.weatherData,a=t.name,n=t.main,c=t.wind,l=t.id,i=t.weather,o=this.props.favCitieslist.filter(function(e){return e.locationId===l}),s=o.length?"star1.svg":"star0.svg",u=r.a.createElement("img",{src:s,alt:"",onClick:o.length?function(){return e.props.removeFromFavList(l)}:this.props.addToFav,title:o.length?"Remove from Favorites":"Add to Favorites",width:"25px"});return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"curr-temp weather px-2 py-1"},r.a.createElement("span",{className:"current-header"},"Weather in ",r.a.createElement("span",{className:"city"},a),":")," ",u,r.a.createElement("br",null),r.a.createElement("span",{className:"temp"},"Temp: ",Math.round(n.temp-273)," \xb0C, "),"wind: ",c.speed," m/s, humidity: ",n.humidity,"%, pressure: ",Math.round(.7501*n.pressure),"\xa0mmHg,\xa0",i[0].description),r.a.createElement(v,{requestForecast:this.props.requestForecast}))}}]),t}(r.a.Component);a(151);var b=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"input-group mb-3 pt-3 col-centered"},r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter city name",name:"requestedLocation",onChange:e.handleChange}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"search-but mr-3 btn  bg-warning text-white",type:"button",onClick:function(){return e.handleClick()}},"Search"))))},E=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).updFavList=function(){var e=a.props.citiesList.map(function(e){return e.locationId}).toString(),t="".concat("http://api.openweathermap.org/data/2.5/","group?id=").concat(e,"&appid=").concat("2b0c757f5810cdb1eb3a945f283be600");fetch(t).then(function(e){return e.json()}).then(function(e){var t=e.list.map(function(e){return e={cityName:e.name,locationId:e.id,currentTemp:"".concat(Math.round(e.main.temp-273)," \xb0C")}});a.props.updateFavListByTemp(t)})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.updFavList(),setInterval(function(){e.updFavList()},9e5)}},{key:"render",value:function(){var e=this,t=this.props.citiesList.map(function(t){return r.a.createElement(r.a.Fragment,{key:t.locationId},r.a.createElement("div",null," ",r.a.createElement("span",{className:"ml-0 remove",title:"remove from list",onClick:function(){return e.props.removeFromFavList(t.locationId)}},"\xd7"),r.a.createElement("span",{className:" favlist-item ml-0",onClick:function(){return e.props.handleClick(t.cityName)},title:"click to see weatherinfo"},t.cityName," ",t.currentTemp)))});return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"favhead bg-success text-white text-center pb-1 mb-1"},"Favorites "),t)}}]),t}(r.a.Component),g=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.weatherData,a=t.name,n=t.main,c=t.wind,l=t.weather;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("span",{className:"current-header",onClick:function(){return e.props.handleClick(a)},title:"Click to show forecast"},"Your local weather in ",r.a.createElement("span",{className:"city"},a)),r.a.createElement("br",null),"Temp: ",Math.round(n.temp-273)," \xb0C, wind: ",c.speed," m/s, humidity: ",n.humidity,"%,\xa0",l[0].description))}}]),t}(r.a.Component),C=a(51),F=a.n(C),w=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(m.a)(this,Object(h.a)(t).call(this))).handleChange=function(t){var a=t.target,n=a.name,r=a.value;e.setState(Object(o.a)({},n,r.charAt(0).toUpperCase()+r.slice(1)))},e.addToFav=function(){var t=e.state.requestCurrentWeather,a=t.id,n=t.name,r=t.main,c=[{cityName:n,locationId:a,currentTemp:"".concat(Math.round(r.temp-273)," \xb0C")}],l=Object(i.a)(e.state.favCitieslist),o=F()(l,c,"locationId");e.setState({favCitieslist:o}),localStorage.setItem("favlist",JSON.stringify(o))},e.removeFromFavList=function(t){var a=Object(i.a)(e.state.favCitieslist).filter(function(e){return e.locationId!==t});e.setState({favCitieslist:a}),localStorage.setItem("favlist",JSON.stringify(a))},e.updateFavListByTemp=function(t){e.setState({favCitieslist:t}),localStorage.setItem("favlist",JSON.stringify(t))},e.fetchToState=function(t,a,n){e.setState(Object(o.a)({},n,!1)),fetch(t).then(function(e){return e.json()}).then(function(t){var r;e.setState((r={},Object(o.a)(r,a,t),Object(o.a)(r,n,!0),r))})},e.handleClick=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.state.requestedLocation,a="2b0c757f5810cdb1eb3a945f283be600",n="http://api.openweathermap.org/data/2.5/",r="".concat(n,"weather?q=").concat(t,"&appid=").concat(a);e.fetchToState(r,"requestCurrentWeather","requestDataLoaded");var c="".concat(n,"forecast/hourly?q=").concat(t,"&appid=").concat(a);e.fetchToState(c,"requestForecast","requestDataLoaded")},e.getUserLocalWeatherData=function(){var t="2b0c757f5810cdb1eb3a945f283be600",a="http://api.openweathermap.org/data/2.5/";fetch("https://json.geoiplookup.io/").then(function(e){return e.json()}).then(function(n){e.setState({localUserData:{lat:n.latitude,lon:n.longitude,locationName:n.city}});var r=e.state.localUserData,c=r.lat,l=r.lon,i="".concat(a,"weather?lat=").concat(c,"&lon=").concat(l,"&appid=").concat(t);e.fetchToState(i,"localCurrentWeather","localDataLoaded");var o="".concat(a,"forecast?lat=").concat(c,"&lon=").concat(l,"&appid=").concat(t);e.fetchToState(o,"localForecast","localDataLoaded")})},e.state={localCurrentWeather:{},localForecast:{},localUserData:{lat:null,lon:null,locationName:null},favCitieslist:[],requestedLocation:"",requestCurrentWeather:{},requestForecast:{}},e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){this.getUserLocalWeatherData();var e=JSON.parse(localStorage.getItem("favlist"));e&&this.setState({favCitieslist:e})}},{key:"render",value:function(){var e=this.state,t=e.localCurrentWeather,a=e.requestCurrentWeather,n=e.requestForecast;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"header pl-4 pt-2 m-0"},"WEATHER FINDER"),r.a.createElement("div",{className:"main"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-sm-9 px-1"},r.a.createElement("div",{className:"local weather px-2 py-1"},200===t.cod?r.a.createElement(g,{weatherData:t,handleClick:this.handleClick}):r.a.createElement("div",{className:"spinner-grow spinner-grow-sm"})),r.a.createElement(b,{handleChange:this.handleChange,handleClick:this.handleClick}),"200"===n.cod&&200===a.cod&&r.a.createElement(f,{weatherData:a,requestForecast:this.state.requestForecast,addToFav:this.addToFav,removeFromFavList:this.removeFromFavList,favCitieslist:this.state.favCitieslist})),r.a.createElement("div",{className:"col-sm-3 p-0 pb-2 favlist "},this.state.favCitieslist.length>0&&r.a.createElement(E,{citiesList:this.state.favCitieslist,removeFromFavList:this.removeFromFavList,handleClick:this.handleClick,updateFavListByTemp:this.updateFavListByTemp}))))))}}]),t}(r.a.Component);a(152);l.a.render(r.a.createElement(w,null),document.getElementById("root"))},52:function(e,t,a){e.exports=a(153)}},[[52,1,2]]]);
//# sourceMappingURL=main.f73dd0c4.chunk.js.map