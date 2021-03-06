import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface PageNavProps {
  setAlbumPage: Function,
  page: number,
}

const useStyles = makeStyles({
  root: {
    '& Button': {
      margin: '0 1px',
    }
  }
})

const PagesNav: FC<PageNavProps> = (props) => {

  const { page, setAlbumPage } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary"
        onClick={() => setAlbumPage(page)}
      >{page}</Button>
    </div>
  )
}

export default PagesNav;