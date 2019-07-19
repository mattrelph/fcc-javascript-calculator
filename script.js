//Font Awesome CSS - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
//Bootstrap CSS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css
//JQuery JS - https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
//Bootstrap JS - https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js

/*This is a simple calculator implemented in javascript
- Does basic calculator arithmetic commands. Maybe, one day add a few more features like square root.
- Added keyboard capture functionality, because testing with a mouse was way more tedious. Besides regular numbers, and keyboard operators:
AC = DELETE, CE = BACKSPACE,  Positive / Negative = SHIFT, Solve or Equals = ENTER
- Order of operations - Does not follow PEMDAS. Operations are done in FIFO. Maybe add PEMDAS and parenthesis one day.
- Although Javascript can handle larger numbers, display is limited to about 10 digits for a couple reasons. Namely, display size, and lack of overflow/underflow flags on numbers.
- Javascript handles floats weird (lots of extra zeros, no compensation for binary floating decimal issues, anything smaller than 1x10^-7 is displayed 1e-7 and messes up Javascript logic), so there is a little compensation for that, but accuracy in floating point seems to need improvement.
*/

var current ="0";
var allEntries =[''];
var totalLength=0;

$(document).ready(function()
{
	$(document).keydown( function(event) 
	{
		switch (event.which) 
		{
			case 13: // Enter Key =
			{
				convert('=');
				break;
			}
			case 47: // Divide / ÷ 111
			case 111:
			{
				convert('÷');
				break;
			}
			case 42: // Multiply * × 106
			case 106:
			{
				convert('×');
				break;
			}
			case 45: // Subtract - 109
			case 109:
			{
				convert('-');
				break;
			}
			case 43: // Add  + 107
			case 107:
			{
				convert('+');
				break;
			}
			case 48: // 0 96
			case 96:
			{
				convert('0');
				break;
			}
			case 49: // 1 97
			case 97:
			{
				convert('1');
				break;
			}
			case 50: // 2 98
			case 98:
			{
				convert('2');
				break;
			}
			case 51: // 3 99
			case 99:
			{
				convert('3');
				break;
			}
			case 52: // 4 100
			case 100:
			{
				convert('4');
				break;
			}
			case 53: // 5 101
			case 101:
			{
				convert('5');
				break;
			}
			case 54: // 6 102
			case 102:
			{
				convert('6');
				break;
			}
			case 55: // 7 103
			case 103:
			{
				convert('7');
				break;
			}
			case 56: // 8 104
			case 104:
			{
				convert('8');
				break;
			}
			case 57: // 9 105
			case 105:
			{
				convert('9');
				break;
			}
			case 190: // Decimal . 110
			case 110:
			{
				convert('.');
				break;
			}
			case 46: //Delete becomes AC
			{
				convert('a');
				break;
			}	
			case 8: //Backspace becomes CE
			{
				convert('c');
				break;
			}	
			case 16: //Shift becomes ±
			{
				convert('±');
				break;
			}				
	
		}
		//console.log(event.which);
		return false;
	}); 
});




function convert(buttonPress)
{
	switch (buttonPress)
	{
		case 'a':
		{
			current ="0";
			allEntries =[];
			totalLength=0;
			upDateScreen();

			break;
		}
		case 'c':
		{
			if (current == 'E')
			{
				allEntries =[];
				totalLength=0;				
			}
			current ="0";
			upDateScreen();
			
			break;
		}		
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '0':
		{
			if ((current.length<10)&&(current.length+totalLength<21)&&(current!='E'))
			{
				
				if (current=='-0')
				{
					current = '-' + buttonPress;
				}
				else if (current!='0')
				{
					current = current + buttonPress;
				}
				else
				{
					
					current = buttonPress;
				}
				upDateScreen();
			}
			else
			{
				current = 'E'
				allEntries =["Error - Exceeded Input"];
				upDateScreen();
			}
			break;			
		}
		case '÷':
		case '×':		
		case '-':
		case '√':
		case '+':		
		{
			if ((current.length+totalLength<21)&&(current!='E'))
			{

				allEntries.push(current);
				totalLength += current.length;
				current = '0';				
				allEntries.push(buttonPress);
				++totalLength;	
				upDateScreen();				
			}
			else
			{
				current = 'E'
				allEntries =["Error - Exceeded Input"];
				upDateScreen();
			}			
			break;			
		}
		case '.':
		{
			if ((current.length<11)&&(current.length+totalLength<21)&&(current!='E'))
			{
				if (current.indexOf('.')==-1)
				{
					current = current + buttonPress;
					upDateScreen();	
				}
			}	
			else
			{
				current = 'E'
				allEntries =["Error - Exceeded Input"];
				upDateScreen();
			}				
			break;			
		}
		case '±':
		{
			if ((current.length<11)&&(current.length+totalLength<21)&&(current!='E'))
			{
				if (current.indexOf('-')==-1)
				{
					current= '-' + current;
				}
				else
				{
					current= current.substring(1);					
				}
				upDateScreen();				
			}
			else
			{
				current = 'E'
				allEntries =["Error - Exceeded Input"];
				upDateScreen();
			}				
			break;
		}			
		case '=':
		{
			if ((current.length<11)&&(totalLength<21)&&(current!='E')&&(totalLength>0))
			{
				solve();
			}			
			break;
		}			
		
	}

	//console.log(current.length);
}

