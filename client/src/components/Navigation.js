import React from 'react';
import { navigation } from '../ultils/contants';
import { NavLink } from 'react-router-dom';

const notActiveStyle = '';
const activeStyle = '';
const Navigation = () => {
    return (
        <div className="border w-main h-[48px] py-2 text-sm flex items-center">
            {navigation.map((el) => (
                <NavLink to={el.path} key={el.id} className="pr-12">
                    {el.value}
                </NavLink>
            ))}
        </div>
    );
};

export default Navigation;
