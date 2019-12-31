function edgesOfTriangle(triangle) { return [3 * triangle, 3 * triangle + 1, 3 * triangle + 2]; }
function triangleOfEdge(edge)  { return Math.floor(edge / 3); }
function nextHalfedge(edge) { return (edge % 3 === 2) ? edge - 2 : edge + 1; }
function prevHalfedge(edge) { return (edge % 3 === 0) ? edge + 2 : edge - 1; }

function forEachTriangleEdge(points, delaunay, callback) {
    for (let edge = 0; edge < delaunay.triangles.length; edge++) {
        if (edge > delaunay.halfedges[edge]) {
            const p = points[delaunay.triangles[edge]];
            const q = points[delaunay.triangles[nextHalfedge(edge)]];
            callback(p[0], p[1], q[0], q[1]);
        }
    }
}

const numberOfPointsAllowed = 80; 
let numberOfPoints = 0;
let points = [];
let delaunay;

function addPoints() {
    if (numberOfPoints < numberOfPointsAllowed) {
        const numberX = Math.random();
        if (numberX > 0.75) { xTrajectory = 1; }
        else if (numberX > 0.5 && numberX < 0.75) { xTrajectory = 0.5; }
        else if (numberX > 0.25 && numberX < 0.5) { xTrajectory = -0.5; }
        else if (numberX < 0.25) { xTrajectory = -1; }
    
        const numberY = Math.random();
        if (numberY > 0.75) { yTrajectory = 1; }
        else if (numberY > 0.5 && numberY < 0.75) { yTrajectory = 0.5; }
        else if (numberY > 0.25 && numberY < 0.5) { yTrajectory = -0.5; }
        else if (numberY < 0.25) { yTrajectory = -1; }
    
        points.push([Math.round(Math.random() * innerWidth), Math.round(Math.random() * innerHeight), xTrajectory, yTrajectory]);
        numberOfPoints++;
    }
}

function removePoints() {
    points.forEach(function(point, index, object) {
        if (point[0] > (window.innerWidth + 200) || point[0] < -200) {
            object.splice(index, 1);
            numberOfPoints--;
        }
        if (point[1] > (window.innerHeight + 200) || point[1] < -200) {
            object.splice(index, 1);
            numberOfPoints--;
        }
    });
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(255, 255, 255)
    addPoints();
    removePoints()
    delaunay = Delaunator.from(points);
    forEachTriangleEdge(points, delaunay, line);
    points.forEach(point => {
        point[0] += point[2];
        point[1] += point[3];
    });
}
