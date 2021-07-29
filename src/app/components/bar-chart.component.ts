import { Component, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'genogram',
  template: `
    <h1>GenoGram</h1>
    <b>Family information</b>
    <hr />
    <div>
      <svg height="1200" width="1200" id="genoBoard" margin="20">
        <defs>
          <-- discarded -->
          <g id="DM">
            <rect
              width="50"
              height="50"
              style="fill:skyblue;stroke-width:1;stroke:rgb(0,0,0)"
            />
            <path d="M0 0 L50,50 " fill="none" stroke="black" />
            <path d="M0 50 L50,0 " fill="none" stroke="black" />
          </g>
        </defs>
        <defs>
          <g id="M">
            <rect
              width="50"
              height="50"
              style="
              fill:none;
              stroke-width:1;
              stroke:rgb(0,0,0)"
            />
          </g>
        </defs>
        <defs>
          <g id="DF">
            <circle
              r="25"
              cx="25"
              cy="25"
              style="fill:pink;stroke-width:1;stroke:rgb(0,0,0)"
            />
            <path d="M7 7 L43,43 " fill="none" stroke="black" />
            <path d="M7 43 L43,7 " fill="none" stroke="black" />
          </g>
        </defs>
        <defs>
          <g id="F">
            <circle
              r="25"
              cx="25"
              cy="25"
              style="fill:pink;stroke-width:1;stroke:rgb(0,0,0)"
            />
          </g>
        </defs>

        <-- some newly added line defs - experimental -->
        <defs>
          <g id="DIL" transform="translate(10, 10)">
            <line
              x1="0"
              y1="0"
              x2="150"
              y2="0"
              stroke="darkred"
              stroke-width="3"
            ></line>
            <line
              x1="85"
              y1="-10"
              x2="65"
              y2="10"
              stroke="darkred"
              stroke-width="3"
            ></line>
            <line
              x1="95"
              y1="-10"
              x2="75"
              y2="10"
              stroke="darkred"
              stroke-width="3"
            ></line>
          </g>
        </defs>

        <-- Newly added Addiction and mental health related svgs -->
        <defs>
          <g id="M-A01">
            <!-- <use xlink:href="#MA"></use> -->
            <rect
              x="0"
              y="0"
              width="25"
              height="50"
              stroke="black"
              fill="skyblue"
              stroke-width="3"
            ></rect>
            <rect
              x="25"
              y="0"
              width="25"
              height="50"
              stroke="black"
              fill="none"
              stroke-width="3"
            ></rect>
          </g>
        </defs>

        <defs>
          <g id="M-A02">
            <rect
              x="0"
              y="0"
              width="50"
              height="25"
              stroke="black"
              fill="none"
              stroke-width="3"
            ></rect>
            <rect
              x="0"
              y="25"
              width="50"
              height="25"
              stroke="black"
              fill="black"
              stroke-width="3"
            ></rect>
          </g>
        </defs>
        <defs>
          <g id="M-A03">
            <rect
              x="0"
              y="0"
              width="50"
              height="25"
              stroke="black"
              fill="none"
              stroke-width="3"
            ></rect>
            <rect
              x="0"
              y="25"
              width="50"
              height="25"
              stroke="black"
              fill="grey"
              stroke-width="3"
            ></rect>
          </g>
        </defs>
        <defs>
          <g id="M-A09">
            <rect
              x="0"
              y="0"
              width="25"
              height="25"
              stroke="black"
              fill="none"
              stroke-width="3"
            ></rect>
            <rect
              x="25"
              y="0"
              width="25"
              height="25"
              stroke="black"
              fill="none"
              stroke-width="3"
            ></rect>
            <rect
              x="0"
              y="25"
              width="50"
              height="25"
              stroke="black"
              fill="skyblue"
              stroke-width="3"
            ></rect>
          </g>
        </defs>

        <defs>
          <g id="M-A04">
            <!-- <use xlink:href="#MA"></use> -->
            <!-- <rect x=0 y=0 width=25 height=25 stroke=black fill=black stroke-width='3'></rect>
          <rect x=25 y=0 width=25 height=25 stroke=black fill=none stroke-width='3'></rect>
          <rect x=0 y=25 width=25 height=25 stroke=black fill=black stroke-width='3'></rect>
          <rect x=25 y=25 width=25 height=25 stroke=black fill=black stroke-width='3'></rect> -->

            <path
              d="M0 0 L0 50 L50 50 L50 25 L25 25 L25 0"
              stroke="black"
              stroke-width="3"
            ></path>
            <path
              d="M25 1.5 L50 1.5 L50 25"
              fill="none"
              stroke="black"
              stroke-width="3"
            ></path>
          </g>
        </defs>

        <defs>
          <g id="M-B02">
            <rect
              x="0"
              y="0"
              width="50"
              height="25"
              stroke="black"
              fill="none"
              stroke-width="3"
            ></rect>
            <rect
              x="0"
              y="25"
              width="50"
              height="25"
              stroke="black"
              fill="ORANGE"
              stroke-width="3"
            ></rect>
          </g>
        </defs>

        <-- death symbl -->
        <defs>
          <g id="D">
            <path d="M0 0 L50,50 " fill="none" stroke="black" />
            <path d="M0 50 L50,0 " fill="none" stroke="black" />
          </g>
        </defs>

        Sorry, your browser does not support inline SVG.
      </svg>
    </div>
  `
})
export class BarChartComponent {
  @ViewChild('graphContainer', { static: false }) graphContainer;

