import { DataContext, usedata } from "../DataContext";
const test = () => {
  const { data, setData } = usedata(DataContext);
  return <div>hello guys</div>;
};

export default test;
