import type { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';


interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}


const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  const getDiagnosis = (code: string): Diagnosis | undefined =>
    diagnoses.find(d => d.code === code);


  return (
    <Card variant='outlined' sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant='h6'>
          {entry.date} <WorkIcon />
        </Typography>

        <Typography>
          <i>{entry.description}</i>
        </Typography>

        <List>
          {entry.diagnosisCodes?.map(code =>
            <ListItem key={code}>
              {getDiagnosis(code)?.name}
            </ListItem>
          )}
        </List>

        <Typography>
          Diagnose by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};


export default OccupationalHealthcareEntry;