  // <path d="M30 75 L30,150 " fill="none" stroke="black" />
  // <path d="M30 150 L30,75 " fill="none" stroke="black" />
  // <path d="M120 150 L30,75 " fill="none" stroke="black" />
  // <path d="M220 75 L220,150 " fill="none" stroke="black" />
  // <path d="M230 225 L230,300 " fill="none" stroke="black" />
  dataset = [
    {
      id: 1,
      name: 'P Grand Father',
      dob: '20/10/1934',
      dod: '25/10/2004',
      gender: 'M',
      icon: '',
      phy_and_mental_condition: [
        // this property can have only one property
        'A02', // 'alcohol or drug abuse',
        // 'PMI', // 'physical or mental illness',
        // 'HBT' // 'Hypertension / High Blood Pressure

        // illness
        'B02' // Drug Abuse
      ],
      // imd_relations -> direct_relations
      imd_relations: {
        father: null,
        mother: null,
        // children: [3, 5],
        son: [3, 5],
        duaughter: [],
        spouse: [
          {
            id: 2,
            marriage_date: '15/05/1958',
            divorce_date: null
          }
        ]
        // 'siblings' property can comeup here to represent the bonding between them
      },
      // age: 87,
      // icon: 'M-APM-PHY', //'DM',
      // gender: 'M',
      generation: 0,
      order: 0
    },
    {
      id: 2,
      name: 'P Grand Mother',
      dob: '20/10/1937',
      dod: '25/10/2004',
      icon: '',
      gender: 'F',
      generation: 0,
      order: 4,
      imd_relations: {
        father: null,
        mother: null,
        son: [3, 5],
        duaughter: [4],
        spouse: [
          {
            id: 1,
            marriage_date: '15/05/1934',
            divorce_date: null
          }
        ]
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        'A09', // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B02' // Drug Abuse
      ]
    },
    {
      id: 7,
      name: 'M Grand Father',
      // age: 85,
      dob: '20/10/1936',
      dod: null,
      icon: '',
      gender: 'M',
      generation: 0,
      order: 6,
      imd_relations: {
        father: null,
        mother: null,
        son: [],
        duaughter: [31],
        spouse: [
          {
            id: 71,
            marriage_date: '15/05/1960',
            divorce_date: null
          }
        ]
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        null, // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B02' // Drug Abuse
      ]
    },
    {
      id: 71,
      name: 'M Grand Mother',
      // age: 82,
      dob: '20/10/1939',
      dod: '25/10/2020',
      icon: '',
      gender: 'F',
      generation: 0,
      order: 8,
      imd_relations: {
        father: null,
        mother: null,
        son: [],
        duaughter: [31],
        spouse: [
          {
            id: 7,
            marriage_date: '15/05/1960',
            divorce_date: null
          }
        ]
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        'A01', // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B02' // Drug Abuse
      ]
    },
    {
      id: 3,
      name: 'Father',
      // age: 56,
      dob: '20/10/1965',
      dod: null,
      icon: '',
      gender: 'M',
      generation: 1,
      order: 3,
      imd_relations: {
        father: null,
        mother: null,
        son: [],
        duaughter: [],
        spouse: [
          {
            id: 31,
            marriage_date: '15/05/1990',
            divorce_date: '15/05/2001'
          }
        ]
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        null, // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        null // Drug Abuse
      ]
    },
    {
      id: 31,
      name: 'Mother',
      // age: 53,
      dob: '20/10/1968',
      dod: null,
      icon: '',
      gender: 'F',
      generation: 1,
      order: 7,
      imd_relations: {
        father: 7,
        mother: 71,
        son: [6, 8],
        duaughter: [9],
        spouse: [
          {
            id: 2,
            marriage_date: '15/05/1998',
            divorce_date: null
          }
        ]
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        null, // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        null // Drug Abuse
      ]
    },
    {
      id: 4,
      name: 'Aunt',
      // age: 58,
      dob: '20/10/1963',
      dod: null,
      icon: '',
      gender: 'F',
      generation: 1,
      order: 2,
      imd_relations: {
        father: 1,
        mother: 2,
        son: [],
        duaughter: [],
        spouse: []
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        'A03', // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B09' // Drug Abuse
      ]
    },
    {
      id: 5,
      name: 'Uncle',
      // age: 60,
      dob: '20/10/1961',
      dod: null,
      icon: '',
      gender: 'M',
      generation: 1,
      order: 1,
      imd_relations: {
        father: 1,
        mother: 2,
        son: [],
        duaughter: [],
        spouse: []
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        'A01', // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B02' // Drug Abuse
      ]
    },
    {
      id: 6,
      name: 'You',
      // age: 30,
      dob: '20/10/1991',
      dod: null,
      icon: '',
      gender: 'M',
      generation: 2,
      order: 6,
      imd_relations: {
        father: 3,
        mother: 31,
        son: [11],
        duaughter: [10],
        spouse: [
          {
            id: 61,
            marriage_date: '15/05/2019',
            divorce_date: null
          }
        ]
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        'A04', // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B02' // Drug Abuse
      ]
    },
    {
      id: 8,
      name: 'Brother',
      // age: 33,
      dob: '20/10/1988',
      dod: null,
      icon: '',
      gender: 'M',
      generation: 2,
      order: 4,
      imd_relations: {
        father: 3,
        mother: 31,
        son: [],
        duaughter: [],
        spouse: []
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        'A09', // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B02' // Drug Abuse
      ]
    },
    {
      id: 9,
      name: 'Sister',
      // age: 32,
      dob: '20/10/1989',
      dod: null,
      icon: '',
      gender: 'F',
      generation: 2,
      order: 5,
      imd_relations: {
        father: 3,
        mother: 31,
        son: [],
        duaughter: [],
        spouse: []
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        null, // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        null // Drug Abuse
      ]
    },
    {
      id: 61,
      name: 'Wife',
      // age: 29,
      dob: '20/10/1992',
      dod: null,
      icon: '',
      gender: 'F',
      generation: 2,
      order: 9,
      imd_relations: {
        father: null,
        mother: null,
        son: [11],
        duaughter: [10],
        spouse: [
          {
            id: 6,
            marriage_date: '15/05/2020',
            divorce_date: null
          }
        ]
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        null, // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        'B01' // Drug Abuse
      ]
    },
    {
      id: 11,
      name: 'Son',
      // age: 9,
      dob: '20/10/2012',
      dod: null,
      icon: '',
      gender: 'M',
      generation: 3,
      order: 7,
      imd_relations: {
        father: 6,
        mother: 61,
        son: [],
        duaughter: [],
        spouse: []
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        null, // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        null // Drug Abuse
      ]
    },
    {
      id: 10,
      name: 'Daughter',
      // age: 7,
      dob: '20/10/2014',
      dod: null,
      icon: '',
      gender: 'F',
      generation: 3,
      order: 8,
      imd_relations: {
        father: 6,
        mother: 61,
        son: [],
        duaughter: [],
        spouse: []
      },
      phy_and_mental_condition: [
        // AMP can have only one property
        'A03', // 'alcohol or drug abuse',
        // illness can have only one property for now, should support multiple in future
        null // Drug Abuse
      ]
    }
  ];
  links: any = [
    { source: 1, target: 2, relationship: 'M' },
    { source: 3, target: 31, relationship: 'D' },
    { source: 6, target: 61, relationship: 'M' },
    { source: 7, target: 71, relationship: 'M' }
  ];
  marriageLinks = [];
  divorcedLinks = [];
  nodeWidth = 50;
  nodeHeight = 50;

