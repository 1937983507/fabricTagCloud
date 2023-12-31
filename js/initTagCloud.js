// 绘制标签云



// 获取将要绘制的区域范围
function getRegion() {
    // 要绘制的文本总数
    var myJsonLen = Object.keys(myJson).length;
    for (var i = 0; i < myJsonLen; i++) {
        // 求绘制的范围
        var tempX = myJson[i].X_gcj02;
        var tempY = myJson[i].Y_gcj02;
        if (tempX < minX) minX = tempX;
        if (tempX > maxX) maxX = tempX;
        if (tempY < minY) minY = tempY;
        if (tempY > maxY) maxY = tempY;
    }
}

// 经纬度与屏幕坐标的转换
function Latlon2ScreenCoordinates() {
    // 要绘制的文本总数
    var myJsonLen = Object.keys(myJson).length;
    for (var i = 0; i < myJsonLen; i++) {
        var X = myJson[i].X_gcj02;
        var Y = myJson[i].Y_gcj02;
        var tempX = (X - minX) / (maxX - minX) * canvas.width;
        var tempY = (1 - (Y - minY) / (maxY - minY)) * canvas.height;

        // 四周的点向内部偏移
        if (tempX > canvas.width - 10) tempX = tempX - 100;
        if (tempY < 10) tempY = tempY + 10;
        if (tempY > canvas.height - 10) tempY = tempY - 10;

        // 转成屏幕坐标进行存储
        myJson[i].screenX = tempX;
        myJson[i].screenY = tempY;
        // console.log(myJson[i].pname, myJson[i].X, myJson[i].Y);
    }
    // 将用户绘制的最中心点 转为屏幕坐标
    // console.log(circleX, circleY);
    originX = (circleX - minX) / (maxX - minX) * canvas.width;
    originY = (1 - (circleY - minY) / (maxY - minY)) * canvas.height;
    // console.log(originX, originY);
    // originX = myJson[0].X;
    // originY = myJson[0].Y;

}


// 绘制中心点 
function drawCenter() {
    // 获取中心点图像对象
    // fabric.Image.fromURL('../img/center2.png', function (oImg) {
    //     // 在添加到画布之前，缩小图像, 并使其翻转。
    //     oImg.scale(0.2).set({ "top": originY, "left": originX });
    //     canvas.add(oImg);
    // });

    // 初始化该标签
    var tempPOI = new fabric.Text("中心位置", {
        left: originX,
        top: originY,
        fill: 'rgb(255,255,255)',
        fontSize: 50,
        strokeWidth: 5,
        stroke: 'rgba(255,255,255,0.6)',
        fontFamily: 'Comic Sans',
        textAlign: 'center',
        selectable: false  // 不可选中，默认是可以选中的
    });
    canvas.add(tempPOI);
}


