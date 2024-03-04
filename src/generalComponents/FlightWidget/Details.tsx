interface DetailsProps {
  title: string;
  value: string;
}
const Details = ({ title, value }: DetailsProps) => {
  return (
    <div className="mb-3">
      <div className=" text-gray text-sm font-semibold mb-1">{title}</div>
      <div className=" text-blue font-bold text-xl">{value}</div>
    </div>
  );
};

export default Details;
