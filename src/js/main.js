var apod = {
    //Create a random date
    randomDate: function(start, end) {
      //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
      let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

      //Format the date
      let d = date.getDate();
      let m = date.getMonth() + 1; //In JS months start at 0
      let y = date.getFullYear();

      //Change the month and day strings so that they match the documented format.
      if(m < 10){
        m = '0'+m
      }

      if(d < 10){
        d = '0'+d
      }

      return `${y}-${m}-${d}`;
    },

    //Injects the results of the API call into the DOM
buildDOM: function(result) {
    //$("#apodTitle").text(result.title);
      document.querySelector("#apodTitle").innerHTML=result.title;
    if(result.media_type === 'video') {
      //$("#apodImage").hide();
      document.querySelector("#apodImage").style.display = 'none';
      //$("#apodVideo > iframe").attr("src", result.url).show();
       var avi = document.querySelector("#apodVideo > iframe");
       avi.src = result.url;
       document.querySelector('#apodVideo').style.display='block';
        
    }else{
      //$("#apodVideo").hide();
      document.querySelector("#apodVideo").style.display = 'none';
    // $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
      var ai =document.querySelector("#apodImg");
      ai.src = result.url;
      ai.style.display='block';

      
    }
  
    //$("#apodCopyright").text("Copyright: " + result.copyright);
    document.querySelector("#apodCopyright").innerHTML= 'Copyright:' + result.copyright;
    //$("#apodDate").text("Date: " + result.date);
    document.querySelector("#apodDate").innerHTML= 'Date:' + result.date;
    //$("#apodDesc").text(result.explanation);
    document.querySelector("#apodDesc").innerHTML= result.explanation;
  },
  
  //Executes an AJAX call to an API.
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let url = "https://api.nasa.gov/planetary/apod?api_key=wpA06sYIzSvllX3aUeJdcMkqwTOXgbTnPjJ0KUH4&date=" + date;
    /*$.ajax({
        url: url
    }).done(function(result){
        _this.buildDOM(result);
    }).fail(function(result){
      console.log(result);
    });*/

    var website = new XMLHttpRequest();
    website.open('GET',url);
    website.send();

    website.onload = function(){
      let result = JSON.parse(website.response);
      _this.buildDOM(result);
    }
  },

  
  
  // Initialization method.
  init: function() {
    this.getRequest();
  },
};
apod.init();

/* https://learn.jquery.com/using-jquery-core/document-ready/ 
$(function() {
    $('#btnRandApod').on('click',function(){
      apod.getRequest();
    });
});*/

document.getElementById('btnRandApod').addEventListener('click', function(){
  apod.getRequest();
}, false);