import { VscChevronLeft } from 'react-icons/vsc';
import './GoogleMeetingFeature.css'
import React, { useEffect, useState } from 'react'
import logo from '@/assets/images/headericons/mondayicon.png';
import dragfiles from '@/assets/images/dragfiles.png'
import loadinga from '@/assets/animations/simpleloader.svg'
import { AnalyzeFile } from '@/services/UploadFileService';
import { DashboardType, Newtask } from '@/types';
import { EditableCell } from '../EditableCell/EditableCell';

type GoogleMeetingProps = {
    isClick: boolean;
    onChange: (view: boolean) => void;
    dashboards: DashboardType[];
}
export const GoogleMeetingFeature = ({isClick, onChange, dashboards}: GoogleMeetingProps) => {

    const [stage, setStage] = useState(0);
    const steps = ['Download your google meeting Summary.', 'Drag your summary to the this web', 'Make correction if needed', 'Save a lot of time of writing tasks']
   const [file, setFile] = useState<File | null>(null);
   const [loading, setLoading] = useState(false);
   const [newTasks, setNewTasks] = useState<Newtask[]>([])
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        setFile(file);
    } else {
        alert("Only TXT files are allowed.");
    }
};

const deleteItem = (row: number, groupId: string, dashboardId: string) => {
  setNewTasks(prevNewTasks => {
    return prevNewTasks.map(taskGroup => {
      if (taskGroup.dashboard === dashboardId && taskGroup.group === groupId) {
        const newTasksArr = taskGroup.tasks.filter((_, idx) => idx !== row);
        return {
          ...taskGroup,
          tasks: newTasksArr,
        };
      }
      return taskGroup;
    });
  });
};

const updateItem = (newValue: string, dashboardId: string, groupId: string, rowIndex: number, key: string) => {
  setNewTasks(prevNewTasks => {
    return prevNewTasks.map(taskGroup => {
      if (taskGroup.dashboard === dashboardId && taskGroup.group === groupId) {
        // מעדכן את המשימה המתאימה ב-taskGroup.tasks
        const updatedTasks = taskGroup.tasks.map((task, idx) => {
          if (idx === rowIndex) {
            // מעדכן את הערך בתוך item לפי key
            const updatedItem = task.item.map(({ key: k, value }) => {
              if (k === key) {
                return { key: k, value: newValue };
              }
              return { key: k, value };
            });
            return { ...task, item: updatedItem };
          }
          return task;
        });
        return { ...taskGroup, tasks: updatedTasks };
      }
      return taskGroup;
    });
  });
};

const UpdateDashboards = () => {
    // should merge the items and save it. work later
}
const BuildADashboard = (dashboardId: string, groupId: string) => {
  const dashboard = dashboards.find(d => d.dashboardId === dashboardId);
  if (!dashboard) return null;

  const defines = dashboard.defines;

  const relevantTaskGroup = newTasks.find(
    task => task.dashboard === dashboardId && task.group === groupId
  );
  if (!relevantTaskGroup) return null;

  return (
    <div className="table-wrapper">
    <table className="feature-dashboard">
      <thead>
        <tr className="column-title">
            <th></th>
          {defines.map((define, index) => (
              <th style={{width:define.type === 'text' ? '20vw' : ''}}key={index}>{define.title}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {relevantTaskGroup.tasks.map((task, rowIndex) => {
            const itemMap: Record<string, string> = {};
            task.item.forEach(({ key, value }) => {
                itemMap[key as string] = value as string;
            });
            
            return (
                <tr key={rowIndex}>
                    <td className="delete-row" onClick={() => {deleteItem(rowIndex, groupId, dashboardId)}}>Delete</td>
              {defines.map((define, colIndex) => (
                  <td key={colIndex}>
                  <EditableCell value={itemMap[define.key]} type={define.type} onChange={(newValue) => updateItem(newValue, dashboardId, groupId, rowIndex, define.key) }/>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

const GetDashboardPropeties= (dashboardId: String, groupId: String, index: number) => {
    const dashboard= dashboards.find((item) => item.dashboardId === dashboardId);
    const group = dashboard?.groups.find((item) => item.id === groupId)
    return (
    <div className='Feature-Dashboard-Propeties'>
        <span className='dashboard'>{dashboard?.name}</span>
        <span className="group" style={{color:group?.color}}>{group?.name || "dashboard not found"}</span>
        {BuildADashboard(newTasks[index].dashboard, newTasks[index].group)}
    </div>)

}
const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && ( file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        setFile(file);
    } else {
        alert("Only TXT files are allowed.");
    }
};

useEffect(() => {
    const UploadFile = async () => {

        if(file != null){
            setLoading(true);
            const response = await AnalyzeFile(file);
            if(response.success){
                setNewTasks(response.data.message)
                console.log(response.data.message)
                setStage(2);
            }
            setLoading(false);
        }
    }
    UploadFile();
}, [file])

        return (
        <div className="gmf">
            <div className="gmf-black-container"/>
            <div className='gmf-white-container'>
                {loading ? (
                    <div className="loading-container">
                        <img src={loadinga} alt="Loading..." />
                    </div>
                ) : (
                    <>
                        <div className="relative-header-line">
                            <img src={logo}/>
                            <VscChevronLeft className="icon"  onClick={()=> {onChange(false)}}size={40}/>
                        </div>
                        {stage == 0 && <div className="stage-zero-container">
                            <span className="title">Welcome to <b>monday.com</b> Google Metting’s Feature</span>
                            <iframe
                                className="youtube-iframe"
                                src="https://www.youtube.com/embed/fAj9MVkPDas?si=J1hpOxtYlnadIfuF"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen              
                            />                        
                            <div className="stage-zero-bottom">
                                <button onClick={() => {setStage(1)}}><span>Let's Start</span></button>
                                <a href="https://www.figma.com/design/AbDF5T3vgfXVsMd8IUOxpT/Untitled?node-id=1-76&t=Wlq8nwpVQSLFv3lC-0">Check for UI Figma</a>
                            </div>
                        </div>}

                        {stage === 1 && <div className="stage-one-container">
                            <span className="title">follow those Step’s to improve your team productivity!</span>                        
                            <div className="stage-one-article">
                                <div className="itemss">
                                    {steps.map((item, idx) => 
                                        <div style={{flexDirection:'row', display:'flex', gap:'2vh'}} key={idx}>
                                            <span className="bubble">{idx + 1}</span>
                                            <span className="step">{item}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="dragfiles"
                                    onClick={() => document.getElementById('hiddenFileInput')?.click()}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleFileDrop(e)}
                                >
                                    <input
                                        id="hiddenFileInput"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileUpload(e)}
                                    />
                                    <img src={dragfiles} />
                                    <span>Drag your files here</span>
                                </div>
                            </div>
                        </div>}
                    {stage === 2 && <div className="stage-one-container">
                        {newTasks.length > 0 ? <span className='title'>New tasks were detected</span> : <span className='title'>There's no new tasks</span>}
                        {newTasks.length > 0 && 
                        <div className="feature-dashboard-view">
                            {newTasks.map((item, idx) => GetDashboardPropeties(newTasks[idx].dashboard, newTasks[idx]?.group, idx))}
                            
                            
                            <button onClick={UpdateDashboards}><span>Save Change</span></button>
                            </div>
                        }
                        </div>
                        }
                        </>
                )}
            </div>
        </div>
    )
}
