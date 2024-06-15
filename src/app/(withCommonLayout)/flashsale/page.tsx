"use client"
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material/Select';
const FlashSaleProducts = async () => {
  const res = await fetch('http://localhost:5000/flash-products', {
    next: {
      revalidate: 30
    }
  });
  const FlashDatas = await res.json();

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
  };


  return (

    <div className='flex ps-4'>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <form action="">
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <p className='mb-2 font-bold'>Select Price Range</p>
              <label htmlFor="">start price</label>
              <input type="text" placeholder="0" className="input input-bordered w-full max-w-xs mb-4" />
              <label htmlFor="">end price</label>
              <input type="text" placeholder="5000" className="input input-bordered w-full max-w-xs mb-4" />

                <select className="select select-bordered w-full max-w-xs mb-4">
                  <option selected>All Products</option>
                  <option>motherboard</option>
                  <option>graphics card</option>
                  <option>powersupply</option>
                  <option>monitor</option>
                  <option>mouse</option>
                  <option>keyboard</option>
                  <option>headphone</option>
                  <option>sdd</option>
                  <option>hdd</option>
                </select>
              <p className='mb-2 font-bold'>Select Rating Range</p>
              <label htmlFor="">start rating</label>
              <input type="text" placeholder="0" className="input input-bordered w-full max-w-xs mb-4" />
              <label htmlFor="">end rating</label>
              <input type="text" placeholder="5" className="input input-bordered w-full max-w-xs mb-4" />
              <Button variant="contained" sx={{ padding: '15px', backgroundColor: 'black', ":hover": {backgroundColor: "black"} }}>Search Products</Button>
            </ul>
          </form>
        </div>
      </div>
      <div className='mt-11'>
        <div className='flex items-center justify-between w-3/4'>
          <div>
            <h1 className='text-3xl mt-4'>Our Collection Of Products</h1>
            <p>Showing {FlashDatas.length} item(s) in the store</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gy-4 md:grid-cols-2 lg:grid-cols-4 w-3/4">
          {
            FlashDatas.map((flashdata: any) => (
              <Link href={`/products/${flashdata._id}`} key={flashdata._id}>
                <div className='rounded-2xl m-4 p-4 transition-all duration-300 hover:scale-105 mt-10'
                >
                  <div style={{ overflow: 'hidden', height: '150px', borderRadius: '10px' }} className=' overflow-hidden relative'>
                    <span className='bg-gray-800 absolute text-gray-100 px-1.5 py-0.5 rounded-2xl top-2 left-2'>-13%</span>
                    <Image src={flashdata.image}
                      width={1200}
                      height={200}
                      className='rounded-2xl'
                      alt="flashsaleimages" />
                  </div>
                  <div className="w-76 mt-4">
                    <h1>{flashdata.name}</h1>
                    <div className='flex justify-between items-center'>
                      <div className='flex gap-2'>
                        <div>${flashdata.regular_price}</div>
                        <div>In stock: {flashdata.stock}</div>
                      </div>
                      <IoMdAddCircleOutline className='size-5 mr-4' />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
        <Pagination count={10} color="primary" className='mt-12' />
      </div>
    </div>

  )
}

export default FlashSaleProducts