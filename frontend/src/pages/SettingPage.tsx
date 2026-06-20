import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { IconUserCircle, IconPencil, IconShieldCheckeredFilled, IconArrowNarrowRight } from "@tabler/icons-react";
import ModalImage from "../components/ModalImage";
import ToggleSwitch from '../components/ToggleSwitch';
import * as userApi from '../api/user'

import avatar1 from '../images/avatar-1.PNG';
import avatar2 from '../images/avatar-2.PNG';
import avatar3 from '../images/avatar-3.PNG';
import avatar4 from '../images/avatar-4.PNG';
import avatar5 from '../images/avatar-5.PNG';
import avatar6 from '../images/avatar-6.PNG';
import avatar7 from '../images/avatar-7.PNG';
import { Navigate } from 'react-router-dom';

const POKER_IMAGES = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];

function SettingPage() {

  const token = localStorage.getItem('token') // or however you store auth

  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  const userId = (Number(localStorage.getItem("userId")));
  
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [message, setMessage]   = useState<{ text: string; ok: boolean } | null>(null)

  // ── Committed (saved) values ─────────────────────────────────
  const [savedUsername, setSavedUsername] = useState('')
  const [savedEmail, setSavedEmail]       = useState('')
  const [savedImg, setSavedImg]           = useState('')

  // ── Draft values (only active while editing) ─────────────────
  const [draftUsername, setDraftUsername] = useState('')
  const [draftImg, setDraftImg]           = useState('')

  const [isModalOpen, setIsModalOpen]     = useState(false)
  const [enabled, setEnabled]             = useState(true)

  // ── Load current user on mount ───────────────────────────────
  useEffect(() => {
    const fetchMe = async (userId: number) => {
      const res = await userApi.getUserInfoById(userId)
      if (res.success) {
        setSavedUsername(res.data.username)
        setSavedEmail(res.data.email)
        const matched = POKER_IMAGES.find((img) => img === res.data.imageProfile)
        setSavedImg(matched ?? POKER_IMAGES[0])
      }
    }
    fetchMe(userId)
  }, [])

  // ── Enter edit mode — copy saved → draft ────────────────────
  const handleEdit = () => {
    setDraftUsername(savedUsername)
    setDraftImg(savedImg)
    setMessage(null)
    setIsEditing(true)
  }

  // ── Cancel — discard draft ───────────────────────────────────
  const handleCancel = () => {
    setIsEditing(false)
    setMessage(null)
  }

  // ── Save — call API, commit draft → saved ────────────────────
  const handleSave = async () => {
    if (!userId) return
    setSaving(true)
    setMessage(null)

    const res = await userApi.updateUserInfo(userId, draftUsername, draftImg)
    if (res.success) {
      setSavedUsername(draftUsername)
      setSavedImg(draftImg)
      setIsEditing(false)
      console.log(draftImg);
      
      setMessage({ text: 'Profile updated successfully.', ok: true })
    } else {
      setMessage({ text: 'Failed to update profile.', ok: false })
    }
    setSaving(false)
  }

  // ── While editing, avatar picker updates draft only ──────────
  const handleSetCurrentImg = (img: string) => {
    if (isEditing) setDraftImg(img)
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-full min-w-0">
          <TopBar />
          <header className='mx-4 md:ml-10 my-6 md:my-10'>
            <h1 className='space-grotesk text-white text-2xl md:text-4xl font-medium'>Account System</h1>
            <p className='inter text-[#A2ACB9] font-light text-sm md:text-base'>Configure your tactical interface and security protocols.</p>
          </header>

          <div className='flex flex-col xl:flex-row justify-center gap-6 xl:gap-10 px-4 md:px-6 xl:px-0 pb-10'>

            {/* Profile Identity */}
            <section className='inter bg-[#09141F] w-full xl:w-150 p-5 md:p-7 rounded-sm border-l-[3px] border-l-[#aeff9a50]'>
              <header className='text-[#AFFF9A] flex items-center gap-3 mb-5'>
                <IconUserCircle />
                <h2 className='text-lg md:text-xl font-bold'>Profile Identity</h2>
              </header>
              <div className='flex flex-col sm:flex-row gap-6 md:gap-10'>

                {/* Avatar */}
                <div className="relative w-24 h-24 md:w-28 md:h-28 border-4 border-[#aeff9a50] rounded-lg overflow-visible shadow-2xl shrink-0">
                  <img
                    src={isEditing ? draftImg : savedImg}
                    alt="Avatar"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  {isEditing && (
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(true)}
                      className="absolute bottom-0 right-0 bg-[#AFFF9A] hover:bg-[#85bd77] text-black p-1 rounded-full shadow-lg transition-transform hover:scale-110"
                    >
                      <IconPencil size={18} />
                    </button>
                  )}
                </div>

                {/* Fields */}
                <div className='w-full'>
                  <label className='text-[#94A3B8] text-xs font-bold'>USERNAME</label>
                  <div className='bg-black px-4 py-3 md:py-4 mt-2 mb-4 md:mb-5 rounded-lg'>
                    <input
                      type="text"
                      value={isEditing ? draftUsername : savedUsername}
                      onChange={(e) => isEditing && setDraftUsername(e.target.value)}
                      readOnly={!isEditing}
                      placeholder="Enter your username"
                      className={`text-white w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 bg-transparent text-sm md:text-base ${
                        !isEditing ? 'cursor-default select-none' : ''
                      }`}
                    />
                  </div>

                  <label className='text-[#94A3B8] text-xs font-bold'>EMAIL ADDRESS</label>
                  <div className='bg-black px-4 py-3 md:py-4 mt-2 mb-4 md:mb-5 rounded-lg'>
                    <input
                      type="email"
                      value={savedEmail}
                      readOnly
                      placeholder="Enter your email"
                      className='text-white w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 bg-transparent cursor-default opacity-60 text-sm md:text-base'
                    />
                  </div>

                  {message && (
                    <p className={`text-sm mb-3 ${message.ok ? 'text-[#AFFF9A]' : 'text-red-400'}`}>
                      {message.text}
                    </p>
                  )}

                  <div className='flex justify-end gap-3'>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className='text-[#AFFF9A] bg-[#192735] px-6 md:px-8 py-2 font-bold rounded-xs cursor-pointer hover:bg-[#16222e] text-sm md:text-base'
                      >
                        Edit
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleCancel}
                          disabled={saving}
                          className='text-[#94A3B8] bg-[#13212E] px-6 md:px-8 py-2 font-bold rounded-xs cursor-pointer hover:bg-[#1a2d3e] disabled:opacity-50 text-sm md:text-base'
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className='text-[#AFFF9A] bg-[#192735] px-6 md:px-8 py-2 font-bold rounded-xs cursor-pointer hover:bg-[#16222e] disabled:opacity-50 text-sm md:text-base'
                        >
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Security Matrix */}
            <section className='inter bg-[#09141F] w-full xl:w-100 p-5 md:p-7 rounded-sm'>
              <header className='text-[#AFFF9A] flex items-center gap-3 mb-5'>
                <IconShieldCheckeredFilled />
                <h2 className='text-lg md:text-xl font-bold'>Security Matrix</h2>
              </header>
              <div className='flex justify-between items-center bg-[#13212E] px-4 py-4 rounded-lg mb-6 md:mb-10'>
                <div>
                  <h2 className='text-white font-bold text-sm md:text-base'>Two-Factor Auth</h2>
                  <p className='text-[#94A3B8] text-xs md:text-sm'>Secure your vault access</p>
                </div>
                <ToggleSwitch enabled={enabled} onToggle={() => setEnabled(!enabled)} />
              </div>
              <button className='w-full flex justify-between bg-black rounded-lg px-4 py-4 md:py-5 cursor-pointer'>
                <h2 className='text-white font-bold text-sm md:text-base'>Reset Password</h2>
                <IconArrowNarrowRight className='text-[#94A3B8]' />
              </button>
            </section>

          </div>
        </div>

        {isModalOpen && (
          <ModalImage
            setCurrentImg={handleSetCurrentImg}
            tempSelectedImg={isEditing ? draftImg : savedImg}
            setIsModalOpen={setIsModalOpen}
            setTempSelectedImg={setDraftImg}
            currentTime={isEditing ? draftImg : savedImg}
          />
        )}
      </div>
    </>
  )
}

export default SettingPage