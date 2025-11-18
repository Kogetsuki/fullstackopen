import type { CoursePart } from "../types";

const Part = (props: CoursePart) => {
  const header = (
    <p>
      <strong>
        {props.name} {props.exerciseCount}
      </strong>
    </p>
  );


  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };


  switch (props.kind) {
    case 'basic':
      return (
        <>
          {header}
          <p><i>{props.description}</i></p>
        </>
      );

    case 'group':
      return (
        <>
          {header}
          <p>Group projects: {props.groupProjectCount}</p>
        </>
      );

    case 'background':
      return (
        <>
          {header}
          <p><i>{props.description}</i></p>
          <p>Background material: {props.backgroundMaterial}</p>
        </>
      );

    case 'special':
      return (
        <>
          {header}
          <p><i>{props.description}</i></p>
          <p>Requirements: {props.requirements.join(', ')}</p>
        </>
      );

    default:
      return assertNever(props);
  }
};


export default Part;