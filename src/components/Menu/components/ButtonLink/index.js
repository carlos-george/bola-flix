import  React from 'react';

const ButTonLink = (props) => {
    return (
        <a className={props.className} href={props.href}>
            {props.children}
        </a>
    );
}

export default ButTonLink;