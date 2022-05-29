// const data = [80, 60, 40, 20, 10]

// const svg = d3.select("#chart-area").append("svg")
//     .attr("width", 800)
//     .attr("height", 800)

// const circles = svg.selectAll("circle")
//     .data(data)

// circles.enter().append("circle")
//     .attr("cx", (d, i) => (i * 150) + 80)
//     .attr("cy", 250)
//     .attr("r", (d) => d)
//     .attr("fill", "red")

// svg.append("circle")
//     .attr("cx", 200)
//     .attr("cy", 200)
//     .attr("r", 100)
//     .attr("fill", "#2c3e50")

// svg.append("rect")
//     .attr("x", 400)
//     .attr("y", 400)
//     .attr("width", 100 )
// 	.attr("height", 100)
// 	.attr("fill", "#d35400")

/// ===============LINEAR SCALE EXAMPLE
// const svg = d3
//   .select("#chart-area")
//   .append("svg")
//   .attr("width", 400)
//   .attr("height", 400);

// d3.json("data/buildings.json").then((data) => {
//   data.forEach((d) => {
//     d.height = Number(d.height);
//   });

//   const x = d3
//     .scaleBand()
//     .domain([
//       "Burj Khalifa",
//       "Shanghai Tower",
//       "Abraj Al-Bait Clock Tower",
//       "Ping An Finance Centre",
//       "Lotte World Tower",
//       "One World Trade Center",
//       "CTF Finance Centre"
//     ])
//     .range([0,400])
//     .paddingInner(0.3)
//     .paddingOuter(0.2)

//   const y = d3.scaleLinear().domain([0, 828]).range([0, 400])

//   const rects = svg.selectAll("rect").data(data);

//   rects
//     .enter()
//     .append("rect")
//     .attr("y", 0)
//     .attr("x", (d, i) => x(d.name))
//     .attr("width", x.bandwidth)
//     .attr("height", (d) => y(d.height))
//     .attr("fill", "#2c3e50");
// });
/// ===============LINEAR SCALE EXAMPLE (END)

/// ===============GROUP (G) EXAMPLE (END)

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 110)
  .attr("font-size", "24px")
  .attr("text-anchor", "middle")
  .text("Word's tallest buildings")

// Y label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "24px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Height in Meters (m)")

d3.json("data/buildings.json").then(data => {
  data.forEach(d => {
    d.height = Number(d.height)
  })

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, WIDTH])
    .paddingInner(0.3)
    .paddingOuter(0.2)
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([HEIGHT, 0])

  const xAxisCall = d3.axisBottom(x)
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(xAxisCall)
    .selectAll("text")
      .attr("y", "10")
      .attr("x", "-1")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-30)")

  const yAxisCall = d3.axisLeft(y)
    .ticks(4)
    .tickFormat(d => d + "m")
  g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall)

  const rects = g.selectAll("rect")
    .data(data)
  
  rects.enter().append("rect")
    .attr("y", d => y(d.height))
    .attr("x", (d) => x(d.name))
    .attr("width", x.bandwidth)
    .attr("height", d => HEIGHT - y(d.height))
    .attr("fill", "#34495e")
})
///==============================================