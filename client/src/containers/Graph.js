import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const Graph = (props) => {
    useEffect(() => {
        let clientData = 0;
        let carData = 0;
        let orcamento = 0;
        let emservico = 0;
        let pronta = 0;
        let cancelada = 0;

        const fetchData = async () => {
            await axios
                .get(`/api/clients`, {
                    params: {
                        companyid: props.companyId,
                    },
                })
                .then((resp) => {
                    clientData = resp.data.length;
                });

            await axios
                .get(`/api/cars`, {
                    params: {
                        companyid: props.companyId,
                    },
                })
                .then((resp) => {
                    carData = resp.data.length;
                });

            await axios
                .get(`/api/os`, {
                    params: {
                        companyid: props.companyId,
                    },
                })
                .then((resp) => {
                    orcamento = resp.data.filter((item) => {
                        return item.status == "Orçamento";
                    });

                    emservico = resp.data.filter((item) => {
                        return item.status == "Em Serviço";
                    });

                    pronta = resp.data.filter((item) => {
                        return item.status == "Pronta";
                    });

                    cancelada = resp.data.filter((item) => {
                        return item.status == "Cancelada";
                    });
                });

            let ctx = document.getElementById("myChart");
            let myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Resumo da Empresa"],
                    datasets: [
                        {
                            label: "Clientes",
                            data: [clientData],
                            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                            borderColor: ["rgba(255, 99, 132, 1)"],
                            borderWidth: 1,
                        },
                        {
                            label: "Carros",
                            data: [carData],
                            backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                            borderColor: ["rgba(54, 162, 235, 1)"],
                            borderWidth: 1,
                        },
                        {
                            label: "Em Orçamento",
                            data: [orcamento.length],
                            backgroundColor: ["rgba(255, 206, 86, 0.2)"],
                            borderColor: ["rgba(255, 206, 86, 1)"],
                            borderWidth: 1,
                        },
                        {
                            label: "Em Serviço",
                            data: [emservico.length],
                            backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                            borderColor: ["rgba(75, 192, 192, 1)"],
                            borderWidth: 1,
                        },
                        {
                            label: "Pronta",
                            data: [pronta.length],
                            backgroundColor: ["rgba(153, 102, 255, 0.2)"],
                            borderColor: ["rgba(153, 102, 255, 1)"],
                            borderWidth: 1,
                        },
                        {
                            label: "Cancelada",
                            data: [cancelada.length],
                            backgroundColor: ["rgba(255, 159, 64, 0.2)"],
                            borderColor: ["rgba(255, 159, 64, 1)"],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        };
        fetchData();
    }, []);

    return (
        <div>
            <canvas id="myChart" width="400px" height="200px"></canvas>
        </div>
    );
};

export default Graph;
