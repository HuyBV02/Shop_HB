import React, { useEffect, useState } from 'react';
import { Sidebar, Banner } from '../../components';
import { apiGetProducts } from '../../apis/product';

const Home = () => {
    const fetchProducts = async () => {
        const response = await apiGetProducts();
        console.log(response);
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="w-main flex">
            <div className="flex flex-col gap-5 w-[25%] flex-auto">
                <Sidebar />
                <span>Deal daily</span>
            </div>
            <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
                <Banner />
                <span>Best seller</span>
            </div>
        </div>
    );
};

export default Home;
