export interface Task {
  id: number;
  title: string;
  category: 'Work' | 'Personal';
  completed: boolean;
}
