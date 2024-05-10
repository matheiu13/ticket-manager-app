'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { Avatar } from '@mantine/core'

export default function UserAvatar({
  url,
}: {
  url: string | null,
}) {
  const supabase = createClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
        // console.log(avatarUrl);
        
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabase])

  return (
    <div>
      {avatarUrl ? (
        <Avatar src={avatarUrl} radius="sm"/>
      ) : (
        <Avatar variant="outline"  />
      )}
    </div>
  )
}