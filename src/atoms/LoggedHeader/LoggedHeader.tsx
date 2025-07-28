import bell from '@/assets/images/headericons/bell.svg'
import adduser from '@/assets/images/headericons/adduser.svg'
import cardboard from '@/assets/images/headericons/cardboard.svg'
import { DiamondIcon } from '@/assets/images/headericons/diamond'
import mondayicon from '@/assets/images/headericons/mondayicon.png'
import puzzel from '@/assets/images/headericons/puzzel.svg'
import mondayworkplatformlogo from '@/assets/images/headericons/mondayworkplatformlogo.svg'
import search from '@/assets/images/headericons/search.svg'
import menu from '@/assets/images/headericons/menu.svg'
import questionmark from '@/assets/images/headericons/questionmark.svg'
import usericon from '@/assets/images/headericons/usericon.png'

import './LoggedHeader.css'
export const LoggedHeader = () => {
    return (
        <div className="logged-header-container">
            <div className="left-side">
                <img src={mondayworkplatformlogo}/>
                <span><b>monday</b> work platform</span>
                <div className="see-plans">
                    <DiamondIcon className="diamond"/>
                    <span>See Plans</span>
                </div>
            </div>
            <div className="right-side">
                <img src={bell}/>
                <img src={cardboard}/>
                <img src={adduser}/>
                <img src={puzzel}/>
                <img src={search}/>
                <img src={questionmark}/>
                <span style={{color:'gainsboro'}}>|</span>
                <img src={menu}/>
                <img src={mondayicon}/>
                <img src={usericon} className="user-icon"/>
            </div>
        </div>
    )
}