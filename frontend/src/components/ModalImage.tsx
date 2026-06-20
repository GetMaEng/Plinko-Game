import React from 'react'
import avatar1 from '../images/avatar-1.PNG';
import avatar2 from '../images/avatar-2.PNG';
import avatar3 from '../images/avatar-3.PNG';
import avatar4 from '../images/avatar-4.PNG';
import avatar5 from '../images/avatar-5.PNG';
import avatar6 from '../images/avatar-6.PNG';
import avatar7 from '../images/avatar-7.PNG';

const POKER_IMAGES = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7
];

function ModalImage({setCurrentImg, tempSelectedImg, setIsModalOpen, setTempSelectedImg, currentImg}: any) {

    const handleConfirm = () => {
        setCurrentImg(tempSelectedImg);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setTempSelectedImg(currentImg);
        setIsModalOpen(false);
    };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#0b1824] p-4 sm:p-6 rounded-xl w-full max-w-xs sm:max-w-md shadow-2xl">
            <h3 className="text-lg sm:text-2xl text-[#DCE6F5] font-semibold mb-3 sm:mb-4 text-center">
                Select New Avatar
            </h3>

            {/* Grid of Images */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 max-h-56 sm:max-h-72 bg-[#050F19] overflow-y-auto p-2 avatar-grid">
                {POKER_IMAGES.map((img) => (
                <div
                    key={img}
                    onClick={() => setTempSelectedImg(img)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                    tempSelectedImg === img ? 'border-[#aeff9a50] scale-105' : 'border-transparent'
                    }`}
                >
                    <img src={img} alt={img} className="w-full h-auto" />
                </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                <button
                type='button'
                onClick={handleCancel}
                className="space-grotesk px-4 py-2 w-full text-[#39FE2B] border border-[#39FE2B] bg-[#050F19] hover:font-bold rounded-lg font-medium cursor-pointer text-sm sm:text-base"
                >
                CANCEL
                </button>
                <button
                type='button'
                onClick={handleConfirm}
                className="space-grotesk px-4 py-2 w-full bg-[#39FE2B] hover:bg-[#20df12] text-black rounded-lg font-bold cursor-pointer text-sm sm:text-base"
                >
                CONFIRM SELECTION
                </button>
            </div>
        </div>
    </div>
  )
}

export default ModalImage