function upDateScreen()
{
	$('#currentIn').empty();
	$('#currentIn').append('<span>' + current+'</span>');

	$('#allIn').empty();
	$('#allIn').append('<span>' + allEntries.join('') +'</span>');
	
}

function solve()
{
	allEntries.push(current);
	if (allEntries[0]=='')
	{
		allEntries.shift();
	}
	totalLength += current.length;
	var i=1;
	var value=0;
	if (allEntries[0].indexOf('.')==-1 )
	{
		value= parseInt(allEntries[0],10);
	}
	else
	{
		value= parseFloat(allEntries[0]);
	}
	var first = 0;
	var second = 0;
	//console.log(allEntries);
	while (i<allEntries.length)
	{
		//console.log(i, allEntries[i]);
		switch (allEntries[i][0])
		{
			case '÷':
			{
				if (allEntries[i+1].indexOf('.')==-1 )
				{
					second = parseInt(allEntries[i+1],10);
					
				}
				else
				{
					second = parseFloat(allEntries[i+1]);
				}					
				if (second != 0)
				{
					value = value / second;

					if (value % 1 !== 0)
					{
						value = parseFloat(value).toPrecision(10);
					}					
					i = i+2;					
				}
				else
				{
					current = 'E'
					allEntries =["Error - Divide by Zero"];
					i=allEntries.length+1;
				}
				break;
			}
			case '×':
			{
				if (allEntries[i+1].indexOf('.')==-1 )
				{
					second = parseInt(allEntries[i+1],10);
					
				}
				else
				{
					second = parseFloat(allEntries[i+1]);
				}
				value = value * second;
				
				if (value % 1 !== 0)
				{
					value = parseFloat(value).toPrecision(10);
				}
				i = i+2;
				
				if (value == NaN)
				{
					current = 'E'
					allEntries =["Error - Out of range"];
					i=allEntries.length+1;
				}
				if ((value>=9999999999)||(value<=-9999999999))
				{
					current = 'E'
					allEntries =["Error - Out of range"];
					i=allEntries.length+1;					
				}
				break;
			}			
			case '-':
			{
				if (allEntries[i+1].indexOf('.')==-1 )
				{
					second = parseInt(allEntries[i+1],10);
					
				}
				else
				{
					second = parseFloat(allEntries[i+1]);
				}					
				value = value - second;
				if (value % 1 !== 0)
				{
					value = parseFloat(value).toPrecision(10);
				}
				i = i+2;
				
				if (value == NaN)
				{
					current = 'E'
					allEntries =["Error - Out of range"];
					i=allEntries.length+1;
				}
				if ((value>=9999999999)||(value<=-9999999999))
				{
					current = 'E'
					allEntries =["Error - Out of range"];
					i=allEntries.length+1;					
				}
				break;
			}			
			case '+':
			{
				if (allEntries[i+1].indexOf('.')==-1 )
				{
					second = parseInt(allEntries[i+1],10);
					//console.log('Parsing Int:', second);
					
				}
				else
				{

					second = parseFloat(allEntries[i+1]);
					//console.log('Parsing Float:', second);
				}					
				//console.log(value, second);
				value = value + second;

				if (value % 1 !== 0)
				{
					//value = parseFloat(value).toPrecision(10);
				}
				i = i+2;
				
				if (value == NaN)
				{
					current = 'E'
					allEntries =["Error - Out of range"];
					i=allEntries.length+1;
				}
				if ((value>=9999999999)||(value<=-9999999999))
				{
					current = 'E'
					allEntries =["Error - Out of range"];
					i=allEntries.length+1;					
				}
				break;
			}				
		}

		
	}
	if (current != 'E')
	{
		//console.log('Result:' , value);
		if ((value <0.000001)&&(value>0))
		{
			value = 0;
			current = value.toString();
			allEntries=['Insufficient SigDigs'];
			
		}
		else if ((value >-0.000001)&&(value<0))
		{
			value = 0;
			current = value.toString();
			allEntries=['Insufficient SigDigs'];

		}
		else
		{
			//console.log('Got sig digs');
		
			current = value.toString();
			
			if (current.length>10) //Make result fit on screen
			{
				current = current.substring(0,9);	
				//console.log('Trimming digits', current);
			}
			if (current.indexOf('.')!=-1)
			{
				//Change to while loop
				var i=current.length-1;
				while (current.length>1) //Trim trailing zeros
				{
					if (current[i]=='0')
					{
						//console.log('Before:',current, ' After:', current.substring(0,i));
						current = current.substring(0,i);	
						i=current.length-1;				
					}
					else
					{
						//console.log('Trimming zeros', current);
						break;
					}
				}
			}
			allEntries = [current];
		}
		totalLength = 0;
	}
	upDateScreen();
	allEntries = [""];
}