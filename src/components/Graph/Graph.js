import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './GraphModule.css';

const Graph = ({data}) => {
    const ref = useRef();

    useEffect(() => {
        if (!data || !data.nodes.length) return;        

            const color = d3.scaleOrdinal(d3.schemeCategory10);
            const links = data.links.map(d => ({...d}));
            const nodes = data.nodes.map(d => ({...d}));

            // Минимальное расстояние между узлами
            const minDistance = 80;
        
            // Создаем объект для быстрого поиска узлов по id
            const nodeById = new Map(nodes.map(d => [d.id, d]));
        
            // Обновляем связи, заменяя id на объекты узлов
            links.forEach(link => {
            link.source = nodeById.get(link.source);
            link.target = nodeById.get(link.target);
            });
        
            // Функция проверки связи между узлами
            const isConnected = (a, b) => 
            links.some(l => (l.source === a && l.target === b) || (l.source === b && l.target === a));

            // Группировка узлов
            const groups = Array.from(d3.group(nodes, d => d.group), ([key, nodes]) => ({
            key,
            name: nodes[0].nameGroup,
            nodes,
            radius: Math.max(100, Math.sqrt(nodes.length) * minDistance / 2),
            cx: 0,
            cy: 0
            }));

            // Расположение групп в гриде
            const columns = Math.ceil(Math.sqrt(groups.length));
            const maxRadius = d3.max(groups, d => d.radius);
            const margin = maxRadius * 1;
            const gridSize = margin * 4;
        
            groups.forEach((group, i) => {
            const x = (i % columns) * gridSize + margin;
            const y = Math.floor(i / columns) * gridSize + margin;
            group.cx = x;
            group.cy = y;
            });
        
            // Распределение узлов внутри групп по спирали
            groups.forEach(group => {
            const nodesCount = group.nodes.length;
            const radiusStep = group.radius / Math.sqrt(nodesCount);
            
            group.nodes.forEach((node, i) => {
                const angle = i * (137.508 * Math.PI / 180);
                const radius = Math.sqrt(i) * radiusStep;
                node.x = group.cx + Math.cos(angle) * radius;
                node.y = group.cy + Math.sin(angle) * radius;
            });
            });
        
            const svg = d3.create("svg")
        
            const zoom = d3.zoom()
                .scaleExtent([0.5, 5])
                .on("zoom", (event) => zoomGroup.attr("transform", event.transform));
            
            svg.call(zoom);
            const zoomGroup = svg.append("g");
        
            // Отрисовка связей
            const link = zoomGroup.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
                .attr("stroke-width", d => Math.sqrt(d.value))
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        
            // Отрисовка групп с названиями
            const groupLayer = zoomGroup.append("g")
                .attr("class", "group-layer");
        
            // Окружности групп
            const groupCircles = groupLayer.selectAll(".group-circle")
                .data(groups)
                .join("circle")
                .attr("class", "group-circle")
                .attr("fill", "none")
                .attr("stroke", d => color(d.key))
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "5,5")
                .attr("cx", d => d.cx)
                .attr("cy", d => d.cy)
                .attr("r", d => d.radius);
        
            // Текстовые метки групп
            const groupLabels = groupLayer.selectAll(".group-label")
                .data(groups)
                .join("text")
                .attr("class", "group-label")
                .attr("x", d => d.cx)
                .attr("y", d => d.cy)
                .attr("dy", d => d.radius + 25)
                .text(d => d.name)
                .style("font-size", "20px")
                .style("fill", "#000")
                .style("font-weight", "bold")
                .style("text-anchor", "middle")
                .style("pointer-events", "none");
        
            // Отрисовка узлов с подсветкой
            const node = zoomGroup.append("g")
                
            .selectAll(".node")
            .data(nodes)
            .join("g")
                .attr("class", "node")
                .attr("transform", d => `translate(${d.x},${d.y})`)
                .on("mouseover", function(event, d) {
                // Подсветка связей
                zoomGroup.selectAll("line")
                    .filter(l => l.source === d || l.target === d)
                    .attr("stroke", "#005ab9")
                    .attr("stroke-opacity", 1);
        
                // Затемнение не связанных узлов
                zoomGroup.selectAll(".node")
                    .style("opacity", o => 
                    o === d || isConnected(d, o) ? 1 : 0.1
                    );
                })
                .on("mouseout", function(event, d) {
                    // Сброс связей
                    zoomGroup.selectAll("line")
                    .filter(l => l.source === d || l.target === d)
                    .attr("stroke", "#999")
                    .attr("stroke-width", l => Math.sqrt(l.value));
            
                    // Сброс прозрачности узлов
                    zoomGroup.selectAll(".node")
                        .style("opacity", 1);
                });
        
            node.append("circle")
                .attr("r", 10)
                .attr("fill", d => color(d.group));
        
            node.append("text")
                .attr("dx", "15px") 
                .attr("dy", "4px") 
                .text(d => d.label)
                .style("font-size", "12px")
                .style("fill", "#000");

            ref.current.appendChild(svg.node());
    }, [data]);
    return <div ref={ref} className='graph' />;
}

export default Graph;