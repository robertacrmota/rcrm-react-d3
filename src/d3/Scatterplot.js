import * as d3 from 'd3';
import './Scatterplot.css';

const margin =  {top: 100, bottom: 70, left: 70, right: 70};
const svgWidth = 600;
const svgHeight = 500;
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;


class Scatterplot {
    parentRef = null;
    vis = {};

    constructor(parentRef, data) {
        this.parentRef = parentRef;

        // chart
        this.vis.chart = d3.select(parentRef.current)
            .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // title
        this.vis.xLabel = this.vis.chart.append("text")
            .attr("id", "chart-title")
            .attr("text-anchor", "middle")
            .attr("x", 0.5*chartWidth)
            .attr("y", "-0.75em")
            .text("BIRTHS/COUNTRY IN 2011");

        // scales
        this.vis.yScale = d3.scaleLinear()
            .range([chartHeight, 0]);

        this.vis.xScale = d3.scaleLinear()
            .range([0, chartWidth]);

        this.vis.radiusScale = d3.scaleLinear()
            .range([2, 20]);

        // axes
        this.vis.xAxis = d3.axisBottom(this.vis.xScale);
        this.vis.yAxis = d3.axisLeft(this.vis.yScale);

        this.vis.xAxisGroup = this.vis.chart.append("g")
            .attr("transform", `translate(0, ${chartHeight})`);

        this.vis.yAxisGroup = this.vis.chart.append("g");

        // axes labels
        this.vis.xLabel = this.vis.chart.append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0.5*chartWidth)
            .attr("y", chartHeight + 50)
            .text("Births per Capita");

        this.vis.chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .attr("x", -0.5*chartHeight)
            .attr("y", -50)
            .text("Life Expectancy");

        this.update(data);
    }

    update(data) {
        this.vis.data = data;

        // scales
        this.vis.yScale.domain([d3.min(this.vis.data, d => d.lifeExpectancy) * .75, d3.max(this.vis.data, d => d.lifeExpectancy) * 1.2]);
        this.vis.xScale.domain([0, d3.max(this.vis.data, d => (d.births / d.population)) * 1.2]);
        this.vis.radiusScale.domain(d3.extent(this.vis.data, d => d.lifeExpectancy));

        // axes
        this.vis.xAxisGroup.transition().duration(500)
            .call(this.vis.xAxis);
        this.vis.yAxisGroup.transition().duration(500)
            .call(this.vis.yAxis);


        // circles using D3 update pattern
        let easeDuration = 0.75;
        let ease = d3.easeBounceOut;

        // DATA JOIN
        const circles = this.vis.chart.selectAll("circle")
            .data(this.vis.data, d => d.region);

        // EXIT
        circles.exit()
            .transition().duration(easeDuration*1000).ease(ease)
            .attr("r", 0)
            .remove();

        // UPDATE
        circles.transition().duration(easeDuration*1000)
            .attr("cx", d => this.vis.xScale(d.births / d.population))
            .attr("cy", d => this.vis.yScale(d.lifeExpectancy))
            .attr("r", d => this.vis.radiusScale(d.lifeExpectancy));

        // ENTER
        circles.enter()
            .append("circle")
            .attr("id", (d) => d.region.replace(/\s/g,''))
            .attr("cx", (d) => this.vis.xScale(d.births / d.population))
            .attr("cy", (d) => this.vis.yScale(d.lifeExpectancy))
            .attr("stroke", "white")
            .attr("fill", "#007bff")
            .transition()
            .duration(easeDuration*1000)
            .ease(ease)
            .attr("r", d => this.vis.radiusScale(d.lifeExpectancy));

    };

    updateHover(hovered_data) {
        this.vis.chart.selectAll("circle").attr("fill", "#007bff");

        if(hovered_data !== null) {
            this.vis.chart.select(`#${hovered_data.region.replace(/\s/g, '')}`).attr("fill", "#0F00FF");
        }
    };
}

export default Scatterplot;