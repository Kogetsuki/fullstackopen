interface TotalProps {
  parts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Total = (props: TotalProps) => {
  const total = props.parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>
    Number of exercises {total}
  </p>;
};


export default Total;