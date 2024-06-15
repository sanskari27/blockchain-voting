export function HomeNavbar() {
	return (
		<nav className='navbar h-[60px] text-white'>
			<div className='flex items-center px-4 h-full'>
				<div className='w-full h-full flex justify-between  items-center '>
					<a href='/' className='font-extrabold text-2xl tracking-wider'>
						<span className='text-primary-purple'>Block</span>
						<span className='text-primary-blue  ml-2'>Vote</span>
					</a>
					<div>
						<ul className='flex gap-9 items-center'>
							<li className={` cursor-pointer font-medium `}>
								<a href='#news'>News</a>
							</li>
							<a href='/login'>
								<li
									className={` cursor-pointer font-medium w-[150px]   bg-gradient-to-r from-primary-blue to-primary-purple rounded-full inline-flex justify-center text-white `}
								>
									<span className='my-2'>Login</span>
								</li>
							</a>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}
export function AdminNavbar() {
	return (
		<nav className='navbar h-[60px] text-white'>
			<div className='flex items-center px-4 h-full'>
				<div className='w-full h-full flex justify-between  items-center '>
					<a href='/' className='font-extrabold text-2xl tracking-wider'>
						<span className='text-primary-purple'>Block</span>
						<span className='text-primary-blue  ml-2'>Vote</span>
					</a>
					<div>
						<ul className='flex gap-9 items-center'>
							<a href='/logout'>
								<li
									className={` cursor-pointer font-medium w-[150px]   bg-gradient-to-r from-primary-blue to-primary-purple rounded-full inline-flex justify-center text-white `}
								>
									<span className='my-2'>Logout</span>
								</li>
							</a>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}
