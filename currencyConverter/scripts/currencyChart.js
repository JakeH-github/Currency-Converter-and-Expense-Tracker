var ctx = document.getElementById("myChart").getContext("2d");
ctx.canvas.width = 300;
ctx.canvas.height = 300;

function type(){var type = JSON.parse(localStorage.getItem("expenseName")); return type;}
function usd(){var americanAmount = JSON.parse(localStorage.getItem("usdAmount")); return americanAmount;}
      var x = localStorage.getItem("usdChartTotal");
        if(x===null){}
        else{    
            document.getElementById("usdTotalDisplay").innerHTML = "Total: " + x + " USD"; 
        }
var myChart = new Chart(ctx, {
    
    type: 'bar',
    data: {
        //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: type(),
        datasets: [{
            label: 'USD',
            //data: [12, 19, 3, 5, 2, 3],
            data: usd(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                    
                }
            }]
        }
    }
});