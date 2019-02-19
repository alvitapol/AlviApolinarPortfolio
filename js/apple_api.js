$( document ).ready(function() {
    const base_URL = "https://itunes.apple.com/search?";
	var user = prompt("Who is your favorite artist? (case sensitive)");
	var user_URL = user;
	while (user_URL.indexOf(" ") != -1){
		user_URL = user_URL.replace(" ", "+");
	}
	var request_URL = base_URL + "term=" + user + "&country=US&media=music&entity=song&callback=?";

	$.ajax({
	    async: false,
	    dataType: "json",
	    type: 'GET',
	    url: request_URL,
	    success: function(data) {
	    	var results = [];
	    	var included = false;
	        for (var i = 0; i < data["results"].length; ++i)
	        {
	        	if (data["results"][i]["wrapperType"] == "track" && data["results"][i]["kind"] == "song" 
	        		&& data["results"][i]["artistName"].indexOf(user) != -1)
		        {
		        	var track = data["results"][i]["trackName"];
		        	if (!results.includes(track))
		        	{
		        		results.push(track);
		        		$("#top3").append("<div>" + results[results.length - 1] + "</div>");
		        	}
		        }
		        if (results.length >= 5)
		        {
		        	break;
		        }
	        }
		}
	});
});