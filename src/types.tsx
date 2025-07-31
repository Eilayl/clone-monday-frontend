export type SignUpField ={
    name: String,
    password: String,
    phone: String
}

export type SignUpFieldsRef = {
  CheckFields: () => boolean;
};

export type SurveyType = {
  question: string;
  answer: string;
};

export type Task = {
  [key: string]: string | Date | null;
};

// סוג של Group
export type GroupType = {
  id: string;
  name: string;
  color?: string;
  items: Task[];
};

// סוג של Dashboard
export type DashboardType = {
  dashboardId: string;
  userId: string;
  name: string;  // כאן - פשוט מחרוזת חופשית
  defines: Define[];
  groups: GroupType[];
  createdAt: string; 
  updatedAt: string;
};

export type Define = {
  key: string;
  title: string;
  type: 'text' | 'date' | 'user' | 'status' | 'file' | 'timeline' | string;
  required: boolean;
};

export type Newtask = {
  dashboard: string,
  group: string,
  tasks:{
    item: {key: String, value: String}[]
  }[]
  
}