			var mainarray = new Array();

			function two(string)
			{
				var arr = new Array();
				for(var i=0; i<string.length; i++)
				{
					for(var j=0; j<string.length; j++)
					{
						var value = string.charAt(i)+''+string.charAt(j);
						arr.push(value);
					}
				}
//				document.write(arr.length);

/*				var t;
				if (b.length > arr.length) t = b, b = arr, arr = t; // indexOf to loop over shorter
				return arr.filter(function (e) {
				if (b.indexOf(e) !== -1) return true;
				});

				*/
//				return arr;
				return common(arr,b);
			}