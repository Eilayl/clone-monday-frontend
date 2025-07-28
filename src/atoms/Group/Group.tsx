import { DashboardType, GroupType } from "@/types"
import './Group.css'

type GroupProps = {
  group: GroupType;
  dashboard: DashboardType;
}

const formatValue = (value: string | Date | null, type: string): string => {
  if (value == null) return '-';

  if (type === 'date') {
    const dateObj = value instanceof Date ? value : new Date(value);
    return dateObj.toLocaleDateString();
  }

  // ערך שהוא כבר מחרוזת, מחזירים כפי שהוא
  return value.toString();
}

export const Group = ({ group, dashboard }: GroupProps) => {
  return (
    <div className="group-container">
      <span className="title" style={{ color: `${group.color}` }}>{group.name}</span>
      <table>
        <thead>
          <tr>
            {dashboard.defines.map((def) => (
              <td><input key={def.key} className="column-title" value={def.key}/></td>   
            ))}
            <td className="last">+</td>
          </tr>
        </thead>
        <tbody>
          {group.items.map((item, idx) => (
            <tr key={idx}>
              {dashboard.defines.map((def) => (
                <td key={def.key}>
                  {formatValue(item[def.key], def.type)}
                </td>
              ))}
              <td className="last"></td>
            </tr>
          ))}
            <tr>
                <td colSpan={dashboard.defines.length + 1} className="add-task-row">
                <input placeholder="+ Add Task"/>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}
