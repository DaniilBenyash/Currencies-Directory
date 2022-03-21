let root;

function createGrafic(array) {
    
    root = am5.Root.new("chartdiv");

    grafic.style.height = '600px';

    am5.ready(function() { 
    
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        const chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX"
        }));
        
        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
          behavior: "zoomX"
        }));
        cursor.lineY.set("visible", false);
        
        const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
          groupData: true,
          maxDeviation: 0,
          baseInterval: {
            timeUnit: "day",
            count: 1
          },
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        }));
        
        const series = chart.series.push(am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}"
          })
        }));
        series.set("fill", am5.color('#5E9C76'))
        root.interfaceColors.set("fill", am5.color('#BAE0BD'));
        root.interfaceColors.set("alternativeBackground", am5.color('#5E9C76'));

        try{
            if(localStorage.getItem('theme') === 'dark'){
                root.interfaceColors.set("grid", am5.color('#f4f4f4'));
                root.interfaceColors.set("text", am5.color('#f4f4f4'));
            }else{
                root.interfaceColors.set("grid", am5.color('#000000'));
                root.interfaceColors.set("text", am5.color('#000000'));
            }
        } catch (err) { }

        chart.set("scrollbarX", am5.Scrollbar.new(root, {
          orientation: "horizontal"
        }));


        series.data.setAll(array);
 
        series.appear(1000);
        chart.appear(1000, 100);
        
        });
}

