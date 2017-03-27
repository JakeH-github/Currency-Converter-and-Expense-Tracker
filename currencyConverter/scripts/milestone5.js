var fromStr="";//Convert from this currency
var toStr="";//Convert to this currency
var userNum="";//Currency units entered into number box
var expenseType="";
var roundFinalNum="";
var usdString = "USD";
//all the currency codes in an array, 177 total
var currencyCodes = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR"];


//Sets from and to currencies, used as onclick for 'Convert'
  function displayBoth(){
      fromStr = $("#currencyFrom").val();
      toStr = $("#currencyTo").val();
      expenseType = $("#businessExpense").val();
      storeFav();//adds 1 count to "toFav" and "fromFav" for respective currencies      
      getRate(fromStr,toStr); 
      getRateUSD(fromStr,usdString);
  } 
  //Used in currency conversion
  function getRate(from, to) {
    var script = document.createElement('script');
    script.setAttribute('src', "http://query.yahooapis.com/v1/public/yql?q=select%20rate%2Cname%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes%3Fs%3D"+from+to+"%253DX%26f%3Dl1n'%20and%20columns%3D'rate%2Cname'&format=json&callback=parseExchangeRate");
    document.body.appendChild(script);
  }
  //Used in currency conversion, displays all the results
  function parseExchangeRate(data) {
    //usd = false;
    var name = data.query.results.row.name;
    var rate = parseFloat(data.query.results.row.rate, 10);
    userNum = document.getElementById("currency").value;
    userNumtest = parseInt(userNum);
    var finalNum = (userNum*rate);
    var roundUserNum = parseFloat(userNum);
        roundUserNum = roundUserNum.toFixed(2);
        roundFinalNum = parseFloat(finalNum);
        roundFinalNum = roundFinalNum.toFixed(2);
      
        if(fromStr===""||fromStr===undefined||toStr===""||toStr===undefined){alert("Select a currency to convert from and to.");}
        else if(userNumtest<=0||userNum===undefined||userNum<=0||userNum===""){alert(userNum+" is not a valid amount.");}
        else{
            storeExpense(roundFinalNum);
            alert("Exchange rate "+name+" is "+rate+"\n"+roundUserNum+" "+fromStr+" = "+roundFinalNum+" "+toStr+"\nExpense Recorded."); 
            //window.location.reload();
        }
  }

  //Used in currency conversion
  function getRateUSD(from, to) {
    var script = document.createElement('script');
    script.setAttribute('src', "http://query.yahooapis.com/v1/public/yql?q=select%20rate%2Cname%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes%3Fs%3D"+from+to+"%253DX%26f%3Dl1n'%20and%20columns%3D'rate%2Cname'&format=json&callback=parseExchangeRateUSD");
    document.body.appendChild(script);
  }
  //Used in currency conversion, displays all the results
  function parseExchangeRateUSD(data) {
    var name = data.query.results.row.name;
    var rate = parseFloat(data.query.results.row.rate, 10);
    userNum = document.getElementById("currency").value;
    userNumtest = parseInt(userNum);      
    var finalNum = (userNum*rate);
    var roundUserNum = parseFloat(userNum);
        roundUserNum = roundUserNum.toFixed(2);
        roundFinalNum = parseFloat(finalNum);
        roundFinalNum = roundFinalNum.toFixed(2); 
      
        if(fromStr===""||fromStr===undefined||toStr===""||toStr===undefined){} 
        else if(userNumtest<=0||userNum===undefined||userNum<=0||userNum===""){}      
        else{    
            storeAmerican(roundFinalNum);
            alert("Exchange rate "+name+" is "+rate+"\n"+roundUserNum+" "+fromStr+" = "+roundFinalNum+" "+usdString);
            window.location.reload();
        }
  }
  //Stores USD conversion
  function storeAmerican(american){
      var x = [];
      var y;
      var i=0;
      //Initialize the localstorage variables
        if(localStorage.getItem("usdIndex")===null){
            localStorage.setItem("usdIndex", JSON.stringify(i));//This is just an index counter
            localStorage.setItem("usdAmount", JSON.stringify(x));//This is the converted USD amount
        }      
            i = parseInt(localStorage.getItem("usdIndex"));  
            y = JSON.parse(localStorage.getItem("usdAmount"));
                y[i] = american;
                localStorage.setItem("usdAmount", JSON.stringify(y));
            i+=1;//add 1 to the index counter
                localStorage.setItem("usdIndex", JSON.stringify(i));
      
      var americanAmount = JSON.parse(localStorage.getItem("usdAmount"));
      for(var a in americanAmount){
          americanAmount[a] = parseFloat(americanAmount[a]);
          usdTotal += americanAmount[a];
      }
      var usdTotal=0;
      var americanAmount = JSON.parse(localStorage.getItem("usdAmount"));
      for(var a in americanAmount){
          americanAmount[a] = parseFloat(americanAmount[a]);
          usdTotal += americanAmount[a];
      }
      usdTotal = usdTotal.toFixed(2);
      localStorage.setItem("usdChartTotal", JSON.stringify(usdTotal));    
      
  }

  //Stores all the information involved with tracking business expenses, called in parseExchangeRate function
  function storeExpense(convertedCurrency){
      var x = [];//used for initialization of localstorage variables
      var y; //used as placeholder for "expenseName,Currency,Amount"
      var i=0; //used as placeholder for "expenseIndex"
      //Initialize the localstorage variables
        if(localStorage.getItem("expenseIndex")===null){
            localStorage.setItem("expenseIndex", JSON.stringify(i));//This is just an index counter
            localStorage.setItem("expenseName", JSON.stringify(x));
            localStorage.setItem("expenseCurrency", JSON.stringify(x));//This is the 'to' currency
            localStorage.setItem("expenseAmount", JSON.stringify(x));//This is the converted 'to' currency amount
        }
            i = parseInt(localStorage.getItem("expenseIndex"));
            //alert(i+typeof(i));
            y = JSON.parse(localStorage.getItem("expenseName"));
                y[i] = expenseType;
                localStorage.setItem("expenseName", JSON.stringify(y));
            y = JSON.parse(localStorage.getItem("expenseCurrency"));
                y[i] = toStr;
                localStorage.setItem("expenseCurrency", JSON.stringify(y));
            y = JSON.parse(localStorage.getItem("expenseAmount"));
                y[i] = convertedCurrency;
                localStorage.setItem("expenseAmount", JSON.stringify(y));
            i+=1;//add 1 to the index counter
                localStorage.setItem("expenseIndex", JSON.stringify(i));
  }//end of storeExpense function

