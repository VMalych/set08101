function cipher(cipher, input)
{
	if (cipher === "Caesar") {
		c_caesar(input);
	}
	if (cipher === "Cotr") {
		c_cotr(input);
	}
	if (cipher === "Base64") {
		c_base64(input);
	}
}

function c_caesar(input)
{
	var output = [];
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	var rotateNumber = 7;
	
	if (rotateNumber < 0 || rotateNumber > 27)
	{
		alert("Number must be between 0 and 26!");
		return;
	}
	input = input.toLowerCase();
	for (var i = 0; i < input.length; i++)
	{
		var letterID = alphabet.indexOf(input[i]);
		if (letterID == -1)
		{
			output.push(input[i]);
		}
		else
		{
			output.push(alphabet[(letterID + rotateNumber) % 26]);
		}
	}
	document.getElementById("output").innerHTML = output.join("");
}

function c_cotr(input)
{
	var c = [];
	var o = [];
	var t = [];
	var r = [];
	var output = [];
	
	input = input.toLowerCase();
	for (var i = 0; i < input.length; i++)
	{
		if (i % 4 == 0) c.push(input[i]);
		if (i % 4 == 1) o.push(input[i]);
		if (i % 4 == 2) t.push(input[i]);
		if (i % 4 == 3) r.push(input[i]);
	}

	var letter;
	for (var i = 0; i < input.length; i += 4)
	{
		letter = t.shift();
		if (letter != undefined) output.push(letter);
		else output.push('#');
		letter = o.shift();
		if (letter != undefined) output.push(letter);
		else output.push('#');
		letter = r.shift();
		if (letter != undefined) output.push(letter);
		else output.push('#');
		letter = c.shift();
		if (letter != undefined) output.push(letter);
		else output.push('#');
	}
	document.getElementById("output").innerHTML	= output.join("");
}

function c_base64(input)
{
	var output;
	
	output = btoa(input);
	document.getElementById("output").innerHTML	= output;
}

function decipher(cipher, input)
{
	if (cipher === "Caesar") {
		d_caesar(input);
	}
	if (cipher === "Cotr") {
		d_cotr(input);
	}
	if (cipher === "Base64") {
		d_base64(input);
	}
}

function d_caesar(input)
{
	var output = [];
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	var rotateNumber = 7;
	
	if (rotateNumber < 0 || rotateNumber > 27)
	{
		alert("Number must be between 0 and 26!");
		return;
	}
	input = input.toLowerCase();
	for (var i = 0; i < input.length; i++)
	{
		var letterID = alphabet.indexOf(input[i]);
		if (letterID == -1)
		{
			output.push(input[i]);
		}
		else
		{
			output.push(alphabet[(letterID + 26 - rotateNumber) % 26]);
		}
	}
	document.getElementById("output").innerHTML	= output.join("");
}

function d_cotr(input)
{
	var c = [];
	var o = [];
	var t = [];
	var r = [];
	var output = [];
	
	input = input.toLowerCase();
	for (var i = 0; i < input.length; i++)
	{
		if (i % 4 == 0) t.push(input[i]);
		if (i % 4 == 1) o.push(input[i]);
		if (i % 4 == 2) r.push(input[i]);
		if (i % 4 == 3) c.push(input[i]);
	}
	for (var i = 0; i < input.length; i++)
	{
		output.push(c.shift());
		output.push(o.shift());
		output.push(t.shift());
		output.push(r.shift());
	}
	document.getElementById("output").innerHTML	= output.join("");
}

function d_base64(input)
{
	var output;
	
	output = atob(input);
	document.getElementById("output").innerHTML	= output;
}