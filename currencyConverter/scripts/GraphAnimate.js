    var data = [564,155,499,611,322];

    var pie = new RGraph.Pie({
        id: 'cvs',
        data: data,
        options: {
            labels: ['Abc', 'Def', 'Ghi', 'Jkl', 'Mno'],
            linewidth: 2,
            strokestyle: 'white'
        }
    }).draw();