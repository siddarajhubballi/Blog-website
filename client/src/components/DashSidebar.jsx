import { Sidebar } from 'flowbite-react'
import React from 'react'
import { HiArrowSmRight, HiUser } from "react-icons/hi"
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState("");

    const handleSignOut = async () => {
        try {
            const res = await fetch("/api/user/signout", {
                method: "POST",
            });
            const data = await res.json();
    
            if(!res.ok) {
                console.log(error.message);
            }
            else {
                dispatch(signoutSuccess());
            }
        }
        catch(error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tab = urlParams.get("tab");
        if(tab) {
        setTab(tab);
        }
    }, [location.search]);
    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item active={tab === "profile"} icon={HiUser} label={"User"} labelColor="dark" as="button">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut} className="cursor-pointer">
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
