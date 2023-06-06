interface IProps {
  task: ITask;
}

const Task: React.FC<IProps> = (props) => {
  const { task } = props;

  return (
    <div style={{ margin: "5px", borderColor: "black", borderWidth: "1px" }}>
      <text>{task.title}</text>
      <text>{task.description}</text>
      <text>{task.location}</text>
      <text>{task.estTime}</text>
      <text>{task.assignment?.toLocaleString()}</text>
    </div>
  );
};

export default Task;
