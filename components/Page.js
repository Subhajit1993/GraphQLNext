import Grid from '@material-ui/core/Grid';

export default (props)=> {
  return (
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="center"
          className="section-1 common-padding"
      >
          <Grid item xs={12}>
              <h2 className="main-text">
                  Design a standout resume in minutes
              </h2>
          </Grid>
          <Grid item xs={12}>
              <p className="secondary-text">
                  Browse through hundreds of ready-made templates
                  and customize a resume that highlights your unique strengths.
              </p>
          </Grid>
      </Grid>

  )
}
