const grafic = document.getElementById('chart_div');

function createGrafic(array) {
    grafic.innerHTML = '';

    google.charts.load('current', {packages: ['corechart', 'line']});

    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
        var data = new google.visualization.DataTable();

        data.addColumn('datetime', 'X');
        data.addColumn('number', 'Rate');

        data.addRows(array);
        let options = {
            hAxis: {
                title: 'Период',
            },
            vAxis: {
                title: 'Курс'
            },
            width: 1050,
            height: 600,
            chartArea: {
                top: 20,
                width: 800,
                height: 400
            },
            
            };
        if(localStorage.getItem('theme') === 'dark'){
            
            options.hAxis['titleTextStyle'] = {
                color: 'white'
            }
            options.vAxis['titleTextStyle'] = {
                color: 'white'
            }
            options.hAxis['textStyle'] = {
                color: 'white'
            }
            options.vAxis['textStyle'] = {
                color: 'white'
            }
            options['backgroundColor'] = 'rgb(34, 34, 34)'
        } 
    
        var chart = new google.visualization.LineChart(grafic);
    
        chart.draw(data, options);
    }
}