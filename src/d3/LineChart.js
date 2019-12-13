import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

const margin =  {top: 100, bottom: 70, left: 70, right: 70};
const svgWidth = 600;
const svgHeight = 500;
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

class LineChart {
    parent_ref = null;
    vis = {};

    constructor(parent_ref, data) {
        this.parent_ref = parent_ref;

        // chart
        this.vis.chart = d3.select(this.parent_ref.current)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // scales, axes
        this.vis.yScale = d3.scaleLinear()
            .range([chartHeight, 0]);

        this.vis.xScale = d3.scaleLinear()
            .range([0, chartWidth]);

        this.vis.xAxis = d3.axisBottom(this.vis.xScale);
        this.vis.yAxis = d3.axisLeft(this.vis.yScale);

        this.vis.xAxisGroup = this.vis.chart.append("g")
            .attr("transform", `translate(0, ${chartHeight})`);

        this.vis.yAxisGroup = this.vis.chart.append("g");

        // line generator
        this.vis.lineGenerator = d3.line();

        // line
        this.vis.line = this.vis.chart.append("path")
                                .attr("fill", "none")
                                .attr("stroke", "#007bff")
                                .attr("stroke-width", 1.5);

        this.update(data);
    };

    update(data) {
        this.vis.data = _.sortBy(data, d => (d.births / d.population));

        // scales
        this.vis.yScale.domain([d3.min(this.vis.data, d => d.lifeExpectancy) * .75,
                                d3.max(this.vis.data, d => d.lifeExpectancy) * 1.2]);
        this.vis.xScale.domain([0, d3.max(this.vis.data, d => (d.births / d.population)) * 1.2]);

        // axes
        this.vis.xAxisGroup.transition().duration(500)
            .call(this.vis.xAxis);
        this.vis.yAxisGroup.transition().duration(500)
            .call(this.vis.yAxis);


        this.vis.line.datum(this.vis.data)
                            .transition().duration(500)
                            .attr("d", d3.line()
                                .x(d =>  this.vis.xScale(d.births / d.population))
                                .y(d => this.vis.yScale(d.lifeExpectancy))
                            );
    }
}

export default LineChart;