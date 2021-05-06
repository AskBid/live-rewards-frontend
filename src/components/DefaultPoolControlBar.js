// import React from 'react'
// import { Link } from 'react-router-dom'
// import { withRouter } from "react-router-dom";
// import CurrencySelector from './CurrencySelector'

// const DefaultPoolControlBar = ({match}) => {
//   const { username, epoch_stake_id } = match.params
  
//   return (
//     <React.Fragment>
//       <Link to={`/live-rewards`}>
//         <button className='buttonsbar shadow-sm border-0 text-nowrap rounded m-1 w-auto' alt='Go Back'>
//           ⟵
//         </button>
//       </Link>
//       <Link to={`/pool-compare/users/${username}/epoch_stakes/${epoch_stake_id}/pools/new`}>
//         <button className='buttonsbar shadow-sm border-0 text-nowrap rounded m-1 w-auto'>
//           Add Pool to Compare
//         </button>
//       </Link>
//       <CurrencySelector/>
//     </React.Fragment>
//   )
// }

// export default withRouter(DefaultPoolControlBar)