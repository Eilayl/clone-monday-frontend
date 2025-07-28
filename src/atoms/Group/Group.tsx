import { DashboardType, GroupType } from "@/types";
import './Group.css';
import { useEffect, useState } from "react";
import { UpdateGroup } from "@/services/TaskService";
import { EditableCell } from "../EditableCell/EditableCell";

type GroupProps = {
  group: GroupType;
  dashboard: DashboardType;
};

export const Group = ({ group, dashboard }: GroupProps) => {
  const [addTask, setTask] = useState('');
  const [groupState, setGroupState] = useState<GroupType>(group);
  const [dashboardState, setDashboardState] = useState<DashboardType>(dashboard);
  const [OpenColumnView, setOpenColumnView ] = useState(false);
  const [type, setType] = useState('')
  const AddNewTask = () => {
    if (addTask.trim() !== '') {
      const updatedGroup = {
        ...groupState,
        items: [...groupState.items, { taskName: addTask }]
      };
      setGroupState(updatedGroup);
      setTask('');
    }
  };

  const DeleteItem = (index: number) => {
    const updatedItems = groupState.items.filter((_, i) => i !== index);
    const updatedGroup = {
      ...groupState,
      items: updatedItems
    };
    setGroupState(updatedGroup);
  };

  const CreateColumn = () => {
    dashboard.defines.push(
      {
            key: crypto.randomUUID(),
            title: type === "Text" ? "Text" : type === "Date" ? "Date" : type === "Status" ? "Status" : '',
            type: type === "Text" ? "text" : type === "Date" ? "date" : type === "Status" ? "status" : 'text',
            required: false
        },)
        setOpenColumnView(false);
    
  }
  const updateColumnTitle = (index: number, newTitle: string) => {
    const updatedDefines = [...dashboardState.defines];
    updatedDefines[index] = {
      ...updatedDefines[index],
      title: newTitle,
    };

    setDashboardState({
      ...dashboardState,
      defines: updatedDefines,
    });
  };

  const updateCellValue = (itemIndex: number, key: string, newValue: string) => {
    const updatedItems = [...groupState.items];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      [key]: newValue,
    };
    setGroupState({
      ...groupState,
      items: updatedItems,
    });
  };

  useEffect(() => {
    const Update = async () => {
      const response = await UpdateGroup({ dashboard: dashboardState, group: groupState, defines: dashboardState.defines });
      // you can handle success/error here if you want
    };
    Update();
  }, [groupState, dashboardState]);

  return (
    <div className="group-container">
      <span className="title" style={{ color: groupState.color }}>
        {groupState.name}
      </span>
      <table>
        <thead>
          <tr>
            <td></td>
            {dashboardState.defines.map((def, index) => (
              <td key={def.key}>
                <EditableCell
                  value={def.title}
                  onChange={(newTitle) => updateColumnTitle(index, newTitle)}
                />
              </td>
            ))}
            <td
              className="last"
              style={{ position: 'relative' }}
              onClick={() => setOpenColumnView(!OpenColumnView)}
            >
              <span>+</span>
              {OpenColumnView && (
                <div className="new-column-view"  onClick={(e) => e.stopPropagation()}>
                  <span className="title">Pick one type</span>
                  <span className="type" style={{backgroundColor:type === 'Status' ? '#cce5ff' : ''}} onClick={() => {setType('Status')}}>Status</span>
                  <span className="type" style={{backgroundColor:type === 'Text' ? '#cce5ff' : ''}}  onClick={() => {setType('Text')}}>Text</span>
                  <span className="type" style={{backgroundColor:type === 'Date' ? '#cce5ff' : ''}}  onClick={() => {setType('Date')}}>Date</span>
                  <button onClick={CreateColumn}>Choose Type</button>
                </div>
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          {groupState.items.map((item, idx) => (
            <tr key={idx}>
              <td onClick={() => DeleteItem(idx)}>
                <b>Delete</b>
              </td>
              {dashboardState.defines.map((def) => (
                <td key={def.key}>
                  <EditableCell
                    value={String(item[def.key]) ?? "" }
                    onChange={(newVal) => updateCellValue(idx, def.key, newVal)}
                    type={String(def.type)}
                  />
                </td>
              ))}
              <td className="last"></td>
            </tr>
          ))}
          <tr>
            <td></td> {/* Empty for checkbox column */}
            <td colSpan={dashboardState.defines.length + 1} className="add-task-row">
              <input
                value={addTask}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") AddNewTask();
                }}
                onBlur={AddNewTask}
                placeholder="+ Add Task"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
