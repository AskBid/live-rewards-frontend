export function addAddrToLocalStorage(epoch_stake) {
	let array_addr_ids = JSON.parse(localStorage.getItem('addrs'))
	array_addr_ids = array_addr_ids ? 
		[...array_addr_ids, epoch_stake.stake_address.id] : 
		[epoch_stake.stake_address.id]
  localStorage.setItem('addrs', JSON.stringify(array_addr_ids));
}

export function getAddrFromLocalStorage() {
	const addrs = JSON.parse(localStorage.getItem('addrs')) 
	return addrs ? addrs : []
}

export function deleteAddrFromLocalStorage(addr_id) {
	let addrs = JSON.parse(localStorage.getItem('addrs'))
	localStorage.setItem('addrs', JSON.stringify(addrs.filter(id => id != addr_id)));
}

export function addPoolToLocalStorage(pool_hash_id) {
	let pool_hash_ids = JSON.parse(localStorage.getItem('pools'))
	pool_hash_ids = pool_hash_ids ? [...pool_hash_ids, pool_hash_id] : [pool_hash_id]
  localStorage.setItem('pools', JSON.stringify(pool_hash_ids));
}

// export function getPoolsFromLocalStorage() {
// 	const pools = JSON.parse(localStorage.getItem('pools')) 
// 	return addrs ? addrs : []
// }

export function deletePoolFromLocalStorage(pool_hash_id) {
	let pool_hash_ids = JSON.parse(localStorage.getItem('pools'))
	localStorage.setItem('pools', JSON.stringify(pool_hash_ids.filter(id => id != pool_hash_id)));
}
