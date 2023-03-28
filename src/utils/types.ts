export interface ITagEntity {
  id?: string;
  name: string;
  color: string;
}

export interface ITaskEntity {
  title: string;
  location?: string;
  destDate: Date;
  time: string;
  desc?: string;
  priority?: number;
  tag?: ITagEntity;
}
