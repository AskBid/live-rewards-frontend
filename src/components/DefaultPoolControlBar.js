import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router-dom";

const DefaultPoolControlBar = ({match}) => {
  const { username, epoch_stake_id } = match.params
  
  return (
    <React.Fragment>
      <Link to={`/pool-compare/users/${username}/epoch_stakes/${epoch_stake_id}/pools/new`}>
        <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
          Add Pool to Compare
        </button>
      </Link>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        ₳
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        $
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        €
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        £
      </button>
      <button className='buttonsbar border-0 text-nowrap rounded ml-1 mr-1 mb-0 w-auto' type='Submit'>
        ¥
      </button>
    </React.Fragment>
  )
}

export default withRouter(DefaultPoolControlBar)