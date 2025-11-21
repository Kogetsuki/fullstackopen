import type { Diagnosis, Entry } from "../../../types";


interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const Entry = ({ entry, diagnoses }: Props) => {
  const getDiagnosis = (code: string): Diagnosis | undefined =>
    diagnoses.find(d => d.code === code);


  return (
    <div key={entry.id}>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>
            {code} {getDiagnosis(code)?.name}
          </li>
        )}
      </ul>
    </div>
  );
};


export default Entry;