//Displays expense type, amount spent, and the currency type used
//Use information from this function for displayTable function
  function displayExpense(){
      document.getElementById("expense").innerHTML = "";//clears innerhtml each time
      var i = parseInt(localStorage.getItem("expenseIndex"));
      var type = JSON.parse(localStorage.getItem("expenseName"));
      var currency = JSON.parse(localStorage.getItem("expenseCurrency"));
      var amount = JSON.parse(localStorage.getItem("expenseAmount"));
      var j; //used for looping the for
      
      for(j=0;j<i;j++){
          //alert("Array index: " + j + ", Expense: " + type[j] + ", " + amount[j] + " " + currency[j]);
          document.getElementById("expense").innerHTML += "Expense: " + type[j] + ", " + amount[j]
              + " " + currency[j] + " ";
      }
  }//end of displayExpense function
//Displays table of expenses
  function displayTable(){
  
      var i = parseInt(localStorage.getItem("expenseIndex"));
      var type = JSON.parse(localStorage.getItem("expenseName"));
      var currency = JSON.parse(localStorage.getItem("expenseCurrency"));
      var amount = JSON.parse(localStorage.getItem("expenseAmount"));
      var americanAmount = JSON.parse(localStorage.getItem("usdAmount"));
      var j; //used for looping the for
      var k=1;
      var tr;//used for printing to table
      var tableRef = document.getElementById('table');
      var usdTotal=0;
      //while loop clears table to prevent table errors
      while(tableRef.rows.length > 1){
          tableRef.deleteRow(1);
      }
      //loop for the number of indexes
      for(j=0;j<i;j++){
          tr = $('<tr/>');
          tr.append("<td contenteditable='true'><span>" + k + "</span></td>");          
          tr.append("<td contenteditable='true'><span>" + type[j] + "</span></td>");
          tr.append("<td contenteditable='true'><span>" + amount[j] + "</span></td>");
          tr.append("<td contenteditable='true'><span>" + currency[j] + "</span></td>");
          tr.append("<td contenteditable='true'><span>" + americanAmount[j] + "</span></td>");          
          $('table').append(tr);
          k++;
      }
      for(var a in americanAmount){
          americanAmount[a] = parseFloat(americanAmount[a]);
          usdTotal += americanAmount[a];
      }
      usdTotal = usdTotal.toFixed(2);
      localStorage.setItem("usdChartTotal", JSON.stringify(usdTotal));
      alert("Total Expenses: "+usdTotal+" USD");     
  }//end of displayTable function

