import React from 'react';
import { link } from 'src/types/About/About';

type LinkProps = {
    link: link;
    classes?: string;
}

const Link = ({ link, classes } :LinkProps) => {
    return (
      <a className={classes} href={link.uRL}>
        {link.label}
        </a>
    );
  };
  
  export default Link;
