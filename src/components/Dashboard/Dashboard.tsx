import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import loadinganimation from '@/assets/animations/simpleloader.svg';
import { GetDashboards } from '@/services/DashboardService';
import { LoggedHeader } from '@/atoms/LoggedHeader/LoggedHeader';
import { SideBar } from '@/atoms/SideBar/SideBar';
import { DashboardType } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import search from '@/assets/images/headericons/search.svg';
import { useScreenWidth } from '@/context/ScreenSizesProvider';
import { Group } from '@/atoms/Group/Group';
import { useLoading } from '@/context/LoadingProvider';
import { DiamondIcon } from '@/assets/images/headericons/diamond';
import { GoogleMeetingFeature } from '@/atoms/GoogleMeetingFeature/GoogleMeetingFeature';

export const Dashboard = () => {
    const {dashboard} = useParams();
    const [featureView, setFeatureView] = useState(false);
    const {loading, setLoading} = useLoading();
    const [dashboarditems, setDashboardItems] = useState<DashboardType[]>([])
    const [currentDashboard, setCurrentDashboard] = useState<DashboardType | null>(null);
    
    const isMobile = useScreenWidth() < 1300 ? true : false 
    const navigate = useNavigate();

    const fetchDashboardData = async () => {
            setLoading(true);
            const response = await GetDashboards();
            if (response.success) {
                setLoading(false);
                const dashboards = response.data.dashboards
                setDashboardItems(dashboards)
                const found = dashboards.find((item: DashboardType) => item.name === dashboard);
                if(found) setCurrentDashboard(found)
                    else {
                navigate(`/dashboard/${dashboards[0].name}`)
                setCurrentDashboard(dashboards[0])        
            }
                console.log(response.data);
            } else {
                alert("ERROR: " + response.error);
            }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [dashboard]);

    if (loading) {
        return (
            <div className="loading">
                <img src={loadinganimation} alt="Loading..." />
            </div>
        );
    }
    if (!isMobile){
        return (
            <div className='dashboard-container'>
            <LoggedHeader/>
            <div className="horizontal-homepage">
            <SideBar dashboards={dashboarditems} current={currentDashboard?.name}/>
            <div className="dashboard-dashboard">
            <span className="title">{currentDashboard?.name}</span>
            <div className='dashboard-tools'>
                <button>New task</button>
                <div className="item">
                    <img src={search}/>
                    <span>Search</span>
                    </div>
                <div className="item">
                    <DiamondIcon className="diamond"/>
                    <span onClick={() => {setFeatureView(!featureView)}}><b><u>new Feature</u></b></span>
                </div>
            </div>
            {currentDashboard?.groups.map((group) => <Group group={group} dashboard={currentDashboard}/>)}
            <div onClick={() => {alert("Not Develops yet")}} className="add-new-group">
                <span>+ Add New Group</span>
                </div>
                {featureView && <GoogleMeetingFeature dashboards={dashboarditems}isClick={featureView} onChange={(isClose) => {setFeatureView(isClose)}}/>}
            </div>
            </div>
        </div>
    );
    }
    else return(
        <div><h1>Please log in through your PC</h1></div>
    )
};


