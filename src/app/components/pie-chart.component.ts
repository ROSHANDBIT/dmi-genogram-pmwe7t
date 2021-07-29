import { Component, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pie-chart',
  template: `
    <h1>Pie Chart</h1>
    <hr/>
    <div #graphContainer></div>
  `
})
export class PieChartComponent  {

  @ViewChild('graphContainer', { static: false }) graphContainer;
  svg: any;
  data = [{"isComponent":false,"isElement":false,"name":"NgForOf","lifecycle":{"ngDoCheck":1.8749999580904841},"changeDetection":0}];

ngOnInit() {
  setTimeout(() => this.renderGraph());
}

private renderGraph() {
    let graphData = [];
    this.data.forEach(node => {
      graphData.push({
        label: node.name,
        value: node.changeDetection
      })
      Object.keys(node.lifecycle).forEach(key => {
        graphData.push({
          label: key, 
          value: node.lifecycle[key]
        });
      });
    });

    console.log(graphData);

    const data = [2, 4, 8, 10];

    this.svg = d3.select(this.graphContainer.nativeElement)
      .append('svg')
      .attr('height', 200)
      .attr('width', 200)
      .attr('class', 'pie-chart')
      .append("g")
      .attr('transform', 'translate(100, 100)');

    const color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);
    // Generate the pie
    const pie = d3.pie();

    // Generate the arcs
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(100);

    // Generate groups
    const arcs = this.svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Draw arc paths
    arcs.append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);

  }

}
