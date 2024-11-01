import React from 'react'
import Uploadfile from './Uploadfile'

const FormProduct = () => {
    
  return (
    <div>
      <form>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input className='border' placeholder='Name' />
        <input className='border' placeholder='Description' />
        <input className='border' placeholder='Price' />
        <input className='border' placeholder='Quantity' />
        <select className='border' name="CategoryId">
            <option value="" disabled>
                please Select
            </option>
            <option value="">
                name
            </option>
        </select>
        <hr />
        {/* upload file */}
        <Uploadfile />

        <button className='bg-blue-500 p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'>
            เพิ่มสินค้า
        </button>

        <hr />
        <br />
        <table className='table w-full border'>
            <thead>
                <tr className='bg-gray-200 border'>
                    <th scope='col'>No.</th>
                    <th scope='col'>รูปภาพ</th>
                    <th scope='col'>ชื่อสินค้า</th>
                    <th scope='col'>รายละเอียด</th>
                    <th scope='col'>ราคา</th>
                    <th scope='col'>จำนวน</th>
                    <th scope='col'>จำนวนที่ขายได้</th>
                    <th scope='col'>วันที่สร้าง</th>
                    <th scope='col'>วันที่อัพเดต</th>
                    <th scope='col'>จัดการ</th>
                </tr>
            </thead>
            <tbody>

          </tbody>
            
        </table>
      </form>
    </div>
  )
}

export default FormProduct