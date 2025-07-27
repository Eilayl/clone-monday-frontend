
import { useEffect, useState } from "react"
import './SetUpDashboard.css'
import { useScreenWidth } from "@/context/ScreenSizesProvider";
export type SetUpDashboard = {
    onChange: (value: String) => void;
}

export const SetUpDashboard = ({onChange}: SetUpDashboard) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        onChange(value)
    }, [value])
    return(
        <div className="setupdashboard-container">
        <span className="title">Let's start working together</span>
        <span className="subtitle">Give your board a name, e.g. marketing plan, sales pipeline, quarterly roadmap...</span>
        <input placeholder="My first project" value={value} onChange={e => {setValue(e.target.value)}}/>
        <div className="gray-background"><span className="subtitle">In monday.com, "boards" are the place where all your content lives.</span></div>
        </div>
    )
}