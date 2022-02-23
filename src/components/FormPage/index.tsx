import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export const FormPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="latitude"
                  required
                  fullWidth
                  id="latitude"
                  label="Latitude"
                  type="number"
                  autoComplete="latitude"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="longitude"
                  label="Longitude"
                  name="longitude"
                  type="number"
                  autoComplete="longitude"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="region"
                  label="Region"
                  name="region"
                  type="number"
                  autoComplete="region"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="building_type"
                  label="Building type"
                  id="building_type"
                  type="number"
                  autoComplete="building_type"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="object_type"
                  label="Object type"
                  id="object_type"
                  type="number"
                  autoComplete="object_type"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="level"
                  label="Level"
                  id="level"
                  type="number"
                  autoComplete="level"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="levels"
                  label="Levels"
                  id="levels"
                  type="number"
                  autoComplete="levels"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="rooms"
                  label="Rooms"
                  id="rooms"
                  type="number"
                  autoComplete="rooms"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="area"
                  label="Area"
                  id="area"
                  type="number"
                  autoComplete="area"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m^2</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="kitchen_area"
                  label="Kitchen area"
                  id="kitchen_area"
                  type="number"
                  autoComplete="kitchen_area"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m^2</InputAdornment>,
                  }}
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
      </Container>
    </ThemeProvider>
  );
}
