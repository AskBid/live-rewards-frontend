export function addAddrToLocalStorage(epoch_stake) {
	let array_addr_ids = JSON.parse(localStorage.getItem('addrs'))
	array_addr_ids = array_addr_ids ? 
		[...array_addr_ids, epoch_stake.stake_address.id] : 
		[epoch_stake.stake_address.id]
  localStorage.setItem('addrs', JSON.stringify(array_addr_ids));
}

// let localStoragePools = user ? undefined : JSON.parse(localStorage.getItem('pools'));
// let localStorageAddrs = user ? undefined : JSON.parse(localStorage.getItem('addrs'));