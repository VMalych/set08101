function rot13cipher()
{
	var text = document.getElementById("text").value;
	var cipher = [];
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];	
	for(var idx = 0; idx < text.length; idx++)
	{
		var letterID = alphabet.indexOf(text[idx]);
		if(letterID == -1)
		{
			cipher.push(text[idx]);
		}
		else
		{
			cipher.push(alphabet[(letterID + 13) % 26]);
		}
	}
	document.getElementById("output").innerHTML	= cipher.join("");
}