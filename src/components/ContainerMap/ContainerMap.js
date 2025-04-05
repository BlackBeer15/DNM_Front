import './ContainerMapModule.css';
import React, { useState, useEffect } from 'react';
import Graph from '../Graph/Graph';

const ContainerMap = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Получаем узлы
            const nodesResponse = await fetch('http://192.168.34.30:8080/api/v1/containers/getContView/');
            const nodesData = await nodesResponse.json();
            
            // Получаем связи
            const linksResponse = await fetch('http://192.168.34.30:8080/api/v1/netinfo/getLinksView/');
            const linksData = await linksResponse.json();

            // Преобразуем данные
            const transformedData = {
            nodes: nodesData.map(node => ({
                id: node.contID,
                label: node.ContName,
                group: node.HostID,
                nameGroup: node.hostname
            })),
            links: linksData.map(link => ({
                source: link.sourceID,
                target: link.targetID,
                value: 1 // Можно использовать link.netID как идентификатор
            }))
            };

            setData(transformedData);
            setIsLoading(false);
            
        } catch (error) {
            setError('Ошибка загрузки данных');
            setIsLoading(false);
        }
        };

        fetchData();
    }, []);

    if (isLoading) return <div className="loader">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container-map-wrapper">
            <Graph data={data} /> 
        </div>
    );
}

export default ContainerMap;