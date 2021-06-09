
nrays=8;
for(let i = 0; i < nrays; ++i) {
    let x = Math.cos(360/nrays*i*Math.PI/180);
    let z = Math.sin(360/nrays*i*Math.PI/180);
    console.log(x, z);
}