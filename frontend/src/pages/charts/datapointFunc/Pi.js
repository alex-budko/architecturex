import { NumberInputArch } from "../components/NumberInputArch";
import { StringInputArch } from "../components/StringInputArch";

const Pi = () => {
  return (
    <>
      <StringInputArch name={"name"} />
      <NumberInputArch name={"count"} />
    </>
  );
};

export default Pi;
