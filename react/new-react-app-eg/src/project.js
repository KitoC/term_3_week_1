import React, { Component } from 'react';


const Project = (props) => {

        return (

            <div>
                {props.arr.map(function(proj){
                    return (<div>
                                <h3>{proj.title}</h3>
                                <p>{proj.description}</p>
                                <a href={proj.link}>LINK TO PROJECT</a>
                            </div>)
                })}
            </div>
        )
    
}
export { Project} ;