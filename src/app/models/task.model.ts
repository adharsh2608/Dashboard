export interface Task {
  title: string;
  dueDate: string;
  status: string;
  tags?: string[];
  priority?: 'High' | 'Medium' | 'Low';
}
