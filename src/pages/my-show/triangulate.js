var EPSILON = 1.0 / 1048576.0;

function supertriangle(vertices) {
    var xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i, dx, dy, dmax, xmid, ymid;

    for (i = vertices.length; i--;) {
        if (vertices[i][0] < xmin) xmin = vertices[i][0];
        if (vertices[i][0] > xmax) xmax = vertices[i][0];
        if (vertices[i][1] < ymin) ymin = vertices[i][1];
        if (vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
        [xmid - 20 * dmax, ymid - dmax],
        [xmid, ymid + 20 * dmax],
        [xmid + 20 * dmax, ymid - dmax]
    ];
}

function circumcircle(vertices, i, j, k) {
    var x1 = vertices[i][0],
        y1 = vertices[i][1],
        x2 = vertices[j][0],
        y2 = vertices[j][1],
        x3 = vertices[k][0],
        y3 = vertices[k][1],
        fabsy1y2 = Math.abs(y1 - y2),
        fabsy2y3 = Math.abs(y2 - y3),
        xc, yc, m1, m2, mx1, mx2, my1, my2, dx, dy;

    /* Check for coincident points */
    if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON)
        throw new Error("Eek! Coincident points!");

    if (fabsy1y2 < EPSILON) {
        m2 = -((x3 - x2) / (y3 - y2));
        mx2 = (x2 + x3) / 2.0;
        my2 = (y2 + y3) / 2.0;
        xc = (x2 + x1) / 2.0;
        yc = m2 * (xc - mx2) + my2;
    }

    else if (fabsy2y3 < EPSILON) {
        m1 = -((x2 - x1) / (y2 - y1));
        mx1 = (x1 + x2) / 2.0;
        my1 = (y1 + y2) / 2.0;
        xc = (x3 + x2) / 2.0;
        yc = m1 * (xc - mx1) + my1;
    }

    else {
        m1 = -((x2 - x1) / (y2 - y1));
        m2 = -((x3 - x2) / (y3 - y2));
        mx1 = (x1 + x2) / 2.0;
        mx2 = (x2 + x3) / 2.0;
        my1 = (y1 + y2) / 2.0;
        my2 = (y2 + y3) / 2.0;
        xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
        yc = (fabsy1y2 > fabsy2y3) ?
            m1 * (xc - mx1) + my1 :
            m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return { i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy };
}

function dedup(edges) {
    var i, j, a, b, m, n;

    for (j = edges.length; j;) {
        b = edges[--j];
        a = edges[--j];

        for (i = j; i;) {
            n = edges[--i];
            m = edges[--i];

            if ((a === m && b === n) || (a === n && b === m)) {
                edges.splice(j, 2);
                edges.splice(i, 2);
                break;
            }
        }
    }
}

export function triangulate(vertices, key) {
    var n = vertices.length,
        i, j, indices, st, open, closed, edges, dx, dy, a, b, c;

    /* Bail if there aren't enough vertices to form any triangles. */
    if (n < 3)
        return [];

    vertices = vertices.slice(0);

    if (key)
        for (i = n; i--;)
            vertices[i] = vertices[i][key];

    indices = new Array(n);

    for (i = n; i--;)
        indices[i] = i;

    indices.sort(function (i, j) {
        return vertices[j][0] - vertices[i][0];
    });

    st = supertriangle(vertices);
    vertices.push(st[0], st[1], st[2]);

    open = [circumcircle(vertices, n + 0, n + 1, n + 2)];
    closed = [];
    edges = [];


    for (i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        for (j = open.length; j--;) {

            dx = vertices[c][0] - open[j].x;
            if (dx > 0.0 && dx * dx > open[j].r) {
                closed.push(open[j]);
                open.splice(j, 1);
                continue;
            }


            dy = vertices[c][1] - open[j].y;
            if (dx * dx + dy * dy - open[j].r > EPSILON)
                continue;

            edges.push(
                open[j].i, open[j].j,
                open[j].j, open[j].k,
                open[j].k, open[j].i
            );
            open.splice(j, 1);
        }

        dedup(edges);

        for (j = edges.length; j;) {
            b = edges[--j];
            a = edges[--j];
            open.push(circumcircle(vertices, a, b, c));
        }
    }

    for (i = open.length; i--;)
        closed.push(open[i]);
    open.length = 0;

    for (i = closed.length; i--;)
        if (closed[i].i < n && closed[i].j < n && closed[i].k < n)
            open.push(closed[i].i, closed[i].j, closed[i].k);

    return open;
}

export const randomRange = (min, max) => min + (max - min) * Math.random()
export const clamp = (x, min, max) => (x < min ? min : x > max ? max : x)
export const sign = (x) => (x < 0 ? -1 : 1)

export class Fragment {
    image
    v0
    v1
    v2
    canvas
    box
    centroid
    constructor(v0, v1, v2, image) {
        this.v0 = v0
        this.v1 = v1
        this.v2 = v2
        this.image = image

        this.computeBoundingBox()
        this.computeCentroid()
        this.createCanvas()
        this.clip()
    }

    computeBoundingBox() {
        const xMin = Math.min(this.v0[0], this.v1[0], this.v2[0])
        const xMax = Math.max(this.v0[0], this.v1[0], this.v2[0])
        const yMin = Math.min(this.v0[1], this.v1[1], this.v2[1])
        const yMax = Math.max(this.v0[1], this.v1[1], this.v2[1])

        this.box = {
            x: xMin,
            y: yMin,
            w: xMax - xMin,
            h: yMax - yMin
        }
    }

    computeCentroid() {
        const x = (this.v0[0] + this.v1[0] + this.v2[0]) / 3
        const y = (this.v0[1] + this.v1[1] + this.v2[1]) / 3

        this.centroid = [x, y]
    }

    createCanvas() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.box.w
        this.canvas.height = this.box.h
        this.canvas.style.width = `${this.box.w}px`
        this.canvas.style.height = `${this.box.h}px`
        this.canvas.style.left = `${this.box.x}px`
        this.canvas.style.top = `${this.box.y}px`
        this.canvas.style.position = 'absolute'
        this.canvas.style.opacity = 1
        this.ctx = this.canvas.getContext('2d')
    }

    clip() {
        this.ctx.translate(-this.box.x, -this.box.y)
        this.ctx.beginPath()
        this.ctx.moveTo(this.v0[0], this.v0[1])
        this.ctx.lineTo(this.v1[0], this.v1[1])
        this.ctx.lineTo(this.v2[0], this.v2[1])
        this.ctx.closePath()
        this.ctx.clip()
        this.ctx.drawImage(this.image, 0, 0)
    }
}