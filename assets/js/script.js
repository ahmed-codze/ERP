// let day_name=date.tolocaleDateString("en-US",{weekday:'long'});
			// console.log(day_name);
			// document.getElementById("demo").innerHTML = x;
			function getDayName() {
                date = document.getElementById("holiday_Date").value;
                const d = new Date(date);
               // return d.toLocaleDateString(locale, {weekday: 'long'});
               let day = d.getDay();
           }
           console.log(getDayName()); 