  width = window.innerWidth;
  height = window.innerHeight;
  layout = [];
  linkGen = d3.linkHorizontal();

  ngOnInit() {
    console.log(JSON.stringify(this.dataset));
    this.layout = this.prepareLayout(this.dataset);
    this.marriageLinks = this.prepareMarraigeLinks(this.layout, 'M');
    this.divorcedLinks = this.prepareMarraigeLinks(this.layout, 'D');
    console.log('ml', this.marriageLinks, this.divorcedLinks);
    setTimeout(() => this.renderGraph());
  }

  prepareLayout(data) {
    return data.map(item => {
      // use scale function
      // consider the margin also
      item.x = item.order * (this.nodeWidth * 2);
      item.y = item.generation * 150;
      console.log(item);
      return item;
    });
  }

  prepareMarraigeLinks(layoutdata, attr) {
    // use map instead of reduce
    return this.links.reduce((itemsAccArray, item) => {
      if (item.relationship === attr) {
        itemsAccArray.push({
          sourceData: layoutdata.find(litem => litem.id == item.source),
          targetData: layoutdata.find(litem => litem.id == item.target)
        });
      }
      return itemsAccArray;
    }, []);
  }

  // generate divorce links
  generateDivorceLinks(container, data) {
    // console.log('data', data);
    // new relationship lines
    container
      .selectAll('use')
      .data(data)
      .enter()
      .append('g')
      .attr('id', 'DIL1');
    // .append('path')
    // .attr('d', d => {
    //   console.log(
    //     d,
    //     d.sourceData.x,
    //     d.sourceData.y,
    //     d.targetData.x,
    //     d.targetData.y,
    //     this.nodeWidth,
    //     this.nodeHeight
    //   );
    //   return `M${d.sourceData.x + this.nodeWidth / 2} ${d.sourceData.y +
    //     this.nodeHeight} v${this.nodeWidth / 2} H${d.targetData.x +
    //     this.nodeWidth / 2} v-${this.nodeWidth / 2}`;
    // })
    // .attr('stroke', 'red')
    // .attr('fill', 'none')
    //
    const selectedGs = d3.selectAll('#DIL1');
    selectedGs
      .append('path')
      .attr('d', d => {
        return `M${d.sourceData.x + this.nodeWidth / 2} ${d.sourceData.y +
          this.nodeHeight} v${this.nodeWidth / 2} H${d.targetData.x +
          this.nodeWidth / 2} v-${this.nodeWidth / 2}`;
      })
      .attr('style', 'stroke:darkred; stroke-width:3')
      .attr('fill', 'none');

    // enable the below code in case only relationsip line is horizontal. Otherwise if the line has to be stretchec to connect data node the use path instead
    // selectedGs
    //   .append('line')
    //   .attr('x1', d => {
    //     console.log('ddd: x1 y1', d.sourceData.x, d.sourceData.y);
    //     return d.sourceData.x + this.nodeWidth / 2;
    //   })
    //   .attr('y1', d => {
    //     return d.sourceData.y + this.nodeHeight + 25;
    //   })
    //   .attr('x2', d => {
    //     console.log('ddd: x2 y2', d.targetData.x, d.targetData.y);
    //     return d.targetData.x + this.nodeWidth / 2;
    //   })
    //   .attr('y2', d => {
    //     return d.targetData.y + this.nodeHeight + 25;
    //   })
    //   .attr('style', 'stroke:darkred; stroke-width:3')
    //   .attr('fill', 'none');

    selectedGs
      .append('line')
      .attr('x1', d => {
        return (d.targetData.x + d.sourceData.x) / 2 + 10;
      })
      .attr('y1', d => {
        return d.sourceData.y + this.nodeHeight + 10;
      })
      .attr('x2', d => {
        return (d.targetData.x + d.sourceData.x) / 2;
      })
      .attr('y2', d => {
        return d.sourceData.y + this.nodeHeight + 40;
      })
      .attr('style', 'stroke:darkred; stroke-width:3')
      .attr('fill', 'none');

    selectedGs
      .append('line')
      .attr('x1', d => {
        return (d.targetData.x + d.sourceData.x) / 2 + 20;
      })
      .attr('y1', d => {
        return d.sourceData.y + this.nodeHeight + 10;
      })
      .attr('x2', d => {
        return (d.targetData.x + d.sourceData.x) / 2 + 10;
      })
      .attr('y2', d => {
        return d.sourceData.y + this.nodeHeight + 40;
      })
      .attr('style', 'stroke:darkred; stroke-width:3')
      .attr('fill', 'none');

    // selectedGs
    //   .append('path')
    //   .attr(
    //     'd',
    //     d =>
    //       `M${d.x + this.nodeWidth / 2} ${d.y} L${d.x +
    //         this.nodeWidth / 2},${d.y - 75}`
    //   )
    //   .attr('stroke', 'green')
    //   .attr('fill', 'none');
  }

