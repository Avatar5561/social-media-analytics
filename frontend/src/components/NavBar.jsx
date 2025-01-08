import React from 'react'

const Navbar = () => {
  return (
    <div className='py-6 border-b h-20 flex justify-evenly items-center  text-white'>
        {/* <img src="./robot.png" alt="" srcset="" /> */}
        <img className='size-28' src="./giphy.gif" alt="" srcset="" />
        <h1 class="text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-xl tracking-wide">
            SOCIAL MEDIA PERFORMANCE ANALYSIS
        </h1>
    </div>
  )
}

export default Navbar