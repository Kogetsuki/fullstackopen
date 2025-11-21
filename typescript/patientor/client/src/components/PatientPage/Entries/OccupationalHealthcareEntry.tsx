import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

import type { OccupationalHealthcareEntry } from "../../../types";
import { getDiagnosis } from "../../../selectors/diagnoseSelectors";


interface Props {
  entry: OccupationalHealthcareEntry;
}


const OccupationalHealthcareEntry = ({ entry }: Props) => {

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