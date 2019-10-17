import React from 'react';

const Row = ({first, second}) => {
    return(
        <div className="row mb2">
          <div className="col-md-6">
            {first}
          </div>
          <div className="col-md-6">
            {second}  
          </div>
        </div>
    )
}

export default Row;