import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import loadinganimation from '@/assets/animations/simpleloader.svg';
import { GetDashboard } from '@/services/DashboardService';

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    type DashboardType = {
        name: string
    }
    const [dashboarditems, setDashboardItems] = useState<DashboardType[]>([])
    const fetchDashboardData = async () => {
        // הוספת השהיה של 2 שניות (2000 מילישניות)
        setTimeout(async () => {
            const response = await GetDashboard();
            if (response.success) {
                setLoading(false);
                setDashboardItems(response.data.dashboards)
                console.log(response.data);
            } else {
                alert("ERROR: " + response.error);
            }
        }, 2000);
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <img src={loadinganimation} alt="Loading..." />
            </div>
        );
    }
    
    return (
        <div>
            <span>{dashboarditems.map((item) => item.name)}</span>

        </div>
    );
};
