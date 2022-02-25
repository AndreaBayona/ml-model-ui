import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {predictPrice} from "../../services";


const theme = createTheme();

const getNumberFromInput = (data: any, input: string) => Number.parseFloat(data.get(input)!.toString())

const defaultInputProps = {
  inputProps: {step: "any"},
  required: true,
  fullWidth: true
}

export const FormPage: React.FC = () => {
  const [price, setPrice] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = {
      latitude: getNumberFromInput(data, 'latitude'),
      longitude: getNumberFromInput(data,'longitude'),
      region: getNumberFromInput(data,'region'),
      building_type: getNumberFromInput(data,'building_type'),
      object_type: getNumberFromInput(data,'object_type'),
      level: getNumberFromInput(data, 'level'),
      levels: getNumberFromInput(data, 'levels'),
      rooms: getNumberFromInput(data,'rooms'),
      area: getNumberFromInput(data,'area'),
      kitchen_area: getNumberFromInput(data, 'kitchen_area')
    };

    try {
      setLoading(true);
      const res = await predictPrice(params);
      console.log(res.response)
      setPrice(res.response)
      setLoading(false);
    }
    catch (e) {
      console.error(e)
      setLoading(false);
      setPrice("Error processing the request");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Set up model variables
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="latitude"
                  id="latitude"
                  label="Latitude"
                  type="number"
                  autoComplete="latitude"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="longitude"
                  label="Longitude"
                  name="longitude"
                  type="number"
                  autoComplete="longitude"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="region"
                  label="Region"
                  name="region"
                  type="number"
                  autoComplete="region"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="building_type"
                  label="Building type"
                  id="building_type"
                  type="number"
                  autoComplete="building_type"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="object_type"
                  label="Object type"
                  id="object_type"
                  type="number"
                  autoComplete="object_type"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="level"
                  label="Level"
                  id="level"
                  type="number"
                  autoComplete="level"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="levels"
                  label="Levels"
                  id="levels"
                  type="number"
                  autoComplete="levels"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="rooms"
                  label="Rooms"
                  id="rooms"
                  type="number"
                  autoComplete="rooms"
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="area"
                  label="Area"
                  id="area"
                  type="number"
                  autoComplete="area"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m^2</InputAdornment>,
                  }}
                  {...defaultInputProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="kitchen_area"
                  label="Kitchen area"
                  id="kitchen_area"
                  type="number"
                  autoComplete="kitchen_area"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m^2</InputAdornment>,
                  }}
                  {...defaultInputProps}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Predict
            </Button>
          </Box>
        </Box>
        <br/>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LightbulbIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Predicted price (ruble)
          </Typography>
          { price &&
            <Typography component="div" variant="h6">
              {price}
            </Typography> }
          { loading && <CircularProgress /> }
        </Box>
      </Container>
    </ThemeProvider>
  );
}
