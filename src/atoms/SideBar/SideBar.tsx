import { DashboardType } from '@/types'
import './SideBar.css'
import dashboardicon from '@/assets/images/sidebaricons/dashboard.svg'
import home from '@/assets/images/sidebaricons/home.svg'
import mywork from '@/assets/images/sidebaricons/mywork.svg'
import more from '@/assets/images/sidebaricons/more.svg';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CreateDashboard, DeleteDashboard } from '@/services/DashboardService'
import { useLoading } from '@/context/LoadingProvider'
type SideBarProps = {
    dashboards: DashboardType[];
    current?: string;
}
export const SideBar = ({dashboards, current} : SideBarProps) => {
    const items = [{name: 'Home', icon: home}, {name: 'My Work', icon: mywork}, {name: 'More', icon: more}]
    const [addItemViewBox, setAddItemViewBox] = useState(false);
    const [additemError, setAddItemError] = useState('')
    const [addItemInput, setAddItemInput] = useState('');
    const {setLoading} = useLoading();
    const  navigate = useNavigate();

    const addItem = async () => {
        setLoading(true);
        const response = await CreateDashboard(addItemInput);
        if(response.success){
            navigate(`/dashboard/${addItemInput}`)
            setAddItemViewBox(false);
        }
        //@ts-ignore
        else if(response.error?.error) setAddItemError(String(response.error.error))
        setLoading(false);
    }

    const RemoveDashboard = async (item: string) => {
        setLoading(true);
        const response = await DeleteDashboard(item);
        if(response.success){
                navigate(`/dashboard/${dashboards[0].name}`)
            setAddItemViewBox(false);
        }
        //@ts-ignore
        else if(response.error?.error) console.log(String(response.error.error))
        setLoading(false);
    }
    return(
        <div className="sidebar-container">
                    {addItemViewBox && <div className="add-item-container"><span>Add Item</span>
                    <input value={addItemInput} onChange={(e) => setAddItemInput(e.target.value)}placeholder='Enter dashboard Name'/>
                    <span className="error">{additemError}</span>
                    <button onClick={addItem}>Add Item</button>
                    </div>}
            <div className="sidebar-white-container">
                <div className="text-container">
            {items.map((item) => (
                <div className="items">
                    <img src={item.icon}/>
                    <span>{item.name}</span>
                </div>
            ))}
            <h6>Favorites - not Develop yet</h6>
            <div className="workspaces">
                <h6 style={{margin:'1vh'}}>Workspaces</h6>
                <h4 onClick={() => {setAddItemViewBox(!addItemViewBox)}}>+</h4>
                </div>
            {dashboards.map((item) => 
            (
                <div 
                className="dashboard-item" 
                onClick={() => navigate(`../../dashboard/${item.name}`)} 
                style={{ backgroundColor: current === item.name ? '#cce5ff' : '' }}
                >
                <div className="dashboard-content">
                    <img src={dashboardicon} />
                    <span>{item.name}</span>
                </div>
                <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
                    <span onClick={() => {RemoveDashboard(item.name)}} style={{fontSize:'25px', }}className="delete-item">-</span>
                </div>
                </div>
            ))}
            </div>
            </div>
        </div>
    )
}