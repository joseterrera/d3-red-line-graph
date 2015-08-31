var svg = d3
    .select(".chart")
    .append("svg");

var group = svg
    .append("g");

d3.csv("cta-rides-july-2014.csv", accessor, callback);

// function(d){
// 	return d;
// }

// function(data){
// 	console.log(data[0]);
// }

function accessor(d) {
   var monthTotal = Math.round(d.monthtotal / 1000);

    return {
        stationName: d.stationame,
        monthlyTotal: monthTotal
    };
}

function callback(data) {
    var viewPortHeight = 1000;
    var spaceBetweenBars = 20;
    var barWidth = 50;
    var viewPortWidth = data.length * (barWidth + spaceBetweenBars);;


    svg
        .attr("height", viewPortHeight)
        .attr("width", viewPortWidth);

    var bars = group
        .selectAll("g")
        .data(data).enter()
        .append("g");

    var rect = bars
        .append("rect");

    rect
        .attr("width", barWidth)
        .attr("height", function(d) {
            return d.monthlyTotal;
        });

     var x = d3.scale.ordinal().rangePoints([0, viewPortWidth]);
     x.domain(data.map(function(d) {
        return d.stationName;
    }));


    rect
        .attr("x", function(d) {
            return x(d.stationName);
        });

    var maxHeight = d3.max(data, function(d){
        return d.monthlyTotal;
    });
     var y = d3.scale.linear().range([maxHeight, 0]).domain([0, maxHeight]);
     rect.attr("y", function(d){
        return maxHeight - d.monthlyTotal;
     })


    bars
        .append("text")
        .attr("y", function(d){
            return y(d.monthlyTotal);
        })
        .attr("x", function(d){
            return x(d.stationName);
        })
        .style("fill", "red")
        .text(function(d){
            return d.monthlyTotal;
        });

    var xAxis = d3.svg.axis().scale(x);
    var xAxisGroup = group
            .append("g")
            .attr("class", "x axis")
            .call(xAxis)
            .attr("transform", "translate(0," + maxHeight +")");

    xAxisGroup
            .selectAll("text")
            .attr("transform", "rotate(-70)")
            .style("text-anchor", "end");

data = data.sort(function(a,b){
    return d3['descending'](a.monthlyTotal, b.monthlyTotal);
});


    // console.log("callback");
}