  generateMarriageLinks(container, data) {
    // old marriage links
    console.log('data 2', data);
    container
      .selectAll('use')
      .data(data)
      .enter()
      .append('path')
      .attr('d', d => {
        console.log(
          d,
          d.sourceData.x,
          d.sourceData.y,
          d.targetData.x,
          d.targetData.y,
          this.nodeWidth,
          this.nodeHeight
        );
        return `M${d.sourceData.x + this.nodeWidth / 2} ${d.sourceData.y +
          this.nodeHeight} v${this.nodeWidth / 2} H${d.targetData.x +
          this.nodeWidth / 2} v-${this.nodeWidth / 2}`;
      })
      .attr('stroke', 'black')
      .attr('fill', 'none');
  }

  generateNodeData(container) {
    const node = container
      .selectAll('use')
      .data(this.layout)
      .enter()
      .append('g');
    node.append('use').attr('xlink:href', d => {
      if (d.phy_and_mental_condition) {
        console.log(
          'icon = ',
          d.gender + '-' + d.phy_and_mental_condition.join('-')
        );
        // M-APM-ADA
        // d.icon = d.gender + '-' + d.phy_and_mental_condition.join('-');
        d.icon = d.gender + '-' + d.phy_and_mental_condition[0];
      }
      return '#' + d.icon;
    });
    node.append('use').attr('xlink:href', d => {
      if (d.phy_and_mental_condition) {
        console.log(
          'icon = ',
          d.gender + '-' + d.phy_and_mental_condition.join('-')
        );
        // M-APM-ADA
        // d.icon = d.gender + '-' + d.phy_and_mental_condition.join('-');
        d.icon = d.gender + '-' + d.phy_and_mental_condition[1];
      }
      return '#' + d.icon;
    });
    // // new age as per date obj
    // node
    //   .append('text')
    //   .attr('x', 14)
    //   .attr('y', 15)
    //   .text(d => {
    //     return d.dob ? 2021 - d.dob.split('/')[2] : null;
    //   })
    //   .attr('fill', 'red');

    // lifespan or age
    node
      .append('text')
      .attr('x', 15)
      .attr('y', 15)
      .text(d => {
        let dateStr = '';
        // for age number
        if (d.dob && d.dod) {
          dateStr +=
            parseInt(d.dod.split('/')[2]) - parseInt(d.dob.split('/')[2]);
        } else if (d.dob) {
          // dateStr += d.dob.split('/')[2] + ' - *';
          dateStr += 2021 - d.dob.split('/')[2];
        } else if (d.dod) {
          dateStr += '* - ' + d.dod.split('/')[2];
        } else {
          dateStr += 'NA';
        }

        // for year range
        // dateStr += d.dob ? d.dob.split('/')[2] : '*';
        // dateStr += ' - ';
        // dateStr += d.dob ? d.dod.split('/')[2] : '*';
        return dateStr;
      })
      .attr('fill', 'red');

    // name
    node
      .append('text')
      .attr('x', 5)
      .attr('y', 70)
      .attr('font-size', 12)
      .text(d => d.name + `(${d.id})`);

    node.attr('transform', d => `translate(${d.x},${d.y})`);
  }

  private renderGraph() {
    const svg = d3.select('body').select('#genoBoard');
    const container = svg.append('g');
    container.call(
      d3.zoom().on('zoom', function() {
        container.attr('transform', d3.event.transform);
      })
    );

    this.generateMarriageLinks(container, this.marriageLinks);
    this.generateDivorceLinks(container, this.divorcedLinks);

    container
      .selectAll('use')
      .data(this.layout)
      .enter()
      .append('path')
      .attr(
        'd',
        d =>
          `M${d.x + this.nodeWidth / 2} ${d.y} L${d.x +
            this.nodeWidth / 2},${d.y - 75}`
      )
      .attr('stroke', 'black')
      .attr('fill', 'none');

    // // old age
    // node
    //   .append('text')
    //   .attr('x', 14)
    //   .attr('y', 15)
    //   .text(d => d.age)
    //   .attr('fill', 'red');

    this.generateNodeData(container);
    // // name
    // node
    //   .append('text')
    //   .attr('x', 5)
    //   .attr('y', 70)
    //   .attr('font-size', 12)
    //   .text(d => d.name + `(${d.id})`);
    // .text(d => d.name);
    // node.attr('transform', d => `translate(${d.x},${d.y})`);
  }
}
