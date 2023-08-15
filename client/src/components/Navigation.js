import React from 'react';
import { navigation } from '../ultils/contants';
import { NavLink } from 'react-router-dom';

const notActiveStyle = '';
const activeStyle = '';
const Navigation = () => {
    return (
        <div className="border-b w-main h-[48px] py-2 text-sm flex items-center mb-5">
            {navigation.map((el) => (
                <NavLink
                    to={el.path}
                    key={el.id}
                    className={({ isActive }) =>
                        isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'
                    }
                >
                    {el.value}
                </NavLink>
            ))}
        </div>
    );
};

export default Navigation;
