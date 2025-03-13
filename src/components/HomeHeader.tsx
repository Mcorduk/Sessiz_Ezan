export interface IHomeHeaderProps {
  city: string;
  currentDegree: number;
  description: string;
  high: number;
  low: number;
}

export default function HomeHeader({
  city,
  currentDegree,
  description,
  high,
  low,
}: IHomeHeaderProps) {
  return (
    <div className="flex flex-col max-w-fit mx-auto mb-6 text-xl">
      <h2 className="text-4xl font-normal">{city}</h2>
      <h1 className="text-8xl font-light">{currentDegree}°</h1>
      <p className=" text-2xl font-light ">{description}</p>
      <div className="flex justify-around">
        <p>L: {low}°</p>
        <p>H: {high}°</p>
      </div>
    </div>
  );
}
