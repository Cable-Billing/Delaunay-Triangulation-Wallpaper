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
        if (Math.random() > 0.5) { xTrajectory = 1; }
        else { xTrajectory = -1; }
    
        if (Math.random() > 0.5) { yTrajectory = 1; }
        else { yTrajectory = -1; }
    
        points.push([Math.round(Math.random() * innerWidth), Math.round(Math.random() * innerHeight), xTrajectory, yTrajectory]);
        numberOfPoints++;
    }
}

function removePoints() {
    points.forEach(function(point, index, object) {
        if (point[0] > window.innerWidth || point[0] < 0) {
            object.splice(index, 1);
            numberOfPoints--;
        }
        if (point[1] > window.innerHeight || point[1] < 0) {
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
