interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = (props: ContentProps) =>
  props.parts.map(part =>
    <p key={part.name}>
      {part.name} {part.exerciseCount}
    </p>
  );


export default Content;