// 文本偏移策略（从中心点，基于径向向外）
function polarCoordinates_Shift(i) {
    // console.log("==========", i);
    // console.log(myJson[i].name, myJson[i].X, myJson[i].Y);






    // // [x,y]围绕中心点[cx,cy]旋转angle度。
    // function rotate(cx, cy, x, y, angle) {
    //     var radians = (Math.PI / 180) * angle;
    //     var cos = Math.cos(radians);
    //     var sin = Math.sin(radians);
    //     var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    //     var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    //     return [nx, ny];
    // }
    // myJson[i].screenLocations = [];
    // myJson[i].newScreenLocations = [];
    // myJson[i].screenLocations.push(rotate(originX, originY, myJson[i].X_gcj02, myJson[i].Y_gcj02, -15));
    // myJson[i].screenLocations.push(rotate(originX, originY, myJson[i].X_gcj02, myJson[i].Y_gcj02, -10));
    // // myJson[i].screenLocations.push(rotate(originX, originY, myJson[i].X_gcj02, myJson[i].Y_gcj02, -5));
    // myJson[i].screenLocations.push([myJson[i].screenX, myJson[i].screenY]);
    // // myJson[i].screenLocations.push(rotate(originX, originY, myJson[i].X_gcj02, myJson[i].Y_gcj02, 5));
    // myJson[i].screenLocations.push(rotate(originX, originY, myJson[i].X_gcj02, myJson[i].Y_gcj02, 10));
    // myJson[i].screenLocations.push(rotate(originX, originY, myJson[i].X_gcj02, myJson[i].Y_gcj02, 15));
    // // console.log(myJson[i].screenLocations);

    // var maybeScreenLos = myJson[i].screenLocations.length;

    // // 第i个标签的第j个方向
    // for (var j = 0; j < maybeScreenLos; j++) {

    //     // 初始位置为圆形中心
    //     var newX = originX;
    //     var newY = originY;
    //     // 初始化该标签
    //     var tempPOI = new fabric.Text(myJson[i].pname, {
    //         left: newX,
    //         top: newY,
    //         fill: myJson[i].fontColor,
    //         fontSize: myJson[i].fontSize,
    //         fontFamily: myJson[i].typeface,
    //         fontWeight: myJson[i].fontWeight,
    //         textAlign: 'center',
    //         selectable: false  // 不可选中，默认是可以选中的
    //     });
    //     canvas.add(tempPOI);


    //     // 计算偏移量
    //     var offsetXX = myJson[i].screenLocations[j][0] - originX;
    //     var offsetYY = myJson[i].screenLocations[j][1] - originY;

    //     var xie = Math.sqrt(offsetXX * offsetXX + offsetYY * offsetYY);
    //     var xx = offsetXX / xie * 15;
    //     var yy = offsetYY / xie * 15;


    //     // 开始偏移(朝着单一方向)
    //     while (true) {
    //         // 默认不需要偏移
    //         var isShift = false;

    //         // 通过resJson遍历已经绘制的元素
    //         // var resLength = Object.keys(resJson).length;
    //         // for (var j = 0; j < resLength; j++) {
    //         //     // console.log(canvas.item(j));
    //         //     if (tempPOI.intersectsWithObject(canvas.item(j))) {
    //         //         // 有重叠，得继续偏移
    //         //         isShift = true;
    //         //         // 计算偏移后的坐标
    //         //         newX = newX + xx;
    //         //         newY = newY + yy;
    //         //         // 开始移动标签
    //         //         tempPOI.set({ left: newX, top: newY });
    //         //         tempPOI.setCoords();
    //         //         // 退出遍历resJson
    //         //         break;
    //         //     }
    //         // }

    //         // 通过 canvas.forEachObject 遍历画布上所有元素
    //         canvas.forEachObject(function (obj) {
    //             // console.log(obj);
    //             // 排除当前正在移动的元素
    //             if (obj === tempPOI) return

    //             // 检查对象是否与另一个对象相交
    //             if (tempPOI.intersectsWithObject(obj)) {
    //                 // 有重叠，得继续偏移
    //                 isShift = true;
    //                 // 计算偏移后的坐标
    //                 newX = newX + xx;
    //                 newY = newY + yy;
    //                 // 开始移动标签
    //                 tempPOI.set({ left: newX, top: newY });
    //                 tempPOI.setCoords();
    //             }
    //         })


    //         if (!isShift) {
    //             // 不需要偏移了，退出while循环
    //             myJson[i].newScreenLocations[j] = [newX, newY];
    //             canvas.remove(tempPOI);
    //             break;
    //         }
    //     }
    // }

    // // 寻找最近的摆放位置
    // var theMinDistance = 99999999999;
    // var theNewLocation = [];
    // for (var j = 0; j < maybeScreenLos; j++) {
    //     var newXY = myJson[i].newScreenLocations[j];
    //     var tempDis = (newXY[0] - originX) * (newXY[0] - originX) + (newXY[1] - originY) * (newXY[1] - originY);
    //     if (tempDis < theMinDistance) {
    //         // 更新最近距离
    //         theMinDistance = tempDis;
    //         theNewLocation[0] = newXY[0];
    //         theNewLocation[1] = newXY[1];
    //     }
    // }

    // // 正式绘制
    // var tempPOI = new fabric.Text(myJson[i].pname, {
    //     left: theNewLocation[0],
    //     top: theNewLocation[1],
    //     fill: myJson[i].fontColor,
    //     fontSize: myJson[i].fontSize,
    //     fontFamily: myJson[i].typeface,
    //     fontWeight: myJson[i].fontWeight,
    //     textAlign: 'center',
    //     selectable: false  // 不可选中，默认是可以选中的
    // });
    // canvas.add(tempPOI);



    //==================================================

    // 初始位置为圆形中心
    var newX = originX;
    var newY = originY;
    // 初始化该标签
    var tempPOI = new fabric.Text(myJson[i].pname, {
        left: newX,
        top: newY,
        fill: myJson[i].fontColor,
        fontSize: myJson[i].fontSize,
        fontFamily: myJson[i].typeface,
        fontWeight: myJson[i].fontWeight,
        textAlign: 'center',
        selectable: false  // 不可选中，默认是可以选中的
    });
    canvas.add(tempPOI);


    // 计算偏移量
    var xx = myJson[i].screenX - originX;
    var yy = myJson[i].screenY - originY;
    var xie = Math.sqrt(xx * xx + yy * yy);
    xx = xx / xie * 15;
    yy = yy / xie * 15;


    // 开始偏移(朝着单一方向)
    while (true) {
        // 默认不需要偏移
        var isShift = false;

        // 通过resJson遍历已经绘制的元素
        // var resLength = Object.keys(resJson).length;
        // for (var j = 0; j < resLength; j++) {
        //     // console.log(canvas.item(j));
        //     if (tempPOI.intersectsWithObject(canvas.item(j))) {
        //         // 有重叠，得继续偏移
        //         isShift = true;
        //         // 计算偏移后的坐标
        //         newX = newX + xx;
        //         newY = newY + yy;
        //         // 开始移动标签
        //         tempPOI.set({ left: newX, top: newY });
        //         tempPOI.setCoords();
        //         // 退出遍历resJson
        //         break;
        //     }
        // }

        // 通过 canvas.forEachObject 遍历画布上所有元素
        canvas.forEachObject(function (obj) {
            // console.log(obj);
            // 排除当前正在移动的元素
            if (obj === tempPOI) return

            // 检查对象是否与另一个对象相交
            if (tempPOI.intersectsWithObject(obj)) {
                // 有重叠，得继续偏移
                isShift = true;
                // 计算偏移后的坐标
                newX = newX + xx;
                newY = newY + yy;
                // 开始移动标签
                tempPOI.set({ left: newX, top: newY });
                tempPOI.setCoords();
            }
        })


        if (!isShift) {
            // 不需要偏移了，退出while循环
            myJson[i].newX = newX;
            myJson[i].newY = newY;
            break;
        }

    }




}