//Displays favorite currencies, insert function link into parseExchangeRate when done
//currencyCodes,countFrom,countTo has len=177,corresponding with codes  
  function storeFav() {
         var countFrom = new Array(177);
         var countTo = new Array(177);
         var x;
         var y;
         var i;//for loop counter
         //loop that sets all indexes to 0
         for(i=0;i<177;i++){
          countFrom[i]=0;
          countTo[i]=0;
          }
           for(i=0;i<177;i++){
               //Adds 1 to countFrom index for var fromStr if they match
               if(currencyCodes[i]===fromStr){              
                   if(localStorage.getItem("fromFav")===null){
                   //execute if "fromFav" doesn't exist
                       countFrom[i]+=1;
                       localStorage.setItem("fromFav", JSON.stringify(countFrom));
                   }//above line creates "fromFav" in localstorage
                   else{//retrieve count of fromFav and add 1 to proper index
                       x=JSON.parse(localStorage.getItem("fromFav"));//get index
                       x[i]+=1;
                       localStorage.setItem("fromFav", JSON.stringify(x));
                   }
               }
               if(currencyCodes[i]===toStr){             
                   if(localStorage.getItem("toFav")===null){
                   //execute if "toFav" doesn't exist
                       countTo[i]+=1;
                       localStorage.setItem("toFav", JSON.stringify(countTo));
                   }//above line creates "toFav" in localstorage
                   else{//retrieve count of fromFav and add 1 to proper index
                       y=JSON.parse(localStorage.getItem("toFav"));
                       y[i]+=1;
                       localStorage.setItem("toFav", JSON.stringify(y));
                   }
               }
      }//end of for loop

  }//end of storeFav

//displays favorite currencies when button is clicked
  function displayFav(){
         var countFrom=JSON.parse(localStorage.getItem("fromFav"));
         var countTo=JSON.parse(localStorage.getItem("toFav")); 
         var x=[];
         var xCounter=0;
         var y=[];
         var yCounter=0;
         var i;//outer for loop counter         
         var zero=0;
            for(i=0;i<177;i++){             
                    if(countFrom[i]>zero){
                        x[xCounter]=currencyCodes[i];
                        xCounter++;
                     }
                    if(countTo[i]>zero){
                        y[yCounter]=currencyCodes[i];
                        yCounter++;
                     }                
            }//end of outer for loop 
        alert("Favorite from currency/ies: "+x+"\n"+"Favorite to currency/ies: "+y);   
  
}//end of displayFav
      
//clears all local storage when button is clicked
  function clearLocalStorage(){
      if(confirm("Do you want to delete all history?")){
        localStorage.clear();
        window.location.reload();  
      }
      //if you click "ok" then all local storage is cleared
  }

//Deletes an expense
  function removeExpense(){
      var indexDel = document.getElementById("remove").value;
      var type = JSON.parse(localStorage.getItem("expenseName"));
      var currency = JSON.parse(localStorage.getItem("expenseCurrency"));
      var amount = JSON.parse(localStorage.getItem("expenseAmount"));
      var americanAmount = JSON.parse(localStorage.getItem("usdAmount"));
      var i = parseInt(localStorage.getItem("expenseIndex"));  
      var j = parseInt(localStorage.getItem("usdIndex"));       
      
      if(confirm("Delete Expense #"+indexDel+"?")){
        indexDel -= 1;//index location of expense to delete
        
          if(indexDel < i && indexDel % 1 === 0 && indexDel > -1){
            i -= 1;//remove 1 index from array counter used in other functions
            j -= 1;//remove 1 index from usdIndex counter
            type.splice(indexDel, 1);
            currency.splice(indexDel, 1);
            amount.splice(indexDel, 1);
            americanAmount.splice(indexDel, 1);
          
            localStorage.setItem("expenseName", JSON.stringify(type));
            localStorage.setItem("expenseCurrency", JSON.stringify(currency));
            localStorage.setItem("expenseAmount", JSON.stringify(amount));
            localStorage.setItem("usdAmount", JSON.stringify(americanAmount));
            localStorage.setItem("expenseIndex", JSON.stringify(i));
            localStorage.setItem("usdIndex", JSON.stringify(j));
        }
          else{
            indexDel +=1;
            alert("Expense #"+indexDel+" does not exist.");
          }
      }
    window.location.reload();    
  }//end of removeExpense function
