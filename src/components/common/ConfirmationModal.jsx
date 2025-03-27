import React from 'react';

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className='fixed inset-0 z-50 grid place-items-center'>
      {/* Blurred background */}
      <div className='fixed inset-0 bg-gray-900 bg-opacity-90 backdrop-blur-sm'></div>
      
      {/* Confirmation modal */}
      <div className='relative w-[80%] sm:w-[25%] md:w-[40%] lg:w-[25%] mx-auto'>
        <div className='bg-richblack-900 border border-richblack-100 border-opacity-30 rounded-lg p-6 space-y-6 shadow-lg'>
          <div className='text-center'>
            <p className='text-xl sm:text-xl font-bold text-white mb-2'>{modalData.text1}</p>
            <p className='text-sm sm:text-base text-richblack-50'>{modalData.text2}</p>
          </div>
          <div className='flex flex-row justify-center gap-3'>
            <button 
              onClick={modalData?.btn1Handler} 
              className='bg-yellow-50 hover:bg-yellow-100 transition-colors text-black font-bold py-2 px-4 rounded-md'
            >
              {modalData?.btn1Text}
            </button>
          
            <button 
              onClick={modalData?.btn2Handler} 
              className='bg-richblack-200 hover:bg-richblack-300 transition-colors text-black font-bold py-2 px-4 rounded-md'
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;