// 初次绘制文本
async function initDraw() {
    // 要绘制的文本总数
    var myJsonLen = Object.keys(myJson).length;
    // 逐一对每一文本进行判断
    for (var i = 0; i < myJsonLen; i++) {
        polarCoordinates_Shift(i);
        // resJson[i] = myJson[i];
    }
}


// 鼠标交互事件
function mouseInteractive() {
    // 可以实现鼠标滚轮缩放 最小为原来的百分之一，最大为原来的20倍
    canvas.on('mouse:wheel', opt => {
        // console.log(this)
        const delta = opt.e.deltaY // 滚轮，向上滚一下是 -100，向下滚一下是 100
        let zoom = canvas.getZoom() // 获取画布当前缩放值
        zoom *= 0.999 ** delta
        if (zoom > 20) zoom = 20
        if (zoom < 0.01) zoom = 0.01

        // 以左上角为原点
        // this.canvas.setZoom(zoom)

        // 以鼠标所在位置为原点缩放
        canvas.zoomToPoint(
            { // 关键点
                x: opt.e.offsetX,
                y: opt.e.offsetY
            },
            zoom
        )
        opt.e.preventDefault()
        opt.e.stopPropagation()
    })

    // 鼠标按下事件
    canvas.on('mouse:down', function (e) {
        this.panning = true
        canvas.selection = false
    })
    // 鼠标抬起事件
    canvas.on('mouse:up', function (e) {
        this.panning = false
        canvas.selection = true
    })
    // 移动画布事件
    canvas.on('mouse:move', function (e) {
        if (this.panning && e && e.e) {
            var delta = new fabric.Point(e.e.movementX, e.e.movementY)
            canvas.relativePan(delta)
        }
    })

    // 鼠标单击事件，显示某类要素的详细信息+高亮此要素
    canvas.on('mouse:down', function (options) {
        if (options.target) {
            // console.log('an object was clicked! ', options.target);
            // 获取单击要素的ID
            var currindex = canvas.getObjects().indexOf(options.target) - 1;

            // 先清除所有的高亮
            var myJsonLen = Object.keys(myJson).length;
            for (var i = 1; i < myJsonLen; i++) {
                canvas.item(i).set({ strokeWidth: 0 });
            }
            // 高亮此要素
            canvas.item(currindex + 1).set({ strokeWidth: 4, stroke: 'rgba(255,255,255,0.5)' })

            // 显示要素详情窗口
            let detailsWindow = document.getElementById('detailsWindow');

            detailsWindow.style.display = "block";

            // console.log(myJson);



            var pid = currindex;
            var pname = myJson[currindex].pname;
            var X = myJson[currindex].X_wgs84;
            var Y = myJson[currindex].Y_wgs84;
            var distance = myJson[currindex].distance;
            var rankInChina = myJson[currindex].rankInChina;
            var rankInCity = myJson[currindex].rankInCity;

            var str = "要素名：" + pname + "\n经度：" + X + "\n纬度：" + Y + "\n与中心点距离：" + Math.trunc(distance) + "米\n在当前城市排名：" + rankInCity;

            let detailsInformation = document.getElementById('detailsInformation');
            detailsInformation.innerText = str;

        }
        else {
            // 清除所有的的高亮
            var myJsonLen = Object.keys(myJson).length;
            for (var i = 1; i < myJsonLen; i++) {
                canvas.item(i).set({ strokeWidth: 0 });
            }
            canvas.renderAll();
        }
    });


    // 获取标签对象
    const legendColor1 = document.getElementById("legendColor1");
    const legendColor2 = document.getElementById("legendColor2");
    const legendColor3 = document.getElementById("legendColor3");
    const legendColor4 = document.getElementById("legendColor4");
    const legendColor5 = document.getElementById("legendColor5");

    // 鼠标悬浮到对应的图例上，对应颜色的标签高亮显示
    legendColor1.addEventListener("mouseover", function (event) {
        // const btnId = event.target.id;
        // console.log("按钮的id值为：" + btnId);
        // 同一色系的标签高亮显示
        var currColor = "rgb(65,224,208)";
        useHighlight(currColor);
    });
    legendColor2.addEventListener("mouseover", function (event) {
        // const btnId = event.target.id;
        // console.log("按钮的id值为：" + btnId);
        // 同一色系的标签高亮显示
        var currColor = "rgb(143,207,193)";
        useHighlight(currColor);
    });
    legendColor3.addEventListener("mouseover", function (event) {
        // const btnId = event.target.id;
        // console.log("按钮的id值为：" + btnId);
        // 同一色系的标签高亮显示
        var currColor = "rgb(203,163,151)";
        useHighlight(currColor);
    });
    legendColor4.addEventListener("mouseover", function (event) {
        // const btnId = event.target.id;
        // console.log("按钮的id值为：" + btnId);
        // 同一色系的标签高亮显示
        var currColor = "rgb(241,94,87)";
        useHighlight(currColor);
    });
    legendColor5.addEventListener("mouseover", function (event) {
        // const btnId = event.target.id;
        // console.log("按钮的id值为：" + btnId);
        // 同一色系的标签高亮显示
        var currColor = "rgb(255,0,0)";
        useHighlight(currColor);
    });

    // 使用高亮显示
    function useHighlight(currColor) {
        var myJsonLen = Object.keys(myJson).length;
        for (var i = 1; i < myJsonLen; i++) {
            if (currColor == myJson[i].fontColor) {
                canvas.item(i).set({ strokeWidth: 4, stroke: 'rgba(255,255,255,0.8)' });
            }
            else {
                canvas.item(i).set({ strokeWidth: 0 });
            }
        }
        // 更新画布，重绘
        canvas.renderAll();
    }

    // 鼠标移除图例，所有标签高亮显示
    legendColor1.addEventListener("mouseout", clearHighlight);
    legendColor2.addEventListener("mouseout", clearHighlight);
    legendColor3.addEventListener("mouseout", clearHighlight);
    legendColor4.addEventListener("mouseout", clearHighlight);
    legendColor5.addEventListener("mouseout", clearHighlight);

    // 所有标签都停止高亮
    function clearHighlight() {

        var myJsonLen = Object.keys(myJson).length;
        for (var i = 1; i < myJsonLen; i++) {
            canvas.item(i).set({ strokeWidth: 0 });
        }
        // 更新画布，重绘
        canvas.renderAll();
    }

}

// 生成标签云
function getTagCloud() {

    // 已经绘制的文本
    // resJson = [];

    // 获取将要绘制的区域范围
    getRegion();
    // 经纬度与屏幕坐标的转换
    Latlon2ScreenCoordinates();
    // 绘制中心点 
    drawCenter();
    // 初次绘制文本
    initDraw();
    // 鼠标交互事件
    mouseInteractive();



}


